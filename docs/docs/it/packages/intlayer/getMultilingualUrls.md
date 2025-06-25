---
docName: package__intlayer__getMultilingualUrls
url: https://intlayer.org/doc/packages/intlayer/getMultilingualUrls
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/intlayer/getMultilingualUrls.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: Documentazione della funzione getMultilingualUrls | intlayer
description: Scopri come utilizzare la funzione getMultilingualUrls per il pacchetto intlayer
keywords:
  - getMultilingualUrls
  - traduzione
  - Intlayer
  - intlayer
  - internazionalizzazione
  - documentazione
  - Next.js
  - JavaScript
  - React
---

**File Translated to Italian:**

# Documentazione: Funzione `getMultilingualUrls` in `intlayer`

## Descrizione

La funzione `getMultilingualUrls` genera una mappatura di URL multilingue aggiungendo un prefisso all'URL fornito con ciascuna lingua supportata. Può gestire sia URL assoluti che relativi, applicando il prefisso della lingua appropriata in base alla configurazione fornita o ai valori predefiniti.

---

## Parametri

- `url: string`

  - **Descrizione**: La stringa URL originale a cui aggiungere i prefissi delle lingue.
  - **Tipo**: `string`

- `locales: Locales[]`

  - **Descrizione**: Array opzionale di lingue supportate. Di default utilizza le lingue configurate nel progetto.
  - **Tipo**: `Locales[]`
  - **Default**: `localesDefault`

- `defaultLocale: Locales`

  - **Descrizione**: La lingua predefinita per l'applicazione. Di default utilizza la lingua predefinita configurata nel progetto.
  - **Tipo**: `Locales`
  - **Default**: `defaultLocaleDefault`

- `prefixDefault: boolean`
  - **Descrizione**: Indica se aggiungere il prefisso alla lingua predefinita. Di default utilizza il valore configurato nel progetto.
  - **Tipo**: `boolean`
  - **Default**: `prefixDefaultDefault`

### Restituisce

- **Tipo**: `IConfigLocales<string>`
- **Descrizione**: Un oggetto che mappa ogni lingua al relativo URL multilingue.

---

## Esempio di utilizzo

### URL relativi

```typescript codeFormat="typescript"
import { getMultilingualUrls, Locales } from "intlayer";

getMultilingualUrls(
  "/dashboard",
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  false
);
// Output: {
//   en: "/dashboard",
//   fr: "/fr/dashboard"
// }
```

```javascript codeFormat="esm"
import { getMultilingualUrls, Locales } from "intlayer";

getMultilingualUrls(
  "/dashboard",
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  false
);
// Output: {
//   en: "/dashboard",
//   fr: "/fr/dashboard"
// }
```

```javascript codeFormat="commonjs"
const { getMultilingualUrls, Locales } = require("intlayer");

getMultilingualUrls(
  "/dashboard",
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  false
);
// Output: {
//   en: "/dashboard",
//   fr: "/fr/dashboard"
// }
```

### URL assoluti

```typescript
getMultilingualUrls(
  "https://example.com/dashboard",
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  true
);
// Output: {
//   en: "https://example.com/en/dashboard",
//   fr: "https://example.com/fr/dashboard"
// }
```

---

## Casi limite

- **Nessun segmento di lingua:**

  - La funzione rimuove qualsiasi segmento di lingua esistente dall'URL prima di generare le mappature multilingue.

- **Lingua predefinita:**

  - Quando `prefixDefault` è `false`, la funzione non aggiunge il prefisso all'URL per la lingua predefinita.

- **Lingue non supportate:**
  - Solo le lingue fornite nell'array `locales` vengono considerate per la generazione degli URL.

---

## Utilizzo nelle applicazioni

In un'applicazione multilingue, configurare le impostazioni di internazionalizzazione con `locales` e `defaultLocale` è fondamentale per garantire che venga visualizzata la lingua corretta. Di seguito è riportato un esempio di come utilizzare `getMultilingualUrls` nella configurazione di un'applicazione:

```tsx codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

// Configurazione per le lingue supportate e la lingua predefinita
export default {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
} satisfies IntlayerConfig;

export default config;
```

```javascript codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

La configurazione sopra assicura che l'applicazione riconosca `ENGLISH`, `FRENCH` e `SPANISH` come lingue supportate e utilizzi `ENGLISH` come lingua di fallback.

Utilizzando questa configurazione, la funzione `getMultilingualUrls` può generare dinamicamente mappature di URL multilingue in base alle lingue supportate dall'applicazione:

```typescript
getMultilingualUrls(
  "/dashboard",
  [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  Locales.ENGLISH
);
// Output:
// {
//   en: "/dashboard",
//   fr: "/fr/dashboard",
//   es: "/es/dashboard"
// }

getMultilingualUrls(
  "https://example.com/dashboard",
  [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  Locales.ENGLISH,
  true
);
// Output:
// {
//   en: "https://example.com/en/dashboard",
//   fr: "https://example.com/fr/dashboard",
//   es: "https://example.com/es/dashboard"
// }
```

Integrando `getMultilingualUrls`, gli sviluppatori possono mantenere strutture di URL coerenti tra più lingue, migliorando sia l'esperienza utente che la SEO.
