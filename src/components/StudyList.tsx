import { ExternalLink, FlaskConical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { studies } from "@/lib/studies";

export function StudyList() {
  return (
    <div className="mt-10 grid gap-px bg-border lg:grid-cols-2">
      {studies.map((study) => (
        <article key={study.doi} className="flex h-full flex-col bg-background p-7 md:p-9">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs uppercase tracking-[.16em] text-muted-foreground">
            <span className="border border-primary px-2 py-1 font-semibold text-primary">
              {study.field}
            </span>
            <span>{study.journal}</span>
            <span>{new Date(study.date).toLocaleDateString("de-DE")}</span>
          </div>
          <FlaskConical className="mt-7 size-8 text-primary" strokeWidth={1.2} />
          <h3 className="mt-5 text-xl font-light leading-snug">
            {study.titleDe ?? study.title}
          </h3>
          {study.titleDe ? (
            <p className="mt-2 text-sm italic leading-6 text-muted-foreground">{study.title}</p>
          ) : null}
          <p className="mt-3 text-xs text-muted-foreground">
            {study.authors} · DOI {study.doi}
          </p>
          <p className="mt-5 text-sm leading-7 text-muted-foreground">{study.summary}</p>
          <div className="mt-5 border-l-2 border-primary pl-4">
            <p className="eyebrow">Quintessenz</p>
            <p className="mt-2 text-sm leading-7">{study.essence}</p>
          </div>
          <div className="mt-auto pt-7">
            <Button asChild size="sm" variant="outline">
              <a href={study.url} target="_blank" rel="noopener noreferrer">
                Zur Studie <ExternalLink />
              </a>
            </Button>
          </div>
        </article>
      ))}
    </div>
  );
}
