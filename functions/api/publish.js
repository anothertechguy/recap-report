// POST /api/publish {pr} — merge a client-submission PR. Defense in depth:
// we re-verify the label, branch prefix, and green "verify" check here, and
// GitHub's branch protection enforces the same check server-side regardless.
import { REPO, gh, ghJson, json, isSubmissionPr } from "./_github.js";

export async function onRequestPost(context) {
  const { request, env } = context;
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Bad request." }, 400);
  }
  try {
    const pr = await ghJson(env, `/repos/${REPO}/pulls/${Number(body.pr)}`);
    if (!pr || pr.state !== "open" || !isSubmissionPr(pr))
      return json({ error: "That submission can't be published." }, 400);

    const checks = await ghJson(env, `/repos/${REPO}/commits/${pr.head.sha}/check-runs?per_page=50`);
    const verify = (checks.check_runs || []).filter((r) => r.name === "verify");
    const green = verify.length && verify.every((r) => r.status === "completed" && r.conclusion === "success");
    if (!green) return json({ error: "Checks haven't passed yet — publishing is locked until they do." }, 409);

    await gh(env, `/repos/${REPO}/pulls/${pr.number}/merge`, {
      method: "PUT",
      body: JSON.stringify({
        merge_method: "squash",
        commit_title: `Publish (portal): ${pr.title.replace(/^\[Client\]\s*/, "")}`,
      }),
    });
    try {
      await gh(env, `/repos/${REPO}/git/refs/heads/${pr.head.ref}`, { method: "DELETE" });
    } catch {
      /* branch cleanup is best-effort */
    }
    return json({ ok: true });
  } catch (e) {
    return json({ error: "Publish failed — nothing went live. Try again or contact Sean.", detail: String(e) }, 502);
  }
}
