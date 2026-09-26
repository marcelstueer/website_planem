import * as React from 'react'
import { Body, Container, Head, Heading, Html, Preview, Section, Text } from '@react-email/components'
import type { TemplateEntry } from './registry'

interface Props {
  segment?: string
  goals?: string
  stage?: string
  name?: string
  organization?: string
  email?: string
  phone?: string
  message?: string
  source?: string
}

const Row = ({ label, value }: { label: string; value?: string }) => (
  <Text style={row}>
    <strong>{label}:</strong> {value || '–'}
  </Text>
)

const ContactNotification = (p: Props) => (
  <Html lang="de" dir="ltr">
    <Head />
    <Preview>Neue Anfrage von {p.name || 'Website-Besucher'}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Neue Anfrage über planem.de</Heading>
        <Section>
          <Row label="Gruppe" value={p.segment} />
          <Row label="Ziele" value={p.goals} />
          <Row label="Projektstadium" value={p.stage} />
          <Row label="Name" value={p.name} />
          <Row label="Unternehmen" value={p.organization} />
          <Row label="E-Mail" value={p.email} />
          <Row label="Telefon" value={p.phone} />
          <Row label="Anliegen" value={p.message} />
          <Row label="Herkunft" value={p.source} />
        </Section>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: ContactNotification,
  subject: (d: Record<string, any>) => `Neue Anfrage: ${d.name ?? ''} (${d.organization ?? ''})`,
  displayName: 'Kontaktanfrage an planem',
  to: 'info@planem.de',
  previewData: {
    segment: 'Unternehmen / Gewerbebetrieb',
    goals: 'Energiekosten senken & CO₂ einsparen',
    stage: 'Konkrete Planung',
    name: 'Erika Muster',
    organization: 'Muster GmbH',
    email: 'erika@example.com',
    phone: '0251 123456',
    message: 'Bürogebäude, 2.000 m²',
    source: 'google',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }
const container = { padding: '24px', maxWidth: '560px' }
const h1 = { fontSize: '20px', fontWeight: 300, color: '#3b3b3b', borderBottom: '2px solid #40a79e', paddingBottom: '8px' }
const row = { fontSize: '14px', color: '#3b3b3b', lineHeight: '22px', margin: '6px 0', whiteSpace: 'pre-wrap' as const }
