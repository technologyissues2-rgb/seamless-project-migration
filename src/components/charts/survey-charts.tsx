import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const CHART_COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];

const TOOLTIP_STYLE = {
  background: "var(--popover)",
  border: "1px solid var(--border)",
  borderRadius: "10px",
  color: "var(--popover-foreground)",
  fontSize: "13px",
} as const;

export interface SliceDatum {
  label: string;
  value: number;
}

/** Doughnut chart used for age-range distribution. */
export function AgeDistributionChart({ data }: { data: SliceDatum[] }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="label"
          innerRadius={64}
          outerRadius={104}
          paddingAngle={3}
          stroke="var(--card)"
          strokeWidth={2}
        >
          {data.map((entry, index) => (
            <Cell key={entry.label} fill={CHART_COLORS[index % CHART_COLORS.length]} />
          ))}
        </Pie>
        <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v: number) => [`${v}`, "Responses"]} />
        <Legend iconType="circle" wrapperStyle={{ fontSize: 13, color: "var(--muted-foreground)" }} />
      </PieChart>
    </ResponsiveContainer>
  );
}

/** Horizontal bar chart for mean perceived-impact scores (1–5 scale). */
export function ImpactScoresChart({ data }: { data: SliceDatum[] }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} layout="vertical" margin={{ left: 8, right: 24 }}>
        <CartesianGrid horizontal={false} stroke="var(--border)" strokeDasharray="3 3" />
        <XAxis
          type="number"
          domain={[0, 5]}
          tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          type="category"
          dataKey="label"
          width={150}
          tick={{ fill: "var(--foreground)", fontSize: 12.5 }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip
          contentStyle={TOOLTIP_STYLE}
          cursor={{ fill: "color-mix(in oklab, var(--muted) 55%, transparent)" }}
          formatter={(v: number) => [`${v} / 5`, "Mean score"]}
        />
        <Bar dataKey="value" radius={[0, 6, 6, 0]} fill="var(--chart-1)" barSize={18} />
      </BarChart>
    </ResponsiveContainer>
  );
}

/** Vertical bar chart for awareness / category distributions. */
export function CategoryBarsChart({ data }: { data: SliceDatum[] }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} margin={{ top: 8, left: -16, right: 8 }}>
        <CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="3 3" />
        <XAxis
          dataKey="label"
          tick={{ fill: "var(--muted-foreground)", fontSize: 11.5 }}
          axisLine={false}
          tickLine={false}
          interval={0}
          angle={-12}
          dy={8}
        />
        <YAxis
          allowDecimals={false}
          tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip
          contentStyle={TOOLTIP_STYLE}
          cursor={{ fill: "color-mix(in oklab, var(--muted) 55%, transparent)" }}
          formatter={(v: number) => [`${v}`, "Responses"]}
        />
        <Bar dataKey="value" radius={[6, 6, 0, 0]} fill="var(--chart-2)" barSize={40} />
      </BarChart>
    </ResponsiveContainer>
  );
}

/** Line chart of responses over time (admin dashboard). */
export function ResponsesOverTimeChart({ data }: { data: { month: string; responses: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <LineChart data={data} margin={{ top: 8, right: 16, left: -16 }}>
        <CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="3 3" />
        <XAxis
          dataKey="month"
          tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          allowDecimals={false}
          tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v: number) => [`${v}`, "Responses"]} />
        <Line
          type="monotone"
          dataKey="responses"
          stroke="var(--chart-1)"
          strokeWidth={2.5}
          dot={{ r: 3.5, fill: "var(--chart-1)" }}
          activeDot={{ r: 5 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
