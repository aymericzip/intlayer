---
docName: package__react-scripts-intlayer
url: https://intlayer.org/doc/packages/react-scripts-intlayer
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/react-scripts-intlayer/index.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Paketdokumentation | react-scripts-intlayer
description: Siehe, wie das react-scripts-intlayer Paket verwendet wird
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

**Intlayer** ist eine Sammlung von Paketen, die speziell für JavaScript-Entwickler entwickelt wurden. Es ist kompatibel mit Frameworks wie React, React und Express.js.

**Das `react-scripts-intlayer` Paket** beinhaltet die `react-scripts-intlayer` Befehle und Plugins zur Integration von Intlayer in eine auf Create React App basierende Anwendung. Diese Plugins basieren auf [craco](https://craco.js.org/) und enthalten zusätzliche Konfigurationen für den [Webpack](https://webpack.js.org/) Bundler.

## Konfiguration

Das `react-scripts-intlayer` Paket arbeitet nahtlos mit dem [`react-intlayer` Paket](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/react-intlayer/index.md) und dem [`intlayer` Paket](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/intlayer/index.md) zusammen. Siehe die entsprechende Dokumentation für weitere Informationen.

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

Das `react-scripts-intlayer` Paket stellt die folgenden CLI-Befehle bereit:

- `npx react-scripts-intlayer build`: Baut die React-Anwendung mit der Intlayer-Konfiguration.
- `npx react-scripts-intlayer start`: Startet den Entwicklungsserver mit der Intlayer-Konfiguration.

### Ersetzen der package.json Skripte

Um das `react-scripts-intlayer` Paket zu verwenden, müssen Sie die Skripte in der `package.json` durch die folgenden Befehle ersetzen:

```json fileName="package.json"
{
  "scripts": {
    "start": "react-scripts-intlayer start",
    "build": "react-scripts-intlayer build"
  }
}
```

## Benutzerdefinierte Webpack-Konfiguration verwenden

`react-scripts-intlayer` basiert auf [craco](https://craco.js.org/), das es Ihnen ermöglicht, die Webpack-Konfiguration anzupassen.
Wenn Sie die Webpack-Konfiguration anpassen müssen, können Sie auch Ihre eigene Einrichtung basierend auf dem intlayer craco Plugin implementieren. [Siehe Beispiel hier](https://github.com/aymericzip/intlayer/blob/main/examples/react-app/craco.config.js).

## Lesen Sie die vollständige Intlayer-Anleitung für React Create App

Intlayer bietet viele Funktionen, um Ihnen bei der Internationalisierung Ihrer React-Anwendung zu helfen.
[Siehe, wie man intlayer mit React Create App verwendet](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_create_react_app.md).

## Dokumentationsverlauf

- 5.5.10 - 2025-06-29: Initialer Verlauf
