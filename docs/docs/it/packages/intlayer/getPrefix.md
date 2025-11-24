---
createdAt: 2025-11-16
updatedAt: 2025-11-16
title: Documentazione della funzione getPrefix | intlayer
description: Scopri come utilizzare la funzione getPrefix per il pacchetto intlayer
keywords:
  - getPrefix
  - prefisso
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
  - getPrefix
history:
  - version: 7.1.0
    date: 2025-11-16
    changes: Documentazione iniziale
---

# Documentazione: Funzione `getPrefix` in `intlayer`

## Descrizione

La funzione `getPrefix` determina il prefisso URL per una data locale basandosi sulla configurazione della modalità di routing. Confronta la locale con la locale predefinita e restituisce un oggetto contenente tre diversi formati di prefisso per una costruzione flessibile degli URL.

**Caratteristiche principali:**

- Prende una locale come primo parametro (obbligatorio)
- Oggetto `options` opzionale con `defaultLocale` e `mode`
- Restituisce un oggetto con le proprietà `prefix` e `localePrefix`
- Supporta tutte le modalità di routing: `prefix-no-default`, `prefix-all`, `no-prefix` e `search-params`
- Utility leggera per determinare quando aggiungere i prefissi di locale

---

## Firma della funzione

```typescript
getPrefix(
  locale: Locales,               // Obbligatorio
  options?: {                    // Opzionale
    defaultLocale?: Locales;
    mode?: 'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params';
  }
): GetPrefixResult

type GetPrefixResult = {
  prefix: string;   // es. 'fr/' o ''
  localePrefix?: Locale; // es. 'fr' o undefined
}
```

---

## Parametri

- `locale: Locales`
  - **Descrizione**: La locale per cui generare il prefisso. Se il valore è falsy (undefined, null, stringa vuota), la funzione restituisce una stringa vuota.
  - **Tipo**: `Locales`
  - **Obbligatorio**: Sì

- `options?: object`
  - **Descrizione**: Oggetto di configurazione per la determinazione del prefisso.
  - **Tipo**: `object`
  - **Obbligatorio**: No (Opzionale)

  - `options.defaultLocale?: Locales`
    - **Descrizione**: La locale predefinita per l'applicazione. Se non fornita, utilizza la locale predefinita configurata nel progetto.
    - **Tipo**: `Locales`
    - **Predefinito**: [`Configurazione del Progetto`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md#middleware)

  - `options.mode?: 'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params'`
    - **Descrizione**: La modalità di routing URL per la gestione della locale. Se non fornita, utilizza la modalità configurata nella configurazione del progetto.
    - **Tipo**: `'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params'`
    - **Predefinito**: [`Configurazione del Progetto`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md#middleware)
    - **Modalità**:
      - `prefix-no-default`: Restituisce stringhe vuote quando la locale corrisponde alla locale predefinita
      - `prefix-all`: Restituisce il prefisso per tutte le località, inclusa quella predefinita
      - `no-prefix`: Restituisce stringhe vuote (nessun prefisso negli URL)
      - `search-params`: Restituisce stringhe vuote (locale nei parametri di query)

### Ritorna

- **Tipo**: `GetPrefixResult`
- **Descrizione**: Un oggetto contenente tre diversi formati di prefisso:
  - `prefix`: Il prefisso del percorso con slash finale (es. `'fr/'`, `''`)
  - `localePrefix`: L'identificatore della locale senza slash (es. `'fr'`, `undefined`)

---

## Esempio di Utilizzo

### Utilizzo Base

```typescript codeFormat="typescript"
import { getPrefix, Locales } from "intlayer";

// Controlla il prefisso per la locale inglese
getPrefix(Locales.ENGLISH, {
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-all",
});
// Restituisce: { prefix: 'en/', localePrefix: 'en' }

// Controlla il prefisso per la locale francese
getPrefix(Locales.FRENCH, {
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-no-default",
});
// Restituisce: { prefix: 'fr/', localePrefix: 'fr' }
```

```javascript codeFormat="esm"
import { getPrefix, Locales } from "intlayer";

getPrefix(Locales.ENGLISH, { mode: "prefix-all" });
javascript codeFormat="commonjs"
const { getPrefix, Locales } = require("intlayer");

getPrefix(Locales.ENGLISH, { mode: "prefix-all" });
// Restituisce: { prefix: '', localePrefix: undefined }
```

### Modalità di Routing Differenti

```typescript
import { getPrefix, Locales } from "intlayer";

// prefix-all: Restituisce sempre il prefisso
getPrefix(Locales.ENGLISH, {
  mode: "prefix-all",
  defaultLocale: Locales.ENGLISH,
});
// Restituisce: { prefix: '/en', localePrefix: 'en' }

// prefix-no-default: Nessun prefisso quando la locale corrisponde a quella di default
getPrefix(Locales.ENGLISH, {
  mode: "prefix-no-default",
  defaultLocale: Locales.ENGLISH,
});
// Restituisce: { prefix: '', localePrefix: undefined }

// prefix-no-default: Restituisce il prefisso quando la locale è diversa da quella predefinita
getPrefix(Locales.FRENCH, {
  mode: "prefix-no-default",
  defaultLocale: Locales.ENGLISH,
});
// Restituisce: { prefix: 'fr/', localePrefix: 'fr' }

// no-prefix & search-params: Non restituisce mai il prefisso
getPrefix(Locales.ENGLISH, { mode: "no-prefix" });
// Restituisce: { prefix: '', localePrefix: undefined }

getPrefix(Locales.ENGLISH, { mode: "search-params" });
// Restituisce: { prefix: '', localePrefix: undefined }
```

### Esempio Pratico

```typescript
import { getPrefix, Locales } from "intlayer";

// Costruisci URL con il prefisso appropriato per una specifica locale
const locale = Locales.FRENCH;
const { prefix, localePrefix } = getPrefix(locale, {
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-no-default",
});

// Utilizzo del prefisso per la costruzione del percorso
const url1 = `/${prefix}about`.replace(/\/+/g, "/");
// Risultato: "/fr/about"

// Utilizzo di localePrefix per l'identificazione della locale
console.log(`Current locale: ${localePrefix}`);
// Output: "Current locale: fr"
```

---

## Funzioni Correlate

- [`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/intlayer/getLocalizedUrl.md): Genera un URL localizzato per una specifica locale
- [`getMultilingualUrls`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/intlayer/getMultilingualUrls.md): Genera URL per tutte le localizzazioni configurate

---

## TypeScript

```typescript
type GetPrefixResult = {
  prefix: string; // Il prefisso del percorso con slash finale (es. 'fr/' o '')

  localePrefix?: Locale; // L'identificatore della locale senza slash (es. 'fr' o undefined)
};

function getPrefix(
  locale: Locales,
  options?: {
    defaultLocale?: Locales;
    mode?: "prefix-no-default" | "prefix-all" | "no-prefix" | "search-params";
  }
): GetPrefixResult;
```
