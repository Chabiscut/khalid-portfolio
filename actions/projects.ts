"use server";

import { requireAdmin } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const optionalHttpUrl = z
  .url("Enter a valid URL")
  .refine((value) => /^https?:\/\//i.test(value), "URL must use HTTP or HTTPS")
  .optional();

const projectSchema = z.object({
  title: z.string().trim().min(2, "Title is required"),

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

  githubUrl: optionalHttpUrl,

  liveUrl: optionalHttpUrl,

  featured: z.boolean(),

  sortOrder: z.number().int().min(0),

  technologyIds: z.array(z.string().min(1)).default([]),
});

export type ProjectActionState = {
  error?: string;
};

export async function createProject(
  _previousState: ProjectActionState,
  formData: FormData
): Promise<ProjectActionState> {
  await requireAdmin();

  const rawTechnologyIds = formData
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

    technologyIds: rawTechnologyIds,
  });

  if (!result.success) {
    return {
      error: result.error.issues[0]?.message || "Invalid form data",
    };
  }

  const uniqueTechnologyIds = [...new Set(result.data.technologyIds)];
  const technologies = await prisma.technology.findMany({
    where: { id: { in: uniqueTechnologyIds } },
    select: { id: true },
  });

  if (technologies.length !== uniqueTechnologyIds.length) {
    return { error: "One or more selected technologies no longer exist." };
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
        create: uniqueTechnologyIds.map((technologyId) => ({
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
  await requireAdmin();

  const rawTechnologyIds = formData
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

    technologyIds: rawTechnologyIds,
  });

  if (!result.success) {
    return {
      error: result.error.issues[0]?.message || "Invalid form data",
    };
  }

  const existingProject = await prisma.project.findUnique({
    where: { id: projectId },
    select: { slug: true },
  });

  if (!existingProject) {
    return { error: "Project not found." };
  }

  const uniqueTechnologyIds = [...new Set(result.data.technologyIds)];
  const technologies = await prisma.technology.findMany({
    where: { id: { in: uniqueTechnologyIds } },
    select: { id: true },
  });

  if (technologies.length !== uniqueTechnologyIds.length) {
    return { error: "One or more selected technologies no longer exist." };
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
          create: uniqueTechnologyIds.map((technologyId) => ({
            technologyId,
          })),
        },
      },
    }),
  ]);

  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  revalidatePath("/projects/" + existingProject.slug);
  revalidatePath(`/projects/${result.data.slug}`);

  redirect("/admin/projects");
}

export async function deleteProject(projectId: string) {
  await requireAdmin();

  const project = await prisma.project.findUnique({
    where: { id: projectId },
    select: { slug: true },
  });

  if (!project) {
    return;
  }

  await prisma.project.delete({
    where: {
      id: projectId,
    },
  });

  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  revalidatePath("/projects/" + project.slug);
}
