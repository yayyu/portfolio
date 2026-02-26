import { useState, useEffect, useRef } from 'react';

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

const SLICES = 8;
const CARD_HEIGHT = 342;
const SLICE_HEIGHT = CARD_HEIGHT / SLICES;

function StickyCard({ card }) {
  const [curlProgress, setCurlProgress] = useState(0);
  const rafRef = useRef(null);
  const progressRef = useRef(0);
  const targetRef = useRef(0);

  const animate = () => {
    const diff = targetRef.current - progressRef.current;
    if (Math.abs(diff) < 0.001) {
      progressRef.current = targetRef.current;
      setCurlProgress(targetRef.current);
      return;
    }
    progressRef.current += diff * 0.08;
    setCurlProgress(progressRef.current);
    rafRef.current = requestAnimationFrame(animate);
  };

  const handleEnter = () => {
    targetRef.current = 1;
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(animate);
  };

  const handleLeave = () => {
    targetRef.current = 0;
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  return (
    <div
      style={{ position: 'relative', width: '351px', height: `${CARD_HEIGHT}px`, perspective: '1200px' }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {/* Back card — always visible underneath, never moves */}
      <div style={{ position: 'absolute', inset: 0 }}>
        {/* Filtered background */}
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
        {/* Unfiltered text */}
        <div className="flex items-center justify-center p-8" style={{ position: 'absolute', inset: 0 }}>
          <p className={`font-instrument-serif text-[24px] text-center tracking-[-0.48px] ${card.textClass}`}>
            {card.back}
          </p>
        </div>
      </div>

      {/* Front card — curl effect via 8 slices */}
      <div style={{ position: 'absolute', inset: 0, top: '3px', zIndex: 1, transformStyle: 'preserve-3d' }}>
        {/* Content layer — sits above all slices */}
        <div
          className="flex flex-col items-center justify-center gap-4 p-8"
          style={{
            position: 'relative',
            inset: 0,
            opacity: 1,
            zIndex: SLICES + 1,
            pointerEvents: 'none',
          }}
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

        {/* 8 slices for the curl background */}
        {Array.from({ length: SLICES }).map((_, s) => {
          // slice 7 = bottom (curls first), slice 0 = top (curls last)
          const delay = (7 - s) / 7; // 1 = bottom, 0 = top
          const sliceProgress = Math.max(0, Math.min(1, (curlProgress - (1 - delay) * 0.4) / 0.6));
          const angle = sliceProgress * 75;

          return (
            <div
              key={s}
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: `${s * SLICE_HEIGHT}px`,
                height: `${SLICE_HEIGHT}px`,
                overflow: 'visible',
                transformOrigin: 'top center',
                transform: `rotateX(${angle}deg)`,
                transformStyle: 'preserve-3d',
                backgroundImage: 'url(/images/sticky-note.png)',
                backgroundSize: `351px ${CARD_HEIGHT}px`,
                backgroundPosition: `0 -${s * SLICE_HEIGHT}px`,
                backgroundRepeat: 'no-repeat',
                filter: card.filter,
                zIndex: SLICES - s,
              }}
            />
          );
        })}
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
