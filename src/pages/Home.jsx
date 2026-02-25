const imgImage1 = "https://www.figma.com/api/mcp/asset/6bd8e3aa-8c0c-4f1b-b74d-90b10e642054";
const imgArrowDownwardAlt = "https://www.figma.com/api/mcp/asset/55494f15-cb1a-40d5-ad5d-3db55f9cbdad";
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
        <img src={imgImage1} alt="" className="w-[343px] h-[343px] rounded-full shadow-[4px_4px_36px_0px_rgba(53,44,44,0.5)]" />
      </div>
      <div className="absolute" style={{left: 204, top: 512, transform: 'rotate(47.11deg)'}}>
        <img src={imgImage1} alt="" className="w-[343px] h-[343px] rounded-full shadow-[4px_4px_36px_0px_rgba(53,44,44,0.5)]" />
      </div>
      <div className="absolute" style={{left: 577, top: 131, transform: 'rotate(-124.39deg)'}}>
        <img src={imgImage1} alt="" className="w-[343px] h-[343px] rounded-full shadow-[4px_4px_36px_0px_rgba(53,44,44,0.5)]" />
      </div>
      <div className="absolute" style={{left: -46, top: 0, transform: 'rotate(-50.32deg)'}}>
        <img src={imgImage1} alt="" className="w-[343px] h-[343px] rounded-full shadow-[4px_4px_36px_0px_rgba(53,44,44,0.5)]" />
      </div>
      {/* CTA */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-12 text-center">
        <p className="font-instrument-serif text-[36px] tracking-[-0.72px]">See how I shape direction</p>
        <img src={imgArrowDownwardAlt} alt="" className="w-[48px] h-[48px] mx-auto mt-2" />
      </div>
    </div>
  );
}
