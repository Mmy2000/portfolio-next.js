
export interface ProjectsProps {
    projectsData: any;
    isHomePage?: boolean;
}

export interface BlogsProps {
    blogsData: any;
    isHomePage?: boolean;
}

export interface ProjectProps {
    project: any;
}

export interface BlogProps {
    blog: any;
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

export interface BlogPageProps {
  params: {
    slug: string
  }
}