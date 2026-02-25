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
        className="fixed left-0 top-0 w-full z-[29]"
        style={{
          transform: scrolled ? 'translateY(0)' : 'translateY(-100%)',
          transition: 'transform 500ms ease-in-out',
        }}
      >
        <div
          style={{
            height: '90px',
            backgroundImage: 'url(/images/nav-texture.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            clipPath: 'polygon(0 0, 100% 0, 100% 72%, 98% 88%, 95% 74%, 92% 90%, 88% 75%, 85% 91%, 81% 76%, 77% 89%, 73% 75%, 69% 90%, 65% 76%, 61% 88%, 57% 74%, 53% 89%, 49% 75%, 45% 90%, 41% 76%, 37% 88%, 33% 74%, 29% 89%, 25% 75%, 21% 88%, 17% 74%, 13% 89%, 9% 75%, 5% 87%, 2% 73%, 0 85%)',
          }}
        />
      </div>

      {/* Nav */}
      <nav className="fixed top-0 left-0 w-full flex items-center justify-between px-12 py-5 z-30">
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
