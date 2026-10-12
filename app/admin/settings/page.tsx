import Link from "next/link";
import { ArrowLeft, ExternalLink, Upload } from "lucide-react";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { saveSiteSettings, uploadResume } from "@/actions/site-settings";
import { prisma } from "@/lib/prisma";

export default async function AdminSettingsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/admin/login");
  }

  const settings = await prisma.siteSettings.findFirst({
    orderBy: { updatedAt: "desc" },
  });

  return (
    <main className="min-h-screen px-6 py-24">
      <div className="container-custom max-w-4xl">
        <Link
          href="/admin"
          className="mb-5 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft size={16} />
          Back to Dashboard
        </Link>

        <div className="mb-10">
          <p className="text-sm font-medium text-muted-foreground">
            Administration
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight">
            Site Settings
          </h1>
          <p className="mt-3 text-muted-foreground">
            Update your public contact details and social links.
          </p>
        </div>

        <form action={saveSiteSettings} className="card space-y-6 p-6 sm:p-8">
          <div>
            <label htmlFor="siteTitle" className="mb-2 block text-sm font-medium">
              Site title
            </label>
            <input
              id="siteTitle"
              name="siteTitle"
              required
              maxLength={120}
              defaultValue={settings?.siteTitle ?? ""}
              className="w-full rounded-xl border border-border bg-background px-4 py-3"
            />
          </div>

          <div>
            <label
              htmlFor="siteDescription"
              className="mb-2 block text-sm font-medium"
            >
              Site description
            </label>
            <textarea
              id="siteDescription"
              name="siteDescription"
              rows={3}
              maxLength={500}
              defaultValue={settings?.siteDescription ?? ""}
              className="w-full rounded-xl border border-border bg-background px-4 py-3"
            />
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                defaultValue={settings?.email ?? ""}
                className="w-full rounded-xl border border-border bg-background px-4 py-3"
              />
            </div>

            <div>
              <label htmlFor="phone" className="mb-2 block text-sm font-medium">
                Phone
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                maxLength={40}
                defaultValue={settings?.phone ?? ""}
                className="w-full rounded-xl border border-border bg-background px-4 py-3"
              />
            </div>

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
                maxLength={120}
                defaultValue={settings?.location ?? ""}
                className="w-full rounded-xl border border-border bg-background px-4 py-3"
              />
            </div>

            <div>
              <label
                htmlFor="githubUrl"
                className="mb-2 block text-sm font-medium"
              >
                GitHub profile
              </label>
              <input
                id="githubUrl"
                name="githubUrl"
                type="url"
                defaultValue={settings?.githubUrl ?? ""}
                className="w-full rounded-xl border border-border bg-background px-4 py-3"
              />
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="linkedinUrl"
                className="mb-2 block text-sm font-medium"
              >
                LinkedIn profile
              </label>
              <input
                id="linkedinUrl"
                name="linkedinUrl"
                type="url"
                defaultValue={settings?.linkedinUrl ?? ""}
                className="w-full rounded-xl border border-border bg-background px-4 py-3"
              />
            </div>
          </div>

          <button type="submit" className="btn-primary">
            Save Settings
          </button>
        </form>

        <section className="card mt-8 p-6 sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold">Resume / CV</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Upload a PDF up to 10MB. The public Download Resume button will
                become active as soon as it is uploaded.
              </p>
            </div>
            {settings?.cvUrl && (
              <Link
                href="/api/resume"
                className="btn-secondary inline-flex shrink-0 items-center gap-2"
              >
                <ExternalLink size={16} />
                Test download
              </Link>
            )}
          </div>

          <form action={uploadResume} className="mt-6 space-y-4">
            <div>
              <label htmlFor="resume" className="mb-2 block text-sm font-medium">
                Choose PDF
              </label>
              <input
                id="resume"
                name="resume"
                type="file"
                accept="application/pdf,.pdf"
                required
                className="block w-full rounded-xl border border-border bg-background px-4 py-3 text-sm"
              />
            </div>
            <button type="submit" className="btn-primary inline-flex items-center gap-2">
              <Upload size={16} />
              Upload Resume
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
