import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const cards = [
  {
    filter: 'sepia(1) saturate(0.6) hue-rotate(10deg)',
    textClass: 'text-olive',
    textColor: '#52480a',
    icon: '/images/icon-eye.svg',
    text: 'Problems rarely live where they first appear',
    back: 'Experiences, behaviors, and constraints are shaped by larger systems. I look beyond surface pain points to understand where the underlying forces are at play.',
  },
  {
    filter: 'sepia(1) saturate(0.5) hue-rotate(120deg)',
    textClass: 'text-pine',
    textColor: '#335744',
    icon: '/images/icon-scribble.svg',
    text: 'Design should intervene at leverage points',
    back: 'Within that system, there are multiple points where change is possible. I identify and compare potential leverage points before deciding where design can create the most meaningful shift.',
  },
  {
    filter: 'sepia(1) saturate(0.4) hue-rotate(330deg)',
    textClass: 'text-terra',
    textColor: '#624932',
    icon: '/images/icon-box.svg',
    text: 'Clarity emerges through testing',
    back: 'The strongest direction reveals itself through experimentation. I develop designs around identified leverage points and test them early, using learning to decide which should guide the final experience.',
  },
];

const W = 351;
const H = 342;
const SEG_Y = 32;
const MAX_CURL = Math.PI * 0.85; // 153° — full peel without doubling back

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

function wrapText(ctx, text, maxWidth) {
  const words = text.split(' ');
  const lines = [];
  let line = '';
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (line && ctx.measureText(candidate).width > maxWidth) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }
  if (line) lines.push(line);
  return lines;
}

// Draw the full front face — sticky note texture + icon + text — onto ctx.
function drawFrontFace(ctx, card, stickyImg, iconImg) {
  // Sticky note background with per-card color filter
  ctx.filter = card.filter;
  ctx.drawImage(stickyImg, 0, 0, W, H);
  ctx.filter = 'none';

  // Icon dimensions (scribble icon is wider)
  const iconW = card.icon === '/images/icon-scribble.svg' ? 174 : 95;
  const iconH = card.icon === '/images/icon-scribble.svg' ? 98  : 95;
  const gap     = 16; // gap-4
  const padding = 32; // p-8

  // Set up text style for measuring
  ctx.font = '42px "Instrument Serif"';
  if ('letterSpacing' in ctx) ctx.letterSpacing = '-0.84px';
  const lines  = wrapText(ctx, card.text, W - padding * 2);
  const lineH  = 40; // leading-[40px]
  const totalH = iconH + gap + lines.length * lineH;
  const startY = (H - totalH) / 2;

  // Icon — centered horizontally
  ctx.drawImage(iconImg, (W - iconW) / 2, startY, iconW, iconH);

  // Text lines
  ctx.fillStyle   = card.textColor;
  ctx.textAlign   = 'center';
  ctx.textBaseline = 'top';
  lines.forEach((line, i) => {
    ctx.fillText(line, W / 2, startY + iconH + gap + i * lineH);
  });
}

function StickyCard({ card }) {
  const canvasRef   = useRef(null);
  const threeRef    = useRef(null);
  const rafRef      = useRef(null);
  const progressRef = useRef(0);
  const targetRef   = useRef(0);

  useEffect(() => {
    const canvas   = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(W, H);
    renderer.setClearColor(0x000000, 0);

    const scene  = new THREE.Scene();
    // OrthographicCamera exactly sized to the card — no perspective distortion
    const camera = new THREE.OrthographicCamera(-W / 2, W / 2, H / 2, -H / 2, 0.1, 10000);
    camera.position.z = 1000;

    // 1 segment wide, SEG_Y tall for a smooth 3D curl
    const geometry = new THREE.PlaneGeometry(W, H, 1, SEG_Y);

    const offscreen = document.createElement('canvas');
    offscreen.width  = W;
    offscreen.height = H;
    const ctx = offscreen.getContext('2d');

    const texture  = new THREE.CanvasTexture(offscreen);
    const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
    const mesh     = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    threeRef.current = { renderer, scene, camera, geometry, material, texture };

    // Wait for both images and the web font before painting the texture
    Promise.all([
      loadImg('/images/sticky-note.png'),
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
    const settled = Math.abs(diff) < 0.001;
    progressRef.current = settled ? targetRef.current : progressRef.current + diff * 0.08;

    const { renderer, scene, camera, geometry } = threeRef.current;
    deformCurl(geometry, progressRef.current);
    renderer.render(scene, camera);

    if (!settled) rafRef.current = requestAnimationFrame(doFrame);
  };

  const handleEnter = () => {
    targetRef.current = 1;
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(doFrame);
  };

  const handleLeave = () => {
    targetRef.current = 0;
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

      {/* Three.js canvas — front face with baked texture and vertex curl */}
      <canvas ref={canvasRef} style={{ position: 'absolute', left: 0, top: 0, zIndex: 1 }} />
    </div>
  );
}

export default function Principles() {
  return (
    <section className="w-full bg-cream pt-48 pb-24 px-8">
      <h2 className="font-instrument-serif text-ink text-center text-[clamp(2rem,4vw,3.5rem)] tracking-tight mb-16">
        My principles for designing in complex systems
      </h2>

      <div className="flex justify-center gap-9 flex-wrap">
        {cards.map((card, i) => (
          <StickyCard key={i} card={card} />
        ))}
      </div>
    </section>
  );
}
