import React from 'react'
import {api} from '@/trpc/react'
import {useLocalStorage} from 'usehooks-ts'

const useProject = () => {
  const {data: projects} = api.project.getProjects.useQuery()
  const {projectId, setProject} = useLocalStorage('devrecall-projectId', '')
  return {
    projects
  }
}
  


export default useProject

//1