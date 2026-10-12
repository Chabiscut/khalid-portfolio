import { ArrowUpRight, Mail } from "lucide-react";
import { prisma } from "@/lib/prisma";

export default async function ContactCTA() {
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
    <section id="contact" className="section-padding">
      <div className="container-custom">
        <div className="relative overflow-hidden rounded-[2rem] bg-black px-7 py-16 text-white sm:px-12 sm:py-20">
          {/* Background decoration */}
          <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full border border-white/10" />
          <div className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full border border-white/10" />

          <div className="relative max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-white/50">
              Get in touch
            </p>

            <h2 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Have an idea?
              <br />
              <span className="text-white/40">Let&apos;s build it.</span>
            </h2>

            <p className="mt-6 max-w-2xl text-base leading-7 text-white/60 sm:text-lg">
              I&apos;m always interested in learning, collaborating, and
              working on meaningful software projects. Feel free to reach
              out and start a conversation.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              {email && (
                <a
                  href={`mailto:${email}`}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:-translate-y-1 hover:bg-gray-100"
                >
                  <Mail size={17} />
                  Send me an email
                </a>
              )}

              {githubUrl && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-1 hover:bg-white/10"
                >
                  GitHub
                  <ArrowUpRight size={17} />
                </a>
              )}

              {linkedinUrl && (
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-1 hover:bg-white/10"
                >
                  LinkedIn
                  <ArrowUpRight size={17} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}