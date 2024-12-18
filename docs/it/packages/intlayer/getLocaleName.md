# Documentazione: Funzione `getLocaleName` in `intlayer`

## Descrizione:

La funzione `getLocaleName` restituisce il nome localizzato di una data localizzazione (`targetLocale`) nella localizzazione di visualizzazione (`displayLocale`). Se non viene fornita alcuna `targetLocale`, restituisce il nome della `displayLocale` nella propria lingua.

## Parametri:

- `displayLocale: Locales`

  - **Descrizione**: La localizzazione in cui sarà visualizzato il nome della localizzazione target.
  - **Tipo**: Enum o stringa che rappresenta localizzazioni valide.

- `targetLocale?: Locales`
  - **Descrizione**: La localizzazione di cui deve essere localizzato il nome.
  - **Tipo**: Facoltativo. Enum o stringa che rappresenta localizzazioni valide.

## Restituisce:

- **Tipo**: `string`
- **Descrizione**: Il nome localizzato del `targetLocale` nella `displayLocale`, o il nome della `displayLocale` stesso se non viene fornita `targetLocale`. Se non viene trovata alcuna traduzione, restituisce `"Unknown locale"`.

## Esempio di utilizzo:

```typescript
import { Locales, getLocaleName } from "intlayer";

getLocaleName(Locales.ENGLISH); // Output: "English"
getLocaleName(Locales.ENGLISH, Locales.FRENCH); // Output: "Anglais"
getLocaleName(Locales.ENGLISH, Locales.ESPANOL); // Output: "Inglés"
getLocaleName(Locales.ENGLISH, Locales.ENGLISH); // Output: "English"

getLocaleName(Locales.FRENCH); // Output: "Français"
getLocaleName(Locales.FRENCH, Locales.FRENCH); // Output: "Français"
getLocaleName(Locales.FRENCH, Locales.ESPANOL); // Output: "Francés"
getLocaleName(Locales.FRENCH, Locales.ENGLISH); // Output: "French"

getLocaleName(Locales.CHINESE); // Output: "中文"
getLocaleName(Locales.CHINESE, Locales.FRENCH); // Output: "Chinois"
getLocaleName(Locales.CHINESE, Locales.ESPANOL); // Output: "Chino"
getLocaleName(Locales.CHINESE, Locales.ENGLISH); // Output: "Chinese"

getLocaleName("unknown-locale"); // Output: "Unknown locale"
```

## Casi limite:

- **Nessuna `targetLocale` fornita:**
  - La funzione predefinita restituisce il nome della `displayLocale`.
- **Traduzioni mancanti:**
  - Se `localeNameTranslations` non contiene un'entrata per la `targetLocale` o per la specifica `displayLocale`, la funzione fallback al `ownLocalesName` o restituisce `"Unknown locale"`.
