import { fetchRecentReports } from "@/lib/data";
import Link from "next/link";
import { BarChart, FileText, LineChart, PieChart } from "lucide-react";

const chartIcons = {
  bar: <BarChart className="h-4 w-4 text-muted-foreground" />,
  line: <LineChart className="h-4 w-4 text-muted-foreground" />,
  pie: <PieChart className="h-4 w-4 text-muted-foreground" />,
  default: <FileText className="h-4 w-4 text-muted-foreground" />
};

export default async function RecentReports() {
  const reports = await fetchRecentReports();
  
  if (reports.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-40 text-center">
        <FileText className="h-8 w-8 text-muted-foreground mb-2" />
        <p className="text-sm text-muted-foreground">No reports created yet</p>
        <Link href="/reports/create" className="text-sm mt-2 text-primary hover:underline">
          Create your first report
        </Link>
      </div>
    );
  }
  
  return (
    <div className="space-y-3">
      {reports.map((report) => (
        <Link 
          key={report.id} 
          href={`/reports/${report.id}`}
          className="flex items-center p-2 rounded-md hover:bg-muted transition-colors"
        >
          <div className="mr-3">
            {chartIcons[report.primaryChartType as keyof typeof chartIcons] || chartIcons.default}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{report.title}</p>
            <p className="text-xs text-muted-foreground">Updated {report.updatedAt}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}