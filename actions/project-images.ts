"use server";

import { requireAdmin } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import cloudinary from "@/lib/cloudinary";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const projectImageSchema = z.object({
  projectId: z.string().min(1, "Project ID is required"),
  alt: z.string().optional(),
});

export async function addProjectImage(formData: FormData) {
  await requireAdmin();

  const file = formData.get("file");

  if (!(file instanceof File)) {
    throw new Error("Please select an image.");
  }

  if (file.size === 0) {
    throw new Error("The selected image is empty.");
  }

  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
  ];

  if (!allowedTypes.includes(file.type)) {
    throw new Error(
      "Only JPG, PNG, WEBP, and GIF images are allowed."
    );
  }

  const maxSize = 5 * 1024 * 1024;

  if (file.size > maxSize) {
    throw new Error("Image size must be less than 5MB.");
  }

  const result = projectImageSchema.safeParse({
    projectId: formData.get("projectId"),
    alt: formData.get("alt") || undefined,
  });

  if (!result.success) {
    throw new Error(
      result.error.issues[0]?.message || "Invalid image data"
    );
  }

  const project = await prisma.project.findUnique({
    where: {
      id: result.data.projectId,
    },
    select: {
      id: true,
      slug: true,
    },
  });

  if (!project) {
    throw new Error("Project not found.");
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadResult = await new Promise<{
    secure_url: string;
    public_id: string;
  }>((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "khalid-portfolio/projects",
        resource_type: "image",
      },
      (error, result) => {
        if (error) {
          reject(error);
          return;
        }

        if (!result) {
          reject(new Error("Cloudinary upload failed."));
          return;
        }

        resolve({
          secure_url: result.secure_url,
          public_id: result.public_id,
        });
      }
    );

    uploadStream.end(buffer);
  });

  const lastImage = await prisma.projectImage.findFirst({
    where: {
      projectId: project.id,
    },
    orderBy: {
      sortOrder: "desc",
    },
  });

await prisma.projectImage.create({
  data: {
    projectId: project.id,
    url: uploadResult.secure_url,
    publicId: uploadResult.public_id,
    alt: result.data.alt,
    sortOrder: lastImage ? lastImage.sortOrder + 1 : 0,
  },
});

  revalidatePath("/admin/projects");
  revalidatePath(`/admin/projects/${project.id}/images`);
  revalidatePath(`/projects/${project.slug}`);

  redirect(`/admin/projects/${project.id}/images`);
}

export async function deleteProjectImage(imageId: string) {
  await requireAdmin();

  const image = await prisma.projectImage.findUnique({
    where: {
      id: imageId,
    },
select: {
  id: true,
  projectId: true,
  url: true,
  publicId: true,
  project: {
        select: {
          slug: true,
        },
      },
    },
  });

  if (!image) {
    throw new Error("Image not found.");
  }
  if (image.publicId) {
  await cloudinary.uploader.destroy(image.publicId, {
    resource_type: "image",
  });
}

  await prisma.projectImage.delete({
    where: {
      id: imageId,
    },
  });

  revalidatePath("/admin/projects");
  revalidatePath(
    `/admin/projects/${image.projectId}/images`
  );
  revalidatePath(`/projects/${image.project.slug}`);
}