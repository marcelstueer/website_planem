import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Award, Compass, GraduationCap, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SeoSection } from "@/components/SeoSection";
import { SiteImage } from "@/components/SiteImage";
import { Quiz } from "@/components/Quiz";
import { imageFilterClass, useSiteImages, useSiteTexts } from "@/lib/site-data";
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

const facts = [
  { icon: GraduationCap, title: "Technisches Fundament", text: "Master of Engineering im Technischen Management, Bachelor of Science in Umwelttechnik und Ausbildung zum Technischen Zeichner. Seit 20 Jahren im technischen Klimaschutz aktiv." },
  { icon: Award, title: "Zertifizierte Expertise", text: "Seit 2016 BAFA- und KfW-zertifizierter Energieberater für Nichtwohngebäude sowie IHK-zertifizierter Mobilitätsmanager." },
  { icon: Compass, title: "Internationale Perspektive", text: "Berufliche Erfahrungen aus den USA, Japan und den Niederlanden erweitern den Blick auf bewährte Lösungen." },
  { icon: MapPin, title: "Regional erreichbar", text: "Persönliche Beratung in Münster und im Münsterland, in Ostwestfalen sowie im Osnabrücker Land." },
];

function AboutPage() {
  const { text } = useSiteTexts();
  const { images } = useSiteImages();
  const portrait = images["about.portrait"];

  return <>
    <section className="py-20 md:py-28">
      <div className="site-container grid gap-12 lg:grid-cols-[.75fr_1.25fr]">
        <div><p className="eyebrow">Über planem</p><p className="mt-7 text-xl font-light leading-8 text-muted-foreground">planem steht für pragmatische Ingenieurarbeit mit Blick über den eigenen Fachbereich hinaus.</p></div>
         <div><h1 className="text-5xl font-extralight leading-[1.05] md:text-7xl">Effektiv &amp; Machbar.<br/><span className="text-primary">Offener Blick.</span></h1><div className="mt-10 grid gap-6 text-base leading-7 text-muted-foreground md:grid-cols-2"><p>Gegründet von Marcel Stüer verbindet planem die Themen Mobilität, Energieeffizienz und Ressourcen in einem Planungs- und Beratungsbüro.</p><p>Das Ziel: regulatorische und technische Anforderungen so aufzubereiten, dass es einfach wird eine klare, wirtschaftlich tragfähige und zukunftsfeste Entscheidung zu begleiten.</p></div></div>
      </div>
    </section>
    <section className="border-y border-border bg-secondary py-20 md:py-24">
      <div className="site-container grid items-center gap-12 lg:grid-cols-[.9fr_1.1fr]">
        <div className="relative aspect-[4/5] max-w-xl overflow-hidden bg-primary">
          <img src="/planem-logo.svg" alt="" aria-hidden="true" className="absolute left-1/2 top-1/2 w-4/5 -translate-x-1/2 -translate-y-1/2 opacity-15 brightness-0 invert" />
          <img src={portrait?.url || marcelProfile} alt={`${text("about.person.name", "Marcel Stüer")}, ${text("about.person.role", "Gründer & Ingenieur")}`} className={`relative h-full w-full object-cover ${imageFilterClass(portrait)}`} />
        </div>
         <div><p className="eyebrow">Persönlich für Sie da</p><h2 className="mt-5 text-4xl font-light md:text-6xl">{text("about.person.name", "Marcel Stüer")}</h2><p className="mt-3 text-lg text-primary">{text("about.person.role", "Gründer & Ingenieur")}</p><p className="mt-7 max-w-xl text-lg font-light leading-8 text-muted-foreground">Klimaschutz durch Technologie, die heute schon bereitsteht. Bei mir steht die greifbare Transformation im Mittelpunkt: Die Mittel sind da, wir müssen sie nur implementieren. Das ist kein Verzicht, sondern ein Gewinn für alle Seiten – Umwelt, Gesellschaft und Zukunft. Wir müssen das Rad nicht neu erfinden, sondern einfach den Reiter aufs Pferd hieven!</p></div>
      </div>
    </section>
    <section className="py-20 md:py-24"><div className="site-container"><div className="grid gap-px bg-border md:grid-cols-2">{facts.map(({icon: Icon, title, text: factText}) => <article key={title} className="bg-background p-7 md:p-10"><Icon className="size-7 text-primary"/><h2 className="mt-8 text-2xl font-light">{title}</h2><p className="mt-4 leading-7 text-muted-foreground">{factText}</p></article>)}</div></div></section>
    <section className="py-20 md:py-28"><div className="site-container grid items-center gap-12 lg:grid-cols-2"><div className="aspect-[7/5] overflow-hidden"><SiteImage imageKey="home.ecology" fallback={windradImage} alt="Windenergieanlage über einem Feld im Münsterland" loading="lazy" width={1400} height={1000} className="h-full w-full object-cover" /></div><div><p className="eyebrow">Ökologie und Nachhaltigkeit</p><h2 className="mt-5 text-4xl font-light leading-tight md:text-5xl">Natur, Mensch und Mobilität. Im Verbund.</h2><p className="mt-6 max-w-lg text-lg font-light leading-8 text-muted-foreground">Biodiversität, Entsiegelung und natürliche Gebäudekühlung gehören für uns zum Entwurf wie sichere Fußwege, gut geplante Fahrradinfrastruktur und verkehrsberuhigte Fahrbahnen – bevorzugt für E-Mobilität. So steigt der Gesamtwert der Immobilie und die Lebensqualität vor Ort.</p></div></div></section>
    <Quiz />
    <section className="py-20 md:py-28"><div className="site-container grid gap-10 md:grid-cols-[1fr_1.5fr]"><p className="eyebrow">Arbeitsweise</p><div><blockquote className="text-3xl font-light leading-tight md:text-5xl">„Gute Beratung hört zu, schafft Lösungen, die Ressourcen schonen, Werte erhalten und Begeisterung wecken für ein gutes Gefühl von morgen.“</blockquote><p className="mt-8 text-muted-foreground">{text("about.person.name", "Marcel Stüer")}, Gründer von planem</p><Button asChild className="mt-9"><Link to="/kontakt">Persönlich kennenlernen <ArrowRight/></Link></Button></div></div></section>
    <SeoSection />
  </>;
}