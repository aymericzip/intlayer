---
createdAt: 2026-01-21
updatedAt: 2026-01-21
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
    changes: Inicjalizacja dokumentacji
---

# Dokumentacja wtyczki intlayerPrune dla Vite

Wtyczka Vite `intlayerPrune` służy do tree-shakingu i usuwania nieużywanych słowników z bundla Twojej aplikacji. Pomaga to zmniejszyć końcowy rozmiar bundla, uwzględniając jedynie niezbędne wielojęzyczne treści.

## Użycie

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayer, intlayerPrune } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer(), intlayerPrune()],
});
```

## Opis

Wtyczka analizuje kod źródłowy, aby zidentyfikować, które klucze słowników są faktycznie używane. Następnie usuwa wszelkie nieużywane treści z zabundlowanych plików słowników. Jest to szczególnie przydatne w dużych projektach z wieloma słownikami, gdzie tylko podzbiór jest używany na określonych stronach lub w komponentach.
