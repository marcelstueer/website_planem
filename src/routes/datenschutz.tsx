import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { SeoSection } from "@/components/SeoSection";

export const Route = createFileRoute("/datenschutz")({
  head: () => ({
    meta: [
      { title: "Datenschutzerklärung | planem" },
      { name: "description", content: "Datenschutzerklärung von planem: Hosting, Kontaktformular, Datenbank, E-Mail-Versand, Cookies und Ihre Rechte." },
      { property: "og:title", content: "Datenschutzerklärung | planem" },
      { property: "og:description", content: "Wie planem personenbezogene Daten verarbeitet und welche Rechte Sie haben." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: PrivacyPage,
});

function Section({ n, title, children }: { n: number; title: string; children: ReactNode }) {
  return (
    <section className="border-t border-border pt-8">
      <h2 className="text-xl font-medium text-foreground"><span className="mr-3 text-primary">{n}.</span>{title}</h2>
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  );
}

function Todo({ children }: { children: ReactNode }) {
  return <p className="border-l-2 border-primary bg-secondary p-4 text-sm">{children}</p>;
}

function PrivacyPage() {
  return (
    <>
      <article className="py-16 md:py-24">
        <div className="site-container max-w-4xl">
          <p className="eyebrow">Rechtliches</p>
          <h1 className="mt-5 text-5xl font-extralight">Datenschutzerklärung</h1>
          <div className="mt-12 space-y-10 leading-7 text-muted-foreground">
            <Section n={1} title="Verantwortlicher">
              <p>Verantwortlich für die Datenverarbeitung auf dieser Website ist:</p>
              <p>Marcel Stüer<br />Bohlweg 21<br />48147 Münster<br />E-Mail: <a className="underline underline-offset-4" href="mailto:info@planem.de">info@planem.de</a><br />Telefon: <a className="underline underline-offset-4" href="tel:+491707490612">+49 170 7490612</a></p>
            </Section>
            <Section n={2} title="Allgemeines zur Datenverarbeitung">
              <p>Wir verarbeiten personenbezogene Daten unserer Nutzer grundsätzlich nur, soweit dies zur Bereitstellung einer funktionsfähigen Website sowie unserer Inhalte und Leistungen erforderlich ist. Die Verarbeitung erfolgt regelmäßig nur nach Einwilligung des Nutzers (Art. 6 Abs. 1 lit. a DSGVO) oder auf gesetzlicher Grundlage, insbesondere zur Erfüllung vertraglicher bzw. vorvertraglicher Pflichten (Art. 6 Abs. 1 lit. b DSGVO) sowie zur Wahrung berechtigter Interessen (Art. 6 Abs. 1 lit. f DSGVO).</p>
            </Section>
            <Section n={3} title="Hosting und Server-Logfiles">
              <p>Diese Website wird bei der IONOS SE gehostet (IONOS SE, Elgendorfer Str. 57, 56410 Montabaur, Deutschland). Die Server erfassen bei jedem Zugriff automatisch sogenannte Server-Logfiles, die Ihr Browser übermittelt. Dies sind:</p>
              <ul className="list-disc space-y-1 pl-6">
                <li>IP-Adresse</li><li>Datum und Uhrzeit der Anfrage</li><li>Browsertyp und -version</li><li>verwendetes Betriebssystem</li><li>Referrer-URL (zuvor besuchte Seite)</li><li>der abgerufene Inhalt</li>
              </ul>
              <p>Diese Daten werden zur Gewährleistung eines störungsfreien Betriebs sowie zur Verbesserung unseres Angebots verarbeitet (Art. 6 Abs. 1 lit. f DSGVO, berechtigtes Interesse an der technischen Fehlerfreiheit). Mit IONOS besteht ein Vertrag zur Auftragsverarbeitung (Art. 28 DSGVO).</p>
            </Section>
            <Section n={4} title="Kontaktformular">
              <p>Wenn Sie uns über das Kontaktformular eine Anfrage zukommen lassen, werden Ihre Angaben aus dem Formular – einschließlich der dort angegebenen Kontaktdaten (Name, E-Mail-Adresse, Telefonnummer, Firma), Ihres Anliegens sowie Ihrer Antworten auf die optionalen Einordnungsfragen – zum Zwecke der Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert.</p>
              <p>Zusätzlich erfassen wir beim Absenden des Formulars technische Herkunftsinformationen (z. B. Referrer-URL, aufgerufene Landingpage), um nachvollziehen zu können, über welchen Kanal Sie zu uns gefunden haben. Diese Verarbeitung erfolgt auf Grundlage unseres berechtigten Interesses an der Optimierung unserer Website und unserer Marketingmaßnahmen (Art. 6 Abs. 1 lit. f DSGVO), bzw. – soweit dies über Cookies erfolgt – nur mit Ihrer vorherigen Einwilligung (Art. 6 Abs. 1 lit. a DSGVO, siehe Ziffer 7).</p>
              <p>Die Verarbeitung der im Kontaktformular eingegebenen Daten erfolgt somit ausschließlich auf Grundlage Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) bzw. zur Durchführung vorvertraglicher Maßnahmen (Art. 6 Abs. 1 lit. b DSGVO), sofern die Anfrage auf den Abschluss eines Vertrags gerichtet ist. Diese Einwilligung können Sie jederzeit mit Wirkung für die Zukunft widerrufen, indem Sie uns per E-Mail an info@planem.de kontaktieren.</p>
              <p>Die über das Kontaktformular übermittelten Daten verbleiben bei uns, bis Sie uns zur Löschung auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck für die Datenspeicherung entfällt. Zwingende gesetzliche Aufbewahrungsfristen bleiben hiervon unberührt.</p>
            </Section>
            <Section n={5} title="Datenbank und technische Infrastruktur (Lovable / Ionos Cloud)">
              <p>Die über das Kontaktformular eingehenden Anfragen sowie Inhalte unseres internen Redaktionsbereichs werden in einer Datenbank gespeichert, die über den Dienst Lovable (Lovable Labs Incorporated bzw. dessen technischer Unterbau, basierend auf Supabase-Infrastruktur) bereitgestellt wird. Hochgeladene Bild- und Medieninhalte werden ebenfalls über diese Infrastruktur gespeichert.</p>
              <p>Soweit hierbei eine Verarbeitung personenbezogener Daten in Staaten außerhalb der EU/des EWR stattfindet, erfolgt dies auf Grundlage geeigneter Garantien gemäß Art. 46 DSGVO, insbesondere EU-Standardvertragsklauseln.</p>
              <Todo>[Bitte mit Lovable/Supabase-Dokumentation zum Serverstandort und zu etwaigen Drittlandtransfers abgleichen und konkretisieren.]</Todo>
            </Section>
            <Section n={6} title="Versand von Benachrichtigungs-E-Mails">
              <p>Für den automatischen Versand von Benachrichtigungs-E-Mails bei Formulareingängen (über die Subdomain notify.planem.de) nutzen wir einen E-Mail-Versanddienst, der über die Lovable-Plattform bereitgestellt wird. Hierbei werden die zur Zustellung notwendigen Daten (u. a. Ihre E-Mail-Adresse sowie der Inhalt der Benachrichtigung) technisch verarbeitet.</p>
              <p>Für unsere allgemeine Geschäftskorrespondenz (z. B. info@planem.de, marcel.stueer@planem.de) nutzen wir Google Workspace (Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland). Mit Google besteht ein Vertrag zur Auftragsverarbeitung auf Grundlage der EU-Standardvertragsklauseln.</p>
            </Section>
            <Section n={7} title="Cookies">
              <p>Unsere Website verwendet Cookies. Hierbei handelt es sich um kleine Textdateien, die auf Ihrem Endgerät gespeichert werden. Beim ersten Besuch unserer Website werden Sie über ein Cookie-Banner um Ihre Einwilligung zur Verwendung nicht technisch notwendiger Cookies gebeten.</p>
              <p>Technisch notwendige Cookies (z. B. zur Aufrechterhaltung Ihrer Session im Login-Bereich unter /admin) werden auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO sowie § 25 Abs. 2 Nr. 2 TTDSG eingesetzt, da sie zur Bereitstellung der von Ihnen ausdrücklich gewünschten Funktion zwingend erforderlich sind. Hierfür ist keine gesonderte Einwilligung erforderlich.</p>
              <p>Alle weiteren Cookies werden nur mit Ihrer ausdrücklichen Einwilligung gesetzt (Art. 6 Abs. 1 lit. a DSGVO, § 25 Abs. 1 TTDSG). Sie können Ihre Einwilligung jederzeit über die Cookie-Einstellungen am Seitenende mit Wirkung für die Zukunft widerrufen bzw. anpassen.</p>
              <Todo>[Sobald feststeht, welche konkreten Cookie-Kategorien eingesetzt werden, hier eine konkrete Liste mit Name, Zweck, Anbieter und Speicherdauer jedes Cookies ergänzen.]</Todo>
            </Section>
            <Section n={8} title="Ihre Rechte">
              <p>Ihnen stehen folgende Rechte gegenüber uns zu:</p>
              <ul className="list-disc space-y-1 pl-6">
                <li>Recht auf Auskunft (Art. 15 DSGVO)</li><li>Recht auf Berichtigung (Art. 16 DSGVO)</li><li>Recht auf Löschung (Art. 17 DSGVO)</li><li>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</li><li>Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</li><li>Widerspruchsrecht gegen die Verarbeitung (Art. 21 DSGVO)</li><li>Recht auf Widerruf erteilter Einwilligungen (Art. 7 Abs. 3 DSGVO)</li><li>Beschwerderecht bei einer Datenschutzaufsichtsbehörde (Art. 77 DSGVO)</li>
              </ul>
              <p>Zur Ausübung Ihrer Rechte wenden Sie sich bitte an: <a className="underline underline-offset-4" href="mailto:info@planem.de">info@planem.de</a></p>
            </Section>
            <Section n={9} title="SSL-/TLS-Verschlüsselung">
              <p>Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte eine SSL-/TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von „http://“ auf „https://“ wechselt.</p>
            </Section>
          </div>
        </div>
      </article>
      <SeoSection />
    </>
  );
}
