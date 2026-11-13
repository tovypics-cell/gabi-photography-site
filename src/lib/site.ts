// Single source of truth for business facts used in metadata and JSON-LD.
// Keep these in sync with the Google Business Profile (NAP consistency).

export const site = {
  name: "Tovy Photography",
  url: "https://tovyphotography.com",
  photographer: "Gabi Tovy",
  email: "tovypics@gmail.com",
  phone: "+1-847-542-2073",
  phoneDisplay: "(847) 542-2073",
  instagram: "https://www.instagram.com/tovyphotography/",
  instagramHandle: "@tovyphotography",
  locality: "Skokie",
  region: "IL",
  postalCode: "60076",
  country: "US",
  geo: { latitude: 42.0334, longitude: -87.7334 },
  // Published package prices. Update here and everything downstream follows.
  pricing: {
    mini: 300,
    classic: 425,
    full: 550,
    travelFee: 50,
    extraTimePer15Min: 100,
    // Date the current prices took effect (YYYY-MM-DD). Shown as "Prices current as of ..." on
    // /sessions and the cost guides, so AI answers and readers can tell old quotes from new ones.
    // Change it whenever a price changes.
    updated: "2026-10-29",
  },
  priceRange: "$300-$550",
  tagline: "Seeing the good in your world",
};

export const serviceAreaNames = [
  "Skokie",
  "Evanston",
  "Lincolnwood",
  "Wilmette",
  "Morton Grove",
  "Glenview",
  "Niles",
  "Northbrook",
  "Park Ridge",
  "Winnetka",
  "Highland Park",
  "West Rogers Park",
  "Chicago",
];

// One business and one person for the whole site. Every page refers to these IDs, so search
// engines and AI tools see a single Tovy Photography, not one business per page.
export const businessId = `${site.url}/#business`;
export const personId = `${site.url}/#gabi`;
export const logoUrl = `${site.url}/icon.png`; // src/app/icon.png, 192x192 monogram

// Share image for pages without a photo of their own (public/og-image.jpg, 1200x630).
export const defaultOgImage = {
  url: `${site.url}/og-image.jpg`,
  width: 1200,
  height: 630,
  alt: "Parents with their newborn and two young children smiling together on a bed during an in-home family session",
};

// Open Graph images for a page photo, falling back to the default share image.
export function ogImages(src?: string | null, alt?: string) {
  if (!src) return [defaultOgImage];
  return [{ url: src.startsWith("http") ? src : `${site.url}${src}`, ...(alt ? { alt } : {}) }];
}

// Long date for visible "as of" lines, e.g. "October 29, 2026".
export function formatLongDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

// Short references to the business and to Gabi, for provider, publisher and author fields.
export function businessRef() {
  return {
    "@type": ["LocalBusiness", "Photographer"],
    "@id": businessId,
    name: site.name,
    url: site.url,
  };
}

export function personRef() {
  return {
    "@type": "Person",
    "@id": personId,
    name: site.photographer,
    url: `${site.url}/about`,
  };
}

export function serviceJsonLd(opts: {
  name: string;
  serviceType: string;
  url: string;
  description?: string;
  image?: string;
  areaServed?: unknown;
  offers?: unknown;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    serviceType: opts.serviceType,
    url: opts.url,
    ...(opts.description ? { description: opts.description } : {}),
    ...(opts.image ? { image: opts.image } : {}),
    provider: businessRef(),
    areaServed: opts.areaServed ?? serviceAreaNames.map((name) => ({ "@type": "City", name })),
    ...(opts.offers ? { offers: opts.offers } : {}),
  };
}

export function localBusinessJsonLd(overrides: Record<string, unknown> = {}) {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "Photographer"],
    "@id": businessId,
    name: site.name,
    url: site.url,
    logo: logoUrl,
    telephone: site.phone,
    email: site.email,
    image: `${site.url}/photos/hero-engagement-lift.jpg`,
    priceRange: site.priceRange,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.locality,
      addressRegion: site.region,
      addressCountry: site.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.latitude,
      longitude: site.geo.longitude,
    },
    areaServed: serviceAreaNames.map((name) => ({ "@type": "City", name })),
    sameAs: [site.instagram, "https://www.google.com/maps?cid=1458546516513406671"],
    founder: personRef(),
    ...overrides,
  };
}

export interface Faq {
  question: string;
  answer: string;
}

// FAQPage JSON-LD. Ampersands are avoided in copy so the output stays clean.
export function faqJsonLd(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
