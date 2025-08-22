import { DoctorListTable } from "@/app/dashboard/tables/DoctorListTable";

export default function DoctorListPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold ">Doctor List</h1>
      <DoctorListTable/>
    </div>
  );
}