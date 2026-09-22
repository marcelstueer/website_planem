import { Bike, Bus, Car, ExternalLink, Flame, Headphones, Leaf, TrainFront, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { mediaItems, type MediaItem } from "@/lib/media-items";

const icons = {
  bike: Bike,
  car: Car,
  bus: Bus,
  heat: Flame,
  energy: Zap,
  leaf: Leaf,
  train: TrainFront,
} as const;

function Visual({ item }: { item: MediaItem }) {
  const Icon = icons[item.icon ?? "leaf"];
  if (item.imageUrl) {
    return (
      <img
        src={item.imageUrl}
        alt={item.title}
        loading="lazy"
        className="aspect-[16/9] w-full object-cover grayscale-[.45]"
      />
    );
  }
  return (
    <div className="flex aspect-[16/9] w-full items-center justify-center bg-secondary">
      <Icon className="size-14 text-primary" strokeWidth={1.2} />
    </div>
  );
}

export function MediaCarousel() {
  return (
    <Carousel opts={{ align: "start" }} className="mt-10">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          Gehört, gelesen und mit Blick auf die Praxis eingeordnet.
        </p>
        <div className="relative flex gap-2">
          <CarouselPrevious className="static translate-y-0" />
          <CarouselNext className="static translate-y-0" />
        </div>
      </div>
      <CarouselContent className="mt-6">
        {mediaItems.map((item) => (
          <CarouselItem key={item.url} className="md:basis-1/2 xl:basis-1/3">
            <article className="flex h-full flex-col border border-border bg-background">
              <Visual item={item} />
              <div className="flex flex-1 flex-col p-7">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs uppercase tracking-[.16em] text-muted-foreground">
                  <span className="border border-primary px-2 py-1 font-semibold text-primary">
                    {item.category}
                  </span>
                  <span>{item.source}</span>
                  <span>{new Date(item.date).toLocaleDateString("de-DE")}</span>
                  {item.duration ? <span>{item.duration}</span> : null}
                </div>
                <h3 className="mt-5 text-xl font-light leading-snug">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">{item.summary}</p>
                <div className="mt-5 border-l-2 border-primary pl-4">
                  <p className="eyebrow">Quintessenz</p>
                  <p className="mt-2 text-sm leading-7">{item.essence}</p>
                </div>
                {item.links?.length ? (
                  <ul className="mt-5 space-y-1 text-xs text-muted-foreground">
                    {item.links.map((l) => (
                      <li key={l.url}>
                        <a
                          href={l.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline underline-offset-4 hover:text-primary"
                        >
                          {l.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : null}
                <div className="mt-auto flex flex-wrap items-center gap-3 pt-7">
                  {item.listenUrl ? (
                    <Button asChild size="sm">
                      <a href={item.listenUrl} target="_blank" rel="noopener noreferrer">
                        <Headphones /> Direkt anhören
                      </a>
                    </Button>
                  ) : null}
                  <Button asChild size="sm" variant="outline">
                    <a href={item.url} target="_blank" rel="noopener noreferrer">
                      Zur Quelle <ExternalLink />
                    </a>
                  </Button>
                </div>
              </div>
            </article>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
