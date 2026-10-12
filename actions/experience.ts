"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const experienceSchema = z.object({
  company: z.string().min(2, "Company name is required"),
  position: z.string().min(2, "Position is required"),
  description: z.string().optional(),
  location: z.string().optional(),
  type: z.enum([
    "FULL_TIME",
    "PART_TIME",
    "INTERNSHIP",
    "FREELANCE",
    "PROJECT",
  ]),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  current: z.boolean(),
  sortOrder: z.number().int().min(0),
});

export async function createExperience(formData: FormData) {
  const session = await auth();

  if (!session?.user) {
    redirect("/admin/login");
  }

  const result = experienceSchema.safeParse({
    company: formData.get("company"),
    position: formData.get("position"),
    description: formData.get("description") || undefined,
    location: formData.get("location") || undefined,
    type: formData.get("type"),
    startDate: formData.get("startDate"),
    endDate: formData.get("endDate") || undefined,
    current: formData.get("current") === "on",
    sortOrder: Number(formData.get("sortOrder") || 0),
  });

  if (!result.success) {
    throw new Error(
      result.error.issues[0]?.message || "Invalid experience data"
    );
  }

  if (result.data.current && result.data.endDate) {
    throw new Error(
      "A current experience should not have an end date."
    );
  }

  await prisma.experience.create({
    data: {
      company: result.data.company,
      position: result.data.position,
      description: result.data.description,
      location: result.data.location,
      type: result.data.type,
      startDate: new Date(result.data.startDate),
      endDate: result.data.endDate
        ? new Date(result.data.endDate)
        : null,
      current: result.data.current,
      sortOrder: result.data.sortOrder,
    },
  });

  revalidatePath("/admin/experience");
  revalidatePath("/experience");

  redirect("/admin/experience");
}

export async function updateExperience(
  experienceId: string,
  formData: FormData
) {
  const session = await auth();

  if (!session?.user) {
    redirect("/admin/login");
  }

  const result = experienceSchema.safeParse({
    company: formData.get("company"),
    position: formData.get("position"),
    description: formData.get("description") || undefined,
    location: formData.get("location") || undefined,
    type: formData.get("type"),
    startDate: formData.get("startDate"),
    endDate: formData.get("endDate") || undefined,
    current: formData.get("current") === "on",
    sortOrder: Number(formData.get("sortOrder") || 0),
  });

  if (!result.success) {
    throw new Error(
      result.error.issues[0]?.message || "Invalid experience data"
    );
  }

  if (result.data.current && result.data.endDate) {
    throw new Error(
      "A current experience should not have an end date."
    );
  }

  await prisma.experience.update({
    where: {
      id: experienceId,
    },
    data: {
      company: result.data.company,
      position: result.data.position,
      description: result.data.description,
      location: result.data.location,
      type: result.data.type,
      startDate: new Date(result.data.startDate),
      endDate: result.data.endDate
        ? new Date(result.data.endDate)
        : null,
      current: result.data.current,
      sortOrder: result.data.sortOrder,
    },
  });

  revalidatePath("/admin/experience");
  revalidatePath("/experience");

  redirect("/admin/experience");
}

export async function deleteExperience(experienceId: string) {
  const session = await auth();

  if (!session?.user) {
    redirect("/admin/login");
  }

  await prisma.experience.delete({
    where: {
      id: experienceId,
    },
  });

  revalidatePath("/admin/experience");
  revalidatePath("/experience");
}