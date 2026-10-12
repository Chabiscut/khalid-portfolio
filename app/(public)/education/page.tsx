import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  GraduationCap,
  MapPin,
} from "lucide-react";

import { prisma } from "@/lib/prisma";

export default async function EducationPage() {
  const education = await prisma.education.findMany({
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
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Academic Background
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Education
          </h1>

          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            My academic journey and educational background.
          </p>
        </div>

        {/* Empty State */}
        {education.length === 0 ? (
          <div className="mx-auto max-w-2xl">
            <div className="card p-10 text-center">
              <GraduationCap
                size={48}
                className="mx-auto mb-5 text-muted-foreground"
              />

              <h2 className="text-2xl font-semibold">
                Education coming soon
              </h2>

              <p className="mt-3 leading-7 text-muted-foreground">
                My academic background will appear here once I add my
                education records.
              </p>

              <Link
                href="/about"
                className="btn-secondary mt-6 inline-flex items-center gap-2"
              >
                <ArrowLeft size={16} />
                Back to About
              </Link>
            </div>
          </div>
        ) : (
          /* Education Timeline */
          <div className="mx-auto max-w-4xl">
            <div className="relative">

              {/* Timeline Line */}
              <div className="absolute left-[15px] top-2 hidden h-[calc(100%-8px)] w-px bg-border sm:block" />

              <div className="space-y-10">
                {education.map((item) => (
                  <article
                    key={item.id}
                    className="relative sm:pl-12"
                  >
                    {/* Timeline Dot */}
                    <div className="absolute left-0 top-1 hidden h-8 w-8 items-center justify-center rounded-full border border-border bg-background sm:flex">
                      <div className="h-2.5 w-2.5 rounded-full bg-foreground" />
                    </div>

                    <div className="card p-6 sm:p-8">

                      {/* Degree + Current */}
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <h2 className="text-2xl font-semibold">
                            {item.degree}
                          </h2>

                          {item.field && (
                            <p className="mt-2 text-lg font-medium text-muted-foreground">
                              {item.field}
                            </p>
                          )}

                          <p className="mt-2 font-medium">
                            {item.institution}
                          </p>
                        </div>

                        {item.current && (
                          <span className="w-fit rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-600 dark:text-green-400">
                            Current
                          </span>
                        )}
                      </div>

                      {/* Metadata */}
                      <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3 text-sm text-muted-foreground">

                        <span className="inline-flex items-center gap-2">
                          <CalendarDays size={16} />

                          {formatDate(item.startDate)}
                          {" — "}
                          {item.current
                            ? "Present"
                            : item.endDate
                              ? formatDate(item.endDate)
                              : "N/A"}
                        </span>

                        {item.location && (
                          <span className="inline-flex items-center gap-2">
                            <MapPin size={16} />
                            {item.location}
                          </span>
                        )}
                      </div>

                      {/* Description */}
                      {item.description && (
                        <p className="mt-6 whitespace-pre-line leading-7 text-muted-foreground">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </div>
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