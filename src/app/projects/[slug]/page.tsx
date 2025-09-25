import HeaderSection from '@/components/HeaderSection'
import { fetchProjectsData } from '@/lib/projectsApi'
import React from 'react'

const page = async () => {
    
  return (
   <HeaderSection title='Projects' description='last project'/>
  )
}

export default page