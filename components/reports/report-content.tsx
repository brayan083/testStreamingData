"use client";

import { useEffect, useState } from "react";
import { BarChart3, LineChart, PieChart } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { BarChartComponent } from "@/components/charts/bar-chart";
import { LineChartComponent } from "@/components/charts/line-chart";
import { PieChartComponent } from "@/components/charts/pie-chart";

export function ReportContent({ datos }: { datos: Array<any> }) {
  const [sections, setSections] = useState<any[]>([]);

  console.log("sections", sections);


  useEffect(() => {
    setSections(datos);
  }, [datos]);

  return (
    <div className="space-y-10">
      {sections.map((section: any) => (
        <div key={section.id} className="space-y-6">
          <h2 className="text-2xl font-bold">{section.title}</h2>
          
          <div className="grid gap-6 md:grid-cols-2">
            {section.charts.map((chart: any) => (
              <ReportChart 
                key={chart.id} 
                chart={chart} 
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ReportChart({ chart }: { chart: any;}) {
  const chartTypes = {
    bar: {
      icon: <BarChart3 className="h-5 w-5 text-muted-foreground" />,
      component: BarChartComponent,
    },
    line: {
      icon: <LineChart className="h-5 w-5 text-muted-foreground" />,
      component: LineChartComponent,
    },
    pie: {
      icon: <PieChart className="h-5 w-5 text-muted-foreground" />,
      component: PieChartComponent,
    },
  };

  const ChartComponent = chartTypes[chart.type as keyof typeof chartTypes]?.component || chartTypes.bar.component;
  const icon = chartTypes[chart.type as keyof typeof chartTypes]?.icon || chartTypes.bar.icon;

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle>{chart.title}</CardTitle>
          {icon}
        </div>
        <CardDescription>
          {chart.description || "Chart data visualization"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ChartComponent data={chart.data} />
        </div>
      </CardContent>
    </Card>
  );
}

function ReportSkeleton() {
  return (
    <div className="space-y-10">
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="grid gap-6 md:grid-cols-2">
          {[1, 2].map((i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-6 w-40" />
                  <Skeleton className="h-5 w-5" />
                </div>
                <Skeleton className="h-4 w-60 mt-1" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-[300px] w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <Skeleton className="h-6 w-40" />
                <Skeleton className="h-5 w-5" />
              </div>
              <Skeleton className="h-4 w-60 mt-1" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-[300px] w-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}