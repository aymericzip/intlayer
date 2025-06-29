---
docName: package__intlayer__getEnumeration
url: https://intlayer.org/doc/packages/intlayer/getEnumeration
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getEnumeration.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Documentazione della funzione getEnumeration | intlayer
description: Scopri come utilizzare la funzione getEnumeration per il pacchetto intlayer
keywords:
  - getEnumeration
  - traduzione
  - Intlayer
  - intlayer
  - internazionalizzazione
  - documentazione
  - Next.js
  - JavaScript
  - React
---

# Documentazione: Funzione `getEnumeration` in `intlayer`

## Descrizione

La funzione `getEnumeration` recupera il contenuto corrispondente a una quantità specifica basandosi su condizioni predefinite in un oggetto enumerazione. Le condizioni sono definite come chiavi, e la loro priorità è determinata dall'ordine nell'oggetto.

## Parametri

- `enumerationContent: QuantityContent<Content>`

  - **Descrizione**: Un oggetto in cui le chiavi rappresentano condizioni (ad esempio, `<=`, `<`, `>=`, `=`) e i valori rappresentano il contenuto corrispondente. L'ordine delle chiavi definisce la priorità di corrispondenza.
  - **Tipo**: `QuantityContent<Content>`
    - `Content` può essere di qualsiasi tipo.

- `quantity: number`

  - **Descrizione**: Il valore numerico utilizzato per confrontarsi con le condizioni in `enumerationContent`.
  - **Tipo**: `number`

## Restituisce

- **Tipo**: `Content`
- **Descrizione**: Il contenuto corrispondente alla prima condizione che corrisponde in `enumerationContent`. Se non viene trovata alcuna corrispondenza, si prevede un comportamento predefinito basato sull'implementazione (ad esempio, errore o contenuto di fallback).

## Esempio di Utilizzo

### Utilizzo Base

```typescript codeFormat="typescript"
import { getEnumeration } from "intlayer";

const content = getEnumeration(
  {
    "<=-2.3": "Hai meno di -2.3",
    "<1": "Hai meno di uno",
    "2": "Hai due",
    ">=3": "Hai tre o più",
  },
  2
);

console.log(content); // Output: "Hai due"
```

```javascript codeFormat="esm"
import { getEnumeration } from "intlayer";

const content = getEnumeration(
  {
    "<1": "Hai meno di uno",
    "2": "Hai due",
    ">=3": "Hai tre o più",
  },
  2
);

console.log(content); // Output: "Hai due"
```

```javascript codeFormat="commonjs"
const { getEnumeration } = require("intlayer");

const content = getEnumeration(
  {
    "<1": "Hai meno di uno",
    "2": "Hai due",
    ">=3": "Hai tre o più",
  },
  2
);

console.log(content); // Output: "Hai due"
```

### Priorità delle Condizioni

```typescript codeFormat="typescript"
import { getEnumeration } from "intlayer";

const content = getEnumeration(
  {
    "<4": "Hai meno di quattro",
    "2": "Hai due",
  },
  2
);

console.log(content); // Output: "Hai meno di quattro"
```

```javascript codeFormat="esm"
import { getEnumeration } from "intlayer";

const content = getEnumeration(
  {
    "<4": "Hai meno di quattro",
    "2": "Hai due",
  },
  2
);

console.log(content); // Output: "Hai meno di quattro"
```

```javascript codeFormat="commonjs"
const { getEnumeration } = require("intlayer");

const content = getEnumeration(
  {
    "<4": "Hai meno di quattro",
    "2": "Hai due",
  },
  2
);

console.log(content); // Output: "Hai meno di quattro"
```

## Casi Limite

- **Nessuna Condizione Corrispondente:**

  - Se nessuna condizione corrisponde alla quantità fornita, la funzione restituirà `undefined` o gestirà esplicitamente lo scenario predefinito/fallback.

- **Condizioni Ambigue:**

  - Se le condizioni si sovrappongono, la prima condizione corrispondente (basata sull'ordine dell'oggetto) ha la precedenza.

- **Chiavi Non Valide:**

  - La funzione presume che tutte le chiavi in `enumerationContent` siano valide e analizzabili come condizioni. Chiavi non valide o formattate in modo errato possono portare a comportamenti inaspettati.

- **Enforcement di TypeScript:**
  - La funzione garantisce che il tipo `Content` sia coerente su tutte le chiavi, permettendo la sicurezza del tipo nel contenuto recuperato.

## Note

- L'utilità `findMatchingCondition` è utilizzata per determinare la condizione appropriata basandosi sulla quantità fornita.
