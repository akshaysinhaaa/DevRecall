'use client'

import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar"
import { Bot, CreditCard, LayoutDashboardIcon, Plus, Presentation } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import useProject from "@/hooks/use-project"

const items = [
    {
        title: 'Dashboard',
        url:   '/dashboard',
        icon: LayoutDashboardIcon
    },
    {
        title: 'Q&A',
        url:   '/qa',
        icon:  Bot
    },
    {
        title: 'Meetings',
        url:   '/meetings',
        icon: Presentation
    },
    {
        title: 'Billing',
        url:   '/billing',
        icon: CreditCard
    }
]



export function AppSidebar() {
    const pathname = usePathname()
    const {open} = useSidebar()
    const { projects, projectId } = useProject()
    return (
        <Sidebar collapsible="icon" variant="floating">
            <SidebarHeader>
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 flex items-center justify-center overflow-hidden">
                        <Image src='/logo.png' alt="logo" width={60} height={60} className="scale-150" />
                    </div>
                    {open && (
                        <h1 className="text-xl font-bold text-primary/80">
                            DevRecall
                        </h1>
                    )}
                </div>
            </SidebarHeader> 
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>
                        Application
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                        {items.map(item=>{
                            return(
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link href={item.url} className={cn({
                                            '!bg-primary !text-white' : pathname === item.url
                                        }, 'list-none')}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            )
                        })}
                        </SidebarMenu>
                        
                    </SidebarGroupContent>
                </SidebarGroup>


                <SidebarGroup>
                    <SidebarGroupLabel>
                        Your Projects
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {projects?.map((project: { id: string; name: string }) => {
                                return (
                                    <SidebarMenuItem key={project.name}>
                                        <SidebarMenuButton asChild>
                                            <div>
                                                <div className={cn(
                                                    'rounded-sm border size-6 flex items-center justify-center text-sm bg-white text-primary ',
                                                    {
                                                        'bg-primary text-white' : project.id === projectId
                                                    }
                                                )}>
                                                    {project.name[0]}

                                                </div>
                                                <span>{project.name}</span>
                                            </div>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )
                            })}
                            <div className="h2"></div>

                            {open && (
                                <SidebarMenuItem>
                                <Link href='/create'>
                                    <Button size='sm' variant={'outline'} className="w-fit">
                                        <Plus/>
                                        Create Project
                                    </Button>
                                </Link>
                            </SidebarMenuItem>
                            )}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}