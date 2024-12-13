# Intlayer Konfigurationsdokumentation

## Übersicht

Intlayer-Konfigurationsdateien ermöglichen die Anpassung verschiedener Aspekte des Plugins, wie Internationalisierung, Middleware und Inhaltsverwaltung. Dieses Dokument bietet eine detaillierte Beschreibung jeder Eigenschaft in der Konfiguration.

---

## Unterstützung von Konfigurationsdateien

Intlayer akzeptiert die Konfigurationsdateiformate JSON, JS, MJS und TS:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

---

## Beispielkonfigurationsdatei

```typescript
// intlayer.config.ts

import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.GERMAN],
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

```javascript
// intlayer.config.cjs

const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.GERMAN],
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

```json5
// .intlayerrc

{
  "internationalization": {
    "locales": ["de"],
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

Definiert Einstellungen, die mit der Internationalisierung zusammenhängen, einschließlich verfügbarer Sprachen und der Standardsprache für die Anwendung.

#### Eigenschaften

- **locales**:
  - _Typ_: `string[]`
  - _Standard_: `['de']`
  - _Beschreibung_: Die Liste der unterstützten Sprachen in der Anwendung.
  - _Beispiel_: `['de', 'fr', 'es']`
- **strictMode**:

  - _Typ_: `string`
  - _Standard_: `required_only`
  - _Beschreibung_: Sicherstellen, dass stark implementierte, internationalisierte Inhalte mit TypeScript einhergehen.
  - _Hinweis_: Wenn auf "strict" gesetzt, muss die Übersetzungsfunktion `t` für jede deklarierte Sprache definiert werden. Wenn eine Sprache fehlt oder nicht in Ihrer Konfiguration deklariert ist, wird ein Fehler ausgelöst.
  - _Hinweis_: Wenn auf "required_only" gesetzt, erfordert die Übersetzungsfunktion `t`, dass jede deklarierte Sprache definiert ist. Wenn eine Sprache fehlt, wird eine Warnung ausgelöst. Es wird jedoch akzeptiert, wenn eine Sprache nicht in Ihrer Konfiguration deklariert ist, aber bereits existiert.
  - _Hinweis_: Wenn auf "loose" gesetzt, akzeptiert die Übersetzungsfunktion `t` jede vorhandene Sprache.

- **defaultLocale**:
  - _Typ_: `string`
  - _Standard_: `'de'`
  - _Beschreibung_: Die Standardsprache, die als Fallback verwendet wird, wenn die angeforderte Sprache nicht gefunden wird.
  - _Beispiel_: `'de'`
  - _Hinweis_: Dies wird verwendet, um die Sprache zu bestimmen, wenn keine in der URL, dem Cookie oder dem Header angegeben ist.

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
  - _Hinweis_: Kann über NODE_ENV oder eine andere dedizierte Umgebungsvariable festgelegt werden.

- **clientId**:

  - _Typ_: `string` | `undefined`
  - _Standard_: `undefined`
  - _Beschreibung_: clientId und clientSecret ermöglichen es den Intlayer-Paketen, sich über die oAuth2-Authentifizierung beim Backend zu authentifizieren. Ein Zugriffstoken wird verwendet, um den Benutzer zu authentifizieren, der mit dem Projekt verbunden ist. Um ein Zugriffstoken zu erhalten, gehen Sie zu https://back.intlayer.org/dashboard/project und erstellen Sie ein Konto.
  - _Beispiel_: `true`
  - _Hinweis_: Wichtig: Die clientId und clientSecret sollten geheim gehalten und nicht öffentlich geteilt werden. Bitte stellen Sie sicher, dass Sie sie an einem sicheren Ort aufbewahren, z. B. in Umgebungsvariablen.

- **clientSecret**:
  - _Typ_: `string` | `undefined`
  - _Standard_: `undefined`
  - _Beschreibung_: clientId und clientSecret ermöglichen es den Intlayer-Paketen, sich über die oAuth2-Authentifizierung beim Backend zu authentifizieren. Ein Zugriffstoken wird verwendet, um den Benutzer zu authentifizieren, der mit dem Projekt verbunden ist. Um ein Zugriffstoken zu erhalten, gehen Sie zu https://back.intlayer.org/dashboard/project und erstellen Sie ein Konto.
  - _Beispiel_: `true`
  - _Hinweis_: Wichtig: Die clientId und clientSecret sollten geheim gehalten und nicht öffentlich geteilt werden. Bitte stellen Sie sicher, dass Sie sie an einem sicheren Ort aufbewahren, z. B. in Umgebungsvariablen.

### Middleware-Konfiguration

Einstellungen, die das Verhalten der Middleware steuern, einschließlich wie die Anwendung mit Cookies, Headern und URL-Präfixen für die Sprachverwaltung umgeht.

#### Eigenschaften

- **headerName**:
  - _Typ_: `string`
  - _Standard_: `'x-intlayer-locale'`
  - _Beschreibung_: Der Name des HTTP-Headers, der verwendet wird, um die Sprache zu bestimmen.
  - _Beispiel_: `'x-custom-locale'`
  - _Hinweis_: Dies ist nützlich für die API-basierte Sprachbestimmung.
- **cookieName**:
  - _Typ_: `string`
  - _Standard_: `'intlayer-locale'`
  - _Beschreibung_: Der Name des Cookies, der verwendet wird, um die Sprache zu speichern.
  - _Beispiel_: `'custom-locale'`
  - _Hinweis_: Wird verwendet, um die Sprache über Sitzungen hinweg aufrechtzuerhalten.
- **prefixDefault**:
  - _Typ_: `boolean`
  - _Standard_: `true`
  - _Beschreibung_: Ob die Standardsprache in der URL enthalten sein soll.
  - _Beispiel_: `false`
  - _Hinweis_: Wenn `false`, haben URLs für die Standardsprache kein Sprachpräfix.
- **basePath**:
  - _Typ_: `string`
  - _Standard_: `''`
  - _Beschreibung_: Der Basispfad für die Anwendungs-URLs.
  - _Beispiel_: `'/meine-app'`
  - _Hinweis_: Dies beeinflusst, wie URLs für die Anwendung konstruiert werden.
- **serverSetCookie**:
  - _Typ_: `string`
  - _Standard_: `'always'`
  - _Beschreibung_: Regel zum Setzen des Sprachcookies auf dem Server.
  - _Optionen_: `'always'`, `'never'`
  - _Beispiel_: `'never'`
  - _Hinweis_: Steuert, ob das Sprachcookie bei jeder Anfrage oder niemals gesetzt wird.
- **noPrefix**:
  - _Typ_: `boolean`
  - _Standard_: `false`
  - _Beschreibung_: Ob das Sprachpräfix aus den URLs weggelassen werden soll.
  - _Beispiel_: `true`
  - _Hinweis_: Wenn `true`, enthalten URLs keine Sprachinformationen.

---

### Inhaltskonfiguration

Einstellungen zur Inhaltsverwaltung innerhalb der Anwendung, einschließlich Verzeichnisnamen, Dateiendungen und derived Konfigurationen.

#### Eigenschaften

- **watch**:
  - _Typ_: `boolean`
  - _Standard_: `process.env.NODE_ENV === 'development'`
  - _Beschreibung_: Gibt an, ob Intlayer Änderungen in den Inhaltsdeklarationsdateien der App überwachen soll, um die zugehörigen Wörterbücher neu zu erstellen.
- **fileExtensions**:
  - _Typ_: `string[]`
  - _Standard_: `['.content.ts', '.content.js', '.content.cjs', '.content.mjs', '.content.json', '.content.tsx', '.content.jsx']`
  - _Beschreibung_: Dateiendungen, nach denen beim Erstellen von Wörterbüchern gesucht wird.
  - _Beispiel_: `['.data.ts', '.data.js', '.data.json']`
  - _Hinweis_: Die Anpassung von Dateiendungen kann helfen, Konflikte zu vermeiden.
- **baseDir**:
  - _Typ_: `string`
  - _Standard_: `process.cwd()`
  - _Beschreibung_: Das Basisverzeichnis für das Projekt.
  - _Beispiel_: `'/pfad/zum/projekt'`
  - _Hinweis_: Dies wird verwendet, um alle Intlayer-bezogenen Verzeichnisse aufzulösen.
- **dictionaryOutput**:
  - _Typ_: `string[]`
  - _Standard_: `['intlayer']`
  - _Beschreibung_: Der Typ der zu verwendenden Wörterbuchausgabe, z. B. `'intlayer'` oder `'i18next'`.
- **contentDirName**:
  - _Typ_: `string`
  - _Standard_: `'src'`
  - _Beschreibung_: Der Name des Verzeichnisses, in dem die Inhalte gespeichert sind.
  - _Beispiel_: `'daten'`, `'inhalt'`, `'lokalisierungen'`
  - _Hinweis_: Wenn nicht auf der Basisverzeichnisebene, aktualisieren Sie `contentDir`.
- **contentDir**:

  - _Typ_: `string`
  - _DerivedFrom_: `'baseDir'` / `'contentDirName'`
  - _Beschreibung_: Der Verzeichnispfad, in dem der Inhalt gespeichert ist.

- **resultDirName**:
  - _Typ_: `string`
  - _Standard_: `'.intlayer'`
  - _Beschreibung_: Der Name des Verzeichnisses, in dem die Ergebnisse gespeichert sind.
  - _Beispiel_: `'ergebnisVonIntlayer'`
  - _Hinweis_: Wenn dieses Verzeichnis nicht auf der Basisebene ist, aktualisieren Sie `resultDir`.
- **resultDir**:

  - _Typ_: `string`
  - _DerivedFrom_: `'baseDir'` / `'resultDirName'`
  - _Beschreibung_: Der Verzeichnispfad zum Speichern von Zwischen- oder Ausgabenergebnissen.

- **moduleAugmentationDirName**:

  - _Typ_: `string`
  - _Standard_: `'types'`
  - _Beschreibung_: Verzeichnis für die Modulergänzung, das bessere IDE-Vorschläge und Typprüfungen ermöglicht.
  - _Beispiel_: `'intlayer-types'`
  - _Hinweis_: Stellen Sie sicher, dass Sie dies in `tsconfig.json` einfügen.

- **moduleAugmentationDir**:

  - _Typ_: `string`
  - _DerivedFrom_: `'baseDir'` / `'moduleAugmentationDirName'`
  - _Beschreibung_: Der Pfad zur Modulergänzung und zusätzlichen Typdefinitionen.

- **dictionariesDirName**:
  - _Typ_: `string`
  - _Standard_: `'dictionary'`
  - _Beschreibung_: Verzeichnis zum Speichern von Wörterbüchern.
  - _Beispiel_: `'übersetzungen'`
  - _Hinweis_: Wenn nicht auf der Ergebnisverzeichnisebene, aktualisieren Sie `dictionariesDir`.
- **dictionariesDir**:

  - _Typ_: `string`
  - _DerivedFrom_: `'resultDir'` / `'dictionariesDirName'`
  - _Beschreibung_: Das Verzeichnis zum Speichern von Lokalisierungswörterbüchern.

- **i18nDictionariesDirName**:
  - _Typ_: `string`
  - _Standard_: `'i18n_dictionary'`
  - _Beschreibung_: Verzeichnis zum Speichern von i18n-Wörterbüchern.
  - _Beispiel_: `'übersetzungen'`
  - _Hinweis_: Wenn nicht auf der Ergebnisverzeichnisebene, aktualisieren Sie `i18nDictionariesDir`.
  - _Hinweis_: Stellen Sie sicher, dass die Ausgabe der i18n-Wörterbücher i18next enthält, um die Wörterbücher für i18next zu erstellen.
- **i18nDictionariesDir**:

  - _Typ_: `string`
  - _DerivedFrom_: `'resultDir'` / `'i18nDictionariesDirName'`
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
  - _DerivedFrom_: `'resultDir'` / `'typeDirName'`
  - _Beschreibung_: Das Verzeichnis zum Speichern von Wörterbuchtypen.

- **mainDirName**:
  - _Typ_: `string`
  - _Standard_: `'main'`
  - _Beschreibung_: Verzeichnis zum Speichern von Hauptdateien.
  - _Beispiel_: `'intlayer-main'`
  - _Hinweis_: Wenn nicht auf der Ergebnisverzeichnisebene, aktualisieren Sie `mainDir`.
- **mainDir**:
  - _Typ_: `string`
  - _DerivedFrom_: `'resultDir'` / `'mainDirName'`
  - _Beschreibung_: Das Verzeichnis, in dem die Hauptanwendungsdateien gespeichert sind.
- **excludedPath**:
  - _Typ_: `string[]`
  - _Standard_: `['node_modules']`
  - _Beschreibung_: Verzeichnisse, die von der Inhaltssuche ausgeschlossen sind.
  - _Hinweis_: Diese Einstellung wird noch nicht verwendet, ist jedoch für die zukünftige Implementierung geplant.
