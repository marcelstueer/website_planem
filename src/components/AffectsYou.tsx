import { Link } from "@tanstack/react-router";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export type Segment = "unternehmen" | "kommune" | "architektur" | "sonstige";
export type Situation = { icon: LucideIcon; text: string };

/** Primary contact action, identical label on every page. */
export function ContactCta({ anliegen, zielgruppe, check, className }: { anliegen?: string; zielgruppe?: Segment; check?: string; className?: string }) {
  return <Button asChild size="lg" className={className}>
    <Link to="/kontakt" search={{ anliegen, zielgruppe, check }}>Gespräch anfragen <ArrowRight /></Link>
  </Button>;
}

/** "Betrifft das Sie?" block: recognisable situations, low-threshold sentence, one main action. */
export function AffectsYou({ eyebrow = "Betrifft das Sie?", title, intro, situations, reassurance, anliegen, zielgruppe, checkAnchor, note }: {
  eyebrow?: string; title: string; intro?: string; situations: Situation[]; reassurance: string;
  anliegen?: string; zielgruppe?: Segment; checkAnchor?: string; note?: string;
}) {
  return <section className="py-16 md:py-24">
    <div className="site-container grid gap-10 lg:grid-cols-[.85fr_1.15fr]">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="mt-4 text-3xl font-light leading-tight md:text-5xl">{title}</h2>
        {intro && <p className="mt-5 text-lg font-light leading-8 text-muted-foreground">{intro}</p>}
      </div>
      <div>
        <ul className="grid gap-px bg-border sm:grid-cols-2">
          {situations.map(({ icon: Icon, text }) => <li key={text} className="flex gap-4 bg-background p-5">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10"><Icon className="size-5 text-primary" /></span>
            <span className="text-sm leading-6">{text}</span>
          </li>)}
        </ul>
        <p className="mt-7 leading-7 text-muted-foreground">{reassurance}</p>
        <div className="mt-6 flex flex-col items-start gap-3">
          <ContactCta anliegen={anliegen} zielgruppe={zielgruppe} />
          {checkAnchor && <a href={`#${checkAnchor}`} className="text-sm font-medium text-primary hover:underline">Erst kurz prüfen: Betrifft mich das?</a>}
        </div>
        {note && <p className="mt-5 text-xs text-muted-foreground">{note}</p>}
      </div>
    </div>
  </section>;
}

/** Wide closing CTA band at the end of a page. */
export function CtaBand({ title, text, anliegen, zielgruppe }: { title: string; text?: string; anliegen?: string; zielgruppe?: Segment }) {
  return <section className="bg-ink py-16 text-ink-foreground">
    <div className="site-container flex flex-col justify-between gap-7 md:flex-row md:items-center">
      <div className="max-w-2xl"><h2 className="text-3xl font-light md:text-5xl">{title}</h2>{text && <p className="mt-4 font-light leading-7 text-ink-muted">{text}</p>}</div>
      <ContactCta anliegen={anliegen} zielgruppe={zielgruppe} />
    </div>
  </section>;
}
