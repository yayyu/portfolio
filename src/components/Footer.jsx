export default function Footer() {
  return (
    <footer
      className="w-full flex flex-col gap-4"
      style={{ backgroundColor: '#120000', padding: '24px 64px 32px' }}
    >
      <div className="flex items-center justify-between text-white">
        <p className="font-instrument-serif text-[24px] tracking-[-2.4px]">yaying.</p>
        <div
          className="flex gap-[17px] items-center font-dm-sans font-light text-[16px] tracking-[-0.32px]"
          style={{ fontVariationSettings: "'opsz' 14" }}
        >
          <span>design</span>
          <span>research</span>
          <span>studio</span>
          <span>about</span>
        </div>
      </div>

      <div
        className="flex items-center justify-between font-dm-sans font-light text-[16px] tracking-[-0.32px] text-[#c3c3c3]"
        style={{ fontVariationSettings: "'opsz' 14" }}
      >
        <p>designed with love &nbsp;•&nbsp; vibe-coded with claude code and some coffee</p>
        <p>icons by Google Material &nbsp;•&nbsp; graphics by Icons8</p>
      </div>
    </footer>
  );
}
