const skills = [
  {
    name: "C++",
    category: "Programming",
  },
  {
    name: "Java",
    category: "Programming",
  },
  {
    name: "Python",
    category: "Programming",
  },
  {
    name: "JavaScript",
    category: "Web",
  },
  {
    name: "HTML",
    category: "Web",
  },
  {
    name: "CSS",
    category: "Web",
  },
  {
    name: "PHP",
    category: "Backend",
  },
  {
    name: "MySQL",
    category: "Database",
  },
  {
    name: "Git",
    category: "Tools",
  },
  {
    name: "GitHub",
    category: "Tools",
  },
];

export default function SkillsPreview() {
  return (
    <section id="skills" className="section-padding bg-gray-50">
      <div className="container-custom">

        {/* Header */}
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">

          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-gray-500">
              Skills
            </p>

            <h2 className="text-4xl font-bold tracking-tight text-[var(--foreground)] sm:text-5xl">
              Tools I work with.
            </h2>
          </div>

          <p className="max-w-md text-sm leading-6 text-gray-500">
            A growing collection of programming languages,
            technologies, and development tools I&apos;ve worked with
            through coursework and projects.
          </p>

        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">

          {skills.map((skill) => (
            <div
              key={skill.name}
              className="card group p-5 transition hover:-translate-y-1"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-sm font-bold text-gray-700 transition group-hover:bg-black group-hover:text-white">
                {skill.name.charAt(0)}
              </div>

              <h3 className="mt-5 font-semibold text-[var(--foreground)]">
                {skill.name}
              </h3>

              <p className="mt-1 text-xs text-gray-500">
                {skill.category}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}