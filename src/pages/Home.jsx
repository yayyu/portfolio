const BALLS = [
  {
    src: '/images/paper-ball-1.svg',
    size: 110,
    style: {
      top: '12%',
      left: '6%',
      rotate: '-18deg',
    },
  },
  {
    src: '/images/paper-ball-2.svg',
    size: 96,
    style: {
      top: '8%',
      right: '8%',
      rotate: '24deg',
    },
  },
  {
    src: '/images/paper-ball-3.svg',
    size: 104,
    style: {
      bottom: '18%',
      left: '4%',
      rotate: '38deg',
    },
  },
  {
    src: '/images/paper-ball-4.svg',
    size: 92,
    style: {
      bottom: '22%',
      right: '5%',
      rotate: '-12deg',
    },
  },
]

export default function Home() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-cream font-instrument-serif select-none">

      {/* Nav */}
      <nav className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-10 py-7">
        <a href="/" className="text-xl text-neutral-800 tracking-tight">
          yaying.
        </a>
        <div className="flex items-center gap-1 text-[15px] text-neutral-600">
          {['work', 'research', 'studio', 'about'].map((item, i, arr) => (
            <span key={item} className="flex items-center gap-1">
              <a href={`#${item}`} className="hover:text-neutral-900 transition-colors px-1">
                {item}
              </a>
              {i < arr.length - 1 && <span className="text-neutral-300">/</span>}
            </span>
          ))}
        </div>
      </nav>

      {/* Paper balls */}
      {BALLS.map((ball, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            ...ball.style,
            width: ball.size,
            height: ball.size,
            rotate: ball.style.rotate,
            filter: 'drop-shadow(3px 8px 16px rgba(100, 80, 40, 0.28))',
          }}
        >
          <img
            src={ball.src}
            alt=""
            draggable={false}
            className="w-full h-full"
          />
        </div>
      ))}

      {/* Hero text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none z-10 px-6">
        <h1 className="leading-[1.1] tracking-tight text-neutral-800">
          <span className="block text-[clamp(3rem,6.5vw,7rem)]">
            I make things
          </span>
          <span className="block italic text-[clamp(3rem,6.5vw,7rem)]">
            product &amp; interaction designer
          </span>
          <span className="block italic text-[clamp(3rem,6.5vw,7rem)] text-sage">
            worth building.
          </span>
        </h1>
      </div>

      {/* Bottom CTA */}
      <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center gap-3 z-10 pointer-events-none">
        <span className="text-[13px] tracking-widest uppercase text-neutral-400">
          See how I shape direction
        </span>
        <svg
          width="14"
          height="22"
          viewBox="0 0 14 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-neutral-400"
        >
          <line x1="7" y1="0" x2="7" y2="18" stroke="currentColor" strokeWidth="1.2"/>
          <path d="M1 12.5L7 19L13 12.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

    </div>
  )
}
