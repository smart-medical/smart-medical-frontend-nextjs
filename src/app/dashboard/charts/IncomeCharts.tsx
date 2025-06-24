"use client"

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

const chartData = [
  { month: "January", appointments: 80, surgeries: 100 },
  { month: "February", appointments: 305, surgeries: 200 },
  { month: "March", appointments: 237, surgeries: 120 },
  { month: "April", appointments: 73, surgeries: 190 },
  { month: "May", appointments: 209, surgeries: 130 },
  { month: "June", appointments: 214, surgeries: 140 },
]

const data: ChartData<"bar"> = {
  labels: chartData.map((item) => item.month),
  datasets: [
    {
      label: "Appointments",
      data: chartData.map((item) => item.appointments),
      backgroundColor: "#2563eb", // blue-600
      borderRadius: 6,
      barThickness: 20,
    },
    {
      label: "Surgeries",
      data: chartData.map((item) => item.surgeries),
      backgroundColor: "#60a5fa", // blue-400
      borderRadius: 6,
      barThickness: 20,
    },
  ],
}

const options: ChartOptions<"bar"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
      labels: {
        color: "#6b7280", // gray-500
        font: { size: 12, weight: "bold" },
      },
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
      border: {
        display: false,
      },
      ticks: {
        color: "#6b7280", // gray-500
        callback: function (value) {
          const label = this.getLabelForValue(Number(value))
          return label.substring(0, 3)
        },
      },
    },
    y: {
      beginAtZero: true,
      grid: {
        color: "#e5e7eb", // gray-200
      },
      border: {
        display: false,
      },
      ticks: {
        color: "#6b7280",
      },
    },
  },
}

export function IncomeCharts() {
  return (
    <div className="w-full space-y-4 p-4">
      <h2 className="text-xl font-semibold text-gray-800">Monthly Income Overview</h2>
      <div className="w-full h-[300px] bg-white rounded-xl shadow-md p-4 dark:bg-gray-900">
        <Bar data={data} options={options} />
      </div>
    </div>
  )
}
