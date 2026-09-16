// Build-time renderer (Cloudflare builds only — see scripts/prerender.mjs).
import { renderToPipeableStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { Writable } from "node:stream";
import { Providers, AppRoutes } from "./App";
import { articles, categories, getExcerpt } from "./lib/articles";

export function render(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    let html = "";
    const sink = new Writable({ write(chunk, _e, cb) { html += chunk.toString(); cb(); }, final(cb) { cb(); resolve(html); } });
    const { pipe } = renderToPipeableStream(
      <Providers><StaticRouter location={url} basename="/"><AppRoutes /></StaticRouter></Providers>,
      { onAllReady() { pipe(sink); }, onError(e) { reject(e); } }
    );
  });
}

const slug = (c: string) => c.toLowerCase().replace(/\s+/g, "-");
export function routes() {
  const site = "https://therecapreport.com";
  const base = { description: "An American news publication covering trending culture, business, lifestyle, health, sports, and entertainment — from Atlanta.", image: `${site}/favicon.png` };
  const list: { path: string; title: string; description: string; image: string; lastmod?: string }[] = [
    { path: "/", title: "The Recap Report — Culture, Business & Lifestyle News from Atlanta", ...base },
    { path: "/about", title: "About — The Recap Report", ...base },
    { path: "/contact", title: "Contact — The Recap Report", ...base },
    { path: "/privacy", title: "Privacy Policy — The Recap Report", ...base },
    ...categories.map((c) => ({ path: `/category/${slug(c)}`, title: `${c} — The Recap Report`, description: `The latest ${c.toLowerCase()} news, features and deep dives from The Recap Report.`, image: base.image })),
    ...articles.map((a) => ({ path: `/article/${a.slug}`, title: `${a.title} — The Recap Report`, description: getExcerpt(a, 155) || a.excerpt || base.description, image: a.image.startsWith("http") ? a.image : site + a.image, lastmod: Number.isNaN(Date.parse(a.date)) ? undefined : new Date(Date.parse(a.date)).toISOString().slice(0, 10) })),
  ];
  return list;
}
