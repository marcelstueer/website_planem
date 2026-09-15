import type { ReactNode } from "react";

export function SectionHeading({ eyebrow, title, text, action }: { eyebrow: string; title: string; text?: string; action?: ReactNode }) {
  return <div className="mb-10 grid gap-5 border-t border-border pt-5 md:grid-cols-[1fr_2fr] md:items-end">
    <p className="eyebrow">{eyebrow}</p>
    <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
      <div><h2 className="max-w-3xl text-3xl font-light leading-tight md:text-5xl">{title}</h2>{text && <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">{text}</p>}</div>
      {action}
    </div>
  </div>;
}
