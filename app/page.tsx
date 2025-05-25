import Link from 'next/link';
import { ArrowRight, BarChart3, FileText, Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import RecentReports from '@/components/dashboard/recent-reports';
import { DashboardStats } from '@/components/dashboard/dashboard-stats';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="flex items-center gap-2 font-semibold">
            <BarChart3 className="h-6 w-6" />
            <span>DataViz Reporter</span>
          </div>
          <nav className="ml-auto flex gap-4 sm:gap-6">
            <Link
              href="/reports"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
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
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-16">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Powerful Report Generation
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Create beautiful, interactive reports with real-time data streaming and customizable visualizations.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/reports/create">
                  <Button>
                    Create New Report <Plus className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/reports">
                  <Button variant="outline">
                    View Reports <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-16 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="mb-10">
              <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">Dashboard Overview</h2>
              <p className="text-muted-foreground">Your report generation metrics at a glance</p>
            </div>

            <DashboardStats />

            <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Create</CardTitle>
                  <CardDescription>Start with a template</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-2">
                    <Link href="/reports/create?template=sales">
                      <Button variant="outline" className="w-full justify-start">
                        <BarChart3 className="mr-2 h-4 w-4" />
                        Sales Report
                      </Button>
                    </Link>
                    <Link href="/reports/create?template=performance">
                      <Button variant="outline" className="w-full justify-start">
                        <BarChart3 className="mr-2 h-4 w-4" />
                        Performance Report
                      </Button>
                    </Link>
                    <Link href="/reports/create?template=analytics">
                      <Button variant="outline" className="w-full justify-start">
                        <BarChart3 className="mr-2 h-4 w-4" />
                        Analytics Report
                      </Button>
                    </Link>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href="/templates" className="text-sm text-muted-foreground hover:text-primary">
                    View all templates
                  </Link>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Reports</CardTitle>
                  <CardDescription>Your most recent work</CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentReports />
                </CardContent>
                <CardFooter>
                  <Link href="/reports" className="text-sm text-muted-foreground hover:text-primary">
                    View all reports
                  </Link>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Getting Started</CardTitle>
                  <CardDescription>Learn how to use the platform</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-2">
                  <Link href="/guides/create-report" className="flex items-center p-2 rounded-md hover:bg-muted">
                    <FileText className="mr-2 h-4 w-4" />
                    <span className="text-sm">Creating your first report</span>
                  </Link>
                  <Link href="/guides/data-sources" className="flex items-center p-2 rounded-md hover:bg-muted">
                    <FileText className="mr-2 h-4 w-4" />
                    <span className="text-sm">Connecting data sources</span>
                  </Link>
                  <Link href="/guides/chart-types" className="flex items-center p-2 rounded-md hover:bg-muted">
                    <FileText className="mr-2 h-4 w-4" />
                    <span className="text-sm">Chart type guide</span>
                  </Link>
                </CardContent>
                <CardFooter>
                  <Link href="/guides" className="text-sm text-muted-foreground hover:text-primary">
                    View all guides
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
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