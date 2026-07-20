// Auth gate for every /api/* request. Cloudflare Access sits in front of
// /admin and /api and injects a signed JWT; we verify its signature against
// the team's public keys, plus expiry, audience, and issuer. If the Access
// env vars aren't configured yet, everything is rejected (fail closed) —
// a deploy without Access set up exposes nothing.

let jwksCache = { keys: null, fetched: 0 };

function b64urlToBytes(s) {
  s = s.replace(/-/g, "+").replace(/_/g, "/");
  const pad = s.length % 4 ? "=".repeat(4 - (s.length % 4)) : "";
  const bin = atob(s + pad);
  return Uint8Array.from(bin, (c) => c.charCodeAt(0));
}

const deny = (msg, status) =>
  new Response(JSON.stringify({ error: msg }), {
    status,
    headers: { "Content-Type": "application/json" },
  });

export async function onRequest(context) {
  const { request, env } = context;
  if (!env.ACCESS_TEAM_DOMAIN || !env.ACCESS_AUD || !env.GITHUB_TOKEN) {
    return deny("Admin portal is not configured yet.", 503);
  }
  const token = request.headers.get("Cf-Access-Jwt-Assertion");
  if (!token) return deny("Not signed in.", 401);
  try {
    const [h, p, sig] = token.split(".");
    const header = JSON.parse(new TextDecoder().decode(b64urlToBytes(h)));
    const payload = JSON.parse(new TextDecoder().decode(b64urlToBytes(p)));
    const now = Math.floor(Date.now() / 1000);
    if (!(payload.exp > now)) throw new Error("expired");
    if (payload.nbf && payload.nbf > now + 60) throw new Error("nbf");
    if (![].concat(payload.aud).includes(env.ACCESS_AUD)) throw new Error("aud");
    if (payload.iss !== `https://${env.ACCESS_TEAM_DOMAIN}`) throw new Error("iss");

    if (!jwksCache.keys || Date.now() - jwksCache.fetched > 3600_000) {
      const r = await fetch(`https://${env.ACCESS_TEAM_DOMAIN}/cdn-cgi/access/certs`);
      if (!r.ok) throw new Error("certs");
      jwksCache = { keys: (await r.json()).keys || [], fetched: Date.now() };
    }
    const jwk = jwksCache.keys.find((k) => k.kid === header.kid);
    if (!jwk) throw new Error("kid");
    const key = await crypto.subtle.importKey(
      "jwk",
      jwk,
      { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
      false,
      ["verify"],
    );
    const ok = await crypto.subtle.verify(
      "RSASSA-PKCS1-v1_5",
      key,
      b64urlToBytes(sig),
      new TextEncoder().encode(`${h}.${p}`),
    );
    if (!ok) throw new Error("sig");
    context.data.user = payload.email || "unknown";
  } catch {
    return deny("Not signed in.", 401);
  }
  return context.next();
}
