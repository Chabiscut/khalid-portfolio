import { notFound, redirect } from "next/navigation";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { updateProject } from "@/actions/projects";
import ProjectForm from "@/components/admin/ProjectForm";

type EditProjectPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditProjectPage({
  params,
}: EditProjectPageProps) {
  const session = await auth();

  if (!session?.user) {
    redirect("/admin/login");
  }

  const { id } = await params;

  const project = await prisma.project.findUnique({
    where: {
      id,
    },
    include: {
      technologies: {
        select: {
          technologyId: true,
        },
      },
    },
  });

  if (!project) {
    notFound();
  }

  const technologies = await prisma.technology.findMany({
    orderBy: {
      name: "asc",
    },
    select: {
      id: true,
      name: true,
    },
  });

  const updateProjectWithId = updateProject.bind(
    null,
    project.id
  );

  return (
    <ProjectForm
      action={updateProjectWithId}
      technologies={technologies}
      initialData={{
        title: project.title,
        slug: project.slug,
        shortDescription: project.shortDescription,
        description: project.description,
        status: project.status,
        githubUrl: project.githubUrl ?? "",
        liveUrl: project.liveUrl ?? "",
        featured: project.featured,
        sortOrder: project.sortOrder,
        technologyIds: project.technologies.map(
          (technology) => technology.technologyId
        ),
      }}
      submitLabel="Save Changes"
      heading="Edit Project"
      description="Update your project information."
    />
  );
}