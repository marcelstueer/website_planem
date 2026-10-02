import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Award, Briefcase, Coins, Handshake, MapPin, Phone, Route } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SeoSection } from "@/components/SeoSection";
import { SiteImage } from "@/components/SiteImage";
import { Quiz } from "@/components/Quiz";
import { useSiteTexts } from "@/lib/site-data";
import marcelProfile from "@/assets/marcel-stueer-profile.webp";
import windradImage from "@/assets/energy-real.jpg";

export const Route = createFileRoute("/ueber-planem")({
  head: () => ({ meta: [
    { title: "Über planem | Ingenieur Marcel Stüer" },
    { name: "description", content: "Qualifikation, Erfahrung und Haltung von planem – Ingenieurbüro für Mobilität und Energieeffizienz aus Münster." },
    { property: "og:title", content: "Über planem | Marcel Stüer" },
    { property: "og:description", content: "Technische Kompetenz, internationale Perspektive und regionale Nähe." },
    { property: "og:type", content: "profile" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: AboutPage,
});

const qualifications = [
  { title: "Master of Engineering – Technisches Management", area: "Ingenieurwesen / BWL", use: "Unternehmensführung, Projektmanagement" },
  { title: "Bachelor of Science – Umwelttechnik", area: "Umwelt / Technik", use: "Fachliche Basis Energie & Nachhaltigkeit" },
  { title: "BAFA-/KfW-Energieberater Nichtwohngebäude (seit 2016)", area: "Energieeffizienz", use: "Kernkompetenz Fördermittelberatung" },
  { title: "IHK-Zertifikat Mobilitätsmanager", area: "Mobilität / Verkehr", use: "Kernkompetenz Mobilitätskonzepte" },
  { title: "Ausbildung Technischer Zeichner (1997–2001)", area: "Technische Planung", use: "Planungsverständnis, Dokumentation" },
];

const experience = [
  "Aufbau neuer Geschäftsfelder im letzten Anstellungsverhältnis: Energieberatung Nichtwohngebäude, Energieaudit nach DIN EN 16247, Energiemanagement nach ISO 50001 und Mobilitätsmanagement.",
  "Vertriebserfahrung bei MAN Diesel (Kleinkraftwerke / Biogas) in Augsburg und München.",
  "Sehr gute Englischkenntnisse durch Aufenthalte in den USA und Australien; berufliche Kontakte nach Japan und in die Niederlande.",
  "Gelistet in der Energieeffizienz-Expertenliste des Bundes (dena) und vernetzt im Kompetenznetz ElektroMobilität NRW.",
];

const values = [
  { icon: Phone, title: "Direkter Ansprechpartner", text: "Sie sprechen immer mit mir – vom Erstgespräch bis zum Nachweis." },
  { icon: Route, title: "Mobilität und Energie zusammen", text: "Stellplätze, Ladeinfrastruktur und Gebäudeenergie in einem Konzept." },
  { icon: Coins, title: "Förderung & Wirtschaftlichkeit", text: "BAFA- und KfW-Mittel von Anfang an eingeplant." },
  { icon: MapPin, title: "Regional erreichbar", text: "Münster, Münsterland, Ostwestfalen und Osnabrücker Land." },
];

function ValuesDiagram() {
  const pos = [{ x: 50, y: 12 }, { x: 88, y: 50 }, { x: 50, y: 88 }, { x: 12, y: 50 }];
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[420px]">
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden>
        <polygon points={pos.map((p) => `${p.x},${p.y}`).join(" ")} fill="none" className="stroke-primary/30" strokeWidth="0.3" strokeDasharray="1 1" />
        {pos.map((p, i) => <line key={i} x1="50" y1="50" x2={p.x} y2={p.y} className="stroke-primary/60" strokeWidth="0.35" />)}
        {pos.map((p, i) => (
          <circle key={`d${i}`} r="1" className="fill-primary">
            <animateMotion dur="4s" begin={`-${i}s`} repeatCount="indefinite" path={`M50,50 L${p.x},${p.y} L50,50`} />
          </circle>
        ))}
      </svg>
      <div className="absolute left-1/2 top-1/2 flex size-24 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-2xl bg-ink text-ink-foreground ring-8 ring-primary/15">
        <Handshake className="size-7 text-brand-light" strokeWidth={1.5} />
        <span className="mt-1 text-sm font-light">planem</span>
      </div>
      {values.map(({ icon: Icon, title }, i) => (
        <div key={title} className="absolute flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-md border border-primary/50 bg-background shadow-sm" style={{ left: `${pos[i]!.x}%`, top: `${pos[i]!.y}%` }} title={title}>
          <Icon className="size-6 text-primary" strokeWidth={1.5} />
        </div>
      ))}
    </div>
  );
}

function AboutPage() {
  const { text } = useSiteTexts();
  return <>
    <section className="py-20 md:py-28">
      <div className="site-container grid gap-12 lg:grid-cols-[.75fr_1.25fr]">
        <div><p className="eyebrow">Über planem</p><p className="mt-7 text-xl font-light leading-8 text-muted-foreground">planem steht für pragmatische Ingenieurarbeit mit Blick über den eigenen Fachbereich hinaus.</p></div>
         <div><h1 className="text-5xl font-extralight leading-[1.05] md:text-7xl">Effektiv &amp; Machbar.<br/><span className="text-primary">Nachhaltig umgesetzt.</span></h1><div className="mt-10 grid gap-6 text-base leading-7 text-muted-foreground md:grid-cols-2"><p>Gegründet von Marcel Stüer verbindet planem die Themen Mobilität, Energieeffizienz und Ressourcen in einem Planungs- und Beratungsbüro.</p><p>Das Ziel: regulatorische und technische Anforderungen so aufzubereiten, dass es einfach wird eine klare, wirtschaftlich tragfähige und zukunftsfeste Entscheidung zu begleiten.</p></div></div>
      </div>
    </section>
    <section className="border-y border-border bg-secondary py-20 md:py-24">
      <div className="site-container grid items-center gap-12 lg:grid-cols-[.9fr_1.1fr]">
        <div className="relative aspect-[4/5] max-w-xl overflow-hidden bg-primary">
          <img src="/planem-logo.svg" alt="" aria-hidden="true" className="absolute left-1/2 top-1/2 w-4/5 -translate-x-1/2 -translate-y-1/2 opacity-15 brightness-0 invert" />
          <SiteImage imageKey="about.portrait" fallback={marcelProfile} alt={`${text("about.person.name", "Marcel Stüer")}, ${text("about.person.role", "Gründer & Ingenieur")}`} className="relative h-full w-full object-cover" />
        </div>
         <div><p className="eyebrow">Persönlich für Sie da</p><h2 className="mt-5 text-4xl font-light md:text-6xl">{text("about.person.name", "Marcel Stüer")}</h2><p className="mt-3 text-lg text-primary">{text("about.person.role", "Gründer & Ingenieur")}</p><p className="mt-7 max-w-xl text-lg font-light leading-8 text-muted-foreground">Klimaschutz durch Technologie, die heute schon bereitsteht. Bei mir steht die greifbare Transformation im Mittelpunkt: Die (Förder-)Mittel sind da, wir müssen sie nur implementieren. Das ist kein Verzicht, sondern ein Gewinn für alle Seiten – Umwelt, Gesellschaft und Zukunft. Wir müssen das Rad nicht neu erfinden, sondern einfach den Reiter aufs Pferd hieven!</p></div>
      </div>
    </section>
    <section className="py-20 md:py-24">
      <div className="site-container grid gap-12 lg:grid-cols-2">
        <div>
          <p className="eyebrow">Warum planem</p>
          <h2 className="mt-5 text-4xl font-light leading-tight md:text-5xl">Eigenverantwortlich gestalten. Messbar beitragen.</h2>
          <p className="mt-6 text-lg font-light leading-8 text-muted-foreground">Ich habe planem gegründet, weil ich Projekte selbst verantworten und messbar etwas bewirken möchte: Energie einsparen, CO₂ reduzieren, die Mobilitätswende mitgestalten und Biodiversität in jedes Projekt mitdenken. planem soll ein Werkzeug für ökologischen Wandel sein – mit wirtschaftlicher Tragfähigkeit als Grundlage.</p>
        </div>
        <div className="border-l-2 border-primary pl-8">
          <p className="eyebrow">Einzelunternehmer – bewusst</p>
          <h3 className="mt-5 text-2xl font-light">Direkter Draht zum Experten.</h3>
          <ul className="mt-6 space-y-3 text-lg font-light leading-8 text-muted-foreground">
            <li>Keine Warteschleifen, keine Weitergabe an wechselnde Sachbearbeiter.</li>
            <li>Wer Sie berät, rechnet, plant und stellt auch den Förderantrag – ich.</li>
            <li>Freiberufliche Ingenieurtätigkeit: unabhängig von Herstellern und Handwerksbetrieben.</li>
          </ul>
        </div>
      </div>
    </section>
    <section className="border-y border-border bg-secondary py-20 md:py-24">
      <div className="site-container">
        <p className="eyebrow">Qualifikation</p>
        <h2 className="mt-5 text-4xl font-light md:text-5xl">Ausbildung und Zertifikate</h2>
        <div className="mt-10 grid gap-px bg-border">
          {qualifications.map((q) => (
            <div key={q.title} className="grid gap-2 bg-background p-6 md:grid-cols-[auto_1.4fr_1fr_1fr] md:items-center md:gap-6">
              <Award className="size-6 text-primary" strokeWidth={1.5} />
              <p className="font-medium">{q.title}</p>
              <p className="text-sm text-muted-foreground">{q.area}</p>
              <p className="text-sm text-primary">{q.use}</p>
            </div>
          ))}
        </div>
        <h3 className="mt-14 flex items-center gap-3 text-2xl font-light"><Briefcase className="size-6 text-primary" strokeWidth={1.5} />Berufserfahrung und Netzwerk</h3>
        <ul className="mt-6 grid gap-4 md:grid-cols-2">
          {experience.map((e) => <li key={e} className="border-l border-primary/50 pl-5 leading-7 text-muted-foreground">{e}</li>)}
        </ul>
      </div>
    </section>
    <section className="py-20 md:py-24">
      <div className="site-container grid items-center gap-12 lg:grid-cols-2">
        <ValuesDiagram />
        <div>
          <p className="eyebrow">Arbeitsweise</p>
          <h2 className="mt-5 text-4xl font-light leading-tight md:text-5xl">Worauf Sie sich verlassen können.</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {values.map(({ icon: Icon, title, text: t }) => (
              <div key={title}><Icon className="size-6 text-primary" strokeWidth={1.5} /><h3 className="mt-3 font-medium">{title}</h3><p className="mt-1 text-sm leading-6 text-muted-foreground">{t}</p></div>
            ))}
          </div>
        </div>
      </div>
    </section>
    <section className="py-20 md:py-28"><div className="site-container grid items-center gap-12 lg:grid-cols-2"><div className="aspect-[7/5] overflow-hidden"><SiteImage imageKey="home.ecology" fallback={windradImage} alt="Windenergieanlage über einem Feld im Münsterland" loading="lazy" width={1400} height={1000} className="h-full w-full object-cover" /></div><div><p className="eyebrow">Ökologie und Nachhaltigkeit</p><h2 className="mt-5 text-4xl font-light leading-tight md:text-5xl">Natur, Mensch und Mobilität. Im Verbund.</h2><p className="mt-6 max-w-lg text-lg font-light leading-8 text-muted-foreground">Biodiversität, Entsiegelung und natürliche Gebäudekühlung gehören für uns zum Entwurf wie sichere Fußwege, gut geplante Fahrradinfrastruktur und verkehrsberuhigte Fahrbahnen – bevorzugt für E-Mobilität. So steigt der Gesamtwert der Immobilie und die Lebensqualität vor Ort.</p></div></div></section>
    <Quiz />
    <section className="py-20 md:py-28"><div className="site-container grid gap-10 md:grid-cols-[1fr_1.5fr]"><p className="eyebrow">Haltung</p><div><blockquote className="text-3xl font-light leading-tight md:text-5xl">„Gute Beratung hört zu, schafft Lösungen, die Ressourcen schonen, Werte erhalten und Begeisterung wecken für ein gutes Gefühl von morgen.“</blockquote><p className="mt-8 text-muted-foreground">{text("about.person.name", "Marcel Stüer")}, Gründer von planem</p></div></div></section>
    <section className="bg-ink py-20 text-ink-foreground md:py-24">
      <div className="site-container flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
        <div><h2 className="text-3xl font-light md:text-5xl">Lassen Sie uns sprechen.</h2><p className="mt-4 max-w-xl text-lg font-light text-ink-muted">Ein unverbindliches Erstgespräch – direkt mit mir, ohne Umwege.</p></div>
        <Button asChild size="lg"><Link to="/kontakt">Unverbindliches Erstgespräch vereinbaren <ArrowRight /></Link></Button>
      </div>
    </section>
    <SeoSection />
  </>;
}