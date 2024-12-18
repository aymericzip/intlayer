# Documentazione: `getLocaleLang` Funzione in `intlayer`

## Descrizione:

La funzione `getLocaleLang` estrae il codice della lingua da una stringa locale. Supporta le lingue con o senza codici di paese. Se non viene fornita alcuna lingua, restituisce per impostazione predefinita una stringa vuota.

## Parametri:

- `locale?: Locales`

  - **Descrizione**: La stringa locale (ad esempio, `Locales.ENGLISH_UNITED_STATES`, `Locales.FRENCH_CANADA`) da cui viene estratto il codice della lingua.
  - **Tipo**: `Locales` (opzionale)

## Restituisce:

- **Tipo**: `string`
- **Descrizione**: Il codice della lingua estratto dalla locale. Se la locale non viene fornita, restituisce una stringa vuota (`''`).

## Esempio di utilizzo:

### Estrazione dei codici di lingua:

```typescript
import { getLocaleLang, Locales } from "intlayer";

getLocaleLang(Locales.ENGLISH_UNITED_STATES); // Output: "en"
getLocaleLang(Locales.ENGLISH); // Output: "en"
getLocaleLang(Locales.FRENCH_CANADA); // Output: "fr"
getLocaleLang(Locales.FRENCH); // Output: "fr"
```

## Casi limite:

- **Nessuna locale fornita:**

  - La funzione restituisce una stringa vuota quando `locale` è `undefined`.

- **Stringhe locali malformate:**
  - Se la `locale` non segue il formato `lingua-paese` (ad esempio, `Locales.ENGLISH-US`), la funzione restituisce in modo sicuro la parte prima di `'-'` o l'intera stringa se non è presente alcun `'-'`.
