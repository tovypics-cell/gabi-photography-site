// /llms.txt: a plain-text summary of the business for AI assistants (ChatGPT, Perplexity,
// Claude, Gemini) that read it when answering questions about local photographers.
// Built from the same data as the site, so prices and pages never drift.
import { site, serviceAreaNames, formatLongDate } from "@/lib/site";
import { services } from "@/lib/services";
import { getAllPosts } from "@/lib/blog-data";

export const dynamic = "force-static";

export function GET() {
  const p = site.pricing;
  const servicePages = Object.values(services)
    .map((s) => `- [${s.shortName}](${site.url}/sessions/${s.slug}): ${s.description}`)
    .join("\n");
  const posts = getAllPosts()
    .map((post) => `- [${post.title}](${site.url}/blog/${post.slug})`)
    .join("\n");

  const body = `# ${site.name}

> ${site.name} is ${site.photographer}, a natural light family, newborn, maternity and milestone photographer based in ${site.locality}, Illinois, serving Chicago's North Shore. Sessions happen at the client's home or outdoors on location.

## Key facts

- Photographer: ${site.photographer}
- Based in: ${site.locality}, ${site.region}
- Service area: ${serviceAreaNames.join(", ")}
- Sessions: family, in-home newborn, maternity, milestones and birthdays, engagement and proposal, mini sessions, Bar and Bat Mitzvah and other Jewish life-cycle celebrations, headshots on request
- Prices (current as of ${formatLongDate(p.updated)}): Mini $${p.mini} (30 minutes, 10+ edited images), Classic $${p.classic} (60 minutes, 25+ edited images), Full $${p.full} (90 minutes, 40+ edited images); events are quoted. Every package includes a private online gallery with full print rights.
- Travel: a $${p.travelFee} travel fee may apply. If you're curious, just ask.
- Booking: ${site.url}/contact
- Phone: ${site.phoneDisplay}
- Email: ${site.email}
- Instagram: ${site.instagram}

## Sessions and pricing

- [Sessions and Pricing](${site.url}/sessions): all packages and what each includes
${servicePages}

## Guides

${posts}
`;

  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
