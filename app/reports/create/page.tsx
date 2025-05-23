"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  BarChart3,
  LineChart,
  PieChart,
  PlusCircle,
  Table
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { ThemeToggle } from "@/components/theme-toggle";

export default function CreateReportPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const templateType = searchParams.get("template");
  
  const [reportTitle, setReportTitle] = useState(
    templateType ? `${templateType.charAt(0).toUpperCase() + templateType.slice(1)} Report` : ""
  );
  const [description, setDescription] = useState("");
  
  const handleCreateReport = () => {
    // In a real app, this would create the report and redirect to it
    const reportId = `report-${Date.now()}`;
    router.push(`/reports/${reportId}`);
  };
  
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
        <div className="flex items-center mb-6">
          <Link href="/reports">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Reports
            </Button>
          </Link>
        </div>
        
        <div className="flex flex-col gap-8 max-w-4xl mx-auto">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Create New Report</h1>
            <p className="text-muted-foreground mt-1">
              Design a custom report with charts and visualizations
            </p>
          </div>
          
          <div className="grid gap-6">
            <div className="grid gap-3">
              <Label htmlFor="title">Report Title</Label>
              <Input 
                id="title" 
                placeholder="Enter report title"
                value={reportTitle}
                onChange={(e) => setReportTitle(e.target.value)}
              />
            </div>
            
            <div className="grid gap-3">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                placeholder="Describe the purpose of this report"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            
            <Tabs defaultValue="charts" className="w-full">
              <TabsList className="grid grid-cols-4 mb-4">
                <TabsTrigger value="charts">Charts</TabsTrigger>
                <TabsTrigger value="tables">Tables</TabsTrigger>
                <TabsTrigger value="data">Data Sources</TabsTrigger>
                <TabsTrigger value="layout">Layout</TabsTrigger>
              </TabsList>
              
              <TabsContent value="charts" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <ChartTypeCard 
                    title="Bar Chart"
                    description="Compare values across categories"
                    icon={<BarChart3 className="h-12 w-12" />}
                  />
                  <ChartTypeCard 
                    title="Line Chart"
                    description="Show trends over time"
                    icon={<LineChart className="h-12 w-12" />}
                  />
                  <ChartTypeCard 
                    title="Pie Chart"
                    description="Show proportion of a whole"
                    icon={<PieChart className="h-12 w-12" />}
                  />
                  <ChartTypeCard 
                    title="Data Table"
                    description="Display tabular data"
                    icon={<Table className="h-12 w-12" />}
                  />
                </div>
                
                <div className="rounded-md border border-dashed p-6 flex flex-col items-center justify-center">
                  <div className="flex flex-col items-center justify-center text-center max-w-md">
                    <PlusCircle className="h-10 w-10 text-muted-foreground mb-4" />
                    <h3 className="font-medium text-lg mb-1">Add Chart to Report</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Select a chart type above to add it to your report layout
                    </p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="tables" className="space-y-4">
                <div className="rounded-md border border-dashed p-6 flex flex-col items-center justify-center">
                  <div className="flex flex-col items-center justify-center text-center max-w-md">
                    <Table className="h-10 w-10 text-muted-foreground mb-4" />
                    <h3 className="font-medium text-lg mb-1">Add Data Table</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Tables can be used to display detailed data in your report
                    </p>
                    <Button>Add Table</Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="data" className="space-y-4">
                <div className="rounded-lg border bg-card p-6">
                  <h3 className="text-lg font-medium mb-4">Data Sources</h3>
                  <p className="text-muted-foreground mb-6">
                    Connect data sources to use in your report.
                  </p>
                  
                  <div className="grid gap-4">
                    <div className="rounded-md border p-4">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">API Connection</div>
                        <Button variant="outline" size="sm">Connect</Button>
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">Connect to REST or GraphQL APIs</div>
                    </div>
                    
                    <div className="rounded-md border p-4">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">Database</div>
                        <Button variant="outline" size="sm">Connect</Button>
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">Connect to SQL or NoSQL databases</div>
                    </div>
                    
                    <div className="rounded-md border p-4">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">CSV/Excel Upload</div>
                        <Button variant="outline" size="sm">Upload</Button>
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">Import data from spreadsheets</div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="layout" className="space-y-4">
                <div className="rounded-lg border bg-card p-6">
                  <h3 className="text-lg font-medium mb-4">Report Layout</h3>
                  <p className="text-muted-foreground mb-6">
                    Configure how your report sections and charts are arranged.
                  </p>
                  
                  <div className="grid gap-4">
                    <div className="rounded-md border p-4 flex items-center justify-between">
                      <div>
                        <div className="font-medium">Single Column</div>
                        <div className="text-sm text-muted-foreground">Stack all elements vertically</div>
                      </div>
                      <Button variant="outline" size="sm">Select</Button>
                    </div>
                    
                    <div className="rounded-md border p-4 flex items-center justify-between">
                      <div>
                        <div className="font-medium">Two Columns</div>
                        <div className="text-sm text-muted-foreground">Arrange elements in two columns</div>
                      </div>
                      <Button variant="outline" size="sm">Select</Button>
                    </div>
                    
                    <div className="rounded-md border p-4 flex items-center justify-between">
                      <div>
                        <div className="font-medium">Dashboard</div>
                        <div className="text-sm text-muted-foreground">Grid layout with cards</div>
                      </div>
                      <Button variant="outline" size="sm">Select</Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="flex justify-end gap-4 mt-4">
              <Link href="/reports">
                <Button variant="outline">Cancel</Button>
              </Link>
              <Button onClick={handleCreateReport} disabled={!reportTitle.trim()}>
                Create Report
              </Button>
            </div>
          </div>
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

interface ChartTypeCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

function ChartTypeCard({ title, description, icon }: ChartTypeCardProps) {
  return (
    <Card className="hover:shadow-md transition-all cursor-pointer border-2 hover:border-primary">
      <CardHeader className="pb-2">
        <CardTitle className="text-center">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center space-y-2 p-4">
        <div className="text-primary">{icon}</div>
        <CardDescription className="text-center">
          {description}
        </CardDescription>
      </CardContent>
      <CardFooter className="pt-2">
        <Button variant="ghost" className="w-full">Select</Button>
      </CardFooter>
    </Card>
  );
}