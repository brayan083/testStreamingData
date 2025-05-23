"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { 
  BarChart3, 
  LineChart, 
  PieChart, 
  Plus, 
  Search, 
  SlidersHorizontal,
  Database,
  FileJson,
  FileSpreadsheet
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { ThemeToggle } from "@/components/theme-toggle";
import { Badge } from "@/components/ui/badge";
import { fetchRecentReports, fetchDataSources } from "@/lib/data";

export default function ReportsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDataSource, setSelectedDataSource] = useState<string>("");
  const [reports, setReports] = useState<any[]>([]);
  const [dataSources, setDataSources] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load initial data
  useState(() => {
    async function loadData() {
      const [reportsData, dataSourcesData] = await Promise.all([
        fetchRecentReports(),
        fetchDataSources()
      ]);
      setReports(reportsData);
      setDataSources(dataSourcesData);
      setIsLoading(false);
    }
    loadData();
  });

  // Filter reports based on search term and selected data source
  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDataSource = selectedDataSource === "" || 
      report.dataSources.some((ds: any) => ds.id === selectedDataSource);
    return matchesSearch && matchesDataSource;
  });

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="flex items-center gap-2 font-semibold">
            <Link href="/">
              <BarChart3 className="h-6 w-6" />
            </Link>
            <span>DataViz Reporter</span>
          </div>
          <nav className="ml-auto flex gap-4 sm:gap-6">
            <Link 
              href="/reports"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Reports
            </Link>
            <Link 
              href="/templates"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Templates
            </Link>
            <Link 
              href="/settings"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Settings
            </Link>
          </nav>
          <div className="ml-4">
            <ThemeToggle />
          </div>
        </div>
      </header>
      
      <main className="flex-1 container py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
            <p className="text-muted-foreground">
              Manage and view your reports
            </p>
          </div>
          <Link href="/reports/create">
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Create Report
            </Button>
          </Link>
        </div>
        
        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder="Search reports..." 
                className="pl-8 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={selectedDataSource} onValueChange={setSelectedDataSource}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Filter by data source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Data Sources</SelectItem>
                {dataSources.map((source) => (
                  <SelectItem key={source.id} value={source.id}>
                    {source.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon" className="ml-auto">
              <SlidersHorizontal className="h-4 w-4" />
              <span className="sr-only">Filter</span>
            </Button>
          </div>
          
          <Tabs defaultValue="all" className="w-full">
            <TabsList>
              <TabsTrigger value="all">All Reports</TabsTrigger>
              <TabsTrigger value="recent">Recent</TabsTrigger>
              <TabsTrigger value="shared">Shared</TabsTrigger>
              <TabsTrigger value="archived">Archived</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-6">
              {isLoading ? (
                <ReportsGridSkeleton />
              ) : (
                <ReportsGrid reports={filteredReports} />
              )}
            </TabsContent>
            <TabsContent value="recent" className="mt-6">
              <div className="flex items-center justify-center h-40 text-muted-foreground">
                Recent reports will appear here
              </div>
            </TabsContent>
            <TabsContent value="shared" className="mt-6">
              <div className="flex items-center justify-center h-40 text-muted-foreground">
                Shared reports will appear here
              </div>
            </TabsContent>
            <TabsContent value="archived" className="mt-6">
              <div className="flex items-center justify-center h-40 text-muted-foreground">
                Archived reports will appear here
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} DataViz Reporter. All rights reserved.
          </p>
          <nav className="flex gap-4 sm:gap-6">
            <Link href="/terms" className="text-sm text-muted-foreground transition-colors hover:text-primary">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground transition-colors hover:text-primary">
              Privacy
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}

function ReportsGrid({ reports }: { reports: any[] }) {
  if (reports.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No reports found matching your criteria.</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {reports.map((report) => (
        <ReportCard key={report.id} report={report} />
      ))}
    </div>
  );
}

function ReportCard({ report }: { report: any }) {
  const chartIcons = {
    bar: <BarChart3 className="h-6 w-6" />,
    line: <LineChart className="h-6 w-6" />,
    pie: <PieChart className="h-6 w-6" />,
  };

  const dataSourceIcons = {
    api: <FileJson className="h-4 w-4" />,
    database: <Database className="h-4 w-4" />,
    csv: <FileSpreadsheet className="h-4 w-4" />,
  };

  const icon = chartIcons[report.primaryChartType as keyof typeof chartIcons] || <BarChart3 className="h-6 w-6" />;
  
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between">
          <span className="truncate">{report.title}</span>
          {icon}
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-0">
        <div className="h-28 bg-muted/40 rounded-md flex items-center justify-center mb-4">
          {/* Placeholder for report thumbnail/preview */}
          <span className="text-muted-foreground text-sm">Report Preview</span>
        </div>
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground">Last updated: {report.updatedAt}</p>
          <div className="flex flex-wrap gap-2">
            {report.dataSources.map((source: any) => (
              <Badge key={source.id} variant="secondary" className="flex items-center gap-1">
                {dataSourceIcons[source.type as keyof typeof dataSourceIcons]}
                <span>{source.name}</span>
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="ghost" size="sm">Clone</Button>
        <Link href={`/reports/${report.id}`}>
          <Button size="sm">View</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

function ReportsGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <Card key={i} className="overflow-hidden">
          <CardHeader className="pb-2">
            <Skeleton className="h-6 w-3/4" />
          </CardHeader>
          <CardContent className="pb-0">
            <Skeleton className="h-28 w-full mb-4" />
            <Skeleton className="h-4 w-1/3" />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Skeleton className="h-9 w-16" />
            <Skeleton className="h-9 w-16" />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}