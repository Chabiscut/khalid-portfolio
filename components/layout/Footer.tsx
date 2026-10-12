import Link from "next/link";
import { ArrowUp } from "lucide-react";

const footerLinks = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200">
      <div className="container-custom py-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <Link
              href="#home"
              className="text-lg font-bold tracking-tight text-[var(--foreground)]"
            >
              AK<span className="text-gray-400">.</span>
            </Link>

            <p className="mt-2 max-w-sm text-sm leading-6 text-gray-500">
              Software Engineering student building practical software
              and exploring modern web development.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-5">
            {footerLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-gray-500 transition hover:text-[var(--foreground)]"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-gray-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-gray-500">
            © {year} Ahmad Khalid Al Mujahid. All rights reserved.
          </p>

          <a
            href="#home"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-500 transition hover:text-[var(--foreground)]"
          >
            Back to top
            <ArrowUp size={14} />
          </a>
        </div>
      </div>
    </footer>
  );
}