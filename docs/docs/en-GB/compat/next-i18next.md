---
createdAt: 2026-06-13
updatedAt: 2026-09-27
priority: 7
title: "@intlayer/next-i18next: Compat Adapter for next-i18next"
description: "Keep your next-i18next code and serve it from Intlayer: install @intlayer/next-i18next, alias the imports, and see what the adapter changes under the hood."
keywords:
  - next-i18next
  - nextjs
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - next-i18next
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# @intlayer/next-i18next: Compat Adapter for next-i18next

For a complete and detailed step-by-step tutorial, please see our full [next-i18next Migration Guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/migration_from_next-i18next_to_intlayer.md).

Intlayer handles all Next.js Pages Router and App Router implementations transparently. Using the adapter lets you migrate your `next-i18next` implementation with zero code rewrite.

## What to do

To begin, run:

```bash
npx intlayer init --interactive
```

This creates the required Intlayer setup file. To swap to Intlayer behind the scenes, update your `next.config.ts`:

```typescript fileName="next.config.ts"
import type { NextConfig } from "next";
import { createNextI18nPlugin } from "@intlayer/next-i18next/plugin";

const withIntlayer = createNextI18nPlugin();

const nextConfig: NextConfig = {};

export default withIntlayer(nextConfig);
```

## What it does under the hood

The `createNextI18nPlugin` composes Next.js's native behaviour alongside the core `next-intlayer` plugin, injecting all required Webpack/Turbopack aliases for `next-i18next`, `react-i18next`, and `i18next`.

Under the hood:

- **`serverSideTranslations` & `appWithTranslation`:** They now function as wrappers for Intlayer's internal loaders, circumventing large static JSON injection.
- **Client hooks:** Delegates immediately to `@intlayer/react-i18next` retaining all formatting, plurals, and nested namespace features.

> To understand where these libraries come from, read the history of JavaScript i18n.

- [The history of JavaScript i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en-GB/history_of_i18n.md)
