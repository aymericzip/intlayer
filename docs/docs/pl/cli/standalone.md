---
createdAt: 2024-08-11
updatedAt: 2026-03-31
title: Samodzielny Pakiet (Standalone Bundle)
description: Dowiedz się, jak utworzyć samodzielny pakiet JavaScript z treściami aplikacji.
keywords:
  - Standalone
  - Bundle
  - CLI
  - Intlayer
  - Editor
  - CMS
slugs:
  - doc
  - concept
  - cli
  - standalone
history:
  - version: 8.6.4
    date: 2026-03-31
    changes: "Inicjalizacja dokumentacji polecenia standalone"
---

# Samodzielny Pakiet (Standalone Bundle)

Polecenie `standalone` pozwala na utworzenie samodzielnego pakietu JavaScript zawierającego Intlayer oraz inne określone pakiety. Jest to szczególnie przydatne przy używaniu Intlayer w środowiskach bez menedżera pakietów lub bundlera, takich jak prosta aplikacja HTML/JS.

Pakiet wykorzystuje [esbuild](https://esbuild.github.io/) do połączenia żądanych pakietów i ich zależności w jeden plik, który można łatwo zaimportować do dowolnego projektu internetowego.

## Użycie

```bash
npx intlayer standalone --packages [pakiety...] [opcje]
```

## Opcje

- `-o, --outfile [outfile]` - Opcjonalnie. Nazwa pliku wyjściowego. Domyślnie: `intlayer-bundle.js`.
- `--packages [pakiety...]` - Wymagane. Lista pakietów do dołączenia do pakietu (np. `intlayer`, `vanilla-intlayer`).
- `--version [version]` - Opcjonalnie. Wersja pakietów do spakowania. Jeśli nie określono, domyślnie używana jest wersja Intlayer CLI.
- `--minify` - Opcjonalnie. Czy zminimalizować wynik. Domyślnie: `true`.
- `--platform [platform]` - Opcjonalnie. Platforma docelowa dla pakietu (np. `browser`, `node`). Domyślnie: `browser`.
- `--format [format]` - Opcjonalnie. Format wyjściowy pakietu (np. `esm`, `cjs`, `iife`). Domyślnie: `esm`.

## Opcje Ogólne

- `--env-file [envFile]` - Plik środowiskowy.
- `-e, --env [env]` - Środowisko.
- `--base-dir [baseDir]` - Katalog bazowy.
- `--no-cache` - Wyłącz pamięć podręczną.
- `--verbose` - Szczegółowe dane wyjściowe.

## Przykłady:

### Tworzenie pakietu dla Vanilla JS:

```bash
npx intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js
```

Utworzy to plik `intlayer.js` zawierający pakiety `intlayer` i `vanilla-intlayer`, zminimalizowany i w formacie ESM, gotowy do użycia w przeglądarce za pomocą tagu `<script>`.

### Pakowanie konkretnej wersji:

```bash
npx intlayer standalone --packages intlayer --version 8.6.4
```

### Pakowanie w innym formacie:

```bash
npx intlayer standalone --packages intlayer --format iife
```

## Co to robi:

1. **Tworzy tymczasowe środowisko** - Konfiguruje tymczasowy katalog do zarządzania zależnościami.
2. **Instaluje pakiety** - Używa `npm` lub `bun` (jeśli jest dostępny) do zainstalowania żądanych pakietów i ich zależności.
3. **Generuje punkt wejścia** - Tworzy tymczasowy plik punktu wejścia, który eksportuje wszystkie żądane pakiety i udostępnia je jako zmienne globalne podczas uruchamiania w przeglądarce.
4. **Pakuje za pomocą esbuild** - Używa esbuild do połączenia wszystkiego w jeden plik, stosując minimalizację i formatowanie zgodnie z żądaniem.
5. **Generuje plik** - Zapisuje wynikowy pakiet do określonej ścieżki wyjściowej.

## Zmienne Globalne

Gdy pakiet zostanie załadowany w przeglądarce, udostępnia żądane pakiety jako zmienne globalne w obiekcie `window`. Nazwy zmiennych pochodzą od nazw pakietów (np. `intlayer` staje się `Intlayer`, `vanilla-intlayer` staje się `VanillaIntlayer`).

```javascript
// Dostęp do Intlayer z pakietu
const { getLocaleName } = window.Intlayer;
const { installIntlayer, useIntlayer } = window.VanillaIntlayer;
```
