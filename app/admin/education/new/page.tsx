import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { createEducation } from "@/actions/education";

export default function NewEducationPage() {
  return (
    <main className="min-h-screen px-6 py-24">
      <div className="container-custom max-w-3xl">

        <Link
          href="/admin/education"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft size={16} />
          Back to Education
        </Link>

        <div className="mb-8">
          <p className="text-sm font-medium text-muted-foreground">
            Administration
          </p>

          <h1 className="mt-2 text-4xl font-bold tracking-tight">
            Add Education
          </h1>

          <p className="mt-3 text-muted-foreground">
            Add an academic qualification or education record.
          </p>
        </div>

        <form action={createEducation} className="card space-y-6 p-6">

          {/* Institution */}
          <div>
            <label
              htmlFor="institution"
              className="mb-2 block text-sm font-medium"
            >
              Institution
            </label>

            <input
              id="institution"
              name="institution"
              type="text"
              required
              placeholder="e.g. American International University-Bangladesh"
              className="w-full rounded-lg border border-border bg-background px-4 py-3 outline-none transition focus:border-foreground"
            />
          </div>

          {/* Degree */}
          <div>
            <label
              htmlFor="degree"
              className="mb-2 block text-sm font-medium"
            >
              Degree
            </label>

            <input
              id="degree"
              name="degree"
              type="text"
              required
              placeholder="e.g. Bachelor of Science"
              className="w-full rounded-lg border border-border bg-background px-4 py-3 outline-none transition focus:border-foreground"
            />
          </div>

          {/* Field */}
          <div>
            <label
              htmlFor="field"
              className="mb-2 block text-sm font-medium"
            >
              Field of Study
            </label>

            <input
              id="field"
              name="field"
              type="text"
              placeholder="e.g. Computer Science and Engineering"
              className="w-full rounded-lg border border-border bg-background px-4 py-3 outline-none transition focus:border-foreground"
            />
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
              placeholder="Add any additional information about this education..."
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
                I am currently studying here
              </label>

              <p className="mt-1 text-xs text-muted-foreground">
                If checked, the education will show as “Present” and should
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
              Save Education
            </button>

            <Link
              href="/admin/education"
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