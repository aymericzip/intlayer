---
docName: package__react-intlayer__useIntlayerAsync
url: https://intlayer.org/doc/packages/react-intlayer/useIntlayerAsync
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/react-intlayer/useIntlayerAsync.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Documentazione del hook useIntlayerAsync | react-intlayer
description: Scopri come utilizzare il hook useIntlayerAsync per il pacchetto react-intlayer
keywords:
  - useIntlayerAsync
  - dizionario
  - chiave
  - Intlayer
  - Internazionalizzazione
  - Documentazione
  - Next.js
  - JavaScript
  - React
---

# Integrazione React: Documentazione del Hook `useIntlayerAsync`

Il hook `useIntlayerAsync` estende la funzionalità di `useIntlayer` non solo restituendo dizionari pre-renderizzati, ma anche recuperando aggiornamenti in modo asincrono, rendendolo ideale per applicazioni che aggiornano frequentemente i loro contenuti localizzati dopo il rendering iniziale.

## Panoramica

- **Caricamento Asincrono dei Dizionari:**  
  Al montaggio iniziale, `useIntlayerAsync` restituisce prima qualsiasi dizionario locale pre-recuperato o staticamente incluso (proprio come farebbe `useIntlayer`) e poi recupera e unisce asincronamente eventuali nuovi dizionari remoti disponibili.
- **Gestione dello Stato di Avanzamento:**  
  Il hook fornisce anche uno stato `isLoading`, che indica quando un dizionario remoto è in fase di recupero. Questo consente agli sviluppatori di mostrare indicatori di caricamento o stati scheletro per un'esperienza utente più fluida.

## Configurazione dell'Ambiente

Intlayer fornisce un sistema di gestione delle sorgenti di contenuto (CSM) senza testa che consente ai non sviluppatori di gestire e aggiornare i contenuti dell'applicazione senza problemi. Utilizzando il dashboard intuitivo di Intlayer, il tuo team può modificare testi localizzati, immagini e altre risorse senza modificare direttamente il codice. Questo semplifica il processo di gestione dei contenuti, favorisce la collaborazione e garantisce che gli aggiornamenti possano essere effettuati rapidamente e facilmente.

Per iniziare con Intlayer:

1. **Registrati e ottieni un token di accesso** su [https://intlayer.org/dashboard](https://intlayer.org/dashboard).
2. **Aggiungi le credenziali al tuo file di configurazione:**  
   Nel tuo progetto React, configura il client Intlayer con le tue credenziali:

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

   Questo comando carica i tuoi dizionari di contenuti iniziali, rendendoli disponibili per il recupero asincrono e la modifica tramite la piattaforma Intlayer.

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
   La chiave del dizionario utilizzata per identificare il blocco di contenuto localizzato. Questa chiave dovrebbe essere definita nei tuoi file di dichiarazione dei contenuti.

2. **`locale`** (opzionale):  
   **Tipo**: `Locales`  
   La specifica localizzazione che vuoi mirare. Se omesso, il hook utilizza la localizzazione dal contesto corrente di Intlayer.

3. **`isRenderEditor`** (opzionale, predefinito `true`):  
   **Tipo**: `boolean`  
   Determina se il contenuto dovrebbe essere pronto per il rendering con la sovrapposizione dell'editor di Intlayer. Se impostato su `false`, i dati del dizionario restituiti escluderanno le funzionalità specifiche dell'editor.

## Valore Restituito

Il hook restituisce un oggetto dizionario contenente contenuti localizzati indicizzati da `key` e `locale`. Include anche un booleano `isLoading` che indica se un dizionario remoto è attualmente in fase di recupero.

## Esempio di Utilizzo in un Componente React

```tsx fileName="src/components/ComponentExample.tsx" codeFormat="typescript"
import { useEffect, type FC } from "react";
import { useIntlayerAsync } from "react-intlayer";

export const ComponentExample: FC = () => {
  const { title, description, isLoading } = useIntlayerAsync("async-component");

  useEffect(() => {
    if (isLoading) {
      console.log("Il contenuto è in caricamento...");
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
      console.log("Il contenuto è in caricamento...");
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
      console.log("Il contenuto è in caricamento...");
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

- Al rendering iniziale, `title` e `description` provengono dal dizionario locale pre-recuperato o staticamente incluso.
- Mentre `isLoading` è `true`, una richiesta in background recupera un dizionario aggiornato.
- Una volta completato il recupero, `title` e `description` vengono aggiornati con i contenuti più recenti e `isLoading` torna a `false`.

## Gestione della Localizzazione degli Attributi

Puoi anche recuperare valori di attributi localizzati per varie proprietà HTML (es. `alt`, `title`, `aria-label`):

```jsx
<img src={title.image.src.value} alt={title.image.alt.value} />
```

## File dei Dizionari

Tutte le chiavi di contenuto devono essere definite nei tuoi file di dichiarazione dei contenuti per garantire la sicurezza dei tipi e prevenire errori a runtime. Questi file abilitano la validazione TypeScript, assicurandoti di fare sempre riferimento a chiavi e localizzazioni esistenti.

Le istruzioni per configurare i file di dichiarazione dei contenuti sono disponibili [qui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/get_started.md).

## Ulteriori Informazioni

- **Editor Visivo di Intlayer:**  
  Integra con l'editor visivo di Intlayer per gestire e modificare i contenuti direttamente dall'interfaccia utente. Maggiori dettagli [qui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_visual_editor.md).

---

**In sintesi**, `useIntlayerAsync` è un potente hook React progettato per migliorare l'esperienza utente e mantenere i contenuti aggiornati unendo dizionari pre-renderizzati o pre-recuperati con aggiornamenti asincroni. Sfruttando `isLoading` e le dichiarazioni di contenuto basate su TypeScript, puoi integrare senza problemi contenuti dinamici e localizzati nelle tue applicazioni React.
