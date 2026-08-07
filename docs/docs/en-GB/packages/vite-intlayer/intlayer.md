---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: intlayer Vite Plugin Documentation | vite-intlayer
description: See how to use the intlayer plugin for the vite-intlayer package
keywords:
  - intlayer
  - vite
  - plugin
  - Intlayer
  - intlayer
  - Internationalisation
  - Documentation
slugs:
  - doc
  - packages
  - vite-intlayer
  - intlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: "Initialised documentation"
author: aymericzip
---

# intlayer Vite Plugin Documentation

The `intlayer` Vite plugin integrates Intlayer configuration into the build process. It manages dictionary aliases, starts the dictionary watcher in development mode, and prepares dictionaries for the build.

## Usage

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
import type { IntlayerPluginOptions } from "vite-intlayer";
```

`IntlayerPluginOptions` extends `GetConfigurationOptions` (see `@intlayer/config`) with the following additional fields:

| Option          | Type                            | Default     | Description                                                                                                                           |
| --------------- | ------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `compatCallers` | `CompatCallerConfig[]`          | `[]`        | Extra caller patterns for compat-adapter packages (e.g. `@intlayer/react-i18next`). Passed to the field-usage analyser at build time. |
| `proxy`         | `{ ignore?: (req) => boolean }` | `undefined` | Options forwarded to the bundled locale-routing proxy. Use `ignore` to exclude specific paths (e.g. API routes) from locale routing.  |

All other options (`override`, `configFile`, …) are forwarded directly to `getConfiguration()`.

### Examples

#### Ignore API routes from locale routing

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

#### With a custom config file path

```ts
export default defineConfig({
  plugins: [
    intlayer({
      configFile: "./config/intlayer.config.ts",
    }),
  ],
});
```

#### With compat-adapter callers

```ts
import { intlayer } from "vite-intlayer";
import { reactI18nextCallerConfig } from "@intlayer/react-i18next/plugin";

export default defineConfig({
  plugins: [
    intlayer({
      compatCallers: [reactI18nextCallerConfig],
    }),
  ],
});
```

## What the plugin does

### 1. Dictionary preparation

Before the build starts (and once per hour in dev), `intlayer` calls `prepareIntlayer` to compile all `.content.ts` files into optimised JSON dictionaries stored in `.intlayer/`.

### 2. Module aliases

The plugin adds Vite resolve aliases so that `import { myDict } from 'intlayer/dictionaries/my-dict'` resolves to the compiled JSON file on disk. SSR builds use `ssr.noExternal` to ensure all `@intlayer/*` packages are bundled with aliases applied.

### 3. Dev-server watcher

In development mode a `chokidar` watcher is started. When a `.content.ts` file changes the dictionaries are recompiled and Vite's HMR propagates the update to the browser.

### 4. Bundled locale-routing proxy (v9+)

Since Intlayer v9 the `intlayerProxy` middleware is registered automatically inside `intlayer()`. It handles:

- Locale detection from URL prefix, cookies, and `Accept-Language` header.
- 301 redirects when the detected locale does not match the current URL.
- Internal URL rewrites so the framework sees the correct `[locale]` route parameter.

The proxy is controlled by `routing.enableProxy` (default `true`) in your Intlayer config. To disable it completely:

```ts
// intlayer.config.ts
import { defineConfig } from "intlayer";

export default defineConfig({
  routing: { enableProxy: false },
});
```

To customise proxy behaviour without a separate `intlayerProxy()` call, pass `proxy` options to the main plugin:

```ts
intlayer({ proxy: { ignore: (req) => req.url?.startsWith("/api") } });
```

See the [intlayerProxy documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/packages/vite-intlayer/intlayerProxy.md) for the full routing behaviour reference.

### 5. Bundled compiler (v9+)

When `compiler.enabled` is `true` **and** `compiler.output` is set in your Intlayer config, `intlayer()` registers `intlayerCompiler` automatically. The compiler extracts inline content declarations written directly inside component files and writes them to dictionaries at transform time. See [intlayerCompiler documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/packages/vite-intlayer/intlayerCompiler.md).

### 6. Build optimisations

During a production build the plugin adds:

- **intlayerOptimize** – Babel transform that rewrites `useIntlayer('key')` → `useDictionary(hash)` and injects direct JSON imports.
- **intlayerPrune** – removes unused content fields from dictionary JSON.
- **intlayerMinify** – compacts dictionary JSON and optionally mangles field names.

These are inactive in development mode.

## Deprecated aliases

| Deprecated export | Replacement |
| ----------------- | ----------- |
| `intlayerPlugin`  | `intlayer`  |
| `intLayerPlugin`  | `intlayer`  |
