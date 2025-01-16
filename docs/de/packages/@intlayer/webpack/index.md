# @intlayer/webpack: NPM-Paket zur Verwendung des Intlayer Webpack Plugins in Ihrer Anwendung

**Intlayer** ist eine Suite von Paketen, die speziell für JavaScript-Entwickler entwickelt wurde. Es ist mit Frameworks wie React, React und Express.js kompatibel.

Das **`@intlayer/webpack`** Paket wird verwendet, um eine Webpack-Konfiguration bereitzustellen, um mit einer auf Webpack basierenden Anwendung mit Intlayer zu arbeiten. Das Paket bietet auch ein Plugin, das in eine vorhandene Webpack-Anwendung hinzugefügt werden kann.

## Verwendung

```ts
import { IntLayerPlugin } from "@intlayer/webpack";

export default {
  plugins: [
    new IntLayerPlugin({
      // Optionen
    }),
  ],
};
```

## Installation

Installieren Sie das erforderliche Paket mit Ihrem bevorzugten Paketmanager:

```bash packageManager="npm"
npm install @intlayer/webpack
```

```bash packageManager="pnpm"
pnpm add @intlayer/webpack
```

```bash packageManager="yarn"
yarn add @intlayer/webpack
```
