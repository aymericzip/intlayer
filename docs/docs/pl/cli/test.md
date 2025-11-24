---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Testowanie brakujących tłumaczeń
description: Dowiedz się, jak testować i identyfikować brakujące tłumaczenia w swoich słownikach.
keywords:
  - Test
  - Brakujące tłumaczenia
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - test
---

# Testowanie brakujących tłumaczeń

```bash
npx intlayer content test
```

## Alias:

- `npx intlayer test`

To polecenie analizuje pliki deklaracji zawartości, aby zidentyfikować brakujące tłumaczenia we wszystkich skonfigurowanych lokalizacjach. Dostarcza kompleksowy raport pokazujący, które klucze tłumaczeń są brakujące dla których lokalizacji, pomagając utrzymać spójność w wielojęzycznej zawartości.

## Przykładowy wynik:

```bash
pnpm intlayer content test
Missing translations:
 - home-page                      - tr         - src/components/HomePage/homePage.content.ts
 - server-component               - es, tr     - src/components/ServerComponent/serverComponent.content.ts
 - client-component               - pl, tr     - src/components/ClientComponent/clientComponent.content.ts
Lokalizacje: en, ru, ja, fr, ko, zh, es, de, ar, it, en-GB, pt, hi, tr, pl
Wymagane lokalizacje: en
Brakujące lokalizacje: pl, tr, es
Brakujące wymagane lokalizacje: -
Łączna liczba brakujących lokalizacji: 3
Łączna liczba brakujących wymaganych lokalizacji: 0
```

## Argumenty:

**Opcje konfiguracji:**

- **`--env`**: Określ środowisko (np. `development`, `production`).
- **`--env-file [envFile]`**: Podaj niestandardowy plik środowiskowy do załadowania zmiennych.
- **`--base-dir`**: Określ katalog bazowy dla projektu.

> Przykład: `npx intlayer content test --base-dir ./src --env-file .env.production.local`

- **`--no-cache`**: Wyłącz pamięć podręczną.

  > Przykład: `npx intlayer build --no-cache`

**Opcje przygotowania:**

- **`--build`**: Buduje słowniki przed wysłaniem, aby zapewnić aktualność treści. Wartość true wymusi budowanie, false pominie budowanie, undefined pozwoli na użycie pamięci podręcznej budowania.

**Opcje logowania:**

- **`--verbose`**: Włącza szczegółowe logowanie do debugowania. (domyślnie true przy użyciu CLI)

  > Przykład: `npx intlayer content test --verbose`

## Przykład:

```bash
npx intlayer content test --verbose
```

Wynik pomaga szybko zidentyfikować, które tłumaczenia wymagają uzupełnienia, aby zapewnić prawidłowe działanie aplikacji we wszystkich skonfigurowanych lokalizacjach.
