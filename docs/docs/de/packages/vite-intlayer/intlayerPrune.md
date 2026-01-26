---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: intlayerPrune Vite Plugin Dokumentation | vite-intlayer
description: Anleitung zur Verwendung des intlayerPrune-Plugins des vite-intlayer-Pakets
keywords:
  - intlayerPrune
  - vite
  - plugin
  - tree-shaking
  - Intlayer
  - intlayer
  - Internationalisierung
  - Dokumentation
slugs:
  - doc
  - packages
  - vite-intlayer
  - intlayerPrune
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Dokumentation initialisiert
---

# intlayerPrune Vite Plugin Dokumentation

Das `intlayerPrune` Vite-Plugin wird verwendet, um ungenutzte Wörterbücher aus Ihrem Anwendungs-Bundle mittels Tree-Shaking zu entfernen. Dadurch wird die endgültige Bundle-Größe reduziert, da nur die notwendigen mehrsprachigen Inhalte enthalten bleiben.

## Verwendung

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayer, intlayerPrune } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer(), intlayerPrune()],
});
```

## Beschreibung

Das Plugin analysiert Ihren Quellcode, um zu ermitteln, welche Wörterbuchschlüssel tatsächlich verwendet werden. Anschließend entfernt es nicht verwendete Inhalte aus den gebündelten Wörterbuchdateien. Das ist besonders nützlich bei großen Projekten mit vielen Wörterbüchern, bei denen in bestimmten Seiten oder Komponenten nur ein Teil verwendet wird.
