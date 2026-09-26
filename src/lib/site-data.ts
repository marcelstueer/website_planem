import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type SiteImageRow = {
  key: string;
  url: string | null;
  gray_filter: boolean;
  dim_filter: boolean;
  anthracite_filter?: boolean;
  overlay_icon?: string | null;
  overlay_color?: string;
  description?: string;
};

export const SITE_IMAGE_COLUMNS = "key,url,gray_filter,dim_filter,anthracite_filter,overlay_icon,overlay_color,description";

export function useSiteTexts() {
  const query = useQuery({
    queryKey: ["site_content"],
    staleTime: 30_000,
    queryFn: async () => {
      const { data, error } = await supabase.from("site_content").select("key,value");
      if (error) throw error;
      return Object.fromEntries((data ?? []).map((row) => [row.key, row.value])) as Record<string, string>;
    },
  });
  const text = (key: string, fallback = "") => query.data?.[key] ?? fallback;
  return { text, texts: query.data ?? {}, isLoading: query.isLoading };
}

export function useSiteImages() {
  const query = useQuery({
    queryKey: ["site_images"],
    staleTime: 30_000,
    queryFn: async () => {
      const { data, error } = await supabase.from("site_images").select(SITE_IMAGE_COLUMNS);
      if (error) throw error;
      return Object.fromEntries((data ?? []).map((row) => [row.key, row as SiteImageRow])) as Record<string, SiteImageRow>;
    },
  });
  return { images: query.data ?? {}, isLoading: query.isLoading };
}

export function imageFilterClass(image?: Partial<SiteImageRow>) {
  if (!image) return "";
  if (image.anthracite_filter) return "grayscale brightness-[.55] contrast-[1.05]";
  return [image.gray_filter ? "grayscale-[.55]" : "", image.dim_filter ? "brightness-90" : ""]
    .filter(Boolean)
    .join(" ");
}
