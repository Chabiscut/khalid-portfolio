import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  ExternalLink,
  FolderKanban,
} from "lucide-react";

import { prisma } from "@/lib/prisma";

type ProjectDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { slug } = await params;

  const project = await prisma.project.findUnique({
    where: {
      slug,
    },
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
      },
    },
  });

  if (!project || project.status !== "PUBLISHED") {
    notFound();
  }

  return (
    <main className="min-h-screen px-6 py-24">
      <div className="container-custom">

        {/* Back to Projects */}
        <Link
          href="/projects"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft size={16} />
          Back to Projects
        </Link>

        {/* Header */}
        <div className="mb-12 max-w-4xl">
          <div className="flex flex-wrap items-center gap-3">
            {project.featured && (
              <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-600 dark:text-blue-400">
                Featured
              </span>
            )}

            <span className="rounded-full border border-border px-3 py-1 text-xs font-medium">
              Published
            </span>
          </div>

          <h1 className="mt-5 text-4xl font-bold tracking-tight md:text-6xl">
            {project.title}
          </h1>

          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            {project.shortDescription}
          </p>
        </div>

        {/* Project Images */}
        {project.images.length > 0 ? (
          <div className="mb-16 grid gap-6 md:grid-cols-2">
            {project.images.map((image, index) => (
              <div
                key={image.id}
                className={`overflow-hidden rounded-2xl border border-border bg-muted ${
                  index === 0 ? "md:col-span-2" : ""
                }`}
              >
                <img
                  src={image.url}
                  alt={image.alt || project.title}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="mb-16 flex aspect-video items-center justify-center rounded-2xl border border-border bg-muted">
            <FolderKanban
              size={56}
              className="text-muted-foreground"
            />
          </div>
        )}

        {/* Main Content */}
        <div className="grid gap-12 lg:grid-cols-[1fr_320px]">

          {/* Description */}
          <section>
            <h2 className="text-2xl font-semibold">
              About the Project
            </h2>

            <div className="mt-5 whitespace-pre-line text-base leading-8 text-muted-foreground">
              {project.description}
            </div>
          </section>

          {/* Sidebar */}
          <aside className="space-y-8">

            {/* Technologies */}
            {project.technologies.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold">
                  Technologies
                </h2>

                <div className="mt-4 flex flex-wrap gap-2">
                  {project.technologies.map(
                    ({ technology }) => (
                      <span
                        key={technology.id}
                        className="rounded-lg border border-border bg-muted/40 px-3 py-2 text-sm font-medium"
                      >
                        {technology.name}
                      </span>
                    )
                  )}
                </div>
              </div>
            )}

            {/* Project Links */}
            {(project.githubUrl || project.liveUrl) && (
              <div>
                <h2 className="text-lg font-semibold">
                  Project Links
                </h2>

                <div className="mt-4 flex flex-col gap-3">

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-secondary inline-flex items-center justify-center gap-2"
                    >
                      <ExternalLink size={18} />
                      View on GitHub
                      <ArrowUpRight size={16} />
                    </a>
                  )}

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-primary inline-flex items-center justify-center gap-2"
                    >
                      <ExternalLink size={18} />
                      Live Project
                      <ArrowUpRight size={16} />
                    </a>
                  )}

                </div>
              </div>
            )}

          </aside>
        </div>

        {/* Back Button */}
        <div className="mt-16 border-t border-border pt-8">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-medium hover:underline"
          >
            <ArrowLeft size={16} />
            Back to all projects
          </Link>
        </div>

      </div>
    </main>
  );
}