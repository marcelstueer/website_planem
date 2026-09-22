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
};

export const mediaItems: MediaItem[] = [
  {
    category: "Mobilität",
    title: "Transrapid, Flugtaxis, Hyperloop – Warum es neuartige Verkehrstechnik so schwer hat",
    source: "SWR Kultur · Das Wissen",
    date: "2026-09-22",
    duration: "28 Min.",
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
];
