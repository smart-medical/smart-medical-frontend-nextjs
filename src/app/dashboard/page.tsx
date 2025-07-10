import { DashboardCards } from "./cards/DashboardCards";
import { IncomeCharts } from "./charts/IncomeCharts";
import { DataTable } from "./tables/RecentPatientTable";

export default function HomePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold ">Dashboard Overview</h1>
      <DashboardCards />
      <IncomeCharts />
      <DataTable />
    </div>
  );
}