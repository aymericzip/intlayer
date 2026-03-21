---
createdAt: 2024-08-13
updatedAt: 2026-03-12
title: Konfiguration
description: Erfahren Sie, wie Sie Intlayer für Ihre Anwendung konfigurieren. Verstehen Sie die verschiedenen Einstellungen und Optionen, um Intlayer an Ihre Bedürfnisse anzupassen.
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
history  - version: 8.4.0
    date: 2026-03-20
    changes: Add object per-locale notation for 'compiler.output' and 'dictionary.fill'
  - version: 8.3.0
    date: 2026-03-11
    changes: Verschiebe 'baseDir' von 'content' nach 'system' Konfiguration
  - version: 8.2.0
    date: 2026-03-09
    changes: Compiler-Optionen aktualisieren, Unterstützung für 'output' und 'noMetadata' hinzufügen
  - version: 8.1.7
    date: 2026-02-25
    changes: Compiler-Optionen aktualisieren
  - version: 8.1.5
    date: 2026-02-23
    changes: Compiler-Option 'build-only' und Wörterbuch-Präfix hinzugefügt
  - version: 8.0.6
    date: 2026-02-12
    changes: Unterstützung für Open Router, Alibaba, Amazon, Google Vertex Bedrock, Fireworks, Groq, Hugging Face und Together.ai Provider hinzufügen
  - version: 8.0.5
    date: 2026-02-06
    changes: Hinzufügen von `dataSerialization` zur KI-Konfiguration
  - version: 8.0.0
    date: 2026-01-24
    changes: Importmodus `live` in `fetch` umbenannt, um den zugrunde liegenden Mechanismus besser zu beschreiben.
  - version: 8.0.0
    date: 2026-01-22
    changes: Build-Konfiguration für `importMode` in die Wörterbuch-Konfiguration verschoben.
  - version: 8.0.0
    date: 2026-01-22
    changes: Option `rewrite` zur Routing-Konfiguration hinzugefügt
  - version: 8.0.0
    date: 2026-01-18
    changes: Systemkonfiguration von der Inhaltskonfiguration trennen. Interne Pfade zur Eigenschaft `system` verschieben. `codeDir` hinzufügen, um Inhaltsdateien von der Codetransformation zu trennen.
  - version: 8.0.0
    date: 2026-01-18
    changes: Wörterbuchoptionen `location` und `schema` hinzugefügt
  - version: 7.5.1
    date: 2026-01-10
    changes: Unterstützung für JSON5- und JSONC-Dateiformate hinzugefügt
  - version: 7.5.0
    date: 2025-12-17
    changes: Hinzufügen der Option `buildMode`
  - version: 7.0.0
    date: 2025-10-25
    changes: Konfiguration für `dictionary` hinzugefügt
  - version: 7.0.0
    date: 2025-10-21
    changes: `middleware` durch `routing`-Konfiguration ersetzt
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
    changes: `live` Importmodus hinzugefügt
  - version: 6.0.0
    date: 2025-09-04
    changes: Ersetze das Feld `hotReload` durch `liveSync` und füge die Felder `liveSyncPort` und `liveSyncURL` hinzu
  - version: 5.6.1
    date: 2025-07-25
    changes: Ersetze `activateDynamicImport` durch die Option `importMode`
  - version: 5.6.0
    date: 2025-07-13
    changes: Ändere das Standard-`contentDir` von `['src']` zu `['.']`
  - version: 5.5.11
    date: 2025-06-29
    changes: Füge `docs`-Befehle hinzue `docs`-Befehle hinzu
---

# Intlayer Konfigurationsdokumentation

## Überblick

Intlayer-Konfigurationsdateien ermöglichen die Anpassung verschiedener Aspekte des Plugins, wie Internationalisierung, Middleware und Inhaltsverwaltung. Dieses Dokument bietet eine detaillierte Beschreibung jeder Eigenschaft in der Konfiguration.

---

## Inhaltsverzeichnis

<TOC/>

---

## Unterstützte Konfigurationsdateiformate

Intlayer akzeptiert JSON-, JS-, MJS- und TS-Konfigurationsdateiformate:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.json5`
- `intlayer.config.jsonc`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

---

## Beispiel für eine Konfigurationsdatei

````typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";
import { nextjsRewrite } from "intlayer/routing";
import { z } from "zod";

/**
 * Example Intlayer configuration file showing all available options.
 */
const config: IntlayerConfig = {
  /**
   * Configuration for internationalization settings.
   */
  internationalization: {
    /**
     * List of supported locales in the application.
     * Default: [Locales.ENGLISH]
     */
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],

    /**
     * List of required locales that must be defined in every dictionary.
     * If empty, all locales are required in `strict` mode.
     * Default: []
     */
    requiredLocales: [Locales.ENGLISH],

    /**
     * Strictness level for internationalized content.
     * - "strict": Errors if any declared locale is missing or undeclared.
     * - "inclusive": Warnings if a declared locale is missing.
     * - "loose": Accepts any existing locale.
     * Default: "inclusive"
     */
    strictMode: "inclusive",

    /**
     * Default locale used as a fallback if the requested locale is not found.
     * Default: Locales.ENGLISH
     */
    defaultLocale: Locales.ENGLISH,
  },

  /**
   * Settings that control dictionary operations and fallback behavior.
   */
  dictionary: {
    /**
     * Controls how dictionaries are imported.
     * - "static": Statically imported at build time.
     * - "dynamic": Dynamically imported using Suspense.
     * - "fetch": Fetched dynamically via the live sync API.
     * Default: "static"
     */
    importMode: "static",

    /**
     * Strategy for auto-filling missing translations using AI.
     * Can be a boolean or a path pattern to store filled content.
     * Default: true
     */
    fill: true,

    /**
     * Physical location of the dictionary files.
     * - "local": Stored in the local filesystem.
     * - "remote": Stored in the Intlayer CMS.
     * - "hybrid": Stored in the local filesystem and the Intlayer CMS.
     * - "plugin" (or any custom string): Provided by a plugin or a custom source.
     * Default: "local"
     */
    location: "local",

    /**
     * Whether to automatically transform content (e.g., Markdown to HTML).
     * Default: false
     */
    contentAutoTransformation: false,
  },

  /**
   * Routing and middleware configuration.
   */
  routing: {
    /**
     * Locale routing strategy.
     * - "prefix-no-default": Prefix all except the default locale (e.g., /dashboard, /fr/dashboard).
     * - "prefix-all": Prefix all locales (e.g., /en/dashboard, /fr/dashboard).
     * - "no-prefix": No locale in the URL.
     * - "search-params": Use ?locale=...
     * Default: "prefix-no-default"
     */
    mode: "prefix-no-default",

    /**
     * Where to store the user's selected locale.
     * Options: 'cookie', 'localStorage', 'sessionStorage', 'header', or an array of these.
     * Default: ['cookie', 'header']
     */
    storage: ["cookie", "header"],

    /**
     * Base path for the application URLs.
     * Default: ""
     */
    basePath: "",

    /**
     * Custom URL rewriting rules for locale-specific paths.
     */
    rewrite: nextjsRewrite({
      "/[locale]/about": {
        en: "/[locale]/about",
        fr: "/[locale]/a-propos",
      },
    }),
  },

  /**
   * Settings for finding and processing content files.
   */
  content: {
    /**
     * File extensions to scan for dictionaries.
     * Default: ['.content.ts', '.content.js', '.content.json', etc.]
     */
    fileExtensions: [".content.ts", ".content.js", ".content.json"],

    /**
     * Directories where .content files are located.
     * Default: ["."]
     */
    contentDir: ["src"],

    /**
     * Directories where source code is located.
     * Used for build optimization and code transformation.
     * Default: ["."]
     */
    codeDir: ["src"],

    /**
     * Patterns to exclude from scanning.
     * Default: ['node_modules', '.intlayer', etc.]
     */
    excludedPath: ["node_modules"],

    /**
     * Whether to watch for changes and rebuild dictionaries in development.
     * Default: true in development
     */
    watch: true,

    /**
     * Command to format newly created / updated .content files.
     */
    formatCommand: 'npx prettier --write "{{file}}"',
  },

  /**
   * Visual Editor configuration.
   */
  editor: {
    /**
     * Whether the visual editor is enabled.
     * Default: false
     */
    enabled: true,

    /**
     * URL of your application for origin validation.
     * Default: ""
     */
    applicationURL: "http://localhost:3000",

    /**
     * Port for the local editor server.
     * Default: 8000
     */
    port: 8000,

    /**
     * Public URL for the editor.
     * Default: "http://localhost:8000"
     */
    editorURL: "http://localhost:8000",

    /**
     * Intlayer CMS URL.
     * Default: "https://app.intlayer.org"
     */
    cmsURL: "https://app.intlayer.org",

    /**
     * Backend API URL.
     * Default: "https://back.intlayer.org"
     */
    backendURL: "https://back.intlayer.org",

    /**
     * Whether to enable real-time content synchronization.
     * Default: false
     */
    liveSync: true,
  },

  /**
   * AI-powered translation and generation settings.
   */
  ai: {
    /**
     * AI provider to use.
     * Options: 'openai', 'anthropic', 'mistral', 'deepseek', 'gemini', 'ollama', 'openrouter', 'alibaba', 'fireworks', 'groq', 'huggingface', 'bedrock', 'googlevertex', 'togetherai'
     * Default: 'openai'
     */
    provider: "openai",

    /**
     * Model to use from the selected provider.
     */
    model: "gpt-4o",

    /**
     * Provider API key.
     */
    apiKey: process.env.OPENAI_API_KEY,

    /**
     * Global context to guide the AI in generating translations.
     */
    applicationContext: "Dies ist eine App zur Reisebuchung.",

    /**
     * Base URL for the AI API.
     */
    baseURL: "http://localhost:3000",

    /**
     * Datenserialisierung
     *
     * Optionen:
     * - "json": Standard, zuverlässig; verbraucht mehr Token.
     * - "toon": Weniger Token, weniger konsistent als JSON.
     *
     * Standard: "json"
     */
    dataSerialization: "json",
  },

  /**
   * Build and optimization settings.
   */
  build: {
    /**
     * Build execution mode.
     * - "auto": Automatic build during app build.
     * - "manual": Requires explicit build command.
     * Default: "auto"
     */
    mode: "auto",

    /**
     * Whether to optimize the final bundle by pruning unused dictionaries.
     * Default: true in production
     */
    optimize: true,

    /**
     * Output format for generated dictionary files.
     * Default: ['cjs', 'esm']
     */
    outputFormat: ["cjs", "esm"],

    /**
     * Indicates if the build should check TypeScript types.
     * Default: false
     */
    checkTypes: false,
  },

  /**
   * Logger configuration.
   */
  log: {
    /**
     * Logging level.
     * - "default": Standard logging.
     * - "verbose": Detailed debug logging.
     * - "disabled": No logging.
     * Default: "default"
     */
    mode: "default",

    /**
     * Prefix for all log messages.
     * Default: "[intlayer]"
     */
    prefix: "[intlayer]",
  },

  /**
   * System configuration (Advanced use cases)
   */
  system: {
    /**
     * Directory for storing localization dictionaries.
     */
    dictionariesDir: ".intlayer/dictionary",

    /**
     * Directory for module augmentation.
     */
    moduleAugmentationDir: ".intlayer/types",

    /**
     * Directory for storing unmerged dictionaries.
     */
    unmergedDictionariesDir: ".intlayer/unmerged_dictionary",

    /**
     * Directory for storing dictionary types.
     */
    typesDir: ".intlayer/types",

    /**
     * Directory where main application files are stored.
     */
    mainDir: ".intlayer/main",

    /**
     * Directory where the configuration files are stored.
     */
    configDir: ".intlayer/config",

    /**
     * Directory where the cache files are stored.
     */
    cacheDir: ".intlayer/cache",
  },

  /**
   * Compiler configuration (Advanced use cases)
   */
  compiler: {
    /**
     * Gibt an, ob der Compiler aktiviert werden soll.
     *
     * - false : Deaktiviert den Compiler.
     * - true : Aktiviert den Compiler.
     * - "build-only" : Überspringt den Compiler während der Entwicklung, um die Startzeiten zu beschleunigen.
     *
     * Standardwert : false
     */
    enabled: true,

    /**
     * Definiert den Pfad der Ausgabedateien. Ersetzt `outputDir`.
     *
     * - `./` Pfade werden relativ zum Verzeichnis der Komponente aufgelöst.
     * - `/` Pfade werden relativ zum Projektstamm (`baseDir`) aufgelöst.
     *
     * - Das Einbeziehen der Variable `{{locale}}` im Pfad löst die Generierung separater Wörterbücher pro Sprache aus.
     *
     * Beispiel:
     * ```ts
     * {
     *   // Erstelle mehrsprachige .content.ts-Dateien in der Nähe der Komponente
     *   output: ({ fileName, extension }) => `./${fileName}${extension}`,
     *
     *   // output: './{{fileName}}{{extension}}', // Äquivalent mit einem Template-String
     * }
     * ```
     *
     * ```ts
     * {
     *   // Erstelle zentralisierte JSON-Dateien pro Sprache im Projektstamm
     *   output: ({ key, locale }) => `/locales/${locale}/${key}.content.json`,
     *
     *   // output: '/locales/{{locale}}/{{key}}.content.json', // Äquivalent mit einem Template-String
     * }
     * ```
     *
     * Liste der Variablen:
     *   - `fileName`: Der Name der Datei.
     *   - `key`: Der Schlüssel des Inhalts.
     *   - `locale`: Die Sprache des Inhalts.
     *   - `extension`: Die Dateierweiterung.
     *   - `componentFileName`: Der Dateiname der Komponente.
     *   - `componentExtension`: Die Dateierweiterung der Komponente.
     *   - `format`: Das Wörterbuchformat.
     *   - `componentFormat`: Das Wörterbuchformat der Komponente.
     *   - `componentDirPath`: Der Verzeichnispfad der Komponente.
     */
    output: ({ locale, key }) => `compiler/${locale}/${key}.json`,

    /**
     * Gibt an, ob die Komponenten nach der Transformation gespeichert werden sollen.
     * Auf diese Weise kann der Compiler nur einmal ausgeführt werden, um die App zu transformieren, und dann entfernt werden.
     */
    saveComponents: false,

    /**
     * Nur Inhalt in die generierte Datei einfügen. Nützlich für i18next- oder ICU-MessageFormat-JSON-Ausgaben pro Sprache.
     */
    noMetadata: false,

    /**
     * Wörterbuch-Schlüssel-Präfix
     */
    dictionaryKeyPrefix: "", // Optionales Präfix für extrahierte Wörterbuchschlüssel hinzufügen
  },

  /**
   * Custom schemas to validate the dictionaries content.
   */
  schemas: {
    "my-schema": z.object({
      title: z.string(),
    }),
  },

  /**
   * Plugins configuration.
   */
  plugins: [],
};

export default config;
````

## Konfigurationsreferenz

Die folgenden Abschnitte beschreiben die verschiedenen Konfigurationseinstellungen, die für Intlayer verfügbar sind.

---

### Internationalisierungs-Konfiguration

Definiert Einstellungen im Zusammenhang mit der Internationalisierung, einschließlich verfügbarer Sprachen und der Standardsprache für die Anwendung.

#### Eigenschaften

- **locales**:
  - _Typ_: `string[]`
  - _Standard_: `['en']`
  - _Beschreibung_: Die Liste der unterstützten Sprachen in der Anwendung.
  - _Beispiel_: `['en', 'fr', 'es']`

- **requiredLocales**:
  - _Typ_: `string[]`
  - _Standard_: `[]`
  - _Beschreibung_: Die Liste der erforderlichen Sprachen in der Anwendung.
  - _Beispiel_: `[]`
  - _Hinweis_: Wenn leer, sind alle Sprachen im `strict`-Modus erforderlich.
  - _Hinweis_: Stellen Sie sicher, dass die erforderlichen Sprachen auch im Feld `locales` definiert sind.
- **strictMode**:
  - _Typ_: `string`
  - _Standard_: `inclusive`
  - _Beschreibung_: Gewährleistet eine strenge Umsetzung internationalisierter Inhalte mit TypeScript.
  - _Hinweis_: Wenn auf "strict" gesetzt, verlangt die Übersetzungsfunktion `t`, dass jede deklarierte Sprache definiert ist. Wenn eine Sprache fehlt oder nicht in Ihrer Konfiguration deklariert ist, wird ein Fehler ausgelöst.
  - _Hinweis_: Wenn auf "inclusive" gesetzt, verlangt die Übersetzungsfunktion `t`, dass jede deklarierte Sprache definiert ist. Wenn eine Sprache fehlt, wird eine Warnung ausgegeben. Es wird jedoch akzeptiert, wenn eine Sprache nicht in Ihrer Konfiguration deklariert, aber vorhanden ist.
  - _Hinweis_: Wenn auf "loose" gesetzt, akzeptiert die Übersetzungsfunktion `t` jede vorhandene Locale.

- **defaultLocale**:
  - _Typ_: `string`
  - _Standard_: `'en'`
  - _Beschreibung_: Die Standard-Locale, die als Fallback verwendet wird, wenn die angeforderte Locale nicht gefunden wird.
  - _Beispiel_: `'en'`
  - _Hinweis_: Dies wird verwendet, um die Locale zu bestimmen, wenn keine in der URL, im Cookie oder im Header angegeben ist.

---

### Editor-Konfiguration

Definiert Einstellungen im Zusammenhang mit dem integrierten Editor, einschließlich Server-Port und Aktivstatus.

#### Eigenschaften

- **applicationURL**:
  - _Typ_: `string`
  - _Standard_: `http://localhost:3000`
  - _Beschreibung_: Die URL der Anwendung. Wird verwendet, um den Ursprung des Editors aus Sicherheitsgründen einzuschränken.
  - _Beispiel_:
    - `'http://localhost:3000'`
    - `'https://example.com'`
    - `process.env.INTLAYER_EDITOR_URL`
  - _Hinweis_: Die URL der Anwendung. Wird verwendet, um die Herkunft des Editors aus Sicherheitsgründen einzuschränken. Wenn auf `'*'` gesetzt, ist der Editor von jeder Herkunft aus zugänglich.

- **port**:
  - _Typ_: `number`
  - _Standard_: `8000`
  - _Beschreibung_: Der Port, der vom visuellen Editor-Server verwendet wird.

- **editorURL**:
  - _Typ_: `string`
  - _Standard_: `'http://localhost:8000'`
  - _Beschreibung_: Die URL des Editor-Servers. Wird verwendet, um die Herkunft des Editors aus Sicherheitsgründen einzuschränken.
    - `'http://localhost:3000'`
    - `'https://example.com'`
    - `process.env.INTLAYER_EDITOR_URL`
  - _Hinweis_: Die URL des Editor-Servers, die von der Anwendung aus erreichbar sein soll. Wird verwendet, um die Ursprünge einzuschränken, die mit der Anwendung aus Sicherheitsgründen interagieren können. Wenn auf `'*'` gesetzt, ist der Editor von jedem Ursprung aus zugänglich. Sollte gesetzt werden, wenn der Port geändert wird oder wenn der Editor auf einer anderen Domain gehostet wird.

- **cmsURL**:
  - _Typ_: `string`
  - _Standard_: `'https://intlayer.org'`
  - _Beschreibung_: Die URL des Intlayer CMS.
  - _Beispiel_: `'https://intlayer.org'`
  - _Hinweis_: Die URL des Intlayer CMS.

- **backendURL**:
  - _Typ_: `string`
  - _Standard_: `https://back.intlayer.org`
  - _Beschreibung_: Die URL des Backend-Servers.
  - _Beispiel_: `http://localhost:4000`

- **enabled**:
  - _Typ_: `boolean`
  - _Standard_: `true`
  - _Beschreibung_: Gibt an, ob die Anwendung mit dem visuellen Editor interagiert.
  - _Beispiel_: `process.env.NODE_ENV !== 'production'`
  - _Hinweis_: Wenn true, kann der Editor mit der Anwendung interagieren. Wenn false, kann der Editor nicht mit der Anwendung interagieren. In jedem Fall kann der Editor nur durch den visuellen Editor aktiviert werden. Das Deaktivieren des Editors für bestimmte Umgebungen ist eine Möglichkeit, die Sicherheit zu erhöhen.

- **clientId**:
  - _Typ_: `string` | `undefined`
  - _Standard_: `undefined`
  - _Beschreibung_: clientId und clientSecret ermöglichen es den Intlayer-Paketen, sich mit dem Backend über die oAuth2-Authentifizierung zu authentifizieren. Ein Zugriffstoken wird verwendet, um den Benutzer zu authentifizieren, der mit dem Projekt verbunden ist. Um ein Zugriffstoken zu erhalten, gehen Sie zu https://app.intlayer.org/project und erstellen Sie ein Konto.
  - _Beispiel_: `true`
  - _Hinweis_: Wichtig: Die clientId und clientSecret sollten geheim gehalten und nicht öffentlich geteilt werden. Bitte stellen Sie sicher, dass sie an einem sicheren Ort, wie z.B. Umgebungsvariablen, aufbewahrt werden.

- **clientSecret**:
  - _Typ_: `string` | `undefined`
  - _Standard_: `undefined`
  - _Beschreibung_: clientId und clientSecret ermöglichen es den Intlayer-Paketen, sich mit dem Backend über die oAuth2-Authentifizierung zu authentifizieren. Ein Zugriffstoken wird verwendet, um den Benutzer zu authentifizieren, der mit dem Projekt verbunden ist. Um ein Zugriffstoken zu erhalten, gehen Sie zu https://app.intlayer.org/project und erstellen Sie ein Konto.
  - _Beispiel_: `true`
  - _Hinweis_: Wichtig: Die clientId und clientSecret sollten geheim gehalten und nicht öffentlich geteilt werden. Bitte stellen Sie sicher, dass sie an einem sicheren Ort aufbewahrt werden, z. B. in Umgebungsvariablen.

- **dictionaryPriorityStrategy**:
  - _Typ_: `string`
  - _Standard_: `'local_first'`
  - _Beschreibung_: Die Strategie zur Priorisierung von Wörterbüchern, wenn sowohl lokale als auch entfernte Wörterbücher vorhanden sind. Wenn auf `'distant_first'` gesetzt, priorisiert die Anwendung entfernte Wörterbücher gegenüber lokalen Wörterbüchern. Wenn auf `'local_first'` gesetzt, priorisiert die Anwendung lokale Wörterbücher gegenüber entfernten Wörterbüchern.
  - _Beispiel_: `'distant_first'`

- **liveSync**:
  - _Typ_: `boolean`
  - _Standard_: `false`
  - _Beschreibung_: Gibt an, ob der Anwendungsserver den Inhalt der Anwendung automatisch neu laden soll, wenn eine Änderung im CMS / Visual Editor / Backend erkannt wird.
  - _Beispiel_: `true`
  - _Hinweis_: Zum Beispiel, wenn ein neues Wörterbuch hinzugefügt oder aktualisiert wird, aktualisiert die Anwendung den anzuzeigenden Inhalt auf der Seite.
  - _Hinweis_: Live-Sync erfordert die Externalisierung des Inhalts der Anwendung auf einen anderen Server. Das bedeutet, dass dies die Leistung der Anwendung leicht beeinträchtigen kann. Um dies zu begrenzen, empfehlen wir, die Anwendung und den Live-Sync-Server auf derselben Maschine zu hosten. Außerdem kann die Kombination von Live-Sync und `optimize` eine beträchtliche Anzahl von Anfragen an den Live-Sync-Server stellen. Abhängig von Ihrer Infrastruktur empfehlen wir, beide Optionen und deren Kombination zu testen.

- **liveSyncPort**:
  - _Typ_: `number`
  - _Standard_: `4000`
  - _Beschreibung_: Der Port des Live-Sync-Servers.
  - _Beispiel_: `4000`
  - _Hinweis_: Der Port des Live-Sync-Servers.

- **liveSyncURL**:
  - _Typ_: `string`
  - _Standard_: `'http://localhost:{liveSyncPort}'`
  - _Beschreibung_: Die URL des Live-Sync-Servers.
  - _Beispiel_: `'https://example.com'`
  - _Hinweis_: Standardmäßig zeigt es auf localhost, kann aber auf jede beliebige URL geändert werden, falls ein entfernter Live-Sync-Server verwendet wird.

### Routing-Konfiguration

Einstellungen, die das Routing-Verhalten steuern, einschließlich URL-Struktur, Locale-Speicherung und Middleware-Handhabung.

#### Eigenschaften

- **mode**:
  - _Typ_: `'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params'`
  - _Standard_: `'prefix-no-default'`
  - _Beschreibung_: URL-Routing-Modus zur Handhabung von Locales.
  - _Beispiele_:
    - `'prefix-no-default'`: `/dashboard` (en) oder `/fr/dashboard` (fr)
    - `'prefix-all'`: `/en/dashboard` (en) oder `/fr/dashboard` (fr)
    - `'no-prefix'`: `/dashboard` (Ländererkennung durch andere Mittel)
    - `'search-params'`: `/dashboard?locale=fr`
  - _Hinweis_: Diese Einstellung hat keinen Einfluss auf die Cookie-Verwaltung oder die Locale-Speicherung.

- **storage**:
  - _Typ_: `false | 'cookie' | 'localStorage' | 'sessionStorage' | 'header' | CookiesAttributes | StorageAttributes | Array`
  - _Standard_: `['cookie', 'header']`
  - _Beschreibung_: Konfiguration zur Speicherung der Locale beim Client.

  - **cookie**:
    - _Beschreibung_: Speichert Daten in Cookies, kleinen im Browser des Clients gespeicherten Datenfragmenten, die sowohl client- als auch serverseitig zugänglich sind.
    - _Hinweis_: Stellen Sie für eine DSGVO-konforme Speicherung sicher, dass die Zustimmung des Nutzers vor der Verwendung eingeholt wird.
    - _Hinweis_: Cookie-Parameter sind anpassbar, wenn sie als CookiesAttributes definiert sind (`{ type: 'cookie', name: 'custom-locale', secure: true, httpOnly: false }`).

  - **localStorage**:
    - _Beschreibung_: Speichert Daten im Browser ohne Ablaufdatum, was eine Datenpersistenz über Sitzungen hinweg ermöglicht; nur clientseitig zugänglich.
    - _Hinweis_: Ideal für die langfristige Datenspeicherung, beachten Sie jedoch Datenschutz- und Sicherheitsimplikationen.
    - _Hinweis_: Local Storage ist nur clientseitig zugänglich; der Intlayer-Proxy kann darauf nicht zugreifen.
    - _Hinweis_: Local Storage-Parameter sind anpassbar, wenn sie als StorageAttributes definiert sind (`{ type: 'localStorage', name: 'custom-locale' }`).

  - **sessionStorage**:
    - _Beschreibung_: Speichert Daten für die Dauer einer Seitensitzung, d.h. sie werden gelöscht, sobald der Tab oder das Fenster geschlossen wird; nur clientseitig zugänglich.
    - _Hinweis_: Geeignet für die temporäre Datenspeicherung pro Sitzung.
    - _Hinweis_: Local Storage ist nur clientseitig zugänglich; der Intlayer-Proxy kann darauf nicht zugreifen.
    - _Hinweis_: Local Storage-Parameter sind anpassbar, wenn sie als StorageAttributes definiert sind (`{ type: 'sessionStorage', name: 'custom-locale' }`).

  - **header**:
    - _Beschreibung_: Verwendet HTTP-Header zum Speichern oder Übertragen von Locale-Daten, geeignet für die serverseitige Sprachbestimmung.
    - _Hinweis_: Nützlich bei API-Aufrufen, um konsistente Spracheinstellungen über Anfragen hinweg beizubehalten.
    - _Hinweis_: Der Header ist nur serverseitig zugänglich; die Clientseite kann darauf nicht zugreifen.
    - _Hinweis_: Der Header-Name ist anpassbar, wenn er als StorageAttributes definiert ist (`{ type: 'header', name: 'custom-locale' }`).

- **basePath**:
  - _Typ_: `string`
  - _Standard_: `''`
  - _Beschreibung_: Der Basispfad für die Anwendungs-URLs.
  - _Beispiel_: `'/my-app'`
  - _Hinweis_:
    - Wenn die Anwendung unter `https://example.com/my-app` gehostet wird,
    - ist der Basispfad `'/my-app'`.
    - Die URL lautet dann `https://example.com/my-app/en`.
    - Wenn kein Basispfad gesetzt ist, lautet die URL `https://example.com/en`.

- **rewrite**:
  - _Typ_: `Record<string, StrictModeLocaleMap<string>>`
  - _Standard_: `undefined`
  - _Beschreibung_: Benutzerdefinierte URL-Umschreibungsregeln, die den Standard-Routing-Modus für bestimmte Pfade außer Kraft setzen. Ermöglicht die Definition sprachspezifischer Pfade, die vom Standard-Routing-Verhalten abweichen. Unterstützt dynamische Routenparameter mit der Syntax `[param]`.
  - _Beispiel_:
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
  - _Hinweis_: Umschreibungsregeln haben Vorrang vor dem Standard-`mode`-Verhalten. Wenn ein Pfad mit einer Umschreibungsregel übereinstimmt, wird der lokalisierte Pfad aus der Umschreibungskonfiguration anstelle des Standard-Sprachpräfixes verwendet.
  - _Hinweis_: Dynamische Routenparameter werden über die Klammernotation unterstützt (z. B. `[slug]`, `[id]`). Parameterwerte werden automatisch aus der URL extrahiert und in den umgeschriebenen Pfad interpoliert.
  - _Hinweis_: Funktioniert mit Next.js- und Vite-Anwendungen. Die Middleware/der Proxy schreibt eingehende Anfragen automatisch um, damit sie der internen Routenstruktur entsprechen.
  - _Hinweis_: Beim Generieren von URLs mit `getLocalizedUrl()` werden Umschreibungsregeln automatisch angewendet, wenn sie mit dem angegebenen Pfad übereinstimmen.
  - _Referenz_: Weitere Informationen finden Sie unter [Benutzerdefinierte URL-Umschreibungen](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/custom_url_rewrites.md).

#### Cookie-Attribute

Bei Verwendung der Cookie-Speicherung können Sie zusätzliche Cookie-Attribute konfigurieren:

- **name**: Cookie-Name (Standard: `'INTLAYER_LOCALE'`)
- **domain**: Cookie-Domain (Standard: undefined)
- **path**: Cookie-Pfad (Standard: undefined)
- **secure**: Erfordert HTTPS (Standard: undefined)
- **httpOnly**: HTTP-only Flag (Standard: undefined)
- **sameSite**: SameSite-Richtlinie (`'strict' | 'lax' | 'none'`)
- **expires**: Ablaufdatum oder Tage (Standard: undefined)

#### Locale-SpeicherAttribute

Bei Verwendung von localStorage oder sessionStorage:

- **type**: Speichertyp (`'localStorage' | 'sessionStorage'`)
- **name**: Name des Speicherschlüssels (Standard: `'INTLAYER_LOCALE'`)

#### Konfigurationsbeispiele

Hier sind einige gängige Konfigurationsbeispiele für die neue Routing-Struktur (v8):

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

**Suchparameter-Modus**:

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

**Präfixfreier Modus mit benutzerdefiniertem Speicher**:

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

**Benutzerdefinierte URL-Umschreibung mit dynamischen Routen**:

```typescript
// intlayer.config.ts
import { nextjsRewrite } from "intlayer/routing";

const config: IntlayerConfig = {
  internationalization: {
    locales: ["en", "fr"],
    defaultLocale: "en",
  },
  routing: {
    mode: "prefix-no-default", // Fallback-Strategie für nicht umgeschriebene Pfade
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

### Inhaltskonfiguration

Einstellungen im Zusammenhang mit der Inhaltsverwaltung innerhalb der Anwendung, einschließlich Verzeichnisnamen, Dateierweiterungen und abgeleiteter Konfigurationen.

#### Eigenschaften

- **autoFill**:
  - _Typ_: `boolean | string | FilePathPattern | { [key in Locales]?: string }`
  - _Standard_: `undefined`
  - _Beschreibung_: Gibt an, wie der Inhalt automatisch mit KI ausgefüllt werden soll. Kann global in der Datei `intlayer.config.ts` deklariert werden.
  - _Beispiel_: true
  - _Beispiel_: `'./{{fileName}}.content.json'`
  - _Beispiel_: `{ fr: './{{fileName}}.fr.content.json', es: './{{fileName}}.es.content.json' }`
  - _Hinweis_: Die Auto-Fill-Konfiguration kann sein:
    - boolean: Auto-Fill für alle Sprachen aktivieren
    - string: Pfad zu einer einzelnen Datei oder Vorlage mit Variablen
    - object: Pro-Sprache Dateipfade

- **watch**:
  - _Typ_: `boolean`
  - _Standard_: `process.env.NODE_ENV === 'development'`
  - _Beschreibung_: Gibt an, ob Intlayer Änderungen an den Inhaltsdeklarationsdateien in der App überwachen soll, um die zugehörigen Wörterbücher neu zu erstellen.

- **fileExtensions**:
  - _Typ_: `string[]`
  - _Standard_: `['.content.ts', '.content.js', '.content.cjs', '.content.mjs', '.content.json', '.content.tsx', '.content.jsx']`
  - _Beschreibung_: Dateierweiterungen, nach denen beim Erstellen von Wörterbüchern gesucht wird.
  - _Beispiel_: `['.data.ts', '.data.js', '.data.json']`
  - _Hinweis_: Die Anpassung der Dateierweiterungen kann helfen, Konflikte zu vermeiden.

- **contentDir**:
  - _Typ_: `string[]`
  - _Standard_: `['.']`
  - _Beispiel_: `['src', '../../ui-library', require.resolve("@my-package/content")]`
  - _Beschreibung_: Der Verzeichnispfad, in dem Inhaltsdefinitionsdateien (`.content.*`) gespeichert sind.
  - _Hinweis_: Dies wird verwendet, um Inhaltsdateien zu überwachen, um Wörterbücher neu zu erstellen.

- **codeDir**:
  - _Typ_: `string[]`
  - _Standard_: `['.']`
  - _Beispiel_: `['src', '../../ui-library']`
  - _Beschreibung_: Der Verzeichnispfad, in dem der Code gespeichert ist, relativ zum Basisverzeichnis.
  - _Hinweis_: Dies wird verwendet, um Codedateien zu überwachen, die transformiert werden sollen (beschneiden, optimieren). Die Trennung von `contentDir` kann die Build-Leistung verbessern, indem unnötige Scans von Inhaltsdateien vermieden werden.

- **excludedPath**:
  - _Typ_: `string[]`
  - _Standard_: `['**/node_modules/**', '**/dist/**', '**/build/**', '**/.intlayer/**', '**/.next/**', '**/.nuxt/**', '**/.expo/**', '**/.vercel/**', '**/.turbo/**', '**/.tanstack/**']`
  - _Beschreibung_: Verzeichnisse, die von der Inhaltssuche ausgeschlossen sind.
  - _Hinweis_: Diese Einstellung wird derzeit noch nicht verwendet, ist aber für zukünftige Implementierungen geplant.

- **formatCommand**:
  - _Typ_: `string`
  - _Standard_: `undefined`
  - _Beschreibung_: Der Befehl zum Formatieren des Inhalts. Wenn Intlayer Ihre .content-Dateien lokal schreibt, wird dieser Befehl zum Formatieren des Inhalts verwendet.
  - _Beispiel_: `'npx prettier --write "{{file}}" --log-level silent'` Mit Prettier
  - _Beispiel_: `'npx biome format "{{file}}" --write --log-level none'` Mit Biome
  - _Beispiel_: `'npx eslint --fix "{{file}}"  --quiet'` Mit ESLint
  - _Hinweis_: Intlayer ersetzt {{file}} durch den Pfad der zu formatierenden Datei.
  - _Hinweis_: Wenn nicht gesetzt, versucht Intlayer, den Formatierungsbefehl automatisch zu erkennen. Durch Versuch, die folgenden Befehle aufzulösen: prettier, biome, eslint.

---

### Systemkonfiguration

Einstellungen im Zusammenhang mit internen Pfaden und Ausgabeergebnissen von Intlayer. Diese Einstellungen sind typischerweise intern und sollten nicht vom Benutzer geändert werden müssen.

#### Eigenschaften

- **baseDir**:
  - _Typ_: `string`
  - _Standard_: `process.cwd()`
  - _Beschreibung_: Das Basisverzeichnis für das Projekt.
  - _Beispiel_: `'/path/to/project'`
  - _Hinweis_: Dies wird verwendet, um alle Intlayer-bezogenen Verzeichnisse aufzulösen.

- **dictionariesDir**:
  - _Typ_: `string`
  - _Standard_: `'.intlayer/dictionary'`
  - _Beschreibung_: Der Verzeichnispfad zur Speicherung von Lokalisierungswörterbüchern.

- **moduleAugmentationDir**:
  - _Typ_: `string`
  - _Standard_: `'.intlayer/types'`
  - _Beschreibung_: Verzeichnis für Module-Augmentation, um bessere IDE-Vorschläge und Typüberprüfung zu ermöglichen.
  - _Beispiel_: `'intlayer-types'`
  - _Hinweis_: Stellen Sie sicher, dass dies in der `tsconfig.json` enthalten ist.

- **unmergedDictionariesDir**:
  - _Typ_: `string`
  - _Standard_: `'.intlayer/unmerged_dictionary'`
  - _Beschreibung_: Das Verzeichnis zur Speicherung von nicht zusammengeführten Wörterbüchern.

- **typesDir**:
  - _Typ_: `string`
  - _Standard_: `'.intlayer/types'`
  - _Beschreibung_: Das Verzeichnis zur Speicherung von Wörterbuchtypen.

- **mainDir**:
  - _Typ_: `string`
  - _Standard_: `'.intlayer/main'`
  - _Beschreibung_: Das Verzeichnis, in dem die Hauptanwendungsdateien gespeichert sind.

- **configDir**:
  - _Typ_: `string`
  - _Standard_: `'.intlayer/config'`
  - _Beschreibung_: Das Verzeichnis, in dem die Konfigurationsdateien gespeichert sind.

- **cacheDir**:
  - _Typ_: `string`
  - _Standard_: `'.intlayer/cache'`
  - _Beschreibung_: Das Verzeichnis, in dem die Cache-Dateien gespeichert sind.

### Wörterbuch-Konfiguration

Einstellungen, die Wörterbuchoperationen steuern, einschließlich des Auto-Fill-Verhaltens und der Inhaltsgenerierung.

Diese Wörterbuchkonfiguration dient zwei Hauptzwecken:

1. **Standardwerte**: Definieren Sie Standardwerte beim Erstellen von Inhaltsdeklarationsdateien
2. **Fallback-Verhalten**: Stellen Sie Fallback-Werte bereit, wenn bestimmte Felder nicht definiert sind, sodass Sie das Verhalten von Wörterbuchoperationen global definieren können

Weitere Informationen zu Inhaltsdeklarationsdateien und zur Anwendung von Konfigurationswerten finden Sie in der [Inhaltsdatei-Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/content_file.md).

#### Eigenschaften

- **fill**:
  - _Type_: `Fill` (`boolean | FilePathPattern | Partial<Record<Locale, boolean | FilePathPattern>>`)
  - _Default_: `true`
  - _Description_: Controls how auto-fill (AI translation) output files are generated for this dictionary. When set at the config level (`dictionary.fill`), it serves as the default for all dictionaries. Each dictionary can override this with its own `fill` field.
  - _Options_:
    - `true`: Use the default output path (same file as the source dictionary).
    - `false`: Disable auto-fill for this dictionary.
    - String template: `'/locales/{{locale}}/{{key}}.content.json'` — generates one file per locale using the template.
    - Function: `({ key, locale }) => \`/locales/${locale}/${key}.content.json\`` — generates one file per locale using a function.
    - Object per-locale: `{ en: '...', fr: '...', es: false }` — each locale maps to its own pattern; `false` skips that locale.
  - _Note_: Including `{{locale}}` in the pattern (or using an object) triggers per-locale file generation. Without it, a single multilingual file is written.
  - _Note_: A dictionary-level `fill` always takes priority over `dictionary.fill` from the global config.
  - _Example_:
    ```ts
    dictionary: {
      fill: {
        en: '/locales/en/{{key}}.content.json',
        fr: ({ key }) => `/locales/fr/${key}.content.json`,
        es: false,
      }
    }
    ```
- **description**
- **locale**
- **location**
- **priority**
- **live**
- **schema**
- **title**
- **tags**
- **version**

---

### Logger-Konfiguration

Einstellungen, die den Logger steuern, einschließlich des zu verwendenden Präfixes.

#### Eigenschaften

- **mode**:
  - _Typ_: `string`
  - _Standard_: `default`
  - _Beschreibung_: Gibt den Modus des Loggers an.
  - _Optionen_: `default`, `verbose`, `disabled`
  - _Beispiel_: `default`
  - _Hinweis_: Der Modus des Loggers. Der verbose-Modus protokolliert mehr Informationen und kann für Debugging-Zwecke verwendet werden. Der deaktivierte Modus schaltet den Logger aus.

- **prefix**:
  - _Typ_: `string`
  - _Standard_: `'[intlayer] '`
  - _Beschreibung_: Das Präfix des Loggers.
  - _Beispiel_: `'[my custom prefix] '`
  - _Hinweis_: Das Präfix des Loggers.

### KI-Konfiguration

Einstellungen, die die KI-Funktionen von Intlayer steuern, einschließlich des Anbieters, Modells und API-Schlüssels.

Diese Konfiguration ist optional, wenn Sie mit einem Zugriffsschlüssel im [Intlayer Dashboard](https://app.intlayer.org/project) registriert sind. Intlayer verwaltet automatisch die effizienteste und kostengünstigste KI-Lösung für Ihre Bedürfnisse. Die Verwendung der Standardoptionen gewährleistet eine bessere langfristige Wartbarkeit, da Intlayer kontinuierlich aktualisiert wird, um die relevantesten Modelle zu verwenden.

Wenn Sie Ihren eigenen API-Schlüssel oder ein bestimmtes Modell verwenden möchten, können Sie Ihre eigene KI-Konfiguration definieren.
Diese KI-Konfiguration wird global in Ihrer Intlayer-Umgebung verwendet. CLI-Befehle verwenden diese Einstellungen als Standardwerte für die Befehle (z. B. `fill`), ebenso wie das SDK, der Visual Editor und das CMS. Sie können diese Standardwerte für spezifische Anwendungsfälle mit Befehlsparametern überschreiben.

Intlayer unterstützt mehrere KI-Anbieter für erhöhte Flexibilität und Auswahlmöglichkeiten. Derzeit unterstützte Anbieter sind:

- **OpenAI** (Standard)
- **Anthropic Claude**
- **Mistral AI**
- **DeepSeek**
- **Google Gemini**
- **Meta Llama**
- **Ollama**
- **OpenRouter**
- **Alibaba Cloud**
- **Fireworks**
- **Hugging Face**
- **Groq**
- **Amazon Bedrock**
- **Google AI Studio**
- **Google Vertex**
- **Together.ai**
- **ollama**

#### Eigenschaften

- **provider** :
  - _Typ_ : `string`
  - _Standard_ : `'openai'`
  - _Beschreibung_ : Der Provider, der für die KI-Funktionen von Intlayer verwendet werden soll.
  - _Optionen_ : `'openai'`, `'anthropic'`, `'mistral'`, `'deepseek'`, `'gemini'`, `'ollama'`, `'openrouter'`, `'alibaba'`, `'fireworks'`, `'groq'`, `'huggingface'`, `'bedrock'`, `'googleaistudio'`, `'googlevertex'`, `'togetherai'`
  - _Beispiel_ : `'anthropic'`
  - _Hinweis_: Verschiedene Provider erfordern möglicherweise unterschiedliche API-Schlüssel und haben unterschiedliche Preismodelle.

- **model** :
  - _Typ_ : `string`
  - _Standard_ : Keiner
  - _Beschreibung_ : Das Modell, das für die KI-Funktionen von Intlayer verwendet werden soll.
  - _Beispiel_ : `'gpt-4o-2024-11-20'`
  - _Hinweis_ : Das spezifische zu verwendende Modell variiert je nach Provider.

- **temperature** :
  - _Typ_ : `number`
  - _Standard_ : Keine
  - _Beschreibung_ : Die Temperatur steuert die Zufälligkeit der KI-Antworten.
  - _Beispiel_ : `0.1`
  - _Hinweis_ : Eine höhere Temperatur macht die KI kreativer und weniger vorhersehbar.

- **apiKey** :
  - _Typ_ : `string`
  - _Standard_ : Keine
  - _Beschreibung_ : Ihr API-Schlüssel für den ausgewählten Provider.
  - _Beispiel_ : `process.env.OPENAI_API_KEY`
  - _Hinweis_ : Wichtig: API-Schlüssel sollten geheim gehalten und nicht öffentlich geteilt werden. Bitte stellen Sie sicher, dass sie an einem sicheren Ort, wie z.B. Umgebungsvariablen, aufbewahrt werden.

- **applicationContext** :
  - _Typ_ : `string`
  - _Standard_ : Keiner
  - _Beschreibung_ : Bietet dem KI-Modell zusätzlichen Kontext über Ihre Anwendung, um genauere und kontextbezogenere Übersetzungen zu generieren. Dies kann Informationen über das Anwendungsgebiet Ihrer App, die Zielgruppe, den Tonfall oder spezifische Terminologie enthalten.
  - _Hinweis_: Sie können dies verwenden, um dem KI-Modell weitere Regeln hinzuzufügen (z. B. "Sie dürfen URLs nicht transformieren").
  - _Beispiel_ : `'Mein Anwendungskontext'`

- **baseURL** :
  - _Typ_ : `string`
  - _Standard_ : Keine
  - _Beschreibung_ : Die Basis-URL für die KI-API.
  - _Beispiel_ : `'https://api.openai.com/v1'`
  - _Beispiel_ : `'http://localhost:5000'`
  - _Hinweis_ : Kann verwendet werden, um auf einen lokalen oder benutzerdefinierten KI-API-Endpunkt zu verweisen.

- **dataSerialization**:
  - _Typ_: `'json' | 'toon'`
  - _Standard_: `'json'`
  - _Beschreibung_: Das Datenserialisierungsformat, das für die KI-Funktionen von Intlayer verwendet werden soll.
  - _Beispiel_: `'toon'`
  - _Hinweis_: `json`: Standard, zuverlässig; verbraucht mehr Tokens. `toon`: Weniger Tokens, weniger konsistent als JSON.
    > Wenn Sie zusätzliche Parameter angeben, wird Intlayer diese als Kontext an das KI-Modell übergeben. Dies kann verwendet werden, um den Reasoning-Aufwand, die Text-Ausführlichkeit usw. anzupassen.

### Build-Konfiguration

Einstellungen, die steuern, wie Intlayer die Internationalisierung Ihrer Anwendung optimiert und baut.

Die Build-Optionen gelten für die Plugins `@intlayer/babel` und `@intlayer/swc`.

> Im Entwicklungsmodus verwendet Intlayer statische Importe für die Wörterbücher, um die Entwicklungserfahrung zu vereinfachen.

> Wenn optimiert, wird Intlayer die Aufrufe an die Wörterbücher ersetzen, um das Splitting zu optimieren, so dass das finale Paket nur die tatsächlich verwendeten Wörterbücher importiert.

#### Eigenschaften

- **mode** :
  - _Typ_ : `'auto' | 'manual'`
  - _Standard_ : `'auto'`
  - _Beschreibung_ : Steuert den Build-Modus.
  - _Beispiel_ : `'manual'`
  - _Hinweis_ : Wenn 'auto', wird der Build automatisch während des App-Builds ausgelöst.
  - _Hinweis_ : Wenn 'manual', wird der Build erst ausgelöst, wenn der Build-Befehl ausgeführt wird.
  - _Hinweis_ : Kann verwendet werden, um den Bau von Wörterbüchern zu deaktivieren, z.B. wenn die Ausführung in einer Node.js-Umgebung vermieden werden soll.

- **optimize** :
  - _Typ_ : `boolean`
  - _Standard_ : `undefined`
  - _Beschreibung_ : Steuert, ob der Build optimiert werden soll.
  - _Beispiel_ : `process.env.NODE_ENV === 'production'`
  - _Hinweis_ : Standardmäßig ist die Build-Optimierung nicht festgelegt. Wenn sie nicht definiert ist, wird Intlayer die Build-Optimierung während des Baus Ihrer Anwendung (vite / nextjs / etc) aktivieren. Das Setzen auf `true` erzwingt die Build-Optimierung, auch im Entwicklungsmodus. Das Setzen auf `false` deaktiviert die Build-Optimierung.
  - _Hinweis_ : Wenn aktiviert, wird Intlayer alle Aufrufe an die Wörterbücher ersetzen, um das Splitting zu optimieren. Das finale Paket wird daher nur die verwendeten Wörterbücher importieren. Alle Importe bleiben statische Importe, um asynchrone Verarbeitung beim Laden der Wörterbücher zu vermeiden.
  - _Hinweis_ : Intlayer wird alle Aufrufe von `useIntlayer` durch den über die Option `importMode` definierten Modus ersetzen und `getIntlayer` durch `getDictionary`.
  - _Hinweis_ : Diese Option ist abhängig von den Plugins `@intlayer/babel` und `@intlayer/swc`.
  - _Hinweis_ : Stellen Sie sicher, dass alle Schlüssel in `useIntlayer`-Aufrufen statisch deklariert sind. Zum Beispiel `useIntlayer('navbar')`.

- **checkTypes** :
  - _Typ_ : `boolean`
  - _Standard_ : `false`
  - _Beschreibung_ : Gibt an, ob der Build die TypeScript-Typen überprüfen und Fehler protokollieren soll.
  - _Hinweis_ : Dies kann den Build verlangsamen.

- **outputFormat** :
  - _Typ_ : `('esm' | 'cjs')[]`
  - _Standard_ : `['cjs', 'esm']`
  - _Beschreibung_ : Steuert das Ausgabeformat der Wörterbücher.
  - _Beispiel_ : `'cjs'`
  - _Hinweis_ : Das Ausgabeformat der Wörterbücher.

- **traversePattern** :
  - _Typ_ : `string[]`
  - _Standard_ : `['**\/*.{js,ts,mjs,cjs,jsx,tsx}', '!**\/node_modules/**']`
  - _Beschreibung_ : Muster, die definieren, welche Dateien während der Optimierung durchlaufen werden sollen.
    - _Beispiel_ : `['src/**\/*.{ts,tsx}', '../ui-library/**\/*.{ts,tsx}', '!**/node_modules/**']`
  - _Hinweis_ : Verwenden Sie dies, um die Optimierung auf relevante Codedateien zu beschränken und die Build-Performance zu verbessern.
  - _Hinweis_ : Diese Option wird ignoriert, wenn `optimize` deaktiviert ist.
  - _Hinweis_ : Verwenden Sie ein Glob-Muster.

---

### Compiler-Konfiguration

Einstellungen zur Steuerung des Intlayer-Compilers, der Wörterbücher direkt aus Ihren Komponenten extrahiert.

#### Eigenschaften

- **enabled**:
  - _Typ_: `boolean | 'build-only'`
  - _Standard_: `true`
  - _Beschreibung_: Gibt an, ob der Compiler aktiviert sein soll, um die Wörterbücher zu extrahieren.
  - _Beispiel_: `'build-only'`
  - _Hinweis_: Wenn Sie dies auf `'build-only'` setzen, wird der Compiler im Entwicklungsmodus übersprungen, um die Startzeiten zu beschleunigen. Er wird nur bei Build-Befehlen ausgeführt.

- **dictionaryKeyPrefix**:
  - _Typ_: `string`
  - _Standard_: `''`
  - _Beschreibung_: Präfix für die extrahierten Wörterbuchschlüssel.
  - _Beispiel_: `'my-key-'`
  - _Hinweis_: Wenn Wörterbücher extrahiert werden, wird der Schlüssel basierend auf dem Dateinamen generiert. Dieses Präfix wird dem generierten Schlüssel hinzugefügt, um Konflikte zu vermeiden.

- **saveComponents**:
  - _Typ_: `boolean`
  - _Standard_: `false`
  - _Beschreibung_: Gibt an, ob die Komponenten nach der Transformation gespeichert werden sollen.
  - _Hinweis_: Wenn auf true gesetzt, ersetzt der Compiler die Originaldateien durch die transformierten Dateien. Auf diese Weise kann der Compiler nur einmal ausgeführt werden, um die App zu transformieren, und dann entfernt werden.

- **transformPattern**:
  - _Typ_: `string | string[]`
  - _Standard_: `['**/*.{ts,tsx,jsx,js,cjs,mjs,svelte,vue}', '!**/node_modules/**']`
  - _Beschreibung_: Muster, die definieren, welche Dateien während der Optimierung durchlaufen werden sollen.
  - _Beispiel_: `['src/**/*.{ts,tsx}', '!**/node_modules/**']`
  - _Hinweis_: Verwenden Sie dies, um die Optimierung auf relevante Code-Dateien zu beschränken und die Build-Leistung zu verbessern.

- **excludePattern**:
  - _Typ_: `string | string[]`
  - _Standard_: `['**/node_modules/**']`
  - _Beschreibung_: Muster, die definieren, welche Dateien während der Optimierung ausgeschlossen werden sollen.
  - _Beispiel_: `['**/node_modules/**', '!**/node_modules/react/**']`

- **output**:
  - _Typ_: `Fill`
  - _Standard_: `undefined`
  - _Beschreibung_: Definiert den Pfad der Ausgabedateien. Ersetzt `outputDir`. Verarbeitet dynamische Variablen über Template-Strings oder eine Funktion. Unterstützte Variablen: `{{fileName}}`, `{{key}}`, `{{locale}}`, `{{extension}}`, `{{componentFileName}}`, `{{componentExtension}}`, `{{format}}`, `{{componentFormat}}` und `{{componentDirPath}}`.
  - _Hinweis_: `./` Pfade werden relativ zum Verzeichnis der Komponente aufgelöst. `/` Pfade werden relativ zum Projektstamm (`baseDir`) aufgelöst.
  - _Hinweis_: Das Einfügen der Variable `{{locale}}` in den Pfad löst die Generierung separater Wörterbücher pro Locale aus.
  - _Note_: Supports an object per-locale notation where each locale key maps to its own pattern (string or function), or `false` to skip that locale entirely.
  - _Beispiel_:
    - **Mehrsprachige Dateien in der Nähe der Komponente** :
    - String: `'./{{fileName}}{{extension}}'`
    - Funktion: `({ fileName, extension }) => \`./${fileName}${extension}\``

    - **Zentralisierte JSON-Dateien pro Locale** :
    - String: `'/locales/{{locale}}/{{key}}.content.json'`
    - Funktion: `({ key, locale }) => \`/locales/${locale}/${key}.content.json\``

    - **Object per-locale (different pattern per locale, skip some)**:

    ```ts
    output: {
      en: ({ key }) => `./locales/en/${key}.json`,
      fr: '/locales/fr/{{key}}.content.json',
      es: false, // skip Spanish
    }
    ```

- **noMetadata**:
  - _Typ_: `boolean`
  - _Standard_: `false`
  - _Beschreibung_: Gibt an, ob die Metadaten in der Datei gespeichert werden sollen. Wenn wahr, speichert der Compiler nicht die Metadaten der Wörterbücher (Schlüssel, Inhaltscontainer). Nützlich für i18next- oder ICU-MessageFormat-JSON-Ausgaben pro Sprache.
  - _Hinweis_: Nützlich bei Verwendung mit dem Plugin `loadJSON`.
  - _Beispiel_:
    Wenn `true` :
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
