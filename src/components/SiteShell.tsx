import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Mail, Menu, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";

const navigation = [
  { label: "Start", to: "/" as const },
  { label: "Leistungen", to: "/leistungen" as const },
  { label: "Über planem", to: "/ueber-planem" as const },
  { label: "Aktuelles", to: "/aktuelles" as const },
  { label: "Kontakt", to: "/kontakt" as const },
];

export function SiteShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border/70 bg-background/95 backdrop-blur-md">
        <div className="site-container flex h-20 items-center justify-between gap-6">
          <Link to="/" aria-label="planem Startseite" onClick={() => setOpen(false)}>
            <img src="/planem-logo.svg" alt="planem" className="h-12 w-auto" width="166" height="48" />
          </Link>
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Hauptnavigation">
            {navigation.map((item) => item.to === "/leistungen" ? (
              <div key={item.to} className="group relative">
                <Link to={item.to} className="nav-link" activeProps={{ className: "nav-link is-active" }}>{item.label}</Link>
                <div className="invisible absolute left-0 top-full pt-4 opacity-0 transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  <Link to="/leistungen/mobilitaetskonzepte" className="block whitespace-nowrap border border-border bg-background px-4 py-3 text-sm hover:text-primary">Mobilitätskonzepte</Link>
                </div>
              </div>
            ) : (
              <Link key={item.to} to={item.to} className="nav-link" activeProps={{ className: "nav-link is-active" }}>
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="hidden lg:block">
            <Button asChild>
              <Link to="/kontakt">Gespräch anfragen <ArrowUpRight /></Link>
            </Button>
          </div>
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setOpen((value) => !value)} aria-label={open ? "Menü schließen" : "Menü öffnen"} aria-expanded={open}>
            {open ? <X /> : <Menu />}
          </Button>
        </div>
        {open && (
          <nav className="border-t border-border bg-background px-5 py-5 lg:hidden" aria-label="Mobile Navigation">
            <div className="mx-auto flex max-w-7xl flex-col gap-1">
              {navigation.map((item) => (
                <Link key={item.to} to={item.to} onClick={() => setOpen(false)} className="rounded-md px-3 py-3 text-base font-medium hover:bg-muted" activeProps={{ className: "rounded-md bg-muted px-3 py-3 text-base font-semibold text-primary" }}>
                  {item.label}
                </Link>
              ))}
              <Link to="/leistungen/mobilitaetskonzepte" onClick={() => setOpen(false)} className="rounded-md px-3 py-2 pl-7 text-sm text-muted-foreground hover:bg-muted">↳ Mobilitätskonzepte</Link>
            </div>
          </nav>
        )}
      </header>
      <main>{children}</main>
      <footer className="border-t border-border bg-ink text-ink-foreground">
        <div className="site-container grid gap-10 py-14 md:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <img src="/planem-logo.svg" alt="planem" className="mb-5 h-12 w-auto brightness-0 invert" width="166" height="48" />
            <p className="max-w-sm text-sm leading-6 text-ink-muted">Planung und Beratung für Mobilität, Energieeffizienz und ökologische Nachhaltigkeit.</p>
          </div>
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-brand-light">Kontakt</p>
            <address className="space-y-1 text-sm not-italic text-ink-muted">
              <p>planem | Ingenieur Marcel Stüer</p><p>Bohlweg 21</p><p>48147 Münster</p>
              <a className="mt-3 inline-flex items-center gap-2 text-ink-foreground hover:text-brand-light" href="mailto:info@planem.de"><Mail className="size-4" />info@planem.de</a>
            </address>
          </div>
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-brand-light">Rechtliches</p>
            <div className="flex flex-col gap-2 text-sm text-ink-muted">
              <Link to="/impressum" className="hover:text-ink-foreground">Impressum</Link>
              <Link to="/datenschutz" className="hover:text-ink-foreground">Datenschutz</Link>
            </div>
          </div>
        </div>
        <div className="border-t border-ink-border"><div className="site-container py-5 text-xs text-ink-muted">© {new Date().getFullYear()} planem. Alle Rechte vorbehalten.</div></div>
      </footer>
    </div>
  );
}
