# Documentazione: Funzione `getConfiguration` in `intlayer`

## Descrizione

La funzione `getConfiguration` recupera l'intera configurazione per l'applicazione `intlayer` estraendo le variabili di ambiente. Questa funzione offre la flessibilità di utilizzare la stessa configurazione sia sul lato client che sul lato server, garantendo coerenza in tutta l'applicazione.

---

## Parametri

La funzione non accetta parametri. Invece, utilizza le variabili di ambiente per la configurazione.

### Restituisce

- **Tipo**: `IntlayerConfig`
- **Descrizione**: Un oggetto contenente la configurazione completa per `intlayer`. La configurazione include le seguenti sezioni:

  - `internationalization`: Impostazioni relative ai locali e alla modalità rigorosa.
  - `middleware`: Impostazioni relative alla gestione degli URL e dei cookie.
  - `content`: Impostazioni relative ai file di contenuto, directory e pattern.
  - `editor`: Configurazioni specifiche per l'editor.

Consulta la [documentazione della configurazione di Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/it/configuration.md) per maggiori dettagli.

---

## Esempio di utilizzo

### Recupero della configurazione completa

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

La sezione `internationalization` della configurazione fornisce impostazioni relative ai locali come `locales` (locali disponibili) e `defaultLocale` (lingua di fallback).

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

- Assicurati che tutte le variabili di ambiente richieste siano correttamente impostate prima di chiamare questa funzione. Le variabili mancanti causeranno errori durante l'inizializzazione.
- Questa funzione può essere utilizzata sia sul lato client che sul lato server, rendendola uno strumento versatile per gestire le configurazioni in modo unificato.

## Utilizzo nelle applicazioni

La funzione `getConfiguration` è un'utilità fondamentale per inizializzare e gestire la configurazione di un'applicazione `intlayer`. Fornendo accesso a impostazioni come locali, middleware e directory di contenuto, garantisce coerenza e scalabilità nelle applicazioni multilingue e basate sui contenuti.
