import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { updateBlogCategory } from "@/actions/blog";
import { prisma } from "@/lib/prisma";

type EditBlogCategoryPageProps = { params: Promise<{ id: string }> };

export default async function EditBlogCategoryPage({ params }: EditBlogCategoryPageProps) {
  const { id } = await params;
  const category = await prisma.blogCategory.findUnique({ where: { id } });
  if (!category) notFound();
  const updateAction = updateBlogCategory.bind(null, category.id);

  return (
    <main className="min-h-screen px-6 py-24">
      <div className="container-custom max-w-xl">
        <Link href="/admin/blog/categories" className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:underline">
          <ArrowLeft size={16} /> Back to Categories
        </Link>
        <h1 className="mb-8 text-3xl font-bold">Edit Blog Category</h1>
        <form action={updateAction} className="card space-y-6 p-6">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">Name</label>
            <input id="name" name="name" required minLength={2} defaultValue={category.name} className="w-full rounded-lg border bg-background px-4 py-3" />
          </div>
          <div className="space-y-2">
            <label htmlFor="slug" className="text-sm font-medium">Slug</label>
            <input id="slug" name="slug" required minLength={2} pattern="[a-z0-9]+(-[a-z0-9]+)*" defaultValue={category.slug} className="w-full rounded-lg border bg-background px-4 py-3" />
          </div>
          <button type="submit" className="btn-primary">Save Changes</button>
        </form>
      </div>
    </main>
  );
}