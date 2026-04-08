---
createdAt: 2025-11-25
updatedAt: 2026-04-08
title: Optimierung der i18n-Bundle-Größe und Leistung
description: Reduzieren Sie die Bundle-Größe Ihrer Anwendung, indem Sie Internationalisierungs-Inhalte (i18n) optimieren. Erfahren Sie, wie Sie Tree Shaking und Lazy Loading für Wörterbücher mit Intlayer nutzen.
keywords:
  - Bundle-Optimierung
  - Inhaltsautomatisierung
  - Dynamischer Inhalt
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - bundle-optimization
history:
  - version: 8.7.0
    date: 2026-04-08
    changes: "Optionen `minify` und `purge` zur Build-Konfiguration hinzugefügt"
---

# Optimierung der i18n-Bundle-Größe und Leistung

Eine der häufigsten Herausforderungen bei traditionellen i18n-Lösungen, die auf JSON-Dateien basieren, ist die Verwaltung der Inhaltsgröße. Wenn Entwickler Inhalte nicht manuell in Namensräume trennen, laden Benutzer oft Übersetzungen für jede Seite und potenziell jede Sprache herunter, nur um eine einzige Seite anzuzeigen.

Beispielsweise könnte eine Anwendung mit 10 Seiten, die in 10 Sprachen übersetzt wurden, dazu führen, dass ein Benutzer den Inhalt von 100 Seiten herunterlädt, obwohl er nur **eine** benötigt (die aktuelle Seite in der aktuellen Sprache). Dies führt zu verschwendeter Bandbreite und langsameren Ladezeiten.

**Intlayer löst dieses Problem durch Optimierung zur Build-Zeit.** Es analysiert Ihren Code, um festzustellen, welche Wörterbücher tatsächlich pro Komponente verwendet werden, und fügt nur den erforderlichen Inhalt in Ihr Bundle ein.

## Inhaltsverzeichnis

<TOC />

## Bundle scannen

Die Analyse Ihres Bundles ist der erste Schritt zur Identifizierung „schwerer“ JSON-Dateien und Möglichkeiten zum Code-Splitting. Diese Tools generieren eine visuelle Treemap des kompilierten Codes Ihrer Anwendung, sodass Sie genau sehen können, welche Bibliotheken den meisten Platz verbrauchen.

<Tabs>
 <Tab value="vite">

### Vite / Rollup

Vite verwendet Rollup unter der Haube. Das Plugin `rollup-plugin-visualizer` generiert eine interaktive HTML-Datei, die die Größe jedes Moduls in Ihrem Graphen anzeigt.

```bash
npm install -D rollup-plugin-visualizer
```

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    visualizer({
      open: true, // Bericht automatisch im Browser öffnen
      filename: "stats.html",
      gzipSize: true,
      brotliSize: true,
    }),
  ],
});
```

 </Tab>
 <Tab value="nextjs (turbopack)">

### Next.js (Turbopack)

Für Projekte, die den App Router und Turbopack verwenden, bietet Next.js einen integrierten experimentellen Analyzer, der keine zusätzlichen Abhängigkeiten erfordert.

```bash packageManager='npm'
npx next experimental-analyze
```

```bash packageManager='yarn'
yarn next experimental-analyze
```

```bash packageManager='pnpm'
pnpm next experimental-analyze
```

```bash packageManager='bun'
bun next experimental-analyze
```

 </Tab>
 <Tab value="nextjs (Webpack)">

### Next.js (Webpack)

Wenn Sie den Standard-Webpack-Bundler in Next.js verwenden, nutzen Sie den offiziellen Bundle-Analyzer. Aktivieren Sie ihn, indem Sie während des Builds eine Umgebungsvariable setzen.

```bash packageManager='npm'
npm install -D @next/bundle-analyzer
```

```bash packageManager='yarn'
yarn add -D @next/bundle-analyzer
```

```bash packageManager='pnpm'
pnpm add -D @next/bundle-analyzer
```

```bash packageManager='bun'
bun add -d @next/bundle-analyzer
```

```javascript fileName="next.config.js"
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  // Ihre Next.js-Konfiguration
});
```

**Verwendung:**

```bash
ANALYZE=true npm run build
```

 </Tab>
 <Tab value="Webpack (CRA / Angular / etc)">

### Standard Webpack

Für Create React App (ejected), Angular oder benutzerdefinierte Webpack-Setups verwenden Sie den Branchenstandard `webpack-bundle-analyzer`.

```bash packageManager='npm'
npm install -D webpack-bundle-analyzer
```

```bash packageManager='yarn'
yarn add -D webpack-bundle-analyzer
```

```bash packageManager='pnpm'
pnpm add -D webpack-bundle-analyzer
```

```bash packageManager='bun'
bun add -d webpack-bundle-analyzer
```

```typescript fileName="webpack.config.ts
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

export default {
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: "static",
      reportFilename: "bundle-analyzer.html",
      openAnalyzer: false,
    }),
  ],
};
```

 </Tab>
</Tabs>

## Funktionsweise

Intlayer verwendet einen **Ansatz pro Komponente**. Im Gegensatz zu globalen JSON-Dateien wird Ihr Inhalt neben oder innerhalb Ihrer Komponenten definiert. Während des Build-Prozesses führt Intlayer folgende Schritte aus:

1.  **Analysiert** Ihren Code, um `useIntlayer`-Aufrufe zu finden.
2.  **Erstellt** den entsprechenden Wörterbuchinhalt.
3.  **Ersetzt** den `useIntlayer`-Aufruf durch optimierten Code basierend auf Ihrer Konfiguration.

Dies stellt sicher, dass:

- Wenn eine Komponente nicht importiert wird, ihr Inhalt nicht im Bundle enthalten ist (Dead Code Elimination).
- Wenn eine Komponente per Lazy Loading geladen wird, ihr Inhalt ebenfalls per Lazy Loading geladen wird.

## Einrichtung nach Plattform

<Tabs>
 <Tab value="nextjs">

### Next.js

Next.js benötigt das `@intlayer/swc`-Plugin, um die Transformation zu handhaben, da Next.js SWC für Builds verwendet.

> Dieses Plugin ist standardmäßig nicht installiert, da SWC-Plugins für Next.js noch experimentell sind. Dies kann sich in Zukunft ändern.

```bash packageManager="npm"
npm install -D @intlayer/swc
```

```bash packageManager="yarn"
yarn add -D @intlayer/swc
```

```bash packageManager="pnpm"
pnpm add -D @intlayer/swc
```

```bash packageManager="bun"
bun add -d @intlayer/swc
```

Nach der Installation erkennt und verwendet Intlayer das Plugin automatisch.

 </Tab>
 <Tab value="vite">

### Vite

Vite verwendet das `@intlayer/babel`-Plugin, das als Abhängigkeit von `vite-intlayer` enthalten ist. Die Optimierung ist standardmäßig aktiviert. Es ist nichts weiter zu tun.

 </Tab>
 <Tab value="webpack">

### Webpack

Um die Bundle-Optimierung mit Intlayer in Webpack zu aktivieren, müssen Sie das entsprechende Babel- (`@intlayer/babel`) oder SWC- (`@intlayer/swc`) Plugin installieren und konfigurieren.

```bash packageManager="npm"
npm install -D @intlayer/babel
```

```bash packageManager="yarn"
yarn add -D @intlayer/babel
```

```bash packageManager="pnpm"
pnpm add -D @intlayer/babel
```

```bash packageManager="bun"
bun add -d @intlayer/babel
```

```typescript fileName="babel.config.js"
const { getOptimizePluginOptions } = require("@intlayer/babel");

module.exports = {
  plugins: [[intlayerOptimizeBabelPlugin, getOptimizePluginOptions()]],
};
```

 </Tab>
</Tabs>

## Konfiguration

Sie können steuern, wie Intlayer Ihr Bundle optimiert, indem Sie die Eigenschaft `build` in Ihrer `intlayer.config.ts` verwenden.

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    importMode: "dynamic",
  },
  build: {
    /**
     * Wörterbücher minimieren, um die Bundle-Größe zu reduzieren.
     */
     minify: true;

    /**
     * Nicht verwendete Schlüssel in Wörterbüchern entfernen (Purge)
     */
     purge: true;

    /**
     * Gibt an, ob beim Build TypeScript-Typen geprüft werden sollen
     */
    checkTypes: false;
  },
};

export default config;
```

> In den meisten Fällen wird empfohlen, die Standardoption für `optimize` beizubehalten.

> Weitere Details finden Sie in der Konfigurationsdokumentation: [Konfiguration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md)

### Build-Optionen

Folgende Optionen sind im `build`-Konfigurationsobjekt verfügbar:

| Eigenschaft    | Typ       | Standard    | Beschreibung                                                                                                                                                                                                                    |
| :------------- | :-------- | :---------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **`optimize`** | `boolean` | `undefined` | Steuert, ob die Build-Optimierung aktiviert ist. Wenn `true`, ersetzt Intlayer Wörterbuchaufrufe durch optimierte Injektionen. Wenn `false`, ist die Optimierung deaktiviert. Im Idealfall in der Produktion auf `true` setzen. |
| **`minify`**   | `boolean` | `false`     | Ob die Wörterbücher minimiert werden sollen, um die Bundle-Größe zu reduzieren.                                                                                                                                                 |
| **`purge`**    | `boolean` | `false`     | Ob nicht verwendete Schlüssel in Wörterbüchern entfernt werden sollen.                                                                                                                                                          |

### Minimierung

Die Minimierung von Wörterbüchern entfernt unnötige Leerzeichen, Kommentare und reduziert die Größe des JSON-Inhalts. Dies ist besonders nützlich für große Wörterbücher.

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    minify: true,
  },
};

export default config;
```

> Hinweis: Die Minimierung wird ignoriert, wenn `optimize` deaktiviert ist oder wenn der Visual Editor aktiviert ist (da der Editor den vollständigen Inhalt benötigt, um Bearbeitungen zu ermöglichen).

### Purging (Bereinigung)

Purging stellt sicher, dass nur die tatsächlich in Ihrem Code verwendeten Schlüssel im finalen Wörterbuch-Bundle enthalten sind. Dies kann die Größe Ihres Bundles erheblich reduzieren, wenn Sie große Wörterbücher mit vielen Schlüsseln haben, die nicht in jedem Teil Ihrer Anwendung verwendet werden.

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    purge: true,
  },
};

export default config;
```

> Hinweis: Purging wird ignoriert, wenn `optimize` deaktiviert ist.

### Import-Modus

Für große Anwendungen, die mehrere Seiten und Sprachen umfassen, können Ihre JSON-Dateien einen erheblichen Teil Ihrer Bundle-Größe ausmachen. Intlayer ermöglicht es Ihnen zu steuern, wie Wörterbücher geladen werden.

Der Import-Modus kann standardmäßig global in Ihrer `intlayer.config.ts`-Datei definiert werden.

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    minify: true,
  },
};

export default config;
```

Ebenso wie für jedes Wörterbuch in Ihren `.content.{{ts|tsx|js|jsx|mjs|cjs|json|jsonc|json5}}`-Dateien.

```ts
import { type Dictionary, t } from "intlayer";

const appContent: Dictionary = {
  key: "app",
  importMode: "dynamic", // Standard-Importmodus überschreiben
  content: {
    // ...
  },
};

export default appContent;
```

| Eigenschaft      | Typ                                | Standard   | Beschreibung                                                                                                                      |
| :--------------- | :--------------------------------- | :--------- | :-------------------------------------------------------------------------------------------------------------------------------- |
| **`importMode`** | `'static'`, `'dynamic'`, `'fetch'` | `'static'` | **Veraltet**: Verwenden Sie stattdessen `dictionary.importMode`. Bestimmt, wie Wörterbücher geladen werden (siehe Details unten). |

Die Einstellung `importMode` legt fest, wie der Wörterbuchinhalt in Ihre Komponente eingefügt wird.
Sie können dies global in der Datei `intlayer.config.ts` unter dem Objekt `dictionary` definieren oder für ein bestimmtes Wörterbuch in dessen `.content.ts`-Datei überschreiben.

### 1. Statischer Modus (`default`)

Im statischen Modus ersetzt Intlayer `useIntlayer` durch `useDictionary` und fügt das Wörterbuch direkt in das JavaScript-Bundle ein.

- **Vorteile:** Sofortiges Rendering (synchron), keine zusätzlichen Netzwerkanfragen während der Hydrierung.
- **Nachteile:** Das Bundle enthält Übersetzungen für **alle** verfügbaren Sprachen für diese spezifische Komponente.
- **Ideal für:** Single Page Applications (SPA).

**Beispiel für transformierten Code:**

```tsx
// Ihr Code
const content = useIntlayer("my-key");

// Optimierter Code (Statisch)
const content = useDictionary({
  key: "my-key",
  content: {
    nodeType: "translation",
    translation: {
      en: "My title",
      fr: "Mon titre",
    },
  },
});
```

### 2. Dynamischer Modus

Im dynamischen Modus ersetzt Intlayer `useIntlayer` durch `useDictionaryAsync`. Dies verwendet `import()` (ähnlich wie Suspense), um speziell das JSON für die aktuelle Sprache nachzuladen (Lazy Loading).

- **Vorteile:** **Tree Shaking auf Sprach-Ebene.** Ein Benutzer, der die englische Version ansieht, lädt _nur_ das englische Wörterbuch herunter. Das französische Wörterbuch wird nie geladen.
- **Nachteile:** Löst pro Komponente während der Hydrierung eine Netzwerkanfrage (Asset-Abruf) aus.
- **Ideal für:** Große Textblöcke, Artikel oder Anwendungen, die viele Sprachen unterstützen, bei denen die Bundle-Größe kritisch ist.

**Beispiel für transformierten Code:**

```tsx
// Ihr Code
const content = useIntlayer("my-key");

// Optimierter Code (Dynamisch)
const content = useDictionaryAsync({
  en: () =>
    import(".intlayer/dynamic_dictionary/my-key/en.json").then(
      (mod) => mod.default
    ),
  fr: () =>
    import(".intlayer/dynamic_dictionary/my-key/fr.json").then(
      (mod) => mod.default
    ),
});
```

> Wenn Sie `importMode: 'dynamic'` verwenden und 100 Komponenten `useIntlayer` auf einer einzigen Seite nutzen, wird der Browser versuchen, 100 separate Abrufe durchzuführen. Um diesen „Wasserfall“ an Anfragen zu vermeiden, gruppieren Sie Inhalte in weniger `.content`-Dateien (z. B. ein Wörterbuch pro Seitenabschnitt) statt einer Datei pro Atom-Komponente.

### 3. Fetch-Modus

Verhält sich ähnlich wie der dynamische Modus, versucht jedoch zuerst, Wörterbücher von der Intlayer Live Sync API abzurufen. Wenn der API-Aufruf fehlschlägt oder der Inhalt nicht für Live-Updates markiert ist, erfolgt ein Fallback auf den dynamischen Import.

> Weitere Details finden Sie in der CMS-Dokumentation: [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_CMS.md)

> Im Fetch-Modus können Purge und Minimierung nicht verwendet werden.

## Zusammenfassung: Statisch vs. Dynamisch

| Merkmal                   | Statischer Modus                                  | Dynamischer Modus                    |
| :------------------------ | :------------------------------------------------ | :----------------------------------- |
| **JS-Bundle-Größe**       | Größer (enthält alle Sprachen für die Komponente) | Kleiner (nur Code, kein Inhalt)      |
| **Initiales Laden**       | Sofort (Inhalt ist im Bundle)                     | Leichte Verzögerung (lädt JSON)      |
| **Netzwerkanfragen**      | 0 zusätzliche Anfragen                            | 1 Anfrage pro Wörterbuch             |
| **Tree Shaking**          | Komponentenebene                                  | Komponentenebene + Sprach-Ebene      |
| **Bester Anwendungsfall** | UI-Komponenten, kleine Anwendungen                | Seiten mit viel Text, viele Sprachen |
