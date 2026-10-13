INSERT INTO public.site_content (key, value) VALUES
 ('bedarfsausweis.stand', 'Oktober 2026'),
 ('aktuelles.highlight.title', 'Nichtwohngebäude: Ab 2027 nur noch der Bedarfsausweis'),
 ('aktuelles.highlight.text', 'Für Nichtwohngebäude zählt ab 1.1.2027 nur noch der Bedarfsausweis, bei Verkauf, Vermietung und Vertragsverlängerung. Was das GModG ändert und wie planem hilft.')
ON CONFLICT (key) DO NOTHING;
INSERT INTO public.site_images (key, url, anthracite_filter, logo_overlay)
VALUES ('bedarfsausweis.hero', '/library/bedarfsausweis-hero.webp', true, true)
ON CONFLICT (key) DO NOTHING;