---
createdAt: 2026-09-23
updatedAt: 2026-09-23
title: CLI - Aktualizacja pakietów Intlayer
description: Dowiedz się, jak używać polecenia upgrade w Intlayer CLI, aby wyświetlić listę wszystkich pakietów Intlayer w projekcie lub monorepo i zaktualizować je do najnowszej wersji.
keywords:
  - CLI
  - Upgrade
  - Aktualizacja
  - Pakiety
  - Monorepo
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - upgrade
history:
  - version: 9.5.8
    date: 2026-09-23
    changes: "Dodaj polecenie upgrade"
author: aymericzip
---

# Aktualizacja pakietów Intlayer

```bash packageManager="npm"
npx intlayer upgrade
```

```bash packageManager="yarn"
yarn intlayer upgrade
```

```bash packageManager="pnpm"
pnpm intlayer upgrade
```

```bash packageManager="bun"
bun x intlayer upgrade
```

Polecenie `upgrade` wyświetla listę pakietów Intlayer zadeklarowanych w każdym pliku `package.json` Twojego projektu, w tym w obszarach roboczych monorepo, i aktualizuje je do najnowszej opublikowanej wersji. Wykonuje samodzielnie ten sam krok aktualizacji pakietów co `intlayer init`.

## Argumenty:

- `--project-root [projectRoot]` - Opcjonalne. Katalog główny projektu. Domyślnie polecenie rozpoczyna wyszukiwanie od najbliższego pliku `package.json` powyżej bieżącego katalogu roboczego.
- `--dry-run` - Opcjonalne. Wyświetla listę pakietów i ich wersji docelowych bez modyfikowania jakichkolwiek plików.
- `--tag <tag>` - Opcjonalne. npm dist-tag, do którego ma nastąpić aktualizacja (np. `canary`). Wartość domyślna to `latest`.

## Jak to działa:

1. **Wyświetla listę pakietów Intlayer** - Skanuje każdy plik `package.json` w projekcie (pomijając `node_modules` oraz katalogi wyjściowe kompilacji) w poszukiwaniu zależności i devDependencies `intlayer`, `@intlayer/*`, `*-intlayer` oraz `intlayer-*`.
2. **Pobiera wersję docelową** - Odczytuje wersję wybranego dist-tagu (domyślnie `latest`) dla każdego pakietu z rejestru npm.
3. **Przepisuje zakresy wersji** - Aktualizuje każdy przestarzały zakres bezpośrednio w pliku, zachowując jego operator (`^`, `~` lub brak) oraz wcięcia pliku.
4. **Instaluje jednorazowo** - Uruchamia pojedynczą instalację z poziomu katalogu głównego obszaru roboczego (najbliższy katalog z plikiem blokady), używając menedżera pakietów, do którego należy plik blokady:

| Plik blokady (Lock file)           | Polecenie      |
| ---------------------------------- | -------------- |
| `bun.lock` / `bun.lockb`           | `bun install`  |
| `pnpm-lock.yaml`                   | `pnpm install` |
| `yarn.lock`                        | `yarn install` |
| `package-lock.json` lub brak pliku | `npm install`  |

Jeśli nie ma pliku blokady, przed powrotem do npm używane jest pole `packageManager` z pliku `package.json` (na przykład `"bun@1.2.0"`).

Zakresy, które nie wskazują na rejestr, takie jak `workspace:*`, `file:`, `link:`, `catalog:` lub adresy URL git, nigdy nie są modyfikowane.

## Przykłady:

### Wyświetl dostępne aktualizacje bez ich stosowania:

```bash packageManager="npm"
npx intlayer upgrade --dry-run
```

```bash packageManager="yarn"
yarn intlayer upgrade --dry-run
```

```bash packageManager="pnpm"
pnpm intlayer upgrade --dry-run
```

```bash packageManager="bun"
bun x intlayer upgrade --dry-run
```

### Zaktualizuj do wersji canary:

```bash packageManager="npm"
npx intlayer upgrade --tag canary
```

```bash packageManager="yarn"
yarn intlayer upgrade --tag canary
```

```bash packageManager="pnpm"
pnpm intlayer upgrade --tag canary
```

```bash packageManager="bun"
bun x intlayer upgrade --tag canary
```

## Przykładowe dane wyjściowe:

```bash
npx intlayer upgrade
Intlayer packages:
  package.json
    intlayer ^9.0.0 → ^9.5.7
  apps/web/package.json
    next-intlayer ^9.5.7 (latest)
    vite-intlayer ~9.2.0 → ~9.5.7
Running bun install...
✓ Upgraded 2 Intlayer dependencies to latest
```

## Uwagi:

- Uruchom polecenie z poziomu katalogu głównego repozytorium, aby zaktualizować każdy obszar roboczy. Uruchom je z poziomu danego obszaru roboczego, aby zaktualizować tylko ten obszar roboczy.
- Pakiety, których wersji nie można pobrać (tryb offline, pakiet prywatny lub nieopublikowany), są wymieniane na liście i pozostawiane bez zmian.
- Jeśli instalacja się nie powiedzie, zaktualizowane zakresy zostaną zachowane w `package.json`. Uruchom polecenie instalacji menedżera pakietów ręcznie.
