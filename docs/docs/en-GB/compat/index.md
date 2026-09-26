---
createdAt: 2026-06-13
updatedAt: 2026-06-13
priority: 7
title: "Intlayer Compat Adapters"
description: "Migrate your existing i18n solution to Intlayer with zero friction using compat adapters."
keywords:
  - compat
  - migration
  - internationalisation
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

Migrating a large application to a new internationalisation library can be daunting. To ease this transition, Intlayer provides **compat adapters** for the most popular i18n libraries in the ecosystem.

These adapter packages expose the **exact same public API** as your existing i18n libraries, but delegate all translation work to Intlayer at runtime.

## How it works

When you use a compat adapter, you do not need to rewrite your application's imports or change how you use your translation hooks and components. Instead, Intlayer's bundler plugins automatically alias your existing imports to the Intlayer compat packages.

For example, a developer replaces `import { useTranslation } from 'react-i18next'` with `import { useTranslation } from '@intlayer/react-i18next'` (done automatically via the bundler plugin), and the app keeps working with translations now served from Intlayer dictionaries. Keys are also typed against your Intlayer dictionaries!

## Available Compat Adapters

Choose your existing library below to see how to migrate seamlessly:

- [Vue I18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/compat/vue-i18n.md)
- [React Intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/compat/react-intl.md)
- [Svelte I18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/compat/svelte-i18n.md)
- [React i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/compat/react-i18next.md)
- [NuxtJS I18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/compat/nuxtjs-i18n.md)
- [NGX Translate](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/compat/ngx-translate.md)
- [Next Intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/compat/next-intl.md)
- [Next i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/compat/next-i18next.md)
- [i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/compat/i18next.md)
- [Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/compat/lingui.md)
