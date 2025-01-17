# @intlayer/webpack : paquet NPM pour utiliser le Plugin Intlayer Webpack dans votre application

**Intlayer** est une suite de paquets conçus spécifiquement pour les développeurs JavaScript. Il est compatible avec des frameworks comme React, React, et Express.js.

Le paquet **`@intlayer/webpack`** est utilisé pour fournir une configuration Webpack afin de travailler avec une application basée sur Webpack avec Intlayer. Le paquet fournit également un plugin à ajouter dans une application Webpack existante.

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

Installez le paquet nécessaire en utilisant votre gestionnaire de paquets préféré :

```bash packageManager="npm"
npm install @intlayer/webpack
```

```bash packageManager="pnpm"
pnpm add @intlayer/webpack
```

```bash packageManager="yarn"
yarn add @intlayer/webpack
```
