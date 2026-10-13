import Image from "next/image";
import {
  ArrowDown,
  ArrowRight,
  Download,
  Mail,
} from "lucide-react";
import { prisma } from "@/lib/prisma";

export default async function Hero() {
  const settings = await prisma.siteSettings.findFirst({
    orderBy: { updatedAt: "desc" },
  });
  const email = settings
    ? settings.email
    : "khalidalmujahid684@gmail.com";
  const githubUrl = settings
    ? settings.githubUrl
    : "https://github.com/Chabiscut";
  const linkedinUrl = settings
    ? settings.linkedinUrl
    : "https://www.linkedin.com/in/khalid-al-mujahid-a93872309";

  return (
    <section
      id="home"
      className="background-grid flex min-h-screen items-center pt-20"
    >
      <div className="container-custom">
        <div className="grid items-center gap-16 py-20 lg:grid-cols-[1.2fr_0.8fr]">

          {/* LEFT SIDE */}
          <div>

            {/* Status */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/80 px-4 py-2 backdrop-blur">
              <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />

              <span className="text-xs font-medium text-gray-600">
                Open to opportunities
              </span>
            </div>

            {/* Small Heading */}
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-gray-500">
              Software Engineering Student
            </p>

            {/* Main Heading */}
            <h1 className="max-w-4xl text-5xl font-bold leading-[1.02] tracking-[-0.05em] text-[var(--foreground)] sm:text-6xl lg:text-7xl">
              Building software
              <br />

              <span className="text-gray-400">
                with purpose.
              </span>
            </h1>

            {/* Description */}
            <p className="mt-7 max-w-2xl text-lg leading-8 text-gray-600">
              I&apos;m Ahmad Khalid Al Mujahid, a Computer Science
              student focused on software engineering, web development,
              and building practical digital products.
            </p>

            {/* Buttons */}
            <div className="mt-9 flex flex-wrap gap-3">

              <a
                href="#projects"
                className="btn-primary"
              >
                View My Work
                <ArrowRight size={17} />
              </a>

              <a
                href="#contact"
                className="btn-secondary"
              >
                Contact Me
              </a>

              {settings?.cvUrl ? (
                <a href="/api/resume" className="btn-secondary">
                  <Download size={17} />
                  Download Resume
                </a>
              ) : (
                <button
                  type="button"
                  disabled
                  title="Upload your resume from the admin settings page."
                  className="btn-secondary cursor-not-allowed opacity-60"
                >
                  <Download size={17} />
                  Resume Coming Soon
                </button>
              )}

            </div>

            {/* Social Links */}
            <div className="mt-9 flex items-center gap-5">

              {githubUrl && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-gray-500 transition hover:text-[var(--foreground)]"
                >
                  GitHub
                </a>
              )}

              {linkedinUrl && (
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-gray-500 transition hover:text-[var(--foreground)]"
                >
                  LinkedIn
                </a>
              )}

              {email && (
                <a
                  href={`mailto:${email}`}
                  className="text-gray-500 transition hover:text-[var(--foreground)]"
                  aria-label="Email"
                >
                  <Mail size={20} />
                </a>
              )}

            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className="flex justify-center lg:justify-end">

            <div className="relative">

              {/* Profile Card */}
              <div className="relative overflow-hidden rounded-[2rem] border border-gray-200 bg-white p-3 shadow-2xl shadow-black/5">

                <div className="relative h-[360px] w-[300px] overflow-hidden rounded-[1.5rem] bg-gray-100 sm:h-[420px] sm:w-[350px]">

                  <Image
                    src="/Image/profile.jpeg"
                    alt="Ahmad Khalid Al Mujahid"
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 640px) 300px, 350px"
                  />

                </div>

              </div>

              {/* Floating Card */}
              <div className="absolute -bottom-6 -left-8 rounded-2xl border border-gray-200 bg-white px-5 py-4 shadow-xl">

                <p className="text-xs font-semibold text-gray-900">
                  Currently learning
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  Modern Web Development
                </p>

              </div>

              {/* Code Card */}
              <div className="absolute -right-8 -top-8 hidden rounded-2xl border border-gray-200 bg-white p-4 shadow-xl sm:block">

                <div className="mb-3 flex items-center gap-2">

                  <span className="h-2 w-2 rounded-full bg-red-400" />
                  <span className="h-2 w-2 rounded-full bg-yellow-400" />
                  <span className="h-2 w-2 rounded-full bg-green-400" />

                </div>

                <div className="font-mono text-xs leading-6 text-gray-500">

                  <p>
                    <span className="text-purple-500">
                      const
                    </span>{" "}
                    developer = {"{"}
                  </p>

                  <p className="pl-4">
                    name:{" "}
                    <span className="text-green-600">
                      &quot;Khalid&quot;
                    </span>
                    ,
                  </p>

                  <p className="pl-4">
                    field:{" "}
                    <span className="text-green-600">
                      &quot;Software Engineering&quot;
                    </span>
                  </p>

                  <p>{"}"}</p>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* Scroll Indicator */}
        <a
          href="#about"
          className="mb-8 hidden items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gray-400 md:flex"
        >
          Scroll to explore
          <ArrowDown size={14} />
        </a>

      </div>
    </section>
  );
}