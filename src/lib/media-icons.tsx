import {
  Award, Banknote, BatteryCharging, Bike, Building2, Bus, Calculator, Car, CarFront, ChartNoAxesCombined,
  ClipboardCheck, ClipboardList, Coins, Compass, FileCheck2, Flame, FlaskConical, Gauge, GraduationCap,
  House, Leaf, MapPin, PlugZap, Route, Ruler, Scale, Sun, ThermometerSun, TrainFront, Users, Wrench, Zap,
  Wind, SolarPanel, Flower2, Bird, Recycle, Sprout, TreeDeciduous, Droplets, Globe, type LucideIcon,
} from "lucide-react";

export const MEDIA_ICONS: Record<string, { icon: LucideIcon; label: string }> = {
  bike: { icon: Bike, label: "Fahrrad" },
  car: { icon: CarFront, label: "Auto" },
  car2: { icon: Car, label: "Auto (seitlich)" },
  bus: { icon: Bus, label: "Bus" },
  train: { icon: TrainFront, label: "Zug" },
  route: { icon: Route, label: "Route" },
  map: { icon: MapPin, label: "Standort" },
  charger: { icon: PlugZap, label: "Ladesäule" },
  battery: { icon: BatteryCharging, label: "Batterie" },
  house: { icon: House, label: "Gebäude" },
  building: { icon: Building2, label: "Bürogebäude" },
  heat: { icon: Flame, label: "Heizung" },
  thermo: { icon: ThermometerSun, label: "Wärme" },
  gauge: { icon: Gauge, label: "Effizienz" },
  bolt: { icon: Zap, label: "Energie" },
  solar: { icon: Sun, label: "Sonne" },
  pv: { icon: SolarPanel, label: "Photovoltaik" },
  wind: { icon: Wind, label: "Windkraft" },
  water: { icon: Droplets, label: "Wasser" },
  renew: { icon: Recycle, label: "Erneuerbar / Kreislauf" },
  leaf: { icon: Leaf, label: "Blatt" },
  sprout: { icon: Sprout, label: "Nachhaltigkeit" },
  tree: { icon: TreeDeciduous, label: "Ökologie" },
  flower: { icon: Flower2, label: "Biodiversität" },
  bird: { icon: Bird, label: "Artenvielfalt" },
  globe: { icon: Globe, label: "Klima / Welt" },
  coins: { icon: Coins, label: "Fördermittel" },
  money: { icon: Banknote, label: "Kosten" },
  calc: { icon: Calculator, label: "Berechnung" },
  chart: { icon: ChartNoAxesCombined, label: "Diagramm" },
  ruler: { icon: Ruler, label: "Planung" },
  compass: { icon: Compass, label: "Orientierung" },
  clipboard: { icon: ClipboardList, label: "Aufnahme" },
  check: { icon: ClipboardCheck, label: "Prüfung" },
  file: { icon: FileCheck2, label: "Nachweis" },
  wrench: { icon: Wrench, label: "Umsetzung" },
  scale: { icon: Scale, label: "Recht" },
  lab: { icon: FlaskConical, label: "Wissenschaft" },
  award: { icon: Award, label: "Qualifikation" },
  grad: { icon: GraduationCap, label: "Weiterbildung" },
  users: { icon: Users, label: "Menschen" },
};

export const BRAND_COLORS = ["#40a79e", "#3387a3", "#4cb398", "#3aa09e", "#42ac9b", "#3b3b3b"];

/** Compress an image in the browser to WebP (max 2400px long edge, quality 0.82). */
export async function compressToWebp(file: File): Promise<File> {
  if (!file.type.startsWith("image/") || file.type === "image/svg+xml" || file.type === "image/gif") return file;
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, 2400 / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/webp", 0.82));
  if (!blob || blob.size >= file.size) return file;
  return new File([blob], file.name.replace(/\.[^.]+$/, "") + ".webp", { type: "image/webp" });
}
