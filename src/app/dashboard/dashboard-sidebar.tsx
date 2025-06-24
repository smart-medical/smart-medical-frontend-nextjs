import { Calendar, Stethoscope, ClipboardList, BriefcaseMedical, Logs, Inbox, Receipt, Settings, MonitorCog, ChevronDown } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"


const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Stethoscope,
  },
  {
    title: "Appointments",
    url: "/dashboard/appointments",
    icon: Calendar,
  },
  {
    title: "Doctor Dashboard",
    url: "/dashboard/pages/doctor/dashboard",
    icon: BriefcaseMedical,
  },
   {
    title: "Doctor List",
    url: "/dashboard/pages/doctor/doctorlist",
    icon: Logs,
  },
  {
    title: "Inventory",
    url: "/dashboard/inventory",
    icon: Inbox,
  },
  {
    title: "Billing",
    url: "/dashboard/billing",
    icon: Receipt,
  },
  {
    title: "Reports",
    url: "/dashboard/reports",
    icon: ClipboardList,
  },
  {
    title: "System Logs",
    url: "/dashboard/system_log",
    icon: MonitorCog,
  },
  {
    title: "Setting",
    url: "/dashboard/setting",
    icon: Settings,
  },
]

export function AppSidebar({ setView }: { setView: (v: string) => void }) {
  return (
    <Sidebar>
      <div className="p-4 text-xl font-bold border-b">Medical Admin</div>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
    <SidebarMenuItem key={item.title}>
      <SidebarMenuButton asChild>
        {item.children ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex w-full items-center justify-between gap-2 px-2 py-1 hover:bg-muted rounded">
                <div className="flex items-center gap-2">
                  <item.icon className="w-5 h-5" />
                  <span>{item.title}</span>
                </div>
                <ChevronDown className="w-4 h-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right" align="start" className="ml-6">
              {item.children.map((child) => (
                <DropdownMenuItem key={child.title} onClick={() => setView(child.title)}>
                  {child.title}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <button
            onClick={() => item.url && setView(item.title)}
            className="flex items-center gap-2 w-full px-2 py-1 hover:bg-muted rounded"
          >
            <item.icon className="w-5 h-5" />
            <span>{item.title}</span>
          </button>
        )}
      </SidebarMenuButton>
    </SidebarMenuItem>
  ))}
              </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
