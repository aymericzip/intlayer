# Wie Intlayer funktioniert

## Übersicht

Die Rolle von Intlayer besteht darin, JavaScript-Inhaltsdeklarationsdateien in Wörterbücher zu interpretieren.

Dafür durchläuft Intlayer mehrere Schritte:

1. Deklaration von Inhaltsdateien

   - Inhaltsdateien können in verschiedenen Formaten definiert werden, wie TypeScript, ECMAScript, CommonJS oder JSON.
   - Inhaltsdateien können überall im Projekt definiert werden, was eine bessere Wartung und Skalierbarkeit ermöglicht. Es ist wichtig, die Dateierweiterungskonventionen für Inhaltsdateien einzuhalten. Diese Erweiterung ist standardmäßig `*.content.{js|cjs|mjs|ts|tsx|json}`, kann jedoch in der [Konfigurationsdatei](https://github.com/aymericzip/intlayer/blob/main/docs/de/configuration.md) geändert werden.

2. Generierung von Wörterbüchern

   - Wörterbücher werden aus Inhaltsdateien generiert. Standardmäßig werden Intlayer-Wörterbücher im Verzeichnis `.intlayer/dictionary` des Projekts generiert.
   - Es können zwei Arten von Wörterbüchern generiert werden: Intlayer-Wörterbücher und i18n-Wörterbücher (Beta).

3. Generierung von Wörterbuchtypen

   - Wörterbuchtypen werden aus Intlayer-Wörterbüchern generiert. Standardmäßig werden Intlayer-Wörterbuchtypen im Verzeichnis `types` des Projekts generiert.

4. Generierung der Intlayer-Modulerweiterung

   - Die Intlayer-[Modulerweiterung](https://www.typescriptlang.org/docs/handbook/declaration-merging.html) ist eine TypeScript-Funktion, die es ermöglicht, zusätzliche Typen für Intlayer zu definieren. Dies erleichtert die Entwicklungserfahrung, indem verfügbare Argumente oder erforderliche Argumente vorgeschlagen werden.
     Unter den generierten Typen werden Intlayer-Wörterbuchtypen oder sogar Sprachkonfigurationstypen zur Datei `types/intlayer.d.ts` hinzugefügt und von anderen Paketen verwendet. Dazu muss die Datei `tsconfig.json` so konfiguriert sein, dass sie das Verzeichnis `types` des Projekts einbezieht.

5. Überwachung von Inhaltsdateien

   - Inhaltsdateien werden überwacht, um bei jeder Änderung neu generiert zu werden.

6. Interpretation der Wörterbücher
   - Wörterbücher werden schließlich interpretiert, um in Anwendungen verwendet zu werden.

## Pakete

Intlayer besteht aus mehreren Paketen, die jeweils eine spezifische Rolle im Übersetzungsprozess spielen. Hier ist eine grafische Darstellung der Struktur dieses Pakets:

![Pakete von Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/packages_dependency_graph.svg)

### intlayer

Das Paket `intlayer` wird in Anwendungen verwendet, um Inhalte in Inhaltsdateien zu deklarieren.

### react-intlayer

Das Paket `react-intlayer` wird verwendet, um Intlayer-Wörterbücher zu interpretieren und sie in React-Anwendungen nutzbar zu machen.

### next-intlayer

Das Paket `next-intlayer` wird als Schicht über `react-intlayer` verwendet, um Intlayer-Wörterbücher in Next.js-Anwendungen nutzbar zu machen. Es integriert wesentliche Funktionen, um Intlayer in einer Next.js-Umgebung zum Laufen zu bringen, wie Übersetzungsmiddleware, Routing oder die Konfiguration der Datei `next.config.js`.

### vite-intlayer

Enthält das Vite-Plugin zur Integration von Intlayer mit dem [Vite-Bundler](https://vite.dev/guide/why.html#why-bundle-for-production) sowie Middleware zur Erkennung der bevorzugten Sprache des Benutzers, Verwaltung von Cookies und Handhabung von URL-Weiterleitungen.

### react-scripts-intlayer

Enthält die Befehle und Plugins `react-scripts-intlayer` zur Integration von Intlayer in auf Create React App basierende Anwendungen. Diese Plugins basieren auf [craco](https://craco.js.org/) und enthalten zusätzliche Konfigurationen für den [Webpack](https://webpack.js.org/) Bundler.

### intlayer-editor

Das Paket `intlayer-editor` wird verwendet, um die Nutzung des visuellen Editors zu ermöglichen. Dieses Paket ist optional und kann in Anwendungen installiert werden und wird vom Paket `react-intlayer` verwendet.
Es besteht aus zwei Teilen: dem Server und dem Client.

Der Client enthält UI-Elemente, die von `react-intlayer` verwendet werden.

Der Server, basierend auf Express, wird verwendet, um die visuellen Anfragen des Editors zu empfangen und Inhaltsdateien zu verwalten oder zu ändern.

### intlayer-cli

Das Paket `intlayer-cli` kann verwendet werden, um Wörterbücher mit dem Befehl `npx intlayer dictionaries build` zu generieren. Wenn `intlayer` bereits installiert ist, wird die CLI automatisch installiert und dieses Paket ist nicht erforderlich.

### @intlayer/core

Das Paket `@intlayer/core` ist das Hauptpaket von Intlayer. Es enthält Funktionen zur Übersetzung und Wörterbuchverwaltung. `@intlayer/core` ist plattformübergreifend und wird von anderen Paketen verwendet, um Wörterbücher zu interpretieren.

### @intlayer/config

Das Paket `@intlayer/config` wird verwendet, um Intlayer-Einstellungen zu konfigurieren, wie verfügbare Sprachen, Next.js-Middleware-Parameter oder die integrierten Editor-Einstellungen.

### @intlayer/webpack

Das Paket `@intlayer/webpack` wird verwendet, um eine Webpack-Konfiguration bereitzustellen, die eine Webpack-basierte Anwendung mit Intlayer zum Laufen bringt. Das Paket bietet auch ein Plugin, das in eine bestehende Webpack-Anwendung integriert werden kann.

### @intlayer/cli

Das Paket `@intlayer/cli` ist ein NPM-Paket, das verwendet wird, um die Skripte im Zusammenhang mit den Intlayer-Befehlszeilenschnittstellen zu deklarieren. Es stellt die Einheitlichkeit aller Intlayer-CLI-Befehle sicher. Dieses Paket wird insbesondere von den Paketen [intlayer-cli](https://github.com/aymericzip/intlayer/tree/main/docs/de/packages/intlayer-cli/index.md) und [intlayer](https://github.com/aymericzip/intlayer/tree/main/docs/de/packages/intlayer/index.md) verwendet.

### @intlayer/dictionaries-entry

Das Paket `@intlayer/dictionaries-entry` ist ein Paket, das nur den Einstiegspfad der Intlayer-Wörterbücher zurückgibt. Da die Dateisystemsuche vom Browser aus unmöglich ist, ist es nicht möglich, mit Bundlern wie Webpack oder Rollup den Einstiegspfad der Wörterbücher abzurufen. Dieses Paket soll aliasiert werden.

### @intlayer/chokidar

Das Paket `@intlayer/chokidar` wird verwendet, um Inhaltsdateien zu überwachen und das geänderte Wörterbuch bei jeder Änderung neu zu generieren.

### @intlayer/editor

Das Paket `@intlayer/editor` bietet die Dienstprogramme im Zusammenhang mit dem Wörterbucheditor. Es enthält insbesondere die API, um eine Anwendung mit dem Intlayer-Editor zu verbinden, und Dienstprogramme zur Manipulation von Wörterbüchern. Dieses Paket ist plattformübergreifend.

### @intlayer/editor-react

Das Paket `@intlayer/editor-react` bietet Zustände, Kontexte, Hooks und Komponenten, um eine React-Anwendung mit dem Intlayer-Editor zu verbinden.

## Chat mit unserer smarten Dokumentation

- [Stellen Sie Ihre Fragen an unsere smarte Dokumentation](https://intlayer.org/docs/chat)
