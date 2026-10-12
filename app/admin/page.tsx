import Link from "next/link";
import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import {
  FolderKanban,
  Wrench,
  Code2,
  BriefcaseBusiness,
  GraduationCap,
  Award,
  FileText,
  LogOut,
  Settings,
} from "lucide-react";

const adminSections = [
  {
    title: "Projects",
    description: "Add, edit, publish, and manage your portfolio projects.",
    href: "/admin/projects",
    icon: FolderKanban,
  },
  {
    title: "Technologies",
    description: "Manage the technologies used across your projects.",
    href: "/admin/technologies",
    icon: Code2,
  },
  {
    title: "Skills",
    description: "Manage your technical skills and categories.",
    href: "/admin/skills",
    icon: Wrench,
  },
  {
    title: "Experience",
    description: "Manage your work and professional experience.",
    href: "/admin/experience",
    icon: BriefcaseBusiness,
  },
  {
    title: "Education",
    description: "Manage your academic background.",
    href: "/admin/education",
    icon: GraduationCap,
  },
  {
    title: "Certificates",
    description: "Manage your certifications and credentials.",
    href: "/admin/certificates",
    icon: Award,
  },
  {
    title: "Blog",
    description: "Create and manage your blog posts.",
    href: "/admin/blog",
    icon: FileText,
  },
  {
    title: "Settings",
    description:
      "Manage your profile, social links, CV, and site settings.",
    href: "/admin/settings",
    icon: Settings,
  },
];

export default async function AdminDashboard() {
  const session = await auth();

  if (!session?.user) {
    redirect("/admin/login");
  }

  return (
    <main className="min-h-screen px-6 py-24">
      <div className="container-custom">

        {/* Header */}
        <div className="mb-12 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-medium text-muted-foreground">
              Administration
            </p>

            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              Admin Dashboard
            </h1>

            <p className="mt-4 text-muted-foreground">
              Welcome back,{" "}
              <span className="font-medium text-foreground">
                {session.user.name || "Administrator"}
              </span>
              .
            </p>
          </div>

          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/admin/login" });
            }}
          >
            <button
              type="submit"
              className="btn-secondary inline-flex items-center gap-2"
            >
              <LogOut size={16} />
              Sign out
            </button>
          </form>
        </div>

        {/* Admin Sections */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {adminSections.map((section) => {
            const Icon = section.icon;

            return (
              <Link
                key={section.title}
                href={section.href}
                className="group card p-6 transition-all duration-200 hover:-translate-y-1 hover:border-foreground/30"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-muted/40">
                  <Icon
                    size={22}
                    className="transition-transform duration-200 group-hover:scale-110"
                  />
                </div>

                <h2 className="text-xl font-semibold">
                  {section.title}
                </h2>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {section.description}
                </p>

                <div className="mt-5 text-sm font-medium">
                  Manage →
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </main>
  );
}