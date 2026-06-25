---
createdAt: 2026-06-25
updatedAt: 2026-06-25
title: Dokumentacja wtyczki Vite intlayerMinify | vite-intlayer
description: Wtyczka Vite, która minifikuje skompilowane pliki JSON słownika Intlayer i opcjonalnie maskuje nazwy pól zawartości w celu zmniejszenia rozmiaru pakietu.
keywords:
  - intlayerMinify
  - vite
  - wtyczka
  - minifikacja
  - rozmiar pakietu
  - słownik
  - umiędzynarodowienie
  - i18n
slugs:
  - doc
  - packages
  - vite-intlayer
  - intlayerMinify
history:
  - version: 9.0.0
    date: 2026-06-25
    changes: "Inicjalizacja dokumentacji"
author: aymericzip
---

# intlayerMinify

`intlayerMinify` to wtyczka Vite, która minifikuje skompilowane pliki JSON słowników podczas kompilacji produkcyjnej. Usuwa wszystkie niepotrzebne białe znaki i, w połączeniu z `intlayerPrune`, opcjonalnie zmienia nazwy pól zawartości na krótkie alfabetyczne aliasy (`a`, `b`, `c`, …), aby jeszcze bardziej zmniejszyć rozmiar pakietu (bundle'a).

> Ta wtyczka jest automatycznie dołączana i konfigurowana, gdy używasz wtyczki [`intlayer()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/vite-intlayer/intlayer.md). Musisz ją zarejestrować ręcznie tylko wtedy, gdy samodzielnie tworzysz stos wtyczek.

## Użycie

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayerMinify, intlayerPrune } from "vite-intlayer";
import { createPruneContext } from "@intlayer/babel";

const pruneContext = createPruneContext();

export default defineConfig({
  plugins: [
    intlayerPrune(intlayerConfig, pruneContext),
    intlayerMinify(intlayerConfig, pruneContext),
  ],
});
```

## Warunki aktywacji

`intlayerMinify` jest aktywna **tylko** wtedy, gdy spełnione są wszystkie trzy poniższe warunki:

1. Polecenie Vite to `build` (nie `serve` / dev).
2. Opcja `build.optimize` ma wartość `true` (lub `undefined`, co dla kompilacji domyślnie oznacza `true`).
3. Opcja `build.minify` w konfiguracji Intlayer ma wartość `true`.

Wtyczka jest automatycznie **wyłączana**, gdy `editor.enabled` ma wartość `true`, ponieważ edytor wymaga pełnej, czytelnej dla człowieka zawartości słownika.

## Co podlega minifikacji

Wtyczka kieruje swoje działanie na dwie lokalizacje słowników (rozpoznane na podstawie `intlayer.system`):

- `dictionariesDir` — statyczne słowniki dla wszystkich języków (np. `.intlayer/dictionaries/*.json`)
- `dynamicDictionariesDir` — dynamiczne słowniki dla poszczególnych języków

> Słowniki w trybie pobierania (`fetchDictionariesDir`) **nigdy** nie są minifikowane, ponieważ są serwowane z zewnętrznego API w czasie rzeczywistym przy użyciu ich oryginalnych nazw pól. Zmiana nazw pól stworzyłaby niezgodność między odpowiedzią serwera a dostępem do właściwości po stronie klienta.

## Maskowanie nazw pól (minifikacja właściwości)

Gdy wtyczka `intlayerPrune` przeanalizuje bazę kodu i uzupełni `pruneContext.dictionaryKeyToFieldRenameMap`, wtyczka `intlayerMinify` również zmienia nazwy pól zawartości na krótkie aliasy. Na przykład:

```json
// przed
{ "key": "myDict", "content": { "title": "Hello", "description": "World" } }

// po (z maskowaniem)
{ "key": "myDict", "content": { "a": "Hello", "b": "World" } }
```

Odpowiednie odwołania do właściwości w plikach źródłowych są zmieniane przez przebieg Babel wewnątrz `intlayerOptimize`, więc zachowanie w czasie rzeczywistym pozostaje niezmienione.

Wewnętrzne pola Intlayer (`nodeType`, `translation` itp.) nigdy nie zmieniają nazw.

## Słowniki z przypadkami brzegowymi

Słowniki oznaczone w `pruneContext.dictionariesWithEdgeCases` (anomalie strukturalne wykryte podczas fazy oczyszczania/prune) są całkowicie pomijane — nie są minifikowane ani maskowane — aby uniknąć dostarczenia uszkodzonych danych.

## Grupy kwalifikowane (kolekcje / warianty / metarekordy)

W przypadku słowników z tablicą `qualifierTypes` (kolekcje, warianty i metarekordy), wtyczka zachowuje tablicę `qualifierTypes` oraz mapę poboczną `meta` w oryginalnej formie. Maskowane są tylko nazwy pól wewnątrz wpisów `content`. Złożone klucze (używane do dopasowywania selektorów w czasie rzeczywistym) nigdy nie są modyfikowane.
