import { Link } from "@tanstack/react-router";
import { ArrowRight, Factory, Landmark, MoreHorizontal, Ruler } from "lucide-react";
import type { Segment } from "@/components/AffectsYou";

const TILES: { seg: Segment; icon: typeof Factory; title: string; text: string }[] = [
  { seg: "unternehmen", icon: Factory, title: "Unternehmen / Gewerbebetrieb", text: "Steigende Energiekosten, ein Mietvertrag läuft aus oder die Halle soll saniert werden – und Sie wollen wissen, was sich rechnet." },
  { seg: "kommune", icon: Landmark, title: "Kommune / Öffentliche Einrichtung", text: "Schulen, Verwaltung oder Bauhof sollen effizienter werden, und Förderprogramme und Vorgaben müssen zusammenpassen." },
  { seg: "architektur", icon: Ruler, title: "Architekt / Planungsbüro", text: "Ihr Projekt braucht Nachweise, Stellplatz- oder Mobilitätskonzepte, ohne dass die Genehmigung ins Stocken gerät." },
  { seg: "sonstige", icon: MoreHorizontal, title: "Sonstige", text: "Ihr Anliegen passt in keine Schublade? Beschreiben Sie kurz Ihre Situation, wir ordnen es gemeinsam ein." },
];

export function AudienceTiles() {
  return <section className="border-b border-border py-16 md:py-20">
    <div className="site-container">
      <p className="eyebrow">Wer sind Sie?</p>
      <h2 className="mt-4 text-3xl font-light md:text-5xl">Finden Sie Ihre Situation wieder.</h2>
      <div className="mt-10 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
        {TILES.map(({ seg, icon: Icon, title, text }) => <Link key={seg} to="/kontakt" search={{ zielgruppe: seg }} className="group flex flex-col bg-background p-6 transition-colors hover:bg-secondary">
          <Icon className="size-7 text-primary" />
          <h3 className="mt-5 text-lg font-medium">{title}</h3>
          <p className="mt-3 flex-1 text-sm leading-6 text-muted-foreground">{text}</p>
          <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">Gespräch anfragen <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></span>
        </Link>)}
      </div>
    </div>
  </section>;
}
