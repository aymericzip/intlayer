---
docName: package__intlayer__getPathWithoutLocale
url: https://intlayer.org/doc/packages/intlayer/getPathWithoutLocale
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/intlayer/getPathWithoutLocale.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Documentazione della funzione getPathWithoutLocale | intlayer
description: Scopri come utilizzare la funzione getPathWithoutLocale per il pacchetto intlayer
keywords:
  - getPathWithoutLocale
  - traduzione
  - Intlayer
  - intlayer
  - Internazionalizzazione
  - Documentazione
  - Next.js
  - JavaScript
  - React
---

# Documentazione: Funzioni `getPathWithoutLocale` in `intlayer`

## Descrizione

Rimuove il segmento della localizzazione dall'URL o pathname fornito, se presente. Funziona sia con URL assoluti che con pathname relativi.

## Parametri

- `inputUrl: string`

  - **Descrizione**: La stringa completa dell'URL o il pathname da elaborare.
  - **Tipo**: `string`

- `locales: Locales[]`
  - **Descrizione**: Array opzionale delle localizzazioni supportate. Di default sono usate le localizzazioni configurate nel progetto.
  - **Tipo**: `Locales[]`

## Valore di ritorno

- **Tipo**: `string`
- **Descrizione**: La stringa URL o pathname senza il segmento della localizzazione.

## Esempio di utilizzo

```typescript codeFormat="typescript"
import { getPathWithoutLocale } from "intlayer";

console.log(getPathWithoutLocale("/dashboard")); // Output: "/dashboard"
console.log(getPathWithoutLocale("/en/dashboard")); // Output: "/dashboard"
console.log(getPathWithoutLocale("/fr/dashboard")); // Output: "/dashboard"
console.log(getPathWithoutLocale("https://example.com/en/dashboard")); // Output: "https://example.com/dashboard"
```

```javascript codeFormat="esm"
import { getPathWithoutLocale } from "intlayer";

console.log(getPathWithoutLocale("/dashboard")); // Output: "/dashboard"
console.log(getPathWithoutLocale("/en/dashboard")); // Output: "/dashboard"
console.log(getPathWithoutLocale("/fr/dashboard")); // Output: "/dashboard"
console.log(getPathWithoutLocale("https://example.com/en/dashboard")); // Output: "https://example.com/dashboard"
```

```javascript codeFormat="commonjs"
const { getPathWithoutLocale } = require("intlayer");

console.log(getPathWithoutLocale("/dashboard")); // Output: "/dashboard"
console.log(getPathWithoutLocale("/en/dashboard")); // Output: "/dashboard"
console.log(getPathWithoutLocale("/fr/dashboard")); // Output: "/dashboard"
console.log(getPathWithoutLocale("https://example.com/en/dashboard")); // Output: "https://example.com/dashboard"
```

## Cronologia Documentazione

- 5.5.10 - 2025-06-29: Inizializzazione cronologia
