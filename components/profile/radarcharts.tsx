"use client"

import { TrendingUp } from "lucide-react"
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

type ChartRadarDotsProps = {
  stats: Record<string, number> // example: { STR: 12, DEX: 14, INT: 10, CHA: 8 }
}

export function ChartRadarDots({ stats }: ChartRadarDotsProps) {
  // Convert stats object to array for Recharts
  const chartData = Object.entries(stats || {}).map(([key, value]) => ({
    stat: key,
    value,
  }))

  const chartConfig = {
    value: {
      label: "Stat",
      color: "var(--chart-1)",
    },
  } satisfies ChartConfig

  return (
    <Card>
      <CardHeader className="items-center text-center">
        <CardTitle>Character Stats Overview</CardTitle>
        <CardDescription>
          Your current skill and attribute balance
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[400px]"
        >
          <RadarChart data={chartData}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey="stat" />
            <PolarGrid />
            <Radar
              dataKey="value"
              fill="var(--color-value)"
              fillOpacity={0.6}
              dot={{ r: 4, fillOpacity: 1 }}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
