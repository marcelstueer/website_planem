import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BatteryCharging, Bike, Building2, ChartNoAxesCombined, ClipboardCheck, Route as RouteIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SeoSection } from "@/components/SeoSection";
import { SiteImage } from "@/components/SiteImage";
import mobilityImage from "@/assets/mobility-japan.jpg";
import energyImage from "@/assets/energy-consulting.jpg";

export const Route = createFileRoute("/leistungen")({ head: () => ({ meta: [
  { title: "Leistungen | planem Münster" }, { name: "description", content: "Mobilitätskonzepte, Stellplatzreduzierung, E-Mobilität sowie Energieeffizienzberatung, Audits und Fördermittel." },
  { property: "og:title", content: "Leistungen | planem" }, { property: "og:description", content: "Integrierte Planung für Mobilität und Energieeffizienz." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }
] }), component: ServicesPage });

const mobility = [
  { icon: RouteIcon, title: "Mobilitätskonzepte", text: "Standortbezogene Analyse und belastbare Maßnahmen für Betriebe, größere Liegenschaften und Quartiere." },
  { icon: Bike, title: "Stellplatzreduzierung", text: "Nachvollziehbare Konzepte als Grundlage im Baugenehmigungsverfahren – abgestimmt auf Nutzung und Erreichbarkeit." },
  { icon: BatteryCharging, title: "E-Mobilität", text: "Bedarfsermittlung und konzeptionelle Planung für Ladeinfrastruktur und den schrittweisen Flottenumbau." },
];
const energy = [
  { icon: Building2, title: "Nichtwohngebäude", text: "Energetische Bestandsaufnahme, Sanierungsfahrplan und Beratung für effiziente Gebäude und Anlagentechnik." },
  { icon: ClipboardCheck, title: "Audit & Management", text: "Strukturierte Erfassung von Verbräuchen und Potenzialen sowie Unterstützung bei Energieaudit und Energiemanagement." },
  { icon: ChartNoAxesCombined, title: "Prozesse & Förderung", text: "Effizienzmaßnahmen für betriebliche Prozesse und Einordnung geeigneter Förderprogramme von der Idee bis zum Antrag." },
];
function ServiceBlock({ number, title, intro, image, imageKey, imageAlt, items }: { number:string; title:string; intro:string; image:string; imageKey:string; imageAlt:string; items:typeof mobility }) { return <section className="py-16 md:py-24"><div className="site-container"><div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]"><div><p className="eyebrow">{number}</p><h2 className="mt-4 text-4xl font-light md:text-6xl">{title}</h2><p className="mt-6 max-w-lg text-lg font-light leading-8 text-muted-foreground">{intro}</p></div><SiteImage imageKey={imageKey} fallback={image} alt={imageAlt} loading="lazy" width={1408} height={1008} className="aspect-[7/4] h-full w-full object-cover" /></div><div className="mt-12 grid border-y border-border md:grid-cols-3">{items.map(({icon:Icon,title:itemTitle,text},i)=><article key={itemTitle} className={`py-8 md:px-8 ${i>0 ? "border-t md:border-l md:border-t-0" : ""}`}><Icon className="size-6 text-primary"/><h3 className="mt-6 text-xl font-medium">{itemTitle}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{text}</p></article>)}</div></div></section>; }
function ServicesPage() { return <><section className="bg-secondary py-20 md:py-28"><div className="site-container grid gap-8 md:grid-cols-[1fr_2fr]"><p className="eyebrow">Leistungen</p><div><h1 className="max-w-4xl text-5xl font-extralight leading-[1.05] md:text-7xl">Einfache und machbare Konzepte, die Anforderungen verbindet.</h1><p className="mt-7 max-w-2xl text-lg leading-8 text-muted-foreground">Mobilität und Energie werden nicht isoliert betrachtet, sondern als zusammenhängende Bausteine eines zukunftsfähigen Standorts.</p></div></div></section><ServiceBlock number="01 / Mobilität" title="Weniger Stellflächen. Mehr Möglichkeiten." intro="Von der Bestandsanalyse bis zum genehmigungsfähigen Konzept entstehen Lösungen, die Verhalten, Infrastruktur und regulatorische Anforderungen zusammenführen." image={mobilityImage} imageKey="home.mobility" imageAlt="Modernes Quartier mit attraktiver Rad- und Fußverkehrsanbindung" items={mobility}/><div className="bg-secondary"><ServiceBlock number="02 / Energie" title="Effizienz, die sich rechnet." intro="Technische Analyse, verständliche Entscheidungsgrundlagen und die passende Förderung schaffen einen belastbaren Weg zu geringeren Verbräuchen und Emissionen." image={energyImage} imageKey="home.energy" imageAlt="Energieeffizientes Nichtwohngebäude mit moderner Architektur" items={energy}/></div><section className="bg-ink py-16 text-ink-foreground"><div className="site-container flex flex-col justify-between gap-7 md:flex-row md:items-center"><h2 className="max-w-2xl text-3xl font-light md:text-5xl">Welche Aufgabe dürfen wir gemeinsam lösen?</h2><Button asChild size="lg"><Link to="/kontakt">Projekt besprechen <ArrowRight/></Link></Button></div></section><SeoSection /></>; }
