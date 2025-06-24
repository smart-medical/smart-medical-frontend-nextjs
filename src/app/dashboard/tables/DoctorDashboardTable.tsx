import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function DoctorDashboardTable() {
  return (
    <div className="space-y-6 p-4">
      <Card>
        <CardHeader>
          <CardTitle>Recent Appointments</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full text-sm text-left">
            <thead>
              <tr>
                <th className="py-2">Patient</th>
                <th className="py-2">Doctor</th>
                <th className="py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2">John Doe</td>
                <td className="py-2">Dr. Smith</td>
                <td className="py-2">2025-06-14</td>
              </tr>
              <tr>
                <td className="py-2">Jane Roe</td>
                <td className="py-2">Dr. Brown</td>
                <td className="py-2">2025-06-13</td>
              </tr>
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}
