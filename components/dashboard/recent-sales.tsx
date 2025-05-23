import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface RecentActivity {
  id: string;
  name: string;
  email: string;
  amount: string;
  action: string;
  date: string;
}

export function RecentSales({ data }: { data: RecentActivity[] }) {
  return (
    <div className="space-y-8">
      {data.map((item) => (
        <div key={item.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={`https://avatar.vercel.sh/${item.email}`} alt={item.name} />
            <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{item.name}</p>
            <p className="text-sm text-muted-foreground">{item.email}</p>
          </div>
          <div className="ml-auto font-medium">
            <p className="text-sm">{item.action}</p>
            <p className="text-xs text-muted-foreground">{item.date}</p>
          </div>
        </div>
      ))}
    </div>
  );
}