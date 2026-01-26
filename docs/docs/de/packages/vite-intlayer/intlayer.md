---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: intlayer Vite Plugin Dokumentation | vite-intlayer
description: Anleitung zur Verwendung des intlayer-Plugins für das vite-intlayer-Paket
keywords:
  - intlayer
  - vite
  - plugin
  - Intlayer
  - intlayer
  - Internationalisierung
  - Dokumentation
slugs:
  - doc
  - packages
  - vite-intlayer
  - intlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Dokumentation initialisiert
---

# intlayer Vite Plugin Dokumentation

Das `intlayer` Vite-Plugin integriert die Intlayer-Konfiguration in den Build-Prozess. Es verwaltet Dictionary-Aliase, startet im Entwicklungsmodus den Dictionary-Watcher und bereitet Dictionaries für den Build vor.

## Verwendung

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer()],
});
```

## Beschreibung

Das Plugin übernimmt folgende Aufgaben:

1. **Dictionaries vorbereiten**: Es kompiliert die Dictionaries in optimierte Dateien beim Start des Build- oder Dev-Prozesses.
2. **Watch-Modus**: Im Entwicklungsmodus überwacht es Änderungen an den Dictionary-Dateien und kompiliert sie automatisch neu.
3. **Aliases**: Es stellt Aliase zur Verfügung, um in deiner Anwendung auf die Dictionaries zuzugreifen.
4. **Tree-Shaking**: Es unterstützt Tree-Shaking ungenutzter Übersetzungen über das `intlayerPrune`-Plugin.
