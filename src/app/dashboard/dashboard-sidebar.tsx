import { Calendar, Stethoscope, ClipboardList, BriefcaseMedical, Logs,ClipboardMinus, Inbox, Receipt, Settings, MonitorCog, ChevronDown, ChevronRight, ClipboardPlus, CirclePlus } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useState } from "react"
import { useRouter } from "next/navigation"


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
    children:[
      { title: "Appointments", url: "/dashboard/pages/appointment/appointments", icon: BriefcaseMedical },
      { title: "Appointment List", url: "/dashboard/pages/appointment/appointmentlist", icon: Logs },
      { title: "Book Appointment", url: "/dashboard/pages/doctor/doctorcard", icon: ClipboardPlus },
    ],
  },
  {
    title: "Doctor",
    url: "/dashboard/pages/doctor/dashboard",
    icon: BriefcaseMedical,
    children:
    [
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
    title: "Add Doctor",
    url: "/dashboard/pages/doctor/adddoctor",
    icon: CirclePlus,
      },
    ],
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
  const router = useRouter()
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({})

  const toggleGroup = (group: string) => {
    setOpenGroups((prev) => ({ ...prev, [group]: !prev[group] }))
  }

  return (
    <Sidebar>
      <div className="p-4 text-xl font-bold border-b">Medical Admin</div>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.children ? (
                    <>
                      <button
                        onClick={() => toggleGroup(item.title)}
                        className="flex items-center justify-between w-full px-2 py-1 rounded hover:bg-muted"
                      >
                        <div className="flex items-center gap-2">
                          <item.icon className="w-5 h-5" />
                          <span>{item.title}</span>
                        </div>
                        {openGroups[item.title] ? (
                          <ChevronDown className="w-4 h-4" />
                        ) : (
                          <ChevronRight className="w-4 h-4" />
                        )}
                      </button>

                      {openGroups[item.title] && (
                        <div className="ml-6 mt-1 flex flex-col gap-1">
                          {item.children.map((child) => (
                            <button
                              key={child.title}
                              onClick={() => router.push(child.url)}
                              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded px-2 py-1"
                            >
                              {child.icon && <child.icon className="w-4 h-4" />}
                              {child.title}
                            </button>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <SidebarMenuButton asChild>
                      <button
                        onClick={() => router.push(item.url)}
                        className="flex items-center gap-2 w-full px-2 py-1 hover:bg-muted rounded"
                      >
                        <item.icon className="w-5 h-5" />
                        <span>{item.title}</span>
                      </button>
                    </SidebarMenuButton>
                     )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
