import useFadeIn from '../hooks/useFadeIn';

const PX = 'px-[120px]';
const GREEN = '#4c863c';

// ─── Shared atoms ────────────────────────────────────────────────────────────

function SectionLabel({ children }) {
  return (
    <p className="font-dm-sans font-medium text-[16px] tracking-[-0.32px] uppercase text-[#93948c] leading-9" style={{ fontVariationSettings: "'opsz' 14" }}>
      {children}
    </p>
  );
}

function BigHeading({ children, className = '' }) {
  return (
    <p className={`font-dm-sans font-normal text-[64px] tracking-[-5.12px] text-ink leading-normal ${className}`} style={{ fontVariationSettings: "'opsz' 14" }}>
      {children}
    </p>
  );
}

function GreenItalic({ children }) {
  return <span className="font-instrument-serif italic tracking-[-1.28px]" style={{ color: GREEN }}>{children}</span>;
}

function HRule() {
  return <div className={`w-full max-w-[1440px] mx-auto ${PX}`}><div className="h-px w-full bg-[#c3c3c3]" /></div>;
}

function Tag({ label }) {
  return (
    <span className="font-dm-sans font-normal text-[14px] text-[#3a0b0b] tracking-[-0.28px] whitespace-nowrap rounded-full bg-[#f3ece8] px-3 py-1.5" style={{ fontVariationSettings: "'opsz' 14" }}>
      {label}
    </span>
  );
}

function Fade({ children, className = '', delay = 0 }) {
  const ref = useFadeIn();
  return (
    <div ref={ref} className={`fade-section ${className}`} style={delay ? { transitionDelay: `${delay}ms` } : {}}>
      {children}
    </div>
  );
}

// ─── Sections ─────────────────────────────────────────────────────────────────

function Hero({ onBack }) {
  return (
    <div className="bg-[#f8f8f8] w-full pt-32 pb-0">
      {/* Back */}
      <div className={`${PX} max-w-[1440px] mx-auto`}>
        <button
          onClick={onBack}
          className="font-dm-sans font-normal text-[16px] tracking-[-0.32px] text-[#93948c] flex items-center gap-2 mb-12 hover:text-ink transition-colors"
          style={{ fontVariationSettings: "'opsz' 14" }}
        >
          ← Back
        </button>
        <div className="flex flex-col gap-6 max-w-[900px]">
          <SectionLabel>Case Study</SectionLabel>
          <h1 className="font-dm-sans font-normal text-[96px] leading-none tracking-[-7px] text-ink" style={{ fontVariationSettings: "'opsz' 14" }}>
            Deserto<GreenItalic>.</GreenItalic>
          </h1>
          <p className="font-dm-sans font-light text-[20px] leading-7 tracking-[-0.4px] text-[#5d5d5d] max-w-[620px]" style={{ fontVariationSettings: "'opsz' 14" }}>
            How might we help students discover what they didn't know to look for?
          </p>
          <div className="flex flex-wrap gap-2 mt-2">
            {['Design System', 'Research Synthesis', 'Information Architecture', 'Systems Mapping', 'User Testing'].map(t => <Tag key={t} label={t} />)}
          </div>
        </div>
      </div>

      {/* Hero mockup */}
      <div className="mt-16 w-full overflow-hidden">
        <img
          src="/images/deserto/mockup-desktop.png"
          alt="Deserto desktop mockup"
          className="w-full object-cover"
          style={{ maxHeight: 600, objectPosition: 'top' }}
        />
      </div>
    </div>
  );
}

function MetaBar() {
  const items = [
    { label: 'ROLE', value: 'Design Lead' },
    { label: 'TEAM • 2 TERMS', values: [{ n: '4', sub: 'DESIGNERS' }, { n: '5', sub: 'DEVELOPERS' }, { n: '1', sub: 'PM' }] },
    { label: 'DURATION', value: '24 weeks' },
    { label: 'STATUS', value: 'Shipped' },
  ];

  return (
    <Fade className={`w-full max-w-[1440px] mx-auto ${PX} py-12 flex items-center justify-between`}>
      {/* HMW */}
      <p className="font-instrument-serif italic text-[24px] text-[#5d5d5d] w-[248px] leading-normal">
        How might we help students discover what they didn't know to look for?
      </p>

      {/* Divider + meta */}
      <div className="flex items-center gap-12">
        {/* Role */}
        <div className="flex flex-col gap-6">
          <p className="font-dm-sans font-normal text-[16px] text-[#b2a6a6] tracking-[-0.32px] leading-9" style={{ fontVariationSettings: "'opsz' 14" }}>ROLE</p>
          <p className="font-dm-sans font-medium text-[18px] text-[#7b6f6f] tracking-[-0.36px] leading-6" style={{ fontVariationSettings: "'opsz' 14" }}>Design<br />Lead</p>
        </div>

        <div className="self-stretch w-px bg-[#dfdfdf]" />

        {/* Team */}
        <div className="flex flex-col gap-6">
          <p className="font-dm-sans font-normal text-[16px] text-[#b2a6a6] tracking-[-0.32px] leading-9" style={{ fontVariationSettings: "'opsz' 14" }}>TEAM • 2 TERMS</p>
          <div className="flex gap-7 font-dm-sans font-medium text-[#7b6f6f]" style={{ fontVariationSettings: "'opsz' 14" }}>
            {[['4','DESIGNERS'],['5','DEVELOPERS'],['1','PM']].map(([n,sub]) => (
              <div key={sub} className="flex flex-col gap-4 w-[84px]">
                <p className="text-[18px] tracking-[-0.36px]">{n}</p>
                <p className="text-[14px] tracking-[-0.28px]">{sub}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="self-stretch w-px bg-[#dfdfdf]" />

        {/* Duration + Status */}
        <div className="flex gap-8">
          {[['DURATION','24 weeks'],['STATUS','Shipped']].map(([label,val]) => (
            <div key={label} className="flex flex-col gap-6 w-[84px]">
              <p className="font-dm-sans font-normal text-[16px] text-[#b2a6a6] tracking-[-0.32px] leading-9" style={{ fontVariationSettings: "'opsz' 14" }}>{label}</p>
              <p className="font-dm-sans font-medium text-[18px] text-[#7b6f6f] tracking-[-0.36px] leading-6" style={{ fontVariationSettings: "'opsz' 14" }}>{val}</p>
            </div>
          ))}
        </div>
      </div>
    </Fade>
  );
}

function Overview() {
  return (
    <Fade className={`w-full max-w-[1440px] mx-auto ${PX} flex flex-col gap-12`}>
      <SectionLabel>OVERVIEW</SectionLabel>
      <div className="relative w-full" style={{ height: 490 }}>
        {/* Polaroid */}
        <div className="absolute flex items-center justify-center" style={{ left: 683, top: 76, width: 494, height: 399, transform: 'rotate(3deg)' }}>
          <div className="bg-white rounded-[4px] shadow-[4px_4px_36px_0px_rgba(53,44,44,0.25)] flex flex-col gap-6 items-center pb-4 pt-6 px-6" style={{ width: 475 }}>
            <div className="relative overflow-hidden rounded-[2px] shadow-[inset_2px_4px_8px_0px_rgba(0,0,0,0.12)]" style={{ width: 419, height: 271 }}>
              <img src="/images/deserto/team-photo.png" alt="Team at Technigala" className="absolute inset-0 w-full h-full object-cover" />
            </div>
            <p className="font-instrument-serif italic text-[18px] text-black text-center tracking-[-0.36px] whitespace-nowrap">
              our team presented at technigala! that's me right there!
            </p>
          </div>
        </div>

        {/* Text block */}
        <div className="absolute flex flex-col gap-12 left-0 top-0 w-[743px]">
          <div className="flex flex-col gap-6 font-dm-sans font-normal text-ink text-[64px] tracking-[-5.12px]" style={{ fontVariationSettings: "'opsz' 14" }}>
            <p className="leading-normal">
              Every <GreenItalic>experience</GreenItalic> at Dartmouth.
            </p>
            <p className="leading-normal">All in one platform.</p>
          </div>
          <div className="font-dm-sans font-light text-[16px] text-ink tracking-[-0.32px] leading-6 w-[620px] whitespace-pre-wrap" style={{ fontVariationSettings: "'opsz' 14" }}>
            <p>Dartmouth invests heavily in outdoor programs, events, and rentals – but students rarely benefit. The problem wasn't that students didn't care. Information was scattered across obscure official pages, <span className="text-[#a1a1a1]">invisible</span> unless you already knew where to look.</p>
            <p className="mt-6"><span style={{ color: GREEN }}>Deserto</span> is a centralized discovery platform where students search by activity or schedule and immediately find things to do, surfacing resources that were always there, just impossible to find.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {['Design System','Research Synthesis','Information Architecture','Systems Mapping','User Testing'].map(t => <Tag key={t} label={t} />)}
          </div>
        </div>
      </div>
    </Fade>
  );
}

function Shipped() {
  const screens = [
    { img: '/images/deserto/screen-landing.png', label: 'LANDING HERO', desc: 'Search-first entry with contextual prompt suggestions. Students can act immediately or scroll into the decision funnel below.' },
    { img: '/images/deserto/screen-events.png', label: 'EVENTS GRID', desc: "Category filters and grouped card listings make it easy to browse by activity type even when you don't know what you want." },
    { img: '/images/deserto/screen-rentals.png', label: 'RENTALS', desc: "In-season carousel, search, and tag filtering surface what's available and relevant right now. Checkout flows directly from this page." },
    { img: '/images/deserto/screen-activity.png', label: 'ACTIVITY PAGE', desc: 'A cover image, structured details, and a photo carousel let the activity speak for itself — so students can easily assess and decide.' },
  ];

  return (
    <div className={`w-full max-w-[1440px] mx-auto ${PX} flex flex-col gap-16`}>
      <Fade className="flex flex-col gap-8 w-[747px]">
        <SectionLabel>SHIPPED THIS TERM</SectionLabel>
        <p className="font-dm-sans font-normal text-[64px] tracking-[-5.12px] text-ink leading-normal" style={{ fontVariationSettings: "'opsz' 14" }}>
          Deserto, redefined and<GreenItalic> alive.</GreenItalic>
        </p>
        <div className="font-dm-sans font-light text-[16px] text-ink tracking-[-0.32px] leading-6 whitespace-pre-wrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p>Deserto is a centralized discovery platform that helps Dartmouth students find outdoor activities, campus events, rentals, and eateries – all in one place. This term we launched a fully revamped design and experience, expanding well beyond what existed before. School-backed and institutionally funded, the platform is set to be introduced to incoming students as a benchmark resource for campus life at Dartmouth.</p>
        </div>
        <p className="font-dm-sans font-medium text-[16px] leading-9 underline decoration-[8%]" style={{ color: GREEN, fontVariationSettings: "'opsz' 14" }}>
          Check out the real thing →
        </p>
      </Fade>

      <div className="flex flex-wrap gap-12">
        {screens.map(({ img, label, desc }, i) => (
          <Fade key={label} className="flex flex-col gap-6 flex-1 min-w-[480px]" delay={i * 80}>
            <div className="border border-[#eaeaea] rounded-[12px] overflow-hidden w-full aspect-[480/330]">
              <img src={img} alt={label} className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col gap-5">
              <SectionLabel>{label}</SectionLabel>
              <p className="font-dm-sans font-light text-[16px] text-black tracking-[-0.32px] leading-6" style={{ fontVariationSettings: "'opsz' 14" }}>{desc}</p>
            </div>
          </Fade>
        ))}
      </div>
    </div>
  );
}

function ProjectContext() {
  return (
    <Fade className={`w-full max-w-[1440px] mx-auto ${PX} flex flex-col gap-12`}>
      <div className="flex flex-col gap-8">
        <SectionLabel>PROJECT CONTEXT</SectionLabel>
        <BigHeading>How it all <GreenItalic>started.</GreenItalic></BigHeading>
      </div>
      <div className="flex flex-col gap-16 w-[1200px]">
        <div className="font-dm-sans font-light text-[16px] text-ink tracking-[-0.32px] leading-6 whitespace-pre-wrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p>Dartmouth already had the events, the gear rentals, the outdoor programs.</p>
          <p className="mt-6">The issue is that many organizations had their own website that hosted their information. Event information was scattered in emails, random obscure college sites, and blogs. Official college resources were the same story.</p>
          <p className="mt-6" style={{ color: GREEN }}>Students couldn't discover what they didn't already know to search for.</p>
        </div>
        <div className="flex items-end justify-between">
          <img src="/images/deserto/illustration-woman.png" alt="" className="object-contain" style={{ width: 297, height: 324 }} />
          <div className="font-instrument-serif italic text-[64px] tracking-[-1.28px] text-ink text-right leading-normal w-[873px]">
            <p>How might we design a</p>
            <p>discovery platform that surfaces</p>
            <p>Dartmouth's resources to students who</p>
            <p><span style={{ color: GREEN }}>don't know</span> what they're missing?</p>
          </div>
        </div>
      </div>
    </Fade>
  );
}

function DesignProcess() {
  const steps = [
    { n: '01', title: 'Research & Synthesis', desc: 'Stakeholder interviews and systems mapping to define the real problem.' },
    { n: '02', title: 'Information architecture', desc: 'Full content structure: navigation, search taxonomy, and filter logic, before touching visual design.' },
    { n: '03', title: 'UI/UX revamp', desc: 'Ground-up rebuild of visual language and experience flows – informed by research.' },
    { n: '04', title: 'Implementation', desc: 'Engineer-ready specs with continued involvement through build to ensure fidelity.' },
  ];

  return (
    <div className={`w-full max-w-[1440px] mx-auto ${PX} flex flex-col gap-12`}>
      <Fade>
        <SectionLabel>DESIGN PROCESS</SectionLabel>
      </Fade>
      <div className="flex gap-11 items-start w-[1200px]">
        {steps.map(({ n, title, desc }, i) => (
          <Fade key={n} className="flex flex-col gap-6 flex-1" delay={i * 100}>
            <p className="font-instrument-serif text-[96px] tracking-[-1.92px] leading-normal" style={{ color: GREEN }}>{n}</p>
            <p className="font-instrument-serif text-[24px] text-ink leading-normal">{title}</p>
            <p className="font-dm-sans font-light text-[16px] text-ink tracking-[-0.32px] leading-6" style={{ fontVariationSettings: "'opsz' 14" }}>{desc}</p>
          </Fade>
        ))}
      </div>
    </div>
  );
}

function UserResearch() {
  const methods = [
    { icon: '/images/deserto/icon-grid.png', title: 'Competitive analysis', desc: 'We benchmarked existing discovery tools to understand what patterns enabled students to find campus offerings.' },
    { icon: '/images/deserto/icon-conversation.png', title: 'Stakeholder interviews', desc: 'We held semi-structured interviews with both students and higher-up staff running Dartmouth organizations.' },
    { icon: '/images/deserto/icon-tree.png', title: 'Systems mapping', desc: "We mapped the information ecosystem – surfacing why resources weren't reaching the students they were built for." },
  ];

  return (
    <div className={`w-full max-w-[1440px] mx-auto ${PX} flex flex-col gap-12`}>
      <Fade>
        <SectionLabel>USER RESEARCH</SectionLabel>
      </Fade>
      <Fade className="flex flex-col gap-6 w-[1201px]">
        <BigHeading>We thought we knew the problem.</BigHeading>
        <p className="font-instrument-serif italic text-[64px] tracking-[-1.28px] leading-normal" style={{ color: GREEN }}>Students told us otherwise.</p>
      </Fade>

      <Fade className="flex flex-col gap-8 w-full">
        <div className="flex flex-col gap-4 text-ink">
          <p className="font-dm-sans font-normal text-[24px] tracking-[-0.48px] leading-9" style={{ fontVariationSettings: "'opsz' 14" }}>Reframing our ideas</p>
          <p className="font-dm-sans font-light text-[16px] tracking-[-0.32px] leading-6" style={{ fontVariationSettings: "'opsz' 14" }}>We came in assuming awareness was the issue – that students just didn't know enough about what Dartmouth offered. Interviews told a different story. Students weren't passive or disinterested. The system was working against them.</p>
        </div>
        <div className="flex gap-6 items-center w-full">
          {methods.map(({ icon, title, desc }) => (
            <div key={title} className="flex-1 border border-[#c3c3c3] rounded-[24px] p-6 flex flex-col gap-6">
              <img src={icon} alt="" className="w-6 h-6" />
              <p className="font-dm-sans font-normal text-[24px] tracking-[-0.48px] leading-9 text-ink" style={{ fontVariationSettings: "'opsz' 14" }}>{title}</p>
              <p className="font-dm-sans font-light text-[16px] tracking-[-0.32px] leading-6 text-ink" style={{ fontVariationSettings: "'opsz' 14" }}>{desc}</p>
            </div>
          ))}
        </div>
      </Fade>

      {/* Insight synthesis */}
      <Fade className="flex flex-col gap-8 items-center w-[1201px]">
        <div className="flex flex-col gap-4 text-ink w-full">
          <p className="font-dm-sans font-normal text-[24px] tracking-[-0.48px] leading-9" style={{ fontVariationSettings: "'opsz' 14" }}>Insight synthesis</p>
          <p className="font-dm-sans font-light text-[16px] tracking-[-0.32px] leading-6" style={{ fontVariationSettings: "'opsz' 14" }}>After 18 interviews across all class years, we affinity-mapped our data to surface what was actually driving the gap between resources and students.</p>
        </div>
        <div className="flex flex-col gap-6 items-center w-[869px]">
          <div className="flex gap-[18px] items-center w-full">
            <img src="/images/deserto/affinity-map-large.png" alt="Affinity mapping" className="rounded object-cover" style={{ width: 634, height: 372 }} />
            <img src="/images/deserto/affinity-map-small.png" alt="Affinity mapping detail" className="rounded object-cover" style={{ width: 217, height: 372 }} />
          </div>
          <p className="font-dm-sans italic text-[18px] text-black tracking-[-0.72px] leading-6 w-full" style={{ fontVariationSettings: "'opsz' 14" }}>A small section of our user research mapping, pulling insights from interviews, and affinity mapping to find quick fixes for the current platform.</p>
        </div>
      </Fade>
    </div>
  );
}

function KeyFindings() {
  const stats = [
    { pct: '88%', label: 'Discovered via email', desc: "Students don't actively look – most events and things to do they found out through their email." },
    { pct: '100%', label: 'Relied on word-of-mouth', desc: "It makes sense – it's much easier to rely on someone who has already been in your shoes." },
    { pct: '100%', label: 'Prioritized schedule fit', desc: 'Students wanted to participate – but did it fit into their already busy and stressful schedules?' },
  ];

  const insights = [
    { bg: '#f6f0c2', text: '#383106', title: 'Marketing ≠ Visibility', desc: "Dartmouth was broadcasting loudly. Students still weren't receiving. The channel was broken, not the content." },
    { bg: '#d8e2cb', text: '#0c2c1b', title: 'Students trust students', desc: 'Word-of-mouth was the only reliable discovery mechanism. Any solution needed to bake in social trust.' },
    { bg: '#ebddcb', text: '#1b0f04', title: 'Availability is king', desc: "Students didn't say \"I don't want to go,\" instead, they said \"That doesn't fit my schedule.\"" },
  ];

  return (
    <div className={`w-full max-w-[1440px] mx-auto ${PX} flex flex-col gap-16`}>
      <Fade className="flex flex-col gap-8 w-[1091px]">
        <SectionLabel>KEY FINDINGS</SectionLabel>
        <BigHeading>Discovery was entirely passive:</BigHeading>
        <p className="font-instrument-serif italic text-[64px] tracking-[-1.28px] leading-normal" style={{ color: GREEN }}>email, word-of-mouth, or nothing.</p>
        <p className="font-dm-sans font-light text-[16px] text-ink tracking-[-0.32px] leading-6" style={{ fontVariationSettings: "'opsz' 14" }}>Every student out of the 18 we spoke to wanted to do more on campus. Not one said they weren't interested. The barrier was entirely structural.</p>
      </Fade>

      {/* Stats */}
      <Fade className="flex flex-col gap-4 w-full">
        <div className="flex items-center h-[300px] w-full">
          {stats.map(({ pct, label, desc }, i) => (
            <div key={pct + i} className="flex flex-col gap-8 items-center justify-center flex-1 px-6">
              <div className="flex flex-col gap-6 items-center whitespace-nowrap">
                <p className="font-instrument-serif italic text-[96px] tracking-[-1.92px] leading-normal" style={{ color: GREEN }}>{pct}</p>
                <p className="font-dm-sans font-normal text-[24px] tracking-[-0.48px] leading-9 text-ink" style={{ fontVariationSettings: "'opsz' 14" }}>{label}</p>
              </div>
              <p className="font-dm-sans font-light text-[16px] text-ink tracking-[-0.32px] leading-6 text-center" style={{ fontVariationSettings: "'opsz' 14" }}>{desc}</p>
            </div>
          ))}
        </div>

        {/* Insight cards */}
        <div className="flex items-center justify-between py-4 w-full">
          {insights.map(({ bg, text, title, desc }) => (
            <div key={title} className="flex flex-col gap-4 items-center justify-center px-8 size-[340px] text-center" style={{ backgroundColor: bg }}>
              <p className="font-instrument-serif text-[36px] leading-10 tracking-[-0.72px] w-full" style={{ color: text }}>{title}</p>
              <p className="font-dm-sans font-light text-[16px] tracking-[-0.32px] leading-6 w-full" style={{ color: text, fontVariationSettings: "'opsz' 14" }}>{desc}</p>
            </div>
          ))}
        </div>
      </Fade>

      {/* Conclusion */}
      <Fade className="flex flex-col gap-12 font-dm-sans font-normal text-ink text-center w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <div className="text-[24px] tracking-[-0.48px] leading-9 whitespace-pre-wrap">
          <p>Dartmouth wasn't failing to provide resources. It was failing to surface them.</p>
          <p>The gap between what existed and what students could find wasn't a content problem:</p>
        </div>
        <p className="text-[64px] tracking-[-5.12px] leading-normal">
          It was a <GreenItalic>discoverability problem.</GreenItalic>
        </p>
        <div className="text-[24px] tracking-[-0.48px] leading-9">
          <p>The content already existed.</p>
          <p>Our job wasn't to create new resources, it was to make existing ones discoverable.</p>
          <p>That shaped every design decision that followed.</p>
        </div>
      </Fade>
    </div>
  );
}

function DesignPrinciples() {
  const principles = [
    { tag: 'ACCESS', title: 'Schedule-aware filtering', desc: '100% of students said availability was the deciding factor. Time-based filtering was a core requirement, not a feature.' },
    { tag: 'CONSOLIDATION', title: 'One home for everything', desc: 'Events, outdoor rentals, and leisure activities, previously all scattered, now unified in one place.' },
    { tag: 'TRUST', title: 'Community built in', desc: 'Students trusted word-of-mouth above all. The platform shows social signals alongside listings.' },
    { tag: 'EXPLORATION', title: 'Browse by interest', desc: "You can't search for what you don't know exists. Browsing by interest makes the unexpected findable." },
  ];

  return (
    <Fade className={`w-full max-w-[1440px] mx-auto ${PX} flex flex-col gap-9`}>
      <div className="flex flex-col gap-4 text-ink">
        <p className="font-dm-sans font-normal text-[24px] tracking-[-0.48px] leading-9" style={{ fontVariationSettings: "'opsz' 14" }}>Design principles</p>
        <p className="font-dm-sans font-light text-[16px] tracking-[-0.32px] leading-6" style={{ fontVariationSettings: "'opsz' 14" }}>Research gave us four clear design principles. Every UI decision was to trace back to each one of these.</p>
      </div>
      <div className="flex gap-8 h-[279px] w-[1200px]">
        {principles.map(({ tag, title, desc }) => (
          <div key={tag} className="flex-1 bg-white border border-[#c3c3c3] rounded-[24px] px-6 py-12 flex flex-col gap-6">
            <p className="font-dm-sans font-medium text-[16px] tracking-[-0.32px] leading-9 uppercase" style={{ color: GREEN, fontVariationSettings: "'opsz' 14" }}>{tag}</p>
            <p className="font-instrument-serif text-[24px] text-black leading-normal">{title}</p>
            <p className="font-dm-sans font-light text-[16px] text-[#737373] tracking-[-0.32px] leading-6" style={{ fontVariationSettings: "'opsz' 14" }}>{desc}</p>
          </div>
        ))}
      </div>
    </Fade>
  );
}

function ProblemReframe() {
  return (
    <div className={`w-full max-w-[1440px] mx-auto ${PX} flex flex-col gap-12`}>
      <Fade className="flex flex-col gap-6 w-[1200px]">
        <SectionLabel>PROBLEM & PRODUCT REFRAME</SectionLabel>
        <BigHeading>We came in with one assumption.</BigHeading>
        <p className="font-instrument-serif italic text-[64px] tracking-[-1.28px] leading-normal" style={{ color: GREEN }}>Research changed everything.</p>
      </Fade>

      <Fade className="flex gap-16 items-center w-full">
        <div className="flex-1 flex flex-col gap-6 font-dm-sans font-light text-[16px] tracking-[-0.32px] text-ink" style={{ fontVariationSettings: "'opsz' 14" }}>
          <div className="leading-6 whitespace-pre-wrap">
            <p>We assumed the fix was better marketing. Students pushed back on that in every interview. They weren't hard to reach – the information just never reached them in a way that was useful.</p>
            <p className="mt-6">And so, our design challenge shifted from <em className="text-[#93948c]">how</em> do we tell students about resources to</p>
            <p className="mt-6 leading-6" />
          </div>
          <p className="font-instrument-serif text-[24px] text-ink leading-6">
            How might we build a platform for students to{' '}
            <span className="italic" style={{ color: GREEN }}>find</span>
            {' '}resources?
          </p>
        </div>

        <div className="bg-white border border-[#c3c3c3] rounded-[25px] shadow-[0px_4px_16px_0px_rgba(53,44,44,0.12)] p-8 flex flex-col gap-8 w-[516px] shrink-0">
          <div className="flex flex-col gap-4">
            <p className="font-dm-sans font-medium text-[16px] text-[#caac9a] tracking-[-0.32px] leading-9 uppercase" style={{ fontVariationSettings: "'opsz' 14" }}>BEFORE</p>
            <p className="font-instrument-serif text-[24px] text-ink leading-normal line-through">Students don't participate because they aren't aware of what's available.</p>
          </div>
          <div className="flex flex-col gap-4">
            <p className="font-dm-sans font-medium text-[16px] text-[#88a294] tracking-[-0.32px] leading-9 uppercase" style={{ fontVariationSettings: "'opsz' 14" }}>REFRAMED</p>
            <p className="font-instrument-serif text-[24px] text-black leading-normal">Students lack a centralized, trustworthy way to browse events and resources that align with their interests and schedules – causing reliance on fragmented sources that compromise engagement</p>
          </div>
        </div>
      </Fade>
    </div>
  );
}

function InformationArchitecture() {
  return (
    <div className={`w-full max-w-[1440px] mx-auto ${PX} flex flex-col items-center gap-16`}>
      <Fade className="flex flex-col gap-8 text-ink w-[1200px]">
        <p className="font-dm-sans font-normal text-[24px] tracking-[-0.48px] leading-9" style={{ fontVariationSettings: "'opsz' 14" }}>Information architecture</p>
        <div className="font-dm-sans font-light text-[16px] tracking-[-0.32px] leading-6 whitespace-pre-wrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p>Before touching a single frame, the team spent several hours auditing the existing platform – mapping every content type, user flow, and navigation path against what students actually needed. The goal was to understand where the old structure broke down and make deliberate decisions about how the new one should work.</p>
          <p className="mt-6">Key decisions included how to categorize content that spans multiple types, where schedule filtering lived in the hierarchy, how the rentals flow worked end-to-end across cart, waiver, and inventory states, and how admin and student-facing views related to each other.</p>
        </div>
      </Fade>

      <Fade className="flex flex-col gap-6 w-[960px]">
        <div className="bg-white rounded-[16px] flex items-center justify-between px-10 overflow-hidden" style={{ aspectRatio: '920/374' }}>
          <img src="/images/deserto/ia-tree-1.png" alt="IA tree mapping" className="object-contain" style={{ width: 424, height: 394 }} />
          <img src="/images/deserto/ia-tree-2.png" alt="IA tree mapping 2" className="object-contain" style={{ width: 471, height: 309 }} />
        </div>
        <p className="font-dm-sans italic text-[18px] text-black text-center tracking-[-0.72px] leading-6 whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          Some early ideations from our tree mapping activity I facilitated with my entire team— developers included.
        </p>
      </Fade>

      <Fade className="flex flex-col gap-6 w-[960px]">
        <img src="/images/deserto/ia-sitemap.png" alt="User flows and sitemaps" className="w-full rounded-[16px] object-cover" />
        <p className="font-dm-sans italic text-[18px] text-black tracking-[-0.72px] leading-6" style={{ fontVariationSettings: "'opsz' 14" }}>
          Simplified version of user flows and sitemaps that we created during the discussion.
        </p>
      </Fade>
    </div>
  );
}

function DesignRevamp() {
  const before = [
    { icon: '/images/deserto/icon-question.png', title: 'No search or immediate CTA', desc: 'The hero was an animated image scroll with a logo. Students had no way to act immediately – no search bar, no entry point beyond scrolling down.' },
    { icon: '/images/deserto/icon-hand.png', title: 'Too much telling, not much doing', desc: "Sections like \"Facilities at Dartmouth\" described what existed rather than letting students interact with it directly. See more's action was visually ambiguous." },
    { icon: '/images/deserto/icon-visibility.png', title: 'Unreliable text handling in photo-heavy components', desc: 'Different photos have varying levels of brightness. This version of text handling was unreliable and not accessibility-friendly.' },
    { icon: '/images/deserto/icon-cognition.png', title: 'Explore section was overwhelming', desc: 'The dark explore section surfaced every category at once in a dense grid with no hierarchy – creating choice paralysis instead of enabling discovery.' },
    { icon: '/images/deserto/icon-phone.png', title: 'Visual language felt outdated', desc: 'The inconsistent type scale, muted palette, and mixed layout patterns didn\'t feel cohesive or polished.' },
  ];

  const after = [
    { icon: '/images/deserto/icon-question-2.png', title: 'Search-first entry', desc: 'A prominent search bar with contextual prompt suggestions replaced the passive homepage – enabling students to act immediately if they choose to do so.' },
    { icon: '/images/deserto/icon-hand-2.png', title: 'Progressive decision funnel', desc: "Each section is a fallback – Explore by category, then Upcoming Events, then What's Popular. Students finds something regardless of how specific their intent is." },
    { icon: '/images/deserto/icon-visibility-2.png', title: 'Focused navigation', desc: 'Five clear top-level sections – Experiences, Events, Eateries, Rentals, Facilities – replaced the sprawling Explore dropdown grid.' },
    { icon: '/images/deserto/icon-phone-2.png', title: 'Cohesive visual system', desc: 'A clean, consistent design language built on strong typography, rich photography, and a component library designed for engineer handoff.' },
  ];

  function IssueCard({ icon, title, desc, variant }) {
    const iconBg = variant === 'before' ? '#f3e6de' : '#d9e4de';
    return (
      <div className="bg-white border border-[#dfdfdf] rounded-[16px] flex gap-6 items-start p-6 w-full">
        <div className="rounded-[8px] p-1 shrink-0" style={{ backgroundColor: iconBg }}>
          <img src={icon} alt="" className="w-5 h-5" />
        </div>
        <div className="flex flex-col gap-[18px] pt-1">
          <p className="font-dm-sans font-medium text-[18px] text-ink tracking-[-0.72px] leading-6" style={{ fontVariationSettings: "'opsz' 14" }}>{title}</p>
          <p className="font-dm-sans font-light text-[16px] text-ink tracking-[-0.32px] leading-6" style={{ fontVariationSettings: "'opsz' 14" }}>{desc}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full max-w-[1440px] mx-auto ${PX} flex flex-col gap-16 items-center`}>
      <Fade className="flex flex-col gap-8 w-[1200px]">
        <SectionLabel>THE DESIGN REVAMP</SectionLabel>
        <p className="font-dm-sans font-normal text-[24px] text-ink tracking-[-0.48px] leading-9" style={{ fontVariationSettings: "'opsz' 14" }}>The revamp: visuals, structure, and experience</p>
        <div className="font-dm-sans font-light text-[16px] text-ink tracking-[-0.32px] leading-6 whitespace-pre-wrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p>The existing design gave us a clear picture of where to go next. Eight semi-structured user testing sessions surfaced what wasn't working – visual choices that felt dated, navigation patterns that confused students, and a structure that buried the content it was meant to surface.</p>
          <p className="mt-6">The platform we inherited had the right content – but the design was working against discovery rather than enabling it.</p>
        </div>
      </Fade>

      {/* What we inherited */}
      <Fade className="flex flex-col gap-6 w-[1100px]">
        <SectionLabel>WHAT WE INHERITED</SectionLabel>
        <div className="flex gap-16 items-start justify-center w-full">
          <img src="/images/deserto/design-old.png" alt="Old Deserto design" className="border border-[#dfdfdf] rounded-[12px] object-cover shrink-0" style={{ width: 400, height: 971 }} />
          <div className="flex flex-col gap-16 flex-1">
            {before.map(p => <IssueCard key={p.title} {...p} variant="before" />)}
          </div>
        </div>
      </Fade>

      {/* What we shipped */}
      <Fade className="flex flex-col gap-6 w-[1100px]">
        <SectionLabel>WHAT WE SHIPPED</SectionLabel>
        <div className="flex gap-16 items-start justify-center w-full">
          <div className="flex flex-col gap-16 flex-1">
            {after.map(p => <IssueCard key={p.title} {...p} variant="after" />)}
          </div>
          <img src="/images/deserto/design-new.png" alt="New Deserto design" className="border border-[#dfdfdf] rounded-[12px] object-cover shrink-0" style={{ width: 400, height: 774 }} />
        </div>
      </Fade>
    </div>
  );
}

function DecisionFunnel() {
  const steps = [
    { n: '1', tag: 'HERO', title: 'Know what you want? Search it.', desc: 'A prominent smart search with contextual prompt suggestions gets students to act immediately. If you already have something in mind, you\'ll get to where you want through a few taps on the keyboard.' },
    { n: '2', tag: 'EXPLORE', title: 'Not sure? Browse by category.', desc: "Experiences (trails, water, snow, sports, indoors), Events, and Eateries nearby – three clear entry points that let students narrow by the type of thing they're in the mood for, without already knowing the specific activity." },
    { n: '3', tag: 'UPCOMING EVENTS', title: "Want something time-bound? Here's what's coming up.", desc: "For students who respond to deadlines – surfacing events that are happening soon gives a reason to act now rather than come back later." },
    { n: '4', tag: "WHAT'S POPULAR", title: 'Still undecided? See what other Dartmouth students have been up to.', desc: 'Popularity signals tap into the word-of-mouth trust that research surfaced – if other students found it worth doing, it reduces the friction of trying something new.' },
  ];

  return (
    <Fade className={`w-full max-w-[1440px] mx-auto ${PX} flex flex-col gap-16`}>
      <div className="flex flex-col gap-8 w-[1200px]">
        <SectionLabel>WHERE IT ALL COMES TOGETHER</SectionLabel>
        <p className="font-instrument-serif text-[64px] tracking-[-1.28px] text-ink leading-normal">
          The landing page as a <span className="italic" style={{ color: GREEN }}>decision funnel</span>
        </p>
      </div>

      <div className="flex gap-12 items-start px-16 w-full">
        <img src="/images/deserto/timeline-bar.png" alt="" className="shrink-0 object-contain" style={{ width: 24, height: 886 }} />
        <div className="flex flex-col gap-24 flex-1">
          {steps.map(({ n, tag, title, desc }, i) => (
            <div key={n} className="flex flex-col gap-5">
              <p className="font-instrument-serif text-[96px] tracking-[-1.92px] leading-none text-[#c3c3c3]">{n}</p>
              <p className="font-dm-sans font-medium text-[16px] tracking-[-0.32px] leading-9 uppercase text-[#88a294]" style={{ fontVariationSettings: "'opsz' 14" }}>{tag}</p>
              <p className="font-instrument-serif text-[24px] text-ink leading-normal">{title}</p>
              <p className="font-dm-sans font-light text-[16px] text-ink tracking-[-0.32px] leading-6" style={{ fontVariationSettings: "'opsz' 14" }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </Fade>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Deserto({ onBack }) {
  return (
    <div className="bg-[#f8f8f8] w-full">
      <Hero onBack={onBack} />

      <div className="flex flex-col gap-16 py-12">
        <MetaBar />
        <HRule />
        <Overview />
        <HRule />
        <Shipped />
        <HRule />
        <ProjectContext />
        <HRule />
        <DesignProcess />
        <HRule />
        <UserResearch />
        <HRule />
        <KeyFindings />
        <DesignPrinciples />
        <HRule />
        <ProblemReframe />
        <HRule />
        <InformationArchitecture />
        <HRule />
        <DesignRevamp />
        <HRule />
        <DecisionFunnel />
      </div>
    </div>
  );
}
