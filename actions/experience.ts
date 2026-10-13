"use server";

import { requireAdmin } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const experienceSchema = z.object({
  company: z.string().trim().min(2, "Company name is required"),
  position: z.string().trim().min(2, "Position is required"),
  description: z.string().optional(),
  location: z.string().optional(),
  type: z.enum([
    "FULL_TIME",
    "PART_TIME",
    "INTERNSHIP",
    "FREELANCE",
    "PROJECT",
  ]),
  startDate: z.iso.date("Enter a valid start date"),
  endDate: z.iso.date("Enter a valid end date").optional(),
  current: z.boolean(),
  sortOrder: z.number().int().min(0),
}).superRefine((value, context) => {
  if (value.endDate && value.endDate < value.startDate) {
    context.addIssue({
      code: "custom",
      path: ["endDate"],
      message: "End date must be on or after the start date.",
    });
  }
});

export async function createExperience(formData: FormData) {
  await requireAdmin();

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
  await requireAdmin();

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
  await requireAdmin();

  await prisma.experience.delete({
    where: {
      id: experienceId,
    },
  });

  revalidatePath("/admin/experience");
  revalidatePath("/experience");
}