---
createdAt: 2026-09-19
updatedAt: 2026-09-19
priority: 5
title: Documentazione del middleware onRequest | astro-intlayer
description: Scopri come utilizzare il middleware onRequest nelle applicazioni Astro per risolvere il locale della richiesta e popolare Astro.locals.intlayer.
keywords:
  - onRequest
  - middleware
  - astro
  - astro-intlayer
  - Astro.locals
  - internazionalizzazione
  - documentazione
slugs:
  - doc
  - packages
  - astro-intlayer
  - onRequest
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Doc iniziale"
author: aymericzip
---

# Documentazione del middleware Astro onRequest

Il middleware `onRequest` di `astro-intlayer/middleware` risolve il locale di ciascuna richiesta HTTP in arrivo e popola `Astro.locals.intlayer`.

Quando registri l'integrazione `intlayer()` in `astro.config.mjs`, questo middleware viene inserito automaticamente. È necessario importarlo direttamente solo se stai componendo manualmente il middleware Astro utilizzando `sequence(...)`.

## Utilizzo

```ts fileName="src/middleware.ts"
import { onRequest as intlayer } from "astro-intlayer/middleware";
import { sequence } from "astro:middleware";

export const onRequest = sequence(intlayer, async (context, next) => {
  // Accedi al locale risolto nel tuo middleware personalizzato
  const { locale } = context.locals.intlayer;
  console.log(`Gestione richiesta per il locale: ${locale}`);

  return next();
});
```

## Descrizione

Il middleware esegue le seguenti operazioni:

1. **Rilevamento del locale**:
   - **URL**: Analizza il prefisso del percorso URL o il parametro di ricerca `?locale=` (a meno che `routing.mode` non sia impostato su `no-prefix`).
   - **Cookie / Intestazioni**: Verifica i cookie di locale persistenti o i valori di intestazione personalizzati.
   - **Accept-Language**: Utilizza come fallback la negoziazione della lingua preferita del browser.
   - Per le pagine pre-renderizzate (`context.isPrerendered`), il locale viene estratto rigorosamente dall'URL per evitare avvisi di build di Astro.
2. **Popolamento del contesto**: Popola `Astro.locals.intlayer` con:
   - `locale`: Il locale risolto.
   - `defaultLocale`: Il locale di fallback predefinito.
   - `availableLocales`: L'array dei locale configurati.
3. **Ambito AsyncLocalStorage**: Avvolge l'elaborazione downstream della richiesta all'interno di un ambito `AsyncLocalStorage`, consentendo a `useIntlayer()`, `useDictionary()` e `useLocale()` di accedere allo stato della richiesta senza passare argomenti.

## Tipo `IntlayerLocals`

```ts
export type IntlayerLocals = {
  locale: DeclaredLocales;
  defaultLocale: DeclaredLocales;
  availableLocales: DeclaredLocales[];
};
```

## Documentazione correlata

- [Integrazione `intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/astro-intlayer/intlayer.md)
- [Hook `useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/astro-intlayer/useIntlayer.md)
- [Hook `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/astro-intlayer/useLocale.md)
