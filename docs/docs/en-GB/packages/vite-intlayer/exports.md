---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: vite-intlayer package documentation
description: Vite plugin for Intlayer, providing dictionary aliases and watchers.
keywords:
  - vite-intlayer
  - vite
  - plugin
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - vite-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: "Unified documentation for all exports"
author: aymericzip
---

# vite-intlayer package

The `vite-intlayer` package provides a Vite plugin to integrate Intlayer into your Vite-based application.

## Installation

```bash
npm install vite-intlayer
```

## Exports

### Plugin

Import:

```tsx
import "vite-intlayer";
```

| Function             | Description                                                           | Related documentation                                                                                                     |
| -------------------- | --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `intlayer`           | Main Vite plugin that integrates Intlayer into the build process.     | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/packages/vite-intlayer/intlayer.md)           |
| `intlayerPlugin`     | (**Deprecated**) Alias for `intlayer`.                                | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/packages/vite-intlayer/intlayer.md)           |
| `intlayerProxy`      | Development middleware plugin to handle locale detection and routing. | -                                                                                                                         |
| `intlayerMiddleware` | (**Deprecated**) Alias for `intlayerProxy`.                           | -                                                                                                                         |
| `intlayerPrune`      | Plugin to tree-shake and prune unused dictionaries during the build.  | [intlayerPrune](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/packages/vite-intlayer/intlayerPrune.md) |

### Utilities

| Export                       | Description                                                                                   | Related Doc                                                                                                               |
| ---------------------------- | --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `createIntlayerProxyHandler` | Returns a framework-agnostic Node.js `(req, res, next)` middleware with locale-routing logic. | [intlayerProxy](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/packages/vite-intlayer/intlayerProxy.md) |

### Types

| Export                       | Description                                                                                                      |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `IntlayerPluginOptions`      | Options accepted by `intlayer()`. Extends `GetConfigurationOptions` with `compatCallers` and `proxy`.            |
| `IntlayerProxyPluginOptions` | Options accepted by `intlayerProxy()` and `createIntlayerProxyHandler()`. Includes `ignore` and `configOptions`. |
| `IntlayerCompilerOptions`    | Options accepted by `intlayerCompiler()`. Includes `configOptions` and `compilerConfig`.                         |
| `CompatCallerConfig`         | Re-export from `@intlayer/babel`. Describes a compat-adapter caller pattern for field-usage analysis.            |
