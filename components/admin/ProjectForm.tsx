"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { ArrowLeft } from "lucide-react";
import type { ProjectActionState } from "@/actions/projects";

type Technology = {
  id: string;
  name: string;
};

type ProjectFormProps = {
  action: (
    previousState: ProjectActionState,
    formData: FormData
  ) => Promise<ProjectActionState>;
  technologies: Technology[];
  initialData?: {
    title: string;
    slug: string;
    shortDescription: string;
    description: string;
    status: "DRAFT" | "PUBLISHED";
    githubUrl: string;
    liveUrl: string;
    featured: boolean;
    sortOrder: number;
    technologyIds: string[];
  };
  submitLabel: string;
  heading: string;
  description: string;
};

export default function ProjectForm({
  action,
  technologies,
  initialData,
  submitLabel,
  heading,
  description,
}: ProjectFormProps) {
  const [state, formAction, isPending] = useActionState(action, {});
  const [title, setTitle] = useState(initialData?.title || "");

  const generateSlug = (value: string) => {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  const slug = initialData
    ? initialData.slug
    : generateSlug(title);

  return (
    <main className="min-h-screen px-6 py-24">
      <div className="container-custom">

        {/* Back Button */}
        <Link
          href="/admin/projects"
          className="mb-5 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft size={16} />
          Back to Projects
        </Link>

        {/* Page Heading */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold tracking-tight">
            {heading}
          </h1>

          <p className="mt-3 text-muted-foreground">
            {description}
          </p>
        </div>

        {/* Form */}
        <form action={formAction} className="card p-8 space-y-8">
          {state.error && (
            <p
              role="alert"
              className="rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive"
            >
              {state.error}
            </p>
          )}

          {/* Project Title */}
          <div>
            <label
              htmlFor="title"
              className="mb-2 block text-sm font-medium"
            >
              Project Title
            </label>

            <input
              id="title"
              name="title"
              type="text"
              placeholder="e.g. Career Bridge"
              value={title}
              onChange={(event) =>
                setTitle(event.target.value)
              }
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
              value={slug}
              readOnly
              className="w-full rounded-xl border border-border bg-muted/40 px-4 py-3 outline-none"
            />

            <p className="mt-2 text-xs text-muted-foreground">
              Automatically generated from the project title.
            </p>
          </div>

          {/* Short Description */}
          <div>
            <label
              htmlFor="shortDescription"
              className="mb-2 block text-sm font-medium"
            >
              Short Description
            </label>

            <textarea
              id="shortDescription"
              name="shortDescription"
              rows={3}
              defaultValue={
                initialData?.shortDescription || ""
              }
              placeholder="A short summary of the project..."
              required
              className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-foreground/20"
            />
          </div>

          {/* Full Description */}
          <div>
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-medium"
            >
              Full Description
            </label>

            <textarea
              id="description"
              name="description"
              rows={8}
              defaultValue={
                initialData?.description || ""
              }
              placeholder="Describe the project in detail..."
              required
              className="w-full resize-y rounded-xl border border-border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-foreground/20"
            />
          </div>

          {/* Status */}
          <div>
            <label
              htmlFor="status"
              className="mb-2 block text-sm font-medium"
            >
              Status
            </label>

            <select
              id="status"
              name="status"
              defaultValue={
                initialData?.status || "DRAFT"
              }
              className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-foreground/20"
            >
              <option value="DRAFT">
                Draft
              </option>

              <option value="PUBLISHED">
                Published
              </option>
            </select>
          </div>

          {/* GitHub URL */}
          <div>
            <label
              htmlFor="githubUrl"
              className="mb-2 block text-sm font-medium"
            >
              GitHub URL
            </label>

            <input
              id="githubUrl"
              name="githubUrl"
              type="url"
              defaultValue={
                initialData?.githubUrl || ""
              }
              placeholder="https://github.com/username/project"
              className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-foreground/20"
            />
          </div>

          {/* Live Project URL */}
          <div>
            <label
              htmlFor="liveUrl"
              className="mb-2 block text-sm font-medium"
            >
              Live Project URL
            </label>

            <input
              id="liveUrl"
              name="liveUrl"
              type="url"
              defaultValue={
                initialData?.liveUrl || ""
              }
              placeholder="https://example.com"
              className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-foreground/20"
            />
          </div>

          {/* Technologies */}
          <div>
            <label className="mb-3 block text-sm font-medium">
              Project Technologies
            </label>

            {technologies.length === 0 ? (
              <div className="rounded-xl border border-border bg-muted/30 p-4">
                <p className="text-sm text-muted-foreground">
                  No technologies have been added yet.
                  Add technologies from the Technologies section
                  first.
                </p>

                <Link
                  href="/admin/technologies/new"
                  className="mt-3 inline-block text-sm font-medium underline"
                >
                  Add Technology
                </Link>
              </div>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {technologies.map((technology) => (
                  <label
                    key={technology.id}
                    className="flex cursor-pointer items-center gap-3 rounded-xl border border-border p-4 transition-colors hover:bg-muted/40"
                  >
                    <input
                      type="checkbox"
                      name="technologyIds"
                      value={technology.id}
                      defaultChecked={initialData?.technologyIds.includes(
                        technology.id
                      )}
                      className="h-4 w-4"
                    />

                    <span className="text-sm font-medium">
                      {technology.name}
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Featured Project */}
          <div className="flex items-center gap-3">
            <input
              id="featured"
              name="featured"
              type="checkbox"
              defaultChecked={
                initialData?.featured || false
              }
              className="h-4 w-4"
            />

            <label
              htmlFor="featured"
              className="text-sm font-medium"
            >
              Featured project
            </label>
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
              defaultValue={
                initialData?.sortOrder || 0
              }
              className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-foreground/20"
            />

            <p className="mt-2 text-xs text-muted-foreground">
              Lower numbers appear first.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-3 pt-4 sm:flex-row">
            <button
              type="submit"
              disabled={isPending}
              className="btn-primary"
            >
              {isPending ? "Saving..." : submitLabel}
            </button>

            <Link
              href="/admin/projects"
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