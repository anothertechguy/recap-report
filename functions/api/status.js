// GET /api/status — everything the Activity tab needs: open submissions with
// their pipeline state (+ preview URL when ready) and the last published one
// (for the Undo button).
import { REPO, ghJson, json, isSubmissionPr } from "./_github.js";

async function checkState(env, sha) {
  const data = await ghJson(env, `/repos/${REPO}/commits/${sha}/check-runs?per_page=50`);
  const runs = data.check_runs || [];
  const byName = (n) => runs.filter((r) => r.name === n);
  const concluded = (rs) => rs.length && rs.every((r) => r.status === "completed");
  const success = (rs) => concluded(rs) && rs.every((r) => r.conclusion === "success");
  const failed = (rs) => rs.some((r) => r.conclusion && r.conclusion !== "success" && r.conclusion !== "neutral" && r.conclusion !== "skipped");
  return { process: byName("process"), verify: byName("verify"), concluded, success, failed };
}

async function previewUrl(env, branch) {
  try {
    const deps = await ghJson(env, `/repos/${REPO}/deployments?ref=${encodeURIComponent(branch)}&per_page=3`);
    for (const d of deps) {
      const statuses = await ghJson(env, `/repos/${REPO}/deployments/${d.id}/statuses?per_page=3`);
      const ok = statuses.find((s) => s.state === "success" && s.environment_url);
      if (ok) return ok.environment_url;
    }
  } catch {
    /* preview URL is best-effort */
  }
  return null;
}

export async function onRequestGet(context) {
  const { env } = context;
  try {
    const open = (await ghJson(env, `/repos/${REPO}/pulls?state=open&per_page=30`)).filter(isSubmissionPr);
    const items = [];
    for (const pr of open) {
      const c = await checkState(env, pr.head.sha);
      const comments = await ghJson(env, `/repos/${REPO}/issues/${pr.number}/comments?per_page=30`);
      const needsSean = comments.find((cm) => cm.body?.startsWith("NEEDS-SEAN:"));
      const summary = [...comments].reverse().find((cm) => !cm.body?.startsWith("NEEDS-SEAN:"));

      let state = "preparing";
      if (needsSean || c.failed(c.process) || c.failed(c.verify)) state = "needs_sean";
      else if (c.success(c.verify)) state = "ready";
      else if (c.verify.length) state = "checking";

      items.push({
        pr: pr.number,
        title: pr.title.replace(/^\[Client\]\s*/, ""),
        createdAt: pr.created_at,
        state,
        note: needsSean ? needsSean.body.replace(/^NEEDS-SEAN:\s*/, "") : summary?.body || null,
        previewUrl: state === "ready" ? await previewUrl(env, pr.head.ref) : null,
      });
    }

    const closed = await ghJson(env, `/repos/${REPO}/pulls?state=closed&sort=updated&direction=desc&per_page=20`);
    const merged = closed.find((pr) => isSubmissionPr(pr) && pr.merged_at);
    const lastPublished = merged
      ? {
          pr: merged.number,
          title: merged.title.replace(/^\[Client\]\s*/, ""),
          mergedAt: merged.merged_at,
          mergeSha: merged.merge_commit_sha,
        }
      : null;

    return json({ open: items, lastPublished });
  } catch (e) {
    return json({ error: "Couldn't load status.", detail: String(e) }, 502);
  }
}
