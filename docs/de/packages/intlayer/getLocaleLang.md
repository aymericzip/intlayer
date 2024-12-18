# Dokumentation: `getLocaleLang` Funktion in `intlayer`

## Beschreibung:

Die `getLocaleLang` Funktion extrahiert den Sprachcode aus einem Gebietsschema-String. Sie unterstützt Gebietsschemata mit oder ohne Ländercodes. Wenn kein Gebietsschema bereitgestellt wird, gibt es standardmäßig einen leeren String zurück.

## Parameter:

- `locale?: Locales`

  - **Beschreibung**: Der Gebietsschema-String (z.B. `Locales.ENGLISH_UNITED_STATES`, `Locales.FRENCH_CANADA`), aus dem der Sprachcode extrahiert wird.
  - **Typ**: `Locales` (optional)

## Rückgaben:

- **Typ**: `string`
- **Beschreibung**: Der Sprachcode, der aus dem Gebietsschema extrahiert wurde. Wenn das Gebietsschema nicht bereitgestellt wird, wird ein leerer String (`''`) zurückgegeben.

## Beispiel Verwendung:

### Extrahieren von Sprachcodes:

```typescript
import { getLocaleLang, Locales } from "intlayer";

getLocaleLang(Locales.ENGLISH_UNITED_STATES); // Ausgabe: "en"
getLocaleLang(Locales.ENGLISH); // Ausgabe: "en"
getLocaleLang(Locales.FRENCH_CANADA); // Ausgabe: "fr"
getLocaleLang(Locales.FRENCH); // Ausgabe: "fr"
```

## Randfälle:

- **Kein Gebietsschema bereitgestellt:**

  - Die Funktion gibt einen leeren String zurück, wenn `locale` `undefined` ist.

- **Fehlerhafte Gebietsschema-Strings:**
  - Wenn das `locale` nicht dem `sprache-land` Format entspricht (z.B. `Locales.ENGLISH-US`), gibt die Funktion sicher den Teil vor `'-'` oder den gesamten String zurück, wenn kein `'-'` vorhanden ist.
