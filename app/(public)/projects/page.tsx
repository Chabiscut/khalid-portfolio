import Link from "next/link";
import { ArrowUpRight, FolderKanban } from "lucide-react";

import { prisma } from "@/lib/prisma";

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    where: {
      status: "PUBLISHED",
    },
    orderBy: [
      {
        featured: "desc",
      },
      {
        sortOrder: "asc",
      },
      {
        createdAt: "desc",
      },
    ],
    include: {
      technologies: {
        include: {
          technology: true,
        },
      },
      images: {
        orderBy: {
          sortOrder: "asc",
        },
        take: 1,
      },
    },
  });

  return (
    <main className="min-h-screen px-6 py-24">
      <div className="container-custom">

        {/* Header */}
        <div className="mb-14 max-w-3xl">
          <p className="text-sm font-medium text-muted-foreground">
            Portfolio
          </p>

          <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">
            Projects
          </h1>

          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            A collection of projects, applications, and software
            work that I have built.
          </p>
        </div>

        {/* Empty State */}
        {projects.length === 0 ? (
          <div className="card p-12 text-center">
            <FolderKanban
              size={40}
              className="mx-auto mb-5 text-muted-foreground"
            />

            <h2 className="text-2xl font-semibold">
              No projects yet
            </h2>

            <p className="mx-auto mt-3 max-w-md text-muted-foreground">
              Projects will appear here once they are added
              and published.
            </p>
          </div>
        ) : (
          /* Projects */
          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((project) => {
              const image = project.images[0];

              return (
                <article
                  key={project.id}
                  className="card group overflow-hidden"
                >
                  {/* Project Image */}
                  {image ? (
                    <div className="aspect-video overflow-hidden bg-muted">
                      <img
                        src={image.url}
                        alt={image.alt || project.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  ) : (
                    <div className="flex aspect-video items-center justify-center bg-muted">
                      <FolderKanban
                        size={40}
                        className="text-muted-foreground"
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-6">

                    {/* Featured */}
                    {project.featured && (
                      <span className="mb-4 inline-flex rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-600 dark:text-blue-400">
                        Featured
                      </span>
                    )}

                    <h2 className="text-2xl font-semibold tracking-tight">
                      {project.title}
                    </h2>

                    <p className="mt-3 leading-7 text-muted-foreground">
                      {project.shortDescription}
                    </p>

                    {/* Technologies */}
                    {project.technologies.length > 0 && (
                      <div className="mt-5 flex flex-wrap gap-2">
                        {project.technologies.map(
                          ({ technology }) => (
                            <span
                              key={technology.id}
                              className="rounded-lg border border-border bg-muted/40 px-3 py-1.5 text-xs font-medium"
                            >
                              {technology.name}
                            </span>
                          )
                        )}
                      </div>
                    )}

                    {/* View Project */}
                    <Link
                      href={`/projects/${project.slug}`}
                      className="mt-6 inline-flex items-center gap-2 text-sm font-medium hover:underline"
                    >
                      View Project
                      <ArrowUpRight size={16} />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}