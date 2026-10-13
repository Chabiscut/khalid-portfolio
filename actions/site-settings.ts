"use server";

import { requireAdmin } from "@/lib/admin-auth";
import cloudinary from "@/lib/cloudinary";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const optionalText = (maxLength: number) =>
  z.string().trim().max(maxLength);

const httpsUrl = z.union([
  z.literal(""),
  z.url().refine((value) => value.startsWith("https://"), {
    message: "Use a secure HTTPS URL.",
  }),
]);

const settingsSchema = z.object({
  siteTitle: optionalText(120).min(1, "Site title is required."),
  siteDescription: optionalText(500),
  email: z.union([z.literal(""), z.email()]),
  phone: optionalText(40),
  location: optionalText(120),
  githubUrl: httpsUrl,
  linkedinUrl: httpsUrl,
});

export async function saveSiteSettings(formData: FormData) {
  await requireAdmin();

  const result = settingsSchema.safeParse({
    siteTitle: formData.get("siteTitle"),
    siteDescription: formData.get("siteDescription"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    location: formData.get("location"),
    githubUrl: formData.get("githubUrl"),
    linkedinUrl: formData.get("linkedinUrl"),
  });

  if (!result.success) {
    throw new Error(result.error.issues[0]?.message || "Invalid site settings.");
  }

  const data = {
    ...result.data,
    siteDescription: result.data.siteDescription || null,
    email: result.data.email || null,
    phone: result.data.phone || null,
    location: result.data.location || null,
    githubUrl: result.data.githubUrl || null,
    linkedinUrl: result.data.linkedinUrl || null,
  };
  const existingSettings = await prisma.siteSettings.findFirst({
    orderBy: { updatedAt: "desc" },
  });

  if (existingSettings) {
    await prisma.siteSettings.update({
      where: { id: existingSettings.id },
      data,
    });
  } else {
    await prisma.siteSettings.create({ data });
  }

  revalidatePath("/");
  revalidatePath("/admin/settings");
  redirect("/admin/settings");
}

export async function uploadResume(formData: FormData) {
  await requireAdmin();

  const file = formData.get("resume");

  if (!(file instanceof File) || !file.name.toLowerCase().endsWith(".pdf")) {
    throw new Error("Select a PDF file to upload.");
  }

  if (file.type !== "application/pdf") {
    throw new Error("The selected file must be a PDF.");
  }

  if (file.size === 0 || file.size > 10 * 1024 * 1024) {
    throw new Error("The PDF must be larger than 0 bytes and no more than 10MB.");
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const uploadedFile = await new Promise<{ secure_url: string }>(
    (resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "khalid-portfolio/resumes",
          public_id: "resume",
          resource_type: "raw",
          overwrite: true,
          invalidate: true,
        },
        (error, result) => {
          if (error) {
            reject(error);
            return;
          }

          if (!result?.secure_url) {
            reject(new Error("Cloudinary did not return a resume URL."));
            return;
          }

          resolve({ secure_url: result.secure_url });
        }
      );

      uploadStream.end(buffer);
    }
  );

  const existingSettings = await prisma.siteSettings.findFirst({
    orderBy: { updatedAt: "desc" },
  });

  if (existingSettings) {
    await prisma.siteSettings.update({
      where: { id: existingSettings.id },
      data: { cvUrl: uploadedFile.secure_url },
    });
  } else {
    await prisma.siteSettings.create({
      data: { cvUrl: uploadedFile.secure_url },
    });
  }

  revalidatePath("/");
  revalidatePath("/admin/settings");
  redirect("/admin/settings");
}
