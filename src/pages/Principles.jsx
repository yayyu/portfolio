import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const cards = [
  {
    bgColor: '#d4cf8a',
    textClass: 'text-olive',
    textColor: '#383106',
    icon: '/images/icon-eye.svg',
    lines: ['Symptoms are', 'not the problem'],
    lineSizes: [42, 38],
    back: 'What appears broken is often an effect, not the cause.\n\nFirst solutions tend to treat the symptom, which is why I step back and explore the system before deciding what to change.',
  },
  {
    bgColor: '#b8cec4',
    textClass: 'text-pine',
    textColor: '#0c2c1b',
    icon: '/images/icon-scribble.svg',
    lines: ['Clarity emerges at', 'leverage points'],
    lineSizes: [38, 38],
    back: 'Complex systems present many possible directions, but not all of them meaningfully change outcomes.\n\nIdentifying leverage points transforms ambiguity into clear opportunities for intervention.',
  },
  {
    bgColor: '#d9b99a',
    textClass: 'text-terra',
    textColor: '#1b0f04',
    icon: '/images/icon-box.svg',
    lines: ['Interaction reveals', 'what reasoning', 'cannot'],
    lineSizes: [38, 38, 38],
    back: 'Even well-reasoned interventions remain theoretical until users engage with them.\n\nTheir response reveals how the design must adapt to create meaningful change.',
  },
];

const W = 351;
const H = 342;
const SEG_Y = 32;
const MAX_CURL = Math.PI * 0.6; // 108° — curl without vertices escaping the frustum

// v: 0 = bottom segment (curls first), 1 = top segment (curls last, 0.4 lag)
function localProgress(p, v) {
  return Math.max(0, Math.min(1, (p - v * 0.4) / 0.6));
}

// Deform vertices for a bottom-up paper peel.
// Top row (iy=0, y=+H/2) is the hinge — always stays at z=0.
// Integrate downward from the anchor; bottom segments curl first.
function deformCurl(geometry, p) {
  const pos = geometry.attributes.position;
  const segH = H / SEG_Y;

  // iy=0 → top row (y=+H/2, anchored), iy=SEG_Y → bottom row (lifts first)
  for (let iy = 0; iy <= SEG_Y; iy++) {
    let accY = H / 2;
    let accZ = 0;

    // Segment r runs from the topmost strip (r=0) down to just above row iy.
    // v=1 at r=0 (top strip, curls last), v=0 at r=SEG_Y-1 (bottom strip, curls first).
    for (let r = 0; r < iy; r++) {
      const v = (SEG_Y - 1 - r) / (SEG_Y - 1);
      const theta = localProgress(p, v) * MAX_CURL;
      accY -= segH * Math.cos(theta); // move downward (less so as curl deepens)
      accZ += segH * Math.sin(theta); // lift toward viewer
    }

    // widthSegments=1 → 2 vertices per row: index = iy*2 + ix
    pos.setY(iy * 2,     accY);
    pos.setZ(iy * 2,     accZ);
    pos.setY(iy * 2 + 1, accY);
    pos.setZ(iy * 2 + 1, accZ);
  }

  pos.needsUpdate = true;
}

function loadImg(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

// Draw the full front face — solid color background + icon + text — onto ctx.
function drawFrontFace(ctx, card, iconImg) {
  ctx.fillStyle = card.bgColor;
  ctx.fillRect(0, 0, W, H);

  // Icon dimensions (scribble icon is wider)
  const iconW = card.icon === '/images/icon-scribble.svg' ? 174 : 95;
  const iconH = card.icon === '/images/icon-scribble.svg' ? 98  : 95;
  const gap    = 16; // gap-4
  const lineH  = 44; // leading between text lines

  const totalH = iconH + gap + card.lines.length * lineH;
  const startY = (H - totalH) / 2;

  // Icon — centered horizontally
  ctx.drawImage(iconImg, (W - iconW) / 2, startY, iconW, iconH);

  // Text lines — each drawn with its own font size
  ctx.fillStyle    = card.textColor;
  ctx.textAlign    = 'center';
  ctx.textBaseline = 'top';
  if ('letterSpacing' in ctx) ctx.letterSpacing = '-0.84px';
  card.lines.forEach((line, i) => {
    ctx.font = `${card.lineSizes[i]}px "Instrument Serif"`;
    ctx.fillText(line, W / 2, startY + iconH + gap + i * lineH);
  });
}

function StickyCard({ card }) {
  const canvasRef     = useRef(null);
  const shadowRef     = useRef(null);
  const threeRef      = useRef(null);
  const rafRef        = useRef(null);
  const progressRef   = useRef(0);
  const targetRef     = useRef(0);
  // Bypasses the settlement check on the very first frame after each direction change,
  // preventing the loop from exiting immediately if diff is tiny at the moment of trigger.
  const firstFrameRef = useRef(false);

  useEffect(() => {
    const canvas   = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(W, H);
    renderer.setClearColor(0x000000, 0);

    const scene  = new THREE.Scene();
    // OrthographicCamera exactly sized to the card — no perspective distortion.
    // Far plane extended to 50000 to prevent clipping of high-Z curl vertices.
    const camera = new THREE.OrthographicCamera(-W / 2, W / 2, H / 2, -H / 2, 0.1, 50000);
    camera.position.z = 1000;

    // 1 segment wide, SEG_Y tall for a smooth 3D curl
    const geometry = new THREE.PlaneGeometry(W, H, 1, SEG_Y);

    const dpr = window.devicePixelRatio || 1;
    const offscreen = document.createElement('canvas');
    offscreen.width  = W * dpr;
    offscreen.height = H * dpr;
    const ctx = offscreen.getContext('2d');
    ctx.scale(dpr, dpr);

    const texture  = new THREE.CanvasTexture(offscreen);
    texture.colorSpace = THREE.SRGBColorSpace;
    const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
    const mesh     = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    threeRef.current = { renderer, scene, camera, geometry, material, texture };

    // Wait for the icon image and the web font before painting the texture
    Promise.all([
      loadImg(card.icon),
      document.fonts.load('42px "Instrument Serif"'),
    ]).then(([iconImg]) => {
      if (!threeRef.current) return; // component unmounted
      drawFrontFace(ctx, card, iconImg);
      texture.needsUpdate = true;
      renderer.render(scene, camera);
    });

    return () => {
      cancelAnimationFrame(rafRef.current);
      geometry.dispose();
      material.dispose();
      texture.dispose();
      renderer.dispose();
      threeRef.current = null;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const doFrame = () => {
    if (!threeRef.current) return;
    const diff    = targetRef.current - progressRef.current;
    const isFirst = firstFrameRef.current;
    firstFrameRef.current = false;
    // Skip settlement check on the first frame so a direction change always
    // advances at least one step, even if diff is below the threshold.
    const settled = !isFirst && Math.abs(diff) < 0.001;
    progressRef.current = settled ? targetRef.current : progressRef.current + diff * 0.04;

    const { renderer, scene, camera, geometry } = threeRef.current;
    deformCurl(geometry, progressRef.current);
    renderer.render(scene, camera);

    if (shadowRef.current) {
      const p = progressRef.current;
      const opacity = p * 0.35;
      const spread  = Math.round(p * 60);
      shadowRef.current.style.background =
        `linear-gradient(to top, rgba(0,0,0,${opacity}) 0%, rgba(0,0,0,0) ${spread}%)`;
    }

    if (!settled) rafRef.current = requestAnimationFrame(doFrame);
  };

  const handleEnter = () => {
    targetRef.current = 1;
    firstFrameRef.current = true;
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(doFrame);
  };

  const handleLeave = () => {
    targetRef.current = 0;
    firstFrameRef.current = true;
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(doFrame);
  };

  return (
    <div
      style={{ position: 'relative', width: `${W}px`, height: `${H}px` }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {/* Back card — always visible underneath the canvas */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <div style={{ position: 'absolute', inset: 0, backgroundColor: card.bgColor }} />
        <div className="flex items-center justify-center p-8" style={{ position: 'absolute', inset: 0 }}>
          <div className="font-instrument-serif text-[24px] text-center tracking-[-0.48px]" style={{ color: card.textColor }}>
            {card.back.split('\n\n').map((para, pi) => (
              <p key={pi} className={pi > 0 ? 'mt-[1em]' : ''}>{para}</p>
            ))}
          </div>
        </div>
      </div>

      {/* Shadow — sits above back card, below front canvas; driven by doFrame */}
      <div
        ref={shadowRef}
        style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}
      />

      {/* Front canvas */}
      <div style={{ position: 'absolute', left: 0, top: 0, zIndex: 1 }}>
        <canvas ref={canvasRef} style={{ display: 'block' }} />
      </div>
    </div>
  );
}

export default function Principles() {
  return (
    <section className="w-full bg-cream pt-48 pb-24 px-8">
      <h2 className="font-instrument-serif text-ink text-center text-[clamp(2rem,4vw,3.5rem)] tracking-tight mb-16">
        Design principles for complex problems
      </h2>

      <div className="flex justify-center gap-9 flex-wrap">
        {cards.map((card, i) => (
          <StickyCard key={i} card={card} />
        ))}
      </div>

      <p className="font-instrument-serif italic text-[36px] text-center tracking-[-0.72px] text-black max-w-[925px] mx-auto mt-12">
        My work focuses first on diagnosing systems and guiding intervention— then refining the designs that express it.
      </p>
    </section>
  );
}
