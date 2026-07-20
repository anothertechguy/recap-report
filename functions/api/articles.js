// GET /api/articles          -> list of published articles (id, title, date)
// GET /api/articles?id=27    -> that article's text, HTML stripped, for editing
import { REPO, gh, json } from "./_github.js";

const ENTITIES = [
  [/&#8220;|&#8221;/g, '"'],
  [/&#8216;|&#8217;/g, "'"],
  [/&#8212;/g, "—"],
  [/&#8230;/g, "…"],
  [/&nbsp;/g, " "],
  [/&amp;/g, "&"],
];

function htmlToPlain(html) {
  let t = html
    .replace(/<figure[\s\S]*?<\/figure>/g, "")
    .replace(/<img[^>]*>/g, "")
    .replace(/<h2[^>]*>([\s\S]*?)<\/h2>/g, "\n\n$1\n\n")
    .replace(/<\/p>\s*<p[^>]*>/g, "\n\n")
    .replace(/<[^>]+>/g, "")
    .replace(/\n{3,}/g, "\n\n");
  for (const [re, rep] of ENTITIES) t = t.replace(re, rep);
  return t.trim();
}

export async function onRequestGet(context) {
  const { request, env } = context;
  const wanted = new URL(request.url).searchParams.get("id");
  try {
    const raw = await (
      await gh(env, `/repos/${REPO}/contents/src/lib/articles.ts?ref=main`, {
        headers: { Accept: "application/vnd.github.raw+json" },
      })
    ).text();

    const entries = [];
    // Entries are uniform generated objects; parse per-entry chunks.
    for (const chunk of raw.split(/\n  \{\s*\n/).slice(1)) {
      const f = (name) => {
        const m = chunk.match(new RegExp(`"${name}":\\s*"((?:[^"\\\\]|\\\\.)*)"`));
        try {
          return m ? JSON.parse(`"${m[1]}"`) : null;
        } catch {
          return null;
        }
      };
      const entry = { id: f("id"), title: f("title"), date: f("date"), category: f("category"), content: f("content") };
      if (entry.id && entry.title) entries.push(entry);
    }

    if (wanted) {
      const a = entries.find((e) => e.id === wanted);
      if (!a) return json({ error: "Article not found." }, 404);
      return json({ id: a.id, title: a.title, date: a.date, text: htmlToPlain(a.content || "") });
    }
    const parse = (d) => (d ? Date.parse(d) || 0 : 0);
    entries.sort((a, b) => parse(b.date) - parse(a.date));
    return json({
      articles: entries.map(({ id, title, date, category }) => ({ id, title, date, category })),
    });
  } catch (e) {
    return json({ error: "Couldn't load articles.", detail: String(e) }, 502);
  }
}
