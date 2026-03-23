const TAG_STYLE = {
  backgroundColor: '#f3ece8',
  borderRadius: 100,
  padding: '6px 12px',
};

function Tag({ label }) {
  return (
    <span className="font-dm-sans font-normal text-[14px] text-[#3a0b0b] tracking-[-0.28px] whitespace-nowrap" style={{ ...TAG_STYLE, fontVariationSettings: "'opsz' 14" }}>
      {label}
    </span>
  );
}

function DesertCard() {
  return (
    <div className="bg-white rounded-[16px] shadow-[0px_4px_12px_0px_rgba(0,0,0,0.16)] overflow-hidden flex flex-col" style={{ height: 540 }}>
      {/* Photo placeholder */}
      <div className="flex-1 bg-gray-100 animate-pulse min-h-0" />

      {/* Info */}
      <div className="flex flex-col justify-between border-t border-[#868686]" style={{ height: 256, padding: '16px 24px 24px' }}>
        <div className="flex flex-col gap-4">
          <div>
            <p className="font-instrument-serif text-[36px] tracking-[-0.72px] text-ink leading-normal">Deserto</p>
            <p className="font-instrument-serif italic text-[24px] tracking-[-0.48px] leading-6 text-[#6a5959]">
              Centralized platform for Dartmouth students to find experiences that fit their schedule and interests
            </p>
          </div>
          <div className="flex flex-col gap-2 font-dm-sans font-normal text-ink" style={{ fontVariationSettings: "'opsz' 14" }}>
            <p className="text-[16px] tracking-[-0.32px]">Design Lead • 7-person team • 24 weeks</p>
            <p className="text-[14px] tracking-[-0.28px]">
              Led a full design revamp (UI/UX) across a cross-functional team. Drove research (stakeholder interviews, competitive analysis) and rebrand to deliver engineer-ready specs, staying involved through implementation to ensure fidelity
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {['Design System', 'Research Synthesis', 'Information Architecture', 'Systems Mapping', 'User Testing'].map(t => <Tag key={t} label={t} />)}
        </div>
      </div>
    </div>
  );
}

function SmallCard({ name, subtitle, description, tags }) {
  return (
    <div className="bg-white rounded-[16px] shadow-[0px_4px_12px_0px_rgba(0,0,0,0.16)] overflow-hidden flex flex-col flex-1" style={{ height: 540 }}>
      {/* Photo placeholder */}
      <div className="flex-1 bg-gray-100 animate-pulse min-h-0" />

      {/* Info */}
      <div className="flex flex-col justify-between border-t border-[#868686]" style={{ height: 256, padding: '16px 24px 24px' }}>
        <div className="flex flex-col gap-3">
          <div>
            <p className="font-instrument-serif text-[36px] tracking-[-0.72px] text-ink leading-normal">{name}</p>
            <p className="font-instrument-serif italic text-[20px] tracking-[-0.4px] leading-6 text-[#6a5959]">{subtitle}</p>
          </div>
          <p className="font-dm-sans font-normal text-[14px] tracking-[-0.28px] text-ink" style={{ fontVariationSettings: "'opsz' 14" }}>
            {description}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map(t => <Tag key={t} label={t} />)}
        </div>
      </div>
    </div>
  );
}

export default function Work() {
  return (
    <section className="w-full bg-[#f8f8f8]" style={{ paddingTop: 80, paddingBottom: 80 }}>
      <div style={{ maxWidth: 942, margin: '0 auto', padding: '0 24px' }}>
        <h2 className="font-instrument-serif text-ink text-[64px] tracking-[-1.28px] text-center mb-8">
          Selected works
        </h2>

        <div className="flex flex-col gap-12">
          {/* Full-width card */}
          <DesertCard />

          {/* Two half-width cards */}
          <div className="flex gap-12">
            <SmallCard
              name="ZebraMD"
              subtitle="AI-powered rare disease diagnostic dashboard"
              description="Designed ground-up from competitive analysis to a shipped, implemented product — bringing clarity to a complex AI health platform navigated by both patients and clinicians"
              tags={['Figma', 'UI/UX', 'Health', 'Artificial Intelligence']}
            />
            <SmallCard
              name="IDEAs Lab"
              subtitle="Spatial redesign of Dartmouth's multimedia lab"
              description="Redesigned a physical multimedia lab space through competitive analysis, workshops, and floor planning — delivering a report that triggered an architect-led feasibility study at Dartmouth"
              tags={['Spatial', 'User Research', 'Prototyping']}
            />
          </div>
        </div>

        {/* See more projects */}
        <div className="flex justify-center mt-12">
          <button
            className="flex items-center gap-1 bg-[#f5ecec] rounded-full pl-4 pr-6 py-3"
            style={{ cursor: 'pointer', border: 'none' }}
          >
            <span className="text-[20px] leading-none text-ink">+</span>
            <p className="font-dm-sans font-normal text-[20px] tracking-[-0.8px] text-ink" style={{ fontVariationSettings: "'opsz' 14" }}>
              See more projects
            </p>
          </button>
        </div>
      </div>
    </section>
  );
}
