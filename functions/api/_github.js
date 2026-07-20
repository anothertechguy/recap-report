// Shared GitHub API helpers for the admin portal functions. The fine-grained
// PAT (GITHUB_TOKEN env secret, scoped to only this repo) never leaves the
// server side.

export const REPO = "anothertechguy/recap-report";
const API = "https://api.github.com";

export async function gh(env, path, init = {}) {
  const res = await fetch(`${API}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${env.GITHUB_TOKEN}`,
      Accept: "application/vnd.github+json",
      "User-Agent": "recap-report-admin",
      "X-GitHub-Api-Version": "2022-11-28",
      ...init.headers,
    },
  });
  if (!res.ok) {
    throw new Error(`GitHub ${init.method || "GET"} ${path} -> ${res.status}: ${await res.text()}`);
  }
  return res;
}

export const ghJson = async (env, path, init) => (await gh(env, path, init)).json();

export const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });

// UTF-8 string -> base64 (for the contents API)
export const toB64 = (s) => {
  const bytes = new TextEncoder().encode(s);
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin);
};

export async function createBranch(env, name) {
  const main = await ghJson(env, `/repos/${REPO}/git/ref/heads/main`);
  await gh(env, `/repos/${REPO}/git/refs`, {
    method: "POST",
    body: JSON.stringify({ ref: `refs/heads/${name}`, sha: main.object.sha }),
  });
  return main.object.sha;
}

export async function putFile(env, branch, path, base64Content, message) {
  await gh(env, `/repos/${REPO}/contents/${path}`, {
    method: "PUT",
    body: JSON.stringify({ message, content: base64Content, branch }),
  });
}

export const isSubmissionPr = (pr) =>
  pr.head?.ref?.startsWith("submission/") &&
  (pr.labels || []).some((l) => l.name === "client-submission" || l.name === "client-edit");
