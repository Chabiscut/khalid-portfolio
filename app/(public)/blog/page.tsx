import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const now = new Date();
  const posts = await prisma.blogPost.findMany({
    where: {
      published: true,
      OR: [{ publishedAt: null }, { publishedAt: { lte: now } }],
    },
    orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
    include: { category: true },
  });

  return (
    <main className="min-h-screen px-6 py-24">
      <div className="container-custom">
        <header className="mb-12 max-w-3xl">
          <p className="text-sm font-medium text-muted-foreground">Writing</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">Blog</h1>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            Notes, ideas, and updates.
          </p>
        </header>

        {posts.length === 0 ? (
          <div className="card p-10 text-center text-muted-foreground">
            No published posts yet.
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {posts.map((post) => (
              <article key={post.id} className="card overflow-hidden">
                {post.coverImage && (
                  <img src={post.coverImage} alt="" className="aspect-video w-full object-cover" />
                )}
                <div className="p-6">
                  {post.category && <p className="text-sm text-muted-foreground">{post.category.name}</p>}
                  <h2 className="mt-2 text-2xl font-semibold">
                    <Link href={`/blog/${post.slug}`} className="hover:underline">{post.title}</Link>
                  </h2>
                  {post.excerpt && <p className="mt-3 leading-7 text-muted-foreground">{post.excerpt}</p>}
                  <p className="mt-5 text-sm text-muted-foreground">
                    {(post.publishedAt ?? post.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}