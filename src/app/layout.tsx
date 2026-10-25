import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Suspense } from "react";
import { Analytics } from "@vercel/analytics/next";
import VisitSourceTracker from "@/components/VisitSourceTracker";

// Fonts are bundled in src/app/fonts (SIL Open Font License, from Fontsource) instead of
// next/font/google, so the build never downloads anything. A Google Fonts network blip
// failed the content loop's build on 2026-10-19. Same families and weights as before.
const cormorant = localFont({
  src: "./fonts/cormorant-garamond-latin-wght-normal.woff2",
  weight: "300 700",
  variable: "--font-cormorant",
  display: "swap",
});

const montserrat = localFont({
  src: "./fonts/montserrat-latin-wght-normal.woff2",
  weight: "300 700",
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tovyphotography.com"),
  title: {
    default: "Tovy Photography | Skokie Family & Newborn Photographer",
    template: "%s | Tovy Photography",
  },
  description:
    "Skokie family, newborn, maternity and milestone photographer. Natural light sessions at home or on location across Chicago's North Shore.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://tovyphotography.com",
    siteName: "Tovy Photography",
    images: [
      {
        url: "https://tovyphotography.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Tovy Photography — Family & Newborn Photographer in Skokie, IL",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${montserrat.variable}`}>
      <body className="font-[family-name:var(--font-montserrat)] antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
        <Suspense fallback={null}>
          <VisitSourceTracker />
        </Suspense>
        <Analytics />
      </body>
    </html>
  );
}
