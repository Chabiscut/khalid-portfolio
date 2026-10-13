"use server";

import { requireAdmin } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const technologySchema = z.object({
  name: z.string().min(2, "Technology name is required"),
  slug: z
    .string()
    .min(2, "Slug is required")
    .regex(
      /^[a-z0-9-]+$/,
      "Slug can only contain lowercase letters, numbers, and hyphens"
    ),
  icon: z.string().optional(),
});

export async function createTechnology(formData: FormData) {
  await requireAdmin();

  const result = technologySchema.safeParse({
    name: formData.get("name"),
    slug: formData.get("slug"),
    icon: formData.get("icon") || undefined,
  });

  if (!result.success) {
    throw new Error(
      result.error.issues[0]?.message || "Invalid form data"
    );
  }

  await prisma.technology.create({
    data: result.data,
  });

  revalidatePath("/admin/technologies");
  revalidatePath("/projects");

  redirect("/admin/technologies");
}

export async function updateTechnology(
  technologyId: string,
  formData: FormData
) {
  await requireAdmin();

  const result = technologySchema.safeParse({
    name: formData.get("name"),
    slug: formData.get("slug"),
    icon: formData.get("icon") || undefined,
  });

  if (!result.success) {
    throw new Error(
      result.error.issues[0]?.message || "Invalid form data"
    );
  }

  await prisma.technology.update({
    where: {
      id: technologyId,
    },
    data: result.data,
  });

  revalidatePath("/admin/technologies");
  revalidatePath("/projects");

  redirect("/admin/technologies");
}

export async function deleteTechnology(technologyId: string) {
  await requireAdmin();

  await prisma.technology.delete({
    where: {
      id: technologyId,
    },
  });

  revalidatePath("/admin/technologies");
  revalidatePath("/projects");
}