"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const blogPostSchema = z.object({
  title: z.string().min(2, "Title is required"),
  slug: z
    .string()
    .min(2, "Slug is required")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug can only contain lowercase letters, numbers, and hyphens"
    ),
  excerpt: z.string().optional(),
  content: z.string().min(1, "Content is required"),
  coverImage: z
    .string()
    .url("Cover image must be a valid URL")
    .optional(),
  published: z.boolean(),
  publishedAt: z.string().optional(),
  categoryId: z.string().optional(),
});

const categorySchema = z.object({
  name: z.string().min(2, "Category name is required"),
  slug: z
    .string()
    .min(2, "Category slug is required")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug can only contain lowercase letters, numbers, and hyphens"
    ),
});

function requireAdmin() {
  return auth().then((session) => {
    if (!session?.user) {
      redirect("/admin/login");
    }

    return session;
  });
}

// -------------------------
// BLOG CATEGORY
// -------------------------

export async function createBlogCategory(formData: FormData) {
  await requireAdmin();

  const result = categorySchema.safeParse({
    name: formData.get("name"),
    slug: formData.get("slug"),
  });

  if (!result.success) {
    throw new Error(
      result.error.issues[0]?.message || "Invalid category data"
    );
  }

  await prisma.blogCategory.create({
    data: {
      name: result.data.name,
      slug: result.data.slug,
    },
  });

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
}

export async function updateBlogCategory(
  categoryId: string,
  formData: FormData
) {
  await requireAdmin();

  const result = categorySchema.safeParse({
    name: formData.get("name"),
    slug: formData.get("slug"),
  });

  if (!result.success) {
    throw new Error(
      result.error.issues[0]?.message || "Invalid category data"
    );
  }

  await prisma.blogCategory.update({
    where: {
      id: categoryId,
    },
    data: {
      name: result.data.name,
      slug: result.data.slug,
    },
  });

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
}

export async function deleteBlogCategory(categoryId: string) {
  await requireAdmin();

  await prisma.blogCategory.delete({
    where: {
      id: categoryId,
    },
  });

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
}

// -------------------------
// BLOG POST
// -------------------------

export async function createBlogPost(formData: FormData) {
  await requireAdmin();

  const published = formData.get("published") === "true";

  const result = blogPostSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    excerpt: formData.get("excerpt") || undefined,
    content: formData.get("content"),
    coverImage: formData.get("coverImage") || undefined,
    published,
    publishedAt: formData.get("publishedAt") || undefined,
    categoryId: formData.get("categoryId") || undefined,
  });

  if (!result.success) {
    throw new Error(
      result.error.issues[0]?.message || "Invalid blog post data"
    );
  }

  await prisma.blogPost.create({
    data: {
      title: result.data.title,
      slug: result.data.slug,
      excerpt: result.data.excerpt,
      content: result.data.content,
      coverImage: result.data.coverImage,
      published: result.data.published,
      publishedAt: result.data.published
        ? result.data.publishedAt
          ? new Date(result.data.publishedAt)
          : new Date()
        : null,
      categoryId: result.data.categoryId || null,
    },
  });

  revalidatePath("/admin/blog");
  revalidatePath("/blog");

  redirect("/admin/blog");
}

export async function updateBlogPost(
  postId: string,
  formData: FormData
) {
  await requireAdmin();

  const published = formData.get("published") === "true";

  const result = blogPostSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    excerpt: formData.get("excerpt") || undefined,
    content: formData.get("content"),
    coverImage: formData.get("coverImage") || undefined,
    published,
    publishedAt: formData.get("publishedAt") || undefined,
    categoryId: formData.get("categoryId") || undefined,
  });

  if (!result.success) {
    throw new Error(
      result.error.issues[0]?.message || "Invalid blog post data"
    );
  }

  await prisma.blogPost.update({
    where: {
      id: postId,
    },
    data: {
      title: result.data.title,
      slug: result.data.slug,
      excerpt: result.data.excerpt,
      content: result.data.content,
      coverImage: result.data.coverImage,
      published: result.data.published,
      publishedAt: result.data.published
        ? result.data.publishedAt
          ? new Date(result.data.publishedAt)
          : new Date()
        : null,
      categoryId: result.data.categoryId || null,
    },
  });

  revalidatePath("/admin/blog");
  revalidatePath("/blog");

  revalidatePath(`/blog/${result.data.slug}`);

  redirect("/admin/blog");
}

export async function deleteBlogPost(postId: string) {
  await requireAdmin();

  const post = await prisma.blogPost.findUnique({
    where: {
      id: postId,
    },
    select: {
      slug: true,
    },
  });

  await prisma.blogPost.delete({
    where: {
      id: postId,
    },
  });

  revalidatePath("/admin/blog");
  revalidatePath("/blog");

  if (post) {
    revalidatePath(`/blog/${post.slug}`);
  }
}

export async function toggleBlogPostPublished(
  postId: string,
  published: boolean
) {
  await requireAdmin();

  await prisma.blogPost.update({
    where: {
      id: postId,
    },
    data: {
      published,
      publishedAt: published ? new Date() : null,
    },
  });

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
}