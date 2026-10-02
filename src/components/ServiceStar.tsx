import { useEffect, useRef, useState } from "react";
import {
  BatteryCharging, Building2, ClipboardCheck, Coins, Handshake, Route, Sprout,
  SquareParking, TreeDeciduous, Wind, type LucideIcon,
} from "lucide-react";

type ServiceNode = { icon: LucideIcon; label: string; detail: string; href: string };

const NODES: ServiceNode[] = [
  { icon: Route, label: "Mobilitätskonzepte", detail: "Bedarf fundiert planen", href: "/leistungen/mobilitaetskonzepte" },
  { icon: SquareParking, label: "Stellplatzreduzierung", detail: "Vorgaben wirtschaftlich lösen", href: "/leistungen/mobilitaetskonzepte#kostenvorteile" },
  { icon: BatteryCharging, label: "E-Mobilität", detail: "Infrastruktur mitdenken", href: "/leistungen/mobilitaetskonzepte#foerderung" },
  { icon: Building2, label: "Gebäude-Energiekonzepte", detail: "Kosten langfristig senken", href: "/leistungen/energieberatung" },
  { icon: Coins, label: "Fördermittel Energieeffizienz", detail: "Chancen nutzen", href: "/leistungen/energieberatung#foerderprogramme" },
  { icon: ClipboardCheck, label: "Audit & Management", detail: "Verbrauch systematisch prüfen", href: "/leistungen/energieberatung" },
  { icon: Wind, label: "Erneuerbare Energien", detail: "Versorgung zukunftsfähig planen", href: "/leistungen/energieberatung" },
  { icon: Sprout, label: "Nachhaltigkeit", detail: "Ressourcen dauerhaft schonen", href: "/leistungen" },
  { icon: TreeDeciduous, label: "Ökologie", detail: "Natur und Projekt zusammendenken", href: "/ueber-planem" },
];

const RADIUS = 34;
const INNER_RADIUS = RADIUS * 0.55;
const FLOWS: [number, number][] = [[0, 1], [1, 2], [3, 6], [3, 4], [4, 5], [6, 7], [7, 8], [2, 6], [0, 8], [5, 3]];

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

  const angle = (index: number) => (index / NODES.length) * Math.PI * 2 - Math.PI / 2;
  const points = NODES.map((_, index) => ({
    x: 50 + RADIUS * Math.cos(angle(index)),
    y: 50 + RADIUS * Math.sin(angle(index)),
  }));
  const inner = NODES.map((_, index) => ({
    x: 50 + INNER_RADIUS * Math.cos(angle(index)),
    y: 50 + INNER_RADIUS * Math.sin(angle(index)),
  }));
  const flowPath = (start: number, end: number) => {
    const forward = (end - start + NODES.length) % NODES.length;
    const step = forward <= NODES.length / 2 ? 1 : -1;
    const route = [points[start]];
    if (Math.min(forward, NODES.length - forward) === 1) route.push(points[end]);
    else {
      for (let index = start; ; index = (index + step + NODES.length) % NODES.length) {
        route.push(inner[index]);
        if (index === end) break;
      }
      route.push(points[end]);
    }
    const validRoute = route.filter((point): point is { x: number; y: number } => Boolean(point));
    return `M${[...validRoute, ...validRoute.slice(0, -1).reverse()].map((point) => `${point.x},${point.y}`).join(" L")}`;
  };

  return (
    <section className="overflow-hidden py-20 md:py-28">
      <div className="site-container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Aus einer Hand</p>
          <h2 className="mt-4 text-4xl font-light leading-tight md:text-5xl">Alle Bereiche vernetzt. Ihr Ziel im Blick.</h2>
          <p className="mt-5 text-lg font-light leading-8 text-muted-foreground">Sie definieren das Ziel. planem koordiniert Mobilität, Gebäudeenergie und Förderung zu einer langfristig wirtschaftlichen und belastbaren Lösung.</p>
        </div>

        <div ref={ref}>
          <div className="relative mx-auto mt-14 hidden aspect-square w-full max-w-[720px] md:block">
            <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
              <polygon points={points.map((point) => `${point.x},${point.y}`).join(" ")} fill="none" className="stroke-primary/30" strokeWidth="0.18" style={{ strokeDasharray: 300, strokeDashoffset: visible ? 0 : 300, transition: "stroke-dashoffset 1.6s ease .8s" }} />
              <polygon points={inner.map((point) => `${point.x},${point.y}`).join(" ")} fill="none" className="stroke-border" strokeWidth="0.18" strokeDasharray="0.8 0.8" />
              {points.map((point, index) => <line key={NODES[index]?.label} x1="50" y1="50" x2={point.x} y2={point.y} className={activeNode === index ? "stroke-primary" : "stroke-primary/70"} strokeWidth={activeNode === index ? "0.42" : "0.22"} style={{ strokeDasharray: 45, strokeDashoffset: visible ? 0 : 45, transition: `stroke-dashoffset 1s ease ${index * 0.08}s, stroke-width .2s ease` }} />)}
              {inner.map((point, index) => <rect key={`junction-${index}`} x={point.x - 0.5} y={point.y - 0.5} width="1" height="1" className="fill-background stroke-primary/60" strokeWidth="0.15" />)}
              {visible && !reducedMotion && FLOWS.map(([start, end], index) => (
                <g key={`${start}-${end}`}>
                  <circle r="0.7" className="fill-primary"><animateMotion dur={`${5 + (index % 4)}s`} begin={index ? `-${(index * 0.7).toFixed(1)}s` : "0s"} repeatCount="indefinite" path={flowPath(start, end)} /></circle>
                  <circle r="1.6" className="fill-primary/20"><animateMotion dur={`${5 + (index % 4)}s`} begin={index ? `-${(index * 0.7).toFixed(1)}s` : "0s"} repeatCount="indefinite" path={flowPath(start, end)} /></circle>
                </g>
              ))}
            </svg>

            <div className="absolute left-1/2 top-1/2 z-20 flex size-36 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-2xl bg-ink text-ink-foreground shadow-xl ring-8 ring-primary/15">
              <Handshake className="size-9 text-brand-light" strokeWidth={1.5} />
              <span className="mt-2 text-xl font-light">planem</span>
              <span className="text-[10px] uppercase tracking-[0.18em] text-ink-muted">koordiniert</span>
            </div>

            {NODES.map(({ icon: Icon, label, detail, href }, index) => {
              const point = points[index];
              if (!point) return null;
              return (
                <a key={label} href={href} aria-label={`${label}: ${detail}`} onMouseEnter={() => setActiveNode(index)} onMouseLeave={() => setActiveNode(null)} onFocus={() => setActiveNode(index)} onBlur={() => setActiveNode(null)} className="group absolute z-30 flex w-36 -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center focus-visible:outline-none" style={{ left: `${point.x}%`, top: `${point.y}%`, opacity: visible ? 1 : 0, transition: `opacity .6s ease ${0.5 + index * 0.08}s` }}>
                  <span className="flex size-14 items-center justify-center rounded-md border border-primary/50 bg-background shadow-sm transition duration-300 group-hover:-translate-y-1 group-hover:scale-110 group-hover:border-primary group-hover:shadow-lg group-focus-visible:-translate-y-1 group-focus-visible:scale-110 group-focus-visible:ring-2 group-focus-visible:ring-ring group-focus-visible:ring-offset-2"><Icon className="size-6 text-primary" strokeWidth={1.5} /></span>
                  <span className="absolute w-36 text-center text-xs font-medium leading-tight" style={{ top: index === 0 ? "-2.1rem" : "4.25rem" }}>{label}</span>
                </a>
              );
            })}
          </div>

          <div className="mt-10 md:hidden">
            <div className="mx-auto flex w-fit flex-col items-center rounded-2xl bg-ink px-8 py-5 text-ink-foreground shadow-lg">
              <Handshake className="size-7 text-brand-light" strokeWidth={1.5} />
              <span className="mt-1 text-lg font-light">planem</span><span className="text-[10px] uppercase tracking-[0.14em] text-ink-muted">koordiniert</span>
            </div>
            <div className="relative ml-6 mt-2 border-l border-primary/40 pl-6">
              {NODES.map(({ icon: Icon, label, detail, href }, index) => (
                <a key={label} href={href} aria-label={`${label}: ${detail}`} className="group relative flex min-h-16 items-center gap-4 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" style={{ opacity: visible ? 1 : 0, transform: `translateX(${visible ? 0 : -8}px)`, transition: `all .5s ease ${index * 0.06}s` }}>
                  <span className="absolute -left-6 top-1/2 h-px w-6 bg-primary/40" />
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-md border border-primary/40 bg-background transition group-active:scale-95"><Icon className="size-5 text-primary" strokeWidth={1.5} /></span>
                  <span><span className="block text-sm font-medium">{label}</span><span className="block text-xs text-muted-foreground">{detail}</span></span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}