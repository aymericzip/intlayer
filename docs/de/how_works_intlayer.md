# Wie Intlayer funktioniert

## Übersicht

Die Rolle von Intlayer besteht darin, JavaScript-Inhaltsdeklarationsdateien in Wörterbücher zu interpretieren.

Dafür durchläuft Intlayer mehrere Schritte:

1. Deklaration von Inhaltsdateien

   - Inhaltsdateien können in verschiedenen Formaten definiert werden, wie TypeScript, ECMAScript, CommonJS oder JSON.
   - Inhaltsdateien können überall im Projekt definiert werden, was eine bessere Wartbarkeit und Skalierbarkeit ermöglicht. Es ist wichtig, die Dateierweiterung für Inhaltsdateien zu beachten. Diese Erweiterung ist standardmäßig `*.content.{js|cjs|mjs|ts|tsx|json}`, kann jedoch in der [Konfigurationsdatei](https://github.com/aymericzip/intlayer/blob/main/docs/de/configuration.md) geändert werden.

2. Generierung von Wörterbüchern

   - Wörterbücher werden aus Inhaltsdateien generiert. Standardmäßig werden die Intlayer-Wörterbücher im Verzeichnis `.intlayer/dictionary` des Projekts generiert.
   - Es können zwei Arten von Wörterbüchern generiert werden: Intlayer-Wörterbücher und i18n-Wörterbücher (Beta).

3. Generierung von Wörterbuchtypen

   - Wörterbuchtypen werden aus Intlayer-Wörterbüchern generiert. Standardmäßig werden die Intlayer-Wörterbuchtypen im Verzeichnis `types` des Projekts generiert.

4. Generierung der Intlayer-Modulerweiterung

   - Die Intlayer [Modulerweiterung](https://www.typescriptlang.org/docs/handbook/declaration-merging.html) ist eine TypeScript-Funktion, die es ermöglicht, zusätzliche Typen für Intlayer zu definieren. Dies erleichtert die Entwicklung, indem verfügbare Argumente oder erforderliche Argumente vorgeschlagen werden.
     Zu den generierten Typen gehören die Typen des Intlayer-Wörterbuchs oder sogar Typen der Sprachkonfigurationen, die in die Datei `types/intlayer.d.ts` eingefügt werden und von anderen Paketen verwendet werden. Dazu ist es notwendig, dass die Datei `tsconfig.json` so konfiguriert ist, dass sie das Verzeichnis `types` des Projekts einbezieht.

5. Überwachung von Inhaltsdateien

   - Inhaltsdateien werden überwacht, um bei jeder Änderung neu generiert zu werden.

6. Interpretation von Wörterbüchern
   - Wörterbücher werden schließlich interpretiert, um in Anwendungen verwendet zu werden.

## Pakete

Intlayer besteht aus mehreren Paketen, von denen jedes eine spezifische Rolle im Übersetzungsprozess hat. Hier ist eine grafische Darstellung der Struktur dieses Pakets:

![packages of intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/packages_dependency_graph.svg)

### intlayer

Das `intlayer` Paket wird in Anwendungen verwendet, um Inhalte in Inhaltsdateien zu deklarieren.

### react-intlayer

Das `react-intlayer` Paket wird verwendet, um Intlayer-Wörterbücher zu interpretieren und in React-Anwendungen nutzbar zu machen.

### next-intlayer

Das `next-intlayer` Paket wird als Schicht über `react-intlayer` verwendet, um Intlayer-Wörterbücher in Next.js-Anwendungen nutzbar zu machen. Es integriert wesentliche Funktionen, um Intlayer in einer Next.js-Umgebung zu betreiben, wie Übersetzungsmiddleware, Routing oder die Konfiguration der Datei `next.config.js`.

### vite-intlayer

Beinhaltet das Vite-Plugin zur Integration von Intlayer mit dem [Vite-Bundler](https://vite.dev/guide/why.html#why-bundle-for-production), sowie Middleware zur Erkennung der bevorzugten Sprache des Benutzers, zur Verwaltung von Cookies und zur Handhabung der URL-Umleitung.

### react-scripts-intlayer

Beinhaltet die `react-scripts-intlayer`-Befehle und Plugins zur Integration von Intlayer mit einer auf Create React App basierenden Anwendung. Diese Plugins basieren auf [craco](https://craco.js.org/) und enthalten zusätzliche Konfigurationen für den [Webpack](https://webpack.js.org/) Bundler.

### intlayer-editor

Das `intlayer-editor` Paket wird verwendet, um die Verwendung des visuellen Editors zu ermöglichen. Dieses optionale Paket kann in Anwendungen installiert werden und wird vom `react-intlayer` Paket verwendet.
Es besteht aus zwei Teilen: dem Server und dem Client.

Der Client enthält UI-Elemente, die von `react-intlayer` verwendet werden.

Der Server, basierend auf Express, wird verwendet, um die visuellen Anforderungen des Editors zu empfangen und Inhaltsdateien zu verwalten oder zu ändern.

### intlayer-cli

Das `intlayer-cli` Paket kann verwendet werden, um Wörterbücher mit dem Befehl `npx intlayer build` zu generieren. Wenn `intlayer` bereits installiert ist, wird die CLI automatisch installiert und dieses Paket ist nicht erforderlich.

### @intlayer/core

Das `@intlayer/core` Paket ist das Hauptpaket von Intlayer. Es enthält Funktionen zur Übersetzungs- und Wörterbuchverwaltung. `@intlayer/core` ist plattformübergreifend und wird von anderen Paketen zur Interpretation von Wörterbüchern verwendet.

### @intlayer/config

Das `@intlayer/config` Paket wird verwendet, um die Einstellungen von Intlayer zu konfigurieren, wie verfügbare Sprachen, Next.js-Middlewareparameter oder die integrierten Editor-Einstellungen.

### @intlayer/webpack

Das `@intlayer/webpack` Paket wird verwendet, um eine Webpack-Konfiguration bereitzustellen, um die Arbeit einer auf Webpack basierenden Anwendung mit Intlayer zu ermöglichen. Das Paket bietet auch ein Plugin, das in eine bestehende Webpack-Anwendung eingefügt werden kann.

### @intlayer/cli

Das `@intlayer/cli` Paket ist ein NPM-Paket, das verwendet wird, um die Skripte im Zusammenhang mit den Befehlszeilenoberflächen von Intlayer zu deklarieren. Es sichert die Einheitlichkeit aller Intlayer-CLI-Befehle. Dieses Paket wird insbesondere vom [intlayer-cli](https://github.com/aymericzip/intlayer/tree/main/docs/de/packages/intlayer-cli/index.md) und vom [intlayer](https://github.com/aymericzip/intlayer/tree/main/docs/de/packages/intlayer/index.md) Paket konsumiert.

### @intlayer/dictionaries-entry

Das `@intlayer/dictionaries-entry` Paket ist ein Paket, das nur den Einstiegspfad der Intlayer-Wörterbücher zurückgibt. Da die Dateisystemsuche vom Browser aus unmöglich ist, ist es nicht möglich, mithilfe von Bundlern wie Webpack oder Rollup den Einstiegspfad der Wörterbücher abzurufen. Dieses Paket soll aliasiert werden.

### @intlayer/chokidar

Das `@intlayer/chokidar` Paket wird verwendet, um Inhaltsdateien zu überwachen und das modifizierte Wörterbuch bei jeder Änderung neu zu generieren.

## Chatte mit unserer intelligenten Dokumentation

- [Stellen Sie Ihre Fragen an unsere intelligente Dokumentation](https://intlayer.org/docs/chat)
