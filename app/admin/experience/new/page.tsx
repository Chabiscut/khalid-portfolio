import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { createExperience } from "@/actions/experience";

export default function NewExperiencePage() {
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
            Add Experience
          </h1>

          <p className="mt-3 text-muted-foreground">
            Add a professional, internship, freelance, or project experience.
          </p>
        </div>

        <form action={createExperience} className="card space-y-6 p-6">

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
              placeholder="e.g. ABC Technologies"
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
              placeholder="e.g. Software Engineering Intern"
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
              defaultValue="FULL_TIME"
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
              defaultValue="0"
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
              Save Experience
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