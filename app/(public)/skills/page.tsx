import { prisma } from "@/lib/prisma";
import { Wrench } from "lucide-react";

export default async function SkillsPage() {
  const skills = await prisma.skill.findMany({
    orderBy: [
      { sortOrder: "asc" },
      { createdAt: "desc" },
    ],
  });

  const categories = Array.from(
    new Set(
      skills
        .map((skill) => skill.category)
        .filter((category): category is string => Boolean(category))
    )
  );

  return (
    <main className="min-h-screen px-6 py-24">
      <div className="container-custom">

        {/* Header */}
        <div className="mb-14 max-w-3xl">
          <p className="text-sm font-medium text-muted-foreground">
            Technical Skills
          </p>

          <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">
            Skills
          </h1>

          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            Technologies, programming languages, tools, and technical
            skills that I am learning and working with.
          </p>
        </div>

        {/* Empty State */}
        {skills.length === 0 ? (
          <div className="card p-12 text-center">
            <Wrench
              size={40}
              className="mx-auto mb-5 text-muted-foreground"
            />

            <h2 className="text-2xl font-semibold">
              No skills yet
            </h2>

            <p className="mx-auto mt-3 max-w-md text-muted-foreground">
              Skills will appear here once they are added through the
              admin dashboard.
            </p>
          </div>
        ) : categories.length > 0 ? (
          /* Categorized Skills */
          <div className="space-y-12">
            {categories.map((category) => {
              const categorySkills = skills.filter(
                (skill) => skill.category === category
              );

              return (
                <section key={category}>
                  <h2 className="mb-5 text-2xl font-semibold">
                    {category}
                  </h2>

                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {categorySkills.map((skill) => (
                      <SkillCard
                        key={skill.id}
                        name={skill.name}
                        level={skill.level}
                        icon={skill.icon}
                      />
                    ))}
                  </div>
                </section>
              );
            })}

            {/* Skills Without Category */}
            {skills.some((skill) => !skill.category) && (
              <section>
                <h2 className="mb-5 text-2xl font-semibold">
                  Other
                </h2>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {skills
                    .filter((skill) => !skill.category)
                    .map((skill) => (
                      <SkillCard
                        key={skill.id}
                        name={skill.name}
                        level={skill.level}
                        icon={skill.icon}
                      />
                    ))}
                </div>
              </section>
            )}
          </div>
        ) : (
          /* Skills Without Categories */
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map((skill) => (
              <SkillCard
                key={skill.id}
                name={skill.name}
                level={skill.level}
                icon={skill.icon}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

type SkillCardProps = {
  name: string;
  level: number | null;
  icon: string | null;
};

function SkillCard({
  name,
  level,
  icon,
}: SkillCardProps) {
  return (
    <div className="card p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold">
            {name}
          </h3>

          {icon && (
            <p className="mt-1 text-xs text-muted-foreground">
              {icon}
            </p>
          )}
        </div>

        {level !== null && (
          <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium">
            {level}%
          </span>
        )}
      </div>

      {level !== null && (
        <div className="mt-5">
          <div className="h-2 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-foreground transition-all"
              style={{ width: `${level}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}