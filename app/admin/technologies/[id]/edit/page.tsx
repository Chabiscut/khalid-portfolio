import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { updateTechnology } from "@/actions/technologies";

type EditTechnologyPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditTechnologyPage({
  params,
}: EditTechnologyPageProps) {
  const session = await auth();

  if (!session?.user) {
    redirect("/admin/login");
  }

  const { id } = await params;

  const technology = await prisma.technology.findUnique({
    where: {
      id,
    },
  });

  if (!technology) {
    notFound();
  }

  const updateTechnologyWithId = updateTechnology.bind(
    null,
    technology.id
  );

  return (
    <main className="min-h-screen px-6 py-24">
      <div className="container-custom">

        <Link
          href="/admin/technologies"
          className="mb-5 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft size={16} />
          Back to Technologies
        </Link>

        <div className="mb-10">
          <h1 className="text-4xl font-bold tracking-tight">
            Edit Technology
          </h1>

          <p className="mt-3 text-muted-foreground">
            Update technology information.
          </p>
        </div>

        <form
          action={updateTechnologyWithId}
          className="card p-8 space-y-8"
        >

          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium"
            >
              Technology Name
            </label>

            <input
              id="name"
              name="name"
              type="text"
              defaultValue={technology.name}
              required
              className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-foreground/20"
            />
          </div>

          {/* Slug */}
          <div>
            <label
              htmlFor="slug"
              className="mb-2 block text-sm font-medium"
            >
              Slug
            </label>

            <input
              id="slug"
              name="slug"
              type="text"
              defaultValue={technology.slug}
              required
              className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-foreground/20"
            />

            <p className="mt-2 text-xs text-muted-foreground">
              Use lowercase letters, numbers, and hyphens.
            </p>
          </div>

          {/* Icon */}
          <div>
            <label
              htmlFor="icon"
              className="mb-2 block text-sm font-medium"
            >
              Icon
            </label>

            <input
              id="icon"
              name="icon"
              type="text"
              defaultValue={technology.icon ?? ""}
              placeholder="e.g. react, nextjs, java"
              className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-foreground/20"
            />

            <p className="mt-2 text-xs text-muted-foreground">
              Optional.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-3 pt-4 sm:flex-row">
            <button
              type="submit"
              className="btn-primary"
            >
              Save Changes
            </button>

            <Link
              href="/admin/technologies"
              className="btn-secondary text-center"
            >
              Cancel
            </Link>
          </div>

        </form>
      </div>
    </main>
  );
}