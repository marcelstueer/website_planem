import { useEffect, useRef, useState } from "react";
import {
  BatteryCharging, Building2, ClipboardCheck, Coins, Handshake, Route, Sprout,
  SquareParking, TreeDeciduous, Wind, type LucideIcon,
} from "lucide-react";

type Node = { icon: LucideIcon; label: string };

const NODES: Node[] = [
  { icon: Route, label: "Mobilitätskonzepte" },
  { icon: SquareParking, label: "Stellplatzreduzierung" },
  { icon: BatteryCharging, label: "E-Mobilität" },
  { icon: Building2, label: "Gebäude-Energiekonzepte" },
  { icon: Coins, label: "Fördermittel Energieeffizienz" },
  { icon: ClipboardCheck, label: "Audit & Management" },
  { icon: Wind, label: "Erneuerbare Energien" },
  { icon: Sprout, label: "Nachhaltigkeit" },
  { icon: TreeDeciduous, label: "Ökologie" },
];

const R = 34; // radius in % of the square
const RI = R * 0.55;
// Sinnvolle Verknüpfungen: Datenpunkte wandern zwischen diesen Bereichen
const FLOWS: [number, number][] = [[0, 1], [1, 2], [3, 6], [3, 4], [4, 5], [6, 7], [7, 8], [2, 6], [0, 8], [5, 3]];

export function ServiceStar() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e?.isIntersecting) { setVisible(true); io.disconnect(); } }, { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const points = NODES.map((_, i) => {
    const a = (i / NODES.length) * Math.PI * 2 - Math.PI / 2;
    return { x: 50 + R * Math.cos(a), y: 50 + R * Math.sin(a) };
  });
  const angle = (i: number) => (i / NODES.length) * Math.PI * 2 - Math.PI / 2;
  const inner = NODES.map((_, i) => ({ x: 50 + RI * Math.cos(angle(i)), y: 50 + RI * Math.sin(angle(i)) }));
  const outerPts = points.map((p) => `${p.x},${p.y}`).join(" ");
  const innerPts = inner.map((p) => `${p.x},${p.y}`).join(" ");
  // Route: Bereich → Innenring → über Ecken entlang des Rings → Bereich (und zurück)
  const flowPath = (a: number, b: number) => {
    const n = NODES.length;
    const fwd = (b - a + n) % n;
    const step = fwd <= n / 2 ? 1 : -1;
    const route = [points[a]!];
    if (Math.min(fwd, n - fwd) === 1) route.push(points[b]!);
    else {
      for (let i = a; ; i = (i + step + n) % n) { route.push(inner[i]!); if (i === b) break; }
      route.push(points[b]!);
    }
    const back = [...route].reverse().slice(1);
    return "M" + [...route, ...back].map((p) => `${p.x},${p.y}`).join(" L");
  };

  return (
    <section className="py-20 md:py-28">
      <div className="site-container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Aus einer Hand</p>
          <h2 className="mt-4 text-4xl font-light leading-tight md:text-5xl">Alle Bereiche vernetzt. Sie im Zentrum.</h2>
          <p className="mt-5 text-lg font-light leading-8 text-muted-foreground">Mobilität, Energie und Nachhaltigkeit greifen ineinander – und jede Lösung entsteht gemeinsam mit Ihnen.</p>
        </div>

        <div ref={ref}>
          {/* Desktop / tablet: radial star */}
          <div className="relative mx-auto mt-14 hidden aspect-square w-full max-w-[720px] md:block">
            <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden>
              <polygon points={outerPts} fill="none" className="stroke-primary/30" strokeWidth="0.18"
                style={{ strokeDasharray: 300, strokeDashoffset: visible ? 0 : 300, transition: "stroke-dashoffset 1.6s ease .8s" }} />
              <polygon points={innerPts} fill="none" className="stroke-border" strokeWidth="0.18" strokeDasharray="0.8 0.8" />
              {points.map((p, i) => (
                <line key={i} x1="50" y1="50" x2={p.x} y2={p.y} className="stroke-primary/70" strokeWidth="0.22"
                  style={{ strokeDasharray: 45, strokeDashoffset: visible ? 0 : 45, transition: `stroke-dashoffset 1s ease ${i * 0.08}s` }} />
              ))}
              {inner.map((p, i) => <rect key={`v${i}`} x={p.x - 0.5} y={p.y - 0.5} width="1" height="1" className="fill-background stroke-primary/60" strokeWidth="0.15" />)}
              {FLOWS.map(([a, b], i) => (
                <g key={`f${i}`} style={{ opacity: visible ? 1 : 0, transition: `opacity .6s ${1.4 + i * 0.1}s` }}>
                  <circle r="0.7" className="fill-primary">
                    <animateMotion dur={`${5 + (i % 4)}s`} begin={`${i * 0.7}s`} repeatCount="indefinite" path={flowPath(a, b)} />
                  </circle>
                  <circle r="1.6" className="fill-primary/20">
                    <animateMotion dur={`${5 + (i % 4)}s`} begin={`${i * 0.7}s`} repeatCount="indefinite" path={flowPath(a, b)} />
                  </circle>
                </g>
              ))}
            </svg>

            <div className="absolute left-1/2 top-1/2 flex size-36 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-2xl bg-ink text-ink-foreground shadow-xl ring-8 ring-primary/15">
              <Handshake className="size-9 text-brand-light" strokeWidth={1.5} />
              <span className="mt-2 text-lg font-light">Gemeinsam</span>
              <span className="text-[10px] uppercase tracking-[0.18em] text-ink-muted">mit Ihnen</span>
            </div>

            {NODES.map(({ icon: Icon, label }, i) => (
              <div key={label} style={{ opacity: visible ? 1 : 0, transition: `opacity .6s ease ${0.5 + i * 0.08}s` }}>
                <div className="absolute flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-md border border-primary/50 bg-background shadow-sm"
                  style={{ left: `${points[i]!.x}%`, top: `${points[i]!.y}%` }}>
                  <Icon className="size-6 text-primary" strokeWidth={1.5} />
                </div>
                <span className="absolute w-32 -translate-x-1/2 -translate-y-1/2 text-center text-xs font-medium leading-tight"
                  style={{ left: `${50 + (R + 11) * Math.cos(angle(i))}%`, top: `${50 + (R + 10) * Math.sin(angle(i))}%` }}>{label}</span>
              </div>
            ))}
          </div>

          {/* Mobile: stacked network */}
          <div className="mt-10 md:hidden">
            <div className="mx-auto flex w-fit flex-col items-center rounded-full bg-ink px-8 py-5 text-ink-foreground">
              <Handshake className="size-7 text-brand-light" strokeWidth={1.5} />
              <span className="mt-1 font-light">Gemeinsam mit Ihnen</span>
            </div>
            <div className="relative ml-6 mt-2 border-l border-primary/40 pl-6">
              {NODES.map(({ icon: Icon, label }, i) => (
                <div key={label} className="relative flex items-center gap-4 py-3"
                  style={{ opacity: visible ? 1 : 0, transform: `translateX(${visible ? 0 : -8}px)`, transition: `all .5s ease ${i * 0.06}s` }}>
                  <span className="absolute -left-6 top-1/2 h-px w-6 bg-primary/40" />
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-background">
                    <Icon className="size-5 text-primary" strokeWidth={1.5} />
                  </div>
                  <span className="text-sm font-medium">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
