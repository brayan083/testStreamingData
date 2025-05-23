import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function ReportSkeleton() {
  return (
    <div className="space-y-10">
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader className="pb-2">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-4 w-60 mt-1" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-[300px] w-full" />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-4 w-60 mt-1" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-[300px] w-full" />
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader className="pb-2">
              <Skeleton className="h-6 w-40" />
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