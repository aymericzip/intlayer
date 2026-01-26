---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Documentazione della funzione validatePrefix | intlayer
description: Scopri come utilizzare la funzione validatePrefix per il pacchetto intlayer
keywords:
  - validatePrefix
  - traduzione
  - Intlayer
  - intlayer
  - Internazionalizzazione
  - Documentazione
slugs:
  - doc
  - packages
  - intlayer
  - validatePrefix
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Documentazione iniziale
---

# Documentazione della funzione validatePrefix

La funzione `validatePrefix` verifica se un prefisso fornito è un prefisso di localizzazione valido secondo la configurazione.

## Utilizzo

```ts
import { validatePrefix } from "intlayer";

const isValid = validatePrefix("/fr");

// Output: true
```

## Parametri

| Parametro | Tipo     | Descrizione              |
| --------- | -------- | ------------------------ |
| `prefix`  | `string` | Il prefisso da validare. |

## Restituisce

`true` se il prefisso è valido, `false` altrimenti.
