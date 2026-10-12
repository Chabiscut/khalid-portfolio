import Link from "next/link";

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import {
  Plus,
  ArrowLeft,
  Pencil,
  ExternalLink,
  Images,
} from "lucide-react";

import DeleteProjectButton from "@/components/admin/DeleteProjectButton";

export default async function AdminProjectsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/admin/login");
  }

  const projects = await prisma.project.findMany({
    orderBy: [
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
      },
    },
  });

  return (
    <main className="min-h-screen px-6 py-24">
      <div className="container-custom">

        {/* Header */}
        <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Link
              href="/admin"
              className="mb-5 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft size={16} />
              Back to Dashboard
            </Link>

            <p className="text-sm font-medium text-muted-foreground">
              Administration
            </p>

            <h1 className="mt-2 text-4xl font-bold tracking-tight">
              Projects
            </h1>

            <p className="mt-3 text-muted-foreground">
              Add, edit, publish, and manage your portfolio projects.
            </p>
          </div>

          <Link
            href="/admin/projects/new"
            className="btn-primary inline-flex items-center justify-center gap-2"
          >
            <Plus size={18} />
            Add Project
          </Link>
        </div>

        {/* Projects */}
        {projects.length === 0 ? (
          <div className="card p-10 text-center">
            <h2 className="text-xl font-semibold">
              No projects yet
            </h2>

            <p className="mt-2 text-muted-foreground">
              You have not added any projects yet.
            </p>

            <Link
              href="/admin/projects/new"
              className="btn-primary mt-6 inline-flex items-center gap-2"
            >
              <Plus size={18} />
              Add Your First Project
            </Link>
          </div>
        ) : (
          <div className="space-y-5">
            {projects.map((project) => (
              <div
                key={project.id}
                className="card p-6"
              >
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">

                  {/* Project Information */}
                  <div className="min-w-0 flex-1">

                    {/* Title + Status */}
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-2xl font-semibold">
                        {project.title}
                      </h2>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          project.status === "PUBLISHED"
                            ? "bg-green-500/10 text-green-600 dark:text-green-400"
                            : "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400"
                        }`}
                      >
                        {project.status === "PUBLISHED"
                          ? "Published"
                          : "Draft"}
                      </span>

                      {project.featured && (
                        <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-600 dark:text-blue-400">
                          Featured
                        </span>
                      )}
                    </div>

                    {/* Short Description */}
                    <p className="mt-3 max-w-3xl text-muted-foreground">
                      {project.shortDescription}
                    </p>

                    {/* Technologies */}
                    {project.technologies.length > 0 && (
                      <div className="mt-5">
                        <p className="mb-2 text-sm font-medium">
                          Technologies
                        </p>

                        <div className="flex flex-wrap gap-2">
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
                      </div>
                    )}

                    {/* Image Count */}
                    <p className="mt-5 text-sm text-muted-foreground">
                      {project.images.length} image
                      {project.images.length !== 1 ? "s" : ""}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-3 lg:max-w-md lg:justify-end">

                    {/* View */}
                    <Link
                      href={`/projects/${project.slug}`}
                      target="_blank"
                      className="btn-secondary inline-flex items-center gap-2"
                    >
                      <ExternalLink size={16} />
                      View
                    </Link>

                    {/* Images */}
                    <Link
                      href={`/admin/projects/${project.id}/images`}
                      className="btn-secondary inline-flex items-center gap-2"
                    >
                      <Images size={16} />
                      Images
                    </Link>

                    {/* Edit */}
                    <Link
                      href={`/admin/projects/${project.id}/edit`}
                      className="btn-secondary inline-flex items-center gap-2"
                    >
                      <Pencil size={16} />
                      Edit
                    </Link>

                    {/* Delete */}
                    <DeleteProjectButton
                      projectId={project.id}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}