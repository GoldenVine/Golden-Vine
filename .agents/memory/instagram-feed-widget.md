---
name: Instagram feed widget
description: How the live Instagram feed widget on Golden Vine's Piercings page is implemented and why the official Graph API was chosen.
---

Golden Vine Piercing wanted a live Instagram feed embedded on the Piercings page. Third-party widget
services (SnapWidget, Elfsight, LightWidget) were all evaluated first — every one of them caps free-tier
usage (views/interactions) and eventually pushes toward a paid plan.

**Decision:** use Meta's official Instagram Graph API directly instead, called from the API server, because
it's the studio's own account talking to Instagram — no middleman service, no usage caps, free forever.

**Why:** the user explicitly rejected every third-party widget option specifically because of hidden paywalls
kicking in after a usage threshold. The tradeoff is more setup (Business/Creator IG account + linked Facebook
Page + Facebook Developer app to mint a long-lived access token) and minor ongoing complexity (token expires
every ~60 days), but no recurring cost or forced upgrade risk.

**How it's implemented:**
- Long-lived access token stored as the `INSTAGRAM_ACCESS_TOKEN` secret (never hardcoded, never logged).
- `artifacts/api-server/src/lib/instagram.ts` fetches `https://graph.instagram.com/me/media`, caches results
  in memory (15 min TTL), and proactively refreshes the access token via `refresh_access_token` once it's
  within 7 days of the ~60-day expiry window — this is what prevents the token from silently going stale.
- Exposed via `GET /api/instagram/feed` (OpenAPI-defined, Zod-validated), consumed by the frontend through
  the generated `useGetInstagramFeed` react-query hook.
- If Golden Fern (the sister studio) ever wants the same feature, it needs its own Instagram Business account
  + its own access token/secret — the underlying token is account-specific, not reusable across studios.
