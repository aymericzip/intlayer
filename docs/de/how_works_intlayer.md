# Wie Intlayer funktioniert

## Übersicht

Die Rolle von Intlayer ist es, JavaScript-Inhaltsdeklarationsdateien in Wörterbücher zu interpretieren.

Dazu durchläuft Intlayer mehrere Schritte:

1. Deklaration von Inhaltsdateien

   - Inhaltsdateien können in verschiedenen Formaten definiert werden, wie TypeScript, ECMAScript, CommonJS oder JSON.
   - Inhaltsdateien können überall im Projekt definiert werden, was eine bessere Wartung und Skalierbarkeit ermöglicht. Es ist wichtig, die Dateierweiterungskonventionen für Inhaltsdateien zu beachten. Diese Erweiterung ist standardmäßig `*.content.{js|cjs|mjs|ts|tsx|json}`, kann aber in der [Konfigurationsdatei](https://github.com/aymericzip/intlayer/blob/main/docs/de/configuration.md) geändert werden.

2. Generierung von Wörterbüchern

   - Wörterbücher werden aus Inhaltsdateien generiert. Standardmäßig werden die Intlayer-Wörterbücher im Verzeichnis `.intlayer/dictionary` des Projekts generiert.
   - Es können zwei Arten von Wörterbüchern generiert werden: Intlayer-Wörterbücher und i18n-Wörterbücher (Beta).

3. Generierung von Wörterbuchtypen

   - Wörterbuchtypen werden aus Intlayer-Wörterbüchern generiert. Standardmäßig werden die Intlayer-Wörterbuchtypen im Verzeichnis `.intlayer/types` des Projekts generiert.

4. Generierung der Intlayer-Modulerweiterung

   - Die Intlayer [Modulerweiterung](https://www.typescriptlang.org/docs/handbook/declaration-merging.html) ist eine TypeScript-Funktion, die es Ihnen ermöglicht, zusätzliche Typen für Intlayer zu definieren. Dies erleichtert die Entwicklungserfahrung, indem verfügbare Argumente oder erforderliche Argumente vorgeschlagen werden.
     Unter den generierten Typen werden Intlayer-Wörterbuchtypen oder sogar Sprachkonfigurationstypen zur Datei `types/intlayer.d.ts` hinzugefügt und von anderen Paketen verwendet. Dazu muss die Datei `tsconfig.json` so konfiguriert werden, dass das Verzeichnis `.intlayer/types` des Projekts eingeschlossen ist.

5. Überwachung von Inhaltsdateien

   - Inhaltsdateien werden überwacht, um bei jeder Änderung neu generiert zu werden.

6. Wörterbuchinterpretation
   - Wörterbücher werden schließlich interpretiert, um in Anwendungen verwendet zu werden.

## Pakete

Intlayer besteht aus mehreren Paketen, die jeweils eine spezifische Rolle im Übersetzungsprozess spielen. Hier ist eine grafische Darstellung der Struktur dieses Pakets:

![packages of intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/packages_dependency_graph.svg)

### intlayer

Das `intlayer`-Paket wird in Anwendungen verwendet, um Inhalte in Inhaltsdateien zu deklarieren.

### react-intlayer

Das `react-intlayer`-Paket wird verwendet, um Intlayer-Wörterbücher zu interpretieren und diese in React-Anwendungen nutzbar zu machen.

### next-intlayer

Das `next-intlayer`-Paket wird als Schicht über `react-intlayer` verwendet, um Intlayer-Wörterbücher in Next.js-Anwendungen nutzbar zu machen. Es integriert wesentliche Funktionen, um Intlayer in einer Next.js-Umgebung funktionsfähig zu machen, wie Übersetzungsmiddleware, Routing oder die Konfiguration der `next.config.js`-Datei.

### intlayer-editor

Das `intlayer-editor`-Paket wird verwendet, um die Verwendung des visuellen Editors zu ermöglichen. Dieses optionale Paket kann in Anwendungen installiert werden und wird vom `react-intlayer`-Paket verwendet.
Es besteht aus zwei Teilen: dem Server und dem Client.

Der Client enthält UI-Elemente, die von `react-intlayer` verwendet werden.

Der Server, basierend auf Express, wird verwendet, um die visuellen Anfragen des Editors zu empfangen und Inhaltsdateien zu verwalten oder zu ändern.

### intlayer-cli

Das `intlayer-cli`-Paket kann verwendet werden, um Wörterbücher mit dem Befehl `npx intlayer build` zu generieren. Wenn `intlayer` bereits installiert ist, wird die CLI automatisch installiert und dieses Paket ist nicht erforderlich.

### @intlayer/core

Das `@intlayer/core`-Paket ist das Hauptpaket von Intlayer. Es enthält Funktionen zur Übersetzungs- und Wörterbuchverwaltung. `@intlayer/core` ist multiplattformfähig und wird von anderen Paketen zur Durchführung der Wörterbuchinterpretation verwendet.

### @intlayer/config

Das `@intlayer/config`-Paket wird verwendet, um die Intlayer-Einstellungen zu konfigurieren, wie verfügbare Sprachen, Next.js-Middlewareparameter oder die Einstellungen des integrierten Editors.

### @intlayer/webpack

Das `@intlayer/webpack`-Paket wird verwendet, um Kompilierungs-Plugins zu Next.js und React hinzuzufügen.

### @intlayer/cli

Das `@intlayer/cli`-Paket wird verwendet, um die Einheitlichkeit aller Intlayer-CLI-Befehle sicherzustellen.

### @intlayer/dictionaries-entry

Das `@intlayer/dictionaries-entry`-Paket ist ein Paket, das nur den Einstiegspfad der Intlayer-Wörterbücher zurückgibt. Da die Dateisystemsuche vom Browser aus unmöglich ist, ist es nicht möglich, Bundler wie Webpack oder Rollup zu verwenden, um den Einstiegspfad der Wörterbücher abzurufen. Dieses Paket soll aliasiert werden.

### @intlayer/chokidar

Das `@intlayer/chokidar`-Paket wird verwendet, um Inhaltsdateien zu überwachen und das modifizierte Wörterbuch bei jeder Änderung neu zu generieren.
