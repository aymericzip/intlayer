---
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: @intlayer/webpack - Plugin Webpack pour Intlayer i18n
description: Package NPM fournissant une configuration Webpack et un plugin pour une intégration transparente de l'internationalisation Intlayer avec les applications basées sur Webpack.
keywords:
  - intlayer
  - webpack
  - plugin
  - configuration
  - i18n
  - JavaScript
  - NPM
  - bundler
slugs:
  - doc
  - package
  - @intlayer_webpack
---

# @intlayer/webpack : Package NPM pour utiliser le plugin Webpack Intlayer dans votre application

**Intlayer** est une suite de packages conçue spécifiquement pour les développeurs JavaScript. Elle est compatible avec des frameworks comme React, React, et Express.js.

Le package **`@intlayer/webpack`** est utilisé pour fournir une configuration Webpack afin de faciliter le travail avec une application basée sur Webpack utilisant Intlayer. Le package fournit également un plugin à intégrer dans une application Webpack existante.

## Utilisation

```ts
import { IntlayerPlugin } from "@intlayer/webpack";

export default {
  plugins: [
    new IntlayerPlugin({
      // Options
    }),
  ],
};
```

## Installation

Installez le package nécessaire en utilisant votre gestionnaire de paquets préféré :

```bash packageManager="npm"
npm install @intlayer/webpack
```

```bash packageManager="pnpm"
pnpm add @intlayer/webpack
```

```bash packageManager="yarn"
yarn add @intlayer/webpack
```

## Historique de la documentation

- 5.5.10 - 2025-06-29 : Historique initial
