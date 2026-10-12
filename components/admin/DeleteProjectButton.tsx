"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";
import { deleteProject } from "@/actions/projects";

type DeleteProjectButtonProps = {
  projectId: string;
};

export default function DeleteProjectButton({
  projectId,
}: DeleteProjectButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmed) {
      return;
    }

    startTransition(async () => {
      await deleteProject(projectId);
    });
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isPending}
      className="btn-secondary inline-flex items-center gap-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
    >
      <Trash2 size={16} />
      {isPending ? "Deleting..." : "Delete"}
    </button>
  );
}