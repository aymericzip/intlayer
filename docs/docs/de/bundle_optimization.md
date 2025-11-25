---
createdAt: 2025-11-25
updatedAt: 2025-11-25
title: Optimierung der i18n-Bündelgröße & Leistung
description: Reduzieren Sie die Anwendungs-Bündelgröße durch Optimierung der Internationalisierungsinhalte (i18n). Erfahren Sie, wie Sie Tree Shaking und Lazy Loading für Wörterbücher mit Intlayer nutzen können.
keywords:
  - Bündeloptimierung
  - Inhaltsautomatisierung
  - Dynamische Inhalte
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - bundle-optimization
history:
  - version: 6.0.0
    date: 2025-11-25
    changes: Initiale Historie
---

# Optimierung der i18n-Bündelgröße & Leistung

Eine der häufigsten Herausforderungen bei herkömmlichen i18n-Lösungen, die auf JSON-Dateien basieren, ist die Verwaltung der Inhaltsgröße. Wenn Entwickler den Inhalt nicht manuell in Namespaces aufteilen, laden Benutzer oft Übersetzungen für jede Seite und potenziell jede Sprache herunter, nur um eine einzelne Seite anzusehen.

Zum Beispiel kann eine Anwendung mit 10 Seiten, die in 10 Sprachen übersetzt sind, dazu führen, dass ein Benutzer den Inhalt von 100 Seiten herunterlädt, obwohl er nur **eine** (die aktuelle Seite in der aktuellen Sprache) benötigt. Dies führt zu verschwendeter Bandbreite und längeren Ladezeiten.

> Um dies zu erkennen, können Sie Bundle-Analyzer wie `rollup-plugin-visualizer` (vite), `@next/bundle-analyzer` (next.js) oder `webpack-bundle-analyzer` (React CRA / Angular / etc) verwenden.

**Intlayer löst dieses Problem durch Optimierung zur Build-Zeit.** Es analysiert Ihren Code, um zu erkennen, welche Wörterbücher tatsächlich pro Komponente verwendet werden, und injiziert nur den notwendigen Inhalt in Ihr Bundle zurück.

## Funktionsweise

Intlayer verwendet einen **pro-Komponente-Ansatz**. Im Gegensatz zu globalen JSON-Dateien wird Ihr Inhalt neben oder innerhalb Ihrer Komponenten definiert. Während des Build-Prozesses:

1.  **Analysiert** Intlayer Ihren Code, um `useIntlayer`-Aufrufe zu finden.
2.  **Erstellt** den entsprechenden Wörterbuchinhalt.
3.  **Ersetzt** den `useIntlayer`-Aufruf durch optimierten Code basierend auf Ihrer Konfiguration.

Dies stellt sicher, dass:

- Wenn eine Komponente nicht importiert wird, ihr Inhalt nicht im Bundle enthalten ist (Dead Code Elimination).
- Wenn eine Komponente lazy geladen wird, wird ihr Inhalt ebenfalls lazy geladen.

## Einrichtung nach Plattform

### Next.js

Next.js benötigt das `@intlayer/swc` Plugin, um die Transformation zu verarbeiten, da Next.js SWC für Builds verwendet.

> Dieses Plugin ist standardmäßig installiert, da SWC-Plugins für Next.js noch experimentell sind. Dies kann sich in Zukunft ändern.

### Vite

Vite verwendet das `@intlayer/babel` Plugin, das als Abhängigkeit von `vite-intlayer` enthalten ist. Die Optimierung ist standardmäßig aktiviert.

### Webpack

Um die Bundle-Optimierung mit Intlayer in Webpack zu aktivieren, müssen Sie das entsprechende Babel- (`@intlayer/babel`) oder SWC- (`@intlayer/swc`) Plugin installieren und konfigurieren.

### Expo / Lynx

Die Bundle-Optimierung ist für diese Plattform **noch nicht verfügbar**. Die Unterstützung wird in einer zukünftigen Version hinzugefügt.

## Konfiguration

Sie können steuern, wie Intlayer Ihr Bundle über die `build`-Eigenschaft in Ihrer `intlayer.config.ts` optimiert.

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
  build: {
    optimize: true,
    importMode: "static", // oder 'dynamic'
    traversePattern: ["**/*.{js,ts,mjs,cjs,jsx,tsx}", "!**/node_modules/**"],
  },
};

export default config;
```

> Es wird empfohlen, die Standardoption für `optimize` in den meisten Fällen beizubehalten.

> Weitere Details finden Sie in der Dokumentation zur Konfiguration: [Configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md)

### Build-Optionen

Die folgenden Optionen sind im `build`-Konfigurationsobjekt verfügbar:

| Eigenschaft           | Typ                                       | Standardwert                    | Beschreibung                                                                                                                                                                                                                    |
| :-------------------- | :---------------------------------------- | :------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **`optimize`**        | `boolean`                                 | `undefined`                     | Steuert, ob die Build-Optimierung aktiviert ist. Wenn `true`, ersetzt Intlayer Wörterbuchaufrufe durch optimierte Injektionen. Wenn `false`, ist die Optimierung deaktiviert. Idealerweise in der Produktion auf `true` setzen. |
| **`importMode`**      | `'static' &#124; 'dynamic' &#124; 'live'` | `'static'`                      | Bestimmt, wie Wörterbücher geladen werden (siehe Details unten).                                                                                                                                                                |
| **`traversePattern`** | `string[]`                                | `['**/*.{js,ts,jsx,tsx}', ...]` | Glob-Muster, die definieren, welche Dateien Intlayer für die Optimierung durchsuchen soll. Verwenden Sie dies, um nicht verwandte Dateien auszuschließen und den Build zu beschleunigen.                                        |
| **`outputFormat`**    | `'esm' &#124; 'cjs'`                      | `'esm'`                         | Steuert das Ausgabeformat der erstellten Wörterbücher.                                                                                                                                                                          |

## Import-Modi

Die Einstellung `importMode` bestimmt, wie der Wörterbuchinhalt in Ihre Komponente injiziert wird.

### 1. Statischer Modus (`default`)

Im statischen Modus ersetzt Intlayer `useIntlayer` durch `useDictionary` und injiziert das Wörterbuch direkt in das JavaScript-Bündel.

- **Vorteile:** Sofortiges Rendering (synchron), keine zusätzlichen Netzwerk-Anfragen während der Hydrierung.
- **Nachteile:** Das Bündel enthält Übersetzungen für **alle** verfügbaren Sprachen für die jeweilige Komponente.
- **Am besten geeignet für:** Single Page Applications (SPA).

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

Im dynamischen Modus ersetzt Intlayer `useIntlayer` durch `useDictionaryAsync`. Dies verwendet `import()` (ein Suspense-ähnlicher Mechanismus), um speziell das JSON für die aktuelle Locale lazy zu laden.

- **Vorteile:** **Tree Shaking auf Locale-Ebene.** Ein Benutzer, der die englische Version ansieht, lädt _nur_ das englische Wörterbuch herunter. Das französische Wörterbuch wird niemals geladen.
- **Nachteile:** Löst während der Hydration pro Komponente eine Netzwerk-Anfrage (Asset-Fetch) aus.
- **Am besten geeignet für:** Große Textblöcke, Artikel oder Anwendungen, die viele Sprachen unterstützen und bei denen die Bundle-Größe kritisch ist.

**Transformiertes Code-Beispiel:**

```tsx
// Ihr Code
const content = useIntlayer("my-key");

// Optimierter Code (Dynamisch)
const content = useDictionaryAsync({
  en: () =>
    import(".intlayer/dynamic_dictionary/en.json").then((mod) => mod.default),
  fr: () =>
    import(".intlayer/dynamic_dictionary/fr.json").then((mod) => mod.default),
});
```

> Wenn Sie `importMode: 'dynamic'` verwenden und auf einer Seite 100 Komponenten `useIntlayer` nutzen, wird der Browser versuchen, 100 separate Abrufe durchzuführen. Um diese "Wasserfall"-Anfragen zu vermeiden, gruppieren Sie Inhalte in weniger `.content`-Dateien (z. B. ein Wörterbuch pro Seitenabschnitt) anstatt eines pro Atom-Komponente.

> Derzeit wird `importMode: 'dynamic'` für Vue und Svelte nicht vollständig unterstützt. Es wird empfohlen, für diese Frameworks bis zu weiteren Updates `importMode: 'static'` zu verwenden.

### 3. Live-Modus

Verhält sich ähnlich wie der Dynamische Modus, versucht jedoch zuerst, Wörterbücher von der Intlayer Live Sync API abzurufen. Wenn der API-Aufruf fehlschlägt oder der Inhalt nicht für Live-Updates markiert ist, wird auf den dynamischen Import zurückgegriffen.

> Siehe CMS-Dokumentation für weitere Details: [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_CMS.md)

## Zusammenfassung: Statisch vs Dynamisch

| Funktion           | Statischer Modus                                  | Dynamischer Modus                    |
| :----------------- | :------------------------------------------------ | :----------------------------------- |
| **JS-Bündelgröße** | Größer (enthält alle Sprachen für die Komponente) | Am kleinsten (nur Code, kein Inhalt) |

Verhält sich ähnlich wie der dynamische Modus, versucht jedoch zuerst, Wörterbücher von der Intlayer Live Sync API abzurufen. Wenn der API-Aufruf fehlschlägt oder der Inhalt nicht für Live-Updates markiert ist, wird auf den dynamischen Import zurückgegriffen.

> Siehe CMS-Dokumentation für weitere Details: [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_CMS.md)

## Zusammenfassung: Statisch vs Dynamisch

| Funktion                  | Statischer Modus                                  | Dynamischer Modus                    |
| :------------------------ | :------------------------------------------------ | :----------------------------------- |
| **JS-Bündelgröße**        | Größer (enthält alle Sprachen für die Komponente) | Am kleinsten (nur Code, kein Inhalt) |
| **Initiale Ladezeit**     | Sofort (Inhalt ist im Bündel)                     | Leichte Verzögerung (lädt JSON)      |
| **Netzwerk-Anfragen**     | 0 zusätzliche Anfragen                            | 1 Anfrage pro Wörterbuch             |
| **Tree Shaking**          | Komponenten-Ebene                                 | Komponenten-Ebene + Sprachebene      |
| **Beste Anwendungsfälle** | UI-Komponenten, kleine Apps                       | Seiten mit viel Text, viele Sprachen |
