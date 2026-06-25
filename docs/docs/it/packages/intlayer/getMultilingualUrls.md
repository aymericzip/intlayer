---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Documentazione della funzione getMultilingualUrls | intlayer
description: Scopri come utilizzare la funzione getMultilingualUrls per il pacchetto intlayer
keywords:
  - getMultilingualUrls
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
  - getMultilingualUrls
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "Inizio cronologia"
author: aymericzip
---

# Documentazione: Funzione `getMultilingualUrls` in `intlayer`

## Descrizione

La funzione `getMultilingualUrls` genera una mappatura di URL multilingue aggiungendo un prefisso all'URL fornito con ciascuna delle lingue supportate. Può gestire sia URL assoluti che relativi, applicando il prefisso della lingua appropriata in base alla configurazione fornita o ai valori predefiniti.

---

## Firma della funzione

```typescript
getMultilingualUrls(
  url: string,                   // Obbligatorio
  options?: {                    // Opzionale
    locales?: Locales[];
    defaultLocale?: Locales;
    mode?: 'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params';
  }
): StrictModeLocaleMap<string>
```

---

## Parametri

## Parametri

- `url: string`
  - **Descrizione**: La stringa URL originale a cui verranno aggiunti i prefissi delle lingue.
  - **Tipo**: `string`

- `locales: Locales[]`
  - **Descrizione**: Array opzionale delle lingue supportate. Di default utilizza le lingue configurate nel progetto.
  - **Tipo**: `Locales[]`
  - **Predefinito**: `localesDefault`

- `defaultLocale: Locales`
  - **Descrizione**: La lingua predefinita per l'applicazione. Di default utilizza la lingua predefinita configurata nel progetto.
  - **Tipo**: `Locales`
  - **Predefinito**: `defaultLocaleDefault`

- `prefixDefault: boolean`
  - **Descrizione**: Se aggiungere il prefisso per la lingua predefinita. Di default utilizza il valore configurato nel progetto.
  - **Tipo**: `boolean`
  - **Predefinito**: `prefixDefaultDefault`

### Parametri Opzionali

- `options?: object`
  - **Description**: Oggetto di configurazione per il comportamento della localizzazione degli URL.
  - **Type**: `object`
  - **Required**: No (Opzionale)

  - `options.locales?: Locales[]`
    - **Description**: Array di locale supportate. Se non fornito, utilizza le locale configurate dalla configurazione del progetto.
    - **Type**: `Locales[]`
    - **Default**: [`Project Configuration`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md#middleware)

  - `options.defaultLocale?: Locales`
    - **Description**: La locale predefinita per l'applicazione. Se non fornito, utilizza la locale predefinita configurata dalla configurazione del progetto.
    - **Type**: `Locales`
    - **Default**: [`Project Configuration`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md#middleware)

  - `options.mode?: 'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params'`
    - **Description**: La modalità di routing degli URL per la gestione della locale. Se non fornito, utilizza la modalità configurata dalla configurazione del progetto.
    - **Type**: `'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params'`
    - **Default**: [`Project Configuration`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md#middleware)
    - **Modes**:
      - `prefix-no-default`: Nessun prefisso per la locale predefinita, prefisso per tutte le altre
      - `prefix-all`: Prefisso per tutte le locale inclusa quella predefinita
      - `no-prefix`: Nessun prefisso di locale nell'URL
      - `search-params`: Utilizza parametri di query per la locale (es. `?locale=fr`)

### Ritorna

- **Tipo**: `IConfigLocales<string>`
- **Descrizione**: Un oggetto che mappa ogni lingua al corrispondente URL multilingue.

---

## Esempio di utilizzo

### Utilizzo di base (Usa la configurazione del progetto)

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getMultilingualUrls, Locales } from "intlayer";

// Usa la configurazione del progetto per locales, defaultLocale e mode
getMultilingualUrls("/dashboard");
// Output (supponendo che la configurazione del progetto abbia en, fr con mode 'prefix-no-default'):
// {
//   en: "/dashboard",
//   fr: "/fr/dashboard"
// }
```

### URL relativi

```typescript codeFormat={["typescript", "esm", "commonjs"]}
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

### Modalità di Routing Diverse

```typescript
// prefix-no-default: Nessun prefisso per la locale predefinita
getMultilingualUrls("/dashboard", {
  locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-no-default",
});
// Output: {
//   en: "/dashboard",
//   fr: "/fr/dashboard",
//   es: "/es/dashboard"
// }

// prefix-all: Prefisso per tutte le locale
getMultilingualUrls("/dashboard", {
  locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-all",
});
// Output: {
//   en: "/en/dashboard",
//   fr: "/fr/dashboard",
//   es: "/es/dashboard"
// }

// no-prefix: Nessun prefisso di locale negli URL
getMultilingualUrls("/dashboard", {
  locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  defaultLocale: Locales.ENGLISH,
  mode: "no-prefix",
});
// Output: {
//   en: "/dashboard",
//   fr: "/dashboard",
//   es: "/dashboard"
// }

// search-params: Locale come parametro di query
getMultilingualUrls("/dashboard", {
  locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  defaultLocale: Locales.ENGLISH,
  mode: "search-params",
});
// Output: {
//   en: "/dashboard?locale=en",
//   fr: "/dashboard?locale=fr",
//   es: "/dashboard?locale=es"
// }
```

---

## Casi limite

- **Nessun segmento di lingua:**
  - La funzione rimuove qualsiasi segmento di localizzazione esistente dall'URL prima di generare le mappature multilingue.

- **Localizzazione Predefinita:**
  - Quando `prefixDefault` è `false`, la funzione non aggiunge il prefisso all'URL per la localizzazione predefinita.

- **Localizzazioni Non Supportate:**
  - Solo le localizzazioni fornite nell'array `locales` sono considerate per la generazione degli URL.

---

## Utilizzo nelle Applicazioni

In un'applicazione multilingue, configurare le impostazioni di internazionalizzazione con `locales` e `defaultLocale` è fondamentale per garantire la visualizzazione della lingua corretta. Di seguito un esempio di come `getMultilingualUrls` può essere utilizzato nella configurazione di un'applicazione:

```tsx codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

// Configurazione per le localizzazioni supportate e la localizzazione predefinita
export default {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
} satisfies IntlayerConfig;

export default config;
```

La configurazione sopra garantisce che l'applicazione riconosca `ENGLISH`, `FRENCH` e `SPANISH` come lingue supportate e utilizzi `ENGLISH` come lingua di fallback.

Utilizzando questa configurazione, la funzione `getMultilingualUrls` può generare dinamicamente mappature di URL multilingue basate sulle localizzazioni supportate dall'applicazione:

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

Integrando `getMultilingualUrls`, gli sviluppatori possono mantenere strutture URL coerenti attraverso più lingue, migliorando sia l'esperienza utente che la SEO.
