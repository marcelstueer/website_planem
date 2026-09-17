import { imageFilterClass, useSiteImages } from "@/lib/site-data";
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

export function SiteImage({ imageKey, fallback, alt, className, ...rest }: Props) {
  const { images } = useSiteImages();
  const image = images[imageKey];
  return (
    <img
      src={image?.url || fallback}
      alt={alt}
      className={cn(className, imageFilterClass(image))}
      {...rest}
    />
  );
}
