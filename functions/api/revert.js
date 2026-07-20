// POST /api/revert — emergency undo of the most recent portal publish.
// Only allowed while that publish is still the newest commit on main: we
// create a commit restoring the pre-publish tree. If ANYTHING else has
// landed on main since, we refuse and tell her to contact Sean — this
// endpoint must never be able to eat someone else's work.
import { REPO, gh, ghJson, json, isSubmissionPr } from "./_github.js";

export async function onRequestPost(context) {
  const { env } = context;
  try {
    const closed = await ghJson(env, `/repos/${REPO}/pulls?state=closed&sort=updated&direction=desc&per_page=20`);
    const merged = closed.find((pr) => isSubmissionPr(pr) && pr.merged_at);
    if (!merged) return json({ error: "Nothing to undo." }, 400);

    const mainRef = await ghJson(env, `/repos/${REPO}/git/ref/heads/main`);
    const mainSha = mainRef.object.sha;
    if (mainSha !== merged.merge_commit_sha)
      return json(
        { error: "The site has changed since that publish, so automatic undo is disabled. Contact Sean." },
        409,
      );

    const publishCommit = await ghJson(env, `/repos/${REPO}/git/commits/${mainSha}`);
    if (!publishCommit.parents?.length) return json({ error: "Can't undo this one — contact Sean." }, 409);
    const parent = await ghJson(env, `/repos/${REPO}/git/commits/${publishCommit.parents[0].sha}`);

    const revert = await ghJson(env, `/repos/${REPO}/git/commits`, {
      method: "POST",
      body: JSON.stringify({
        message: `Revert portal publish of PR #${merged.number}: ${merged.title.replace(/^\[Client\]\s*/, "")}`,
        tree: parent.tree.sha,
        parents: [mainSha],
      }),
    });
    await gh(env, `/repos/${REPO}/git/refs/heads/main`, {
      method: "PATCH",
      body: JSON.stringify({ sha: revert.sha, force: false }),
    });
    return json({ ok: true, reverted: merged.title.replace(/^\[Client\]\s*/, "") });
  } catch (e) {
    return json({ error: "Undo failed. Contact Sean.", detail: String(e) }, 502);
  }
}
