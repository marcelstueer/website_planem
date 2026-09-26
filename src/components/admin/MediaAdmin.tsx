import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Copy, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { imageLibrary } from "@/lib/image-library";
import { compressToWebp, MEDIA_ICONS } from "@/lib/media-icons";
import { imageFilterClass, SITE_IMAGE_COLUMNS, type SiteImageRow } from "@/lib/site-data";
import { ImageOverlayIcon } from "@/components/SiteImage";
import { ChartCard, type ChartRow } from "@/components/PageCharts";
import { cn } from "@/lib/utils";

const BUCKET = "site-images";
const TEN_YEARS = 60 * 60 * 24 * 365 * 10;

// Order in which image slots appear on the website (page by page, top to bottom).
const IMAGE_SLOTS: { key: string; label: string; page: string }[] = [
  { key: "home.hero", label: "Hauptbild", page: "Startseite" },
  { key: "home.mobility", label: "Karte Mobilität", page: "Startseite · Leistungen" },
  { key: "home.energy", label: "Karte Energieeffizienz", page: "Startseite · Leistungen" },
  { key: "about.portrait", label: "Profilbild", page: "Über planem" },
  { key: "home.ecology", label: "Natur, Mensch und Mobilität", page: "Über planem" },
  { key: "aktuelles.observation", label: "Beobachtung", page: "Aktuelles" },
];

export const CHART_PAGES: { path: string; label: string }[] = [
  { path: "", label: "Nicht anzeigen" },
  { path: "/", label: "Startseite" },
  { path: "/leistungen", label: "Leistungen" },
  { path: "/leistungen/mobilitaetskonzepte", label: "Mobilitätskonzepte" },
  { path: "/leistungen/energieberatung", label: "Energieberatung & BEG" },
  { path: "/ueber-planem", label: "Über planem" },
  { path: "/aktuelles", label: "Aktuelles" },
  { path: "/kontakt", label: "Kontakt" },
];

async function uploadFile(folder: string, file: File) {
  const path = `${folder}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, "-")}`;
  const { error } = await supabase.storage.from(BUCKET).upload(path, file, { upsert: true, contentType: file.type });
  if (error) throw error;
  const { data } = await supabase.storage.from(BUCKET).createSignedUrl(path, TEN_YEARS);
  if (!data?.signedUrl) throw new Error("Keine Adresse erhalten");
  return { path, url: data.signedUrl };
}

const selectClass = "h-9 w-full border border-input bg-background px-2 text-sm";

/* ---------------- Bildplätze ---------------- */

export function ImageEditor() {
  const queryClient = useQueryClient();
  const [busy, setBusy] = useState<string | null>(null);

  const query = useQuery({
    queryKey: ["admin_site_images"],
    queryFn: async () => {
      const { data, error } = await supabase.from("site_images").select(SITE_IMAGE_COLUMNS);
      if (error) throw error;
      return (data ?? []) as SiteImageRow[];
    },
  });
  const media = useMedia();

  function refresh() {
    queryClient.invalidateQueries({ queryKey: ["admin_site_images"] });
    queryClient.invalidateQueries({ queryKey: ["site_images"] });
  }

  async function update(key: string, patch: Partial<SiteImageRow>) {
    await supabase.from("site_images").update(patch).eq("key", key);
    refresh();
  }

  async function upload(key: string, file: File) {
    setBusy(key);
    try {
      const compressed = await compressToWebp(file);
      const { url, path } = await uploadFile(key, compressed);
      await supabase.from("media_items").insert({ kind: "image", url, path, name: compressed.name, size_bytes: compressed.size });
      await update(key, { url });
      queryClient.invalidateQueries({ queryKey: ["admin_media"] });
    } finally {
      setBusy(null);
    }
  }

  if (query.isLoading) return <p className="text-muted-foreground">Wird geladen …</p>;
  const rows = query.data ?? [];
  const order = (k: string) => {
    const i = IMAGE_SLOTS.findIndex((s) => s.key === k);
    return i === -1 ? 999 : i;
  };
  const sorted = [...rows].sort((a, b) => order(a.key) - order(b.key));
  const pickable = [
    ...(media.data ?? []).filter((m) => m.kind === "image").map((m) => ({ url: m.url, label: m.description || m.name })),
    ...imageLibrary,
  ];

  return (
    <div className="space-y-6">
      {sorted.map((row) => {
        const slot = IMAGE_SLOTS.find((s) => s.key === row.key);
        return (
          <div key={row.key} className="grid gap-6 border border-border p-5 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <p className="eyebrow">{slot?.page ?? "Weitere"}</p>
              <p className="mt-2 text-lg font-light">{slot?.label ?? row.key}</p>
              <p className="mt-4 text-xs text-muted-foreground">Live-Vorschau – so erscheint das Bild auf der Website</p>
              <div className="relative mt-2 aspect-[7/5] overflow-hidden bg-muted">
                {row.url ? (
                  <>
                    <img src={row.url} alt="" className={cn("h-full w-full object-cover transition", imageFilterClass(row))} />
                    <ImageOverlayIcon image={row} />
                  </>
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-muted-foreground">Standardbild aktiv (Filter wirken erst bei eigenem Bild)</div>
                )}
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor={`${row.key}-desc`}>Beschreibung (nur intern)</Label>
                <DescriptionField id={`${row.key}-desc`} value={row.description ?? ""} onSave={(description) => update(row.key, { description })} />
              </div>
              <div>
                <Label>Neues Bild hochladen (wird automatisch als WebP verkleinert)</Label>
                <input type="file" accept="image/*" className="mt-2 block w-full text-sm" onChange={(e) => { const f = e.target.files?.[0]; if (f) void upload(row.key, f); }} />
                {busy === row.key && <p className="mt-2 text-sm text-muted-foreground">Wird komprimiert und hochgeladen …</p>}
              </div>
              <details>
                <summary className="cursor-pointer text-sm text-muted-foreground underline underline-offset-4">Aus Bibliothek wählen</summary>
                <div className="mt-3 grid max-h-72 grid-cols-4 gap-2 overflow-y-auto">
                  {pickable.map((item) => (
                    <button key={item.url} type="button" title={item.label} onClick={() => void update(row.key, { url: item.url })} className="aspect-[4/3] overflow-hidden border border-border hover:border-primary">
                      <img src={item.url} alt={item.label} loading="lazy" className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              </details>
              <div className="space-y-3 border-t border-border pt-4">
                <FilterSwitch id={`${row.key}-gray`} label="Grau-Filter" checked={row.gray_filter} disabled={!!row.anthracite_filter} onChange={(v) => update(row.key, { gray_filter: v })} />
                <FilterSwitch id={`${row.key}-dim`} label="Transparent-Filter" checked={row.dim_filter} disabled={!!row.anthracite_filter} onChange={(v) => update(row.key, { dim_filter: v })} />
                <FilterSwitch id={`${row.key}-anth`} label="Anthrazit-Filter" checked={!!row.anthracite_filter} onChange={(v) => update(row.key, { anthracite_filter: v })} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Symbol über dem Bild</Label>
                  <select className={cn(selectClass, "mt-2")} value={row.overlay_icon ?? ""} onChange={(e) => update(row.key, { overlay_icon: e.target.value || null })}>
                    <option value="">Kein Symbol</option>
                    {Object.entries(MEDIA_ICONS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                  </select>
                </div>
                <div>
                  <Label>Symbolfarbe</Label>
                  <select className={cn(selectClass, "mt-2")} value={row.overlay_color ?? "white"} onChange={(e) => update(row.key, { overlay_color: e.target.value })}>
                    <option value="white">Weiß</option>
                    <option value="brand">planem-Türkis</option>
                  </select>
                </div>
              </div>
              {row.url && <Button variant="ghost" size="sm" onClick={() => update(row.key, { url: null })}>Auf Standardbild zurücksetzen</Button>}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function FilterSwitch({ id, label, checked, onChange, disabled }: { id: string; label: string; checked: boolean; onChange: (v: boolean) => void; disabled?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <Label htmlFor={id} className={disabled ? "opacity-50" : ""}>{label}</Label>
      <Switch id={id} checked={checked} disabled={disabled} onCheckedChange={onChange} />
    </div>
  );
}

function DescriptionField({ id, value, onSave }: { id: string; value: string; onSave: (v: string) => void }) {
  const [draft, setDraft] = useState(value);
  return (
    <Input id={id} value={draft} placeholder="z. B. Radweg Valencia, Karte Mobilität" onChange={(e) => setDraft(e.target.value)} onBlur={() => draft !== value && onSave(draft)} className="mt-2" />
  );
}

/* ---------------- Medien-Bibliothek ---------------- */

type MediaRow = { id: string; kind: string; url: string; path: string | null; name: string; description: string; size_bytes: number | null };

function useMedia() {
  return useQuery({
    queryKey: ["admin_media"],
    queryFn: async () => {
      const { data, error } = await supabase.from("media_items").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as MediaRow[];
    },
  });
}

export function MediaLibrary() {
  const queryClient = useQueryClient();
  const media = useMedia();
  const [status, setStatus] = useState("");

  async function handleFiles(files: FileList) {
    for (const file of Array.from(files)) {
      const isVideo = file.type.startsWith("video/");
      setStatus(`${file.name}: ${isVideo ? "wird hochgeladen" : "wird komprimiert"} …`);
      try {
        const out = isVideo ? file : await compressToWebp(file);
        const { url, path } = await uploadFile("library", out);
        await supabase.from("media_items").insert({ kind: isVideo ? "video" : "image", url, path, name: out.name, size_bytes: out.size });
        setStatus(`${file.name}: fertig${!isVideo ? ` (${kb(file.size)} → ${kb(out.size)})` : ""}`);
      } catch (e) {
        setStatus(`${file.name}: Fehler – ${(e as Error).message}`);
      }
    }
    queryClient.invalidateQueries({ queryKey: ["admin_media"] });
  }

  async function remove(row: MediaRow) {
    if (!confirm("Datei endgültig löschen?")) return;
    if (row.path) await supabase.storage.from(BUCKET).remove([row.path]);
    await supabase.from("media_items").delete().eq("id", row.id);
    queryClient.invalidateQueries({ queryKey: ["admin_media"] });
  }

  async function saveDesc(id: string, description: string) {
    await supabase.from("media_items").update({ description }).eq("id", id);
    queryClient.invalidateQueries({ queryKey: ["admin_media"] });
  }

  return (
    <div>
      <div className="border border-dashed border-border p-6">
        <Label>Bilder und Videos hochladen</Label>
        <p className="mt-1 text-sm text-muted-foreground">Bilder werden automatisch auf max. 2400 px verkleinert und als WebP gespeichert. Videos werden unverändert gespeichert.</p>
        <input type="file" multiple accept="image/*,video/*" className="mt-4 block w-full text-sm" onChange={(e) => e.target.files && void handleFiles(e.target.files)} />
        {status && <p className="mt-3 text-sm text-muted-foreground">{status}</p>}
      </div>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {(media.data ?? []).map((row) => (
          <div key={row.id} className="border border-border">
            <div className="aspect-[4/3] bg-muted">
              {row.kind === "video" ? <video src={row.url} controls className="h-full w-full object-cover" /> : <img src={row.url} alt={row.description} loading="lazy" className="h-full w-full object-cover" />}
            </div>
            <div className="space-y-2 p-3">
              <p className="truncate text-xs text-muted-foreground">{row.kind === "video" ? "Video" : "Bild"} · {row.size_bytes ? kb(row.size_bytes) : ""} · {row.name}</p>
              <DescriptionField id={row.id} value={row.description} onSave={(v) => saveDesc(row.id, v)} />
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => navigator.clipboard.writeText(row.url)}><Copy /> Adresse</Button>
                <Button size="sm" variant="ghost" onClick={() => remove(row)}><Trash2 /> Löschen</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {media.data?.length === 0 && <p className="mt-6 text-muted-foreground">Noch keine eigenen Medien hochgeladen.</p>}
      <h3 className="mt-14 text-2xl font-extralight">Fest eingebaute Bilder ({imageLibrary.length})</h3>
      <p className="mt-1 text-sm text-muted-foreground">Fotos und KI-generierte Bilder, die fest in der Website liegen. Sie sind bei jedem Bildplatz unter „Aus Bibliothek wählen“ verfügbar.</p>
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {imageLibrary.map((img) => (
          <div key={img.url} className="border border-border">
            <div className="aspect-[4/3] bg-muted"><img src={img.url} alt={img.label} loading="lazy" className="h-full w-full object-cover" /></div>
            <p className="p-3 text-xs text-muted-foreground">{img.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const kb = (b: number) => (b > 1_000_000 ? `${(b / 1_000_000).toFixed(1)} MB` : `${Math.round(b / 1000)} KB`);

/* ---------------- Diagramme ---------------- */

function parseData(text: string) {
  return text.split("\n").map((l) => l.split(/[;\t]/)).filter((p) => p.length >= 2 && (p[0] ?? "").trim())
    .map(([label = "", value = ""]) => ({ label: label.trim(), value: Number(value.trim().replace(",", ".")) || 0 }));
}
const dataToText = (d: unknown) => (Array.isArray(d) ? d.map((p: { label: string; value: number }) => `${p.label}; ${p.value}`).join("\n") : "");

export function ChartEditor() {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ["admin_charts"],
    queryFn: async () => {
      const { data, error } = await supabase.from("charts").select("*").order("page").order("position");
      if (error) throw error;
      return (data ?? []) as ChartRow[];
    },
  });

  function refresh() {
    queryClient.invalidateQueries({ queryKey: ["admin_charts"] });
    queryClient.invalidateQueries({ queryKey: ["charts"] });
  }

  async function create() {
    await supabase.from("charts").insert({ title: "Neues Diagramm", chart_type: "bar", data: [{ label: "2024", value: 80 }, { label: "2026", value: 64 }] });
    refresh();
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="max-w-2xl text-sm text-muted-foreground">Diagramme erscheinen im Abschnitt „Zahlen und Fakten“ am Ende der gewählten Seite. Werte eingeben oder eine fertige Grafik hochladen.</p>
        <Button onClick={create}>Neues Diagramm</Button>
      </div>
      <div className="mt-8 space-y-6">
        {(query.data ?? []).map((c) => <ChartForm key={c.id} chart={c} onChange={refresh} />)}
      </div>
    </div>
  );
}

function ChartForm({ chart, onChange }: { chart: ChartRow; onChange: () => void }) {
  const [draft, setDraft] = useState({ ...chart, dataText: dataToText(chart.data) });
  const [saved, setSaved] = useState(false);
  const preview: ChartRow = { ...draft, data: parseData(draft.dataText) };
  const set = (patch: Partial<typeof draft>) => setDraft({ ...draft, ...patch });

  async function save() {
    const { dataText, id, ...rest } = draft;
    await supabase.from("charts").update({
      title: rest.title, subtitle: rest.subtitle, chart_type: rest.chart_type, unit: rest.unit, icon: rest.icon,
      image_url: rest.image_url, source: rest.source, page: rest.page, position: rest.position, data: parseData(dataText),
    }).eq("id", id);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    onChange();
  }

  async function remove() {
    if (!confirm("Diagramm löschen?")) return;
    await supabase.from("charts").delete().eq("id", chart.id);
    onChange();
  }

  async function uploadImage(file: File) {
    const { url } = await uploadFile("charts", await compressToWebp(file));
    set({ image_url: url, chart_type: "image" });
  }

  return (
    <div className="grid gap-6 border border-border p-5 lg:grid-cols-2">
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2"><Label>Titel</Label><Input className="mt-1" value={draft.title} onChange={(e) => set({ title: e.target.value })} /></div>
          <div className="col-span-2"><Label>Untertitel</Label><Input className="mt-1" value={draft.subtitle} onChange={(e) => set({ subtitle: e.target.value })} /></div>
          <div><Label>Art</Label>
            <select className={cn(selectClass, "mt-1")} value={draft.chart_type} onChange={(e) => set({ chart_type: e.target.value })}>
              <option value="bar">Balken</option><option value="line">Linie</option><option value="pie">Kreis</option><option value="image">Fertige Grafik</option>
            </select>
          </div>
          <div><Label>Symbol</Label>
            <select className={cn(selectClass, "mt-1")} value={draft.icon ?? ""} onChange={(e) => set({ icon: e.target.value || null })}>
              <option value="">Kein Symbol</option>
              {Object.entries(MEDIA_ICONS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
            </select>
          </div>
          <div><Label>Seite</Label>
            <select className={cn(selectClass, "mt-1")} value={draft.page} onChange={(e) => set({ page: e.target.value })}>
              {CHART_PAGES.map((p) => <option key={p.path} value={p.path}>{p.label}</option>)}
            </select>
          </div>
          <div><Label>Reihenfolge</Label><Input type="number" className="mt-1" value={draft.position} onChange={(e) => set({ position: Number(e.target.value) })} /></div>
        </div>
        {draft.chart_type === "image" ? (
          <div><Label>Grafik hochladen</Label><input type="file" accept="image/*" className="mt-1 block w-full text-sm" onChange={(e) => { const f = e.target.files?.[0]; if (f) void uploadImage(f); }} /></div>
        ) : (
          <>
            <div><Label>Werte (je Zeile: Beschriftung; Zahl)</Label><Textarea rows={5} className="mt-1 font-mono text-sm" value={draft.dataText} onChange={(e) => set({ dataText: e.target.value })} /></div>
            <div><Label>Einheit</Label><Input className="mt-1" placeholder="z. B. %, kWh, Stellplätze" value={draft.unit} onChange={(e) => set({ unit: e.target.value })} /></div>
          </>
        )}
        <div><Label>Quelle</Label><Input className="mt-1" value={draft.source} onChange={(e) => set({ source: e.target.value })} /></div>
        <div className="flex gap-2 pt-2">
          <Button size="sm" onClick={save}>{saved ? "Gespeichert" : "Speichern"}</Button>
          <Button size="sm" variant="ghost" onClick={remove}><Trash2 /> Löschen</Button>
        </div>
      </div>
      <div><p className="mb-2 text-xs text-muted-foreground">Vorschau</p><ChartCard chart={preview} /></div>
    </div>
  );
}
