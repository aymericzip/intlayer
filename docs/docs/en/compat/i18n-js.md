---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Migrate from i18n-js to Intlayer"
description: "Learn how to migrate your application from i18n-js to Intlayer using the compat adapter."
keywords:
  - i18n-js
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - i18n-js
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# Migrate from i18n-js to Intlayer

Transitioning from the `i18n-js` library to Intlayer is a highly optimized migration designed to offload large translations configurations into Intlayer's structured file resolution system.

## What to do

Execute the following setup command in your repository:

```bash
npx intlayer init
```

With `intlayer.config.ts` prepared, you can add Intlayer's alias to your bundler configuration so that any imports of `i18n-js` target the compat package `@intlayer/i18n-js`.

## What it does under the hood

`i18n-js` accesses namespaces through expressions like `i18n.t('scope.key', {name})` along with locale fallbacks and specific plural mappings.

Under the hood:

- **Interpolation:** The compat adapter easily parses `%{name}` mappings into your targeted runtime dictionary value.
- **Pluralization:** Replaces `one/other` subkeys and maps them against Intlayer's powerful underlying plural mechanisms (`Intl.PluralRules`), abstracting away manual mappings.
- **Locales:** Instead of loading monolithic language payloads at bootstrap, dictionaries are served up optimally based on the current context setup via the native Intlayer configuration.
