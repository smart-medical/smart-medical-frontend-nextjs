import { Calendar, Stethoscope, ClipboardList, Users, Inbox, Receipt, Settings, MonitorCog, ChevronDown } from "lucide-react"

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
    title: "Users",
    icon: Users,
    children: [
      { title: "Doctors", url: "/dashboard/users/doctors" },
      { title: "Patients", url: "/dashboard/users/patients" },
      { title: "Staff", url: "/dashboard/users/staff" },
    ],
  },
  {
    title: "Appointments",
    url: "/dashboard/appointments",
    icon: Calendar,
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

export function AppSidebar() {
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
                <DropdownMenuContent side="right" align="start" className="ml-6" >
                  {item.children.map((child) => (
                    <DropdownMenuItem asChild key={child.title}>
                      <a href={child.url}>{child.title}</a>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              ) : (
                <a href={item.url} className="flex items-center gap-2">
                  <item.icon className="w-5 h-5" />
                  <span>{item.title}</span>
                </a>
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
