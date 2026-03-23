export default function About() {
  return (
    <section className="w-full bg-[#f8f8f8]" style={{ padding: '48px 0 80px' }}>
      <div
        className="flex items-center gap-8 mx-auto"
        style={{ maxWidth: 1125, padding: '0 24px' }}
      >
        {/* Text */}
        <div className="flex-1 font-instrument-serif text-[36px] tracking-[-0.72px] text-ink text-center leading-normal whitespace-pre-wrap">
          <p>Curiosity first. Systems thinking after.</p>
          <p>&nbsp;</p>
          <p>Making things look good somewhere in between.</p>
          <p>&nbsp;</p>
          <p>I'm YaYing — nice to meet you!</p>
        </div>

        {/* Polaroid stack */}
        <div className="relative shrink-0" style={{ width: 459, height: 455 }}>
          {/* Back card — rotated +3° */}
          <div
            className="absolute flex items-center justify-center"
            style={{ left: 0.2, top: 46, width: 383, height: 406, transform: 'rotate(3deg)' }}
          >
            <div className="bg-white rounded-[2px] shadow-[4px_4px_36px_0px_rgba(53,44,44,0.25)] flex flex-col gap-6 items-center justify-center p-6" style={{ width: 363 }}>
              <div className="bg-gray-200 rounded-[2px] w-full animate-pulse" style={{ aspectRatio: '363/311' }} />
              <p className="font-instrument-serif italic text-[18px] text-center tracking-[-0.36px] text-ink whitespace-nowrap">
                beautiful coffee shop in foshan, guangdong!<br />and that's me!
              </p>
            </div>
          </div>

          {/* Front card — rotated -7.21° */}
          <div
            className="absolute flex items-center justify-center"
            style={{ left: 50, top: 0, width: 409, height: 431, transform: 'rotate(-7.21deg)' }}
          >
            <div className="bg-white rounded-[2px] shadow-[4px_4px_36px_0px_rgba(53,44,44,0.25)] flex flex-col gap-6 items-center justify-center p-6" style={{ width: 363 }}>
              <div className="bg-gray-200 rounded-[2px] animate-pulse" style={{ width: 315, height: 270 }} />
              <p className="font-instrument-serif italic text-[18px] text-center tracking-[-0.36px] text-ink whitespace-pre">
                {`my guilty pleasure: claw machines \n& my winnings from a lucky day!`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
