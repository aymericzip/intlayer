# Dokumentation: `getLocaleLang` Funktion in `intlayer`

## Beschreibung:

Die `getLocaleLang` Funktion extrahiert den Sprachcode aus einer Locale-Zeichenfolge. Sie unterstützt Locales mit oder ohne Ländercodes. Wenn keine Locale angegeben wird, gibt sie standardmäßig eine leere Zeichenfolge zurück.

## Parameter:

- `locale?: Locales`

  - **Beschreibung**: Die Locale-Zeichenfolge (z.B. `Locales.ENGLISH_UNITED_STATES`, `Locales.FRENCH_CANADA`), aus der der Sprachcode extrahiert wird.
  - **Typ**: `Locales` (optional)

## Rückgaben:

- **Typ**: `string`
- **Beschreibung**: Der aus der Locale extrahierte Sprachcode. Wenn die Locale nicht angegeben wird, gibt sie eine leere Zeichenfolge zurück (`''`).

## Beispielverwendung:

### Extraktion von Sprachcodes:

```typescript codeFormat="typescript"
import { getLocaleLang, Locales } from "intlayer";

getLocaleLang(Locales.ENGLISH_UNITED_STATES); // Ausgabe: "en"
getLocaleLang(Locales.ENGLISH); // Ausgabe: "en"
getLocaleLang(Locales.FRENCH_CANADA); // Ausgabe: "fr"
getLocaleLang(Locales.FRENCH); // Ausgabe: "fr"
```

```javascript codeFormat="esm"
import { getLocaleLang } from "intlayer";

getLocaleLang(Locales.ENGLISH_UNITED_STATES); // Ausgabe: "en"
getLocaleLang(Locales.ENGLISH); // Ausgabe: "en"
getLocaleLang(Locales.FRENCH_CANADA); // Ausgabe: "fr"
getLocaleLang(Locales.FRENCH); // Ausgabe: "fr"
```

```javascript codeFormat="commonjs"
const { getLocaleLang } = require("intlayer");

getLocaleLang(Locales.ENGLISH_UNITED_STATES); // Ausgabe: "en"
getLocaleLang(Locales.ENGLISH); // Ausgabe: "en"
getLocaleLang(Locales.FRENCH_CANADA); // Ausgabe: "fr"
getLocaleLang(Locales.FRENCH); // Ausgabe: "fr"
```

## Randfälle:

- **Keine Locale angegeben:**

  - Die Funktion gibt eine leere Zeichenfolge zurück, wenn `locale` `undefined` ist.

- **Fehlerhaft formatierte Locale-Zeichenfolgen:**
  - Wenn die `locale` nicht dem Format `sprache-land` folgt (z.B. `Locales.ENGLISH-US`), gibt die Funktion sicher den Teil vor `'-'` oder die gesamte Zeichenfolge zurück, wenn kein `'-'` vorhanden ist.
