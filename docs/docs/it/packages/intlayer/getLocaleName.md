---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Documentazione della funzione getLocaleName | intlayer
description: Scopri come utilizzare la funzione getLocaleName per il pacchetto intlayer
keywords:
  - getLocaleName
  - traduzione
  - Intlayer
  - intlayer
  - Internazionalizzazione
  - Documentazione
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - intlayer
  - getLocaleName
history:
  - version: 7.5.0
    date: 2025-12-18
    changes: Aggiungere polyfills per React Native e ambienti più vecchi
  - version: 5.5.10
    date: 2025-06-29
    changes: Inizio cronologia
---

# Documentazione: Funzione `getLocaleName` in `intlayer`

## Descrizione

La funzione `getLocaleName` restituisce il nome localizzato di una determinata località (`targetLocale`) nella località di visualizzazione (`displayLocale`). Se non viene fornito alcun `targetLocale`, restituisce il nome della `displayLocale` nella sua stessa lingua.

## Parametri

- `displayLocale: Locales`
  - **Descrizione**: La località in cui verrà visualizzato il nome della località target.
  - **Tipo**: Enum o stringa che rappresenta località valide.

- `targetLocale?: Locales`
  - **Descrizione**: La località di cui si desidera localizzare il nome.
  - **Tipo**: Opzionale. Enum o stringa che rappresenta località valide.

## Ritorna

- **Tipo**: `string`
- **Descrizione**: Il nome localizzato della `targetLocale` nella `displayLocale`, o il nome della `displayLocale` stessa se `targetLocale` non è fornito. Se non viene trovata alcuna traduzione, restituisce `"Unknown locale"`.

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
  - La funzione restituisce per default il nome proprio del `displayLocale`.
- **Traduzioni mancanti:**
  - Se `localeNameTranslations` non contiene una voce per il `targetLocale` o per il `displayLocale` specifico, la funzione ricorre a `ownLocalesName` oppure restituisce `"Unknown locale"`.

## Polyfills per React Native e ambienti più vecchi

La funzione `getLocaleName` dipende dall'API `Intl.DisplayNames`, che non è disponibile in React Native o in ambienti JavaScript più vecchi. Se stai usando `getLocaleName` in questi ambienti, devi aggiungere polyfills.

Importa i polyfills all'inizio della tua applicazione, idealmente nel tuo file di ingresso (ad esempio, `index.js`, `App.tsx` o `main.tsx`):

```typescript
import "intl";
import "@formatjs/intl-locale/polyfill";
import "@formatjs/intl-displaynames/polyfill";
```

Per maggiori dettagli, consulta la [documentazione dei polyfills FormatJS](https://formatjs.io/docs/polyfills/intl-displaynames/).
