---
createdAt: 2025-11-25
updatedAt: 2026-06-07
title: Optimierung der i18n-Bundle-Größe & Leistung
description: Reduzieren Sie die Bundle-Größe Ihrer Anwendung, indem Sie den Inhalt der Internationalisierung (i18n) optimieren. Erfahren Sie, wie Sie Tree Shaking und Lazy Loading für Wörterbücher mit Intlayer nutzen.
keywords:
  - Bundle Optimierung
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
  - version: 8.12.0
    date: 2026-06-07
    changes: "Hinzufügen von `intlayerPurgeBabelPlugin` und `intlayerMinifyBabelPlugin` für Babel/Webpack; Klarstellung der Plugin-Pipeline"
  - version: 8.7.0
    date: 2026-04-08
    changes: "Hinzufügen der Optionen `minify` und `purge` zur Build-Konfiguration"
author: aymericzip
---

# Optimierung der i18n-Bundle-Größe & Leistung

Eine der häufigsten Herausforderungen bei traditionellen i18n-Lösungen, die auf JSON-Dateien basieren, ist die Verwaltung der Inhaltsgröße. Wenn Entwickler den Inhalt nicht manuell in Namespaces trennen, laden Benutzer oft Übersetzungen für jede Seite und möglicherweise jede Sprache herunter, nur um eine einzige Seite anzuzeigen.

Beispielsweise könnte eine Anwendung mit 10 Seiten, die in 10 Sprachen übersetzt sind, dazu führen, dass ein Benutzer den Inhalt von 100 Seiten herunterlädt, obwohl er nur **eine** (die aktuelle Seite in der aktuellen Sprache) benötigt. Dies führt zu verschwendeter Bandbreite und langsameren Ladezeiten.

**Intlayer löst dieses Problem durch Optimierung zur Build-Zeit.** Es analysiert Ihren Code, um zu erkennen, welche Wörterbücher pro Komponente tatsächlich verwendet werden, und fügt nur den notwendigen Inhalt in Ihr Bundle ein.

## Inhaltsverzeichnis

<TOC />

## Analysieren Sie Ihr Bundle

Die Analyse Ihres Bundles ist der erste Schritt zur Identifizierung "schwerer" JSON-Dateien und Möglichkeiten zum Code-Splitting. Diese Tools generieren eine visuelle Treemap des kompilierten Codes Ihrer Anwendung, sodass Sie genau sehen können, welche Bibliotheken den meisten Platz beanspruchen.

<Tabs>
 <Tab value="vite">

### Vite / Rollup

Vite verwendet Rollup im Hintergrund. Das Plugin `rollup-plugin-visualizer` generiert eine interaktive HTML-Datei, die die Größe jedes Moduls in Ihrem Diagramm anzeigt.

```bash
npm install -D rollup-plugin-visualizer
```

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    visualizer({
      open: true, // Öffnet den Bericht automatisch in Ihrem Browser
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

Wenn Sie den Standard-Webpack-Bundler in Next.js verwenden, verwenden Sie den offiziellen Bundle-Analyzer. Lösen Sie ihn aus, indem Sie während Ihres Builds eine Umgebungsvariable festlegen.

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
  // Ihre Next.js Konfiguration
});
```

**Verwendung:**

```bash
ANALYZE=true npm run build
```

 </Tab>
 <Tab value="Webpack (CRA / Angular / etc)">

### Standard Webpack

Verwenden Sie für Create React App (ejected), Angular oder benutzerdefinierte Webpack-Setups den branchenüblichen `webpack-bundle-analyzer`.

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

## Wie es funktioniert

Intlayer verwendet einen **pro-Komponente-Ansatz**. Im Gegensatz zu globalen JSON-Dateien wird Ihr Inhalt neben oder in Ihren Komponenten definiert. Während des Build-Prozesses führt Intlayer Folgendes aus:

1. **Analysiert** Ihren Code, um `useIntlayer`-Aufrufe zu finden.
2. **Baut** den entsprechenden Wörterbuchinhalt auf.
3. **Ersetzt** den `useIntlayer`-Aufruf durch optimierten Code basierend auf Ihrer Konfiguration.

Dies stellt sicher, dass:

- Wenn eine Komponente nicht importiert wird, deren Inhalt nicht im Bundle enthalten ist (Dead Code Elimination).
- Wenn eine Komponente verzögert geladen wird (lazy loaded), ihr Inhalt ebenfalls verzögert geladen wird.

## Plugin-Referenz

Die Build-Optimierung von Intlayer ist auf mehrere diskrete Plugins aufgeteilt, von denen jedes eine einzige Aufgabe hat. Zu verstehen, was jedes Plugin tut, verhindert Verwirrung beim Einrichten.

### Babel Plugins (`@intlayer/babel`)

Diese werden direkt in der `babel.config.js` für Webpack-basierte Setups verwendet (Next.js mit Babel, CRA, benutzerdefiniertes Webpack usw.).

| Plugin                        | Was es tut                                                                                                                  |
| :---------------------------- | :-------------------------------------------------------------------------------------------------------------------------- |
| `intlayerExtractBabelPlugin`  | Scannt `.content.ts`-Dateien und schreibt kompilierte Wörterbücher nach `.intlayer/`                                        |
| `intlayerOptimizeBabelPlugin` | Schreibt `useIntlayer('key')` → `useDictionary(hash)` um und fügt den passenden `import` des Wörterbuchs ein                |
| `intlayerPurgeBabelPlugin`    | Scannt alle Quelldateien und entfernt **nicht verwendete Inhaltsfelder** aus den kompilierten `.intlayer/**/*.json`-Dateien |
| `intlayerMinifyBabelPlugin`   | **Benennt Inhaltsfeld-Schlüssel um** in kurze alphabetische Aliase (`title` → `a`) in JSON-Dateien und im Quellcode         |

> **Die Reihenfolge der Plugins ist wichtig.** In Ihrer `babel.config.js` müssen das Purge- und Minify-Plugin **vor** dem Optimize-Plugin aufgeführt sein. Der Optimize-Pass ersetzt `useIntlayer('key')` durch einen undurchsichtigen `useDictionary(hash)`-Aufruf, wodurch die Information über den Wörterbuchschlüssel gelöscht wird, die der Purge- und Minify-Pass benötigen, um zu identifizieren, welche Felder verwendet werden.

Jedes Babel-Plugin verfügt über einen entsprechenden Options-Helfer, der Ihre `intlayer.config.ts` einmal zur Konfigurationsladezeit liest und vorab aufgelöste Werte zurückgibt:

| Options-Helfer               | Verwendet mit                 |
| :--------------------------- | :---------------------------- |
| `getExtractPluginOptions()`  | `intlayerExtractBabelPlugin`  |
| `getOptimizePluginOptions()` | `intlayerOptimizeBabelPlugin` |
| `getPurgePluginOptions()`    | `intlayerPurgeBabelPlugin`    |
| `getMinifyPluginOptions()`   | `intlayerMinifyBabelPlugin`   |

### Vite Plugins (`vite-intlayer`)

Vite-Benutzer **konfigurieren diese nie direkt**. Sie werden automatisch eingerichtet, wenn Sie `withIntlayer()` in der `vite.config.ts` aufrufen. Die Flags `build.purge` und `build.minify` in der `intlayer.config.ts` schalten das entsprechende Verhalten ohne zusätzliche Plugin-Registrierung um.

| Internes Vite Plugin | Äquivalentes Verhalten                                                                               |
| :------------------- | :--------------------------------------------------------------------------------------------------- |
| Usage analyzer       | Gleich wie die Analysephase des `intlayerPurgeBabelPlugin`                                           |
| Dictionary prune     | Gleich wie die JSON-Schreibphase des `intlayerPurgeBabelPlugin`                                      |
| Dictionary minify    | Gleich wie die JSON-Schreibphase des `intlayerMinifyBabelPlugin`                                     |
| Babel transform      | Gleich wie die Quellcode-Umbenennung des `intlayerMinifyBabelPlugin` + `intlayerOptimizeBabelPlugin` |

## Setup nach Plattform

<Tabs>
 <Tab value="nextjs">

### Next.js

Next.js erfordert das Plugin `@intlayer/swc` für den Optimize-Pass (Import-Umschreibung), da Next.js SWC für Builds verwendet.

> Dieses Plugin ist nicht standardmäßig installiert, da SWC-Plugins für Next.js noch experimentell sind. Dies kann sich in Zukunft ändern.

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

Nach der Installation erkennt Intlayer das Plugin automatisch und verwendet es.

Für die **Purge- und Minify**-Durchgänge (Feldentfernung und Feldumbenennung) installieren Sie parallel `@intlayer/babel` und fügen Sie die Babel-Plugins hinzu. Da Next.js SWC für die Transformation verwendet, aber weiterhin `babel.config.js` für die Plugin-Konfiguration auswertet, werden die Babel-Plugins als Vorpass vor SWC ausgeführt.

```bash packageManager="npm"
npm install -D @intlayer/babel
```

```javascript fileName="babel.config.js"
const {
  intlayerPurgeBabelPlugin,
  intlayerMinifyBabelPlugin,
  getPurgePluginOptions,
  getMinifyPluginOptions,
} = require("@intlayer/babel");

module.exports = {
  presets: ["next/babel"],
  plugins: [
    // Purge: Entfernt nicht verwendete Inhaltsfelder aus .intlayer/**/*.json
    [intlayerPurgeBabelPlugin, getPurgePluginOptions()],
    // Minify: Benennt Inhaltsfeld-Schlüssel im JSON + Quellcode um
    [intlayerMinifyBabelPlugin, getMinifyPluginOptions()],
    // Hinweis: intlayerOptimizeBabelPlugin wird hier NICHT benötigt, da
    // @intlayer/swc die Umschreibung useIntlayer → useDictionary übernimmt.
  ],
};
```

 </Tab>
 <Tab value="vite">

### Vite

Vite verwendet das Plugin `@intlayer/babel`, das als Abhängigkeit von `vite-intlayer` enthalten ist. Die gesamte Optimierungspipeline — Importumschreibung, Purge und Minify — ist standardmäßig aktiviert und erfordert keine zusätzliche Plugin-Registrierung.

Aktivieren Sie Purge und Minify, indem Sie die entsprechenden Flags in `intlayer.config.ts` festlegen:

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    purge: true, // Entfernt nicht verwendete Inhaltsfelder aus gebündelten JSONs
    minify: true, // Benennt Inhaltsfeld-Schlüssel in kurze Aliase um
  },
};

export default config;
```

 </Tab>
 <Tab value="webpack">

### Webpack (und Next.js mit Babel)

Installieren Sie `@intlayer/babel`:

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

Fügen Sie alle vier Plugins in der richtigen Reihenfolge zur `babel.config.js` hinzu:

```javascript fileName="babel.config.js"
const {
  intlayerExtractBabelPlugin,
  intlayerPurgeBabelPlugin,
  intlayerMinifyBabelPlugin,
  intlayerOptimizeBabelPlugin,
  getExtractPluginOptions,
  getPurgePluginOptions,
  getMinifyPluginOptions,
  getOptimizePluginOptions,
} = require("@intlayer/babel");

module.exports = {
  plugins: [
    // Extract: kompiliert .content.ts Dateien → .intlayer/**/*.json
    [intlayerExtractBabelPlugin, getExtractPluginOptions()],

    // Purge: entfernt nicht verwendete Felder aus .intlayer/**/*.json
    //    (liest das Flag build.purge aus intlayer.config.ts)
    [intlayerPurgeBabelPlugin, getPurgePluginOptions()],

    // Minify: benennt Feld-Schlüssel in JSON + Quellcode um
    //    (liest das Flag build.minify aus intlayer.config.ts)
    [intlayerMinifyBabelPlugin, getMinifyPluginOptions()],

    // Optimize: schreibt useIntlayer('key') → useDictionary(hash) um
    //    Muss zuletzt stehen, da es den Wörterbuchschlüssel löscht.
    [intlayerOptimizeBabelPlugin, getOptimizePluginOptions()],
  ],
};
```

 </Tab>
</Tabs>

## Konfiguration

Sie können steuern, wie Intlayer Ihr Bundle optimiert, über die Eigenschaft `build` in Ihrer `intlayer.config.ts`.

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.GERMAN],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    importMode: "dynamic",
  },
  build: {
    // Ersetzt useIntlayer() Aufrufe zur Build-Zeit durch direkte Wörterbuch-Importe.
    // undefined = auto (aktiviert in der Produktion), true = immer, false = nie.
    optimize: undefined,

    // Benennt Inhaltsfeld-Schlüssel in kompilierten Wörterbüchern in kurze alphabetische
    // Aliase um (z.B. title → a). Reduziert die JSON-Größe; erfordert optimize.
    minify: true,

    // Entfernt Inhaltsfelder, die im Quellcode nie aufgerufen werden.
    // Erfordert optimize.
    purge: true,
  },
};

export default config;
```

> Es wird empfohlen, in den meisten Fällen den Standardwert (`undefined`) für `optimize` beizubehalten.

> Siehe die Konferenzreferenz für alle Optionen: [Konfiguration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md)

### Build-Optionen

| Eigenschaft    | Typ                   | Standard    | Beschreibung                                                                                                                                                                                                                    |
| :------------- | :-------------------- | :---------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **`optimize`** | `boolean / undefined` | `undefined` | Aktiviert den Import-Umschreibungspass. `undefined` = nur in Produktionsbuilds aktiv. `false` deaktiviert auch Purge und Minify.                                                                                                |
| **`minify`**   | `boolean`             | `false`     | Benennt Inhaltsfeld-Schlüssel in kompilierten JSON-Dateien in kurze alphabetische Aliase um. Schreibt auch entsprechende Eigenschaftszugriffe im Quellcode um. Hat keine Auswirkungen, wenn `optimize` auf `false` gesetzt ist. |
| **`purge`**    | `boolean`             | `false`     | Entfernt Inhaltsfelder, auf die nie statisch im Quellcode zugegriffen wird, aus den kompilierten JSON-Dateien. Hat keine Auswirkungen, wenn `optimize` auf `false` gesetzt ist.                                                 |

### Minifizierung (Feld-Schlüssel-Umbennung)

`build.minify` verkleinert **nicht** Ihr JavaScript-Bundle — das erledigt Ihr Bundler. Stattdessen schrumpft es die kompilierten Wörterbuch-JSON-Dateien, indem jeder benutzerdefinierte Inhaltsfeld-Schlüssel durch einen kurzen alphabetischen Alias ersetzt wird:

```
// Vor der Minifizierung
{ "title": "Hallo", "subtitle": "Welt" }

// Nach der Minifizierung
{ "a": "Hallo", "b": "Welt" }
```

Dieselbe Umbenennung wird auf alle Eigenschaftszugriffe in Ihrem Quellcode angewendet, sodass `content.title` in der kompilierten Ausgabe zu `content.a` wird. Das Verhalten zur Laufzeit bleibt identisch.

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    minify: true,
  },
};

export default config;
```

> Die Minifizierung wird übersprungen, wenn `optimize` auf `false` gesetzt ist oder wenn `editor.enabled` auf `true` steht (der visuelle Editor benötigt die ursprünglichen Feldnamen, um die Bearbeitung zu ermöglichen).

> Die Minifizierung wird ebenfalls für Wörterbücher übersprungen, die über `importMode: 'fetch'` geladen werden, da deren JSON von einer Remote-API mit den ursprünglichen Feldnamen bereitgestellt wird — das Umbenennen der clientseitigen Schlüssel würde den Server/Client-Vertrag brechen.

### Purging (Entfernen ungenutzter Felder)

`build.purge` analysiert, auf welche Inhaltsfelder in Ihrem Quellcode tatsächlich zugegriffen wird, und entfernt alle anderen aus den kompilierten JSON-Dateien.

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    purge: true,
  },
};

export default config;
```

**Beispiel:** Ein Wörterbuch mit fünf Feldern, von denen nur zwei verwendet werden:

```
// Vor dem Purge
{ "title": "…", "subtitle": "…", "cta": "…", "footer": "…", "badge": "…" }

// Nach dem Purge (nur auf title + subtitle wird im Quellcode zugegriffen)
{ "title": "…", "subtitle": "…" }
```

> Der Purge wird übersprungen, wenn `optimize` auf `false` oder `editor.enabled` auf `true` gesetzt ist.

> Der Purge wird auch konservativ übersprungen, wenn eine Quelldatei nicht analysiert werden kann, oder wenn das Ergebnis von `useIntlayer` einer Variablen zugewiesen und auf eine Weise weitergegeben wird, die der statische Analysator nicht verfolgen kann (z.B. in ein Objekt eingefügt oder als Prop ohne Destrukturierung übergeben). In diesen Fällen wird das gesamte Wörterbuch beibehalten.

### Import-Modus

Für große Anwendungen, die mehrere Seiten und Sprachen umfassen, kann das JSON einen erheblichen Teil der Größe Ihres Bundles ausmachen. Intlayer ermöglicht es Ihnen zu steuern, wie Wörterbücher mit der `importMode`-Option geladen werden.

### Globale Definition

Der Import-Modus kann global in Ihrer `intlayer.config.ts`-Datei definiert werden.

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  dictionary: {
    importMode: "dynamic", // Standard ist 'static'
  },
};

export default config;
```

### Pro-Wörterbuch-Definition

Sie können den Import-Modus für einzelne Wörterbücher in deren `.content.{{ts|tsx|js|jsx|mjs|cjs|json|jsonc|json5|md|mdx|yaml|yml}}`-Dateien überschreiben.

```ts
import { type Dictionary, t } from "intlayer";

const appContent: Dictionary = {
  key: "app",
  importMode: "dynamic", // Überschreibt den standardmäßigen Import-Modus
  content: {
    // ...
  },
};

export default appContent;
```

| Eigenschaft      | Typ                                | Standard   | Beschreibung                                                                                                               |
| :--------------- | :--------------------------------- | :--------- | :------------------------------------------------------------------------------------------------------------------------- |
| **`importMode`** | `'static'`, `'dynamic'`, `'fetch'` | `'static'` | **Veraltet**: Verwenden Sie stattdessen `dictionary.importMode`. Legt fest, wie Wörterbücher geladen werden (siehe unten). |

Die Einstellung `importMode` bestimmt, wie der Wörterbuchinhalt in Ihre Komponente eingefügt wird. Sie können dies global in der `intlayer.config.ts` unter dem Objekt `dictionary` definieren oder für jedes Wörterbuch einzeln in dessen `.content.ts`-Datei überschreiben.

### 1. Statischer Modus (`default`)

Im statischen Modus ersetzt Intlayer `useIntlayer` durch `useDictionary` und injiziert das Wörterbuch direkt ins JavaScript-Bundle.

- **Vorteile:** Sofortiges Rendering (synchron), keine zusätzlichen Netzwerkanfragen während der Hydratation.
- **Nachteile:** Das Bundle enthält Übersetzungen für **alle** verfügbaren Sprachen für diese spezifische Komponente.
- **Am besten für:** Single Page Applications (SPA).

**Beispiel für transformierten Code:**

```tsx
// Ihr Code
const content = useIntlayer("my-key");

// Veranschaulichung des optimierten Codes nach der Transformation (Statisch)
// Dies dient nur zur Veranschaulichung, der tatsächliche Code unterscheidet sich aus Optimierungsgründen
const content = useDictionary({
  key: "my-key",
  content: {
    nodeType: "translation",
    translation: {
      en: "My title",
      de: "Mein Titel",
    },
  },
});
```

### 2. Dynamischer Modus

Im dynamischen Modus ersetzt Intlayer `useIntlayer` durch `useDictionaryAsync`. Dies verwendet `import()` (ähnlich dem Suspense-Mechanismus), um spezifisch das JSON für die aktuelle Sprache verzögert zu laden.

- **Vorteile:** **Tree Shaking auf Länderebene.** Ein Benutzer, der die englische Version ansieht, wird _nur_ das englische Wörterbuch herunterladen. Das deutsche Wörterbuch wird nie geladen.
- **Nachteile:** Löst eine Netzwerkanfrage (Asset-Abruf) pro Komponente während der Hydratation aus.
- **Am besten für:** Große Textblöcke, Artikel oder Anwendungen, die viele Sprachen unterstützen, bei denen die Bundle-Größe entscheidend ist.

**Beispiel für transformierten Code:**

```tsx
// Ihr Code
const content = useIntlayer("my-key");

// Veranschaulichung des optimierten Codes nach der Transformation (Dynamisch)
// Dies dient nur zur Veranschaulichung, der tatsächliche Code unterscheidet sich aus Optimierungsgründen
const content = useDictionaryAsync({
  en: () =>
    import(".intlayer/dynamic_dictionary/my-key/en.json").then(
      (mod) => mod.default
    ),
  de: () =>
    import(".intlayer/dynamic_dictionary/my-key/de.json").then(
      (mod) => mod.default
    ),
});
```

> Wenn Sie `importMode: 'dynamic'` verwenden und auf einer einzigen Seite 100 Komponenten haben, die `useIntlayer` aufrufen, versucht der Browser, 100 separate Abrufe durchzuführen. Um diese "Wasserfall"-Anfragen zu vermeiden, gruppieren Sie Inhalte in weniger `.content`-Dateien (z.B. ein Wörterbuch pro Seitenabschnitt) anstatt in eines pro Atom-Komponente. Sie können auch mehrere `.content`-Dateien mit demselben Schlüssel verwenden. Intlayer wird sie dann zu einem einzigen Wörterbuch zusammenführen.

### 3. Fetch-Modus

Verhält sich ähnlich wie der dynamische Modus, versucht jedoch zuerst, Wörterbücher von der Intlayer Live Sync API abzurufen. Wenn der API-Aufruf fehlschlägt oder der Inhalt nicht für Live-Updates markiert ist, wird auf den dynamischen Import zurückgegriffen.

**Beispiel für transformierten Code:**

```tsx
// Ihr Code
const content = useIntlayer("my-key");

// Veranschaulichung des optimierten Codes (Fetch)
const content = useDictionaryAsync({
  en: () =>
    fetch("https://intlayer.my-domain.com/dictionary/my-key/en").then((res) =>
      res.json()
    ),
  de: () =>
    fetch("https://intlayer.my-domain.com/dictionary/my-key/de").then((res) =>
      res.json()
    ),
});
```

> Weitere Details finden Sie in der CMS-Dokumentation: [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_CMS.md)

> Im Fetch-Modus werden Purge und Minifizierung nicht angewendet, da das JSON von einer Remote-API mit den ursprünglichen Feldnamen bereitgestellt wird.

## Zusammenfassung: Statisch vs Dynamisch

| Feature                   | Statischer Modus                                  | Dynamischer Modus                      |
| :------------------------ | :------------------------------------------------ | :------------------------------------- |
| **JS Bundle-Größe**       | Größer (enthält alle Sprachen für die Komponente) | Kleinstmöglich (nur Code, kein Inhalt) |
| **Initiales Laden**       | Sofortig (Inhalt ist im Bundle)                   | Leichte Verzögerung (lädt JSON)        |
| **Netzwerkanfragen**      | 0 zusätzliche Anfragen                            | 1 Anfrage pro Wörterbuch-Schlüssel     |
| **Tree Shaking**          | Auf Komponentenebene                              | Auf Komponenten- + Länderebene         |
| **Bester Anwendungsfall** | UI-Komponenten, Kleine Apps                       | Textreiche Seiten, Viele Sprachen      |
