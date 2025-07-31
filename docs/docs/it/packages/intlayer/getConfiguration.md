---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Documentazione della funzione getConfiguration | intlayer
description: Scopri come utilizzare la funzione getConfiguration per il pacchetto intlayer
keywords:
  - getConfiguration
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
  - getConfiguration
---

# Documentazione: Funzione `getConfiguration` in `intlayer`

## Descrizione

La funzione `getConfiguration` recupera l'intera configurazione per l'applicazione `intlayer` estraendo le variabili d'ambiente. Questa funzione offre la flessibilità di utilizzare la stessa configurazione sia sul lato client che sul lato server, garantendo coerenza in tutta l'applicazione.

---

## Parametri

La funzione non accetta parametri. Utilizza invece le variabili d'ambiente per la configurazione.

### Ritorna

- **Tipo**: `IntlayerConfig`
- **Descrizione**: Un oggetto contenente la configurazione completa per `intlayer`. La configurazione include le seguenti sezioni:

  - `internationalization`: Impostazioni relative alle localizzazioni e alla modalità rigorosa.
  - `middleware`: Impostazioni relative alla gestione degli URL e dei cookie.
  - `content`: Impostazioni relative ai file di contenuto, directory e pattern.
  - `editor`: Configurazioni specifiche per l'editor.

Consulta la [documentazione sulla configurazione di Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md) per maggiori dettagli.

---

## Esempio di utilizzo

### Recuperare la configurazione completa

```typescript codeFormat="typescript"
import { getConfiguration } from "intlayer";

const config = getConfiguration();
console.log(config);
// Output:
// {
//   internationalization: { ... },
//   middleware: { ... },
//   content: { ... },
//   editor: { ... }
// }
```

```javascript codeFormat="esm"
import { getConfiguration } from "intlayer";

const config = getConfiguration();
console.log(config);
// Output:
// {
//   internationalization: { ... },
//   middleware: { ... },
//   content: { ... },
//   editor: { ... }
// }
```

```javascript codeFormat="commonjs"
const { getConfiguration } = require("intlayer");

const config = getConfiguration();
console.log(config);
// Output:
// {
//   internationalization: { ... },
//   middleware: { ... },
//   content: { ... },
//   editor: { ... }
// }
```

### Estrazione di `availableLocales` e `defaultLocale`

La sezione `internationalization` della configurazione fornisce impostazioni relative alle localizzazioni come `locales` (localizzazioni disponibili) e `defaultLocale` (lingua di fallback).

```typescript codeFormat="typescript"
import { getConfiguration } from "intlayer";

const { internationalization, middleware } = getConfiguration();
const { locales: availableLocales, defaultLocale } = internationalization;
const { cookieName } = middleware;

console.log(availableLocales); // Esempio di output: ["en", "fr", "es"]
console.log(defaultLocale); // Esempio di output: "en"
console.log(cookieName); // Output: "INTLAYER_LOCALE"
```

```javascript codeFormat="esm"
import { getConfiguration } from "intlayer";

const { internationalization, middleware } = getConfiguration();
const { locales: availableLocales, defaultLocale } = internationalization;
const { cookieName } = middleware;

console.log(availableLocales); // Esempio di output: ["en", "fr", "es"]
console.log(defaultLocale); // Esempio di output: "en"
console.log(cookieName); // Output: "INTLAYER_LOCALE"
```

```javascript codeFormat="commonjs"
const { getConfiguration } = require("intlayer");

const { internationalization, middleware } = getConfiguration();
const { locales: availableLocales, defaultLocale } = internationalization;
const { cookieName } = middleware;

console.log(availableLocales); // Esempio di output: ["en", "fr", "es"]
console.log(defaultLocale); // Esempio di output: "en"
console.log(cookieName); // Output: "INTLAYER_LOCALE"
```

## Note

- Assicurarsi che tutte le variabili d'ambiente richieste siano correttamente impostate prima di chiamare questa funzione. Variabili mancanti causeranno errori durante l'inizializzazione.
- Questa funzione può essere utilizzata sia sul lato client che sul lato server, rendendola uno strumento versatile per la gestione delle configurazioni in modo unificato.

## Utilizzo nelle Applicazioni

La funzione `getConfiguration` è un'utilità fondamentale per inizializzare e gestire la configurazione di un'applicazione `intlayer`. Fornendo l'accesso a impostazioni come le localizzazioni, il middleware e le directory dei contenuti, garantisce coerenza e scalabilità nelle applicazioni multilingue e basate sui contenuti.

## Cronologia della Documentazione

- 5.5.10 - 2025-06-29: Inizializzazione della cronologia
