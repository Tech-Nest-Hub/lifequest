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
  { title: "Leaderboard", url: "/leaderboard", icon: Trophy },
  { title: "Party", url: "/party", icon: Users },
  { title: "Inventory", url: "/inventory", icon: Inbox },
  { title: "Stats", url: "/stats", icon: BarChart3 },
  { title: "Calendar", url: "/calendar", icon: Calendar },
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
          {/* Logo Section */}
          <SidebarGroup className="border-b border-cyan-500/20 pb-6 mb-6">
            <SidebarGroupLabel>
              <div className="flex items-center gap-3 px-2">
                <div className="rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 p-2 flex-shrink-0">
                  <GamepadIcon className="h-6 w-6 text-white" />
                </div>
                <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent font-black text-lg whitespace-nowrap sidebar-expanded:block sidebar-collapsed:hidden">
                  MyLifeQuest
                </span>
              </div>
            </SidebarGroupLabel>
          </SidebarGroup>

          {/* Navigation Menu */}
          <SidebarGroup>
            <SidebarGroupLabel className="text-xs uppercase tracking-wider text-cyan-400/60 px-2 sidebar-expanded:block sidebar-collapsed:hidden">
              Navigation
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <Tooltip delayDuration={0}>
                      <TooltipTrigger asChild>
                        <SidebarMenuButton
                          asChild
                          className="hover:bg-cyan-500/20 transition-colors"
                        >
                          <a href={item.url} className="flex items-center gap-3 px-3 py-3">
                            <item.icon className="h-5 w-5 text-cyan-300 flex-shrink-0" />
                            <span className="text-cyan-200 whitespace-nowrap sidebar-expanded:block sidebar-collapsed:hidden">
                              {item.title}
                            </span>
                          </a>
                        </SidebarMenuButton>
                      </TooltipTrigger>
                      <TooltipContent
                        side="right"
                        className="bg-cyan-900 border-cyan-500 text-cyan-100 sidebar-expanded:hidden"
                      >
                        {item.title}
                      </TooltipContent>
                    </Tooltip>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Quick Stats - Only show when expanded */}
          <SidebarGroup className="mt-auto border-t border-cyan-500/20 pt-6 sidebar-expanded:block sidebar-collapsed:hidden">
            <SidebarGroupLabel className="text-xs uppercase tracking-wider text-cyan-400/60 px-2">
              Quick Stats
            </SidebarGroupLabel>
          </SidebarGroup>

          {/* Mini Stats - Only show when collapsed */}
          <SidebarGroup className="mt-auto border-t border-cyan-500/20 pt-6 sidebar-expanded:hidden sidebar-collapsed:block">
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