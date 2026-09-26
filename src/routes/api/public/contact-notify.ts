import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

const ALLOWED = ['https://planem.de', 'https://www.planem.de', 'https://planem.lovable.app']
const cors = (origin: string | null) => ({
  'Access-Control-Allow-Origin': origin && (ALLOWED.includes(origin) || origin.endsWith('.lovable.app') || origin.startsWith('http://localhost')) ? origin : ALLOWED[0],
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'content-type',
})

const Body = z.object({ id: z.string().uuid() })

export const Route = createFileRoute('/api/public/contact-notify')({
  server: {
    handlers: {
      OPTIONS: ({ request }) => new Response(null, { status: 204, headers: cors(request.headers.get('origin')) }),
      POST: async ({ request }) => {
        const headers = cors(request.headers.get('origin'))
        const parsed = Body.safeParse(await request.json().catch(() => null))
        if (!parsed.success) return new Response('Bad request', { status: 400, headers })

        // Only notify for a real, recent stored request — prevents abuse.
        const { supabaseAdmin } = await import('@/integrations/supabase/client.server')
        const { data: r } = await supabaseAdmin.from('contact_requests').select('*').eq('id', parsed.data.id).maybeSingle()
        if (!r || Date.now() - new Date(r.created_at).getTime() > 10 * 60 * 1000) {
          return new Response('Not found', { status: 404, headers })
        }

        const lines = String(r.message ?? '').split('\n')
        const pick = (p: string) => lines.find((l) => l.startsWith(p))?.slice(p.length).trim()
        const { sendTemplateEmail } = await import('@/lib/email-templates/send-email')
        try {
          await sendTemplateEmail('contact-notification', 'info@planem.de', {
            idempotencyKey: `contact-notification-${r.id}`,
            replyTo: r.email,
            templateData: {
              segment: pick('Gruppe:'),
              goals: pick('Ziele:'),
              stage: pick('Projektstadium:'),
              name: r.name,
              organization: r.organization,
              email: r.email,
              phone: r.phone,
              message: pick('Besonderheiten:') ?? (lines.length === 1 ? r.message : undefined),
              source: r.lead_source,
            },
          })
        } catch (e) {
          console.error('contact notify failed', e)
          return new Response('Send failed', { status: 502, headers })
        }
        return new Response('ok', { headers })
      },
    },
  },
})
