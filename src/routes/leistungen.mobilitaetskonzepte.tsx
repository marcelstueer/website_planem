import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BatteryCharging, Bike, Car, ClipboardCheck, Coins, FileCheck2, MonitorSmartphone, Scale, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SeoSection } from "@/components/SeoSection";

const TITLE = "Mobilitätskonzepte für Architekten | Stellplätze sparen";
const DESC = "Mobilitätskonzepte senken Baukosten: bis zu 70% weniger Stellplätze, individuelle Nutzeranalyse & Fördermittel für E-Mobilität. Jetzt informieren.";

const faqs = [
  { q: "Wie viele Stellplätze kann ich mit einem Mobilitätskonzept einsparen?", a: "In vielen Kommunen lässt sich der Stellplatzschlüssel mit einem qualifizierten Mobilitätskonzept um bis zu 40 Prozent reduzieren, in Modellprojekten sogar um bis zu 70 Prozent. Der konkrete Wert hängt von Landesbauordnung, kommunaler Stellplatzsatzung, Lage und ÖPNV-Anbindung ab – wir prüfen das für Ihr Projekt individuell." },
  { q: "Ist ein Mobilitätskonzept in meiner Kommune verpflichtend oder freiwillig?", a: "Das regelt die jeweilige Stellplatzsatzung. Immer mehr Kommunen verlangen ein Mobilitätskonzept als Teil des Stellplatznachweises in der Baugenehmigung oder erlauben damit eine Abweichung vom Regelschlüssel. Häufig ist es ein freiwilliges Instrument, das sich wirtschaftlich deutlich lohnt." },
  { q: "Was kostet die Erstellung eines Mobilitätskonzepts im Vergleich zur Einsparung?", a: "Die Kosten richten sich nach Projektgröße und Abstimmungsaufwand. Da ein einzelner Tiefgaragenstellplatz oft 20.000 bis 40.000 Euro in der Herstellung kostet, amortisiert sich ein Mobilitätskonzept in der Regel bereits mit wenigen eingesparten Stellplätzen." },
  { q: "Welche Förderungen gibt es aktuell für Ladeinfrastruktur?", a: "Auf Bundesebene steht mit dem Programm „Ladeinfrastruktur in Mehrparteienhäusern“ des BMV ein Volumen von bis zu 500 Millionen Euro bereit. Hinzu kommen Landesprogramme wie progres.nrw oder Charge@BW. Wir zeigen Ihnen, welche Programme für Ihr Vorhaben infrage kommen." },
  { q: "Wie lange dauert die Erstellung eines Mobilitätskonzepts?", a: "Je nach Umfang und Abstimmungsbedarf mit der Kommune in der Regel einige Wochen. Idealerweise wird das Konzept früh in der Entwurfsphase begonnen, damit die Ergebnisse direkt in die Planung der Tiefgarage und Außenanlagen einfließen." },
];

export const Route = createFileRoute("/leistungen/mobilitaetskonzepte")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { name: "keywords", content: "Mobilitätskonzept Architekten, Stellplatzreduzierung Mobilitätskonzept, Stellplatzschlüssel reduzieren, qualifiziertes Mobilitätskonzept, Stellplatznachweis Baugenehmigung, Ladeinfrastruktur Förderung, Carsharing Bauvorhaben, sozioökonomische Nutzeranalyse" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Mobilitätskonzepte zur Stellplatzreduzierung",
          serviceType: "Mobilitätskonzept für Bauvorhaben",
          description: DESC,
          provider: { "@type": "ProfessionalService", name: "planem | Ingenieur Marcel Stüer", email: "info@planem.de", address: { "@type": "PostalAddress", streetAddress: "Bohlweg 21", postalCode: "48147", addressLocality: "Münster", addressCountry: "DE" } },
          areaServed: ["Münster", "Münsterland", "Ostwestfalen", "Osnabrücker Land"],
          audience: { "@type": "BusinessAudience", audienceType: "Architekt:innen, Planungsbüros, Bauträger, Kommunen" },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        }),
      },
    ],
  }),
  component: MobilityConceptPage,
});

const benefits = [
  { icon: Coins, text: "Weniger Stellplätze = weniger Baukosten – ein Tiefgaragenplatz kostet oft 20.000–40.000 € in der Herstellung." },
  { icon: Scale, text: "Rechtssicher nach Landesbauordnung und kommunaler Stellplatzsatzung." },
  { icon: Users, text: "Individuelle Nutzeranalyse statt Pauschal-Schlüssel." },
  { icon: BatteryCharging, text: "Fördermittel für E-Mobilität von Anfang an mitgedacht." },
];

const modules = [
  { icon: Bike, title: "Lastenrad-Stellplätze und Verleihsysteme", text: "Flächen und Sharing-Angebote für Einkauf, Kinder und Transport – ein echter Ersatz für den Zweitwagen." },
  { icon: Car, title: "Carsharing-Stationen", text: "Fest in das Bauvorhaben eingebunden oder über einen Kooperationspartner organisiert." },
  { icon: MonitorSmartphone, title: "Digitale ÖPNV-Infoscreens", text: "Echtzeit-Abfahrten im Eingangsbereich machen den Umstieg auf Bus und Bahn selbstverständlich." },
  { icon: BatteryCharging, title: "E-Ladeinfrastruktur", text: "Anzahl und Dimensionierung der Ladepunkte – privat und besucherzugänglich, inklusive Lastmanagement." },
  { icon: Bike, title: "Fahrradabstellanlagen", text: "Ausreichende Anzahl, hoher Komfort, ebenerdige Erreichbarkeit und wirksamer Diebstahlschutz." },
];

const steps = [
  "Erstgespräch & Standortanalyse",
  "Nutzeranalyse (sozioökonomisch + Mobilitätsverhalten im Quartier)",
  "Entwicklung des Maßnahmenpakets (Stellplätze, Sharing, Ladeinfrastruktur, ÖPNV-Anbindung)",
  "Abstimmung mit der Kommune / Nachweis für die Baugenehmigung",
  "Fördermittel-Check",
  "Übergabe des fertigen Mobilitätskonzepts als Teil Ihres Bauantrags",
];

function Section({ id, label, title, children, muted }: { id?: string; label: string; title: string; children: React.ReactNode; muted?: boolean }) {
  return (
    <section id={id} className={`py-20 md:py-28 ${muted ? "bg-secondary/60" : ""}`}>
      <div className="site-container grid gap-10 border-t border-border pt-8 md:grid-cols-[1fr_2.4fr]">
        <p className="eyebrow">{label}</p>
        <div>
          <h2 className="max-w-3xl text-3xl font-light leading-tight md:text-5xl">{title}</h2>
          <div className="mt-8">{children}</div>
        </div>
      </div>
    </section>
  );
}

function FunnelDiagram() {
  const inputs = ["Haushaltsgröße", "Einkommen", "Altersstruktur", "Pkw-Besitzquote", "ÖPNV-Lage"];
  return (
    <svg viewBox="0 0 640 300" role="img" aria-label="Schema Nutzeranalyse Mobilitätskonzept: sozioökonomische Daten werden zum tatsächlichen Stellplatzbedarf verdichtet" className="w-full text-foreground">
      <defs>
        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0V20" fill="none" stroke="currentColor" strokeOpacity=".07" /></pattern>
      </defs>
      <rect width="640" height="300" fill="url(#grid)" />
      {inputs.map((t, i) => (
        <g key={t}>
          <rect x="12" y={20 + i * 54} width="150" height="34" fill="none" stroke="currentColor" strokeOpacity=".5" />
          <text x="87" y={42 + i * 54} textAnchor="middle" fontSize="12" fill="currentColor">{t}</text>
          <line x1="162" y1={37 + i * 54} x2="250" y2={150} stroke="currentColor" strokeOpacity=".35" strokeDasharray="3 3" />
        </g>
      ))}
      <path d="M250 60 L410 120 L410 180 L250 240 Z" fill="none" stroke="var(--color-primary)" strokeWidth="1.5" />
      <text x="330" y="146" textAnchor="middle" fontSize="12" fill="currentColor">Nutzer-</text>
      <text x="330" y="162" textAnchor="middle" fontSize="12" fill="currentColor">analyse</text>
      <line x1="410" y1="150" x2="470" y2="150" stroke="var(--color-primary)" strokeWidth="1.5" />
      <path d="M464 145 L472 150 L464 155" fill="none" stroke="var(--color-primary)" strokeWidth="1.5" />
      <rect x="476" y="110" width="152" height="80" fill="none" stroke="var(--color-primary)" strokeWidth="1.5" />
      <text x="552" y="144" textAnchor="middle" fontSize="12" fill="currentColor">tatsächlicher</text>
      <text x="552" y="162" textAnchor="middle" fontSize="12" fill="currentColor">Stellplatzbedarf</text>
    </svg>
  );
}

function MobilityConceptPage() {
  return (
    <>
      <section className="border-b border-border py-16 md:py-24">
        <div className="site-container">
          <nav aria-label="Brotkrumen" className="mb-10 text-sm text-muted-foreground">
            <Link to="/leistungen" className="hover:text-foreground">Leistungen</Link> <span aria-hidden>/</span> <span className="text-foreground">Mobilitätskonzepte</span>
          </nav>
          <div className="grid gap-10 md:grid-cols-[1fr_2.4fr]">
            <p className="eyebrow">Leistung / Mobilität</p>
            <div className="reveal">
              <h1 className="max-w-4xl text-4xl font-extralight leading-[1.08] md:text-6xl">Mobilitätskonzepte für Architekten: Stellplätze reduzieren, Baukosten senken</h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-muted-foreground">Mit einem qualifizierten Mobilitätskonzept sparen Sie in vielen Kommunen bis zu 40, in Modellprojekten sogar bis zu 70 Prozent der gesetzlich vorgeschriebenen Kfz-Stellplätze – und damit erhebliche Baukosten für Tiefgaragen und Stellflächen.</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Button asChild size="lg"><Link to="/kontakt">Kostenlose Erstberatung <ArrowRight /></Link></Button>
                <Button asChild size="lg" variant="outline"><a href="#ablauf">Ablauf ansehen</a></Button>
              </div>
            </div>
          </div>
          <ul className="mt-16 grid border-y border-border sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map(({ icon: Icon, text }, i) => (
              <li key={text} className={`py-7 sm:px-6 ${i > 0 ? "border-t sm:border-t-0 sm:border-l" : ""} ${i === 2 ? "sm:border-l-0 sm:border-t lg:border-t-0 lg:border-l" : ""} ${i === 3 ? "sm:border-t lg:border-t-0" : ""}`}>
                <Icon className="size-6 text-primary" strokeWidth={1.25} aria-hidden />
                <p className="mt-5 text-sm leading-6">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Section label="01 / Grundlagen" title="Warum ein Mobilitätskonzept?">
        <div className="max-w-2xl space-y-5 leading-8 text-muted-foreground">
          <p>Ein Mobilitätskonzept beschreibt, wie die künftigen Nutzer:innen eines Gebäudes oder Quartiers mobil sein werden – und welche baulichen und organisatorischen Maßnahmen dafür nötig sind. Statt pauschal Stellplätze nach einem starren Schlüssel herzustellen, wird der tatsächliche Bedarf ermittelt und durch Alternativen wie Carsharing, Fahrradinfrastruktur und eine gute ÖPNV-Anbindung ergänzt.</p>
          <p>Immer mehr Kommunen akzeptieren oder verlangen ein qualifiziertes Mobilitätskonzept als Teil des <strong className="font-medium text-foreground">Stellplatznachweises in der Baugenehmigung</strong>. Das Instrument ist rechtlich unmittelbar an das Bauordnungsrecht gekoppelt: Landesbauordnungen und kommunale Stellplatzsatzungen legen fest, wann und in welchem Umfang der Stellplatzschlüssel reduziert werden darf.</p>
          <p>Für Architekt:innen und Planungsbüros bedeutet das: Wer das Mobilitätskonzept früh in den Entwurf integriert, gewinnt Fläche, Gestaltungsspielraum und Wirtschaftlichkeit – bei gleichzeitig höherer Aufenthaltsqualität im Außenraum.</p>
          <p className="text-xs">Quelle: <a className="underline hover:text-foreground" href="https://www.bbsr.bund.de/BBSR/DE/forschung/programme/zb/Auftragsforschung/2NachhaltigesBauenBauqualitaet/2015/stellplatzsatzungen/Endbericht.pdf" target="_blank" rel="noopener noreferrer">BBSR – Untersuchung von Stellplatzsatzungen (Endbericht)</a></p>
        </div>
      </Section>

      <Section label="02 / Wirtschaftlichkeit" title="Der finanzielle Vorteil für Ihr Projekt" muted>
        <div className="grid border border-border bg-background md:grid-cols-3">
          {[
            { k: "Regulär", v: "80", d: "Stellplätze bei 100 WE und Schlüssel 0,8" },
            { k: "Mit Mobilitätskonzept", v: "64", d: "Stellplätze bei Mobilitätsfaktor 0,8" },
            { k: "Einsparung", v: "16", d: "Tiefgaragenplätze – bei 20.000–40.000 € je Platz: 320.000–640.000 €" },
          ].map((c, i) => (
            <div key={c.k} className={`p-7 ${i > 0 ? "border-t md:border-t-0 md:border-l" : ""}`}>
              <p className="eyebrow">{c.k}</p>
              <p className={`mt-4 text-6xl font-extralight ${i === 2 ? "text-primary" : ""}`}>{c.v}</p>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{c.d}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 max-w-2xl space-y-5 leading-8 text-muted-foreground">
          <p>Das Rechenbeispiel orientiert sich an der Praxis der Stadt München: Bei einem Bauvorhaben mit 100 Wohneinheiten und einem Stellplatzschlüssel von 0,8 werden regulär 80 Stellplätze gefordert. Mit einem qualifizierten Mobilitätskonzept und einem Mobilitätsfaktor von 0,8 sinkt die Zahl auf 64.</p>
          <p>Viele Städte – darunter München, Hamburg, Frankfurt und Freiburg – reduzieren die Stellplatzbaupflicht bei Vorlage eines qualifizierten Mobilitätskonzepts deutlich, in Modellprojekten um bis zu 70 Prozent.</p>
          <p className="border-l-2 border-primary pl-4 text-foreground">Die genauen Reduzierungsmöglichkeiten unterscheiden sich je nach Kommune und Landesbauordnung – wir prüfen das für Ihr Projekt individuell.</p>
          <p className="text-xs">Quelle: <a className="underline hover:text-foreground" href="https://www.bbsr.bund.de/BBSR/DE/forschung/programme/zb/Auftragsforschung/2NachhaltigesBauenBauqualitaet/2015/stellplatzsatzungen/Endbericht.pdf" target="_blank" rel="noopener noreferrer">BBSR – Bundesinstitut für Bau-, Stadt- und Raumforschung, „Untersuchung von Stellplatzsatzungen“</a></p>
        </div>
      </Section>

      <Section label="03 / Methodik" title="Unsere Methodik: die Nutzeranalyse">
        <div className="max-w-2xl space-y-5 leading-8 text-muted-foreground">
          <p>Grundlage jedes Konzepts ist eine <strong className="font-medium text-foreground">sozioökonomische Nutzeranalyse</strong>. Haushaltsgröße, Einkommensstruktur, Altersverteilung und die Pkw-Besitzquote im Quartier fließen gemeinsam mit der Lage und dem ÖPNV-Angebot in die Bedarfsermittlung ein.</p>
          <p>Daraus ergibt sich, wie viele Stellplätze tatsächlich benötigt werden und welche besonderen Erfordernisse bestehen – etwa für Familien, Senior:innen oder gewerbliche Nutzungen.</p>
        </div>
        <figure className="mt-10 border border-border bg-background p-4 md:p-6">
          <FunnelDiagram />
          <figcaption className="mt-3 text-xs text-muted-foreground">Schema: Daten rein – Bedarf raus.</figcaption>
        </figure>
        <h3 className="mt-12 text-xl font-medium">Mögliche Bausteine je nach Analyseergebnis</h3>
        <ul className="mt-6 grid gap-px border border-border bg-border sm:grid-cols-2">
          {modules.map(({ icon: Icon, title, text }) => (
            <li key={title} className="bg-background p-6">
              <Icon className="size-5 text-primary" strokeWidth={1.25} aria-hidden />
              <h3 className="mt-4 font-medium">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section label="04 / Förderung" title="Fördermittel, mitgedacht" muted>
        <div className="grid gap-px border border-border bg-border md:grid-cols-2">
          <div className="bg-background p-7">
            <h3 className="font-medium">Bund: Ladeinfrastruktur in Mehrparteienhäusern</h3>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">Förderprogramm des Bundesministeriums für Verkehr (BMV) mit bis zu 500 Millionen Euro bundesweit für private Ladepunkte in Bestandsgebäuden, Start April 2026.</p>
          </div>
          <div className="bg-background p-7">
            <h3 className="font-medium">Länder: progres.nrw, Charge@BW & Co.</h3>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">Landesprogramme ergänzen die Bundesförderung – etwa Charge@BW mit bis zu 2.500 € je Ladepunkt. Die Konditionen unterscheiden sich je nach Bundesland.</p>
          </div>
        </div>
        <p className="mt-8 max-w-2xl leading-8 text-muted-foreground">Wir behalten die Förderlandschaft laufend im Blick und zeigen Ihnen, welche Programme für Ihr Projekt infrage kommen – so wird die <strong className="font-medium text-foreground">Ladeinfrastruktur-Förderung</strong> Teil der Planung statt nachträglicher Aufwand.</p>
        <p className="mt-4 text-xs text-muted-foreground">Quelle: <a className="underline hover:text-foreground" href="https://www.solarserver.de/2026/03/27/500-mio-euro-fuer-ladepunkte-neue-foerderung-fuer-mehrparteienhaeuser-startet/" target="_blank" rel="noopener noreferrer">BMV, Masterplan Ladeinfrastruktur 2030 (via solarserver.de)</a></p>
      </Section>

      <Section id="ablauf" label="05 / Ablauf" title="In sechs Schritten zum genehmigungsfähigen Konzept">
        <ol className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s} className="bg-background p-6">
              <span className="font-mono text-sm text-primary">{String(i + 1).padStart(2, "0")}</span>
              <p className="mt-4 leading-7">{s}</p>
            </li>
          ))}
        </ol>
        <p className="mt-6 flex items-center gap-2 text-sm text-muted-foreground"><FileCheck2 className="size-4 text-primary" strokeWidth={1.25} /> Ergebnis: ein fertiges Mobilitätskonzept als Bestandteil Ihres Bauantrags.</p>
      </Section>

      <Section label="06 / FAQ" title="Häufige Fragen zum Mobilitätskonzept" muted>
        <Accordion type="single" collapsible className="border-t border-border">
          {faqs.map((f, i) => (
            <AccordionItem key={f.q} value={`f${i}`}>
              <AccordionTrigger className="text-left text-base font-medium">{f.q}</AccordionTrigger>
              <AccordionContent className="leading-7 text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Section>

      <section className="py-20 md:py-28">
        <div className="site-container flex flex-col justify-between gap-8 border-t border-border pt-10 md:flex-row md:items-end">
          <div>
            <ClipboardCheck className="size-6 text-primary" strokeWidth={1.25} />
            <h2 className="mt-5 max-w-3xl text-3xl font-light leading-tight md:text-4xl">Lassen Sie uns gemeinsam prüfen, wie viele Stellplätze – und damit Baukosten – sich bei Ihrem Projekt einsparen lassen.</h2>
            <p className="mt-5 text-sm text-muted-foreground">Weitere Themen: <Link to="/leistungen" className="underline hover:text-foreground">alle Leistungen inkl. Energieeffizienzberatung</Link></p>
          </div>
          <Button asChild size="lg"><Link to="/kontakt">Termin vereinbaren <ArrowRight /></Link></Button>
        </div>
      </section>
      <SeoSection />
    </>
  );
}
