# Tovy Photography SEO Roadmap

Written 2026-09-29 from OpenSEO keyword metrics and live search results. This is the order the weekly content loop follows: `content/queue.json` is sequenced to match it, and the runner skips any item whose proof gate is not met. `content/seo-plan.md` holds the original 50-page list and the ground rules; this file says what gets built when, and why.

## The rule that shapes everything

Gabi's CLAUDE.md forbids claiming experience she does not have. Search demand is highest in verticals where she has the least proof (weddings, senior portraits). So every vertical below has a **proof gate**: the page is written only once `src/lib/gallery-data.ts` contains a real session of that kind. The runner checks the gate by grepping gallery data before it spends a run. Until a gate opens, the vertical gets one honest "we offer this" mention on an existing page and nothing more.

The fastest way to open a gate is a **model call**: one free or discounted session of that type, published as a gallery. One senior session unlocks four pages worth about 18,000 searches a month. One cake smash unlocks three pages worth about 5,000.

## Demand by vertical (monthly US searches, keyword difficulty)

| Vertical | Head terms | Proof today | Gate |
|---|---|---|---|
| Family, newborn, maternity | family photographer near me 3,600; newborn photographer near me 6,600; maternity photographer near me 9,900; maternity photographer chicago 1,600 | Strong: 5 family and newborn galleries | Open |
| Milestones and birthdays | cake smash photoshoot 2,400; cake smash photographer 1,300; first birthday photoshoot 1,300; cake smash photographer near me 590; birthday party photographer 480; photographer for birthday party 480; first birthday photographer 140; sweet 16 140 | Partial: 9-month milestone, 3rd birthday and upsherin | Cake smash needs a gallery; birthday party and first birthday are open |
| Bar and Bat Mitzvah, Jewish life cycle | bar mitzvah photographer 390; bat mitzvah photographer 390; bar/bat mitzvah photos 170 each; bat mitzvah photoshoot 170; upsherin 1,000; bar mitzvah photographer near me 70 | Strong: Bar Mitzvah gallery, upsherin gallery | Open |
| Engagement, proposal, couples | engagement photographer near me 1,600; engagement photographer chicago 480; proposal photographer chicago 320; surprise proposal photographer 320; engagement party photos 110; anniversary photoshoot 590 | Good: Garfield Park engagement gallery | Open; proposal and anniversary described in future tense |
| Celebrations and events | event photographer near me 1,600; party photographer 320; family reunion photos 260; family reunion photographer 70; gender reveal photoshoot 1,600 | Partial: Bar Mitzvah is the only event gallery | Reunion, adult milestone birthday and baby naming pages need one gallery each |
| Graduation and seniors | senior photographer near me 6,600; graduation photoshoot 6,600; senior pictures near me 3,600; graduation photographer 2,400; graduation photographer near me 1,600 | None | Closed until a senior or graduation gallery exists |
| Weddings and elopements | photographer for wedding 49,500 (KD 10); wedding photographer near me 8,100 (KD 14); chicago wedding photographer 2,400 (KD 16 to 26); how much does a wedding photographer cost 2,900 (KD 25); chicago elopement photographer 210; vow renewal photographer 50 | None; the engagement page says weddings are not the main focus | Closed until a wedding, elopement or vow renewal gallery exists. Full-scale "Chicago wedding photographer" is out of scope regardless: the results are The Knot, WeddingWire and full-time wedding studios |

Live search results checked 2026-09-29: "birthday party photographer chicago" is won by a single-photographer documentary page plus a three-listing Maps pack, which is beatable. "cake smash photographer chicago" is a Maps pack (Glenview, Evanston, Chicago studios) plus a Duron Studio page, so the Google Business Profile matters as much as the page. "north shore wedding photographer" is wedding-industry directories and full-time wedding studios.

## Phase 0: Foundations (now through October)

Not pages. These decide whether any page ranks.

1. **Google Business Profile.** Move the pin to Skokie, set the service area to the 12 towns, add every service as a GBP service, add all seven session types as categories where GBP allows (Photographer, Portrait Studio, Event Photographer, Wedding Photographer only when a gallery exists). Post weekly using the GBP playbook in CLAUDE.md.
2. **Reviews.** Target 25 by year end. Every delivered gallery gets a review request. Rena Meystel has 47; REL Portraits 39.
3. **Search Console into OpenSEO** so the loop and Omer can see impressions per page instead of guessing.
4. **Merge cadence.** The loop opens two PRs a week. Unmerged PRs are skipped, not blocking, but nothing ranks until it is merged. Gabi merges or Omer merges on her word.
5. Existing queue continues: rewrites of newborn, family, about, testimonials and the six older posts, plus holiday guides in time for card season.

## Phase 1: Milestones and birthdays (October to November)

Why first: real demand, low difficulty, partial proof already, and Gabi's newborn clients age into it.

| Page | Type | Target (volume) | Gate |
|---|---|---|---|
| /sessions/birthday-party-photography | service | birthday party photographer 480; photographer for birthday party 480; birthday photographer near me 140 | Open (3rd birthday gallery) |
| /sessions/first-birthday-photography | service | first birthday photoshoot 1,300; first birthday photographer 140 | Open (9-month and 3rd birthday galleries; cake smash described in future tense until shot) |
| /blog/cake-smash-photoshoot-guide | guide | cake smash photoshoot 2,400; cake smash photographer 1,300; near me 590 | **Needs a cake smash gallery**. Model call: one first birthday client, cake provided |
| /blog/what-is-an-upsherin | guide | upsherin 1,000 | Open (upsherin gallery). Answer-first: what it is, when, what happens, how it is photographed |
| /blog/babys-first-year-photo-plan | guide | newborn and family photoshoot 3,600; sitter session 30 | Open |
| /blog/sweet-16-photoshoot-chicago | guide | sweet 16 photographer 140 | Needs a teen session gallery |
| Rewrite /sessions/milestone-photography | rewrite | add birthday party and first birthday as literal H3s, link to the new pages | Open |

## Phase 2: Bar and Bat Mitzvah and Jewish life cycle (November to January)

Why second: Gabi's strongest proof and the least competition. No competitor in the OpenSEO set targets Skokie's Jewish community. Booking season for spring mitzvahs is winter.

| Page | Type | Target (volume) | Gate |
|---|---|---|---|
| Rewrite /sessions/bar-mitzvah-photography | rewrite | bar mitzvah photographer 390; bat mitzvah photographer 390; near me 70 | Open. Add a Bat Mitzvah section with its own H3s, a Shabbat-timing section, a synagogue portrait section |
| /blog/bar-mitzvah-photographer-cost | cost | how much does a bar mitzvah photographer cost 10, plus AI answers | Open (already queued) |
| /blog/bat-mitzvah-photoshoot-guide | guide | bat mitzvah photoshoot 170; bat mitzvah photos 170 | Open in future tense; strongest once a Bat Mitzvah gallery exists |
| /blog/bar-mitzvah-photo-timeline | guide | bar mitzvah photos 170; bar mitzvah portraits 20 | Open (Bar Mitzvah gallery) |
| /sessions/bris-and-baby-naming-photography | service | bris photos 90; baby naming ceremony photographer | **Needs a bris or naming gallery** |
| /blog/hanukkah-family-photoshoot | guide | hanukkah photoshoot 260 | Open (already queued; ship by mid November) |
| Synagogue and venue guides | guide | long tail | Only venues Gabi has actually photographed in |

## Phase 3: Celebrations, events, engagement parties, anniversaries, graduations (January to March)

| Page | Type | Target (volume) | Gate |
|---|---|---|---|
| /sessions/family-celebration-photography | service | event photographer near me 1,600; party photographer 320; family reunion photographer 70 | Open on the strength of the Bar Mitzvah and upsherin galleries; each event type described honestly |
| /blog/family-reunion-photos-guide | guide | family reunion photos 260 | Needs a reunion or extended family gallery (extended family session page is live; one large-group gallery opens this) |
| Rewrite /sessions/engagement-photography | rewrite | engagement photographer near me 1,600; engagement party photographer 70; engagement party photos 110 | Open. Add an engagement party section rather than a new page |
| /sessions/anniversary-photography | service | anniversary photoshoot 590; anniversary photographer 50 | Open in future tense; the Garfield Park couples gallery is the proof |
| /sessions/graduation-and-senior-portraits | service | senior photographer near me 6,600; senior pictures near me 3,600; graduation photographer 2,400; graduation photoshoot 6,600 | **Closed until a senior or graduation gallery exists.** Model call in spring: one Northwestern graduate or one Niles North senior |
| /blog/northwestern-graduation-photos | guide | northwestern graduation photos 20 plus AI answers | Same gate |
| /blog/gender-reveal-photoshoot-ideas | guide | gender reveal photoshoot 1,600 | Open in future tense; links to maternity |

## Phase 4: Weddings-adjacent (March onward, only if a gate opens)

Gabi's engagement page says weddings are not her main focus. The roadmap respects that. What fits her style and is winnable:

| Page | Type | Target (volume) | Gate |
|---|---|---|---|
| /sessions/elopement-and-small-wedding-photography | service | chicago elopement photographer 210; courthouse wedding photographer chicago; vow renewal photographer 50; micro wedding 10 | **Closed until an elopement, courthouse wedding, vow renewal or small wedding gallery exists** |
| /blog/wedding-photographer-cost-chicago | cost | how much does a wedding photographer cost 2,900 (KD 25); wedding photographer cost chicago 40 | Same gate, and only if Gabi decides to take weddings |
| Not on the roadmap | | chicago wedding photographer 2,400; wedding photographer near me 8,100; photographer for wedding 49,500 | Full-time wedding studios and directories own these. A family photographer will not outrank them and should not try |

## Phase 5: Always on

- Town pages tier 2 (Deerfield, Glencoe, Kenilworth, then Lake Forest, Buffalo Grove, Arlington Heights) once the first 12 show impressions in Search Console.
- Seasonal: spring blossoms and Mother's Day minis in February; fall guide refresh in July; holiday guides refresh in September.
- Rewrites: every page older than six months gets a rewrite pass with fresh internal links and any new galleries.
- Links: Chicago North Shore Moms directory, synagogue vendor lists, mohel and doula referral pages, pediatric practices, park district photographer lists. Ten local links doubles the current profile.
- Galleries: every new session becomes a gallery page, a blog recap, a GBP post and an Instagram post, per the CLAUDE.md content reuse strategy. Galleries are what open gates.

## How the loop enforces this

- `content/queue.json` is ordered by phase. The runner takes the first queued item whose gate passes and whose branch does not already exist.
- A `gate` field on an item is a case-insensitive regular expression tested against the slug, title, category and description lines of `src/lib/gallery-data.ts` (not alt text, so a stray word in a caption cannot open a gate). No match means the item is skipped and logged, and the run moves on. The moment a matching gallery is added, the item becomes eligible with no other change.
- Items the writer itself blocks (missing sources, cannibalization) are recorded locally and skipped on later runs until a person edits the queue.
- Rewrites stay interleaved with new pages so existing rankings keep improving while the verticals fill in.

## What success looks like

| By | Signal |
|---|---|
| End of October | GBP pin fixed, 10 or more reviews, Search Console connected, Phase 1 open items published |
| End of December | Tovy in the Skokie Maps pack for "family photographer" and "newborn photographer"; first Maps impressions for "bar mitzvah photographer"; holiday and Hanukkah guides live before the season |
| End of March | Phase 2 published; at least one gate opened by a model call; 30 or more organic clicks a week from non-brand queries |
| End of June | Phase 3 published; senior gate opened or consciously declined; town pages tier 2 live; inquiries traceable to organic in the contact form |
