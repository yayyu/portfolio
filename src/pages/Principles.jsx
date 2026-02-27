import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const cards = [
  {
    filter: 'sepia(1) saturate(0.6) hue-rotate(10deg)',
    textClass: 'text-olive',
    textColor: '#52480a',
    tintColor: 'rgba(200, 184, 74, 0.5)',
    icon: '/images/icon-eye.svg',
    lines: ['Symptoms are', 'not the problem'],
    lineSizes: [42, 38],
    back: 'Experiences, behaviors, and constraints are shaped by larger systems. I look beyond surface symptoms to find where the underlying forces actually live.',
  },
  {
    filter: 'sepia(1) saturate(0.5) hue-rotate(120deg)',
    textClass: 'text-pine',
    textColor: '#335744',
    tintColor: 'rgba(90, 158, 122, 0.5)',
    icon: '/images/icon-scribble.svg',
    lines: ['Clarity emerges at', 'leverage points'],
    lineSizes: [38, 38],
    back: 'Within complex systems, some points of intervention create disproportionate change. I map these before deciding where design effort will matter most.',
  },
  {
    filter: 'sepia(1) saturate(0.4) hue-rotate(330deg)',
    textClass: 'text-terra',
    textColor: '#624932',
    tintColor: 'rgba(196, 137, 106, 0.5)',
    icon: '/images/icon-box.svg',
    lines: ['Interaction reveals', 'what reasoning', 'cannot'],
    lineSizes: [38, 38, 38],
    back: 'The strongest directions emerge through testing, not deliberation. I build early, put work in front of people, and let real use reshape the design.',
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

// Draw the full front face — sticky note texture + icon + text — onto ctx.
// Color is applied via CSS filter on the canvas wrapper div; no baked-in tint needed.
function drawFrontFace(ctx, card, stickyImg, iconImg) {
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, W, H);
  ctx.drawImage(stickyImg, 0, 0, W, H);

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

    const offscreen = document.createElement('canvas');
    offscreen.width  = W;
    offscreen.height = H;
    const ctx = offscreen.getContext('2d');

    const texture  = new THREE.CanvasTexture(offscreen);
    const material = new THREE.MeshBasicMaterial({ map: texture, transparent: false });
    const mesh     = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    threeRef.current = { renderer, scene, camera, geometry, material, texture };

    // Wait for both images and the web font before painting the texture
    Promise.all([
      loadImg('/images/sticky-note-bottom.png'),
      loadImg(card.icon),
      document.fonts.load('42px "Instrument Serif"'),
    ]).then(([stickyImg, iconImg]) => {
      if (!threeRef.current) return; // component unmounted
      drawFrontFace(ctx, card, stickyImg, iconImg);
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
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'url(/images/sticky-note-bottom.png)',
            backgroundSize: '100% 100%',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            filter: card.filter,
          }}
        />
        <div className="flex items-center justify-center p-8" style={{ position: 'absolute', inset: 0 }}>
          <p className={`font-instrument-serif text-[24px] text-center tracking-[-0.48px] ${card.textClass}`}>
            {card.back}
          </p>
        </div>
      </div>

      {/* Front canvas — CSS filter wrapper matches back card coloring exactly */}
      <div style={{ position: 'absolute', left: 0, top: 0, zIndex: 1, filter: card.filter }}>
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
    </section>
  );
}
