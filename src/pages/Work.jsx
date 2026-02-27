const projects = [
  {
    name: 'Deserto',
    subtitle: 'Dartmouth Resources Platform',
    description: 'How might we centralize campus experiences into one platform to enable students to easily find opportunities that align with their interests, schedules, and budgets?',
    tags: ['Figma', 'UI/UX', 'Product', 'User Research', 'User Testing'],
  },
  {
    name: 'ZebraMD',
    subtitle: 'Disease Diagnostics Dashboard',
    description: 'How might we centralize campus experiences into one platform to enable students to easily find opportunities that align with their interests, schedules, and budgets?',
    tags: ['Figma', 'UI/UX', 'Product', 'User Research', 'User Testing'],
  },
  {
    name: 'Project Three',
    subtitle: 'Subtitle Here',
    description: 'How might we centralize campus experiences into one platform to enable students to easily find opportunities that align with their interests, schedules, and budgets?',
    tags: ['Figma', 'UI/UX', 'Product'],
  },
  {
    name: 'Project Four',
    subtitle: 'Subtitle Here',
    description: 'How might we centralize campus experiences into one platform to enable students to easily find opportunities that align with their interests, schedules, and budgets?',
    tags: ['Figma', 'UI/UX', 'Product', 'User Research'],
  },
];

function ProjectCard({ project }) {
  return (
    <div
      style={{
        width: '100%',
        backgroundColor: '#ffffff',
        borderRadius: 16,
        boxShadow: '0px 4px 16px rgba(0,0,0,0.12)',
        overflow: 'hidden',
      }}
    >
      {/* Placeholder image — fixed 333px height matching Figma spec */}
      <div className="bg-gray-200 animate-pulse h-[333px]" />

      {/* Card info */}
      <div
        style={{
          borderTop: '1px solid #868686',
          padding: '24px 32px',
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
        }}
      >
        {/* Title block */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <p className="font-instrument-serif text-[36px] tracking-[-0.72px] text-ink">
            {project.name}
          </p>
          <p className="font-instrument-serif text-[24px] tracking-[-0.48px] text-ink italic">
            {project.subtitle}
          </p>
          <p className="font-instrument-serif text-[18px] tracking-[-0.36px] text-ink">
            {project.description}
          </p>
        </div>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          {project.tags.map((tag) => (
            <span
              key={tag}
              style={{
                backgroundColor: '#f3ece8',
                borderRadius: 100,
                padding: '6px 12px',
              }}
              className="font-instrument-serif text-[16px] text-[#3a0b0b]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Work() {
  return (
    <section
      className="w-full"
      style={{ backgroundColor: '#f9f9f9', paddingTop: 120, paddingBottom: 120 }}
    >
      <div style={{ maxWidth: 1102, margin: '0 auto' }}>
        <h2 className="font-instrument-serif text-ink text-[64px] tracking-[-1.28px] text-center mb-12">
          Selected works
        </h2>

        <div className="grid grid-cols-2" style={{ gap: 48 }}>
          {projects.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
