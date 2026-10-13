"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";
import { deleteBlogCategory } from "@/actions/blog";

type DeleteBlogCategoryButtonProps = {
categoryId: string;
categoryName: string;
};

export default function DeleteBlogCategoryButton({
categoryId,
categoryName,
}: DeleteBlogCategoryButtonProps) {
const [isPending, startTransition] = useTransition();

function handleDelete() {
const confirmed = window.confirm(`Delete "${categoryName}"? Its posts will remain but become uncategorized.`);

if (!confirmed) return;

startTransition(async () => {
  await deleteBlogCategory(categoryId);
});

}

return (
<button type="button" onClick={handleDelete} disabled={isPending} className="inline-flex items-center gap-2 rounded-lg border border-red-500/30 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-50 dark:text-red-400" >
<Trash2 size={16} />
{isPending ? "Deleting..." : "Delete"}
</button>
);
}