import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const cards = [
  {
    filter: 'sepia(1) saturate(0.6) hue-rotate(10deg)',
    textClass: 'text-olive',
    icon: '/images/icon-eye.svg',
    text: 'Problems rarely live where they first appear',
    back: 'Experiences, behaviors, and constraints are shaped by larger systems. I look beyond surface pain points to understand where the underlying forces are at play.',
  },
  {
    filter: 'sepia(1) saturate(0.5) hue-rotate(120deg)',
    textClass: 'text-pine',
    icon: '/images/icon-scribble.svg',
    text: 'Design should intervene at leverage points',
    back: 'Within that system, there are multiple points where change is possible. I identify and compare potential leverage points before deciding where design can create the most meaningful shift.',
  },
  {
    filter: 'sepia(1) saturate(0.4) hue-rotate(330deg)',
    textClass: 'text-terra',
    icon: '/images/icon-box.svg',
    text: 'Clarity emerges through testing',
    back: 'The strongest direction reveals itself through experimentation. I develop designs around identified leverage points and test them early, using learning to decide which should guide the final experience.',
  },
];

const W = 351;
const H = 342;
const SEG_Y = 32;
const MAX_CURL = Math.PI * 0.85; // 153° — full peel without flipping back

// How far along the curl is for the strip at normalized position v (0=bottom, 1=top).
// Bottom starts immediately; top lags by 0.4 of overall progress.
function localProgress(p, v) {
  return Math.max(0, Math.min(1, (p - v * 0.4) / 0.6));
}

// Deform PlaneGeometry vertices to simulate a paper peel from bottom to top.
// Bottom row (iy=SEG_Y) is anchored at y=-H/2, z=0.
// Each row above is positioned by integrating the tangent of all segments below it.
function deformCurl(geometry, p) {
  const pos = geometry.attributes.position;
  const segH = H / SEG_Y;

  // iy=0 → top row (y = +H/2), iy=SEG_Y → bottom row (y = -H/2)
  for (let iy = SEG_Y; iy >= 0; iy--) {
    let accY = -H / 2; // start at bottom anchor
    let accZ = 0;

    // Integrate segments from the bottom (r=SEG_Y) up to just below this row (r=iy+1)
    for (let r = SEG_Y; r > iy; r--) {
      const vr = (SEG_Y - r) / SEG_Y; // 0 at bottom, 1 at top
      const theta = localProgress(p, vr) * MAX_CURL;
      accY += segH * Math.cos(theta); // move up (and compress as curl deepens)
      accZ += segH * Math.sin(theta); // lift toward viewer
    }

    // widthSegments=1 → 2 vertices per row, index = iy*2 + ix
    pos.setY(iy * 2,     accY);
    pos.setZ(iy * 2,     accZ);
    pos.setY(iy * 2 + 1, accY);
    pos.setZ(iy * 2 + 1, accZ);
  }

  pos.needsUpdate = true;
}

function StickyCard({ card }) {
  const canvasRef = useRef(null);
  const threeRef  = useRef(null);
  const rafRef    = useRef(null);
  const progressRef = useRef(0);
  const targetRef   = useRef(0);

  // Set up Three.js scene once on mount
  useEffect(() => {
    const canvas = canvasRef.current;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(W, H);
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();

    // OrthographicCamera sized exactly to the card — no perspective distortion
    const camera = new THREE.OrthographicCamera(-W / 2, W / 2, H / 2, -H / 2, 0.1, 10000);
    camera.position.z = 1000;

    // Geometry: 1 segment wide, 32 tall for a smooth curl
    const geometry = new THREE.PlaneGeometry(W, H, 1, SEG_Y);

    // Pre-render sticky note with the per-card CSS color filter into an offscreen canvas
    const offscreen = document.createElement('canvas');
    offscreen.width  = W;
    offscreen.height = H;
    const ctx = offscreen.getContext('2d');

    const texture  = new THREE.CanvasTexture(offscreen);
    const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
    const mesh     = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    threeRef.current = { renderer, scene, camera, geometry, material, texture };

    const img = new Image();
    img.onload = () => {
      ctx.filter = card.filter;
      ctx.drawImage(img, 0, 0, W, H);
      texture.needsUpdate = true;
      renderer.render(scene, camera);
    };
    img.src = '/images/sticky-note.png';

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
      {/* Back card — always visible underneath */}
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

      {/* Three.js canvas — front sticky note with vertex curl */}
      <canvas ref={canvasRef} style={{ position: 'absolute', left: 0, top: 3, zIndex: 1 }} />

      {/* Content overlay — icon + text, always above the canvas */}
      <div
        className="flex flex-col items-center justify-center gap-4 p-8"
        style={{ position: 'absolute', inset: 0, zIndex: 10, pointerEvents: 'none' }}
      >
        <img
          src={card.icon}
          alt=""
          draggable={false}
          style={card.icon === '/images/icon-scribble.svg'
            ? { width: '174px', height: '98px' }
            : { width: '95px', height: '95px' }}
        />
        <p className={`font-instrument-serif text-center text-[42px] leading-[40px] tracking-[-0.84px] ${card.textClass}`}>
          {card.text}
        </p>
      </div>
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
