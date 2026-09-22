import ladesaeule from "@/assets/library/lib-PXL-20260922-102604218.jpg.asset.json";
import bahnRadweg from "@/assets/library/lib-PXL-20260921-065759053.jpg.asset.json";
import japanLandstrasse from "@/assets/library/lib-PXL-20251015-054257129-MP.jpg.asset.json";
import japanStadtstrasse from "@/assets/library/lib-PXL-20251019-071728435-MP.jpg.asset.json";
import japanRadspurNacht from "@/assets/library/lib-PXL-20251018-090802404.jpg.asset.json";
import allee from "@/assets/library/lib-PXL-20251121-080428600.jpg.asset.json";
import bahnbrueckeRad from "@/assets/library/lib-PXL-20251124-093041448-MP.jpg.asset.json";
import fahrradstrasse from "@/assets/library/lib-PXL-20251124-093936531.jpg.asset.json";
import unterfuehrung from "@/assets/library/lib-PXL-20260304-100040175.jpg.asset.json";
import baustelleTiefbau from "@/assets/library/lib-PXL-20260612-092306969.jpg.asset.json";
import baustelleRadweg from "@/assets/library/lib-PXL-20251227-134446773.jpg.asset.json";
import hafenNacht from "@/assets/library/lib-PXL-20251226-221348178-NIGHT.jpg.asset.json";
import fahrradstellplaetze from "@/assets/library/lib-PXL-20230716-213542275-NIGHT.jpg.asset.json";
import portrait from "@/assets/library/lib-2024-MarcelBild.jpg.asset.json";

export type LibraryImage = { url: string; label: string };

export const imageLibrary: LibraryImage[] = [
  { url: ladesaeule.url, label: "Ladeinfrastruktur an der Tankstelle" },
  { url: bahnRadweg.url, label: "Radweg entlang der Bahnstrecke" },
  { url: fahrradstrasse.url, label: "Fahrradstraße – Autos zu Gast" },
  { url: bahnbrueckeRad.url, label: "Radschnellweg an der Bahnbrücke" },
  { url: unterfuehrung.url, label: "Rote Radspur unter der Brücke" },
  { url: allee.url, label: "Allee im Morgenlicht" },
  { url: baustelleRadweg.url, label: "Baustelle mit Radverkehrsführung" },
  { url: baustelleTiefbau.url, label: "Rohbau / Tiefbaustelle" },
  { url: japanLandstrasse.url, label: "Japan: ländliche Straße" },
  { url: japanStadtstrasse.url, label: "Japan: Stadtstraße mit Busspur" },
  { url: japanRadspurNacht.url, label: "Japan: blaue Radspur bei Nacht" },
  { url: fahrradstellplaetze.url, label: "Überdachte Fahrradstellplätze" },
  { url: hafenNacht.url, label: "Straßenszene bei Nacht" },
  { url: portrait.url, label: "Porträt Marcel Stüer" },
];
