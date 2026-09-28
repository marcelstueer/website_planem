// Partner-Einträge: hier einfach weitere Objekte ergänzen.
// logo: Bild-URL oder Import (leer lassen = graues Platzhalter-Rechteck)
export type Partner = { name: string; logo?: string; beschreibung: string; url: string };

export const partners: Partner[] = [
  { name: "Platzhalter Partner 1", beschreibung: "Platzhalter: Hier steht in zwei bis drei Sätzen, was wir gemeinsam machen.", url: "https://example.com" },
  { name: "Platzhalter Partner 2", beschreibung: "Platzhalter: Hier steht in zwei bis drei Sätzen, was wir gemeinsam machen.", url: "https://example.com" },
  { name: "Platzhalter Partner 3", beschreibung: "Platzhalter: Hier steht in zwei bis drei Sätzen, was wir gemeinsam machen.", url: "https://example.com" },
];
