---
docName: package__react-scripts-intlayer
url: https://intlayer.org/doc/packages/react-scripts-intlayer
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/react-scripts-intlayer/index.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Paketdokumentation | react-scripts-intlayer
description: Erfahren Sie, wie Sie das react-scripts-intlayer-Paket verwenden
keywords:
  - Intlayer
  - react-scripts-intlayer
  - Internationalisierung
  - Dokumentation
  - Next.js
  - JavaScript
  - React
---

# react-scripts-intlayer: NPM-Paket zur Verwendung von Intlayer in einer React Create App-Anwendung

**Intlayer** ist eine Suite von Paketen, die speziell für JavaScript-Entwickler entwickelt wurden. Es ist kompatibel mit Frameworks wie React, React und Express.js.

**Das `react-scripts-intlayer`-Paket** enthält die `react-scripts-intlayer`-Befehle und Plugins zur Integration von Intlayer in eine auf Create React App basierende Anwendung. Diese Plugins basieren auf [craco](https://craco.js.org/) und beinhalten zusätzliche Konfigurationen für den [Webpack](https://webpack.js.org/) Bundler.

## Konfiguration

Das `react-scripts-intlayer`-Paket funktioniert nahtlos mit dem [`react-intlayer`-Paket](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/react-intlayer/index.md) und dem [`intlayer`-Paket](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/intlayer/index.md). Schauen Sie sich die entsprechende Dokumentation für weitere Informationen an.

## Installation

Installieren Sie das notwendige Paket mit Ihrem bevorzugten Paketmanager:

```bash packageManager="npm"
npm install react-scripts-intlayer
```

```bash packageManager="yarn"
yarn add react-scripts-intlayer
```

```bash packageManager="pnpm"
pnpm add react-scripts-intlayer
```

## Verwendung

### CLI-Befehle

Das `react-scripts-intlayer`-Paket bietet die folgenden CLI-Befehle:

- `npx react-scripts-intlayer build`: Baut die React-Anwendung mit der Intlayer-Konfiguration.
- `npx react-scripts-intlayer start`: Startet den Entwicklungsserver mit der Intlayer-Konfiguration.

### Ersetzen der package.json-Skripte

Um das `react-scripts-intlayer`-Paket zu verwenden, müssen Sie die `package.json`-Skripte durch die folgenden Befehle ersetzen:

```json fileName="package.json"
{
  "scripts": {
    "start": "react-scripts-intlayer start",
    "build": "react-scripts-intlayer build"
  }
}
```

## Eigene Webpack-Konfiguration verwenden

`react-scripts-intlayer` basiert auf [craco](https://craco.js.org/), das es Ihnen ermöglicht, die Webpack-Konfiguration anzupassen.
Wenn Sie die Webpack-Konfiguration anpassen müssen, können Sie auch Ihre eigene Einrichtung basierend auf dem Intlayer-Craco-Plugin implementieren. [Beispiel hier ansehen](https://github.com/aymericzip/intlayer/blob/main/examples/react-app/craco.config.js).

## Lesen Sie den vollständigen Intlayer-Leitfaden für React Create App

Intlayer bietet viele Funktionen, um Ihnen bei der Internationalisierung Ihrer React-Anwendung zu helfen.
[Sehen Sie, wie Sie Intlayer mit React Create App verwenden können](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_create_react_app.md).
