# @intlayer/chokidar: NPM-Paket zum Scannen und Erstellen von Intlayer-Deklarationsdateien in Wörterbücher

**Intlayer** ist eine Suite von Paketen, die speziell für JavaScript-Entwickler entwickelt wurde. Es ist kompatibel mit Frameworks wie React, React und Express.js.

Das **`@intlayer/chokidar`**-Paket wird verwendet, um Intlayer-Deklarationsdateien mit [chokidar](https://github.com/paulmillr/chokidar) zu scannen und in Wörterbücher zu erstellen, gemäß der [Intlayer-Konfiguration](https://github.com/aymericzip/intlayer/blob/main/docs/de/configuration.md).

## Verwendung

```ts
import { watch } from "@intlayer/chokidar";

watch(); // Erstelle Intlayer-Wörterbücher

// Oder

watch({ persistent: true }); // Überwachungsmodus
```

## Installation

Installieren Sie das notwendige Paket mit Ihrem bevorzugten Paketmanager:

```bash packageManager="npm"
npm install @intlayer/chokidar
```

```bash packageManager="pnpm"
pnpm add @intlayer/chokidar
```

```bash packageManager="yarn"
yarn add @intlayer/chokidar
```
