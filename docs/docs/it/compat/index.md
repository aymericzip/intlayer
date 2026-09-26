---
createdAt: 2026-06-13
updatedAt: 2026-06-13
priority: 7
title: "Intlayer Compat Adapters"
description: "Migra la tua soluzione i18n esistente a Intlayer senza attriti utilizzando compat adapters."
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

# Adattatori di compatibilità Intlayer

La migrazione di un'applicazione di grandi dimensioni a una nuova libreria di internazionalizzazione può essere impegnativa. Per facilitare questa transizione, Intlayer fornisce **adattatori di compatibilità** per le librerie i18n più popolari dell'ecosistema.

Questi pacchetti adattatore espongono la **stessa API pubblica** delle tue librerie i18n esistenti, ma delegano tutto il lavoro di traduzione a Intlayer a runtime.

## Come funziona

Quando usi un compat adapter, non hai bisogno di riscrivere gli import della tua applicazione o cambiare come utilizzi i tuoi translation hooks e componenti. Invece, i plugin bundler di Intlayer eseguono automaticamente l'alias dei tuoi import esistenti ai package compat di Intlayer.

Ad esempio, uno sviluppatore sostituisce `import { useTranslation } from 'react-i18next'` con `import { useTranslation } from '@intlayer/react-i18next'` (fatto automaticamente dal plugin bundler), e l'app continua a funzionare con le traduzioni ora servite dai dizionari di Intlayer. Le chiavi sono anche tipizzate rispetto ai tuoi dizionari di Intlayer!

## Adattatori Compat Disponibili

Scegli la tua libreria esistente di seguito per vedere come eseguire la migrazione senza problemi:

- [Vue I18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/compat/vue-i18n.md)
- [React Intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/compat/react-intl.md)
- [Svelte I18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/compat/svelte-i18n.md)
- [React i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/compat/react-i18next.md)
- [NuxtJS I18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/compat/nuxtjs-i18n.md)
- [NGX Translate](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/compat/ngx-translate.md)
- [Next Intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/compat/next-intl.md)
- [Next i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/compat/next-i18next.md)
- [i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/compat/i18next.md)
- [Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/compat/lingui.md)
