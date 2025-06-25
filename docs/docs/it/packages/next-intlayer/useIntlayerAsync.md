---
docName: package__next-intlayer__useIntlayerAsync
url: https://intlayer.org/doc/packages/next-intlayer/useIntlayerAsync
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/next-intlayer/useIntlayerAsync.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: Documentazione del hook useIntlayerAsync | next-intlayer
description: Scopri come utilizzare il hook useIntlayerAsync per il pacchetto next-intlayer
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

# Integrazione Next.js: Documentazione del hook `useIntlayerAsync`

Il hook `useIntlayerAsync` estende la funzionalità di `useIntlayer` non solo restituendo dizionari pre-renderizzati, ma anche recuperando aggiornamenti in modo asincrono, rendendolo ideale per applicazioni che aggiornano frequentemente i loro contenuti localizzati dopo il rendering iniziale.

## Panoramica

- **Caricamento Asincrono dei Dizionari:**  
  Sul lato client, `useIntlayerAsync` restituisce inizialmente il dizionario della lingua pre-renderizzato (come `useIntlayer`) e successivamente recupera e unisce asincronamente eventuali nuovi dizionari remoti disponibili.
- **Gestione dello Stato di Progresso:**  
  Il hook fornisce anche uno stato `isLoading`, che indica quando un dizionario remoto è in fase di recupero. Questo consente agli sviluppatori di mostrare indicatori di caricamento o stati scheletrici per un'esperienza utente più fluida.

## Configurazione dell'Ambiente

Intlayer fornisce un sistema di Content Source Management (CSM) senza testa che consente ai non sviluppatori di gestire e aggiornare i contenuti delle applicazioni senza problemi. Utilizzando il dashboard intuitivo di Intlayer, il tuo team può modificare testi localizzati, immagini e altre risorse senza modificare direttamente il codice. Questo semplifica il processo di gestione dei contenuti, favorisce la collaborazione e garantisce che gli aggiornamenti possano essere effettuati rapidamente e facilmente.

Per iniziare con Intlayer, è necessario registrarsi e ottenere un token di accesso su [https://intlayer.org/dashboard](https://intlayer.org/dashboard). Una volta ottenute le credenziali, aggiungile al file di configurazione come mostrato di seguito:

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

Dopo aver configurato le credenziali, puoi caricare un nuovo dizionario di lingua su Intlayer eseguendo:

```bash
npx intlayer dictionary push -d my-first-dictionary-key
```

Questo comando carica i tuoi dizionari di contenuti iniziali, rendendoli disponibili per il recupero asincrono e la modifica tramite la piattaforma Intlayer.

## Importazione di `useIntlayerAsync` in Next.js

Poiché `useIntlayerAsync` è destinato ai componenti **client-side**, lo importerai dallo stesso punto di ingresso client di `useIntlayer`:

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

Assicurati che il file di importazione sia annotato con `"use client"` nella parte superiore, se stai utilizzando il Router App di Next.js con componenti server e client separati.

## Parametri

1. **`key`**:  
   **Tipo**: `DictionaryKeys`  
   La chiave del dizionario utilizzata per identificare il blocco di contenuto localizzato. Questa chiave deve essere definita nei file di dichiarazione dei contenuti.

2. **`locale`** (opzionale):  
   **Tipo**: `Locales`  
   La lingua specifica che desideri targetizzare. Se omessa, il hook utilizza la lingua dal contesto client.

3. **`isRenderEditor`** (opzionale, predefinito `true`):  
   **Tipo**: `boolean`  
   Determina se il contenuto deve essere pronto per il rendering con la sovrapposizione dell'editor Intlayer. Se impostato su `false`, i dati del dizionario restituiti escluderanno le funzionalità specifiche dell'editor.

## Valore Restituito

Il hook restituisce un oggetto dizionario contenente contenuti localizzati indicizzati da `key` e `locale`. Include anche un booleano `isLoading` che indica se un dizionario remoto è attualmente in fase di recupero.

## Esempio di Utilizzo in Next.js

### Esempio di Componente Client-Side

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

- Al rendering iniziale, `title` e `description` provengono dal dizionario della lingua pre-renderizzato.
- Mentre `isLoading` è `true`, viene effettuata una richiesta remota in background per recuperare un dizionario aggiornato.
- Una volta completato il recupero, `title` e `description` vengono aggiornati con i contenuti più recenti e `isLoading` torna a `false`.

## Gestione della Localizzazione degli Attributi

Come con `useIntlayer`, puoi recuperare valori di attributi localizzati per varie proprietà HTML (ad esempio, `alt`, `title`, `aria-label`):

```tsx
<img src={title.image.src.value} alt={title.image.alt.value} />
```

## File dei Dizionari

Tutte le chiavi di contenuto devono essere definite nei file di dichiarazione dei contenuti per garantire la sicurezza dei tipi e prevenire errori a runtime. Questi file abilitano la validazione TypeScript, assicurandoti di fare sempre riferimento a chiavi e lingue esistenti.

Le istruzioni per configurare i file di dichiarazione dei contenuti sono disponibili [qui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/get_started.md).

## Ulteriori Informazioni

- **Editor Visivo Intlayer:**  
  Integra con l'editor visivo Intlayer per gestire e modificare i contenuti direttamente dall'interfaccia utente. Maggiori dettagli [qui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_visual_editor.md).

---

**In sintesi**, `useIntlayerAsync` è un potente hook client-side progettato per migliorare l'esperienza utente e mantenere freschi i contenuti combinando dizionari pre-renderizzati con aggiornamenti asincroni. Sfruttando `isLoading` e le dichiarazioni di contenuti basate su TypeScript, puoi integrare senza problemi contenuti dinamici e localizzati nelle tue applicazioni Next.js.
