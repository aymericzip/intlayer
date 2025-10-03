---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Paketdokumentation | vite-intlayer
description: Siehe, wie man das vite-intlayer Paket verwendet
keywords:
  - Intlayer
  - vite-intlayer
  - Internationalisierung
  - Dokumentation
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - vite-intlayer
---

# vite-intlayer: NPM-Paket zur Internationalisierung (i18n) einer Vite-Anwendung

**Intlayer** ist eine Suite von Paketen, die speziell für JavaScript-Entwickler entwickelt wurden. Es ist kompatibel mit Frameworks wie React, React und Express.js.

**Das `vite-intlayer` Paket** ermöglicht es Ihnen, Ihre Vite-Anwendung zu internationalisieren. Es beinhaltet das Vite-Plugin, um die Konfiguration über Umgebungsvariablen in den [Vite-Bundler](https://vitejs.dev/guide/why.html#why-bundle-for-production) einzustellen. Außerdem stellt es Middleware bereit, um die bevorzugte Sprache des Benutzers zu erkennen und den Benutzer auf die entsprechende URL umzuleiten, wie in der [Konfiguration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md) angegeben.

## Warum sollten Sie Ihre Vite-Anwendung internationalisieren?

Die Internationalisierung Ihrer Vite-Anwendung ist entscheidend, um ein globales Publikum effektiv zu bedienen. Sie ermöglicht es Ihrer Anwendung, Inhalte und Nachrichten in der bevorzugten Sprache jedes Benutzers bereitzustellen. Diese Fähigkeit verbessert die Benutzererfahrung und erweitert die Reichweite Ihrer Anwendung, indem sie für Menschen aus verschiedenen sprachlichen Hintergründen zugänglicher und relevanter wird.

## Konfiguration

Das `vite-intlayer` Paket arbeitet nahtlos mit dem [`react-intlayer` Paket](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/react-intlayer/index.md) und dem [`intlayer` Paket](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/intlayer/index.md) zusammen. Schauen Sie sich die entsprechende Dokumentation für weitere Informationen an.

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

## Anwendungsbeispiel

Sehen Sie ein Beispiel, wie Sie die Plugins in Ihre Vite-Konfiguration einbinden.

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer, intlayerMiddleware } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [intlayer(), intlayerMiddleware()],
});
```

> Das `intlayer()` Vite-Plugin wird verwendet, um Intlayer in Vite zu integrieren. Es sorgt für den Aufbau von Inhaltsdeklarationsdateien und überwacht diese im Entwicklungsmodus. Es definiert Intlayer-Umgebungsvariablen innerhalb der Vite-Anwendung. Zusätzlich stellt es Aliase bereit, um die Leistung zu optimieren.

> Das `intlayerMiddleware()` fügt Ihrer Anwendung serverseitiges Routing hinzu. Dieses Plugin erkennt automatisch die aktuelle Sprache basierend auf der URL und setzt das entsprechende Sprach-Cookie. Wenn keine Sprache angegeben ist, bestimmt das Plugin die am besten geeignete Sprache basierend auf den Spracheinstellungen des Browsers des Benutzers. Wenn keine Sprache erkannt wird, erfolgt eine Weiterleitung zur Standardsprache.

## Beherrschen der Internationalisierung Ihrer Vite-Anwendung

Intlayer bietet viele Funktionen, die Ihnen helfen, Ihre Vite-Anwendung zu internationalisieren.

**Um mehr über diese Funktionen zu erfahren, lesen Sie den Leitfaden [React Internationalization (i18n) mit Intlayer und Vite und React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_vite+react.md) für Vite- und React-Anwendungen.**

## Dokumentationshistorie

- 5.5.10 - 2025-06-29: Initiale Historie
