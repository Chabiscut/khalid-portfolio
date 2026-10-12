"use server";

import { auth } from "@/auth";
import cloudinary from "@/lib/cloudinary";
import { redirect } from "next/navigation";

export async function uploadProjectImage(formData: FormData) {
  const session = await auth();

  if (!session?.user) {
    redirect("/admin/login");
  }

  const file = formData.get("file");

  if (!(file instanceof File)) {
    throw new Error("Please select an image.");
  }

  if (file.size === 0) {
    throw new Error("The selected file is empty.");
  }

  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
  ];

  if (!allowedTypes.includes(file.type)) {
    throw new Error(
      "Only JPG, PNG, WEBP, and GIF images are allowed."
    );
  }

  const maxSize = 5 * 1024 * 1024;

  if (file.size > maxSize) {
    throw new Error("Image size must be less than 5MB.");
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const result = await new Promise<{
    secure_url: string;
    public_id: string;
  }>((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "khalid-portfolio/projects",
        resource_type: "image",
      },
      (error, result) => {
        if (error) {
          reject(error);
          return;
        }

        if (!result) {
          reject(new Error("Cloudinary upload failed."));
          return;
        }

        resolve({
          secure_url: result.secure_url,
          public_id: result.public_id,
        });
      }
    );

    uploadStream.end(buffer);
  });

  return {
    url: result.secure_url,
    publicId: result.public_id,
  };
}