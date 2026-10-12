import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { createBlogPost } from "@/actions/blog";

export const dynamic = "force-dynamic";

export default async function NewBlogPostPage() {
const categories = await prisma.blogCategory.findMany({
orderBy: {
name: "asc",
},
});

return (
<main className="min-h-screen px-6 py-24">
<div className="container-custom">
<Link href="/admin/blog" className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground" >
<ArrowLeft size={16} />
Back to Blog
</Link>

    <div className="mb-8">
      <div className="mb-3 flex items-center gap-3">
        <FileText size={28} />
        <h1 className="text-3xl font-bold">Create Blog Post</h1>
      </div>

      <p className="text-muted-foreground">
        Write a post and save it as a draft or publish it when ready.
      </p>
    </div>

    <form action={createBlogPost} className="card max-w-3xl space-y-6 p-6">
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
          className="w-full rounded-lg border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
          placeholder="Enter your post title"
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
          title="Use lowercase letters, numbers, and hyphens only"
          className="w-full rounded-lg border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
          placeholder="example-blog-post"
        />
        <p className="text-xs text-muted-foreground">
          Use lowercase letters, numbers, and hyphens only.
        </p>
      </div>

      <div className="space-y-2">
        <label htmlFor="excerpt" className="text-sm font-medium">
          Short Excerpt
        </label>
        <textarea
          id="excerpt"
          name="excerpt"
          rows={3}
          className="w-full rounded-lg border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
          placeholder="A short summary of your post"
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
          rows={12}
          className="w-full rounded-lg border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
          placeholder="Write your blog post here..."
        />
        <p className="text-xs text-muted-foreground">
          This version stores plain text. A rich-text editor can be added later.
        </p>
      </div>

      <div className="space-y-2">
        <label htmlFor="coverImage" className="text-sm font-medium">
          Cover Image URL
        </label>
        <input
          id="coverImage"
          name="coverImage"
          type="url"
          className="w-full rounded-lg border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
          placeholder="https://example.com/image.webp"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="categoryId" className="text-sm font-medium">
          Category
        </label>
        <select
          id="categoryId"
          name="categoryId"
          defaultValue=""
          className="w-full rounded-lg border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">Uncategorized</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        {categories.length === 0 && (
          <p className="text-xs text-muted-foreground">
            No categories exist yet. You can create categories in a later step.
          </p>
        )}
      </div>

      <fieldset className="space-y-3">
        <legend className="text-sm font-medium">Publication Status</legend>

        <label className="flex items-center gap-3 text-sm">
          <input
            type="radio"
            name="published"
            value="false"
            defaultChecked
            className="size-4"
          />
          Save as draft
        </label>

        <label className="flex items-center gap-3 text-sm">
          <input
            type="radio"
            name="published"
            value="true"
            className="size-4"
          />
          Publish immediately
        </label>
      </fieldset>

      <div className="flex flex-wrap gap-3 border-t pt-6">
        <button
          type="submit"
          className="rounded-lg bg-primary px-5 py-3 font-medium text-primary-foreground transition hover:opacity-90"
        >
          Save Blog Post
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