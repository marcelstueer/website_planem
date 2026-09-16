import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent, type ReactNode, type ComponentType } from "react";
import {
  ArrowLeft,
  ArrowRight,
  
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

const STEP_TITLES = [
  "Welcher Gruppe gehören Sie an?",
  "Welches Ziel verfolgen Sie primär mit Ihrem Nichtwohngebäude?",
  "In welchem Stadium befindet sich Ihr Projekt?",
  "Fast geschafft! Wohin dürfen wir das Ergebnis Ihrer Förderfähigkeits-Prüfung senden?",
];

const labelOf = (options: Option[], value: string) => options.find((o) => o.value === value)?.label ?? value;

function ContactPage() {
  const [step, setStep] = useState(0);
  const [segment, setSegment] = useState("");
  const [goals, setGoals] = useState<string[]>([]);
  const [stage, setStage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const canContinue = step === 0 ? Boolean(segment) : step === 1 ? goals.length > 0 : step === 2 ? Boolean(stage) : true;

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
      `Gruppe: ${labelOf(SEGMENTS, segment)}`,
      `Ziele: ${goals.map((g) => labelOf(GOALS, g)).join(", ")}`,
      `Projektstadium: ${labelOf(STAGES, stage)}`,
      notes ? `Besonderheiten: ${notes}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    const { error } = await supabase.from("contact_requests").insert({
      request_type: "angebot",
      name: String(data.get("name")).trim(),
      email: String(data.get("email")).trim(),
      phone: String(data.get("phone") ?? "").trim() || null,
      organization: String(data.get("organization")).trim(),
      message: summary,
      segment,
      goals,
      project_stage: stage,
      privacy_accepted: data.get("privacy_accepted") === "on",
    });

    if (error) {
      console.error(error);
      setStatus("error");
      return;
    }
    setStatus("success");
    form.reset();
  }

  function restart() {
    setSegment("");
    setGoals([]);
    setStage("");
    setStep(0);
    setStatus("idle");
  }

  return (
    <section className="py-16 md:py-24">
      <div className="site-container">
        <div className="grid gap-12 lg:grid-cols-[.75fr_1.25fr]">
          <aside>
            <p className="eyebrow">Kontakt</p>
            <h1 className="mt-5 text-5xl font-extralight leading-tight md:text-6xl">Erzählen Sie von Ihrem Vorhaben.</h1>
            <p className="mt-6 max-w-md text-lg font-light leading-8 text-muted-foreground">
              In vier kurzen Schritten erfassen wir Ihr Projekt – im Anschluss erhalten Sie eine erste, kostenfreie
              Einschätzung zur Förderfähigkeit.
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
                <h2 className="mt-6 text-3xl font-light">Vielen Dank für Ihre Anfrage.</h2>
                <p className="mt-4 max-w-md leading-7 text-muted-foreground">
                  Ihre Angaben wurden sicher übermittelt. planem prüft Ihr Vorhaben und meldet sich mit einer ersten
                  Einschätzung bei Ihnen.
                </p>
                <Button className="mt-7" variant="outline" onClick={restart}>
                  Weitere Anfrage senden
                </Button>
              </div>
            ) : (
              <form onSubmit={submit} className="flex min-h-[520px] flex-col">
                <div>
                  <div className="flex items-center justify-between text-xs font-medium tracking-wide text-muted-foreground">
                    <span>
                      Schritt {step + 1} von {STEP_TITLES.length}
                    </span>
                    <span>{Math.round(((step + 1) / STEP_TITLES.length) * 100)} %</span>
                  </div>
                  <div className="mt-2 h-1.5 w-full overflow-hidden bg-secondary">
                    <div
                      className="h-full bg-primary transition-all duration-500 ease-out"
                      style={{ width: `${((step + 1) / STEP_TITLES.length) * 100}%` }}
                    />
                  </div>
                </div>

                <div key={step} className="mt-9 flex-1 animate-in fade-in slide-in-from-right-4 duration-300">
                  <h2 className="text-2xl font-light leading-snug md:text-3xl">{STEP_TITLES[step]}</h2>

                  {step === 0 && (
                    <div className="mt-7 grid gap-3">
                      {SEGMENTS.map((option) => (
                        <Card
                          key={option.value}
                          option={option}
                          selected={segment === option.value}
                          onSelect={() => setSegment(option.value)}
                        />
                      ))}
                    </div>
                  )}

                  {step === 1 && (
                    <>
                      <p className="mt-3 text-sm text-muted-foreground">Mehrfachauswahl möglich.</p>
                      <div className="mt-6 grid gap-3 sm:grid-cols-2">
                        {GOALS.map((option) => (
                          <Card
                            key={option.value}
                            option={option}
                            selected={goals.includes(option.value)}
                            onSelect={() => toggleGoal(option.value)}
                          />
                        ))}
                      </div>
                    </>
                  )}

                  {step === 2 && (
                    <div className="mt-7 grid gap-3">
                      {STAGES.map((option) => (
                        <Card
                          key={option.value}
                          option={option}
                          selected={stage === option.value}
                          onSelect={() => setStage(option.value)}
                        />
                      ))}
                    </div>
                  )}

                  {step === 3 && (
                    <div className="mt-7 space-y-5">
                      <div className="grid gap-5 sm:grid-cols-2">
                        <Field id="name" label="Name *">
                          <Input id="name" name="name" required minLength={2} autoComplete="name" />
                        </Field>
                        <Field id="organization" label="Unternehmen / Organisation *">
                          <Input id="organization" name="organization" required autoComplete="organization" />
                        </Field>
                        <Field id="email" label="E-Mail *">
                          <Input id="email" name="email" type="email" required autoComplete="email" />
                        </Field>
                        <Field id="phone" label="Telefon (optional)">
                          <Input id="phone" name="phone" type="tel" autoComplete="tel" />
                        </Field>
                      </div>
                      <Field id="message" label="Besonderheiten des Projekts (optional)">
                        <Textarea
                          id="message"
                          name="message"
                          maxLength={5000}
                          className="min-h-28"
                          placeholder="Gebäudetyp, Fläche, Fristen, bereits vorliegende Unterlagen …"
                        />
                      </Field>
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
                      <div className="border border-border bg-secondary/40 p-4 text-sm leading-6 text-muted-foreground">
                        <span className="font-medium text-foreground">Ihre Angaben: </span>
                        {labelOf(SEGMENTS, segment)} · {goals.map((g) => labelOf(GOALS, g)).join(", ")} ·{" "}
                        {labelOf(STAGES, stage)}
                      </div>
                      {status === "error" && (
                        <p role="alert" className="text-sm text-destructive">
                          Die Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es erneut oder schreiben Sie an
                          info@planem.de.
                        </p>
                      )}
                    </div>
                  )}
                </div>

                <div className="mt-10 flex items-center justify-between gap-4 border-t border-border pt-6">
                  {step > 0 ? (
                    <Button type="button" variant="ghost" onClick={() => setStep((s) => s - 1)}>
                      <ArrowLeft />
                      Zurück
                    </Button>
                  ) : (
                    <span />
                  )}
                  {step < STEP_TITLES.length - 1 ? (
                    <Button type="button" size="lg" disabled={!canContinue} onClick={() => setStep((s) => s + 1)}>
                      Weiter
                      <ArrowRight />
                    </Button>
                  ) : (
                    <Button type="submit" size="lg" disabled={status === "sending"}>
                      {status === "sending" ? "Wird gesendet …" : "Jetzt Förderfähigkeit kostenfrei prüfen"}
                      <Send />
                    </Button>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
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
