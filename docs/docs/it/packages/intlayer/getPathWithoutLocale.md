---
docName: package__intlayer__getPathWithoutLocale
url: https://intlayer.org/doc/packages/intlayer/getPathWithoutLocale
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getPathWithoutLocale.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: Documentazione della funzione getPathWithoutLocale | intlayer
description: Scopri come utilizzare la funzione getPathWithoutLocale per il pacchetto intlayer
keywords:
  - getPathWithoutLocale
  - traduzione
  - Intlayer
  - intlayer
  - internazionalizzazione
  - documentazione
  - Next.js
  - JavaScript
  - React
---

# Documentazione: Funzioni `getPathWithoutLocale` in `intlayer`

## Descrizione

Rimuove il segmento della lingua dal URL o percorso fornito, se presente. Funziona sia con URL assoluti che con percorsi relativi.

## Parametri

- `inputUrl: string`

  - **Descrizione**: La stringa completa dell'URL o del percorso da elaborare.
  - **Tipo**: `string`

- `locales: Locales[]`
  - **Descrizione**: Array opzionale di lingue supportate. Di default utilizza le lingue configurate nel progetto.
  - **Tipo**: `Locales[]`

## Restituisce

- **Tipo**: `string`
- **Descrizione**: La stringa dell'URL o del percorso senza il segmento della lingua.

## Esempio di Utilizzo

```typescript codeFormat="typescript"
import { getPathWithoutLocale } from "intlayer";

console.log(getPathWithoutLocale("/dashboard")); // Output: "/dashboard"
console.log(getPathWithoutLocale("/it/dashboard")); // Output: "/dashboard"
console.log(getPathWithoutLocale("/fr/dashboard")); // Output: "/dashboard"
console.log(getPathWithoutLocale("https://example.com/it/dashboard")); // Output: "https://example.com/dashboard"
```

```javascript codeFormat="esm"
import { getPathWithoutLocale } from "intlayer";

console.log(getPathWithoutLocale("/dashboard")); // Output: "/dashboard"
console.log(getPathWithoutLocale("/it/dashboard")); // Output: "/dashboard"
console.log(getPathWithoutLocale("/fr/dashboard")); // Output: "/dashboard"
console.log(getPathWithoutLocale("https://example.com/it/dashboard")); // Output: "https://example.com/dashboard"
```

```javascript codeFormat="commonjs"
const { getPathWithoutLocale } = require("intlayer");

console.log(getPathWithoutLocale("/dashboard")); // Output: "/dashboard"
console.log(getPathWithoutLocale("/it/dashboard")); // Output: "/dashboard"
console.log(getPathWithoutLocale("/fr/dashboard")); // Output: "/dashboard"
console.log(getPathWithoutLocale("https://example.com/it/dashboard")); // Output: "https://example.com/dashboard"
```
