"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface BarChartProps {
  data: Array<Record<string, any>>;
}

export function BarChartComponent({ data }: BarChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.8} />
            <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0.4} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" opacity={0.3} />
        <XAxis 
          dataKey="name" 
          tick={{ fontSize: 12 }} 
          tickLine={false}
          axisLine={{ stroke: 'hsl(var(--border))' }}
          className="text-xs text-muted-foreground"
        />
        <YAxis 
          tick={{ fontSize: 12 }} 
          tickLine={false}
          axisLine={{ stroke: 'hsl(var(--border))' }}
          className="text-xs text-muted-foreground"
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--card))",
            borderColor: "hsl(var(--border))",
            borderRadius: "var(--radius)",
            boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
          }}
          labelStyle={{
            color: "hsl(var(--card-foreground))",
            fontWeight: "bold",
            marginBottom: "4px",
          }}
          itemStyle={{
            color: "hsl(var(--card-foreground))",
            fontSize: "12px",
            padding: "2px 0",
          }}
        />
        <Legend 
          wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }} 
          formatter={(value) => <span className="text-muted-foreground">{value}</span>}
        />
        <Bar
          dataKey="value"
          name="Value"
          fill="url(#colorValue)"
          radius={[4, 4, 0, 0]}
          strokeWidth={2}
          className="stroke-primary animate-in fade-in-50"
          animationDuration={1000}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}