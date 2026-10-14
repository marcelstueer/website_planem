import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BadgeCheck, BarChart3, CalendarCheck, ClipboardList, Cpu, FileDigit, FileText, Gauge, Landmark,
  MessageSquare, Calculator, Building2, Flame, Leaf, Lightbulb, Ruler, ShieldCheck,
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SeoSection } from "@/components/SeoSection";
import { SiteImage } from "@/components/SiteImage";
import { useSiteTexts } from "@/lib/site-data";
import { AffectsYou, ContactCta } from "@/components/AffectsYou";
import { AffectsCheck } from "@/components/AffectsCheck";
import { FileClock, FileQuestion, KeyRound, School, Wrench } from "lucide-react";

const TITLE = "Bedarfsausweis Nichtwohngebäude (GModG) | planem";
const DESC = "Ab 1.1.2027 gilt für Nichtwohngebäude nur noch der Bedarfsausweis. Was das GModG ändert, welche Fristen gelten und wie planem unterstützt.";
export const CONTACT_TOPIC = "Bedarfsausweis Nichtwohngebäude";

export const Route = createFileRoute("/leistungen/bedarfsausweis")({
  head: () => ({ meta: [
    { title: TITLE }, { name: "description", content: DESC },
    { property: "og:title", content: TITLE }, { property: "og:description", content: DESC },
    { property: "og:type", content: "article" }, { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: BedarfsausweisPage,
});

const timeline = [
  { icon: Landmark, date: "28.07.2026", text: "Verkündung im Bundesgesetzblatt" },
  { icon: Flame, date: "29.07.2026", text: "Neue Heizungsregeln gelten" },
  { icon: FileText, date: "01.01.2027", text: "Neue Energieausweis-Regeln" },
  { icon: Building2, date: "2028", text: "Nullemissionsstandard für neue Nichtwohngebäude der öffentlichen Hand" },
  { icon: Leaf, date: "2030", text: "Nullemissionsstandard für alle Neubauten und erste Stufe der Mindestenergiestandards für Bestands-Nichtwohngebäude" },
  { icon: Gauge, date: "2033", text: "Zweite Stufe der Mindestenergiestandards" },
];

const changes = [
  { icon: BadgeCheck, title: "Bedarfsausweis statt Verbrauchsausweis", text: "Für Nichtwohngebäude wird bei den genannten Anlässen nur noch der Bedarfsausweis ausgestellt. Maßgeblich ist der berechnete Energiebedarf, nicht der bisherige Verbrauch." },
  { icon: BarChart3, title: "Neue Skala A bis G", text: "Die Einstufung erfolgt künftig auf einer Skala von A bis G und bezieht sich auf ein Referenzgebäude mit vergleichbarer Nutzung." },
  { icon: Calculator, title: "Neue Berechnungsgrundlage", text: "Grundlage sind die DIN/TS 18599:2025-10, ein neues Referenzgebäude und geänderte Primärenergiefaktoren. Dasselbe Gebäude kann deshalb anders eingestuft werden als bisher." },
  { icon: FileDigit, title: "Digital und maschinenlesbar", text: "Der Ausweis wird digital ausgestellt und enthält zusätzliche Pflichtangaben, zum Beispiel absolute Werte in MWh und die erneuerbare Erzeugung am Standort." },
];

const steps = [
  { icon: MessageSquare, title: "Erstgespräch und Einordnung", text: "Gebäude, Anlass und ein eventuell vorhandener Ausweis." },
  { icon: ClipboardList, title: "Unterlagen und Datenaufnahme", text: "Pläne, Anlagentechnik, Fotos oder Begehung vor Ort." },
  { icon: Ruler, title: "Energetische Bilanzierung", text: "Berechnung nach DIN/TS 18599." },
  // TODO: Leistungsumfang von planem prüfen
  { icon: ShieldCheck, title: "Ausstellung des Bedarfsausweises", text: "Der Ausweis wird von einer ausstellungsberechtigten Person ausgestellt." },
  { icon: Lightbulb, title: "Ergebnis und nächste Schritte", text: "Empfehlungen, Sanierungsfahrplan und passende Förderung." },
];

const faq = [
  { q: "Muss ich jetzt sofort einen neuen Ausweis machen?", a: "Nein. Ein neuer Ausweis wird erst fällig, wenn ein Anlass eintritt – also Verkauf, Vermietung, Verpachtung, Leasing oder Vertragsverlängerung – und kein gültiger Ausweis vorliegt. Wer einen solchen Anlass absehen kann, plant die Erstellung sinnvollerweise mit etwas Vorlauf ein." },
  { q: "Gilt mein bestehender Ausweis weiter?", a: "Ja. Gültige Energieausweise behalten ihre Gültigkeit bis zum Ablaufdatum, in der Regel zehn Jahre nach Ausstellung. Eine Pflicht zum vorzeitigen Austausch gibt es nicht." },
  { q: "Welche Anlässe lösen die Pflicht aus?", a: "Ab dem 1. Januar 2027: Verkauf, Vermietung, Verpachtung und Leasing eines Nichtwohngebäudes sowie die Verlängerung solcher Verträge – jeweils dann, wenn kein gültiger Ausweis vorhanden ist." },
  { q: "Was gilt für gemischt genutzte Gebäude?", a: "Das hängt davon ab, wie das Gebäude bzw. die einzelnen Gebäudeteile zugeordnet werden. Diese Zuordnung sollte im Einzelfall geklärt werden – gern im Erstgespräch." },
  { q: "Was bedeutet die neue Klasse A bis G?", a: "Die Klasse zeigt, wie das Gebäude im Vergleich zu einem Referenzgebäude mit gleicher Nutzung abschneidet. Weil sich Berechnungsgrundlage und Faktoren ändern, kann sich die Einstufung gegenüber einem älteren Ausweis verschieben, ohne dass am Gebäude etwas verändert wurde." },
];

const sources = [
  { label: "BBSR GModG-Infoportal: Neuregelungen", href: "https://www.gmodg.bund.de/GModG/DE/GModGRegelungen/GModG_neu/GModG_neu-node.html" },
  { label: "BBSR GModG-Infoportal: Energieausweis", href: "https://www.gmodg.bund.de/GModG/DE/Energieausweise/energieausweise_node.html" },
  { label: "Bundesgesetzblatt 2026 I Nr. 226", href: "https://www.recht.bund.de/bgbl/1/2026/226/VO.html" },
  { label: "Öko-Zentrum NRW: Update zum GModG", href: "https://oekozentrum.nrw/aktuelles/detail/news/update-zum-gmodg/" },
];

function ContactButton(_: { dark?: boolean }) {
  return <ContactCta anliegen={CONTACT_TOPIC} />;
}

const situations = [
  { icon: KeyRound, text: "Sie vermieten, verpachten oder verkaufen Büro-, Gewerbe- oder Verwaltungsflächen." },
  { icon: FileClock, text: "Ein Miet- oder Pachtvertrag läuft aus oder wird verlängert." },
  { icon: School, text: "Ihre Kommune oder Ihr Betrieb unterhält eigene Liegenschaften wie Verwaltungsgebäude, Schulen, Bauhof, Hallen oder Werkstätten." },
  { icon: FileQuestion, text: "Sie besitzen nur einen Verbrauchsausweis und wissen nicht, wann er abläuft." },
  { icon: Wrench, text: "Sie planen eine Sanierung oder einen Heizungstausch." },
];

const checkQuestions = [
  { q: "Unterhalten Sie Gebäude oder Gebäudeteile, die nicht zum Wohnen dienen?", affectedIf: true },
  { q: "Planen Sie in den nächsten Jahren Verkauf, Vermietung, Verpachtung oder eine Vertragsverlängerung?", affectedIf: true },
  { q: "Liegt Ihnen ein gültiger Energieausweis vor, und wissen Sie, welcher Art er ist und bis wann er gilt?", affectedIf: false },
];

function BedarfsausweisPage() {
  const { text } = useSiteTexts();
  const stand = text("bedarfsausweis.stand", "Oktober 2026");
  return <>
    <section className="bg-ink text-ink-foreground">
      <div className="site-container grid gap-10 py-16 md:py-24 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
        <div>
          <Link to="/leistungen/energieberatung" className="eyebrow !text-brand-light hover:underline">LEISTUNGEN / ENERGIEAUSWEISE</Link>
          <h1 className="mt-5 text-4xl font-extralight leading-[1.08] md:text-6xl">Bedarfsausweis für Nichtwohngebäude (GModG)</h1>
          <p className="mt-7 max-w-2xl text-lg font-light leading-8 text-ink-muted">Mit dem Gebäudemodernisierungsgesetz (GModG), im Juli 2026 beschlossen und am 28.07.2026 im Bundesgesetzblatt verkündet, ändert sich der Energieausweis für Nichtwohngebäude. Ab dem 1. Januar 2027 wird bei Verkauf, Vermietung, Verpachtung, Leasing und Verlängerung solcher Verträge nur noch der Bedarfsausweis ausgestellt. Der Verbrauchsausweis bleibt reinen Wohngebäuden vorbehalten. Doch was bedeutet das genau?</p>
          <div className="mt-9 flex flex-col items-start gap-3"><ContactButton dark /><a href="#check" className="text-sm font-medium text-brand-light hover:underline">Erst kurz prüfen: Betrifft mich das?</a></div>
        </div>
        <div className="aspect-[4/3] w-full overflow-hidden">
          <SiteImage imageKey="bedarfsausweis.hero" fallback="/library/bedarfsausweis-hero.webp" alt="Nichtwohngebäude mit Solardach als Beispiel für einen energetisch bewerteten Gewerbebau" width={1600} height={1200} loading="eager" fetchPriority="high" className="h-full w-full object-cover" />
        </div>
      </div>
    </section>

    <AffectsYou
      title="Unterhalten Sie Gebäude, die nicht zum Wohnen dienen?"
      intro="Dann kann das neue Energieausweis-Recht ab 2027 auch Sie betreffen. Ab 1. Januar 2027 gelten die neuen Regeln – es geht nicht um Druck, sondern um Planungszeit."
      situations={situations}
      reassurance="Wer frühzeitig weiß, was für die eigenen Gebäude gilt, plant ruhiger. Im Erstgespräch klären wir, ob und wann bei Ihnen ein Bedarfsausweis fällig werden könnte."
      anliegen={CONTACT_TOPIC}
      checkAnchor="check"
      note="Allgemeine Information, keine Rechtsberatung."
    />
    <AffectsCheck questions={checkQuestions} anliegen={CONTACT_TOPIC} />

    <section className="py-16 md:py-24">
      <div className="site-container">
        <p className="eyebrow">Zeitstrahl</p>
        <h2 className="mt-4 text-3xl font-light md:text-5xl">Die wichtigsten Termine</h2>
        <ol className="relative mt-12 grid gap-8 border-l border-border pl-8 lg:grid-cols-6 lg:gap-6 lg:border-l-0 lg:border-t lg:pl-0 lg:pt-8">
          {timeline.map(({ icon: Icon, date, text: t }) => (
            <li key={date} className="relative">
              <span className="absolute -left-[3.05rem] top-0 flex size-9 items-center justify-center rounded-full border border-primary bg-background lg:-top-[3.15rem] lg:left-0"><Icon className="size-4 text-primary" /></span>
              <p className="text-lg font-medium text-primary">{date}</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{t}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>

    <section className="bg-secondary py-16 md:py-24">
      <div className="site-container">
        <p className="eyebrow">Energieausweis</p>
        <h2 className="mt-4 text-3xl font-light md:text-5xl">Was sich ändert</h2>
        <div className="mt-10 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
          {changes.map(({ icon: Icon, title, text: t }) => (
            <div key={title} className="bg-background p-6"><Icon className="size-6 text-primary" /><h3 className="mt-5 text-lg font-medium">{title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{t}</p></div>
          ))}
        </div>
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <div className="border-l-2 border-primary bg-background p-6">
            <div className="flex items-center gap-3"><CalendarCheck className="size-5 text-primary" /><h3 className="text-lg font-medium">Was gleich bleibt</h3></div>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">Gültige Ausweise gelten bis zu ihrem Ablauf (zehn Jahre). Eine Austauschpflicht gibt es nicht. Fällig wird der Bedarfsausweis erst bei einem der genannten Anlässe, wenn kein gültiger Ausweis vorliegt.</p>
          </div>
          <div className="border-l-2 border-border bg-background p-6">
            <div className="flex items-center gap-3"><Cpu className="size-5 text-primary" /><h3 className="text-lg font-medium">Was zusätzlich auf Eigentümer zukommen kann</h3></div>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-6 text-muted-foreground">
              <li>Mindestenergiestandards für Bestands-Nichtwohngebäude (§ 40, Stufen 2030 und 2033)</li>
              <li>Ausstattungspflichten zur Gebäudeautomation bei Anlagen über 70 kW Nennleistung</li>
              <li>Eine schrittweise eingeführte Solarpflicht (§ 106)</li>
            </ul>
            <p className="mt-3 text-xs leading-5 text-muted-foreground">Details und Ausnahmen sind im Gesetzestext nachzulesen.</p>
          </div>
        </div>
      </div>
    </section>

    <section className="py-16 md:py-24">
      <div className="site-container">
        <p className="eyebrow">Ablauf</p>
        <h2 className="mt-4 text-3xl font-light md:text-5xl">So unterstützt planem</h2>
        <ol className="mt-10 grid gap-px bg-border md:grid-cols-5">
          {steps.map(({ icon: Icon, title, text: t }, i) => (
            <li key={title} className="flex gap-4 bg-background p-6 md:flex-col">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/10"><Icon className="size-5 text-primary" /></span>
              <div><p className="text-xs font-semibold uppercase tracking-[.16em] text-primary">Schritt {i + 1}</p><h3 className="mt-2 font-medium">{title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{t}</p></div>
            </li>
          ))}
        </ol>
      </div>
    </section>

    <section className="bg-secondary py-16 md:py-24">
      <div className="site-container grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
        <div><p className="eyebrow">FAQ</p><h2 className="mt-4 text-3xl font-light md:text-5xl">Häufige Fragen</h2></div>
        <Accordion type="single" collapsible className="bg-background px-6">
          {faq.map(({ q, a }, i) => <AccordionItem key={q} value={`q${i}`}><AccordionTrigger className="text-left">{q}</AccordionTrigger><AccordionContent className="leading-7 text-muted-foreground">{a}</AccordionContent></AccordionItem>)}
        </Accordion>
      </div>
    </section>

    <section className="py-12">
      <div className="site-container grid gap-10 md:grid-cols-2">
        <div className="text-sm leading-6 text-muted-foreground">
          <p className="font-medium text-foreground">Stand: {stand}. Allgemeine Information, keine Rechts- oder Einzelfallberatung.</p>
          <p className="mt-3">Die Deutsche Umwelthilfe hat am 30.09.2026 Verfassungsbeschwerde gegen das GModG eingereicht. Diese hat keine aufschiebende Wirkung, das Gesetz bleibt anwendbar.</p>
        </div>
        <div>
          <h2 className="text-lg font-medium">Quellen</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {sources.map((s) => <li key={s.href}><a href={s.href} target="_blank" rel="noopener" className="text-primary hover:underline">{s.label}</a></li>)}
          </ul>
        </div>
      </div>
    </section>

    <section className="bg-ink py-16 text-ink-foreground">
      <div className="site-container flex flex-col justify-between gap-7 md:flex-row md:items-center">
        <h2 className="max-w-2xl text-3xl font-light md:text-5xl">Steht bei Ihnen ein Verkauf oder eine Vermietung an?</h2>
        <ContactButton dark />
      </div>
    </section>
    <SeoSection />
  </>;
}
