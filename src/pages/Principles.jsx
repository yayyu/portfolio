const cards = [
  {
    filter: 'sepia(1) saturate(0.6) hue-rotate(10deg)',
    textClass: 'text-olive',
    icon: '/images/icon-eye.svg',
    text: 'Problems rarely live where they first appear',
  },
  {
    filter: 'sepia(1) saturate(0.5) hue-rotate(120deg)',
    textClass: 'text-pine',
    icon: '/images/icon-scribble.svg',
    text: 'Design should intervene at leverage points',
  },
  {
    filter: 'sepia(1) saturate(0.4) hue-rotate(330deg)',
    textClass: 'text-terra',
    icon: '/images/icon-box.svg',
    text: 'Clarity emerges through testing',
  },
];

export default function Principles() {
  return (
    <section className="w-full bg-cream pt-48 pb-24 px-8">
      <h2 className="font-instrument-serif text-ink text-center text-[clamp(2rem,4vw,3.5rem)] tracking-tight mb-16">
        My principles for designing in complex systems
      </h2>

      <div className="flex justify-center gap-9 flex-wrap">
        {cards.map((card, i) => (
          <div
            key={i}
            className="relative flex flex-col items-center justify-center gap-4 p-8"
            style={{
              width: '351px',
              height: '342px',
              backgroundImage: 'url(/images/sticky-note.png)',
              backgroundSize: '100% 100%',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              filter: card.filter,
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
            <p
              className={`font-instrument-serif text-center text-[42px] leading-[40px] tracking-[-0.84px] ${card.textClass}`}
            >
              {card.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
