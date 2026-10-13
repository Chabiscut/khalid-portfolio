"use client";

import { useSyncExternalStore, useState } from "react";
import Link from "next/link";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";

const navItems = [
  { name: "Home", href: "/#home" },
  { name: "About", href: "/about" },
  { name: "Skills", href: "/skills" },
  { name: "Experience", href: "/experience" },
  { name: "Education", href: "/education" },
  { name: "Certificates", href: "/certificates" },
  { name: "Projects", href: "/projects" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-50">
      <div className="container-custom pt-4">
        <nav className="glass flex items-center justify-between rounded-2xl border border-gray-200 px-4 py-3 shadow-sm">
          <Link
            href="/"
            className="text-lg font-bold tracking-tight text-black"
          >
            AK<span className="text-gray-400">.</span>
          </Link>

          <div className="hidden items-center gap-7 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-gray-600 transition hover:text-black"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-2 md:flex">
            {mounted ? (
              <button
                type="button"
                onClick={toggleTheme}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-600 transition hover:bg-gray-100 hover:text-black"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
              </button>
            ) : (
              <div className="h-9 w-9 rounded-full border border-gray-200" />
            )}

            <Link href="/#contact" className="btn-primary ml-2">
              Let&apos;s Talk
            </Link>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            {mounted ? (
              <button
                type="button"
                onClick={toggleTheme}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-600"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
              </button>
            ) : (
              <div className="h-9 w-9 rounded-full border border-gray-200" />
            )}

            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-600"
              aria-label="Toggle navigation"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>

        {isOpen && (
          <div className="glass mt-2 rounded-2xl border border-gray-200 p-4 shadow-sm md:hidden">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-black"
                >
                  {item.name}
                </Link>
              ))}

              <Link
                href="/#contact"
                onClick={() => setIsOpen(false)}
                className="btn-primary mt-2"
              >
                Let&apos;s Talk
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
