// Remembers where a visitor came from so an inquiry can say which page brought them.
// First-party browser storage only; nothing is sent anywhere until the contact form is submitted.

const FIRST_TOUCH_KEY = "tovy_first_touch";
const LAST_PAGE_KEY = "tovy_last_page";
const FIRST_TOUCH_DAYS = 30;

export interface FirstTouch {
  landing: string; // first page they saw, path plus query
  source: string; // plain-language source, e.g. "Google search"
  referrer: string; // raw referring host, or ""
  date: string; // YYYY-MM-DD of the first visit
  ts: number;
}

function describeSource(referrerHost: string, params: URLSearchParams): string {
  const utm = params.get("utm_source");
  if (utm) {
    const medium = params.get("utm_medium");
    const campaign = params.get("utm_campaign");
    return [`Tagged link: ${utm}`, medium, campaign].filter(Boolean).join(" / ");
  }
  if (params.get("gclid")) return "Google Ads";
  if (params.get("fbclid")) return "Facebook or Instagram link";
  const h = referrerHost.toLowerCase();
  if (!h) return "Direct (typed the address, a bookmark, a text or email link, or an app)";
  if (h.includes("google.")) return "Google search";
  if (h.includes("bing.")) return "Bing search";
  if (h.includes("duckduckgo.")) return "DuckDuckGo search";
  if (h.includes("yahoo.")) return "Yahoo search";
  if (h.includes("chatgpt.") || h.includes("openai.")) return "ChatGPT";
  if (h.includes("perplexity.")) return "Perplexity";
  if (h.includes("claude.ai")) return "Claude";
  if (h.includes("gemini.")) return "Gemini";
  if (h.includes("instagram.")) return "Instagram";
  if (h.includes("facebook.") || h === "l.facebook.com" || h === "lm.facebook.com") return "Facebook";
  if (h.includes("pinterest.")) return "Pinterest";
  if (h.includes("yelp.")) return "Yelp";
  if (h.includes("nextdoor.")) return "Nextdoor";
  return `Another website: ${h}`;
}

function safeGet(storage: Storage, key: string): string | null {
  try {
    return storage.getItem(key);
  } catch {
    return null;
  }
}

function safeSet(storage: Storage, key: string, value: string) {
  try {
    storage.setItem(key, value);
  } catch {
    /* storage blocked: nothing to remember */
  }
}

// Called on every page view.
export function recordPageView(pathWithQuery: string) {
  if (typeof window === "undefined") return;
  const path = pathWithQuery.split("?")[0];

  const raw = safeGet(window.localStorage, FIRST_TOUCH_KEY);
  let existing: FirstTouch | null = null;
  try {
    existing = raw ? (JSON.parse(raw) as FirstTouch) : null;
  } catch {
    existing = null;
  }
  const expired = existing && Date.now() - existing.ts > FIRST_TOUCH_DAYS * 86400000;
  if (!existing || expired) {
    let referrerHost = "";
    try {
      const ref = document.referrer ? new URL(document.referrer) : null;
      if (ref && ref.host !== window.location.host) referrerHost = ref.host;
    } catch {
      referrerHost = "";
    }
    const params = new URLSearchParams(window.location.search);
    const touch: FirstTouch = {
      landing: pathWithQuery,
      source: describeSource(referrerHost, params),
      referrer: referrerHost,
      date: new Date().toISOString().slice(0, 10),
      ts: Date.now(),
    };
    safeSet(window.localStorage, FIRST_TOUCH_KEY, JSON.stringify(touch));
  }

  if (path !== "/contact") {
    safeSet(window.sessionStorage, LAST_PAGE_KEY, pathWithQuery);
    safeSet(window.localStorage, LAST_PAGE_KEY, pathWithQuery);
  }
}

// Called when the contact form is submitted.
export function readVisitSource(): { landing: string; before: string; source: string; firstVisit: string } {
  const fallback = { landing: "unknown", before: "unknown", source: "unknown", firstVisit: "unknown" };
  if (typeof window === "undefined") return fallback;
  let touch: FirstTouch | null = null;
  try {
    const raw = safeGet(window.localStorage, FIRST_TOUCH_KEY);
    touch = raw ? (JSON.parse(raw) as FirstTouch) : null;
  } catch {
    touch = null;
  }
  const before =
    safeGet(window.sessionStorage, LAST_PAGE_KEY) ||
    safeGet(window.localStorage, LAST_PAGE_KEY) ||
    "Came straight to the contact page";
  return {
    landing: touch?.landing || fallback.landing,
    before,
    source: touch?.source || fallback.source,
    firstVisit: touch?.date || fallback.firstVisit,
  };
}
