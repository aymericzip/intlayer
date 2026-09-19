---
createdAt: 2026-09-19
updatedAt: 2026-09-19
title: Documentazione dell'hook useDictionary | astro-intlayer
description: Scopri come utilizzare l'hook useDictionary nei componenti e negli script Astro per risolvere oggetti dizionario.
keywords:
  - useDictionary
  - dictionary
  - astro
  - astro-intlayer
  - Intlayer
  - intlayer
  - internazionalizzazione
  - documentazione
slugs:
  - doc
  - packages
  - astro-intlayer
  - useDictionary
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Doc iniziale"
author: aymericzip
---

# Documentazione dell'hook useDictionary

L'hook `useDictionary` risolve un oggetto dizionario importato o inline e restituisce il suo contenuto per il locale corrente nelle applicazioni Astro.

A differenza di `useIntlayer`, che recupera i dizionari tramite chiave dal registro globale dei dizionari, `useDictionary` lavora direttamente con un oggetto dizionario.

## Utilizzo

```astro fileName="src/pages/index.astro"
---
import { useDictionary } from "astro-intlayer";
import homeContent from "../content/home.content";

const content = useDictionary(homeContent);
---

<main>
  <h1>{content.title}</h1>
  <p>{content.description}</p>
</main>
```

Puoi anche passare dizionari inline definiti con `t()`:

```astro fileName="src/components/Footer.astro"
---
import { useDictionary } from "astro-intlayer";
import { t } from "intlayer";

const footer = useDictionary({
  key: "footer",
  content: {
    copyright: t({
      it: "Tutti i diritti riservati.",
      en: "All rights reserved.",
      fr: "Tous droits réservés.",
      es: "Todos los derechos reservados.",
    }),
  },
});
---

<footer>
  <p>{footer.copyright}</p>
</footer>
```

## Parametri

```ts
useDictionary(dictionary, localeOrSelector?)
```

1. **`dictionary`**: Un oggetto dizionario o un gruppo di dizionari qualificato.
2. **`localeOrSelector`** (opzionale): Un locale specifico o un oggetto selettore (`{ item }`, `{ variant }`, facoltativamente con `locale`).

## Descrizione

L'hook esegue i seguenti compiti:

1. **Rilevamento del locale**: Sul server, ottiene il locale da `Astro.locals.intlayer`. Nel browser, utilizza il locale dello store lato client.
2. **Elaborazione del contenuto**: Risolve traduzioni (`t()`), enumerazioni, condizioni e strutture nidificate in base al locale risolto.
3. **Selettori**: Applica qualsiasi selettore di elemento o variante fornito negli argomenti.

## Documentazione correlata

- [Integrazione `intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/astro-intlayer/intlayer.md)
- [Hook `useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/astro-intlayer/useIntlayer.md)
- [Hook `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/astro-intlayer/useLocale.md)
