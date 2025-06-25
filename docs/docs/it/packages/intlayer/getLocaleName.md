---
docName: package__intlayer__getLocaleName
url: https://intlayer.org/doc/packages/intlayer/getLocaleName
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getLocaleName.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: Documentazione della funzione getLocaleName | intlayer
description: Scopri come utilizzare la funzione getLocaleName per il pacchetto intlayer
keywords:
  - getLocaleName
  - traduzione
  - Intlayer
  - intlayer
  - internazionalizzazione
  - documentazione
  - Next.js
  - JavaScript
  - React
---

# Documentazione: Funzione `getLocaleName` in `intlayer`

## Descrizione

La funzione `getLocaleName` restituisce il nome localizzato di una determinata lingua (`targetLocale`) nella lingua di visualizzazione (`displayLocale`). Se non viene fornito un `targetLocale`, restituisce il nome del `displayLocale` nella sua lingua.

## Parametri

- `displayLocale: Locales`

  - **Descrizione**: La lingua in cui verrà visualizzato il nome della lingua di destinazione.
  - **Tipo**: Enum o stringa che rappresenta lingue valide.

- `targetLocale?: Locales`
  - **Descrizione**: La lingua di cui si desidera localizzare il nome.
  - **Tipo**: Opzionale. Enum o stringa che rappresenta lingue valide.

## Restituisce

- **Tipo**: `string`
- **Descrizione**: Il nome localizzato del `targetLocale` nel `displayLocale`, o il nome del `displayLocale` se `targetLocale` non è fornito. Se non viene trovata alcuna traduzione, restituisce `"Unknown locale"`.

## Esempio di utilizzo

```typescript codeFormat="typescript"
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

```javascript codeFormat="esm"
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

```javascript codeFormat="commonjs"
const { Locales, getLocaleName } = require("intlayer");

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

## Casi limite

- **Nessun `targetLocale` fornito:**
  - La funzione restituisce di default il nome del `displayLocale`.
- **Traduzioni mancanti:**
  - Se `localeNameTranslations` non contiene una voce per il `targetLocale` o il `displayLocale` specifico, la funzione utilizza il `ownLocalesName` o restituisce `"Unknown locale"`.
