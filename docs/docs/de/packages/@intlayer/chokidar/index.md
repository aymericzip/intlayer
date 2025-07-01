---
docName: package__@intlayer_chokidar
url: https://intlayer.org/doc/package/@intlayer_chokidar
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/@intlayer/chokidar/index.md
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: @intlayer/chokidar - Dateiüberwachung für Intlayer i18n
description: NPM-Paket, das Dateiüberwachungsfunktionen für Intlayer bereitstellt und automatische Updates sowie Hot Reloading für Internationalisierungsinhalte ermöglicht.
keywords:
  - intlayer
  - chokidar
  - Dateiüberwachung
  - Hot Reload
  - i18n
  - JavaScript
  - NPM
  - Entwicklung
---

# @intlayer/chokidar: NPM-Paket zum Scannen und Erstellen von Intlayer-Deklarationsdateien in Wörterbücher

**Intlayer** ist eine Sammlung von Paketen, die speziell für JavaScript-Entwickler entwickelt wurden. Es ist kompatibel mit Frameworks wie React, React und Express.js.

Das **`@intlayer/chokidar`**-Paket wird verwendet, um Intlayer-Deklarationsdateien mit [chokidar](https://github.com/paulmillr/chokidar) zu scannen und in Wörterbücher umzuwandeln, und zwar gemäß der [Intlayer-Konfiguration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md).

## Verwendung

```ts
import { watch, prepareIntlayer } from "@intlayer/chokidar";

await prepareIntlayer(); // Intlayer-Wörterbücher erstellen

watch({ persistent: true }); // Änderungen in den Konfigurationsdateien überwachen
```

## Installation

Installieren Sie das erforderliche Paket mit Ihrem bevorzugten Paketmanager:

```bash packageManager="npm"
bash packageManager="npm"
npm install @intlayer/chokidar
```

```bash packageManager="pnpm"
pnpm add @intlayer/chokidar
```

```bash packageManager="yarn"
yarn add @intlayer/chokidar
```

## Dokumentationshistorie

- 5.5.10 - 2025-06-29: Historie initialisiert
