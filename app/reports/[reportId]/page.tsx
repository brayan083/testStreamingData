import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  BarChart3,
  Download,
  ExternalLink,
  MoreHorizontal,
  Plus,
  Share2
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThemeToggle } from "@/components/theme-toggle";
import { ReportContent } from "@/components/reports/report-content";
import { ReportSkeleton } from "@/components/reports/report-skeleton";
import { fetchReportById } from "@/lib/data";
import { ReportDataServer } from "@/components/PreReport/report_data_server";

// Add the generateStaticParams function
export async function generateStaticParams() {
  // This is a placeholder array of report IDs that will be statically generated
  // In a real application, you would fetch these from your data source
  return [
    { reportId: 'report-001' },
    { reportId: 'report-002' },
    { reportId: 'report-003' },
    { reportId: 'report-004' },
    { reportId: 'report-005' }
  ];
}

export default async function ReportPage({
  params
}: {
  params: { reportId: string }
}) {
  // We'll attempt to fetch the report to see if it exists
  let report;
  try {
    report = await fetchReportById(params.reportId);
    // console.log("report", report);
  } catch (error) {
    notFound();
  }
  
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
        
        <div className="flex flex-col gap-8">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{report.title}</h1>
              <p className="text-muted-foreground mt-1">
                {report.description}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Open in new tab
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Clone report
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive">
                    Delete report
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          <div className="flex flex-col">
            <Tabs defaultValue="report" className="w-full">
              <TabsList>
                <TabsTrigger value="report">Report</TabsTrigger>
                <TabsTrigger value="data-sources">Data Sources</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              <TabsContent value="report" className="mt-6">
                <Suspense fallback={<ReportSkeleton />}>
                  <ReportDataServer reportId={params.reportId} />
                </Suspense>
              </TabsContent>
              <TabsContent value="data-sources" className="mt-6">
                <div className="rounded-lg border bg-card p-6">
                  <h3 className="text-lg font-medium mb-4">Data Sources</h3>
                  <p className="text-muted-foreground mb-6">
                    Configure the data sources for this report.
                  </p>
                  
                  <div className="grid gap-6">
                    <div className="rounded-md border p-4">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">Sales Data</div>
                        <Button variant="outline" size="sm">Configure</Button>
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">API Endpoint</div>
                    </div>
                    
                    <div className="rounded-md border p-4">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">Customer Metrics</div>
                        <Button variant="outline" size="sm">Configure</Button>
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">Database Query</div>
                    </div>
                    
                    <Button className="w-full">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Data Source
                    </Button>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="settings" className="mt-6">
                <div className="rounded-lg border bg-card p-6">
                  <h3 className="text-lg font-medium mb-4">Report Settings</h3>
                  <p className="text-muted-foreground mb-6">
                    Configure the settings for this report.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="grid gap-2">
                      <label className="text-sm font-medium">Report Title</label>
                      <input 
                        type="text" 
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        defaultValue={report.title}
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <label className="text-sm font-medium">Description</label>
                      <textarea 
                        className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        defaultValue={report.description}
                      />
                    </div>
                    
                    <div className="flex justify-end">
                      <Button>Save Changes</Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
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