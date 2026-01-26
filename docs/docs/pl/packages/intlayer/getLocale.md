---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Dokumentacja funkcji getLocale | intlayer
description: Zobacz, jak używać funkcji getLocale w pakiecie intlayer
keywords:
  - getLocale
  - tłumaczenie
  - Intlayer
  - intlayer
  - Internacjonalizacja
  - Dokumentacja
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

# Dokumentacja funkcji getLocale

Funkcja `getLocale` pozwala wykryć locale z podanego ciągu znaków, na przykład z URL-a lub ścieżki.

## Użycie

```ts
import { getLocale } from "intlayer";

const locale = getLocale("/fr/about");

// Output: 'fr'
```

## Parametry

| Parametr | Typ      | Opis                                                         |
| -------- | -------- | ------------------------------------------------------------ |
| `path`   | `string` | Ścieżka lub ciąg znaków, z którego należy wyodrębnić locale. |

## Zwraca

Wykryty locale lub domyślny locale, jeśli nie wykryto żadnego.
