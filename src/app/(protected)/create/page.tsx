'use client'
import { Input } from '@/components/ui/input'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { api } from '@/trpc/react'
import { useRouter } from 'next/navigation'


type FormInput = {
    repoUrl: string
    projectName: string    
    githubToken?: string
}

const CreatePage = () => {
    const {register, handleSubmit, reset} = useForm<FormInput>()
    const utils = api.useUtils()
    const router = useRouter()
    const createProject = api.project.createProject.useMutation()

    function onSubmit(data: FormInput) {
        createProject.mutate({
            githubUrl: data.repoUrl,
            name: data.projectName,
            githubToken: data.githubToken
        }, {
            onSuccess: async (newProject) => {
                toast.success('Project created successfully')
                reset()
                
                // Optimistically update the cache immediately
                // This will show the project in the sidebar right away
                utils.project.getProjects.setData(undefined, (oldData) => {
                    if (!oldData) return [newProject]
                    
                    // Check if project already exists to avoid duplicates
                    const exists = oldData.some((p: { id: string }) => p.id === newProject.id)
                    if (exists) {
                        // Project already exists, return existing data
                        return oldData
                    }
                    
                    // Add new project to the beginning of the array
                    return [newProject, ...oldData]
                })
                
                // Invalidate after a delay to sync with server
                // The delay ensures the database transaction is fully committed
                // When invalidate refetches, React Query will replace the cache with server data
                setTimeout(async () => {
                    await utils.project.getProjects.invalidate()
                }, 2000)
            },
            onError: () => {
                toast.error('Failed to create project')
            }
        })
        return true
    }

  return (
    <div className='flex items-center gap-12 h-full justify-center'>
        <img src='/undraw_github.svg' className='h-56 w-auto'/>
        <div>
            <div>
                <h1 className='font-semibold text-2xl'>
                    Link your Github Repository
                </h1>
                <p className='text-sm text-muted-foreground'>
                    Enter the URL of your repository to link it to DevRecall
                </p>
            </div>
            <div className="h-4">
                <div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Input  
                        {...register('projectName', { required: true})}
                        placeholder='Project name'
                        required
                        />
                        <div className="h-2"></div>
                        <Input  
                        {...register('repoUrl', { required: true})}
                        placeholder='Github URL'
                        type='url'
                        required
                        />
                        <div className="h-2"></div>
                        <Input  
                        {...register('githubToken')}
                        placeholder='Github Token (optional)'
                        />
                        <div className="h-4"></div>
                        <Button type='submit' disabled={createProject.isPending}>
                            Create Project
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CreatePage