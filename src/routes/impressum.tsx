import { createFileRoute, Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { SeoSection } from "@/components/SeoSection";

export const Route = createFileRoute("/impressum")({
  head: () => ({
    meta: [
      { title: "Impressum | planem" },
      { name: "description", content: "Impressum von planem | Ingenieur Marcel Stüer, Ingenieurbüro aus Münster." },
      { property: "og:title", content: "Impressum | planem" },
      { property: "og:description", content: "Anbieterkennzeichnung von planem | Ingenieur Marcel Stüer." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ImprintPage,
});

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="grid gap-3 border-t border-border pt-6 md:grid-cols-[1fr_2fr] md:gap-8">
      <h2 className="text-lg font-medium text-foreground">{title}</h2>
      <div className="leading-7">{children}</div>
    </section>
  );
}

function ImprintPage() {
  return (
    <>
      <article className="py-16 md:py-24">
        <div className="site-container max-w-4xl">
          <p className="eyebrow">Rechtliches</p>
          <h1 className="mt-5 text-5xl font-extralight">Impressum</h1>
          <div className="mt-12 space-y-8 text-muted-foreground">
            <Block title="Angaben gemäß § 5 DDG">
              <p>
                <strong className="font-medium text-foreground">Marcel Stüer</strong><br />
                Ingenieurbüro aus Münster<br />
                Gebäude und Mobilität – Zusammen gedacht.<br />
                Unabhängige Planung und Beratung für zukunftsfähige Gebäude, Betriebe und Quartiere.
              </p>
              <p className="mt-3">Bohlweg 21<br />48147 Münster<br />Deutschland</p>
            </Block>
            <Block title="Kontakt">
              <p>
                Telefon: <a className="text-primary underline underline-offset-4" href="tel:+491707490612">+49 (0)170 7490612</a><br />
                E-Mail: <a className="text-primary underline underline-offset-4" href="mailto:office@planem.de">office@planem.de</a>
              </p>
            </Block>
            <Block title="Umsatzsteuer-ID">
              <p>Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br /><span className="text-foreground">DE464848734</span></p>
            </Block>
            <Block title="Wirtschafts­identifikations­nummer">
              <p className="text-foreground">337 5734 1307</p>
            </Block>
            <Block title="Berufsbezeichnung und berufsrechtliche Regelungen">
              <p>Berufsbezeichnung: Ingenieur (verliehen in der Bundesrepublik Deutschland)</p>
              <p className="mt-3">Gelistet in der Energieeffizienz-Expertenliste für Förderprogramme des Bundes (dena).</p>
            </Block>
            <Block title="Angaben zur Berufs­haftpflicht­versicherung">
              <p><strong className="font-medium text-foreground">Name und Sitz des Versicherers:</strong><br />Verwaltungs-Berufsgenossenschaft (VBG)<br />Massaquoipassage 1<br />22305 Hamburg</p>
              <p className="mt-3"><strong className="font-medium text-foreground">Geltungsraum der Versicherung:</strong><br />Deutschland</p>
            </Block>
            <Block title="Redaktionell verantwortlich">
              <p>Marcel Stüer<br />Bohlweg 21, 48147 Münster</p>
            </Block>
            <Block title="Verbraucher­streit­beilegung / Universal­schlichtungs­stelle">
              <p>Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
            </Block>
            <Block title="Haftung für Inhalte">
              <p>Als Diensteanbieter sind wir für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Wir sind jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden entsprechender Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.</p>
            </Block>
            <Block title="Haftung für Links">
              <p>Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Für diese fremden Inhalte übernehmen wir daher keine Gewähr. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft; rechtswidrige Inhalte waren nicht erkennbar. Eine permanente inhaltliche Kontrolle ist ohne konkrete Anhaltspunkte nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.</p>
            </Block>
            <Block title="Urheberrecht">
              <p>Die durch den Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechts bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Soweit Inhalte nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet und entsprechend gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis.</p>
            </Block>
            <div className="border-t border-border pt-6 text-sm">
              <p>Hinweise zum Umgang mit personenbezogenen Daten finden Sie im <Link to="/datenschutz" className="text-primary underline underline-offset-4">Datenschutz</Link>.</p>
              <p className="mt-2">Quelle: <a className="text-primary underline underline-offset-4" href="https://www.e-recht24.de" target="_blank" rel="noopener noreferrer">eRecht24</a></p>
            </div>
          </div>
        </div>
      </article>
      <SeoSection />
    </>
  );
}
