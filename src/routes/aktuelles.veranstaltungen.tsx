import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, CalendarDays, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { events } from "@/lib/events";

const TITLE = "Veranstaltungen zu Mobilität & Energie | planem";
const DESC = "Ausgewählte Veranstaltungen zu Mobilität, Energieeffizienz und Gebäuden in Münster, im Münsterland, in Ostwestfalen und online.";

export const Route = createFileRoute("/aktuelles/veranstaltungen")({
  head: () => ({ meta: [
    { title: TITLE }, { name: "description", content: DESC },
    { property: "og:title", content: TITLE }, { property: "og:description", content: DESC },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: EventsPage,
});

const fmt = (d: string) => new Date(d + "T12:00:00").toLocaleDateString("de-DE", { weekday: "short", day: "2-digit", month: "long", year: "numeric" });

function EventsPage() {
  const today = new Date().toISOString().slice(0, 10);
  const upcoming = events.filter((e) => e.date >= today).sort((a, b) => a.date.localeCompare(b.date));
  return <>
    <section className="bg-ink py-20 text-ink-foreground md:py-28"><div className="site-container grid gap-10 md:grid-cols-[1fr_2fr]">
      <p className="eyebrow !text-brand-light">Aktuelles / Veranstaltungen</p>
      <div><h1 className="max-w-4xl text-5xl font-extralight leading-[1.05] md:text-7xl">Veranstaltungen.</h1>
        <p className="mt-7 max-w-2xl text-lg font-light leading-8 text-ink-muted">Eine Auswahl an Terminen zu Mobilität, Energieeffizienz und Gebäuden, die ich für Planer, Kommunen und Unternehmen interessant finde. Veranstalter sind jeweils Dritte; Details und Anmeldung finden Sie auf deren Seiten.</p></div>
    </div></section>
    <section className="py-16 md:py-20"><div className="site-container">
      {upcoming.length === 0 ? (
        <div className="border border-border bg-secondary p-8"><p className="text-lg font-light">Derzeit sind keine Termine eingetragen. Schauen Sie gern bald wieder vorbei.</p></div>
      ) : (
        <ul className="grid gap-px bg-border md:grid-cols-2">
          {upcoming.map((e) => <li key={e.date + e.title} className="flex flex-col bg-background p-6">
            <p className="flex items-center gap-2 text-sm font-semibold text-primary"><CalendarDays className="size-4" />{fmt(e.date)}{e.time ? `, ${e.time}` : ""}</p>
            <h2 className="mt-3 text-2xl font-light">{e.title}</h2>
            <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground"><MapPin className="size-4" />{e.location} · {e.organizer}</p>
            <p className="mt-4 flex-1 text-muted-foreground">{e.text}</p>
            <a href={e.url} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">Zur Veranstaltung <ArrowUpRight className="size-4" /></a>
          </li>)}
        </ul>
      )}
      <div className="mt-12 flex flex-wrap items-center gap-4"><p className="text-muted-foreground">Sie treffen mich auf einer Veranstaltung oder möchten vorher sprechen?</p><Button asChild><Link to="/kontakt">Gespräch anfragen <ArrowUpRight /></Link></Button></div>
    </div></section>
  </>;
}
