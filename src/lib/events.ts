/**
 * Veranstaltungen. Nur freigegebene Termine eintragen (Freigabe durch Marcel Stüer).
 * Keine erfundenen Termine. Vergangene Termine werden automatisch ausgeblendet.
 */
export type SiteEvent = {
  /** ISO-Datum, z. B. "2026-12-03" */
  date: string;
  /** optional: Uhrzeit, z. B. "18:00 Uhr" */
  time?: string;
  title: string;
  /** Veranstalter */
  organizer: string;
  /** Ort oder "Online" */
  location: string;
  /** kurze Einordnung in eigenen Worten */
  text: string;
  /** Link zur Originalseite / Anmeldung */
  url: string;
};

export const events: SiteEvent[] = [];
