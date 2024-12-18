# Documentazione: `getMultilingualUrls` Funzione in `intlayer`

## Descrizione:

La funzione `getMultilingualUrls` genera una mappatura di URL multilingue prefissando l'URL fornito con ciascuna lingua supportata. Può gestire URL sia assoluti che relativi, applicando il prefisso di lingua appropriato in base alla configurazione fornita o ai valori predefiniti.

---

## Parametri:

- `url: string`

  - **Descrizione**: строка URL originale da prefissare con le lingue.
  - **Tipo**: `string`

- `locales: Locales[]`

  - **Descrizione**: Array opzionale di lingue supportate. Imposta per impostazione predefinita le lingue configurate nel progetto.
  - **Tipo**: `Locales[]`
  - **Predefinito**: `localesDefault`

- `defaultLocale: Locales`

  - **Descrizione**: La lingua predefinita per l'applicazione. Imposta per impostazione predefinita la lingua predefinita configurata nel progetto.
  - **Tipo**: `Locales`
  - **Predefinito**: `defaultLocaleDefault`

- `prefixDefault: boolean`
  - **Descrizione**: Se aggiungere il prefisso per la lingua predefinita. Imposta per impostazione predefinita il valore configurato nel progetto.
  - **Tipo**: `boolean`
  - **Predefinito**: `prefixDefaultDefault`

### Restituisce:

- **Tipo**: `IConfigLocales<string>`
- **Descrizione**: Un oggetto che mappa ciascuna lingua al suo corrispondente URL multilingue.

---

## Esempio di Utilizzo:

### URL Relativi:

```typescript
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

### URL Assoluti:

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

## Casi Limite:

- **Nessun Segmento di Lingua:**

  - La funzione rimuove eventuali segmenti di lingua esistenti dall'URL prima di generare le mappature multilingue.

- **Lingua Predefinita:**

  - Quando `prefixDefault` è `false`, la funzione non aggiunge il prefisso all'URL per la lingua predefinita.

- **Lingue Non Supportate:**
  - Solo le lingue fornite nell'array `locales` sono considerate per la generazione degli URL.

---

## Utilizzo nelle Applicazioni:

In un'applicazione multilingue, configurare le impostazioni di internazionalizzazione con `locales` e `defaultLocale` è fondamentale per garantire che venga visualizzata la lingua corretta. Di seguito è riportato un esempio di come `getMultilingualUrls` può essere utilizzato in una configurazione di applicazione:

```tsx
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

La configurazione sopra garantisce che l'applicazione riconosca `ENGLISH`, `FRENCH` e `SPANISH` come lingue supportate e utilizzi `ENGLISH` come lingua di riserva.

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

Integrando `getMultilingualUrls`, gli sviluppatori possono mantenere strutture di URL coerenti tra più lingue, migliorando sia l'esperienza dell'utente che la SEO.
