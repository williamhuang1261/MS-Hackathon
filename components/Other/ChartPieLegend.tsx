"use client";

import { Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";

export const description = "A pie chart with a legend";

const chartData = [
  { category: "Shelter", value: 275, fill: "var(--chart-1)" },
  { category: "Food", value: 200, fill: "var(--chart-2)" },
  { category: "Multilingual services", value: 187, fill: "var(--chart-3)" },
  { category: "Public awareness", value: 173, fill: "var(--chart-4)" },
];

const chartConfig = {
  value: {
    label: "Amount",
  },
  Shelter: {
    label: "Shelter",
    color: "var(--chart-1)",
  },
  Food: {
    label: "Food",
    color: "var(--chart-2)",
  },
  "Multilingual services": {
    label: "Multilingual services",
    color: "var(--chart-3)",
  },
  "Public awareness": {
    label: "Public awareness",
    color: "var(--chart-4)",
  },
} satisfies ChartConfig;

export function ChartPieLegend() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <div className="flex justify-between">
          <h2 className="text-2xl">Your Impact</h2>
          <h3 className="text-2xl text-gray-500">100$</h3>
        </div>
        <CardDescription>Here is how your money will be used</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart className="">
            <Pie data={chartData} dataKey="value" nameKey="category" className="shadow-sm"/>
            <ChartLegend
              content={<ChartLegendContent nameKey="category" />}
              className="-translate-y-2 flex-wrap gap-2"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export default ChartPieLegend;
