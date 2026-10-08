---
createdAt: 2026-01-21
updatedAt: 2026-01-21
priority: 5
title: Dokumentacja wtyczki intlayerPrune dla Vite | vite-intlayer
description: Zobacz, jak używać wtyczki intlayerPrune w pakiecie vite-intlayer
keywords:
  - intlayerPrune
  - vite
  - wtyczka
  - tree-shaking
  - Intlayer
  - intlayer
  - Internacjonalizacja
  - Dokumentacja
slugs:
  - doc
  - packages
  - vite-intlayer
  - intlayerPrune
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: "Inicjalizacja dokumentacji"
author: aymericzip
---

# Dokumentacja wtyczki intlayerPrune dla Vite

Wtyczka Vite `intlayerPrune` służy do tree-shakingu i usuwania nieużywanych słowników z bundla Twojej aplikacji. Pomaga to zmniejszyć końcowy rozmiar bundla, uwzględniając jedynie niezbędne wielojęzyczne treści.

> Plugin jest już automatycznie włączony i skonfigurowany, gdy używasz [`intlayer()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/vite-intlayer/intlayer.md). Musisz go zarejestrować ręcznie tylko wtedy, gdy skomponujesz stos pluginów samodzielnie.

- [`intlayer()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/vite-intlayer/intlayer.md)

## Użycie

### W ramach `intlayer()` (zalecane)

Włącz pruning poprzez konfigurację Intlayer, a główny plugin zajmie się wszystkim:

```ts
// intlayer.config.ts
import { defineConfig } from "intlayer";

export default defineConfig({
  build: {
    optimize: true, // włącza zarówno prune, jak i minify
  },
});
```

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer()],
});
```

### Standalone

Jeśli ręcznie komponujesz stos pluginów, `intlayerPrune` i `intlayerMinify` współdzielą obiekt `PruneContext`, który musi być utworzony raz i przekazany do obu:

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayerPrune, intlayerMinify } from "vite-intlayer";
import { createPruneContext } from "@intlayer/babel";
import { getConfiguration } from "@intlayer/config/node";

const intlayerConfig = getConfiguration();
const pruneContext = createPruneContext();

export default defineConfig({
  plugins: [
    intlayerPrune(intlayerConfig, pruneContext),
    intlayerMinify(intlayerConfig, pruneContext), // opcjonalnie, odczytuje z tego samego kontekstu
  ],
});
```

## Jak to działa

### 1. Analiza użycia (buildStart)

Podczas `buildStart`, plugin `intlayerOptimize` (również część `intlayer()`) skanuje każdy plik źródłowy komponentu wymieniony w `build.filesList`. Dla każdego wywołania `useIntlayer('key')` lub `getIntlayer('key')` rejestruje dokładnie, które pola są dostępne, np.:

```ts
const { title, description } = useIntlayer("myDict");
// rejestruje: myDict → { title, description }
```

To buduje `pruneContext.fieldUsageMap` przed uruchomieniem jakichkolwiek wywołań `transform`.

### 2. Oczyszczanie JSON (transform, enforce: 'pre')

Gdy Vite przetwarza skompilowany plik JSON słownika, `intlayerPrune` przechwytuje go przed wbudowaną konwersją Vite JSON → ESM. Odczytuje mapę użycia pól z `pruneContext` i usuwa wszelkie pola treści, które nie znajdują się w zarejestrowanym zbiorze użyć.

Obsługiwane są dwa formaty treści:

- **Słowniki statyczne**: `{ nodeType: "translation", translation: { en: {...}, fr: {...} } }`. Pola są oczyszczane dla każdego locale wewnątrz `translation`.
- **Słowniki dynamiczne (per-locale)**: płaskie `{ fieldA: ..., fieldB: ... }`. Pola są oczyszczane na najwyższym poziomie.

### 3. Przypadki szczególne

Jeśli struktura zawartości słownika nie może być rozpoznana (np. niezwykły kształt zagnieżdżenia), jest dodawana do `pruneContext.dictionariesWithEdgeCases` i **pozostawiana bez zmian**. Rejestrowane jest ostrzeżenie. `intlayerMinify` również pomija te słowniki.

### 4. Mapa zmian nazw pól

Gdy przycinanie przebiegnie pomyślnie, `intlayerPrune` zapisuje również `pruneContext.dictionaryKeyToFieldRenameMap`, mapowanie z oryginalnych nazw pól na krótkie aliasy. `intlayerMinify` odczytuje tę mapę, aby zmienić nazwy pól w wyjściowym JSON, a przebieg zmiany nazwy Babel w `intlayerOptimize` aktualizuje dostępy do właściwości w plikach źródłowych odpowiednio.

## Warunki aktywacji

`intlayerPrune` jest aktywny **tylko** wtedy, gdy wszystkie poniższe warunki są spełnione:

1. Polecenie Vite to `build`.
2. `build.optimize` to `true` (lub `undefined`, które domyślnie przyjmuje wartość `true` dla kompilacji).
3. `build.purge` to `true` w konfiguracji Intlayer.

Pozostaje aktywny, gdy `editor.enabled` ma wartość `true`: wizualny edytor odwzorowuje każdą edycję za pomocą `dictionaryKey` + `keyPath` względem niezmergowanych słowników, których ta wtyczka nigdy nie dotyka, a usunięte pole to pole, którego nie odczytuje żaden komponent, więc nigdy nie jest renderowane ani wybieralne na stronie.
