# Dokumentation: `getLocaleName` Funktion in `intlayer`

## Beschreibung:

Die `getLocaleName` Funktion gibt den lokalisierten Namen eines angegebenen Gebietsschemas (`targetLocale`) im Anzeigeregion (`displayLocale`) zurück. Wenn kein `targetLocale` angegeben ist, gibt sie den Namen des `displayLocale` in seiner eigenen Sprache zurück.

## Parameter:

- `displayLocale: Locales`

  - **Beschreibung**: Das Gebietsschema, in dem der Name des Zielgebietsschemas angezeigt wird.
  - **Typ**: Enum oder String, der gültige Gebietsschemata darstellt.

- `targetLocale?: Locales`
  - **Beschreibung**: Das Gebietsschema, dessen Namen lokalisiert werden soll.
  - **Typ**: Optional. Enum oder String, der gültige Gebietsschemata darstellt.

## Rückgabewert:

- **Typ**: `string`
- **Beschreibung**: Der lokalisierte Name des `targetLocale` im `displayLocale`, oder der eigene Name des `displayLocale`, falls kein `targetLocale` angegeben ist. Wenn keine Übersetzung gefunden wird, gibt sie `"Unbekanntes Gebietsschema"` zurück.

## Beispiel Verwendung:

```typescript codeFormat="typescript"
import { Locales, getLocaleName } from "intlayer";

getLocaleName(Locales.ENGLISH); // Ausgabe: "English"
getLocaleName(Locales.ENGLISH, Locales.FRENCH); // Ausgabe: "Anglais"
getLocaleName(Locales.ENGLISH, Locales.ESPANOL); // Ausgabe: "Inglés"
getLocaleName(Locales.ENGLISH, Locales.ENGLISH); // Ausgabe: "English"

getLocaleName(Locales.FRENCH); // Ausgabe: "Français"
getLocaleName(Locales.FRENCH, Locales.FRENCH); // Ausgabe: "Français"
getLocaleName(Locales.FRENCH, Locales.ESPANOL); // Ausgabe: "Francés"
getLocaleName(Locales.FRENCH, Locales.ENGLISH); // Ausgabe: "French"

getLocaleName(Locales.CHINESE); // Ausgabe: "中文"
getLocaleName(Locales.CHINESE, Locales.FRENCH); // Ausgabe: "Chinois"
getLocaleName(Locales.CHINESE, Locales.ESPANOL); // Ausgabe: "Chino"
getLocaleName(Locales.CHINESE, Locales.ENGLISH); // Ausgabe: "Chinese"

getLocaleName("unknown-locale"); // Ausgabe: "Unbekanntes Gebietsschema"
```

```javascript codeFormat="esm"
import { Locales, getLocaleName } from "intlayer";

getLocaleName(Locales.ENGLISH); // Ausgabe: "English"
getLocaleName(Locales.ENGLISH, Locales.FRENCH); // Ausgabe: "Anglais"
getLocaleName(Locales.ENGLISH, Locales.ESPANOL); // Ausgabe: "Inglés"
getLocaleName(Locales.ENGLISH, Locales.ENGLISH); // Ausgabe: "English"

getLocaleName(Locales.FRENCH); // Ausgabe: "Français"
getLocaleName(Locales.FRENCH, Locales.FRENCH); // Ausgabe: "Français"
getLocaleName(Locales.FRENCH, Locales.ESPANOL); // Ausgabe: "Francés"
getLocaleName(Locales.FRENCH, Locales.ENGLISH); // Ausgabe: "French"

getLocaleName(Locales.CHINESE); // Ausgabe: "中文"
getLocaleName(Locales.CHINESE, Locales.FRENCH); // Ausgabe: "Chinois"
getLocaleName(Locales.CHINESE, Locales.ESPANOL); // Ausgabe: "Chino"
getLocaleName(Locales.CHINESE, Locales.ENGLISH); // Ausgabe: "Chinese"

getLocaleName("unknown-locale"); // Ausgabe: "Unbekanntes Gebietsschema"
```

```javascript codeFormat="commonjs"
const { Locales, getLocaleName } = require("intlayer");

getLocaleName(Locales.ENGLISH); // Ausgabe: "English"
getLocaleName(Locales.ENGLISH, Locales.FRENCH); // Ausgabe: "Anglais"
getLocaleName(Locales.ENGLISH, Locales.ESPANOL); // Ausgabe: "Inglés"
getLocaleName(Locales.ENGLISH, Locales.ENGLISH); // Ausgabe: "English"

getLocaleName(Locales.FRENCH); // Ausgabe: "Français"
getLocaleName(Locales.FRENCH, Locales.FRENCH); // Ausgabe: "Français"
getLocaleName(Locales.FRENCH, Locales.ESPANOL); // Ausgabe: "Francés"
getLocaleName(Locales.FRENCH, Locales.ENGLISH); // Ausgabe: "French"

getLocaleName(Locales.CHINESE); // Ausgabe: "中文"
getLocaleName(Locales.CHINESE, Locales.FRENCH); // Ausgabe: "Chinois"
getLocaleName(Locales.CHINESE, Locales.ESPANOL); // Ausgabe: "Chino"
getLocaleName(Locales.CHINESE, Locales.ENGLISH); // Ausgabe: "Chinese"

getLocaleName("unknown-locale"); // Ausgabe: "Unbekanntes Gebietsschema"
```

## Randfälle:

- **Kein `targetLocale` angegeben:**
  - Die Funktion gibt standardmäßig den eigenen Namen des `displayLocale` zurück.
- **Fehlende Übersetzungen:**
  - Wenn `localeNameTranslations` keinen Eintrag für das `targetLocale` oder das spezifische `displayLocale` enthält, fällt die Funktion auf den `ownLocalesName` zurück oder gibt `"Unbekanntes Gebietsschema"` zurück.
