"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const skillSchema = z.object({
  name: z.string().min(2, "Skill name is required"),
  category: z.string().optional(),
  level: z
    .number()
    .int()
    .min(0, "Level cannot be less than 0")
    .max(100, "Level cannot be more than 100")
    .optional(),
  icon: z.string().optional(),
  sortOrder: z.number().int().min(0),
});

export async function createSkill(formData: FormData) {
  const session = await auth();

  if (!session?.user) {
    redirect("/admin/login");
  }

  const result = skillSchema.safeParse({
    name: formData.get("name"),
    category: formData.get("category") || undefined,
    level: formData.get("level")
      ? Number(formData.get("level"))
      : undefined,
    icon: formData.get("icon") || undefined,
    sortOrder: Number(formData.get("sortOrder") || 0),
  });

  if (!result.success) {
    throw new Error(
      result.error.issues[0]?.message || "Invalid skill data"
    );
  }

  await prisma.skill.create({
    data: {
      name: result.data.name,
      category: result.data.category,
      level: result.data.level,
      icon: result.data.icon,
      sortOrder: result.data.sortOrder,
    },
  });

  revalidatePath("/admin/skills");
  redirect("/admin/skills");
}

export async function updateSkill(
  skillId: string,
  formData: FormData
) {
  const session = await auth();

  if (!session?.user) {
    redirect("/admin/login");
  }

  const result = skillSchema.safeParse({
    name: formData.get("name"),
    category: formData.get("category") || undefined,
    level: formData.get("level")
      ? Number(formData.get("level"))
      : undefined,
    icon: formData.get("icon") || undefined,
    sortOrder: Number(formData.get("sortOrder") || 0),
  });

  if (!result.success) {
    throw new Error(
      result.error.issues[0]?.message || "Invalid skill data"
    );
  }

  await prisma.skill.update({
    where: {
      id: skillId,
    },
    data: {
      name: result.data.name,
      category: result.data.category,
      level: result.data.level,
      icon: result.data.icon,
      sortOrder: result.data.sortOrder,
    },
  });

  revalidatePath("/admin/skills");
  redirect("/admin/skills");
}

export async function deleteSkill(skillId: string) {
  const session = await auth();

  if (!session?.user) {
    redirect("/admin/login");
  }

  await prisma.skill.delete({
    where: {
      id: skillId,
    },
  });

  revalidatePath("/admin/skills");
}