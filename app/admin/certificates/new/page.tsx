import Link from "next/link";
import { ArrowLeft, Award } from "lucide-react";

import { createCertification } from "@/actions/certifications";

export default function NewCertificatePage() {
  return (
    <main className="min-h-screen px-6 py-24">
      <div className="container-custom max-w-3xl">
        {/* Back Button */}
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
              Add Certificate
            </h1>
          </div>

          <p className="text-muted-foreground">
            Add a certificate or professional credential to your portfolio.
          </p>
        </div>

        {/* Form */}
        <form
          action={createCertification}
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
              placeholder="e.g. Responsive Web Design"
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
              placeholder="e.g. freeCodeCamp"
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
              placeholder="Briefly describe what this certificate represents..."
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
              placeholder="Optional"
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
              placeholder="https://..."
              className="w-full rounded-lg border bg-background px-4 py-3 outline-none transition focus:ring-2 focus:ring-primary/30"
            />

            <p className="mt-2 text-xs text-muted-foreground">
              Optional link where visitors can verify the certificate.
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
                className="w-full rounded-lg border bg-background px-4 py-3 outline-none transition focus:ring-2 focus:ring-primary/30"
              />

              <p className="mt-2 text-xs text-muted-foreground">
                Leave empty if the certificate does not expire.
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
              Add Certificate
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