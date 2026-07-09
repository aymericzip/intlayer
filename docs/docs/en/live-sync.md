---
createdAt: 2026-07-08
updatedAt: 2026-07-08
title: Live Sync | Reflect CMS content changes at runtime
description: Let your app reflect Intlayer CMS content changes at runtime, with no rebuild or redeploy required.
keywords:
  - Live Sync
  - CMS
  - Visual Editor
  - Internationalization
  - Documentation
  - Intlayer
  - Next.js
  - Vite
history:
  - version: 9.0.0
    date: 2026-07-08
    changes: "Extracted from the Intlayer CMS documentation into its own page"
  - version: 6.0.1
    date: 2025-09-22
    changes: "Add live sync documentation"
  - version: 6.0.0
    date: 2025-09-04
    changes: "Replace `hotReload` field by `liveSync`"
author: aymericzip
---

# Intlayer Live Sync

Live Sync lets your app reflect [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md) content changes at runtime. No rebuild or redeploy required. When enabled, updates are streamed to a Live Sync server that refreshes the dictionaries your application reads.

## Table of Contents

<TOC/>

---

## Enabling Live Sync

Enable Live Sync by updating your Intlayer configuration:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... other configuration settings
  editor: {
    /**
     * Enables hot reloading of locale configurations when changes are detected.
     * For example, when a dictionary is added or updated, the application updates
     * the content displayed on the page.
     *
     * Because hot reloading requires a continuous connection to the server, it is
     * only available for clients of the `enterprise` plan.
     *
     * Default: false
     */
    liveSync: true,
  },
  dictionary: {
    /**
     * Controls how dictionaries are imported:
     *
     * - "fetch": Dictionaries are fetched dynamically using the Live Sync API.
     *   Replaces useIntlayer with useDictionaryDynamic.
     *
     * Note: Live mode uses the Live Sync API to fetch dictionaries. If the API call
     * fails, dictionaries are imported dynamically.
     * Note: Only dictionaries with remote content and "live" flags use live mode.
     * Others use dynamic mode for performance.
     */
    importMode: "fetch",
  },
};

export default config;
```

Start the Live Sync server to wrap your application:

Example using standalone server:

```json5 fileName="package.json"
{
  "scripts": {
    // ... other scripts
    "live:start": "npx intlayer live",
  },
}
```

You can also use your application server in parallel using the `--process` argument.

Example using Next.js:

```json5 fileName="package.json"
{
  "scripts": {
    // ... other scripts
    "build": "next build",
    "dev": "next dev",
    "start": "npx intlayer live --with 'next start'",
  },
}
```

Example using Vite:

```json5 fileName="package.json"
{
  "scripts": {
    // ... other scripts
    "build": "vite build",
    "dev": "vite dev",
    "start": "npx intlayer live --with 'vite start'",
  },
}
```

The Live Sync server wraps your application and automatically applies updated content as it arrives.

To receive change notifications from the CMS, the Live Sync server maintains an SSE connection to the backend. When content changes in the CMS, the backend forwards the update to the Live Sync server, which writes the new dictionaries. Your application will reflect the update on the next navigation or browser reload, no rebuild required.

Flow chart (CMS/Backend -> Live Sync Server -> Application Server -> Frontend):

![Live Sync Flow CMS/Backend/Live Sync Server/Application Server/Frontend Schema](https://github.com/aymericzip/intlayer/blob/main/docs/assets/live_sync_flow_scema.svg)

How it works:

![Live Sync Logic Schema](https://github.com/aymericzip/intlayer/blob/main/docs/assets/live_sync_logic_schema.svg)

## Development workflow (local)

- In development, all remote dictionaries are fetched when the application starts, so you can test updates quickly.
- To test Live Sync locally with Next.js, wrap your dev server:

```json5 fileName="package.json"
{
  "scripts": {
    // ... other scripts
    "dev": "npx intlayer live --with 'next dev'",
    // "dev": "npx intlayer live --with 'vite dev'", // For Vite
  },
}
```

Enable optimization so Intlayer applies the Live import transformations during development:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  editor: {
    applicationURL: "http://localhost:5173",
    liveSyncURL: "http://localhost:4000",
    liveSync: true,
  },
  dictionary: {
    importMode: "fetch",
  },
  build: {
    optimize: true, // default: process.env.NODE_ENV === 'production'
  },
};

export default config;
```

This setup wraps your dev server with the Live Sync server, fetches remote dictionaries at startup, and streams updates from the CMS via SSE. Refresh the page to see changes.

## Notes and constraints

- Add the live sync origin to your site security policy (CSP). Ensure the live sync URL is allowed in `connect-src` (and `frame-ancestors` if relevant).
- Live Sync does not work with static output. For Next.js, the page must be dynamic to receive updates at runtime (e.g., use `generateStaticParams`, `generateMetadata`, `getServerSideProps`, or `getStaticProps` appropriately to avoid full static-only constraints).
- In the CMS, each dictionary has a `live` flag. Only dictionaries with `live=true` are fetched via the live sync API; others are imported dynamically and remain unchanged at runtime.
- The `live` flag is evaluated for each dictionary at build time. If remote content wasn't flagged `live=true` during build, you must rebuild to enable Live Sync for that dictionary.
- The live sync server must be able to write to `.intlayer`. In containers, ensure write access to `/.intlayer`.

## Useful links

- [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)
- [Intlayer Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)
- [Configuration Reference](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md)
- [Self-Hosting Guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/self_hosting.md)
