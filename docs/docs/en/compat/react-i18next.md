---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Migrate from react-i18next to Intlayer"
description: "Learn how to migrate your React application from react-i18next to Intlayer using the compat adapter."
keywords:
  - react-i18next
  - i18next
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compat
  - react-i18next
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# Migrate from react-i18next to Intlayer

For a complete and detailed step-by-step tutorial, please see our full [react-i18next Migration Guide](../migration_from_react-i18next_to_intlayer.md).

Using Intlayer's compat adapter allows you to migrate from `react-i18next` without any changes to your source code imports.

## What to do

To initialize the project, run:

```bash
npx intlayer init
```

During initialization, Intlayer will install `@intlayer/react-i18next` and create `intlayer.config.ts`. In your bundler (like Vite), apply the Intlayer plugin:

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { reactI18nextVitePlugin } from "@intlayer/react-i18next/plugin";

export default defineConfig({
  plugins: [react(), reactI18nextVitePlugin()],
});
```

## What it does under the hood

The `reactI18nextVitePlugin` wraps the core `vite-intlayer` plugin and injects resolve aliases for `react-i18next` and `i18next`, redirecting them to `@intlayer/react-i18next` and `@intlayer/i18next`.

Under the hood:

- **`useTranslation` & `withTranslation`:** Rewritten to use Intlayer's native hooks, giving you automatic TypeScript completion for your dictionary keys. It seamlessly supports namespaces (e.g. `t('namespace:key')`).
- **Plurals & Context:** Handles i18next's suffix-based pluralization (`key_one`, `key_other`) using native `Intl.PluralRules` and context suffixes (`key_male`).
- **`<Trans>` Component:** Re-implemented to support the `components` prop, object and array forms, and numbered tags `<1>...</1>` directly mapping to your React nodes.
- **`i18n` instance:** Resolves keys directly from Intlayer without fetching large JSON files, resulting in significantly lower bundle sizes.
