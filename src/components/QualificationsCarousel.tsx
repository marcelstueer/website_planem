import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import eeExperten from "@/assets/energieeffizienz-experten.jpg";
import emobilNrw from "@/assets/elektromobilitaet-nrw.png";

/** Neue Qualifikationen einfach hier ergänzen – Logos werden automatisch in eine gleich große Fläche eingepasst. */
const qualifications = [
  {
    logo: eeExperten,
    alt: "Energieeffizienz-Experte für Förderprogramme des Bundes",
    title: "Energieeffizienz-Experte (dena)",
    text: "Gelistet in der Energieeffizienz-Expertenliste für Förderprogramme des Bundes – Voraussetzung für BAFA- und KfW-geförderte Beratungen.",
  },
  {
    logo: emobilNrw,
    alt: "ElektroMobilität NRW",
    title: "Kompetenznetz ElektroMobilität NRW",
    text: "Fachliche Vernetzung rund um Ladeinfrastruktur, Elektromobilität und betriebliches Mobilitätsmanagement in Nordrhein-Westfalen.",
  },
];

export function QualificationsCarousel() {
  return (
    <Carousel opts={{ loop: true }} plugins={[Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true })]}>
      <CarouselContent>
        {qualifications.map((q) => (
          <CarouselItem key={q.title}>
            <div className="grid gap-10 md:grid-cols-[1fr_1.2fr] md:items-center">
              <div className="flex h-28 w-full max-w-sm items-center justify-center bg-background p-5">
                <img src={q.logo} alt={q.alt} loading="lazy" className="max-h-full max-w-full object-contain" />
              </div>
              <div>
                <p className="eyebrow">Qualifikation und Netzwerk</p>
                <h3 className="mt-3 text-2xl font-light">{q.title}</h3>
                <p className="mt-3 text-lg font-light leading-8 text-muted-foreground">{q.text}</p>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
