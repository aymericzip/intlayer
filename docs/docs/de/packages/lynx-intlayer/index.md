---
createdAt: 2025-03-13
updatedAt: 2025-06-29
title: Paketdokumentation | lynx-intlayer
description: Sehen Sie, wie das lynx-intlayer-Paket verwendet wird
keywords:
  - Intlayer
  - lynx-intlayer
  - Internationalisierung
  - Dokumentation
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - lynx-intlayer
---

# lynx-intlayer: Internationalisierung (i18n) einer Lynx-Anwendung

**Intlayer** ist eine Sammlung von Paketen, die speziell für JavaScript-Entwickler entwickelt wurden. Es ist kompatibel mit Frameworks wie React, React und Express.js.

**Das `lynx-intlayer`-Paket** ermöglicht es Ihnen, Ihre Vite-Anwendung zu internationalisieren. Es enthält das Metro-Plugin, um die Konfiguration über Umgebungsvariablen in den [Lynx-Bundler](https://lynxjs.org/index.html) einzubinden.

## Warum sollten Sie Ihre Lynx-Anwendung internationalisieren?

Die Internationalisierung Ihrer Lynx-Anwendung ist entscheidend, um ein globales Publikum effektiv zu bedienen. Sie ermöglicht es Ihrer Anwendung, Inhalte und Nachrichten in der bevorzugten Sprache jedes Benutzers bereitzustellen. Diese Fähigkeit verbessert die Benutzererfahrung und erweitert die Reichweite Ihrer Anwendung, indem sie für Menschen aus verschiedenen sprachlichen Hintergründen zugänglicher und relevanter wird.

## Konfiguration

Das `lynx-intlayer`-Paket arbeitet nahtlos mit dem [`react-intlayer`-Paket](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/react-intlayer/index.md) und dem [`intlayer`-Paket](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/intlayer/index.md) zusammen. Werfen Sie einen Blick in die entsprechende Dokumentation für weitere Informationen.

## Installation

Installieren Sie das notwendige Paket mit Ihrem bevorzugten Paketmanager:

```bash packageManager="npm"
npm install lynx-intlayer
```

```bash packageManager="yarn"
yarn add lynx-intlayer
```

```bash packageManager="pnpm"
pnpm add lynx-intlayer
```

## Anwendungsbeispiel

Sehen Sie ein Beispiel, wie Sie die Plugins in Ihre Vite-Konfiguration einbinden.

```ts
// lynx.config.ts
import { defineConfig } from "@lynx-js/rspeedy";
import { pluginIntlayerLynx } from "lynx-intlayer/plugin";

export default defineConfig({
  plugins: [
    // ... andere Plugins
    pluginIntlayerLynx(),
  ],
});
```

## Die Internationalisierung Ihrer Vite-Anwendung meistern

Intlayer bietet viele Funktionen, die Ihnen helfen, Ihre Vite-Anwendung zu internationalisieren.

**Um mehr über diese Funktionen zu erfahren, lesen Sie den Leitfaden [React Internationalisierung (i18n) mit Intlayer und Lynx](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_lynx+react.md) für Lynx-Anwendungen.**

## Lesen Sie mehr über Intlayer

- [Intlayer Webseite](https://intlayer.org)
- [Intlayer Dokumentation](https://intlayer.org/doc)
- [Intlayer GitHub](https://github.com/aymericzip/intlayer)

- [Stellen Sie Ihre Fragen an unsere intelligente Dokumentation](https://intlayer.org/doc/chat)

## Dokumentationsverlauf

- 5.5.10 - 29.06.2025: Historie initialisiert
