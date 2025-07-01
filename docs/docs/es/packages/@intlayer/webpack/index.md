---
docName: package__@intlayer_webpack
url: https://intlayer.org/doc/package/@intlayer_webpack
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/@intlayer/webpack/index.md
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: @intlayer/webpack - Plugin de Webpack para la internacionalización de Intlayer
description: Paquete NPM que proporciona configuración y plugin de Webpack para una integración fluida de la internacionalización de Intlayer con aplicaciones basadas en Webpack.
keywords:
  - intlayer
  - webpack
  - plugin
  - configuración
  - i18n
  - JavaScript
  - NPM
  - bundler
---

# @intlayer/webpack: Paquete NPM para usar el Plugin de Webpack de Intlayer en tu aplicación

**Intlayer** es un conjunto de paquetes diseñados específicamente para desarrolladores de JavaScript. Es compatible con frameworks como React, React y Express.js.

El paquete **`@intlayer/webpack`** se utiliza para proporcionar una configuración de Webpack que facilite el trabajo con una aplicación basada en Webpack junto con Intlayer. El paquete también proporciona un plugin para agregar a una aplicación Webpack existente.

## Uso

```ts
import { IntlayerPlugin } from "@intlayer/webpack";

export default {
  plugins: [
    new IntlayerPlugin({
      // Opciones
    }),
  ],
};
```

## Instalación

Instale el paquete necesario usando su gestor de paquetes preferido:

```bash packageManager="npm"
npm install @intlayer/webpack
```

```bash packageManager="pnpm"
pnpm add @intlayer/webpack
```

```bash packageManager="yarn"
yarn add @intlayer/webpack
```

## Historial de Documentación

- 5.5.10 - 2025-06-29: Historial inicial
