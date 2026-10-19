import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { BRAND_COLORS } from "@/lib/media-icons";

const SOURCE = "Jan Karwatzki, Öko-Zentrum NRW (LinkedIn, 06.10.2026); Begründung zum GModG";

const data = [
  { label: "ab 2030 · Klasse G", value: 3.5 },
  { label: "ab 2033 · Klasse F", value: 2.95 },
];

const stats = [
  { value: "336.000", label: "betroffene Nichtwohngebäude bundesweit" },
  { value: "1,84 Mio.", label: "Nichtwohngebäude insgesamt" },
  { value: "12,9 Mrd. €", label: "geschätzte Investitionskosten" },
];

/** Diagramm zur Sanierungspflicht für Nichtwohngebäude (§ 40 GModG). */
export function SanierungspflichtChart() {
  return (
    <figure className="border border-border bg-card p-6 md:p-8">
      <h3 className="text-2xl font-light">Sanierungspflicht: Die Grenzwerte sinken in zwei Stufen</h3>
      <p className="mt-1 text-sm text-muted-foreground">Maximal zulässiger Primärenergiebedarf im Verhältnis zum Referenzgebäude</p>
      <div className="mt-6 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid stroke="#e5e5e5" vertical={false} />
            <XAxis dataKey="label" tickLine={false} axisLine={false} fontSize={12} />
            <YAxis tickLine={false} axisLine={false} fontSize={12} width={48} tickFormatter={(v: number) => `${v.toLocaleString("de-DE")}×`} />
            <Tooltip formatter={(v: number) => `${v.toLocaleString("de-DE")}-fach des Referenzgebäudewerts`} cursor={{ fill: "rgba(64,167,158,.08)" }} />
            <Bar dataKey="value" radius={[2, 2, 0, 0]}>
              {data.map((_, i) => <Cell key={i} fill={BRAND_COLORS[i % 2]} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-6 grid gap-px bg-border sm:grid-cols-3">
        {stats.map((s) => (
          <div key={s.label} className="bg-background p-4">
            <p className="text-2xl font-light text-primary">{s.value}</p>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>
      <figcaption className="mt-4 text-xs text-muted-foreground">Quelle: {SOURCE}</figcaption>
    </figure>
  );
}
