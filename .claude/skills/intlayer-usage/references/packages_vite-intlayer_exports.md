---
createdAt: 2026-01-21
updatedAt: 2026-06-25
title: vite-intlayer Package Documentation
description: Vite plugin for Intlayer, providing dictionary aliases, watchers, locale routing, and build optimisations.
keywords:
  - vite-intlayer
  - vite
  - plugin
  - internationalization
  - i18n
  - proxy
  - routing
  - tree-shaking
slugs:
  - doc
  - packages
  - vite-intlayer
  - exports
history:
  - version: 9.0.0
    date: 2026-06-25
    changes: "Updated exports index – proxy and compiler now bundled into intlayer(); added intlayerProxy, intlayerCompiler, intlayerMinify docs"
  - version: 8.0.0
    date: 2026-01-21
    changes: "Unified documentation for all exports"
author: aymericzip
---

# vite-intlayer Package

The `vite-intlayer` package provides a Vite plugin to integrate Intlayer into your Vite-based application. It handles dictionary compilation, dev-server watching, module aliases, locale-routing middleware, and build-time optimisations (tree-shaking, minification).

## Installation

```bash
npm install vite-intlayer
```

## Exports

### Plugins

Import:

```ts
import { ... } from "vite-intlayer";
```

| Export                     | Description                                                                                                                                       | Related Doc                                                                                                                  |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `intlayer`                 | Main Vite plugin. Prepares dictionaries, configures aliases, starts dev-server watchers, and (since v9) bundles the proxy and compiler.           | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/vite-intlayer/intlayer.md)                 |
| `intlayerPlugin`           | (**Deprecated**) Alias for `intlayer`.                                                                                                            | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/vite-intlayer/intlayer.md)                 |
| `intLayerPlugin`           | (**Deprecated**) Alias for `intlayer`.                                                                                                            | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/vite-intlayer/intlayer.md)                 |
| `intlayerProxy`            | Locale-routing middleware plugin (detection, redirect, rewrite). Since v9 it is bundled inside `intlayer()` – register separately only if needed. | [intlayerProxy](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/vite-intlayer/intlayerProxy.md)       |
| `intlayerMiddleware`       | (**Deprecated**) Alias for `intlayerProxy`.                                                                                                       | [intlayerProxy](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/vite-intlayer/intlayerProxy.md)       |
| `intLayerMiddlewarePlugin` | (**Deprecated**) Alias for `intlayerProxy`.                                                                                                       | [intlayerProxy](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/vite-intlayer/intlayerProxy.md)       |
| `intlayerCompiler`         | Extracts inline content declarations from components and writes them to dictionaries. Since v9 it is bundled inside `intlayer()`.                 | [intlayerCompiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/vite-intlayer/intlayerCompiler.md) |
| `intlayerPrune`            | Tree-shakes unused dictionary fields from the production bundle.                                                                                  | [intlayerPrune](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/vite-intlayer/intlayerPrune.md)       |
| `intlayerMinify`           | Minifies compiled dictionary JSON files and optionally mangles field names.                                                                       | [intlayerMinify](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/vite-intlayer/intlayerMinify.md)     |

### Utilities

| Export                       | Description                                                                                   | Related Doc                                                                                                            |
| ---------------------------- | --------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `createIntlayerProxyHandler` | Returns a framework-agnostic Node.js `(req, res, next)` middleware with locale-routing logic. | [intlayerProxy](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/vite-intlayer/intlayerProxy.md) |

### Types

| Export                       | Description                                                                                                      |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `IntlayerPluginOptions`      | Options accepted by `intlayer()`. Extends `GetConfigurationOptions` with `compatCallers` and `proxy`.            |
| `IntlayerProxyPluginOptions` | Options accepted by `intlayerProxy()` and `createIntlayerProxyHandler()`. Includes `ignore` and `configOptions`. |
| `IntlayerCompilerOptions`    | Options accepted by `intlayerCompiler()`. Includes `configOptions` and `compilerConfig`.                         |
| `CompatCallerConfig`         | Re-export from `@intlayer/babel`. Describes a compat-adapter caller pattern for field-usage analysis.            |
