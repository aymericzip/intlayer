# Integrazione React: Documentazione del Hook `useIntlayerAsync`

L'hook `useIntlayerAsync` estende la funzionalità di `useIntlayer` restituendo non solo dizionari pre-renderizzati, ma anche recuperando aggiornamenti in modo asincrono, rendendolo ideale per applicazioni che aggiornano frequentemente i loro contenuti localizzati dopo il render iniziale.

## Panoramica

- **Caricamento Asincrono dei Dizionari:**  
  Alla prima installazione, `useIntlayerAsync` restituisce prima qualsiasi dizionario locale pre-fetchato o staticamente incluso (proprio come farebbe `useIntlayer`) e poi recupera e unisce in modo asincrono eventuali nuovi dizionari remoti disponibili.
- **Gestione dello Stato di Progresso:**  
  L'hook fornisce anche uno stato `isLoading`, che indica quando un dizionario remoto viene recuperato. Questo consente agli sviluppatori di visualizzare indicatori di caricamento o stati di skeleton per un'esperienza utente più fluida.

## Configurazione dell'Ambiente

Intlayer fornisce un sistema di Gestione Contenuti (CSM) headless che consente ai non sviluppatori di gestire e aggiornare i contenuti delle applicazioni senza problemi. Utilizzando il dashboard intuitivo di Intlayer, il vostro team può modificare testi localizzati, immagini e altre risorse senza modificare direttamente il codice. Questo semplifica il processo di gestione dei contenuti, promuove la collaborazione e garantisce che gli aggiornamenti possano essere effettuati rapidamente e facilmente.

Per iniziare con Intlayer:

1. **Registrati e ottieni un token di accesso** su [https://intlayer.org/dashboard](https://intlayer.org/dashboard).
2. **Aggiungi le credenziali al tuo file di configurazione:**  
   Nel tuo progetto React, configura il client di Intlayer con le tue credenziali:

   ```typescript fileName="intlayer.config.ts" codeFormat="typescript"
   import type { IntlayerConfig } from "intlayer";

   export default {
     // ...
     editor: {
       clientId: process.env.INTLAYER_CLIENT_ID,
       clientSecret: process.env.INTLAYER_CLIENT_SECRET,
     },
   } satisfies IntlayerConfig;
   ```

   ```javascript fileName="intlayer.config.mjs" codeFormat="esm"
   import { type IntlayerConfig } from "intlayer";

   /** @type {import('intlayer').IntlayerConfig} */
   const config = {
     // ...
     editor: {
       clientId: process.env.INTLAYER_CLIENT_ID,
       clientSecret: process.env.INTLAYER_CLIENT_SECRET,
     },
   };

   export default config;
   ```

   ```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
   /** @type {import('intlayer').IntlayerConfig} */
   const config = {
     // ...
     editor: {
       clientId: process.env.INTLAYER_CLIENT_ID,
       clientSecret: process.env.INTLAYER_CLIENT_SECRET,
     },
   };

   module.exports = config;
   ```

3. **Carica un nuovo dizionario locale su Intlayer:**

   ```bash
   npx intlayer dictionary push -d my-first-dictionary-key
   ```

   Questo comando carica i tuoi dizionari di contenuto iniziali, rendendoli disponibili per il recupero asincrono e la modifica attraverso la piattaforma Intlayer.

## Importazione di `useIntlayerAsync` in React

Nei tuoi componenti React, importa `useIntlayerAsync`:

```ts codeFormat="typescript"
import { useIntlayerAsync } from "react-intlayer";
```

```js codeFormat="esm"
import { useIntlayerAsync } from "react-intlayer";
```

```js codeFormat="commonjs"
const { useIntlayerAsync } = require("react-intlayer");
```

## Parametri

1. **`key`**:  
   **Tipo**: `DictionaryKeys`  
   La chiave del dizionario utilizzata per identificare il blocco di contenuto localizzato. Questa chiave deve essere definita nei tuoi file di dichiarazione dei contenuti.

2. **`locale`** (opzionale):  
   **Tipo**: `Locales`  
   Il locale specifico che desideri targetizzare. Se omesso, l'hook utilizza il locale dal contesto attuale di Intlayer.

3. **`isRenderEditor`** (opzionale, predefinito a `true`):  
   **Tipo**: `boolean`  
   Determina se il contenuto deve essere pronto per il rendering con sovrapposizione dell'editor di Intlayer. Se impostato a `false`, i dati del dizionario restituiti escluderanno le funzionalità specifiche dell'editor.

## Valore di Ritorno

L'hook restituisce un oggetto dizionario contenente contenuti localizzati identificati da `key` e `locale`. Include anche un booleano `isLoading` che indica se un dizionario remoto è attualmente in fase di recupero.

## Esempio di Utilizzo in un Componente React

```tsx fileName="src/components/ComponentExample.tsx" codeFormat="typescript"
import { useEffect, type FC } from "react";
import { useIntlayerAsync } from "react-intlayer";

export const ComponentExample: FC = () => {
  const { title, description, isLoading } = useIntlayerAsync("async-component");

  useEffect(() => {
    if (isLoading) {
      console.log("Il contenuto sta caricando...");
    }
  }, [isLoading]);

  return (
    <div>
      {isLoading ? (
        <div>
          <h1>Caricamento…</h1>
          <p>Attendere mentre i contenuti vengono aggiornati.</p>
        </div>
      ) : (
        <div>
          <h1>{title.value}</h1>
          <p>{description.value}</p>
        </div>
      )}
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.mjx" codeFormat="esm"
import { useEffect } from "react";
import { useIntlayerAsync } from "react-intlayer";

const ComponentExample = () => {
  const { title, description, isLoading } = useIntlayerAsync("async-component");

  useEffect(() => {
    if (isLoading) {
      console.log("Il contenuto sta caricando...");
    }
  }, [isLoading]);

  return (
    <div>
      {isLoading ? (
        <div>
          <h1>Caricamento…</h1>
          <p>Attendere mentre i contenuti vengono aggiornati.</p>
        </div>
      ) : (
        <div>
          <h1>{title.value}</h1>
          <p>{description.value}</p>
        </div>
      )}
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.csx" codeFormat="commonjs"
const { useEffect } = require("react");
const { useIntlayerAsync } = require("react-intlayer");

const ComponentExample = () => {
  const { title, description, isLoading } = useIntlayerAsync("async-component");

  useEffect(() => {
    if (isLoading) {
      console.log("Il contenuto sta caricando...");
    }
  }, [isLoading]);

  return (
    <div>
      {isLoading ? (
        <div>
          <h1>Caricamento…</h1>
          <p>Attendere mentre i contenuti vengono aggiornati.</p>
        </div>
      ) : (
        <div>
          <h1>{title.value}</h1>
          <p>{description.value}</p>
        </div>
      )}
    </div>
  );
};
```

**Punti Chiave:**

- Alla prima renderizzazione, `title` e `description` provengono dal dizionario locale pre-fetchato o staticamente incorporato.
- Mentre `isLoading` è `true`, una richiesta di background recupera un dizionario aggiornato.
- Una volta completato il recupero, `title` e `description` vengono aggiornati con i contenuti più recenti, e `isLoading` torna a `false`.

## Gestione della Localizzazione degli Attributi

Puoi anche recuperare valori di attributo localizzati per varie proprietà HTML (ad es., `alt`, `title`, `aria-label`):

```jsx
<img src={title.image.src.value} alt={title.image.alt.value} />
```

## File di Dichiarazione dei Contenuti

Tutti i tasti di contenuto devono essere definiti nei tuoi file di dichiarazione dei contenuti per sicurezza di tipo e per prevenire errori a runtime. Questi file abilitano la validazione TypeScript, assicurando che tu faccia sempre riferimento a chiavi e locali esistenti.

Le istruzioni per la configurazione dei file di dichiarazione dei contenuti sono disponibili [qui](https://github.com/aymericzip/intlayer/blob/main/docs/it/dictionary/get_started.md).

## Ulteriori Informazioni

- **Editor Visivo di Intlayer:**  
  Integra l'editor visivo di Intlayer per gestire e modificare contenuti direttamente dall'interfaccia utente. Maggiori dettagli [qui](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_editor.md).

---

**In sintesi**, `useIntlayerAsync` è un potente hook React progettato per migliorare l'esperienza utente e mantenere la freschezza dei contenuti unendo dizionari pre-renderizzati o pre-fetchati con aggiornamenti di dizionari asincroni. Sfruttando `isLoading` e dichiarazioni di contenuti basate su TypeScript, puoi integrare senza problemi contenuti dinamici e localizzati nelle tue applicazioni React.
