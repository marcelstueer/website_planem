import { imageFilterClass, useSiteImages, type SiteImageRow } from "@/lib/site-data";
import { MEDIA_ICONS } from "@/lib/media-icons";
import { cn } from "@/lib/utils";

type Props = {
  imageKey: string;
  fallback: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: "lazy" | "eager";
  fetchPriority?: "high" | "low" | "auto";
};

/** Files known to be AI-generated. Shown with a visible label (EU AI Act, Art. 50). */
const AI_GENERATED = /(planem-hero|mobility-planning|energy-real)/;
export const isAiGenerated = (url?: string) => !!url && AI_GENERATED.test(url);

export function AiBadge() {
  return (
    <span className="pointer-events-none absolute bottom-2 right-2 z-10 bg-ink/70 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[.12em] text-ink-foreground">
      KI-generiertes Bild
    </span>
  );
}

/** Icon centred over an image, sized at ~22% of the shorter edge. Parent must be positioned. */
export function ImageOverlayIcon({ image }: { image?: Partial<SiteImageRow> | undefined }) {
  const entry = image?.overlay_icon ? MEDIA_ICONS[image.overlay_icon] : undefined;
  if (!entry) return null;
  const Icon = entry.icon;
  return (
    <span className="pointer-events-none absolute inset-0 flex items-center justify-center [container-type:size]">
      <Icon
        strokeWidth={1.25}
        className={cn("h-[22cqmin] w-[22cqmin]", image?.overlay_color === "brand" ? "text-primary" : "text-primary-foreground")}
      />
    </span>
  );
}

export function SiteImage({ imageKey, fallback, alt, className, ...rest }: Props) {
  const { images } = useSiteImages();
  const image = images[imageKey];
  const src = image?.url || fallback;
  const ai = isAiGenerated(src);
  const img = <img src={src} alt={ai ? `${alt} (KI-generiert)` : alt} className={cn(className, imageFilterClass(image))} {...rest} />;
  if (!image?.overlay_icon && !ai) return img;
  const absolute = className?.includes("absolute");
  return (
    <span className={cn("overflow-hidden", absolute ? "absolute inset-0" : "relative block h-full w-full")}>
      {img}
      <ImageOverlayIcon image={image} />
      {ai && <AiBadge />}
    </span>
  );
}
