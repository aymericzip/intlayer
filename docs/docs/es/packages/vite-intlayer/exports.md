---
createdAt: 2026-01-21
updatedAt: 2026-01-21
priority: 5
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
  - version: 9.0.0
    date: 2026-06-25
    changes: "Índice de exportaciones actualizado: proxy y compiler ahora integrados en intlayer(); se agregaron docs de intlayerProxy, intlayerCompiler, intlayerMinify"
  - version: 8.0.0
    date: 2026-01-21
    changes: "Documentación unificada para todas las exportaciones"
author: aymericzip
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

| Function                   | Description                                                                                                                                                               | Related Doc                                                                                                                  |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `intlayer`                 | Plugin principal de Vite. Prepara diccionarios, configura alias, inicia observadores del servidor de desarrollo y (desde v9) agrupa el proxy y el compilador.             | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/vite-intlayer/intlayer.md)                 |
| `intlayerPlugin`           | (**Obsoleto**) Alias para `intlayer`.                                                                                                                                     | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/vite-intlayer/intlayer.md)                 |
| `intLayerPlugin`           | (**Obsoleto**) Alias para `intlayer`.                                                                                                                                     | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/vite-intlayer/intlayer.md)                 |
| `intlayerProxy`            | Plugin middleware de enrutamiento regional (detección, redirección, reescritura). Desde v9 está integrado en `intlayer()` – regístrelo por separado solo si es necesario. | [intlayerProxy](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/vite-intlayer/intlayerProxy.md)       |
| `intlayerMiddleware`       | (**Obsoleto**) Alias para `intlayerProxy`.                                                                                                                                | [intlayerProxy](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/vite-intlayer/intlayerProxy.md)       |
| `intLayerMiddlewarePlugin` | (**Obsoleto**) Alias para `intlayerProxy`.                                                                                                                                | [intlayerProxy](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/vite-intlayer/intlayerProxy.md)       |
| `intlayerCompiler`         | Extrae declaraciones de contenido en línea de los componentes y las escribe en diccionarios. Desde v9 está integrado en `intlayer()`.                                     | [intlayerCompiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/vite-intlayer/intlayerCompiler.md) |
| `intlayerPrune`            | Realiza tree-shaking de los campos de diccionario no utilizados del paquete de producción.                                                                                | [intlayerPrune](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/vite-intlayer/intlayerPrune.md)       |
| `intlayerMinify`           | Minifica archivos JSON de diccionarios compilados y opcionalmente altera nombres de campos.                                                                               | [intlayerMinify](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/vite-intlayer/intlayerMinify.md)     |

### Utilities

| Export                       | Description                                                                                   | Related Doc                                                                                                            |
| ---------------------------- | --------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `createIntlayerProxyHandler` | Returns a framework-agnostic Node.js `(req, res, next)` middleware with locale-routing logic. | [intlayerProxy](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/vite-intlayer/intlayerProxy.md) |

### Tipos

| Export                       | Descripción                                                                                                       |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `IntlayerPluginOptions`      | Opciones aceptadas por `intlayer()`. Extiende `GetConfigurationOptions` con `compatCallers` y `proxy`.            |
| `IntlayerProxyPluginOptions` | Opciones aceptadas por `intlayerProxy()` y `createIntlayerProxyHandler()`. Incluye `ignore` y `configOptions`.    |
| `IntlayerCompilerOptions`    | Opciones aceptadas por `intlayerCompiler()`. Incluye `configOptions` y `compilerConfig`.                          |
| `CompatCallerConfig`         | Re-export desde `@intlayer/babel`. Describe un patrón de caller de compat-adapter para análisis de uso de campos. |
