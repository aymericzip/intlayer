# Documentazione: `getLocalizedUrl` Funzione in `intlayer`

## Descrizione:

La funzione `getLocalizedUrl` genera un URL localizzato prefissando l'URL fornito con la locale specificata. Gestisce sia URL assoluti che relativi, assicurandosi che il prefisso della locale corretto sia applicato in base alla configurazione.

---

## Parametri:

- `url: string`

  - **Descrizione**: La stringa URL originale da prefissare con una locale.
  - **Tipo**: `string`

- `currentLocale: Locales`

  - **Descrizione**: La locale attuale per la quale l'URL è localizzato.
  - **Tipo**: `Locales`

- `locales: Locales[]`

  - **Descrizione**: Array opzionale di locali supportate. Per defetto, le locali configurate nel progetto sono fornite.
  - **Tipo**: `Locales[]`
  - **Default**: [`Configurazione del Progetto`](https://github.com/aymericzip/intlayer/blob/main/docs/it/configuration.md#middleware)

- `defaultLocale: Locales`

  - **Descrizione**: La locale predefinita per l'applicazione. Per defetto, la locale predefinita configurata nel progetto è fornita.
  - **Tipo**: `Locales`
  - **Default**: [`Configurazione del Progetto`](https://github.com/aymericzip/intlayer/blob/main/docs/it/configuration.md#middleware)

- `prefixDefault: boolean`
  - **Descrizione**: Se applicare il prefisso all'URL per la locale predefinita. Per defetto, il valore configurato nel progetto è fornito.
  - **Tipo**: `boolean`
  - **Default**: [`Configurazione del Progetto`](https://github.com/aymericzip/intlayer/blob/main/docs/it/configuration.md#middleware)

### Restituisce:

- **Tipo**: `string`
- **Descrizione**: L'URL localizzato per la locale specificata.

---

## Esempio di Utilizzo:

### URL Relativi:

```typescript
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

### URL Assoluti:

```typescript
getLocalizedUrl(
  "https://example.com/about",
  Locales.FRENCH, // Locale Attuale
  [Locales.ENGLISH, Locales.FRENCH], // Locali Supportate
  Locales.ENGLISH, // Locale Predefinita
  false // Prefissa la Locale Predefinita
); // Output: "https://example.com/fr/about" per il francese

getLocalizedUrl(
  "https://example.com/about",
  Locales.ENGLISH, // Locale Attuale
  [Locales.ENGLISH, Locales.FRENCH], // Locali Supportate
  Locales.ENGLISH, // Locale Predefinita
  false // Prefissa la Locale Predefinita
); // Output: "https://example.com/about" per l'inglese

getLocalizedUrl(
  "https://example.com/about",
  Locales.ENGLISH, // Locale Attuale
  [Locales.ENGLISH, Locales.FRENCH], // Locali Supportate
  Locales.ENGLISH, // Locale Predefinita
  true // Prefissa la Locale Predefinita
); // Output: "https://example.com/en/about" per l'inglese
```

### Locale Non Supportata:

```typescript
getLocalizedUrl(
  "/about",
  Locales.ITALIAN, // Locale Attuale
  [Locales.ENGLISH, Locales.FRENCH], // Locali Supportate
  Locales.ENGLISH // Locale Predefinita
); // Output: "/about" (nessun prefisso applicato per locale non supportata)
```

---

## Casi Limite:

- **Nessun Segmento Locale:**

  - Se l'URL non contiene alcun segmento locale, la funzione applica in modo sicuro il prefisso locale appropriato.

- **Locale Predefinita:**

  - Quando `prefixDefault` è `false`, la funzione non prefissa l'URL per la locale predefinita.

- **Locali Non Supportate:**
  - Per le locali non elencate in `locales`, la funzione non applica alcun prefisso.

---

## Utilizzo nelle Applicazioni:

In un'applicazione multilingue, configurare le impostazioni di internazionalizzazione con `locales` e `defaultLocale` è fondamentale per garantire che la lingua corretta venga visualizzata. Di seguito è riportato un esempio di come `getLocalizedUrl` può essere utilizzato in una configurazione dell'applicazione:

```tsx
import { Locales, type IntlayerConfig } from "intlayer";

// Configurazione per locali supportati e locale predefinita
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

Integrando `getLocalizedUrl`, gli sviluppatori possono mantenere strutture URL coerenti attraverso più lingue, migliorando sia l'esperienza utente sia il SEO.
