---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Zarządzanie konfiguracją
description: Dowiedz się, jak pobrać i przesłać swoją konfigurację Intlayer do CMS.
keywords:
  - Konfiguracja
  - Config
  - CLI
  - Intlayer
  - CMS
slugs:
  - doc
  - concept
  - cli
  - configuration
---

# Zarządzanie konfiguracją

## Pobierz konfigurację

Polecenie `configuration get` pobiera aktualną konfigurację dla Intlayer, w szczególności ustawienia lokalizacji. Jest to przydatne do weryfikacji Twojej konfiguracji.

```bash
npx intlayer configuration get
```

## Alias:

- `npx intlayer config get`
- `npx intlayer conf get`

## Argumenty:

- **`--env`**: Określ środowisko (np. `development`, `production`).
- **`--env-file`**: Podaj niestandardowy plik środowiskowy do załadowania zmiennych.
- **`--base-dir`**: Określ katalog bazowy projektu.
- **`--verbose`**: Włącz szczegółowe logowanie w celu debugowania. (domyślnie true przy użyciu CLI)
- **`--no-cache`**: Wyłącz pamięć podręczną.

## Prześlij konfigurację

Polecenie `configuration push` przesyła Twoją konfigurację do Intlayer CMS i edytora. Ten krok jest niezbędny, aby umożliwić korzystanie z zewnętrznych słowników w Intlayer Visual Editor.

```bash
npx intlayer configuration push
```

## Alias:

- `npx intlayer config push`
- `npx intlayer conf push`

## Argumenty:

- **`--env`**: Określ środowisko (np. `development`, `production`).
- **`--env-file`**: Podaj niestandardowy plik środowiskowy do ładowania zmiennych.
- **`--base-dir`**: Określ katalog bazowy projektu.
- **`--verbose`**: Włącz szczegółowe logowanie w celu debugowania. (domyślnie true przy użyciu CLI)
- **`--no-cache`**: Wyłącz pamięć podręczną.

Poprzez przesłanie konfiguracji, Twój projekt jest w pełni zintegrowany z Intlayer CMS, co umożliwia płynne zarządzanie słownikami w zespołach.
