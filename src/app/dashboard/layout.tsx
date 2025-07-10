"use client"

import { useState } from "react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/app/dashboard/dashboard-sidebar"
import { AppointmentsPage } from "./pages/AppointmentsPage"
import HomePage from "./page"
import DoctorHomePage from "./pages/doctor/dashboard/page"
import DoctorListPage from "./pages/doctor/doctorlist/page"
import DoctorCardPage from "./pages/doctor/doctorcard/page"

export default function Layout() {
  const [currentView, setCurrentView] = useState("Dashboard")

  return (
    <SidebarProvider>
      <AppSidebar setView={setCurrentView} />
      <main className="flex-1 p-4">
        <SidebarTrigger />
        {currentView === "Dashboard" && <HomePage />}
        {currentView === "Appointments" && <AppointmentsPage />}
        {currentView === "Doctor Dashboard" && <DoctorHomePage />}
        {currentView === "Doctor List" && <DoctorListPage />}
        {currentView === "Doctor Card" && <DoctorCardPage />}
        {/* {currentView === "Inventory" && <InventoryPage />}
        {currentView === "Billing" && <BillingPage />}
        {currentView === "Reports" && <ReportsPage />}
        {currentView === "System Logs" && <SystemLogsPage />}
        {currentView === "Setting" && <SettingsPage />}
        
        {currentView === "Patients" && <PatientsPage />}
        {currentView === "Staff" && <StaffPage />} */}
      </main>
    </SidebarProvider>
  )
}
