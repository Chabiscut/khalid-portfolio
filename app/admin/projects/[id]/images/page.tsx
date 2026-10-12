import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import {
  ArrowLeft,
  ImagePlus,
  ExternalLink,
} from "lucide-react";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { addProjectImage } from "@/actions/project-images";

import DeleteProjectImageButton from "@/components/admin/DeleteProjectImageButton";

type ProjectImagesPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProjectImagesPage({
  params,
}: ProjectImagesPageProps) {
  const session = await auth();

  if (!session?.user) {
    redirect("/admin/login");
  }

  const { id } = await params;

  const project = await prisma.project.findUnique({
    where: {
      id,
    },
    include: {
      images: {
        orderBy: {
          sortOrder: "asc",
        },
      },
    },
  });

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen px-6 py-24">
      <div className="container-custom">

        {/* Back to Projects */}
        <Link
          href="/admin/projects"
          className="mb-5 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft size={16} />
          Back to Projects
        </Link>

        {/* Page Header */}
        <div className="mb-10">
          <p className="text-sm text-muted-foreground">
            Project Images
          </p>

          <h1 className="mt-2 text-4xl font-bold tracking-tight">
            {project.title}
          </h1>

          <p className="mt-3 text-muted-foreground">
            Upload and manage images for this project.
          </p>
        </div>

        {/* Upload Image */}
        <div className="card mb-10 p-8">
          <div className="mb-6">
            <h2 className="text-xl font-semibold">
              Upload Image
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
              Upload a JPG, PNG, WEBP, or GIF image.
              Maximum file size is 5MB.
            </p>
          </div>

            <form
               action={addProjectImage}
               className="space-y-6"
            > 
            {/* Project ID */}
            <input
              type="hidden"
              name="projectId"
              value={project.id}
            />

            {/* Image File */}
            <div>
              <label
                htmlFor="file"
                className="mb-2 block text-sm font-medium"
              >
                Project Image
              </label>

              <input
                id="file"
                name="file"
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                required
                className="block w-full cursor-pointer rounded-xl border border-border bg-background px-4 py-3 text-sm"
              />
            </div>

            {/* Alt Text */}
            <div>
              <label
                htmlFor="alt"
                className="mb-2 block text-sm font-medium"
              >
                Alt Text
              </label>

              <input
                id="alt"
                name="alt"
                type="text"
                placeholder="Screenshot of the project dashboard"
                className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-foreground/20"
              />

              <p className="mt-2 text-xs text-muted-foreground">
                Describe the image for accessibility.
              </p>
            </div>

            {/* Upload Button */}
            <button
              type="submit"
              className="btn-primary inline-flex items-center gap-2"
            >
              <ImagePlus size={18} />
              Upload Image
            </button>
          </form>
        </div>

        {/* Existing Images */}
        <div>
          <div className="mb-5">
            <h2 className="text-2xl font-semibold">
              Project Images
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
              {project.images.length} image
              {project.images.length !== 1 ? "s" : ""}
            </p>
          </div>

          {project.images.length === 0 ? (
            <div className="card p-10 text-center">
              <ImagePlus
                size={32}
                className="mx-auto mb-4 text-muted-foreground"
              />

              <h3 className="text-lg font-semibold">
                No images yet
              </h3>

              <p className="mt-2 text-sm text-muted-foreground">
                Upload your first project image using the
                form above.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {project.images.map((image) => (
                <div
                  key={image.id}
                  className="card overflow-hidden"
                >
                  {/* Image Preview */}
                  <div className="aspect-video overflow-hidden bg-muted">
                    <img
                      src={image.url}
                      alt={image.alt || project.title}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* Image Details */}
                  <div className="p-5">
                    <p className="truncate text-sm text-muted-foreground">
                      {image.alt || "No alt text"}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-3">

                      {/* View */}
                      <a
                        href={image.url}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-secondary inline-flex items-center gap-2"
                      >
                        <ExternalLink size={16} />
                        View
                      </a>

                      {/* Delete */}
                      <DeleteProjectImageButton
                        imageId={image.id}
                      />

                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </main>
  );
}