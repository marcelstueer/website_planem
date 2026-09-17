import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { captureAttribution, getConsent, setConsent } from "@/lib/tracking";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (getConsent() === null) setVisible(true);
    else captureAttribution();
  }, []);

  if (!visible) return null;

  function decide(value: "accepted" | "declined") {
    setConsent(value);
    setVisible(false);
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] border-t border-border bg-background/97 backdrop-blur-md">
      <div className="site-container flex flex-col gap-4 py-4 md:flex-row md:items-center md:justify-between">
        <p className="max-w-3xl text-sm leading-6 text-muted-foreground">
          Wir speichern technisch notwendige Daten. Mit Ihrer Einwilligung erfassen wir zusätzlich anonym, über welchen
          Weg Sie zu uns gefunden haben, um unsere Informationsangebote zu verbessern. Details in der{" "}
          <Link to="/datenschutz" className="underline underline-offset-4">
            Datenschutzerklärung
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-2">
          <Button variant="ghost" size="sm" onClick={() => decide("declined")}>
            Nur notwendige
          </Button>
          <Button size="sm" onClick={() => decide("accepted")}>
            Einverstanden
          </Button>
        </div>
      </div>
    </div>
  );
}
