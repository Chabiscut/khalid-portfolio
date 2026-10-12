import Link from "next/link";
import { ArrowUpRight, FolderKanban } from "lucide-react";

import { prisma } from "@/lib/prisma";

export default async function FeaturedProjects() {
  const projects = await prisma.project.findMany({
    where: { status: "PUBLISHED" },
    orderBy: [
      { featured: "desc" },
      { sortOrder: "asc" },
      { createdAt: "desc" },
    ],
    take: 3,
    include: {
      technologies: {
        include: {
          technology: true,
        },
      },
    },
  });

  return (
    <section id="projects" className="section-padding">
      <div className="container-custom">
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-gray-500">
              Selected Work
            </p>

            <h2 className="text-4xl font-bold tracking-tight text-[var(--foreground)] sm:text-5xl">
              Things I&apos;ve built.
            </h2>
          </div>

          <p className="max-w-md text-sm leading-6 text-gray-500">
            A selection of academic and personal projects where I applied
            programming, web development, databases, and software engineering
            concepts.
          </p>
        </div>

        {projects.length === 0 ? (
          <div className="card p-10 text-center">
            <FolderKanban
              size={40}
              className="mx-auto mb-4 text-gray-400"
            />
            <h3 className="text-xl font-semibold text-[var(--foreground)]">
              Projects coming soon
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              I&apos;m preparing projects to share here.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-3">
            {projects.map((project) => (
              <article
                key={project.id}
                className="card group flex flex-col overflow-hidden"
              >
                <div className="relative flex h-56 items-center justify-center overflow-hidden bg-gray-100">
                  <div className="absolute inset-0 opacity-50">
                    <div className="h-full w-full bg-[radial-gradient(circle_at_center,_#d4d4d4_1px,_transparent_1px)] [background-size:20px_20px]" />
                  </div>

                  <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-black text-2xl font-bold text-white shadow-xl transition duration-300 group-hover:scale-110 group-hover:rotate-3">
                    {project.title.charAt(0)}
                  </div>

                  {project.featured && (
                    <span className="absolute left-4 top-4 rounded-full border border-gray-200 bg-white/90 px-3 py-1 text-xs font-medium text-gray-600 backdrop-blur">
                      Featured
                    </span>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-xl font-semibold text-[var(--foreground)]">
                    {project.title}
                  </h3>

                  <p className="mt-4 text-sm leading-6 text-gray-500">
                    {project.shortDescription}
                  </p>

                  {project.technologies.length > 0 && (
                    <div className="mt-6 flex flex-wrap gap-2">
                      {project.technologies.map(({ technology }) => (
                        <span
                          key={technology.id}
                          className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600"
                        >
                          {technology.name}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="mt-auto flex flex-wrap gap-5 border-t border-gray-100 pt-5">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--foreground)] transition hover:gap-3"
                    >
                      View project
                      <ArrowUpRight size={16} />
                    </Link>

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--foreground)] transition hover:gap-3"
                      >
                        GitHub
                        <ArrowUpRight size={16} />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <Link href="/projects" className="btn-secondary">
            View all projects
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
