---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Wysyłanie słowników
description: Dowiedz się, jak wysyłać swoje słowniki do edytora Intlayer i CMS.
keywords:
  - Wysyłanie
  - Słowniki
  - CLI
  - Intlayer
  - Edytor
  - CMS
slugs:
  - doc
  - concept
  - cli
  - push
---

# Wysyłanie słowników

```bash
npx intlayer dictionary push
```

Jeśli [edytor intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_visual_editor.md) jest zainstalowany, możesz również wysyłać słowniki do edytora. To polecenie pozwoli udostępnić słowniki w [edytorze](https://app.intlayer.org/). W ten sposób możesz dzielić się swoimi słownikami z zespołem i edytować treści bez konieczności modyfikowania kodu aplikacji.

## Alias:

- `npx intlayer dictionaries push`
- `npx intlayer dictionary push`
- `npx intlayer dic push`

## Argumenty:

**Opcje słownika:**

- **`-d`, `--dictionaries`**: identyfikatory słowników do pobrania. Jeśli nie zostaną podane, zostaną wysłane wszystkie słowniki.

  > Przykład: `npx intlayer dictionary push -d my-dictionary-id my-other-dictionary-id`

- **`--dictionary`**: identyfikatory słowników do pobrania (alias dla --dictionaries).

  > Przykład: `npx intlayer dictionary push --dictionary my-dictionary-id my-other-dictionary-id`

**Opcje konfiguracji:**

- **`--base-dir`**: Określ katalog bazowy projektu. Aby pobrać konfigurację intlayer, polecenie będzie szukać pliku `intlayer.config.{ts,js,json,cjs,mjs}` w katalogu bazowym.

  > Przykład: `npx intlayer dictionary push --env-file .env.production.local`

- **`--no-cache`**: Wyłącz pamięć podręczną.

  > Przykład: `npx intlayer build --no-cache`

**Opcje zmiennych środowiskowych:**

- **`--env`**: Określ środowisko (np. `development`, `production`). Przydatne, gdy używasz zmiennych środowiskowych w pliku konfiguracyjnym intlayer.
- **`--env-file`**: Podaj niestandardowy plik środowiskowy do załadowania zmiennych. Przydatne, gdy używasz zmiennych środowiskowych w pliku konfiguracyjnym intlayer.

  > Przykład: `npx intlayer dictionary push --env-file .env.production.local`

  > Przykład: `npx intlayer dictionary push --env production`

**Opcje wyjścia:**

- **`-r`, `--delete-locale-dictionary`**: Pomija pytanie o usunięcie katalogów lokalizacji po przesłaniu słowników i usuwa je. Domyślnie, jeśli słownik jest zdefiniowany lokalnie, nadpisze zawartość zdalnych słowników.

  > Przykład: `npx intlayer dictionary push -r`

  > Przykład: `npx intlayer dictionary push --delete-locale-dictionary`

- **`-k`, `--keep-locale-dictionary`**: Pomija pytanie o usunięcie katalogów lokalizacji po przesłaniu słowników i zachowuje je. Domyślnie, jeśli słownik jest zdefiniowany lokalnie, nadpisze zawartość zdalnych słowników.

  > Przykład: `npx intlayer dictionary push -k`

  > Przykład: `npx intlayer dictionary push --keep-locale-dictionary`

**Opcje przygotowania:**

- **`--build`**: Buduje słowniki przed przesłaniem, aby zapewnić aktualność zawartości. Wartość true wymusi budowanie, false pominie budowanie, undefined pozwoli na użycie pamięci podręcznej budowania.

**Opcje logowania:**

- **`--verbose`**: Włącza szczegółowe logowanie do celów debugowania. (domyślnie true przy użyciu CLI)

**Opcje Git:**

- **`--git-diff`**: Uruchamia tylko na słownikach, które zawierają zmiany od bazy (domyślnie `origin/main`) do bieżącej gałęzi (domyślnie `HEAD`).
- **`--git-diff-base`**: Określa bazowe odniesienie dla różnic git (domyślnie `origin/main`).
- **`--git-diff-current`**: Określa bieżące odniesienie dla różnic git (domyślnie `HEAD`).
- **`--uncommitted`**: Uwzględnia niezacommitowane zmiany.
- **`--unpushed`**: Uwzględnia zmiany nieprzesłane do zdalnego repozytorium.
- **`--untracked`**: Uwzględnia pliki nieśledzone przez git.

  > Przykład: `npx intlayer dictionary push --git-diff --git-diff-base origin/main --git-diff-current HEAD`

  > Przykład: `npx intlayer dictionary push --uncommitted --unpushed --untracked`
