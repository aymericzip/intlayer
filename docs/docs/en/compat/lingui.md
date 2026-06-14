---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Migrate from Lingui to Intlayer"
description: "Learn how to migrate your application from Lingui to Intlayer using the compat adapter."
keywords:
  - lingui
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compat
  - lingui
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# Migrate from Lingui to Intlayer

If your project currently relies on Lingui's macro-based compilation, transitioning to Intlayer allows you to maintain your powerful macro workflows while backing them natively with Intlayer's JSON compilation strategy.

## What to do

To begin, initialize Intlayer in your project:

```bash
npx intlayer init
```

This creates your `intlayer.config.ts`. Ensure you retain `@lingui/babel-plugin-lingui-macro` / `@lingui/swc-plugin` in your build step to run _before_ the Intlayer compiler. Then, use the bundler plugin alias to route `@lingui/core` and `@lingui/react` to `@intlayer/lingui`.

## What it does under the hood

Lingui utilizes macros (like `` t`Hello ${name}` `` and `<Trans>`) which are compiled into runtime calls like `i18n._(id, values)`.

Under the hood:

- **Macros:** They compile precisely as they did before, ensuring no disruption in your source syntax.
- **Runtime translation:** The aliased `i18n._()` uses Intlayer dictionaries. Both explicitly named IDs and hashed IDs are fully mapped using Intlayer's `.po` sync plugins to aggregate and prune keys securely.
- **ICU capabilities:** Support for pluralization, selection, and ICU variants remains robust due to Intlayer's unified ICU parser, ensuring identical rendering outputs.
