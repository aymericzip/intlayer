---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Documentazione della funzione getLocale | intlayer
description: Scopri come utilizzare la funzione getLocale del pacchetto intlayer
keywords:
  - getLocale
  - traduzione
  - Intlayer
  - intlayer
  - Internazionalizzazione
  - Documentazione
slugs:
  - doc
  - packages
  - intlayer
  - getLocale
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Init doc
---

# Documentazione della funzione getLocale

La funzione `getLocale` consente di rilevare la locale da una stringa fornita, come un URL o un percorso.

## Utilizzo

```ts
import { getLocale } from "intlayer";

const locale = getLocale("/fr/about");

// Output: 'fr'
```

## Parametri

| Parametro | Tipo     | Descrizione                                         |
| --------- | -------- | --------------------------------------------------- |
| `path`    | `string` | Il percorso o la stringa da cui estrarre la locale. |

## Restituisce

La locale rilevata, oppure la locale predefinita se non viene rilevata alcuna.
