import { useQuery } from "@tanstack/react-query";
import { useRouterState } from "@tanstack/react-router";
import { Bar, BarChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { supabase } from "@/integrations/supabase/client";
import { BRAND_COLORS, MEDIA_ICONS } from "@/lib/media-icons";

export type ChartRow = {
  id: string;
  title: string;
  subtitle: string;
  chart_type: string;
  data: unknown;
  unit: string;
  icon: string | null;
  image_url: string | null;
  source: string;
  page: string;
  position: number;
};

type Point = { label: string; value: number };

export function ChartCard({ chart }: { chart: ChartRow }) {
  const data = (Array.isArray(chart.data) ? chart.data : []) as Point[];
  const Icon = chart.icon ? MEDIA_ICONS[chart.icon]?.icon : undefined;
  const fmt = (v: number) => `${v.toLocaleString("de-DE")}${chart.unit ? ` ${chart.unit}` : ""}`;
  return (
    <figure className="border border-border bg-card p-6 md:p-8">
      <div className="flex items-start gap-4">
        {Icon && <Icon strokeWidth={1.5} className="mt-1 size-7 shrink-0 text-primary" />}
        <div>
          <h3 className="text-2xl font-light">{chart.title}</h3>
          {chart.subtitle && <p className="mt-1 text-sm text-muted-foreground">{chart.subtitle}</p>}
        </div>
      </div>
      <div className="mt-6 h-72">
        {chart.chart_type === "image" && chart.image_url ? (
          <img src={chart.image_url} alt={chart.title} className="h-full w-full object-contain" loading="lazy" />
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            {chart.chart_type === "pie" ? (
              <PieChart>
                <Tooltip formatter={(v: number) => fmt(v)} />
                <Pie data={data} dataKey="value" nameKey="label" innerRadius="55%" outerRadius="85%" paddingAngle={2} label={({ label }) => label}>
                  {data.map((_, i) => <Cell key={i} fill={BRAND_COLORS[i % BRAND_COLORS.length]} />)}
                </Pie>
              </PieChart>
            ) : chart.chart_type === "line" ? (
              <LineChart data={data}>
                <CartesianGrid stroke="#e5e5e5" vertical={false} />
                <XAxis dataKey="label" tickLine={false} axisLine={false} fontSize={12} />
                <YAxis tickLine={false} axisLine={false} fontSize={12} width={48} />
                <Tooltip formatter={(v: number) => fmt(v)} />
                <Line type="monotone" dataKey="value" stroke={BRAND_COLORS[0]} strokeWidth={2.5} dot={{ r: 3, fill: BRAND_COLORS[1] }} />
              </LineChart>
            ) : (
              <BarChart data={data}>
                <CartesianGrid stroke="#e5e5e5" vertical={false} />
                <XAxis dataKey="label" tickLine={false} axisLine={false} fontSize={12} />
                <YAxis tickLine={false} axisLine={false} fontSize={12} width={48} />
                <Tooltip formatter={(v: number) => fmt(v)} cursor={{ fill: "rgba(64,167,158,.08)" }} />
                <Bar dataKey="value" radius={[2, 2, 0, 0]}>
                  {data.map((_, i) => <Cell key={i} fill={BRAND_COLORS[i % 2]} />)}
                </Bar>
              </BarChart>
            )}
          </ResponsiveContainer>
        )}
      </div>
      {chart.source && <figcaption className="mt-4 text-xs text-muted-foreground">Quelle: {chart.source}</figcaption>}
    </figure>
  );
}

/** Shows all charts assigned to the current page. */
export function PageCharts() {
  const pathname = useRouterState({ select: (s) => s.location.pathname.replace(/\/$/, "") || "/" });
  const query = useQuery({
    queryKey: ["charts"],
    staleTime: 30_000,
    queryFn: async () => {
      const { data, error } = await supabase.from("charts").select("*").order("position");
      if (error) throw error;
      return (data ?? []) as ChartRow[];
    },
  });
  const charts = (query.data ?? []).filter((c) => c.page === pathname);
  if (!charts.length) return null;
  return (
    <section className="py-16 md:py-20">
      <div className="site-container">
        <p className="eyebrow">Zahlen und Fakten</p>
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {charts.map((c) => <ChartCard key={c.id} chart={c} />)}
        </div>
      </div>
    </section>
  );
}
