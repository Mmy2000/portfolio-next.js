import { About } from "@/components/about";
import Blogs from "@/components/blogs";
import { Contact } from "@/components/contact";
import { Experience } from "@/components/experience";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/Hero";
import { Navigation } from "@/components/Navigation";
import Projects from "@/components/projects";
import { Skills } from "@/components/skills";
import { fetchAboutMeData } from "@/lib/aboutApi";
import { fetchBlogsData } from "@/lib/blogsApi";
import { fetchExpData } from "@/lib/expApi";
import { fetchProjectsData } from "@/lib/projectsApi";
import { fetchSiteInfoData } from "@/lib/SiteInfo";
import { fetchSkillsData } from "@/lib/skillsApi";

export default async function Home() {
    const aboutData = await fetchAboutMeData();
    const expData = await fetchExpData();
    const projectsData = await fetchProjectsData("per_page=3");
    const skillsData = await fetchSkillsData();
    const siteInfoData = await fetchSiteInfoData();
    const roles = siteInfoData?.data?.role;    
    const blogsData = await fetchBlogsData("per_page=3");    
    
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
        <Hero aboutData={aboutData} siteInfoData={siteInfoData} roles={roles} />
        <About aboutData={aboutData} />
        <Experience expData={expData} />
        <Projects isHomePage={true} projectsData={projectsData} />
        <Blogs isHomePage={true} blogsData={blogsData} />
        <Skills skillsData={skillsData} />
        <Contact aboutData={aboutData} />
      </div>
      <Footer siteInfoData={siteInfoData} />
    </main>
  );
}
