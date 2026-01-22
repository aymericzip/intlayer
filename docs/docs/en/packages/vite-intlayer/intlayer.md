---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: intlayer Vite Plugin Documentation | vite-intlayer
description: See how to use the intlayer plugin for vite-intlayer package
keywords:
  - intlayer
  - vite
  - plugin
  - Intlayer
  - intlayer
  - Internationalization
  - Documentation
slugs:
  - doc
  - packages
  - vite-intlayer
  - intlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Init doc
---

# intlayer Vite Plugin Documentation

The `intlayer` Vite plugin integrates Intlayer configuration into the build process. It handles dictionary aliases, starts the dictionary watcher in development mode, and prepares dictionaries for the build.

## Usage

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer()],
});
```

## Description

The plugin performs the following tasks:

1. **Prepare Dictionaries**: It compiles the dictionaries into optimized files at the start of the build or dev process.
2. **Watch Mode**: In development mode, it watches for changes in dictionary files and recompiles them automatically.
3. **Aliases**: it provides aliases for accessing the dictionaries in your application.
4. **Tree-shaking**: it supports tree-shaking unused translations through the `intlayerPrune` plugin.
