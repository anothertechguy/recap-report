#!/usr/bin/env node
/* Pre-render every route to static HTML (Cloudflare builds only: CF_PAGES=1, or
   FORCE_PRERENDER=1 locally). Also writes sitemap.xml and per-page meta/OG tags,
   so article links unfurl with their own title, excerpt and image. */
import fs from "node:fs";
import path from "node:path";
const DIST = path.resolve("dist");
const SERVER = path.join(DIST, ".server");
const enabled = process.env.CF_PAGES || process.env.FORCE_PRERENDER;
try {
  if (!enabled) { console.log("prerender: skipped (not a Cloudflare build)"); process.exit(0); }
  const { render, routes } = await import(path.join(SERVER, "entry-server.js"));
  const tpl = fs.readFileSync(path.join(DIST, "index.html"), "utf8");
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const list = routes(); const site = "https://therecapreport.com"; let n = 0;
  for (const r of list) {
    let html;
    try { html = await render(r.path); } catch (e) { console.error("render failed", r.path, e && e.message); process.exitCode = 1; continue; }
    let out = tpl.replace(/<title>.*?<\/title>/s, `<title>${esc(r.title)}</title>`)
      .replace(/<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${esc(r.description)}" />`)
      .replace(/<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${esc(r.title)}" />`)
      .replace(/<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${esc(r.description)}" />`)
      .replace(/<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${site}${r.path}" />`)
      .replace(/<meta property="og:image" content="[^"]*" \/>/, `<meta property="og:image" content="${esc(r.image)}" />`)
      .replace(/<meta name="twitter:title" content="[^"]*" \/>/, `<meta name="twitter:title" content="${esc(r.title)}" />`)
      .replace(/<meta name="twitter:description" content="[^"]*" \/>/, `<meta name="twitter:description" content="${esc(r.description)}" />`)
      .replace("</head>", `<link rel="canonical" href="${site}${r.path === "/" ? "/" : r.path}" /><meta name="twitter:image" content="${esc(r.image)}" /></head>`)
      .replace('<div id="root"></div>', `<div id="root">${html}</div>`);
    // Non-root routes are written as <path>.html (not <path>/index.html): Cloudflare Pages serves
    // /about.html at /about, which is how the app links, so no 308 to a trailing-slash URL.
    const file = r.path === "/" ? path.join(DIST, "index.html") : path.join(DIST, r.path.replace(/\/$/, "") + ".html");
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, out); n++;
  }
  fs.writeFileSync(path.join(DIST, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${list.map((r) => `  <url><loc>${site}${r.path === "/" ? "/" : r.path}</loc>${r.lastmod ? `<lastmod>${r.lastmod}</lastmod>` : ""}</url>`).join("\n")}\n</urlset>\n`);
  // Pages serves index.html for unknown paths on its own (no 404.html on CF builds); the blanket
  // rewrite would otherwise be redundant. Keep any other rules.
  const rp = path.join(DIST, "_redirects");
  if (fs.existsSync(rp)) fs.writeFileSync(rp, fs.readFileSync(rp, "utf8").split("\n").filter((l) => !/^\/\*\s+\/index\.html\s+200/.test(l.trim())).join("\n"));
  console.log(`prerender: ${n} routes + sitemap`);
} finally {
  fs.rmSync(SERVER, { recursive: true, force: true });
}
