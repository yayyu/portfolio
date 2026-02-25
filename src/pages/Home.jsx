import { useState, useEffect } from 'react';

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="bg-cream relative h-screen w-full" style={{ touchAction: 'none', overflow: 'hidden' }}>

      {/* Nav scroll backdrop — torn paper strip that slides down on scroll */}
      <div
        className="fixed left-0 top-0 w-full z-[9] transition-transform duration-500 ease-in-out"
        style={{
          transform: scrolled ? 'translateY(0)' : 'translateY(-100%)',
          height: '90px',
          backgroundImage: 'url(/images/nav-texture.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          clipPath: 'polygon(0 0, 100% 0, 100% 72%, 98% 88%, 95% 74%, 92% 90%, 88% 75%, 85% 91%, 81% 76%, 77% 89%, 73% 75%, 69% 90%, 65% 76%, 61% 88%, 57% 74%, 53% 89%, 49% 75%, 45% 90%, 41% 76%, 37% 88%, 33% 74%, 29% 89%, 25% 75%, 21% 88%, 17% 74%, 13% 89%, 9% 75%, 5% 87%, 2% 73%, 0 85%)',
        }}
      />

      {/* Nav */}
      <nav className="absolute top-0 left-0 w-full flex items-center justify-between px-12 py-5 z-10">
        <p className="font-instrument-serif text-ink text-[48px] tracking-[-4.8px]">yaying.</p>
        <div className="flex gap-10 font-instrument-serif text-ink text-[36px] tracking-[-1.8px]">
          <span>work</span>
          <span>research</span>
          <span>studio</span>
          <span>about</span>
        </div>
      </nav>

      {/* Hero text */}
      <div className="absolute inset-0 flex items-center justify-center z-10 px-8">
        <div className="text-center font-instrument-serif tracking-[-2px] text-forest"
             style={{fontSize: 'clamp(2.5rem, 5.5vw, 6.25rem)', lineHeight: 1.2}}>
          <p>Systems thinking–driven</p>
          <p className="italic">product &amp; interaction designer</p>
          <p>shaping research, scattered signals,</p>
          <p>and early exploration into focused</p>
          <p><span>experiences </span><span className="italic text-sage">worth building.</span></p>
        </div>
      </div>

      {/* CTA */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-center animate-bounce-soft">
        <p className="font-instrument-serif text-[24px] tracking-[-0.72px]">See how I shape direction</p>
        <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto mt-1">
          <path d="M22.5 30.15V11.65C22.5 11.2167 22.6417 10.8583 22.925 10.575C23.2083 10.2917 23.5667 10.15 24 10.15C24.4333 10.15 24.7917 10.2917 25.075 10.575C25.3583 10.8583 25.5 11.2167 25.5 11.65V30.25L32.85 22.9C33.15 22.6 33.5 22.45 33.9 22.45C34.3 22.45 34.65 22.6 34.95 22.9C35.25 23.2 35.4 23.55 35.4 23.95C35.4 24.35 35.25 24.7 34.95 25L25 34.95C24.7 35.25 24.35 35.4 23.95 35.4C23.55 35.4 23.2 35.25 22.9 34.95L12.95 25C12.65 24.7 12.5 24.35 12.5 23.95C12.5 23.55 12.65 23.2 12.95 22.9C13.25 22.6 13.6083 22.4417 14.025 22.425C14.4417 22.4083 14.8 22.55 15.1 22.85L22.5 30.15Z" fill="#1C1B1F"/>
        </svg>
      </div>

    </div>
  );
}
