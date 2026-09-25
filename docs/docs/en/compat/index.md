---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Intlayer Compat Adapters"
description: "Migrate your existing i18n solution to Intlayer with zero friction using compat adapters."
keywords:
  - compat
  - migration
  - internationalization
  - i18n
  - Intlayer
slugs:
  - doc
  - compatibility
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# Intlayer Compat Adapters

Migrating a large application to a new internationalization library can be daunting. To ease this transition, Intlayer provides **compat adapters** for the most popular i18n libraries in the ecosystem.

These adapter packages expose the **exact same public API** as your existing i18n libraries, but delegate all translation work to Intlayer at runtime.

## How it works

When you use a compat adapter, you do not need to rewrite your application's imports or change how you use your translation hooks and components. Instead, Intlayer's bundler plugins automatically alias your existing imports to the Intlayer compat packages.

For example, a developer replaces `import { useTranslation } from 'react-i18next'` with `import { useTranslation } from '@intlayer/react-i18next'` (done automatically via the bundler plugin), and the app keeps working with translations now served from Intlayer dictionaries. Keys are also typed against your Intlayer dictionaries!

## Available Compat Adapters

Choose your existing library below to see how to migrate seamlessly:

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/compat/vue-i18n" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/compat/transloco" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/compat/react-intl" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/compat/svelte-i18n" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/compat/react-i18next" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/compat/polyglot" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/compat/nuxtjs-i18n" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/compat/ngx-translate" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/compat/next-translate" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/compat/next-intl" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/compat/next-i18next" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/compat/i18next" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/compat/lingui" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/compat/i18n-js" />
</TechGrid>
