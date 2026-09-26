// All library photos live in public/library/ so they are part of every build
// and load on any host (Lovable or IONOS static webspace).
export type LibraryImage = { url: string; label: string };

const L = (file: string, label: string): LibraryImage => ({ url: `/library/${file}`, label });

export const imageLibrary: LibraryImage[] = [
  L("planem-hero.jpg", "Startseite: Titelbild (KI-generiert)"),
  L("mobility-japan.jpg", "Mobilität: Radweg Valencia"),
  L("energy-consulting.jpg", "Energieeffizienz: Solardach"),
  L("mobility-planning.jpg", "Mobilitätsplanung (KI-generiert)"),
  L("energy-real.jpg", "Energieberatung (KI-generiert)"),
  L("marcel-stueer-profile.webp", "Porträt Marcel Stüer (aktuell)"),
  L("lib-PXL-20260922-102604218.jpg", "Ladeinfrastruktur an der Tankstelle"),
  L("lib-PXL-20260921-065759053.jpg", "Radweg entlang der Bahnstrecke"),
  L("lib-PXL-20251124-093936531.jpg", "Fahrradstraße – Autos zu Gast"),
  L("lib-PXL-20251124-093041448-MP.jpg", "Radschnellweg an der Bahnbrücke"),
  L("lib-PXL-20260304-100040175.jpg", "Rote Radspur unter der Brücke"),
  L("lib-PXL-20251121-080428600.jpg", "Allee im Morgenlicht"),
  L("lib-PXL-20251227-134446773.jpg", "Baustelle mit Radverkehrsführung"),
  L("lib-PXL-20260612-092306969.jpg", "Rohbau / Tiefbaustelle"),
  L("lib-PXL-20251015-054257129-MP.jpg", "Japan: ländliche Straße"),
  L("lib-PXL-20251019-071728435-MP.jpg", "Japan: Stadtstraße mit Busspur"),
  L("lib-PXL-20251018-090802404.jpg", "Japan: blaue Radspur bei Nacht"),
  L("lib-PXL-20230716-213542275-NIGHT.jpg", "Überdachte Fahrradstellplätze"),
  L("lib-PXL-20251226-221348178-NIGHT.jpg", "Straßenszene bei Nacht"),
  L("lib-2024-MarcelBild.jpg", "Porträt Marcel Stüer (2024)"),
];
