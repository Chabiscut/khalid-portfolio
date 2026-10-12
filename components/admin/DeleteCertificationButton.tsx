"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";

import { deleteCertification } from "@/actions/certifications";

type DeleteCertificationButtonProps = {
  certificationId: string;
};

export default function DeleteCertificationButton({
  certificationId,
}: DeleteCertificationButtonProps) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this certificate?"
    );

    if (!confirmed) return;

    startTransition(async () => {
      await deleteCertification(certificationId);
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