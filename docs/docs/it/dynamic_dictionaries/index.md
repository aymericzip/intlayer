---
createdAt: 2026-06-12
updatedAt: 2026-06-12
title: Dizionari Dinamici
description: Panoramica delle tre funzionalità di dizionario dinamico di Intlayer — collezioni, varianti e record dinamici — per la creazione di contenuti i18n flessibili e guidati dal runtime.
keywords:
  - Dizionari Dinamici
  - Collezioni
  - Varianti
  - Record Dinamici
  - Intlayer
  - Internazionalizzazione
slugs:
  - doc
  - concept
  - dynamic-dictionaries
history:
  - version: 8.13.0
    date: 2026-06-12
    changes: "Rilascio della funzionalità dei dizionari dinamici"
author: aymericzip
---

# Dizionari Dinamici

Intlayer supporta tre meccanismi per esprimere contenuti che vanno oltre un singolo dizionario statico per chiave. Ognuno viene dichiarato tramite un **campo di metadati di livello superiore** nel file di contenuto; non è necessaria alcuna funzione wrapper.

| Funzionalità                                                                                                             | Campo metadati    | Selettore in `useIntlayer` |
| ------------------------------------------------------------------------------------------------------------------------ | ----------------- | -------------------------- |
| [Collezioni](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dynamic_dictionaries/collections.md)          | `item: N`         | `{ item: N }`              |
| [Varianti](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dynamic_dictionaries/variants.md)               | `variant: "name"` | `{ variant: "name" }`      |
| [Record Dinamici](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dynamic_dictionaries/dynamic_content.md) | `meta: { id, … }` | `{ id, … }`                |

Tutti e tre si compongono con l'argomento della locale e supportano il caricamento selettivo o lazy tramite `importMode`.

## Quando usare quale

- **Collezioni** — elenco ordinato di elementi gestiti in file separati (domande frequenti, post di blog, prodotti).
- **Variantes** — alternative di contenuto denominate per test A/B, banner stagionali o feature flag.
- **Record dinamici** — contenuto recuperato a runtime tramite un ID opaco (record del CMS, testi specifici dell'utente).

## Risoluzione dei conflitti del selettore

Quando sono presenti più selettori in un dizionario, l'ordine di risoluzione è:

```
variant → meta → item
```
