import { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => { console.log('scrollY', window.scrollY); setScrolled(window.scrollY > 24); };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* Scroll backdrop — torn paper strip */}
      <div
        className="fixed top-0 z-[29]"
        style={{
          left: '-5vw',
          width: '110vw',
          transform: scrolled ? 'translateY(-100%)' : 'translateY(0)',
          transition: 'transform 500ms ease-in-out',
        }}
      >
        <div
          style={{
            height: '120px',
            backgroundImage: 'url(/images/nav-texture.png)',
            backgroundSize: '100% 100%',
            backgroundRepeat: 'no-repeat',
            mixBlendMode: 'multiply',
          }}
        />
      </div>

      {/* Nav */}
      <nav
        className="fixed top-0 left-0 w-full flex items-center justify-between px-12 py-5 z-30"
        style={{
          transform: scrolled ? 'translateY(-100%)' : 'translateY(0)',
          transition: 'transform 500ms ease-in-out',
        }}
      >
        <p className="font-instrument-serif text-ink text-[48px] tracking-[-4.8px]">yaying.</p>
        <div className="flex gap-10 font-instrument-serif text-ink text-[36px] tracking-[-1.8px]">
          <span>work</span>
          <span>research</span>
          <span>studio</span>
          <span>about</span>
        </div>
      </nav>
    </>
  );
}
