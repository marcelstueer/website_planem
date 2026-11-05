// Partner-Einträge: hier einfach weitere Objekte ergänzen.
// logo: Bild-URL oder Import (leer lassen = graues Platzhalter-Rechteck)
// url: leer lassen, solange kein Link freigegeben ist (dann wird kein Link angezeigt)
export type Partner = { name: string; person?: string; logo?: string; beschreibung: string; url?: string };

export const partners: Partner[] = [
  {
    name: "Energie & Wert",
    person: "Georg Reinhardt, Gebäudeenergieberater, Ingenieur für Erneuerbare Energien (M.Sc.)",
    beschreibung: "Partner bei Bedarfsausweisen für Nichtwohngebäude.",
    // TODO: Logo und Link nachtragen, sobald die umbenannte Website online ist.
  },
];

/** Seite und Links erst zeigen, wenn echte Partner eingetragen sind. */
export const showPartners = partners.some((p) => !p.name.startsWith("Platzhalter"));
