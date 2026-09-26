INSERT INTO public.site_images (key, url, gray_filter, dim_filter, anthracite_filter, overlay_icon, overlay_color, description)
SELECT replace(key, 'home.', 'leistungen.'), url, gray_filter, dim_filter, anthracite_filter, overlay_icon, overlay_color, description
FROM public.site_images WHERE key IN ('home.mobility','home.energy')
ON CONFLICT (key) DO NOTHING;