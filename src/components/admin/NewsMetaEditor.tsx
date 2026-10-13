import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Save, Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useSiteTexts } from "@/lib/site-data";
import { DEFAULT_FEATURED_ID, HELP_MAX, SHORT_MAX, feedEntries, truncateWords, useNewsMeta, type NewsEntry, type NewsMeta } from "@/lib/news-feed";

const LABEL = { wissenschaft: "Wissenschaft", bluesky: "Bluesky", podcast: "Podcast", blog: "Blog" } as const;

function Count({ value, max }: { value: number; max: number }) {
  return <span className={value > max ? "text-destructive" : "text-muted-foreground"}>{value} / {max} Zeichen</span>;
}

function Row({ entry, meta, isFeatured }: { entry: NewsEntry; meta?: NewsMeta | undefined; isFeatured: boolean }) {
  const qc = useQueryClient();
  const [short, setShort] = useState(meta?.short_text ?? "");
  const [help, setHelp] = useState(meta?.help_text ?? "");
  const [msg, setMsg] = useState("");
  const auto = truncateWords(entry.text, SHORT_MAX);

  async function save(extra: Partial<NewsMeta> = {}) {
    setMsg("");
    if (extra.featured) {
      const { error } = await supabase.from("news_meta").update({ featured: false }).eq("featured", true);
      if (error) return setMsg(error.message);
    }
    const { error } = await supabase.from("news_meta").upsert({ id: entry.id, short_text: short.trim(), help_text: help.trim(), featured: extra.featured ?? isFeatured });
    if (error) return setMsg(error.message);
    setMsg("Gespeichert");
    qc.invalidateQueries({ queryKey: ["news_meta"] });
  }

  return (
    <div className="border border-border bg-background p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[.14em] text-primary">{LABEL[entry.source]} · {entry.date}</p>
          <p className="mt-1 font-medium">{entry.title}</p>
        </div>
        <Button type="button" size="sm" variant={isFeatured ? "default" : "outline"} onClick={() => save({ featured: true })} disabled={isFeatured}>
          <Star className="size-4" /> {isFeatured ? "Hervorgehoben" : "Hervorheben"}
        </Button>
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div>
          <div className="flex justify-between text-xs"><Label htmlFor={`s-${entry.id}`}>Kurztext</Label><Count value={short.length} max={SHORT_MAX} /></div>
          <Textarea id={`s-${entry.id}`} value={short} onChange={(e) => setShort(e.target.value)} placeholder={`Leer = automatisch: ${auto}`} className="mt-1 min-h-24" />
        </div>
        <div>
          <div className="flex justify-between text-xs"><Label htmlFor={`h-${entry.id}`}>Wie planem helfen kann</Label><Count value={help.length} max={HELP_MAX} /></div>
          <Textarea id={`h-${entry.id}`} value={help} onChange={(e) => setHelp(e.target.value)} placeholder="Optional" className="mt-1 min-h-24" />
        </div>
      </div>
      <div className="mt-3 flex items-center gap-3"><Button type="button" size="sm" onClick={() => save()}><Save className="size-4" /> Speichern</Button><span className="text-sm text-muted-foreground">{msg}</span></div>
    </div>
  );
}

export function NewsMetaEditor() {
  const { text } = useSiteTexts();
  const meta = useNewsMeta();
  if (meta.isPending) return <p className="text-muted-foreground">Wird geladen …</p>;
  if (meta.isError) return <p className="text-destructive">Einträge konnten nicht geladen werden.</p>;
  const metas = meta.data;
  const featuredId = Object.values(metas).find((m) => m.featured)?.id ?? DEFAULT_FEATURED_ID;
  return (
    <div className="space-y-4">
      <p className="max-w-3xl text-sm text-muted-foreground">Diese Angaben steuern den Bereich „Aktuelles“ auf der Startseite. Bitte eigene Zusammenfassungen schreiben, keine Originaltexte übernehmen. Es kann immer nur ein Eintrag hervorgehoben sein.</p>
      {feedEntries(text).map((e) => <Row key={e.id} entry={e} meta={metas[e.id]} isFeatured={e.id === featuredId} />)}
    </div>
  );
}
