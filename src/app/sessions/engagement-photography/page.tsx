import type { Metadata } from "next";
import Link from "next/link";
import PlaceholderImage from "@/components/PlaceholderImage";
import ScrollReveal from "@/components/ScrollReveal";
import StickyBookingBar from "@/components/StickyBookingBar";
import { services } from "@/lib/services";
import { locationPages } from "@/lib/locations";
import { site, breadcrumbJsonLd, serviceJsonLd as buildServiceJsonLd, ogImages } from "@/lib/site";

export const metadata: Metadata = {
  title: "Chicago North Shore Engagement Photographer",
  description:
    "Engagement photos in Chicago and the North Shore, from the Garfield Park Conservatory to the Evanston lakefront. Relaxed natural light sessions from $300.",
  alternates: {
    canonical: "https://tovyphotography.com/sessions/engagement-photography",
  },
  openGraph: {
    title: "Engagement Photos in Chicago and the North Shore | Tovy Photography",
    description:
      "Relaxed, natural light engagement photos in Chicago, Evanston, Wilmette and Skokie, plus engagement parties and anniversary sessions.",
    url: "https://tovyphotography.com/sessions/engagement-photography",
    images: ogImages("/photos/garfield-park-conservatory-engagement/cover-bench.jpg", "Engagement session at Garfield Park Conservatory in Chicago"),
  },
};

const faqs = [
  {
    q: "When should we take engagement photos?",
    a: "Most couples book 3 to 6 months before the wedding, but there's no wrong time. Some couples do it right after the proposal to capture that fresh excitement. Others wait until closer to the wedding to use the photos for save-the-dates.",
  },
  {
    q: "What if we're awkward in front of a camera?",
    a: "You're in good company. Almost everyone says this. My job is to make you forget the camera is there. I use natural prompts (\"walk toward me,\" \"tell each other something funny,\" \"pretend I'm not here for thirty seconds\") that bring out genuine reactions. By the end, most couples tell me it was actually fun.",
  },
  {
    q: "Can we bring our dog?",
    a: "Absolutely. Dogs are always welcome. They tend to make the best candid moments anyway.",
  },
  {
    q: "What should we wear for engagement photos?",
    a: "Think about what makes you feel confident and comfortable. Coordinate your outfits in complementary tones rather than matching exactly. Avoid busy patterns and distracting logos. I'll send detailed wardrobe guidance once you book.",
  },
  {
    q: "How long until we get our photos back?",
    a: "Galleries are typically delivered within 2 to 3 weeks. You'll receive a private online gallery with full-resolution, edited images and full print rights.",
  },
  {
    q: "Can you photograph a surprise proposal?",
    a: "Yes! This is one of my favorite things to shoot. We'll coordinate everything ahead of time. You tell me the spot, the plan, and the timing, and I'll be hidden and ready. You get the real surprise, the real reaction, and beautiful photos of the whole moment. We can do a quick portrait session right after while you're both still on cloud nine.",
  },
  {
    q: "Do you also photograph weddings?",
    a: "Weddings aren't my main focus. I specialize in family, newborn, milestone, and event photography. That said, if you love my style and want to talk through what wedding coverage could look like, I'm open to the conversation. Reach out and let's chat.",
  },
  {
    q: "How much do engagement photos cost in Chicago?",
    a: "My engagement sessions run from $300 to $550. The Mini is $300 for 30 minutes and 10+ edited images, the Classic is $425 for 60 minutes and 25+ images, and the Full is $550 for 90 minutes and 40+ images, all with full print rights.",
  },
  {
    q: "Do you photograph engagement parties?",
    a: "Yes. I photograph engagement parties at home, in a backyard, or at a restaurant or event space, the same relaxed way I photograph birthday parties and family celebrations. A short party fits one of my standard packages, and a longer evening is a Tailored session priced for your plans.",
  },
  {
    q: "Do you do anniversary photo sessions?",
    a: "Yes. An anniversary session works just like an engagement session: an hour or so at a place that means something to the two of you, with gentle prompts instead of stiff poses. It uses the same packages, starting at $300.",
  },
];

export default function EngagementPhotographyPage() {
  // Same business record (@id) and 13-town service area as every other page.
  const serviceJsonLd = buildServiceJsonLd({
    name: "Engagement photography",
    serviceType: "Engagement Photography",
    url: `${site.url}/sessions/engagement-photography`,
    description:
      "Relaxed, natural light engagement photos in Chicago and on the North Shore, including Evanston, Wilmette and Skokie, plus engagement parties and anniversary sessions.",
    image: `${site.url}/photos/garfield-park-conservatory-engagement/cover-bench.jpg`,
  });

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const why = services["engagement-photography"].why;
  const towns = Object.values(locationPages);
  const breadcrumbLd = breadcrumbJsonLd([
    { name: "Home", url: site.url },
    { name: "Sessions and Pricing", url: `${site.url}/sessions` },
    { name: "Engagement Photographer", url: `${site.url}/sessions/engagement-photography` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Hero: image left, text right */}
      <section
        className="pt-28 pb-16 md:pt-36 md:pb-20 px-6 lg:px-8"
        style={{ backgroundColor: "#E8D5CE" }}
      >
        <div className="mx-auto max-w-6xl grid gap-10 md:grid-cols-2 items-center">
          {/* IMAGE 1: Hero engagement photo */}
          <PlaceholderImage
            alt="engagement photography Chicago North Shore, joyful couple during outdoor engagement session"
            className="aspect-[4/5] w-full"
            label="Image 1: Hero engagement photo"
          />
          <div className="text-center md:text-left">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-charcoal/50">
              Chicago North Shore &amp; Beyond
            </p>
            <h1 className="font-[family-name:var(--font-cormorant)] text-5xl md:text-6xl lg:text-7xl text-charcoal mb-6">
              Engagement Photography
            </h1>
            <p className="text-charcoal/70 text-lg mb-10">
              You said yes. Let&apos;s make it beautiful.
            </p>
            <Link
              href="/contact"
              className="inline-block border border-charcoal bg-charcoal px-8 py-3 text-sm font-medium uppercase tracking-widest text-white transition-all hover:bg-transparent hover:text-charcoal"
            >
              Book Your Engagement Session
            </Link>
          </div>
        </div>
      </section>

      {/* Citable summary */}
      <section className="px-6 pt-16 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-4 text-lg md:text-xl leading-relaxed text-charcoal">
          <p>Tovy Photography takes engagement photos in Chicago and on the North Shore, at the Garfield Park Conservatory, on the lakefront in Evanston and Wilmette, at the Skokie Lagoons, and in the neighborhoods where your story actually happened. If you are looking for an engagement photographer near you in Chicago, Evanston, Wilmette or Skokie, sessions are natural light and relaxed, and start at $300 for 30 minutes and 10+ edited images with full print rights included.</p>
          <p>I am Gabi, based in Skokie. Surprise proposals are welcome too: you tell me the spot and the plan, and I am hidden and ready. I also photograph engagement parties and anniversary sessions.</p>
        </div>
      </section>

      {/* Section 1: The Experience */}
      <section className="px-6 py-20 md:py-28 lg:px-8">
        <div className="mx-auto max-w-6xl grid gap-12 md:grid-cols-2 items-center">
          <ScrollReveal animation="fade-right">
            <div>
              <h2 className="font-[family-name:var(--font-cormorant)] text-3xl md:text-4xl mb-6 text-charcoal">
                What an engagement session feels like
              </h2>
              <div className="space-y-4 text-charcoal-light leading-relaxed">
                <p>
                  You just got engaged. You&apos;re telling everyone, fielding
                  questions about dates and venues, and somewhere in the
                  excitement you realize: you need photos that actually capture
                  this moment.
                </p>
                <p>That&apos;s what this session is for.</p>
                <p>
                  We&apos;ll spend an hour (or more) at a location you love. A
                  park in Evanston, the Chicago Botanic Garden, downtown
                  Wilmette, your favorite coffee shop. And I&apos;ll photograph
                  you two being you: walking, talking, laughing at each other,
                  holding hands the way you always do. No awkward posing. No
                  Pinterest-perfect staging you&apos;ll cringe at in five years.
                </p>
                <p>
                  The photos should feel like the two of you on a really great
                  date where someone happened to be taking beautiful pictures.
                </p>
                <p>
                  <strong className="text-charcoal font-medium">
                    Planning the proposal itself?
                  </strong>{" "}
                  I do that too. If you&apos;re getting ready to pop the
                  question, I can be hidden at the location capturing the whole
                  thing as it happens: the moment, the surprise, the reaction,
                  all of it. We coordinate everything ahead of time so I&apos;m
                  in position without being seen. Once the secret&apos;s out, we
                  roll right into a portrait session while you&apos;re both
                  still glowing. These are some of my favorite sessions because
                  the emotions are completely real. There&apos;s nothing to
                  pose.
                </p>
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal animation="fade-left" delay={150}>
            {/* IMAGE 2: Couple laughing together, outdoor location, natural light */}
            <PlaceholderImage
              alt="engagement photography session North Shore Chicago, couple laughing together at park"
              className="aspect-[4/5] w-full"
              label="Image 2: Couple laughing outdoors"
            />
          </ScrollReveal>
        </div>
      </section>

      {/* Section 2: Where to Shoot */}
      <section className="bg-white px-6 py-20 md:py-28 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <ScrollReveal animation="fade-up">
            <h2 className="font-[family-name:var(--font-cormorant)] text-3xl md:text-4xl mb-6 text-charcoal">
              Best engagement photo locations on the North Shore
            </h2>
            <p className="text-charcoal-light leading-relaxed mb-6">
              Chicago&apos;s North Shore has some of the most beautiful
              engagement photo locations in the Midwest. A few favorites:
            </p>
            <div className="space-y-5 text-charcoal-light leading-relaxed">
              <p>
                <strong className="text-charcoal font-medium">Parks and gardens</strong>:
                The lush greenery and winding paths at places like the Chicago
                Botanic Garden, Gillson Park in Wilmette, and the Skokie
                Northshore Sculpture Park offer variety in a single session.
              </p>
              <p>
                <strong className="text-charcoal font-medium">Downtown charm</strong>:
                Downtown Evanston&apos;s tree-lined streets, local coffee shops,
                and architectural mix give you an urban feel without the
                intensity of downtown Chicago.
              </p>
              <p>
                <strong className="text-charcoal font-medium">Waterfront</strong>:
                The lakefront along the North Shore has that timeless, open
                quality, especially at golden hour when the light does all the
                work.
              </p>
              <p>
                <strong className="text-charcoal font-medium">Your own spot</strong>:
                Maybe it&apos;s the restaurant where you had your first date.
                Maybe it&apos;s your apartment. If a place matters to your
                story, it belongs in your photos.
              </p>
              <p>
                I&apos;m happy to help you pick a location based on the mood
                you&apos;re going for. I know these spots well and I know where
                the light is best at every time of year.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Section 2b: Engagement photos in Chicago */}
      <section className="px-6 py-20 md:py-28 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <ScrollReveal animation="fade-up">
            <h2 className="font-[family-name:var(--font-cormorant)] text-3xl md:text-4xl mb-6 text-charcoal">
              Engagement photos in Chicago
            </h2>
            <div className="space-y-5 text-charcoal-light leading-relaxed">
              <p>
                I photographed an engagement session at the{" "}
                <Link href="/gallery/milestone/garfield-park-conservatory-engagement" className="text-sage-dark underline underline-offset-4">
                  Garfield Park Conservatory
                </Link>
                , and it is still one of my favorite places in the city for
                engagement photos. The glass houses fill every frame with soft,
                green light, the benches, ferns and indoor pond give you a new
                backdrop every few steps, and the weather outside never gets a
                vote. I wrote about{" "}
                <Link href="/blog/garfield-park-conservatory-engagement-photos-chicago" className="text-sage-dark underline underline-offset-4">
                  how that conservatory session went
                </Link>{" "}
                if you want to see what a winter-proof engagement session looks like.
              </p>
              <h3 className="font-[family-name:var(--font-cormorant)] text-2xl pt-2 text-charcoal">
                Where are the best places for engagement photos in Chicago?
              </h3>
              <p>
                The best places for engagement photos in Chicago are the ones
                with soft light and a little meaning: the Garfield Park
                Conservatory for greenery in any season, the lakefront for sky
                and water at golden hour, and the neighborhood where the two of
                you actually live. We can also meet at the Lincoln Park
                Conservatory, at the Alfred Caldwell Lily Pool in Lincoln Park
                in the warmer months, or along the Chicago Riverwalk if you
                want the skyline in your photos. Some of these spots have
                their own photography rules, and I check what applies before
                we book.
              </p>
              <p>
                If you live in the city, my{" "}
                <Link href="/locations/chicago" className="text-sage-dark underline underline-offset-4">
                  Chicago page
                </Link>{" "}
                covers the family and newborn sessions I photograph there too.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Section 3: What to Know */}
      <section className="px-6 py-20 md:py-28 lg:px-8">
        <div className="mx-auto max-w-6xl grid gap-12 md:grid-cols-2 items-center">
          <ScrollReveal animation="fade-right">
            {/* IMAGE 3: Couple at outdoor location, ring detail or walking together */}
            <PlaceholderImage
              alt="engagement photographer Evanston, couple walking hand in hand at golden hour"
              className="aspect-[4/5] w-full"
              label="Image 3: Couple walking or ring detail"
            />
          </ScrollReveal>
          <ScrollReveal animation="fade-left" delay={150}>
            <div>
              <h2 className="font-[family-name:var(--font-cormorant)] text-3xl md:text-4xl mb-6 text-charcoal">
                What to expect and how to prepare
              </h2>
              <div className="space-y-5 text-charcoal-light leading-relaxed">
                <p>
                  <strong className="text-charcoal font-medium">What to wear</strong>:
                  Bring one outfit you feel amazing in. If you want a second
                  look, we can do a quick change mid-session. Coordinate with
                  each other in tone and formality. If one person is in a suit,
                  the other shouldn&apos;t be in ripped jeans. I send wardrobe
                  guidance before the session.
                </p>
                <p>
                  <strong className="text-charcoal font-medium">Timing</strong>:
                  Golden hour (about an hour before sunset) gives the best
                  light, but overcast days are gorgeous too: soft, even light
                  with no harsh shadows. I&apos;ll recommend the best time for
                  your session date.
                </p>
                <p>
                  <strong className="text-charcoal font-medium">Nerves are normal.</strong>{" "}
                  Most couples tell me they feel awkward in front of a camera.
                  That feeling usually disappears within the first five minutes.
                  I&apos;ll guide you through natural prompts, things to do
                  together, ways to move, so you&apos;re never standing there
                  wondering what to do with your hands.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Section 4: Pricing */}
      <section className="bg-white px-6 py-20 md:py-28 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <ScrollReveal animation="fade-up">
            <h2 className="font-[family-name:var(--font-cormorant)] text-3xl md:text-4xl mb-6 text-charcoal">
              Engagement session pricing
            </h2>
            <h3 className="font-[family-name:var(--font-cormorant)] text-2xl mb-4 text-charcoal">
              How much do engagement photos cost in Chicago?
            </h3>
            <p className="text-charcoal-light leading-relaxed mb-4">
              Engagement sessions start at $300 for a focused 30-minute mini
              session. Most couples choose the Classic session ($425, 60
              minutes) which gives us time to explore a location and capture the
              full range: wide shots, close-ups, candid moments, and those
              portraits you&apos;ll actually want to frame. The Full session
              ($550, 90 minutes) is perfect if you want to include a second
              location or a wardrobe change.
            </p>
            <p className="text-charcoal-light leading-relaxed mb-8">
              Every session includes edited images in a private online gallery
              with full print rights: 10+ images with the Mini, 25+ with the
              Classic and 40+ with the Full.
            </p>
            <Link
              href="/sessions#pricing"
              className="inline-block border border-sage px-6 py-2.5 text-sm font-medium uppercase tracking-widest text-sage transition-all hover:bg-sage hover:text-white"
            >
              View Full Pricing
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Section 4b: Engagement parties and anniversaries */}
      <section className="px-6 py-20 md:py-28 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <ScrollReveal animation="fade-up">
            <h2 className="font-[family-name:var(--font-cormorant)] text-3xl md:text-4xl mb-6 text-charcoal">
              Engagement parties and anniversaries
            </h2>
            <div className="space-y-5 text-charcoal-light leading-relaxed">
              <h3 className="font-[family-name:var(--font-cormorant)] text-2xl text-charcoal">
                Do you photograph engagement parties?
              </h3>
              <p>
                Yes, I photograph engagement parties at home, in a backyard, or
                at a restaurant or event space in Chicago and on the North
                Shore. I cover them the way I cover{" "}
                <Link href="/sessions/birthday-party-photography" className="text-sage-dark underline underline-offset-4">
                  birthday parties
                </Link>{" "}
                and family celebrations: the toasts, the hugs at the door, the
                grandparents meeting the future in-laws, and a few calm
                portraits of the two of you before the room fills up. A short
                party fits one of my standard packages, and a longer evening is
                a Tailored session priced for your plans.
              </p>
              <h3 className="font-[family-name:var(--font-cormorant)] text-2xl pt-2 text-charcoal">
                Do you do anniversary photo sessions?
              </h3>
              <p>
                Yes, and they work just like an engagement session. Whether it
                has been one year or many, we spend an hour
                or so somewhere that matters to the two of you, and I
                photograph how you are together now. It uses the same
                packages, starting at $300.
              </p>
              <p>
                Still planning the question itself? My{" "}
                <Link href="/sessions/proposal-photography" className="text-sage-dark underline underline-offset-4">
                  proposal photography
                </Link>{" "}
                page explains how I stay hidden until the yes.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Section 5: FAQ */}
      {/* What makes it work */}
      <section className="bg-white px-6 py-20 md:py-28 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-[family-name:var(--font-cormorant)] text-3xl md:text-4xl mb-8 text-charcoal">
            What makes engagement photos work
          </h2>
          <ul className="space-y-6">
            {why.items.map((item, i) => (
              <li key={i} className="border-l-2 border-sage pl-5">
                <p className="text-charcoal leading-relaxed">
                  <strong className="font-semibold">{item.title}</strong> {item.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-6 py-20 md:py-28 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <ScrollReveal animation="fade-up">
            <h2 className="font-[family-name:var(--font-cormorant)] text-3xl md:text-4xl mb-10 text-charcoal text-center">
              Common questions about engagement photos
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

      {/* Section 6: CTA */}
      <section className="bg-sage/15 px-6 py-20 md:py-28 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <ScrollReveal animation="scale-in">
            <h2 className="font-[family-name:var(--font-cormorant)] text-3xl md:text-5xl mb-6 text-charcoal">
              Let&apos;s celebrate your engagement
            </h2>
            <p className="mb-8 text-charcoal-light leading-relaxed">
              Tell me about your love story and what kind of session feels
              right. I&apos;ll help you find the perfect spot and time.
            </p>
            <Link
              href="/contact"
              className="inline-block border border-sage bg-sage px-8 py-3 text-sm font-medium uppercase tracking-widest text-white transition-all hover:bg-sage-dark hover:border-sage-dark"
            >
              Reach Out
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Related links */}
      <section className="px-6 py-14 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-charcoal/50 mb-5">
            Keep Exploring
          </p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm">
            <Link href="/sessions/family-photography" className="text-sage-dark hover:underline underline-offset-4">
              Family Photography &rarr;
            </Link>
            <Link href="/gallery/milestone" className="text-sage-dark hover:underline underline-offset-4">
              View the Milestone Gallery &rarr;
            </Link>
            <Link href="/blog/engagement-photo-locations-north-shore-chicago" className="text-sage-dark hover:underline underline-offset-4">
              Best Engagement Photo Locations &rarr;
            </Link>
            <Link href="/blog/garfield-park-conservatory-engagement-photos-chicago" className="text-sage-dark hover:underline underline-offset-4">
              A Conservatory Engagement Session &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Spacer so the sticky bar never covers the footer content */}
      <div className="h-14" />

      {/* Service areas */}
      <section className="px-6 pb-16 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-[family-name:var(--font-cormorant)] text-2xl mb-4 text-charcoal">
            Where I photograph
          </h2>
          <div className="flex flex-wrap gap-3">
            {towns.map((t) => (
              <Link
                key={t.slug}
                href={`/locations/${t.slug}`}
                className="border border-charcoal/15 px-4 py-2 text-sm text-charcoal hover:border-sage hover:text-sage-dark transition-colors"
              >
                {t.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <StickyBookingBar />
    </>
  );
}
