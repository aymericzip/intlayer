---
createdAt: 2026-01-21
updatedAt: 2026-06-25
title: intlayerPrune Vite Plugin Documentation | vite-intlayer
description: Vite plugin that tree-shakes unused dictionary fields from the production bundle to reduce bundle size.
keywords:
  - intlayerPrune
  - vite
  - plugin
  - tree-shaking
  - bundle size
  - dictionary
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - vite-intlayer
  - intlayerPrune
history:
  - version: 9.0.0
    date: 2026-06-25
    changes: "Expanded with field-level pruning, pruneContext, and edge-case details"
  - version: 8.0.0
    date: 2026-01-21
    changes: "Init doc"
author: aymericzip
---

# intlayerPrune

`intlayerPrune` is a Vite plugin that removes unused content fields from compiled dictionary JSON files during a production build. Instead of shipping every field from every dictionary, only the fields that are actually accessed in your source code are included in the bundle.

> The plugin is already included and configured automatically when you use [`intlayer()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/vite-intlayer/intlayer.md). You only need to register it manually if you are composing the plugin stack yourself.

## Usage

### As part of `intlayer()` (recommended)

Enable pruning through your Intlayer config and the main plugin handles everything:

```ts
// intlayer.config.ts
import { defineConfig } from "intlayer";

export default defineConfig({
  build: {
    optimize: true, // enables both prune and minify
  },
});
```

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer()],
});
```

### Standalone

If you are composing the plugin stack manually, `intlayerPrune` and `intlayerMinify` share a `PruneContext` object that must be created once and passed to both:

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayerPrune, intlayerMinify } from "vite-intlayer";
import { createPruneContext } from "@intlayer/babel";
import { getConfiguration } from "@intlayer/config/node";

const intlayerConfig = getConfiguration();
const pruneContext = createPruneContext();

export default defineConfig({
  plugins: [
    intlayerPrune(intlayerConfig, pruneContext),
    intlayerMinify(intlayerConfig, pruneContext), // optional, reads from same context
  ],
});
```

## How it works

### 1. Usage analysis (buildStart)

During `buildStart`, the `intlayerOptimize` plugin (also part of `intlayer()`) scans every component source file listed in `build.filesList`. For each `useIntlayer('key')` or `getIntlayer('key')` call, it records exactly which fields are accessed, e.g.:

```ts
const { title, description } = useIntlayer("myDict");
// records: myDict → { title, description }
```

This builds `pruneContext.fieldUsageMap` before any `transform` calls run.

### 2. JSON pruning (transform, enforce: 'pre')

When Vite processes a compiled dictionary JSON file, `intlayerPrune` intercepts it before Vite's built-in JSON → ESM conversion. It reads the field-usage map from `pruneContext` and removes any content field that is not in the recorded usage set.

Two content shapes are supported:

- **Static dictionaries** — `{ nodeType: "translation", translation: { en: {...}, fr: {...} } }`. Fields are pruned per-locale inside `translation`.
- **Dynamic (per-locale) dictionaries** — flat `{ fieldA: ..., fieldB: ... }`. Fields are pruned at the top level.

### 3. Edge cases

If a dictionary's content structure cannot be recognised (e.g. an unusual nested shape), it is added to `pruneContext.dictionariesWithEdgeCases` and **left untouched**. A warning is logged. `intlayerMinify` also skips these dictionaries.

### 4. Field-rename map

When pruning succeeds, `intlayerPrune` also writes `pruneContext.dictionaryKeyToFieldRenameMap` — a mapping from original field names to short aliases. `intlayerMinify` reads this map to rename fields in the output JSON, and `intlayerOptimize`'s Babel rename pass updates property accesses in source files accordingly.

## Activation conditions

`intlayerPrune` is active **only** when all of the following are true:

1. The Vite command is `build`.
2. `build.optimize` is `true` (or `undefined`, which defaults to `true` for builds).
3. `build.purge` is `true` in your Intlayer config.

It is automatically **disabled** when `editor.enabled` is `true` because the editor needs the full dictionary content.
