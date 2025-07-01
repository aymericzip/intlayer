---
docName: package__react-native-intlayer
url: https://intlayer.org/doc/packages/react-native-intlayer
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/react-native-intlayer/index.md
createdAt: 2025-03-13
updatedAt: 2025-06-29
title: Paketdokumentation | react-native-intlayer
description: Siehe, wie man das react-native-intlayer Paket verwendet
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

# react-native-intlayer: Internationalisieren (i18n) einer React Native Anwendung

**Intlayer** ist eine Suite von Paketen, die speziell für JavaScript-Entwickler entwickelt wurden. Es ist kompatibel mit Frameworks wie React, React und Express.js.

**Das `react-native-intlayer` Paket** ermöglicht es Ihnen, Ihre Vite-Anwendung zu internationalisieren. Es beinhaltet das Metro-Plugin, um die Konfiguration über Umgebungsvariablen im [Metro Bundler](https://docs.expo.dev/guides/customizing-metro/) festzulegen.

## Warum sollten Sie Ihre React Native Anwendung internationalisieren?

Die Internationalisierung Ihrer React Native Anwendung ist entscheidend, um ein globales Publikum effektiv zu bedienen. Sie ermöglicht es Ihrer Anwendung, Inhalte und Nachrichten in der bevorzugten Sprache jedes Nutzers bereitzustellen. Diese Fähigkeit verbessert die Benutzererfahrung und erweitert die Reichweite Ihrer Anwendung, indem sie für Menschen aus verschiedenen sprachlichen Hintergründen zugänglicher und relevanter wird.

## Konfiguration

Das `react-native-intlayer` Paket arbeitet nahtlos mit dem [`react-intlayer` Paket](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/react-intlayer/index.md) und dem [`intlayer` Paket](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/intlayer/index.md) zusammen. Schauen Sie sich die entsprechende Dokumentation für weitere Informationen an.

## Installation

Installieren Sie das notwendige Paket mit Ihrem bevorzugten Paketmanager:

```bash packageManager="npm"
npm install react-native-intlayer
```

```bash packageManager="yarn"
yarn add react-native-intlayer
```

```bash packageManager="pnpm"
pnpm add react-native-intlayer
```

## Anwendungsbeispiel

Sehen Sie ein Beispiel, wie Sie die Plugins in Ihre Vite-Konfiguration einbinden.

```js
// metro.config.js
const { getDefaultConfig } = require("expo/metro-config");
const { configMetroIntlayer } = require("react-native-intlayer/metro");

module.exports = (async () => {
  const defaultConfig = getDefaultConfig(__dirname);

  return await configMetroIntlayer(defaultConfig);
})();
```

## Die Internationalisierung Ihrer Vite-Anwendung meistern

Intlayer bietet viele Funktionen, die Ihnen helfen, Ihre Vite-Anwendung zu internationalisieren.

**Um mehr über diese Funktionen zu erfahren, lesen Sie den Leitfaden [React Internationalization (i18n) mit Intlayer und React Native](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_react_native+expo.md) für React Native Anwendungen.**

## Mehr über Intlayer erfahren

- [Intlayer Webseite](https://intlayer.org)
- [Intlayer Dokumentation](https://intlayer.org/doc)
- [Intlayer GitHub](https://github.com/aymericzip/intlayer)

- [Stellen Sie Ihre Fragen an unsere intelligente Dokumentation](https://intlayer.org/docchat)

## Dokumentationsverlauf

- 5.5.10 - 2025-06-29: Initiale Historie
