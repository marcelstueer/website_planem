import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Bike, Languages, MapPin, Split, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SHOW_NL_PAGE } from "@/lib/site-flags";

// Niederländischer Text: Entwurf, muttersprachliche Prüfung ausstehend.
const TITLE = "Leren van Nederland: mobiliteit en fiets | planem";
const DESC = "Ingenieur uit Münster zoekt uitwisseling met Nederland over fietsverkeer, gescheiden infrastructuur en snelle uitvoering van verkeersprojecten.";
const ANLIEGEN = "Austausch Niederlande";

export const Route = createFileRoute("/nl")({
  head: () => ({ meta: [
    { title: TITLE }, { name: "description", content: DESC },
    { property: "og:title", content: TITLE }, { property: "og:description", content: DESC },
    { property: "og:type", content: "website" }, { property: "og:locale", content: "nl_NL" },
    { name: "twitter:card", content: "summary_large_image" },
    ...(SHOW_NL_PAGE ? [] : [{ name: "robots", content: "noindex,nofollow" }]),
  ] }),
  component: NlPage,
});

const inspirations = [
  { icon: Bike, title: "De fiets als volwaardig vervoermiddel", text: "In Nederland is de fiets geen bijzaak, maar een vanzelfsprekend onderdeel van het dagelijkse verkeer. Wie fietst, wordt in de planning serieus genomen. Die houding wil ik meenemen in mijn eigen werk." },
  { icon: Split, title: "Gescheiden ruimte voor auto en fiets", text: "Auto's en fietsers krijgen waar mogelijk elk hun eigen infrastructuur. Dat maakt fietsen veiliger en ontspannener, en het verkeer overzichtelijker voor iedereen." },
  { icon: Timer, title: "Snel van plan naar uitvoering", text: "Verkeersprojecten, vooral voor de fiets, lijken in Nederland vaak sneller gerealiseerd te worden. Ik wil graag begrijpen hoe dat in de praktijk werkt en wat wij daarvan kunnen leren." },
];

function ContactButton() {
  return <Button asChild size="lg"><Link to="/kontakt" search={{ anliegen: ANLIEGEN }}>Neem contact op <ArrowRight /></Link></Button>;
}

function NlPage() {
  return <div lang="nl">
    <section className="bg-ink text-ink-foreground">
      <div className="site-container grid gap-10 py-16 md:py-24 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
        <div>
          <p className="eyebrow !text-brand-light">Uitwisseling met Nederland</p>
          <h1 className="mt-5 text-4xl font-extralight leading-[1.08] md:text-6xl">Geïnspireerd door Nederland.</h1>
          <p className="mt-7 max-w-2xl text-lg font-light leading-8 text-ink-muted">Als het gaat om mobiliteit en de verkeerstransitie, kijk ik graag naar Nederland. Ik ben ingenieur in Münster en zoek de uitwisseling met mensen die deze praktijk van dichtbij kennen.</p>
          <div className="mt-9"><ContactButton /></div>
        </div>
        <div className="aspect-[4/3] w-full overflow-hidden">
          <img src="/library/lib-PXL-20251124-093041448-MP.jpg" alt="Snelfietspad bij een spoorbrug" width={1600} height={1200} loading="eager" fetchPriority="high" className="h-full w-full object-cover grayscale" />
        </div>
      </div>
    </section>

    <section className="border-b border-border bg-secondary py-8">
      <div className="site-container flex items-start gap-4">
        <Languages className="mt-1 size-6 shrink-0 text-primary" />
        <p className="text-lg font-light">Ik spreek zelf geen Nederlands, maar u kunt gerust in het Engels of Duits schrijven.</p>
      </div>
    </section>

    <section className="py-16 md:py-24">
      <div className="site-container">
        <p className="eyebrow">Inspiratie</p>
        <h2 className="mt-4 max-w-3xl text-3xl font-light leading-tight md:text-5xl">Drie dingen die ik van Nederland wil leren.</h2>
        <div className="mt-12 grid gap-px bg-border lg:grid-cols-3">
          {inspirations.map(({ icon: Icon, title, text }) => <article key={title} className="bg-background p-6 md:p-8">
            <span className="flex size-12 items-center justify-center rounded-full bg-primary/10"><Icon className="size-6 text-primary" /></span>
            <h3 className="mt-5 text-xl font-medium">{title}</h3>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{text}</p>
          </article>)}
        </div>
      </div>
    </section>

    <section className="border-t border-border py-16 md:py-20">
      <div className="site-container grid gap-10 md:grid-cols-2">
        <div>
          <p className="eyebrow">Over mij</p>
          <p className="mt-4 text-2xl font-light leading-snug">Ik ben Marcel Stüer, ingenieur bij planem in Münster. Ik werk aan mobiliteitsconcepten en aan energie-efficiënte gebouwen.</p>
        </div>
        <div>
          <p className="eyebrow">Waarom contact?</p>
          <p className="mt-4 text-lg font-light leading-8">Ik wil graag in gesprek met mensen in Nederland, om van hun praktijk te leren en ervaringen uit te wisselen. Een kennismaking is vrijblijvend.</p>
          <p className="mt-4 flex gap-2 text-sm text-muted-foreground"><MapPin className="size-4 shrink-0 text-primary" />planem, Münster (Duitsland)</p>
        </div>
      </div>
    </section>

    <section className="bg-ink py-16 text-ink-foreground">
      <div className="site-container flex flex-col justify-between gap-7 md:flex-row md:items-center">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-light md:text-5xl">Zullen we ervaringen uitwisselen?</h2>
          <p className="mt-4 font-light leading-7 text-ink-muted">Het contactformulier is in het Duits. U kunt uw bericht gewoon in het Engels of Duits schrijven.</p>
        </div>
        <ContactButton />
      </div>
    </section>
  </div>;
}
