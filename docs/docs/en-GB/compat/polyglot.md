---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Migrate from Polyglot.js to Intlayer"
description: "Learn how to migrate from Polyglot.js to Intlayer using the compat adapter."
keywords:
  - polyglot
  - airbnb
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - polyglot
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# Migrate from Polyglot.js to Intlayer

If you are using Airbnb's Polyglot.js, migrating to Intlayer is extremely straightforward using the compat layer.

## What to do

Simply run the initialisation command in your project:

```bash
npx intlayer init
```

This generates `intlayer.config.ts`. You can then utilise the bundler plugin alias to transparently redirect Polyglot imports to `@intlayer/polyglot`.

## What it does under the hood

Polyglot.js syntax typically relies on `polyglot.t('key', {name})` with `%{name}` interpolations and `smart_count` plurals separated by `"singular |||| plural"`.

Under the hood:

- **Interpolation:** The compat layer handles `%{var}` placeholders natively.
- **Plurals:** The string is split at `||||` and evaluated against native `Intl.PluralRules` according to the active locale, mirroring Polyglot's own bucket order per locale.
- **Dictionaries:** You bypass the need to provide huge JSON configurations to `new Polyglot()` – Intlayer handles the dictionaries dynamically and prunes them automatically.
