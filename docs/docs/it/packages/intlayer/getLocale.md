---
createdAt: 2026-01-21
updatedAt: 2026-09-27
priority: 5
title: Documentazione della funzione getLocale | intlayer
description: "Usa getLocale per rilevare la locale da una stringa come un URL o un percorso, con fallback sulla locale predefinita."
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
    changes: "Init doc"
author: aymericzip
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
