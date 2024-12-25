# Documentazione: `getMultilingualUrls` Funzione in `intlayer`

## Descrizione:

La funzione `getMultilingualUrls` genera una mappatura di URL multilingue prefissando l'URL dato con ciascun locale supportato. Può gestire sia URL assoluti che relativi, applicando il prefisso locale appropriato in base alla configurazione fornita o ai valori predefiniti.

---

## Parametri:

- `url: string`

  - **Descrizione**: La stringa URL originale da prefissare con i locali.
  - **Tipo**: `string`

- `locales: Locales[]`

  - **Descrizione**: Array opzionale di locali supportati. Predefinito ai locali configurati nel progetto.
  - **Tipo**: `Locales[]`
  - **Predefinito**: `localesDefault`

- `defaultLocale: Locales`

  - **Descrizione**: Il locale predefinito per l'applicazione. Predefinito al locale predefinito configurato nel progetto.
  - **Tipo**: `Locales`
  - **Predefinito**: `defaultLocaleDefault`

- `prefixDefault: boolean`
  - **Descrizione**: Se aggiungere il prefisso per il locale predefinito. Predefinito al valore configurato nel progetto.
  - **Tipo**: `boolean`
  - **Predefinito**: `prefixDefaultDefault`

### Restituisce:

- **Tipo**: `IConfigLocales<string>`
- **Descrizione**: Un oggetto che mappa ciascun locale al suo URL multilingue corrispondente.

---

## Esempio di Utilizzo:

### URL Relativi:

```typescript codeFormat="typescript"
import { getMultilingualUrls, Locales } from "intlayer";

getMultilingualUrls(
  "/dashboard",
  [Locales.ITALIAN, Locales.FRENCH],
  Locales.ITALIAN,
  false
);
// Output: {
//   it: "/dashboard",
//   fr: "/fr/dashboard"
// }
```

```javascript codeFormat="esm"
import { getMultilingualUrls, Locales } from "intlayer";

getMultilingualUrls(
  "/dashboard",
  [Locales.ITALIAN, Locales.FRENCH],
  Locales.ITALIAN,
  false
);
// Output: {
//   it: "/dashboard",
//   fr: "/fr/dashboard"
// }
```

```javascript codeFormat="commonjs"
const { getMultilingualUrls, Locales } = require("intlayer");

getMultilingualUrls(
  "/dashboard",
  [Locales.ITALIAN, Locales.FRENCH],
  Locales.ITALIAN,
  false
);
// Output: {
//   it: "/dashboard",
//   fr: "/fr/dashboard"
// }
```

### URL Assoluti:

```typescript
getMultilingualUrls(
  "https://example.com/dashboard",
  [Locales.ITALIAN, Locales.FRENCH],
  Locales.ITALIAN,
  true
);
// Output: {
//   it: "https://example.com/it/dashboard",
//   fr: "https://example.com/fr/dashboard"
// }
```

---

## Casi Limite:

- **Nessun Segmento Locale:**

  - La funzione rimuove qualsiasi segmento locale esistente dall'URL prima di generare le mappature multilingue.

- **Locale Predefinito:**

  - Quando `prefixDefault` è `false`, la funzione non aggiunge il prefisso all'URL per il locale predefinito.

- **Locali Non Supportati:**
  - Solo i locali forniti nell'array `locales` sono considerati per generare gli URL.

---

## Utilizzo nelle Applicazioni:

In un'applicazione multilingue, configurare le impostazioni di internazionalizzazione con `locales` e `defaultLocale` è fondamentale per garantire che la lingua corretta venga visualizzata. Di seguito è riportato un esempio di come `getMultilingualUrls` può essere utilizzato in una configurazione dell'applicazione:

```tsx codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

// Configurazione per locali supportati e locale predefinito
export default {
  internationalization: {
    locales: [Locales.ITALIAN, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ITALIAN,
  },
} satisfies IntlayerConfig;

export default config;
```

```javascript codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ITALIAN, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ITALIAN,
  },
};

export default config;
```

```javascript codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ITALIAN, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ITALIAN,
  },
};

module.exports = config;
```

La configurazione sopra garantisce che l'applicazione riconosca `ITALIAN`, `FRENCH`, e `SPANISH` come lingue supportate e utilizzi `ITALIAN` come lingua di fallback.

Utilizzando questa configurazione, la funzione `getMultilingualUrls` può generare dinamicamente mappature di URL multilingue basate sui locali supportati dall'applicazione:

```typescript
getMultilingualUrls(
  "/dashboard",
  [Locales.ITALIAN, Locales.FRENCH, Locales.SPANISH],
  Locales.ITALIAN
);
// Output:
// {
//   it: "/dashboard",
//   fr: "/fr/dashboard",
//   es: "/es/dashboard"
// }

getMultilingualUrls(
  "https://example.com/dashboard",
  [Locales.ITALIAN, Locales.FRENCH, Locales.SPANISH],
  Locales.ITALIAN,
  true
);
// Output:
// {
//   it: "https://example.com/it/dashboard",
//   fr: "https://example.com/fr/dashboard",
//   es: "https://example.com/es/dashboard"
// }
```

Integrando `getMultilingualUrls`, gli sviluppatori possono mantenere strutture di URL coerenti tra più lingue, migliorando sia l'esperienza dell'utente che la SEO.
