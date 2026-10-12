"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { createTechnology } from "@/actions/technologies";

export default function NewTechnologyPage() {
  const [name, setName] = useState("");

  const generateSlug = (value: string) => {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  const slug = generateSlug(name);

  return (
    <main className="min-h-screen px-6 py-24">
      <div className="container-custom">

        <Link
          href="/admin/technologies"
          className="mb-5 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft size={16} />
          Back to Technologies
        </Link>

        <div className="mb-10">
          <h1 className="text-4xl font-bold tracking-tight">
            Add Technology
          </h1>

          <p className="mt-3 text-muted-foreground">
            Add a technology that you use in your projects.
          </p>
        </div>

        <form
          action={createTechnology}
          className="card p-8 space-y-8"
        >

          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium"
            >
              Technology Name
            </label>

            <input
              id="name"
              name="name"
              type="text"
              placeholder="e.g. Next.js"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              Automatically generated from the technology name.
            </p>
          </div>

          {/* Icon */}
          <div>
            <label
              htmlFor="icon"
              className="mb-2 block text-sm font-medium"
            >
              Icon
            </label>

            <input
              id="icon"
              name="icon"
              type="text"
              placeholder="e.g. react, nextjs, java"
              className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-foreground/20"
            />

            <p className="mt-2 text-xs text-muted-foreground">
              Optional. We can connect this to an icon system later.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-3 pt-4 sm:flex-row">
            <button
              type="submit"
              className="btn-primary"
            >
              Create Technology
            </button>

            <Link
              href="/admin/technologies"
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