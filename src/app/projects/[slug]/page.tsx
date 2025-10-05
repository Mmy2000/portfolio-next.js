
import HeaderSection from '@/components/HeaderSection'
import { ProjectPageProps } from '@/interfaces/page';
import { fetchProjectBySlug } from '@/lib/projectsApi'
import { notFound } from "next/navigation";
import ProjectPage from '@/components/ProjectPage';

const page = async ({ params }: ProjectPageProps) => {
  const { slug } = await params;
  const project = await fetchProjectBySlug(slug);
  if (!project) {
    notFound();
  }

  return (
    <>
      <HeaderSection
        title={project?.data?.title + " Project"}
        description={project?.data?.cover_description}
      />
      <ProjectPage project={project?.data} />
    </>
  );
};

export default page