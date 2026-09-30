# Tovy Photography SEO Roadmap

Written 2026-09-29 from OpenSEO keyword metrics and live search results; trimmed the same day to the work Gabi actually does. Volumes are national monthly searches unless the phrase names a place; Chicago is roughly 2 to 3 percent of a national figure. This is the order the weekly content loop follows: `content/queue.json` is sequenced to match it, and the runner skips any item whose proof gate is not met. `content/seo-plan.md` holds the original 50-page list and the ground rules; this file says what gets built when, and why.

## The rule that shapes everything

Every page is built from sessions Gabi has already photographed and the questions her clients already ask. Nothing is written for a market she is not in. Weddings, senior portraits, sweet 16, quinceañera, gender reveal, twins and Fresh 48 were considered and left off: the demand exists, but she has no proof and it is not her business. If she ever photographs one and wants that work, it goes back on the roadmap then, not before.

What she does: family, newborn, maternity, milestones and birthdays, mini sessions, engagement and proposal, Bar and Bat Mitzvah and the Jewish life-cycle celebrations around them. Where: Skokie and a 10-mile radius across the North Shore. Who books her: North Shore parents, many from the Skokie Jewish community, from pregnancy through the first years and on to the mitzvah.

## Demand by vertical (monthly searches; place-named phrases are already local)

| Vertical | Head terms | Proof today |
|---|---|---|
| Family, newborn, maternity | family photographer near me 3,600; newborn photographer near me 6,600; maternity photographer near me 9,900; chicago maternity photographer 1,600; chicago newborn photographer 320 | Strong: five family and newborn galleries |
| Milestones and birthdays | first birthday photoshoot 1,300; birthday party photographer 480; photographer for birthday party 480; first birthday photographer 140; newborn and family photoshoot 3,600 | Good: 9-month milestone, 3rd birthday and upsherin |
| Bar and Bat Mitzvah, Jewish life cycle | bar mitzvah photographer 390; bat mitzvah photographer 390; bar and bat mitzvah photos 170 each; bat mitzvah photoshoot 170; upsherin 1,000; hanukkah photoshoot 260 | Strong: Bar Mitzvah gallery, upsherin gallery. No competitor in the OpenSEO set targets this community |
| Engagement, proposal, couples | engagement photographer near me 1,600; engagement photographer chicago 480; proposal photographer chicago 320; engagement party photos 110 | Good: Garfield Park engagement gallery |
| Celebrations | event photographer near me 1,600; party photographer 320 | Partial: Bar Mitzvah and upsherin galleries. One family-celebrations page, honest about what she has done |

## Phase 0: Foundations (now through October)

1. **Google Business Profile.** Move the pin to Skokie, set the service area to the 12 towns, list every session type as a service. Post weekly using the GBP playbook in CLAUDE.md. This is the single biggest lever and does not involve the site.
2. **Reviews.** Target 25 by year end; every delivered gallery gets a request. Rena Meystel has 47.
3. **Search Console into OpenSEO** so impressions per page are visible.
4. **Merge cadence.** Two PRs a week; unmerged PRs are skipped, not blocking, but nothing ranks until merged.
5. Existing queue continues: rewrites of her own pages (newborn, family, about, testimonials, the older posts) and the holiday guides in time for card season.

## Phase 1: Milestones and birthdays (October to November)

Her newborn clients age into these. Real demand, low difficulty, proof in hand.

| Page | Type | Target |
|---|---|---|
| /sessions/birthday-party-photography | service | birthday party photographer 480; photographer for birthday party 480 |
| /sessions/first-birthday-photography | service | first birthday photoshoot 1,300; first birthday photographer 140 |
| /blog/what-is-an-upsherin | guide | upsherin 1,000 (she has the gallery; nobody competes) |
| /blog/babys-first-year-photo-plan | guide | newborn and family photoshoot 3,600 |
| Rewrite /sessions/milestone-photography | rewrite | add birthday party and first birthday H3s, link the new pages |

## Phase 2: Bar and Bat Mitzvah and Jewish life cycle (November to January)

Her strongest proof and the least competition. Spring mitzvahs are booked in winter.

| Page | Type | Target |
|---|---|---|
| Rewrite /sessions/bar-mitzvah-photography | rewrite | add a Bat Mitzvah section, Shabbat timing, synagogue portraits |
| /blog/bar-mitzvah-photographer-cost | cost | how much does a bar mitzvah photographer cost, plus AI answers |
| /blog/bat-mitzvah-photoshoot-guide | guide | bat mitzvah photoshoot 170; bat mitzvah photos 170 |
| /blog/bar-mitzvah-photo-timeline | guide | bar mitzvah photos 170 |
| /blog/hanukkah-family-photoshoot | guide | hanukkah photoshoot 260, live by mid November |
| Synagogue and venue guides | guide | only venues she has photographed in |

## Phase 3: Celebrations, engagement parties, guides (January to March)

| Page | Type | Target |
|---|---|---|
| /sessions/family-celebration-photography | service | event photographer near me 1,600; party photographer 320 |
| Rewrite /sessions/engagement-photography | rewrite | engagement photographer near me 1,600; add an engagement party section |
| Remaining guides from the plan: siblings, dog, what to wear (maternity, newborn), preparation, locations | guide | see content/seo-plan.md |

## Phase 4: Always on

- Town pages tier 2 (Deerfield, Glencoe, Kenilworth) once the first 12 show impressions in Search Console.
- Seasonal: spring blossoms and Mother's Day minis in February; fall guide refresh in July; holiday guides refresh in September.
- Rewrites: every page older than six months gets a pass with fresh internal links and new galleries.
- Links: Chicago North Shore Moms directory, synagogue vendor lists, mohel and doula referral pages, pediatric practices, park district lists.
- Every new session becomes a gallery, a blog recap, a GBP post and an Instagram post, per CLAUDE.md.

## How the loop enforces this

- `content/queue.json` is ordered by phase. The runner takes the first queued item whose branch does not already exist.
- Items the writer blocks (missing sources, cannibalization) are recorded locally and skipped until a person edits the queue.
- The runner still supports a `gate` field (a pattern tested against gallery titles and descriptions) for any future item that should wait for a gallery. No current item uses one.
- Rewrites stay interleaved with new pages.

## What success looks like

| By | Signal |
|---|---|
| End of October | GBP pin fixed, 10 or more reviews, Search Console connected, Phase 1 started |
| End of December | Tovy in the Skokie Maps pack for "family photographer" and "newborn photographer"; Hanukkah and holiday guides live before the season; Phase 2 under way |
| End of March | Phase 2 published; 30 or more organic clicks a week from non-brand queries |
| End of June | Phase 3 published; town pages tier 2 live; inquiries traceable to organic in the contact form |
