---
createdAt: 2024-08-13
updatedAt: 2026-03-20
title: Konfiguration (Configuration)
description: Erfahren Sie, wie Sie Intlayer für Ihre Anwendung konfigurieren. Verstehen Sie die verschiedenen Einstellungen und Optionen, die zur Anpassung von Intlayer an Ihre Bedürfnisse zur Verfügung stehen.
keywords:
  - Konfiguration
  - Einstellungen
  - Anpassung
  - Intlayer
  - Optionen
slugs:
  - doc
  - concept
  - configuration
history:
  - version: 8.4.0
    date: 2026-03-20
    changes: Pro-Locale Objektnotation für 'compiler.output' und 'dictionary.fill' hinzugefügt
  - version: 8.3.0
    date: 2026-03-11
    changes: "'baseDir' von Content-Konfiguration in System-Konfiguration verschoben"
  - version: 8.2.0
    date: 2026-03-09
    changes: Compiler-Optionen aktualisiert, Unterstützung für 'output' und 'noMetadata' hinzugefügt
  - version: 8.1.7
    date: 2026-02-25
    changes: Compiler-Optionen aktualisiert
  - version: 8.1.5
    date: 2026-02-23
    changes: Compiler-Option 'build-only' und Wörterbuch-Präfix hinzugefügt
  - version: 8.0.6
    date: 2026-02-12
    changes: Unterstützung für Open Router, Alibaba, Amazon, Google Vertex Bedrock, Fireworks, Groq, Hugging Face und Together.ai Anbieter hinzugefügt
  - version: 8.0.5
    date: 2026-02-06
    changes: `dataSerialization` zur AI-Konfiguration hinzugefügt
  - version: 8.0.0
    date: 2026-01-24
    changes: Import-Modus `live` in `fetch` umbenannt, um den zugrunde liegenden Mechanismus besser zu beschreiben.
  - version: 8.0.0
    date: 2026-01-22
    changes: Build-Konfiguration `importMode` in die Dictionary-Konfiguration verschoben.
  - version: 8.0.0
    date: 2026-01-22
    changes: Option `rewrite` zur Routing-Konfiguration hinzugefügt
  - version: 8.0.0
    date: 2026-01-18
    changes: Systemkonfiguration von Content-Konfiguration getrennt. Interne Pfade in die Eigenschaft `system` verschoben. `codeDir` hinzugefügt, um Content-Dateien und Code-Transformation zu trennen.
  - version: 8.0.0
    date: 2026-01-18
    changes: Dictionary-Optionen `location` und `schema` hinzugefügt
  - version: 7.5.1
    date: 2026-01-10
    changes: Unterstützung für JSON5- und JSONC-Dateiformate hinzugefügt
  - version: 7.5.0
    date: 2025-12-17
    changes: Option `buildMode` hinzugefügt
  - version: 7.0.0
    date: 2025-10-25
    changes: Konfiguration `dictionary` hinzugefügt
  - version: 7.0.0
    date: 2025-10-21
    changes: `middleware` durch Routing-Konfiguration `routing` ersetzt
  - version: 7.0.0
    date: 2025-10-12
    changes: Option `formatCommand` hinzugefügt
  - version: 6.2.0
    date: 2025-10-12
    changes: Option `excludedPath` aktualisiert
  - version: 6.0.2
    date: 2025-09-23
    changes: Option `outputFormat` hinzugefügt
  - version: 6.0.0
    date: 2025-09-21
    changes: Feld `dictionaryOutput` und Feld `i18nextResourcesDir` entfernt
  - version: 6.0.0
    date: 2025-09-16
    changes: Import-Modus `live` hinzugefügt
  - version: 6.0.0
    date: 2025-09-04
    changes: Feld `hotReload` durch `liveSync` ersetzt, und Felder `liveSyncPort` und `liveSyncURL` hinzugefügt
  - version: 5.6.1
    date: 2025-07-25
    changes: `activateDynamicImport` durch die Option `importMode` ersetzt
  - version: 5.6.0
    date: 2025-07-13
    changes: Standardmäßiges Verbzeichnis `contentDir` von `['src']` auf `['.']` geändert
  - version: 5.5.11
    date: 2025-06-29
    changes: `docs` Befehle hinzugefügt
---

# Intlayer Konfigurations-Dokumentation

## Überblick

Die Intlayer-Konfigurationsdateien ermöglichen es Ihnen, verschiedene Aspekte des Plugins anzupassen, wie z. B. die Internationalisierung (internationalization), die Middleware und die Inhaltsverarbeitung. Diese Dokumentation enthält eine detaillierte Beschreibung jeder Eigenschaft in der Konfiguration.

---

## Inhaltsverzeichnis

<TOC/>

---

## Unterstützte Dateiformate für die Konfiguration

Intlayer akzeptiert die Konfigurations-Dateiformate JSON, JS, MJS und TS:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.json5`
- `intlayer.config.jsonc`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

---

## Beispiel einer Konfigurationsdatei

````typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";
import { nextjsRewrite } from "intlayer/routing";
import { z } from "zod";

/**
 * Beispiel für eine Intlayer-Konfigurationsdatei mit allen verfügbaren Optionen.
 */
const config: IntlayerConfig = {
  /**
   * Konfiguration für Internationalisierungseinstellungen.
   */
  internationalization: {
    /**
     * Liste der in der Anwendung unterstützten Gebietsschemata (locales).
     * Standard: [Locales.ENGLISH]
     */
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],

    /**
     * Liste der obligatorischen Gebietsschemata, die in jedem Wörterbuch definiert sein müssen.
     * Wenn leer, sind im `strict`-Modus alle Gebietsschemata obligatorisch.
     * Standard: []
     */
    requiredLocales: [Locales.ENGLISH],

    /**
     * Die Strenge-Ebene für internationalisierte Inhalte.
     * - "strict": Fehler, wenn ein deklariertes Gebietsschema fehlt oder nicht deklariert ist.
     * - "inclusive": Warnung, wenn ein deklariertes Gebietsschema fehlt.
     * - "loose": Akzeptiert jedes vorhandene Gebietsschema.
     * Standard: "inclusive"
     */
    strictMode: "inclusive",

    /**
     * Das Standard-Gebietsschema, das als Fallback verwendet wird, wenn das angeforderte Gebietsschema nicht gefunden wird.
     * Standard: Locales.ENGLISH
     */
    defaultLocale: Locales.ENGLISH,
  },

  /**
   * Einstellungen zur Steuerung der Wörterbuchoperationen und des Fallback-Verhaltens.
   */
  dictionary: {
    /**
     * Steuert, wie Wörterbücher importiert werden.
     * - "static": Statisch zur Build-Zeit importiert.
     * - "dynamic": Dynamisch importiert unter Verwendung von Suspense.
     * - "fetch": Dynamisch abgerufen über die Live Sync API.
     * Standard: "static"
     */
    importMode: "static",

    /**
     * Strategie zum automatischen Ausfüllen fehlender Übersetzungen mittels KI.
     * Kann ein boolescher Wert oder ein Pfadmuster zum Speichern der ausgefüllten Inhalte sein.
     * Standard: true
     */
    fill: true,

    /**
     * Der physische Speicherort der Wörterbuchdateien.
     * - "local": Im lokalen Dateisystem gespeichert.
     * - "remote": Im Intlayer CMS gespeichert.
     * - "hybrid": Sowohl lokal als auch im Intlayer CMS gespeichert.
     * - "plugin" (oder ein beliebiger benutzerdefinierter String): Von einem Plugin oder einer benutzerdefinierten Quelle bereitgestellt.
     * Standard: "local"
     */
    location: "local",

    /**
     * Ob Inhalte automatisch transformiert werden sollen (z. B. Markdown zu HTML).
     * Standard: false
     */
    contentAutoTransformation: false,
  },

  /**
   * Routing- und Middleware-Konfiguration.
   */
  routing: {
    /**
     * Strategie für das Locale-Routing.
     * - "prefix-no-default": Stellt allen Locales außer der Standard-Locale ein Präfix voran (z. B. /dashboard, /fr/dashboard).
     * - "prefix-all": Stellt allen Locales ein Präfix voran (z. B. /en/dashboard, /fr/dashboard).
     * - "no-prefix": Keine Locale in der URL.
     * - "search-params": Verwendet ?locale=...
     * Standard: "prefix-no-default"
     */
    mode: "prefix-no-default",

    /**
     * Wo die vom Benutzer gewählte Locale gespeichert werden soll.
     * Optionen: 'cookie', 'localStorage', 'sessionStorage', 'header' oder ein Array davon.
     * Standard: ['cookie', 'header']
     */
    storage: ["cookie", "header"],

    /**
     * Der Basispfad für die URLs der Anwendung.
     * Standard: ""
     */
    basePath: "",

    /**
     * Benutzerdefinierte URL-Rewrite-Regeln für bestimmte Pfade pro Gebietsschema.
     */
    rewrite: nextjsRewrite({
      "/[locale]/about": {
        en: "/[locale]/about",
        fr: "/[locale]/a-propos",
      },
    }),
  },

  /**
   * Einstellungen in Bezug auf die Suche und Verarbeitung von Inhaltsdateien.
   */
  content: {
    /**
     * Dateierweiterungen zum Scannen von Wörterbüchern.
     * Standard: ['.content.ts', '.content.js', '.content.json', usw.]
     */
    fileExtensions: [".content.ts", ".content.js", ".content.json"],

    /**
     * Verzeichnisse, in denen sich die .content-Dateien befinden.
     * Standard: ["."]
     */
    contentDir: ["src"],

    /**
     * Wo sich der Quellcode befindet.
     * Wird für die Build-Optimierung und Code-Transformation verwendet.
     * Standard: ["."]
     */
    codeDir: ["src"],

    /**
     * Muster, die vom Scan ausgeschlossen sind.
     * Standard: ['node_modules', '.intlayer', usw.]
     */
    excludedPath: ["node_modules"],

    /**
     * Ob Änderungen überwacht und Wörterbücher während der Entwicklung neu erstellt werden sollen.
     * Standard: true im Entwicklungsmodus
     */
    watch: true,

    /**
     * Befehl zum Formatieren neu erstellter / aktualisierter .content-Dateien.
     */
    formatCommand: 'npx prettier --write "{{file}}"',
  },

  /**
   * Konfiguration für den Visuellen Editor (Visual Editor).
   */
  editor: {
    /**
     * Ob der visuelle Editor aktiviert ist.
     * Standard: false
     */
    enabled: true,

    /**
     * Die URL Ihrer Anwendung für die Origin-Validierung.
     * Standard: ""
     */
    applicationURL: "http://localhost:3000",

    /**
     * Port für den lokalen Editor-Server.
     * Standard: 8000
     */
    port: 8000,

    /**
     * Die öffentliche URL für den Editor.
     * Standard: "http://localhost:8000"
     */
    editorURL: "http://localhost:8000",

    /**
     * URL des Intlayer CMS.
     * Standard: "https://app.intlayer.org"
     */
    cmsURL: "https://app.intlayer.org",

    /**
     * Backend-API-URL.
     * Standard: "https://back.intlayer.org"
     */
    backendURL: "https://back.intlayer.org",

    /**
     * Ob die Inhalts-Synchronisierung in Echtzeit aktiviert werden soll.
     * Standard: false
     */
    liveSync: true,
  },

  /**
   * AI-basierte Einstellungen für Übersetzung und Erstellung.
   */
  ai: {
    /**
     * Der zu verwendende AI-Anbieter.
     * Optionen: 'openai', 'anthropic', 'mistral', 'deepseek', 'gemini', 'ollama', 'openrouter', 'alibaba', 'fireworks', 'groq', 'huggingface', 'bedrock', 'googlevertex', 'togetherai'
     * Standard: 'openai'
     */
    provider: "openai",

    /**
     * Modell des gewählten Anbieters zur Verwendung.
     */
    model: "gpt-4o",

    /**
     * API-Key des Anbieters.
     */
    apiKey: process.env.OPENAI_API_KEY,

    /**
     * Globaler Kontext zur Anleitung der KI beim Erstellen von Übersetzungen.
     */
    applicationContext: "Dies ist eine Reisebuchungsanwendung.",

    /**
     * Basis-URL für die AI-API.
     */
    baseURL: "http://localhost:3000",

    /**
     * Datenserialisierung (Data Serialization)
     *
     * Optionen:
     * - "json": Standard, robust; verbraucht mehr Token.
     * - "toon": Verbraucht weniger Token, ist möglicherweise nicht so konsistent wie JSON.
     *
     * Standard: "json"
     */
    dataSerialization: "json",
  },

  /**
   * Build- und Optimierungseinstellungen.
   */
  build: {
    /**
     * Modus für die Build-Ausführung.
     * - "auto": Wird automatisch während des Builds der Anwendung erstellt.
     * - "manual": Erfordert einen expliziten Build-Befehl.
     * Standard: "auto"
     */
    mode: "auto",

    /**
     * Ob das finale Bundle durch Entfernen ungenutzter Wörterbücher optimiert werden soll.
     * Standard: true in Produktion
     */
    optimize: true,

    /**
     * Ausgabeformat für die generierten Wörterbuchdateien.
     * Standard: ['cjs', 'esm']
     */
    outputFormat: ["cjs", "esm"],

    /**
     * Gibt an, ob der Build TypeScript-Typen prüfen soll.
     * Standard: false
     */
    checkTypes: false,
  },

  /**
   * Logger-Konfiguration.
   */
  log: {
    /**
     * Logging-Ebene.
     * - "default": Standardmäßiges Logging.
     * - "verbose": Detailliertes Debug-Logging.
     * - "disabled": Deaktiviert das Logging.
     * Standard: "default"
     */
    mode: "default",

    /**
     * Präfix für alle Log-Nachrichten.
     * Standard: "[intlayer]"
     */
    prefix: "[intlayer]",
  },

  /**
   * Systemkonfiguration (Für fortgeschrittene Nutzung)
   */
  system: {
    /**
     * Verzeichnis zum Speichern lokalisierter Wörterbücher.
     */
    dictionariesDir: ".intlayer/dictionary",

    /**
     * Verzeichnis für TypeScript Module Augmentation.
     */
    moduleAugmentationDir: ".intlayer/types",

    /**
     * Verzeichnis zum Speichern nicht zusammengeführter (unmerged) Wörterbücher.
     */
    unmergedDictionariesDir: ".intlayer/unmerged_dictionary",

    /**
     * Verzeichnis zum Speichern von Wörterbuchtypen.
     */
    typesDir: ".intlayer/types",

    /**
     * Verzeichnis, in dem die Hauptanwendungsdateien gespeichert sind.
     */
    mainDir: ".intlayer/main",

    /**
     * Verzeichnis, in dem die Konfigurationsdateien gespeichert sind.
     */
    configDir: ".intlayer/config",

    /**
     * Verzeichnis, in dem Cache-Dateien gespeichert sind.
     */
    cacheDir: ".intlayer/cache",
  },

  /**
   * Compiler-Konfiguration (Für fortgeschrittene Nutzung)
   */
  compiler: {
    /**
     * Gibt an, ob der Compiler aktiviert sein soll.
     *
     * - false: Deaktiviert den Compiler.
     * - true: Aktiviert den Compiler.
     * - "build-only": Überspringt den Compiler während der Entwicklung und beschleunigt die Startzeit.
     *
     * Standard: false
     */
    enabled: true,

    /**
     * Definiert den Pfad für Ausgabedateien. Ersetzt `outputDir`.
     *
     * - Pfade mit `./` werden relativ zum Komponentenverzeichnis aufgelöst.
     * - Pfade mit `/` werden relativ zum Projektstamm (`baseDir`) aufgelöst.
     *
     * - Die Einbeziehung der Variable `{{locale}}` im Pfad löst die Erstellung separater Wörterbücher pro Sprache aus.
     *
     * Beispiel:
     * ```ts
     * {
     *   // Erstelle mehrsprachige .content.ts-Dateien neben der Komponente
     *   output: ({ fileName, extension }) => `./${fileName}${extension}`,
     *
     *   // output: './{{fileName}}{{extension}}', // Entspricht der Verwendung eines Template-Strings
     * }
     * ```
     *
     * ```ts
     * {
     *   // Erstelle zentralisierte JSON-Dateien pro Sprache im Projektstamm
     *   output: ({ key, locale }) => `/locales/${locale}/${key}.content.json`,
     *
     *   // output: '/locales/{{locale}}/{{key}}.content.json', // Entspricht der Verwendung eines Template-Strings
     * }
     * ```
     *
     * Liste der Variablen:
     *   - `fileName`: Dateiname.
     *   - `key`: Content-Key.
     *   - `locale`: Content-Locale.
     *   - `extension`: Dateierweiterung.
     *   - `componentFileName`: Dateiname der Komponente.
     *   - `componentExtension`: Dateierweiterung der Komponente.
     *   - `format`: Wörterbuchformat.
     *   - `componentFormat`: Wörterbuchformat der Komponente.
     *   - `componentDirPath`: Pfad zum Komponentenverzeichnis.
     */
    output: ({ locale, key }) => `compiler/${locale}/${key}.json`,

    /**
     * Gibt an, ob Komponenten nach der Transformation gespeichert werden sollen.
     * Auf diese Weise kann der Compiler nur einmal ausgeführt werden, um die Anwendung zu transformieren, und kann dann entfernt werden.
     */
    saveComponents: false,

    /**
     * Fügt nur den Inhalt in die generierte Datei ein. Nützlich für die JSON-Ausgabe pro Sprache für i18next oder ICU MessageFormat.
     */
    noMetadata: false,

    /**
     * Dictionary-Key-Präfix
     */
    dictionaryKeyPrefix: "", // Fügen Sie den extrahierten Dictionary-Keys ein optionales Präfix hinzu
  },

  /**
   * Benutzerdefinierte Schemas (Schemas) zur Validierung der Wörterbuchinhalte.
   */
  schemas: {
    "my-schema": z.object({
      title: z.string(),
    }),
  },

  /**
   * Plugin-Konfiguration (Plugins).
   */
  plugins: [],
};

export default config;
````

---

## Referenz zur Konfiguration (Configuration Reference)

In den folgenden Abschnitten werden die verschiedenen in Intlayer verfügbaren Konfigurationsoptionen beschrieben.

---

### Konfiguration für Internationalisierung (Internationalization Configuration)

Definiert Einstellungen in Bezug auf die Internationalisierung, einschließlich der verfügbaren Locales und der Standard-Locale für die Anwendung.

| Feld              | Typ        | Beschreibung                                                                                                                    | Beispiel             | Hinweis                                                                                                                                                                                                                                                                                                       |
| ----------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `locales`         | `string[]` | Liste der in der Anwendung unterstützten Locales. Standard: `[Locales.ENGLISH]`                                                 | `['en', 'fr', 'es']` |                                                                                                                                                                                                                                                                                                               |
| `requiredLocales` | `string[]` | Liste der obligatorischen Locales in der Anwendung. Standard: `[]`                                                              | `[]`                 | Wenn leer, sind im `strict`-Modus alle Locales obligatorisch. Stellen Sie sicher, dass obligatorische Locales auch im Feld `locales` definiert sind.                                                                                                                                                          |
| `strictMode`      | `string`   | Gewährleistet eine robuste Implementierung internationalisierter Inhalte unter Verwendung von TypeScript. Standard: `inclusive` |                      | Wenn `"strict"`: Die `t`-Funktion erfordert, dass jede deklarierte Locale definiert ist — gibt einen Fehler aus, wenn eine fehlt oder nicht deklariert ist. Wenn `"inclusive"`: Warnt bei fehlenden Locales, akzeptiert aber vorhandene nicht deklarierte. Wenn `"loose"`: Akzeptiert jede vorhandene Locale. |
| `defaultLocale`   | `string`   | Standard-Locale, die als Fallback verwendet wird, wenn die angeforderte Locale nicht gefunden wird. Standard: `Locales.ENGLISH` | `'en'`               | Wird verwendet, um die Locale zu bestimmen, wenn keine in der URL, im Cookie oder im Header angegeben ist.                                                                                                                                                                                                    |

---

### Konfiguration für den Editor (Editor Configuration)

Definiert Einstellungen im Zusammenhang mit dem integrierten Editor, einschließlich Serverport und Aktivitätsstatus.

| Feld                         | Typ                       | Beschreibung                                                                                                                                                                                                      | Beispiel                                                                              | Hinweis                                                                                                                                                                                                                                                            |
| ---------------------------- | ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `applicationURL`             | `string`                  | Die URL Ihrer Anwendung. Standard: `''`                                                                                                                                                                           | `'http://localhost:3000'`, `'https://example.com'`, `process.env.INTLAYER_EDITOR_URL` | Wird verwendet, um die Ursprünge (Origins) des Editors aus Sicherheitsgründen einzuschränken. Wenn auf `'*'` gesetzt, kann von jedem Origin aus auf den Editor zugegriffen werden.                                                                                 |
| `port`                       | `number`                  | Port, der vom Visual Editor-Server verwendet wird. Standard: `8000`                                                                                                                                               |                                                                                       |                                                                                                                                                                                                                                                                    |
| `editorURL`                  | `string`                  | URL des Editor-Servers. Standard: `'http://localhost:8000'`                                                                                                                                                       | `'http://localhost:3000'`, `'https://example.com'`, `process.env.INTLAYER_EDITOR_URL` | Wird verwendet, um die Origins einzuschränken, die mit der Anwendung interagieren können. Wenn auf `'*'` gesetzt, von jedem Origin aus zugänglich. Muss gesetzt werden, wenn der Port geändert wird oder der Editor auf einer anderen Domain gehostet wird.        |
| `cmsURL`                     | `string`                  | URL des Intlayer CMS. Standard: `'https://intlayer.org'`                                                                                                                                                          | `'https://intlayer.org'`                                                              |                                                                                                                                                                                                                                                                    |
| `backendURL`                 | `string`                  | Backend-Server-URL. Standard: `https://back.intlayer.org`                                                                                                                                                         | `http://localhost:4000`                                                               |                                                                                                                                                                                                                                                                    |
| `enabled`                    | `boolean`                 | Gibt an, ob die App mit dem visuellen Editor interagiert. Standard: `true`                                                                                                                                        | `process.env.NODE_ENV !== 'production'`                                               | Wenn `false`, kann der Editor nicht mit der App interagieren. Die Deaktivierung für bestimmte Umgebungen erhöht die Sicherheit.                                                                                                                                    |
| `clientId`                   | `string &#124; undefined` | Ermöglicht es Intlayer-Paketen, sich über oAuth2 am Backend zu authentifizieren. Um einen Zugriffstoken zu erhalten, gehen Sie zu [intlayer.org/project](https://app.intlayer.org/project). Standard: `undefined` |                                                                                       | Geheim halten; in Umgebungsvariablen speichern.                                                                                                                                                                                                                    |
| `clientSecret`               | `string &#124; undefined` | Ermöglicht es Intlayer-Paketen, sich über oAuth2 am Backend zu authentifizieren. Um einen Zugriffstoken zu erhalten, gehen Sie zu [intlayer.org/project](https://app.intlayer.org/project). Standard: `undefined` |                                                                                       | Geheim halten; in Umgebungsvariablen speichern.                                                                                                                                                                                                                    |
| `dictionaryPriorityStrategy` | `string`                  | Strategie zur Priorisierung von Wörterbüchern, wenn sowohl lokale als auch entfernte Wörterbücher vorhanden sind. Standard: `'local_first'`                                                                       | `'distant_first'`                                                                     | `'distant_first'`: Priorisiert entfernte (Remote) vor lokalen. `'local_first'`: Priorisiert lokale vor entfernten.                                                                                                                                                 |
| `liveSync`                   | `boolean`                 | Gibt an, ob der Anwendungsserver Inhalte neu laden soll, wenn eine Änderung im CMS / Visual Editor / Backend erkannt wird. Standard: `true`                                                                       | `true`                                                                                | Wenn ein Wörterbuch hinzugefügt/aktualisiert wird, aktualisiert die App den Seiteninhalt. Live Sync lagert den Inhalt auf einen anderen Server aus, was die Leistung geringfügig beeinträchtigen kann. Es wird empfohlen, beides auf derselben Maschine zu hosten. |
| `liveSyncPort`               | `number`                  | Port des Live Sync Servers. Standard: `4000`                                                                                                                                                                      | `4000`                                                                                |                                                                                                                                                                                                                                                                    |
| `liveSyncURL`                | `string`                  | URL des Live Sync Servers. Standard: `'http://localhost:{liveSyncPort}'`                                                                                                                                          | `'https://example.com'`                                                               | Zeigt standardmäßig auf localhost; kann auf einen entfernten Live Sync Server geändert werden.                                                                                                                                                                     |

### Konfiguration für Routing (Routing Configuration)

Einstellungen, die das Routing-Verhalten steuern, einschließlich URL-Struktur, Locale-Speicherung und Middleware-Handhabung.

| Feld       | Typ                                                                                                                                                  | Beschreibung                                                                                                                                                               | Beispiel                                                                                                                                                                                                        | Hinweis                                                                                                                                                                                                                                                                  |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `mode`     | `'prefix-no-default' &#124; 'prefix-all' &#124; 'no-prefix' &#124; 'search-params'`                                                                  | URL-Routing-Modus für die Behandlung von Locales. Standard: `'prefix-no-default'`                                                                                          | `'prefix-no-default'`: `/dashboard` (en) oder `/fr/dashboard` (fr). `'prefix-all'`: `/en/dashboard`. `'no-prefix'`: Locale wird auf andere Weise behandelt. `'search-params'`: Verwendet `/dashboard?locale=fr` | Beeinflusst nicht die Verwaltung von Cookies oder Locale Storage.                                                                                                                                                                                                        |
| `storage`  | `false &#124; 'cookie' &#124; 'localStorage' &#124; 'sessionStorage' &#124; 'header' &#124; CookiesAttributes &#124; StorageAttributes &#124; Array` | Konfiguration zum Speichern der Locale auf dem Client. Standard: `['cookie', 'header']`                                                                                    | `'localStorage'`, `[{ type: 'cookie', name: 'custom-locale', secure: true }]`                                                                                                                                   | Siehe die Tabelle Speicheroptionen unten.                                                                                                                                                                                                                                |
| `basePath` | `string`                                                                                                                                             | Der Basispfad für die URLs der Anwendung. Standard: `''`                                                                                                                   | `'/my-app'`                                                                                                                                                                                                     | Wenn sich die Anwendung unter `https://example.com/my-app` befindet, ist basePath `'/my-app'` und URLs werden zu `https://example.com/my-app/en`.                                                                                                                        |
| `rewrite`  | `Record<string, StrictModeLocaleMap<string>>`                                                                                                        | Benutzerdefinierte URL-Rewrite-Regeln, die den Standard-Routing-Modus für bestimmte Pfade überschreiben. Unterstützt dynamische Parameter `[param]`. Standard: `undefined` | Beispiel siehe unten                                                                                                                                                                                            | Rewrite-Regeln haben Priorität über `mode`. Funktioniert mit Next.js und Vite. `getLocalizedUrl()` wendet passende Regeln automatisch an. Siehe [Benutzerdefinierte URL-Rewrites](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/custom_url_rewrites.md). |

**Beispiel für `rewrite`**:

```typescript
routing: {
  mode: "prefix-no-default", // Fallback-Strategie
  rewrite: nextjsRewrite({
    "/about": {
      en: "/about",
      fr: "/a-propos",
    },
    "/product/[slug]": {
      en: "/product/[slug]",
      fr: "/produit/[slug]",
    },
    "/blog/[category]/[id]": {
      en: "/blog/[category]/[id]",
      fr: "/journal/[category]/[id]",
    },
  }),
}
```

#### Speicheroptionen (Storage Options)

| Wert               | Beschreibung                                                                       | Hinweis                                                                                                                                                                                                                         |
| ------------------ | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `'cookie'`         | Speichert die Locale in Cookies — sowohl client- als auch serverseitig zugänglich. | Stellen Sie für die DSGVO-Konformität sicher, dass die entsprechende Zustimmung des Benutzers eingeholt wurde. Anpassbar über `CookiesAttributes` (`{ type: 'cookie', name: 'custom-locale', secure: true, httpOnly: false }`). |
| `'localStorage'`   | Speichert die Locale im Browser ohne Ablaufdatum — nur clientseitig.               | Läuft erst ab, wenn explizit gelöscht. Der Intlayer-Proxy kann darauf nicht zugreifen. Anpassbar über `StorageAttributes` (`{ type: 'localStorage', name: 'custom-locale' }`).                                                  |
| `'sessionStorage'` | Speichert die Locale für die Dauer der Seitensitzung — nur clientseitig.           | Wird beim Schließen des Tabs/Fensters gelöscht. Der Intlayer-Proxy kann darauf nicht zugreifen. Anpassbar über `StorageAttributes` (`{ type: 'sessionStorage', name: 'custom-locale' }`).                                       |
| `'header'`         | Speichert oder überträgt die Locale über HTTP-Header — nur serverseitig.           | Nützlich für API-Aufrufe. Die Clientseite kann darauf nicht zugreifen. Anpassbar über `StorageAttributes` (`{ type: 'header', name: 'custom-locale' }`).                                                                        |

#### Cookie-Attribute (Cookie Attributes)

Bei der Speicherung über Cookies können Sie zusätzliche Cookie-Attribute konfigurieren:

| Feld       | Typ                                   | Beschreibung                                            |
| ---------- | ------------------------------------- | ------------------------------------------------------- |
| `name`     | `string`                              | Cookie-Name. Standard: `'INTLAYER_LOCALE'`              |
| `domain`   | `string`                              | Cookie-Domain. Standard: `undefined`                    |
| `path`     | `string`                              | Cookie-Pfad. Standard: `undefined`                      |
| `secure`   | `boolean`                             | Benötigt HTTPS. Standard: `undefined`                   |
| `httpOnly` | `boolean`                             | HTTP-only Flag. Standard: `undefined`                   |
| `sameSite` | `'strict' &#124; 'lax' &#124; 'none'` | SameSite-Richtlinie.                                    |
| `expires`  | `Date &#124; number`                  | Ablaufdatum oder Anzahl der Tage. Standard: `undefined` |

#### Locale Storage-Attribute (Locale Storage Attributes)

Bei Verwendung von localStorage oder sessionStorage:

| Feld   | Typ                                      | Beschreibung                                               |
| ------ | ---------------------------------------- | ---------------------------------------------------------- |
| `type` | `'localStorage' &#124; 'sessionStorage'` | Speichertyp.                                               |
| `name` | `string`                                 | Name des Speicherschlüssels. Standard: `'INTLAYER_LOCALE'` |

#### Konfigurationsbeispiele

Hier sind einige gängige Konfigurationsbeispiele für die neue v7-Routing-Struktur:

**Basiskonfiguration (Standard)**:

```typescript
import { Locales, type IntlayerConfig } from "intlayer";
// intlayer.config.ts
const config: IntlayerConfig = {
  internationalization: {
    locales: ["en", "fr", "es"],
    defaultLocale: "en",
  },
  routing: {
    mode: "prefix-no-default",
    storage: "localStorage",
    basePath: "",
  },
};

export default config;
```

**DSGVO-konforme Konfiguration**:

```typescript
import { Locales, type IntlayerConfig } from "intlayer";
// intlayer.config.ts
const config: IntlayerConfig = {
  internationalization: {
    locales: ["en", "fr", "es"],
    defaultLocale: "en",
  },
  routing: {
    mode: "prefix-no-default",
    storage: [
      {
        type: "localStorage",
        name: "user-locale",
      },
      {
        type: "cookie",
        name: "user-locale",
        secure: true,
        sameSite: "strict",
        httpOnly: false,
      },
    ],
    basePath: "",
  },
};

export default config;
```

**Suchparameter-Modus (Search Parameters Mode)**:

```typescript
import { Locales, type IntlayerConfig } from "intlayer";
// intlayer.config.ts
const config: IntlayerConfig = {
  internationalization: {
    locales: ["en", "fr", "es"],
    defaultLocale: "en",
  },
  routing: {
    mode: "search-params",
    storage: "localStorage",
    basePath: "",
  },
};

export default config;
```

**Präfixfreier Modus (No Prefix Mode) mit benutzerdefiniertem Speicher**:

```typescript
import { Locales, type IntlayerConfig } from "intlayer";
// intlayer.config.ts
const config: IntlayerConfig = {
  internationalization: {
    locales: ["en", "fr", "es"],
    defaultLocale: "en",
  },
  routing: {
    mode: "no-prefix",
    storage: {
      type: "sessionStorage",
      name: "app-locale",
    },
    basePath: "/my-app",
  },
};

export default config;
```

**Benutzerdefinierter URL-Rewrite mit dynamischen Pfaden**:

```typescript
// intlayer.config.ts
import { nextjsRewrite } from "intlayer/routing";

const config: IntlayerConfig = {
  internationalization: {
    locales: ["en", "fr"],
    defaultLocale: "en",
  },
  routing: {
    mode: "prefix-no-default", // Fallback für Pfade ohne Rewrite
    storage: "cookie",
    rewrite: nextjsRewrite({
      "/about": {
        en: "/about",
        fr: "/a-propos",
      },
      "/product/[slug]": {
        en: "/product/[slug]",
        fr: "/produit/[slug]",
      },
      "/blog/[category]/[id]": {
        en: "/blog/[category]/[id]",
        fr: "/journal/[category]/[id]",
      },
    }),
  },
};

export default config;
```

---

### Konfiguration für Content (Content Configuration)

Einstellungen in Bezug auf die Verarbeitung von Inhalten innerhalb der Anwendung (Verzeichnisnamen, Dateierweiterungen und abgeleitete Konfigurationen).

| Feld             | Typ        | Beschreibung                                                                                                                                                                                                         | Beispiel                            | Hinweis                                                                                                                                                    |
| ---------------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `watch`          | `boolean`  | Gibt an, ob Intlayer Änderungen an Inhaltsdeklarationsdateien überwachen soll, um Wörterbücher neu zu erstellen. Standard: `process.env.NODE_ENV === 'development'`                                                  |                                     |                                                                                                                                                            |
| `fileExtensions` | `string[]` | Dateierweiterungen, die zum Scannen von Inhaltsdeklarationsdateien verwendet werden. Standard: `['.content.ts', '.content.js', '.content.mjs', '.content.cjs', '.content.json', '.content.json5', '.content.jsonc']` | `['.content.ts', '.content.js']`    |                                                                                                                                                            |
| `contentDir`     | `string[]` | Pfade zu Verzeichnissen, in denen sich die Inhaltsdeklarationsdateien befinden. Standard: `['.']`                                                                                                                    | `['src/content']`                   |                                                                                                                                                            |
| `codeDir`        | `string[]` | Pfade zu Verzeichnissen, in denen sich die Quellcodedateien Ihrer Anwendung befinden. Standard: `['.']`                                                                                                              | `['src']`                           | Wird zur Optimierung des Builds verwendet und stellt sicher, dass Code-Transformation und Hot Reload nur auf die erforderlichen Dateien angewendet werden. |
| `excludedPath`   | `string[]` | Pfade, die vom Inhalts-Scan ausgeschlossen sind. Standard: `['node_modules', '.intlayer', '.next', 'dist', 'build']`                                                                                                 | `['src/styles']`                    |                                                                                                                                                            |
| `formatCommand`  | `string`   | Befehl, der ausgeführt wird, um neu erstellte oder aktualisierte Inhaltsdateien zu formatieren. Standard: `undefined`                                                                                                | `'npx prettier --write "{{file}}"'` | Wird während der Inhalts-Extraktion oder über den visuellen Editor verwendet.                                                                              |

---

### Konfiguration für Wörterbücher (Dictionary Configuration)

Einstellungen, die den Betrieb von Wörterbüchern steuern, einschließlich des Verhaltens beim automatischen Ausfüllen und der Inhaltsgenerierung.

Diese Wörterbuchkonfiguration hat zwei Hauptzwecke:

1. **Standardwerte**: Definieren von Standardwerten beim Erstellen von Inhaltsdeklarationsdateien.
2. **Fallback-Verhalten**: Bereitstellung von Fallback-Werten, wenn bestimmte Felder nicht definiert sind, sodass Sie das Verhalten von Wörterbuchoperationen global definieren können.

Weitere Informationen zu Inhaltsdeklarationsdateien und zur Anwendung von Konfigurationswerten finden Sie in der [Dokumentation zu Inhaltsdateien](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/content_file.md).

| Feld                        | Typ                                                                                             | Beschreibung                                                                                                                                                                                       | Beispiel                 | Hinweis                                                                                                                                                                                                                                                                                                                                                                                                   |
| --------------------------- | ----------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `fill`                      | `boolean &#124; FilePathPattern &#124; Partial<Record<Locale, boolean &#124; FilePathPattern>>` | Steuert, wie die Ausgabedateien für das automatische Ausfüllen (KI-Übersetzung) generiert werden. Standard: `true`                                                                                 | Siehe Beispiel unten     | `true`: Standardpfad (gleiche Datei wie die Quelle). `false`: Deaktiviert. String-/Funktions-Templates generieren Dateien pro Locale. Pro-Locale-Objekt: Jedes Locale wird einem eigenen Muster zugeordnet; `false` überspringt dieses Locale. Die Einbeziehung von `{{locale}}` löst die Generierung pro Locale aus. Das `fill` auf Wörterbuchebene hat immer Vorrang vor dieser globalen Konfiguration. |
| `description`               | `string`                                                                                        | Hilft dabei, den Zweck des Wörterbuchs im Editor und CMS zu verstehen. Wird auch als Kontext für die KI-Übersetzungsgenerierung verwendet. Standard: `undefined`                                   | `'User profile section'` |                                                                                                                                                                                                                                                                                                                                                                                                           |
| `locale`                    | `LocalesValues`                                                                                 | Wandelt das Wörterbuch in ein lokales Format um. Jedes deklarierte Feld wird zu einem Übersetzungsknoten. Fehlt dieser Wert, wird das Wörterbuch als mehrsprachig behandelt. Standard: `undefined` | `'en'`                   | Verwenden Sie dies, wenn das Wörterbuch spezifisch für eine einzelne Locale ist und keine Übersetzungen für mehrere Locales enthält.                                                                                                                                                                                                                                                                      |
| `contentAutoTransformation` | `boolean &#124; { markdown?: boolean; html?: boolean; insertion?: boolean }`                    | Wandelt Inhaltsstrings automatisch in typisierte Knoten um (Markdown, HTML oder Einfügung). Standard: `false`                                                                                      | `true`                   | Markdown: `### Title` → `md('### Title')`. HTML: `<div>Title</div>` → `html('<div>Title</div>')`. Einfügung: `Hello {{name}}` → `insert('Hello {{name}}')`.                                                                                                                                                                                                                                               |
| `location`                  | `'local' &#124; 'remote' &#124; 'hybrid' &#124; 'plugin' &#124; string`                         | Gibt an, wo Wörterbuchdateien gespeichert werden und welcher CMS-Synchronisierungsmodus verwendet wird. Standard: `'local'`                                                                        | `'hybrid'`               | `'local'`: Nur lokal verwaltet. `'remote'`: Nur remote verwaltet (CMS). `'hybrid'`: Sowohl lokal als auch remote verwaltet. `'plugin'` oder benutzerdefinierter String: Verwaltet durch ein Plugin oder eine benutzerdefinierte Quelle.                                                                                                                                                                   |
| `importMode`                | `'static' &#124; 'dynamic' &#124; 'fetch'`                                                      | Steuert, wie Wörterbücher importiert werden. Standard: `'static'`                                                                                                                                  | `'dynamic'`              | `'static'`: Statisch importiert. `'dynamic'`: Dynamisch über Suspense importiert. `'fetch'`: Dynamisch über die Live Sync API abgerufen. Beeinflusst nicht `getIntlayer`, `getDictionary`, `useDictionary` usw.                                                                                                                                                                                           |
| `priority`                  | `number`                                                                                        | Priorität des Wörterbuchs. Höhere Werte haben Vorrang vor niedrigeren, wenn Konflikte zwischen Wörterbüchern aufgelöst werden. Standard: `undefined`                                               | `1`                      |                                                                                                                                                                                                                                                                                                                                                                                                           |
| `live`                      | `boolean`                                                                                       | Veraltet — verwenden Sie stattdessen `importMode: 'fetch'`. Gibt an, ob der Wörterbuchinhalt dynamisch über die Live Sync API abgerufen wurde. Standard: `undefined`                               |                          | Umbenannt in `importMode: 'fetch'` in v8.0.0.                                                                                                                                                                                                                                                                                                                                                             |
| `schema`                    | `'https://intlayer.org/schema.json'`                                                            | Wird von Intlayer für die JSON-Schema-Validierung automatisch generiert. Standard: automatisch generiert                                                                                           |                          | Nicht manuell ändern.                                                                                                                                                                                                                                                                                                                                                                                     |
| `title`                     | `string`                                                                                        | Hilft dabei, das Wörterbuch im Editor und CMS zu identifizieren. Standard: `undefined`                                                                                                             | `'User Profile'`         |                                                                                                                                                                                                                                                                                                                                                                                                           |
| `tags`                      | `string[]`                                                                                      | Kategorisiert Wörterbücher und liefert Kontext oder Anweisungen für den Editor und die KI. Standard: `undefined`                                                                                   | `['user', 'profile']`    |                                                                                                                                                                                                                                                                                                                                                                                                           |
| `version`                   | `string`                                                                                        | Version des Remote-Wörterbuchs; hilft dabei, die aktuell verwendete Version zu verfolgen. Standard: `undefined`                                                                                    | `'1.0.0'`                | Verwaltbar im CMS. Nicht lokal ändern.                                                                                                                                                                                                                                                                                                                                                                    |

**Beispiel für `fill`**:

```ts
dictionary: {
  fill: {
    en: '/locales/en/{{key}}.content.json',
    fr: ({ key }) => `/locales/fr/${key}.content.json`,
    es: false,
  }
}
```

---

### AI-Konfiguration (AI Configuration)

Definiert Einstellungen für die KI-gestützten Funktionen von Intlayer, wie z. B. die Erstellung von Übersetzungen.

| Feld                 | Typ                    | Beschreibung                                                                            | Beispiel                                    | Hinweis                                                                                             |
| -------------------- | ---------------------- | --------------------------------------------------------------------------------------- | ------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| `provider`           | `string`               | Der zu verwendende AI-Anbieter.                                                         | `'openai'`, `'anthropic'`, `'googlevertex'` |                                                                                                     |
| `model`              | `string`               | Das zu verwendende AI-Modell.                                                           | `'gpt-4o'`, `'claude-3-5-sonnet-20240620'`  |                                                                                                     |
| `apiKey`             | `string`               | API-Key für den gewählten Anbieter.                                                     | `process.env.OPENAI_API_KEY`                |                                                                                                     |
| `applicationContext` | `string`               | Zusätzlicher Kontext über Ihre App zur Verbesserung der Genauigkeit der KI-Übersetzung. | `'Lernplattform für Kinder.'`               |                                                                                                     |
| `baseURL`            | `string`               | Optionale Basis-URL für API-Aufrufe.                                                    |                                             | Nützlich, wenn Sie einen Proxy oder ein lokales KI-Deployment verwenden.                            |
| `dataSerialization`  | `'json' &#124; 'toon'` | Definiert, wie Daten an die KI gesendet werden. Standard: `'json'`                      | `'json'`                                    | `'json'`: Robuster und präziser. `'toon'`: Verbraucht weniger Token, kann aber weniger stabil sein. |

---

### Konfiguration für Build (Build Configuration)

Einstellungen für den Build-Prozess und die Optimierung von Intlayer.

| Feld           | Typ                      | Beschreibung                                                                                                       | Beispiel | Hinweis |
| -------------- | ------------------------ | ------------------------------------------------------------------------------------------------------------------ | -------- | ------- |
| `mode`         | `'auto' &#124; 'manual'` | Gibt an, ob Intlayer während der Pre-Build-Schritte der App automatisch ausgeführt werden soll. Standard: `'auto'` |          |         |
| `optimize`     | `boolean`                | Gibt an, ob kompilierte Wörterbücher für die Laufzeit optimiert werden sollen. Standard: `true` in Produktion      |          |         |
| `outputFormat` | `('cjs' &#124; 'esm')[]` | Ausgabeformat für die generierten Wörterbuchdateien. Standard: `['cjs', 'esm']`                                    |          |         |
| `checkTypes`   | `boolean`                | Gibt an, ob Intlayer die Typen in den generierten Dateien prüfen soll. Standard: `false`                           |          |         |

---

### Systemkonfiguration (System Configuration)

Diese Einstellungen sind für fortgeschrittene Anwendungsfälle und die interne Konfiguration von Intlayer gedacht.

| Feld                      | Typ      | Beschreibung                                          | Standard                          |
| ------------------------- | -------- | ----------------------------------------------------- | --------------------------------- |
| `dictionariesDir`         | `string` | Verzeichnis der kompilierten Wörterbücher.            | `'.intlayer/dictionary'`          |
| `moduleAugmentationDir`   | `string` | Verzeichnis für TypeScript Module Augmentation.       | `'.intlayer/types'`               |
| `unmergedDictionariesDir` | `string` | Verzeichnis der nicht zusammengeführten Wörterbücher. | `'.intlayer/unmerged_dictionary'` |
| `typesDir`                | `string` | Verzeichnis der generierten Typen.                    | `'.intlayer/types'`               |
| `mainDir`                 | `string` | Hauptverzeichnis der Intlayer-Dateien.                | `'.intlayer/main'`                |
| `configDir`               | `string` | Verzeichnis der kompilierten Konfigurationsdateien.   | `'.intlayer/config'`              |
| `cacheDir`                | `string` | Verzeichnis der Cache-Dateien.                        | `'.intlayer/cache'`               |

---

### Compiler-Konfiguration (Compiler Configuration)

Einstellungen für den Intlayer Compiler (`intlayer compiler`).

| Feld                  | Typ                      | Beschreibung                                                                                         | Standard |
| --------------------- | ------------------------ | ---------------------------------------------------------------------------------------------------- | -------- |
| `enabled`             | `boolean`                | Gibt an, ob der Compiler aktiv ist.                                                                  | `false`  |
| `output`              | `string &#124; Function` | Ausgabepfad für extrahierte Wörterbücher.                                                            |          |
| `saveComponents`      | `boolean`                | Gibt an, ob die Original-Quelldateien mit den transformierten Versionen überschrieben werden sollen. | `false`  |
| `noMetadata`          | `boolean`                | Wenn `true`, fügt der Compiler keine Metadaten in die generierten Dateien ein.                       | `false`  |
| `dictionaryKeyPrefix` | `string`                 | Optionales Dictionary-Key-Präfix.                                                                    | `''`     |

---

### Logger-Konfiguration (Logger Configuration)

Einstellungen zur Anpassung der Log-Ausgabe von Intlayer.

| Feld     | Typ                                            | Beschreibung                | Standard       |
| -------- | ---------------------------------------------- | --------------------------- | -------------- |
| `mode`   | `'default' &#124; 'verbose' &#124; 'disabled'` | Logging-Modus.              | `'default'`    |
| `prefix` | `string`                                       | Präfix für Log-Nachrichten. | `'[intlayer]'` |

---

### Benutzerdefinierte Schemas (Custom Schemas)

| Feld      | Typ                         | Beschreibung                                                                                 |
| --------- | --------------------------- | -------------------------------------------------------------------------------------------- |
| `schemas` | `Record<string, ZodSchema>` | Erlaubt es Ihnen, Zod-Schemas zur Validierung der Struktur Ihrer Wörterbücher zu definieren. |

---

### Plugins

| Feld      | Typ                | Beschreibung                                 |
| --------- | ------------------ | -------------------------------------------- |
| `plugins` | `IntlayerPlugin[]` | Liste der zu aktivierenden Intlayer-Plugins. |
