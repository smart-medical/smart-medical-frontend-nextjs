/* eslint-disable @next/next/no-img-element */
import { Card } from "@/components/ui/card"
import { Users, Calendar } from "lucide-react"

interface DoctorCardProps {
  name: string
  specialty: string
  patients: number
  appointments: number
  imageUrl: string
}

export function DoctorCard({
  name,
  specialty,
  patients,
  appointments,
  imageUrl,
}: DoctorCardProps) {
  return (
    <Card className="max-w-sm bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden">
      <div className="flex p-4 space-x-4">
        <img
          src={imageUrl}
          alt={`${name} profile`}
          className="w-20 h-20 rounded-full object-cover"
        />
        <div className="flex flex-col justify-center flex-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{name}</h3>
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
        </div>
      </div>
    </Card>
  )
}

export default function DoctorCards() {
  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <DoctorCard
        name="Dr. Stella Kane"
        specialty="Dental Surgeon"
        patients={1200}
        appointments={35}
        imageUrl="/image-3.jpeg"
      />
      <DoctorCard
        name="Dr. June"
        specialty="Neurologist"
        patients={900}
        appointments={28}
        imageUrl="/image-3.jpeg"
      />
      <DoctorCard
        name="Dr. Sara Watson"
        specialty="Orthopedic"
        patients={1100}
        appointments={30}
        imageUrl="/image-3.jpeg"
      />
    </div>
  )
}
