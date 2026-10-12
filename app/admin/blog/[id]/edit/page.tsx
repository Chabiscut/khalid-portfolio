import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { updateBlogPost } from "@/actions/blog";

export const dynamic = "force-dynamic";

type EditBlogPostPageProps = {
params: Promise<{ id: string }>;
};

export default async function EditBlogPostPage({
params,
}: EditBlogPostPageProps) {
const { id } = await params;

const post = await prisma.blogPost.findUnique({
where: { id },
});

if (!post) {
notFound();
}

const categories = await prisma.blogCategory.findMany({
orderBy: { name: "asc" },
});

const updateAction = updateBlogPost.bind(null, post.id);

return (
<main className="min-h-screen px-6 py-24">
<div className="container-custom max-w-3xl">
<Link href="/admin/blog" className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground" >
<ArrowLeft size={16} />
Back to Blog
</Link>

    <div className="mb-8">
      <div className="mb-3 flex items-center gap-3">
        <FileText size={28} />
        <h1 className="text-3xl font-bold">Edit Blog Post</h1>
      </div>
      <p className="text-muted-foreground">
        Update your blog post information.
      </p>
    </div>

    <form action={updateAction} className="card space-y-6 p-6">
      <div className="space-y-2">
        <label htmlFor="title" className="text-sm font-medium">
          Title *
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          minLength={2}
          defaultValue={post.title}
          className="w-full rounded-lg border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="slug" className="text-sm font-medium">
          URL Slug *
        </label>
        <input
          id="slug"
          name="slug"
          type="text"
          required
          pattern="[a-z0-9]+(-[a-z0-9]+)*"
          defaultValue={post.slug}
          className="w-full rounded-lg border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="excerpt" className="text-sm font-medium">
          Short Excerpt
        </label>
        <textarea
          id="excerpt"
          name="excerpt"
          rows={3}
          defaultValue={post.excerpt ?? ""}
          className="w-full rounded-lg border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="content" className="text-sm font-medium">
          Content *
        </label>
        <textarea
          id="content"
          name="content"
          required
          rows={10}
          defaultValue={post.content}
          className="w-full rounded-lg border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="coverImage" className="text-sm font-medium">
          Cover Image URL
        </label>
        <input
          id="coverImage"
          name="coverImage"
          type="url"
          defaultValue={post.coverImage ?? ""}
          className="w-full rounded-lg border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="categoryId" className="text-sm font-medium">
          Category
        </label>
        <select
          id="categoryId"
          name="categoryId"
          defaultValue={post.categoryId ?? ""}
          className="w-full rounded-lg border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">Uncategorized</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <fieldset className="space-y-3">
        <legend className="text-sm font-medium">
          Publication Status
        </legend>

        <label className="flex items-center gap-3 text-sm">
          <input
            type="radio"
            name="published"
            value="false"
            defaultChecked={!post.published}
            className="size-4"
          />
          Save as draft
        </label>

        <label className="flex items-center gap-3 text-sm">
          <input
            type="radio"
            name="published"
            value="true"
            defaultChecked={post.published}
            className="size-4"
          />
          Publish
        </label>
      </fieldset>

      <div className="flex flex-wrap gap-3 border-t pt-6">
        <button
          type="submit"
          className="rounded-lg bg-primary px-5 py-3 font-medium text-primary-foreground transition hover:opacity-90"
        >
          Update Blog Post
        </button>

        <Link
          href="/admin/blog"
          className="rounded-lg border px-5 py-3 text-sm font-medium transition hover:bg-muted"
        >
          Cancel
        </Link>
      </div>
    </form>
  </div>
</main>

);
}