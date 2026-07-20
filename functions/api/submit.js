// POST /api/submit — new article submission from the portal.
// Creates a branch containing the raw material under submissions/<id>/ and
// opens a labeled PR; the process-submission GitHub Action takes it from there.
import { REPO, gh, ghJson, json, toB64, createBranch, putFile } from "./_github.js";

export async function onRequestPost(context) {
  const { request, env } = context;
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Bad request." }, 400);
  }
  const { title, text, notes = "", images = [] } = body;
  if (!title?.trim()) return json({ error: "Please add a headline." }, 400);
  if (!text?.trim()) return json({ error: "Please paste the article text." }, 400);
  if (!images.length) return json({ error: "Please add at least one photo." }, 400);
  if (images.length > 8) return json({ error: "Maximum 8 photos." }, 400);
  for (let i = 0; i < images.length; i++) {
    if (!images[i]?.data) return json({ error: `Photo ${i + 1} didn't upload — try again.` }, 400);
    if (images[i].data.length > 11_000_000)
      return json({ error: `Photo ${i + 1} is too large (8 MB max).` }, 400);
  }

  const id = `${Date.now()}`;
  const branch = `submission/new-${id}`;
  const dir = `submissions/${id}`;
  try {
    await createBranch(env, branch);
    const meta = {
      type: "new",
      title: title.trim(),
      submittedBy: context.data.user,
      submittedAt: new Date().toISOString(),
    };
    await putFile(env, branch, `${dir}/meta.json`, toB64(JSON.stringify(meta, null, 2)),
      `Client submission: ${title.trim()}`);
    await putFile(env, branch, `${dir}/content.txt`, toB64(text), "Add article text");
    if (notes.trim())
      await putFile(env, branch, `${dir}/notes.txt`, toB64(notes), "Add notes");
    for (let i = 0; i < images.length; i++) {
      const safe = (images[i].name || "photo.jpg")
        .toLowerCase()
        .replace(/[^a-z0-9.]+/g, "-")
        .replace(/^-+/, "")
        .slice(-60);
      await putFile(env, branch, `${dir}/img-${String(i + 1).padStart(2, "0")}-${safe}`,
        images[i].data, `Add photo ${i + 1}`);
    }
    const pr = await ghJson(env, `/repos/${REPO}/pulls`, {
      method: "POST",
      body: JSON.stringify({
        title: `[Client] New article: ${title.trim()}`,
        head: branch,
        base: "main",
        body:
          `New article submitted via the admin portal by ${context.data.user}.\n\n` +
          `Claude processes this automatically; the portal's Publish button merges it once checks pass.`,
      }),
    });
    await gh(env, `/repos/${REPO}/issues/${pr.number}/labels`, {
      method: "POST",
      body: JSON.stringify({ labels: ["client-submission"] }),
    });
    return json({ ok: true, pr: pr.number });
  } catch (e) {
    return json({ error: "Couldn't save the submission. Please try again, or contact Sean.", detail: String(e) }, 502);
  }
}
