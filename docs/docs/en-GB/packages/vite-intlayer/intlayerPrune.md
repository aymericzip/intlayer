---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: intlayerPrune Vite Plugin Documentation | vite-intlayer
description: See how to use the intlayerPrune plugin for the vite-intlayer package
keywords:
  - intlayerPrune
  - vite
  - plugin
  - tree-shaking
  - Intlayer
  - intlayer
  - Internationalisation
  - Documentation
slugs:
  - doc
  - packages
  - vite-intlayer
  - intlayerPrune
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Initial documentation
---

# intlayerPrune Vite Plugin Documentation

The `intlayerPrune` Vite plugin is used to tree-shake and prune unused dictionaries from your application's bundle. This helps reduce the final bundle size by only including the necessary multilingual content.

## Usage

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayer, intlayerPrune } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer(), intlayerPrune()],
});
```

## Description

The plugin analyses your source code to identify which dictionary keys are actually used. It then removes any unused content from the bundled dictionary files. This is particularly useful for large projects with many dictionaries where only a subset is used on specific pages or in certain components.
