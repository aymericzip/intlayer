---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Migracja z NuxtJS I18n do Intlayer"
description: "Dowiedz się, jak przeprowadzić migrację aplikacji Nuxt.js z @nuxtjs/i18n do Intlayer za pomocą adaptera kompatybilności."
keywords:
  - nuxtjs-i18n
  - nuxt
  - vue
  - intlayer
  - migracja
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

# Migracja z NuxtJS I18n do Intlayer

Migracja aplikacji Nuxt z `@nuxtjs/i18n` do Intlayer jest bezproblemową operacją za pomocą modułu adaptera Nuxt.

## Co zrobić

Aby zainicjować projekt, uruchom:

```bash
npx intlayer init
```

To będzie ustawiać `intlayer.config.ts`. Następnie, dodaj moduł Intlayer Nuxt (np. `@intlayer/nuxt-i18n`) w tablicy modułów `nuxt.config.ts`. To automatycznie stosuje konfigurację compat dla twojej aplikacji.

## Co się dzieje za kulisami

`@nuxtjs/i18n` opakuje `vue-i18n` przy jednoczesnym zapewnieniu composables specyficznych dla Nuxt (`useLocalePath`, `useSwitchLocalePath`, `<NuxtLinkLocale>`).

Za kulisami:

- **Tłumaczenia:** Opiera się natywnie na warstwie compat `@intlayer/vue-i18n` dla wszystkich zadań tłumaczenia ciągu (w pełni obsługujące formaty `vue-i18n`, pipe liczby mnogiej i reaktywność).
- **Routing:** Odzwierciedla composables routingu używając pomocników URL zlokalizowanych przez Intlayer.
- **Konfiguracja:** Czyta `availableLocales` i ustawienia domyślne bezpośrednio z twojego `intlayer.config.ts` aby koordynować strony Nuxt automatycznie.
