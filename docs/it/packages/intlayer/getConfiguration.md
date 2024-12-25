# Documentazione: `getConfiguration` Funzione in `intlayer`

## Descrizione:

La funzione `getConfiguration` recupera l'intera configurazione per l'applicazione `intlayer` estraendo le variabili ambientali. Questa funzione offre la flessibilità di utilizzare la stessa configurazione sia sul lato client che su quello server, garantendo coerenza in tutta l'applicazione.

---

## Parametri:

La funzione non accetta parametri. Invece, utilizza variabili ambientali per la configurazione.

### Restituisce:

- **Tipo**: `IntlayerConfig`
- **Descrizione**: Un oggetto contenente la configurazione completa per `intlayer`. La configurazione include le seguenti sezioni:

  - `internationalization`: Impostazioni relative alle localizzazioni e alla modalità rigorosa.
  - `middleware`: Impostazioni relative alla gestione degli URL e dei cookie.
  - `content`: Impostazioni relative ai file di contenuto, alle directory e ai modelli.
  - `editor`: Configurazioni specifiche per l'editor.

Consulta la [documentazione di configurazione di Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/it/configuration.md) per ulteriori dettagli.

---

## Esempio di Utilizzo:

### Recuperare la Configurazione Completa:

```typescript codeFormat="typescript"
import { getConfiguration } from "intlayer";

// Recupera la configurazione
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

// Recupera la configurazione
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

// Recupera la configurazione
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

### Estrazione di `availableLocales` e `defaultLocale`:

La sezione `internationalization` della configurazione fornisce impostazioni relative alle localizzazioni, come `locales` (locali disponibili) e `defaultLocale` (lingua di fallback).

```typescript codeFormat="typescript"
import { getConfiguration } from "intlayer";

// Estrae le impostazioni di internazionalizzazione
const { internationalization, middleware } = getConfiguration();
const { locales: availableLocales, defaultLocale } = internationalization;
const { cookieName } = middleware;

console.log(availableLocales); // Output esempio: ["en", "fr", "es"]
console.log(defaultLocale); // Output esempio: "en"
console.log(cookieName); // Output: "INTLAYER_LOCALE"
```

```javascript codeFormat="esm"
import { getConfiguration } from "intlayer";

// Estrae le impostazioni di internazionalizzazione
const { internationalization, middleware } = getConfiguration();
const { locales: availableLocales, defaultLocale } = internationalization;
const { cookieName } = middleware;

console.log(availableLocales); // Output esempio: ["en", "fr", "es"]
console.log(defaultLocale); // Output esempio: "en"
console.log(cookieName); // Output: "INTLAYER_LOCALE"
```

```javascript codeFormat="commonjs"
const { getConfiguration } = require("intlayer");

// Estrae le impostazioni di internazionalizzazione
const { internationalization, middleware } = getConfiguration();
const { locales: availableLocales, defaultLocale } = internationalization;
const { cookieName } = middleware;

console.log(availableLocales); // Output esempio: ["en", "fr", "es"]
console.log(defaultLocale); // Output esempio: "en"
console.log(cookieName); // Output: "INTLAYER_LOCALE"
```

## Note:

- Assicurati che tutte le variabili ambientali richieste siano impostate correttamente prima di chiamare questa funzione. Variabili mancanti causeranno errori durante l'inizializzazione.
- Questa funzione può essere utilizzata sia sul lato client che server, rendendola uno strumento versatile per la gestione delle configurazioni in modo unificato.

## Utilizzo nelle Applicazioni:

La funzione `getConfiguration` è un'utilità fondamentale per inizializzare e gestire la configurazione di un'applicazione `intlayer`. Fornendo accesso a impostazioni come localizzazioni, middleware e directory di contenuto, garantisce coerenza e scalabilità in applicazioni multilingue e orientate al contenuto.
