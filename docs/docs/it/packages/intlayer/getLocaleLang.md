---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Documentazione della funzione getLocaleLang | intlayer
description: Scopri come utilizzare la funzione getLocaleLang per il pacchetto intlayer
keywords:
  - getLocaleLang
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
  - getLocaleLang
---

# Documentazione: Funzione `getLocaleLang` in `intlayer`

## Descrizione

La funzione `getLocaleLang` estrae il codice della lingua da una stringa di localizzazione. Supporta localizzazioni con o senza codici paese. Se non viene fornita alcuna localizzazione, restituisce una stringa vuota.

## Parametri

- `locale?: Locales`

  - **Descrizione**: La stringa di localizzazione (ad esempio, `Locales.ENGLISH_UNITED_STATES`, `Locales.FRENCH_CANADA`) da cui viene estratto il codice della lingua.
  - **Tipo**: `Locales` (opzionale)

## Ritorna

- **Tipo**: `string`
- **Descrizione**: Il codice della lingua estratto dalla localizzazione. Se la localizzazione non viene fornita, restituisce una stringa vuota (`''`).

## Esempio di utilizzo

### Estrazione dei codici lingua:

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

// Nessuna localizzazione fornita:
getLocaleLang(Locales.ENGLISH_UNITED_STATES); // Output: "en"
getLocaleLang(Locales.ENGLISH); // Output: "en"
getLocaleLang(Locales.FRENCH_CANADA); // Output: "fr"
getLocaleLang(Locales.FRENCH); // Output: "fr"
```

## Casi limite

- **Nessuna localizzazione fornita:**

  - La funzione restituisce una stringa vuota quando `locale` è `undefined`.

- **Stringhe di localizzazione malformate:**
  - Se il `locale` non segue il formato `lingua-paese` (ad esempio, `Locales.ENGLISH-US`), la funzione restituisce in modo sicuro la parte prima di `'-'` o l'intera stringa se non è presente `'-'`.

## Cronologia Documentazione

- 5.5.10 - 2025-06-29: Storia iniziale
