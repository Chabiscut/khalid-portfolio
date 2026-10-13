import Link from "next/link";
import {
  FileText,
  Plus,
  Pencil,
  ExternalLink,
} from "lucide-react";

import { prisma } from "@/lib/prisma";
import DeleteBlogPostButton from "@/components/admin/DeleteBlogPostButton";

export const dynamic = "force-dynamic";

export default async function AdminBlogPage() {
  const posts = await prisma.blogPost.findMany({
    orderBy: {
      updatedAt: "desc",
    },
    include: {
      category: true,
    },
  });

  return (
    <main className="min-h-screen px-6 py-24">
      <div className="container-custom">
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <FileText size={28} />
              <h1 className="text-3xl font-bold">
                Blog Management
              </h1>
            </div>

            <p className="text-muted-foreground">
              Create and manage your blog posts.
            </p>
          </div>

          <div className="flex gap-3">
            <Link
              href="/admin/blog/categories"
              className="inline-flex items-center justify-center gap-2 rounded-lg border px-5 py-3 font-medium transition hover:bg-muted"
            >
              Manage Categories
            </Link>
            <Link
              href="/admin/blog/new"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 font-medium text-primary-foreground transition hover:opacity-90"
            >
              <Plus size={18} />
              Add Blog Post
            </Link>
          </div>
        </div>

        {posts.length === 0 ? (
          <div className="card flex flex-col items-center justify-center px-6 py-16 text-center">
            <FileText
              size={42}
              className="mb-4 text-muted-foreground"
            />

            <h2 className="text-xl font-semibold">
              No blog posts yet
            </h2>

            <p className="mt-2 max-w-md text-muted-foreground">
              Your blog posts will appear here after you
              create them.
            </p>

            <Link
              href="/admin/blog/new"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 font-medium text-primary-foreground transition hover:opacity-90"
            >
              <Plus size={18} />
              Create Your First Post
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <article
                key={post.id}
                className="card flex flex-col justify-between gap-5 p-5 md:flex-row md:items-center"
              >
                <div className="min-w-0 flex-1">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <h2 className="text-lg font-semibold">
                      {post.title}
                    </h2>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        post.published
                          ? "bg-green-500/10 text-green-600 dark:text-green-400"
                          : "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400"
                      }`}
                    >
                      {post.published ? "Published" : "Draft"}
                    </span>
                  </div>

                  <p className="break-all text-sm text-muted-foreground">
                    Slug: /blog/{post.slug}
                  </p>

                  {post.excerpt && (
                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                      {post.excerpt}
                    </p>
                  )}

                  <div className="mt-3 flex flex-wrap gap-3 text-xs text-muted-foreground">
                    <span>
                      Category:{" "}
                      {post.category?.name ?? "Uncategorized"}
                    </span>

                    <span>
                      Updated:{" "}
                      {post.updatedAt.toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {post.published && (
                    <Link
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm transition hover:bg-muted"
                    >
                      <ExternalLink size={16} />
                      View
                    </Link>
                  )}

                  <Link
                    href={`/admin/blog/${post.id}/edit`}
                    className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm transition hover:bg-muted"
                  >
                    <Pencil size={16} />
                    Edit
                  </Link>

                  <DeleteBlogPostButton
                    postId={post.id}
                    postTitle={post.title}
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