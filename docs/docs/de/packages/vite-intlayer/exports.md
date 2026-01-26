---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Dokumentation des Pakets vite-intlayer
description: Vite-Plugin für Intlayer, das Wörterbuch-Aliase und Watcher bereitstellt.
keywords:
  - vite-intlayer
  - vite
  - plugin
  - Internationalisierung
  - i18n
slugs:
  - doc
  - packages
  - vite-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Vereinheitlichte Dokumentation für alle Exporte
---

# Paket vite-intlayer

Das `vite-intlayer`-Paket stellt ein Vite-Plugin bereit, um Intlayer in Ihre auf Vite basierende Anwendung zu integrieren.

## Installation

```bash
npm install vite-intlayer
```

## Exporte

### Plugin

Import:

```tsx
import "vite-intlayer";
```

| Funktion             | Beschreibung                                                                       | Verwandtes Dokument                                                                                                    |
| -------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `intlayer`           | Haupt-Vite-Plugin, das Intlayer in den Build-Prozess integriert.                   | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/vite-intlayer/intlayer.md)           |
| `intlayerPlugin`     | (**Deprecated**) Alias für `intlayer`.                                             | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/vite-intlayer/intlayer.md)           |
| `intlayerProxy`      | Entwicklungs-Middleware-Plugin zur Behandlung der Lokalerkennung und des Routings. | -                                                                                                                      |
| `intlayerMiddleware` | (**Deprecated**) Alias für `intlayerProxy`.                                        | -                                                                                                                      |
| `intlayerPrune`      | Plugin, das während des Builds ungenutzte Wörterbücher per Tree-Shaking entfernt.  | [intlayerPrune](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/vite-intlayer/intlayerPrune.md) |
