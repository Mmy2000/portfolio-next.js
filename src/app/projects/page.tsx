import HeaderSection from '@/components/HeaderSection';
import { Navigation } from '@/components/Navigation';
import Projects from '@/components/projects';
import { fetchProjectsData } from '@/lib/projectsApi';
import React from 'react'

const page = async () => {
  const projectsData = await fetchProjectsData();
  return (
    <>
      <HeaderSection
        title="Projects"
        description="A comprehensive collection of my work, showcasing various technologies and problem-solving approaches across different domains."
      />
      <Projects isHomePage={false} projectsData={projectsData} />
    </>
  );
}

export default page