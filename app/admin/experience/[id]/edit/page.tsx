import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { updateExperience } from "@/actions/experience";

type EditExperiencePageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditExperiencePage({
  params,
}: EditExperiencePageProps) {
  const { id } = await params;

  const experience = await prisma.experience.findUnique({
    where: {
      id,
    },
  });

  if (!experience) {
    notFound();
  }

  const updateExperienceWithId = updateExperience.bind(null, experience.id);

  return (
    <main className="min-h-screen px-6 py-24">
      <div className="container-custom max-w-3xl">

        <Link
          href="/admin/experience"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft size={16} />
          Back to Experience
        </Link>

        <div className="mb-8">
          <p className="text-sm font-medium text-muted-foreground">
            Administration
          </p>

          <h1 className="mt-2 text-4xl font-bold tracking-tight">
            Edit Experience
          </h1>

          <p className="mt-3 text-muted-foreground">
            Update the details of this experience.
          </p>
        </div>

        <form
          action={updateExperienceWithId}
          className="card space-y-6 p-6"
        >
          {/* Company */}
          <div>
            <label
              htmlFor="company"
              className="mb-2 block text-sm font-medium"
            >
              Company / Organization
            </label>

            <input
              id="company"
              name="company"
              type="text"
              required
              defaultValue={experience.company}
              className="w-full rounded-lg border border-border bg-background px-4 py-3 outline-none transition focus:border-foreground"
            />
          </div>

          {/* Position */}
          <div>
            <label
              htmlFor="position"
              className="mb-2 block text-sm font-medium"
            >
              Position / Role
            </label>

            <input
              id="position"
              name="position"
              type="text"
              required
              defaultValue={experience.position}
              className="w-full rounded-lg border border-border bg-background px-4 py-3 outline-none transition focus:border-foreground"
            />
          </div>

          {/* Type */}
          <div>
            <label
              htmlFor="type"
              className="mb-2 block text-sm font-medium"
            >
              Experience Type
            </label>

            <select
              id="type"
              name="type"
              defaultValue={experience.type}
              required
              className="w-full rounded-lg border border-border bg-background px-4 py-3 outline-none"
            >
              <option value="FULL_TIME">Full Time</option>
              <option value="PART_TIME">Part Time</option>
              <option value="INTERNSHIP">Internship</option>
              <option value="FREELANCE">Freelance</option>
              <option value="PROJECT">Project</option>
            </select>
          </div>

          {/* Location */}
          <div>
            <label
              htmlFor="location"
              className="mb-2 block text-sm font-medium"
            >
              Location
            </label>

            <input
              id="location"
              name="location"
              type="text"
              defaultValue={experience.location ?? ""}
              placeholder="e.g. Dhaka, Bangladesh"
              className="w-full rounded-lg border border-border bg-background px-4 py-3 outline-none transition focus:border-foreground"
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-medium"
            >
              Description
            </label>

            <textarea
              id="description"
              name="description"
              rows={6}
              defaultValue={experience.description ?? ""}
              placeholder="Describe your responsibilities, achievements, or work..."
              className="w-full resize-y rounded-lg border border-border bg-background px-4 py-3 outline-none transition focus:border-foreground"
            />
          </div>

          {/* Dates */}
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label
                htmlFor="startDate"
                className="mb-2 block text-sm font-medium"
              >
                Start Date
              </label>

              <input
                id="startDate"
                name="startDate"
                type="date"
                required
                defaultValue={formatDateForInput(experience.startDate)}
                className="w-full rounded-lg border border-border bg-background px-4 py-3 outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="endDate"
                className="mb-2 block text-sm font-medium"
              >
                End Date
              </label>

              <input
                id="endDate"
                name="endDate"
                type="date"
                defaultValue={
                  experience.endDate
                    ? formatDateForInput(experience.endDate)
                    : ""
                }
                className="w-full rounded-lg border border-border bg-background px-4 py-3 outline-none"
              />
            </div>
          </div>

          {/* Current */}
          <div className="flex items-start gap-3 rounded-lg border border-border p-4">
            <input
              id="current"
              name="current"
              type="checkbox"
              defaultChecked={experience.current}
              className="mt-1 h-4 w-4"
            />

            <div>
              <label
                htmlFor="current"
                className="cursor-pointer text-sm font-medium"
              >
                I currently work here
              </label>

              <p className="mt-1 text-xs text-muted-foreground">
                If checked, the experience will show as “Present” and should
                not have an end date.
              </p>
            </div>
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
              defaultValue={experience.sortOrder}
              className="w-full rounded-lg border border-border bg-background px-4 py-3 outline-none"
            />

            <p className="mt-2 text-xs text-muted-foreground">
              Lower numbers appear first.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-3 pt-4">
            <button
              type="submit"
              className="btn-primary"
            >
              Update Experience
            </button>

            <Link
              href="/admin/experience"
              className="btn-secondary"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}

function formatDateForInput(date: Date) {
  return date.toISOString().split("T")[0];
}