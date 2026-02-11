'use client'
import React from 'react'
import { useUser } from '@clerk/nextjs'
import useProject from '@/hooks/use-project'
import { Github, ExternalLink } from 'lucide-react'
import Link from 'next/link'

const DashboardPage = () => {
    const { project } = useProject()
  return (
    <div>
      <div className='flex items-center justify-between flex-wrap gap-y-4'>
        <div className='w-fit rounded-md bg-primary px-4 py-3'>
          <div className="flex items-center">
            <Github className='size-5 text-white' />
            <div className='ml-2 text-white'>
              <p className='text-sm font-medium text-white'>
                This project is linked to { ' ' }
                <Link href={project?.githubUrl?? ""} className='inline-flex items-center text-white/80 hover:underline'>
                  {project?.githubUrl}
                  <ExternalLink className='size-4 ml-1' />
                </Link>
              </p>
            </div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage

//2