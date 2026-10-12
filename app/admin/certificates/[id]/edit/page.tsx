import Link from "next/link";
import { ArrowLeft, Award } from "lucide-react";

import { prisma } from "@/lib/prisma";
import { updateCertification } from "@/actions/certifications";

type EditCertificatePageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditCertificatePage({
  params,
}: EditCertificatePageProps) {
  const { id } = await params;

  const certificate = await prisma.certification.findUnique({
    where: {
      id,
    },
  });

  if (!certificate) {
    return (
      <main className="min-h-screen px-6 py-24">
        <div className="container-custom">
          <h1 className="text-2xl font-bold">
            Certificate not found
          </h1>

          <Link
            href="/admin/certificates"
            className="mt-4 inline-flex items-center gap-2 text-sm underline"
          >
            <ArrowLeft size={16} />
            Back to Certificates
          </Link>
        </div>
      </main>
    );
  }

  const updateAction = updateCertification.bind(
    null,
    certificate.id
  );

  return (
    <main className="min-h-screen px-6 py-24">
      <div className="container-custom max-w-3xl">
        {/* Back */}
        <Link
          href="/admin/certificates"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
        >
          <ArrowLeft size={16} />
          Back to Certificates
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="mb-3 flex items-center gap-3">
            <Award size={28} />

            <h1 className="text-3xl font-bold">
              Edit Certificate
            </h1>
          </div>

          <p className="text-muted-foreground">
            Update the certificate information.
          </p>
        </div>

        {/* Form */}
        <form
          action={updateAction}
          className="card space-y-6 p-6"
        >
          {/* Certificate Name */}
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium"
            >
              Certificate Name
            </label>

            <input
              id="name"
              name="name"
              type="text"
              required
              defaultValue={certificate.name}
              className="w-full rounded-lg border bg-background px-4 py-3 outline-none transition focus:ring-2 focus:ring-primary/30"
            />
          </div>

          {/* Issuer */}
          <div>
            <label
              htmlFor="issuer"
              className="mb-2 block text-sm font-medium"
            >
              Issuing Organization
            </label>

            <input
              id="issuer"
              name="issuer"
              type="text"
              required
              defaultValue={certificate.issuer}
              className="w-full rounded-lg border bg-background px-4 py-3 outline-none transition focus:ring-2 focus:ring-primary/30"
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
              rows={5}
              defaultValue={certificate.description ?? ""}
              className="w-full resize-y rounded-lg border bg-background px-4 py-3 outline-none transition focus:ring-2 focus:ring-primary/30"
            />
          </div>

          {/* Credential ID */}
          <div>
            <label
              htmlFor="credentialId"
              className="mb-2 block text-sm font-medium"
            >
              Credential ID
            </label>

            <input
              id="credentialId"
              name="credentialId"
              type="text"
              defaultValue={certificate.credentialId ?? ""}
              className="w-full rounded-lg border bg-background px-4 py-3 outline-none transition focus:ring-2 focus:ring-primary/30"
            />
          </div>

          {/* Credential URL */}
          <div>
            <label
              htmlFor="credentialUrl"
              className="mb-2 block text-sm font-medium"
            >
              Credential URL
            </label>

            <input
              id="credentialUrl"
              name="credentialUrl"
              type="url"
              defaultValue={certificate.credentialUrl ?? ""}
              placeholder="https://..."
              className="w-full rounded-lg border bg-background px-4 py-3 outline-none transition focus:ring-2 focus:ring-primary/30"
            />

            <p className="mt-2 text-xs text-muted-foreground">
              Optional verification link.
            </p>
          </div>

          {/* Dates */}
          <div className="grid gap-6 sm:grid-cols-2">
            {/* Issue Date */}
            <div>
              <label
                htmlFor="issueDate"
                className="mb-2 block text-sm font-medium"
              >
                Issue Date
              </label>

              <input
                id="issueDate"
                name="issueDate"
                type="date"
                required
                defaultValue={certificate.issueDate
                  .toISOString()
                  .split("T")[0]}
                className="w-full rounded-lg border bg-background px-4 py-3 outline-none transition focus:ring-2 focus:ring-primary/30"
              />
            </div>

            {/* Expiry Date */}
            <div>
              <label
                htmlFor="expiryDate"
                className="mb-2 block text-sm font-medium"
              >
                Expiry Date
              </label>

              <input
                id="expiryDate"
                name="expiryDate"
                type="date"
                defaultValue={
                  certificate.expiryDate
                    ? certificate.expiryDate
                        .toISOString()
                        .split("T")[0]
                    : ""
                }
                className="w-full rounded-lg border bg-background px-4 py-3 outline-none transition focus:ring-2 focus:ring-primary/30"
              />

              <p className="mt-2 text-xs text-muted-foreground">
                Leave empty if there is no expiry date.
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
              defaultValue={certificate.sortOrder}
              className="w-full rounded-lg border bg-background px-4 py-3 outline-none transition focus:ring-2 focus:ring-primary/30"
            />

            <p className="mt-2 text-xs text-muted-foreground">
              Lower numbers appear first.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-3 border-t pt-6">
            <button
              type="submit"
              className="btn-primary"
            >
              Save Changes
            </button>

            <Link
              href="/admin/certificates"
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