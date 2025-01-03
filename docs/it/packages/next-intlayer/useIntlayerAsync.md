# Integrazione di Next.js: Documentazione del Hook `useIntlayerAsync`

L'hook `useIntlayerAsync` estende la funzionalità di `useIntlayer` restituendo non solo dizionari pre-renderizzati ma anche recuperando aggiornamenti in modo asincrono, rendendolo ideale per applicazioni che aggiornano frequentemente i loro contenuti localizzati dopo il rendering iniziale.

## Panoramica

- **Caricamento Asincrono dei Dizionari:**  
  Sul lato client, `useIntlayerAsync` restituisce prima il dizionario locale pre-renderizzato (proprio come `useIntlayer`) e poi recupera e fonde in modo asincrono eventuali nuovi dizionari remoti disponibili.
- **Gestione dello Stato di Progressione:**  
  L'hook fornisce anche uno stato `isLoading`, che indica quando un dizionario remoto è in fase di recupero. Questo consente agli sviluppatori di visualizzare indicatori di caricamento o stati scheletro per una migliore esperienza utente.

## Configurazione dell'Ambiente

Intlayer fornisce un sistema di Content Source Management (CSM) senza testa che consente ai non sviluppatori di gestire e aggiornare i contenuti dell'applicazione senza sforzo. Utilizzando la dashboard intuitiva di Intlayer, il tuo team può modificare testo localizzato, immagini e altre risorse senza modificare direttamente il codice. Questo semplifica il processo di gestione dei contenuti, favorisce la collaborazione e garantisce che gli aggiornamenti possano essere effettuati rapidamente e facilmente.

Per iniziare con Intlayer, dovrai prima registrarti e ottenere un token di accesso su [https://intlayer.org/dashboard](https://intlayer.org/dashboard). Una volta ottenuti i tuoi riferimenti, aggiungili al tuo file di configurazione come mostrato di seguito:

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
const { type IntlayerConfig } = require("intlayer");

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

Dopo aver configurato le tue credenziali, puoi caricare un nuovo dizionario locale su Intlayer eseguendo:

```bash
npx intlayer push -d my-first-dictionary-key
```

Questo comando carica i tuoi dizionari di contenuto iniziali, rendendoli disponibili per il recupero asincrono e la modifica tramite la piattaforma Intlayer.

## Importazione di `useIntlayerAsync` in Next.js

Poiché `useIntlayerAsync` è destinato a componenti **lato client**, dovrai importarlo dallo stesso punto di ingresso del client di `useIntlayer`:

```tsx codeFormat="typescript"
"use client";

import { useIntlayerAsync } from "next-intlayer";
```

```javascript codeFormat="esm"
"use client";

import { useIntlayerAsync } from "next-intlayer";
```

```javascript codeFormat="commonjs"
"use client";

const { useIntlayerAsync } = require("next-intlayer");
```

Assicurati che il file di importazione sia annotato con `"use client"` in cima, se stai utilizzando il Router App di Next.js con componenti server e client separati.

## Parametri

1. **`key`**:  
   **Tipo**: `DictionaryKeys`  
   La chiave del dizionario utilizzata per identificare il blocco di contenuti localizzati. Questa chiave dovrebbe essere definita nei tuoi file di dichiarazione del contenuto.

2. **`locale`** (opzionale):  
   **Tipo**: `Locales`  
   La specifica locale che desideri targetizzare. Se omesso, l'hook utilizza la locale dal contesto del client.

3. **`isRenderEditor`** (opzionale, predefinito `true`):  
   **Tipo**: `boolean`  
   Determina se i contenuti devono essere pronti per il rendering con il sovrapposizione dell'editor di Intlayer. Se impostato su `false`, i dati del dizionario restituiti escluderanno funzionalità specifiche dell'editor.

## Valore di Ritorno

L'hook restituisce un oggetto dizionario contenente contenuti localizzati indicizzati per `key` e `locale`. Include anche un booleano `isLoading` che indica se un dizionario distante è attualmente in fase di recupero.

## Esempio di Utilizzo in Next.js

### Esempio di Componente Lato Client

```tsx fileName="src/components/AsyncClientComponentExample.tsx" codeFormat="typescript"
"use client";

import { useEffect, type FC } from "react";
import { useIntlayerAsync } from "next-intlayer";

export const AsyncClientComponentExample: FC = () => {
  const { title, description, isLoading } = useIntlayerAsync("async-component");

  useEffect(() => {
    if (isLoading) {
      console.log("Il contenuto è in caricamento...");
    }
  }, [isLoading]);

  return (
    <div>
      <h1>{title.value}</h1>
      <p>{description.value}</p>
    </div>
  );
};
```

```jsx fileName="src/components/AsyncClientComponentExample.mjx" codeFormat="esm"
"use client";

import { useEffect } from "react";
import { useIntlayerAsync } from "next-intlayer";

const AsyncClientComponentExample = () => {
  const { title, description, isLoading } = useIntlayerAsync("async-component");

  useEffect(() => {
    if (isLoading) {
      console.log("Il contenuto è in caricamento...");
    }
  }, [isLoading]);

  return (
    <div>
      <h1>{title.value}</h1>
      <p>{description.value}</p>
    </div>
  );
};
```

```jsx fileName="src/components/AsyncClientComponentExample.csx" codeFormat="commonjs"
"use client";

const { useEffect } = require("react");
const { useIntlayerAsync } = require("next-intlayer");

const AsyncClientComponentExample = () => {
  const { title, description, isLoading } = useIntlayerAsync("async-component");

  useEffect(() => {
    if (isLoading) {
      console.log("Il contenuto è in caricamento...");
    }
  }, [isLoading]);

  return (
    <div>
      <h1>{title.value}</h1>
      <p>{description.value}</p>
    </div>
  );
};
```

**Punti Chiave:**

- Al rendering iniziale, `title` e `description` provengono dal dizionario locale pre-renderizzato.
- Mentre `isLoading` è `true`, viene effettuata in background una richiesta remota per recuperare un dizionario aggiornato.
- Una volta completato il recupero, `title` e `description` vengono aggiornati con il contenuto più recente e `isLoading` torna a `false`.

## Gestione della Localizzazione degli Attributi

Come con `useIntlayer`, puoi recuperare valori di attributi localizzati per varie proprietà HTML (ad es., `alt`, `title`, `aria-label`):

```tsx
<img src={title.image.src.value} alt={title.image.alt.value} />
```

## File di Dichiarazione dei Contenuti

Tutte le chiavi di contenuto devono essere definite nei tuoi file di dichiarazione dei contenuti per garantire la sicurezza dei tipi e prevenire errori runtime. Questi file abilitano la convalida TypeScript, garantendo che tu faccia sempre riferimento a chiavi e locale esistenti.

Le istruzioni per impostare i file di dichiarazione dei contenuti sono disponibili [qui](https://github.com/aymericzip/intlayer/blob/main/docs/it/content_declaration/get_started.md).

## Ulteriori Informazioni

- **Editor Visivo di Intlayer:**  
  Integra con l'editor visivo di Intlayer per gestire e modificare contenuti direttamente dall'interfaccia utente. Maggiori dettagli [qui](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_editor.md).

---

**In sintesi**, `useIntlayerAsync` è un potente hook lato client progettato per migliorare l'esperienza utente e mantenere la freschezza del contenuto abbinando dizionari pre-renderizzati con aggiornamenti di dizionari asincroni. Sfruttando `isLoading` e dichiarazioni di contenuto basate su TypeScript, puoi integrare senza problemi contenuti dinamici e localizzati nelle tue applicazioni Next.js.
