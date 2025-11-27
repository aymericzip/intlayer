---
createdAt: 2025-09-09
updatedAt: 2025-09-09
title: Intlayer Compiler | Automatisierte Inhaltsextraktion für i18n
description: Automatisieren Sie Ihren Internationalisierungsprozess mit dem Intlayer Compiler. Extrahieren Sie Inhalte direkt aus Ihren Komponenten für schnellere und effizientere i18n in Vite, Next.js und mehr.
keywords:
  - Intlayer
  - Compiler
  - Internationalisierung
  - i18n
  - Automatisierung
  - Extraktion
  - Geschwindigkeit
  - Vite
  - Next.js
  - React
  - Vue
  - Svelte
slugs:
  - doc
  - compiler
history:
  - version: 7.3.1
    date: 2025-11-27
    changes: Release Compiler
---

# Intlayer Compiler | Automatisierte Inhaltsextraktion für i18n

## Was ist der Intlayer Compiler?

Der **Intlayer Compiler** ist ein leistungsstarkes Werkzeug, das entwickelt wurde, um den Prozess der Internationalisierung (i18n) in Ihren Anwendungen zu automatisieren. Er durchsucht Ihren Quellcode (JSX, TSX, Vue, Svelte) nach Inhaltsdeklarationen, extrahiert diese und generiert automatisch die notwendigen Wörterbuchdateien. Dadurch können Sie Ihre Inhalte direkt bei den Komponenten belassen, während Intlayer die Verwaltung und Synchronisierung Ihrer Wörterbücher übernimmt.

## Warum den Intlayer Compiler verwenden?

- **Automatisierung**: Beseitigt das manuelle Kopieren und Einfügen von Inhalten in Wörterbücher.
- **Geschwindigkeit**: Optimierte Inhaltsextraktion, die sicherstellt, dass Ihr Build-Prozess schnell bleibt.
- **Entwicklererfahrung**: Behalten Sie Inhaltsdeklarationen genau dort, wo sie verwendet werden, und verbessern Sie so die Wartbarkeit.
- **Live-Updates**: Unterstützt Hot Module Replacement (HMR) für sofortiges Feedback während der Entwicklung.

Siehe den Blogbeitrag [Compiler vs. Declarative i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/compiler_vs_declarative_i18n.md) für einen tieferen Vergleich.

## Warum den Intlayer Compiler nicht verwenden?

Während der Compiler eine ausgezeichnete "funktioniert einfach so"-Erfahrung bietet, führt er auch einige Kompromisse ein, die Sie beachten sollten:

- **Heuristische Mehrdeutigkeit**: Der Compiler muss erraten, was benutzerorientierter Inhalt im Gegensatz zur Anwendungslogik ist (z. B. `className="active"`, Statuscodes, Produkt-IDs). In komplexen Codebasen kann dies zu falschen Positiven oder übersehenen Zeichenketten führen, die manuelle Anmerkungen und Ausnahmen erfordern.
- **Nur statische Extraktion**: Die compilerbasierte Extraktion basiert auf statischer Analyse. Zeichenketten, die nur zur Laufzeit existieren (API-Fehlercodes, CMS-Felder usw.), können vom Compiler allein nicht entdeckt oder übersetzt werden, daher benötigen Sie immer noch eine ergänzende Laufzeit-i18n-Strategie.

Für einen tieferen architektonischen Vergleich siehe den Blogbeitrag [Compiler vs. Declarative i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/compiler_vs_declarative_i18n.md).

Als Alternative, um Ihren i18n-Prozess zu automatisieren und gleichzeitig die volle Kontrolle über Ihren Inhalt zu behalten, bietet Intlayer auch einen Auto-Extraktionsbefehl `intlayer transform` (siehe [CLI-Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/transform.md)) oder den Befehl `Intlayer: extract content to Dictionary` aus der Intlayer VS Code-Erweiterung (siehe [VS Code-Erweiterungsdokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/vs_code_extension.md)).

## Verwendung

### Vite

Für Vite-basierte Anwendungen (React, Vue, Svelte usw.) ist der einfachste Weg, den Compiler zu verwenden, das `vite-intlayer` Plugin.

#### Installation

```bash
npm install vite-intlayer
```

#### Konfiguration

Aktualisieren Sie Ihre `vite.config.ts`, um das `intlayerCompiler` Plugin einzubinden:

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer, intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer(),
    intlayerCompiler(), // Fügt das Compiler-Plugin hinzu
  ],
});
```

#### Framework-Unterstützung

Das Vite-Plugin erkennt und verarbeitet automatisch verschiedene Dateitypen:

- **React / JSX / TSX**: Wird nativ unterstützt.
- **Vue**: Erfordert `@intlayer/vue-compiler`.
- **Svelte**: Erfordert `@intlayer/svelte-compiler`.

Stellen Sie sicher, dass Sie das passende Compiler-Paket für Ihr Framework installieren:

```bash
# Für Vue
npm install @intlayer/vue-compiler

# Für Svelte
npm install @intlayer/svelte-compiler
```

### Next.js (Babel)

Für Next.js oder andere Webpack-basierte Anwendungen, die Babel verwenden, können Sie den Compiler mit dem `@intlayer/babel` Plugin konfigurieren.

#### Installation

```bash
npm install @intlayer/babel
```

#### Konfiguration

Aktualisieren Sie Ihre `babel.config.js` (oder `babel.config.json`), um das Extraktions-Plugin einzubinden. Wir stellen einen Helfer `getCompilerOptions` bereit, der Ihre Intlayer-Konfiguration automatisch lädt.

```js fileName="babel.config.js"
const { intlayerExtractBabelPlugin } = require("@intlayer/babel");
const { getCompilerOptions } = require("@intlayer/babel/compiler");

module.exports = {
  presets: ["next/babel"],
  plugins: [
    [
      intlayerExtractBabelPlugin,
      getCompilerOptions(), // Lädt automatisch Optionen aus intlayer.config.ts
    ],
  ],
};
```

Diese Konfiguration stellt sicher, dass Inhalte, die in Ihren Komponenten deklariert sind, automatisch extrahiert und während Ihres Build-Prozesses zur Generierung von Wörterbüchern verwendet werden.
