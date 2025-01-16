# vite-intlayer: NPM-Paket zur Internationalisierung (i18n) einer Vite-Anwendung

**Intlayer** ist eine Suite von Paketen, die speziell für JavaScript-Entwickler entwickelt wurde. Es ist kompatibel mit Frameworks wie React, React und Express.js.

**Das `vite-intlayer`-Paket** ermöglicht es Ihnen, Ihre Vite-Anwendung zu internationalisieren. Es umfasst das Vite-Plugin, um die Konfiguration über Umgebungsvariablen in den [Vite-Bundler](https://vitejs.dev/guide/why.html#why-bundle-for-production) einzustellen. Es bietet auch Middleware, um die bevorzugte Sprache des Benutzers zu erkennen und den Benutzer an die entsprechende URL weiterzuleiten, wie in der [Konfiguration](https://github.com/aymericzip/intlayer/blob/main/docs/de/configuration.md) angegeben.

## Warum Ihre Vite-Anwendung internationalisieren?

Die Internationalisierung Ihrer Vite-Anwendung ist entscheidend, um ein globales Publikum effektiv zu bedienen. Sie ermöglicht es Ihrer Anwendung, Inhalte und Nachrichten in der bevorzugten Sprache jedes Benutzers zu liefern. Diese Fähigkeit verbessert das Benutzererlebnis und erweitert die Reichweite Ihrer Anwendung, indem sie zugänglicher und relevanter für Menschen aus unterschiedlichen Sprachhintergründen wird.

## Konfiguration

Das `vite-intlayer`-Paket funktioniert nahtlos mit dem [`react-intlayer`-Paket](https://github.com/aymericzip/intlayer/blob/main/docs/de/packages/react-intlayer/index.md) und dem [`intlayer`-Paket](https://github.com/aymericzip/intlayer/blob/main/docs/de/packages/intlayer/index.md). Werfen Sie einen Blick auf die relevante Dokumentation für weitere Informationen.

## Installation

Installieren Sie das benötigte Paket mit Ihrem bevorzugten Paketmanager:

```bash packageManager="npm"
npm install vite-intlayer
```

```bash packageManager="yarn"
yarn add vite-intlayer
```

```bash packageManager="pnpm"
pnpm add vite-intlayer
```

## Beispiel für die Verwendung

Hier ist ein Beispiel dafür, wie Sie die Plugins in Ihre Vite-Konfiguration einfügen können.

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayerPlugin, intLayerMiddlewarePlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

> Das `intlayerPlugin()` Vite-Plugin wird verwendet, um Intlayer mit Vite zu integrieren. Es gewährleistet den Aufbau von Inhaltsdeklarationsdateien und überwacht sie im Entwicklungsmodus. Es definiert Intlayer-Umgebungsvariablen innerhalb der Vite-Anwendung. Darüber hinaus bietet es Aliase, um die Leistung zu optimieren.

> Das `intLayerMiddlewarePlugin()` fügt Ihrer Anwendung serverseitiges Routing hinzu. Dieses Plugin erkennt automatisch die aktuelle Sprache basierend auf der URL und setzt das entsprechende Sprachcookie. Wenn keine Sprache angegeben ist, bestimmt das Plugin die am besten geeignete Sprache basierend auf den Spracheinstellungen des Browsers des Benutzers. Wenn keine Sprache erkannt wird, wird zur Standardsprache umgeleitet.

## Beherrschung der Internationalisierung Ihrer Vite-Anwendung

Intlayer bietet viele Funktionen, die Ihnen helfen, Ihre Vite-Anwendung zu internationalisieren.

**Um mehr über diese Funktionen zu erfahren, lesen Sie den Leitfaden [React-Internationalisierung (i18n) mit Intlayer und Vite und React](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_with_vite+react.md) für Vite- und React-Anwendungen.**
