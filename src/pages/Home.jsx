export default function Home() {
  return (
    <div className="bg-[#fffdf9] relative min-h-screen w-full overflow-hidden">
      {/* Nav */}
      <nav className="absolute top-0 left-0 w-full flex items-center justify-between px-12 py-5">
        <p className="font-instrument-serif text-[#120000] text-[48px] tracking-[-4.8px]">yaying.</p>
        <div className="flex gap-10 font-instrument-serif text-[#120000] text-[36px] tracking-[-1.8px]">
          <span>work</span>
          <span>research</span>
          <span>studio</span>
          <span>about</span>
        </div>
      </nav>
      {/* Hero text */}
      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[1265px] text-center font-instrument-serif text-[100px] leading-[120px] tracking-[-2px] text-[#15261d] whitespace-pre-wrap">
        <p>Systems thinking–driven </p>
        <p className="italic">product & interaction designer</p>
        <p>
          <span>shaping research, scattered signals, and early exploration into focused experiences </span>
          <span className="italic text-[#78b299]">worth building.</span>
        </p>
      </div>
      {/* Paper balls */}
      <div className="absolute" style={{left: 921, top: 600, transform: 'rotate(-69.17deg)'}}>
        <img src="/images/paper-ball.png" alt="" style={{mixBlendMode: 'multiply'}} className="w-[343px] h-[343px] rounded-full shadow-[4px_4px_36px_0px_rgba(53,44,44,0.5)]" />
      </div>
      <div className="absolute" style={{left: 204, top: 512, transform: 'rotate(47.11deg)'}}>
        <img src="/images/paper-ball.png" alt="" style={{mixBlendMode: 'multiply'}} className="w-[343px] h-[343px] rounded-full shadow-[4px_4px_36px_0px_rgba(53,44,44,0.5)]" />
      </div>
      <div className="absolute" style={{left: 577, top: 131, transform: 'rotate(-124.39deg)'}}>
        <img src="/images/paper-ball.png" alt="" style={{mixBlendMode: 'multiply'}} className="w-[343px] h-[343px] rounded-full shadow-[4px_4px_36px_0px_rgba(53,44,44,0.5)]" />
      </div>
      <div className="absolute" style={{left: -46, top: 0, transform: 'rotate(-50.32deg)'}}>
        <img src="/images/paper-ball.png" alt="" style={{mixBlendMode: 'multiply'}} className="w-[343px] h-[343px] rounded-full shadow-[4px_4px_36px_0px_rgba(53,44,44,0.5)]" />
      </div>
      {/* CTA */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-12 text-center">
        <p className="font-instrument-serif text-[36px] tracking-[-0.72px]">See how I shape direction</p>
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto mt-2">
          <path d="M22.5 30.15V11.65C22.5 11.2167 22.6417 10.8583 22.925 10.575C23.2083 10.2917 23.5667 10.15 24 10.15C24.4333 10.15 24.7917 10.2917 25.075 10.575C25.3583 10.8583 25.5 11.2167 25.5 11.65V30.25L32.85 22.9C33.15 22.6 33.5 22.45 33.9 22.45C34.3 22.45 34.65 22.6 34.95 22.9C35.25 23.2 35.4 23.55 35.4 23.95C35.4 24.35 35.25 24.7 34.95 25L25 34.95C24.7 35.25 24.35 35.4 23.95 35.4C23.55 35.4 23.2 35.25 22.9 34.95L12.95 25C12.65 24.7 12.5 24.35 12.5 23.95C12.5 23.55 12.65 23.2 12.95 22.9C13.25 22.6 13.6083 22.4417 14.025 22.425C14.4417 22.4083 14.8 22.55 15.1 22.85L22.5 30.15Z" fill="#1C1B1F"/>
        </svg>
      </div>
    </div>
  );
}
