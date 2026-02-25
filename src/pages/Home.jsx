import { useState, useEffect, useRef, useCallback } from 'react';

const BALL_SIZE = 220;
const FRICTION = 0.92;
const RESTITUTION = 0.3;

function generateBalls() {
  const rand = (min, max) => Math.random() * (max - min) + min;
  const W = window.innerWidth;
  const H = window.innerHeight;
  const navH = 80;
  const margin = 30;
  const count = 7;
  const placed = [];
  let id = 0;

  const overlaps = (x, y) =>
    placed.some(p =>
      Math.abs(p.x - x) < BALL_SIZE + margin &&
      Math.abs(p.y - y) < BALL_SIZE + margin
    );

  let attempts = 0;
  while (placed.length < count && attempts < 1000) {
    const x = rand(-BALL_SIZE * 0.3, W - BALL_SIZE * 0.7);
    const y = rand(navH, H - BALL_SIZE * 0.7);
    if (!overlaps(x, y)) {
      placed.push({
        id: id++,
        x, y,
        vx: 0, vy: 0,
        rotation: rand(-180, 180),
        isDragging: false,
        dragOffsetX: 0,
        dragOffsetY: 0,
      });
    }
    attempts++;
  }
  return placed;
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  const ballsRef = useRef(null);
  if (!ballsRef.current) ballsRef.current = generateBalls();

  const [, forceUpdate] = useState(0);
  const rafRef = useRef(null);
  const dragRef = useRef(null); // { id, lastX, lastY, lastTime, vx, vy }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const tick = useCallback(() => {
    const W = window.innerWidth;
    const H = window.innerHeight;
    const balls = ballsRef.current;

    // Physics step
    for (const b of balls) {
      if (b.isDragging) continue;
      b.vx *= FRICTION;
      b.vy *= FRICTION;
      b.x += b.vx;
      b.y += b.vy;
      b.rotation += Math.hypot(b.vx, b.vy) * 0.15;
    }

    // Ball-ball collisions
    for (let i = 0; i < balls.length; i++) {
      for (let j = i + 1; j < balls.length; j++) {
        const a = balls[i];
        const b = balls[j];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 0.01;
        if (dist >= BALL_SIZE) continue;

        const nx = dx / dist;
        const ny = dy / dist;
        const overlap = BALL_SIZE - dist;

        // Positional correction
        if (!a.isDragging && !b.isDragging) {
          a.x -= nx * overlap * 0.5; a.y -= ny * overlap * 0.5;
          b.x += nx * overlap * 0.5; b.y += ny * overlap * 0.5;
        } else if (a.isDragging) {
          b.x += nx * overlap; b.y += ny * overlap;
        } else {
          a.x -= nx * overlap; a.y -= ny * overlap;
        }

        // Velocity impulse — use drag velocity for dragging ball so pushed balls fly
        const d = dragRef.current;
        const avx = a.isDragging ? (d?.id === a.id ? d.vx : 0) : a.vx;
        const avy = a.isDragging ? (d?.id === a.id ? d.vy : 0) : a.vy;
        const bvx = b.isDragging ? (d?.id === b.id ? d.vx : 0) : b.vx;
        const bvy = b.isDragging ? (d?.id === b.id ? d.vy : 0) : b.vy;
        const dvn = (bvx - avx) * nx + (bvy - avy) * ny;
        if (dvn >= 0) continue;

        if (!a.isDragging && !b.isDragging) {
          const imp = -(1 + RESTITUTION) * dvn / 2;
          a.vx = (a.vx - imp * nx) * 0.5; a.vy = (a.vy - imp * ny) * 0.5;
          b.vx = (b.vx + imp * nx) * 0.5; b.vy = (b.vy + imp * ny) * 0.5;
        } else if (a.isDragging) {
          const imp = -(1 + RESTITUTION) * dvn;
          b.vx = (b.vx + imp * nx) * 0.5; b.vy = (b.vy + imp * ny) * 0.5;
        } else {
          const imp = -(1 + RESTITUTION) * dvn;
          a.vx = (a.vx - imp * nx) * 0.5; a.vy = (a.vy - imp * ny) * 0.5;
        }
      }
    }

    // Remove completely out-of-bounds balls
    ballsRef.current = balls.filter(b =>
      b.isDragging || !(b.x + BALL_SIZE < 0 || b.x > W || b.y + BALL_SIZE < 0 || b.y > H)
    );

    forceUpdate(n => n + 1);
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [tick]);

  const onPointerDown = useCallback((e, id) => {
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    const ball = ballsRef.current.find(b => b.id === id);
    if (!ball) return;
    ball.isDragging = true;
    ball.vx = 0;
    ball.vy = 0;
    ball.dragOffsetX = e.clientX - ball.x;
    ball.dragOffsetY = e.clientY - ball.y;
    dragRef.current = { id, lastX: e.clientX, lastY: e.clientY, lastTime: performance.now(), vx: 0, vy: 0 };
  }, []);

  const onPointerMove = useCallback((e, id) => {
    const d = dragRef.current;
    if (!d || d.id !== id) return;
    const ball = ballsRef.current.find(b => b.id === id);
    if (!ball || !ball.isDragging) return;
    ball.x = e.clientX - ball.dragOffsetX;
    ball.y = e.clientY - ball.dragOffsetY;
    const now = performance.now();
    const dt = Math.max(1, now - d.lastTime);
    const vx = (e.clientX - d.lastX) / dt * 16;
    const vy = (e.clientY - d.lastY) / dt * 16;
    d.vx = vx;
    d.vy = vy;
    ball.rotation += Math.hypot(vx, vy) * 0.15;
    d.lastX = e.clientX;
    d.lastY = e.clientY;
    d.lastTime = now;
  }, []);

  const onPointerUp = useCallback((e, id) => {
    const d = dragRef.current;
    if (!d || d.id !== id) return;
    const ball = ballsRef.current.find(b => b.id === id);
    if (!ball) return;
    ball.isDragging = false;
    ball.vx = d.vx;
    ball.vy = d.vy;
    dragRef.current = null;
  }, []);

  return (
    <div className="bg-cream relative h-screen w-full">

      {/* Paper balls — physics-driven, draggable */}
      {ballsRef.current.map(ball => (
        <div
          key={ball.id}
          className="absolute z-20 select-none"
          style={{
            top: `${ball.y}px`,
            left: `${ball.x}px`,
            width: '220px',
            height: '220px',
            transform: `rotate(${ball.rotation}deg)`,
            touchAction: 'none',
            cursor: 'grab',
          }}
          onPointerDown={e => onPointerDown(e, ball.id)}
          onPointerMove={e => onPointerMove(e, ball.id)}
          onPointerUp={e => onPointerUp(e, ball.id)}
        >
          <img src="/images/paper-ball.png" alt="" className="w-[220px] h-[220px]" draggable={false} />
        </div>
      ))}

      {/* Nav scroll backdrop — torn paper strip that slides down on scroll */}
      <div
        className="absolute left-0 w-full z-[9] transition-transform duration-300"
        style={{
          top: 0,
          transform: scrolled ? 'translateY(0)' : 'translateY(-100%)',
          height: '90px',
          background: '#fffdf9',
          clipPath: 'polygon(0 0, 100% 0, 100% 70%, 97% 85%, 94% 72%, 90% 88%, 86% 74%, 82% 90%, 78% 76%, 74% 91%, 70% 77%, 66% 88%, 62% 74%, 58% 89%, 54% 75%, 50% 90%, 46% 76%, 42% 88%, 38% 73%, 34% 87%, 30% 74%, 26% 89%, 22% 75%, 18% 88%, 14% 73%, 10% 86%, 6% 72%, 3% 85%, 0 70%)',
        }}
      />

      {/* Nav */}
      <nav className="absolute top-0 left-0 w-full flex items-center justify-between px-12 py-5 z-10">
        <p className="font-instrument-serif text-ink text-[48px] tracking-[-4.8px]">yaying.</p>
        <div className="flex gap-10 font-instrument-serif text-ink text-[36px] tracking-[-1.8px]">
          <span>work</span>
          <span>research</span>
          <span>studio</span>
          <span>about</span>
        </div>
      </nav>

      {/* Hero text */}
      <div className="absolute inset-0 flex items-center justify-center z-10 px-8">
        <div className="text-center font-instrument-serif tracking-[-2px] text-forest"
             style={{fontSize: 'clamp(2.5rem, 5.5vw, 6.25rem)', lineHeight: 1.2}}>
          <p>Systems thinking–driven</p>
          <p className="italic">product &amp; interaction designer</p>
          <p>shaping research, scattered signals,</p>
          <p>and early exploration into focused</p>
          <p><span>experiences </span><span className="italic text-sage">worth building.</span></p>
        </div>
      </div>

      {/* CTA */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-center">
        <p className="font-instrument-serif text-[36px] tracking-[-0.72px]">See how I shape direction</p>
        <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-bounce-soft mx-auto mt-1">
          <path d="M22.5 30.15V11.65C22.5 11.2167 22.6417 10.8583 22.925 10.575C23.2083 10.2917 23.5667 10.15 24 10.15C24.4333 10.15 24.7917 10.2917 25.075 10.575C25.3583 10.8583 25.5 11.2167 25.5 11.65V30.25L32.85 22.9C33.15 22.6 33.5 22.45 33.9 22.45C34.3 22.45 34.65 22.6 34.95 22.9C35.25 23.2 35.4 23.55 35.4 23.95C35.4 24.35 35.25 24.7 34.95 25L25 34.95C24.7 35.25 24.35 35.4 23.95 35.4C23.55 35.4 23.2 35.25 22.9 34.95L12.95 25C12.65 24.7 12.5 24.35 12.5 23.95C12.5 23.55 12.65 23.2 12.95 22.9C13.25 22.6 13.6083 22.4417 14.025 22.425C14.4417 22.4083 14.8 22.55 15.1 22.85L22.5 30.15Z" fill="#1C1B1F"/>
        </svg>
      </div>

    </div>
  );
}
