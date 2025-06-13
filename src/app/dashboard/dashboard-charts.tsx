"use client"

import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  ResponsiveContainer,
} from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { month: "January", appointments: 80 , surgeries: 100 },
  { month: "February", appointments: 305, surgeries: 200 },
  { month: "March", appointments: 237, surgeries: 120 },
  { month: "April", appointments: 73, surgeries: 190 },
  { month: "May", appointments: 209, surgeries: 130 },
  { month: "June", appointments: 214, surgeries: 140 },
]

const chartConfig = {
  appointments: {
    label: "Appointments",
    color: "#2563eb",
  },
  surgeries: {
    label: "Surgeries",
    color: "#60a5fa",
  },
} satisfies ChartConfig

export function Charts() {
  return (
    <ChartContainer config={chartConfig} className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="appointments" fill="var(--color-appointments)" radius={4} />
          <Bar dataKey="surgeries" fill="var(--color-surgeries)" radius={4} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
