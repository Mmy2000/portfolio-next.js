import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Experience } from "@/components/experience";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/Hero";
import { Navigation } from "@/components/Navigation";
import Projects from "@/components/projects";
import { Skills } from "@/components/skills";
import { fetchAboutMeData } from "@/lib/aboutApi";
import { fetchExpData } from "@/lib/expApi";
import { fetchProjectsData } from "@/lib/projectsApi";
import { fetchSkillsData } from "@/lib/skillsApi";

export default async function Home() {
    const aboutData = await fetchAboutMeData();
    const expData = await fetchExpData();
    const projectsData = await fetchProjectsData("per_page=3");
    const skillsData = await fetchSkillsData();
    
  return (
    <main className="min-h-screen bg-background">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-md z-50"
      >
        Skip to main content
      </a>
      <Navigation aboutData={aboutData} />
      <div id="main-content">
        <Hero aboutData={aboutData} />
        <About aboutData={aboutData} />
        <Experience expData={expData} />
        <Projects isHomePage={true} projectsData={projectsData} />
        <Skills skillsData={skillsData} />
        <Contact aboutData={aboutData} />
      </div>
      <Footer />
    </main>
  );
}
