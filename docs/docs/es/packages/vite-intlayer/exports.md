---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Documentación del paquete vite-intlayer
description: Plugin de Vite para Intlayer, que proporciona alias de diccionario y watchers.
keywords:
  - vite-intlayer
  - vite
  - plugin
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - vite-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Documentación unificada para todas las exportaciones
---

# Paquete vite-intlayer

El paquete `vite-intlayer` proporciona un plugin de Vite para integrar Intlayer en tu aplicación basada en Vite.

## Instalación

```bash
npm install vite-intlayer
```

## Exportaciones

### Plugin

Import:

```tsx
import "vite-intlayer";
```

| Function             | Description                                                                                  | Related Doc                                                                                                            |
| -------------------- | -------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `intlayer`           | Plugin principal de Vite que integra Intlayer en el proceso de build.                        | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/vite-intlayer/intlayer.md)           |
| `intlayerPlugin`     | (**Deprecado**) Alias de `intlayer`.                                                         | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/vite-intlayer/intlayer.md)           |
| `intlayerProxy`      | Plugin middleware de desarrollo para gestionar la detección de locale y el enrutamiento.     | -                                                                                                                      |
| `intlayerMiddleware` | (**Deprecado**) Alias de `intlayerProxy`.                                                    | -                                                                                                                      |
| `intlayerPrune`      | Plugin para realizar tree-shaking y podar diccionarios no utilizados durante la compilación. | [intlayerPrune](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/vite-intlayer/intlayerPrune.md) |
