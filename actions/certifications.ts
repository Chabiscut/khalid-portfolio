"use server";

import { requireAdmin } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const certificationSchema = z.object({
  name: z.string().trim().min(2, "Certificate name is required"),
  issuer: z.string().trim().min(2, "Issuer is required"),
  description: z.string().optional(),
  credentialId: z.string().optional(),
  credentialUrl: z.url("Credential URL must be a valid URL")
    .refine((value) => /^https?:\/\//i.test(value), "Credential URL must use HTTP or HTTPS")
    .optional(),
  issueDate: z.iso.date("Enter a valid issue date"),
  expiryDate: z.iso.date("Enter a valid expiry date").optional(),
  sortOrder: z.number().int().min(0),
}).superRefine((value, context) => {
  if (value.expiryDate && value.expiryDate < value.issueDate) {
    context.addIssue({
      code: "custom",
      path: ["expiryDate"],
      message: "Expiry date must be on or after the issue date.",
    });
  }
});

export async function createCertification(formData: FormData) {
  await requireAdmin();

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
  await requireAdmin();

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
  await requireAdmin();

  await prisma.certification.delete({
    where: {
      id: certificationId,
    },
  });

  revalidatePath("/admin/certificates");
  revalidatePath("/certificates");
}