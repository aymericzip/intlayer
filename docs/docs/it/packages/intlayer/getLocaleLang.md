---
docName: package__intlayer__getLocaleLang
url: https://intlayer.org/doc/packages/intlayer/getLocaleLang
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getLocaleLang.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Documentazione della funzione getLocaleLang | intlayer
description: Scopri come utilizzare la funzione getLocaleLang per il pacchetto intlayer
keywords:
  - getLocaleLang
  - traduzione
  - Intlayer
  - intlayer
  - internazionalizzazione
  - documentazione
  - Next.js
  - JavaScript
  - React
---

# Documentazione: Funzione `getLocaleLang` in `intlayer`

## Descrizione

La funzione `getLocaleLang` estrae il codice della lingua da una stringa locale. Supporta locali con o senza codici paese. Se non viene fornito alcun locale, restituisce una stringa vuota per impostazione predefinita.

## Parametri

- `locale?: Locales`

  - **Descrizione**: La stringa locale (ad esempio, `Locales.ENGLISH_UNITED_STATES`, `Locales.FRENCH_CANADA`) da cui viene estratto il codice della lingua.
  - **Tipo**: `Locales` (opzionale)

## Restituisce

- **Tipo**: `string`
- **Descrizione**: Il codice della lingua estratto dal locale. Se il locale non è fornito, restituisce una stringa vuota (`''`).

## Esempio di Utilizzo

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

## Casi Limite

- **Nessun Locale Fornito:**

  - La funzione restituisce una stringa vuota quando `locale` è `undefined`.

- **Stringhe Locale Malformate:**
  - Se il `locale` non segue il formato `lingua-paese` (ad esempio, `Locales.ENGLISH-US`), la funzione restituisce in modo sicuro la parte prima di `'-'` o l'intera stringa se non è presente `'-'`.
