import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet, Link, createRootRouteWithContext, useRouter, HeadContent, Scripts } from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { SiteShell } from "@/components/SiteShell";
import { CookieBanner } from "@/components/CookieBanner";
import { Button } from "@/components/ui/button";
import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return <div className="flex min-h-[70vh] items-center justify-center px-5"><div className="max-w-md text-center"><p className="eyebrow">Fehler 404</p><h1 className="mt-4 text-5xl font-light">Diese Seite gibt es nicht.</h1><p className="mt-4 text-muted-foreground">Vielleicht finden Sie auf der Startseite den passenden Weg.</p><Button asChild className="mt-7"><Link to="/">Zur Startseite</Link></Button></div></div>;
}
function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error); const router = useRouter();
  useEffect(() => { reportLovableError(error, { boundary: "tanstack_root_error_component" }); }, [error]);
  return <div className="flex min-h-[70vh] items-center justify-center px-5"><div className="max-w-md text-center"><h1 className="text-3xl font-light">Diese Seite konnte nicht geladen werden.</h1><p className="mt-4 text-muted-foreground">Bitte versuchen Sie es erneut.</p><Button className="mt-7" onClick={() => { router.invalidate(); reset(); }}>Erneut versuchen</Button></div></div>;
}
export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [{ charSet: "utf-8" }, { name: "viewport", content: "width=device-width, initial-scale=1" }, { name: "author", content: "planem | Ingenieur Marcel Stüer" }],
    links: [{ rel: "stylesheet", href: appCss }, { rel: "preconnect", href: "https://fonts.googleapis.com" }, { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" }, { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Outfit:wght@200;300;400;500;600&display=swap" }, { rel: "icon", href: "/favicon.png", type: "image/png" }],
  }), shellComponent: RootShell, component: RootComponent, notFoundComponent: NotFoundComponent, errorComponent: ErrorComponent,
});
function RootShell({ children }: { children: ReactNode }) { return <html lang="de"><head><HeadContent /></head><body>{children}<Scripts /></body></html>; }
function RootComponent() { const { queryClient } = Route.useRouteContext(); return <QueryClientProvider client={queryClient}><SiteShell><Outlet /></SiteShell><CookieBanner /></QueryClientProvider>; }
