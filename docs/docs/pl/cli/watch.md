---
createdAt: 2024-08-11
updatedAt: 2026-09-12
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
author: aymericzip
---

# Obserwuj słowniki

```bash packageManager="npm"
npx intlayer watch
```

```bash packageManager="yarn"
yarn intlayer watch
```

```bash packageManager="pnpm"
pnpm intlayer watch
```

```bash packageManager="bun"
bun x intlayer watch
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

- **`--ci`**: Uruchamia polecenie w każdym projekcie Intlayer w monorepo (lub tylko w bieżącym, gdy uruchomione z katalogu projektu). Dane uwierzytelniające dla poszczególnych projektów można wstrzyknąć przez `INTLAYER_PROJECT_CREDENTIALS` — obiekt JSON mapujący ścieżkę projektu na `{ "clientId", "clientSecret" }`.

  > Przykład: `npx intlayer watch --ci`
