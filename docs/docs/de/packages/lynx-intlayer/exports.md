---
createdAt: 2026-01-21
updatedAt: 2026-09-27
priority: 5
title: lynx-intlayer Paketdokumentation
description: "Das Paket lynx-intlayer integriert Intlayer in Lynx-Apps, mit den Polyfills und Helfern für die Locale-Unterstützung auf Mobilgeräten."
keywords:
  - lynx-intlayer
  - lynx
  - Internationalisierung
  - i18n
slugs:
  - doc
  - packages
  - lynx-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: "Einheitliche Dokumentation für alle Exporte"
author: aymericzip
---

# lynx-intlayer Paket

Das Paket `lynx-intlayer` stellt die notwendigen Werkzeuge bereit, um Intlayer in Lynx-Anwendungen zu integrieren.

## Installation

```bash
npm install lynx-intlayer
```

## Exporte

### Polyfill

Import:

```tsx
import "lynx-intlayer";
```

| Funktion           | Beschreibung                                                                                |
| ------------------ | ------------------------------------------------------------------------------------------- |
| `intlayerPolyfill` | Funktion, die die notwendigen Polyfills für Lynx anwendet, damit Intlayer unterstützt wird. |

### Rsbuild-Plugin

Das Paket `lynx-intlayer` stellt ein Rsbuild-Plugin bereit, um Intlayer in den Lynx-Build-Prozess zu integrieren.

Import:

```tsx
import "lynx-intlayer";
```

| Funktion             | Beschreibung                                                       |
| -------------------- | ------------------------------------------------------------------ |
| `pluginIntlayerLynx` | Rsbuild-Plugin, das Intlayer in den Lynx-Build-Prozess integriert. |
