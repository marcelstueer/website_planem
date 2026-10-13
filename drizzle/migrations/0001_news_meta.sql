CREATE TABLE public.news_meta (
  id text PRIMARY KEY,
  short_text text NOT NULL DEFAULT '',
  help_text text NOT NULL DEFAULT '',
  featured boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.news_meta TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.news_meta TO authenticated;
GRANT ALL ON public.news_meta TO service_role;
ALTER TABLE public.news_meta ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read news meta" ON public.news_meta FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins manage news meta" ON public.news_meta FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE UNIQUE INDEX news_meta_one_featured ON public.news_meta (featured) WHERE featured;
CREATE TRIGGER news_meta_updated_at BEFORE UPDATE ON public.news_meta FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();