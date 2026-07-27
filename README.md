# Jova Studio

Cloudflare Worker for `jovastudio.co`.

This Worker serves the authorized Framer-published Jova Studio site from `https://jovastudio.framer.website/` and removes the visible Framer badge at the edge before returning HTML to visitors. This keeps the original structure, typography, responsive layout, logo SVGs, project pages, scripts, and assets intact while using the custom domain.

## Cloudflare settings

Use this repository with a Cloudflare Workers project.

- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`
- Root directory: `/`
- Node version: 22+

## Local commands

```bash
npm install
npm run dev
```

Production domain:

```text
https://jovastudio.co
https://www.jovastudio.co
```
