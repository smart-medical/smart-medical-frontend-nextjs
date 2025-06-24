"use client"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
} from "chart.js"
import { Bar } from "react-chartjs-2"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const barData = [
  { name: "Jan", appointments: 40 },
  { name: "Feb", appointments: 30 },
  { name: "Mar", appointments: 60 },
  { name: "Apr", appointments: 80 },
  { name: "May", appointments: 50 },
  { name: "Jun", appointments: 70 },
]

const data: ChartData<"bar"> = {
  labels: barData.map((item) => item.name),
  datasets: [
    {
      label: "Appointments",
      data: barData.map((item) => item.appointments),
      backgroundColor: "#3b82f6", // Tailwind blue-500
      borderRadius: 6,
      barThickness: 24,
    },
  ],
}

const options: ChartOptions<"bar"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      mode: "index",
      intersect: false,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        color: "#6b7280", // Tailwind gray-500
        font: { size: 12 },
      },
      border: {
        display: false,
      },
    },
    y: {
      beginAtZero: true,
      grid: {
        color: "#e5e7eb", // Tailwind gray-200
      },
      ticks: {
        color: "#6b7280",
        font: { size: 12 },
      },
      border: {
        display: false,
      },
    },
  },
}

export default function DoctorDashboardCharts() {
  return (
    <div className="space-y-6 p-4">
      <Card>
        <CardHeader>
          <CardTitle>Appointments Overview</CardTitle>
        </CardHeader>
        <CardContent className="h-[250px]">
          <Bar data={data} options={options} />
        </CardContent>
      </Card>
    </div>
  )
}
