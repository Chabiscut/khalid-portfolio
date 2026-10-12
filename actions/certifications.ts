"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const certificationSchema = z.object({
  name: z.string().min(2, "Certificate name is required"),
  issuer: z.string().min(2, "Issuer is required"),
  description: z.string().optional(),
  credentialId: z.string().optional(),
  credentialUrl: z
    .string()
    .url("Credential URL must be a valid URL")
    .optional(),
  issueDate: z.string().min(1, "Issue date is required"),
  expiryDate: z.string().optional(),
  sortOrder: z.number().int().min(0),
});

export async function createCertification(formData: FormData) {
  const session = await auth();

  if (!session?.user) {
    redirect("/admin/login");
  }

  const result = certificationSchema.safeParse({
    name: formData.get("name"),
    issuer: formData.get("issuer"),
    description: formData.get("description") || undefined,
    credentialId: formData.get("credentialId") || undefined,
    credentialUrl: formData.get("credentialUrl") || undefined,
    issueDate: formData.get("issueDate"),
    expiryDate: formData.get("expiryDate") || undefined,
    sortOrder: Number(formData.get("sortOrder") || 0),
  });

  if (!result.success) {
    throw new Error(
      result.error.issues[0]?.message || "Invalid certification data"
    );
  }

  await prisma.certification.create({
    data: {
      name: result.data.name,
      issuer: result.data.issuer,
      description: result.data.description,
      credentialId: result.data.credentialId,
      credentialUrl: result.data.credentialUrl,
      issueDate: new Date(result.data.issueDate),
      expiryDate: result.data.expiryDate
        ? new Date(result.data.expiryDate)
        : null,
      sortOrder: result.data.sortOrder,
    },
  });

  revalidatePath("/admin/certificates");
  revalidatePath("/certificates");

  redirect("/admin/certificates");
}

export async function updateCertification(
  certificationId: string,
  formData: FormData
) {
  const session = await auth();

  if (!session?.user) {
    redirect("/admin/login");
  }

  const result = certificationSchema.safeParse({
    name: formData.get("name"),
    issuer: formData.get("issuer"),
    description: formData.get("description") || undefined,
    credentialId: formData.get("credentialId") || undefined,
    credentialUrl: formData.get("credentialUrl") || undefined,
    issueDate: formData.get("issueDate"),
    expiryDate: formData.get("expiryDate") || undefined,
    sortOrder: Number(formData.get("sortOrder") || 0),
  });

  if (!result.success) {
    throw new Error(
      result.error.issues[0]?.message || "Invalid certification data"
    );
  }

  await prisma.certification.update({
    where: {
      id: certificationId,
    },
    data: {
      name: result.data.name,
      issuer: result.data.issuer,
      description: result.data.description,
      credentialId: result.data.credentialId,
      credentialUrl: result.data.credentialUrl,
      issueDate: new Date(result.data.issueDate),
      expiryDate: result.data.expiryDate
        ? new Date(result.data.expiryDate)
        : null,
      sortOrder: result.data.sortOrder,
    },
  });

  revalidatePath("/admin/certificates");
  revalidatePath("/certificates");

  redirect("/admin/certificates");
}

export async function deleteCertification(certificationId: string) {
  const session = await auth();

  if (!session?.user) {
    redirect("/admin/login");
  }

  await prisma.certification.delete({
    where: {
      id: certificationId,
    },
  });

  revalidatePath("/admin/certificates");
  revalidatePath("/certificates");
}