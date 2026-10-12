"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const projectSchema = z.object({
  title: z.string().min(2, "Title is required"),

  slug: z
    .string()
    .min(2, "Slug is required")
    .regex(
      /^[a-z0-9-]+$/,
      "Slug can only contain lowercase letters, numbers, and hyphens"
    ),

  shortDescription: z
    .string()
    .trim()
    .min(5, "Short description must be at least 5 characters"),

  description: z
    .string()
    .min(10, "Description is required"),

  status: z.enum(["DRAFT", "PUBLISHED"]),

  githubUrl: z.string().optional(),

  liveUrl: z.string().optional(),

  featured: z.boolean(),

  sortOrder: z.number().int().min(0),

  technologyIds: z.array(z.string()).default([]),
});

export type ProjectActionState = {
  error?: string;
};

export async function createProject(
  _previousState: ProjectActionState,
  formData: FormData
): Promise<ProjectActionState> {
  const session = await auth();

  if (!session?.user) {
    redirect("/admin/login");
  }

  const technologyIds = formData
    .getAll("technologyIds")
    .map((value) => String(value));

  const result = projectSchema.safeParse({
    title: formData.get("title"),

    slug: formData.get("slug"),

    shortDescription: formData.get("shortDescription"),

    description: formData.get("description"),

    status: formData.get("status"),

    githubUrl: formData.get("githubUrl") || undefined,

    liveUrl: formData.get("liveUrl") || undefined,

    featured: formData.get("featured") === "on",

    sortOrder: Number(formData.get("sortOrder") || 0),

    technologyIds,
  });

  if (!result.success) {
    return {
      error: result.error.issues[0]?.message || "Invalid form data",
    };
  }

  const project = await prisma.project.create({
    data: {
      title: result.data.title,
      slug: result.data.slug,
      shortDescription: result.data.shortDescription,
      description: result.data.description,
      status: result.data.status,
      githubUrl: result.data.githubUrl,
      liveUrl: result.data.liveUrl,
      featured: result.data.featured,
      sortOrder: result.data.sortOrder,

      technologies: {
        create: result.data.technologyIds.map((technologyId) => ({
          technologyId,
        })),
      },
    },
  });

  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  revalidatePath(`/projects/${project.slug}`);

  redirect("/admin/projects");
}

export async function updateProject(
  projectId: string,
  _previousState: ProjectActionState,
  formData: FormData
): Promise<ProjectActionState> {
  const session = await auth();

  if (!session?.user) {
    redirect("/admin/login");
  }

  const technologyIds = formData
    .getAll("technologyIds")
    .map((value) => String(value));

  const result = projectSchema.safeParse({
    title: formData.get("title"),

    slug: formData.get("slug"),

    shortDescription: formData.get("shortDescription"),

    description: formData.get("description"),

    status: formData.get("status"),

    githubUrl: formData.get("githubUrl") || undefined,

    liveUrl: formData.get("liveUrl") || undefined,

    featured: formData.get("featured") === "on",

    sortOrder: Number(formData.get("sortOrder") || 0),

    technologyIds,
  });

  if (!result.success) {
    return {
      error: result.error.issues[0]?.message || "Invalid form data",
    };
  }

  await prisma.$transaction([
    prisma.projectTechnology.deleteMany({
      where: {
        projectId,
      },
    }),

    prisma.project.update({
      where: {
        id: projectId,
      },

      data: {
        title: result.data.title,
        slug: result.data.slug,
        shortDescription: result.data.shortDescription,
        description: result.data.description,
        status: result.data.status,
        githubUrl: result.data.githubUrl,
        liveUrl: result.data.liveUrl,
        featured: result.data.featured,
        sortOrder: result.data.sortOrder,

        technologies: {
          create: result.data.technologyIds.map((technologyId) => ({
            technologyId,
          })),
        },
      },
    }),
  ]);

  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  revalidatePath(`/projects/${result.data.slug}`);

  redirect("/admin/projects");
}

export async function deleteProject(projectId: string) {
  const session = await auth();

  if (!session?.user) {
    redirect("/admin/login");
  }

  await prisma.project.delete({
    where: {
      id: projectId,
    },
  });

  revalidatePath("/admin/projects");
  revalidatePath("/projects");
}