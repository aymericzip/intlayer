---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Documentación del paquete lynx-intlayer
description: Soporte de Lynx para Intlayer, proporcionando polyfills para soporte de locales.
keywords:
  - lynx-intlayer
  - lynx
  - internacionalización
  - i18n
slugs:
  - doc
  - packages
  - lynx-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Documentación unificada para todas las exportaciones
---

# Paquete lynx-intlayer

El paquete `lynx-intlayer` proporciona las herramientas necesarias para integrar Intlayer en aplicaciones Lynx.

## Instalación

```bash
npm install lynx-intlayer
```

## Exportaciones

### Polyfill

Importación:

```tsx
import "lynx-intlayer";
```

| Función            | Descripción                                                                 |
| ------------------ | --------------------------------------------------------------------------- |
| `intlayerPolyfill` | Función que aplica los polyfills necesarios para que Lynx soporte Intlayer. |

### Plugin de Rsbuild

El paquete `lynx-intlayer` proporciona un plugin de Rsbuild para integrar Intlayer en el proceso de build de Lynx.

Importación:

```tsx
import "lynx-intlayer";
```

| Función              | Descripción                                                 |
| -------------------- | ----------------------------------------------------------- |
| `pluginIntlayerLynx` | Plugin de Rsbuild que integra Intlayer en el build de Lynx. |
