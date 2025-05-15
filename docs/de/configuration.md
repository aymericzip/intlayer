# Intlayer Konfigurationsdokumentation

## Überblick

Intlayer-Konfigurationsdateien ermöglichen die Anpassung verschiedener Aspekte des Plugins, wie Internationalisierung, Middleware und Inhaltsverwaltung. Dieses Dokument bietet eine detaillierte Beschreibung jeder Eigenschaft in der Konfiguration.

---

## Unterstützte Konfigurationsdateien

Intlayer akzeptiert die Formate JSON, JS, MJS und TS für Konfigurationsdateien:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

---

## Beispielkonfigurationsdatei

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH],
  },
  content: {
    typesDir: "content/types",
  },
  middleware: {
    noPrefix: false,
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
    typesDir: "content/types",
  },
  middleware: {
    noPrefix: false,
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

Die folgenden Abschnitte beschreiben die verschiedenen Konfigurationseinstellungen, die für Intlayer verfügbar sind.

---

### Internationalisierungskonfiguration

Definiert Einstellungen zur Internationalisierung, einschließlich verfügbarer Sprachen und der Standardsprache für die Anwendung.

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

Definiert Einstellungen für den integrierten Editor, einschließlich Serverport und Aktivierungsstatus.

#### Eigenschaften

- **applicationURL**:

  - _Typ_: `string`
  - _Standard_: `'*'`
  - _Beschreibung_: Die URL der Anwendung. Wird verwendet, um den Ursprung des Editors aus Sicherheitsgründen einzuschränken.
  - _Beispiel_:
    - `'*'`
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
    - `''*'`
  - _Hinweis_: Die URL des Editor-Servers, die von der Anwendung erreicht werden soll. Wird verwendet, um die Ursprünge einzuschränken, die mit der Anwendung interagieren können. Wenn auf `'*'` gesetzt, ist der Editor von jedem Ursprung aus zugänglich. Sollte gesetzt werden, wenn der Port geändert wird oder wenn der Editor auf einer anderen Domain gehostet wird.

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
  - _Hinweis_: Wenn z. B. ein neues Wörterbuch hinzugefügt oder aktualisiert wird, wird die Anwendung den Inhalt auf der Seite aktualisieren.
  - _Hinweis_: Da das Hot-Reloading eine kontinuierliche Verbindung zum Server erfordert, ist es nur für Kunden des `Enterprise`-Plans verfügbar.

- **dictionaryPriorityStrategy**:
  - _Typ_: `string`
  - _Standard_: `'local_first'`
  - _Beschreibung_: Die Strategie zur Priorisierung von Wörterbüchern, wenn sowohl lokale als auch entfernte Wörterbücher vorhanden sind. Wenn auf `'distant_first'` gesetzt, wird die Anwendung entfernte Wörterbücher gegenüber lokalen Wörterbüchern priorisieren. Wenn auf `'local_first'` gesetzt, wird die Anwendung lokale Wörterbücher gegenüber entfernten Wörterbüchern priorisieren.
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
  - _Beschreibung_: Der Name des Cookies, das zur Speicherung der Sprache verwendet wird.
  - _Beispiel_: `'custom-locale'`
  - _Hinweis_: Wird verwendet, um die Sprache über Sitzungen hinweg beizubehalten.
- **prefixDefault**:
  - _Typ_: `boolean`
  - _Standard_: `true`
  - _Beschreibung_: Ob die Standardsprache in der URL enthalten sein soll.
  - _Beispiel_: `false`
  - _Hinweis_: Wenn `false`, enthalten URLs für die Standardsprache kein Sprachpräfix.
- **basePath**:
  - _Typ_: `string`
  - _Standard_: `''`
  - _Beschreibung_: Der Basispfad für die URLs der Anwendung.
  - _Beispiel_: `'/my-app'`
  - _Hinweis_: Dies beeinflusst, wie URLs für die Anwendung konstruiert werden.
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
  - _Beschreibung_: Ob das Sprachpräfix aus URLs weggelassen werden soll.
  - _Beispiel_: `true`
  - _Hinweis_: Wenn `true`, enthalten URLs keine Sprachinformationen.

---

### Inhaltskonfiguration

Einstellungen zur Inhaltsverwaltung innerhalb der Anwendung, einschließlich Verzeichnisnamen, Dateierweiterungen und abgeleiteter Konfigurationen.

#### Eigenschaften

- **watch**:
  - _Typ_: `boolean`
  - _Standard_: `process.env.NODE_ENV === 'development'`
  - _Beschreibung_: Gibt an, ob Intlayer Änderungen an den Inhaltsdeklarationsdateien in der App überwachen soll, um die zugehörigen Wörterbücher neu zu erstellen.
- **fileExtensions**:
  - _Typ_: `string[]`
  - _Standard_: `['.content.ts', '.content.js', '.content.cjs', '.content.mjs', '.content.json', '.content.tsx', '.content.jsx']`
  - _Beschreibung_: Dateierweiterungen, nach denen beim Erstellen von Wörterbüchern gesucht wird.
  - _Beispiel_: `['.data.ts', '.data.js', '.data.json']`
  - _Hinweis_: Die Anpassung von Dateierweiterungen kann helfen, Konflikte zu vermeiden.
- **baseDir**:
  - _Typ_: `string`
  - _Standard_: `process.cwd()`
  - _Beschreibung_: Das Basisverzeichnis für das Projekt.
  - _Beispiel_: `'/path/to/project'`
  - _Hinweis_: Dies wird verwendet, um alle Intlayer-bezogenen Verzeichnisse aufzulösen.
- **dictionaryOutput**:
  - _Typ_: `string[]`
  - _Standard_: `['intlayer']`
  - _Beschreibung_: Der Typ der Wörterbuchausgabe, z. B. `'intlayer'` oder `'i18next'`.
- **contentDirName**:
  - _Typ_: `string`
  - _Standard_: `'src'`
  - _Beschreibung_: Der Name des Verzeichnisses, in dem die Inhalte gespeichert sind.
  - _Beispiel_: `'data'`, `'content'`, `'locales'`
  - _Hinweis_: Wenn nicht auf der Basisebene des Verzeichnisses, aktualisieren Sie das `contentDir`.
- **contentDir**:

  - _Typ_: `string`
  - _AbgeleitetVon_: `'baseDir'` / `'contentDirName'`
  - _Beschreibung_: Der Verzeichnispfad, in dem Inhalte gespeichert sind.

- **resultDirName**:
  - _Typ_: `string`
  - _Standard_: `'.intlayer'`
  - _Beschreibung_: Der Name des Verzeichnisses, in dem Ergebnisse gespeichert werden.
  - _Beispiel_: `'outputOFIntlayer'`
  - _Hinweis_: Wenn dieses Verzeichnis nicht auf der Basisebene ist, aktualisieren Sie `resultDir`.
- **resultDir**:

  - _Typ_: `string`
  - _AbgeleitetVon_: `'baseDir'` / `'resultDirName'`
  - _Beschreibung_: Der Verzeichnispfad für die Speicherung von Zwischen- oder Ausgaberesultaten.

- **moduleAugmentationDirName**:

  - _Typ_: `string`
  - _Standard_: `'types'`
  - _Beschreibung_: Verzeichnis für Modulerweiterungen, die bessere IDE-Vorschläge und Typüberprüfungen ermöglichen.
  - _Beispiel_: `'intlayer-types'`
  - _Hinweis_: Stellen Sie sicher, dass dies in `tsconfig.json` enthalten ist.

- **moduleAugmentationDir**:

  - _Typ_: `string`
  - _AbgeleitetVon_: `'baseDir'` / `'moduleAugmentationDirName'`
  - _Beschreibung_: Der Pfad für Modulerweiterungen und zusätzliche Typdefinitionen.

- **dictionariesDirName**:
  - _Typ_: `string`
  - _Standard_: `'dictionary'`
  - _Beschreibung_: Verzeichnis zur Speicherung von Wörterbüchern.
  - _Beispiel_: `'translations'`
  - _Hinweis_: Wenn nicht auf der Ergebnisebene des Verzeichnisses, aktualisieren Sie `dictionariesDir`.
- **dictionariesDir**:

  - _Typ_: `string`
  - _AbgeleitetVon_: `'resultDir'` / `'dictionariesDirName'`
  - _Beschreibung_: Das Verzeichnis zur Speicherung von Lokalisierungswörterbüchern.

- **i18nextResourcesDirName**:
  - _Typ_: `string`
  - _Standard_: `'i18next_dictionary'`
  - _Beschreibung_: Verzeichnis zur Speicherung von i18n-Wörterbüchern.
  - _Beispiel_: `'translations'`
  - _Hinweis_: Wenn nicht auf der Ergebnisebene des Verzeichnisses, aktualisieren Sie `i18nextResourcesDir`.
  - _Hinweis_: Stellen Sie sicher, dass die i18n-Wörterbuchausgabe i18next enthält, um die Wörterbücher für i18next zu erstellen.
- **i18nextResourcesDir**:

  - _Typ_: `string`
  - _AbgeleitetVon_: `'resultDir'` / `'i18nextResourcesDirName'`
  - _Beschreibung_: Das Verzeichnis zur Speicherung von i18n-Wörterbüchern.
  - _Hinweis_: Stellen Sie sicher, dass dieses Verzeichnis für den i18next-Ausgabetyp konfiguriert ist.

- **typeDirName**:

  - _Typ_: `string`
  - _Standard_: `'types'`
  - _Beschreibung_: Verzeichnis zur Speicherung von Wörterbuchtypen.
  - _Beispiel_: `'intlayer-types'`
  - _Hinweis_: Wenn nicht auf der Ergebnisebene des Verzeichnisses, aktualisieren Sie `typesDir`.

- **typesDir**:

  - _Typ_: `string`
  - _AbgeleitetVon_: `'resultDir'` / `'typeDirName'`
  - _Beschreibung_: Das Verzeichnis zur Speicherung von Wörterbuchtypen.

- **mainDirName**:
  - _Typ_: `string`
  - _Standard_: `'main'`
  - _Beschreibung_: Verzeichnis zur Speicherung von Hauptdateien.
  - _Beispiel_: `'intlayer-main'`
  - _Hinweis_: Wenn nicht auf der Ergebnisebene des Verzeichnisses, aktualisieren Sie `mainDir`.
- **mainDir**:
  - _Typ_: `string`
  - _AbgeleitetVon_: `'resultDir'` / `'mainDirName'`
  - _Beschreibung_: Das Verzeichnis, in dem Hauptanwendungsdateien gespeichert sind.
- **excludedPath**:
  - _Typ_: `string[]`
  - _Standard_: `['node_modules']`
  - _Beschreibung_: Verzeichnisse, die von der Inhaltssuche ausgeschlossen sind.
  - _Hinweis_: Diese Einstellung wird derzeit nicht verwendet, ist jedoch für zukünftige Implementierungen geplant.

### Logger-Konfiguration

Einstellungen, die den Logger steuern, einschließlich des zu verwendenden Präfixes.

#### Eigenschaften

- **mode**:
  - _Typ_: `string`
  - _Standard_: `default`
  - _Beschreibung_: Gibt den Modus des Loggers an.
  - _Optionen_: `default`, `verbose`, `disabled`
  - _Beispiel_: `default`
  - _Hinweis_: Der Modus des Loggers. Der Verbose-Modus protokolliert mehr Informationen, kann jedoch für Debugging-Zwecke verwendet werden. Der deaktivierte Modus deaktiviert den Logger.
- **prefix**:
  - _Typ_: `string`
  - _Standard_: `'[intlayer] '`
  - _Beschreibung_: Das Präfix des Loggers.
  - _Beispiel_: `'[my custom prefix] '`
  - _Hinweis_: Das Präfix des Loggers.

### KI-Konfiguration

Einstellungen, die die KI-Funktionen von Intlayer steuern, einschließlich des Anbieters, des Modells und des API-Schlüssels.

Diese Konfiguration ist optional, wenn Sie im [Intlayer Dashboard](https://intlayer.org/dashboard/project) mit einem Zugriffsschlüssel registriert sind. Intlayer verwaltet automatisch die effizienteste und kostengünstigste KI-Lösung für Ihre Bedürfnisse. Die Verwendung der Standardoptionen gewährleistet eine bessere langfristige Wartbarkeit, da Intlayer kontinuierlich aktualisiert wird, um die relevantesten Modelle zu verwenden.

Wenn Sie Ihren eigenen API-Schlüssel oder ein spezifisches Modell verwenden möchten, können Sie Ihre eigene KI-Konfiguration definieren.
Diese KI-Konfiguration wird global in Ihrer Intlayer-Umgebung verwendet. CLI-Befehle verwenden diese Einstellungen als Standardwerte für die Befehle (z.B. `fill`), sowie das SDK, den Visuellen Editor und das CMS. Sie können diese Standardwerte für spezifische Anwendungsfälle durch Befehlsparameter überschreiben.

Intlayer unterstützt mehrere KI-Anbieter für mehr Flexibilität und Auswahl. Die derzeit unterstützten Anbieter sind:

- **OpenAI** (Standard)
- **Anthropic Claude**
- **Mistral AI**
- **DeepSeek**
- **Google Gemini**
- **Meta Llama**

#### Eigenschaften

- **provider** :

  - _Typ_ : `string`
  - _Standard_ : `'openai'`
  - _Beschreibung_ : Der Anbieter, der für die KI-Funktionen von Intlayer verwendet werden soll.
  - _Optionen_ : `'openai'`, `'anthropic'`, `'mistral'`, `'deepseek'`, `'gemini'`
  - _Beispiel_ : `'anthropic'`
  - _Hinweis_ : Verschiedene Anbieter können unterschiedliche API-Schlüssel erfordern und unterschiedliche Preismodelle haben.

- **model** :

  - _Typ_ : `string`
  - _Standard_ : Keine
  - _Beschreibung_ : Das Modell, das für die KI-Funktionen von Intlayer verwendet werden soll.
  - _Beispiel_ : `'gpt-4o-2024-11-20'`
  - _Hinweis_ : Das spezifische zu verwendende Modell variiert je nach Anbieter.

- **temperature** :

  - _Typ_ : `number`
  - _Standard_ : Keine
  - _Beschreibung_ : Die Temperatur steuert die Zufälligkeit der KI-Antworten.
  - _Beispiel_ : `0.1`
  - _Hinweis_ : Eine höhere Temperatur macht die KI kreativer und weniger vorhersehbar.

- **apiKey** :
  - _Typ_ : `string`
  - _Standard_ : Keine
  - _Beschreibung_ : Ihr API-Schlüssel für den ausgewählten Anbieter.
  - _Beispiel_ : `process.env.OPENAI_API_KEY`
  - _Hinweis_ : Wichtig: API-Schlüssel müssen geheim gehalten und nicht öffentlich geteilt werden. Bitte bewahren Sie sie an einem sicheren Ort auf, wie z.B. in Umgebungsvariablen.
