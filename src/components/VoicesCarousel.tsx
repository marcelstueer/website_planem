import { ExternalLink, Quote } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { blueskyPosts } from "@/lib/bluesky-posts";

export function VoicesCarousel() {
  return (
    <Carousel opts={{ align: "start", loop: true }} className="mt-10">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          Ausgewählte Beiträge aus der Fachcommunity auf Bluesky.
        </p>
        <div className="relative flex gap-2">
          <CarouselPrevious className="static translate-y-0" />
          <CarouselNext className="static translate-y-0" />
        </div>
      </div>
      <CarouselContent className="mt-6">
        {blueskyPosts.map((post) => (
          <CarouselItem key={post.url} className="sm:basis-1/2 lg:basis-1/3">
            <article className="flex h-full flex-col border border-border bg-background p-7">
              <div className="flex items-center gap-3 text-xs uppercase tracking-[.16em] text-muted-foreground">
                <span className="border border-primary px-2 py-1 font-semibold text-primary">
                  {post.topic}
                </span>
                <span>{new Date(post.date).toLocaleDateString("de-DE")}</span>
              </div>
              <Quote className="mt-6 size-5 text-primary" />
              <p className="mt-4 flex-1 text-base leading-7 text-muted-foreground">{post.text}</p>
              <div className="mt-6 border-t border-border pt-4">
                <p className="text-sm font-medium">{post.author}</p>
                <p className="text-xs text-muted-foreground">{post.handle}</p>
                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-2 text-sm underline underline-offset-4 hover:text-primary"
                >
                  Zum Originalbeitrag <ExternalLink className="size-4" />
                </a>
              </div>
            </article>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
