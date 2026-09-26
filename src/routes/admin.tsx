import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { BarChart3, Film, Image as ImageIcon, Inbox, Info, LogOut, Save, Type } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartEditor, ImageEditor, MediaLibrary } from "@/components/admin/MediaAdmin";

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
            <TabsList className="flex-wrap">
              <TabsTrigger value="texte"><Type className="mr-2 size-4" /> Texte</TabsTrigger>
              <TabsTrigger value="bilder"><ImageIcon className="mr-2 size-4" /> Bilder</TabsTrigger>
              <TabsTrigger value="medien"><Film className="mr-2 size-4" /> Medien</TabsTrigger>
              <TabsTrigger value="diagramme"><BarChart3 className="mr-2 size-4" /> Diagramme</TabsTrigger>
              <TabsTrigger value="anfragen"><Inbox className="mr-2 size-4" /> Anfragen</TabsTrigger>
            </TabsList>
            <TabsContent value="texte" className="mt-8"><TextEditor /></TabsContent>
            <TabsContent value="bilder" className="mt-8"><ImageEditor /></TabsContent>
            <TabsContent value="medien" className="mt-8"><MediaLibrary /></TabsContent>
            <TabsContent value="diagramme" className="mt-8"><ChartEditor /></TabsContent>
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
