---
createdAt: 2026-01-17
updatedAt: 2026-01-17
title: Deploying Intlayer with Next.js 16 on Cloudflare (OpenNext)
description: This guide provides instructions on how to deploy a Next.js 16 application integrated with Intlayer to Cloudflare Workers using the OpenNext adapter.
keywords:
  - intlayer
  - nextjs
  - cloudflare
  - opennext
  - deployment
slugs:
  - intlayer-with-cloudflare-opennext
---

# Deploying Intlayer with Next.js 16 on Cloudflare (OpenNext)

This guide provides instructions on how to deploy a Next.js 16 application integrated with Intlayer to Cloudflare Workers using the `https://open-next.js.org/cloudflare` adapter.

## Prerequisites

- Next.js 16.x
- Intlayer 7.x
- Cloudflare Account
- `wrangler` CLI installed
- `@opennextjs/cloudflare` adapter

## 1. Project Configuration

### Intlayer Configuration

Ensure your `intlayer.config.ts` is set up correctly for internationalization:

```typescript
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.CHINESE],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

### Middleware Setup

Cloudflare Workers have specific requirements for middleware. In Next.js 16, it's crucial to ensure your middleware matcher excludes all static assets to avoid unnecessary execution.

Create or update your `middleware.ts`:

```typescript
import { intlayerMiddleware } from "next-intlayer/middleware";

export default intlayerMiddleware;

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

## 2. Cloudflare Specifics

### Wrangler Configuration (`wrangler.jsonc`)

Configure your `wrangler.jsonc` to point to the OpenNext output:

```jsonc
{
  "$schema": "node_modules/wrangler/config-schema.json",
  "name": "your-app-name",
  "main": ".open-next/worker.js",
  "compatibility_date": "2024-12-30",
  "compatibility_flags": ["nodejs_compat"],
  "assets": {
    "binding": "ASSETS",
    "directory": ".open-next/assets"
  }
}
```

## 3. Build & Deployment Scripts

Update your `package.json` to include the build pipeline for Cloudflare:

```json
{
  "scripts": {
    "build:cf": "intlayer build && opennextjs-cloudflare build",
    "deploy:cf": "npm run build:cf && wrangler deploy"
  }
}
```

> **Note**: We use `wrangler deploy` instead of `opennextjs-cloudflare deploy` to avoid mandatory R2 bucket requirements for ISR if your project doesn't strictly need incremental cache synchronization.

## 4. Known Issues & Tips

### React 19 & Next.js 16 Compatibility
When using Intlayer with React 19, ensure that `IntlayerClientProvider` wraps your `ThemeProvider` or other layout-level providers in `app/[locale]/layout.tsx` to prevent hydration mismatches.

### Turbopack
If you are using Turbopack in development, ensure you have the latest version of `next-intlayer` to benefit from the optimized HMR support for dictionary files.

---

## Conclusion
By following this setup, Intlayer will seamlessly handle locale routing and content delivery on Cloudflare's edge network, providing a fast, localized experience for your global users.
