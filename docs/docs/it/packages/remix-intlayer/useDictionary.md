---
createdAt: 2026-09-19
updatedAt: 2026-09-19
priority: 5
title: Documentazione dell'hook useDictionary | remix-intlayer
description: Scopri come utilizzare l'hook useDictionary nelle applicazioni Remix 3 per risolvere oggetti dizionario per la locale della richiesta corrente.
keywords:
  - useDictionary
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
  - useDictionary
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Init doc"
author: aymericzip
---

# Documentazione dell'hook useDictionary

L'hook `useDictionary` trasforma un oggetto dizionario importato o inline e restituisce il suo contenuto risolto per la locale della richiesta corrente nelle applicazioni Remix 3.

A differenza di `useIntlayer`, che risolve i dizionari tramite la relativa chiave stringa dal registro globale dei dizionari, `useDictionary` accetta direttamente un oggetto dizionario.

## Utilizzo

```ts fileName="src/views/home.ts"
import { useDictionary } from "remix-intlayer";
import homeContent from "./home.content";

export const HomeView = () => {
  const content = useDictionary(homeContent);

  return `
    <div>
      <h1>${content.title}</h1>
      <p>${content.subtitle}</p>
    </div>
  `;
};
```

Puoi anche passare dizionari inline definiti con `t()`:

```ts
import { useDictionary } from "remix-intlayer";
import { t } from "intlayer";

export const FooterView = () => {
  const content = useDictionary({
    key: "footer",
    content: {
      copyright: t({
        it: "Tutti i diritti riservati.",
        en: "All rights reserved.",
        fr: "Tous droits réservés.",
      }),
    },
  });

  return `<footer>${content.copyright}</footer>`;
};
```

## Parametri

```ts
useDictionary(dictionary, localeOrSelector?)
```

1. **`dictionary`**: Un oggetto dizionario o gruppo di dizionari qualificato.
2. **`localeOrSelector`** (opzionale): Una locale specifica o un oggetto selettore (`{ item }`, `{ variant }`, opzionalmente con `locale`).

## Descrizione

L'hook esegue le seguenti attività:

1. **Rilevamento della locale**: Legge la locale attiva della richiesta dall'archivio `AsyncLocalStorage` creato dal middleware `intlayer()`.
2. **Risoluzione dei contenuti**: Valuta traduzioni (`t()`), enumerazioni, condizioni e strutture nidificate in base alla locale risolta.
3. **Elaborazione dei selettori**: Applica qualsiasi selettore di elemento o variante fornito negli argomenti.

## Documentazione correlata

- [Middleware `intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/remix-intlayer/intlayerMiddleware.md)
- [Hook `useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/remix-intlayer/useIntlayer.md)
- [Hook `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/remix-intlayer/useLocale.md)
