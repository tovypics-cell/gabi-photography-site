import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Gabi Tovy, Skokie Family Photographer",
  description:
    "Meet Gabi Tovy, the Skokie family photographer behind Tovy Photography. Natural light family and newborn sessions across the North Shore, from $200.",
  alternates: {
    canonical: "https://tovyphotography.com/about",
  },
  openGraph: {
    title: "About Gabi Tovy | Tovy Photography",
    description:
      "Meet the photographer behind Tovy Photography. Skokie-based family & newborn photographer capturing real moments with natural light.",
    url: "https://tovyphotography.com/about",
  },
};

const faqs = [
  {
    q: "Who is the photographer behind Tovy Photography?",
    a: "I am. I'm Gabi Tovy, a family photographer and mom based in Skokie, Illinois, and I photograph families, newborns, milestones and events.",
  },
  {
    q: "What areas do you serve?",
    a: "I photograph in Skokie, Evanston, Lincolnwood, Wilmette and the nearby North Shore towns, plus Chicago. Sessions happen in your home or at an outdoor spot near you.",
  },
  {
    q: "What is your photography style?",
    a: "My style is natural light lifestyle photography: calm, a little playful, and gently guided without over-posing. The images are edited to feel warm, natural and timeless.",
  },
  {
    q: "How much does a family session with Tovy Photography cost?",
    a: `Sessions start at $${site.pricing.mini} for a Mini session. The Classic session is $${site.pricing.classic} and the Full session is $${site.pricing.full}, and events are quoted individually.`,
  },
  {
    q: "How long until I get my photos?",
    a: "Your gallery of edited images will be ready within 2-3 weeks. Each photo is edited to feel warm, natural and timeless.",
  },
];

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.photographer,
    jobTitle: "Family Photographer",
    worksFor: {
      "@type": "LocalBusiness",
      name: site.name,
      url: site.url,
    },
    description:
      "Skokie-based family and newborn photographer specializing in authentic lifestyle photography.",
    url: "https://tovyphotography.com/about",
    image: `${site.url}/photos/gabi-portrait.jpg`,
    sameAs: [site.instagram],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Skokie",
      addressRegion: "IL",
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Hero: rose pink background */}
      <section className="bg-rose px-6 pt-32 pb-16 md:pb-20">
        <div className="mx-auto max-w-7xl">
          <h1 className="font-[family-name:var(--font-cormorant)] text-4xl md:text-6xl text-white">
            About Gabi
          </h1>
        </div>
      </section>

      {/* Citable summary */}
      <section className="px-6 pt-16 lg:px-8">
        <div className="mx-auto max-w-3xl text-lg md:text-xl leading-relaxed text-charcoal">
          <p>
            Gabi Tovy is the Skokie family photographer behind Tovy Photography,
            photographing families, newborns, milestones and events in Skokie,
            Evanston, Wilmette, Lincolnwood and across Chicago&apos;s North Shore.
            Sessions happen in your home or outdoors in natural light, and they
            start at ${site.pricing.mini}.
          </p>
        </div>
      </section>

      {/* Bio Section */}
      <section className="px-6 py-20 md:py-32 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-16 md:grid-cols-2 items-start">
          <div className="relative aspect-[3/4] overflow-hidden md:sticky md:top-24">
            <Image
              src="/photos/gabi-portrait.jpg"
              alt="Gabi Tovy, Skokie family photographer, portrait for Tovy Photography"
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 50vw"
              quality={85}
            />
          </div>
          <div>
            <ScrollReveal animation="fade-up">
              <h2 className="font-[family-name:var(--font-cormorant)] text-3xl md:text-4xl mb-8 text-charcoal">
                Hi! I&apos;m Gabi
              </h2>
            </ScrollReveal>
            <div className="space-y-6 text-charcoal-light leading-relaxed">
              <ScrollReveal animation="fade-up" delay={100}>
                <p>
                  I&apos;ve always been the one trailing behind on family walks,
                  too busy capturing moments to keep up.
                </p>
              </ScrollReveal>
              <ScrollReveal animation="fade-up" delay={200}>
                <p>
                  Becoming a mom only made it worse (better?). Watching my son
                  grow, I started feeling how fast it all moves. Then one day he
                  said one of his very first phrases: &ldquo;Do it, do it,
                  do it!&rdquo; I laughed, but honestly? It hit me. He was right.
                  So I did it. I picked up my camera for real and never looked back.
                </p>
              </ScrollReveal>
              <ScrollReveal animation="fade-up" delay={300}>
                <p>
                  Now I get to point the camera at what I love most: real families,
                  real mess, real love. I photograph in people&apos;s homes where
                  life actually happens, and when Chicago gives us one of those
                  golden evenings, we take it outside and soak it in.
                </p>
              </ScrollReveal>
              <ScrollReveal animation="fade-up" delay={400}>
                <p>
                  My sessions are calm, a little playful, and always guided by what
                  makes your family <em className="italic">you.</em> I want you
                  laughing, snuggling, being yourselves, and I&apos;ll be there
                  catching the moments you&apos;ll be so glad you have.
                </p>
              </ScrollReveal>
              <ScrollReveal animation="fade-up" delay={500}>
                <p>
                  It&apos;s about slowing down for the moments that move too fast,
                  so that years from now, one look pulls you right back in and you
                  feel every bit of it all over again.
                </p>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="bg-white px-6 py-20 md:py-32 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <ScrollReveal animation="fade-in">
            <h2 className="font-[family-name:var(--font-cormorant)] text-3xl md:text-5xl mb-8 text-charcoal">
              My Philosophy
            </h2>
          </ScrollReveal>
          <ScrollReveal animation="scale-in" delay={200}>
            <blockquote className="text-lg md:text-xl italic leading-relaxed text-charcoal-light">
              &ldquo;I&apos;m here to notice what you&apos;re too busy living to
              see, the quiet looks, the real laughs, the love that fills your
              home. Those are the moments worth keeping.&rdquo;
            </blockquote>
          </ScrollReveal>
        </div>
      </section>

      {/* Questions people ask about Tovy Photography */}
      <section className="px-6 py-20 md:py-28 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <ScrollReveal animation="fade-up">
            <h2 className="font-[family-name:var(--font-cormorant)] text-3xl md:text-4xl mb-10 text-charcoal">
              Your Skokie family photographer
            </h2>
            <div className="space-y-4 text-charcoal-light leading-relaxed">
              <h3 className="font-[family-name:var(--font-cormorant)] text-2xl text-charcoal">
                Who is the photographer behind Tovy Photography?
              </h3>
              <p>
                I am. I&apos;m Gabi Tovy, a family photographer and mom based in
                Skokie, Illinois. I photograph families, newborns, milestones like
                birthdays and engagements, and events like Bar Mitzvahs. You can see
                real sessions in my{" "}
                <Link
                  href="/gallery"
                  className="text-sage-dark underline underline-offset-4"
                >
                  gallery
                </Link>
                .
              </p>
              <h3 className="font-[family-name:var(--font-cormorant)] text-2xl pt-4 text-charcoal">
                What areas do you serve?
              </h3>
              <p>
                I photograph in{" "}
                <Link
                  href="/locations/skokie"
                  className="text-sage-dark underline underline-offset-4"
                >
                  Skokie
                </Link>
                , Evanston, Lincolnwood, Wilmette and the nearby North Shore towns,
                plus Chicago. Past sessions include a{" "}
                <Link
                  href="/gallery/family/keay-nature-center-wilmette-family-session"
                  className="text-sage-dark underline underline-offset-4"
                >
                  family session at Keay Nature Center in Wilmette
                </Link>
                , in-home newborn sessions in Skokie, and engagement photos at
                Garfield Park Conservatory in Chicago.
              </p>
              <h3 className="font-[family-name:var(--font-cormorant)] text-2xl pt-4 text-charcoal">
                What is your photography style?
              </h3>
              <p>
                My style is natural light lifestyle photography: calm, a little
                playful, and gently guided without over-posing. I photograph{" "}
                <Link
                  href="/sessions/family-photography"
                  className="text-sage-dark underline underline-offset-4"
                >
                  family sessions
                </Link>{" "}
                at home or outdoors, and{" "}
                <Link
                  href="/sessions/newborn-photography"
                  className="text-sage-dark underline underline-offset-4"
                >
                  newborn sessions
                </Link>{" "}
                in your home by the window, so the photos look like your real
                life. Sessions start at ${site.pricing.mini}, and you can compare
                every package on the{" "}
                <Link
                  href="/sessions"
                  className="text-sage-dark underline underline-offset-4"
                >
                  sessions and pricing page
                </Link>
                .
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* What to Expect */}
      <section className="px-6 py-20 md:py-32 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-[family-name:var(--font-cormorant)] text-3xl md:text-5xl mb-12 text-center text-charcoal">
            What to Expect
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            {[
              { title: "Before Your Session", text: "We\u2019ll chat about what matters to you, pick the perfect location (or plan an in-home session), and I\u2019ll share tips on wardrobe, timing, and how to prep the kids. Hint: just let them be themselves." },
              { title: "During the Session", text: "Expect a relaxed, playful atmosphere. I gently guide without over-posing. The best shots come from real interactions, a tickle fight, a whispered secret, a spontaneous hug. I\u2019m there to capture it all." },
              { title: "After the Session", text: "Your gallery of beautifully edited images will be ready within 2-3 weeks. Each photo is carefully edited to feel warm, natural, and timeless, exactly how you remember the moment." },
              { title: "The Result", text: "Images you\u2019ll want to frame, share, and come back to again and again. Photos that remind you of how it felt, the warmth, the laughter, the love that fills your everyday." },
            ].map((item, i) => (
              <ScrollReveal key={i} animation="fade-up" delay={i * 150}>
                <div className="space-y-4">
                  <h3 className="font-[family-name:var(--font-cormorant)] text-2xl text-charcoal">
                    {item.title}
                  </h3>
                  <p className="text-charcoal-light leading-relaxed">
                    {item.text}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white px-6 py-20 md:py-28 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <ScrollReveal animation="fade-up">
            <h2 className="font-[family-name:var(--font-cormorant)] text-3xl md:text-4xl mb-10 text-charcoal text-center">
              Common questions about Tovy Photography
            </h2>
          </ScrollReveal>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <ScrollReveal key={i} animation="fade-up" delay={i * 50}>
                <details className="group border border-charcoal/10 bg-white">
                  <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-4 text-charcoal font-medium list-none [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <svg
                      className="h-4 w-4 shrink-0 text-sage transition-transform duration-200 group-open:rotate-180"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <p className="px-6 pb-5 text-charcoal-light leading-relaxed">{f.a}</p>
                </details>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-sage/10 px-6 py-20 md:py-32 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <ScrollReveal animation="scale-in">
            <h2 className="font-[family-name:var(--font-cormorant)] text-3xl md:text-5xl mb-6 text-charcoal">
              Ready to capture your moments?
            </h2>
            <p className="mb-8 text-charcoal-light">
              I&apos;d love to hear about your family and what you&apos;re looking for.
            </p>
            <Link
              href="/contact"
              className="inline-block border border-sage bg-sage px-8 py-3 text-sm font-medium uppercase tracking-widest text-white transition-all hover:bg-sage-dark hover:border-sage-dark"
            >
              Let&apos;s Connect
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
