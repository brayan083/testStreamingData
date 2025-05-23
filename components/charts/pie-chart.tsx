"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, Legend } from "recharts";

interface PieChartProps {
  data: Array<Record<string, any>>;
}

export function PieChartComponent({ data }: PieChartProps) {
  const COLORS = [
    "hsl(var(--chart-1))", 
    "hsl(var(--chart-2))", 
    "hsl(var(--chart-3))", 
    "hsl(var(--chart-4))", 
    "hsl(var(--chart-5))"
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius="40%"
          outerRadius="70%"
          paddingAngle={2}
          dataKey="value"
          nameKey="name"
          className="animate-in fade-in-50 fill-primary"
          animationDuration={1000}
          animationBegin={200}
          strokeWidth={2}
          stroke="hsl(var(--background))"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          labelLine={false}
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
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
          formatter={(value: number) => [`${value}`, 'Value']}
        />
        <Legend 
          layout="horizontal" 
          verticalAlign="bottom" 
          align="center" 
          wrapperStyle={{ fontSize: "12px", paddingTop: "20px" }}
          formatter={(value) => <span className="text-muted-foreground">{value}</span>}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}