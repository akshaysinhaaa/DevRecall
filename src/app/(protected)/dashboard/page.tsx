'use client'
import React from 'react'
import { useUser } from '@clerk/nextjs'
import useProject from '@/hooks/use-project'
import { Github } from 'lucide-react'

const DashboardPage = () => {
    const { project } = useProject()
  return (
    <div>
      <div className='flex items-center justify-between flex-wrap gap-y-4'>
        <div className='w-fit rounded-mg bg-primary px-4 py-3'>
          <Github className='size-5 text-white' />
        </div>
      </div>
    </div>
  )
}

export default DashboardPage