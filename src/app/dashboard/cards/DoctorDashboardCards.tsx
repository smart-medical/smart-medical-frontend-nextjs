import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function DoctorDashboardCards() {
  return (
    <div className="space-y-6 p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Patients</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">1,245</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">329</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Surgeries</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">78</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Earnings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">$12,400</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
