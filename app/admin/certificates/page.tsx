import Link from "next/link";
import { Award, ExternalLink, Pencil, Plus } from "lucide-react";

import { prisma } from "@/lib/prisma";
import DeleteCertificationButton from "@/components/admin/DeleteCertificationButton";

export default async function AdminCertificatesPage() {
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
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <Award size={28} />
              <h1 className="text-3xl font-bold">Certificates</h1>
            </div>

            <p className="text-muted-foreground">
              Manage your certificates and credentials.
            </p>
          </div>

          <Link
            href="/admin/certificates/new"
            className="btn-primary inline-flex items-center justify-center gap-2"
          >
            <Plus size={18} />
            Add Certificate
          </Link>
        </div>

        {/* Empty State */}
        {certificates.length === 0 ? (
          <div className="card flex flex-col items-center justify-center px-6 py-16 text-center">
            <Award
              size={48}
              className="mb-4 text-muted-foreground"
            />

            <h2 className="mb-2 text-xl font-semibold">
              No certificates yet
            </h2>

            <p className="mb-6 max-w-md text-muted-foreground">
              You have not added any certificates. Add your first
              certificate from the button above.
            </p>

            <Link
              href="/admin/certificates/new"
              className="btn-primary inline-flex items-center gap-2"
            >
              <Plus size={18} />
              Add Certificate
            </Link>
          </div>
        ) : (
          /* Certificate List */
          <div className="space-y-4">
            {certificates.map((certificate) => (
              <div
                key={certificate.id}
                className="card flex flex-col gap-6 p-6 lg:flex-row lg:items-center lg:justify-between"
              >
                {/* Information */}
                <div className="min-w-0 flex-1">
                  <div className="mb-2 flex flex-wrap items-center gap-3">
                    <h2 className="text-xl font-semibold">
                      {certificate.name}
                    </h2>

                    <span className="rounded-full border px-3 py-1 text-xs text-muted-foreground">
                      Order: {certificate.sortOrder}
                    </span>
                  </div>

                  <p className="mb-2 text-sm font-medium">
                    {certificate.issuer}
                  </p>

                  {certificate.description && (
                    <p className="mb-3 text-sm text-muted-foreground">
                      {certificate.description}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
                    <span>
                      Issued:{" "}
                      {certificate.issueDate.toLocaleDateString()}
                    </span>

                    <span>
                      {certificate.expiryDate
                        ? `Expires: ${certificate.expiryDate.toLocaleDateString()}`
                        : "No expiry"}
                    </span>

                    {certificate.credentialId && (
                      <span>
                        Credential ID: {certificate.credentialId}
                      </span>
                    )}
                  </div>

                  {certificate.credentialUrl && (
                    <a
                      href={certificate.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-2 text-sm font-medium underline underline-offset-4"
                    >
                      View Credential
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-3">
                  <Link
                    href={`/admin/certificates/${certificate.id}/edit`}
                    className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition hover:bg-muted"
                  >
                    <Pencil size={16} />
                    Edit
                  </Link>

                  <DeleteCertificationButton
                    certificationId={certificate.id}
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