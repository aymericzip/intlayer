---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Obserwuj słowniki
description: Dowiedz się, jak obserwować zmiany w plikach deklaracji treści i automatycznie budować słowniki.
keywords:
  - Obserwuj
  - Słowniki
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - watch
---

# Obserwuj słowniki

```bash
npx intlayer watch
```

Ta komenda będzie obserwować zmiany w Twoich plikach deklaracji treści i budować słowniki w katalogu `.intlayer`.
Ta komenda jest równoważna z `npx intlayer build --watch --skip-prepare`.

## Alias:

- `npx intlayer dictionaries watch`
- `npx intlayer dictionary watch`
- `npx intlayer dic watch`

## Argumenty:

- **`--with`**: Uruchom komendę równolegle z obserwacją.

  > Przykład: `npx intlayer watch --with "next dev --turbopack"`

  > Przykład: `npx intlayer watch --with "next dev --turbopack"`
