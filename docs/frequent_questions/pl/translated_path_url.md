---
createdAt: 2025-05-20
updatedAt: 2026-01-22
title: Czy mogę przetłumaczyć ścieżkę URL?
description: Dowiedz się, jak przetłumaczyć ścieżkę URL.
keywords:
  - tablica
  - treść
  - deklaracja
  - intlayer
  - middleware
  - proxy
  - przekierowanie
  - prefiks
  - lokalizacja
  - url
slugs:
  - frequent-questions
  - translated-path-url
---

# Czy można tłumaczyć adresy URL?

Tak! Intlayer obsługuje niestandardowe przekierowania URL, które pozwalają definiować ścieżki specyficzne dla lokalizacji. Na przykład:

```bash
en -> /product
fr -> /fr/produit
es -> /es/producto
```

Aby to zaimplementować, możesz skonfigurować sekcję `routing` w pliku `intlayer.config.ts`.

Więcej informacji na temat implementacji tej funkcji znajdziesz w [dokumentacji Niestandardowych Przekierowań URL](/docs/concept/custom_url_rewrites).

Możesz również użyć funkcji `getMultilingualUrl` i `getLocalizedUrl`, aby generować te adresy URL programowo, a będą one respektować Twoje reguły przekierowań.

```ts
import { getLocalizedUrl, Locales } from "intlayer";

const url = getLocalizedUrl("/product", Locales.FRENCH);

console.log(url); // /fr/produit (jeśli skonfigurowano)
```
