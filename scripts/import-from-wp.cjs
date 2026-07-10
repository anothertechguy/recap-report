/* Pull posts from the (temporarily restored) WordPress site via REST API,
   download their images into public/images/, and emit article entries. */
const fs = require("fs");
const path = require("path");

const REPO = "/Users/sean/Desktop/Antigravity Projects/recapclaude/recap-report";
const IMG_OUT = path.join(REPO, "public/images");
const WP = "https://therecapreport.com";

const SLUGS = [
  "black-maternal-health-is-not-genetics-its-bias-delayed-care-and-a-system-that-doesnt-listen-dr-eboni-january-explains-what-must-change",
  "patrice-lindo-wants-professionals-to-stop-waiting-to-be-chosen",
  "changing-the-scoreboard-travis-l-williams-is-creating-opportunities-beyond-basketball",
  "dr-heavenly-kimes-the-ai-forward-candidate-georgias-13th-district-needs",
];

// App category names (WP name → app name)
const CAT_MAP = { "Health and Beauty": "Health And Beauty" };
const APP_CATS = ["Entertainment", "Lifestyle", "Business", "Health And Beauty", "Top 10", "Food", "Fashion"];

const decode = (s) =>
  s.replace(/&#(\d+);/g, (_, n) => String.fromCharCode(n))
   .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCharCode(parseInt(n, 16)))
   .replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#8217;/g, "'")
   .replace(/&nbsp;/g, " ").replace(/&lt;/g, "<").replace(/&gt;/g, ">");

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

async function grabImage(url) {
  const rel = decodeURIComponent(url.split("/wp-content/uploads/")[1]);
  const dest = path.join(IMG_OUT, rel);
  if (fs.existsSync(dest)) return true;
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  const res = await fetch(url);
  if (!res.ok) { console.error("  IMG FAIL", res.status, url); return false; }
  fs.writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
  return true;
}

(async () => {
  const entries = [];
  for (const slug of SLUGS) {
    const res = await fetch(`${WP}/wp-json/wp/v2/posts?slug=${slug}&_embed`);
    const [post] = await res.json();
    if (!post) { console.error("NOT FOUND:", slug); continue; }

    const title = decode(post.title.rendered);
    const content = post.content.rendered.trim();
    const d = new Date(post.date);
    const date = `${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;

    // categories from embedded terms (taxonomy "category"), mapped to app names
    const terms = (post._embedded?.["wp:term"] || []).flat().filter((t) => t.taxonomy === "category");
    const wpCats = terms.map((t) => decode(t.name));
    const cats = wpCats.map((c) => CAT_MAP[c] || c).filter((c) => APP_CATS.includes(c));

    const featured = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "";

    // collect every uploads URL (src + srcset variants) and download
    const imgUrls = new Set(content.match(/https:\/\/therecapreport\.com\/wp-content\/uploads\/[^\s"'<>)]+/g) || []);
    if (featured.includes("/wp-content/uploads/")) imgUrls.add(featured);
    for (const u of imgUrls) await grabImage(u);

    const words = content.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;

    entries.push({
      sortDate: post.date,
      wpCats,
      entry: {
        id: null, // assigned after sorting
        title,
        excerpt: "...",
        category: cats[0] || "PLEASE_SET",
        categories: cats.length ? cats : ["PLEASE_SET"],
        image: featured,
        slug: post.slug,
        date,
        readTime: `${Math.max(1, Math.round(words / 200))} min read`,
        author: "__DEFAULT_AUTHOR__",
        content,
      },
    });
    console.log(`OK ${slug}\n   date=${date} words=${words} imgs=${imgUrls.size} wpCats=[${wpCats.join(", ")}] featured=${featured.split("/").pop()}`);
  }

  // newest first, ids continue from 24
  entries.sort((a, b) => b.sortDate.localeCompare(a.sortDate));
  entries.forEach((e, i) => (e.entry.id = String(24 + i)));

  fs.writeFileSync(
    path.join(__dirname, "new-entries.json"),
    JSON.stringify(entries.map((e) => e.entry), null, 2)
  );
  console.log("\nOrder (newest first):", entries.map((e) => `${e.entry.id}:${e.entry.slug.slice(0, 30)}`).join("  "));
})();
