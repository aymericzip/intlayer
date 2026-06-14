---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Migrate from i18next to Intlayer"
description: "Learn how to migrate your Vanilla JS/TS application from i18next to Intlayer using the compat adapter."
keywords:
  - i18next
  - vanilla
  - javascript
  - typescript
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - i18next
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# Migrate from i18next to Intlayer

For a detailed step-by-step tutorial, please see our full [i18next Migration Guide](../migration_from_i18next_to_intlayer.md).

Intlayer perfectly replicates the core runtime characteristics of `i18next`. By utilizing the compat package, your Vanilla applications or internal modules can continue to leverage familiar syntax.

## What to do

To begin, initialize Intlayer in your project:

```bash
npx intlayer init
```

If you are using Vite, include the Intlayer plugin to route imports to `@intlayer/i18next`:

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { i18nextVitePlugin } from "@intlayer/i18next/plugin";

export default defineConfig({
  plugins: [i18nextVitePlugin()],
});
```

## What it does under the hood

The `i18nextVitePlugin` aliases `i18next` imports to `@intlayer/i18next`, avoiding bundle bloat from JSON file inclusions.

Under the hood:

- **Instance configuration:** `createInstance` correctly parses and applies namespace fallbacks while leveraging Intlayer's compilation pipeline for dictionary retrieval.
- **Interpolation:** Native support for `{{name}}` replacements and `$t(key)` nesting recursively.
- **Context & Plurals:** Identifies and resolves suffix formats like `key_male` and `key_one`/`key_other` evaluating against standard `Intl.PluralRules`.
- **Return objects:** The `returnObjects: true` mode safely extracts trees from Intlayer dictionaries.
