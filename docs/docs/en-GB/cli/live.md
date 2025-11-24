---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Live Sync Commands
description: Learn how to use Live Sync to reflect CMS content changes at runtime.
keywords:
  - Live Sync
  - CMS
  - Runtime
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - live
---

# Live Sync commands

Live Sync allows your app to reflect CMS content changes at runtime. No rebuild or redeploy is required. When enabled, updates are streamed to a Live Sync server that refreshes the dictionaries your application reads. See [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_CMS.md) for more details.

```json fileName="package.json"
"scripts": {
  "intlayer:live:start": "npx intlayer live start --with 'next dev --turbopack'"
}
```

## Arguments:

**Configuration options:**

- **`--base-dir`**: Specify the base directory for the project. To retrieve the intlayer configuration, the command will look for the `intlayer.config.{ts,js,json,cjs,mjs}` file in the base directory.

- **`--no-cache`**: Disable the cache.

  > Example: `npx intlayer dictionary push --env-file .env.production.local`

**Log options:**

- **`--verbose`**: Enable verbose logging for debugging. (defaults to true when using the CLI)
