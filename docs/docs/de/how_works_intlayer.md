---
createdAt: 2024-08-12
updatedAt: 2026-08-30
title: Wie Intlayer funktioniert
description: Erfahren Sie, wie Intlayer intern funktioniert. Verstehen Sie die Architektur und die Komponenten, die Intlayer leistungsstark machen.
keywords:
  - Intlayer
  - Wie es funktioniert
  - Architektur
  - Komponenten
  - Interne Abläufe
slugs:
  - doc
  - concept
  - how-works-intlayer
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "Initialer Verlauf"
author: aymericzip
---

# Wie Intlayer funktioniert

## Inhaltsverzeichnis

<TOC/>

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
- Verwendung der [VSCode-Erweiterung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/vs_code_extension.md)
- Verwendung von App-Plugins wie dem [`vite-intlayer`-Paket](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/vite-intlayer/index.md) oder deren Äquivalenten für [Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/next-intlayer/index.md). Wenn Sie eines dieser Plugins verwenden, wird Intlayer Ihre Wörterbücher automatisch erstellen, wenn Sie Ihre Anwendung starten (dev) oder bauen (prod).

1. Deklaration von Inhaltsdateien
   - Inhaltsdateien können in verschiedenen Formaten definiert werden, wie TypeScript, ECMAScript, CommonJS oder JSON.
   - Inhaltsdateien können überall im Projekt definiert werden, was eine bessere Wartung und Skalierbarkeit ermöglicht. Es ist wichtig, die Dateierweiterungskonventionen für Inhaltsdateien zu beachten. Diese Erweiterung ist standardmäßig `*.content.{js|cjs|mjs|ts|tsx|json}`, kann jedoch in der [Konfigurationsdatei](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md) geändert werden.

2. Generierung von `Wörterbüchern`
   - Wörterbücher werden aus Inhaltsdateien generiert. Standardmäßig werden Intlayer-Wörterbücher im Verzeichnis `.intlayer/dictionaries` des Projekts generiert.
   - Diese Wörterbücher werden in verschiedenen Formaten generiert, um alle Anforderungen zu erfüllen und die Leistung der Anwendung zu optimieren.

3. Generierung von Dictionary-Typen

4. Generierung von Wörterbuchtypen
   Basierend auf Ihren `Wörterbüchern` generiert Intlayer Typen, um sie in Ihrer Anwendung nutzbar zu machen.

- Wörterbuchtypen werden aus Intlayer-`Content-Deklarationsdateien` generiert. Standardmäßig werden Intlayer-Wörterbuchtypen im Verzeichnis `.intlayer/types` des Projekts generiert.

- Intlayer [Modulerweiterung](https://www.typescriptlang.org/docs/handbook/declaration-merging.html) ist eine TypeScript-Funktion, die es Ihnen ermöglicht, zusätzliche Typen für Intlayer zu definieren. Dies erleichtert die Entwicklungserfahrung, indem verfügbare oder erforderliche Argumente vorgeschlagen werden.
  Unter den generierten Typen werden Intlayer-Wörterbuchtypen oder sogar Sprachkonfigurationstypen zur Datei `types/intlayer.d.ts` hinzugefügt und von anderen Paketen verwendet. Dazu muss die Datei `tsconfig.json` so konfiguriert sein, dass sie das `types`-Verzeichnis des Projekts einbezieht.

### Interpretationsschritt der Wörterbücher

Mit Intlayer greifen Sie über den `useIntlayer`-Hook auf Ihre Inhalte in Ihrer Anwendung zu.

```tsx
const MeineKomponente = () => {
  const content = useIntlayer("meine-komponente");
  return <div>{content.title}</div>;
};
```

Dieser Hook übernimmt die Lokalisierungserkennung für Sie und gibt die Inhalte für die aktuelle Sprache zurück. Mit diesem Hook können Sie auch Markdown interpretieren, Pluralisierung verwalten und mehr.

> Um alle Funktionen von Intlayer zu sehen, können Sie die [Wörterbuchdokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/content_file.md) lesen.

## Entfernte Inhalte

Intlayer ermöglicht es Ihnen, Inhalte lokal zu deklarieren und sie dann in das CMS zu exportieren, damit sie von Ihrem nicht-technischen Team bearbeitet werden können.

So können Sie Inhalte ähnlich wie bei Git für Ihren Code vom CMS in Ihre Anwendung pushen und pullen.

Für externalisierte Wörterbücher, die das CMS verwenden, führt Intlayer eine einfache Abrufoperation durch, um entfernte Wörterbücher abzurufen und mit Ihren lokalen zu verschmelzen. Wenn in Ihrem Projekt konfiguriert, verwaltet Intlayer automatisch das Abrufen der Inhalte aus dem CMS, wenn die Anwendung startet (dev) oder gebaut wird (prod).

## Visueller Editor

Intlayer bietet auch einen visuellen Editor, mit dem Sie Ihre Inhalte visuell bearbeiten können. Dieser [visuelle Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_visual_editor.md) ist im externen Paket `intlayer-editor` verfügbar.

![visueller Editor](https://github.com/aymericzip/intlayer/blob/main/docs/assets/visual_editor.gif?raw=true)

- Der Server ist eine einfache Express-Anwendung, die Anfragen vom Client entgegennimmt und den Inhalt Ihrer Anwendung, wie die `dictionaries` und die Konfiguration, abruft, um sie auf der Client-Seite zugänglich zu machen.
- Der Client hingegen ist eine React-Anwendung, die verwendet wird, um mit Ihren Inhalten über eine visuelle Oberfläche zu interagieren.
  Wenn Sie Ihre Inhalte mit `useIntlayer` aufrufen und der Editor aktiviert ist, werden Ihre Strings automatisch mit einem Proxy-Objekt namens `IntlayerNode` umschlossen. Dieses Node verwendet `window.postMessage`, um mit einem eingebetteten iframe zu kommunizieren, das die Oberfläche des visuellen Editors enthält.  
  Auf der Editor-Seite hört der Editor auf diese Nachrichten und simuliert eine echte Interaktion mit Ihren Inhalten, sodass Sie den Text direkt im Kontext Ihrer Anwendung bearbeiten können.

Wenn Sie Ihren Inhalt mit `useIntlayer` aufrufen und der Editor aktiviert ist, werden Ihre Strings automatisch mit einem Proxy-Objekt namens `IntlayerNode` umhüllt. Dieser Node verwendet `window.postMessage`, um mit einem eingebetteten iframe zu kommunizieren, das die visuelle Editor-Oberfläche enthält.
Auf der Editor-Seite lauscht der Editor auf diese Nachrichten und simuliert reale Interaktionen mit Ihrem Inhalt, sodass Sie Text direkt im Kontext Ihrer Anwendung bearbeiten können.

## Optimierung des App-Builds

Um die Bundle-Größe Ihrer Anwendung zu optimieren, bietet Intlayer zwei Plugins zur Optimierung des Builds Ihrer Anwendung: `@intlayer/babel` und `@intlayer/swc` Plugins.
Die Babel- und SWC-Plugins funktionieren, indem sie den Abstract Syntax Tree (AST) Ihrer Anwendung analysieren, um Aufrufe von Intlayer-Funktionen durch optimierten Code zu ersetzen. Dieser Prozess macht Ihr endgültiges Bundle in der Produktion leichter, indem sichergestellt wird, dass nur die tatsächlich verwendeten Wörterbücher importiert werden, das Chunking optimiert und die Bundle-Größe reduziert wird.

Die Babel- und SWC-Plugins funktionieren, indem sie den Abstract Syntax Tree (AST) deiner Anwendung analysieren, um Aufrufe von Intlayer-Funktionen durch optimierten Code zu ersetzen. Dieser Prozess macht dein finales Bundle in der Produktion leichter, indem sichergestellt wird, dass nur die Wörterbücher, die tatsächlich verwendet werden, importiert werden, die Chunking-Optimierung verbessert und die Bundle-Größe reduziert wird.

Im Entwicklungsmodus verwendet Intlayer einen zentralisierten statischen Import für Wörterbücher, um die Entwicklungserfahrung zu vereinfachen.

Durch Aktivieren der Option `importMode = "dynamic"` in der [Konfiguration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md) verwendet Intlayer den dynamischen Import, um die Wörterbücher zu laden. Diese Option ist standardmäßig deaktiviert, um asynchrone Verarbeitung beim Rendern der Anwendung zu vermeiden.

> `@intlayer/babel` ist standardmäßig im `vite-intlayer`-Paket enthalten,

> `@intlayer/swc` ist standardmäßig nicht im `next-intlayer`-Paket installiert, da SWC-Plugins in Next.js noch experimentell sind.

Um zu sehen, wie Sie den Build Ihrer Anwendung konfigurieren können, lesen Sie die [Konfigurationsdokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md).

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

### nuxt-intlayer

Das `nuxt-intlayer`-Paket ist ein Nuxt-Modul, um Intlayer-Wörterbücher in Nuxt-Anwendungen nutzbar zu machen. Es integriert wesentliche Funktionen, damit Intlayer in einer Nuxt-Umgebung funktioniert, wie z. B. Übersetzungs-Middleware, Routing oder die Konfiguration der `nuxt.config.js`-Datei.

### svelte-intlayer

Das `svelte-intlayer`-Paket wird verwendet, um Intlayer-Wörterbücher zu interpretieren und in Svelte-Anwendungen nutzbar zu machen.

### solid-intlayer (WIP)

Das `solid-intlayer`-Paket wird verwendet, um Intlayer-Wörterbücher zu interpretieren und in Solid.js-Anwendungen nutzbar zu machen.

### preact-intlayer

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

Beinhaltet die `react-scripts-intlayer` Befehle und Plugins zur Integration von Intlayer in Anwendungen, die auf Create React App basieren. Diese Plugins basieren auf [craco](https://craco.js.org/) und enthalten zusätzliche Konfigurationen für den [Webpack](https://webpack.js.org/) Bundler.

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

Das `@intlayer/webpack` Paket wird verwendet, um eine Webpack-Konfiguration bereitzustellen, die eine auf Webpack basierende Anwendung mit Intlayer kompatibel macht. Das Paket stellt außerdem ein Plugin bereit, das zu einer bestehenden Webpack-Anwendung hinzugefügt werden kann.

### @intlayer/cli

Das `@intlayer/cli` Paket ist ein NPM-Paket, das verwendet wird, um Skripte im Zusammenhang mit den Intlayer-Befehlszeilenschnittstellen zu deklarieren. Es stellt die Einheitlichkeit aller Intlayer-CLI-Befehle sicher. Dieses Paket wird insbesondere von den Paketen [intlayer-cli](https://github.com/aymericzip/intlayer/tree/main/docs/de/packages/intlayer-cli/index.md) und [intlayer](https://github.com/aymericzip/intlayer/tree/main/docs/de/packages/intlayer/index.md) verwendet.

### @intlayer/mcp

Das `@intlayer/mcp` Paket stellt einen MCP (Model Context Protocol) Server bereit, der KI-gestützte IDE-Unterstützung speziell für das Intlayer-Ökosystem liefert. Es lädt automatisch die Dokumentation und integriert sich in die Intlayer CLI.

### @intlayer/dictionaries-entry & @intlayer/unmerged-dictionaries-entry & @intlayer/dynamic-dictionaries-entry

Die Pakete `@intlayer/dictionaries-entry`, `@intlayer/unmerged-dictionaries-entry` und `@intlayer/dynamic-dictionaries-entry` geben den Einstiegspfad der Intlayer-Wörterbücher zurück. Da eine Suche im Dateisystem vom Browser aus nicht möglich ist, kann der Einstiegspfad der Wörterbücher mit Bundlern wie Webpack oder Rollup nicht ermittelt werden. Diese Pakete sind so konzipiert, dass sie als Aliase verwendet werden können, um eine Optimierung des Bundlings über verschiedene Bundler wie Vite, Webpack und Turbopack zu ermöglichen.

### @intlayer/engine

Das `@intlayer/engine` Paket wird verwendet, um Inhaltsdateien zu überwachen und das geänderte Wörterbuch bei jeder Änderung neu zu generieren.

### @intlayer/editor

Das `@intlayer/editor` Paket stellt die Dienstprogramme im Zusammenhang mit dem Wörterbuch-Editor bereit. Es enthält insbesondere die API, um eine Anwendung mit dem Intlayer-Editor zu verbinden, sowie Dienstprogramme zur Manipulation von Wörterbüchern. Dieses Paket ist plattformübergreifend.

### @intlayer/editor-react

Das `@intlayer/editor-react` Paket stellt Zustände, Kontexte, Hooks und Komponenten bereit, um eine React-Anwendung mit dem Intlayer-Editor zu verbinden.

### @intlayer/babel

Das `@intlayer/babel` Paket stellt Werkzeuge bereit, die das Bundling von Wörterbüchern für Vite- und Webpack-basierte Anwendungen optimieren.

### @intlayer/swc

Das `@intlayer/swc` Paket stellt Werkzeuge bereit, die das Bundling von Wörterbüchern für Next.js-Anwendungen optimieren.

### @intlayer/api

Das `@intlayer/api` Paket ist ein API-SDK, um mit dem Backend zu interagieren.

### @intlayer/design-system

Das `@intlayer/design-system` Paket wird verwendet, um Designelemente zwischen dem CMS und dem visuellen Editor zu teilen.

### @intlayer/backend

Das `@intlayer/backend` Paket exportiert Backend-Typen und wird in Zukunft das Backend als eigenständiges Paket anbieten.

## Chat mit unserer intelligenten Dokumentation

- [Stellen Sie Ihre Fragen an unsere intelligente Dokumentation](https://intlayer.org/de/doc/chat)

## Häufig gestellte Fragen

<FAQ>

<Question title="Wann werden Wörterbücher erstellt, zur Build-Zeit oder zur Laufzeit?">

Zur Build-Zeit. Das Bundler-Plugin oder `npx intlayer build` scannt Ihre `.content.ts`-Dateien, löst sie in Wörterbücher im Ordner `.intlayer` auf und generiert die passenden TypeScript-Typen. Zur Laufzeit lesen Ihre Komponenten nur das Ergebnis, sodass auf dem Anfragepfad kein Parsen oder Laden von Dateien stattfindet.

</Question>

<Question title="Wie viel trägt i18n zu meiner Bundle-Größe bei?">

Viel weniger als bei einem Namespace-basierten Setup, denn eine Seite lädt niemals einen Katalog herunter, den sie nicht rendert. Serverseitig gerendertes Markup löst seinen Inhalt auf dem Server auf, und der Build-Zeit-Compiler ersetzt `useIntlayer`-Aufrufe durch genau die Wörterbucheinträge, die eine Komponente verwendet, sodass ungenutzte Schlüssel und ungenutzte Sprachen entfernt werden. [Dynamische Wörterbücher](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dynamic_dictionaries/index.md) teilen den Rest pro Locale auf. Gemessen an den üblichen Alternativen reduziert Intlayer die Bundle- und Seitengröße um bis zu 50 %. Siehe [Bundle-Optimierung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/bundle_optimization.md) und den [Benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/benchmark/index.md).

</Question>

<Question title="Kann ich von `i18next`, `next-intl` oder `react-i18next` migrieren, ohne meine Komponenten neu zu schreiben?">

Ja, und es gibt zwei Wege. Sie können die Inhalte schrittweise migrieren mit dem [i18next-Migrationsleitfaden](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/migration_from_i18next_to_intlayer.md) oder dem [next-intl-Migrationsleitfaden](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/migration_from_next-intl_to_intlayer.md). Oder Sie behalten Ihre aktuelle API vollständig bei: Die [Kompatibilitätsadapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compat/index.md) stellen genau dieselbe API wie `i18next`, `react-i18next`, `next-intl`, `next-i18next`, `react-intl`, `use-intl`, `vue-i18n` und `Lingui` bereit, aber aus Intlayer-Wörterbüchern bedient, sodass sich Importe ändern und der Komponentencode nicht.

</Question>

<Question title="Kann ich meine vorhandenen JSON-Übersetzungsdateien behalten?">

Ja. Das [sync-JSON-Plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/plugins/sync-json.md) behält Ihre `/messages/{locale}/{namespace}.json`-Dateien als Single Source of Truth und generiert daraus Intlayer-Wörterbücher, in beide Richtungen. Ein [sync-PO-Plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/plugins/sync-po.md) macht dasselbe für gettext-Kataloge, und [Dateien pro Locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/per_locale_file.md) lassen Sie Inhalte nach Sprache aufteilen, statt Locales in einer Datei zu gruppieren.

</Question>

<Question title="Muss ich meine Inhalte Schlüssel für Schlüssel umziehen?">

Nein. Führen Sie `npx intlayer extract` aus; Intlayer liest Ihre Quelldateien, zieht die für den Nutzer sichtbaren Strings heraus und schreibt neben jede eine `.content`-Datei, sodass Sie ein Diff prüfen, statt Strings einzeln in einen Katalog zu kopieren. Siehe den [extract-Befehl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/extract.md).

Für eine vollständig automatisierte Pipeline macht der [Intlayer-Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compiler.md) dasselbe zur Build-Zeit auf JSX-, TSX-, Vue- und Svelte-Quellcode und generiert die Wörterbücher bei jeder Änderung, sodass es keine von Hand zu pflegenden Schlüssel gibt. Er arbeitet mit statischer Analyse, sodass Strings, die nur zur Laufzeit existieren, unerreichbar bleiben, und er braucht einige Annotationen, um für den Nutzer sichtbaren Text von Anwendungslogik zu unterscheiden.

</Question>

<Question title="Welches Editor- und KI-Agenten-Tooling ist verfügbar?">

Fünf Bausteine, alle optional:

- **[VS-Code-Erweiterung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/vs_code_extension.md)**: von einem `useIntlayer`-Schlüssel zur Inhaltsdatei springen, die ihn deklariert, Inhalte aus einer Komponente extrahieren und build, fill, test, push und pull über die Befehlspalette oder einen eigenen Intlayer-Tab ausführen.
- **[LSP-Server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/lsp.md)**: dieselbe Wahrnehmung in jedem Editor, der LSP spricht, mit „Gehe zu Definition“, „Alle Referenzen suchen“, Hover-Vorschauen eines übersetzten Werts, Autovervollständigung von Schlüsseln und Feldern sowie einer Warnung, wenn ein Schlüssel nirgends deklariert ist. Es löst außerdem `i18next`-, `react-i18next`-, `next-intl`- und `use-intl`-Aufrufe auf, was bei der Migration hilft.
- **[MCP-Server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/mcp_server.md)**: stellt die Intlayer-Dokumentation und -CLI für Cursor, VS Code, Claude Desktop, Claude Code und ChatGPT bereit, sodass ein Assistent aus der aktuellen Doku antwortet statt zu raten und Befehle wie `intlayer fill` selbst ausführen kann.
- **[Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/agent_skills.md)**: fokussierte Skills wie `intlayer-config`, `intlayer-cli` und `intlayer-content` sowie eines pro Framework, die einem Agenten Ihr Routing-Setup und die Inhaltsknoten-Typen beibringen.
- **[ESLint-Plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/eslint.md)**: `no-raw-text` markiert fest kodierte Strings, mit weiteren Regeln für statische Wörterbuchschlüssel und ungenutzte Inhalte.

</Question>

<Question title="Was ist der Ordner .intlayer und sollte ich ihn committen?">

Es ist die generierte Ausgabe: die kompilierten Wörterbücher und die generierten Typen. Sie wird aus Ihren Inhaltsdateien abgeleitet, sollte also in `.gitignore` stehen und von Ihrem Build-Schritt neu erzeugt werden, genau wie ein `dist`-Ordner.

</Question>

<Question title="Wie wird die aktive Locale bestimmt?">

Aus den in `routing.storage` aufgelisteten Quellen, der Reihe nach: das URL-Präfix, wenn `routing.mode` eines verwendet, dann ein Cookie, dann der `Accept-Language`-Header, dann Ihre Standard-Locale. Eine Locale, die der Nutzer ausdrücklich wählt, wird persistiert, sodass sie den nächsten Besuch übersteht. Siehe die [Konfigurationsreferenz](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md).

</Question>

<Question title="Was ist der Unterschied zwischen lokalen und entfernten Wörterbüchern?">

Ein lokales Wörterbuch wird in Ihrer Codebasis deklariert und mit Ihrer Anwendung kompiliert. Ein entferntes Wörterbuch wird im [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_CMS.md) verwaltet und zur Laufzeit aufgelöst, sodass es sich ohne Deployment ändern kann. Beide werden über dieselben Hooks gelesen, und entfernter Inhalt fällt auf die lokale Deklaration zurück, wenn er nicht verfügbar ist.

</Question>

<Question title="Funktioniert Intlayer ohne TypeScript?">

Ja. Inhaltsdateien können in TypeScript, JavaScript, ESM, CommonJS oder JSON geschrieben werden. TypeScript schaltet die generierten Typen und die Autovervollständigung frei, ist also das empfohlene Setup, aber nicht erforderlich.

</Question>

<Question title="Wie teilen sich Server-Rendering und Client-Rendering denselben Inhalt?">

Der Server löst den Inhalt serverseitig gerenderter Komponenten direkt auf, sodass für dieses Markup kein Wörterbuch an den Client gesendet wird. Client-Komponenten lesen dieselben Wörterbücher über den Provider, der die auf dem Server aufgelöste Locale erhält, sodass das erste Client-Rendering zum Server-HTML passt und keine andere Sprache aufblitzt.

</Question>

<Question title="Wie vermeidet Intlayer eine Hydration-Diskrepanz bei der Locale?">

Die Locale wird einmal auf dem Server aufgelöst und an den Provider übergeben, statt im Browser erneut erkannt zu werden. Weil der Client mit derselben Locale startet, die der Server gerendert hat, passt das Markup, was bei clientseitiger Locale-Erkennung üblicherweise bricht.

</Question>

<Question title="Muss ich neu bauen, wenn ich eine Übersetzung hinzufüge?">

In der Entwicklung nein: Das Plugin überwacht Ihre Inhaltsdateien und baut die betroffenen Wörterbücher beim Speichern neu. In der Produktion sind die Wörterbücher Teil des Builds, es sei denn, der Inhalt ist entfernt, in welchem Fall das [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_CMS.md) und der [Live-Sync](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/live.md) die Änderung ohne Deployment anwenden.

</Question>

</FAQ>
