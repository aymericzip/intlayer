---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Migrate from NuxtJS I18n to Intlayer"
description: "Learn how to migrate your Nuxt.js application from @nuxtjs/i18n to Intlayer using the compat adapter."
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

# Migrate from NuxtJS I18n to Intlayer

Migrating your Nuxt application from `@nuxtjs/i18n` to Intlayer is a seamless process using the Nuxt adapter module.

## What to do

To initialise the project, run:

```bash
npx intlayer init
```

This will set up `intlayer.config.ts`. Then, add the Intlayer Nuxt module (e.g. `@intlayer/nuxt-i18n`) in your `nuxt.config.ts` modules array. This automatically applies the compat configuration for your application.

## What it does under the hood

`@nuxtjs/i18n` wraps `vue-i18n` whilst providing Nuxt-specific routing composables (`useLocalePath`, `useSwitchLocalePath`, `<NuxtLinkLocale>`).

Under the hood:

- **Translations:** Relies natively on the `@intlayer/vue-i18n` compat layer for all string translation tasks (fully supporting `vue-i18n` formats, pipe plurals, and reactivity).
- **Routing:** Mirrors the routing composables using Intlayer's localised URL helpers.
- **Configuration:** Reads the `availableLocales` and default settings straight from your `intlayer.config.ts` to coordinate Nuxt pages automatically.
