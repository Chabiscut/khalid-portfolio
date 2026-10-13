import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";

import { prisma } from "@/lib/prisma";

export function isAdminEmail(email?: string | null) {
  const adminEmail = process.env.AUTH_ADMIN_EMAIL;

  return Boolean(
    email && adminEmail && email.trim().toLowerCase() === adminEmail.trim().toLowerCase()
  );
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),

  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
  ],

  callbacks: {
    async signIn({ user }) {
      if (!user.email) {
        return false;
      }

      return isAdminEmail(user.email);
    },

    authorized({ auth, request }) {
      const isLoggedIn = isAdminEmail(auth?.user?.email);
      const pathname = request.nextUrl.pathname;

      if (pathname === "/admin/login") {
        return true;
      }

      if (pathname.startsWith("/admin")) {
        return isLoggedIn;
      }

      return true;
    },
  },

  pages: {
    signIn: "/admin/login",
  },

  session: {
    strategy: "database",
  },
});