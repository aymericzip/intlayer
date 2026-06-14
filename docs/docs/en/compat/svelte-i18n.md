---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Migrate from Svelte I18n to Intlayer"
description: "Learn how to migrate your Svelte application from svelte-i18n to Intlayer using the compat adapter."
keywords:
  - svelte-i18n
  - svelte
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - svelte-i18n
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# Migrate from Svelte I18n to Intlayer

Moving your Svelte application from `svelte-i18n` to Intlayer takes just a moment using the compat adapter.

## What to do

Simply run the initialization command in your project:

```bash
npx intlayer init
```

This generates `intlayer.config.ts`. Ensure your SvelteKit / Vite plugins are wrapped with Intlayer's alias plugin to seamlessly map `svelte-i18n` to `@intlayer/svelte-i18n`.

## What it does under the hood

Svelte-i18n relies on heavily used stores (`$_`, `$t`, `$format`, etc.) and ICU MessageFormat.

Under the hood:

- **Stores:** Intlayer proxies the `svelte-i18n` stores. `$_` becomes a derived store of the current locale returning an Intlayer resolver.
- **Keys:** Your flat keys (e.g. `$_('home.title')`) are evaluated such that the first path segment represents the Intlayer dictionary.
- **ICU Syntax:** Fully handled by the shared ICU resolver (`intl-messageformat` equivalent parsing).
- **Formatters:** `$date`, `$time`, `$number` calls redirect safely to Intlayer's native core formatters.
- **Babel/SWC Analysis:** The Intlayer analyzer reads the Svelte store callers (`$_`) inside your `.svelte` source files before compilation to automatically build the relevant dictionary chunks.
