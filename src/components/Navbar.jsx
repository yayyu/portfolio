import { useState, useEffect } from 'react';

export default function Navbar() {
  const [state, setState] = useState('top'); // 'top' | 'shown' | 'hidden'

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const goingDown = y > lastY;
      lastY = y;

      if (y < 24) {
        setState('top');
      } else if (goingDown && y > window.innerHeight) {
        setState('hidden');
      } else if (!goingDown) {
        setState('shown');
      } else {
        setState('shown');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navTransform = state === 'hidden' ? 'translateY(-100%)' : 'translateY(0)';
  const backdropTransform = state === 'top' ? 'translateY(-100%)' : state === 'hidden' ? 'translateY(-100%)' : 'translateY(0)';

  return (
    <>
      {/* Paper backdrop — only visible when state is 'shown' */}
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

      {/* Nav — always visible except when hidden */}
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
