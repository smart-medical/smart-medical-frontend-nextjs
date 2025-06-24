import DoctorDashboardCards from "@/app/dashboard/cards/DoctorDashboardCards";
import DoctorDashboardCharts from "@/app/dashboard/charts/DoctorDashboardCharts";
import DoctorDashboardTable from "@/app/dashboard/tables/DoctorDashboardTable";

export default function DoctorHomePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold ">Doctor Dashboard</h1>
      {/* Add dashboard cards or charts here */}
      <DoctorDashboardCards />
      <DoctorDashboardCharts />
      <DoctorDashboardTable />
    </div>
  );
}