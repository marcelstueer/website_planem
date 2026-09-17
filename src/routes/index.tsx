import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Building2, CarFront, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/SectionHeading";
import heroImage from "@/assets/planem-hero.jpg";
import mobilityImage from "@/assets/mobility-planning.jpg";
import energyImage from "@/assets/energy-consulting.jpg";

export const Route = createFileRoute("/")({ head: () => ({ meta: [
  { title: "planem | Mobilität & Energieeffizienz aus Münster" },
  { name: "description", content: "Planung und Beratung für Mobilitätskonzepte, Energieeffizienz und Fördermittel in Münster und der Region." },
  { property: "og:title", content: "planem | Mobilität & Energieeffizienz" },
  { property: "og:description", content: "Planung und Beratung für zukunftsfähige Gebäude, Betriebe und Quartiere." },
  { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
] }), component: HomePage });

function HomePage() { return <>
  <section className="relative min-h-[calc(100svh-5rem)] overflow-hidden bg-ink text-ink-foreground">
    <img src={heroImage} alt="Modernes Quartier mit Radweg und energieeffizienten Gebäuden" className="absolute inset-0 h-full w-full object-cover" width={1600} height={1008} fetchPriority="high" />
    <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/78 to-ink/10" />
    <div className="site-container relative flex min-h-[calc(100svh-5rem)] flex-col justify-between py-14 md:py-20">
      <div className="reveal max-w-4xl"><p className="eyebrow !text-brand-light">Ingenieurbüro aus Münster</p><h1 className="mt-5 text-5xl font-extralight leading-[1.03] md:text-7xl lg:text-8xl">Gebäude&nbsp;und Mobilität.<br/><span className="text-brand-light">Zusammen gedacht.</span></h1><p className="mt-7 max-w-2xl text-lg font-light leading-8 text-ink-muted md:text-xl">Unabhängige Planung und Beratung für zukunftsfähige Gebäude, Betriebe und Quartiere.</p><div className="mt-9 flex flex-wrap gap-3"><Button asChild size="lg"><Link to="/leistungen">Leistungen entdecken <ArrowRight /></Link></Button><Button asChild size="lg" variant="outline" className="border-ink-muted bg-transparent text-ink-foreground hover:bg-ink-foreground hover:text-ink"><Link to="/kontakt">Gespräch vereinbaren</Link></Button></div></div>
      <div className="mt-16 grid gap-4 border-t border-ink-border pt-5 text-sm text-ink-muted sm:grid-cols-3"><span>Mobilitätskonzepte</span><span>Energieeffizienzberatung</span><span>Fördermittelbegleitung</span></div>
    </div>
  </section>
  <section className="py-20 md:py-28"><div className="site-container"><SectionHeading eyebrow="Kompetenz im Verbund" title="Mehrere Blickwinkel. Ein tragfähiges Konzept." text="Regulatorische Anforderungen werden zu Lösungen, die individuell fundiert, wirtschaftlich, ökologisch und im Alltag sinnvoll sind." />
    <div className="grid gap-5 md:grid-cols-2">
      <article className="group overflow-hidden bg-card"><div className="aspect-[7/5] overflow-hidden"><img src={mobilityImage} alt="Mobilitätsstation mit Radverkehr, ÖPNV und Ladeinfrastruktur" loading="lazy" width={1408} height={1008} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" /></div><div className="border border-t-0 border-border p-7 md:p-9"><CarFront className="mb-7 size-7 text-primary"/><h3 className="text-3xl font-light">Zukunftsgerechte Mobilität</h3><p className="mt-4 leading-7 text-muted-foreground">Effektive Konzepte für eine Verkehrswende von Betrieben, Liegenschaften und Quartieren. Durch Fördermittel, E-Mobilität oder Stellplatzreduzierung mehr Lebensqualität für die Menschen vor Ort und Wertsteigerung im Immobilienquartier.</p><Link to="/leistungen" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-primary">Mehr erfahren <ArrowRight className="size-4"/></Link></div></article>
      <article className="group overflow-hidden bg-card"><div className="aspect-[7/5] overflow-hidden"><img src={energyImage} alt="Energieeffizientes Nichtwohngebäude in der Planung" loading="lazy" width={1408} height={1008} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" /></div><div className="border border-t-0 border-border p-7 md:p-9"><Building2 className="mb-7 size-7 text-brand-blue"/><h3 className="text-3xl font-light">Energieeffizienz und Kostenreduzierung</h3><p className="mt-4 leading-7 text-muted-foreground">Energie- und Fördermittelberatung für Nichtwohngebäude, Prozesse, Audits und Managementsysteme – mit passender Strategie ganz individuell auf Ihre Anforderungen zugeschnitten.</p><Link to="/leistungen" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-primary">Mehr erfahren <ArrowRight className="size-4"/></Link></div></article>
    </div><p className="mt-3 text-right text-xs text-muted-foreground">Bildmaterial KI-generiert</p>
  </div></section>
  <section className="bg-secondary py-20 md:py-28"><div className="site-container grid gap-12 md:grid-cols-[1fr_1.25fr]"><div><p className="eyebrow">Warum planem</p><h2 className="mt-5 text-4xl font-light leading-tight md:text-6xl">Regional verankert.<br/>International inspiriert.</h2></div><div className="space-y-7 text-lg font-light leading-8 text-muted-foreground"><p>Internationale Expertise aus den Niederlanden und Japan fließen in Lösungen ein, die auf den hiesigen Markt und seine Anforderungen zugeschnitten sind.</p><div className="grid gap-4 border-t border-border pt-7 sm:grid-cols-2">{["BAFA- und KfW-zertifiziert seit 2016","IHK-zertifizierter Mobilitätsmanager","Master of Engineering","Münster und die Region"].map((item)=><div key={item} className="flex gap-3 text-sm font-medium text-foreground"><CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary"/>{item}</div>)}</div><Button asChild variant="outline"><Link to="/ueber-planem">Mehr über planem <ArrowRight /></Link></Button></div></div></section>
   <section className="py-20 md:py-24"><div className="site-container flex flex-col justify-between gap-8 border-y border-border py-12 md:flex-row md:items-center"><div><p className="eyebrow">Ihr Vorhaben</p><h2 className="mt-3 text-3xl font-light md:text-5xl">Lassen Sie uns rechtzeitig sprechen, um Ihr Vorhaben optimal voranzubringen.</h2></div><Button asChild size="lg"><Link to="/kontakt">Anfrage starten <ArrowRight /></Link></Button></div></section>
</>; }
