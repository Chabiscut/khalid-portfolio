import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import {
  Plus,
  ArrowLeft,
  Pencil,
} from "lucide-react";

import DeleteTechnologyButton from "@/components/admin/DeleteTechnologyButton";

export default async function AdminTechnologiesPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/admin/login");
  }

  const technologies = await prisma.technology.findMany({
    orderBy: {
      name: "asc",
    },
    include: {
      _count: {
        select: {
          projects: true,
        },
      },
    },
  });

  return (
    <main className="min-h-screen px-6 py-24">
      <div className="container-custom">

        {/* Header */}
        <div className="mb-10">
          <Link
            href="/admin"
            className="mb-5 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft size={16} />
            Back to Dashboard
          </Link>

          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-4xl font-bold tracking-tight">
                Technologies
              </h1>

              <p className="mt-3 text-muted-foreground">
                Manage the technologies used in your projects.
              </p>
            </div>

            <Link
              href="/admin/technologies/new"
              className="btn-primary inline-flex items-center justify-center gap-2"
            >
              <Plus size={18} />
              Add Technology
            </Link>
          </div>
        </div>

        {/* Empty State */}
        {technologies.length === 0 ? (
          <div className="card p-10 text-center">
            <div className="mx-auto max-w-md">
              <h2 className="text-xl font-semibold">
                No technologies yet
              </h2>

              <p className="mt-3 text-muted-foreground">
                Add technologies that you use in your projects.
              </p>

              <Link
                href="/admin/technologies/new"
                className="btn-primary mt-6 inline-flex items-center gap-2"
              >
                <Plus size={18} />
                Add Your First Technology
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {technologies.map((technology) => (
              <div
                key={technology.id}
                className="card p-6"
              >
                <div className="flex items-start justify-between gap-4">

                  <div>
                    <h2 className="text-xl font-semibold">
                      {technology.name}
                    </h2>

                    <p className="mt-2 text-sm text-muted-foreground">
                      /{technology.slug}
                    </p>

                    <p className="mt-3 text-sm text-muted-foreground">
                      Used in {technology._count.projects} project
                      {technology._count.projects !== 1 ? "s" : ""}
                    </p>
                  </div>

                  {technology.icon && (
                    <div className="rounded-lg border border-border px-3 py-2 text-xs">
                      {technology.icon}
                    </div>
                  )}

                </div>

                <div className="mt-6 flex gap-3">
                  <Link
                    href={`/admin/technologies/${technology.id}/edit`}
                    className="btn-primary inline-flex items-center gap-2"
                  >
                    <Pencil size={16} />
                    Edit
                  </Link>

                  <DeleteTechnologyButton
                    technologyId={technology.id}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </main>
  );
}