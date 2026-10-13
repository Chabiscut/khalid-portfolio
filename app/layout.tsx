import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { prisma } from "@/lib/prisma";

const themeScript = `(() => {
  try {
    const storedTheme = window.localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const theme = storedTheme === "light" || storedTheme === "dark"
      ? storedTheme
      : prefersDark ? "dark" : "light";

    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    root.classList.toggle("light", theme === "light");
    root.style.colorScheme = theme;
  } catch (error) {
    // Ignore storage access issues.
  }
})();`;

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
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <ThemeProvider>
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
