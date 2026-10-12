"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";
import { deleteTechnology } from "@/actions/technologies";

type DeleteTechnologyButtonProps = {
  technologyId: string;
};

export default function DeleteTechnologyButton({
  technologyId,
}: DeleteTechnologyButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this technology?"
    );

    if (!confirmed) {
      return;
    }

    startTransition(async () => {
      await deleteTechnology(technologyId);
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