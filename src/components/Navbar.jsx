import { useState, useEffect } from 'react';

export default function Navbar() {
  const [state, setState] = useState(() => {
    if (window.scrollY < 24) return 'top';
    return 'shown';
  }); // 'top' | 'hidden' | 'shown'

  useEffect(() => {
    let lastY = window.scrollY;
    let downDistance = 0;

    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY;
      lastY = y;
      const inHero = y < window.innerHeight;

      if (y < 24) {
        downDistance = 0;
        setState('top');
        return;
      }

      if (inHero) {
        // In hero: backdrop always visible, nav never hides
        downDistance = 0;
        setState('shown');
        return;
      }

      // Past hero section
      if (delta > 0) {
        downDistance += delta;
        if (downDistance > window.innerHeight * 0.5) {
          setState('hidden');
        }
      } else {
        downDistance = 0;
        setState('shown');
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navTransform = state === 'hidden' ? 'translateY(-100%)' : 'translateY(0)';
  const backdropTransform = state === 'shown' ? 'translateY(0)' : 'translateY(-100%)';

  return (
    <>
      {/* Paper backdrop — slides down only when scrolling up */}
      <div
        className="fixed top-0 z-[29]"
        style={{
          left: '-5vw',
          width: '110vw',
          transform: backdropTransform,
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
          transform: navTransform,
          transition: 'transform 500ms ease-in-out',
        }}
      >
        <p className="font-instrument-serif text-ink text-[48px] tracking-[-4.8px]">yaying.</p>
        <div className="flex gap-10 font-dm-sans font-normal text-ink text-[24px] tracking-[-1.2px]" style={{ fontVariationSettings: "'opsz' 14" }}>
          <span>design</span>
          <span>research</span>
          <span>studio</span>
          <span>about</span>
        </div>
      </nav>
    </>
  );
}
