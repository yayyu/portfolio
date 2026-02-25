import { useState } from 'react';

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

const stickyStyle = {
  backgroundImage: 'url(/images/sticky-note.png)',
  backgroundSize: '100% 100%',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
};

export default function Principles() {
  const [flipped, setFlipped] = useState(null);

  return (
    <section className="w-full bg-cream pt-48 pb-24 px-8">
      <h2 className="font-instrument-serif text-ink text-center text-[clamp(2rem,4vw,3.5rem)] tracking-tight mb-16">
        My principles for designing in complex systems
      </h2>

      <div className="flex justify-center gap-9 flex-wrap">
        {cards.map((card, i) => (
          <div
            key={i}
            className="relative"
            style={{ width: '351px', height: '342px', perspective: '1000px' }}
            onMouseEnter={() => setFlipped(i)}
            onMouseLeave={() => setFlipped(null)}
          >
            {/* Flip container */}
            <div
              style={{
                width: '100%',
                height: '100%',
                position: 'relative',
                transformStyle: 'preserve-3d',
                transform: flipped === i ? 'rotateX(-180deg)' : 'rotateX(0deg)',
                transformOrigin: 'top center',
                transition: 'transform 0.6s ease-in-out',
              }}
            >
              {/* Front face */}
              <div
                className="flex flex-col items-center justify-center gap-4 p-8"
                style={{
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  position: 'absolute',
                  inset: 0,
                  filter: card.filter,
                  ...stickyStyle,
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

              {/* Back face */}
              <div
                className="flex items-center justify-center p-8"
                style={{
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  position: 'absolute',
                  inset: 0,
                  transform: 'rotateX(180deg)',
                  filter: card.filter,
                  ...stickyStyle,
                }}
              >
                <p className={`font-instrument-serif text-[24px] text-center tracking-[-0.48px] ${card.textClass}`}>
                  {card.back}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
