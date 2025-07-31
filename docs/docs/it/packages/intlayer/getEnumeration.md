---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Documentazione della funzione getEnumeration | intlayer
description: Scopri come utilizzare la funzione getEnumeration per il pacchetto intlayer
keywords:
  - getEnumeration
  - traduzione
  - Intlayer
  - intlayer
  - Internazionalizzazione
  - Documentazione
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - intlayer
  - getEnumeration
---

# Documentazione: Funzione `getEnumeration` in `intlayer`

## Descrizione

La funzione `getEnumeration` recupera il contenuto corrispondente a una quantità specifica basata su condizioni predefinite in un oggetto di enumerazione. Le condizioni sono definite come chiavi e la loro priorità è determinata dall'ordine nell'oggetto.

## Parametri

- `enumerationContent: QuantityContent<Content>`

  - **Descrizione**: Un oggetto in cui le chiavi rappresentano condizioni (es. `<=`, `<`, `>=`, `=`) e i valori rappresentano il contenuto corrispondente. L'ordine delle chiavi definisce la priorità di corrispondenza.
  - **Tipo**: `QuantityContent<Content>`
    - `Content` può essere di qualsiasi tipo.

- `quantity: number`

  - **Descrizione**: Il valore numerico usato per confrontarsi con le condizioni in `enumerationContent`.
  - **Tipo**: `number`

## Ritorna

- **Tipo**: `Content`
- **Descrizione**: Il contenuto corrispondente alla prima condizione corrispondente in `enumerationContent`. Se non viene trovata alcuna corrispondenza, il comportamento predefinito dipende dall'implementazione (ad esempio, errore o contenuto di fallback).

## Esempio di utilizzo

### Utilizzo base

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

### Priorità delle condizioni

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

## Casi limite

- **Nessuna condizione corrispondente:**

  - Se nessuna condizione corrisponde alla quantità fornita, la funzione restituirà `undefined` oppure gestirà esplicitamente lo scenario predefinito/di fallback.

- **Condizioni ambigue:**

  - Se le condizioni si sovrappongono, la prima condizione corrispondente (in base all'ordine dell'oggetto) ha la precedenza.

- **Chiavi non valide:**

  - La funzione presume che tutte le chiavi in `enumerationContent` siano valide e analizzabili come condizioni. Chiavi non valide o formattate in modo errato possono portare a comportamenti imprevisti.

- **Applicazione di TypeScript:**
  - La funzione garantisce che il tipo `Content` sia coerente tra tutte le chiavi, permettendo la sicurezza del tipo nel contenuto recuperato.

## Note

- L'utility `findMatchingCondition` viene utilizzata per determinare la condizione appropriata in base alla quantità fornita.

## Cronologia del Documento

- 5.5.10 - 2025-06-29: Storia iniziale
