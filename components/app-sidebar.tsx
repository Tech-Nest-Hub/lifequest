"use client"

import {
  Calendar,
  Home,
  Inbox,
  Settings,
  GamepadIcon,
  Trophy,
  Users,
  BarChart3,
  Target,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const items = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Quests", url: "/quests", icon: Target },
  { title: "Party", url: "/party", icon: Users },
  { title: "Events", url: "/events", icon: Users },
  { title: "Inventory", url: "/inventory", icon: Inbox },
  { title: "Shop", url: "/stats", icon: BarChart3 },
  { title: "Marketplace", url: "/calendar", icon: Calendar },
  { title: "Leaderboard", url: "/leaderboard", icon: Trophy },
  { title: "Settings", url: "/settings", icon: Settings },
]

export default function AppSidebar() {
  return (
    <TooltipProvider>
      <Sidebar
        collapsible="icon"
        className="transition-all duration-300 overflow-visible dark:bg-black"
      >
        <SidebarContent>
          {/* Navigation Menu */}
          <SidebarGroup>
            <SidebarGroupLabel className="text-xs uppercase tracking-wider text-cyan-400/60 px-2 sidebar-expanded:block sidebar-collapsed:hidden">
              Navigation
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-2">
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <Tooltip delayDuration={0}>
                      <TooltipTrigger asChild>
                        <SidebarMenuButton
                          asChild
                          className="hover:bg-cyan-500/20 transition-colors group-data-[collapsible=icon]:h-12! group-data-[collapsible=icon]:w-12! group-data-[collapsible=icon]:mx-auto group-data-[collapsible=icon]:mt-2 group-data-[collapsible=icon]:justify-center"
                        >
                          <a href={item.url} className="flex items-center gap-4 px-3 py-3">
                            <item.icon className="h-6 w-6 group-data-[collapsible=icon]:h-7 group-data-[collapsible=icon]:w-7 text-cyan-300 shrink-0" />
                            <span className="text-cyan-200 whitespace-nowrap group-data-[collapsible=icon]:hidden">
                              {item.title}
                            </span>
                          </a>
                        </SidebarMenuButton>
                      </TooltipTrigger>
                      <TooltipContent
                        side="right"
                        className="bg-cyan-900 border-cyan-500 text-cyan-100"
                      >
                        {item.title}
                      </TooltipContent>
                    </Tooltip>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>


          {/* Mini Stats - Only show when collapsed */}
          <SidebarGroup className="mt-auto border-t border-cyan-500/20 pt-6 sidebar-expanded:hidden">
            <SidebarGroupContent>
              <div className="flex flex-col items-center space-y-2 p-2">
                <div className="text-cyan-400 font-bold text-lg">23</div>
                <div className="text-cyan-300/70 text-xs">LVL</div>
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </TooltipProvider>
  )
}