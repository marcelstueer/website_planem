import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { SeoSection } from "@/components/SeoSection";
import { partners } from "@/lib/partners";

export const Route = createFileRoute("/partner")({
  head: () => ({ meta: [
    { title: "Partner & Referenzen | planem" },
    { name: "description", content: "Mit welchen Partnern planem an Mobilitätskonzepten und Energieeffizienz in Münster und der Region zusammenarbeitet." },
    { property: "og:title", content: "Partner & Referenzen | planem" },
    { property: "og:description", content: "Unsere Partner und gemeinsamen Projekte." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: PartnerPage,
});

function PartnerPage() {
  return <>
    <section className="py-20 md:py-28"><div className="site-container">
      <p className="eyebrow">Netzwerk</p>
      <h1 className="mt-5 text-5xl font-extralight leading-[1.05] md:text-7xl">Partner &amp; Referenzen</h1>
      <ul className="mt-14 divide-y divide-border border-y border-border">
        {partners.map((p) => (
          <li key={p.name} className="flex flex-col gap-6 py-10 md:flex-row md:items-start md:gap-10">
            <div className="flex h-24 w-40 shrink-0 items-center justify-center">
              {p.logo ? <img src={p.logo} alt={`Logo ${p.name}`} className="max-h-full w-40 object-contain grayscale" loading="lazy" />
                : <div role="img" aria-label={`Logo ${p.name}`} className="h-full w-full bg-muted" />}
            </div>
            <div>
              <h2 className="text-2xl font-light">{p.name}</h2>
              <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">{p.beschreibung}</p>
              <a href={p.url} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">Zur Website von {p.name} <ArrowUpRight className="size-4" /></a>
            </div>
          </li>
        ))}
      </ul>
    </div></section>
    <SeoSection />
  </>;
}
