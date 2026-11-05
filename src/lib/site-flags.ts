/**
 * Einziger Schalter für die Seite „Für Architekten & Planer".
 * false = Seite existiert (Vorschau unter /fuer-architekten), trägt noindex und ist nirgends verlinkt;
 *         die Kachel „Architekt / Planungsbüro" führt ins Kontaktformular.
 * true  = Verlinkung (Menü, Fußzeile, Leistungen, Startseite, Kachel) an und noindex aus.
 */
export const SHOW_ARCHITEKTEN_PAGE = false;

/**
 * Schalter für die niederländische Landing-Page /nl.
 * false = Seite existiert, trägt noindex,nofollow und ist nirgends verlinkt.
 * true  = noindex aus. Verlinkt wird die Seite auch dann nicht automatisch.
 */
export const SHOW_NL_PAGE = false;
