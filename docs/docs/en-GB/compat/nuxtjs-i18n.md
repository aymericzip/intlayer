---
createdAt: 2026-06-13
updatedAt: 2026-09-27
priority: 7
title: "@intlayer/nuxt-i18n: Compat Adapter for @nuxtjs/i18n"
description: "Keep your @nuxtjs/i18n code and serve it from Intlayer: install @intlayer/nuxt-i18n, alias the imports, and see what the adapter changes under the hood."
keywords:
  - nuxtjs-i18n
  - nuxt
  - vue
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - nuxtjs-i18n
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# @intlayer/nuxt-i18n: Compat Adapter for @nuxtjs/i18n

Migrating your Nuxt application from `@nuxtjs/i18n` to Intlayer is a seamless process using the Nuxt adapter module.

## What to do

To initialise the project, run:

```bash
npx intlayer init --interactive
```

This will set up `intlayer.config.ts`. Then, add the Intlayer Nuxt module (e.g. `@intlayer/nuxt-i18n`) in your `nuxt.config.ts` modules array. This automatically applies the compat configuration for your application.

## What it does under the hood

`@nuxtjs/i18n` wraps `vue-i18n` whilst providing Nuxt-specific routing composables (`useLocalePath`, `useSwitchLocalePath`, `<NuxtLinkLocale>`).

Under the hood:

- **Translations:** Relies natively on the `@intlayer/vue-i18n` compat layer for all string translation tasks (fully supporting `vue-i18n` formats, pipe plurals, and reactivity).
- **Routing:** Mirrors the routing composables using Intlayer's localised URL helpers.
- **Configuration:** Reads the `availableLocales` and default settings straight from your `intlayer.config.ts` to coordinate Nuxt pages automatically.

> To understand where these libraries come from, read the history of JavaScript i18n.

- [The history of JavaScript i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en-GB/history_of_i18n.md)
