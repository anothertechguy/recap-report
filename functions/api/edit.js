// POST /api/edit — text-only edit to an existing article, same pipeline as
// new submissions (branch + labeled PR -> Claude -> verify -> Publish button).
import { REPO, gh, ghJson, json, toB64, createBranch, putFile } from "./_github.js";

export async function onRequestPost(context) {
  const { request, env } = context;
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Bad request." }, 400);
  }
  const { articleId, articleTitle = "", text, notes = "" } = body;
  if (!articleId || !text?.trim()) return json({ error: "Missing the edited text." }, 400);

  const id = `${Date.now()}`;
  const branch = `submission/edit-${id}`;
  const dir = `submissions/${id}`;
  try {
    await createBranch(env, branch);
    const meta = {
      type: "edit",
      articleId: String(articleId),
      title: articleTitle,
      submittedBy: context.data.user,
      submittedAt: new Date().toISOString(),
    };
    await putFile(env, branch, `${dir}/meta.json`, toB64(JSON.stringify(meta, null, 2)),
      `Client edit: ${articleTitle || `article ${articleId}`}`);
    await putFile(env, branch, `${dir}/content.txt`, toB64(text), "Add edited text");
    if (notes.trim())
      await putFile(env, branch, `${dir}/notes.txt`, toB64(notes), "Add notes");
    const pr = await ghJson(env, `/repos/${REPO}/pulls`, {
      method: "POST",
      body: JSON.stringify({
        title: `[Client] Edit: ${articleTitle || `article ${articleId}`}`,
        head: branch,
        base: "main",
        body: `Text edit submitted via the admin portal by ${context.data.user}.`,
      }),
    });
    await gh(env, `/repos/${REPO}/issues/${pr.number}/labels`, {
      method: "POST",
      body: JSON.stringify({ labels: ["client-edit"] }),
    });
    return json({ ok: true, pr: pr.number });
  } catch (e) {
    return json({ error: "Couldn't save the edit. Please try again, or contact Sean.", detail: String(e) }, 502);
  }
}
