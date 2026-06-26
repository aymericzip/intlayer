---
createdAt: 2026-06-12
updatedAt: 2026-06-26
title: Dizionari dinamici
description: Panoramica delle funzionalità dei dizionari dinamici di Intlayer — collezioni e varianti — per creare contenuti i18n flessibili e guidati a runtime.
keywords:
  - Dizionari dinamici
  - Collezioni
  - Varianti
  - Intlayer
  - Internazionalizzazione
slugs:
  - doc
  - concept
  - dynamic-dictionaries
history:
  - version: 9.0.0
    date: 2026-06-12
    changes: "Rilascio della funzionalità dei dizionari dinamici"
  - version: 9.1.0
    date: 2026-06-26
    changes: "Unione dei record dinamici nelle varianti — `variant` ora accetta una stringa o un oggetto"
author: aymericzip
---

# Dizionari dinamici

Intlayer supporta due meccanismi per esprimere contenuti che vanno oltre un singolo dizionario statico per chiave. Ciascuno è dichiarato tramite un **campo di metadati di primo livello** nel file di contenuto; non è necessaria alcuna funzione wrapper.

| Funzionalità                                                                                                    | Campo di metadati                      | Selettore in `useIntlayer`                     |
| --------------------------------------------------------------------------------------------------------------- | -------------------------------------- | ---------------------------------------------- |
| [Collezioni](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dynamic_dictionaries/collections.md) | `item: N`                              | `{ item: N }`                                  |
| [Varianti](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dynamic_dictionaries/variants.md)      | `variant: "name"` _o_ `variant: { … }` | `{ variant: "name" }` _o_ `{ variant: { … } }` |

Entrambi si combinano con l'argomento locale e supportano il caricamento selettivo / differito tramite `importMode`.

## Quando usare cosa

- **Collezioni** — elenco ordinato di elementi gestiti in file separati (voci di FAQ, articoli di blog, prodotti).
- **Varianti** — alternative di contenuto con nome o strutturate:
  - una variante **stringa** per test A/B, banner stagionali o feature flag;
  - una variante **oggetto** per record di CMS, contenuti specifici per utente o qualsiasi contenuto indirizzato da un insieme di campi (i precedenti «record dinamici»).

> Le versioni precedenti esponevano un campo `meta` separato per i contenuti indicizzati per record. È stato unito in `variant`: passa un **oggetto** a `variant` invece di usare `meta`.

## Disambiguazione del selettore

Una chiave può dichiarare entrambe le dimensioni contemporaneamente (ad es. una collezione i cui elementi hanno ciascuno una variante). Vengono risolte nell'ordine:

```
variant → item
```

Quindi `{ variant: "promo" }` su una chiave variante × item restituisce tutti gli elementi promo come array, e aggiungere `{ item: 2 }` lo restringe a una singola voce.
