"use client";

import { useEffect, useState } from "react";
import { BarChart3, LineChart, PieChart } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { BarChartComponent } from "@/components/charts/bar-chart";
import { LineChartComponent } from "@/components/charts/line-chart";
import { PieChartComponent } from "@/components/charts/pie-chart";
import { streamReportData } from "@/lib/data";

export function ReportContent({ reportId }: { reportId: string }) {
  const [sections, setSections] = useState<any[]>([]);
  const [loadingCharts, setLoadingCharts] = useState<Set<string>>(new Set());

  useEffect(() => {
    async function loadReportData() {
      const dataStream = streamReportData(reportId);
      
      for await (const chunk of dataStream) {
        if (chunk.status === "complete" && chunk.data) {
          // Initialize all charts as loading
          const chartIds = new Set<string>();
          chunk.data.sections.forEach((section: any) => {
            section.charts.forEach((chart: any) => {
              chartIds.add(chart.id);
            });
          });
          setLoadingCharts(chartIds);
          setSections(chunk.data.sections);
          
          // Simulate different loading times for each chart
          chunk.data.sections.forEach((section: any) => {
            section.charts.forEach((chart: any) => {
              const delay = Math.random() * 2000 + 1000; // Random delay between 1-3 seconds
              setTimeout(() => {
                setLoadingCharts(prev => {
                  const next = new Set(prev);
                  next.delete(chart.id);
                  return next;
                });
              }, delay);
            });
          });
        }
      }
    }
    
    loadReportData();
  }, [reportId]);

  if (sections.length === 0) {
    return <ReportSkeleton />;
  }

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
                isLoading={loadingCharts.has(chart.id)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ReportChart({ chart, isLoading }: { chart: any; isLoading: boolean }) {
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
          {isLoading ? (
            <div className="h-full w-full flex items-center justify-center bg-muted/10 rounded-md animate-pulse">
              <Skeleton className="h-full w-full rounded-md" />
            </div>
          ) : (
            <ChartComponent data={chart.data} />
          )}
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