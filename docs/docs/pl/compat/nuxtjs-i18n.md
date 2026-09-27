---
createdAt: 2026-06-13
updatedAt: 2026-09-27
priority: 7
title: "@intlayer/nuxt-i18n: adapter zgodności dla @nuxtjs/i18n"
description: "Zachowaj kod @nuxtjs/i18n i serwuj go przez Intlayer: zainstaluj @intlayer/nuxt-i18n, ustaw aliasy importów i zobacz, co adapter zmienia pod spodem."
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

# @intlayer/nuxt-i18n: adapter zgodności dla @nuxtjs/i18n

Migracja aplikacji Nuxt z `@nuxtjs/i18n` do Intlayer jest bezproblemową operacją za pomocą modułu adaptera Nuxt.

## Co zrobić

Aby zainicjować projekt, uruchom:

```bash
npx intlayer init --interactive
```

To będzie ustawiać `intlayer.config.ts`. Następnie, dodaj moduł Intlayer Nuxt (np. `@intlayer/nuxt-i18n`) w tablicy modułów `nuxt.config.ts`. To automatycznie stosuje konfigurację compat dla twojej aplikacji.

## Co się dzieje za kulisami

`@nuxtjs/i18n` opakuje `vue-i18n` przy jednoczesnym zapewnieniu composables specyficznych dla Nuxt (`useLocalePath`, `useSwitchLocalePath`, `<NuxtLinkLocale>`).

Za kulisami:

- **Tłumaczenia:** Opiera się natywnie na warstwie compat `@intlayer/vue-i18n` dla wszystkich zadań tłumaczenia ciągu (w pełni obsługujące formaty `vue-i18n`, pipe liczby mnogiej i reaktywność).
- **Routing:** Odzwierciedla composables routingu używając pomocników URL zlokalizowanych przez Intlayer.
- **Konfiguracja:** Czyta `availableLocales` i ustawienia domyślne bezpośrednio z twojego `intlayer.config.ts` aby koordynować strony Nuxt automatycznie.

> Aby zrozumieć, skąd wzięły się te biblioteki, przeczytaj historię i18n w JavaScript.

- [Historia i18n w JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/history_of_i18n.md)
