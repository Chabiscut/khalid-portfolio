import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

type BlogPostPageProps = { params: Promise<{ slug: string }> };

export const dynamic = "force-dynamic";

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const now = new Date();
  const post = await prisma.blogPost.findFirst({
    where: {
      slug,
      published: true,
      OR: [{ publishedAt: null }, { publishedAt: { lte: now } }],
    },
    include: { category: true },
  });

  if (!post) notFound();

  return (
    <main className="min-h-screen px-6 py-24">
      <article className="container-custom max-w-3xl">
        <Link href="/blog" className="text-sm text-muted-foreground hover:underline">← Back to Blog</Link>
        <header className="mb-10 mt-8">
          {post.category && <p className="text-sm text-muted-foreground">{post.category.name}</p>}
          <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">{post.title}</h1>
          <p className="mt-4 text-sm text-muted-foreground">
            {(post.publishedAt ?? post.createdAt).toLocaleDateString()}
          </p>
          {post.excerpt && <p className="mt-6 text-lg leading-8 text-muted-foreground">{post.excerpt}</p>}
        </header>
        {post.coverImage && <img src={post.coverImage} alt="" className="mb-10 w-full rounded-2xl object-cover" />}
        <div className="whitespace-pre-line leading-8">{post.content}</div>
      </article>
    </main>
  );
}