import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent, type ReactNode, type ComponentType } from "react";
import {
  MoreHorizontal,
  
  CheckCircle2,
  ClipboardList,
  Euro,
  Factory,
  Landmark,
  Leaf,
  Lightbulb,
  Mail,
  MapPin,
  Ruler,
  PlugZap,
  Send,
  ShieldAlert,
  Timer,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { SeoSection } from "@/components/SeoSection";
import { getAttribution } from "@/lib/tracking";

export const Route = createFileRoute("/kontakt")({
  head: () => ({
    meta: [
      { title: "Kontakt & Förderfähigkeits-Check | planem Münster" },
      {
        name: "description",
        content:
          "In vier Schritten zur kostenfreien Förderfähigkeits-Prüfung: Mobilität, Energieeffizienz und Fördermittel mit planem in Münster.",
      },
      { property: "og:title", content: "Kontakt & Förderfähigkeits-Check | planem" },
      {
        property: "og:description",
        content: "Sprechen Sie mit planem über Ihr Mobilitäts- oder Energieprojekt.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

type Option = { value: string; label: string; hint?: string; icon: ComponentType<{ className?: string }> };

const SEGMENTS: Option[] = [
  { value: "unternehmen", label: "Unternehmen / Gewerbebetrieb", hint: "Produktion, Handel, Dienstleistung", icon: Factory },
  { value: "kommune", label: "Kommune / Öffentliche Einrichtung", hint: "Verwaltung, Schulen, Liegenschaften", icon: Landmark },
  { value: "architektur", label: "Architekt / Planungsbüro", hint: "Projektentwicklung und Genehmigung", icon: Ruler },
  { value: "sonstige", label: "Sonstige", hint: "Passt in keine der Kategorien", icon: MoreHorizontal },
];

const GOALS: Option[] = [
  { value: "energiekosten", label: "Energiekosten senken & CO₂ einsparen", icon: Leaf },
  { value: "foerdermittel", label: "Maximale Bundesfördermittel (KfW/BAFA) sichern", icon: Euro },
  { value: "mobilitaet", label: "Nachhaltige Mobilitätskonzepte (z. B. Ladeinfrastruktur)", icon: PlugZap },
  { value: "pflichten", label: "Gesetzliche Vorgaben / Sanierungspflichten erfüllen", icon: ClipboardList },
];

const STAGES: Option[] = [
  { value: "idee", label: "Ideenphase / Erste Orientierung", hint: "Noch offen, erste Einschätzung gesucht", icon: Lightbulb },
  { value: "planung", label: "Konkrete Planung", hint: "Baustart in 6–12 Monaten", icon: Timer },
  { value: "akut", label: "Akuter Handlungsbedarf", hint: "z. B. Sanierungsauflage oder Frist", icon: ShieldAlert },
];

const labelOf = (options: Option[], value: string) => options.find((o) => o.value === value)?.label ?? value;
const NONE = "nicht angegeben";

function ContactPage() {
  const [segment, setSegment] = useState("");
  const [goals, setGoals] = useState<string[]>([]);
  const [stage, setStage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  function toggleGoal(value: string) {
    setGoals((prev) => (prev.includes(value) ? prev.filter((g) => g !== value) : [...prev, value]));
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending");
    const data = new FormData(form);
    const notes = String(data.get("message") ?? "").trim();
    const summary = [
      `Gruppe: ${segment ? labelOf(SEGMENTS, segment) : NONE}`,
      `Ziele: ${goals.length ? goals.map((g) => labelOf(GOALS, g)).join(", ") : NONE}`,
      `Projektstadium: ${stage ? labelOf(STAGES, stage) : NONE}`,
      `Anliegen: ${notes}`,
    ].join("\n");

    const attribution = getAttribution();
    const id = crypto.randomUUID();
    const { error } = await supabase.from("contact_requests").insert({
      id,
      request_type: "angebot",
      name: String(data.get("name")).trim(),
      email: String(data.get("email")).trim(),
      phone: String(data.get("phone") ?? "").trim() || null,
      organization: String(data.get("organization") ?? "").trim() || null,
      message: summary,
      segment: segment || null,
      goals,
      project_stage: stage || null,
      privacy_accepted: data.get("privacy_accepted") === "on",
      lead_source: attribution.lead_source,
      referrer: attribution.referrer,
      landing_page: attribution.landing_page,
      analytics_consent: attribution.analytics_consent,
    });

    if (error) {
      console.error(error);
      setStatus("error");
      return;
    }
    // Notification email to info@planem.de (runs on the Lovable-hosted site, also when the page is on IONOS).
    const notifyBase = window.location.hostname.endsWith("lovable.app") || window.location.hostname === "localhost"
      ? ""
      : "https://planem.lovable.app";
    fetch(`${notifyBase}/api/public/contact-notify`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ id }),
    }).catch((e) => console.error(e));
    setStatus("success");
    form.reset();
  }

  function restart() {
    setSegment("");
    setGoals([]);
    setStage("");
    setStatus("idle");
  }

  return (
    <><section className="py-16 md:py-24">
      <div className="site-container">
        <div className="grid gap-12 lg:grid-cols-[.75fr_1.25fr]">
          <aside>
            <p className="eyebrow">Kontakt</p>
            <h1 className="mt-5 text-5xl font-extralight leading-tight md:text-6xl">Erzählen Sie von Ihrem Vorhaben.</h1>
            <p className="mt-6 max-w-md text-lg font-light leading-8 text-muted-foreground">
              Schreiben Sie uns kurz Ihr Anliegen – im Anschluss erhalten Sie eine erste, kostenfreie Einschätzung für
              die nächsten Schritte in Ihrem Vorhaben.
            </p>
            <div className="mt-10 space-y-5 border-t border-border pt-7 text-sm">
              <a href="mailto:info@planem.de" className="flex items-center gap-3 font-medium hover:text-primary">
                <Mail className="size-5 text-primary" />
                info@planem.de
              </a>
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-5 text-primary" />
                <address className="not-italic leading-6">
                  planem | Ingenieur Marcel Stüer
                  <br />
                  Bohlweg 21
                  <br />
                  48147 Münster
                </address>
              </div>
            </div>
          </aside>

          <div className="border border-border bg-card p-6 md:p-10">
            {status === "success" ? (
              <div className="flex min-h-[520px] flex-col items-start justify-center">
                <CheckCircle2 className="size-12 text-primary" />
                <h2 className="mt-6 text-3xl font-light">Vielen Dank, wir melden uns bei Ihnen.</h2>
                <p className="mt-4 max-w-md leading-7 text-muted-foreground">
                  Ihre Angaben wurden sicher übermittelt. planem prüft Ihr Vorhaben und meldet sich mit einer ersten
                  Einschätzung bei Ihnen.
                </p>
                <Button className="mt-7" variant="outline" onClick={restart}>
                  Weitere Anfrage senden
                </Button>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-10">
                <div className="space-y-5">
                  <h2 className="text-2xl font-light leading-snug md:text-3xl">Ihre Kontaktdaten</h2>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field id="name" label="Name *">
                      <Input id="name" name="name" required minLength={2} maxLength={120} autoComplete="name" />
                    </Field>
                    <Field id="email" label="E-Mail *">
                      <Input id="email" name="email" type="email" required maxLength={254} autoComplete="email" />
                    </Field>
                    <Field id="organization" label="Unternehmen / Organisation (optional)">
                      <Input id="organization" name="organization" maxLength={160} autoComplete="organization" />
                    </Field>
                    <Field id="phone" label="Telefon (optional)">
                      <Input id="phone" name="phone" type="tel" maxLength={50} autoComplete="tel" />
                    </Field>
                  </div>
                  <Field id="message" label="Ihr Anliegen *">
                    <Textarea
                      id="message"
                      name="message"
                      required
                      minLength={5}
                      maxLength={4500}
                      className="min-h-28"
                      placeholder="Worum geht es? Gebäudetyp, Fläche, Fristen, vorliegende Unterlagen …"
                    />
                  </Field>
                </div>

                <div className="space-y-8 border-t border-border pt-8">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-primary">Optional</p>
                    <h2 className="mt-2 text-xl font-light md:text-2xl">Hilft uns bei der Einordnung</h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Diese Fragen können Sie gern überspringen.
                    </p>
                  </div>

                  <fieldset>
                    <legend className="text-sm font-medium">
                      Welcher Gruppe gehören Sie an? <span className="font-normal text-muted-foreground">(optional)</span>
                    </legend>
                    <div className="mt-3 grid gap-3 sm:grid-cols-2">
                      {SEGMENTS.map((option) => (
                        <Card
                          key={option.value}
                          option={option}
                          selected={segment === option.value}
                          onSelect={() => setSegment(segment === option.value ? "" : option.value)}
                        />
                      ))}
                    </div>
                  </fieldset>

                  <fieldset>
                    <legend className="text-sm font-medium">
                      Welches Ziel verfolgen Sie primär mit Ihrem Nichtwohngebäude?{" "}
                      <span className="font-normal text-muted-foreground">(optional, Mehrfachauswahl möglich)</span>
                    </legend>
                    <div className="mt-3 grid gap-3 sm:grid-cols-2">
                      {GOALS.map((option) => (
                        <Card
                          key={option.value}
                          option={option}
                          selected={goals.includes(option.value)}
                          onSelect={() => toggleGoal(option.value)}
                        />
                      ))}
                    </div>
                  </fieldset>

                  <fieldset>
                    <legend className="text-sm font-medium">
                      In welchem Stadium befindet sich Ihr Projekt?{" "}
                      <span className="font-normal text-muted-foreground">(optional)</span>
                    </legend>
                    <div className="mt-3 grid gap-3">
                      {STAGES.map((option) => (
                        <Card
                          key={option.value}
                          option={option}
                          selected={stage === option.value}
                          onSelect={() => setStage(stage === option.value ? "" : option.value)}
                        />
                      ))}
                    </div>
                  </fieldset>
                </div>

                <div className="space-y-5 border-t border-border pt-6">
                  <label className="flex items-start gap-3 text-sm leading-6 text-muted-foreground">
                    <input type="checkbox" name="privacy_accepted" required className="mt-1 size-4 accent-primary" />
                    <span>
                      Ich stimme der Verarbeitung meiner Angaben zur Bearbeitung meiner Anfrage zu. Weitere
                      Informationen stehen in der{" "}
                      <Link to="/datenschutz" className="font-medium text-foreground underline underline-offset-4">
                        Datenschutzerklärung
                      </Link>
                      .
                    </span>
                  </label>
                  {status === "error" && (
                    <p role="alert" className="text-sm text-destructive">
                      Die Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es erneut oder schreiben Sie an
                      info@planem.de.
                    </p>
                  )}
                  <Button type="submit" size="lg" disabled={status === "sending"}>
                    {status === "sending" ? "Wird gesendet …" : "Anfrage senden"}
                    <Send />
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section><SeoSection /></>
  );
}

function Card({ option, selected, onSelect }: { option: Option; selected: boolean; onSelect: () => void }) {
  const Icon = option.icon;
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={cn(
        "group flex h-full items-start gap-4 border border-input bg-background p-5 text-left transition-all duration-300 hover:border-primary/60 hover:bg-secondary/40",
        selected && "border-primary bg-secondary shadow-[0_0_0_1px_var(--color-primary)]",
      )}
    >
      <span
        className={cn(
          "flex size-10 shrink-0 items-center justify-center border border-border text-muted-foreground transition-colors duration-300",
          selected && "border-primary bg-primary text-primary-foreground",
        )}
      >
        <Icon className="size-5" />
      </span>
      <span className="space-y-1">
        <span className="block text-sm font-medium leading-6 text-foreground">{option.label}</span>
        {option.hint && <span className="block text-sm leading-6 text-muted-foreground">{option.hint}</span>}
      </span>
    </button>
  );
}

function Field({ id, label, children }: { id: string; label: string; children: ReactNode }) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      {children}
    </div>
  );
}
