---
createdAt: 2025-12-30
updatedAt: 2026-01-06
title: Lista projektów Intlayer
description: Dowiedz się, jak wypisać wszystkie projekty Intlayer w katalogu lub repozytorium git.
keywords:
  - Lista
  - Projekty
  - CLI
  - Intlayer
  - Git
slugs:
  - doc
  - concept
  - cli
  - list-projects
history:
  - version: 7.5.12
    date: 2026-01-06
    changes: Dodaj opcję wyjścia bezwzględnego do polecenia list projects
---

# Lista projektów Intlayer

```bash
npx intlayer projects list
```

To polecenie przeszukuje i wypisuje wszystkie projekty Intlayer, znajdując katalogi zawierające pliki konfiguracyjne Intlayer. Przydaje się do odnalezienia wszystkich projektów Intlayer w monorepo, workspace lub repozytorium git.

## Aliasy:

- `npx intlayer projects-list`
- `npx intlayer pl`

## Argumenty:

- **`--base-dir [path]`**: Określ katalog bazowy, od którego ma się rozpocząć wyszukiwanie. Domyślnie używany jest bieżący katalog roboczy.

  > Przykład: `npx intlayer projects list --base-dir /path/to/workspace`

  > Przykład: `npx intlayer projects list --base-dir /path/to/workspace`

- **`--git-root`**: Wyszukaj od katalogu głównego gita zamiast od katalogu bazowego. Przydaje się do odnalezienia wszystkich projektów Intlayer w monorepo lub repozytorium git.

  > Przykład: `npx intlayer projects list --git-root`

- **`--json`**: Wyświetla wyniki jako JSON zamiast sformatowanego tekstu. Przydatne do skryptów i dostępu programowego.

  > Przykład: `npx intlayer projects list --json`

- **`--absolute`**: Wyświetla wyniki jako ścieżki bezwzględne zamiast ścieżek względnych.

  > Przykład: `npx intlayer projects list --absolute`

## Jak to działa:

Polecenie przeszukuje pliki konfiguracyjne Intlayer w określonym katalogu (lub w katalogu głównym gita, jeśli użyto `--git-root`). Wyszukuje następujące wzorce plików konfiguracyjnych:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

Każdy katalog zawierający jeden z tych plików jest uznawany za projekt Intlayer i zostanie wypisany w wynikach.

## Przykłady:

### Wypisz projekty w bieżącym katalogu:

```bash
npx intlayer projects list
```

### Lista projektów w określonym katalogu:

```bash
npx intlayer projects list --base-dir ./packages
```

### Wyświetl wszystkie projekty w repozytorium git:

```bash
npx intlayer projects list --git-root
```

### Użycie aliasu skrótu:

```bash
npx intlayer pl --git-root
```

### Wyjście jako JSON:

```bash
npx intlayer projects list --json
```

## Przykładowe wyjście:

### Sformatowane wyjście:

```bash
$ npx intlayer projects list --git-root

Found 3 Intlayer project(s):

  - /Users/user/workspace/packages/app
  - /Users/user/workspace/packages/admin
  - /Users/user/workspace/packages/shared
```

### Wyjście JSON:

```bash
$ npx intlayer projects list --json

["/Users/user/workspace/packages/app","/Users/user/workspace/packages/admin","/Users/user/workspace/packages/shared"]
```

## Zastosowania:

- **Zarządzanie monorepo**: Odkryj wszystkie projekty Intlayer w strukturze monorepo
- **Wykrywanie projektów**: Znajdź wszystkie projekty korzystające z Intlayer w workspace
- **CI/CD**: Weryfikacja projektów Intlayer w zautomatyzowanych workflowach
- **Dokumentacja**: Generuj dokumentację zawierającą listę wszystkich projektów używających Intlayer

Wyjście zawiera absolutne ścieżki do każdego katalogu projektu, co ułatwia nawigację lub tworzenie skryptów operujących na wielu projektach Intlayer.
