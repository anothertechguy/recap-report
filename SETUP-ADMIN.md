# Admin portal — one-time setup (Sean's checklist)

The portal code ships with the repo, but it stays locked/inert until these
five steps are done. Total time: ~20 minutes. Until then, the portal page
returns "not configured" for every action (it fails closed — nothing is
exposed).

## How the whole thing works (30-second refresher)

Client → `therecapreport.com/admin` (Cloudflare Access: email code login)
→ Pages Function commits her raw material to a `submission/*` branch + PR
→ GitHub Action runs Claude (`.github/claude/process-submission.md`) to
format the article → `verify` CI must pass → Cloudflare builds a preview →
she clicks **Publish** (merges, deploys) or the portal's **Undo** reverts.
`main` is branch-protected: nothing can merge with failing checks.

## 1. Anthropic API key (powers headless Claude)

Create a key at console.anthropic.com → then, in a terminal:

    gh secret set ANTHROPIC_API_KEY --repo anothertechguy/recap-report

(paste the key when prompted — don't put it in the command line or chat).

## 2. Fine-grained GitHub PAT (lets the portal talk to the repo)

github.com → Settings → Developer settings → Fine-grained tokens → Generate:

- Repository access: **Only** `anothertechguy/recap-report`
- Permissions: **Contents: Read+write**, **Pull requests: Read+write**,
  **Deployments: Read** (for preview URLs)
- Expiration: 1 year (calendar a reminder)

Keep the token for step 3.

## 3. Cloudflare Pages environment variables

Cloudflare dashboard → Workers & Pages → the recap-report Pages project →
Settings → Environment variables (Production):

| Variable | Value | Type |
|---|---|---|
| `GITHUB_TOKEN` | the PAT from step 2 | **Secret** |
| `ACCESS_TEAM_DOMAIN` | `<your-team>.cloudflareaccess.com` (from step 4) | Plain |
| `ACCESS_AUD` | the Access app's Audience (AUD) tag (from step 4) | Plain |

Redeploy (Deployments → Retry latest) after saving.

## 4. Cloudflare Access (the login wall)

Cloudflare dashboard → Zero Trust (one-time: pick a team name — that gives
you `<team>.cloudflareaccess.com`) → Access → Applications → Add:

- Type: Self-hosted. Two paths, same app (add both as application domains):
  `therecapreport.com/admin` and `therecapreport.com/api`
- Identity: One-time PIN (email code) — no passwords to manage
- Policy: Allow → Include → Emails → the client's email + yours. Nobody else.
- Session: 24h is fine.
- Copy the app's **Audience (AUD) tag** (Overview tab) → step 3.

## 5. Repo protections (already done by Claude, listed for the record)

- Branch protection on `main`: the `verify` check is required to merge PRs.
- Labels `client-submission` / `client-edit` exist (they route PRs to the
  Claude workflow).

## Test before you leave town

1. Open `therecapreport.com/admin` in an incognito window → you get the
   email-code login, and a wrong email is refused.
2. Submit a junk test article ("TEST — delete me") with one photo.
3. Watch the Activity tab: Preparing → checks → Ready. Preview it. Publish.
4. Confirm it's live, then press **Undo the last publish** and confirm it
   disappears.
5. Delete any leftover test branches on GitHub if something was abandoned.

## Ongoing

- Each article costs a few cents–dollars of Anthropic API usage.
- If a submission shows "Needs Sean", the PR on GitHub has the details.
- PAT expires yearly; Access and secrets otherwise need no maintenance.
