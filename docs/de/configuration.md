# Intlayer Konfigurationsdokumentation

## Übersicht

Die Intlayer-Konfigurationsdateien ermöglichen die Anpassung verschiedener Aspekte des Plugins, wie Internationalisierung, Middleware und Inhaltsverarbeitung. Dieses Dokument bietet eine detaillierte Beschreibung jedes Attributs in der Konfiguration.

---

## Unterstützung von Konfigurationsdateien

Intlayer akzeptiert die folgenden Formate für Konfigurationsdateien: JSON, JS, MJS und TS:

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

Die folgenden Abschnitte beschreiben die verschiedenen verfügbaren Konfigurationseinstellungen für Intlayer.

---

### Internationalisierungs-Konfiguration

Definiert Einstellungen, die mit der Internationalisierung zusammenhängen, einschließlich verfügbarer Lokalisierungen und der Standardlokalisierung für die Anwendung.

#### Eigenschaften

- **locales**:
  - _Typ_: `string[]`
  - _Standard_: `['en']`
  - _Beschreibung_: Die Liste der unterstützten Lokalisierungen in der Anwendung.
  - _Beispiel_: `['en', 'fr', 'es']`
- **strictMode**:

  - _Typ_: `string`
  - _Standard_: `required_only`
  - _Beschreibung_: Stellt sicher, dass die Durchsetzung internationalisierter Inhalte mithilfe von TypeScript stark ist.
  - _Hinweis_: Wenn auf "strict" gesetzt, erfordert die Übersetzungsfunktion `t`, dass jede deklarierte Lokalisierung definiert ist. Wenn eine Lokalisierung fehlt oder in Ihrer Konfiguration nicht deklariert ist, wird ein Fehler ausgegeben.
  - _Hinweis_: Wenn auf "required_only" gesetzt, erfordert die Übersetzungsfunktion `t`, dass jede deklarierte Lokalisierung definiert ist. Wenn eine Lokalisierung fehlt, wird eine Warnung ausgegeben. Aber akzeptiert, wenn eine Lokalisierung nicht in Ihrer Konfiguration deklariert ist, aber existiert.
  - _Hinweis_: Wenn auf "loose" gesetzt, akzeptiert die Übersetzungsfunktion `t` jede vorhandene Lokalisierung.

- **defaultLocale**:
  - _Typ_: `string`
  - _Standard_: `'en'`
  - _Beschreibung_: Die Standardlokalisierung, die als Fallback verwendet wird, wenn die angeforderte Lokalisierung nicht gefunden wird.
  - _Beispiel_: `'en'`
  - _Hinweis_: Dies wird verwendet, um die Lokalisierung zu bestimmen, wenn in der URL, im Cookie oder im Header keine angegeben ist.

---

### Editor-Konfiguration

Definiert Einstellungen, die mit dem integrierten Editor zusammenhängen, einschließlich Serverport und aktivem Status.

#### Eigenschaften

- **backendURL**:

  - _Typ_: `string`
  - _Standard_: `https://back.intlayer.org`
  - _Beschreibung_: Die URL des Backend-Servers.
  - _Beispiel_: `http://localhost:4000`

- **enabled**:

  - _Typ_: `boolean`
  - _Standard_: `true`
  - _Beschreibung_: Gibt an, ob der Editor aktiv ist.
  - _Beispiel_: `true`
  - _Hinweis_: Kann mit NODE_ENV oder einer anderen dedizierten Umgebungsvariable gesetzt werden

- **clientId**:

  - _Typ_: `string` | `undefined`
  - _Standard_: `undefined`
  - _Beschreibung_: clientId und clientSecret ermöglichen es den Intlayer-Paketen, sich mit dem Backend über OAuth2-Authentifizierung zu authentifizieren. Ein Zugriffstoken wird verwendet, um den Benutzer in Bezug auf das Projekt zu authentifizieren. Um ein Zugriffstoken zu erhalten, gehen Sie zu https://intlayer.org/dashboard/project und erstellen Sie ein Konto.
  - _Beispiel_: `true`
  - _Hinweis_: Wichtig: clientId und clientSecret sollten geheim gehalten und nicht öffentlich geteilt werden. Bitte stellen Sie sicher, dass Sie sie an einem sicheren Ort, wie z. B. Umgebungsvariablen, aufbewahren.

- **clientSecret**:
  - _Typ_: `string` | `undefined`
  - _Standard_: `undefined`
  - _Beschreibung_: clientId und clientSecret ermöglichen es den Intlayer-Paketen, sich mit dem Backend über OAuth2-Authentifizierung zu authentifizieren. Ein Zugriffstoken wird verwendet, um den Benutzer in Bezug auf das Projekt zu authentifizieren. Um ein Zugriffstoken zu erhalten, gehen Sie zu https://intlayer.org/dashboard/project und erstellen Sie ein Konto.
  - _Beispiel_: `true`
  - _Hinweis_: Wichtig: clientId und clientSecret sollten geheim gehalten und nicht öffentlich geteilt werden. Bitte stellen Sie sicher, dass Sie sie an einem sicheren Ort, wie z. B. Umgebungsvariablen, aufbewahren.

### Middleware-Konfiguration

Einstellungen, die das Verhalten der Middleware steuern, einschließlich, wie die Anwendung Cookies, Header und URL-Präfixe für die Lokalisierungsverwaltung behandelt.

#### Eigenschaften

- **headerName**:
  - _Typ_: `string`
  - _Standard_: `'x-intlayer-locale'`
  - _Beschreibung_: Der Name des HTTP-Headers, der zur Bestimmung der Lokalisierung verwendet wird.
  - _Beispiel_: `'x-custom-locale'`
  - _Hinweis_: Dies ist nützlich für die API-basierte Lokalisierungsbestimmung.
- **cookieName**:
  - _Typ_: `string`
  - _Standard_: `'intlayer-locale'`
  - _Beschreibung_: Der Name des Cookies, der verwendet wird, um die Lokalisierung zu speichern.
  - _Beispiel_: `'custom-locale'`
  - _Hinweis_: Wird verwendet, um die Lokalisierung über Sitzungen hinweg beizubehalten.
- **prefixDefault**:
  - _Typ_: `boolean`
  - _Standard_: `true`
  - _Beschreibung_: Ob die Standardlokalisierung in der URL enthalten sein soll.
  - _Beispiel_: `false`
  - _Hinweis_: Wenn `false`, haben URLs für die Standardlokalisierung kein Lokalisierungspräfix.
- **basePath**:
  - _Typ_: `string`
  - _Standard_: `''`
  - _Beschreibung_: Der Basis-Pfad für die Anwendungs-URLs.
  - _Beispiel_: `'/my-app'`
  - _Hinweis_: Dies beeinflusst, wie URLs für die Anwendung aufgebaut werden.
- **serverSetCookie**:
  - _Typ_: `string`
  - _Standard_: `'always'`
  - _Beschreibung_: Regel zum Setzen des Lokalisierungs-Cookies auf dem Server.
  - _Optionen_: `'always'`, `'never'`
  - _Beispiel_: `'never'`
  - _Hinweis_: Steuert, ob das Lokalisierungs-Cookie bei jeder Anfrage gesetzt wird oder niemals.
- **noPrefix**:
  - _Typ_: `boolean`
  - _Standard_: `false`
  - _Beschreibung_: Ob das Lokalisierungspräfix aus den URLs weggelassen werden soll.
  - _Beispiel_: `true`
  - _Hinweis_: Wenn `true`, enthalten URLs keine Lokalisierungsinformationen.

---

### Inhaltskonfiguration

Einstellungen, die sich auf die Inhaltsverarbeitung innerhalb der Anwendung beziehen, einschließlich Verzeichnisnamen, Dateiendungen und abgeleitete Konfigurationen.

#### Eigenschaften

- **watch**:
  - _Typ_: `boolean`
  - _Standard_: `process.env.NODE_ENV === 'development'`
  - _Beschreibung_: Gibt an, ob Intlayer Änderungen in den Inhaltdokumenten der App beobachten soll, um die entsprechenden Wörterbücher neu zu erstellen.
- **fileExtensions**:
  - _Typ_: `string[]`
  - _Standard_: `['.content.ts', '.content.js', '.content.cjs', '.content.mjs', '.content.json', '.content.tsx', '.content.jsx']`
  - _Beschreibung_: Dateiendungen, nach denen beim Erstellen von Wörterbüchern gesucht wird.
  - _Beispiel_: `['.data.ts', '.data.js', '.data.json']`
  - _Hinweis_: Die Anpassung der Dateiendungen kann helfen, Konflikte zu vermeiden.
- **baseDir**:
  - _Typ_: `string`
  - _Standard_: `process.cwd()`
  - _Beschreibung_: Das Basisverzeichnis für das Projekt.
  - _Beispiel_: `'/path/to/project'`
  - _Hinweis_: Dies wird verwendet, um alle Intlayer-bezogenen Verzeichnisse aufzulösen.
- **dictionaryOutput**:
  - _Typ_: `string[]`
  - _Standard_: `['intlayer']`
  - _Beschreibung_: Der Typ der zu verwendenden Wörterbuchausgabe, z. B. `'intlayer'` oder `'i18next'`.
- **contentDirName**:
  - _Typ_: `string`
  - _Standard_: `'src'`
  - _Beschreibung_: Der Name des Verzeichnisses, in dem der Inhalt gespeichert ist.
  - _Beispiel_: `'data'`, `'content'`, `'locales'`
  - _Hinweis_: Wenn nicht auf der Basisverzeichnisebene, aktualisieren Sie das `contentDir`.
- **contentDir**:

  - _Typ_: `string`
  - _AbgeleitetVon_: `'baseDir'` / `'contentDirName'`
  - _Beschreibung_: Der Verzeichnispfad, in dem der Inhalt gespeichert ist.

- **resultDirName**:
  - _Typ_: `string`
  - _Standard_: `'.intlayer'`
  - _Beschreibung_: Der Name des Verzeichnisses, in dem die Ergebnisse gespeichert werden.
  - _Beispiel_: `'outputOFIntlayer'`
  - _Hinweis_: Wenn dieses Verzeichnis nicht auf der Basisebene ist, aktualisieren Sie `resultDir`.
- **resultDir**:

  - _Typ_: `string`
  - _AbgeleitetVon_: `'baseDir'` / `'resultDirName'`
  - _Beschreibung_: Der Verzeichnispfad für die Speicherung von Zwischen- oder Ausgabewerten.

- **moduleAugmentationDirName**:

  - _Typ_: `string`
  - _Standard_: `'types'`
  - _Beschreibung_: Verzeichnis für Modulvergrößerungen, das bessere IDE-Vorschläge und Typprüfungen ermöglicht.
  - _Beispiel_: `'intlayer-types'`
  - _Hinweis_: Stellen Sie sicher, dass dies in `tsconfig.json` enthalten ist.

- **moduleAugmentationDir**:

  - _Typ_: `string`
  - _AbgeleitetVon_: `'baseDir'` / `'moduleAugmentationDirName'`
  - _Beschreibung_: Der Pfad für Modulvergrößerungen und zusätzliche Typdefinitionen.

- **dictionariesDirName**:
  - _Typ_: `string`
  - _Standard_: `'dictionary'`
  - _Beschreibung_: Verzeichnis zum Speichern von Wörterbüchern.
  - _Beispiel_: `'translations'`
  - _Hinweis_: Wenn nicht auf der Ergebnisverzeichnisebene, aktualisieren Sie `dictionariesDir`.
- **dictionariesDir**:

  - _Typ_: `string`
  - _AbgeleitetVon_: `'resultDir'` / `'dictionariesDirName'`
  - _Beschreibung_: Das Verzeichnis zum Speichern von Lokalisierungswörterbüchern.

- **i18nDictionariesDirName**:
  - _Typ_: `string`
  - _Standard_: `'i18n_dictionary'`
  - _Beschreibung_: Verzeichnis zum Speichern von i18n-Wörterbüchern.
  - _Beispiel_: `'translations'`
  - _Hinweis_: Wenn nicht auf der Ergebnisverzeichnisebene, aktualisieren Sie `i18nDictionariesDir`.
  - _Hinweis_: Stellen Sie sicher, dass die Ausgabe der i18n-Wörterbücher i18next umfasst, um die Wörterbücher für i18next zu erstellen.
- **i18nDictionariesDir**:

  - _Typ_: `string`
  - _AbgeleitetVon_: `'resultDir'` / `'i18nDictionariesDirName'`
  - _Beschreibung_: Das Verzeichnis zum Speichern von i18n-Wörterbüchern.
  - _Hinweis_: Stellen Sie sicher, dass dieses Verzeichnis für den i18next-Ausgabetyp konfiguriert ist.

- **typeDirName**:

  - _Typ_: `string`
  - _Standard_: `'types'`
  - _Beschreibung_: Verzeichnis zum Speichern von Wörterbuchtypen.
  - _Beispiel_: `'intlayer-types'`
  - _Hinweis_: Wenn nicht auf der Ergebnisverzeichnisebene, aktualisieren Sie `typesDir`.

- **typesDir**:

  - _Typ_: `string`
  - _AbgeleitetVon_: `'resultDir'` / `'typeDirName'`
  - _Beschreibung_: Das Verzeichnis zum Speichern von Wörterbuchtypen.

- **mainDirName**:
  - _Typ_: `string`
  - _Standard_: `'main'`
  - _Beschreibung_: Verzeichnis zum Speichern von Hauptdateien.
  - _Beispiel_: `'intlayer-main'`
  - _Hinweis_: Wenn nicht auf der Ergebnisverzeichnisebene, aktualisieren Sie `mainDir`.
- **mainDir**:
  - _Typ_: `string`
  - _AbgeleitetVon_: `'resultDir'` / `'mainDirName'`
  - _Beschreibung_: Das Verzeichnis, in dem die Hauptanwendungsdateien gespeichert sind.
- **excludedPath**:
  - _Typ_: `string[]`
  - _Standard_: `['node_modules']`
  - _Beschreibung_: Verzeichnisse, die von der Inhaltssuche ausgeschlossen sind.
  - _Hinweis_: Diese Einstellung wird noch nicht verwendet, ist jedoch für eine zukünftige Implementierung geplant.

### Logger-Konfiguration

Einstellungen zur Steuerung des Loggers, einschließlich des Loglevels und des verwendeten Präfixes.

#### Eigenschaften

- **enabled**:
  - _Typ_: `boolean`
  - _Standard_: `true`
  - _Beschreibung_: Gibt an, ob der Logger aktiviert ist.
  - _Beispiel_: `true`
  - _Hinweis_: Kann mit NODE_ENV oder einer anderen dedizierten Umgebungsvariable gesetzt werden.
- **level**:
  - _Typ_: `'info' | 'warn' | 'debug' | 'log'`
  - _Standard_: `'log'`
  - _Beschreibung_: Das Level des Loggers.
  - _Beispiel_: `'info'`
  - _Hinweis_: Das Level des Loggers. Es kann entweder 'log', 'info', 'warn', 'error' oder 'debug' sein.
- **prefix**:
  - _Typ_: `string`
  - _Standard_: `'[intlayer] '`
  - _Beschreibung_: Das Präfix des Loggers.
  - _Beispiel_: `'[mein benutzerdefiniertes Präfix] '`
  - _Hinweis_: Das Präfix des Loggers.
