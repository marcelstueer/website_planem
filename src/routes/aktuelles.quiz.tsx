import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, ChevronRight, Copy, RotateCcw, Share2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type QuizQuestion = {
  category: "Mobilität" | "Energieeffizienz" | "Klimaschutz";
  question: string;
  options: [string, string, string];
  correctIndex: number;
  explanation: string;
};

const questions: QuizQuestion[] = [
  {
    category: "Mobilität",
    question: "Wie viel Prozent seines Verkehrshaushalts gibt der Bund ungefähr für den Radverkehr aus?",
    options: ["ca. 1 %", "ca. 10 %", "ca. 25 %"],
    correctIndex: 0,
    explanation: "Historisch liegt der Anteil des Radverkehrs am Bundesverkehrshaushalt bei nur etwa 1 Prozent (Bundestags-Drucksache 19/5009). Für 2027 sind rund 544 Millionen Euro für Radverkehr eingeplant – ein winziger Bruchteil im Vergleich zu den Investitionen in den Straßenbau.",
  },
  {
    category: "Mobilität",
    question: "Wie viel Mal mehr investiert der Bund in den Bau von Straßen für den Autoverkehr im Vergleich zum Radverkehr?",
    options: ["etwa doppelt so viel", "etwa 10-mal so viel", "mehr als 50-mal so viel"],
    correctIndex: 2,
    explanation: "Allein auf Investitionen in Autoverkehrswege entfallen über 50 Prozent des Verkehrshaushalts – gegenüber rund 1 Prozent für Radverkehr. Das Missverhältnis zeigt, wie unterschiedlich Prioritäten in der Verkehrspolitik gesetzt werden, obwohl das Fahrrad als klimafreundliches Verkehrsmittel gilt.",
  },
  {
    category: "Mobilität",
    question: "Welchen Anteil hat der Radverkehr aktuell etwa am gesamten Verkehrsaufkommen in Deutschland (Modal Split)?",
    options: ["unter 15 %", "etwa 30 %", "über 50 %"],
    correctIndex: 0,
    explanation: "Der Radverkehrsanteil liegt in Deutschland seit Jahren bei etwa 11–15 Prozent und stagniert bzw. ist teils rückläufig – trotz politischer Zielsetzungen, ihn deutlich zu erhöhen.",
  },
  {
    category: "Energieeffizienz",
    question: "Welche Maßnahme an der Gebäudehülle ist in der Regel am teuersten?",
    options: ["Austausch der Fenster", "Vollständige Fassadendämmung", "Dämmung der obersten Geschossdecke"],
    correctIndex: 1,
    explanation: "Eine komplette Fassadendämmung ist meist die kostenintensivste Einzelmaßnahme bei einer energetischen Sanierung, da große Flächen, Gerüst und oft auch Putzarbeiten nötig sind. Dachgeschossdämmungen sind dagegen oft mit vergleichsweise wenig Aufwand realisierbar.",
  },
  {
    category: "Energieeffizienz",
    question: "Welche Maßnahme zeigt in der Regel am schnellsten eine Wirkung beim CO2-Ausstoß eines Gebäudes?",
    options: ["Der Einbau einer Wärmepumpe", "Die Dämmung der Fassade", "Der Austausch aller Fenster"],
    correctIndex: 0,
    explanation: "Eine Wärmepumpe ersetzt die fossile Heizung direkt und senkt den CO2-Ausstoß des Gebäudes unmittelbar nach Inbetriebnahme, sofern der Strom zunehmend aus erneuerbaren Quellen kommt. Dämmmaßnahmen wirken langfristig sehr effektiv, brauchen aber oft mehr Planungs- und Bauzeit, bis sie sich vollständig auszahlen.",
  },
  {
    category: "Energieeffizienz",
    question: "Was ist meist der wirtschaftlich sinnvollste erste Schritt bei einer energetischen Sanierung?",
    options: ["Sofort die teuerste Maßnahme umsetzen", "Eine Energieberatung bzw. einen Sanierungsfahrplan erstellen lassen", "Nur die günstigste Einzelmaßnahme wählen"],
    correctIndex: 1,
    explanation: "Ein individueller Sanierungsfahrplan (iSFP) zeigt, welche Maßnahmen in welcher Reihenfolge am meisten bringen – und wird zudem staatlich gefördert. So werden teure Fehlinvestitionen vermieden.",
  },
  {
    category: "Klimaschutz",
    question: "Was bedeutet eine globale Erwärmung von 2 °C für die Korallenriffe weltweit?",
    options: ["Etwa 30 % verschwinden", "Etwa 70 % verschwinden", "Praktisch alle verschwinden (über 99 %)"],
    correctIndex: 2,
    explanation: "Laut Weltklimarat IPCC gehen bei 1,5 °C Erwärmung bereits 70–90 Prozent der Korallenriffe verloren. Bei 2 °C wäre praktisch kein Riff mehr zu retten – ein Unterschied von nur einem halben Grad entscheidet also über das Überleben ganzer Ökosysteme.",
  },
  {
    category: "Klimaschutz",
    question: "Wie stark hat sich die Erde seit vorindustrieller Zeit bereits im globalen Mittel erwärmt?",
    options: ["etwa 0,5 °C", "etwa 1,3–1,4 °C", "etwa 3 °C"],
    correctIndex: 1,
    explanation: "Aktuell liegt die globale Erwärmung bei rund 1,3 bis 1,4 °C gegenüber vorindustriellem Niveau. Das 1,5-Grad-Ziel des Pariser Abkommens rückt damit immer näher – die verbleibende Zeit zum Gegensteuern wird knapp.",
  },
];

export const Route = createFileRoute("/aktuelles/quiz")({
  head: () => ({
    meta: [
      { title: "Wissensquiz zu Klimaschutz & Mobilität | planem" },
      { name: "description", content: "Acht Fragen zu Mobilität, Energieeffizienz und Klimaschutz – mit fundierten Einordnungen nach jeder Antwort." },
      { property: "og:title", content: "Wissensquiz: Klimaschutz richtig einordnen | planem" },
      { property: "og:description", content: "Testen Sie Ihr Wissen zu Mobilität, Energieeffizienz und Klimaschutz in acht Fragen." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: QuizPage,
});

function scoreMessage(score: number) {
  if (score <= 3) return "Da geht noch was!";
  if (score <= 6) return "Solides Wissen!";
  return "Klimaschutz-Profi!";
}

function QuizPage() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [shareStatus, setShareStatus] = useState("");
  const headingRef = useRef<HTMLHeadingElement>(null);
  const complete = questionIndex === questions.length;
  const score = answers.reduce((total, answer, index) => total + Number(answer === questions[index]?.correctIndex), 0);
  const question = questions[questionIndex];

  useEffect(() => {
    headingRef.current?.focus();
  }, [questionIndex]);

  function chooseAnswer(index: number) {
    if (selectedIndex !== null) return;
    setSelectedIndex(index);
  }

  function nextQuestion() {
    if (selectedIndex === null) return;
    setAnswers((current) => [...current, selectedIndex]);
    setSelectedIndex(null);
    setQuestionIndex((current) => current + 1);
  }

  function restart() {
    setQuestionIndex(0);
    setAnswers([]);
    setSelectedIndex(null);
    setShareStatus("");
  }

  async function shareResult() {
    const text = `Ich habe im planem Wissensquiz ${score} von ${questions.length} Fragen richtig beantwortet.`;
    try {
      if (navigator.share) {
        await navigator.share({ title: "planem Wissensquiz", text, url: window.location.href });
        setShareStatus("Ergebnis geteilt.");
      } else {
        await navigator.clipboard.writeText(`${text} ${window.location.href}`);
        setShareStatus("Ergebnis und Link kopiert.");
      }
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") return;
      setShareStatus("Teilen war nicht möglich.");
    }
  }

  return (
    <>
      <section className="bg-ink py-14 text-ink-foreground md:py-20">
        <div className="site-container">
          <Link to="/aktuelles" className="text-sm text-ink-muted hover:text-ink-foreground">← Zurück zu Aktuelles</Link>
          <div className="mt-8 grid gap-5 md:grid-cols-[1fr_2fr]">
            <p className="eyebrow !text-brand-light">Wissensquiz</p>
            <div>
              <h1 className="max-w-3xl text-4xl font-extralight leading-tight md:text-6xl">Klimaschutz richtig einordnen.</h1>
              <p className="mt-5 max-w-2xl text-base font-light leading-7 text-ink-muted md:text-lg">Acht Fragen zu Mobilität, Energieeffizienz und Klimaschutz – mit einer fundierten Einordnung nach jeder Antwort.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-muted py-10 md:py-16">
        <div className="mx-auto w-[min(100%-2.5rem,48rem)]">
          <div className="border border-border bg-background p-5 shadow-sm sm:p-8 md:p-10">
            {complete ? (
              <div className="py-4 text-center md:py-8" aria-live="polite">
                <p className="eyebrow">Ergebnis</p>
                <h2 ref={headingRef} tabIndex={-1} className="mt-5 text-4xl font-light outline-none md:text-6xl">{score} von {questions.length} richtig</h2>
                <p className="mt-5 text-xl font-medium text-primary">{scoreMessage(score)}</p>
                <p className="mx-auto mt-4 max-w-xl leading-7 text-muted-foreground">Wissen hilft, Investitionen und Klimaschutzmaßnahmen besser einzuordnen. Entscheidend bleibt, aus Erkenntnissen tragfähige Lösungen zu entwickeln.</p>
                <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                  <Button onClick={shareResult}><Share2 /> Ergebnis teilen</Button>
                  <Button variant="outline" onClick={restart}><RotateCcw /> Nochmal spielen</Button>
                </div>
                {shareStatus && <p className="mt-4 text-sm text-muted-foreground" role="status">{shareStatus}</p>}
              </div>
            ) : question ? (
              <div>
                <div className="flex items-center justify-between gap-4">
                  <span className="eyebrow">{question.category}</span>
                  <span className="text-sm font-medium text-muted-foreground">Frage {questionIndex + 1} von {questions.length}</span>
                </div>
                <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-secondary" role="progressbar" aria-label="Quiz-Fortschritt" aria-valuemin={1} aria-valuemax={questions.length} aria-valuenow={questionIndex + 1}>
                  <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${((questionIndex + 1) / questions.length) * 100}%` }} />
                </div>

                <h2 ref={headingRef} tabIndex={-1} className="mt-8 text-2xl font-light leading-snug outline-none sm:text-3xl md:text-4xl">{question.question}</h2>
                <div className="mt-8 grid gap-3" role="group" aria-label="Antwortmöglichkeiten">
                  {question.options.map((option, index) => {
                    const answered = selectedIndex !== null;
                    const isCorrect = index === question.correctIndex;
                    const isWrongSelection = answered && index === selectedIndex && !isCorrect;
                    const showCorrect = answered && isCorrect;
                    return (
                      <Button
                        key={option}
                        variant="outline"
                        className={cn(
                          "h-auto min-h-14 w-full justify-start whitespace-normal px-4 py-4 text-left text-base leading-6 shadow-none transition-all duration-300 sm:px-5",
                          !answered && "hover:border-primary hover:bg-accent",
                          showCorrect && "border-primary bg-accent text-accent-foreground hover:bg-accent",
                          isWrongSelection && "border-destructive bg-destructive/10 text-foreground hover:bg-destructive/10",
                          answered && !showCorrect && !isWrongSelection && "opacity-55",
                        )}
                        onClick={() => chooseAnswer(index)}
                        disabled={answered}
                        aria-pressed={selectedIndex === index}
                      >
                        <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-current text-xs font-semibold">{String.fromCharCode(65 + index)}</span>
                        <span className="flex-1">{option}</span>
                        {showCorrect && <Check className="text-primary" aria-label="Richtige Antwort" />}
                        {isWrongSelection && <X className="text-destructive" aria-label="Falsche Antwort" />}
                      </Button>
                    );
                  })}
                </div>

                {selectedIndex !== null && (
                  <div className="mt-6 border-l-2 border-primary bg-secondary p-5" aria-live="polite">
                    <p className="font-semibold text-foreground">{selectedIndex === question.correctIndex ? "Richtig." : "Nicht ganz."}</p>
                    <p className="mt-2 leading-7 text-muted-foreground">{question.explanation}</p>
                  </div>
                )}

                <div className="mt-7 flex justify-end">
                  {selectedIndex !== null && (
                    <Button onClick={nextQuestion} size="lg">
                      {questionIndex === questions.length - 1 ? "Ergebnis anzeigen" : "Nächste Frage"} <ChevronRight />
                    </Button>
                  )}
                </div>
              </div>
            ) : null}
          </div>
          <p className="mt-5 text-center text-sm text-muted-foreground">Ohne Zeitdruck. Antworten werden nur in diesem Browserdurchlauf gespeichert.</p>
        </div>
      </section>
    </>
  );
}