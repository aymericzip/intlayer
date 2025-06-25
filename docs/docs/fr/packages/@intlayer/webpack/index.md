# @intlayer/webpack : Package NPM pour utiliser le plugin Intlayer Webpack dans votre application

**Intlayer** est une suite de packages conçue spécifiquement pour les développeurs JavaScript. Elle est compatible avec des frameworks comme React, React et Express.js.

Le package **`@intlayer/webpack`** est utilisé pour fournir une configuration Webpack afin de faciliter le travail avec une application basée sur Webpack avec Intlayer. Le package fournit également un plugin à ajouter dans une application Webpack existante.

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

Installez le package nécessaire en utilisant votre gestionnaire de packages préféré :

```bash packageManager="npm"
npm install @intlayer/webpack
```

```bash packageManager="pnpm"
pnpm add @intlayer/webpack
```

```bash packageManager="yarn"
yarn add @intlayer/webpack
```
