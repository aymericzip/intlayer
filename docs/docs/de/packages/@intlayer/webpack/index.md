# @intlayer/webpack: NPM-Paket zur Verwendung des Intlayer Webpack-Plugins in Ihrer Anwendung

**Intlayer** ist eine Suite von Paketen, die speziell für JavaScript-Entwickler entwickelt wurde. Es ist kompatibel mit Frameworks wie React, React und Express.js.

Das **`@intlayer/webpack`**-Paket wird verwendet, um eine Webpack-Konfiguration bereitzustellen, die das Arbeiten mit einer auf Webpack basierenden Anwendung mit Intlayer erleichtert. Das Paket bietet auch ein Plugin, das in eine bestehende Webpack-Anwendung integriert werden kann.

## Verwendung

```ts
import { IntlayerPlugin } from "@intlayer/webpack";

export default {
  plugins: [
    new IntlayerPlugin({
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
