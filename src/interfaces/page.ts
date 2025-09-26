
export default interface ProjectsProps {
    projectsData: any;
    isHomePage?: boolean;
}

export interface ProjectProps {
    project: any;
}

export interface HeaderProps {
    title:string;
    description:string;
}

export interface ProjectPageProps {
  params: {
    slug: string
  }
}