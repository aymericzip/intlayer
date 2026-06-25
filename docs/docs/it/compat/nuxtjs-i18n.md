---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Migrazione da NuxtJS I18n a Intlayer"
description: "Scopri come migrare la tua applicazione Nuxt.js da @nuxtjs/i18n a Intlayer utilizzando l'adapter di compatibilità."
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

# Migrare da NuxtJS I18n a Intlayer

La migrazione della tua applicazione Nuxt da `@nuxtjs/i18n` a Intlayer è un processo senza soluzione di continuità utilizzando il modulo adattatore Nuxt.

## Cosa fare

Per inizializzare il progetto, esegui:

```bash
npx intlayer init
```

Questo configurerà `intlayer.config.ts`. Quindi, aggiungi il modulo Intlayer Nuxt (ad es. `@intlayer/nuxt-i18n`) nell'array dei moduli del tuo `nuxt.config.ts`. Questo applica automaticamente la configurazione di compatibilità per la tua applicazione.

## Cosa fa dietro le quinte

`@nuxtjs/i18n` wraps `vue-i18n` while providing Nuxt-specific routing composables (`useLocalePath`, `useSwitchLocalePath`, `<NuxtLinkLocale>`).

Dietro le quinte:

- **Translations:** Relies natively on the `@intlayer/vue-i18n` compat layer for all string translation tasks (fully supporting `vue-i18n` formats, pipe plurals, and reactivity).
- **Routing:** Mirrors the routing composables using Intlayer's localized URL helpers.
- **Configuration:** Reads the `availableLocales` and default settings straight from your `intlayer.config.ts` to coordinate Nuxt pages automatically.
