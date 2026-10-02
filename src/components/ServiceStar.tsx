import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  BatteryCharging,
  Building2,
  Coins,
  Mail,
  Phone,
  Route,
  Scale,
  Sprout,
  UserRound,
  type LucideIcon,
} from "lucide-react";

type ServiceNode = {
  icon: LucideIcon;
  label: string;
  detail: string;
  href: string;
  externalAction?: boolean;
};

const NODES: ServiceNode[] = [
  { icon: Phone, label: "Direkt anrufen", detail: "+49 (0)170 7490612", href: "tel:+491707490612", externalAction: true },
  { icon: Mail, label: "E-Mail schreiben", detail: "info@planem.de", href: "mailto:info@planem.de", externalAction: true },
  { icon: Coins, label: "Fördermittel", detail: "Chancen nutzen", href: "/leistungen/energieberatung#foerderprogramme" },
  { icon: Building2, label: "Gebäudeenergie", detail: "Kosten langfristig senken", href: "/leistungen/energieberatung" },
  { icon: Sprout, label: "Nachhaltigkeit", detail: "Zukunftsfähig handeln", href: "/leistungen" },
  { icon: BatteryCharging, label: "E-Mobilität", detail: "Infrastruktur mitdenken", href: "/leistungen/mobilitaetskonzepte#foerderung" },
  { icon: Scale, label: "Stellplatzreduzierung", detail: "Vorgaben wirtschaftlich lösen", href: "/leistungen/mobilitaetskonzepte#kostenvorteile" },
  { icon: Route, label: "Mobilitätskonzepte", detail: "Bedarf fundiert planen", href: "/leistungen/mobilitaetskonzepte" },
];

const RADIUS = 34;

export function ServiceStar() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeNode, setActiveNode] = useState<number | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const el = ref.current;
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(motionQuery.matches);
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.2 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const points = NODES.map((_, index) => {
    const angle = (index / NODES.length) * Math.PI * 2 - Math.PI / 2;
    return { x: 50 + RADIUS * Math.cos(angle), y: 50 + RADIUS * Math.sin(angle) };
  });

  return (
    <section className="overflow-hidden py-20 md:py-28">
      <div className="site-container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Aus einer Hand</p>
          <h2 className="mt-4 text-4xl font-light leading-tight md:text-5xl">Alle Bereiche vernetzt. Sie im Zentrum.</h2>
          <p className="mt-5 text-lg font-light leading-8 text-muted-foreground">Sie definieren das Ziel. planem koordiniert Mobilität, Gebäudeenergie und Förderung zu einer langfristig wirtschaftlichen und belastbaren Lösung.</p>
        </div>

        <div ref={ref}>
          <div className="relative mx-auto mt-14 hidden aspect-square w-full max-w-[760px] md:block">
            <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
              <circle cx="50" cy="50" r="16" fill="none" className="stroke-primary/35" strokeWidth="0.35" strokeDasharray="1.2 1.2" />
              <circle cx="50" cy="50" r={RADIUS} fill="none" className="stroke-border" strokeWidth="0.18" strokeDasharray="0.8 0.8" />
              {points.map((point, index) => {
                const isActive = activeNode === index;
                return (
                  <g key={NODES[index]?.label}>
                    <line
                      x1="50"
                      y1="50"
                      x2={point.x}
                      y2={point.y}
                      className={isActive ? "stroke-primary" : "stroke-primary/35"}
                      strokeWidth={isActive ? "0.48" : "0.24"}
                      style={{
                        strokeDasharray: 48,
                        strokeDashoffset: visible ? 0 : 48,
                        transition: `stroke-dashoffset 1s ease ${index * 0.08}s, stroke-width .2s ease, stroke .2s ease`,
                      }}
                    />
                    {visible && !reducedMotion && (
                      <circle r={isActive ? "0.9" : "0.55"} className="fill-primary">
                        <animateMotion
                          dur={isActive ? "2.8s" : `${4.8 + (index % 3)}s`}
                          begin={`-${(index * 0.55).toFixed(1)}s`}
                          repeatCount="indefinite"
                          path={`M50,50 L${point.x},${point.y} L50,50`}
                        />
                      </circle>
                    )}
                  </g>
                );
              })}
            </svg>

            <div className="absolute left-1/2 top-1/2 z-20 flex size-48 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border-4 border-primary bg-background p-5 text-center shadow-xl">
              <UserRound className="size-8 text-primary" strokeWidth={1.5} />
              <span className="mt-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-primary">Ihr Projekt</span>
              <strong className="mt-1 text-lg font-medium leading-tight">Sie im Mittelpunkt</strong>
              <span className="mt-2 text-[11px] leading-4 text-muted-foreground">wirtschaftlich · regelkonform · langfristig</span>
            </div>
            <div className="absolute left-1/2 top-[31%] z-20 -translate-x-1/2 bg-primary px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-primary-foreground shadow-sm">
              planem koordiniert
            </div>

            {NODES.map(({ icon: Icon, label, detail, href, externalAction }, index) => {
              const point = points[index];
              if (!point) return null;
              return (
                <a
                  key={label}
                  href={href}
                  onMouseEnter={() => setActiveNode(index)}
                  onMouseLeave={() => setActiveNode(null)}
                  onFocus={() => setActiveNode(index)}
                  onBlur={() => setActiveNode(null)}
                  aria-label={`${label}: ${detail}`}
                  className="group absolute z-30 flex w-40 -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center focus-visible:outline-none"
                  style={{
                    left: `${point.x}%`,
                    top: `${point.y}%`,
                    opacity: visible ? 1 : 0,
                    transition: `opacity .5s ease ${0.35 + index * 0.07}s`,
                  }}
                >
                  <span className="flex size-16 items-center justify-center rounded-md border border-primary/45 bg-background shadow-md transition duration-300 group-hover:-translate-y-1 group-hover:scale-125 group-hover:border-primary group-hover:shadow-xl group-focus-visible:-translate-y-1 group-focus-visible:scale-125 group-focus-visible:border-primary group-focus-visible:ring-2 group-focus-visible:ring-ring group-focus-visible:ring-offset-2">
                    <Icon className="size-7 text-primary transition-transform duration-300 group-hover:scale-105" strokeWidth={1.5} />
                  </span>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold leading-tight text-foreground">
                    {label}<ArrowUpRight className="size-3 text-primary opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100" aria-hidden="true" />
                  </span>
                  <span className="mt-1 text-[11px] leading-4 text-muted-foreground">{detail}</span>
                  {externalAction && <span className="sr-only">Direkte Kontaktaktion</span>}
                </a>
              );
            })}
          </div>

          <div className="mt-10 md:hidden">
            <div className="mx-auto flex max-w-xs flex-col items-center rounded-md border-2 border-primary bg-background px-6 py-5 text-center shadow-lg">
              <UserRound className="size-7 text-primary" strokeWidth={1.5} />
              <span className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-primary">Ihr Projekt</span>
              <strong className="mt-1 text-lg font-medium">Sie im Mittelpunkt</strong>
              <span className="mt-2 text-xs leading-5 text-muted-foreground">wirtschaftlich · regelkonform · langfristig</span>
              <span className="mt-4 bg-primary px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-primary-foreground">planem koordiniert</span>
            </div>
            <div className="relative mt-7 grid gap-3 sm:grid-cols-2">
              {NODES.map(({ icon: Icon, label, detail, href }, index) => (
                <a
                  key={label}
                  href={href}
                  className="group flex min-h-20 items-center gap-4 border border-border bg-background p-4 shadow-sm transition duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  style={{ opacity: visible ? 1 : 0, transform: `translateY(${visible ? 0 : 8}px)`, transitionDelay: `${index * 0.05}s` }}
                >
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-md border border-primary/40 bg-secondary">
                    <Icon className="size-5 text-primary" strokeWidth={1.5} />
                  </span>
                  <span className="min-w-0 text-left">
                    <span className="flex items-center gap-1 text-sm font-semibold">{label}<ArrowUpRight className="size-3 shrink-0 text-primary" /></span>
                    <span className="mt-1 block text-xs leading-4 text-muted-foreground">{detail}</span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}