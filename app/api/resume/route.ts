import { prisma } from "@/lib/prisma";

export async function GET() {
  const settings = await prisma.siteSettings.findFirst({
    orderBy: { updatedAt: "desc" },
    select: { cvUrl: true },
  });

  if (!settings?.cvUrl) {
    return new Response("No resume has been uploaded.", { status: 404 });
  }

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  let resumeUrl: URL;

  try {
    resumeUrl = new URL(settings.cvUrl);
  } catch {
    return new Response("The saved resume URL is invalid.", { status: 500 });
  }

  if (
    !cloudName ||
    resumeUrl.protocol !== "https:" ||
    resumeUrl.hostname !== "res.cloudinary.com" ||
    !resumeUrl.pathname.startsWith(`/${cloudName}/raw/upload/`)
  ) {
    return new Response("The saved resume URL is not an approved file URL.", {
      status: 500,
    });
  }

  const resume = await fetch(resumeUrl, { cache: "no-store" });

  if (!resume.ok || !resume.body) {
    return new Response("The resume could not be downloaded.", {
      status: 502,
    });
  }

  return new Response(resume.body, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition":
        'attachment; filename="Ahmad-Khalid-Al-Mujahid-Resume.pdf"',
      "Cache-Control": "private, no-store",
    },
  });
}
