export default function AboutPreview() {
  return (
    <section id="about" className="section-padding">
      <div className="container-custom">

        {/* Section Header */}
        <div className="mb-14 max-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-gray-500">
            About Me
          </p>

          <h2 className="text-4xl font-bold tracking-tight text-[var(--foreground)] sm:text-5xl">
            Turning ideas into
            <span className="text-gray-400"> software.</span>
          </h2>

          <p className="mt-5 text-lg leading-8 text-gray-600">
            I&apos;m a Computer Science student exploring software
            engineering and modern web development. I enjoy learning
            how software is designed, built, and turned into useful
            products.
          </p>
        </div>

        {/* Content */}
        <div className="grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">

          {/* Main Card */}
          <div className="card p-7 sm:p-9">

            <div className="flex items-start gap-5">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-black text-sm font-bold text-white">
                AK
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[var(--foreground)]">
                  A developer in progress
                </h3>

                <p className="mt-4 leading-7 text-gray-600">
                  My current focus is building a strong foundation in
                  software engineering, programming, databases, and
                  full-stack web development.
                </p>

                <p className="mt-4 leading-7 text-gray-600">
                  I believe the best way to learn software development
                  is by building real projects, understanding the
                  fundamentals, and continuously improving.
                </p>
              </div>

            </div>

          </div>

          {/* Quick Facts */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">

            <div className="card p-7">
              <p className="text-sm font-medium text-gray-500">
                Focus
              </p>

              <p className="mt-2 text-xl font-semibold text-[var(--foreground)]">
                Software Engineering
              </p>
            </div>

            <div className="card p-7">
              <p className="text-sm font-medium text-gray-500">
                Currently exploring
              </p>

              <p className="mt-2 text-xl font-semibold text-[var(--foreground)]">
                Full-Stack Development
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}