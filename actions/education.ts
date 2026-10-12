"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const educationSchema = z.object({
  institution: z.string().min(2, "Institution name is required"),
  degree: z.string().min(2, "Degree is required"),
  field: z.string().optional(),
  description: z.string().optional(),
  location: z.string().optional(),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  current: z.boolean(),
  sortOrder: z.number().int().min(0),
});

export async function createEducation(formData: FormData) {
  const session = await auth();

  if (!session?.user) {
    redirect("/admin/login");
  }

  const result = educationSchema.safeParse({
    institution: formData.get("institution"),
    degree: formData.get("degree"),
    field: formData.get("field") || undefined,
    description: formData.get("description") || undefined,
    location: formData.get("location") || undefined,
    startDate: formData.get("startDate"),
    endDate: formData.get("endDate") || undefined,
    current: formData.get("current") === "on",
    sortOrder: Number(formData.get("sortOrder") || 0),
  });

  if (!result.success) {
    throw new Error(
      result.error.issues[0]?.message || "Invalid education data"
    );
  }

  if (result.data.current && result.data.endDate) {
    throw new Error(
      "Current education should not have an end date."
    );
  }

  await prisma.education.create({
    data: {
      institution: result.data.institution,
      degree: result.data.degree,
      field: result.data.field,
      description: result.data.description,
      location: result.data.location,
      startDate: new Date(result.data.startDate),
      endDate: result.data.endDate
        ? new Date(result.data.endDate)
        : null,
      current: result.data.current,
      sortOrder: result.data.sortOrder,
    },
  });

  revalidatePath("/admin/education");
  revalidatePath("/education");

  redirect("/admin/education");
}

export async function updateEducation(
  educationId: string,
  formData: FormData
) {
  const session = await auth();

  if (!session?.user) {
    redirect("/admin/login");
  }

  const result = educationSchema.safeParse({
    institution: formData.get("institution"),
    degree: formData.get("degree"),
    field: formData.get("field") || undefined,
    description: formData.get("description") || undefined,
    location: formData.get("location") || undefined,
    startDate: formData.get("startDate"),
    endDate: formData.get("endDate") || undefined,
    current: formData.get("current") === "on",
    sortOrder: Number(formData.get("sortOrder") || 0),
  });

  if (!result.success) {
    throw new Error(
      result.error.issues[0]?.message || "Invalid education data"
    );
  }

  if (result.data.current && result.data.endDate) {
    throw new Error(
      "Current education should not have an end date."
    );
  }

  await prisma.education.update({
    where: {
      id: educationId,
    },
    data: {
      institution: result.data.institution,
      degree: result.data.degree,
      field: result.data.field,
      description: result.data.description,
      location: result.data.location,
      startDate: new Date(result.data.startDate),
      endDate: result.data.endDate
        ? new Date(result.data.endDate)
        : null,
      current: result.data.current,
      sortOrder: result.data.sortOrder,
    },
  });

  revalidatePath("/admin/education");
  revalidatePath("/education");

  redirect("/admin/education");
}

export async function deleteEducation(educationId: string) {
  const session = await auth();

  if (!session?.user) {
    redirect("/admin/login");
  }

  await prisma.education.delete({
    where: {
      id: educationId,
    },
  });

  revalidatePath("/admin/education");
  revalidatePath("/education");
}