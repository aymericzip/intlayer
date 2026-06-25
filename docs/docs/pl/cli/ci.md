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
    changes: "Dodaj polecenie CI"
author: aymericzip
---

# Polecenie CI

```bash packageManager="npm"
npx intlayer ci <command...>
```

```bash packageManager="yarn"
yarn intlayer ci <command...>
```

```bash packageManager="pnpm"
pnpm intlayer ci <command...>
```

```bash packageManager="bun"
bun x intlayer ci <command...>
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

```bash packageManager="npm"
npx intlayer ci fill --verbose --mode complete
```

```bash packageManager="yarn"
yarn intlayer ci fill --verbose --mode complete
```

```bash packageManager="pnpm"
pnpm intlayer ci fill --verbose --mode complete
```

```bash packageManager="bun"
bun x intlayer ci fill --verbose --mode complete
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

## Wygenerowane GitHub Actions

Gdy uruchomisz `intlayer init`, Intlayer wykrywa Twój package manager (npm, yarn, pnpm lub bun) i generuje dwa przepływy pracy GitHub Actions w `.github/workflows/`, z poleceniami odpowiadającymi tego package managera:

- **`intlayer-fill.yml`** — Na każde pull request, buduje słowniki i uruchamia `intlayer fill --git-diff --mode complete` aby wygenerować brakujące tłumaczenia dla zmienonych słowników, następnie zatwierdza wynik z powrotem do gałęzi PR.
- **`intlayer-test.yml`** — Na każde pull request, buduje słowniki i uruchamia `intlayer test`, nie powodując sprawdzenia, gdy brakuje wymaganych lokalizacji tłumaczenia.

Istniejące pliki przepływu pracy nigdy nie są zastępowane. Aby całkowicie pominąć scaffolding, uruchom:

```bash
npx intlayer init --no-github-actions
```

### Zapewnianie dostępu do AI w workflow fill

Scaffold `intlayer-fill.yml` wymaga dostępu do AI. Dostępne są dwie opcje (skonfigurowane w bloku `env` workflow):

1. **Twój własny klucz dostawcy AI** — Dodaj secret `AI_API_KEY` w ustawieniach repozytorium (Settings → Secrets and variables → Actions). Workflow przekazuje go poprzez `--provider`, `--model` i `--api-key`.
2. **Klucze dostępu do Intlayer CMS** — Dodaj secrety `INTLAYER_CLIENT_ID` i `INTLAYER_CLIENT_SECRET` i powiąż je z sekcją `editor` w `intlayer.config`. Klucze dostępu do CMS zapewniają dostęp do AI poprzez backend Intlayer.

Workflow `intlayer-test.yml` nie wymaga żadnego dostępu do AI.

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
