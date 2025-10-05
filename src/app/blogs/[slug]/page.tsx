import { BlogPageProps } from '@/interfaces/page';
import { fetchBlogBySlug } from '@/lib/blogsApi';
import React from 'react'
import { notFound } from "next/navigation";
import HeaderSection from '@/components/HeaderSection';
import BlogPage from '@/components/BlogPage';


const page = async ({ params }: BlogPageProps) => {
  const { slug } = await params;
  const blog = await fetchBlogBySlug(slug);
  if (!blog) {
    notFound();
  }

  return (
    <>
      <HeaderSection
        title={blog?.data?.title + " blog"}
        description={blog?.data?.cover_description}
      />
      <BlogPage blog={blog?.data} />
    </>
  );
};

export default page;