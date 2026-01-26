'use client'
import React from 'react'
import { useForm } from 'react-hook-form'

type FormInput = {
    repoUrl: string
    projectName: string    
    githubToken?: string
}

const CreatePage = () => {
    const {register, handleSubmit, reset} = useForm<FormInput>()
  return (
    <div className='flex items-center gap-12 h-full justify-center'>
        <img src='/undraw_github.svg' className='h-56 w-auto'/>
    </div>
  )
}

export default CreatePage