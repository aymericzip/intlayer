# @intlayer/chokidar: NPM-Paket zum Scannen und Erstellen von Intlayer-Deklarationsdateien in Wörterbücher

**Intlayer** ist eine Suite von Paketen, die speziell für JavaScript-Entwickler entwickelt wurde. Es ist kompatibel mit Frameworks wie React, React und Express.js.

Das **`@intlayer/chokidar`**-Paket wird verwendet, um Intlayer-Deklarationsdateien in Wörterbücher zu scannen und zu erstellen, indem [chokidar](https://github.com/paulmillr/chokidar) und die [Intlayer-Konfiguration](https://github.com/aymericzip/intlayer/blob/main/docs/de/configuration.md) verwendet werden.

## Verwendung

```ts
import { watch, prepareIntlayer } from "@intlayer/chokidar";

await prepareIntlayer(); // Intlayer-Wörterbücher erstellen

watch({ persistent: true }); // Änderungen in den Konfigurationsdateien überwachen
```

## Installation

Installieren Sie das erforderliche Paket mit Ihrem bevorzugten Paketmanager:

```bash packageManager="npm"
npm install @intlayer/chokidar
```

```bash packageManager="pnpm"
pnpm add @intlayer/chokidar
```

```bash packageManager="yarn"
yarn add @intlayer/chokidar
```
