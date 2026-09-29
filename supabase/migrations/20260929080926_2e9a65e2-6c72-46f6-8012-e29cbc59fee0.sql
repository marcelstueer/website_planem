ALTER TABLE public.site_images ADD COLUMN ai_label boolean NOT NULL DEFAULT false;
UPDATE public.site_images SET ai_label = true WHERE key IN ('home.hero');