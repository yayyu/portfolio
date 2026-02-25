const cards = [
  {
    filter: 'sepia(1) saturate(0.6) hue-rotate(10deg)',
    color: '#52480a',
    icon: '/images/icon-eye.svg',
    text: 'Problems rarely live where they first appear',
  },
  {
    filter: 'sepia(1) saturate(0.5) hue-rotate(120deg)',
    color: '#335744',
    icon: '/images/icon-scribble.svg',
    text: 'Design should intervene at leverage points',
  },
  {
    filter: 'sepia(1) saturate(0.4) hue-rotate(330deg)',
    color: '#624932',
    icon: '/images/icon-box.svg',
    text: 'Clarity emerges through testing',
  },
];

export default function Principles() {
  return (
    <section className="w-full bg-cream py-24 px-8">
      <h2 className="font-instrument-serif text-ink text-center text-[clamp(2rem,4vw,3.5rem)] tracking-tight mb-16">
        My principles for designing in complex systems
      </h2>

      <div className="flex justify-center gap-9 flex-wrap">
        {cards.map((card, i) => (
          <div
            key={i}
            className="relative"
            style={{ width: '351px', height: '342px' }}
          >
            {/* Tinted background image */}
            <img
              src="/images/sticky-note.png"
              alt=""
              draggable={false}
              className="absolute inset-0 w-full h-full object-cover select-none"
              style={{ filter: card.filter }}
            />

            {/* Card content — sits above the tinted bg, unaffected by filter */}
            <div
              className="relative flex flex-col items-center justify-center h-full px-8 text-center font-instrument-serif"
              style={{ color: card.color }}
            >
              <img
                src={card.icon}
                alt=""
                draggable={false}
                style={{ width: '95px', height: '95px', marginBottom: '20px' }}
              />
              <p className="text-[1.35rem] leading-snug">{card.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
