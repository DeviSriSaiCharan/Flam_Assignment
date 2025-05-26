"use client"

import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup,SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { BarChart3, Bookmark, Home } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"


const items = [
    {
        title : "Dashboard",
        icon : Home,
        url : "/"
    },
    {
        title : "Bookmarks",
        icon : Bookmark,
        url : "/bookmarks"
    },
    {
        title : "Analytics",
        icon : BarChart3,
        url : "/analytics"
    }
];



export function AppSidebar(): React.ReactElement {

    const pathName = usePathname();

  return (
    <Sidebar>
      <SidebarHeader className="border-b-2 p-4">
        <div>
            <h2 className="text-xl font-bold text-lime">
              HR Portal
            </h2>
            <p className="text-xs text-muted-foreground">Performance Dashboard</p>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
            <SidebarMenu>
                {
                    items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild 
                                isActive={pathName === item.url}
                                className="hover:bg-lime/10"
                            >
                                <Link href={item.url} className={`font-semibold text-lg`}>
                                    <item.icon/>
                                    <span className="">{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))
                }
            </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}
