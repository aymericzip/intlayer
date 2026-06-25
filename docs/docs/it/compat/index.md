---
createdAt: 2026-06-13
updatedAt: 2026-06-13
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

- [Vue I18n](./vue-i18n.md)
- [Transloco](./transloco.md)
- [React Intl](./react-intl.md)
- [Svelte I18n](./svelte-i18n.md)
- [React i18next](./react-i18next.md)
- [Polyglot.js](./polyglot.md)
- [NuxtJS I18n](./nuxtjs-i18n.md)
- [NGX Translate](./ngx-translate.md)
- [Next Translate](./next-translate.md)
- [Next Intl](./next-intl.md)
- [Next i18next](./next-i18next.md)
- [i18next](./i18next.md)
- [Lingui](./lingui.md)
- [I18n-js](./i18n-js.md)
