# Wie Intlayer funktioniert

## Übersicht

Die Rolle von Intlayer ist es, JavaScript-Inhaltserklärungsdateien in Wörterbücher zu interpretieren.

Dazu durchläuft Intlayer mehrere Schritte:

1. Deklaration von Inhaltsdateien

   - Inhaltsdateien können in verschiedenen Formaten definiert werden, wie TypeScript, ECMAScript, CommonJS oder JSON.
   - Inhaltsdateien können überall im Projekt definiert werden, was eine bessere Wartung und Skalierbarkeit ermöglicht. Es ist wichtig, die Konventionen der Dateiendungen für Inhaltsdateien zu beachten. Diese Erweiterung ist standardmäßig `*.content.{js|cjs|mjs|ts|tsx|json}`, kann jedoch in der [Konfigurationsdatei](https://github.com/aymericzip/intlayer/blob/main/docs/de/configuration.md) geändert werden.

2. Generierung von Wörterbüchern

   - Wörterbücher werden aus Inhaltsdateien generiert. Standardmäßig werden die Intlayer-Wörterbücher im Verzeichnis `.intlayer/dictionary` des Projekts generiert.
   - Es können zwei Arten von Wörterbüchern generiert werden: Intlayer-Wörterbücher und i18n-Wörterbücher (Beta).

3. Generierung von Wörterbuchtypen

   - Wörterbuchtypen werden aus Intlayer-Wörterbüchern generiert. Standardmäßig werden die Intlayer-Wörterbuchtypen im Verzeichnis `types` des Projekts generiert.

4. Generierung der Intlayer-Modulerweiterung

   - Die Intlayer [Modulerweiterung](https://www.typescriptlang.org/docs/handbook/declaration-merging.html) ist ein TypeScript-Feature, das es Ihnen ermöglicht, zusätzliche Typen für Intlayer zu definieren. Dies erleichtert die Entwicklungserfahrung, indem verfügbare Argumente oder erforderliche Argumente vorgeschlagen werden.
     Unter den generierten Typen werden die Intlayer-Wörterbuchtypen oder sogar die Spracheinstellungstypen in die Datei `types/intlayer.d.ts` eingefügt und von anderen Paketen verwendet. Dazu ist es notwendig, dass die `tsconfig.json`-Datei so konfiguriert ist, dass sie das Verzeichnis `types` des Projekts einbezieht.

5. Überwachung von Inhaltsdateien

   - Inhaltsdateien werden überwacht, um sie jedes Mal neu zu generieren, wenn sie geändert werden.

6. Interpretation von Wörterbüchern
   - Wörterbücher werden schließlich interpretiert, um in Anwendungen verwendet zu werden.

## Pakete

Intlayer besteht aus mehreren Paketen, von denen jedes eine spezifische Rolle im Übersetzungsprozess hat. Hier ist eine grafische Darstellung der Struktur dieses Pakets:

![Pakete von Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/packages_dependency_graph.svg)

### intlayer

Das `intlayer`-Paket wird in Anwendungen verwendet, um Inhalte in Inhaltsdateien zu deklarieren.

### react-intlayer

Das `react-intlayer`-Paket wird verwendet, um Intlayer-Wörterbücher zu interpretieren und sie in React-Anwendungen nutzbar zu machen.

### next-intlayer

Das `next-intlayer`-Paket wird als Schicht über `react-intlayer` verwendet, um Intlayer-Wörterbücher in Next.js-Anwendungen nutzbar zu machen. Es integriert wesentliche Funktionen, damit Intlayer in einer Next.js-Umgebung funktioniert, wie z.B. Übersetzungsmiddleware, Routing oder die Konfiguration der Datei `next.config.js`.

### intlayer-editor

Das `intlayer-editor`-Paket wird verwendet, um die Verwendung des visuellen Editors zu ermöglichen. Dieses optionale Paket kann in Anwendungen installiert werden und wird vom `react-intlayer`-Paket verwendet.
Es besteht aus zwei Teilen: dem Server und dem Client.

Der Client enthält UI-Elemente, die von `react-intlayer` verwendet werden.

Der Server, basierend auf Express, wird verwendet, um die visualen Anfragen des Editors zu empfangen und Inhaltsdateien zu verwalten oder zu ändern.

### intlayer-cli

Das `intlayer-cli`-Paket kann verwendet werden, um Wörterbücher mit dem Befehl `npx intlayer build` zu generieren. Wenn `intlayer` bereits installiert ist, wird die CLI automatisch installiert und dieses Paket ist nicht erforderlich.

### @intlayer/core

Das `@intlayer/core`-Paket ist das Hauptpaket von Intlayer. Es enthält Funktionen zur Übersetzungs- und Wörterbuchverwaltung. `@intlayer/core` ist multiplattformfähig und wird von anderen Paketen verwendet, um die Interpretation von Wörterbüchern durchzuführen.

### @intlayer/config

Das `@intlayer/config`-Paket wird verwendet, um die Intlayer-Einstellungen zu konfigurieren, wie z.B. verfügbare Sprachen, Parameter der Next.js-Middleware oder die Einstellungen des integrierten Editors.

### @intlayer/webpack

Das `@intlayer/webpack`-Paket wird verwendet, um Kompilierungs-Plugins zu Next.js und React hinzuzufügen.

### @intlayer/cli

Das `@intlayer/cli`-Paket wird verwendet, um die Einheitlichkeit aller Intlayer-CLI-Befehle sicherzustellen.

### @intlayer/dictionaries-entry

Das `@intlayer/dictionaries-entry`-Paket ist ein Paket, das nur den Einstiegspfad der Intlayer-Wörterbücher zurückgibt. Da die Dateisystemsuche vom Browser aus unmöglich ist, ist die Verwendung von Bundlern wie Webpack oder Rollup, um den Einstiegspfad der Wörterbücher abzurufen, nicht möglich. Dieses Paket soll aliasiert werden.

### @intlayer/chokidar

Das `@intlayer/chokidar`-Paket wird verwendet, um Inhaltsdateien zu überwachen und das geänderte Wörterbuch bei jeder Modifikation neu zu generieren.
