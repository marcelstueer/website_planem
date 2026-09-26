import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { useSiteTexts } from "@/lib/site-data";
import { PageCharts } from "@/components/PageCharts";

export function SeoSection(props: { contentKey?: string }) {
  return (
    <>
      <PageCharts />
      <SeoBlock {...props} />
    </>
  );
}

function SeoBlock({ contentKey = "seo.shared" }: { contentKey?: string }) {
  const { text } = useSiteTexts();
  const [open, setOpen] = useState(false);
  const raw = text(contentKey);
  if (!raw) return null;

  const blocks = raw.split(/\n{2,}/).map((block) => block.trim()).filter(Boolean);
  const headingBlock = blocks.find((block) => block.startsWith("#"));
  const heading = headingBlock ? headingBlock.replace(/^#+\s*/, "") : "Mehr über unseren Ansatz";
  const paragraphs = blocks.filter((block) => !block.startsWith("#"));

  return (
    <section className="border-t border-border bg-secondary/60 py-12 md:py-16">
      <div className="site-container">
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          className="flex w-full items-start justify-between gap-6 text-left"
        >
          <span>
            <span className="eyebrow">Hintergrund</span>
            <span className="mt-4 block max-w-4xl text-2xl font-light leading-snug md:text-3xl">{heading}</span>
          </span>
          <ChevronDown
            className={`mt-1 size-6 shrink-0 text-primary transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          />
        </button>
        <div
          className={`grid transition-all duration-500 ease-out ${open ? "mt-8 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
        >
          <div className="overflow-hidden">
            <div className="max-w-4xl space-y-5 text-base leading-7 text-muted-foreground">
              {paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
