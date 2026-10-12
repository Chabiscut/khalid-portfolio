"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";
import { deleteBlogPost } from "@/actions/blog";

type DeleteBlogPostButtonProps = {
  postId: string;
  postTitle: string;
};

export default function DeleteBlogPostButton({
  postId,
  postTitle,
}: DeleteBlogPostButtonProps) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${postTitle}"?`
    );

    if (!confirmed) return;

    startTransition(async () => {
      await deleteBlogPost(postId);
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