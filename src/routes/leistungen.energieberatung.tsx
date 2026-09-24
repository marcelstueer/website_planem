import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Calculator, ClipboardList, FileCheck2, Gauge, Leaf, Ruler, ThermometerSun, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SeoSection } from "@/components/SeoSection";

const TITLE = "Energieberatung & BEG-Förderung (KfW/BAFA) | planem Münster";
const DESC = "Energieberatung für Nichtwohngebäude: Heizlastberechnung, hydraulischer Abgleich und Förderbegleitung BEG / BEG EM für Wärmepumpe und Effizienzgebäude.";

export const Route = createFileRoute("/leistungen/energieberatung")({
  head: () => ({ meta: [
    { title: TITLE }, { name: "description", content: DESC },
    { property: "og:title", content: TITLE }, { property: "og:description", content: DESC },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: EnergyPage,
});

const programs = [
  { icon: Leaf, title: "BEG – Bundesförderung für effiziente Gebäude", text: "Das Förderprogramm des Bundes für Neubau und Sanierung. Umgesetzt über KfW (Kredite und Zuschüsse) und BAFA. Voraussetzung ist die Begleitung durch eine Energieeffizienz-Expertin oder einen -Experten aus der dena-Liste." },
  { icon: Wrench, title: "BEG EM – Einzelmaßnahmen", text: "Förderung einzelner Schritte wie Heizungstausch auf Wärmepumpe, Dämmung der Gebäudehülle, Fenster oder Anlagentechnik. Beim Heizungstausch läuft der Antrag über die KfW." },
  { icon: Gauge, title: "Effizienzgebäude (WG / NWG)", text: "Umfassende Sanierung oder Neubau auf ein definiertes Effizienzgebäude-Niveau. Je besser das Niveau, desto höher die Förderung." },
];

const steps = [
  { icon: Ruler, title: "1. Heizlastberechnung nach DIN EN 12831-1", points: ["Gebäudeaufnahme vor Ort: Bauweise, Konstruktionen, Fensterflächen, U-Werte, vorhandene Technik", "Raumweise Berechnung der Transmissions- und Lüftungswärmeverluste", "Abgleich mit den bisherigen Verbrauchsdaten zur Plausibilisierung", "Dimensionierung der Wärmepumpe für Heizlast und Trinkwarmwasser", "Bis zu drei Neuberechnungen bei geänderten Annahmen"] },
  { icon: ThermometerSun, title: "2. Hydraulischer Abgleich (Verfahren B)", points: ["Aufnahme und Prüfung der vorhandenen Heizflächen", "Berechnung von Volumenströmen und Übertemperaturen", "Wärmepumpen-Check: passen Temperaturen und Volumenstrom zur Anlage?", "Pumpenleistung, Kv-Werte und Einstellwerte der Thermostatventile", "Ausführungsplan mit allen Einstellwerten zur Dokumentation"] },
  { icon: FileCheck2, title: "3. Förderbegleitung BEG EM (KfW)", points: ["Vor Beginn: Förderstrategie, „Bestätigung zum Antrag“ (BzA), förderfähige Kosten, technische Mindestanforderungen", "Beratung zu zukunftssicheren, natürlichen Kältemitteln bei Wärmepumpen", "Prüfung von bis zu drei Handwerkerangeboten und der Herstellernachweise", "Nach Umsetzung: Nachweise, Dokumentation und „Bestätigung nach Durchführung“ (BnD)", "Einreichung der Rechnungen für die Auszahlung"] },
];

const docs = ["Grundrisse", "Schnitte", "Ansichten", "Angaben zu Bauteilen", "Angaben zur Nutzung", "Energieverbräuche aus drei aufeinanderfolgenden Jahren"];

const faqs = [
  { q: "Warum brauche ich eine Heizlastberechnung für eine Wärmepumpe?", a: "Sie ist die Grundlage für die richtige Größe der Anlage. So vermeiden Sie Über- oder Unterdimensionierung, senken Betriebskosten und verlängern die Lebensdauer der Wärmepumpe." },
  { q: "Ist der hydraulische Abgleich Pflicht?", a: "Für die BEG-Förderung eines Heizungstauschs ist er in der Regel Voraussetzung. Er sorgt außerdem dafür, dass alle Räume gleichmäßig warm werden und die Wärmepumpe effizient arbeitet." },
  { q: "Wann muss der Förderantrag gestellt werden?", a: "Vor Beginn der Maßnahme. Planung und Energieberatung dürfen vorher stattfinden, ein verbindlicher Auftrag an den Handwerksbetrieb erst nach der Antragstellung bzw. mit aufschiebender Bedingung." },
  { q: "Wird die Energieberatung selbst gefördert?", a: "Ja, die Fachplanung und Baubegleitung durch Energieeffizienz-Experten ist im Rahmen der BEG förderfähig. Wir zeigen Ihnen, welcher Anteil für Ihr Vorhaben erstattet werden kann." },
];

function EnergyPage() {
  return <>
    <section className="bg-secondary py-20 md:py-28"><div className="site-container grid gap-8 md:grid-cols-[1fr_2fr]">
      <p className="eyebrow">Leistungen / Energieeffizienz</p>
      <div><h1 className="max-w-4xl text-5xl font-extralight leading-[1.05] md:text-7xl">Energieberatung und BEG-Förderung. Aus einer Hand.</h1>
        <p className="mt-7 max-w-2xl text-lg leading-8 text-muted-foreground">Von der Heizlastberechnung bis zur Auszahlung der Fördermittel: Wir begleiten Ihren Heizungstausch auf Wärmepumpe oder Ihr Effizienzgebäude – für geringere Kosten heute und langfristige Kosteneffizienz.</p>
        <div className="mt-8 flex flex-wrap gap-3"><Button asChild size="lg"><Link to="/kontakt">Förderfähigkeit prüfen <ArrowRight /></Link></Button></div>
        <p className="mt-6 text-sm text-muted-foreground">BAFA- und KfW-zertifiziert seit 2016 · gelistet in der Energieeffizienz-Expertenliste (dena)</p></div>
    </div></section>

    <section className="py-16 md:py-24"><div className="site-container">
      <p className="eyebrow">Förderprogramme</p><h2 className="mt-4 text-4xl font-light md:text-5xl">BEG, BEG EM und Effizienzgebäude.</h2>
      <div className="mt-10 grid border-y border-border md:grid-cols-3">{programs.map(({ icon: Icon, title, text }, i) => <article key={title} className={`py-8 md:px-8 ${i > 0 ? "border-t md:border-l md:border-t-0" : ""}`}><Icon className="size-6 text-primary" /><h3 className="mt-6 text-xl font-medium">{title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{text}</p></article>)}</div>
    </div></section>

    <section className="bg-secondary py-16 md:py-24"><div className="site-container">
      <p className="eyebrow">Unser Vorgehen</p><h2 className="mt-4 text-4xl font-light md:text-5xl">Beispiel: Heizungstausch auf Wärmepumpe im Nichtwohngebäude.</h2>
      <div className="mt-10 grid gap-5 lg:grid-cols-3">{steps.map(({ icon: Icon, title, points }) => <article key={title} className="border border-border bg-background p-7"><Icon className="size-7 text-primary" /><h3 className="mt-6 text-xl font-medium">{title}</h3><ul className="mt-4 space-y-2 text-sm leading-6 text-muted-foreground">{points.map((p) => <li key={p} className="flex gap-2"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />{p}</li>)}</ul></article>)}</div>
    </div></section>

    <section className="py-16 md:py-24"><div className="site-container grid gap-12 md:grid-cols-2">
      <div><ClipboardList className="size-7 text-primary" /><h2 className="mt-5 text-3xl font-light md:text-4xl">Was wir von Ihnen benötigen</h2><ul className="mt-6 grid gap-3 sm:grid-cols-2">{docs.map((d) => <li key={d} className="border-l-2 border-primary pl-3 text-sm">{d}</li>)}</ul></div>
      <div><Calculator className="size-7 text-primary" /><h2 className="mt-5 text-3xl font-light md:text-4xl">Wofür sich das lohnt</h2><p className="mt-6 leading-7 text-muted-foreground">Heizlastberechnung und hydraulischer Abgleich sichern die Förderung einer neuen Heizung, dimensionieren die Wärmepumpe richtig, optimieren die Heizflächen, senken die Heizkosten, verlängern die Lebensdauer der Anlage und sorgen für Wärmekomfort in allen Räumen.</p></div>
    </div></section>

    <section className="bg-secondary py-16 md:py-24"><div className="site-container max-w-3xl">
      <p className="eyebrow">Häufige Fragen</p><h2 className="mt-4 text-3xl font-light md:text-4xl">Energieberatung und Förderung</h2>
      <Accordion type="single" collapsible className="mt-8">{faqs.map((f) => <AccordionItem key={f.q} value={f.q}><AccordionTrigger className="text-left">{f.q}</AccordionTrigger><AccordionContent className="leading-7 text-muted-foreground">{f.a}</AccordionContent></AccordionItem>)}</Accordion>
      <p className="mt-8 text-sm text-muted-foreground">Offizielle Informationen: <a className="underline" href="https://www.energie-effizienz-experten.de" target="_blank" rel="noopener noreferrer">Energieeffizienz-Expertenliste (dena)</a> · <a className="underline" href="https://www.kfw.de" target="_blank" rel="noopener noreferrer">KfW</a> · <a className="underline" href="https://www.bafa.de" target="_blank" rel="noopener noreferrer">BAFA</a></p>
    </div></section>

    <section className="bg-ink py-16 text-ink-foreground"><div className="site-container flex flex-col justify-between gap-7 md:flex-row md:items-center"><h2 className="max-w-2xl text-3xl font-light md:text-5xl">Planen Sie einen Heizungstausch oder eine Sanierung?</h2><Button asChild size="lg"><Link to="/kontakt">Gespräch vereinbaren <ArrowRight /></Link></Button></div></section>
    <SeoSection />
  </>;
}
