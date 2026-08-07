---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Dokumentacja wtyczki Vite intlayer | vite-intlayer
description: Zobacz, jak używać wtyczki intlayer dla pakietu vite-intlayer
keywords:
  - intlayer
  - vite
  - wtyczka
  - Intlayer
  - intlayer
  - Internacjonalizacja
  - Dokumentacja
slugs:
  - doc
  - packages
  - vite-intlayer
  - intlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: "Inicjalizacja dokumentacji"
author: aymericzip
---

# Dokumentacja wtyczki Vite intlayer

Wtyczka Vite `intlayer` integruje konfigurację Intlayer z procesem budowania. Obsługuje aliasy słowników, uruchamia watchera słowników w trybie deweloperskim oraz przygotowuje słowniki do kompilacji.

## Użycie

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer()],
});
```

## Opcje

```ts
import type { IntlayerPluginOptions } from "vite-intlayer";
```

`IntlayerPluginOptions` rozszerza `GetConfigurationOptions` (zobacz `@intlayer/config`) o następujące dodatkowe pola:

| Opcja           | Typ                             | Domyślnie   | Opis                                                                                                                                                        |
| --------------- | ------------------------------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `compatCallers` | `CompatCallerConfig[]`          | `[]`        | Dodatkowe wzorce callerów dla pakietów compat-adapter (np. `@intlayer/react-i18next`). Przekazywane do analizatora użycia pól w czasie budowania.           |
| `proxy`         | `{ ignore?: (req) => boolean }` | `undefined` | Opcje przekazywane do wbudowanego proxy routingu lokalizacyjnego. Użyj `ignore` aby wykluczyć określone ścieżki (np. trasy API) z routingu lokalizacyjnego. |

Wszystkie inne opcje (`override`, `configFile`, …) są przekazywane bezpośrednio do `getConfiguration()`.

### Przykłady

#### Ignoruj trasy API z routingu locale'a

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
  ],
});
```

#### Ze spersonalizowaną ścieżką pliku konfiguracyjnego

```ts
export default defineConfig({
  plugins: [
    intlayer({
      configFile: "./config/intlayer.config.ts",
    }),
  ],
});
```

#### Z adapterami kompatybilności

```ts
import { intlayer } from "vite-intlayer";
import { reactI18nextCallerConfig } from "@intlayer/react-i18next/plugin";

export default defineConfig({
  plugins: [
    intlayer({
      compatCallers: [reactI18nextCallerConfig],
    }),
  ],
});
```

## Co robi wtyczka

### 1. Przygotowanie słownika

Przed rozpoczęciem buildu (i raz na godzinę w dev), `intlayer` wywołuje `prepareIntlayer` aby skompilować wszystkie pliki `.content.ts` do zoptymalizowanych słowników JSON przechowywanych w `.intlayer/`.

### 2. Aliasy modułów

Plugin dodaje aliasy resolve Vite'a, aby `import { myDict } from 'intlayer/dictionaries/my-dict'` rozwiązywał się do skompilowanego pliku JSON na dysku. Buildy SSR wykorzystują `ssr.noExternal`, aby zapewnić, że wszystkie pakiety `@intlayer/*` są spakowane z zastosowanymi aliasami.

### 3. Dev-server watcher

W trybie development uruchamiany jest watcher `chokidar`. Gdy plik `.content.ts` się zmieni, słowniki są rekompilowane, a HMR Vite'a propaguje aktualizację do przeglądarki.

### 4. Wbudowany proxy do routowania locale (v9+)

Od Intlayer v9 middleware `intlayerProxy` jest rejestrowany automatycznie wewnątrz `intlayer()`. Obsługuje:

- Wykrywanie locale z prefiksu URL, cookies i nagłówka `Accept-Language`.
- Przekierowania 301 gdy wykryte locale nie odpowiada bieżącemu URL.
- Wewnętrzne przepisywanie URL-i tak aby framework widział prawidłowy parametr trasy `[locale]`.

Proxy jest kontrolowane przez `routing.enableProxy` (domyślnie `true`) w konfiguracji Intlayer. Aby całkowicie je wyłączyć:

```ts
// intlayer.config.ts
import { defineConfig } from "intlayer";

export default defineConfig({
  routing: { enableProxy: false },
});
```

Aby dostosować zachowanie proxy bez osobnego wywołania `intlayerProxy()`, przekaż opcje `proxy` do głównego pluginu:

```ts
intlayer({ proxy: { ignore: (req) => req.url?.startsWith("/api") } });
```

Zapoznaj się z [dokumentacją intlayerProxy](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/vite-intlayer/intlayerProxy.md) aby poznać pełne referencje zachowania routowania.

### 5. Bundled compiler (v9+)

Gdy `compiler.enabled` jest `true` **oraz** `compiler.output` jest ustawiony w konfiguracji Intlayer, `intlayer()` rejestruje `intlayerCompiler` automatycznie. Compiler wyodrębnia deklaracje treści inline zapisane bezpośrednio w plikach komponentów i zapisuje je do słowników w czasie transformacji. Zobacz [dokumentację intlayerCompiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/vite-intlayer/intlayerCompiler.md).

### 6. Optymalizacje budowania

Podczas budowania w trybie produkcji plugin dodaje:

- **intlayerOptimize** – transformacja Babel, która przepisuje `useIntlayer('key')` → `useDictionary(hash)` i wstrzykuje bezpośrednie importy JSON.
- **intlayerPrune** – usuwa nieużywane pola zawartości z JSON słownika.
- **intlayerMinify** – kompresuje JSON słownika i opcjonalnie zmienia nazwy pól.

Te funkcje są nieaktywne w trybie rozwojowym.

## Przestarzałe aliasy

| Przestarzały eksport | Zamiennik  |
| -------------------- | ---------- |
| `intlayerPlugin`     | `intlayer` |
| `intLayerPlugin`     | `intlayer` |
