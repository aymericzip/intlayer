---
createdAt: 2026-01-06
updatedAt: 2026-01-06
title: Polecenie CI
description: Dowiedz się, jak używać polecenia Intlayer CI do uruchamiania poleceń Intlayer z automatycznie wstrzykiwanymi poświadczeniami w pipeline'ach CI/CD i monorepo.
keywords:
  - CI
  - CI/CD
  - Automatyzacja
  - Monorepo
  - Poświadczenia
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - ci
history:
  - version: 7.5.11
    date: 2026-01-06
    changes: Dodaj polecenie CI
---

# Polecenie CI

```bash
npx intlayer ci <command...>
```

Polecenie CI jest zaprojektowane do automatyzacji i pipeline'ów CI/CD. Automatycznie wstrzykuje poświadczenia ze zmiennej środowiskowej `INTLAYER_PROJECT_CREDENTIALS` i może uruchamiać polecenia Intlayer w wielu projektach w monorepo.

## Jak działa

Polecenie CI działa w dwóch trybach:

1. **Tryb pojedynczego projektu**: Jeśli bieżący katalog roboczy pasuje do jednej ze ścieżek projektu w `INTLAYER_PROJECT_CREDENTIALS`, uruchamia polecenie tylko dla tego konkretnego projektu.

2. **Tryb iteracji**: Jeśli nie wykryto określonego kontekstu projektu, iteruje po wszystkich skonfigurowanych projektach i uruchamia polecenie dla każdego z nich.

## Zmienna środowiskowa

Polecenie wymaga ustawienia zmiennej środowiskowej `INTLAYER_PROJECT_CREDENTIALS`. Ta zmienna powinna zawierać obiekt JSON mapujący ścieżki projektów na ich poświadczenia:

```json
{
  "packages/app": {
    "clientId": "your-client-id-1",
    "clientSecret": "your-client-secret-1"
  },
  "packages/admin": {
    "clientId": "your-client-id-2",
    "clientSecret": "your-client-secret-2"
  }
}
```

## Wykrywanie menedżera pakietów

Polecenie CI automatycznie wykrywa, który menedżer pakietów jest używany (npm, yarn, pnpm lub bun) na podstawie zmiennej środowiskowej `npm_config_user_agent` i używa odpowiedniego polecenia do wykonania Intlayer.

## Argumenty

- **`<command...>`**: Polecenie Intlayer do wykonania (np. `fill`, `push`, `build`). Możesz przekazać dowolne polecenie Intlayer i jego argumenty.

  > Przykład: `npx intlayer ci fill --verbose`
  >
  > Przykład: `npx intlayer ci push`
  >
  > Przykład: `npx intlayer ci build --watch`

## Przykłady

### Uruchomienie polecenia w trybie pojedynczego projektu

Jeśli jesteś w katalogu projektu, który pasuje do jednej ze ścieżek w `INTLAYER_PROJECT_CREDENTIALS`:

```bash
cd packages/app
npx intlayer ci fill
```

To uruchomi polecenie `fill` z poświadczeniami automatycznie wstrzykniętymi dla projektu `packages/app`.

### Uruchomienie polecenia we wszystkich projektach

Jeśli jesteś w katalogu, który nie pasuje do żadnej ścieżki projektu, polecenie będzie iterować po wszystkich skonfigurowanych projektach:

```bash
cd /path/to/monorepo
npx intlayer ci push
```

To uruchomi polecenie `push` dla każdego projektu skonfigurowanego w `INTLAYER_PROJECT_CREDENTIALS`.

### Przekazywanie dodatkowych flag

Możesz przekazać dowolne flagi do podstawowego polecenia Intlayer:

```bash
npx intlayer ci fill --verbose --mode complete
```

### Użycie w pipeline'ach CI/CD

W konfiguracji CI/CD (np. GitHub Actions, GitLab CI) ustaw `INTLAYER_PROJECT_CREDENTIALS` jako sekret:

```yaml
# Przykład GitHub Actions
env:
  INTLAYER_PROJECT_CREDENTIALS: ${{ secrets.INTLAYER_PROJECT_CREDENTIALS }}

steps:
  - name: Wypełnij słowniki
    run: npx intlayer ci fill
```

## Obsługa błędów

- Jeśli `INTLAYER_PROJECT_CREDENTIALS` nie jest ustawiona, polecenie zakończy się błędem.
- Jeśli `INTLAYER_PROJECT_CREDENTIALS` nie jest prawidłowym JSON, polecenie zakończy się błędem.
- Jeśli ścieżka projektu nie istnieje, zostanie pominięta z ostrzeżeniem.
- Jeśli jakikolwiek projekt się nie powiedzie, polecenie zakończy się niezerowym kodem statusu.

## Przypadki użycia

- **Automatyzacja monorepo**: Uruchamianie poleceń Intlayer w wielu projektach w monorepo
- **Pipeline'y CI/CD**: Automatyzacja zarządzania słownikami w przepływach pracy ciągłej integracji
- **Operacje masowe**: Wykonywanie tej samej operacji na wielu projektach Intlayer jednocześnie
- **Zarządzanie sekretami**: Bezpieczne zarządzanie poświadczeniami dla wielu projektów przy użyciu zmiennych środowiskowych

## Najlepsze praktyki bezpieczeństwa

- Przechowuj `INTLAYER_PROJECT_CREDENTIALS` jako zaszyfrowane sekrety w swojej platformie CI/CD
- Nigdy nie commituj poświadczeń do kontroli wersji
- Używaj poświadczeń specyficznych dla środowiska dla różnych środowisk wdrożeniowych
- Regularnie rotuj poświadczenia
