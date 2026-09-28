import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";

/** Lädt externe Inhalte (Bilder/Player von Drittanbietern) erst nach Klick. */
export function ExternalContent({ label, children }: { label: string; children: ReactNode }) {
  const [loaded, setLoaded] = useState(false);
  if (loaded) return <>{children}</>;
  return (
    <div className="mt-10 flex flex-col items-start gap-4 border border-dashed border-border bg-muted/40 p-8">
      <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
        Hier wird ein externer Inhalt von {label} eingebettet. Beim Laden werden Daten an den Anbieter übertragen.
      </p>
      <Button variant="outline" onClick={() => setLoaded(true)}>Inhalt laden</Button>
    </div>
  );
}
