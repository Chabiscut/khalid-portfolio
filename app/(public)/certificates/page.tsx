import {
  Award,
  ExternalLink,
  CalendarDays,
  BadgeCheck,
} from "lucide-react";

import { prisma } from "@/lib/prisma";

function formatDate(date: Date) {
  return date.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

export default async function CertificatesPage() {
  const certificates = await prisma.certification.findMany({
    orderBy: [
      { sortOrder: "asc" },
      { issueDate: "desc" },
    ],
  });

  return (
    <main className="min-h-screen px-6 py-24">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="mb-4 flex justify-center">
            <div className="rounded-2xl border p-4">
              <Award size={32} />
            </div>
          </div>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Certificates
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Professional certificates and credentials I have earned
            throughout my learning journey.
          </p>
        </div>

        {/* Empty State */}
        {certificates.length === 0 ? (
          <div className="card flex flex-col items-center justify-center px-6 py-20 text-center">
            <Award
              size={56}
              className="mb-5 text-muted-foreground"
            />

            <h2 className="mb-2 text-2xl font-semibold">
              No certificates yet
            </h2>

            <p className="max-w-md text-muted-foreground">
              Certificates will appear here once they are added
              through the admin dashboard.
            </p>
          </div>
        ) : (
          /* Certificate Grid */
          <div className="grid gap-6 md:grid-cols-2">
            {certificates.map((certificate) => (
              <article
                key={certificate.id}
                className="card flex h-full flex-col p-6 transition hover:-translate-y-1"
              >
                {/* Icon + Name */}
                <div className="mb-5 flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border">
                    <Award size={24} />
                  </div>

                  <div className="min-w-0">
                    <h2 className="text-xl font-semibold">
                      {certificate.name}
                    </h2>

                    <p className="mt-1 text-sm text-muted-foreground">
                      {certificate.issuer}
                    </p>
                  </div>
                </div>

                {/* Description */}
                {certificate.description && (
                  <p className="mb-5 text-sm leading-6 text-muted-foreground">
                    {certificate.description}
                  </p>
                )}

                {/* Details */}
                <div className="mt-auto space-y-3 border-t pt-5">
                  <div className="flex items-center gap-3 text-sm">
                    <CalendarDays
                      size={17}
                      className="shrink-0 text-muted-foreground"
                    />

                    <span>
                      Issued:{" "}
                      <span className="font-medium">
                        {formatDate(certificate.issueDate)}
                      </span>
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-sm">
                    <BadgeCheck
                      size={17}
                      className="shrink-0 text-muted-foreground"
                    />

                    <span>
                      {certificate.expiryDate
                        ? `Expires: ${formatDate(
                            certificate.expiryDate
                          )}`
                        : "No expiration"}
                    </span>
                  </div>

                  {certificate.credentialId && (
                    <div className="text-sm text-muted-foreground">
                      Credential ID:{" "}
                      <span className="font-medium text-foreground">
                        {certificate.credentialId}
                      </span>
                    </div>
                  )}
                </div>

                {/* Credential Link */}
                {certificate.credentialUrl && (
                  <a
                    href={certificate.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary mt-6 inline-flex w-fit items-center gap-2"
                  >
                    Verify Credential
                    <ExternalLink size={16} />
                  </a>
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}