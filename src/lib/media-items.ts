export type MediaItem = {
  /** Kategorie, z.B. "Mobilität", "Energieeffizienz", "Klimaschutz" */
  category: string;
  title: string;
  /** Sender / Herausgeber */
  source: string;
  /** Erscheinungsdatum, ISO: JJJJ-MM-TT */
  date: string;
  /** Laufzeit oder Umfang, optional */
  duration?: string;
  /** Kurze Zusammenfassung, 2-4 Sätze */
  summary: string;
  /** Quintessenz: Einordnung aus planem-Sicht */
  essence: string;
  /** Link zur Quelle */
  url: string;
  /** Direkter Hör-/Abspiel-Link, falls vorhanden */
  listenUrl?: string;
  /** Weiterführende Links */
  links?: { label: string; url: string }[];
  /** Bild (URL), falls vorhanden – sonst wird das Piktogramm gezeigt */
  imageUrl?: string;
  /** Piktogramm-Schlüssel für das Hauptthema */
  icon?: "bike" | "car" | "bus" | "heat" | "energy" | "leaf" | "train";
};

export const mediaItems: MediaItem[] = [
  {
    category: "Mobilität",
    title: "Transrapid, Flugtaxis, Hyperloop – Warum es neuartige Verkehrstechnik so schwer hat",
    source: "SWR Kultur · Das Wissen",
    date: "2026-09-22",
    duration: "28 Min.",
    icon: "train",
    summary:
      "Passagiere sausen in Kabinen durch ein Vakuum-Rohr: Die Hyperloop-Technik soll in Deutschland erprobt werden, unter anderem an der FH Emden-Leer und der TU München. Der Beitrag von Dirk Asendorpf zeigt am Beispiel von Transrapid, Flugtaxis und Fracht-Zeppelinen, wie schwer es neue Verkehrsmittel haben, aus dem Versuchsstadium in den Regelbetrieb zu kommen.",
    essence:
      "Großprojekte binden über Jahrzehnte Aufmerksamkeit und Mittel, während der spürbare Nutzen meist ausbleibt. Wirksame Mobilitätswende entsteht heute aus verfügbarer Technik und guter Planung im Bestand: sichere Radinfrastruktur, verlässlicher ÖPNV, Ladeinfrastruktur und kurze Wege. Genau dort setzen unsere Konzepte an – machbar, förderfähig und kurzfristig wirksam.",
    url: "https://www.ardsounds.de/episode/urn:ard:episode:3991543e7e4c7fc0/",
    listenUrl: "https://www.ardsounds.de/episode/urn:ard:episode:3991543e7e4c7fc0/",
    links: [
      { label: "Manuskript und mehr zur Sendung (SWR)", url: "http://swr.li/neue-verkehrstechnik" },
      { label: "Institute of Hyperloop Technology, FH Emden-Leer", url: "https://iht.hs-emden-leer.de/" },
      { label: "Hyperloop-Forschung an der TU München", url: "https://tumhyperloop.com/" },
    ],
  },
  {
    category: "Mobilität",
    title: "Straßenverkehr – Freie Fahrt für freie Bürger?",
    source: "Deutschlandfunk · Lange Nacht",
    date: "2026-09-20",
    icon: "car",
    summary:
      "Die Lange Nacht widmet sich der Geschichte und Gegenwart des Straßenverkehrs in Deutschland: vom Aufstieg des Automobils über die autogerechte Stadt bis zu heutigen Konflikten um Tempo, Fläche und Sicherheit. Der Beitrag zeigt, wie stark Verkehrspolitik von Gewohnheiten und Symbolen geprägt ist.",
    essence:
      "Verkehr ist immer auch Flächenpolitik. Wer Stellplätze, Radwege und Aufenthaltsqualität gemeinsam plant, gewinnt Nutzungsfläche und Wert – statt nur Autoverkehr zu verwalten. Das ist der Ausgangspunkt unserer Mobilitätskonzepte im Baugenehmigungsverfahren.",
    url: "https://share.deutschlandradio.de/dlf-audiothek-audio-teilen.html?audio_id=dira_A6F31B8C905D11F174E148DF3755BF60",
    listenUrl:
      "https://share.deutschlandradio.de/dlf-audiothek-audio-teilen.html?audio_id=dira_A6F31B8C905D11F174E148DF3755BF60",
  },
  {
    category: "Mobilität",
    title: "Verkehrswende – In den Städten gibt es große Unterschiede",
    source: "Deutschlandfunk · Hintergrund",
    date: "2026-09-18",
    icon: "bike",
    summary:
      "Manche Städte bauen konsequent Rad- und Fußwege aus, andere kommen kaum voran. Der Beitrag vergleicht Strategien, Finanzierung und politische Mehrheiten und zeigt, woran Vorhaben in der Praxis scheitern oder gelingen.",
    essence:
      "Der Unterschied liegt selten an der Technik, sondern an Planungsqualität, Förderzugang und Beteiligung. Wir bereiten Vorhaben so auf, dass sie genehmigungsfähig, finanzierbar und vor Ort vermittelbar sind.",
    url: "https://share.deutschlandradio.de/dlf-audiothek-audio-teilen.html?audio_id=dira_0FE1F6A291B411F17C69B883034C2FA0",
    listenUrl:
      "https://share.deutschlandradio.de/dlf-audiothek-audio-teilen.html?audio_id=dira_0FE1F6A291B411F17C69B883034C2FA0",
  },
  {
    category: "Energieeffizienz",
    title: "Fernwärme, Nahwärme, Wärmepumpe, Öl, Gas: Durchblick beim Heizungstausch",
    source: "Deutschlandfunk · Marktplatz",
    date: "2026-09-16",
    icon: "heat",
    summary:
      "Welche Heizung passt zu welchem Gebäude? Die Sendung ordnet Fernwärme, Nahwärmenetze, Wärmepumpe sowie Öl und Gas ein – mit Blick auf Kosten, Förderung, Gebäudezustand und kommunale Wärmeplanung.",
    essence:
      "Die Technikwahl folgt dem Gebäude, nicht dem Trend. Erst Hüllqualität, Lastprofil und Wärmeplanung prüfen, dann Anlagentechnik und Förderung festlegen – so vermeiden Eigentümer teure Fehlentscheidungen.",
    url: "https://share.deutschlandradio.de/dlf-audiothek-audio-teilen.html?audio_id=dira_19543852B2A311F174B5B883034C2FA0",
    listenUrl:
      "https://share.deutschlandradio.de/dlf-audiothek-audio-teilen.html?audio_id=dira_19543852B2A311F174B5B883034C2FA0",
  },
  {
    category: "Klimaschutz",
    title: "Reaktanz – Wieso Klimamaßnahmen teils das Gegenteil bewirken",
    source: "Deutschlandfunk · Systemfragen",
    date: "2026-09-14",
    icon: "leaf",
    summary:
      "Vorschriften und Appelle lösen bei vielen Menschen Widerstand aus – Psychologinnen und Psychologen sprechen von Reaktanz. Der Beitrag erklärt, wann Klimamaßnahmen akzeptiert werden und wann sie ins Gegenteil umschlagen.",
    essence:
      "Akzeptanz entsteht durch Wahlmöglichkeiten, spürbaren Nutzen und ehrliche Zahlen. Deshalb stellen wir Varianten mit Kosten, Förderung und Wirkung nebeneinander – entschieden wird gemeinsam mit den Beteiligten.",
    url: "https://share.deutschlandradio.de/dlf-audiothek-audio-teilen.html?audio_id=dira_953FBE242DEB11F176A1B883034C2FA0",
    listenUrl:
      "https://share.deutschlandradio.de/dlf-audiothek-audio-teilen.html?audio_id=dira_953FBE242DEB11F176A1B883034C2FA0",
  },
];
