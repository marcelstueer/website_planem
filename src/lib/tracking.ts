const CONSENT_KEY = "planem.consent";
const ATTR_KEY = "planem.attribution";

export type Consent = "accepted" | "declined";

export type Attribution = {
  lead_source: string | null;
  referrer: string | null;
  landing_page: string | null;
};

export function getConsent(): Consent | null {
  if (typeof window === "undefined") return null;
  const value = window.localStorage.getItem(CONSENT_KEY);
  return value === "accepted" || value === "declined" ? value : null;
}

export function setConsent(value: Consent) {
  window.localStorage.setItem(CONSENT_KEY, value);
  if (value === "accepted") captureAttribution();
  else window.localStorage.removeItem(ATTR_KEY);
}

export function captureAttribution() {
  if (typeof window === "undefined") return;
  if (getConsent() !== "accepted") return;
  if (window.localStorage.getItem(ATTR_KEY)) return;
  const params = new URLSearchParams(window.location.search);
  const source =
    params.get("utm_source") ??
    params.get("gclid") ??
    (document.referrer ? new URL(document.referrer).hostname : "direkt");
  const attribution: Attribution = {
    lead_source: source,
    referrer: document.referrer || null,
    landing_page: window.location.pathname + window.location.search,
  };
  window.localStorage.setItem(ATTR_KEY, JSON.stringify(attribution));
}

export function getAttribution(): Attribution & { analytics_consent: boolean } {
  const empty = { lead_source: null, referrer: null, landing_page: null };
  if (typeof window === "undefined") return { ...empty, analytics_consent: false };
  const consented = getConsent() === "accepted";
  if (!consented) return { ...empty, analytics_consent: false };
  try {
    const stored = window.localStorage.getItem(ATTR_KEY);
    return { ...(stored ? (JSON.parse(stored) as Attribution) : empty), analytics_consent: true };
  } catch {
    return { ...empty, analytics_consent: true };
  }
}
