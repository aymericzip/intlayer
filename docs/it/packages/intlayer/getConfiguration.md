# Documentazione: `getConfiguration` funzione in `intlayer`

## Descrizione:

La funzione `getConfiguration` recupera l'intera configurazione per l'applicazione `intlayer` estraendo le variabili ambientali. Questa funzione offre la flessibilità di utilizzare la stessa configurazione sia sul lato client che sul lato server, garantendo coerenza in tutta l'applicazione.

---

## Parametri:

La funzione non accetta alcun parametro. Invece, utilizza variabili ambientali per la configurazione.

### Restituisce:

- **Tipo**: `IntlayerConfig`
- **Descrizione**: Un oggetto contenente la configurazione completa per `intlayer`. La configurazione include le seguenti sezioni:

  - `internationalization`: Impostazioni relative a localizzazioni e modalità rigida.
  - `middleware`: Impostazioni relative alla gestione di URL e cookie.
  - `content`: Impostazioni relative a file di contenuto, directory e schemi.
  - `editor`: Configurazioni specifiche dell'editor.

Vedi [documentazione sulla configurazione di Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/it/configuration.md) per ulteriori dettagli.

---

## Esempio di Utilizzo:

### Recuperare la Configurazione Completa:

```typescript
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

### Estrazione di `availableLocales` e `defaultLocale`:

La sezione `internationalization` della configurazione fornisce impostazioni relative alle localizzazioni come `locales` (località disponibili) e `defaultLocale` (lingua di fallback).

```typescript
const { internationalization, middleware } = getConfiguration();
const { locales: availableLocales, defaultLocale } = internationalization;
const { cookieName } = middleware;

console.log(availableLocales); // Esempio di output: ["en", "fr", "es"]
console.log(defaultLocale); // Esempio di output: "en"
console.log(cookieName); // Output: "INTLAYER_LOCALE"
```

## Note:

- Assicurati che tutte le variabili ambientali richieste siano impostate correttamente prima di chiamare questa funzione. Le variabili mancanti causeranno errori durante l'inizializzazione.
- Questa funzione può essere utilizzata sia sul lato client che sul lato server, rendendola uno strumento versatile per la gestione delle configurazioni in modo unificato.

## Utilizzo nelle Applicazioni:

La funzione `getConfiguration` è un'utility fondamentale per inizializzare e gestire la configurazione di un'applicazione `intlayer`. Fornendo accesso a impostazioni come localizzazioni, middleware e directory di contenuto, garantisce coerenza e scalabilità in applicazioni multilingue e orientate ai contenuti.
