"use client"

import { useMemo } from "react"
import { format, subDays } from "date-fns"
import { AreaChart, Area, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import type { TimeEntry } from "@/api/timeEntries"

interface HoursTrendChartProps {
  timeEntries: TimeEntry[]
}

export function HoursTrendChart({ timeEntries }: HoursTrendChartProps) {
  const chartData = useMemo(() => {
    // Generate last 7 days
    const days = Array.from({ length: 7 }, (_, i) => {
      const date = subDays(new Date(), 6 - i)
      return {
        date: format(date, "yyyy-MM-dd"),
        displayDate: format(date, "MMM d"),
        hours: 0,
      }
    })

    // Calculate hours for each day
    timeEntries.forEach((entry) => {
      const entryDate = format(new Date(entry.startedAt), "yyyy-MM-dd")
      const dayData = days.find((day) => day.date === entryDate)
      if (dayData) {
        dayData.hours += entry.minutes / 60
      }
    })

    return days.map((day) => ({
      date: day.displayDate,
      hours: Math.round(day.hours * 10) / 10, // Round to 1 decimal place
    }))
  }, [timeEntries])

  const chartConfig = {
    hours: {
      label: "Hours",
      color: "hsl(var(--chart-1))",
    },
  }

  return (
    <ChartContainer config={chartConfig}>
      <AreaChart data={chartData}>
        <defs>
          <linearGradient id="fillHours" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-hours)" stopOpacity={0.8} />
            <stop offset="95%" stopColor="var(--color-hours)" stopOpacity={0.1} />
          </linearGradient>
        </defs>
        <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value) => value} />
        <YAxis tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value) => `${value}h`} />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dot" />}
          formatter={(value) => [`${value}h`, "Hours"]}
        />
        <Area
          dataKey="hours"
          type="natural"
          fill="url(#fillHours)"
          fillOpacity={0.4}
          stroke="var(--color-hours)"
          strokeWidth={2}
        />
      </AreaChart>
    </ChartContainer>
  )
}
