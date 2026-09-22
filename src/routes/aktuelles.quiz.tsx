import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, ChevronRight, RotateCcw, Share2, X } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { getAttribution } from "@/lib/tracking";
import { cn } from "@/lib/utils";

type QuizQuestion = {
  category: "Mobilität" | "Energieeffizienz" | "Klimaschutz";
  question: string;
  options: [string, string, string];
  correctIndex: number;
  explanation: string;
  sourceLabel: string;
  sourceUrl: string;
};

const questions: QuizQuestion[] = [
  {
    category: "Mobilität",
    question: "Wie viel Prozent seines Gesamt-Etats gibt das Bundesverkehrsministerium ungefähr für den Radverkehr aus?",
    options: ["unter 0,5 %", "ca. 1,5 %", "über 8 %"],
    correctIndex: 1,
    explanation: "Für 2026 sind rund 553 Millionen Euro für den Radverkehr eingeplant – bei einem Gesamt-Verkehrsetat von rund 38 Milliarden Euro entspricht das etwa 1,5 Prozent. Viele schätzen den Anteil deutlich höher, da das Fahrrad politisch oft als zentrale Säule der Verkehrswende genannt wird.",
    sourceLabel: "Bundesministerium für Verkehr (BMV)",
    sourceUrl: "https://www.bmv.de/SharedDocs/DE/Artikel/StV/Radverkehr/finanzielle-foerderung-des-radverkehrs.html",
  },
  {
    category: "Mobilität",
    question: "Wie hat sich der Bestand an E-Bikes in deutschen Haushalten in den letzten zehn Jahren entwickelt?",
    options: ["verdoppelt", "vervierfacht", "verachtfacht"],
    correctIndex: 2,
    explanation: "Der Zweirad-Industrie-Verband (ZIV) beziffert den E-Bike-Bestand 2024 auf 15,7 Millionen Stück – das Achtfache von vor zehn Jahren. Mit fast 89 Millionen Fahrrädern und E-Bikes gibt es inzwischen mehr Räder als Einwohner in Deutschland. Das Fahrrad ist ein klar wachsender Markt.",
    sourceLabel: "ZIV – Zweirad-Industrie-Verband, Marktdaten 2024",
    sourceUrl: "https://www.ziv-zweirad.de/marktdaten-2024/",
  },
  {
    category: "Mobilität",
    question: "Wie hat sich der Marktanteil rein elektrischer Neuwagen (BEV) in der EU von 2024 auf 2025 entwickelt?",
    options: ["von 5 % auf 8 %", "von 13,6 % auf 17,4 %", "von 25 % auf 40 %"],
    correctIndex: 1,
    explanation: "2025 wurden EU-weit rund 1,88 Millionen neue Elektroautos zugelassen – ein Plus von fast 30 Prozent gegenüber 2024. Der Marktanteil stieg von 13,6 auf 17,4 Prozent. Deutschland gehörte mit einem Plus von 43,2 Prozent zu den Wachstumstreibern.",
    sourceLabel: "ACEA / electrive.net",
    sourceUrl: "https://www.electrive.net/2026/01/27/eu-weite-elektroauto-neuzulassungen-steigen-um-30-prozent/",
  },
  {
    category: "Mobilität",
    question: "Welchen Anteil hat das Fahrrad am Pendelverkehr (Weg zur Arbeit) in den Niederlanden – im Vergleich zu Deutschland?",
    options: ["NL 25 % – Deutschland 9 %", "NL 15 % – Deutschland 12 %", "NL 40 % – Deutschland 30 %"],
    correctIndex: 0,
    explanation: "In den Niederlanden fährt etwa jede vierte berufstätige Person mit dem Rad zur Arbeit. In Deutschland liegt der Radanteil am Pendelverkehr bei nur rund 9 Prozent – trotz vergleichbarer Distanzen in weiten Teilen beider Länder. Der Unterschied liegt vor allem an der Infrastruktur.",
    sourceLabel: "Nationaler Radverkehrsplan (Portal des BMV)",
    sourceUrl: "https://nationaler-radverkehrsplan.de/de/aktuell/nachrichten/niederlande-sind-noch-immer-weltweit-fuehrende",
  },
  {
    category: "Klimaschutz",
    question: "Was bedeutet eine globale Erwärmung von 2 °C für die Korallenriffe weltweit?",
    options: ["Etwa 30 % verschwinden", "Etwa 70 % verschwinden", "Praktisch alle verschwinden (über 99 %)"],
    correctIndex: 2,
    explanation: "Laut IPCC gehen bei 1,5 °C Erwärmung bereits 70 bis 90 Prozent der Korallenriffe verloren. Bei 2 °C bleibt gerade einmal 1 Prozent übrig – praktisch alle Riffe wären verloren. Ein halbes Grad entscheidet über das Überleben ganzer Ökosysteme.",
    sourceLabel: "IPCC-Bericht, zitiert u. a. über ORF",
    sourceUrl: "https://orf.at/stories/3231175/",
  },
  {
    category: "Klimaschutz",
    question: "Wie hoch schätzt eine McKinsey-Studie die zusätzlichen Investitionen, die Deutschland bis 2045 für die Klimaneutralität benötigt (ohne ohnehin fällige Ersatzinvestitionen)?",
    options: ["ca. 100 Milliarden Euro", "ca. 1 Billion Euro", "ca. 10 Billionen Euro"],
    correctIndex: 1,
    explanation: "Die Studie „Net-Zero Deutschland“ von McKinsey beziffert die zusätzlichen Investitionen auf rund 1 Billion Euro bis 2045 – hinzu kommen etwa 5 Billionen Euro an Ersatzinvestitionen, die ohnehin fällig wären. Laut Studie ist das Ziel gesamtgesellschaftlich sogar kostenneutral erreichbar, weil eingesparte Folgeschäden und Energiekosten die Investitionen langfristig ausgleichen.",
    sourceLabel: "McKinsey & Company, „Net-Zero Deutschland“",
    sourceUrl: "https://www.mckinsey.com/de/news/presse/studie-net-zero-deutschland-klimaneutralitaet-chancen-herausforderungen",
  },
  {
    category: "Energieeffizienz",
    question: "Welcher Bereich der erneuerbaren Energien beschäftigt in Deutschland die meisten Menschen (Stand 2025)?",
    options: ["Wärmepumpen (Produktion & Installation) – ca. 72.000", "Windenergie – ca. 131.000", "Photovoltaik – ca. 100.000"],
    correctIndex: 1,
    explanation: "Insgesamt arbeiteten 2025 rund 436.000 Menschen in der Branche erneuerbare Energien in Deutschland – ein Beschäftigungsrekord. Die Windenergie ist mit rund 131.000 Jobs der größte Bereich, gefolgt von Photovoltaik (knapp 100.000) und Wärmepumpen (rund 72.000).",
    sourceLabel: "Bertelsmann Stiftung",
    sourceUrl: "https://www.bertelsmann-stiftung.de/fileadmin/files/user_upload/Studie_Energiewende_als_Jobmotor.pdf",
  },
  {
    category: "Energieeffizienz",
    question: "Wie viel Fördermittel stellt der Staat 2026 aktuell für die klimagerechte Modernisierung von Gebäuden (BEG-Programm) bereit?",
    options: ["ca. 2 Milliarden Euro", "ca. 12 Milliarden Euro", "ca. 50 Milliarden Euro"],
    correctIndex: 1,
    explanation: "Über die Bundesförderung für effiziente Gebäude (BEG) stellt der Staat 2026 rund 12 Milliarden Euro bereit – für Wärmepumpen (30 bis 70 % Zuschuss), Dämmung (15 bis 25 %) oder komplette Sanierungen zum Effizienzhaus (bis zu 28.000 Euro pro Wohneinheit). Wie viel Sie persönlich an Förderung für Ihr Zuhause bekommen können, erfahren Sie individuell bei planem.",
    sourceLabel: "KfW / BAFA (Bundesförderung für effiziente Gebäude)",
    sourceUrl: "https://www.kfw.de/inlandsfoerderung/Bundesf%C3%B6rderung-f%C3%BCr-effiziente-Geb%C3%A4ude/Anpassungen-2026/",
  },
  {
    category: "Energieeffizienz",
    question: "Wie groß ist der Kostenunterschied zwischen einer Wärmepumpe und einer neuen Gasheizung über die typische Lebensdauer einer Heizung (ca. 20 Jahre) laut Fraunhofer-Studie?",
    options: ["kein nennenswerter Unterschied", "Gasheizung bis zu 49.000 Euro teurer", "Wärmepumpe immer teurer"],
    correctIndex: 1,
    explanation: "Eine Studie des Fraunhofer-Instituts für Solare Energiesysteme (ISE) zeigt: Über 20 Jahre kann eine Gasheizung im Einfamilienhaus bis zu 49.000 Euro teurer sein als eine Wärmepumpe – vor allem wegen steigender CO2-Preise. Die Verbraucherzentrale Rheinland-Pfalz rechnet vor, dass sich eine Wärmepumpe oft schon nach etwa 7 Jahren rechnet.",
    sourceLabel: "Fraunhofer ISE",
    sourceUrl: "https://www.ise.fraunhofer.de/de/presse-und-medien/presseinformationen/2024/guenstig-und-klimaschonend-heizen-waermepumpen-kosten-langfristig-weniger-als-das-heizen-mit-gas.html",
  },
  {
    category: "Energieeffizienz",
    question: "In Japan nutzen rund 90 Prozent der Haushalte Klimasplit-Geräte, die neben Raumkühle auch Raumwärme liefern. Was kostet die Anschaffung von vier solcher Geräte für vier Räume in Japan (inkl. Standard-Montage, wie dort üblich verkauft)?",
    options: ["ca. 500 Euro", "ca. 2.000 bis 2.500 Euro", "ca. 8.000 Euro"],
    correctIndex: 1,
    explanation: "Vier Standard-Klimasplit-Geräte für vier Zimmer kosten in Japan inklusive Montage meist umgerechnet nur rund 2.000 bis 2.500 Euro – deutlich weniger als vergleichbare Multi-Split-Systeme in Deutschland, die für 3 bis 4 Räume oft 5.000 bis 9.000 Euro kosten. Möglich macht das die Massenproduktion für einen riesigen Heimmarkt.",
    sourceLabel: "Marktpreis-Recherche japanischer Fachhändler (Stand 2026) sowie IEA zur Marktdurchdringung",
    sourceUrl: "https://iifiir.org/en/news/japanese-households-don-t-make-the-most-of-reversible-heat-pumps",
  },
];

export const Route = createFileRoute("/aktuelles/quiz")({
  head: () => ({
    meta: [
      { title: "Wissensquiz zu Klimaschutz & Mobilität | planem" },
      { name: "description", content: "Zehn Fragen zu Mobilität, Energieeffizienz und Klimaschutz – mit fundierten Einordnungen und Quellen nach jeder Antwort." },
      { property: "og:title", content: "Wissensquiz: Klimaschutz richtig einordnen | planem" },
      { property: "og:description", content: "Testen Sie Ihr Wissen zu Mobilität, Energieeffizienz und Klimaschutz in zehn Fragen." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: QuizPage,
});

function scoreMessage(score: number) {
  if (score <= 3) return "Da geht noch was!";
  if (score <= 7) return "Solides Wissen!";
  return "Klimaschutz-Profi!";
}

function QuizPage() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [shareStatus, setShareStatus] = useState("");
  const [email, setEmail] = useState("");
  const [contactStatus, setContactStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
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
              <p className="mt-5 max-w-2xl text-base font-light leading-7 text-ink-muted md:text-lg">Zehn Fragen zu Mobilität, Energieeffizienz und Klimaschutz – mit einer fundierten Einordnung und Quellenangabe nach jeder Antwort.</p>
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
                        aria-disabled={answered}
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
                    <p className="mt-4 text-xs leading-5 text-muted-foreground/70">
                      Quelle:{" "}
                      <a href={question.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-foreground">{question.sourceLabel}</a>
                    </p>
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