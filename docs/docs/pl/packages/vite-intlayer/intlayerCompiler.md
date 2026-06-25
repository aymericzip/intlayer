---
createdAt: 2026-06-25
updatedAt: 2026-06-25
title: Dokumentacja wtyczki Vite intlayerCompiler | vite-intlayer
description: Wtyczka Vite, która ekstrahuje wbudowane deklaracje zawartości Intlayer z plików komponentów i zapisuje je do plików JSON słownika w czasie budowania/transformacji.
keywords:
  - intlayerCompiler
  - vite
  - wtyczka
  - kompilator
  - zawartość
  - słownik
  - umiędzynarodowienie
  - i18n
slugs:
  - doc
  - packages
  - vite-intlayer
  - intlayerCompiler
history:
  - version: 9.0.0
    date: 2026-06-25
    changes: "Zintegrowano z intlayer(); inicjalizacja dokumentacji"
author: aymericzip
---

# intlayerCompiler

`intlayerCompiler` to wtyczka Vite, która skanuje pliki źródłowe komponentów w poszukiwaniu **wbudowanych deklaracji zawartości Intlayer** (inline declarations) — zawartości zdefiniowanej bezpośrednio w komponencie, a nie w osobnym pliku `.content.ts` — i zapisuje je do plików JSON słownika podczas fazy transformacji.

> **Od Intlayer v9** `intlayerCompiler` jest automatycznie dołączany do głównej wtyczki [`intlayer()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/vite-intlayer/intlayer.md), gdy zarówno `compiler.enabled` ma wartość `true`, jak i `compiler.output` jest ustawiony w konfiguracji Intlayer. Musisz go zarejestrować osobno tylko wtedy, gdy chcesz mieć pełną kontrolę nad konfiguracją specyficzną dla kompilatora.

## Użycie

### Jako część `intlayer()` (zalecane, v9+)

Włącz kompilator w konfiguracji Intlayer:

```ts
// intlayer.config.ts
import { defineConfig } from "intlayer";

export default defineConfig({
  compiler: {
    enabled: true,
    output: "./src/dictionaries", // gdzie zapisywane są wyekstrahowane słowniki
  },
});
```

Następnie użyj standardowej wtyczki bez dodatkowej rejestracji:

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer()],
});
```

### Samodzielnie (w razie potrzeby)

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayerCompiler()],
});
```

## Opcje

```ts
import type { IntlayerCompilerOptions } from "vite-intlayer";
```

| Opcja            | Typ                       | Opis                                                                                                |
| ---------------- | ------------------------- | --------------------------------------------------------------------------------------------------- |
| `configOptions`  | `GetConfigurationOptions` | Nadpisania konfiguracji Intlayer przekazywane do `getConfiguration()`.                              |
| `compilerConfig` | `Partial<CompilerConfig>` | Nadpisania sekcji konfiguracji specyficznej dla kompilatora (np. `enabled`, `output`, `filesList`). |

### Przykład

```ts
intlayerCompiler({
  configOptions: { configFile: "./config/intlayer.config.ts" },
  compilerConfig: { enabled: true, output: "./src/dictionaries" },
});
```

## Jak to działa

### Faza transformacji

Dla każdego pliku źródłowego, który pasuje do `compiler.filesList`, wtyczka kompilatora:

1. Przekazuje zawartość pliku do `extractContent` z pakietu `@intlayer/babel`.
2. Wywołuje `onExtract` dla każdej znalezionej deklaracji, co zapisuje wynikowy słownik JSON do ścieżki `compiler.output`.
3. Zwraca przetransformowany kod źródłowy z wbudowanymi deklaracjami zastąpionymi standardowymi wywołaniami `useIntlayer('key')` / `getIntlayer('key')`.

Obsługiwane typy plików: `.ts`, `.tsx`, `.js`, `.jsx`, `.vue`, `.svelte`, `.astro`.

### HMR (Hot Module Replacement)

Gdy plik komponentu zostanie zapisany w trybie deweloperskim, kompilator:

1. Wykrywa zmianę pliku za pomocą hooka `handleHotUpdate` w Vite.
2. Ponownie ekstrahuje zawartość ze zaktualizowanego pliku.
3. Zapisuje zaktualizowany słownik JSON.
4. Wyzwala pełne przeładowanie strony (`server.ws.send({ type: 'full-reload' })`).

Debounce o wartości 500 ms zapobiega zapętleniu ponownej ekstrakcji spowodowanemu przez sam zapis słownika (który również wyzwala zdarzenie zmiany pliku).

### Deduplikacja

`intlayerCompiler` używa tego samego mechanizmu deduplikacji `createPrimaryInstanceGuard` co inne wbudowane wtyczki. Gdy obecne są zarówno `intlayer()` (który zawiera kompilator), jak i ręczne wywołanie `intlayerCompiler()`, uruchamiana jest tylko pierwsza zarejestrowana instancja — żadne słowniki nie są zapisywane dwukrotnie.
