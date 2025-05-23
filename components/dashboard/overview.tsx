"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

interface OverviewProps {
  data: {
    name: string;
    total: number;
  }[];
}

export function Overview({ data }: OverviewProps) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
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
        <Bar
          dataKey="total"
          fill="hsl(var(--chart-1))"
          radius={[4, 4, 0, 0]}
          className="animate-in fade-in-50 fill-primary"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}