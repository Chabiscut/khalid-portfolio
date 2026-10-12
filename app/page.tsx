import Hero from "@/components/home/hero";
import AboutPreview from "@/components/home/AboutPreview";
import SkillsPreview from "@/components/home/SkillsPreview";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import ContactCTA from "@/components/home/ContactCTA";

export default function Home() {
  return (
    <main>
      <Hero />
      <AboutPreview />
      <SkillsPreview />
      <FeaturedProjects />
      <ContactCTA />
    </main>
  );
}