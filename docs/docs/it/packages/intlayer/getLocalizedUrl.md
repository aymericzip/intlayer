---
docName: package__intlayer__getLocalizedUrl
url: https://intlayer.org/doc/packages/intlayer/getLocalizedUrl
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getLocalizedUrl.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: Documentazione della funzione getLocalizedUrl | intlayer
description: Scopri come utilizzare la funzione getLocalizedUrl per il pacchetto intlayer
keywords:
  - getLocalizedUrl
  - traduzione
  - Intlayer
  - intlayer
  - internazionalizzazione
  - documentazione
  - Next.js
  - JavaScript
  - React
---

# Documentazione: Funzione `getLocalizedUrl` in `intlayer`

## Descrizione

La funzione `getLocalizedUrl` genera un URL localizzato aggiungendo un prefisso all'URL fornito con la lingua specificata. Gestisce sia URL assoluti che relativi, garantendo che venga applicato il prefisso corretto in base alla configurazione.

---

## Parametri

- `url: string`

  - **Descrizione**: La stringa URL originale a cui aggiungere un prefisso con una lingua.
  - **Tipo**: `string`

- `currentLocale: Locales`

  - **Descrizione**: La lingua corrente per cui l'URL viene localizzato.
  - **Tipo**: `Locales`

- `locales: Locales[]`

  - **Descrizione**: Array opzionale di lingue supportate. Per impostazione predefinita, vengono fornite le lingue configurate nel progetto.
  - **Tipo**: `Locales[]`
  - **Default**: [`Configurazione del Progetto`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md#middleware)

- `defaultLocale: Locales`

  - **Descrizione**: La lingua predefinita per l'applicazione. Per impostazione predefinita, viene fornita la lingua predefinita configurata nel progetto.
  - **Tipo**: `Locales`
  - **Default**: [`Configurazione del Progetto`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md#middleware)

- `prefixDefault: boolean`
  - **Descrizione**: Indica se aggiungere un prefisso all'URL per la lingua predefinita. Per impostazione predefinita, viene fornito il valore configurato nel progetto.
  - **Tipo**: `boolean`
  - **Default**: [`Configurazione del Progetto`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md#middleware)

### Ritorna

- **Tipo**: `string`
- **Descrizione**: L'URL localizzato per la lingua specificata.

---

## Esempio di Utilizzo

### URL Relativi

```typescript codeFormat="typescript"
import { getLocalizedUrl, Locales } from "intlayer";

getLocalizedUrl(
  "/about",
  Locales.FRENCH,
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  false
);

// Output: "/fr/about" per la lingua francese
// Output: "/about" per la lingua predefinita (inglese)
```

```javascript codeFormat="esm"
import { getLocalizedUrl, Locales } from "intlayer";

getLocalizedUrl(
  "/about",
  Locales.FRENCH,
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  false
);

// Output: "/fr/about" per la lingua francese
// Output: "/about" per la lingua predefinita (inglese)
```

```javascript codeFormat="esm"
import { getLocalizedUrl, Locales } from "intlayer";

getLocalizedUrl(
  "/about",
  Locales.FRENCH,
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  false
);

// Output: "/fr/about" per la lingua francese
// Output: "/about" per la lingua predefinita (inglese)
```

```javascript codeFormat="commonjs"
const { getLocalizedUrl, Locales } = require("intlayer");

getLocalizedUrl(
  "/about",
  Locales.FRENCH,
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  false
);

// Output: "/fr/about" per la lingua francese
// Output: "/about" per la lingua predefinita (inglese)
```

### URL Assoluti

```typescript
getLocalizedUrl(
  "https://example.com/about",
  Locales.FRENCH, // Lingua Corrente
  [Locales.ENGLISH, Locales.FRENCH], // Lingue Supportate
  Locales.ENGLISH, // Lingua Predefinita
  false // Prefisso per la Lingua Predefinita
); // Output: "https://example.com/fr/about" per il francese

getLocalizedUrl(
  "https://example.com/about",
  Locales.ENGLISH, // Lingua Corrente
  [Locales.ENGLISH, Locales.FRENCH], // Lingue Supportate
  Locales.ENGLISH, // Lingua Predefinita
  false // Prefisso per la Lingua Predefinita
); // Output: "https://example.com/about" per l'inglese

getLocalizedUrl(
  "https://example.com/about",
  Locales.ENGLISH, // Lingua Corrente
  [Locales.ENGLISH, Locales.FRENCH], // Lingue Supportate
  Locales.ENGLISH, // Lingua Predefinita
  true // Prefisso per la Lingua Predefinita
); // Output: "https://example.com/en/about" per l'inglese
```

### Lingua Non Supportata

```typescript
getLocalizedUrl(
  "/about",
  Locales.ITALIAN, // Lingua Corrente
  [Locales.ENGLISH, Locales.FRENCH], // Lingue Supportate
  Locales.ENGLISH // Lingua Predefinita
); // Output: "/about" (nessun prefisso applicato per la lingua non supportata)
```

---

## Casi Limite

- **Nessun Segmento di Lingua:**

  - Se l'URL non contiene alcun segmento di lingua, la funzione aggiunge in modo sicuro il prefisso appropriato.

- **Lingua Predefinita:**

  - Quando `prefixDefault` è `false`, la funzione non aggiunge un prefisso all'URL per la lingua predefinita.

- **Lingue Non Supportate:**
  - Per le lingue non elencate in `locales`, la funzione non applica alcun prefisso.

---

## Utilizzo nelle Applicazioni

In un'applicazione multilingue, configurare le impostazioni di internazionalizzazione con `locales` e `defaultLocale` è fondamentale per garantire che venga visualizzata la lingua corretta. Di seguito è riportato un esempio di come utilizzare `getLocalizedUrl` nella configurazione di un'applicazione:

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

La configurazione sopra garantisce che l'applicazione riconosca `ENGLISH`, `FRENCH` e `SPANISH` come lingue supportate e utilizzi `ENGLISH` come lingua di fallback.

Utilizzando questa configurazione, la funzione `getLocalizedUrl` può generare dinamicamente URL localizzati in base alla preferenza linguistica dell'utente:

```typescript
getLocalizedUrl("/about", Locales.FRENCH); // Output: "/fr/about"
getLocalizedUrl("/about", Locales.SPANISH); // Output: "/es/about"
getLocalizedUrl("/about", Locales.ENGLISH); // Output: "/about"
```

Integrando `getLocalizedUrl`, gli sviluppatori possono mantenere strutture URL coerenti tra più lingue, migliorando sia l'esperienza utente che la SEO.
