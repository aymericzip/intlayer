---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Documentation du package lynx-intlayer
description: Support Lynx pour Intlayer, fournissant des polyfills pour la prise en charge des locales.
keywords:
  - lynx-intlayer
  - lynx
  - internationalisation
  - i18n
slugs:
  - doc
  - packages
  - lynx-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Unified documentation for all exports
---

# Package lynx-intlayer

Le package `lynx-intlayer` fournit les outils nécessaires pour intégrer Intlayer dans des applications Lynx.

## Installation

```bash
npm install lynx-intlayer
```

## Exportations

### Polyfill

Import:

```tsx
import "lynx-intlayer";
```

| Fonction           | Description                                                                              |
| ------------------ | ---------------------------------------------------------------------------------------- |
| `intlayerPolyfill` | Fonction qui applique les polyfills nécessaires pour que Lynx prenne en charge Intlayer. |

### Plugin Rsbuild

Le package `lynx-intlayer` fournit un plugin Rsbuild pour intégrer Intlayer au processus de build de Lynx.

Import :

```tsx
import "lynx-intlayer";
```

| Fonction             | Description                                                             |
| -------------------- | ----------------------------------------------------------------------- |
| `pluginIntlayerLynx` | Plugin Rsbuild qui intègre Intlayer dans le processus de build de Lynx. |
