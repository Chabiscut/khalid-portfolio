import "dotenv/config";

import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not set");
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString }),
});

async function main() {
  const removedDemoProjects = await prisma.project.deleteMany({
    where: {
      slug: {
        in: [
          "portfolio-platform",
          "task-notes-manager",
          "learning-tracker",
        ],
      },
    },
  });

  const settingsData = {
    siteTitle: "Ahmad Khalid Al Mujahid | Software Engineering",
    siteDescription:
      "Personal portfolio of Ahmad Khalid Al Mujahid, a Computer Science student focused on software engineering, web development, and practical digital products.",
    email: "khalidalmujahid684@gmail.com",
    location: "Bangladesh",
    githubUrl: "https://github.com/Chabiscut",
    linkedinUrl: "https://www.linkedin.com/in/khalid-al-mujahid-a93872309",
  };

  const existingSettings = await prisma.siteSettings.findFirst({
    orderBy: { updatedAt: "desc" },
  });

  if (existingSettings) {
    await prisma.siteSettings.update({
      where: { id: existingSettings.id },
      data: settingsData,
    });
  } else {
    await prisma.siteSettings.create({
      data: settingsData,
    });
  }

  const technologies = [
    { name: "Next.js", slug: "nextjs" },
    { name: "TypeScript", slug: "typescript" },
    { name: "React", slug: "react" },
    { name: "Tailwind CSS", slug: "tailwind-css" },
    { name: "PostgreSQL", slug: "postgresql" },
    { name: "Prisma", slug: "prisma" },
    { name: "Node.js", slug: "nodejs" },
    { name: "GitHub", slug: "github" },
  ];

  await Promise.all(
    technologies.map((technology) =>
      prisma.technology.upsert({
        where: { slug: technology.slug },
        update: { name: technology.name },
        create: technology,
      })
    )
  );

  console.log(`Removed ${removedDemoProjects.count} demo projects.`);
  console.log("Portfolio seed complete; existing portfolio content was preserved.");
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
