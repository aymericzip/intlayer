---
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
slugs:
  - doc
  - packages
  - intlayer
  - getLocalizedUrl
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "Inizio cronologia"
author: aymericzip
---

# Documentazione: Funzione `getLocalizedUrl` in `intlayer`

## Descrizione

La funzione `getLocalizedUrl` genera un URL localizzato aggiungendo un prefisso locale all'URL fornito. Gestisce sia gli URL assoluti che relativi, garantendo che il corretto prefisso locale sia applicato in base alla configurazione.

**Caratteristiche principali:**

- Solo 2 parametri sono obbligatori: `url` e `currentLocale`
- Oggetto `options` facoltativo con `locales`, `defaultLocale` e `mode`
- Utilizza la configurazione di internazionalizzazione del tuo progetto come impostazioni predefinite
- Può essere utilizzato con parametri minimi per casi semplici o completamente personalizzato per scenari complessi
- Supporta più modalità di routing: `prefix-no-default`, `prefix-all`, `no-prefix` e `search-params`

---

## Firma della Funzione

```typescript
getLocalizedUrl(
  url: string,                   // Obbligatorio
  currentLocale: Locales,        // Obbligatorio
  options?: {                    // Opzionale
    locales?: Locales[];
    defaultLocale?: Locales;
    mode?: 'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params';
  }
): string
```

---

## Parametri

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

### Utilizzo di Base (Solo Parametri Obbligatori)

Quando hai configurato il tuo progetto con le impostazioni di internazionalizzazione, puoi utilizzare la funzione con solo i parametri obbligatori:

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getLocalizedUrl, Locales } from "intlayer";

// Utilizza la configurazione del tuo progetto per locales, defaultLocale e mode
getLocalizedUrl("/about", Locales.FRENCH);
// Output: "/fr/about" (assumendo che il francese sia supportato e mode sia 'prefix-no-default')

getLocalizedUrl("/about", Locales.ENGLISH);
// Output: "/about" o "/en/about" (a seconda dell'impostazione di mode)
```

### Advanced Usage (With Optional Parameters)

You can override the default configuration by providing the optional `options` parameter:

### URL Relativi

```typescript codeFormat={["typescript", "esm"]}
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

### Override parziale della configurazione

Puoi fornire anche solo alcuni dei parametri opzionali. La funzione utilizzerà la configurazione del tuo progetto per qualsiasi parametro non specificato:

```typescript codeFormat="typescript"
import { getLocalizedUrl, Locales } from "intlayer";

// Sovrascrivi solo le locales, usa la config del progetto per defaultLocale e mode
getLocalizedUrl("/about", Locales.SPANISH, {
  locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
});

// Sovrascrivi solo mode, usa la config del progetto per locales e defaultLocale
getLocalizedUrl("/about", Locales.ENGLISH, {
  mode: "prefix-all", // Forza il prefisso per tutte le locales inclusa quella predefinita
});

// Sovrascrivi più opzioni
getLocalizedUrl("/about", Locales.FRENCH, {
  defaultLocale: Locales.ENGLISH,
  mode: "search-params", // Usa parametri di query: /about?locale=fr
});
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

```tsx codeFormat={["typescript", "esm", "commonjs"]}
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

La configurazione sopra garantisce che l'applicazione riconosca `ENGLISH`, `FRENCH` e `SPANISH` come lingue supportate e utilizzi `ENGLISH` come lingua di riserva.

Utilizzando questa configurazione, la funzione `getLocalizedUrl` può generare dinamicamente URL localizzati in base alla preferenza linguistica dell'utente:

```typescript
getLocalizedUrl("/about", Locales.FRENCH); // Output: "/fr/about"
getLocalizedUrl("/about", Locales.SPANISH); // Output: "/es/about"
getLocalizedUrl("/about", Locales.ENGLISH); // Output: "/about"
```

Integrando `getLocalizedUrl`, gli sviluppatori possono mantenere strutture URL coerenti attraverso più lingue, migliorando sia l'esperienza utente che la SEO.
