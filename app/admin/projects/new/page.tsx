import { prisma } from "@/lib/prisma";
import { createProject } from "@/actions/projects";
import ProjectForm from "@/components/admin/ProjectForm";

export default async function NewProjectPage() {
  const technologies = await prisma.technology.findMany({
    orderBy: {
      name: "asc",
    },
    select: {
      id: true,
      name: true,
    },
  });

  return (
    <ProjectForm
      action={createProject}
      technologies={technologies}
      submitLabel="Create Project"
      heading="Add Project"
      description="Add a new project to your portfolio."
    />
  );
}