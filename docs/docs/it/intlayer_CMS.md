---
docName: intlayer_CMS
url: https://intlayer.org/doc/concept/cms
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: CMS Intlayer | Esterna il tuo contenuto nel CMS Intlayer
description: Esterna il tuo contenuto nel CMS Intlayer per delegare la gestione del tuo contenuto al tuo team.
keywords:
  - CMS
  - Editor visuale
  - Internazionalizzazione
  - Documentazione
  - Intlayer
  - Next.js
  - JavaScript
  - React
---

# Intlayer Content Management System (CMS) Documentazione

<iframe title="Visual Editor + CMS for Your Web App: Intlayer Explained" class="m-auto aspect-[16/9] w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/UDDTnirwi_4?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

Il CMS di Intlayer è un'applicazione che consente di esternalizzare i contenuti di un progetto Intlayer.

Per questo, Intlayer introduce il concetto di 'dizionari remoti'.

![Interfaccia CMS di Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/CMS.png)

## Comprendere i dizionari remoti

Intlayer distingue tra dizionari 'locali' e 'remoti'.

- Un dizionario 'locale' è un dizionario dichiarato nel tuo progetto Intlayer. Come il file di dichiarazione di un pulsante o della barra di navigazione. Esternalizzare il contenuto non ha senso in questo caso perché il contenuto non dovrebbe cambiare spesso.

- Un dizionario 'remoto' è un dizionario gestito tramite il CMS di Intlayer. Potrebbe essere utile per consentire al tuo team di gestire direttamente i contenuti sul tuo sito web e mira anche a utilizzare funzionalità di test A/B e ottimizzazione automatica SEO.

## Editor visivo vs CMS

L'[Editor Visivo di Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_visual_editor.md) è uno strumento che consente di gestire i contenuti in un editor visivo per i dizionari locali. Una volta apportata una modifica, il contenuto verrà sostituito nella base di codice. Ciò significa che l'applicazione verrà ricostruita e la pagina verrà ricaricata per visualizzare il nuovo contenuto.

Al contrario, il CMS di Intlayer è uno strumento che consente di gestire i contenuti in un editor visivo per i dizionari remoti. Una volta apportata una modifica, il contenuto **non** influirà sulla base di codice. E il sito web visualizzerà automaticamente il contenuto modificato.

## Integrazione

Per maggiori dettagli su come installare il pacchetto, consulta la sezione pertinente qui sotto:

### Integrazione con Next.js

Per l'integrazione con Next.js, consulta la [guida all'installazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_nextjs_15.md).

### Integrazione con Create React App

Per l'integrazione con Create React App, consulta la [guida all'installazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_create_react_app.md).

### Integrazione con Vite + React

Per l'integrazione con Vite + React, consulta la [guida all'installazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_vite+react.md).

## Configurazione

Nel file di configurazione di Intlayer, puoi personalizzare le impostazioni del CMS:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... altre impostazioni di configurazione
  editor: {
    /**
     * Obbligatorio
     *
     * L'URL dell'applicazione.
     * Questo è l'URL mirato dall'editor visivo.
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,

    /**
     * Obbligatorio
     *
     * Client ID e client secret sono necessari per abilitare l'editor.
     * Consentono di identificare l'utente che sta modificando il contenuto.
     * Possono essere ottenuti creando un nuovo client nella Dashboard di Intlayer - Progetti (https://intlayer.org/dashboard/projects).
     * clientId: process.env.INTLAYER_CLIENT_ID,
     * clientSecret: process.env.INTLAYER_CLIENT_SECRET,
     */
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,

    /**
     * Opzionale
     *
     * Nel caso in cui si stia ospitando autonomamente il CMS di Intlayer, è possibile impostare l'URL del CMS.
     *
     * L'URL del CMS di Intlayer.
     * Per impostazione predefinita, è impostato su https://intlayer.org
     */
    cmsURL: process.env.INTLAYER_CMS_URL,

    /**
     * Opzionale
     *
     * Nel caso in cui si stia ospitando autonomamente il CMS di Intlayer, è possibile impostare l'URL del backend.
     *
     * L'URL del CMS di Intlayer.
     * Per impostazione predefinita, è impostato su https://back.intlayer.org
     */
    backendURL: process.env.INTLAYER_BACKEND_URL,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... altre impostazioni di configurazione
  editor: {
    /**
     * Obbligatorio
     *
     * L'URL dell'applicazione.
     * Questo è l'URL mirato dall'editor visivo.
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,

    /**
     * Obbligatorio
     *
     * Client ID e client secret sono necessari per abilitare l'editor.
     * Consentono di identificare l'utente che sta modificando il contenuto.
     * Possono essere ottenuti creando un nuovo client nella Dashboard di Intlayer - Progetti (https://intlayer.org/dashboard/projects).
     * clientId: process.env.INTLAYER_CLIENT_ID,
     * clientSecret: process.env.INTLAYER_CLIENT_SECRET,
     */
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,

    /**
     * Opzionale
     *
     * Nel caso in cui si stia ospitando autonomamente il CMS di Intlayer, è possibile impostare l'URL del CMS.
     *
     * L'URL del CMS di Intlayer.
     * Per impostazione predefinita, è impostato su https://intlayer.org
     */
    cmsURL: process.env.INTLAYER_CMS_URL,

    /**
     * Opzionale
     *
     * Nel caso in cui si stia ospitando autonomamente il CMS di Intlayer, è possibile impostare l'URL del backend.
     *
     * L'URL del CMS di Intlayer.
     * Per impostazione predefinita, è impostato su https://back.intlayer.org
     */
    backendURL: process.env.INTLAYER_BACKEND_URL,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... altre impostazioni di configurazione
  editor: {
    /**
     * Obbligatorio
     *
     * L'URL dell'applicazione.
     * Questo è l'URL mirato dall'editor visivo.
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,

    /**
     * Obbligatorio
     *
     * Client ID e client secret sono necessari per abilitare l'editor.
     * Consentono di identificare l'utente che sta modificando il contenuto.
     * Possono essere ottenuti creando un nuovo client nella Dashboard di Intlayer - Progetti (https://intlayer.org/dashboard/projects).
     * clientId: process.env.INTLAYER_CLIENT_ID,
     * clientSecret: process.env.INTLAYER_CLIENT_SECRET,
     */
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,

    /**
     * Opzionale
     *
     * Nel caso in cui si stia ospitando autonomamente il CMS di Intlayer, è possibile impostare l'URL del CMS.
     *
     * L'URL del CMS di Intlayer.
     * Per impostazione predefinita, è impostato su https://intlayer.org
     */
    cmsURL: process.env.INTLAYER_CMS_URL,

    /**
     * Opzionale
     *
     * Nel caso in cui si stia ospitando autonomamente il CMS di Intlayer, è possibile impostare l'URL del backend.
     *
     * L'URL del CMS di Intlayer.
     * Per impostazione predefinita, è impostato su https://back.intlayer.org
     */
    backendURL: process.env.INTLAYER_BACKEND_URL,
  },
};

module.exports = config;
```

> Se non hai un client ID e un client secret, puoi ottenerli creando un nuovo client nella [Dashboard di Intlayer - Progetti](https://intlayer.org/dashboard/projects).

> Per vedere tutti i parametri disponibili, consulta la [documentazione di configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md).

## Utilizzo del CMS

### Carica la tua configurazione

Per configurare il CMS di Intlayer, puoi utilizzare i comandi della [CLI di Intlayer](https://github.com/aymericzip/intlayer/tree/main/docs/it/intlayer_cli.md).

```bash
npx intlayer config push
```

> Se utilizzi variabili di ambiente nel tuo file di configurazione `intlayer.config.ts`, puoi specificare l'ambiente desiderato utilizzando l'argomento `--env`:

```bash
npx intlayer config push --env production
```

Questo comando carica la tua configurazione nel CMS di Intlayer.

### Carica un dizionario

Per trasformare i tuoi dizionari locali in un dizionario remoto, puoi utilizzare i comandi della [CLI di Intlayer](https://github.com/aymericzip/intlayer/tree/main/docs/it/intlayer_cli.md).

```bash
npx intlayer dictionary push -d my-first-dictionary-key
```

> Se utilizzi variabili di ambiente nel tuo file di configurazione `intlayer.config.ts`, puoi specificare l'ambiente desiderato utilizzando l'argomento `--env`:

```bash
npx intlayer dictionary push -d my-first-dictionary-key --env production
```

Questo comando carica i tuoi dizionari di contenuti iniziali, rendendoli disponibili per il recupero asincrono e la modifica tramite la piattaforma Intlayer.

### Modifica il dizionario

Successivamente, sarai in grado di visualizzare e gestire il tuo dizionario nel [CMS di Intlayer](https://intlayer.org/dashboard/content).

## Hot reloading

Il CMS di Intlayer è in grado di ricaricare automaticamente i dizionari quando viene rilevata una modifica.

Senza il ricaricamento automatico, sarà necessaria una nuova build dell'applicazione per visualizzare il nuovo contenuto.

Attivando la configurazione [`hotReload`](https://intlayer.org/doc/concept/configuration#editor-configuration), l'applicazione sostituirà automaticamente il contenuto aggiornato quando rilevato.

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... altre impostazioni di configurazione
  editor: {
    // ... altre impostazioni di configurazione

    /**
     * Indica se l'applicazione dovrebbe ricaricare automaticamente le configurazioni locali quando viene rilevata una modifica.
     * Ad esempio, quando viene aggiunto o aggiornato un nuovo dizionario, l'applicazione aggiornerà il contenuto da visualizzare nella pagina.
     *
     * Poiché il ricaricamento automatico richiede una connessione continua al server, è disponibile solo per i clienti del piano `enterprise`.
     *
     * Predefinito: false
     */
    hotReload: true,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... altre impostazioni di configurazione
  editor: {
    // ... altre impostazioni di configurazione

    /**
     * Indica se l'applicazione dovrebbe ricaricare automaticamente le configurazioni locali quando viene rilevata una modifica.
     * Ad esempio, quando viene aggiunto o aggiornato un nuovo dizionario, l'applicazione aggiornerà il contenuto da visualizzare nella pagina.
     *
     * Poiché il ricaricamento automatico richiede una connessione continua al server, è disponibile solo per i clienti del piano `enterprise`.
     *
     * Predefinito: false
     */
    hotReload: true,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... altre impostazioni di configurazione
  editor: {
    // ... altre impostazioni di configurazione

    /**
     * Indica se l'applicazione dovrebbe ricaricare automaticamente le configurazioni locali quando viene rilevata una modifica.
     * Ad esempio, quando viene aggiunto o aggiornato un nuovo dizionario, l'applicazione aggiornerà il contenuto da visualizzare nella pagina.
     *
     * Poiché il ricaricamento automatico richiede una connessione continua al server, è disponibile solo per i clienti del piano `enterprise`.
     *
     * Predefinito: false
     */
    hotReload: true,
  },
};

module.exports = config;
```

Il ricaricamento automatico sostituisce il contenuto sia lato server che lato client.

- Sul lato server, devi assicurarti che il processo dell'applicazione abbia accesso in scrittura alla directory `.intlayer/dictionaries`.
- Sul lato client, il ricaricamento automatico consente all'applicazione di aggiornare il contenuto nel browser senza dover ricaricare la pagina. Tuttavia, questa funzionalità è disponibile solo per i componenti client.

> Poiché il ricaricamento automatico richiede una connessione continua al server utilizzando un `EventListener`, è disponibile solo per i clienti del piano `enterprise`.

## Debug

Se riscontri problemi con il CMS, verifica quanto segue:

- L'applicazione è in esecuzione.

- La configurazione [`editor`](https://intlayer.org/doc/concept/configuration#editor-configuration) è correttamente impostata nel file di configurazione di Intlayer.

  - Campi obbligatori:
    - L'URL dell'applicazione deve corrispondere a quello impostato nella configurazione dell'editor (`applicationURL`).
    - L'URL del CMS.

- Assicurati che la configurazione del progetto sia stata caricata nel CMS di Intlayer.

- L'editor visivo utilizza un iframe per visualizzare il tuo sito web. Assicurati che la Content Security Policy (CSP) del tuo sito web consenta l'URL del CMS come `frame-ancestors` ('https://intlayer.org' per impostazione predefinita). Controlla la console dell'editor per eventuali errori.
