// Tells Bing (and the other IndexNow engines: Yandex, Seznam, Naver) that pages changed,
// so they recrawl right away instead of waiting. Bing's index also feeds ChatGPT search,
// Copilot, DuckDuckGo and Yahoo.
//   node scripts/indexnow.mjs                 every URL in the live sitemap
//   node scripts/indexnow.mjs <url> [<url>]   just these URLs
// The key file public/<key>.txt proves we own the domain.
const HOST = "tovyphotography.com";
const KEY = "fd288275aec39b280efeb660916fa3c2";

let urls = process.argv.slice(2);
if (urls.length === 0) {
  const xml = await (await fetch(`https://${HOST}/sitemap.xml`)).text();
  urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}
urls = urls.filter((u) => new URL(u).host === HOST);
if (urls.length === 0) {
  console.error("No tovyphotography.com URLs to submit.");
  process.exit(1);
}

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList: urls }),
});
// 200 and 202 both mean accepted.
console.log(`IndexNow: HTTP ${res.status} for ${urls.length} URL(s)`);
if (res.status !== 200 && res.status !== 202) process.exit(1);
