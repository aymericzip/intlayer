---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Documentazione Hook useIntlayerAsync | next-intlayer
description: Scopri come utilizzare l'hook useIntlayerAsync per il pacchetto next-intlayer
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
slugs:
  - doc
  - packages
  - next-intlayer
  - useIntlayerAsync
---

# Integrazione Next.js: Documentazione Hook `useIntlayerAsync`

L'hook `useIntlayerAsync` estende la funzionalità di `useIntlayer` restituendo non solo i dizionari pre-renderizzati, ma anche recuperando aggiornamenti in modo asincrono, rendendolo ideale per applicazioni che aggiornano frequentemente i loro contenuti localizzati dopo il rendering iniziale.

## Panoramica

- **Caricamento asincrono del dizionario:**  
  Sul lato client, `useIntlayerAsync` restituisce prima il dizionario locale pre-renderizzato (proprio come `useIntlayer`) e poi recupera e unisce in modo asincrono eventuali nuovi dizionari remoti disponibili.
- **Gestione dello stato di avanzamento:**  
  L'hook fornisce anche uno stato `isLoading`, che indica quando un dizionario remoto è in fase di recupero. Questo permette agli sviluppatori di mostrare indicatori di caricamento o stati scheletro per un'esperienza utente più fluida.

## Configurazione dell'ambiente

Intlayer fornisce un sistema di Content Source Management (CSM) headless che consente anche ai non sviluppatori di gestire e aggiornare i contenuti dell'applicazione in modo fluido. Utilizzando la dashboard intuitiva di Intlayer, il tuo team può modificare testi localizzati, immagini e altre risorse senza dover intervenire direttamente sul codice. Questo semplifica il processo di gestione dei contenuti, favorisce la collaborazione e garantisce che gli aggiornamenti possano essere effettuati rapidamente e facilmente.

Per iniziare con Intlayer, è necessario prima registrarsi e ottenere un token di accesso nella [dashboard](https://intlayer.org/dashboard). Una volta ottenute le credenziali, aggiungile al file di configurazione come mostrato di seguito:

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

Dopo aver configurato le tue credenziali, puoi inviare un nuovo dizionario di localizzazione a Intlayer eseguendo:

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

Assicurati che il file di importazione sia annotato con `"use client"` in cima, se stai utilizzando Next.js App Router con componenti server e client separati.

## Parametri

1. **`key`**:  
   **Tipo**: `DictionaryKeys`  
   La chiave del dizionario utilizzata per identificare il blocco di contenuto localizzato. Questa chiave dovrebbe essere definita nei tuoi file di dichiarazione dei contenuti.

2. **`locale`** (opzionale):  
   **Tipo**: `Locales`  
   La specifica locale che vuoi utilizzare. Se omesso, l'hook utilizza la locale dal contesto client.

3. **`isRenderEditor`** (opzionale, default a `true`):  
   **Tipo**: `boolean`  
   Determina se il contenuto deve essere pronto per il rendering con la sovrapposizione dell'editor Intlayer. Se impostato su `false`, i dati del dizionario restituiti escluderanno le funzionalità specifiche dell'editor.

## Valore di Ritorno

L'hook restituisce un oggetto dizionario contenente il contenuto localizzato identificato da `key` e `locale`. Include anche un booleano `isLoading` che indica se un dizionario remoto è attualmente in fase di recupero.

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
      console.log("Il contenuto si sta caricando...");
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
      console.log("Il contenuto si sta caricando...");
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
      console.log("Il contenuto si sta caricando...");
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

**Punti chiave:**

- Al rendering iniziale, `title` e `description` provengono dal dizionario della localizzazione prerenderizzata.
- Mentre `isLoading` è `true`, viene effettuata in background una richiesta remota per recuperare un dizionario aggiornato.
- Una volta completato il recupero, `title` e `description` vengono aggiornati con il contenuto più recente, e `isLoading` torna a `false`.

## Gestione della Localizzazione degli Attributi

Come con `useIntlayer`, puoi recuperare valori localizzati per attributi HTML vari (ad esempio, `alt`, `title`, `aria-label`):

```tsx
<img src={title.image.src.value} alt={title.image.alt.value} />
```

## File del Dizionario

Tutte le chiavi di contenuto devono essere definite nei tuoi file di dichiarazione del contenuto per garantire la sicurezza dei tipi e prevenire errori a runtime. Questi file abilitano la validazione TypeScript, assicurandoti di fare sempre riferimento a chiavi e localizzazioni esistenti.

Istruzioni per la configurazione dei file di dichiarazione dei contenuti sono disponibili [qui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/get_started.md).

## Ulteriori Informazioni

- **Editor Visivo Intlayer:**  
  Integra l'editor visivo Intlayer per gestire e modificare i contenuti direttamente dall'interfaccia utente. Maggiori dettagli [qui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_visual_editor.md).

---

**In sintesi**, `useIntlayerAsync` è un potente hook lato client progettato per migliorare l'esperienza utente e mantenere la freschezza dei contenuti combinando dizionari pre-renderizzati con aggiornamenti asincroni dei dizionari. Sfruttando `isLoading` e le dichiarazioni di contenuto basate su TypeScript, puoi integrare senza soluzione di continuità contenuti dinamici e localizzati nelle tue applicazioni Next.js.

## Cronologia della documentazione

- 5.5.10 - 2025-06-29: Inizio cronologia
