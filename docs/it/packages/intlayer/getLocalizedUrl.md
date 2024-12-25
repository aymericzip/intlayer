# Documentazione: `getLocalizedUrl` Funzione in `intlayer`

## Descrizione:

La funzione `getLocalizedUrl` genera un URL localizzato anteponendo l'URL fornito con la locale specificata. Gestisce sia URL assoluti che relativi, assicurando che il corretto prefisso locale venga applicato in base alla configurazione.

---

## Parametri:

- `url: string`

  - **Descrizione**: La stringa URL originale da anteporre con una locale.
  - **Tipo**: `string`

- `currentLocale: Locales`

  - **Descrizione**: La locale corrente per la quale l'URL viene localizzato.
  - **Tipo**: `Locales`

- `locales: Locales[]`

  - **Descrizione**: Array opzionale di locali supportati. Per impostazione predefinita, vengono forniti le locali configurate nel progetto.
  - **Tipo**: `Locales[]`
  - **Default**: [`Configurazione del Progetto`](https://github.com/aymericzip/intlayer/blob/main/docs/it/configuration.md#middleware)

- `defaultLocale: Locales`

  - **Descrizione**: La locale predefinita per l'applicazione. Per impostazione predefinita, viene fornita la locale predefinita configurata nel progetto.
  - **Tipo**: `Locales`
  - **Default**: [`Configurazione del Progetto`](https://github.com/aymericzip/intlayer/blob/main/docs/it/configuration.md#middleware)

- `prefixDefault: boolean`
  - **Descrizione**: Se anteporre l'URL per la locale predefinita. Per impostazione predefinita, viene fornito il valore configurato nel progetto.
  - **Tipo**: `boolean`
  - **Default**: [`Configurazione del Progetto`](https://github.com/aymericzip/intlayer/blob/main/docs/it/configuration.md#middleware)

### Ritorna:

- **Tipo**: `string`
- **Descrizione**: L'URL localizzato per la locale specificata.

---

## Esempio di Utilizzo:

### URL relativi:

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

### URL assoluti:

```typescript
getLocalizedUrl(
  "https://example.com/about",
  Locales.FRENCH, // Locale Corrente
  [Locales.ENGLISH, Locales.FRENCH], // Locali Supportati
  Locales.ENGLISH, // Locale Predefinita
  false // Prefisso Locale Predefinito
); // Output: "https://example.com/fr/about" per la francese

getLocalizedUrl(
  "https://example.com/about",
  Locales.ENGLISH, // Locale Corrente
  [Locales.ENGLISH, Locales.FRENCH], // Locali Supportati
  Locales.ENGLISH, // Locale Predefinita
  false // Prefisso Locale Predefinito
); // Output: "https://example.com/about" per l'inglese

getLocalizedUrl(
  "https://example.com/about",
  Locales.ENGLISH, // Locale Corrente
  [Locales.ENGLISH, Locales.FRENCH], // Locali Supportati
  Locales.ENGLISH, // Locale Predefinita
  true // Prefisso Locale Predefinito
); // Output: "https://example.com/en/about" per l'inglese
```

### Locale non supportata:

```typescript
getLocalizedUrl(
  "/about",
  Locales.ITALIAN, // Locale Corrente
  [Locales.ENGLISH, Locales.FRENCH], // Locali Supportati
  Locales.ENGLISH // Locale Predefinita
); // Output: "/about" (nessun prefisso applicato per locale non supportata)
```

---

## Casi Limite:

- **Nessun Segmento Locale:**

  - Se l'URL non contiene alcun segmento locale, la funzione antepone in sicurezza la locale appropriata.

- **Locale Predefinita:**

  - Quando `prefixDefault` è `false`, la funzione non antepone l'URL per la locale predefinita.

- **Locali Non Supportate:**
  - Per le locali non elencate in `locales`, la funzione non applica alcun prefisso.

---

## Utilizzo nelle Applicazioni:

In un'applicazione multilingue, configurare le impostazioni di internazionalizzazione con `locales` e `defaultLocale` è fondamentale per garantire che la lingua corretta venga visualizzata. Di seguito è riportato un esempio di come `getLocalizedUrl` può essere utilizzato in una configurazione dell'app:

```tsx codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

// Configurazione per le locali supportate e la locale predefinita
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

Integrando `getLocalizedUrl`, gli sviluppatori possono mantenere strutture di URL coerenti attraverso più lingue, migliorando sia l'esperienza utente che la SEO.
