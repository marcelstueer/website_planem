import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { studies } from "@/lib/studies";
import { blueskyPosts } from "@/lib/bluesky-posts";
import { linkedinPosts } from "@/lib/linkedin-posts";
import { mediaItems } from "@/lib/media-items";

export type NewsSource = "wissenschaft" | "bluesky" | "linkedin" | "podcast" | "blog";

/** One entry of the "Aktuelles" feed. Built from the existing content files — no duplicated content. */
export type NewsEntry = {
  id: string;
  source: NewsSource;
  date: string;
  title: string;
  /** Existing long text, used for the automatic short text. */
  text: string;
  /** Internal path or external URL. */
  href: string;
  internal: boolean;
};

export type NewsMeta = { id: string; short_text: string; help_text: string; featured: boolean };

export const DEFAULT_FEATURED_ID = "blog:bedarfsausweis";
export const SHORT_MAX = 200;
export const HELP_MAX = 120;

/** Own blog posts. Title/text come from the editable "Aktuelles – hervorgehobener Eintrag" texts. */
export function ownPosts(text: (key: string, fallback?: string) => string): NewsEntry[] {
  return [
    {
      id: DEFAULT_FEATURED_ID,
      source: "blog",
      date: "2026-10-13",
      title: text("aktuelles.highlight.title", "Nichtwohngebäude: Ab 2027 nur noch der Bedarfsausweis"),
      text: text("aktuelles.highlight.text", "Für Nichtwohngebäude zählt ab 1.1.2027 nur noch der Bedarfsausweis als Energieausweis, bei Verkauf, Vermietung und Vertragsverlängerung. Was das GModG ändert und wie planem hilft."),
      href: "/leistungen/bedarfsausweis",
      internal: true,
    },
  ];
}

export function feedEntries(text: (key: string, fallback?: string) => string): NewsEntry[] {
  return [
    ...ownPosts(text),
    ...studies.map((s) => ({ id: `wissenschaft:${s.doi}`, source: "wissenschaft" as const, date: s.date, title: s.titleDe ?? s.title, text: s.essence || s.summary, href: s.url, internal: false })),
    ...blueskyPosts.map((p) => ({ id: `bluesky:${p.url}`, source: "bluesky" as const, date: p.date, title: `${p.author} · ${p.topic}`, text: p.text, href: p.url, internal: false })),
    ...linkedinPosts.map((p) => ({ id: `linkedin:${p.url}`, source: "linkedin" as const, date: p.date, title: `${p.author} · ${p.topic}`, text: p.text, href: p.url, internal: false })),
    ...mediaItems.map((m) => ({ id: `podcast:${m.url}`, source: "podcast" as const, date: m.date, title: m.title, text: m.essence || m.summary, href: m.url, internal: false })),
  ].sort((a, b) => b.date.localeCompare(a.date));
}

/** Shortens at a word boundary and appends an ellipsis. */
export function truncateWords(input: string, max: number): string {
  const clean = input.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  const space = cut.lastIndexOf(" ");
  return `${(space > max * 0.5 ? cut.slice(0, space) : cut).replace(/[\s,.;:–-]+$/, "")} …`;
}

export function useNewsMeta() {
  return useQuery({
    queryKey: ["news_meta"],
    staleTime: 30_000,
    queryFn: async () => {
      const { data, error } = await supabase.from("news_meta").select("id,short_text,help_text,featured");
      if (error) throw error;
      return Object.fromEntries((data ?? []).map((r) => [r.id, r as NewsMeta])) as Record<string, NewsMeta>;
    },
  });
}
