// Blog post bodies render under the page's single H1, so headings inside a
// post must start at H2 and never skip a level (H2 straight to H4, or an H3
// before any H2). Exits non-zero and lists every offending post.
import { readFileSync } from "node:fs";

const files = ["src/lib/blog-data.ts", "src/lib/blog-posts-seo.ts"];
const problems = [];

for (const file of files) {
  const src = readFileSync(file, "utf8");
  const posts = src.split(/\n\s*slug: "/).slice(1);
  for (const post of posts) {
    const slug = post.slice(0, post.indexOf('"'));
    const body = post.match(/content: `([\s\S]*?)`/)?.[1] ?? "";
    let prev = 1;
    for (const [, level, text] of body.matchAll(/<h([2-6])[^>]*>([\s\S]*?)<\/h\1>/g)) {
      const n = Number(level);
      if (n > prev + 1) {
        problems.push(`${file} ${slug}: <h${n}> "${text.trim()}" follows <h${prev}>`);
      }
      prev = n;
    }
  }
}

if (problems.length) {
  console.error("Heading levels skip (each post starts at <h2>, one level at a time):");
  for (const p of problems) console.error(`  ${p}`);
  process.exit(1);
}
console.log("Heading check OK");
