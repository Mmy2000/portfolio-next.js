"use client";

import Filters from "@/components/Filters";
import HeaderSection from "@/components/HeaderSection";
import LoadingSpinner from "@/components/LoadingSpinner";
import Projects from "@/components/projects";
import { fetchProjectsData } from "@/lib/projectsApi";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [projectsData, setProjectsData] = useState<any>(null);

  useEffect(() => {
    // Load initial data
    const loadData = async () => {
      const data = await fetchProjectsData();
      setProjectsData(data);
    };
    loadData();
  }, []);

  const handleFilterApply = async (params: string) => {
    const data = await fetchProjectsData(params);
    setProjectsData(data);
  };

  if (!projectsData) return <p><LoadingSpinner/></p>;

  return (
    <>
      <HeaderSection
        title="Projects"
        description="A comprehensive collection of my work, showcasing various technologies and problem-solving approaches across different domains."
      />
      <Filters
      pageType="project"
        filters={projectsData?.filters}
        onFilterApply={handleFilterApply}
      />

      <Projects isHomePage={false} projectsData={projectsData} />
    </>
  );
};

export default Page;
