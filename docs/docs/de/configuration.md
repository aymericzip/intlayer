---
createdAt: 2024-08-13
updatedAt: 2025-06-29
title: Konfiguration
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
---

# Intlayer Konfigurationsdokumentation

## Übersicht

Intlayer-Konfigurationsdateien ermöglichen die Anpassung verschiedener Aspekte des Plugins, wie Internationalisierung, Middleware und Inhaltsverwaltung. Dieses Dokument bietet eine detaillierte Beschreibung jeder Eigenschaft in der Konfiguration.

---

## Unterstützung für Konfigurationsdateien

Intlayer akzeptiert die Konfigurationsdateiformate JSON, JS, MJS und TS:

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
    locales: [Locales.ENGLISH],
  },
  content: {
    contentDir: ["src", "../ui-library"],
  },
  middleware: {
    noPrefix: false,
  },
  editor: {
    applicationURL: "https://example.com",
  },
  ai: {
    apiKey: process.env.OPENAI_API_KEY,
    applicationContext: "This is a test application",
  },
  build: {
    importMode: "dynamic",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH],
  },
  content: {
    contentDir: ["src", "../ui-library"],
  },
  middleware: {
    noPrefix: false,
  },
  editor: {
    applicationURL: "https://example.com",
  },
  ai: {
    apiKey: process.env.OPENAI_API_KEY,
    applicationContext: "This is a test application",
  },
  build: {
    importMode: "dynamic",
  },
};

module.exports = config;
```

```json5 fileName=".intlayerrc" codeFormat="json"
{
  "internationalization": {
    "locales": ["en"],
  },
  "content": {
    "typesDir": "content/types",
  },
  "middleware": {
    "noPrefix": false,
  },
}
```

---

## Konfigurationsreferenz

Die folgenden Abschnitte beschreiben die verschiedenen für Intlayer verfügbaren Konfigurationseinstellungen.

---

### Internationalisierungskonfiguration

Definiert Einstellungen im Zusammenhang mit der Internationalisierung, einschließlich verfügbarer Sprachen und der Standardsprache der Anwendung.

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
  - _Hinweis_: Wenn leer, sind im `strict`-Modus alle Sprachen erforderlich.
  - _Hinweis_: Stellen Sie sicher, dass erforderliche Sprachen auch im Feld `locales` definiert sind.
- **strictMode**:

  - _Typ_: `string`
  - _Standard_: `inclusive`
  - _Beschreibung_: Stellt sicher, dass internationalisierte Inhalte mit TypeScript stark implementiert werden.
  - _Hinweis_: Wenn auf "strict" gesetzt, erfordert die Übersetzungsfunktion `t`, dass jede deklarierte Sprache definiert ist. Wenn eine Sprache fehlt oder nicht in Ihrer Konfiguration deklariert ist, wird ein Fehler ausgelöst.
  - _Hinweis_: Wenn auf "inclusive" gesetzt, erfordert die Übersetzungsfunktion `t`, dass jede deklarierte Sprache definiert ist. Wenn eine Sprache fehlt, wird eine Warnung ausgegeben. Es wird jedoch akzeptiert, wenn eine Sprache nicht in Ihrer Konfiguration deklariert ist, aber existiert.
  - _Hinweis_: Wenn auf "loose" gesetzt, akzeptiert die Übersetzungsfunktion `t` jede vorhandene Sprache.

- **defaultLocale**:

  - _Typ_: `string`
  - _Standard_: `'en'`
  - _Beschreibung_: Die Standardsprache, die als Fallback verwendet wird, wenn die angeforderte Sprache nicht gefunden wird.
  - _Beispiel_: `'en'`
  - _Hinweis_: Dies wird verwendet, um die Sprache zu bestimmen, wenn keine in der URL, im Cookie oder im Header angegeben ist.

---

### Editor-Konfiguration

Definiert Einstellungen im Zusammenhang mit dem integrierten Editor, einschließlich Serverport und Aktivierungsstatus.

#### Eigenschaften

- **applicationURL**:

  - _Typ_: `string`
  - _Standard_: `http://localhost:3000`
  - _Beschreibung_: Die URL der Anwendung. Wird verwendet, um den Ursprung des Editors aus Sicherheitsgründen einzuschränken.
  - _Beispiel_:
    - `'http://localhost:3000'`
    - `'https://example.com'`
    - `process.env.INTLAYER_EDITOR_URL`
  - _Hinweis_: Die URL der Anwendung. Wird verwendet, um den Ursprung des Editors aus Sicherheitsgründen einzuschränken. Wenn auf `'*'` gesetzt, ist der Editor von jedem Ursprung aus zugänglich.

- **port**:

  - _Typ_: `number`
  - _Standard_: `8000`
  - _Beschreibung_: Der Port, der vom visuellen Editor-Server verwendet wird.

- **editorURL**:

  - _Typ_: `string`
  - _Standard_: `'http://localhost:8000'`
  - _Beschreibung_: Die URL des Editor-Servers. Wird verwendet, um den Ursprung des Editors aus Sicherheitsgründen einzuschränken.
    - `'http://localhost:3000'`
    - `'https://example.com'`
    - `process.env.INTLAYER_EDITOR_URL`
  - _Hinweis_: Die URL des Editor-Servers, die von der Anwendung erreicht werden kann. Wird verwendet, um die Ursprünge einzuschränken, die mit der Anwendung interagieren können. Wenn auf `'*'` gesetzt, ist der Editor von jedem Ursprung aus zugänglich. Sollte gesetzt werden, wenn der Port geändert wird oder wenn der Editor auf einer anderen Domain gehostet wird.

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
  - _Hinweis_: Wenn true, kann der Editor mit der Anwendung interagieren. Wenn false, kann der Editor nicht mit der Anwendung interagieren. In jedem Fall kann der Editor nur durch den visuellen Editor aktiviert werden. Das Deaktivieren des Editors für bestimmte Umgebungen ist eine Möglichkeit, die Sicherheit zu gewährleisten.

- **clientId**:

  - _Typ_: `string` | `undefined`
  - _Standard_: `undefined`
  - _Beschreibung_: clientId und clientSecret ermöglichen es den Intlayer-Paketen, sich mit dem Backend über oAuth2-Authentifizierung zu authentifizieren. Ein Zugriffstoken wird verwendet, um den Benutzer zu authentifizieren, der mit dem Projekt verbunden ist. Um ein Zugriffstoken zu erhalten, gehen Sie zu https://intlayer.org/dashboard/project und erstellen Sie ein Konto.
  - _Beispiel_: `true`
  - _Hinweis_: Wichtig: Die clientId und clientSecret sollten geheim gehalten und nicht öffentlich geteilt werden. Bitte stellen Sie sicher, dass sie an einem sicheren Ort aufbewahrt werden, z. B. in Umgebungsvariablen.

- **clientSecret**:

  - _Typ_: `string` | `undefined`
  - _Standard_: `undefined`
  - _Beschreibung_: clientId und clientSecret ermöglichen es den Intlayer-Paketen, sich mit dem Backend über oAuth2-Authentifizierung zu authentifizieren. Ein Zugriffstoken wird verwendet, um den Benutzer zu authentifizieren, der mit dem Projekt verbunden ist. Um ein Zugriffstoken zu erhalten, gehen Sie zu https://intlayer.org/dashboard/project und erstellen Sie ein Konto.
  - _Beispiel_: `true`
  - _Hinweis_: Wichtig: Die clientId und clientSecret sollten geheim gehalten und nicht öffentlich geteilt werden. Bitte stellen Sie sicher, dass sie an einem sicheren Ort aufbewahrt werden, z. B. in Umgebungsvariablen.

- **hotReload**:

  - _Typ_: `boolean`
  - _Standard_: `false`
  - _Beschreibung_: Gibt an, ob die Anwendung die Sprachkonfigurationen bei einer Änderung automatisch neu laden soll.
  - _Beispiel_: `true`
  - _Hinweis_: Wenn beispielsweise ein neues Wörterbuch hinzugefügt oder aktualisiert wird, aktualisiert die Anwendung den Inhalt, der auf der Seite angezeigt wird.
  - _Hinweis_: Da das Hot-Reloading eine kontinuierliche Verbindung zum Server erfordert, ist es nur für Kunden des `enterprise`-Plans verfügbar.

- **dictionaryPriorityStrategy**:
  - _Typ_: `string`
  - _Standard_: `'local_first'`
  - _Beschreibung_: Die Strategie zur Priorisierung von Wörterbüchern, wenn sowohl lokale als auch entfernte Wörterbücher vorhanden sind. Wenn auf `'distant_first'` gesetzt, priorisiert die Anwendung entfernte Wörterbücher gegenüber lokalen Wörterbüchern. Wenn auf `'local_first'` gesetzt, priorisiert die Anwendung lokale Wörterbücher gegenüber entfernten Wörterbüchern.
  - _Beispiel_: `'distant_first'`

### Middleware-Konfiguration

Einstellungen, die das Verhalten der Middleware steuern, einschließlich der Handhabung von Cookies, Headern und URL-Präfixen für die Sprachverwaltung.

#### Eigenschaften

- **headerName**:

  - _Typ_: `string`
  - _Standard_: `'x-intlayer-locale'`
  - _Beschreibung_: Der Name des HTTP-Headers, der zur Bestimmung der Sprache verwendet wird.
  - _Beispiel_: `'x-custom-locale'`
  - _Hinweis_: Dies ist nützlich für die API-basierte Sprachbestimmung.

- **cookieName**:

  - _Typ_: `string`
  - _Standard_: `'intlayer-locale'`
  - _Beschreibung_: Der Name des Cookies, das verwendet wird, um die Spracheinstellung zu speichern.
  - _Beispiel_: `'custom-locale'`
  - _Hinweis_: Wird verwendet, um die Spracheinstellung über Sitzungen hinweg beizubehalten.

- **prefixDefault**:

  - _Typ_: `boolean`
  - _Standard_: `false`
  - _Beschreibung_: Ob die Standardsprache in der URL enthalten sein soll.
  - _Beispiel_: `true`
  - _Hinweis_:
    - Wenn `true` und `defaultLocale = 'en'`: path = `/en/dashboard` oder `/fr/dashboard`
    - Wenn `false` und `defaultLocale = 'en'`: path = `/dashboard` oder `/fr/dashboard`

- **basePath**:

  - _Typ_: `string`
  - _Standard_: `''`
  - _Beschreibung_: Der Basis-Pfad für die Anwendungs-URLs.
  - _Beispiel_: `'/my-app'`
  - _Hinweis_:
    - Wenn die Anwendung auf `https://example.com/my-app` gehostet wird
    - Der Basis-Pfad ist `'/my-app'`
    - Die URL wird `https://example.com/my-app/en` sein
    - Wenn der Basis-Pfad nicht gesetzt ist, wird die URL `https://example.com/en` sein

- **serverSetCookie**:

  - _Typ_: `string`
  - _Standard_: `'always'`
  - _Beschreibung_: Regel zum Setzen des Sprach-Cookies auf dem Server.
  - _Optionen_: `'always'`, `'never'`
  - _Beispiel_: `'never'`
  - _Hinweis_: Steuert, ob das Sprach-Cookie bei jeder Anfrage oder nie gesetzt wird.

- **noPrefix**:

  - _Typ_: `boolean`
  - _Standard_: `false`
  - _Beschreibung_: Ob das Sprachpräfix in URLs weggelassen werden soll.
  - _Beispiel_: `true`
  - _Hinweis_:
    - Wenn `true`: Kein Präfix in der URL
    - Wenn `false`: Präfix in der URL
    - Beispiel mit `basePath = '/my-app'`:
      - Wenn `noPrefix = false`: URL wird `https://example.com/my-app/en` sein
      - Wenn `noPrefix = true`: URL wird `https://example.com` sein

- **detectLocaleOnPrefetchNoPrefix**:

  - _Typ_: `boolean`
  - _Standard_: `false`
  - _Beschreibung_: Steuert, ob die Spracherkennung während Next.js Prefetch-Anfragen stattfindet.
  - _Beispiel_: `true`
  - _Hinweis_: Diese Einstellung beeinflusst, wie Next.js mit Sprach-Prefetching umgeht:
    - **Beispielszenario:**
      - Die Browsersprache des Benutzers ist `'fr'`
      - Die aktuelle Seite ist `/fr/about`
      - Link prefetcht `/about`
    - **Mit `detectLocaleOnPrefetchNoPrefix: true`:**
      - Prefetch erkennt `'fr'` Sprache vom Browser
      - Leitet Prefetch zu `/fr/about` weiter
    - **Mit `detectLocaleOnPrefetchNoPrefix: false` (Standard):**
      - Prefetch verwendet Standardsprache
      - Leitet Prefetch zu `/en/about` weiter (angenommen `'en'` ist Standard)
    - **Wann `true` verwenden:**
      - Ihre App verwendet nicht-lokalisierte interne Links (z.B. `<a href="/about">`)
      - Sie möchten konsistentes Spracherkennungsverhalten zwischen normalen und Prefetch-Anfragen
    - **Wann `false` verwenden (Standard):**
      - Ihre App verwendet sprachpräfixierte Links (z.B. `<a href="/fr/about">`)
      - Sie möchten Prefetching-Performance optimieren
      - Sie möchten potenzielle Weiterleitungsschleifen vermeiden

---

### Inhaltskonfiguration

Einstellungen im Zusammenhang mit der Inhaltsverwaltung innerhalb der Anwendung, einschließlich Verzeichnisnamen, Dateierweiterungen und abgeleiteter Konfigurationen.

#### Eigenschaften

- **watch**:

  - _Typ_: `boolean`
  - _Standard_: `process.env.NODE_ENV === 'development'`
  - _Beschreibung_: Gibt an, ob Intlayer Änderungen in den Inhaltsdeklarationsdateien der App überwachen soll, um die zugehörigen Wörterbücher neu zu erstellen.

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
  - _Hinweis_: Wird verwendet, um alle Intlayer-bezogenen Verzeichnisse aufzulösen.

- **dictionaryOutput**:

  - _Typ_: `string[]`
  - _Standard_: `['intlayer']`
  - _Beschreibung_: Der Typ der Wörterbuchausgabe, z.B. `'intlayer'` oder `'i18next'`.

- **contentDir**:

  - _Typ_: `string[]`
  - _Standard_: `['src']`
  - _Beispiel_: `['src', '../../ui-library', require.resolve("@my-package/content")]`
  - _Beschreibung_: Der Verzeichnispfad, in dem Inhalte gespeichert sind.

- **dictionariesDir**:

  - _Typ_: `string`
  - _Standard_: `'.intlayer/dictionaries'`
  - _Beschreibung_: Der Verzeichnispfad zur Speicherung von Zwischen- oder Ausgabedaten.

- **moduleAugmentationDir**:

  - _Typ_: `string`
  - _Standard_: `'.intlayer/types'`
  - _Beschreibung_: Verzeichnis für Modulerweiterungen, um bessere IDE-Vorschläge und Typprüfungen zu ermöglichen.
  - _Beispiel_: `'intlayer-types'`
  - _Hinweis_: Stellen Sie sicher, dass dieses Verzeichnis in `tsconfig.json` enthalten ist.

- **unmergedDictionariesDir**:

  - _Typ_: `string`
  - _Standard_: `'.intlayer/unmerged_dictionary'`
  - _Beschreibung_: Das Verzeichnis zur Speicherung von nicht zusammengeführten Wörterbüchern.
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
  - _Beschreibung_: Das Verzeichnis, in dem die Hauptanwendungsdateien gespeichert werden.
  - _Beispiel_: `'intlayer-main'`

- **excludedPath**:
  - _Typ_: `string[]`
  - _Standard_: `['node_modules']`
  - _Beschreibung_: Verzeichnisse, die von der Inhaltssuche ausgeschlossen sind.
  - _Hinweis_: Diese Einstellung wird derzeit noch nicht verwendet, ist aber für eine zukünftige Implementierung geplant.

### Logger-Konfiguration

Einstellungen, die den Logger steuern, einschließlich des zu verwendenden Präfixes.

#### Eigenschaften

- **mode**:

  - _Typ_: `string`
  - _Standard_: `default`
  - _Beschreibung_: Gibt den Modus des Loggers an.
  - _Optionen_: `default`, `verbose`, `disabled`
  - _Beispiel_: `default`
  - _Hinweis_: Der Modus des Loggers. Der verbose-Modus protokolliert mehr Informationen und kann zu Debugging-Zwecken verwendet werden. Der disabled-Modus deaktiviert den Logger.

- **prefix**:

  - _Typ_: `string`
  - _Standard_: `'[intlayer] '`
  - _Beschreibung_: Das Präfix des Loggers.
  - _Beispiel_: `'[my custom prefix] '`
  - _Hinweis_: Das Präfix des Loggers.

### KI-Konfiguration

Einstellungen, die die KI-Funktionen von Intlayer steuern, einschließlich Anbieter, Modell und API-Schlüssel.
Diese Konfiguration ist optional, wenn Sie im [Intlayer Dashboard](https://intlayer.org/dashboard/project) mit einem Zugriffsschlüssel registriert sind. Intlayer verwaltet automatisch die effizienteste und kostengünstigste KI-Lösung für Ihre Bedürfnisse. Die Verwendung der Standardoptionen gewährleistet eine bessere langfristige Wartbarkeit, da Intlayer kontinuierlich aktualisiert wird, um die relevantesten Modelle zu verwenden.

Wenn Sie Ihren eigenen API-Schlüssel oder ein bestimmtes Modell verwenden möchten, können Sie Ihre benutzerdefinierte KI-Konfiguration definieren.
Diese KI-Konfiguration wird global in Ihrer Intlayer-Umgebung verwendet. CLI-Befehle verwenden diese Einstellungen als Standardwerte für die Befehle (z. B. `fill`), ebenso wie das SDK, den Visual Editor und das CMS. Sie können diese Standardwerte für spezifische Anwendungsfälle mit Befehlsparametern überschreiben.
Intlayer unterstützt mehrere KI-Anbieter für mehr Flexibilität und Auswahl. Derzeit unterstützte Anbieter sind:

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
  - _Optionen_: `'openai'`, `'anthropic'`, `'mistral'`, `'deepseek'`, `'gemini'`
  - _Beispiel_: `'anthropic'`
  - _Hinweis_: Verschiedene Anbieter können unterschiedliche API-Schlüssel und Preismodelle erfordern.

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
  - _Hinweis_: Wichtig: API-Schlüssel sollten geheim gehalten und nicht öffentlich geteilt werden. Bitte bewahren Sie sie an einem sicheren Ort auf, z. B. in Umgebungsvariablen.

- **applicationContext**:
  - _Typ_: `string`
  - _Standard_: Keine
  - _Beschreibung_: Bietet dem KI-Modell zusätzlichen Kontext zu Ihrer Anwendung, um genauere und kontextuell passendere Übersetzungen zu erzeugen. Dies kann Informationen über die Domäne Ihrer App, die Zielgruppe, den Tonfall oder spezifische Terminologie umfassen.

### Build-Konfiguration

Einstellungen, die steuern, wie Intlayer die Internationalisierung Ihrer Anwendung optimiert und baut.

Build-Optionen gelten für die Plugins `@intlayer/babel` und `@intlayer/swc`.

> Im Entwicklungsmodus verwendet Intlayer statische Importe für Wörterbücher, um die Entwicklungserfahrung zu vereinfachen.

> Bei der Optimierung ersetzt Intlayer Wörterbuchaufrufe, um das Chunking zu optimieren, sodass das finale Bundle nur die tatsächlich verwendeten Wörterbücher importiert.

#### Eigenschaften

- **optimize**:

  - _Typ_: `boolean`
  - _Standard_: `process.env.NODE_ENV === 'production'`
  - _Beschreibung_: Steuert, ob der Build optimiert werden soll.
  - _Beispiel_: `true`
  - _Hinweis_: Wenn aktiviert, ersetzt Intlayer alle Aufrufe von Wörterbüchern, um das Chunking zu optimieren. So importiert das finale Bundle nur die verwendeten Wörterbücher. Alle Importe bleiben als statische Importe, um asynchrone Verarbeitung beim Laden der Wörterbücher zu vermeiden.
  - _Hinweis_: Intlayer ersetzt alle Aufrufe von `useIntlayer` mit dem durch die `importMode`-Option definierten Modus und `getIntlayer` mit `getDictionary`.
  - _Hinweis_: Diese Option basiert auf den Plugins `@intlayer/babel` und `@intlayer/swc`.
  - _Hinweis_: Stellen Sie sicher, dass alle Schlüssel statisch in den `useIntlayer`-Aufrufen deklariert sind, z. B. `useIntlayer('navbar')`.

- **importMode**:

  - _Typ_: `'static' | 'dynamic' | 'async'`
  - _Standard_: `'static'`
  - _Beschreibung_: Steuert, wie Wörterbücher importiert werden.
  - _Beispiel_: `'dynamic'`
  - _Hinweis_: Verfügbare Modi:
    - "static": Wörterbücher werden statisch importiert. Ersetzt `useIntlayer` durch `useDictionary`.
    - "dynamic": Wörterbücher werden dynamisch mit Suspense importiert. Ersetzt `useIntlayer` durch `useDictionaryDynamic`.
    - "async": Wörterbücher werden asynchron dynamisch importiert. Ersetzt `useIntlayer` durch `await useDictionaryAsync`.
  - _Hinweis_: Dynamische Importe basieren auf Suspense und können die Rendering-Leistung leicht beeinträchtigen.
  - _Hinweis_: Wenn deaktiviert, werden alle Locales auf einmal geladen, auch wenn sie nicht verwendet werden.
  - _Hinweis_: Diese Option basiert auf den Plugins `@intlayer/babel` und `@intlayer/swc`.
  - _Hinweis_: Stellen Sie sicher, dass alle Schlüssel statisch in den `useIntlayer`-Aufrufen deklariert sind, z. B. `useIntlayer('navbar')`.
  - _Hinweis_: Diese Option wird ignoriert, wenn `optimize` deaktiviert ist.
  - _Hinweis_: In den meisten Fällen wird `"dynamic"` für React-Anwendungen und `"async"` für Vue.js-Anwendungen verwendet.
  - _Hinweis_: Diese Option beeinträchtigt nicht die Funktionen `getIntlayer`, `getDictionary`, `useDictionary`, `useDictionaryAsync` und `useDictionaryDynamic`.

- **traversePattern**:
  - _Typ_: `string[]`
  - _Standard_: `['**/*.{js,ts,mjs,cjs,jsx,tsx,mjx,cjx}', '!**/node_modules/**']`
  - _Beschreibung_: Muster, die definieren, welche Dateien während der Optimierung durchsucht werden sollen.
    - _Beispiel_: `['src/**/*.{ts,tsx}', '../ui-library/**/*.{ts,tsx}', '!**/node_modules/**']`
  - _Hinweis_: Verwenden Sie dies, um die Optimierung auf relevante Code-Dateien zu beschränken und die Build-Leistung zu verbessern.
  - _Hinweis_: Diese Option wird ignoriert, wenn `optimize` deaktiviert ist.
  - _Hinweis_: Verwenden Sie Glob-Muster.

## Dokumentationshistorie

- 5.5.11 - 2025-06-29: `docs`-Befehle hinzugefügt
