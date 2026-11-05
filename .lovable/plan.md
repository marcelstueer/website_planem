# Neue Seite „Für Architekten & Planer"

## Ziel
Eine eigene Seite für Architekten, Bauplaner und Planungsbüros aus Münster, Münsterland, Ostwestfalen (Bielefeld, Gütersloh) und Osnabrücker Land. Sie beginnt beim Problem des Planers und führt zu „Gespräch anfragen" mit vorbelegter Zielgruppe „Architekt / Planungsbüro".

## Aufbau der Seite (von oben nach unten)
1. **Einstieg (Problem des Planers):** Eyebrow „Für Architekten & Planer", Überschrift zum Beispiel „Ihr Bauantrag stockt am Stellplatznachweis?". Kurzer Text: Stellplatzschlüssel, Energieanforderungen oder Förderfristen bremsen das Projekt, und Sie brauchen einen Ansprechpartner, der Nachweise liefert. Knopf „Gespräch anfragen" und Link „Erst kurz prüfen: Betrifft mich das?".
2. **Drei Leistungsbereiche** mit Piktogramm, je 3 Auslöser als „Betrifft das Sie?"-Liste und einem Link zur Detailseite:
   - Mobilitätskonzepte zur Stellplatzreduzierung (zum Beispiel: Die Stellplatzsatzung verlangt mehr Plätze, als das Grundstück hergibt / Die Bauaufsicht fordert ein Mobilitätskonzept / Ladeinfrastruktur muss mitgeplant werden) → Mobilitätskonzepte
   - Fördermittelbegleitung (zum Beispiel: Der Bauherr fragt nach Förderung / Antrag muss vor Auftragsvergabe gestellt werden / Unklar, welches Programm passt) → Energieeffizienzberatung, Abschnitt Förderung
   - Bedarfsausweise für Nichtwohngebäude: „planem stellt sie selbst aus." (Korrektur: ohne Partner) → Bedarfsausweis-Seite und Aktuelles-Beitrag
   Formulierungen vorsichtig („kann", „je nach Projekt"), mit Hinweis „Allgemeine Information, keine Rechtsberatung" beim Bedarfsausweis.
3. **Partner-Hinweis:** Kurzer Kasten „Partner für Wohngebäude": Reinhardt Energieberatung, Georg Reinhardt, Gebäudeenergieberater, Ingenieur für Erneuerbare Energien M.Sc. Ohne Logo (grauer Platzhalter) und ohne Link, bis beides vorliegt. Link zur Partnerseite.
4. **Ablauf in vier Schritten** mit Piktogrammen: Erstgespräch (kostenlos und unverbindlich, auch zum Kennenlernen) → Einordnung des Projekts → Vorschlag → Umsetzung.
5. **Antwortzeit und Nachhaken:** „Wir antworten in der Regel innerhalb von ein bis zwei Werktagen." Darunter dezent: „Noch nichts gehört? Haken Sie gern nach." mit Knopf „Erinnern Sie mich", der das Kontaktformular mit Anliegen „Erinnerung an meine Anfrage" und Zielgruppe Architekt öffnet.
6. **Einsatzgebiet:** nur Münster, Münsterland, Ostwestfalen (Bielefeld, Gütersloh), Osnabrücker Land. Düsseldorf wird nicht genannt.
7. **Abschluss-Leiste** „Gespräch anfragen" und **einklappbarer SEO-Abschnitt** wie auf den anderen Unterseiten.

Alle Texte der Seite schreibe ich selbst; Sie lesen sie bitte gegen. Keine Kundenstimmen, Referenzen oder Zahlen.

## Wiederverwendete Bausteine
- `SiteShell` (Rahmen, Menü, Fußzeile, kommt automatisch)
- `AffectsYou` für die Auslöser-Listen, `ContactCta` für alle Knöpfe, `CtaBand` als Abschluss
- `AffectsCheck` als kurzer 3-Fragen-Check für Planer (optional, siehe Entscheidungen)
- `SeoSection` mit eigenem Textschlüssel `seo.architekten` (im Admin bearbeitbar, fällt sonst auf den gemeinsamen Text zurück)
- `SectionHeading`, vorhandene Lucide-Piktogramme (Ruler, ParkingCircle, HandCoins, FileCheck, MessagesSquare, Search, Lightbulb, Hammer)
- `partners.ts` für den Partner-Kasten (eine Datenquelle für Seite und Partnerseite)
- `useSiteTexts` für Überschriften/Einleitung, damit sie im Admin änderbar sind

## Route und Navigation
- Neue Adresse: **/fuer-architekten** (Datei `src/routes/fuer-architekten.tsx`). Eigene Seite statt Unterseite von Leistungen, weil sie eine Zielgruppe anspricht, nicht eine Leistung.
- **Menü:** neuer Punkt „Für Architekten" zwischen „Leistungen" und „Über planem" (Desktop und Handy).
- **Fußzeile:** neue Spalte oder Zeile „Für Architekten & Planer" unter Kontakt.
- **Leistungen-Übersicht:** Hinweisband „Sie planen ein Bauprojekt? Alles für Architekten & Planer →".
- **Startseite:** Optional ein dezenter Link im Abschnitt „Gemeinsam zum passenden Konzept".
- **AudienceTiles:** Die Kachel „Architekt / Planungsbüro" führt künftig auf /fuer-architekten statt direkt ins Formular (die anderen Kacheln bleiben beim Formular). Die Komponente ist auf der Startseite derzeit nicht eingebunden; die Änderung wirkt, sobald sie wieder irgendwo verwendet wird.

## Partnerseite (partners.ts / showPartners)
- `Partner`-Typ: `url` wird optional, neues optionales Feld `rolle`.
- Platzhalter 1–3 entfernen, einziger Eintrag: Name „Reinhardt Energieberatung", rolle „Georg Reinhardt, Gebäudeenergieberater, Ingenieur für Erneuerbare Energien M.Sc.", Beschreibung nur aus bestätigten Fakten: „Ansprechpartner für Energieausweise und Energieberatung bei Wohngebäuden." Kein Logo, keine URL.
- `showPartners` bleibt wie es ist: Sobald kein Name mehr mit „Platzhalter" beginnt, erscheinen Menüpunkt und Partnerseite automatisch.
- `partner.tsx`: Link „Zur Website" nur zeigen, wenn eine URL hinterlegt ist; grauer Logo-Platzhalter bleibt, bis das Logo kommt. Seitentitel „Partner & Referenzen" → „Partner" (es gibt keine Referenzen).
- `/partner` und `/fuer-architekten` werden in die Prerender-Liste aufgenommen (bisher fehlt /partner dort).

## Statische Erzeugung beim Build
- Beide Adressen in `vite.config.ts` unter `pages` eintragen; die automatische Erkennung bleibt aus.
- Die Seite nutzt keine Serverfunktionen: Texte haben feste Standardwerte im Code, Admin-Texte werden im Browser nachgeladen.
- Nach dem Umbau: Build ausführen und prüfen, dass `.output/public/fuer-architekten/index.html` und `partner/index.html` entstehen und den Seitentext enthalten; interne Links prüfen; Browser-Test Desktop/Handy, inklusive Klick auf „Gespräch anfragen" (Zielgruppe vorbelegt) und „Erinnern Sie mich".

## SEO
- Titel (unter 60 Zeichen): „Für Architekten & Planer in Münster | planem" (44 Zeichen)
- Beschreibung (unter 155): „Stellplatznachweis, Fördermittel, Bedarfsausweis: planem unterstützt Architekten und Planer in Münster, Münsterland und Ostwestfalen." (≈135 Zeichen)
- og:title, og:description, og:type, twitter:card; kein og:image (nur gebündeltes Bild).

## Bitte entscheiden
1. Adresse **/fuer-architekten** und Menüname „Für Architekten" in Ordnung, oder lieber unter Leistungen einordnen?
2. Soll die AudienceTiles-Kachel auf die neue Seite führen (Vorschlag) oder weiterhin direkt ins Formular?
3. Kurzer Planer-Check (3 Ja/Nein-Fragen) einbauen oder weglassen, um die Seite schlank zu halten?
4. Welche Förderthemen soll ich nennen (zum Beispiel BAFA/KfW für Nichtwohngebäude, Ladeinfrastruktur NRW)? Ohne Vorgabe bleibe ich allgemein.
5. „Erinnern Sie mich" öffnet nur das vorbereitete Formular, keine automatische Erinnerung. Reicht das vorerst?
6. Partner-Beschreibung: (erledigt: Wohngebäude-Beschreibung), oder möchten Sie einen eigenen Satz liefern?
7. Soll es ein Titelbild geben? Ohne eigenes Foto nutze ich ein vorhandenes Bild aus der Bibliothek (mit Anthrazit-Filter und Logo).

---

# Teil 2: Niederländische Seite /nl

## Ziel
Eine Netzwerk- und Vertrauensseite auf Niederländisch: planem lernt gern von der niederländischen Mobilitätspraxis und möchte dieses Wissen in deutsche Projekte einbringen. Kein Verkaufsprospekt. Alle niederländischen Texte werden im Code und auf der Seite (nur im Admin sichtbar) als **„Entwurf – muttersprachliche Prüfung ausstehend"** gekennzeichnet.

## Aufbau (Texte auf Niederländisch, Entwurf)
1. **Vorstellung:** „Ingenieursbureau uit Münster" mit den drei Leistungen (mobiliteitsconcepten voor parkeerreductie, begeleiding bij subsidies, energielabels op basis van berekening voor utiliteitsgebouwen). Klarer Satz: „Onze diensten leveren wij in Duitsland."
2. **„Waarom Nederland?"**: persönliche, allgemeine Haltung (lernen von der Praxis bei Fiets, Parkeren, Openbaar Vervoer), ohne Zahlen oder Projekte. Sichtbar markierter Platzhalter: „[Marcel ergänzt konkrete Beispiele]".
3. **„Kennisoverdracht"**: mögliche Themen als Liste, ausdrücklich als „mogelijke thema's" formuliert (zum Beispiel Parkeernormen und Parkeerreductie, Mobiliteitshubs, fietsparkeren bij utiliteitsbouw, deelmobiliteit in nieuwbouwprojecten). Kennzeichnung „TODO: von Marcel zu bestätigen".
4. **Uitnodiging tot uitwisseling:** an niederländische Planer, Gemeinden und Beratungsbüros, die sich vernetzen oder Veranstaltungen teilen möchten. Knopf „Neem contact op" → deutsches Kontaktformular mit Anliegen „Austausch Niederlande".
5. **Links zu deutschen Seiten** (gekennzeichnet „Duitstalig"): Leistungen, Für Architekten & Planer (sobald Teil 1 umgesetzt ist), Bedarfsausweis.
6. **SEO-Abschnitt** auf Niederländisch (eigener Textschlüssel `seo.nl`, im Admin bearbeitbar).

Keine niederländischen Projekte, Partner, Behörden, Studien oder Kennzahlen.

## Wiederverwendete Bausteine
- `SiteShell` (Menü/Fußzeile bleiben deutsch; auf /nl kleiner Zusatz-Link „Deutsch")
- `SectionHeading`, `CtaBand` (mit Knopftext „Neem contact op" – dafür erhält `ContactCta`/`CtaBand` einen optionalen Knopftext, Standard bleibt „Gespräch anfragen")
- `SeoSection` mit `contentKey="seo.nl"`
- `useSiteTexts` für Admin-editierbare Absätze, mit niederländischen Standardtexten im Code
- vorhandene Piktogramme (Bike, ParkingCircle, Lightbulb, Handshake, Users)

## Navigation und Sprachwechsel
- Fußzeile: dezenter Link „NL · Nederlands" unter „Rechtliches"; Desktop-Menü rechts ein kleines „NL" neben dem Knopf (im Handy-Menü als letzte Zeile).
- Auf /nl umgekehrt „DE · Deutsch" zur Startseite.
- Deutsch bleibt Standard, keine automatische Weiterleitung nach Browsersprache.

## Sprache und hreflang
- Heute steht `lang="de"` fest im Grundgerüst. Plan: das Grundgerüst liest die aktuelle Adresse und setzt `lang="nl"` auf /nl, sonst `de`. So steht es bereits im statisch erzeugten HTML.
- hreflang: auf /nl und auf der Startseite gegenseitige Verweise (`de` → /, `nl` → /nl, `x-default` → /). Für absolute Adressen nutze ich die Hauptdomain; dazu brauche ich Ihre Entscheidung (siehe unten).
- Titel (unter 60): „planem – mobiliteit & kennisoverdracht uit Münster" (≈50 Zeichen)
- Beschreibung (unter 155): „Ingenieursbureau uit Münster dat leert van de Nederlandse mobiliteitspraktijk en kennis wil delen. Diensten worden in Duitsland geleverd." (≈140 Zeichen)
- og:locale `nl_NL`, og:title/description, og:type, twitter:card.

## Cookie-Banner
Vorschlag: Auf /nl zeigt der Banner eine niederländische Kurzfassung (zwei Sätze + Knöpfe „Alleen noodzakelijk" / „Alles accepteren" / „Instellingen") und einen Satz „De volledige privacyverklaring is in het Duits." mit Link zur deutschen Datenschutzseite. Die Logik bleibt identisch, nur die Texte wechseln. Alternative: Banner bleibt auch auf /nl deutsch.

## Kontaktformular
- Bleibt deutsch. Neuer Hinweis „U mag ook in het Nederlands schrijven." erscheint nur, wenn man von /nl kommt und ein Schalter im Code aktiv ist (`SHOW_NL_HINT`, Standard **aus**, markiert mit TODO: Bestätigen, ob Antworten auf Niederländisch möglich sind).

## Statische Erzeugung
- `/nl` in die Prerender-Liste in `vite.config.ts` eintragen; keine Serverfunktionen, Standardtexte im Code.
- Nach dem Build prüfen: `.output/public/nl/index.html` existiert, enthält `lang="nl"`, die hreflang-Verweise und den Seitentext; Browser-Test Desktop/Handy inkl. Sprachwechsel und „Neem contact op".

## Bitte entscheiden (NL-Seite)
1. Hauptdomain für hreflang und Kanonik: planem.de?
2. Cookie-Banner auf /nl niederländisch (Vorschlag) oder deutsch lassen?
3. Sprachwechsel „NL" im Menü **und** in der Fußzeile, oder nur in der Fußzeile?
4. Sollen Admin-Texte der NL-Seite editierbar sein (Vorschlag) oder fest im Code bleiben, bis sie geprüft sind?
5. Wer prüft die niederländischen Texte, und darf die Seite vorher schon veröffentlicht werden (dann mit `noindex`, bis geprüft)?
6. Reihenfolge: zuerst Architekten-Seite (Teil 1), dann /nl? Der Link auf „Für Architekten & Planer" funktioniert erst danach.
