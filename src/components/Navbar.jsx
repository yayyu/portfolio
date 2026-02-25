import { useState, useEffect } from 'react';

export default function Navbar() {
  const [state, setState] = useState('top'); // 'top' | 'hidden' | 'shown'

  useEffect(() => {
    let lastY = window.scrollY;
    let downDistance = 0;

    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY;
      lastY = y;

      if (y < 24) {
        downDistance = 0;
        setState('top');
        return;
      }

      if (delta > 0) {
        // scrolling down
        downDistance += delta;
        if (downDistance > window.innerHeight * 0.5) {
          setState('hidden');
        }
      } else {
        // scrolling up — reset counter and show nav
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
