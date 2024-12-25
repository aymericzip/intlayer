# Documentazione: `getLocaleLang` Funzione in `intlayer`

## Descrizione:

La funzione `getLocaleLang` estrae il codice della lingua da una stringa di locale. Supporta le località con o senza codici di paese. Se non viene fornita alcuna località, restituisce di default una stringa vuota.

## Parametri:

- `locale?: Locales`

  - **Descrizione**: La stringa di locale (ad esempio, `Locales.ENGLISH_UNITED_STATES`, `Locales.FRENCH_CANADA`) da cui viene estratto il codice della lingua.
  - **Tipo**: `Locales` (opzionale)

## Ritorna:

- **Tipo**: `string`
- **Descrizione**: Il codice della lingua estratto dalla località. Se la località non è fornita, restituisce una stringa vuota (`''`).

## Esempio di Utilizzo:

### Estrazione dei Codici Lingua:

```typescript codeFormat="typescript"
import { getLocaleLang, Locales } from "intlayer";

getLocaleLang(Locales.ENGLISH_UNITED_STATES); // Output: "en"
getLocaleLang(Locales.ENGLISH); // Output: "en"
getLocaleLang(Locales.FRENCH_CANADA); // Output: "fr"
getLocaleLang(Locales.FRENCH); // Output: "fr"
```

```javascript codeFormat="esm"
import { getLocaleLang } from "intlayer";

getLocaleLang(Locales.ENGLISH_UNITED_STATES); // Output: "en"
getLocaleLang(Locales.ENGLISH); // Output: "en"
getLocaleLang(Locales.FRENCH_CANADA); // Output: "fr"
getLocaleLang(Locales.FRENCH); // Output: "fr"
```

```javascript codeFormat="commonjs"
const { getLocaleLang } = require("intlayer");

getLocaleLang(Locales.ENGLISH_UNITED_STATES); // Output: "en"
getLocaleLang(Locales.ENGLISH); // Output: "en"
getLocaleLang(Locales.FRENCH_CANADA); // Output: "fr"
getLocaleLang(Locales.FRENCH); // Output: "fr"
```

## Casi Limite:

- **Nessuna Locale Fornita:**

  - La funzione restituisce una stringa vuota quando `locale` è `undefined`.

- **Stringhe di Locale Malformate:**
  - Se la `locale` non segue il formato `lingua-paese` (ad esempio, `Locales.ENGLISH-US`), la funzione restituisce in sicurezza la parte prima di `'-'` o l'intera stringa se non è presente alcun `'-'`.
