# Wie Intlayer funktioniert

## Übersicht

Die Hauptidee hinter Intlayer ist die komponentenbasierte Inhaltsverwaltung. Die Idee ist, dass Sie Ihre Inhalte überall in Ihrem Code deklarieren können, z. B. im selben Verzeichnis wie Ihre Komponente.

```bash
.
└── Komponenten
    └── MeineKomponente
        ├── index.content.cjs
        └── index.mjs
```

Dazu hat Intlayer die Aufgabe, alle Ihre `Inhaltsdeklarationsdateien` in allen verschiedenen Formaten, die in Ihrem Projekt vorhanden sind, zu finden und daraus die `Wörterbücher` zu generieren.

Es gibt also zwei Hauptschritte:

- Build-Schritt
- Interpretationsschritt

### Build-Schritt der Wörterbücher

Der Build-Schritt kann auf drei Arten durchgeführt werden:

- Verwendung der CLI mit `npx intlayer build`
- Verwendung der [VSCode-Erweiterung](https://github.com/aymericzip/intlayer/blob/main/docs/de/vs_code_extension.md)
- Verwendung von App-Plugins wie dem [`vite-intlayer`-Paket](https://github.com/aymericzip/intlayer/blob/main/docs/de/packages/vite-intlayer/index.md) oder deren Äquivalenten für [Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/de/packages/next-intlayer/index.md). Wenn Sie eines dieser Plugins verwenden, wird Intlayer Ihre Wörterbücher automatisch erstellen, wenn Sie Ihre Anwendung starten (dev) oder bauen (prod).

1. Deklaration von Inhaltsdateien

   - Inhaltsdateien können in verschiedenen Formaten definiert werden, wie TypeScript, ECMAScript, CommonJS oder JSON.
   - Inhaltsdateien können überall im Projekt definiert werden, was eine bessere Wartung und Skalierbarkeit ermöglicht. Es ist wichtig, die Dateierweiterungskonventionen für Inhaltsdateien zu beachten. Diese Erweiterung ist standardmäßig `*.content.{js|cjs|mjs|ts|tsx|json}`, kann jedoch in der [Konfigurationsdatei](https://github.com/aymericzip/intlayer/blob/main/docs/de/configuration.md) geändert werden.

2. Generierung von `Wörterbüchern`

   - Wörterbücher werden aus Inhaltsdateien generiert. Standardmäßig werden Intlayer-Wörterbücher im Verzeichnis `.intlayer/dictionaries` des Projekts generiert.
   - Diese Wörterbücher werden in verschiedenen Formaten generiert, um alle Anforderungen zu erfüllen und die Leistung der Anwendung zu optimieren.

3. Generierung von Wörterbuchtypen

Basierend auf Ihren `Wörterbüchern` generiert Intlayer Typen, um sie in Ihrer Anwendung nutzbar zu machen.

- Wörterbuchtypen werden aus Intlayer-`Wörterbüchern` generiert. Standardmäßig werden Intlayer-Wörterbuchtypen im Verzeichnis `.intlayer/types` des Projekts generiert.

- Intlayer [Modulerweiterung](https://www.typescriptlang.org/docs/handbook/declaration-merging.html) ist eine TypeScript-Funktion, die es Ihnen ermöglicht, zusätzliche Typen für Intlayer zu definieren. Dies erleichtert die Entwicklungserfahrung, indem verfügbare oder erforderliche Argumente vorgeschlagen werden. Unter den generierten Typen werden Intlayer-Wörterbuchtypen oder sogar Sprachkonfigurationstypen zur Datei `types/intlayer.d.ts` hinzugefügt und von anderen Paketen verwendet. Dazu muss die Datei `tsconfig.json` so konfiguriert sein, dass sie das `types`-Verzeichnis des Projekts einbezieht.

### Interpretationsschritt der Wörterbücher

Mit Intlayer greifen Sie über den `useIntlayer`-Hook auf Ihre Inhalte in Ihrer Anwendung zu.

```tsx
const MeineKomponente = () => {
  const content = useIntlayer("meine-komponente");
  return <div>{content.title}</div>;
};
```

Dieser Hook übernimmt die Lokalisierungserkennung für Sie und gibt die Inhalte für die aktuelle Sprache zurück. Mit diesem Hook können Sie auch Markdown interpretieren, Pluralisierung verwalten und mehr.

> Um alle Funktionen von Intlayer zu sehen, können Sie die [Wörterbuchdokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/de/dictionary/get_started.md) lesen.

## Entfernte Inhalte

Intlayer ermöglicht es Ihnen, Inhalte lokal zu deklarieren und sie dann in das CMS zu exportieren, damit sie von Ihrem nicht-technischen Team bearbeitet werden können.

So können Sie Inhalte ähnlich wie bei Git für Ihren Code vom CMS in Ihre Anwendung pushen und pullen.

Wenn es in Ihrem Projekt konfiguriert ist, verwaltet Intlayer automatisch das Abrufen der Inhalte aus dem CMS, wenn die Anwendung startet (dev) / gebaut wird (prod).

## Visueller Editor

Intlayer bietet auch einen visuellen Editor, mit dem Sie Ihre Inhalte visuell bearbeiten können. Dieser [visuelle Editor](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_visual_editor.md) ist im externen Paket `intlayer-editor` verfügbar.

![visueller Editor](https://github.com/aymericzip/intlayer/blob/main/docs/assets/visual_editor.gif)

## Optimierung des App-Builds

Um die Bundle-Größe Ihrer Anwendung zu optimieren, bietet Intlayer zwei Plugins zur Optimierung des Builds Ihrer Anwendung: `@intlayer/babel` und `@intlayer/swc` Plugins.

Im Entwicklungsmodus verwendet Intlayer einen zentralisierten statischen Import für Wörterbücher, um die Entwicklungserfahrung zu vereinfachen.

Durch die Optimierung des Builds ersetzt Intlayer alle Wörterbuchaufrufe, um das Chunking zu optimieren. So importiert das endgültige Bundle nur die Wörterbücher, die verwendet werden.

Durch Aktivieren der Option `activateDynamicImport` in der [Konfiguration](https://github.com/aymericzip/intlayer/blob/main/docs/de/configuration.md) verwendet Intlayer den dynamischen Import, um die Wörterbücher zu laden. Diese Option ist standardmäßig deaktiviert, um asynchrone Verarbeitung beim Rendern der Anwendung zu vermeiden.

> `@intlayer/babel` ist standardmäßig im `vite-intlayer`-Paket verfügbar,
> `@intlayer/swc` ist standardmäßig nicht im `next-intlayer`-Paket installiert, da SWC-Plugins in Next.js noch experimentell sind.

Um zu sehen, wie Sie den Build Ihrer Anwendung konfigurieren können, lesen Sie die [Konfigurationsdokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/de/configuration.md).

## Pakete

Intlayer besteht aus mehreren Paketen, die jeweils eine spezifische Rolle im Übersetzungsprozess spielen. Hier ist eine grafische Darstellung der Struktur dieses Pakets:

![Pakete von Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/packages_dependency_graph.svg)

### intlayer

Das `intlayer`-Paket wird in Anwendungen verwendet, um Inhalte in Inhaltsdateien zu deklarieren.

### react-intlayer

Das `react-intlayer`-Paket wird verwendet, um Intlayer-Wörterbücher zu interpretieren und in React-Anwendungen nutzbar zu machen.

### next-intlayer

Das `next-intlayer`-Paket wird als Schicht über `react-intlayer` verwendet, um Intlayer-Wörterbücher in Next.js-Anwendungen nutzbar zu machen. Es integriert wesentliche Funktionen, um Intlayer in einer Next.js-Umgebung zum Laufen zu bringen, wie Übersetzungsmiddleware, Routing oder die Konfiguration der Datei `next.config.js`.

### vue-intlayer

Das `vue-intlayer`-Paket wird verwendet, um Intlayer-Wörterbücher zu interpretieren und in Vue-Anwendungen nutzbar zu machen.

### svelte-intlayer (WIP)

Das `svelte-intlayer`-Paket wird verwendet, um Intlayer-Wörterbücher zu interpretieren und in Svelte-Anwendungen nutzbar zu machen.

### solid-intlayer (WIP)

Das `solid-intlayer`-Paket wird verwendet, um Intlayer-Wörterbücher zu interpretieren und in Solid.js-Anwendungen nutzbar zu machen.

### preact-intlayer (WIP)

Das `preact-intlayer`-Paket wird verwendet, um Intlayer-Wörterbücher zu interpretieren und in Preact-Anwendungen nutzbar zu machen.

### angular-intlayer (WIP)

Das `angular-intlayer`-Paket wird verwendet, um Intlayer-Wörterbücher zu interpretieren und in Angular-Anwendungen nutzbar zu machen.

### express-intlayer

Das `express-intlayer`-Paket wird verwendet, um Intlayer auf einem Express.js-Backend zu nutzen.

### react-native-intlayer

Das `react-native-intlayer`-Paket bietet Tools, die Plugins für Intlayer integrieren, um mit dem Metro-Bundler zu arbeiten.

### lynx-intlayer

Das `lynx-intlayer`-Paket bietet Tools, die Plugins für Intlayer integrieren, um mit dem Lynx-Bundler zu arbeiten.

### vite-intlayer

Beinhaltet das Vite-Plugin zur Integration von Intlayer mit dem [Vite-Bundler](https://vite.dev/guide/why.html#why-bundle-for-production) sowie Middleware zur Erkennung der bevorzugten Sprache des Benutzers, Verwaltung von Cookies und Handhabung von URL-Weiterleitungen.

### react-scripts-intlayer

### intlayer-editor

Das `intlayer-editor` Paket wird verwendet, um die Nutzung des visuellen Editors zu ermöglichen. Dieses optionale Paket kann in Anwendungen installiert werden und wird vom `react-intlayer` Paket verwendet.  
Es besteht aus zwei Teilen: dem Server und dem Client.

Der Client enthält UI-Elemente, die von `react-intlayer` verwendet werden.

Der Server, basierend auf Express, wird verwendet, um Anfragen des visuellen Editors zu empfangen und Inhaltsdateien zu verwalten oder zu ändern.

### intlayer-cli

Das `intlayer-cli` Paket kann verwendet werden, um Wörterbücher mit dem Befehl `npx intlayer dictionaries build` zu generieren. Wenn `intlayer` bereits installiert ist, wird die CLI automatisch installiert und dieses Paket ist nicht erforderlich.

### @intlayer/core

Das `@intlayer/core` Paket ist das Hauptpaket von Intlayer. Es enthält Funktionen zur Übersetzung und Wörterbuchverwaltung. `@intlayer/core` ist plattformübergreifend und wird von anderen Paketen verwendet, um Wörterbücher zu interpretieren.

### @intlayer/config

Das `@intlayer/config` Paket wird verwendet, um Intlayer-Einstellungen zu konfigurieren, wie z. B. verfügbare Sprachen, Next.js Middleware-Parameter oder die integrierten Editor-Einstellungen.

### @intlayer/webpack

Das `@intlayer/webpack` Paket wird verwendet, um eine Webpack-Konfiguration bereitzustellen, damit eine auf Webpack basierende Anwendung mit Intlayer funktioniert. Das Paket bietet auch ein Plugin, das zu einer bestehenden Webpack-Anwendung hinzugefügt werden kann.

### @intlayer/cli

Das `@intlayer/cli` Paket ist ein NPM-Paket, das verwendet wird, um Skripte im Zusammenhang mit den Intlayer-Befehlszeilenschnittstellen zu deklarieren. Es stellt die Einheitlichkeit aller Intlayer-CLI-Befehle sicher. Dieses Paket wird insbesondere von den Paketen [intlayer-cli](https://github.com/aymericzip/intlayer/tree/main/docs/de/packages/intlayer-cli/index.md) und [intlayer](https://github.com/aymericzip/intlayer/tree/main/docs/de/packages/intlayer/index.md) verwendet.

### @intlayer/dictionaries-entry & @intlayer/unmerged-dictionaries-entry & @intlayer/dynamic-dictionaries-entry

Die Pakete `@intlayer/dictionaries-entry`, `@intlayer/unmerged-dictionaries-entry` und `@intlayer/dynamic-dictionaries-entry` geben den Einstiegspfad der Intlayer-Wörterbücher zurück. Da das Durchsuchen des Dateisystems vom Browser aus unmöglich ist, ist es nicht möglich, mit Bundlern wie Webpack oder Rollup den Einstiegspfad der Wörterbücher abzurufen. Diese Pakete sind so konzipiert, dass sie aliasiert werden können, was eine Optimierung des Bundlings über verschiedene Bundler wie Vite, Webpack und Turbopack ermöglicht.

### @intlayer/chokidar

Das `@intlayer/chokidar` Paket wird verwendet, um Inhaltsdateien zu überwachen und das geänderte Wörterbuch bei jeder Änderung neu zu generieren.

### @intlayer/editor

Das `@intlayer/editor` Paket stellt die Dienstprogramme bereit, die mit dem Wörterbuch-Editor zusammenhängen. Es enthält insbesondere die API, um eine Anwendung mit dem Intlayer-Editor zu verbinden, sowie Dienstprogramme zur Manipulation von Wörterbüchern. Dieses Paket ist plattformübergreifend.

### @intlayer/editor-react

Das `@intlayer/editor-react` Paket bietet Zustände, Kontexte, Hooks und Komponenten, um eine React-Anwendung mit dem Intlayer-Editor zu verbinden.

### @intlayer/babel

Das `@intlayer/babel` Paket stellt Tools bereit, die das Bundling von Wörterbüchern für Vite- und Webpack-basierte Anwendungen optimieren.

### @intlayer/swc (WIP)

Das `@intlayer/swc` Paket stellt Tools bereit, die das Bundling von Wörterbüchern für Next.js-Anwendungen optimieren.

### @intlayer/api

Das `@intlayer/api` Paket ist ein API-SDK, um mit dem Backend zu interagieren.

### @intlayer/design-system

Das `@intlayer/design-system` Paket wird verwendet, um Designelemente zwischen dem CMS und dem visuellen Editor zu teilen.

### @intlayer/backend

Das `@intlayer/backend` Paket exportiert Backend-Typen und wird in Zukunft das Backend als eigenständiges Paket anbieten.

## Chat mit unserer intelligenten Dokumentation

- [Stellen Sie Ihre Fragen an unsere intelligente Dokumentation](https://intlayer.org/de/docs/chat)
