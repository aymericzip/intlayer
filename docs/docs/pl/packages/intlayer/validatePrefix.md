---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Dokumentacja funkcji validatePrefix | intlayer
description: Dowiedz się, jak używać funkcji validatePrefix w pakiecie intlayer
keywords:
  - validatePrefix
  - tłumaczenie
  - Intlayer
  - intlayer
  - Internacjonalizacja
  - Dokumentacja
slugs:
  - doc
  - packages
  - intlayer
  - validatePrefix
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Init doc
---

# Dokumentacja funkcji validatePrefix

Funkcja `validatePrefix` sprawdza, czy podany prefiks jest prawidłowym prefiksem lokalizacji zgodnie z konfiguracją.

## Użycie

```ts
import { validatePrefix } from "intlayer";

const isValid = validatePrefix("/fr");

// Output: true
```

## Parametry

| Parametr | Typ      | Opis                  |
| -------- | -------- | --------------------- |
| `prefix` | `string` | Prefiks do walidacji. |

## Zwraca

`true` jeśli prefiks jest prawidłowy, `false` w przeciwnym razie.
