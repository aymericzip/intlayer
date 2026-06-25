---
createdAt: 2026-06-25
updatedAt: 2026-06-25
title: "@intlayer/babel Package Documentation"
description: Babel plugins for Intlayer to handle content extraction, import optimisation, pruning of unused fields, and mangling of field names during build.
keywords:
  - "@intlayer/babel"
  - babel
  - plugin
  - internationalisation
  - i18n
  - compiler
  - optimise
  - purge
  - minify
slugs:
  - doc
  - packages
  - "@intlayer/babel"
  - export
history:
  - version: 9.0.0
    date: 2026-06-25
    changes: "Unified documentation of all exports"
author: aymericzip
---

# @intlayer/babel Package

The `@intlayer/babel` package provides a set of specialised Babel plugins for Intlayer. These plugins cover the entire build cycle: extracting content declarations, rewriting `useIntlayer` / `getIntlayer` calls to optimised dictionary imports, pruning unused fields, and minifying field names.

## Installation

```bash
npm install @intlayer/babel
```

## Exports

Import:

```ts
import { ... } from "@intlayer/babel";
```

---

### Plugins

| Function / Class               | Description                                                                                                                                                                                 |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `intlayerExtractBabelPlugin`   | Babel plugin that extracts translatable content from source files and injects `useIntlayer` / `getIntlayer` hooks automatically. Designed for use with Next.js and Babel-based build tools. |
| `intlayerOptimizeBabelPlugin`  | Babel plugin that transforms `useIntlayer` and `getIntlayer` calls and rewrites their imports to optimised JSON dictionary imports (static, dynamic, or via fetch).                         |
| `intlayerPurgeBabelPlugin`     | Babel plugin that analyses source files and rewrites compiled dictionary JSON files to remove unused fields (`build.purge`) or rename them to short aliases (`build.minify`).               |
| `intlayerMinifyBabelPlugin`    | Babel plugin that rewrites source files to use the short field aliases assigned during the minification phase (e.g. `content.title` ← `content.a`). Relies on `intlayerPurgeBabelPlugin`.   |
| `makeFieldRenameBabelPlugin`   | Factory function that produces a Babel plugin to rename dictionary content field accesses in source files according to the `dictionaryKeyToFieldRenameMap` populated in the `PruneContext`. |
| `makeUsageAnalyzerBabelPlugin` | Factory function that produces a Babel plugin to analyze the usage of `useIntlayer` / `getIntlayer` in the source code and aggregate field usage data in the shared `PruneContext`.         |
| `getSharedPruneContext`        | Helper function that returns the shared `PruneContext` object for the specified base directory, or `null` if it has not been initialised yet.                                               |

---

### Plugin Configuration Utilities

| Function                   | Description                                                                                                                                       |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `getExtractPluginOptions`  | Loads the Intlayer configuration and returns `ExtractPluginOptions` ready for use with `intlayerExtractBabelPlugin`.                              |
| `getOptimizePluginOptions` | Loads the Intlayer configuration and compiled dictionaries, and returns `OptimizePluginOptions` ready for use with `intlayerOptimizeBabelPlugin`. |
| `getPurgePluginOptions`    | Loads the Intlayer configuration and returns `PurgePluginOptions` ready for use with `intlayerPurgeBabelPlugin`.                                  |
| `getMinifyPluginOptions`   | Loads the Intlayer configuration and returns `MinifyPluginOptions` ready for use with `intlayerMinifyBabelPlugin`.                                |

---

### Types

| Type                    | Description                                                                                                     |
| ----------------------- | --------------------------------------------------------------------------------------------------------------- |
| `CompilerMode`          | Compiler mode: `'dev'` for development with HMR support, or `'build'` for production builds.                    |
| `ExtractPluginOptions`  | Options for `intlayerExtractBabelPlugin`: files list, configuration, `onExtract` callback, etc.                 |
| `ExtractResult`         | Extraction result: dictionary key, file path, content, and locale.                                              |
| `OptimizePluginOptions` | Options for `intlayerOptimizeBabelPlugin`: dictionary paths, import mode, mode map per dictionary, etc.         |
| `PurgePluginOptions`    | Options for `intlayerPurgeBabelPlugin`: base directory, purge/minify/optimise flags, component files list.      |
| `MinifyPluginOptions`   | Options for `intlayerMinifyBabelPlugin`: base directory, minify/optimise/editorEnabled flags.                   |
| `PruneContext`          | Shared state between analysis and pruning plugins: field usage maps, rename maps, etc.                          |
| `DictionaryFieldUsage`  | Field usage result for a single dictionary: `Set<string>` or `'all'` when static analysis is inconclusive.      |
| `NestedRenameEntry`     | Node in the rename tree: the shortName and the children map.                                                    |
| `NestedRenameMap`       | One level in the rename tree: `Map<string, NestedRenameEntry>`.                                                 |
| `CompatCallerConfig`    | Configuration for a compatible usage analyzer for compat-adapter packages (caller name and processing options). |
| `ScriptBlock`           | Script block extracted from a SFC file (Vue or Svelte): content, start offset, and end offset.                  |

---

### Utility Functions

| Function                          | Description                                                                                                                                                   |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `generateShortFieldName`          | Converts an integer (starting from zero) into a short alphabetic identifier: `0` → `'a'`, `25` → `'z'`, `26` → `'aa'`, etc.                                   |
| `buildNestedRenameMapFromContent` | Recursively builds a `NestedRenameMap` from the content value of a compiled dictionary, respecting Intlayer node structures (translation, enumeration, etc.). |
| `createPruneContext`              | Creates a new empty `PruneContext` object initialized with default values.                                                                                    |
| `extractScriptBlocks`             | Extracts `<script>` blocks from SFC files (Vue / Svelte) for subsequent Babel analysis.                                                                       |
| `BABEL_PARSER_OPTIONS`            | Constant representing Babel parser options covering the supported frameworks (React/Vue/Svelte/Angular/...).                                                  |
| `INTLAYER_CALLER_NAMES`           | Constant list of original Intlayer caller names: `['useIntlayer', 'getIntlayer']`.                                                                            |

---

## Example Usage

```js
// babel.config.js
const {
  intlayerExtractBabelPlugin,
  intlayerPurgeBabelPlugin,
  intlayerMinifyBabelPlugin,
  intlayerOptimizeBabelPlugin,
  getExtractPluginOptions,
  getPurgePluginOptions,
  getMinifyPluginOptions,
  getOptimizePluginOptions,
} = require("@intlayer/babel");

module.exports = {
  presets: ["next/babel"],
  plugins: [
    [intlayerExtractBabelPlugin, getExtractPluginOptions()],
    [intlayerPurgeBabelPlugin, getPurgePluginOptions()],
    [intlayerMinifyBabelPlugin, getMinifyPluginOptions()],
    [intlayerOptimizeBabelPlugin, getOptimizePluginOptions()],
  ],
};
```

> **Note:** The `intlayerPurgeBabelPlugin` must be declared **before** `intlayerMinifyBabelPlugin`, because the latter reads the rename map built by the former. In addition, they both must be preceded by `intlayerOptimizeBabelPlugin` so that it can see the dictionary keys before the `useIntlayer` calls are rewritten.
