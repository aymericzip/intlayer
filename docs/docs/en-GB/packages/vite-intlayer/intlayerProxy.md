---
createdAt: 2026-06-25
updatedAt: 2026-06-25
title: intlayerProxy Vite Plugin Documentation | vite-intlayer
description: Locale-routing middleware for Vite dev/preview servers and production SSR. Handles locale detection, URL redirects, and internal rewrites.
keywords:
  - intlayerProxy
  - vite
  - plugin
  - middleware
  - locale
  - routing
  - internationalisation
  - i18n
  - SSR
slugs:
  - doc
  - packages
  - vite-intlayer
  - intlayerProxy
history:
  - version: 9.0.0
    date: 2026-06-25
    changes: "Merged configOptions into single options object; proxy bundled into intlayer()"
author: aymericzip
---

# intlayerProxy

`intlayerProxy` is a Vite plugin that registers locale-routing middleware for **every environment**: dev server, preview server, and production SSR (Nitro / TanStack Start).

> **Since Intlayer v9** `intlayerProxy` is automatically included inside the main [`intlayer()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/packages/vite-intlayer/intlayer.md) plugin and enabled by default via `routing.enableProxy: true`. You only need to register it separately if you need lower-level control or are using it outside the standard `intlayer()` setup.

## Usage

### As part of `intlayer()` (recommended, v9+)

Pass `proxy` options to the main plugin instead of registering `intlayerProxy` separately:

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
  ],
});
```

### Standalone (when needed)

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer()],
});
```

## Options

```ts
import type { IntlayerProxyPluginOptions } from "vite-intlayer";
```

All options are optional and passed as a single object:

| Option          | Type                                | Description                                                                                                                                        |
| --------------- | ----------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ignore`        | `(req: IncomingMessage) => boolean` | Predicate that excludes requests from locale routing. Return `true` to skip a request (e.g. API routes, health checks).                            |
| `configOptions` | `GetConfigurationOptions`           | Intlayer configuration overrides forwarded to `getConfiguration()`. Use when you need the proxy to read a specific config file or override values. |

### Example

```ts
intlayerProxy({
  ignore: (req) => req.url?.startsWith("/api"),
  configOptions: { configFile: "./config/intlayer.config.ts" },
});
```

## createIntlayerProxyHandler

`createIntlayerProxyHandler` creates a standalone, framework-agnostic Node.js `(req, res, next)` middleware that contains all the locale-routing logic. It is useful in environments where the Vite plugin API is unavailable (e.g. a plain Node.js server or a custom Nitro module).

```ts
import { createIntlayerProxyHandler } from "vite-intlayer";

const handler = createIntlayerProxyHandler({
  ignore: (req) => req.url?.startsWith("/api"),
  configOptions: { configFile: "./config/intlayer.config.ts" },
});

// Express / Connect
app.use(handler);
```

### Production SSR (TanStack Start / Nitro via h3)

```ts
// server/middleware/intlayerProxy.ts
import { fromNodeMiddleware } from "h3";
import { createIntlayerProxyHandler } from "vite-intlayer";

export default fromNodeMiddleware(
  createIntlayerProxyHandler({
    ignore: (req) => req.url?.startsWith("/api"),
  })
);
```

## Routing behaviour

The middleware mirrors the routing logic from `next-intlayer` middleware and supports all Intlayer routing modes.

### Routing modes

| Mode            | URL visible in browser      | Behaviour                                                                                               |
| --------------- | --------------------------- | ------------------------------------------------------------------------------------------------------- |
| `prefix`        | `/en-GB/about`              | Default. Locale prefix in the URL. Default locale redirects to the un-prefixed URL unless `prefix-all`. |
| `prefix-all`    | `/en/about`, `/en-GB/about` | All locales — including default — are always prefixed.                                                  |
| `no-prefix`     | `/about`                    | No locale in the URL. Locale is stored in cookies only; URL rewrites happen internally.                 |
| `search-params` | `/about?locale=en-GB`       | Locale passed as a query parameter. Redirects to add/update the `locale` param when missing or stale.   |

### Detection priority

1. URL path prefix (e.g. `/en-GB/about` → `en-GB`).
2. Cookie / localStorage value (`intlayer-locale`).
3. `Accept-Language` header.
4. `defaultLocale` from config.

### Automatic bypass

The middleware always passes these requests straight through without locale handling:

- Requests matching the `ignore` predicate.
- `/node_modules/**`
- `/@**` – Vite internals (`@vite/`, `@fs/`, `@id/`, etc.).
- `/_**` – server internals (`__vite_ping`, `__manifest`, etc.).
- Requests whose path ends with a file extension (static assets). If a locale prefix is present on a static asset path (e.g. `/en-GB/logo.png`), it is stripped so the file can be served correctly.

### Domain routing

When `routing.domains` is configured in your Intlayer config, the middleware handles cross-domain locale routing:

- A request for `/zh/about` on `intlayer.org` is redirected to `https://intlayer.zh/about` when `domains.zh = "intlayer.zh"`.
- A request to `intlayer.zh/about` is rewritten internally to `/zh/about` so the `[locale]` route parameter is populated.

### Redirect loop protection

The middleware tracks redirect counts per `originalUrl → newUrl` pair within a 2-second sliding window. More than 10 redirects within that window returns a `500` response with a descriptive error instead of looping forever.

## Nitro / production SSR (automatic injection, v9+)

When `intlayerProxy` is used as a Vite plugin, it carries a `.nitro` property. The `nitro/vite` build plugin reads this property and pushes it into `nitroConfig.modules`, so `intlayerNitroHandler` is registered as a Nitro server middleware automatically — no manual configuration is needed for production SSR.

The Nitro handler uses h3 v2's Web Fetch API event model (not `fromNodeMiddleware`) so it is compatible with all Nitro presets: Node, Bun, Deno, edge runtimes.

## Deprecated aliases

| Deprecated export          | Replacement     |
| -------------------------- | --------------- |
| `intlayerMiddleware`       | `intlayerProxy` |
| `intLayerMiddlewarePlugin` | `intlayerProxy` |
