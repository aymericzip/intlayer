---
createdAt: 2024-08-13
updatedAt: 2025-09-16
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
history:
  - version: 7.5.0
    date: 2025-12-17
    changes: Hinzufügen der Option `buildMode`
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
    changes: Füge `docs`-Befehle hinzu
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
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

---

## Beispiel für eine Konfigurationsdatei

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH], // unterstützte Sprachen
  },
  content: {
    autoFill: "./{{fileName}}.content.json", // automatische Befüllung der Inhaltsdatei
    contentDir: ["src", "../ui-library"], // Verzeichnisse mit Inhalten
  },
  middleware: {
    noPrefix: false, // Middleware ohne Präfix aktivieren/deaktivieren
  },
  editor: {
    applicationURL: "https://example.com", // URL der Anwendung im Editor
  },
  ai: {
    apiKey: process.env.OPENAI_API_KEY, // API-Schlüssel für KI-Dienste
    applicationContext: "This is a test application", // Kontext der Anwendung für KI
  },
  build: {
    importMode: "dynamic", // Importmodus für den Build-Prozess
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
// Konfiguration für Intlayer
const config = {
  internationalization: {
    locales: [Locales.ENGLISH], // unterstützte Sprachen
  },
  content: {
    contentDir: ["src", "../ui-library"], // Verzeichnisse mit Inhalten
  },
  middleware: {
    noPrefix: false, // Middleware ohne Präfix aktivieren/deaktivieren
  },
  editor: {
    applicationURL: "https://example.com", // URL der Anwendung im Editor
  },
  ai: {
    apiKey: process.env.OPENAI_API_KEY, // API-Schlüssel für KI-Dienste
    applicationContext: "This is a test application", // Kontext der Anwendung für KI
  },
  build: {
    importMode: "dynamic", // Importmodus für den Build-Prozess
  },
};

module.exports = config;
```

```json5 fileName=".intlayerrc" codeFormat="json"
{
  "internationalization": {
    "locales": ["en"], // unterstützte Sprachen
  },
  "content": {
    "contentDir": ["src", "../ui-library"], // Verzeichnisse mit Inhalten
  },
  "middleware": {
    "noPrefix": false, // Middleware ohne Präfix aktivieren/deaktivieren
  },
  "editor": {
    "applicationURL": "https://example.com", // URL der Anwendung im Editor
  },
  "ai": {
    "apiKey": "XXXX",
    "applicationContext": "Dies ist eine Testanwendung",
  },
  "build": {
    "importMode": "dynamisch",
  },
}
```

---

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

### Middleware-Konfiguration

Einstellungen, die das Verhalten der Middleware steuern, einschließlich wie die Anwendung Cookies, Header und URL-Präfixe für die Verwaltung von Sprachversionen behandelt.

#### Eigenschaften

- **headerName**:
  - _Typ_: `string`
  - _Standard_: `'x-intlayer-locale'`
  - _Beschreibung_: Der Name des HTTP-Headers, der zur Bestimmung der Sprache verwendet wird.
  - _Beispiel_: `'x-custom-locale'`
  - _Hinweis_: Nützlich für die sprachliche Bestimmung über APIs.

- **cookieName**:
  - _Typ_: `string`
  - _Standard_: `'intlayer-locale'`
  - _Beschreibung_: Der Name des Cookies, das zur Speicherung der Sprache verwendet wird.
  - _Beispiel_: `'custom-locale'`
  - _Hinweis_: Wird verwendet, um die Locale über Sitzungen hinweg zu speichern.

- **prefixDefault**:
  - _Typ_: `boolean`
  - _Standard_: `false`
  - _Beschreibung_: Ob die Standard-Locale in der URL enthalten sein soll.
  - _Beispiel_: `true`
  - _Hinweis_:
    - Wenn `true` und `defaultLocale = 'en'`: Pfad = `/en/dashboard` oder `/fr/dashboard`
    - Wenn `false` und `defaultLocale = 'en'`: Pfad = `/dashboard` oder `/fr/dashboard`

- **basePath**:
  - _Typ_: `string`
  - _Standard_: `''`
  - _Beschreibung_: Der Basis-Pfad für die Anwendungs-URLs.
  - _Beispiel_: `'/my-app'`
  - _Hinweis_:
    - Wenn die Anwendung unter `https://example.com/my-app` gehostet wird
    - Der Basis-Pfad ist `'/my-app'`
    - Die URL wird `https://example.com/my-app/en` sein
    - Wenn der Basis-Pfad nicht gesetzt ist, wird die URL `https://example.com/en` sein.

- **serverSetCookie**:
  - _Typ_: `string`
  - _Standard_: `'always'`
  - _Beschreibung_: Regel zum Setzen des Locale-Cookies auf dem Server.
  - _Optionen_: `'always'`, `'never'`
  - _Beispiel_: `'never'`
  - _Hinweis_: Steuert, ob das Locale-Cookie bei jeder Anfrage oder nie gesetzt wird.

- **noPrefix**:
  - _Typ_: `boolean`
  - _Standard_: `false`
  - _Beschreibung_: Ob das Locale-Präfix in URLs weggelassen wird.
  - _Beispiel_: `true`
  - _Hinweis_:
    - Wenn `true`: Kein Präfix in der URL
    - Wenn `false`: Präfix in der URL
    - Beispiel mit `basePath = '/my-app'`:
      - Wenn `noPrefix = false`: URL wird `https://example.com/my-app/en` sein
      - Wenn `noPrefix = true`: URL wird `https://example.com` sein

---

### Inhaltskonfiguration

Einstellungen im Zusammenhang mit der Inhaltsverwaltung innerhalb der Anwendung, einschließlich Verzeichnisnamen, Dateierweiterungen und abgeleiteter Konfigurationen.

#### Eigenschaften

- **autoFill**:
  - _Typ_: `boolean | string | { [key in Locales]?: string }`
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

- **baseDir**:
  - _Typ_: `string`
  - _Standard_: `process.cwd()`
  - _Beschreibung_: Das Basisverzeichnis für das Projekt.
  - _Beispiel_: `'/path/to/project'`
  - _Hinweis_: Dies wird verwendet, um alle Intlayer-bezogenen Verzeichnisse aufzulösen.

- **dictionaryOutput**:
  - _Typ_: `string[]`
  - _Standard_: `['intlayer']`
  - _Beschreibung_: Der Typ der Wörterbuchausgabe, z.B. `'intlayer'` oder `'i18next'`.

- **contentDir**:
  - _Typ_: `string[]`
  - _Standard_: `['.']`
  - _Beispiel_: `['src', '../../ui-library', require.resolve("@my-package/content")]`
  - _Beschreibung_: Der Verzeichnispfad, in dem Inhalte gespeichert sind.

- **dictionariesDir**:
  - _Typ_: `string`
  - _Standard_: `'.intlayer/dictionaries'`
  - _Beschreibung_: Der Verzeichnispfad zum Speichern von Zwischen- oder Ausgabedateien.

- **moduleAugmentationDir**:
  - _Typ_: `string`
  - _Standard_: `'.intlayer/types'`
  - _Beschreibung_: Verzeichnis für Module-Augmentation, um bessere IDE-Vorschläge und Typüberprüfung zu ermöglichen.
  - _Beispiel_: `'intlayer-types'`
  - _Hinweis_: Stellen Sie sicher, dass dies in der `tsconfig.json` enthalten ist.

- **unmergedDictionariesDir**:
  - _Typ_: `string`
  - _Standard_: `'.intlayer/unmerged_dictionary'`
  - _Beschreibung_: Das Verzeichnis zum Speichern von nicht zusammengeführten Wörterbüchern.
  - _Beispiel_: `'translations'`

- **dictionariesDir**:
  - _Typ_: `string`
  - _Standard_: `'.intlayer/dictionary'`
  - _Beschreibung_: Das Verzeichnis zur Speicherung von Lokalisierungswörterbüchern.
  - _Beispiel_: `'translations'`

- **i18nextResourcesDir**:
  - _Typ_: `string`
  - _Standard_: `'i18next_dictionary'`
  - _Beschreibung_: Das Verzeichnis zur Speicherung von i18n-Wörterbüchern.
  - _Beispiel_: `'translations'`
  - _Hinweis_: Stellen Sie sicher, dass dieses Verzeichnis für den i18next-Ausgabetyp konfiguriert ist.

- **typesDir**:
  - _Typ_: `string`
  - _Standard_: `'types'`
  - _Beschreibung_: Das Verzeichnis zur Speicherung von Wörterbuchtypen.
  - _Beispiel_: `'intlayer-types'`

- **mainDir**:
  - _Typ_: `string`
  - _Standard_: `'main'`
  - _Beschreibung_: Das Verzeichnis, in dem die Hauptanwendungsdateien gespeichert sind.
  - _Beispiel_: `'intlayer-main'`

- **excludedPath**:
  - _Typ_: `string[]`
  - _Standard_: `['node_modules']`
  - _Beschreibung_: Verzeichnisse, die von der Inhaltssuche ausgeschlossen sind.
  - _Hinweis_: Diese Einstellung wird derzeit noch nicht verwendet, ist aber für zukünftige Implementierungen geplant.

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

#### Eigenschaften

- **provider**:
  - _Typ_: `string`
  - _Standard_: `'openai'`
  - _Beschreibung_: Der Anbieter, der für die KI-Funktionen von Intlayer verwendet wird.
  - _Optionen_: `'openai'`, `'anthropic'`, `'mistral'`, `'deepseek'`, `'gemini'`, `'ollama'`
  - _Beispiel_: `'anthropic'`
  - _Hinweis_: Verschiedene Anbieter können unterschiedliche API-Schlüssel erfordern und haben unterschiedliche Preismodelle.

- **model**:
  - _Typ_: `string`
  - _Standard_: Keine
  - _Beschreibung_: Das Modell, das für die KI-Funktionen von Intlayer verwendet wird.
  - _Beispiel_: `'gpt-4o-2024-11-20'`
  - _Hinweis_: Das spezifische Modell variiert je nach Anbieter.

- **temperature**:
  - _Typ_: `number`
  - _Standard_: Keine
  - _Beschreibung_: Die Temperatur steuert die Zufälligkeit der Antworten der KI.
  - _Beispiel_: `0.1`
  - _Hinweis_: Eine höhere Temperatur macht die KI kreativer und weniger vorhersehbar.

- **apiKey**:
  - _Typ_: `string`
  - _Standard_: Keine
  - _Beschreibung_: Ihr API-Schlüssel für den ausgewählten Anbieter.
  - _Beispiel_: `process.env.OPENAI_API_KEY`
  - _Hinweis_: Wichtig: API-Schlüssel sollten geheim gehalten und nicht öffentlich geteilt werden. Bitte stellen Sie sicher, dass sie an einem sicheren Ort aufbewahrt werden, wie z. B. in Umgebungsvariablen.

- **applicationContext**:
  - _Typ_: `string`
  - _Standard_: Keine
  - _Beschreibung_: Bietet dem KI-Modell zusätzlichen Kontext zu Ihrer Anwendung, um genauere und kontextuell passendere Übersetzungen zu erzeugen. Dies kann Informationen über die Domäne Ihrer App, die Zielgruppe, den Tonfall oder spezifische Terminologie umfassen.

- **baseURL**:
  - _Typ_: `string`
  - _Standard_: Keine
  - _Beschreibung_: Die Basis-URL für die KI-API.
  - _Beispiel_: `'https://api.openai.com/v1'`
  - _Hinweis_: Kann verwendet werden, um auf einen lokalen oder benutzerdefinierten KI-API-Endpunkt zu verweisen.

### Build-Konfiguration

Einstellungen, die steuern, wie Intlayer die Internationalisierung Ihrer Anwendung optimiert und baut.

Build-Optionen gelten für die Plugins `@intlayer/babel` und `@intlayer/swc`.

> Im Entwicklungsmodus verwendet Intlayer statische Importe für Wörterbücher, um die Entwicklungserfahrung zu vereinfachen.

> Wenn optimiert, ersetzt Intlayer Wörterbuchaufrufe, um das Chunking zu optimieren, sodass das endgültige Bundle nur die tatsächlich verwendeten Wörterbücher importiert.

#### Eigenschaften

- **mode**:
  - _Typ_: `'auto' | 'manual'`
  - _Standard_: `'auto'`
  - _Beschreibung_: Steuert den Modus des Builds.
  - _Beispiel_: `'manual'`
  - _Hinweis_: Wenn 'auto', wird der Build automatisch aktiviert, wenn die Anwendung gebaut wird.
  - _Hinweis_: Wenn 'manual', wird der Build nur gesetzt, wenn der Build-Befehl ausgeführt wird.
  - _Hinweis_: Kann verwendet werden, um die Erstellung von Wörterbüchern zu deaktivieren, z.B. wenn die Ausführung in einer Node.js-Umgebung vermieden werden sollte.

- **optimize**:
  - _Typ_: `boolean`
  - _Standard_: `process.env.NODE_ENV === 'production'`
  - _Beschreibung_: Steuert, ob der Build optimiert werden soll.
  - _Beispiel_: `true`
  - _Hinweis_: Wenn aktiviert, ersetzt Intlayer alle Wörterbuchaufrufe, um das Chunking zu optimieren. So importiert das endgültige Bundle nur die verwendeten Wörterbücher. Alle Importe bleiben statisch, um asynchrone Verarbeitung beim Laden der Wörterbücher zu vermeiden.
  - _Hinweis_: Intlayer ersetzt alle Aufrufe von `useIntlayer` durch den im `importMode`-Parameter definierten Modus und `getIntlayer` durch `getDictionary`.
  - _Hinweis_: Diese Option basiert auf den Plugins `@intlayer/babel` und `@intlayer/swc`.
  - _Hinweis_: Stellen Sie sicher, dass alle Schlüssel statisch in den `useIntlayer`-Aufrufen deklariert sind, z.B. `useIntlayer('navbar')`.

- **importMode**:
  - _Typ_: `'static' | 'dynamic' | 'live'`
  - _Standard_: `'static'`
  - _Beschreibung_: Steuert, wie Wörterbücher importiert werden.
  - _Beispiel_: `'dynamic'`
  - _Hinweis_: Verfügbare Modi:
    - "static": Wörterbücher werden statisch importiert. Ersetzt `useIntlayer` durch `useDictionary`.
    - "dynamic": Wörterbücher werden dynamisch mit Suspense importiert. Ersetzt `useIntlayer` durch `useDictionaryDynamic`.
- "live": Wörterbücher werden dynamisch über die Live-Sync-API abgerufen. Ersetzt `useIntlayer` durch `useDictionaryFetch`.
- _Hinweis_: Dynamische Importe basieren auf Suspense und können die Rendering-Leistung leicht beeinträchtigen.
- _Hinweis_: Wenn deaktiviert, werden alle Sprachversionen auf einmal geladen, auch wenn sie nicht verwendet werden.
- _Hinweis_: Diese Option basiert auf den Plugins `@intlayer/babel` und `@intlayer/swc`.
- _Hinweis_: Stellen Sie sicher, dass alle Schlüssel statisch in den `useIntlayer`-Aufrufen deklariert sind, z.B. `useIntlayer('navbar')`.
- _Hinweis_: Diese Option wird ignoriert, wenn `optimize` deaktiviert ist.
  - _Hinweis_: Wenn auf "live" gesetzt, werden nur die Wörterbücher, die entfernte Inhalte enthalten und als "live" markiert sind, im Live-Modus transformiert. Andere werden dynamisch im "dynamic"-Modus importiert, um die Anzahl der Abrufanfragen und die Ladeleistung zu optimieren.
  - _Hinweis_: Der Live-Modus verwendet die Live-Sync-API, um die Wörterbücher abzurufen. Wenn der API-Aufruf fehlschlägt, werden die Wörterbücher dynamisch im "dynamic"-Modus importiert.
  - _Hinweis_: Diese Option hat keine Auswirkungen auf die Funktionen `getIntlayer`, `getDictionary`, `useDictionary`, `useDictionaryAsync` und `useDictionaryDynamic`.

- **traversePattern**:
  - _Typ_: `string[]`
  - _Standard_: `['**\/*.{js,ts,mjs,cjs,jsx,tsx,mjx,cjx}', '!**\/node_modules/**']`
  - _Beschreibung_: Muster, die definieren, welche Dateien während der Optimierung durchlaufen werden sollen.
    - _Beispiel_: `['src/**\/*.{ts,tsx}', '../ui-library/**\/*.{ts,tsx}', '!**/node_modules/**']`
  - _Hinweis_: Verwenden Sie dies, um die Optimierung auf relevante Code-Dateien zu beschränken und die Build-Leistung zu verbessern.
  - _Hinweis_: Diese Option wird ignoriert, wenn `optimize` deaktiviert ist.
  - _Hinweis_: Verwenden Sie Glob-Muster.
