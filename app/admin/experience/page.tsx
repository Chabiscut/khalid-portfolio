import Link from "next/link";
import { ArrowLeft, Pencil, Plus, Briefcase } from "lucide-react";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import DeleteExperienceButton from "@/components/admin/DeleteExperienceButton";

export default async function AdminExperiencePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/admin/login");
  }

  const experiences = await prisma.experience.findMany({
    orderBy: [
      { current: "desc" },
      { sortOrder: "asc" },
      { startDate: "desc" },
    ],
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
              Experience
            </h1>

            <p className="mt-3 text-muted-foreground">
              Add, edit, and manage your professional and project experience.
            </p>
          </div>

          <Link
            href="/admin/experience/new"
            className="btn-primary inline-flex items-center justify-center gap-2"
          >
            <Plus size={18} />
            Add Experience
          </Link>
        </div>

        {/* Empty State */}
        {experiences.length === 0 ? (
          <div className="card p-10 text-center">
            <Briefcase
              size={40}
              className="mx-auto mb-5 text-muted-foreground"
            />

            <h2 className="text-xl font-semibold">
              No experience yet
            </h2>

            <p className="mt-2 text-muted-foreground">
              You have not added any experience yet.
            </p>

            <Link
              href="/admin/experience/new"
              className="btn-primary mt-6 inline-flex items-center gap-2"
            >
              <Plus size={18} />
              Add Your First Experience
            </Link>
          </div>
        ) : (
          /* Experience List */
          <div className="space-y-5">
            {experiences.map((experience) => (
              <div
                key={experience.id}
                className="card p-6"
              >
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">

                  {/* Experience Information */}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-2xl font-semibold">
                        {experience.position}
                      </h2>

                      {experience.current && (
                        <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-600 dark:text-green-400">
                          Current
                        </span>
                      )}
                    </div>

                    <p className="mt-2 text-lg font-medium text-muted-foreground">
                      {experience.company}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-3">
                      <span className="rounded-full border border-border px-3 py-1 text-xs font-medium">
                        {formatExperienceType(experience.type)}
                      </span>

                      {experience.location && (
                        <span className="rounded-full border border-border px-3 py-1 text-xs font-medium">
                          {experience.location}
                        </span>
                      )}
                    </div>

                    <p className="mt-4 text-sm text-muted-foreground">
                      {formatDate(experience.startDate)}{" "}
                      —{" "}
                      {experience.current
                        ? "Present"
                        : experience.endDate
                          ? formatDate(experience.endDate)
                          : "N/A"}
                    </p>

                    {experience.description && (
                      <p className="mt-4 max-w-3xl whitespace-pre-line leading-7 text-muted-foreground">
                        {experience.description}
                      </p>
                    )}

                    <p className="mt-4 text-xs text-muted-foreground">
                      Sort order: {experience.sortOrder}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-3 lg:justify-end">
                    <Link
                      href={`/admin/experience/${experience.id}/edit`}
                      className="btn-secondary inline-flex items-center gap-2"
                    >
                      <Pencil size={16} />
                      Edit
                    </Link>

                    <DeleteExperienceButton
                      experienceId={experience.id}
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

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
  }).format(date);
}

function formatExperienceType(type: string) {
  const labels: Record<string, string> = {
    FULL_TIME: "Full Time",
    PART_TIME: "Part Time",
    INTERNSHIP: "Internship",
    FREELANCE: "Freelance",
    PROJECT: "Project",
  };

  return labels[type] || type;
}