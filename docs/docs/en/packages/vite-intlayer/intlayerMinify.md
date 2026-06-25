---
createdAt: 2026-06-25
updatedAt: 2026-06-25
title: intlayerMinify Vite Plugin Documentation | vite-intlayer
description: Vite plugin that minifies compiled Intlayer dictionary JSON files and optionally mangles content field names to reduce bundle size.
keywords:
  - intlayerMinify
  - vite
  - plugin
  - minify
  - bundle size
  - dictionary
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - vite-intlayer
  - intlayerMinify
history:
  - version: 9.0.0
    date: 2026-06-25
    changes: "Init doc"
author: aymericzip
---

# intlayerMinify

`intlayerMinify` is a Vite plugin that minifies compiled dictionary JSON files during a production build. It strips all unnecessary whitespace and, when combined with `intlayerPrune`, optionally renames content field names to short alphabetic aliases (`a`, `b`, `c`, …) to further reduce bundle size.

> The plugin is already included and configured automatically when you use [`intlayer()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/vite-intlayer/intlayer.md). You only need to register it manually if you are composing the plugin stack yourself.

## Usage

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayerMinify, intlayerPrune } from "vite-intlayer";
import { createPruneContext } from "@intlayer/babel";

const pruneContext = createPruneContext();

export default defineConfig({
  plugins: [
    intlayerPrune(intlayerConfig, pruneContext),
    intlayerMinify(intlayerConfig, pruneContext),
  ],
});
```

## Activation conditions

`intlayerMinify` is active **only** when all three of the following are true:

1. The Vite command is `build` (not `serve` / dev).
2. `build.optimize` is `true` (or `undefined`, which defaults to `true` for builds).
3. `build.minify` is `true` in your Intlayer config.

It is automatically **disabled** when `editor.enabled` is `true` because the editor needs the full, human-readable dictionary content.

## What gets minified

The plugin targets two dictionary locations (as resolved from `intlayer.system`):

- `dictionariesDir` — static all-locale dictionaries (e.g. `.intlayer/dictionaries/*.json`)
- `dynamicDictionariesDir` — per-locale dynamic dictionaries

> Fetch-mode dictionaries (`fetchDictionariesDir`) are **never** minified because they are served from a remote API at runtime using their original field names. Renaming fields would create a mismatch between the server response and client-side property accesses.

## Field-name mangling (property minification)

When `intlayerPrune` has analysed the codebase and populated `pruneContext.dictionaryKeyToFieldRenameMap`, `intlayerMinify` also renames content field names to short aliases. For example:

```json
// before
{ "key": "myDict", "content": { "title": "Hello", "description": "World" } }

// after (with mangling)
{ "key": "myDict", "content": { "a": "Hello", "b": "World" } }
```

The corresponding source-file property accesses are renamed by the Babel pass inside `intlayerOptimize`, so runtime behaviour is unchanged.

Internal Intlayer fields (`nodeType`, `translation`, etc.) are never renamed.

## Edge-case dictionaries

Dictionaries flagged in `pruneContext.dictionariesWithEdgeCases` (structural anomalies detected during the prune phase) are skipped entirely — neither minified nor mangled — to avoid shipping broken data.

## Qualified groups (collections / variants / meta records)

For dictionaries with a `qualifierTypes` array (collections, variants, and meta records), the plugin preserves the `qualifierTypes` array and the `meta` side-map verbatim. Only the `content` entries have their field names mangled. The composite keys (used for selector matching at runtime) are never touched.
