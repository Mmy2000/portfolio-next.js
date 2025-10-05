"use client";
import Blogs from '@/components/blogs';
import Filters from '@/components/Filters';
import HeaderSection from '@/components/HeaderSection';
import { fetchBlogsData } from '@/lib/blogsApi';
import React, { useEffect, useState } from 'react'

const Page = () => {
    const [blogsData, setBlogsData] = useState<any>(null);
    
      useEffect(() => {
        // Load initial data
        const loadData = async () => {
          const data = await fetchBlogsData();
          setBlogsData(data);
        };
        loadData();
      }, []);
    
      const handleFilterApply = async (params: string) => {
        const data = await fetchBlogsData(params);
        setBlogsData(data);
      };      
    
      if (!blogsData) return <p>Loading...</p>;
  return (
    <>
      <HeaderSection
        title="Blogs"
        description="Explore a collection of articles covering development tips, coding best practices, and personal experiences from my journey as a developer."
      />
      <Filters pageType="blog" filters={blogsData?.filters} onFilterApply={handleFilterApply}/>
        <Blogs isHomePage={false} blogsData={blogsData} />
    </>
  );
}

export default Page