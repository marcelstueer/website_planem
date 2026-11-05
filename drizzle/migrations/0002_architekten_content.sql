INSERT INTO public.site_images (key, url, gray_filter, dim_filter, anthracite_filter, logo_overlay)
VALUES ('architekten.hero', '/library/architekten-hero.webp', false, false, true, true)
ON CONFLICT (key) DO NOTHING;
INSERT INTO public.site_content (key, value) VALUES ('foerderung.stand', 'November 2026')
ON CONFLICT (key) DO NOTHING;