ALTER TABLE public.site_images
  ADD COLUMN anthracite_filter boolean NOT NULL DEFAULT false,
  ADD COLUMN overlay_icon text,
  ADD COLUMN overlay_color text NOT NULL DEFAULT 'white',
  ADD COLUMN description text NOT NULL DEFAULT '';

CREATE TABLE public.media_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  kind text NOT NULL DEFAULT 'image',
  url text NOT NULL,
  path text,
  name text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  size_bytes integer,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.media_items TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.media_items TO authenticated;
GRANT ALL ON public.media_items TO service_role;
ALTER TABLE public.media_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read media" ON public.media_items FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins manage media" ON public.media_items FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

CREATE TABLE public.charts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL DEFAULT '',
  subtitle text NOT NULL DEFAULT '',
  chart_type text NOT NULL DEFAULT 'bar',
  data jsonb NOT NULL DEFAULT '[]'::jsonb,
  unit text NOT NULL DEFAULT '',
  icon text,
  image_url text,
  source text NOT NULL DEFAULT '',
  page text NOT NULL DEFAULT '',
  position integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.charts TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.charts TO authenticated;
GRANT ALL ON public.charts TO service_role;
ALTER TABLE public.charts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read charts" ON public.charts FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins manage charts" ON public.charts FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER charts_updated_at BEFORE UPDATE ON public.charts FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();