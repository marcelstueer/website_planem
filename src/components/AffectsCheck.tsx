import { useState } from "react";
import { Check, RotateCcw, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactCta, type Segment } from "@/components/AffectsYou";

export type CheckQuestion = { q: string; /** answer that points to "affected" */ affectedIf: boolean };

/** Client-only yes/no check. Result is passed to the contact form via URL only when the user clicks the button. */
export function AffectsCheck({ id = "check", title = "Betrifft mich das? – 60-Sekunden-Check", questions, anliegen, zielgruppe, threshold = 2 }: {
  id?: string; title?: string; questions: CheckQuestion[]; anliegen?: string; zielgruppe?: Segment; threshold?: number;
}) {
  const [answers, setAnswers] = useState<boolean[]>([]);
  const step = answers.length;
  const done = step >= questions.length;
  const hits = answers.filter((a, i) => a === questions[i]!.affectedIf).length;
  const affected = hits >= threshold;
  const summary = questions.map((q, i) => `${q.q} ${answers[i] ? "Ja" : "Nein"}`).join(" | ") + ` → ${affected ? "wahrscheinlich betroffen" : "eher nicht direkt betroffen"}`;

  return <section id={id} className="scroll-mt-24 bg-secondary py-16 md:py-24">
    <div className="site-container max-w-3xl">
      <p className="eyebrow">Ersteinschätzung</p>
      <h2 className="mt-4 text-3xl font-light md:text-4xl">{title}</h2>
      <div className="mt-8 bg-background p-6 md:p-10">
        <div className="flex gap-1.5" aria-label={`Schritt ${Math.min(step + 1, questions.length)} von ${questions.length}`}>
          {questions.map((_, i) => <span key={i} className={`h-1 flex-1 rounded-full ${i < step ? "bg-primary" : "bg-border"}`} />)}
        </div>
        {!done ? <div className="mt-8" aria-live="polite">
          <p className="text-xs font-semibold uppercase tracking-[.16em] text-primary">Frage {step + 1} von {questions.length}</p>
          <p className="mt-3 text-xl font-light leading-8 md:text-2xl">{questions[step]!.q}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button size="lg" onClick={() => setAnswers([...answers, true])}><Check /> Ja</Button>
            <Button size="lg" variant="outline" onClick={() => setAnswers([...answers, false])}><X /> Nein</Button>
            {step > 0 && <Button variant="ghost" onClick={() => setAnswers(answers.slice(0, -1))}>Zurück</Button>}
          </div>
        </div> : <div className="mt-8" aria-live="polite">
          <p className="text-2xl font-light md:text-3xl">{affected ? "Das betrifft Sie wahrscheinlich." : "Das betrifft Sie eher nicht direkt."}</p>
          <p className="mt-4 leading-7 text-muted-foreground">{affected
            ? "Nach Ihren Angaben kann das Thema für Ihre Gebäude relevant werden. In einem kurzen Gespräch klären wir, was konkret gilt und wann."
            : "Nach Ihren Angaben besteht derzeit möglicherweise kein unmittelbarer Anlass. Wenn sich etwas ändert oder Sie unsicher sind, sprechen wir gern darüber."}</p>
          <p className="mt-4 text-xs text-muted-foreground">Allgemeine Ersteinschätzung, keine Rechtsberatung.</p>
          <div className="mt-7 flex flex-wrap items-center gap-4">
            <ContactCta anliegen={anliegen} zielgruppe={zielgruppe} check={summary.slice(0, 600)} />
            <Button variant="ghost" onClick={() => setAnswers([])}><RotateCcw /> Neu starten</Button>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">Ihre Antworten werden nur übernommen, wenn Sie auf „Gespräch anfragen“ klicken, und erst mit dem Absenden des Formulars gespeichert.</p>
        </div>}
      </div>
    </div>
  </section>;
}
