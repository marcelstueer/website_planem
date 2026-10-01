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
    <span className="pointer-events-none absolute bottom-2 right-3 z-10 text-[10px] font-normal tracking-[.08em] text-ink-muted/80 [text-shadow:0_1px_2px_color-mix(in_oklch,var(--color-ink)_60%,transparent)]">
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

/** Planem wordmark in the top-right corner, adapted for dark filtered images. */
export function LogoOverlay({ image }: { image?: Partial<SiteImageRow> | undefined }) {
  if (!image?.logo_overlay) return null;
  return (
    <span
      className={cn(
        "pointer-events-none absolute right-[3cqmin] top-[3cqmin] z-10 flex max-w-[42%] items-center px-[2cqmin] py-[1.25cqmin] shadow-md backdrop-blur-sm",
        image.anthracite_filter ? "bg-ink/65" : "bg-background/75",
      )}
    >
      <img
        src="/planem-logo.svg"
        alt=""
        aria-hidden="true"
        className={cn("h-auto w-[32cqmin] min-w-20", image.anthracite_filter && "brightness-0 invert")}
      />
    </span>
  );
}

export function SiteImage({ imageKey, fallback, alt, className, ...rest }: Props) {
  const { images } = useSiteImages();
  const image = images[imageKey];
  const src = image?.url || fallback;
  const ai = image ? !!image.ai_label : isAiGenerated(src);
  const img = <img src={src} alt={ai ? `${alt} (KI-generiert)` : alt} className={cn(className, imageFilterClass(image))} {...rest} />;
  if (!image?.overlay_icon && !image?.logo_overlay && !ai) return img;
  const absolute = className?.includes("absolute");
  return (
    <span className={cn("overflow-hidden [container-type:size]", absolute ? "absolute inset-0" : "relative block h-full w-full")}>
      {img}
      <ImageOverlayIcon image={image} />
      <LogoOverlay image={image} />
      {ai && <AiBadge />}
    </span>
  );
}
