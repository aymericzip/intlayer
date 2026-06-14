---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Migrate from next-i18next to Intlayer"
description: "Learn how to migrate your Next.js application from next-i18next to Intlayer using the compat adapter."
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

# Migrate from next-i18next to Intlayer

For a complete and detailed step-by-step tutorial, please see our full [next-i18next Migration Guide](../migration_from_next-i18next_to_intlayer.md).

Intlayer handles all Next.js Pages Router and App Router implementations transparently. Using the adapter lets you migrate your `next-i18next` implementation with zero code rewrite.

## What to do

To begin, run:

```bash
npx intlayer init
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

The `createNextI18nPlugin` composes Next.js's native behavior alongside the core `next-intlayer` plugin, injecting all required Webpack/Turbopack aliases for `next-i18next`, `react-i18next`, and `i18next`.

Under the hood:

- **`serverSideTranslations` & `appWithTranslation`:** They now function as wrappers for Intlayer's internal loaders, circumventing large static JSON injection.
- **Client hooks:** Delegates immediately to `@intlayer/react-i18next` retaining all formatting, plurals, and nested namespace features.
