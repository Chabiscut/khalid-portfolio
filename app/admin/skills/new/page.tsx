import Link from "next/link";
import { ArrowLeft, Plus } from "lucide-react";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { createSkill } from "@/actions/skills";

export default async function NewSkillPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/admin/login");
  }

  return (
    <main className="min-h-screen px-6 py-24">
      <div className="container-custom">
        {/* Back Link */}
        <Link
          href="/admin/skills"
          className="mb-5 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft size={16} />
          Back to Skills
        </Link>

        {/* Header */}
        <div className="mb-10">
          <p className="text-sm font-medium text-muted-foreground">
            Administration
          </p>

          <h1 className="mt-2 text-4xl font-bold tracking-tight">
            Add Skill
          </h1>

          <p className="mt-3 text-muted-foreground">
            Add a skill that you can display on your portfolio later.
          </p>
        </div>

        {/* Form */}
        <div className="card max-w-3xl p-8">
          <form action={createSkill} className="space-y-6">
            {/* Skill Name */}
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium"
              >
                Skill Name
              </label>

              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="e.g. JavaScript"
                className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-foreground/20"
              />
            </div>

            {/* Category */}
            <div>
              <label
                htmlFor="category"
                className="mb-2 block text-sm font-medium"
              >
                Category
              </label>

              <input
                id="category"
                name="category"
                type="text"
                placeholder="e.g. Programming Language"
                className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-foreground/20"
              />

              <p className="mt-2 text-xs text-muted-foreground">
                Optional. Examples: Programming Language, Frontend,
                Backend, Database, Tools.
              </p>
            </div>

            {/* Skill Level */}
            <div>
              <label
                htmlFor="level"
                className="mb-2 block text-sm font-medium"
              >
                Skill Level
              </label>

              <input
                id="level"
                name="level"
                type="number"
                min="0"
                max="100"
                placeholder="e.g. 75"
                className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-foreground/20"
              />

              <p className="mt-2 text-xs text-muted-foreground">
                Optional. Enter a value from 0 to 100.
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
                placeholder="e.g. SiJavascript"
                className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-foreground/20"
              />

              <p className="mt-2 text-xs text-muted-foreground">
                Optional. We will connect this to the portfolio UI later.
              </p>
            </div>

            {/* Sort Order */}
            <div>
              <label
                htmlFor="sortOrder"
                className="mb-2 block text-sm font-medium"
              >
                Sort Order
              </label>

              <input
                id="sortOrder"
                name="sortOrder"
                type="number"
                min="0"
                defaultValue="0"
                className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-foreground/20"
              />

              <p className="mt-2 text-xs text-muted-foreground">
                Lower numbers appear first.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                type="submit"
                className="btn-primary inline-flex items-center gap-2"
              >
                <Plus size={18} />
                Add Skill
              </button>

              <Link
                href="/admin/skills"
                className="btn-secondary inline-flex items-center gap-2"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}