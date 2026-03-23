import { useRef } from 'react';

export default function Home({ onTextEnter }) {
  const textRef = useRef(null);

  return (
    <div className="bg-[#f8f8f8] relative h-screen w-full">

      {/* Hero text */}
      <div className="absolute inset-0 flex items-center justify-center z-10 px-8">
        <div
          ref={textRef}
          className="text-center font-instrument-serif tracking-[-2px] text-forest"
          style={{ fontSize: 'clamp(2.5rem, 5.5vw, 6.25rem)', lineHeight: 1.2 }}
          onMouseEnter={() => onTextEnter?.(textRef.current.getBoundingClientRect())}
        >
          <p>Systems thinking–driven</p>
          <p className="italic">product &amp; interaction designer</p>
          <p>shaping research, scattered signals,</p>
          <p>and early exploration into focused</p>
          <p><span>experiences </span><span className="italic text-sage">worth building.</span></p>
        </div>
      </div>

      {/* Name */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-10 text-center flex flex-col gap-1">
        <p className="font-instrument-serif text-[48px] tracking-[-0.96px] text-ink leading-normal">YaYing Yu</p>
        <p className="font-dm-sans font-normal text-[20px] tracking-[-0.8px] text-ink" style={{ fontVariationSettings: "'opsz' 14" }}>Designing at DALI Lab</p>
      </div>

    </div>
  );
}
