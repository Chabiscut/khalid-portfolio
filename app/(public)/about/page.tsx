import { ArrowRight, Code2, Database, Globe, Layers } from "lucide-react";

const interests = [
  {
    title: "Software Engineering",
    description:
      "Learning how to design, develop, test, and maintain reliable software systems.",
    icon: Code2,
  },
  {
    title: "Web Development",
    description:
      "Exploring modern frontend and backend technologies to build useful web applications.",
    icon: Globe,
  },
  {
    title: "Databases",
    description:
      "Working with relational databases and learning how applications manage structured data.",
    icon: Database,
  },
  {
    title: "Full-Stack Development",
    description:
      "Building knowledge across the frontend, backend, database, and deployment layers.",
    icon: Layers,
  },
];

export default function AboutPage() {
  return (
    <main className="pt-28">
      {/* Header */}
      <section className="section-padding pb-16">
        <div className="container-custom">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-gray-500">
            About Me
          </p>

          <h1 className="max-w-4xl text-5xl font-bold leading-tight tracking-[-0.04em] text-[var(--foreground)] sm:text-6xl lg:text-7xl">
            Building a strong foundation for a career in
            <span className="text-gray-400"> software engineering.</span>
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-8 text-gray-600">
            I&apos;m Ahmad Khalid Al Mujahid, a Computer Science student
            interested in software engineering and modern web development.
            I enjoy turning what I learn into practical projects and
            continuously improving my technical skills.
          </p>
        </div>
      </section>

      {/* Main introduction */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-gray-500">
                My Journey
              </p>

              <h2 className="text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
                Learning by building.
              </h2>

              <div className="mt-6 space-y-5 text-base leading-7 text-gray-600">
                <p>
                  My journey in computer science has introduced me to
                  programming, databases, web development, software
                  engineering concepts, and different areas of computer
                  science.
                </p>

                <p>
                  Through university coursework and personal projects,
                  I&apos;ve had opportunities to work with languages such
                  as C++, Java, Python, JavaScript, and PHP, along with
                  technologies such as MySQL, Git, and GitHub.
                </p>

                <p>
                  My current direction is software engineering. I&apos;m
                  particularly interested in understanding how real
                  software is planned, developed, tested, deployed, and
                  maintained.
                </p>

                <p>
                  Rather than trying to learn everything at once, I&apos;m
                  focusing on strengthening my fundamentals and gradually
                  moving toward modern full-stack development.
                </p>
              </div>
            </div>

            <div className="card h-fit p-7 sm:p-9">
              <p className="text-sm font-medium text-gray-500">
                Current focus
              </p>

              <h3 className="mt-3 text-2xl font-bold text-[var(--foreground)]">
                Software Engineering
              </h3>

              <div className="mt-7 space-y-4">
                <div className="rounded-2xl bg-gray-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Education
                  </p>
                  <p className="mt-1 font-medium text-[var(--foreground)]">
                    BSc in Computer Science
                  </p>
                </div>

                <div className="rounded-2xl bg-gray-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Direction
                  </p>
                  <p className="mt-1 font-medium text-[var(--foreground)]">
                    Software Engineering
                  </p>
                </div>

                <div className="rounded-2xl bg-gray-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Exploring
                  </p>
                  <p className="mt-1 font-medium text-[var(--foreground)]">
                    Full-Stack Development
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interests */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="mb-12">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-gray-500">
              What I&apos;m interested in
            </p>

            <h2 className="text-4xl font-bold tracking-tight text-[var(--foreground)] sm:text-5xl">
              Areas I&apos;m exploring.
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {interests.map((interest) => {
              const Icon = interest.icon;

              return (
                <div key={interest.title} className="card p-7 sm:p-8">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-black text-white">
                    <Icon size={20} />
                  </div>

                  <h3 className="mt-6 text-xl font-semibold text-[var(--foreground)]">
                    {interest.title}
                  </h3>

                  <p className="mt-3 max-w-lg text-sm leading-6 text-gray-500">
                    {interest.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding pt-0">
        <div className="container-custom">
          <div className="card flex flex-col items-start justify-between gap-6 p-8 sm:p-10 md:flex-row md:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-gray-400">
                Let&apos;s connect
              </p>

              <h2 className="mt-2 text-2xl font-bold text-[var(--foreground)] sm:text-3xl">
                Interested in working together?
              </h2>
            </div>

            <a href="/#contact" className="btn-primary">
              Get in touch
              <ArrowRight size={17} />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}