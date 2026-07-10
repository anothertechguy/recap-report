# Adding articles to The Recap Report

All articles live in one file: `src/lib/articles.ts`, in the `rawArticles` array.
**The site sorts articles by their `date` field, newest first**, and the
homepage flows from that order: the 3 newest are the hero slider, then the
featured carousel, latest reports, trending, and spotlight each take the next
most-recent unused story — so nothing repeats and nothing new gets buried.
Position in the file doesn't matter (same-date articles keep file order), but
add new entries at the top anyway so the file reads newest-first. Getting the
`date` right is what counts.

## The entry template

```ts
{
  "id": "27",                        // next unused number (search for the highest "id")
  "title": "Headline Exactly As It Should Appear",
  "excerpt": "...",                  // literally "..." — the excerpt is derived from content
  "category": "Business",            // PRIMARY category — must be one of the list below
  "categories": ["Business", "Entertainment"],  // primary first, then any secondaries
  "image": "https://therecapreport.com/wp-content/uploads/2026/06/hero.jpg",
  "slug": "headline-as-a-url-slug",  // lowercase, hyphens, no punctuation — this is the URL
  "date": "June 22, 2026",           // full month name
  "readTime": "5 min read",          // word count ÷ 200, rounded
  "author": defaultAuthor,           // no quotes — it's a reference
  "content": "<p>Body as HTML…</p>"  // paragraphs in <p>, subheads in <h2>
},
```

Valid categories (exact spelling): `Entertainment`, `Lifestyle`, `Business`,
`Health And Beauty`, `Top 10`, `Food`, `Fashion`.

## Images

Images are served from this repo, not from WordPress (the old WP site is gone).

1. Put image files under `public/images/<year>/<month>/…` (any structure works,
   the year/month convention just matches the existing files).
2. In the entry, reference them with the **old WordPress-style URL**:
   `https://therecapreport.com/wp-content/uploads/<year>/<month>/<file>` —
   the app rewrites that prefix to the local `/images/` folder at runtime
   (see `localize` at the bottom of `articles.ts`).
   Referencing `/images/...` directly in content won't work on GitHub Pages,
   so stick with the WP-style URL convention.

## Importing from a WordPress site (while one is reachable)

`scripts/import-from-wp.cjs` pulls posts via the WP REST API: edit the `SLUGS`
list at the top, run `node scripts/import-from-wp.cjs`, and it downloads all
images into `public/images/` and writes `new-entries.json` next to itself for
copy-pasting into `articles.ts` (fix `id`, `category`, and change
`"__DEFAULT_AUTHOR__"` to `defaultAuthor`).

## Publish checklist

1. `npm run build` — must pass.
2. `npm run preview` and spot-check the homepage hero and the new article page
   (text, images, category chip).
3. Commit and push to `main`. That's the deploy: Cloudflare Pages (therecapreport.com)
   and GitHub Pages (staging) both rebuild automatically in ~1 minute.
