---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Migrate from next-intl to Intlayer"
description: "Learn how to migrate your Next.js application from next-intl to Intlayer using the compat adapter."
keywords:
  - next-intl
  - nextjs
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compat
  - next-intl
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# Migrate from next-intl to Intlayer

For a complete and detailed step-by-step tutorial, please see our full [next-intl Migration Guide](../migration_from_next-intl_to_intlayer.md).

Migrating from `next-intl` to Intlayer allows you to maintain your application routing and syntax completely undisturbed.

## What to do

Execute the following command in your repository:

```bash
npx intlayer init
```

This will create an `intlayer.config.ts`. In your `next.config.ts`, use the plugin wrapper to seamlessly inject the `next-intl` aliases towards `@intlayer/next-intl`.

```typescript fileName="next.config.ts"
import type { NextConfig } from "next";
import { createNextIntlPlugin } from "@intlayer/next-intl/plugin";

const withIntlayer = createNextIntlPlugin();

const nextConfig: NextConfig = {};

export default withIntlayer(nextConfig);
```

## What it does under the hood

The bundler wrapper replaces translations, but **leaves the `next-intl/navigation` features intact** (e.g. `Link`, `redirect`, `usePathname`).

Under the hood:

- **ICU runtime:** Plurals (`=0`, `one`, `other`), select/selectordinal, `#` arguments, and formatted args (`{ts, date, long}`) run correctly using the shared `resolveMessage(..., 'icu')` resolver.
- **`useTranslations()` & `getTranslations()`:** The bare scope calls extract the first key segment as the correct dictionary identifier. Nested namespaces gracefully split into dictionary paths and prefixes.
- **Rich formatting:** Both `t.rich()` and `t.markup()` are fully natively implemented, converting HTML-like nodes into rendered React chunks.
- **`useFormatter`:** `relativeTime`, `list`, `dateTimeRange`, and named formats from the configuration bridge to the core native `Intl` formatters.
