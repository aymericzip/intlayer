---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Migrate from Next Translate to Intlayer"
description: "Learn how to migrate your Next.js application from next-translate to Intlayer using the compat adapter."
keywords:
  - next-translate
  - nextjs
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compat
  - next-translate
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# Migrate from Next Translate to Intlayer

Migrating from `next-translate` to Intlayer is a near drop-in replacement that retains your existing syntax and tags.

## What to do

Initialize Intlayer in your project:

```bash
npx intlayer init
```

The CLI will scaffold your configuration. You can then apply the Intlayer plugin in your `next.config.ts`, which injects build-time subpath aliases mapping `next-translate/useTranslation` to `@intlayer/next-translate`.

## What it does under the hood

`next-translate` provides hooks like `useTranslation('ns')`, `t('ns:key.path')`, and the `<Trans>` component.

Under the hood:

- **Interpolation & Plurals:** It relies closely on the `react-i18next` adapter behavior. Handled dynamically are `{{var}}` placeholders and pluralization mapped from suffixes like `key_0`, `key_one`, and `key_other`.
- **`<Trans>` component:** Directly supported for HTML-ish tag parsing alongside an array-based `components` prop.
- **Namespaces:** Subpath aliasing ensures that your `useTranslation` references the correct internal dictionary namespaces without manual modification.
