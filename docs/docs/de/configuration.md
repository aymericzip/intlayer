---
createdAt: 2024-08-13
updatedAt: 2026-04-03
title: Konfiguration (Configuration)
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
history:
  - version: 8.7.0
    date: 2026-04-03
    changes: "Option `currentDomain` hinzugefügt"
  - version: 8.4.0
    date: 2026-03-20
    changes: "Objektweise Notation pro Sprache für 'compiler.output' und 'dictionary.fill' hinzugefügt"
  - version: 8.3.0
    date: 2026-03-11
    changes: "'baseDir' von 'content' in die 'system' Konfiguration verschoben"
  - version: 8.2.0
    date: 2026-03-09
    changes: "Compiler-Optionen aktualisiert, Unterstützung für 'output' und 'noMetadata' hinzugefügt"
  - version: 8.1.7
    date: 2026-02-25
    changes: "Compiler-Optionen aktualisiert"
  - version: 8.1.5
    date: 2026-02-23
    changes: "Compiler-Option 'build-only' und Wörterbuch-Präfix hinzugefügt"
  - version: 8.0.6
    date: 2026-02-12
    changes: "Unterstützung für Open Router, Alibaba, Amazon, Google Vertex Bedrock, Fireworks, Groq, Hugging Face und Together.ai Anbieter hinzugefügt"
  - version: 8.0.5
    date: 2026-02-06
    changes: "`dataSerialization` zur KI-Konfiguration hinzugefügt"
  - version: 8.0.0
    date: 2026-01-24
    changes: "Import-Modus `live` in `fetch` umbenannt, um den zugrunde liegenden Mechanismus besser zu beschreiben."
  - version: 8.0.0
    date: 2026-01-22
    changes: "Build-Konfiguration `importMode` in die `dictionary` Konfiguration verschoben."
  - version: 8.0.0
    date: 2026-01-22
    changes: "`rewrite` Option zur Routing-Konfiguration hinzugefügt"
  - version: 8.0.0
    date: 2026-01-18
    changes: "Systemkonfiguration von der Inhaltskonfiguration getrennt. Interne Pfade in die Eigenschaft `system` verschoben. `codeDir` hinzugefügt, um Inhaltsdateien von der Codetransformation zu trennen."
  - version: 8.0.0
    date: 2026-01-18
    changes: "Wörterbuch-Optionen `location` und `schema` hinzugefügt"
  - version: 7.5.1
    date: 2026-01-10
    changes: "Unterstützung für JSON5 und JSONC Dateiformate hinzugefügt"
  - version: 7.5.0
    date: 2025-12-17
    changes: "Option `buildMode` hinzugefügt"
  - version: 7.0.0
    date: 2025-10-25
    changes: "`dictionary` Konfiguration hinzugefügt"
  - version: 7.0.0
    date: 2025-10-21
    changes: "`middleware` durch `routing` Konfiguration ersetzt"
  - version: 7.0.0
    date: 2025-10-12
    changes: "Option `formatCommand` hinzugefügt"
  - version: 6.2.0
    date: 2025-10-12
    changes: "Option `excludedPath` aktualisiert"
  - version: 6.0.2
    date: 2025-09-23
    changes: "Option `outputFormat` hinzugefügt"
  - version: 6.0.0
    date: 2025-09-21
    changes: "Feld `dictionaryOutput` und Feld `i18nextResourcesDir` entfernt"
  - version: 6.0.0
    date: 2025-09-16
    changes: "Import-Modus `live` hinzugefügt"
  - version: 6.0.0
    date: 2025-09-04
    changes: "Feld `hotReload` durch `liveSync` ersetzt und die Felder `liveSyncPort` und `liveSyncURL` hinzugefügt"
  - version: 5.6.1
    date: 2025-07-25
    changes: "`activateDynamicImport` durch die Option `importMode` ersetzt"
  - version: 5.6.0
    date: 2025-07-13
    changes: "Standard `contentDir` von `['src']` zu `['.']` geändert"
  - version: 5.5.11
    date: 2025-06-29
    changes: "`docs` Befehle hinzugefügt"
---

# Intlayer Konfigurationsdokumentation

## Überblick

Intlayer-Konfigurationsdateien ermöglichen die Anpassung verschiedener Aspekte des Plugins, wie Internationalisierung, Middleware und Inhaltsverarbeitung. Dieses Dokument bietet eine detaillierte Beschreibung jeder Eigenschaft in der Konfiguration.

---

## Inhaltsverzeichnis

<TOC/>

---

## Unterstützung von Konfigurationsdateien

Intlayer akzeptiert die Konfigurationsdateiformate JSON, JS, MJS und TS:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.json5`
- `intlayer.config.jsonc`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

---

## Beispiel-Konfigurationsdatei

````typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";
import { nextjsRewrite } from "intlayer/routing";
import { z } from "zod";

/**
 * Beispiel für eine Intlayer-Konfigurationsdatei, die alle verfügbaren Optionen zeigt.
 */
const config: IntlayerConfig = {
  /**
   * Konfiguration für Internationalisierungseinstellungen.
   */
  internationalization: {
    /**
     * Liste der unterstützten Sprachen in der Anwendung.
     * Standard: [Locales.ENGLISH]
     */
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],

    /**
     * Liste der erforderlichen Sprachen, die in jedem Wörterbuch definiert sein müssen.
     * Wenn leer, sind im `strict` Modus alle Sprachen erforderlich.
     * Standard: []
     */
    requiredLocales: [Locales.ENGLISH],

    /**
     * Strengegrad für internationalisierte Inhalte.
     * - "strict": Fehler, wenn eine deklarierte Sprache fehlt oder nicht deklariert ist.
     * - "inclusive": Warnungen, wenn eine deklarierte Sprache fehlt.
     * - "loose": Akzeptiert jede vorhandene Sprache.
     * Standard: "inclusive"
     */
    strictMode: "inclusive",

    /**
     * Standardsprache, die als Fallback verwendet wird, wenn die angeforderte Sprache nicht gefunden wird.
     * Standard: Locales.ENGLISH
     */
    defaultLocale: Locales.ENGLISH,
  },

  /**
   * Einstellungen, die Wörterbuchoperationen und Fallback-Verhalten steuern.
   */
  dictionary: {
    /**
     * Steuert, wie Wörterbücher importiert werden.
     * - "static": Statisch zur Build-Zeit importiert.
     * - "dynamic": Dynamisch mit Suspense importiert.
     * - "fetch": Dynamisch über die Live Sync API abgerufen.
     * Standard: "static"
     */
    importMode: "static",

    /**
     * Strategie für das automatische Ausfüllen fehlender Übersetzungen mittels KI.
     * Kann ein boolescher Wert oder ein Pfadmuster zum Speichern der ausgefüllten Inhalte sein.
     * Standard: true
     */
    fill: true,

    /**
     * Physischer Speicherort der Wörterbuchdateien.
     * - "local": Im lokalen Dateisystem gespeichert.
     * - "remote": Im Intlayer CMS gespeichert.
     * - "hybrid": Im lokalen Dateisystem und im Intlayer CMS gespeichert.
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
     * Strategie für das Sprachrouting.
     * - "prefix-no-default": Präfix für alle außer der Standardsprache (z. B. /dashboard, /fr/dashboard).
     * - "prefix-all": Präfix für alle Sprachen (z. B. /en/dashboard, /fr/dashboard).
     * - "no-prefix": Keine Sprache in der URL.
     * - "search-params": Verwendung von ?locale=...
     * Standard: "prefix-no-default"
     */
    mode: "prefix-no-default",

    /**
     * Wo die vom Benutzer gewählte Sprache gespeichert werden soll.
     * Optionen: 'cookie', 'localStorage', 'sessionStorage', 'header' oder ein Array davon.
     * Standard: ['cookie', 'header']
     */
    storage: ["cookie", "header"],

    /**
     * Basispfad für die Anwendungs-URLs.
     * Standard: ""
     */
    basePath: "",

    /**
     * Benutzerdefinierte URL-Rewrite-Regeln für sprachspezifische Pfade.
     */
    rewrite: nextjsRewrite({
      "/[locale]/about": {
        en: "/[locale]/about",
        fr: "/[locale]/a-propos",
      },
    }),

    /**
     * Verknüpft Sprachen mit Domain-Hostnamen für domainbasiertes Routing.
     * URLs für diese Sprachen sind absolut (z. B. https://intlayer.cn/).
     * Die Domain impliziert die Sprache, daher wird dem Pfad kein Sprachpräfix hinzugefügt.
     * Standard: undefined
     */
    domains: {
      en: "intlayer.org",
      zh: "intlayer.cn",
    },
  },

  /**
   * Einstellungen zum Finden und Verarbeiten von Inhaltsdateien.
   */
  content: {
    /**
     * Dateierweiterungen, nach denen nach Wörterbüchern gesucht wird.
     * Standard: ['.content.ts', '.content.js', '.content.json', etc.]
     */
    fileExtensions: [".content.ts", ".content.js", ".content.json"],

    /**
     * Verzeichnisse, in denen sich .content-Dateien befinden.
     * Standard: ["."]
     */
    contentDir: ["src"],

    /**
     * Verzeichnisse, in denen sich der Quellcode befindet.
     * Wird für Build-Optimierung und Codetransformation verwendet.
     * Standard: ["."]
     */
    codeDir: ["src"],

    /**
     * Muster, die vom Scannen ausgeschlossen werden sollen.
     * Standard: ['node_modules', '.intlayer', etc.]
     */
    excludedPath: ["node_modules"],

    /**
     * Ob Änderungen überwacht und Wörterbücher während der Entwicklung neu erstellt werden sollen.
     * Standard: true in der Entwicklung
     */
    watch: true,

    /**
     * Befehl zum Formatieren neu erstellter / aktualisierter .content-Dateien.
     */
    formatCommand: 'npx prettier --write "{{file}}"',
  },

  /**
   * Konfiguration des visuellen Editors.
   */
  editor: {
    /**
     * Ob der visuelle Editor aktiviert ist.
     * Standard: false
     */
    enabled: true,

    /**
     * URL Ihrer Anwendung zur Validierung der Herkunft.
     * Standard: ""
     */
    applicationURL: "http://localhost:3000",

    /**
     * Port für den lokalen Editor-Server.
     * Standard: 8000
     */
    port: 8000,

    /**
     * Öffentliche URL für den Editor.
     * Standard: "http://localhost:8000"
     */
    editorURL: "http://localhost:8000",

    /**
     * Intlayer CMS URL.
     * Standard: "https://app.intlayer.org"
     */
    cmsURL: "https://app.intlayer.org",

    /**
     * Backend API URL.
     * Standard: "https://back.intlayer.org"
     */
    backendURL: "https://back.intlayer.org",

    /**
     * Ob Echtzeit-Inhaltssynchronisierung aktiviert werden soll.
     * Standard: false
     */
    liveSync: true,
  },

  /**
   * KI-gestützte Übersetzungs- und Generierungseinstellungen.
   */
  ai: {
    /**
     * Zu verwendender KI-Anbieter.
     * Optionen: 'openai', 'anthropic', 'mistral', 'deepseek', 'gemini', 'ollama', 'openrouter', 'alibaba', 'fireworks', 'groq', 'huggingface', 'bedrock', 'googlevertex', 'togetherai'
     * Standard: 'openai'
     */
    provider: "openai",

    /**
     * Zu verwendendes Modell des ausgewählten Anbieters.
     */
    model: "gpt-4o",

    /**
     * API-Schlüssel des Anbieters.
     */
    apiKey: process.env.OPENAI_API_KEY,

    /**
     * Globaler Kontext, um die KI beim Generieren von Übersetzungen zu unterstützen.
     */
    applicationContext: "Dies ist eine Reisebuchungsanwendung.",

    /**
     * Basis-URL für die KI-API.
     */
    baseURL: "http://localhost:3000",

    /**
     * Datenserialisierung
     *
     * Optionen:
     * - "json": Standard, zuverlässig; verbraucht mehr Tokens.
     * - "toon": Weniger Tokens, weniger konsistent als JSON.
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
     * Modus der Build-Ausführung.
     * - "auto": Automatischer Build während des App-Builds.
     * - "manual": Erfordert einen expliziten Build-Befehl.
     * Standard: "auto"
     */
    mode: "auto",

    /**
     * Ob das finale Bundle durch Entfernen ungenutzter Wörterbücher optimiert werden soll.
     * Standard: true in der Produktion
     */
    optimize: true,

    /**
     * Ausgabeformat für generierte Wörterbuchdateien.
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
     * Logging-Level.
     * - "default": Standard-Logging.
     * - "verbose": Detailliertes Debug-Logging.
     * - "disabled": Kein Logging.
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
   * Systemkonfiguration (Erweiterte Anwendungsfälle)
   */
  system: {
    /**
     * Verzeichnis zum Speichern lokalisierter Wörterbücher.
     */
    dictionariesDir: ".intlayer/dictionary",

    /**
     * Verzeichnis für die Modul-Augmentierung.
     */
    moduleAugmentationDir: ".intlayer/types",

    /**
     * Verzeichnis zum Speichern nicht zusammengeführter Wörterbücher.
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
     * Verzeichnis, in dem die Cache-Dateien gespeichert sind.
     */
    cacheDir: ".intlayer/cache",
  },

  /**
   * Compiler-Konfiguration (Erweiterte Anwendungsfälle)
   */
  compiler: {
    /**
     * Gibt an, ob der Compiler aktiviert sein soll.
     *
     * - false: Compiler deaktivieren.
     * - true: Compiler aktivieren.
     * - "build-only": Compiler während der Entwicklung überspringen, um Startzeiten zu beschleunigen.
     *
     * Standard: false
     */
    enabled: true,

    /**
     * Definiert den Pfad für die Ausgabedateien. Ersetzt `outputDir`.
     *
     * - `./` Pfade werden relativ zum Komponentenverzeichnis aufgelöst.
     * - `/` Pfade werden relativ zum Projektstamm (`baseDir`) aufgelöst.
     *
     * - Wenn die Variable `{{locale}}` im Pfad enthalten ist, wird die Generierung separater Wörterbücher pro Sprache ausgelöst.
     *
     * Beispiel:
     * ```ts
     * {
     *   // Mehrsprachige .content.ts Dateien in der Nähe der Komponente erstellen
     *   output: ({ fileName, extension }) => `./${fileName}${extension}`,
     *
     *   // output: './{{fileName}}{{extension}}', // Äquivalent mit Template-String
     * }
     * ```
     *
     * ```ts
     * {
     *   // Zentralisierte pro-Sprache JSON-Dateien im Stammverzeichnis des Projekts erstellen
     *   output: ({ key, locale }) => `/locales/${locale}/${key}.content.json`,
     *
     *   // output: '/locales/{{locale}}/{{key}}.content.json', // Äquivalent mit Template-String
     * }
     * ```
     *
     * Liste der Variablen:
     *   - `fileName`: Name der Datei.
     *   - `key`: Schlüssel des Inhalts.
     *   - `locale`: Sprache des Inhalts.
     *   - `extension`: Erweiterung der Datei.
     *   - `componentFileName`: Name der Komponentendatei.
     *   - `componentExtension`: Erweiterung der Komponentendatei.
     *   - `format`: Format des Wörterbuchs.
     *   - `componentFormat`: Format des Komponentenwörterbuchs.
     *   - `componentDirPath`: Verzeichnispfad der Komponente.
     */
    output: ({ locale, key }) => `compiler/${locale}/${key}.json`,

    /**
     * Gibt an, ob die Komponenten nach der Transformation gespeichert werden sollen.
     *
     * - Wenn `true`, schreibt der Compiler die Komponentendatei auf die Festplatte um. Die Transformation ist also dauerhaft und der Compiler überspringt die Transformation für den nächsten Prozess. Auf diese Weise kann der Compiler die App transformieren und anschließend entfernt werden.
     *
     * - Wenn `false`, fügt der Compiler den `useIntlayer()` Funktionsaufruf nur in den Code der Build-Ausgabe ein und lässt die Basis-Code-Basis intakt. Die Transformation erfolgt nur im Speicher.
     */
    saveComponents: false,

    /**
     * Nur Inhalte in die generierte Datei einfügen. Nützlich für pro-Sprache i18next oder ICU MessageFormat JSON-Ausgaben.
     */
    noMetadata: false,

    /**
     * Wörterbuch-Schlüsselpräfix
     */
    dictionaryKeyPrefix: "", // Optionales Präfix für die extrahierten Wörterbuchschlüssel hinzufügen
  },

  /**
   * Benutzerdefinierte Schemata zum Validieren des Inhalts der Wörterbücher.
   */
  schemas: {
    "my-schema": z.object({
      title: z.string(),
    }),
  },

  /**
   * Plugin-Konfiguration.
   */
  plugins: [],
};

export default config;
````

---

## Konfigurationsreferenz

Die folgenden Abschnitte beschreiben die verschiedenen für Intlayer verfügbaren Konfigurationseinstellungen.

---

### Internationalisierungskonfiguration

Definiert Einstellungen zur Internationalisierung, einschließlich der verfügbaren Sprachen und der Standardsprache für die Anwendung.

| Feld              | Beschreibung                                                                                             | Typ        | Standard            | Beispiel             | Hinweis                                                                                                                                                                                                                                                                                                                      |
| ----------------- | -------------------------------------------------------------------------------------------------------- | ---------- | ------------------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `locales`         | Die Liste der unterstützten Sprachen in der Anwendung.                                                   | `string[]` | `[Locales.ENGLISH]` | `['en', 'fr', 'es']` |                                                                                                                                                                                                                                                                                                                              |
| `requiredLocales` | Die Liste der erforderlichen Sprachen in der Anwendung.                                                  | `string[]` | `[]`                | `[]`                 | • Wenn leer, sind alle Sprachen im `strict` Modus erforderlich.<br/>• Stellen Sie sicher, dass erforderliche Sprachen auch im `locales` Feld definiert sind.                                                                                                                                                                 |
| `strictMode`      | Gewährleistet eine starke Implementierung von internationalisierten Inhalten mittels TypeScript.         | `string`   | `'inclusive'`       |                      | • Wenn `"strict"`: Die `t`-Funktion erfordert, dass jede deklarierte Sprache definiert ist — wirft einen Fehler, wenn eine fehlt oder nicht deklariert ist.<br/>• Wenn `"inclusive"`: Warnt vor fehlenden Sprachen, akzeptiert aber vorhandene, nicht deklarierte.<br/>• Wenn `"loose"`: Akzeptiert jede vorhandene Sprache. |
| `defaultLocale`   | Die Standardsprache, die als Fallback verwendet wird, wenn die angeforderte Sprache nicht gefunden wird. | `string`   | `Locales.ENGLISH`   | `'en'`               | Wird verwendet, um die Sprache zu bestimmen, wenn keine in der URL, im Cookie oder im Header angegeben ist.                                                                                                                                                                                                                  |

---

### Editorkonfiguration

Definiert Einstellungen für den integrierten Editor, einschließlich Server-Port und Aktivierungsstatus.

| Feld                         | Beschreibung                                                                                                                                                                         | Typ                               | Standard                            | Beispiel                                                                                        | Hinweis                                                                                                                                                                                                                                                                    |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------- | ----------------------------------- | ----------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `applicationURL`             | Die URL der Anwendung.                                                                                                                                                               | `string`                          | `undefined`                         | `'http://localhost:3000'` <br/> `'https://example.com'` <br/> `process.env.INTLAYER_EDITOR_URL` | • Wird aus Sicherheitsgründen verwendet, um die Herkunft des Editors einzuschränken.<br/>• Wenn auf `'*'` gesetzt, ist der Editor von jeder Quelle zugänglich.                                                                                                             |
| `port`                       | Der vom visuellen Editor-Server verwendete Port.                                                                                                                                     | `number`                          | `8000`                              |                                                                                                 |                                                                                                                                                                                                                                                                            |
| `editorURL`                  | Die URL des Editor-Servers.                                                                                                                                                          | `string`                          | `'http://localhost:8000'`           | `'http://localhost:3000'` <br/> `'https://example.com'` <br/> `process.env.INTLAYER_EDITOR_URL` | • Wird verwendet, um die Quellen einzuschränken, die mit der Anwendung interagieren können.<br/>• Wenn auf `'*'` gesetzt, von jeder Quelle zugänglich.<br/>• Sollte festgelegt werden, wenn der Port geändert wird oder der Editor auf einer anderen Domain gehostet wird. |
| `cmsURL`                     | Die URL des Intlayer CMS.                                                                                                                                                            | `string`                          | `'https://app.intlayer.org'`        | `'https://app.intlayer.org'`                                                                    |                                                                                                                                                                                                                                                                            |
| `backendURL`                 | Die URL des Backend-Servers.                                                                                                                                                         | `string`                          | `https://back.intlayer.org`         | `http://localhost:4000`                                                                         |                                                                                                                                                                                                                                                                            |
| `enabled`                    | Gibt an, ob die Anwendung mit dem visuellen Editor interagiert.                                                                                                                      | `boolean`                         | `false`                             | `process.env.NODE_ENV !== 'production'`                                                         | • Wenn `false`, kann der Editor nicht mit der Anwendung interagieren.<br/>• Deaktivierung für bestimmte Umgebungen erhöht die Sicherheit.                                                                                                                                  |
| `clientId`                   | Erlaubt Intlayer-Paketen die Authentifizierung beim Backend mittels oAuth2. Um ein Zugriffstoken zu erhalten, gehen Sie zu [intlayer.org/project](https://app.intlayer.org/project). | `string` &#124; <br/> `undefined` | `undefined`                         |                                                                                                 | Geheim halten; in Umgebungsvariablen speichern.                                                                                                                                                                                                                            |
| `clientSecret`               | Erlaubt Intlayer-Paketen die Authentifizierung beim Backend mittels oAuth2. Um ein Zugriffstoken zu erhalten, gehen Sie zu [intlayer.org/project](https://app.intlayer.org/project). | `string` &#124; <br/> `undefined` | `undefined`                         |                                                                                                 | Geheim halten; in Umgebungsvariablen speichern.                                                                                                                                                                                                                            |
| `dictionaryPriorityStrategy` | Strategie zur Priorisierung von Wörterbüchern, wenn sowohl lokale als auch entfernte vorhanden sind.                                                                                 | `string`                          | `'local_first'`                     | `'distant_first'`                                                                               | • `'distant_first'`: Priorisiert entfernte vor lokalen.<br/>• `'local_first'`: Priorisiert lokale vor entfernten.                                                                                                                                                          |
| `liveSync`                   | Gibt an, ob der App-Server Inhalte im Hot-Reload-Verfahren aktualisieren soll, wenn eine Änderung im CMS <br/> Visual Editor <br/> Backend erkannt wird.                             | `boolean`                         | `true`                              | `true`                                                                                          | • Wenn ein Wörterbuch hinzugefügt/aktualisiert wird, aktualisiert die App den Seiteninhalt.<br/>• Live Sync verlagert Inhalte auf einen anderen Server, was die Leistung geringfügig beeinflussen kann.<br/>• Es wird empfohlen, beides auf derselben Maschine zu hosten.  |
| `liveSyncPort`               | Der Port des Live Sync Servers.                                                                                                                                                      | `number`                          | `4000`                              | `4000`                                                                                          |                                                                                                                                                                                                                                                                            |
| `liveSyncURL`                | Die URL des Live Sync Servers.                                                                                                                                                       | `string`                          | `'http://localhost:{liveSyncPort}'` | `'https://example.com'`                                                                         | Zeigt standardmäßig auf localhost; kann für einen entfernten Live Sync Server geändert werden.                                                                                                                                                                             |

---

### Routing-Konfiguration

Einstellungen, die das Routing-Verhalten steuern, einschließlich URL-Struktur, Sprachspeicherung und Middleware-Handhabung.

| Feld       | Beschreibung                                                                                                                                                                                                 | Typ                                                                                                                                                                                                          | Standard               | Beispiel                                                                                                                                                                                          | Hinweis                                                                                                                                                                                                                                                                                   |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mode`     | URL-Routing-Modus für die Sprachbehandlung.                                                                                                                                                                  | `'prefix-no-default'` &#124; <br/> `'prefix-all'` &#124; <br/> `'no-prefix'` &#124; <br/> `'search-params'`                                                                                                  | `'prefix-no-default'`  | `'prefix-no-default'`: `/dashboard` (en) oder `/fr/dashboard` (fr). `'prefix-all'`: `/en/dashboard`. `'no-prefix'`: Sprache wird anderweitig behandelt. `'search-params'`: `/dashboard?locale=fr` | Beeinflusst nicht das Cookie- oder Sprachspeicher-Management.                                                                                                                                                                                                                             |
| `storage`  | Konfiguration für die Speicherung der Sprache im Client.                                                                                                                                                     | `false` &#124; <br/> `'cookie'` &#124; <br/> `'localStorage'` &#124; <br/> `'sessionStorage'` &#124; <br/> `'header'` &#124; <br/> `CookiesAttributes` &#124; <br/> `StorageAttributes` &#124; <br/> `Array` | `['cookie', 'header']` | `'localStorage'` <br/> `[{ type: 'cookie', name: 'custom-locale', secure: true }]`                                                                                                                | Siehe Tabelle Speicheroptionen unten.                                                                                                                                                                                                                                                     |
| `basePath` | Der Basispfad für die Anwendungs-URLs.                                                                                                                                                                       | `string`                                                                                                                                                                                                     | `''`                   | `'/my-app'`                                                                                                                                                                                       | Wenn die App unter `https://example.com/my-app` erreichbar ist, ist basePath `'/my-app'` und URLs werden zu `https://example.com/my-app/en`.                                                                                                                                              |
| `rewrite`  | Benutzerdefinierte URL-Rewrite-Regeln, die den Standard-Routing-Modus für bestimmte Pfade überschreiben. Unterstützt dynamische `[param]` Parameter.                                                         | `Record<string, StrictModeLocaleMap<string>>`                                                                                                                                                                | `undefined`            | Siehe Beispiel unten                                                                                                                                                                              | • Rewrite-Regeln haben Vorrang vor `mode`.<br/>• Funktioniert mit Next.js und Vite.<br/>• `getLocalizedUrl()` wendet passende Regeln automatisch an.<br/>• Siehe [Benutzerdefinierte URL-Rewrites](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/custom_url_rewrites.md). |
| `domains`  | Verknüpft Sprachen mit Domain-Hostnamen für domainbasiertes Routing. Wenn festgelegt, verwenden URLs für eine Sprache diese Domain als Basis (absolute URL) und dem Pfad wird kein Sprachpräfix hinzugefügt. | `Partial<Record<Locale, string>>`                                                                                                                                                                            | `undefined`            | `{ zh: 'intlayer.zh', fr: 'intlayer.org' }`                                                                                                                                                       | • Protokoll ist standardmäßig `https://`, wenn es nicht im Hostnamen enthalten ist.<br/>• Die Domain selbst identifiziert die Sprache, daher wird kein `/zh/`-Präfix hinzugefügt.<br/>• `getLocalizedUrl('/', 'zh')` gibt `https://intlayer.zh/` zurück.                                  |

**`rewrite` Beispiel**:

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

#### Speicheroptionen

| Wert               | Hinweis                                                                                                                                                                                                         | Beschreibung                                                                               |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `'cookie'`         | • Stellen Sie für die DSGVO-Konformität eine ordnungsgemäße Benutzereinwilligung sicher.<br/>• Anpassbar über `CookiesAttributes` (`{ type: 'cookie', name: 'custom-locale', secure: true, httpOnly: false }`). | Speichert die Sprache in Cookies — zugänglich sowohl auf Client- als auch auf Serverseite. |
| `'localStorage'`   | • Kein Ablauf, außer explizit gelöscht.<br/>• Der Intlayer-Proxy kann nicht darauf zugreifen.<br/>• Anpassbar über `StorageAttributes` (`{ type: 'localStorage', name: 'custom-locale' }`).                     | Speichert die Sprache im Browser ohne Ablauf — nur Clientseite.                            |
| `'sessionStorage'` | • Gelöscht, wenn Tab/Fenster geschlossen wird.<br/>• Der Intlayer-Proxy kann nicht darauf zugreifen.<br/>• Anpassbar über `StorageAttributes` (`{ type: 'sessionStorage', name: 'custom-locale' }`).            | Speichert die Sprache für die Dauer der Seitensitzung — nur Clientseite.                   |
| `'header'`         | • Nützlich für API-Aufrufe.<br/>• Clientseite kann nicht darauf zugreifen.<br/>• Anpassbar über `StorageAttributes` (`{ type: 'header', name: 'custom-locale' }`).                                              | Überträgt die Sprache über HTTP-Header — nur Serverseite.                                  |

#### Cookie-Attribute

Wenn Sie Cookie-Speicherung verwenden, können Sie zusätzliche Cookie-Attribute konfigurieren:

| Feld       | Beschreibung                                 | Typ                                                   |
| ---------- | -------------------------------------------- | ----------------------------------------------------- |
| `name`     | Cookie-Name. Standard: `'INTLAYER_LOCALE'`   | `string`                                              |
| `domain`   | Cookie-Domain. Standard: `undefined`         | `string`                                              |
| `path`     | Cookie-Pfad. Standard: `undefined`           | `string`                                              |
| `secure`   | HTTPS erforderlich. Standard: `undefined`    | `boolean`                                             |
| `httpOnly` | HTTP-only Flag. Standard: `undefined`        | `boolean`                                             |
| `sameSite` | SameSite-Richtlinie.                         | `'strict'` &#124; <br/> `'lax'` &#124; <br/> `'none'` |
| `expires`  | Ablaufdatum oder Tage. Standard: `undefined` | `Date` &#124; <br/> `number`                          |

#### Sprachspeicher-Attribute

Bei Verwendung von localStorage oder sessionStorage:

| Feld   | Beschreibung                                          | Typ                                              |
| ------ | ----------------------------------------------------- | ------------------------------------------------ |
| `type` | Speichertyp.                                          | `'localStorage'` &#124; <br/> `'sessionStorage'` |
| `name` | Speicher-Schlüsselname. Standard: `'INTLAYER_LOCALE'` | `string`                                         |

#### Konfigurationsbeispiele

Hier sind einige gängige Konfigurationsbeispiele für die neue Routing-Struktur von v7:

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

**Modus ohne Präfix mit benutzerdefiniertem Speicher**:

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

**Benutzerdefiniertes URL-Rewriting mit dynamischen Routen**:

```typescript
// intlayer.config.ts
import { nextjsRewrite } from "intlayer/routing";

const config: IntlayerConfig = {
  internationalization: {
    locales: ["en", "fr"],
    defaultLocale: "en",
  },
  routing: {
    mode: "prefix-no-default", // Fallback für nicht umgeschriebene Pfade
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

Einstellungen für die Inhaltsbehandlung in der Anwendung, einschließlich Verzeichnisnamen, Dateierweiterungen und abgeleiteter Konfigurationen.

| Feld             | Beschreibung                                                                                                     | Typ        | Standard                                                                                                                                                                  | Beispiel                                                                                                                                                                              | Hinweis                                                                                                                                                          |
| ---------------- | ---------------------------------------------------------------------------------------------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `watch`          | Gibt an, ob Intlayer auf Änderungen in Inhaltsdeklarationsdateien achten soll, um Wörterbücher neu zu erstellen. | `boolean`  | `true`                                                                                                                                                                    |                                                                                                                                                                                       |                                                                                                                                                                  |
| `fileExtensions` | Dateierweiterungen, die beim Kompilieren von Wörterbüchern gescannt werden sollen.                               | `string[]` | `['.content.ts', '.content.js', '.content.cjs', '.content.mjs', '.content.json', '.content.json5', '.content.jsonc', '.content.tsx', '.content.jsx']`                     | `['.data.ts', '.data.js', '.data.json']`                                                                                                                                              | Die Anpassung kann helfen, Konflikte zu vermeiden.                                                                                                               |
| `contentDir`     | Der Verzeichnispfad, in dem Inhaltsdefinitionsdateien (`.content.*`) gespeichert sind.                           | `string[]` | `['.']`                                                                                                                                                                   | `['src', '../../ui-library', require.resolve("@my-package/content"), '@my-package/content']`                                                                                          | Wird verwendet, um nach Inhaltsdateien zu suchen und Wörterbücher neu zu erstellen.                                                                              |
| `codeDir`        | Der Verzeichnispfad, in dem der Code gespeichert ist, relativ zum Basisverzeichnis.                              | `string[]` | `['.']`                                                                                                                                                                   | `['src', '../../ui-library']`                                                                                                                                                         | • Wird verwendet, um nach Codedateien für die Transformation (Pruning, Optimierung) zu suchen.<br/>• Die Trennung von `contentDir` kann die Leistung verbessern. |
| `excludedPath`   | Verzeichnisse, die vom Scannen nach Inhalten ausgeschlossen werden sollen.                                       | `string[]` | `['**/node_modules/**', '**/dist/**', '**/build/**', '**/.intlayer/**', '**/.next/**', '**/.nuxt/**', '**/.expo/**', '**/.vercel/**', '**/.turbo/**', '**/.tanstack/**']` |                                                                                                                                                                                       | Wird noch nicht verwendet; für zukünftige Implementierung vorgesehen.                                                                                            |
| `formatCommand`  | Befehl zum Formatieren von Inhaltsdateien, wenn Intlayer sie lokal schreibt.                                     | `string`   | `undefined`                                                                                                                                                               | `'npx prettier --write "{{file}}" --log-level silent'` (Prettier), `'npx biome format "{{file}}" --write --log-level none'` (Biome), `'npx eslint --fix "{{file}}" --quiet'` (ESLint) | • `{{file}}` wird durch den Dateipfad ersetzt.<br/>• Wenn nicht definiert, erkennt Intlayer dies automatisch (testet Prettier, Biome, ESLint).                   |

---

### Wörterbuchkonfiguration

Einstellungen, die Wörterbuchoperationen steuern, einschließlich automatischem Ausfüllverhalten und Inhaltsgenerierung.

| Feld                        | Beschreibung                                                                                                                                                                           | Typ                                                                                                             | Standard              | Beispiel                                                                                    | Hinweis                                                                                                                                                                                                                                                                                                                                                                                                                         |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | --------------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `fill`                      | Steuert, wie die Ausgabedateien für das automatische Ausfüllen (KI-Übersetzung) generiert werden.                                                                                      | `boolean` &#124; <br/> `FilePathPattern` &#124; <br/> `Partial<Record<Locale, boolean &#124; FilePathPattern>>` | `true`                | `{ en: '/locales/en/{{key}}.json', fr: ({ key }) => '/locales/fr/${key}.json', es: false }` | • `true`: Standardpfad (gleiche Datei wie Quelle).<br/>• `false`: Deaktivieren.<br/>• String-/Funktionsmuster erzeugt Dateien pro Sprache.<br/>• Objekt pro Sprache: Jede Sprache entspricht ihrem eigenen Muster; `false` ignoriert diese Sprache.<br/>• Das Einschließen von `{{locale}}` aktiviert die Pro-Sprache-Generierung.<br/>• `fill` auf Wörterbuchebene hat immer Vorrang vor dieser globalen Einstellung.          |
| `description`               | Hilft dem Editor und dem CMS, den Zweck des Wörterbuchs zu verstehen. Wird auch als Kontext für die KI-gestützte Übersetzungsgenerierung verwendet.                                    | `string`                                                                                                        | `undefined`           | `'Benutzerprofil-Abschnitt'`                                                                |                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `locale`                    | Transformiert das Wörterbuch in ein Pro-Sprache-Format. Jedes deklarierte Feld wird zu einem Übersetzungsknoten. Wenn nicht vorhanden, wird das Wörterbuch als mehrsprachig behandelt. | `LocalesValues`                                                                                                 | `undefined`           | `'en'`                                                                                      | Verwenden Sie dies, wenn das Wörterbuch spezifisch für eine einzelne Sprache ist, anstatt Übersetzungen für mehrere zu enthalten.                                                                                                                                                                                                                                                                                               |
| `contentAutoTransformation` | Transformiert Inhaltsstrings automatisch in typisierte Knoten (Markdown, HTML oder Insertion).                                                                                         | `boolean` &#124; <br/> `{ markdown?: boolean; html?: boolean; insertion?: boolean }`                            | `false`               | `true`                                                                                      | • Markdown : `### Title` → `md('### Title')`.<br/>• HTML : `<div>Title</div>` → `html('<div>Title</div>')`.<br/>• Insertion : `Hallo {{name}}` → `insert('Hallo {{name}}')`.                                                                                                                                                                                                                                                    |
| `location`                  | Gibt an, wo Wörterbuchdateien gespeichert werden und wie sie mit dem CMS synchronisiert werden.                                                                                        | `'local'` &#124; <br/> `'remote'` &#124; <br/> `'hybrid'` &#124; <br/> `'plugin'` &#124; <br/> `string`         | `'local'`             | `'hybrid'`                                                                                  | • `'local'`: Nur lokal verwaltet.<br/>• `'remote'`: Nur remote verwaltet (CMS).<br/>• `'hybrid'`: Sowohl lokal als auch remote verwaltet.<br/>• `'plugin'` oder benutzerdefinierter String: Von einem Plugin oder einer benutzerdefinierten Quelle verwaltet.                                                                                                                                                                   |
| `importMode`                | Steuert, wie Wörterbücher importiert werden.                                                                                                                                           | `'static'` &#124; <br/> `'dynamic'` &#124; <br/> `'fetch'`                                                      | `'static'`            | `'dynamic'`                                                                                 | • `'static'`: Statisch importiert.<br/>• `'dynamic'`: Dynamisch mittels Suspense importiert.<br/>• `'fetch'`: Über Live Sync API abgerufen; Fallback auf `'dynamic'`, falls fehlgeschlagen.<br/>• Erfordert `@intlayer/babel` und `@intlayer/swc` Plugins.<br/>• Schlüssel müssen statisch deklariert sein.<br/>• Wird ignoriert, wenn `optimize` deaktiviert ist.<br/>• Beeinflusst nicht `getIntlayer`, `getDictionary`, etc. |
| `priority`                  | Priorität des Wörterbuchs. Höhere Werte gewinnen beim Lösen von Konflikten zwischen Wörterbüchern.                                                                                     | `number`                                                                                                        | `undefined`           | `1`                                                                                         |                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `live`                      | Veraltet — stattdessen `importMode: 'fetch'` verwenden. Gibt an, ob Wörterbuchinhalte dynamisch über die Live Sync API abgerufen werden sollen.                                        | `boolean`                                                                                                       | `undefined`           |                                                                                             | In v8.0.0 in `importMode: 'fetch'` umbenannt.                                                                                                                                                                                                                                                                                                                                                                                   |
| `schema`                    | Wird automatisch von Intlayer für die JSON-Schema-Validierung generiert.                                                                                                               | `'https://intlayer.org/schema.json'`                                                                            | automatisch generiert |                                                                                             | Nicht manuell bearbeiten.                                                                                                                                                                                                                                                                                                                                                                                                       |
| `title`                     | Hilft bei der Identifizierung des Wörterbuchs im Editor und CMS.                                                                                                                       | `string`                                                                                                        | `undefined`           | `'Benutzerprofil'`                                                                          |                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `tags`                      | Kategorisiert Wörterbücher und bietet Kontext oder Anweisungen für den Editor und die KI.                                                                                              | `string[]`                                                                                                      | `undefined`           | `['benutzer', 'profil']`                                                                    |                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `version`                   | Version des entfernten Wörterbuchs; hilft bei der Verfolgung der aktuell verwendeten Version.                                                                                          | `string`                                                                                                        | `undefined`           | `'1.0.0'`                                                                                   | • Verwaltbar im CMS.<br/>• Nicht lokal bearbeiten.                                                                                                                                                                                                                                                                                                                                                                              |

**`fill` Beispiel**:

```ts
dictionary: {
  fill: {
    en: "/locales/en/{{key}}.content.json",
    fr: ({ key }) => `/locales/fr/${key}.content.json`,
    es: false,
  },
};
```

---

### Logger-Konfiguration

Einstellungen zur Anpassung der Protokollausgabe (Logs) von Intlayer.

| Feld     | Beschreibung                         | Typ                                                            | Standard        | Beispiel           | Hinweis                                                                                                                    |
| -------- | ------------------------------------ | -------------------------------------------------------------- | --------------- | ------------------ | -------------------------------------------------------------------------------------------------------------------------- |
| `mode`   | Steuert den Modus des Loggers.       | `'default'` &#124; <br/> `'verbose'` &#124; <br/> `'disabled'` | `'default'`     | `'verbose'`        | • `'verbose'`: Protokolliert mehr Informationen für das Debugging.<br/>• `'disabled'`: Deaktiviert den Logger vollständig. |
| `prefix` | Das Präfix für Protokollnachrichten. | `string`                                                       | `'[intlayer] '` | `'[mein präfix] '` |                                                                                                                            |

---

### KI-Konfiguration

Einstellungen, die die KI-Funktionen von Intlayer steuern, einschließlich Anbieter, Modell und API-Schlüssel.

Diese Konfiguration ist optional, wenn Sie im [Intlayer Dashboard](https://app.intlayer.org/project) mit einem Zugangsschlüssel registriert sind. Intlayer verwaltet automatisch die effizienteste und kostengünstigste KI-Lösung für Ihre Bedürfnisse. Die Verwendung der Standardoptionen gewährleistet eine bessere langfristige Wartbarkeit, da Intlayer kontinuierlich aktualisiert wird, um die relevantesten Modelle zu verwenden.

Wenn Sie lieber Ihren eigenen API-Schlüssel oder ein bestimmtes Modell verwenden möchten, können Sie Ihre benutzerdefinierte KI-Konfiguration definieren.
Diese KI-Konfiguration wird global in Ihrer Intlayer-Umgebung verwendet. Die CLI-Befehle verwenden diese Einstellungen standardmäßig für Befehle wie `fill`, ebenso wie das SDK, der visuelle Editor und das CMS. Sie können diese Standardwerte für spezifische Anwendungsfälle über Befehlsparameter überschreiben.

Intlayer unterstützt mehrere KI-Anbieter für maximale Flexibilität. Derzeit unterstützte Anbieter sind:

- **OpenAI** (Standard)
- **Anthropic Claude**
- **Mistral AI**
- **DeepSeek**
- **Google Gemini**
- **Google AI Studio**
- **Google Vertex**
- **Meta Llama**
- **Ollama**
- **OpenRouter**
- **Alibaba Cloud**
- **Fireworks**
- **Hugging Face**
- **Groq**
- **Amazon Bedrock**
- **Together.ai**

| Feld                 | Beschreibung                                                                                                                                     | Typ                                                                                                                                                                                                                                                                                                                                                                                            | Standard    | Beispiel                                                      | Hinweis                                                                                                                                                                                                           |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | ------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `provider`           | Der für Intlayer KI-Funktionen zu verwendende Anbieter.                                                                                          | `'openai'` &#124; <br/> `'anthropic'` &#124; <br/> `'mistral'` &#124; <br/> `'deepseek'` &#124; <br/> `'gemini'` &#124; <br/> `'ollama'` &#124; <br/> `'openrouter'` &#124; <br/> `'alibaba'` &#124; <br/> `'fireworks'` &#124; <br/> `'groq'` &#124; <br/> `'huggingface'` &#124; <br/> `'bedrock'` &#124; <br/> `'googleaistudio'` &#124; <br/> `'googlevertex'` &#124; <br/> `'togetherai'` | `undefined` | `'anthropic'`                                                 | Verschiedene Anbieter erfordern unterschiedliche API-Schlüssel und haben unterschiedliche Preismodelle.                                                                                                           |
| `model`              | Das für die KI-Funktionen zu verwendende Modell.                                                                                                 | `string`                                                                                                                                                                                                                                                                                                                                                                                       | Keines      | `'gpt-4o-2024-11-20'`                                         | Das spezifische Modell variiert je nach Anbieter.                                                                                                                                                                 |
| `temperature`        | Steuert den Zufallsfaktor der KI-Antworten.                                                                                                      | `number`                                                                                                                                                                                                                                                                                                                                                                                       | Keines      | `0.1`                                                         | Höhere Temperatur = kreativer und weniger vorhersehbar.                                                                                                                                                           |
| `apiKey`             | Ihr API-Schlüssel für den ausgewählten Anbieter.                                                                                                 | `string`                                                                                                                                                                                                                                                                                                                                                                                       | Keines      | `process.env.OPENAI_API_KEY`                                  | Geheim halten; in Umgebungsvariablen speichern.                                                                                                                                                                   |
| `applicationContext` | Zusätzlicher Kontext über Ihre Anwendung, um der KI zu helfen, genauere Übersetzungen zu generieren (Domain, Zielgruppe, Tonfall, Terminologie). | `string`                                                                                                                                                                                                                                                                                                                                                                                       | Keines      | `'Mein Anwendungskontext'`                                    | Kann verwendet werden, um Regeln hinzuzufügen (z. B.: `"URLs dürfen nicht verändert werden"`).                                                                                                                    |
| `baseURL`            | Die Basis-URL für die KI-API.                                                                                                                    | `string`                                                                                                                                                                                                                                                                                                                                                                                       | Keines      | `'https://api.openai.com/v1'` <br/> `'http://localhost:5000'` | Kann auf einen lokalen oder benutzerdefinierten KI-API-Endpunkt zeigen.                                                                                                                                           |
| `dataSerialization`  | Datenserialisierungsformat für die KI-Funktionen.                                                                                                | `'json'` &#124; <br/> `'toon'`                                                                                                                                                                                                                                                                                                                                                                 | `undefined` | `'toon'`                                                      | • `'json'`: Standard, zuverlässig; verbraucht mehr Tokens.<br/>• `'toon'`: Weniger Tokens, weniger konsistent.<br/>• Zusätzliche Parameter werden an das Modell als Kontext übergeben (Abstraktionsaufwand etc.). |

---

### Build-Konfiguration

Einstellungen, die steuern, wie Intlayer die Internationalisierung Ihrer Anwendung optimiert und erstellt.

Die Build-Optionen gelten für die Plugins `@intlayer/babel` und `@intlayer/swc`.

> Im Entwicklungsmodus verwendet Intlayer statische Importe für Wörterbücher, um die Entwicklung zu vereinfachen.

> Bei der Optimierung ersetzt Intlayer Wörterbuch-Aufrufe, um das Chunking zu optimieren, sodass das finale Bundle nur die tatsächlich verwendeten Wörterbücher importiert.

| Feld              | Beschreibung                                                                              | Typ                              | Standard                                                                                                                                                                          | Beispiel                                                                      | Hinweis                                                                                                                                                                                                                                                                                                                           |
| ----------------- | ----------------------------------------------------------------------------------------- | -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mode`            | Steuert den Build-Modus.                                                                  | `'auto'` &#124; <br/> `'manual'` | `'auto'`                                                                                                                                                                          | `'manual'`                                                                    | • `'auto'`: Build wird automatisch während des App-Builds ausgelöst.<br/>• `'manual'`: Wird nur ausgeführt, wenn der Build-Befehl explizit aufgerufen wird.<br/>• Kann verwendet werden, um Wörterbuch-Builds zu deaktivieren (z. B. um die Ausführung in Node.js-Umgebungen zu vermeiden).                                       |
| `optimize`        | Steuert, ob der Build optimiert werden soll.                                              | `boolean`                        | `undefined`                                                                                                                                                                       | `process.env.NODE_ENV === 'production'`                                       | • Wenn nicht definiert, wird die Optimierung beim Build des Frameworks (Vite/Next.js) ausgelöst.<br/>• `true` erzwingt die Optimierung auch im Dev-Modus.<br/>• `false` deaktiviert sie.<br/>• Wenn aktiv, ersetzt es Wörterbuch-Aufrufe zur Chunking-Optimierung.<br/>• Erfordert `@intlayer/babel` und `@intlayer/swc` Plugins. |
| `checkTypes`      | Gibt an, ob der Build TypeScript-Typen prüfen und Fehler protokollieren soll.             | `boolean`                        | `false`                                                                                                                                                                           |                                                                               | Kann den Build-Prozess verlangsamen.                                                                                                                                                                                                                                                                                              |
| `outputFormat`    | Steuert das Ausgabeformat der Wörterbücher.                                               | `('esm' &#124; 'cjs')[]`         | `['esm', 'cjs']`                                                                                                                                                                  | `['cjs']`                                                                     |                                                                                                                                                                                                                                                                                                                                   |
| `traversePattern` | Muster, die definieren, welche Dateien während der Optimierung durchlaufen werden sollen. | `string[]`                       | `['**/*.{tsx,ts,js,mjs,cjs,jsx,vue,svelte,svte}', '!**/node_modules/**', '!**/dist/**', '!**/.intlayer/**', '!**/*.config.*', '!**/*.test.*', '!**/*.spec.*', '!**/*.stories.*']` | `['src/**/*.{ts,tsx}', '../ui-library/**/*.{ts,tsx}', '!**/node_modules/**']` | • Begrenzen Sie die Optimierung auf relevante Dateien, um die Build-Leistung zu verbessern.<br/>• Wird ignoriert, wenn `optimize` deaktiviert ist.<br/>• Verwendet Glob-Muster.                                                                                                                                                   |

---

### Systemkonfiguration

Diese Einstellungen sind für fortgeschrittene Anwendungsfälle und die interne Konfiguration von Intlayer gedacht.

| Feld                      | Beschreibung                                         | Typ      | Standard                          | Beispiel | Hinweis |
| ------------------------- | ---------------------------------------------------- | -------- | --------------------------------- | -------- | ------- |
| `dictionariesDir`         | Verzeichnis für kompilierte Wörterbücher.            | `string` | `'.intlayer/dictionary'`          |          |         |
| `moduleAugmentationDir`   | Verzeichnis für die TypeScript-Modul-Augmentierung.  | `string` | `'.intlayer/types'`               |          |         |
| `unmergedDictionariesDir` | Verzeichnis für nicht zusammengeführte Wörterbücher. | `string` | `'.intlayer/unmerged_dictionary'` |          |         |
| `typesDir`                | Verzeichnis für generierte Typen.                    | `string` | `'.intlayer/types'`               |          |         |
| `mainDir`                 | Verzeichnis für die Intlayer-Hauptdatei.             | `string` | `'.intlayer/main'`                |          |         |
| `configDir`               | Verzeichnis für kompilierte Konfigurationsdateien.   | `string` | `'.intlayer/config'`              |          |         |
| `cacheDir`                | Verzeichnis für Cache-Dateien.                       | `string` | `'.intlayer/cache'`               |          |         |

---

### Compiler-Konfiguration

Einstellungen, die den Intlayer-Compiler steuern, der Wörterbücher direkt aus Ihren Komponenten extrahiert.

| Feld                  | Beschreibung                                                                                                                                                                                                                                                                                                          | Typ                                                                                                             | Standard    | Beispiel                                                                                                                                                 | Hinweis                                                                                                                                                                                                                                                                                                                      |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `enabled`             | Gibt an, ob der Compiler für die Extraktion von Wörterbüchern aktiviert sein soll.                                                                                                                                                                                                                                    | `boolean` &#124; <br/> `'build-only'`                                                                           | `true`      | `'build-only'`                                                                                                                                           | `'build-only'` überspringt den Compiler während der Entwicklung, um Builds zu beschleunigen; wird nur bei Build-Befehlen ausgeführt.                                                                                                                                                                                         |
| `dictionaryKeyPrefix` | Präfix für extrahierte Wörterbuch-Schlüssel.                                                                                                                                                                                                                                                                          | `string`                                                                                                        | `''`        | `'mein-präfix-'`                                                                                                                                         | Wird dem generierten Schlüssel (basierend auf dem Dateinamen) vorangestellt, um Konflikte zu vermeiden.                                                                                                                                                                                                                      |
| `saveComponents`      | Gibt an, ob die Komponenten nach der Transformation gespeichert werden sollen.                                                                                                                                                                                                                                        | `boolean`                                                                                                       | `false`     |                                                                                                                                                          | • Wenn `true`, schreibt der Compiler die Komponentendatei auf die Festplatte um. Die Transformation ist dauerhaft und der Compiler kann anschließend entfernt werden.<br/>• Wenn `false`, fügt der Compiler den `useIntlayer()` Funktionsaufruf nur in den Code der Build-Ausgabe ein und lässt die Basis-Code-Basis intakt. |
| `output`              | Definiert den Pfad für Ausgabedateien. Ersetzt `outputDir`. Unterstützt Template-Variablen: `{{fileName}}`, <br/> `{{key}}`, <br/> `{{locale}}`, <br/> `{{extension}}`, <br/> `{{componentFileName}}`, <br/> `{{componentExtension}}`, <br/> `{{format}}`, <br/> `{{componentFormat}}`, <br/> `{{componentDirPath}}`. | `boolean` &#124; <br/> `FilePathPattern` &#124; <br/> `Partial<Record<Locale, boolean &#124; FilePathPattern>>` | `undefined` | `'./{{fileName}}{{extension}}'` <br/> `'/locales/{{locale}}/{{key}}.json'` <br/> `{ en: ({ key }) => './locales/en/${key}.json', fr: '...', es: false }` | • `./` Pfade werden relativ zum Komponentenverzeichnis aufgelöst.<br/>• `/` Pfade relativ zum Stamm.<br/>• `{{locale}}` löst die Pro-Sprache-Generierung aus.<br/>• Unterstützt objektweise Notation pro Sprache.                                                                                                            |
| `noMetadata`          | Wenn `true`, lässt der Compiler die Metadaten des Wörterbuchs (Schlüssel, Inhalts-Wrapper) in der Ausgabe weg.                                                                                                                                                                                                        | `boolean`                                                                                                       | `false`     | `false` → `{"key":"mein-schlüssel","content":{"key":"wert"}}` <br/> `true` → `{"key":"wert"}`                                                            | • Nützlich für i18next oder ICU MessageFormat JSON-Ausgaben.<br/>• Funktioniert gut mit dem `loadJSON` Plugin.                                                                                                                                                                                                               |
| `dictionaryKeyPrefix` | Wörterbuch-Schlüsselpräfix                                                                                                                                                                                                                                                                                            | `string`                                                                                                        | `''`        |                                                                                                                                                          | Fügen Sie ein optionales Präfix für die extrahierten Wörterbuchschlüssel hinzu                                                                                                                                                                                                                                               |

---

### Benutzerdefinierte Schemata (Custom Schemas)

| Feld      | Beschreibung                                                                             | Typ                         |
| --------- | ---------------------------------------------------------------------------------------- | --------------------------- |
| `schemas` | Erlaubt die Definition von Zod-Schemata zur Validierung der Struktur Ihrer Wörterbücher. | `Record<string, ZodSchema>` |

---

### Plugins

| Feld      | Beschreibung                                 | Typ                |
| --------- | -------------------------------------------- | ------------------ |
| `plugins` | Liste der zu aktivierenden Intlayer-Plugins. | `IntlayerPlugin[]` |
