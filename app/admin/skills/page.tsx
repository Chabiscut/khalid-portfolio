import Link from "next/link";
import { ArrowLeft, Pencil, Plus, Wrench } from "lucide-react";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import DeleteSkillButton from "@/components/admin/DeleteSkillButton";

export default async function AdminSkillsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/admin/login");
  }

  const skills = await prisma.skill.findMany({
    orderBy: [
      { sortOrder: "asc" },
      { createdAt: "desc" },
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
              Skills
            </h1>

            <p className="mt-3 text-muted-foreground">
              Add, edit, and manage the skills shown on your portfolio.
            </p>
          </div>

          <Link
            href="/admin/skills/new"
            className="btn-primary inline-flex items-center justify-center gap-2"
          >
            <Plus size={18} />
            Add Skill
          </Link>
        </div>

        {/* Empty State */}
        {skills.length === 0 ? (
          <div className="card p-10 text-center">
            <Wrench
              size={40}
              className="mx-auto mb-5 text-muted-foreground"
            />

            <h2 className="text-xl font-semibold">
              No skills yet
            </h2>

            <p className="mt-2 text-muted-foreground">
              You have not added any skills yet.
            </p>

            <Link
              href="/admin/skills/new"
              className="btn-primary mt-6 inline-flex items-center gap-2"
            >
              <Plus size={18} />
              Add Your First Skill
            </Link>
          </div>
        ) : (
          /* Skills List */
          <div className="space-y-4">
            {skills.map((skill) => (
              <div
                key={skill.id}
                className="card p-6"
              >
                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                  {/* Skill Information */}
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-xl font-semibold">
                        {skill.name}
                      </h2>

                      {skill.category && (
                        <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-600 dark:text-blue-400">
                          {skill.category}
                        </span>
                      )}
                    </div>

                    <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted-foreground">
                      {skill.level !== null && (
                        <span>
                          Level: {skill.level}%
                        </span>
                      )}

                      {skill.icon && (
                        <span>
                          Icon: {skill.icon}
                        </span>
                      )}

                      <span>
                        Order: {skill.sortOrder}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-3">
                    <Link
                      href={`/admin/skills/${skill.id}/edit`}
                      className="btn-secondary inline-flex items-center gap-2"
                    >
                      <Pencil size={16} />
                      Edit
                    </Link>

                    <DeleteSkillButton skillId={skill.id} />
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