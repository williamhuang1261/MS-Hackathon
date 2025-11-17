"use client";

import { useTranslations } from "next-intl";
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

export function ChartPieLegend() {
  const t = useTranslations("thankYou.chart");

  const chartData = [
    { category: t("categories.shelter"), value: 275, fill: "var(--chart-1)" },
    { category: t("categories.food"), value: 200, fill: "var(--chart-2)" },
    {
      category: t("categories.multilingualServices"),
      value: 187,
      fill: "var(--chart-3)",
    },
    {
      category: t("categories.publicAwareness"),
      value: 173,
      fill: "var(--chart-4)",
    },
  ];

  const chartConfig = {
    value: {
      label: t("amountLabel"),
    },
    [t("categories.shelter")]: {
      label: t("categories.shelter"),
      color: "var(--chart-1)",
    },
    [t("categories.food")]: {
      label: t("categories.food"),
      color: "var(--chart-2)",
    },
    [t("categories.multilingualServices")]: {
      label: t("categories.multilingualServices"),
      color: "var(--chart-3)",
    },
    [t("categories.publicAwareness")]: {
      label: t("categories.publicAwareness"),
      color: "var(--chart-4)",
    },
  } satisfies ChartConfig;
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <div className="flex justify-between">
          <h2 className="text-2xl">{t("title")}</h2>
          <h3 className="text-2xl text-gray-500">100$</h3>
        </div>
        <CardDescription>{t("description")}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart className="">
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="category"
              className="shadow-sm"
            />
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
