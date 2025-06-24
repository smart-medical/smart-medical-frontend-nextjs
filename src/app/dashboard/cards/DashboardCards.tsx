/* eslint-disable @typescript-eslint/no-explicit-any */
// export function DashboardCards() {
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
//       <div className="p-4 rounded-lg shadow bg-white">
//         <h2 className="text-sm font-medium text-gray-500">Total Patients</h2>
//         <p className="text-2xl font-bold">1,284</p>
//       </div>
//       <div className="p-4 rounded-lg shadow bg-white">
//         <h2 className="text-sm font-medium text-gray-500">Active Doctors</h2>
//         <p className="text-2xl font-bold">76</p>
//       </div>
//       <div className="p-4 rounded-lg shadow bg-white">
//         <h2 className="text-sm font-medium text-gray-500">Appointments Today</h2>
//         <p className="text-2xl font-bold">97</p>
//       </div>
//       <div className="p-4 rounded-lg shadow bg-white">
//         <h2 className="text-sm font-medium text-gray-500">Pending Bills</h2>
//         <p className="text-2xl font-bold">42</p>
//       </div>
//     </div>
//   )
// }



import { User, UserCheck, CalendarCheck, FileWarning, CircleDollarSign } from "lucide-react"

const cardData = [
  {
    title: "Registered Patients",
    value: "1,284",
    icon: User,
    color: "bg-blue-50",
  },
  {
    title: "Active Doctors",
    value: "76",
    icon: UserCheck,
    color: "bg-green-50",
  },
  {
    title: "Appointments Today",
    value: "97",
    icon: CalendarCheck,
    color: "bg-yellow-50",
  },
  {
    title: "Pending Approvals",
    value: "32",
    icon: FileWarning,
    color: "bg-red-50",
  },
  {
    title: "Revenue This Week",
    value: "$142,000",
    icon: CircleDollarSign,
    color: "bg-purple-50",
  },
]


function CardItem({ title, value, icon: Icon, color }: any) {
  return (
    <div className={`w-full p-4 rounded-lg shadow ${color} flex items-center gap-4`}>
      <div className="p-2 bg-white rounded-full shadow">
        <Icon className="w-6 h-6 text-gray-700" />
      </div>
      <div>
        <h2 className="text-sm font-medium text-gray-500">{title}</h2>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  )
}

export function DashboardCards() {
  return (
    <div className="w-full p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 w-full">
        {cardData.map((card) => (
          <CardItem key={card.title} {...card} />
        ))}
      </div>
    </div>
  )
}
