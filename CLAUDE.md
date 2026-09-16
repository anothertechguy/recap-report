# The Recap Report — therecapreport.com

React 18 + Vite 8 + Tailwind news site. **No backend, no CMS** — all articles
live in `src/lib/articles.ts` and all images in `public/images/`. The old
WordPress site is retired; this repo is the only source of truth.

## Deployments (both auto-deploy on push to main)
- **Production**: Cloudflare Pages → therecapreport.com (builds with `CF_PAGES=1`, base `/`)
- **Staging**: GitHub Pages → anothertechguy.github.io/recap-report/ (base `/recap-report/`)

Never hardcode either base path — use `import.meta.env.BASE_URL`. Images in
article data use `https://therecapreport.com/wp-content/uploads/...` URLs which
are rewritten to local `/images/` at runtime (see `localize` in articles.ts).

## Adding a new article (the most common task)

The user typically supplies raw text and image files. Follow
**ADDING-ARTICLES.md** for the entry template. Key rules:

1. Copy image files into `public/images/<year>/<month>/` and reference them with
   the WP-style URL convention above.
2. Add the entry to the TOP of `rawArticles` in `src/lib/articles.ts` with the
   next unused `id`. Format the body as HTML: `<p>` paragraphs, `<h2>` subheads.
3. The `date` field ("June 22, 2026" format) controls homepage placement —
   articles are auto-sorted newest-first; the 3 newest become the hero.
4. `category` must be one of: Entertainment, Lifestyle, Business,
   Health And Beauty, Top 10, Food, Fashion. Ask the user if unclear.
5. Verify before pushing (all three must pass):
   - `node scripts/check-articles.cjs` — data integrity (dates, slugs, images)
   - `npm run build` — must compile
   - `npm run preview` — check the homepage hero and the new article page in a
     browser (text renders, images load, category chip correct)
6. Push to main only after verification; that IS the production deploy.

## Gotchas
- `public/404.html` is for GitHub Pages only — the build strips it from
  Cloudflare deploys (see vite.config.ts). Never let it ship to Cloudflare;
  it causes redirect loops at the root domain.
- `npm test` is broken (vitest not installed) — don't rely on it.
- The newsletter signup form is cosmetic; it does not store emails.
- `src/pages export from real site/` is dead reference data, not imported.

## Build & performance (added 2026-09-16 — read before touching images or routes)
- `npm run build` = `vite build` → `vite build --ssr src/entry-server.tsx` → `scripts/prerender.mjs`.
  On Cloudflare builds (`CF_PAGES=1`) every route — home, categories, all articles, about/contact/
  privacy — is pre-rendered to real HTML with its own title/description/OG image, plus sitemap.xml;
  `src/main.tsx` hydrates. GitHub Pages staging still client-renders (prerender skips without CF_PAGES).
  `App.tsx` exports `Providers` + `AppRoutes` for this; add routes in BOTH `AppRoutes` and
  `entry-server.tsx#routes()`.
- Nothing may touch `window`/`document` during render (effects only). `DOMPurify` is browser-only, so
  ArticlePage passes content through untouched at build time and sanitizes on hydration.
- **Images: every referenced png/jpg needs an `-800` sibling** (`sips -Z 800 file --out name-800.ext`)
  because `srcSetFor()` in `src/lib/articles.ts` points every `<img>` at it for phones.
  `node scripts/check-articles.cjs` fails if one is missing. Keep originals ≤ 1600px JPEG (q82);
  the 9/16 pass converted the multi-MB PNG photos to JPEG and re-pointed `articles.ts`.
- Fonts are async (`media="print" onload`), hero/article images carry `fetchPriority="high"`, cards lazy.
- Accessibility rules that were fixed 9/16 and must not regress: icon buttons need `aria-label`,
  footer/newsletter fine print no lighter than `text-white/60`, category chips use the darker red
  `bg-[hsl(0_78%_38%)]`, `<main>` wraps page content, article bodies never start at `<h3>` without an
  `<h2>` (normalizeHeadings handles it).
