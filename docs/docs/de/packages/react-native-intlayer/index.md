---
docName: package__react-native-intlayer
url: https://intlayer.org/doc/packages/react-native-intlayer
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/react-native-intlayer/index.md
createdAt: 2025-03-13
updatedAt: 2025-03-13
title: Paketdokumentation | react-native-intlayer
description: Erfahren Sie, wie Sie das react-native-intlayer-Paket verwenden
keywords:
  - Intlayer
  - React Native
  - react-native-intlayer
  - Internationalisierung
  - Dokumentation
  - Next.js
  - JavaScript
  - React
---

**Intlayer** ist eine Suite von Paketen, die speziell für JavaScript-Entwickler entwickelt wurde. Es ist kompatibel mit Frameworks wie React, React und Express.js.

**Das `react-native-intlayer` Paket** ermöglicht es Ihnen, Ihre Vite-Anwendung zu internationalisieren. Es enthält das Metro-Plugin, um die Konfiguration über Umgebungsvariablen im [Metro-Bundler](https://docs.expo.dev/guides/customizing-metro/) festzulegen.

## Warum Ihre React Native Anwendung internationalisieren?

Die Internationalisierung Ihrer React Native Anwendung ist entscheidend, um ein globales Publikum effektiv zu bedienen. Sie ermöglicht es Ihrer Anwendung, Inhalte und Nachrichten in der bevorzugten Sprache jedes Benutzers bereitzustellen. Diese Fähigkeit verbessert die Benutzererfahrung und erweitert die Reichweite Ihrer Anwendung, indem sie für Menschen aus verschiedenen sprachlichen Hintergründen zugänglicher und relevanter wird.

## Konfiguration

Das `react-native-intlayer` Paket funktioniert nahtlos mit dem [`react-intlayer` Paket](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/react-intlayer/index.md) und dem [`intlayer` Paket](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/intlayer/index.md). Schauen Sie sich die entsprechende Dokumentation für weitere Informationen an.

## Installation

Installieren Sie das erforderliche Paket mit Ihrem bevorzugten Paketmanager:

```bash packageManager="npm"
npm install react-native-intlayer
```

```bash packageManager="yarn"
yarn add react-native-intlayer
```

```bash packageManager="pnpm"
pnpm add react-native-intlayer
```

## Beispiel für die Nutzung

Sehen Sie ein Beispiel, wie Sie die Plugins in Ihre Vite-Konfiguration einbinden können.

```js
// metro.config.js
const { getDefaultConfig } = require("expo/metro-config");
const { configMetroIntlayer } = require("react-native-intlayer/metro");

module.exports = (async () => {
  const defaultConfig = getDefaultConfig(__dirname);

  return await configMetroIntlayer(defaultConfig);
})();
```

## Beherrschen der Internationalisierung Ihrer Vite-Anwendung

Intlayer bietet viele Funktionen, die Ihnen helfen, Ihre Vite-Anwendung zu internationalisieren.

**Um mehr über diese Funktionen zu erfahren, lesen Sie den [React Internationalisierung (i18n) mit Intlayer und React Native](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_react_native+expo.md) Leitfaden für React Native Anwendungen.**

## Lesen Sie mehr über Intlayer

- [Intlayer Website](https://intlayer.org)
- [Intlayer Dokumentation](https://intlayer.org/doc)
- [Intlayer GitHub](https://github.com/aymericzip/intlayer)

- [Stellen Sie Ihre Fragen an unsere intelligente Dokumentation](https://intlayer.org/docchat)
