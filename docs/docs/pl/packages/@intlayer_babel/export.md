---
createdAt: 2026-06-25
updatedAt: 2026-06-25
title: "Dokumentacja pakietu @intlayer/babel"
description: Wtyczki Babel dla Intlayer do obsługi ekstrakcji zawartości, optymalizacji importu, oczyszczania nieużywanych pól i maskowania nazw pól podczas budowania.
keywords:
  - "@intlayer/babel"
  - babel
  - plugin
  - umiędzynarodowienie
  - i18n
  - kompilator
  - optymalizuj
  - oczyść
  - minifikuj
slugs:
  - doc
  - packages
  - "@intlayer/babel"
  - export
history:
  - version: 9.0.0
    date: 2026-06-25
    changes: "Ujednolicona dokumentacja wszystkich eksportów"
author: aymericzip
---

# Pakiet @intlayer/babel

Pakiet `@intlayer/babel` dostarcza zestaw wyspecjalizowanych wtyczek Babel dla Intlayer. Wtyczki te obejmują cały cykl budowania: ekstrahowanie deklaracji zawartości, przepisywanie wywołań `useIntlayer` / `getIntlayer` do zoptymalizowanych importów słowników, oczyszczanie nieużywanych pól i minifikację nazw pól.

## Instalacja

```bash
npm install @intlayer/babel
```

## Eksporty

Import:

```ts
import { ... } from "@intlayer/babel";
```

---

### Wtyczki

| Funkcja / Klasa                | Opis                                                                                                                                                                                                                      |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `intlayerExtractBabelPlugin`   | Wtyczka Babel, która ekstrahuje przetłumaczalną zawartość z plików źródłowych i automatycznie wstrzykuje hooki `useIntlayer` / `getIntlayer`. Przeznaczona do użytku z Next.js i narzędziami budowania opartymi na Babel. |
| `intlayerOptimizeBabelPlugin`  | Wtyczka Babel, która przekształca wywołania `useIntlayer` i `getIntlayer` oraz przepisuje ich importy do zoptymalizowanych importów słowników JSON (statycznych, dynamicznych lub przez fetch).                           |
| `intlayerPurgeBabelPlugin`     | Wtyczka Babel, która analizuje pliki źródłowe i przepisuje skompilowane pliki JSON słowników w celu usunięcia nieużywanych pól (`build.purge`) lub zmiany ich nazw na krótkie aliasy (`build.minify`).                    |
| `intlayerMinifyBabelPlugin`    | Wtyczka Babel, która przepisuje pliki źródłowe w celu użycia krótkich aliasów pól przypisanych podczas fazy minifikacji (np. `content.title` ← `content.a`). Zależy od `intlayerPurgeBabelPlugin`.                        |
| `makeFieldRenameBabelPlugin`   | Funkcja fabryczna (factory), która tworzy wtyczkę Babel do zmiany nazw dostępów do pól zawartości słownika w plikach źródłowych zgodnie z `dictionaryKeyToFieldRenameMap` wypełnioną w `PruneContext`.                    |
| `makeUsageAnalyzerBabelPlugin` | Funkcja fabryczna, która tworzy wtyczkę Babel do analizowania użycia `useIntlayer` / `getIntlayer` w kodzie źródłowym i agregowania danych o użyciu pól we wspólnym `PruneContext`.                                       |
| `getSharedPruneContext`        | Funkcja pomocnicza, która zwraca wspólny obiekt `PruneContext` dla określonego katalogu bazowego lub `null`, jeśli nie został jeszcze zainicjowany.                                                                       |

---

### Narzędzia konfiguracji wtyczek

| Funkcja                    | Opis                                                                                                                                       |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `getExtractPluginOptions`  | Ładuje konfigurację Intlayer i zwraca `ExtractPluginOptions` gotowe do użycia z `intlayerExtractBabelPlugin`.                              |
| `getOptimizePluginOptions` | Ładuje konfigurację Intlayer i skompilowane słowniki oraz zwraca `OptimizePluginOptions` gotowe do użycia z `intlayerOptimizeBabelPlugin`. |
| `getPurgePluginOptions`    | Ładuje konfigurację Intlayer i zwraca `PurgePluginOptions` gotowe do użycia z `intlayerPurgeBabelPlugin`.                                  |
| `getMinifyPluginOptions`   | Ładuje konfigurację Intlayer i zwraca `MinifyPluginOptions` gotowe do użycia z `intlayerMinifyBabelPlugin`.                                |

---

### Typy

| Typ                     | Opis                                                                                                                       |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `CompilerMode`          | Tryb kompilatora: `'dev'` do programowania ze wsparciem HMR lub `'build'` dla kompilacji produkcyjnych.                    |
| `ExtractPluginOptions`  | Opcje dla `intlayerExtractBabelPlugin`: lista plików, konfiguracja, callback `onExtract` itp.                              |
| `ExtractResult`         | Wynik ekstrakcji: klucz słownika, ścieżka do pliku, zawartość i język.                                                     |
| `OptimizePluginOptions` | Opcje dla `intlayerOptimizeBabelPlugin`: ścieżki słowników, tryb importu, mapa trybów dla słownika itp.                    |
| `PurgePluginOptions`    | Opcje dla `intlayerPurgeBabelPlugin`: katalog bazowy, flagi purge/minify/optimize, lista plików komponentów.               |
| `MinifyPluginOptions`   | Opcje dla `intlayerMinifyBabelPlugin`: katalog bazowy, flagi minify/optimize/editorEnabled.                                |
| `PruneContext`          | Stan współdzielony między wtyczkami analizującymi i oczyszczającymi: mapy użycia pól, mapy zmiany nazw itp.                |
| `DictionaryFieldUsage`  | Wynik użycia pola dla pojedynczego słownika: `Set<string>` lub `'all'`, gdy analiza statyczna jest niejednoznaczna.        |
| `NestedRenameEntry`     | Węzeł w drzewie zmiany nazw: `shortName` i mapa dzieci.                                                                    |
| `NestedRenameMap`       | Jeden poziom w drzewie zmiany nazw: `Map<string, NestedRenameEntry>`.                                                      |
| `CompatCallerConfig`    | Konfiguracja dla kompatybilnego analizatora użycia dla pakietów compat-adapter (nazwa wywołującego i opcje przetwarzania). |
| `ScriptBlock`           | Blok skryptu wyekstrahowany z pliku SFC (Vue lub Svelte): zawartość, przesunięcie początkowe i przesunięcie końcowe.       |

---

### Funkcje pomocnicze

| Funkcja                           | Opis                                                                                                                                                        |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `generateShortFieldName`          | Konwertuje liczbę całkowitą (zaczynając od zera) na krótki identyfikator alfabetyczny: `0` → `'a'`, `25` → `'z'`, `26` → `'aa'`, itp.                       |
| `buildNestedRenameMapFromContent` | Rekurencyjnie buduje `NestedRenameMap` z wartości zawaktu skompilowanego słownika, przestrzegając struktur węzłów Intlayer (translation, enumeration itp.). |
| `createPruneContext`              | Tworzy nowy pusty obiekt `PruneContext` zainicjowany wartościami domyślnymi.                                                                                |
| `extractScriptBlocks`             | Ekstrahuje bloki `<script>` z plików SFC (Vue / Svelte) do późniejszej analizy Babel.                                                                       |
| `BABEL_PARSER_OPTIONS`            | Stała reprezentująca opcje parsera Babel obejmująca obsługiwane frameworki (React/Vue/Svelte/Angular/...).                                                  |
| `INTLAYER_CALLER_NAMES`           | Stała lista oryginalnych nazw wywołujących Intlayer: `['useIntlayer', 'getIntlayer']`.                                                                      |

---

## Przykładowe użycie

```js
// babel.config.js
const {
  intlayerExtractBabelPlugin,
  intlayerPurgeBabelPlugin,
  intlayerMinifyBabelPlugin,
  intlayerOptimizeBabelPlugin,
  getExtractPluginOptions,
  getPurgePluginOptions,
  getMinifyPluginOptions,
  getOptimizePluginOptions,
} = require("@intlayer/babel");

module.exports = {
  presets: ["next/babel"],
  plugins: [
    [intlayerExtractBabelPlugin, getExtractPluginOptions()],
    [intlayerPurgeBabelPlugin, getPurgePluginOptions()],
    [intlayerMinifyBabelPlugin, getMinifyPluginOptions()],
    [intlayerOptimizeBabelPlugin, getOptimizePluginOptions()],
  ],
};
```

> **Uwaga:** Wtyczka `intlayerPurgeBabelPlugin` musi być zadeklarowana **przed** `intlayerMinifyBabelPlugin`, ponieważ ta druga odczytuje mapę zmian nazw utworzoną przez tę pierwszą. Ponadto obie muszą być poprzedzone wtyczką `intlayerOptimizeBabelPlugin`, aby mogła ona zobaczyć klucze słownika przed przepisaniem wywołań do `useIntlayer`.
