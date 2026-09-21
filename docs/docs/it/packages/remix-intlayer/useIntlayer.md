---
createdAt: 2026-09-19
updatedAt: 2026-09-19
title: Documentazione dell'hook useIntlayer | remix-intlayer
description: Scopri come utilizzare l'hook useIntlayer nelle applicazioni Remix 3 per accedere ai contenuti localizzati tramite chiave.
keywords:
  - useIntlayer
  - dizionario
  - remix
  - remix-3
  - Intlayer
  - intlayer
  - Internazionalizzazione
  - Documentazione
slugs:
  - doc
  - packages
  - remix-intlayer
  - useIntlayer
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Init doc"
author: aymericzip
---

# Documentazione dell'hook useIntlayer

L'hook `useIntlayer` ti consente di recuperare contenuti localizzati da un dizionario Intlayer tramite chiave nelle applicazioni Remix 3.

Legge automaticamente la locale attiva dal contesto della richiesta corrente (tramite `AsyncLocalStorage`), eliminando la necessità di passare manualmente la locale attraverso gestori di route, template di viste o componenti.

## Utilizzo

### Nei gestori di route

```ts fileName="src/server.ts"
import { createRouter } from "remix/router";
import { intlayer, useIntlayer } from "remix-intlayer";

const router = createRouter({
  middleware: [intlayer()],
});

router.get("/api/welcome", () => {
  const content = useIntlayer("home");

  return Response.json({
    title: content.title,
    subtitle: content.subtitle,
  });
});
```

### Nei template di vista / componenti

```tsx fileName="src/views/home.ts"
import { useIntlayer } from "remix-intlayer";

export const HomeView = () => {
  const content = useIntlayer("home");

  return `
    <main>
      <h1>${content.title}</h1>
      <p>${content.subtitle}</p>
    </main>
  `;
};
```

## Parametri

```ts
useIntlayer(key, localeOrSelector?)
```

1. **`key`**: La chiave univoca del dizionario (definita nei file di dichiarazione `.content.ts`).
2. **`localeOrSelector`** (opzionale): Una locale specifica o un oggetto selettore (`{ item }`, `{ variant }`, opzionalmente con `locale`). Se specificato, sovrascrive la locale rilevata dal contesto della richiesta.

## Descrizione

L'hook esegue le seguenti attività:

1. **Rilevamento della locale del contesto**: Rileva la locale corrente dall'ambito `AsyncLocalStorage` associato alla richiesta stabilito dal middleware `intlayer()`.
2. **Recupero del dizionario**: Recupera il dizionario precompilato corrispondente alla chiave fornita.
3. **Elaborazione della traduzione**: Risolve traduzioni, enumerazioni, markdown e contenuti condizionali per la locale rilevata.
4. **Gestione del fallback**: Se chiamato al di fuori di un contesto di richiesta HTTP attivo, ricade automaticamente sulla `defaultLocale` configurata.

## Documentazione correlata

- [Middleware `intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/remix-intlayer/intlayerMiddleware.md)
- [Hook `useDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/remix-intlayer/useDictionary.md)
- [Hook `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/remix-intlayer/useLocale.md)
