import { useEffect, useRef, useState } from "react";
import {
  BatteryCharging, Building2, ClipboardCheck, Coins, Handshake, Leaf, Network, Route, Sprout,
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
  { icon: Network, label: "Netzwerk-Partnerschaften" },
];

const R = 40; // radius in % of the square

export function ServiceStar() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect(); } }, { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const points = NODES.map((_, i) => {
    const a = (i / NODES.length) * Math.PI * 2 - Math.PI / 2;
    return { x: 50 + R * Math.cos(a), y: 50 + R * Math.sin(a) };
  });

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
            <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden>
              <circle cx="50" cy="50" r={R} fill="none" className="stroke-border" strokeWidth="0.15" strokeDasharray="0.6 0.9" />
              <circle cx="50" cy="50" r={R * 0.55} fill="none" className="stroke-border" strokeWidth="0.1" />
              {points.map((p, i) => {
                const n = points[(i + 1) % points.length];
                return <line key={`r${i}`} x1={p.x} y1={p.y} x2={n.x} y2={n.y} className="stroke-primary/25" strokeWidth="0.15"
                  style={{ strokeDasharray: 30, strokeDashoffset: visible ? 0 : 30, transition: `stroke-dashoffset 1.2s ease ${0.9 + i * 0.06}s` }} />;
              })}
              {points.map((p, i) => (
                <line key={i} x1="50" y1="50" x2={p.x} y2={p.y} className="stroke-primary" strokeWidth="0.25" strokeLinecap="round"
                  style={{ strokeDasharray: 45, strokeDashoffset: visible ? 0 : 45, transition: `stroke-dashoffset 1s ease ${i * 0.08}s` }} />
              ))}
              {points.map((p, i) => (
                <circle key={`d${i}`} r="0.6" className="fill-primary" style={{ opacity: visible ? 1 : 0, transition: `opacity .6s ${1 + i * 0.08}s` }}>
                  <animateMotion dur={`${4 + (i % 3)}s`} repeatCount="indefinite" path={`M50,50 L${p.x},${p.y}`} />
                </circle>
              ))}
            </svg>

            <div className="absolute left-1/2 top-1/2 flex size-36 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-ink text-ink-foreground shadow-xl ring-8 ring-primary/15">
              <Handshake className="size-9 text-brand-light" strokeWidth={1.5} />
              <span className="mt-2 text-lg font-light">Gemeinsam</span>
              <span className="text-[10px] uppercase tracking-[0.18em] text-ink-muted">mit Ihnen</span>
            </div>

            {NODES.map(({ icon: Icon, label }, i) => (
              <div key={label} className="absolute flex w-32 -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center"
                style={{ left: `${points[i].x}%`, top: `${points[i].y}%`, opacity: visible ? 1 : 0, transform: `translate(-50%,-50%) scale(${visible ? 1 : 0.85})`, transition: `all .6s ease ${0.5 + i * 0.08}s` }}>
                <div className="flex size-14 items-center justify-center rounded-full border border-primary/40 bg-background shadow-sm">
                  <Icon className="size-6 text-primary" strokeWidth={1.5} />
                </div>
                <span className="mt-2 text-xs font-medium leading-tight">{label}</span>
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
