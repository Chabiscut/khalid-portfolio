import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/Footer";
import ThemeProvider from "@/components/providers/ThemeProvider";
import { prisma } from "@/lib/prisma";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await prisma.siteSettings.findFirst({
    orderBy: { updatedAt: "desc" },
    select: {
      siteTitle: true,
      siteDescription: true,
    },
  });

  return {
    title:
      settings?.siteTitle ??
      "Ahmad Khalid Al Mujahid | Software Engineering",
    description:
      settings?.siteDescription ??
      "Personal portfolio of Ahmad Khalid Al Mujahid, a Computer Science student interested in software engineering and web development.",
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}