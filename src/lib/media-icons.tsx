import { Bike, Bus, CarFront, Flame, House, Leaf, PlugZap, Sun, TrainFront, Zap, type LucideIcon } from "lucide-react";

export const MEDIA_ICONS: Record<string, { icon: LucideIcon; label: string }> = {
  bike: { icon: Bike, label: "Fahrrad" },
  car: { icon: CarFront, label: "Auto" },
  bus: { icon: Bus, label: "Bus" },
  train: { icon: TrainFront, label: "Zug" },
  house: { icon: House, label: "Gebäude" },
  heat: { icon: Flame, label: "Heizung" },
  solar: { icon: Sun, label: "Solar" },
  leaf: { icon: Leaf, label: "Blatt" },
  bolt: { icon: Zap, label: "Energie" },
  charger: { icon: PlugZap, label: "Ladesäule" },
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
