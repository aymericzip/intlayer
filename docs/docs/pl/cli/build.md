---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Budowanie słowników
description: Dowiedz się, jak budować swoje słowniki Intlayer z plików deklaracji treści.
keywords:
  - Budowanie
  - Słowniki
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - build
history:
  - version: 8.1.5
    date: 2026-02-23
    changes: "Dodaj opcję checkTypes"
---

# Budowanie słowników

Aby zbudować swoje słowniki, możesz uruchomić polecenia:

```bash packageManager="npm"
npx intlayer build
```

```bash packageManager="yarn"
yarn intlayer build
```

```bash packageManager="pnpm"
pnpm intlayer build
```

```bash packageManager="bun"
bun x intlayer build
```

lub w trybie obserwacji

```bash packageManager="npm"
npx intlayer build --watch
```

```bash packageManager="yarn"
yarn intlayer build --watch
```

```bash packageManager="pnpm"
pnpm intlayer build --watch
```

```bash packageManager="bun"
bun x intlayer build --watch
```

To polecenie domyślnie znajdzie Twoje pliki deklaracji treści w ścieżce `./src/**/*.content.{ts|js|mjs|cjs|json|tsx|jsx}` i zbuduje słowniki w katalogu `.intlayer`.

## Alias-y:

- `npx intlayer dictionaries build`
- `npx intlayer dictionary build`
- `npx intlayer dic build`

## Argumenty:

- **`--base-dir`**: Określ katalog bazowy dla projektu. Aby pobrać konfigurację intlayer, polecenie będzie szukać pliku `intlayer.config.{ts,js,json,cjs,mjs}` w katalogu bazowym.

  > Przykład: `npx intlayer build --base-dir ./src`

- **`--env`**: Określ środowisko (np. `development`, `production`). Przydatne, gdy używasz zmiennych środowiskowych w pliku konfiguracyjnym intlayer.

  > Przykład: `npx intlayer build --env production`

- **`--env-file`**: Podaj niestandardowy plik środowiskowy do załadowania zmiennych. Przydatne, gdy używasz zmiennych środowiskowych w pliku konfiguracyjnym intlayer.

  > Przykład: `npx intlayer build --env-file .env.production.local`

- **`--with`**: Uruchom polecenie równolegle z budowaniem.

  > Przykład: `npx intlayer build --with "next dev --turbopack"`

- **`--skip-prepare`**: Pomiń krok przygotowania.

  > Przykład: `npx intlayer build --skip-prepare`

- **`--no-cache`**: Wyłącz pamięć podręczną.

  > Przykład: `npx intlayer build --no-cache`

- **`--check-types`**: Sprawdza typy plików deklaracji treści.

  > Przykład: `npx intlayer build --check-types`
