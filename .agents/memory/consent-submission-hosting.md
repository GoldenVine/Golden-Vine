---
name: Consent submission hosting
description: Durable hosting and delivery constraints for Golden Vine consent submissions.
---

Golden Vine consent submissions must be captured by native Netlify Forms. Participant copies are generated and downloaded locally in the browser; do not reintroduce Resend, EmailJS attachments, a server-side mail package, or a token-protected submission backend.

**Why:** The user requires the consent workflow to remain on the free GitHub/Netlify stack without paid API secrets or serverless backend tokens.

**How to apply:** Preserve Netlify’s deploy-time form declaration and multipart upload handling. Generate the participant PDF client-side after Netlify accepts the multipart submission, with any uploaded ID images remaining only in the secure Netlify record.