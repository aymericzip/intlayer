---
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: @intlayer/webpack - Webpack-Plugin für Intlayer i18n
description: NPM-Paket, das Webpack-Konfiguration und Plugin für nahtlose Integration der Intlayer-Internationalisierung in Webpack-basierte Anwendungen bereitstellt.
keywords:
  - intlayer
  - webpack
  - plugin
  - konfiguration
  - i18n
  - JavaScript
  - NPM
  - bundler
slugs:
  - doc
  - package
  - @intlayer_webpack
---

# @intlayer/webpack: NPM-Paket zur Verwendung des Intlayer Webpack-Plugins in Ihrer Anwendung

**Intlayer** ist eine Suite von Paketen, die speziell für JavaScript-Entwickler entwickelt wurden. Es ist kompatibel mit Frameworks wie React, React und Express.js.

Das **`@intlayer/webpack`**-Paket wird verwendet, um eine Webpack-Konfiguration bereitzustellen, die das Arbeiten mit einer auf Webpack basierenden Anwendung mit Intlayer ermöglicht. Das Paket stellt außerdem ein Plugin zur Verfügung, das in eine bestehende Webpack-Anwendung integriert werden kann.

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

Installieren Sie das notwendige Paket mit Ihrem bevorzugten Paketmanager:

```bash packageManager="npm"
npm install @intlayer/webpack
```

```bash packageManager="pnpm"
pnpm add @intlayer/webpack
```

```bash packageManager="yarn"
yarn add @intlayer/webpack
```

## Dokumentationsverlauf

- 5.5.10 - 2025-06-29: Initialer Verlauf
