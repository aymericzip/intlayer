---
createdAt: 2026-06-25
updatedAt: 2026-06-25
title: intlayerCompiler Vite Plugin Documentation | vite-intlayer
description: Vite plugin that extracts inline Intlayer content declarations from component files and writes them to dictionary JSON files at build/transform time.
keywords:
  - intlayerCompiler
  - vite
  - plugin
  - compiler
  - content
  - dictionary
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - vite-intlayer
  - intlayerCompiler
history:
  - version: 9.0.0
    date: 2026-06-25
    changes: "Bundled into intlayer(); init doc"
author: aymericzip
---

# intlayerCompiler

`intlayerCompiler` is a Vite plugin that scans component source files for **inline Intlayer content declarations** — content defined directly inside a component rather than in a separate `.content.ts` file — and writes them to dictionary JSON files during the transform phase.

> **Since Intlayer v9** `intlayerCompiler` is automatically included inside the main [`intlayer()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/vite-intlayer/intlayer.md) plugin when both `compiler.enabled` is `true` and `compiler.output` is set in your Intlayer config. You only need to register it separately when you want full control over compiler-specific configuration.

## Usage

### As part of `intlayer()` (recommended, v9+)

Enable the compiler through your Intlayer config:

```ts
// intlayer.config.ts
import { defineConfig } from "intlayer";

export default defineConfig({
  compiler: {
    enabled: true,
    output: "./src/dictionaries", // where extracted dictionaries are written
  },
});
```

Then use the standard plugin with no extra registration:

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer()],
});
```

### Standalone (when needed)

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayerCompiler()],
});
```

## Options

```ts
import type { IntlayerCompilerOptions } from "vite-intlayer";
```

| Option           | Type                      | Description                                                                                 |
| ---------------- | ------------------------- | ------------------------------------------------------------------------------------------- |
| `configOptions`  | `GetConfigurationOptions` | Intlayer configuration overrides forwarded to `getConfiguration()`.                         |
| `compilerConfig` | `Partial<CompilerConfig>` | Overrides for the compiler-specific config section (e.g. `enabled`, `output`, `filesList`). |

### Example

```ts
intlayerCompiler({
  configOptions: { configFile: "./config/intlayer.config.ts" },
  compilerConfig: { enabled: true, output: "./src/dictionaries" },
});
```

## How it works

### Transform phase

For every source file that matches `compiler.filesList`, the compiler plugin:

1. Passes the file content through `extractContent` from `@intlayer/babel`.
2. Calls `onExtract` for each declaration found, which writes the resulting dictionary JSON to `compiler.output`.
3. Returns the transformed source code with inline declarations replaced by standard `useIntlayer('key')` / `getIntlayer('key')` calls.

Supported file types: `.ts`, `.tsx`, `.js`, `.jsx`, `.vue`, `.svelte`, `.astro`.

### HMR (Hot Module Replacement)

When a component file is saved in development mode, the compiler:

1. Detects the file change via Vite's `handleHotUpdate` hook.
2. Re-extracts content from the updated file.
3. Writes the updated dictionary JSON.
4. Triggers a full page reload (`server.ws.send({ type: 'full-reload' })`).

A 500 ms debounce prevents the dictionary write itself (which also triggers a file-change event) from causing an infinite re-extraction loop.

### Deduplication

`intlayerCompiler` uses the same `createPrimaryInstanceGuard` deduplication mechanism as the other bundled plugins. When both `intlayer()` (which bundles the compiler) and a manual `intlayerCompiler()` call are present, only the first registered instance runs — no dictionaries are written twice.
