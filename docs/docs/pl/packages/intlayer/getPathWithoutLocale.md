---
createdAt: 2025-08-23
updatedAt: 2025-08-23
title: Dokumentacja funkcji getPathWithoutLocale | intlayer
description: Zobacz, jak używać funkcji getPathWithoutLocale w pakiecie intlayer
keywords:
  - getPathWithoutLocale
  - tłumaczenie
  - Intlayer
  - intlayer
  - Internacjonalizacja
  - Dokumentacja
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - intlayer
  - getPathWithoutLocale
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Inicjalizacja historii
---

# Dokumentacja: funkcje `getPathWithoutLocale` w `intlayer`

## Opis

Usuwa segment lokalizacji z podanego URL lub ścieżki, jeśli jest obecny. Działa zarówno z absolutnymi URL-ami, jak i względnymi ścieżkami.

## Parametry

- `inputUrl: string`
  - **Opis**: Pełny ciąg URL lub ścieżka do przetworzenia.
  - **Typ**: `string`

- `locales: Locales[]`
  - **Opis**: Opcjonalna tablica obsługiwanych lokalizacji. Domyślnie ustawiona na skonfigurowane lokalizacje w projekcie.
  - **Typ**: `Locales[]`

## Zwraca

- **Typ**: `string`
- **Opis**: Ciąg URL lub ścieżka bez segmentu lokalizacji.

## Przykład użycia

```typescript codeFormat="typescript"
import { getPathWithoutLocale } from "intlayer";

console.log(getPathWithoutLocale("/dashboard")); // Wynik: "/dashboard"
console.log(getPathWithoutLocale("/en/dashboard")); // Wynik: "/dashboard"
console.log(getPathWithoutLocale("/fr/dashboard")); // Wynik: "/dashboard"
console.log(getPathWithoutLocale("https://example.com/en/dashboard")); // Wynik: "https://example.com/dashboard"
```

```javascript codeFormat="esm"
import { getPathWithoutLocale } from "intlayer";

console.log(getPathWithoutLocale("/dashboard")); // Wynik: "/dashboard"
console.log(getPathWithoutLocale("/en/dashboard")); // Wynik: "/dashboard"
console.log(getPathWithoutLocale("/fr/dashboard")); // Wynik: "/dashboard"
console.log(getPathWithoutLocale("https://example.com/en/dashboard")); // Wynik: "https://example.com/dashboard"
```

```javascript codeFormat="commonjs"
const { getPathWithoutLocale } = require("intlayer");

console.log(getPathWithoutLocale("/dashboard")); // Wynik: "/dashboard"
console.log(getPathWithoutLocale("/en/dashboard")); // Wynik: "/dashboard"
console.log(getPathWithoutLocale("/fr/dashboard")); // Wynik: "/dashboard"
console.log(getPathWithoutLocale("https://example.com/en/dashboard")); // Wynik: "https://example.com/dashboard"
```
