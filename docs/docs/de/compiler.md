---
createdAt: 2025-09-09
updatedAt: 2026-03-10
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
  - version: 8.2.0
    date: 2026-03-10
    changes: Update compiler options, add FilePathPattern support
  - version: 8.1.7
    date: 2026-02-25
    changes: Compiler-Optionen aktualisieren
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

Als Alternative, um Ihren i18n-Prozess zu automatisieren und gleichzeitig die volle Kontrolle über Ihren Inhalt zu behalten, bietet Intlayer auch einen Auto-Extraktionsbefehl `intlayer extract` (siehe [CLI-Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/extract.md)) oder den Befehl `Intlayer: extract content to Dictionary` aus der Intlayer VS Code-Erweiterung (siehe [VS Code-Erweiterungsdokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/vs_code_extension.md)).

## Verwendung

<Tabs>
 <Tab value='vite'>

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

See complete tutorial: [Intlayer Compiler with Vite+React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_vite+react_compiler.md)

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

 </Tab>
 <Tab value='nextjs'>

### Next.js (Babel)

Für Next.js oder andere Webpack-basierte Anwendungen, die Babel verwenden, können Sie den Compiler mit dem `@intlayer/babel` Plugin konfigurieren.

#### Installation

```bash
npm install @intlayer/babel
```

#### Konfiguration

Aktualisieren Sie Ihre `babel.config.js` (oder `babel.config.json`), um das Extraktions-Plugin einzubinden. Wir stellen einen Helfer `getExtractPluginOptions` bereit, der Ihre Intlayer-Konfiguration automatisch lädt.

```js fileName="babel.config.js"
const {
  intlayerExtractBabelPlugin,
  intlayerOptimizeBabelPlugin,
  getExtractPluginOptions,
  getOptimizePluginOptions,
} = require("@intlayer/babel");

module.exports = {
  presets: ["next/babel"],
  plugins: [
    // Extract content from components into dictionaries
    [intlayerExtractBabelPlugin, getExtractPluginOptions()],
    // Optimize imports by replacing useIntlayer with direct dictionary imports
    [intlayerOptimizeBabelPlugin, getOptimizePluginOptions()],
  ],
};
```

Diese Konfiguration stellt sicher, dass Inhalte, die in Ihren Komponenten deklariert sind, automatisch extrahiert und während Ihres Build-Prozesses zur Generierung von Wörterbüchern verwendet werden.

See complete tutorial: [Intlayer Compiler with Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_compiler.md)

 </Tab>

### Benutzerdefinierte Konfiguration

Um das Verhalten des Compilers anzupassen, können Sie die Datei `intlayer.config.ts` im Stammverzeichnis Ihres Projekts aktualisieren.

```ts fileName="intlayer.config.ts"
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  compiler: {
    /**
     * Stellen Sie build-only ein, um den Compiler während der Entwicklung zu überspringen und die Startzeiten zu beschleunigen.
     */
    enabled: true,

    /**
     * Pattern to traverse the code to optimize.
     */
    transformPattern: [
      "**/*.{js,ts,mjs,cjs,jsx,tsx,vue,svelte}",
      "!**/node_modules/**",
    ],

    /**
     * Pattern to exclude from the optimization.
     */
    excludePattern: ["**/node_modules/**"],

    /**
     * Ausgabeverzeichnis für die optimierten Wörterbücher.
     */
    output: ({ locale, key }) => `compiler/${locale}/${key}.json`,

    /**
     * Fügen Sie nur den Inhalt in die generierte Datei ein, ohne Schlüssel.
     */
    noMetadata: false,

    /**
     * Wörterbuch-Präfix
     */
    dictionaryKeyPrefix: "", // Remove base prefix

    /**
     * Gibt an, ob die Komponenten nach der Transformation gespeichert werden sollen.
     * Auf diese Weise kann der Compiler nur einmal ausgeführt werden, um die App zu transformieren, und dann entfernt werden.
     */
    saveComponents: false,
  },
};

export default config;
```

### Fehlende Übersetzungen ausfüllen

Intlayer bietet ein CLI-Tool an, mit dem Sie fehlende Übersetzungen ausfüllen können. Sie können den Befehl `intlayer` verwenden, um fehlende Übersetzungen in Ihrem Code zu testen und auszufüllen.

```bash
npx intlayer test         # Testen, ob Übersetzungen fehlen
```

```bash
npx intlayer fill         # Fehlende Übersetzungen ausfüllen
```

> Weitere Informationen finden Sie in der [CLI-Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/ci.md)

### Compiler-Konfigurationsreferenz

Die folgenden Eigenschaften können im Block `compiler` Ihrer Datei `intlayer.config.ts` konfiguriert werden:

- **enabled**:
  - _Typ_: `boolean | 'build-only'`
  - _Standard_: `true`
  - _Beschreibung_: Gibt an, ob der Compiler aktiviert werden soll.
- **dictionaryKeyPrefix**:
  - _Typ_: `string`
  - _Standard_: `'comp-'`
  - _Beschreibung_: Präfix für die extrahierten Wörterbuchschlüssel.
- **transformPattern**:
  - _Typ_: `string | string[]`
  - _Standard_: `['**/*.{js,ts,mjs,cjs,jsx,tsx,vue,svelte}', '!**/node_modules/**']`
  - _Beschreibung_: Muster zum Durchlaufen des zu optimierenden Codes.
- **excludePattern**:
  - _Typ_: `string | string[]`
  - _Standard_: `['**/node_modules/**']`
  - _Beschreibung_: Muster, die von der Optimierung ausgeschlossen werden sollen.
- **outputDir** (Deprecated):
  - _Typ_: `string`
  - _Standard_: `'compiler'`
  - _Beschreibung_: Das Verzeichnis, in dem die extrahierten Wörterbücher gespeichert werden.

- **output**:
  - _Typ_: `FilePathPattern`
  - _Standard_: `({ key }) => 'compiler/${key}.content.json'`
  - _Beschreibung_: Definiert den Pfad der Ausgabedateien. Ersetzt `outputDir`. Verarbeitet dynamische Variablen wie `{{locale}}`, `{{key}}`, `{{fileName}}`, `{{extension}}`, `{{format}}`, `{{dirPath}}`, `{{componentFileName}}`, `{{componentExtension}}`, `{{componentFormat}}`. Kann als String im Format `'my/{{var}}/path'` oder als Funktion festgelegt werden.
  - _Hinweis_: `./**/*` Pfade werden relativ zur Komponente aufgelöst. `/**/*` Pfade werden relativ zum Intlayer `baseDir` aufgelöst.
  - _Beispiel_: `output: ({ locale, key }) => 'compiler/${locale}/${key}.json'`

- **noMetadata**:
  - _Typ_: `boolean`
  - _Standard_: `false`
  - _Beschreibung_: Gibt an, ob die Metadaten in der Datei gespeichert werden sollen. Wenn true, speichert der Compiler nicht die Metadaten der Wörterbücher (Schlüssel, Content-Wrapper).
  - _Hinweis_: Nützlich bei Verwendung mit dem `loadJSON`-Plugin.
  - _Beispiel_: Wenn `true`:
    ```json
    {
      "key": "value"
    }
    ```
    Wenn `false`:
    ```json
    {
      "key": "value",
      "content": {
        "key": "value"
      }
    }
    ```

- **saveComponents**:
  - _Typ_: `boolean`
  - _Standard_: `false`
  - _Beschreibung_: Gibt an, ob die Komponenten nach der Transformation gespeichert werden sollen.
