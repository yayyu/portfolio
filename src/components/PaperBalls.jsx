import { useState, useRef, useCallback, useEffect } from 'react';

const BALL_SIZE = 220;
const COLLISION_SIZE = 190;
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

export default function PaperBalls() {
  const ballsRef = useRef(null);
  if (!ballsRef.current) ballsRef.current = generateBalls();

  const [, forceUpdate] = useState(0);
  const rafRef = useRef(null);
  const dragRef = useRef(null);

  const tick = useCallback(() => {
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
        if (dist >= COLLISION_SIZE) continue;

        const nx = dx / dist;
        const ny = dy / dist;
        const overlap = COLLISION_SIZE - dist;

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
      b.isDragging || !(
        b.x < -300 ||
        b.x > window.innerWidth + 300 ||
        b.y < -300 ||
        b.y > document.body.scrollHeight + 300
      )
    );

    forceUpdate(n => n + 1);
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [tick]);

  // Idle nudge on one ball to hint draggability
  useEffect(() => {
    const timer = setTimeout(() => {
      const ball = ballsRef.current.find(b => b.id === 0);
      if (ball && !ball.isDragging) {
        ball.vx = 4;
        ball.vy = -1.5;
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

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
    e.preventDefault();
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
    <>
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
    </>
  );
}
