import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight, BellRing, CalendarClock, ClipboardCheck, FileCheck, FileQuestion, HandCoins, Hammer,
  Lightbulb, MapPin, MessagesSquare, Search, SquareParking, Ruler, Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SeoSection } from "@/components/SeoSection";
import { SiteImage } from "@/components/SiteImage";
import { ContactCta, CtaBand } from "@/components/AffectsYou";
import { AffectsCheck } from "@/components/AffectsCheck";
import { useSiteTexts } from "@/lib/site-data";
import { partners } from "@/lib/partners";
import { VOICE } from "@/lib/voice";
import { SHOW_ARCHITEKTEN_PAGE } from "@/lib/site-flags";

const TITLE = "Für Architekten & Planer in Münster | planem";
const DESC = "Weniger Stellplätze, geringere Baukosten, stärkerer Bauantrag: Mobilitätskonzepte für Architekten in Münster, Münsterland und Ostwestfalen.";
const Z = "architektur" as const;

export const Route = createFileRoute("/fuer-architekten")({
  head: () => ({ meta: [
    { title: TITLE }, { name: "description", content: DESC },
    { property: "og:title", content: TITLE }, { property: "og:description", content: DESC },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
    ...(SHOW_ARCHITEKTEN_PAGE ? [] : [{ name: "robots", content: "noindex,nofollow" }]),
  ] }),
  component: ArchitektenPage,
});

const areas = [
  {
    icon: SquareParking, title: "Mobilitätskonzepte: weniger Stellplätze, geringere Baukosten", anliegen: "Mobilitätskonzept / Stellplatzreduzierung",
    text: "Ein Mobilitätskonzept kann die Zahl der notwendigen Kfz-Stellplätze verringern – und damit Fläche und Baukosten sparen. Zugleich kann es Ihren Bauantrag im Genehmigungsverfahren stützen. Ladeinfrastruktur und Fahrradabstellplätze plane ich dabei mit. Was möglich ist, hängt von der kommunalen Stellplatzsatzung und der Genehmigungsbehörde ab.",
    extra: "Je früher ich im Projekt dabei bin, desto mehr lässt sich bei Fläche, Kosten und Genehmigung bewegen.",
    triggers: [
      { icon: Ruler, text: "Die Stellplatzsatzung verlangt mehr Plätze, als das Grundstück hergibt." },
      { icon: FileQuestion, text: "Die Bauaufsicht fragt nach einem Mobilitätskonzept oder einem Nachweis." },
      { icon: HandCoins, text: "Eine Tiefgarage oder Stellplatzanlage treibt die Baukosten in die Höhe." },
    ],
    link: { to: "/leistungen/mobilitaetskonzepte" as const, label: "Mehr zu Mobilitätskonzepten" },
  },
  {
    icon: HandCoins, title: "Fördermittelbegleitung", anliegen: "Fördermittelbegleitung",
    text: "Für Energiethemen bei Nichtwohngebäuden und für Mobilität (ohne Fahrzeugförderung) kommen je nach Vorhaben Förderstellen wie BAFA, KfW oder progres.nrw in Frage. Ich prüfe, was passen kann, und begleite den Antrag.",
    triggers: [
      { icon: Users, text: "Ihr Bauherr fragt, ob es für das Vorhaben Förderung gibt." },
      { icon: CalendarClock, text: "Der Antrag muss möglicherweise vor der Auftragsvergabe gestellt werden." },
      { icon: Search, text: "Unklar ist, welche Förderstelle für Ihr Projekt in Frage kommt." },
    ],
    link: { to: "/leistungen/energieberatung" as const, label: "Mehr zur Energieeffizienzberatung" },
  },
  {
    icon: FileCheck, title: "Bedarfsausweise für Nichtwohngebäude", anliegen: "Bedarfsausweis Nichtwohngebäude",
    text: VOICE.bedarfsausweis,
    triggers: [
      { icon: ClipboardCheck, text: "Ein Nichtwohngebäude Ihres Bauherrn wird verkauft, vermietet oder verpachtet." },
      { icon: Hammer, text: "Nach Sanierung oder Umbau wird ein neuer Energieausweis benötigt." },
      { icon: FileQuestion, text: "Es liegt nur ein Verbrauchsausweis vor, und unklar ist, was ab 2027 gilt." },
    ],
    link: { to: "/leistungen/bedarfsausweis" as const, label: "Mehr zum Bedarfsausweis" },
  },
];

const steps = [
  { icon: MessagesSquare, title: "Erstgespräch", text: VOICE.erstgespraech },
  { icon: Search, title: "Einordnung", text: "Ich sehe mir Ihr Projekt, die Unterlagen und die Anforderungen der Genehmigung an." },
  { icon: Lightbulb, title: "Vorschlag", text: "Sie erhalten einen konkreten Vorschlag zu Leistungsumfang, Ablauf und Kosten." },
  { icon: Hammer, title: "Umsetzung", text: "Ich erstelle Konzept, Nachweis oder Antrag und stimme mich direkt mit Ihnen ab." },
];

const checkQuestions = [
  { q: "Fordert die Stellplatzsatzung für Ihr Projekt mehr Stellplätze, als Sie unterbringen können oder möchten?", affectedIf: true },
  { q: "Möchte Ihr Bauherr Kosten für Stellplätze oder eine Tiefgarage senken?", affectedIf: true },
  { q: "Fragt Ihr Bauherr nach Förderung für Energie- oder Mobilitätsmaßnahmen?", affectedIf: true },
  { q: "Ist für ein Nichtwohngebäude in Ihrem Projekt ein Energieausweis bereits geklärt?", affectedIf: false },
];

function ArchitektenPage() {
  const { text } = useSiteTexts();
  const stand = text("foerderung.stand", "November 2026");
  const partner = partners.find((p) => p.name === "Energie & Wert");
  return <>
    <section className="bg-ink text-ink-foreground">
      <div className="site-container grid gap-10 py-16 md:py-24 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
        <div>
          <p className="eyebrow !text-brand-light">Für Architekten &amp; Planer</p>
          <h1 className="mt-5 text-4xl font-extralight leading-[1.08] md:text-6xl">Ihr Bauantrag stockt am Stellplatznachweis?</h1>
          <p className="mt-7 max-w-2xl text-lg font-light leading-8 text-ink-muted">Ein Mobilitätskonzept kann mehr als den Nachweis liefern: Es kann die Zahl der Kfz-Stellplätze verringern, damit Baukosten senken und zugleich Ihren Bauantrag stützen – je nach kommunaler Stellplatzsatzung und Genehmigungsbehörde. Je früher Sie mich einbinden, desto mehr lässt sich bei Fläche, Kosten und Genehmigung bewegen.</p>
          <div className="mt-9 flex flex-col items-start gap-3">
            <ContactCta zielgruppe={Z} />
            <a href="#check" className="text-sm font-medium text-brand-light hover:underline">Erst kurz prüfen: Betrifft mich das?</a>
          </div>
        </div>
        <div className="aspect-[4/3] w-full overflow-hidden">
          <SiteImage imageKey="architekten.hero" fallback="/library/architekten-hero.webp" alt="Rohbau und Tiefbaustelle als Beispiel für ein laufendes Bauprojekt" width={1600} height={1200} loading="eager" fetchPriority="high" className="h-full w-full object-cover" />
        </div>
      </div>
    </section>

    <section className="py-16 md:py-24">
      <div className="site-container">
        <p className="eyebrow">Betrifft das Sie?</p>
        <h2 className="mt-4 max-w-3xl text-3xl font-light leading-tight md:text-5xl">Drei Themen, bei denen ich Planer unterstütze.</h2>
        <div className="mt-12 grid gap-px bg-border lg:grid-cols-2">
          {areas.map(({ icon: Icon, title, text: body, triggers, link, anliegen, extra }, idx) => <article key={title} className={`flex flex-col bg-background p-6 md:p-8 ${idx === 0 ? "lg:col-span-2 lg:p-10" : ""}`}>
            <span className="flex size-12 items-center justify-center rounded-full bg-primary/10"><Icon className="size-6 text-primary" /></span>
            <h3 className="mt-5 text-xl font-medium">{title}</h3>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{body}</p>
            {extra && <p className="mt-4 border-l-2 border-primary pl-4 text-base font-light leading-7">{extra}</p>}
            <ul className="mt-6 space-y-3 border-t border-border pt-6">
              {triggers.map(({ icon: T, text: t }) => <li key={t} className="flex gap-3 text-sm leading-6"><T className="mt-0.5 size-5 shrink-0 text-primary" />{t}</li>)}
            </ul>
            <div className="mt-auto flex flex-col items-start gap-3 pt-7">
              <Link to={link.to} className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">{link.label} <ArrowRight className="size-4" /></Link>
              <Link to="/kontakt" search={{ anliegen, zielgruppe: Z }} className="text-sm text-muted-foreground hover:text-primary">Gespräch zu diesem Thema anfragen</Link>
            </div>
          </article>)}
        </div>
        <div className="mt-6 space-y-2 text-xs text-muted-foreground">
          <p>Förderbedingungen ändern sich, Angaben ohne Gewähr. Stand: {stand}</p>
          <p>Zum Bedarfsausweis: Allgemeine Information, keine Rechtsberatung. Aktuelles dazu im Beitrag <Link to="/leistungen/bedarfsausweis" className="text-primary hover:underline">„Energieausweis ab 2027"</Link> und unter <Link to="/aktuelles" className="text-primary hover:underline">Aktuelles</Link>.</p>
        </div>
      </div>
    </section>

    {partner && <section className="border-y border-border bg-secondary py-14">
      <div className="site-container grid gap-6 md:grid-cols-[1fr_2fr] md:items-center">
        <p className="eyebrow">Im Verbund bei Bedarfsausweisen</p>
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          {partner.logo ? <img src={partner.logo} alt={`Logo ${partner.name}`} className="h-16 w-32 object-contain" loading="lazy" /> : <div role="img" aria-label={`Logo ${partner.name} folgt`} className="h-16 w-32 shrink-0 bg-muted" />}
          <div>
            <p className="text-xl font-light">{partner.name}</p>
            {partner.person && <p className="mt-1 text-sm text-muted-foreground">{partner.person}</p>}
            <p className="mt-2 text-sm">{partner.beschreibung}</p>
            <Link to="/partner" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">Zur Partnerseite <ArrowRight className="size-4" /></Link>
          </div>
        </div>
      </div>
    </section>}

    <section className="py-16 md:py-24">
      <div className="site-container">
        <p className="eyebrow">Ablauf</p>
        <h2 className="mt-4 text-3xl font-light md:text-5xl">In vier Schritten zum Nachweis.</h2>
        <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ icon: Icon, title, text: t }, i) => <li key={title} className="border-t border-border pt-6">
            <div className="flex items-center gap-3"><span className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground"><Icon className="size-5" /></span><span className="text-xs font-semibold uppercase tracking-[.16em] text-primary">Schritt {i + 1}</span></div>
            <h3 className="mt-4 text-lg font-medium">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{t}</p>
          </li>)}
        </ol>
      </div>
    </section>

    <AffectsCheck title="Brauche ich Unterstützung? – 60-Sekunden-Check für Planer" questions={checkQuestions} anliegen="Planer-Check" zielgruppe={Z} />

    <section className="py-16 md:py-20">
      <div className="site-container grid gap-10 md:grid-cols-2">
        <div>
          <p className="eyebrow">Antwortzeit</p>
          <p className="mt-4 text-2xl font-light leading-snug">{VOICE.antwortzeit}</p>
          <p className="mt-4 text-sm text-muted-foreground">{VOICE.nachhaken}</p>
          <Button asChild variant="outline" className="mt-5"><Link to="/kontakt" search={{ anliegen: "Erinnerung an meine Anfrage", zielgruppe: Z }}><BellRing /> Erinnern Sie mich</Link></Button>
        </div>
        <div>
          <p className="eyebrow">Einsatzgebiet</p>
          <p className="mt-4 flex gap-3 text-2xl font-light leading-snug"><MapPin className="mt-1 size-6 shrink-0 text-primary" />Münster, Münsterland, Ostwestfalen (Bielefeld, Gütersloh) und Osnabrücker Land.</p>
          <p className="mt-4 text-sm text-muted-foreground">{VOICE.ansprechpartner}</p>
        </div>
      </div>
    </section>

    <CtaBand title="Lassen Sie uns über Ihr Projekt sprechen." text={`Holen Sie mich am besten schon in der Entwurfsphase dazu – dann lässt sich am meisten bewegen. ${VOICE.erstgespraech}`} zielgruppe={Z} />
    <SeoSection contentKey="seo.architekten" />
  </>;
}
