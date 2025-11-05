---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Czy mogę przetłumaczyć ścieżkę URL?
description: Dowiedz się, jak przetłumaczyć ścieżkę URL.
keywords:
  - tablica
  - zawartość
  - deklaracja
  - intlayer
  - middleware
  - proxy
  - przepisywanie
  - prefiks
  - lokalizacja
  - url
slugs:
  - frequent-questions
  - translated-path-url
---

# Czy możliwe jest przetłumaczenie URL w następujący sposób:

```bash
en -> /product (bez prefiksu) lub /en/product (z prefiksem)
fr -> /fr/produit
es -> /es/producto
```

Niestety Intlayer nie pozwala na tłumaczenie URLi w podany sposób. Aby to osiągnąć, powinieneś użyć własnego middleware lub proxy do przepisywania URLi.

Możesz jednak użyć funkcji `getMultilingualUrl`, aby wstawić prefiks w URL dla danej lokalizacji.

```ts
import { getMultilingualUrl, Locales } from "intlayer";

const url = getMultilingualUrl("/product");

/**
 * en -> /product (bez prefiksu) lub /en/product (z prefiksem)
 * fr -> /fr/product
 * es -> /es/product
 */
console.log(url);
```

Lub `getLocalizedUrl`

```ts
import { getLocalizedUrl, Locales } from "intlayer";

const url = getLocalizedUrl("/product", Locales.FRENCH);

console.log(url); // /fr/product
```
