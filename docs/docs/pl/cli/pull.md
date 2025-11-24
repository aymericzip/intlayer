---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Pobieranie słowników
description: Dowiedz się, jak pobierać słowniki z edytora Intlayer i CMS.
keywords:
  - Pobieranie
  - Słowniki
  - CLI
  - Intlayer
  - Edytor
  - CMS
slugs:
  - doc
  - concept
  - cli
  - pull
---

# Pobieranie zdalnych słowników

```bash
npx intlayer pull
```

Jeśli [edytor intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_visual_editor.md) jest zainstalowany, możesz również pobierać słowniki z edytora. W ten sposób możesz nadpisać zawartość swoich słowników zgodnie z potrzebami Twojej aplikacji.

## Alias:

- `npx intlayer dictionaries pull`
- `npx intlayer dictionary pull`
- `npx intlayer dic pull`

## Argumenty:

**Opcje słownika:**

- **`-d, --dictionaries`**: Identyfikatory słowników do pobrania. Jeśli nie zostaną podane, pobrane zostaną wszystkie słowniki.

  > Przykład: `npx intlayer dictionary pull -d my-dictionary-id my-other-dictionary-id`

- **`--dictionary`**: Identyfikatory słowników do pobrania (alias dla --dictionaries).

  > Przykład: `npx intlayer dictionary pull --dictionary my-dictionary-id my-other-dictionary-id`

**Opcje konfiguracji:**

- **`--base-dir`**: Określ katalog bazowy projektu. Aby pobrać konfigurację intlayer, polecenie będzie szukać pliku `intlayer.config.{ts,js,json,cjs,mjs}` w katalogu bazowym.

  > Przykład: `npx intlayer dictionary push --env-file .env.production.local`

- **`--no-cache`**: Wyłącz cache.

  > Przykład: `npx intlayer build --no-cache`

**Opcje zmiennych środowiskowych:**

- **`--env`**: Określ środowisko (np. `development`, `production`).
- **`--env-file`**: Podaj niestandardowy plik środowiskowy do załadowania zmiennych.
- **`--base-dir`**: Określ katalog bazowy projektu. Aby pobrać konfigurację intlayer, polecenie będzie szukać pliku `intlayer.config.{ts,js,json,cjs,mjs}` w katalogu bazowym.

  > Przykład: `npx intlayer dictionary push --env-file .env.production.local`

  > Przykład: `npx intlayer dictionary push --env production`

**Opcje wyjścia:**

- **`--new-dictionaries-path`** : Ścieżka do katalogu, w którym zostaną zapisane nowe słowniki. Jeśli nie zostanie określona, nowe słowniki zostaną zapisane w katalogu `./intlayer-dictionaries` projektu. Jeśli w zawartości słownika jest określone pole `filePath`, słowniki nie będą brały pod uwagę tego argumentu i zostaną zapisane w określonym katalogu `filePath`.

**Opcje logowania:**

- **`--verbose`**: Włącz szczegółowe logowanie do debugowania. (domyślnie włączone przy użyciu CLI)

## Przykład:

```bash
npx intlayer dictionary pull --newDictionariesPath ./my-dictionaries-dir/
```
