import { Link } from "@tanstack/react-router";
import { ArrowRight, AtSign, FlaskConical, Mic, PenLine } from "lucide-react";
import type { ComponentType, ReactNode } from "react";
import { useSiteTexts } from "@/lib/site-data";
import { DEFAULT_FEATURED_ID, HELP_MAX, SHORT_MAX, feedEntries, truncateWords, useNewsMeta, type NewsEntry, type NewsMeta, type NewsSource } from "@/lib/news-feed";
import { cn } from "@/lib/utils";

const SOURCES: Record<NewsSource, { label: string; icon: ComponentType<{ className?: string }> }> = {
  wissenschaft: { label: "Wissenschaft", icon: FlaskConical },
  bluesky: { label: "Bluesky", icon: AtSign },
  podcast: { label: "Podcast", icon: Mic },
  blog: { label: "Blog", icon: PenLine },
};

const formatDate = (iso: string) => {
  const [y, m, d] = iso.split("-");
  return d && m ? `${d}.${m}.${y}` : iso;
};

function NewsCard({ entry, meta, large }: { entry: NewsEntry; meta?: NewsMeta; large?: boolean }) {
  const { label, icon: Icon } = SOURCES[entry.source];
  const short = meta?.short_text?.trim() || truncateWords(entry.text, SHORT_MAX);
  const help = meta?.help_text?.trim() ? truncateWords(meta.help_text, HELP_MAX) : "";
  const more = <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary">Mehr erfahren <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></span>;
  const body = <>
    <div className="flex items-center justify-between gap-3 text-xs">
      <span className="inline-flex items-center gap-1.5 border border-primary/40 px-2 py-1 font-semibold uppercase tracking-[.14em] text-primary"><Icon className="size-3.5" />{label}</span>
      <time dateTime={entry.date} className="text-muted-foreground">{formatDate(entry.date)}</time>
    </div>
    <h3 className={cn("mt-5 font-light leading-snug group-hover:text-primary", large ? "text-2xl md:text-4xl" : "text-lg")}>{entry.title}</h3>
    <p className={cn("mt-3 flex-1 leading-6 text-muted-foreground", large ? "max-w-3xl text-base md:text-lg md:leading-8" : "text-sm")}>{short}</p>
    {help && <p className="mt-4 border-l-2 border-primary pl-3 text-sm leading-6"><span className="font-medium">Wie planem helfen kann:</span> {help}</p>}
    <div className="mt-5">{more}</div>
  </>;
  const cls = cn("group flex h-full flex-col bg-background p-6 transition-colors hover:bg-secondary/60", large && "border-l-4 border-primary md:p-10");
  return entry.internal
    ? <Link to={entry.href as "/"} className={cls}>{body}</Link>
    : <a href={entry.href} target="_blank" rel="noopener" className={cls}>{body}</a>;
}

export function HomeNews() {
  const { text } = useSiteTexts();
  const meta = useNewsMeta();
  if (meta.isError) return null;

  const shell = (content: ReactNode) => (
    <section className="border-y border-border bg-secondary py-16 md:py-20" aria-labelledby="home-news">
      <div className="site-container">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div><p className="eyebrow">Aktuelles</p><h2 id="home-news" className="mt-3 text-3xl font-light md:text-4xl">Was gerade wichtig ist.</h2></div>
          <Link to="/aktuelles" className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">Alle Aktuellen Themen <ArrowRight className="size-4" /></Link>
        </div>
        {content}
      </div>
    </section>
  );

  if (meta.isPending) return shell(
    <div aria-hidden="true" className="space-y-px">
      <div className="h-56 animate-pulse bg-background/70" />
      <div className="grid gap-px md:grid-cols-4">{[0, 1, 2, 3].map((i) => <div key={i} className="h-44 animate-pulse bg-background/70" />)}</div>
    </div>,
  );

  const entries = feedEntries(text);
  if (!entries.length) return null;
  const metas = meta.data ?? {};
  const featuredId = Object.values(metas).find((m) => m.featured)?.id ?? DEFAULT_FEATURED_ID;
  const featured = entries.find((e) => e.id === featuredId) ?? entries[0];
  const rest = entries.filter((e) => e.id !== featured.id).slice(0, 4);

  return shell(
    <div className="animate-in fade-in duration-700">
      <NewsCard entry={featured} meta={metas[featured.id]} large />
      <div className="-mx-5 mt-px flex snap-x snap-mandatory gap-px overflow-x-auto px-5 md:mx-0 md:grid md:grid-cols-4 md:overflow-visible md:px-0">
        {rest.map((e) => <div key={e.id} className="w-[82%] shrink-0 snap-start md:w-auto"><NewsCard entry={e} meta={metas[e.id]} /></div>)}
      </div>
    </div>,
  );
}
