export default function Contact() {
  return (
    <section className="w-full bg-white flex flex-col items-center gap-6" style={{ padding: '48px 0' }}>
      <p
        className="font-dm-sans font-medium text-[18px] tracking-[-0.36px] text-ink text-center"
        style={{ fontVariationSettings: "'opsz' 14" }}
      >
        LET'S CONNECT
      </p>

      <p className="font-instrument-serif text-[48px] tracking-[-0.96px] text-ink text-center leading-normal">
        Got something{' '}
        <span className="italic" style={{ color: '#61a185' }}>worth building?</span>
      </p>

      <div className="flex items-center gap-6">
        <a
          href="mailto:yayyu.design@gmail.com"
          className="flex items-center gap-3 font-dm-sans font-light text-[24px] tracking-[-0.48px] text-[#3a3a3a] underline"
          style={{ fontVariationSettings: "'opsz' 14" }}
        >
          <span className="text-[32px]">✉</span>
          yayyu.design@gmail.com
        </a>

        <span
          className="font-dm-sans font-light italic text-[24px] text-[#3a3a3a]"
          style={{ fontVariationSettings: "'opsz' 14" }}
        >
          •
        </span>

        <a
          href="https://linkedin.com/in/yaying-yu"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-3 font-dm-sans font-light text-[24px] tracking-[-0.48px] text-[#3a3a3a] underline"
          style={{ fontVariationSettings: "'opsz' 14" }}
        >
          <span className="text-[32px]">in</span>
          linkedin.com/in/yaying-yu
        </a>
      </div>
    </section>
  );
}
