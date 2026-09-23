export type StudyItem = {
  /** Fachgebiet, z.B. "Klimaforschung" */
  field: string;
  title: string;
  /** Deutsche Kurzfassung des Titels */
  titleDe?: string;
  /** Fachzeitschrift */
  journal: string;
  /** Autorinnen und Autoren, Kurzform */
  authors: string;
  /** Veröffentlichungsdatum, ISO: JJJJ-MM-TT */
  date: string;
  /** DOI ohne Präfix */
  doi: string;
  /** Kurze Zusammenfassung, 2-4 Sätze */
  summary: string;
  /** Quintessenz: Einordnung aus planem-Sicht */
  essence: string;
  /** Link zur Quelle */
  url: string;
};

export const studies: StudyItem[] = [
  {
    field: "Klimaforschung",
    title: "Global Emissions Since the Paris Agreement Have Intensified Europe's Recent Heatwaves",
    titleDe:
      "Emissionen seit dem Pariser Abkommen haben Europas jüngste Hitzewellen verstärkt",
    journal: "Geophysical Research Letters (AGU)",
    authors: "Trok, Barnes, Gordon, Davenport, Diffenbaugh",
    date: "2026-09-22",
    doi: "10.1029/2026GL125079",
    summary:
      "Das Team nutzt ein generatives Machine-Learning-Modell, um Tagestemperaturen bei unterschiedlichen kumulierten Emissionsmengen zu berechnen – jeweils unter den tatsächlich beobachteten Wetterlagen. Mit über 95 % Wahrscheinlichkeit haben allein die seit dem Pariser Abkommen 2015 freigesetzten Emissionen Europas Sommer-Temperaturextreme seit 2021 verstärkt. Für die Hitzewelle im Juni 2025 liegt die Wahrscheinlichkeit bei über 99 %, dass es bei Emissionsstand 2015 kühler geblieben wäre – im Mittel um 0,34 °C.",
    essence:
      "Schon ein Jahrzehnt zusätzlicher Emissionen ist in europäischen Hitzewellen messbar. Für Gebäude und Quartiere heißt das: sommerlicher Wärmeschutz, Verschattung, Begrünung und Entsiegelung sind keine Kür, sondern Teil der Grundplanung – und jede heute vermiedene Tonne wirkt direkt auf die Belastung von morgen.",
    url: "https://agupubs.onlinelibrary.wiley.com/doi/10.1029/2026GL125079",
  },
];
