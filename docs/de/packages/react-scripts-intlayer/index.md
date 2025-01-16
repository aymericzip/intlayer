# react-scripts-intlayer: NPM-Paket zur Verwendung von Intlayer in einer React Create App-Anwendung

**Intlayer** ist eine Suite von Paketen, die speziell für JavaScript-Entwickler entwickelt wurden. Es ist kompatibel mit Frameworks wie React, React und Express.js.

**Das `react-scripts-intlayer` Paket** enthält die `react-scripts-intlayer` Befehle und Plugins zur Integration von Intlayer in die auf Create React App basierende Anwendung. Diese Plugins basieren auf [craco](https://craco.js.org/) und beinhalten zusätzliche Konfiguration für den [Webpack](https://webpack.js.org/) Bundler.

## Konfiguration

Das `react-scripts-intlayer` Paket funktioniert nahtlos mit dem [`react-intlayer` Paket](https://github.com/aymericzip/intlayer/blob/main/docs/de/packages/react-intlayer/index.md) und dem [`intlayer` Paket](https://github.com/aymericzip/intlayer/blob/main/docs/de/packages/intlayer/index.md). Werfen Sie einen Blick auf die relevante Dokumentation für weitere Informationen.

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

### CLI Befehle

Das `react-scripts-intlayer` Paket bietet die folgenden CLI-Befehle:

- `npx react-scripts-intlayer build`: Baut die React-Anwendung mit der Intlayer-Konfiguration.
- `npx react-scripts-intlayer start`: Startet den Entwicklungsserver mit der Intlayer-Konfiguration.

### Ersetzen Sie die package.json-Skripte

Um das `react-scripts-intlayer` Paket zu verwenden, müssen Sie die Skripte in der `package.json` mit den folgenden Befehlen ersetzen:

```json fileName="package.json"
{
  "scripts": {
    "start": "react-scripts-intlayer start",
    "build": "react-scripts-intlayer build"
  }
}
```

## Verwenden Sie eine benutzerdefinierte Webpack-Konfiguration

`react-scripts-intlayer` basiert auf [craco](https://craco.js.org/), das es Ihnen ermöglicht, die Webpack-Konfiguration anzupassen.
Wenn Sie die Webpack-Konfiguration anpassen müssen, können Sie auch Ihr eigenes Setup basierend auf dem Intlayer Craco-Plugin implementieren. [Siehe Beispiel hier](https://github.com/aymericzip/intlayer/blob/main/examples/react-app/craco.config.js).

## Lesen Sie den vollständigen Intlayer-Leitfaden für React Create App

Intlayer bietet viele Funktionen, um Ihnen bei der Internationalisierung Ihrer React-Anwendung zu helfen.
[Erfahren Sie, wie Sie Intlayer mit Create React App verwenden](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_with_create_react_app.md).
