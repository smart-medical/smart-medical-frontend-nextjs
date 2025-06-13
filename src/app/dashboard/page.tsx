import { DashboardCards } from "./dashboard-cards";
import { Charts } from "./dashboard-charts";

export default function HomePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Dashboard Overview</h1>
      {/* Add dashboard cards or charts here */}
      <DashboardCards />
      <Charts/>
    </div>
  );
}