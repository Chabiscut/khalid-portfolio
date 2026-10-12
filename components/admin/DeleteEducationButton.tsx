"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";

import { deleteEducation } from "@/actions/education";

type DeleteEducationButtonProps = {
  educationId: string;
};

export default function DeleteEducationButton({
  educationId,
}: DeleteEducationButtonProps) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this education record?"
    );

    if (!confirmed) {
      return;
    }

    startTransition(async () => {
      await deleteEducation(educationId);
    });
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isPending}
      className="inline-flex items-center gap-2 rounded-lg border border-red-500/30 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-50 dark:text-red-400"
    >
      <Trash2 size={16} />

      {isPending ? "Deleting..." : "Delete"}
    </button>
  );
}