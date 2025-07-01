---
docName: package__intlayer__getLocalizedUrl
url: https://intlayer.org/doc/packages/intlayer/getLocalizedUrl
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/intlayer/getLocalizedUrl.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Documentazione della funzione getLocalizedUrl | intlayer
description: Scopri come utilizzare la funzione getLocalizedUrl per il pacchetto intlayer
keywords:
  - getLocalizedUrl
  - traduzione
  - Intlayer
  - intlayer
  - Internazionalizzazione
  - Documentazione
  - Next.js
  - JavaScript
  - React
---

# Documentazione: Funzione `getLocalizedUrl` in `intlayer`

## Descrizione

La funzione `getLocalizedUrl` genera un URL localizzato anteponendo all'URL fornito la locale specificata. Gestisce sia URL assoluti che relativi, assicurando che il prefisso della locale corretta venga applicato in base alla configurazione.

---

## Parametri

- `url: string`

  - **Descrizione**: La stringa URL originale a cui anteporre una locale.
  - **Tipo**: `string`

- `currentLocale: Locales`

  - **Descrizione**: La locale corrente per cui l'URL viene localizzato.
  - **Tipo**: `Locales`

- `locales: Locales[]`

  - **Descrizione**: Array opzionale delle localizzazioni supportate. Per default, vengono fornite le localizzazioni configurate nel progetto.
  - **Tipo**: `Locales[]`
  - **Default**: [`Configurazione del Progetto`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md#middleware)

- `defaultLocale: Locales`

  - **Descrizione**: La locale predefinita per l'applicazione. Per default, viene fornita la locale predefinita configurata nel progetto.
  - **Tipo**: `Locales`
  - **Default**: [`Configurazione del Progetto`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md#middleware)

- `prefixDefault: boolean`
  - **Descrizione**: Se anteporre il prefisso all'URL per la locale predefinita. Per default, viene fornito il valore configurato nel progetto.
  - **Tipo**: `boolean`
  - **Default**: [`Configurazione del Progetto`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md#middleware)

### Ritorna

- **Tipo**: `string`
- **Descrizione**: L'URL localizzato per la locale specificata.

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

// Output: "/fr/about" per la locale francese
// Output: "/about" per la locale predefinita (inglese)
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

// Output: "/fr/about" per la locale francese
// Output: "/about" per la locale predefinita (inglese)
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

// Output: "/fr/about" per la locale francese
// Output: "/about" per la locale predefinita (inglese)
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

// Output: "/fr/about" per la locale francese
// Output: "/about" per la locale predefinita (inglese)
```

### URL Assoluti

```typescript
getLocalizedUrl(
  "https://example.com/about",
  Locales.FRENCH, // Locale corrente
  [Locales.ENGLISH, Locales.FRENCH], // Locali supportate
  Locales.ENGLISH, // Locale predefinita
  false // Prefisso per la lingua predefinita
); // Output: "https://example.com/fr/about" per la lingua francese

getLocalizedUrl(
  "https://example.com/about",
  Locales.ENGLISH, // Lingua corrente
  [Locales.ENGLISH, Locales.FRENCH], // Lingue supportate
  Locales.ENGLISH, // Lingua predefinita
  false // Prefisso per la lingua predefinita
); // Output: "https://example.com/about" per la lingua inglese

getLocalizedUrl(
  "https://example.com/about",
  Locales.ENGLISH, // Lingua corrente
  [Locales.ENGLISH, Locales.FRENCH], // Lingue supportate
  Locales.ENGLISH, // Lingua predefinita
  true // Prefisso per la lingua predefinita
); // Output: "https://example.com/en/about" per la lingua inglese
```

### Lingua non supportata

```typescript
getLocalizedUrl(
  "/about",
  Locales.ITALIAN, // Lingua corrente
  [Locales.ENGLISH, Locales.FRENCH], // Lingue supportate
  Locales.ENGLISH // Lingua predefinita
); // Output: "/about" (nessun prefisso applicato per lingua non supportata)
```

---

## Casi Limite

- **Nessun segmento di lingua:**

  - Se l'URL non contiene alcun segmento di lingua, la funzione aggiunge in modo sicuro il prefisso della lingua appropriata.

- **Lingua predefinita:**

  - Quando `prefixDefault` è `false`, la funzione non aggiunge il prefisso all'URL per la lingua predefinita.

- **Lingue non supportate:**
  - Per le lingue non elencate in `locales`, la funzione non applica alcun prefisso.

---

## Utilizzo nelle Applicazioni

In un'applicazione multilingue, configurare le impostazioni di internazionalizzazione con `locales` e `defaultLocale` è fondamentale per garantire che venga visualizzata la lingua corretta. Di seguito è riportato un esempio di come `getLocalizedUrl` può essere utilizzato in una configurazione dell'applicazione:

```tsx codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

// Configurazione delle lingue supportate e della lingua predefinita
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

La configurazione sopra garantisce che l'applicazione riconosca `ENGLISH`, `FRENCH` e `SPANISH` come lingue supportate e utilizzi `ENGLISH` come lingua di riserva.

Utilizzando questa configurazione, la funzione `getLocalizedUrl` può generare dinamicamente URL localizzati in base alla preferenza linguistica dell'utente:

```typescript
getLocalizedUrl("/about", Locales.FRENCH); // Output: "/fr/about"
getLocalizedUrl("/about", Locales.SPANISH); // Output: "/es/about"
getLocalizedUrl("/about", Locales.ENGLISH); // Output: "/about"
```

Integrando `getLocalizedUrl`, gli sviluppatori possono mantenere strutture URL coerenti attraverso più lingue, migliorando sia l'esperienza utente che la SEO.

## Cronologia del Documento

- 5.5.10 - 2025-06-29: Inizio cronologia
