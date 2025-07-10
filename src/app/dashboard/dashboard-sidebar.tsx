import { Calendar, Stethoscope, ClipboardList, BriefcaseMedical, Logs,ClipboardMinus, Inbox, Receipt, Settings, MonitorCog } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

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
    title: "Doctor Card",
    url: "/dashboard/pages/doctor/doctorcard",
    icon: ClipboardMinus,
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
                    <button
                      onClick={() => item.url && setView(item.title)}
                      className="flex items-center gap-2 w-full px-2 py-1 hover:bg-muted rounded"
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </button>
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

