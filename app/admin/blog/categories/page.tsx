import Link from "next/link";
import { ArrowLeft, FolderOpen, Plus, Pencil } from "lucide-react";

import { prisma } from "@/lib/prisma";
import DeleteBlogCategoryButton from "@/components/admin/DeleteBlogCategoryButton";

export const dynamic = "force-dynamic";

export default async function BlogCategoriesPage() {
const categories = await prisma.blogCategory.findMany({
orderBy: { name: "asc" },
include: {
_count: {
select: { posts: true },
},
},
});

return (
<main className="min-h-screen px-6 py-24">
<div className="container-custom">
<Link href="/admin/blog" className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground" >
<ArrowLeft size={16} />
Back to Blog
</Link>

    <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      <div>
        <div className="mb-3 flex items-center gap-3">
          <FolderOpen size={28} />
          <h1 className="text-3xl font-bold">Blog Categories</h1>
        </div>
        <p className="text-muted-foreground">
          Organize your blog posts into categories.
        </p>
      </div>

      <Link
        href="/admin/blog/categories/new"
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 font-medium text-primary-foreground transition hover:opacity-90"
      >
        <Plus size={18} />
        Add Category
      </Link>
    </div>

    {categories.length === 0 ? (
      <div className="card flex flex-col items-center justify-center px-6 py-16 text-center">
        <FolderOpen size={42} className="mb-4 text-muted-foreground" />
        <h2 className="text-xl font-semibold">No categories yet</h2>
        <p className="mt-2 max-w-md text-muted-foreground">
          Create a category when you are ready to organize your blog posts.
        </p>
      </div>
    ) : (
      <div className="space-y-4">
        {categories.map((category) => (
          <article
            key={category.id}
            className="card flex flex-col justify-between gap-4 p-5 sm:flex-row sm:items-center"
          >
            <div>
              <h2 className="font-semibold">{category.name}</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Slug: {category.slug}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {category._count.posts}{" "}
                {category._count.posts === 1 ? "post" : "posts"}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Link
                href={`/admin/blog/categories/${category.id}/edit`}
                className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm transition hover:bg-muted"
              >
                <Pencil size={16} />
                Edit
              </Link>

              <DeleteBlogCategoryButton
                categoryId={category.id}
                categoryName={category.name}
              />
            </div>
          </article>
        ))}
      </div>
    )}
  </div>
</main>

);
}