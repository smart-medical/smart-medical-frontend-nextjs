/* eslint-disable @next/next/no-img-element */
"use client"
import { Card } from "@/components/ui/card"
import { Users, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface DoctorCardProps {
  title: string
  specialty: string
  patients: number
  appointments: number
  imageUrl: string
}

const items = [
  {
    image: "/image-3.jpeg",
    title: "Sarah Johnson",
    subtitle: "Gastrology Specialist, MBBS, MDS, MA IN GASTRONOMY",
    patients: 400,
    appointments: 30,
    handle: "@sarahjohnson",
    borderColor: "#3B82F6",
    gradient: "linear-gradient(145deg, #3B82F6, #000)",
    url: "/dashboard/pages/doctor/doctorProfile"
  },
    {
    image: "/image-3.jpeg",
    title: "Sel June",
    subtitle: "Medicine Specialist, MBBS, MDS, MA IN Internal Medicine",
    patients: 500,
    appointments: 20,
    handle: "@sarahjohnson",
    borderColor: "#3B82F6",
    gradient: "linear-gradient(145deg, #3B82F6, #000)",
    url: "/dashboard/pages/doctor/doctorProfile"
  },
    {
    image: "/image-3.jpeg",
    title: "William Johnson",
    subtitle: "Gastrology Specialist, MBBS, MDS, MA IN GASTRONOMY",
    patients: 670,
    appointments: 40,
    handle: "@sarahjohnson",
    borderColor: "#3B82F6",
    gradient: "linear-gradient(145deg, #3B82F6, #000)",
    url: "/dashboard/pages/doctor/doctorProfile"
  },
    {
    image: "/image-3.jpeg",
    title: "Healy Ak",
    subtitle: "Laporoscopic Specialist, MBBS, MDS, MA IN Laporoscopy",
    patients: 99,
    appointments: 10,
    handle: "@sarahjohnson",
    borderColor: "#3B82F6",
    gradient: "linear-gradient(145deg, #3B82F6, #000)",
    url: "/dashboard/pages/doctor/doctorProfile"
  },
      {
    image: "/image-3.jpeg",
    title: "Tim Scutt",
    subtitle: "Gynocolgy Specialist, MBBS, MDS, MA IN GYNOCOLGY",
    patients: 399,
    appointments: 22,
    handle: "@sarahjohnson",
    borderColor: "#3B82F6",
    gradient: "linear-gradient(145deg, #3B82F6, #000)",
    url: "/dashboard/pages/doctor/doctorProfile"
  },
      {
    image: "/image-3.jpeg",
    title: "Bell Ford",
    subtitle: "Gastrology Specialist, MBBS, MDS, MA IN GASTRONOMY",
    patients: 1000,
    appointments: 45,
    handle: "@sarahjohnson",
    borderColor: "#3B82F6",
    gradient: "linear-gradient(145deg, #3B82F6, #000)",
    url: "/dashboard/pages/doctor/doctorProfile"
  },
];

export function DoctorCard({
  title,
  specialty,
  patients,
  appointments,
  imageUrl,
}: DoctorCardProps)
{
  const router = useRouter()
  return (
    <Card className="max-w-sm bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden">
      <div className="flex p-4 space-x-4">
        <img
          src={imageUrl}
          alt={`${title} profile`}
          className="w-20 h-20 rounded-full object-cover"
        />
        <div className="flex flex-col justify-center flex-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{specialty}</p>
          <div className="flex space-x-6 mt-3 text-gray-600 dark:text-gray-300 text-sm">
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>{patients} Patients</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>{appointments} Appointments</span>
            </div>
          </div>
  
  <Button onClick={() => router.push("/dashboard/pages/appointment/bookAppointment")} className="mt-4 w-full rounded-xl">
    Book Appointment
  </Button>
        </div>
      </div>
    </Card>
  )
}

export default function DoctorCards() {
  return (
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
  {items.map((item, index) => (
    <DoctorCard
      key={index}
      title={item.title}
      specialty={item.subtitle}
      patients={item.patients}
      appointments={item.appointments}
      imageUrl={item.image}
    />
  ))}
</div>
  )
}

