---
docName: package__vite-intlayer
url: https://intlayer.org/doc/packages/vite-intlayer
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/vite-intlayer/index.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: Paketdokumentation | vite-intlayer
description: Erfahren Sie, wie Sie das vite-intlayer-Paket verwenden
keywords:
  - Intlayer
  - vite-intlayer
  - Internationalisierung
  - Dokumentation
  - Next.js
  - JavaScript
  - React
---

# vite-intlayer: NPM-Paket zur Internationalisierung (i18n) einer Vite-Anwendung

**Intlayer** ist eine Suite von Paketen, die speziell für JavaScript-Entwickler entwickelt wurde. Es ist kompatibel mit Frameworks wie React, React und Express.js.

**Das `vite-intlayer`-Paket** ermöglicht es Ihnen, Ihre Vite-Anwendung zu internationalisieren. Es enthält das Vite-Plugin, um die Konfiguration über Umgebungsvariablen im [Vite-Bundler](https://vitejs.dev/guide/why.html#why-bundle-for-production) festzulegen. Es bietet auch Middleware, um die bevorzugte Sprache des Benutzers zu erkennen und den Benutzer auf die entsprechende URL weiterzuleiten, wie in der [Konfiguration](https://github.com/aymericzip/intlayer/blob/main/docs/de/configuration.md) angegeben.

## Warum Ihre Vite-Anwendung internationalisieren?

Die Internationalisierung Ihrer Vite-Anwendung ist entscheidend, um ein globales Publikum effektiv zu bedienen. Sie ermöglicht es Ihrer Anwendung, Inhalte und Nachrichten in der bevorzugten Sprache jedes Benutzers bereitzustellen. Diese Fähigkeit verbessert die Benutzererfahrung und erweitert die Reichweite Ihrer Anwendung, indem sie für Menschen aus verschiedenen sprachlichen Hintergründen zugänglicher und relevanter wird.

## Konfiguration

Das `vite-intlayer`-Paket funktioniert nahtlos mit dem [`react-intlayer`-Paket](https://github.com/aymericzip/intlayer/blob/main/docs/de/packages/react-intlayer/index.md) und dem [`intlayer`-Paket](https://github.com/aymericzip/intlayer/blob/main/docs/de/packages/intlayer/index.md). Schauen Sie sich die entsprechende Dokumentation für weitere Informationen an.

## Installation

Installieren Sie das erforderliche Paket mit Ihrem bevorzugten Paketmanager:

```bash packageManager="npm"
npm install vite-intlayer
```

```bash packageManager="yarn"
yarn add vite-intlayer
```

```bash packageManager="pnpm"
pnpm add vite-intlayer
```

## Beispiel für die Nutzung

Sehen Sie ein Beispiel, wie die Plugins in Ihre Vite-Konfiguration eingebunden werden können.

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayerPlugin, intLayerMiddlewarePlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

> Das `intlayerPlugin()` Vite-Plugin wird verwendet, um Intlayer mit Vite zu integrieren. Es stellt sicher, dass Inhaltsdeklarationsdateien erstellt und im Entwicklungsmodus überwacht werden. Es definiert Intlayer-Umgebungsvariablen innerhalb der Vite-Anwendung. Zusätzlich bietet es Aliase zur Optimierung der Leistung.

> Das `intLayerMiddlewarePlugin()` fügt serverseitiges Routing zu Ihrer Anwendung hinzu. Dieses Plugin erkennt automatisch die aktuelle Sprache basierend auf der URL und setzt das entsprechende Sprach-Cookie. Wenn keine Sprache angegeben ist, bestimmt das Plugin die am besten geeignete Sprache basierend auf den Spracheinstellungen des Browsers des Benutzers. Wenn keine Sprache erkannt wird, wird auf die Standardsprache umgeleitet.

## Beherrschen der Internationalisierung Ihrer Vite-Anwendung

Intlayer bietet viele Funktionen, um Ihnen bei der Internationalisierung Ihrer Vite-Anwendung zu helfen.

**Um mehr über diese Funktionen zu erfahren, lesen Sie den [React-Internationalisierungsleitfaden (i18n) mit Intlayer und Vite und React](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_with_vite+react.md) für Vite- und React-Anwendungen.**
