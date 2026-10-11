#!/usr/bin/env node
// Checks that every Tovy price, session length and image count on the site matches
// the pricing page (src/app/sessions/page.tsx `packages`). Exit 1 and list each
// mismatch if anything disagrees. Quoted market ranges from cost guides are skipped:
// a sentence only counts as "ours" when it talks about Gabi's sessions and does not
// cite a guide, an average or other studios.
//
//   node scripts/check-pricing.mjs        (or: npm run check:pricing)

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const read = (p) => readFileSync(join(ROOT, p), "utf8");
const problems = [];
const flag = (file, line, msg, text) =>
  problems.push(`${file}:${line}  ${msg}${text ? `\n    "${text.trim().slice(0, 220)}"` : ""}`);

// ---------- source of truth: the pricing page ----------
const sessionsFile = "src/app/sessions/page.tsx";
const sessionsSrc = read(sessionsFile);
const pkgBlock = sessionsSrc.slice(sessionsSrc.indexOf("const packages"));
const packages = [];
for (const m of pkgBlock.matchAll(/name:\s*"(\w+) Session",\s*price:\s*"\$(\d+)"[\s\S]*?(\d+)-minute session[\s\S]*?(\d+)\+ edited digital images/g)) {
  packages.push({ key: m[1].toLowerCase(), price: +m[2], minutes: +m[3], images: +m[4] });
}
if (packages.length < 3) {
  console.error(`check-pricing: could not read the packages from ${sessionsFile} (found ${packages.length}). Update the parser.`);
  process.exit(2);
}
const byPrice = new Map(packages.map((p) => [p.price, p]));
const prices = packages.map((p) => p.price);
const min = Math.min(...prices), max = Math.max(...prices);

// ---------- site.ts must mirror it ----------
const siteSrc = read("src/lib/site.ts");
for (const p of packages) {
  const m = siteSrc.match(new RegExp(`\\b${p.key}:\\s*(\\d+)`));
  if (!m) flag("src/lib/site.ts", "?", `site.pricing.${p.key} missing`);
  else if (+m[1] !== p.price) {
    const line = siteSrc.slice(0, m.index).split("\n").length;
    flag("src/lib/site.ts", line, `site.pricing.${p.key} is ${m[1]}, pricing page says ${p.price}`);
  }
}
const num = (k) => +(siteSrc.match(new RegExp(`\\b${k}:\\s*(\\d+)`)) || [])[1];
const travelFee = num("travelFee"), extraTime = num("extraTimePer15Min");

// Allowed dollar amounts in Gabi's own sentences: package prices, the add-on fees,
// and two-session bundles (for example "two Classic sessions are $750").
const allowed = new Set([...prices, travelFee, extraTime].filter(Boolean));
for (const a of prices) for (const b of prices) allowed.add(a + b);
const allowedImages = new Set(packages.map((p) => p.images));

// ---------- scan the site text ----------
const SKIP = /(^|\/)(admin|api|client-gallery|node_modules)(\/|$)|client-galler|ClientGallery/i;
const files = [];
(function walk(dir) {
  for (const name of readdirSync(join(ROOT, dir))) {
    const rel = join(dir, name);
    if (SKIP.test(rel)) continue;
    if (statSync(join(ROOT, rel)).isDirectory()) walk(rel);
    else if (/\.(ts|tsx|md)$/.test(name)) files.push(rel);
  }
})("src");

const OURS = /\b(my|I|I'm|I've|Tovy|Mini|Classic|Full session|sessions? (start|run|are|is)|start(s)? at|from \$)/;
const THEIRS = /\b(guides?|published|average|according|studios?|photographers? (charge|who|with)|charges|market|national|tiers?|Thumbtack|survey|budget sessions?)\b/i;
const DURATION = [
  [/\b30-minute|\b30 minutes|half-hour/i, 30],
  [/\b60-minute|\b60 minutes|one-hour|\b1-hour|an hour\b/i, 60],
  [/\b90-minute|\b90 minutes|1\.5-hour|hour and a half|hour-and-a-half/i, 90],
];

for (const file of files) {
  const src = read(file);
  // priceRange strings in structured data
  for (const m of src.matchAll(/priceRange:\s*"\$(\d+)-\$(\d+)"/g)) {
    if (+m[1] !== min || +m[2] !== max) {
      flag(file, src.slice(0, m.index).split("\n").length, `priceRange should be "$${min}-$${max}"`, m[0]);
    }
  }
  // sentence pass. Inline tags (links, bold) are blanked out so a sentence that
  // cites a guide inside a link stays one sentence; offsets are kept for line numbers.
  const text = src.replace(/<\/?(a|strong|em|b|i|span)\b[^>]*>/g, (t) => " ".repeat(t.length));
  const re = /(?:[^.!?\n<>]|\.(?=\d))+(?:[.!?]|(?=<)|\n|$)/g;
  for (const m of text.matchAll(re)) {
    const s = m[0];
    if (!/\$\d|\d\+ (edited )?(digital )?images/.test(s)) continue;
    if (THEIRS.test(s)) continue;
    const line = src.slice(0, m.index).split("\n").length;
    // "N+ images" is always Gabi's own claim; dollar amounts only count in sentences about her sessions
    for (const d of OURS.test(s) ? s.matchAll(/\$(\d[\d,]*)/g) : []) {
      const v = +d[1].replace(/,/g, "");
      if (!allowed.has(v)) { flag(file, line, `$${v} is not a current price (pricing page: ${prices.map((p) => "$" + p).join(" / ")})`, s); continue; }
    }
    // a package price and a session length in the same clause must belong to the same package
    for (const clause of s.split(/,|;|\band\b|\bto\b|\bor\b/)) {
      const ps = [...clause.matchAll(/\$(\d+)/g)].map((x) => +x[1]).filter((x) => byPrice.has(x));
      const ds = DURATION.filter(([rx]) => rx.test(clause)).map(([, mins]) => mins);
      if (ps.length === 1 && ds.length === 1 && byPrice.get(ps[0]).minutes !== ds[0]) {
        const pkg = byPrice.get(ps[0]);
        flag(file, line, `$${ps[0]} is the ${pkg.minutes}-minute ${pkg.key} session, text pairs it with ${ds[0]} minutes`, s);
      }
    }
    for (const i of s.matchAll(/(\d+)\+ (?:edited )?(?:digital )?images/g)) {
      if (!allowedImages.has(+i[1])) flag(file, line, `${i[1]}+ images does not match any package (${[...allowedImages].map((n) => n + "+").join(" / ")})`, s);
    }
  }
}

if (problems.length) {
  console.log(`Pricing check: ${problems.length} mismatch(es) with ${sessionsFile}\n`);
  console.log(problems.join("\n\n"));
  process.exit(1);
}
console.log(`Pricing check OK: ${packages.map((p) => `${p.key} $${p.price}/${p.minutes}min/${p.images}+`).join(", ")} across ${files.length} files.`);
