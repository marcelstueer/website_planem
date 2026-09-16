ALTER TABLE public.contact_requests
  ADD COLUMN IF NOT EXISTS segment text,
  ADD COLUMN IF NOT EXISTS goals text[] NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS project_stage text;

ALTER TABLE public.contact_requests ALTER COLUMN message DROP NOT NULL;
ALTER TABLE public.contact_requests ALTER COLUMN message SET DEFAULT '';