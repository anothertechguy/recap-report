---
name: add-article
description: Publish a new article to The Recap Report (therecapreport.com). Use whenever Sean provides article content to upload — triggers on "new article", "add article", "upload article", "post this", or any message containing a headline plus body text and photos. Handles everything end-to-end - images, category, formatting, verification, and the live deploy.
---

# Add an article to The Recap Report

Sean feeds you: **title, body text, photos** (pasted in chat), and sometimes a photo
order. Everything else is your job. Date is ALWAYS today unless he says otherwise.
He should not have to think — do not ask questions unless something is genuinely
ambiguous or a verification step fails.

Read `ADDING-ARTICLES.md` and `CLAUDE.md` at the repo root for the data format.
This skill adds the judgment layer on top. Work through the steps in order.

## 1. Locate the photo files

Photos pasted into chat are almost always real files in `~/Downloads`, recently
modified, with filenames matching how Sean refers to them (e.g. "Firefighters.png").

```bash
find ~/Downloads ~/Desktop -maxdepth 2 -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" -o -iname "*.webp" \) -mtime -2 -exec ls -lat {} + | head -20
```

Match count and names against what was pasted. If you cannot confidently match
every pasted photo to a file, ask — never guess between similar files.

## 2. Convert images

Originals are often 3–5&nbsp;MB. Convert every photo with `sips` into
`public/images/<YYYY>/<MM>/` (today's year/month):

```bash
sips -s format jpeg -s formatOptions 82 --resampleWidth 1600 "<source>" --out public/images/<YYYY>/<MM>/<slug-theme>-<subject>.jpg
```

- Landscape/wide: `--resampleWidth 1600`. Portrait: `--resampleWidth 1200`.
- Filenames: short kebab-case, story-themed prefix + subject
  (`wingate-back2school-firefighters.jpg`), never the raw Downloads name.
- Target roughly 300–500 KB per file. If one comes out over ~700 KB, drop
  `formatOptions` to 75.

## 3. Pick the category (don't ask — decide)

Primary `category` must be exactly one of these; add a secondary in
`categories` only when the story genuinely straddles two:

| Category | Use for |
|---|---|
| `Lifestyle` | Community events, human-interest, local/neighborhood stories, family, culture, charity |
| `Business` | Entrepreneurs, executives, companies, real estate, careers, economic development |
| `Entertainment` | Celebrities, music, film/TV, media personalities, sports-as-entertainment |
| `Health And Beauty` | Wellness, medical, fitness, skincare, mental health |
| `Food` | Restaurants, chefs, recipes, food events |
| `Fashion` | Style, designers, apparel, beauty-as-fashion |
| `Top 10` | ONLY list-format articles ("Top 10 …", ranked roundups) — never for narrative pieces |

Examples of judgment: a community resource fair → Lifestyle. An athlete who
founded a company → Business primary, Entertainment secondary. A celebrity
restaurant opening → Food primary, Entertainment secondary.

## 4. Build the entry

Add at the TOP of `rawArticles` in `src/lib/articles.ts`:

- `id`: highest existing `"id"` in the file + 1 (grep them — they are not in order).
- `slug`: full title, lowercased, punctuation stripped, spaces → hyphens.
- `excerpt`: literally `"..."` (derived from content at runtime).
- `date`: today, `"July 13, 2026"` format — this controls hero placement.
- `readTime`: strip HTML, count words, ÷ 200, round, min 1 → `"N min read"`.
- `author`: `defaultAuthor` (unquoted reference).
- Body: `<p>` per paragraph, `<h2>` for subheads if the source has them. Use
  HTML entities for typography to match the rest of the file: `&#8220;`/`&#8221;`
  quotes, `&#8217;` apostrophe, `&#8212;` em-dash. Join tags with `\n` inside the
  JSON string.

## 5. Place the photos intelligently (the part Sean cares about)

- If Sean gives an order, that order is law. Photo #1 = the `image` field.
- The `image` field photo renders at the top of the article page AND as the
  homepage hero — do **not** repeat it inside `content`.
- Embed the remaining photos in `content` where each is contextually relevant:
  **look at each photo and place it after the paragraph that mentions its
  subject** (fire truck photo → after the paragraph about the fire truck).
  Keep them in the given order and spaced through the article — never two
  images adjacent, none in the final two paragraphs unless it's a closing
  crowd/group shot.
- Markup: `<p><img loading="lazy" decoding="async" src="https://therecapreport.com/wp-content/uploads/<YYYY>/<MM>/<file>.jpg" alt="<specific description of what's in the photo>" /></p>`
  — always the WP-style URL, never `/images/...` directly.
- Alt text describes the actual photo content, not the article topic.

## 6. Verify — all three must pass before publishing

1. `node scripts/check-articles.cjs` → 0 errors, 0 missing images.
2. `npm run build` → compiles.
3. `npm run preview` (port 4173, path `/recap-report/`) + browser check:
   homepage hero shows the new article with the right category chip; article
   page renders full text; confirm every image loaded:
   `Array.from(document.querySelectorAll('article img')).map(i => ({src: i.src, ok: i.complete && i.naturalWidth > 0}))`

## 7. Publish

Sean has standing approval to push once — and only once — all three
verification steps pass:

```bash
git add src/lib/articles.ts public/images/<YYYY>/<MM>/ && git commit -m "Add article: <short title>" && git push origin main
```

Push to main IS the production deploy (Cloudflare Pages → therecapreport.com,
~1 min). Then confirm it's live with a background monitor:

```bash
until curl -s "https://therecapreport.com/" | grep -q "<distinctive title fragment>"; do sleep 15; done; echo "live"
```

Report back: category chosen, where each photo landed, and that it's live.
If any verification failed, do NOT push — report the failure instead.
