---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: lynx-intlayer Package Documentation
description: Lynx support for Intlayer, providing polyfills for locale support.
keywords:
  - lynx-intlayer
  - lynx
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - lynx-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Unified documentation for all exports
---

# lynx-intlayer Package

The `lynx-intlayer` package provides the necessary tools to integrate Intlayer into Lynx applications.

## Installation

```bash
npm install lynx-intlayer
```

## Exports

### Polyfill

Import:

```tsx
import "lynx-intlayer";
```

| Function           | Description                                                             |
| ------------------ | ----------------------------------------------------------------------- |
| `intlayerPolyfill` | Function that applies necessary polyfills for Lynx to support Intlayer. |

### Rsbuild Plugin

The `lynx-intlayer` package provides an Rsbuild plugin to integrate Intlayer into the Lynx build process.

Import:

```tsx
import "lynx-intlayer";
```

| Function             | Description                                                  |
| -------------------- | ------------------------------------------------------------ |
| `pluginIntlayerLynx` | Rsbuild plugin that integrates Intlayer into the Lynx build. |
