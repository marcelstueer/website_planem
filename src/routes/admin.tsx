import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Image as ImageIcon, Inbox, Info, LogOut, Save, Type } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { claimAdmin } from "@/lib/admin.functions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/admin")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Redaktion | planem" },
      { name: "description", content: "Interner Redaktionsbereich für Texte, Bilder und Anfragen." },
      { name: "robots", content: "noindex,nofollow" },
      { property: "og:title", content: "Redaktion | planem" },
      { property: "og:description", content: "Interner Bereich." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminPage,
});

const TEXT_LABELS: Record<string, string> = {
  "seo.shared": "SEO-Abschnitt (alle Unterseiten)",
  "home.hero.eyebrow": "Startseite – kleine Überschrift",
  "home.hero.title": "Startseite – Titel Zeile 1",
  "home.hero.title.accent": "Startseite – Titel Zeile 2 (farbig)",
  "home.hero.text": "Startseite – Einleitungstext",
  "home.cta.title": "Startseite – Abschluss-Aufruf",
  "about.person.name": "Über planem – Name",
  "about.person.role": "Über planem – Rolle",
};

const IMAGE_LABELS: Record<string, string> = {
  "home.hero": "Startseite – Hauptbild",
  "home.mobility": "Startseite – Bild Mobilität",
  "home.energy": "Startseite – Bild Energieeffizienz",
  "about.portrait": "Über planem – Profilbild",
};

function AdminPage() {
  const [session, setSession] = useState<unknown>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setReady(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, next) => setSession(next));
    return () => sub.subscription.unsubscribe();
  }, []);

  if (!ready) return <div className="site-container py-24 text-muted-foreground">Wird geladen …</div>;
  if (!session) return <LoginPanel />;
  return <Dashboard />;
}

function LoginPanel() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"login" | "register">("login");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");
    const result =
      mode === "login"
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({ email, password, options: { emailRedirectTo: window.location.origin + "/admin" } });
    setBusy(false);
    if (result.error) {
      setError(result.error.message);
      return;
    }
    if (result.data.session) {
      try {
        await claimAdmin();
      } catch {
        /* ein Administrator existiert bereits */
      }
    }
  }

  return (
    <section className="py-20 md:py-28">
      <div className="site-container max-w-md">
        <p className="eyebrow">Interner Bereich</p>
        <h1 className="mt-5 text-4xl font-extralight">Redaktion</h1>
        <form onSubmit={submit} className="mt-8 space-y-4">
          <div>
            <Label htmlFor="email">E-Mail</Label>
            <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-2" />
          </div>
          <div>
            <Label htmlFor="password">Passwort</Label>
            <Input id="password" type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} className="mt-2" />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button type="submit" disabled={busy} className="w-full">
            {mode === "login" ? "Anmelden" : "Zugang anlegen"}
          </Button>
          <button type="button" className="text-sm text-muted-foreground underline underline-offset-4" onClick={() => setMode(mode === "login" ? "register" : "login")}>
            {mode === "login" ? "Noch kein Zugang? Jetzt anlegen" : "Ich habe bereits einen Zugang"}
          </button>
        </form>
      </div>
    </section>
  );
}

function Dashboard() {
  const queryClient = useQueryClient();

  const roles = useQuery({
    queryKey: ["my_roles"],
    queryFn: async () => {
      const { data } = await supabase.from("user_roles").select("role");
      return (data ?? []).map((row) => row.role as string);
    },
  });

  const isAdmin = roles.data?.includes("admin");

  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
  }

  return (
    <section className="py-14 md:py-20">
      <div className="site-container">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="eyebrow">Interner Bereich</p>
            <h1 className="mt-4 text-4xl font-extralight">Redaktion</h1>
          </div>
          <Button variant="outline" onClick={signOut}>
            <LogOut /> Abmelden
          </Button>
        </div>

        {roles.isLoading ? (
          <p className="mt-10 text-muted-foreground">Wird geladen …</p>
        ) : !isAdmin ? (
          <p className="mt-10 max-w-xl text-muted-foreground">
            Für dieses Konto sind keine Redaktionsrechte hinterlegt. Bitte melden Sie sich mit dem Administrator-Konto an.
          </p>
        ) : (
          <Tabs defaultValue="texte" className="mt-10">
            <TabsList>
              <TabsTrigger value="texte"><Type className="mr-2 size-4" /> Texte</TabsTrigger>
              <TabsTrigger value="bilder"><ImageIcon className="mr-2 size-4" /> Bilder</TabsTrigger>
              <TabsTrigger value="anfragen"><Inbox className="mr-2 size-4" /> Anfragen</TabsTrigger>
            </TabsList>
            <TabsContent value="texte" className="mt-8"><TextEditor /></TabsContent>
            <TabsContent value="bilder" className="mt-8"><ImageEditor /></TabsContent>
            <TabsContent value="anfragen" className="mt-8"><RequestList /></TabsContent>
          </Tabs>
        )}
      </div>
    </section>
  );
}

function TextEditor() {
  const queryClient = useQueryClient();
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState<string | null>(null);

  const query = useQuery({
    queryKey: ["admin_site_content"],
    queryFn: async () => {
      const { data, error } = await supabase.from("site_content").select("key,value").order("key");
      if (error) throw error;
      return data ?? [];
    },
  });

  async function save(key: string) {
    const value = drafts[key] ?? "";
    const { error } = await supabase.from("site_content").update({ value }).eq("key", key);
    if (error) return;
    setSaved(key);
    queryClient.invalidateQueries({ queryKey: ["site_content"] });
    setTimeout(() => setSaved(null), 2000);
  }

  if (query.isLoading) return <p className="text-muted-foreground">Wird geladen …</p>;

  return (
    <div className="space-y-8">
      {(query.data ?? []).map((row) => {
        const value = drafts[row.key] ?? row.value;
        const long = value.length > 120;
        return (
          <div key={row.key} className="border border-border p-5">
            <Label htmlFor={row.key}>{TEXT_LABELS[row.key] ?? row.key}</Label>
            {long ? (
              <Textarea id={row.key} rows={12} value={value} onChange={(e) => setDrafts({ ...drafts, [row.key]: e.target.value })} className="mt-3" />
            ) : (
              <Input id={row.key} value={value} onChange={(e) => setDrafts({ ...drafts, [row.key]: e.target.value })} className="mt-3" />
            )}
            <Button size="sm" className="mt-4" onClick={() => save(row.key)}>
              <Save /> {saved === row.key ? "Gespeichert" : "Speichern"}
            </Button>
          </div>
        );
      })}
    </div>
  );
}

function ImageEditor() {
  const queryClient = useQueryClient();
  const [busy, setBusy] = useState<string | null>(null);

  const query = useQuery({
    queryKey: ["admin_site_images"],
    queryFn: async () => {
      const { data, error } = await supabase.from("site_images").select("key,url,gray_filter,dim_filter").order("key");
      if (error) throw error;
      return data ?? [];
    },
  });

  function refresh() {
    queryClient.invalidateQueries({ queryKey: ["admin_site_images"] });
    queryClient.invalidateQueries({ queryKey: ["site_images"] });
  }

  async function upload(key: string, file: File) {
    setBusy(key);
    const path = `${key}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, "-")}`;
    const { error } = await supabase.storage.from("site-images").upload(path, file, { upsert: true });
    if (!error) {
      const { data } = await supabase.storage.from("site-images").createSignedUrl(path, 60 * 60 * 24 * 365 * 10);
      if (data?.signedUrl) {
        await supabase.from("site_images").update({ url: data.signedUrl }).eq("key", key);
        refresh();
      }
    }
    setBusy(null);
  }

  async function toggle(key: string, field: "gray_filter" | "dim_filter", value: boolean) {
    await supabase.from("site_images").update(field === "gray_filter" ? { gray_filter: value } : { dim_filter: value }).eq("key", key);
    refresh();
  }

  async function reset(key: string) {
    await supabase.from("site_images").update({ url: null }).eq("key", key);
    refresh();
  }

  if (query.isLoading) return <p className="text-muted-foreground">Wird geladen …</p>;

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {(query.data ?? []).map((row) => (
        <div key={row.key} className="border border-border p-5">
          <p className="font-medium">{IMAGE_LABELS[row.key] ?? row.key}</p>
          <div className="mt-4 aspect-[7/5] overflow-hidden bg-muted">
            {row.url ? (
              <img src={row.url} alt="" className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-muted-foreground">Standardbild aktiv</div>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            className="mt-4 block w-full text-sm"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) void upload(row.key, file);
            }}
          />
          {busy === row.key && <p className="mt-2 text-sm text-muted-foreground">Wird hochgeladen …</p>}
          <details className="mt-4">
            <summary className="cursor-pointer text-sm text-muted-foreground underline underline-offset-4">Aus Bildbibliothek wählen</summary>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {imageLibrary.map((item) => (
                <button
                  key={item.url}
                  type="button"
                  title={item.label}
                  onClick={() => void pick(row.key, item.url)}
                  className="group relative aspect-[4/3] overflow-hidden border border-border transition hover:border-primary"
                >
                  <img src={item.url} alt={item.label} loading="lazy" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </details>
          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor={`${row.key}-gray`}>Grau-Filter</Label>
              <Switch id={`${row.key}-gray`} checked={row.gray_filter} onCheckedChange={(v) => toggle(row.key, "gray_filter", v)} />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor={`${row.key}-dim`}>Transparent-Filter</Label>
              <Switch id={`${row.key}-dim`} checked={row.dim_filter} onCheckedChange={(v) => toggle(row.key, "dim_filter", v)} />
            </div>
          </div>
          {row.url && (
            <Button variant="ghost" size="sm" className="mt-3" onClick={() => reset(row.key)}>
              Auf Standardbild zurücksetzen
            </Button>
          )}
        </div>
      ))}
    </div>
  );
}

function RequestList() {
  const query = useQuery({
    queryKey: ["admin_requests"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("contact_requests")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  return (
    <div>
      <div className="flex gap-3 border border-border bg-secondary p-4 text-sm text-muted-foreground">
        <Info className="mt-0.5 size-4 shrink-0 text-primary" />
        <p>
          E-Mail-Weiterleitung an info@planem.de ist noch nicht aktiv – dafür muss zuerst Ihre eigene Domain als
          Absender bestätigt werden. Alle Anfragen werden sicher hier gespeichert.
        </p>
      </div>
      {query.isLoading ? (
        <p className="mt-8 text-muted-foreground">Wird geladen …</p>
      ) : (query.data ?? []).length === 0 ? (
        <p className="mt-8 text-muted-foreground">Noch keine Anfragen eingegangen.</p>
      ) : (
        <div className="mt-8 space-y-4">
          {(query.data ?? []).map((row) => (
            <article key={row.id} className="border border-border p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="text-lg font-light">
                  {row.name} {row.organization ? `– ${row.organization}` : ""}
                </p>
                <p className="text-sm text-muted-foreground">{new Date(row.created_at).toLocaleString("de-DE")}</p>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                {row.email}
                {row.phone ? ` · ${row.phone}` : ""}
                {row.lead_source ? ` · Herkunft: ${row.lead_source}` : ""}
              </p>
              {row.message && <p className="mt-4 whitespace-pre-line text-sm leading-6">{row.message}</p>}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
