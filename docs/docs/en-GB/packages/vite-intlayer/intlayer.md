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
    changes: Initialised documentation
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

## Description

The plugin performs the following tasks:

1. **Prepare Dictionaries**: It compiles the dictionaries into optimised files at the start of the build or development process.
2. **Watch Mode**: In development mode, it watches for changes in dictionary files and recompiles them automatically.
3. **Aliases**: It provides aliases for accessing the dictionaries in your application.
4. **Tree-shaking**: It supports tree-shaking of unused translations through the `intlayerPrune` plugin.
