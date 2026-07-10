/* Data integrity check for src/lib/articles.ts — run before every publish.
   Verifies: parseable dates, unique ids/slugs, valid categories, and that
   every referenced image exists in public/images/. */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const src = fs.readFileSync(path.join(ROOT, "src/lib/articles.ts"), "utf8");

const VALID_CATS = ["Entertainment", "Lifestyle", "Business", "Health And Beauty", "Top 10", "Food", "Fashion"];
let errors = 0;
const fail = (msg) => { errors++; console.error("✗ " + msg); };

// --- ids, slugs, dates, categories (regex over the data file)
const ids = [...src.matchAll(/"id": "(\d+)"/g)].map((m) => m[1]);
const slugs = [...src.matchAll(/"slug": "([^"]+)"/g)].map((m) => m[1]);
const dates = [...src.matchAll(/"date": "([^"]+)"/g)].map((m) => m[1]);
const cats = [...src.matchAll(/"category": "([^"]+)"/g)].map((m) => m[1]);

const dupes = (arr) => arr.filter((x, i) => arr.indexOf(x) !== i);
dupes(ids).forEach((d) => fail(`duplicate id: ${d}`));
dupes(slugs).forEach((d) => fail(`duplicate slug: ${d}`));
dates.forEach((d) => { if (isNaN(new Date(d).getTime())) fail(`unparseable date: "${d}"`); });
cats.forEach((c) => { if (!VALID_CATS.includes(c)) fail(`invalid category: "${c}"`); });
slugs.forEach((s) => { if (!/^[a-z0-9-]+$/.test(s)) fail(`slug has invalid characters: "${s}"`); });

// --- every referenced wp-content image must exist locally
const imgUrls = [...new Set(src.match(/https:\/\/therecapreport\.com\/wp-content\/uploads\/[^\s"'\\<>)]+/g) || [])];
let missing = 0;
for (const u of imgUrls) {
  const rel = decodeURIComponent(u.split("/wp-content/uploads/")[1]);
  if (!fs.existsSync(path.join(ROOT, "public/images", rel))) { missing++; fail(`image missing on disk: ${rel}`); }
}

console.log(`\narticles: ${ids.length} | image refs: ${imgUrls.length} (${missing} missing) | errors: ${errors}`);
process.exit(errors ? 1 : 0);
