import Link from "next/link";
import { ArrowLeft, GraduationCap, Pencil, Plus } from "lucide-react";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import DeleteEducationButton from "@/components/admin/DeleteEducationButton";
import { prisma } from "@/lib/prisma";

export default async function AdminEducationPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/admin/login");
  }

  const educationRecords = await prisma.education.findMany({
    orderBy: [
      { current: "desc" },
      { sortOrder: "asc" },
      { startDate: "desc" },
    ],
  });

  return (
    <main className="min-h-screen px-6 py-24">
      <div className="container-custom">
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
              Education
            </h1>
            <p className="mt-3 text-muted-foreground">
              Add, edit, and manage your academic background.
            </p>
          </div>

          <Link
            href="/admin/education/new"
            className="btn-primary inline-flex items-center justify-center gap-2"
          >
            <Plus size={18} />
            Add Education
          </Link>
        </div>

        {educationRecords.length === 0 ? (
          <div className="card p-10 text-center">
            <GraduationCap
              size={40}
              className="mx-auto mb-5 text-muted-foreground"
            />
            <h2 className="text-xl font-semibold">No education records yet</h2>
            <p className="mt-2 text-muted-foreground">
              Add your first academic qualification to get started.
            </p>
            <Link
              href="/admin/education/new"
              className="btn-primary mt-6 inline-flex items-center gap-2"
            >
              <Plus size={18} />
              Add Your First Education
            </Link>
          </div>
        ) : (
          <div className="space-y-5">
            {educationRecords.map((record) => (
              <article key={record.id} className="card p-6">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-2xl font-semibold">
                        {record.degree}
                      </h2>
                      {record.current && (
                        <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-600 dark:text-green-400">
                          Current
                        </span>
                      )}
                    </div>

                    {record.field && (
                      <p className="mt-2 text-lg font-medium text-muted-foreground">
                        {record.field}
                      </p>
                    )}
                    <p className="mt-2 font-medium">{record.institution}</p>

                    <div className="mt-4 flex flex-wrap gap-3">
                      {record.location && (
                        <span className="rounded-full border border-border px-3 py-1 text-xs font-medium">
                          {record.location}
                        </span>
                      )}
                    </div>

                    <p className="mt-4 text-sm text-muted-foreground">
                      {formatDate(record.startDate)} —{" "}
                      {record.current
                        ? "Present"
                        : record.endDate
                          ? formatDate(record.endDate)
                          : "No end date"}
                    </p>

                    {record.description && (
                      <p className="mt-4 max-w-3xl whitespace-pre-line leading-7 text-muted-foreground">
                        {record.description}
                      </p>
                    )}

                    <p className="mt-4 text-xs text-muted-foreground">
                      Sort order: {record.sortOrder}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3 lg:justify-end">
                    <Link
                      href={`/admin/education/${record.id}/edit`}
                      className="btn-secondary inline-flex items-center gap-2"
                    >
                      <Pencil size={16} />
                      Edit
                    </Link>
                    <DeleteEducationButton educationId={record.id} />
                  </div>
                </div>
              </article>
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
