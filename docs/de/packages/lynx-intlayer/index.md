**Intlayer** ist eine Suite von Paketen, die speziell für JavaScript-Entwickler entwickelt wurde. Es ist kompatibel mit Frameworks wie React, React und Express.js.

**Das `lynx-intlayer`-Paket** ermöglicht es Ihnen, Ihre Vite-Anwendung zu internationalisieren. Es enthält das Metro-Plugin, um die Konfiguration über Umgebungsvariablen im [Lynx-Bundler](https://lynxjs.org/index.html) festzulegen.

## Warum Ihre Lynx-Anwendung internationalisieren?

Die Internationalisierung Ihrer Lynx-Anwendung ist entscheidend, um ein globales Publikum effektiv zu erreichen. Sie ermöglicht es Ihrer Anwendung, Inhalte und Nachrichten in der bevorzugten Sprache jedes Benutzers bereitzustellen. Diese Fähigkeit verbessert die Benutzererfahrung und erweitert die Reichweite Ihrer Anwendung, indem sie für Menschen aus verschiedenen sprachlichen Hintergründen zugänglicher und relevanter wird.

## Konfiguration

Das `lynx-intlayer`-Paket arbeitet nahtlos mit dem [`react-intlayer`-Paket](https://github.com/aymericzip/intlayer/blob/main/docs/de/packages/react-intlayer/index.md) und dem [`intlayer`-Paket](https://github.com/aymericzip/intlayer/blob/main/docs/de/packages/intlayer/index.md) zusammen. Schauen Sie sich die entsprechende Dokumentation für weitere Informationen an.

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

## Beispiel für die Nutzung

Sehen Sie ein Beispiel, wie die Plugins in Ihre Vite-Konfiguration eingebunden werden können.

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

## Beherrschen der Internationalisierung Ihrer Vite-Anwendung

Intlayer bietet viele Funktionen, um Ihnen bei der Internationalisierung Ihrer Vite-Anwendung zu helfen.

**Um mehr über diese Funktionen zu erfahren, lesen Sie den [React-Internationalisierung (i18n) mit Intlayer und Lynx](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_with_lynx+react.md)-Leitfaden für Lynx-Anwendungen.**

## Lesen Sie mehr über Intlayer

- [Intlayer Website](https://intlayer.org)
- [Intlayer Dokumentation](https://intlayer.org/doc)
- [Intlayer GitHub](https://github.com/aymericzip/intlayer)

- [Stellen Sie Ihre Fragen an unsere intelligente Dokumentation](https://intlayer.org/docchat)
