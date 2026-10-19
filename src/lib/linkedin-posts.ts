export type LinkedInPost = {
  author: string;
  handle: string;
  date: string;
  topic: string;
  text: string;
  url: string;
};

/** Stimmen aus der Fachcommunity (LinkedIn). Zitate gekürzt, Quelle jeweils verlinkt. */
export const linkedinPosts: LinkedInPost[] = [
  {
    author: "Jan Karwatzki",
    handle: "Öko-Zentrum NRW",
    date: "2026-10-06",
    topic: "Sanierungspflicht",
    text: "336.000 Nichtwohngebäude müssen saniert werden – und kaum jemand spricht drüber. § 40 GModG bringt die Sanierungspflicht für die energetisch schlechtesten Nichtwohngebäude: Ab 2030 darf der Primärenergiebedarf maximal das 3,5-fache des Referenzgebäudewerts betragen (Klasse G), ab 2033 das 2,95-fache (Klasse F). Geschätzte Investitionskosten: rund 12,9 Mrd. Euro. Viele Bestandshalter wissen noch gar nicht, welche ihrer Gebäude betroffen sind – bisherige Verbrauchsausweise können für die Bewertung nicht genutzt werden.",
    url: "https://www.linkedin.com/posts/jan-karwatzki_gmodg-activity-7513131858231025664-zHrz",
  },
];
