---
createdAt: 2025-08-23
updatedAt: 2025-08-23
title: Intlayer CMS | Esternalizza i tuoi contenuti nel CMS di Intlayer
description: Esternalizza i tuoi contenuti nel CMS di Intlayer per delegare la gestione dei tuoi contenuti al tuo team.
keywords:
  - CMS
  - Editor Visivo
  - Internazionalizzazione
  - Documentazione
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - cms
youtubeVideo: https://www.youtube.com/watch?v=UDDTnirwi_4
---

# Documentazione del Sistema di Gestione dei Contenuti (CMS) di Intlayer

<iframe title="Editor Visivo + CMS per la tua Web App: Intlayer Spiegato" class="m-auto aspect-[16/9] w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/UDDTnirwi_4?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

Il CMS di Intlayer è un'applicazione che ti permette di esternalizzare i contenuti di un progetto Intlayer.

Per questo, Intlayer introduce il concetto di 'dizionari remoti'.

![Interfaccia CMS di Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/CMS.png)

## Comprendere i dizionari remoti

Intlayer distingue tra dizionari 'locali' e 'remoti'.

- Un dizionario 'locale' è un dizionario dichiarato nel tuo progetto Intlayer. Come ad esempio il file di dichiarazione di un pulsante o la tua barra di navigazione. Esternalizzare i contenuti in questo caso non ha senso perché questi contenuti non dovrebbero cambiare spesso.

- Un dizionario 'remoto' è un dizionario gestito tramite il CMS di Intlayer. Potrebbe essere utile per permettere al tuo team di gestire direttamente i contenuti sul tuo sito web, e mira anche a utilizzare funzionalità di A/B testing e ottimizzazione SEO automatica.

## Editor visivo vs CMS

L'editor [Intlayer Visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_visual_editor.md) è uno strumento che ti permette di gestire i tuoi contenuti in un editor visuale per dizionari locali. Una volta effettuata una modifica, il contenuto verrà sostituito nel codice sorgente. Ciò significa che l'applicazione verrà ricostruita e la pagina ricaricata per mostrare il nuovo contenuto.

Al contrario, il CMS di Intlayer è uno strumento che ti permette di gestire i tuoi contenuti in un editor visuale per dizionari remoti. Una volta effettuata una modifica, il contenuto **non** influenzerà il codice sorgente. E il sito web mostrerà automaticamente il contenuto modificato.

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
     * Questo è l'URL a cui punta l'editor visuale.
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,

    /**
     * Obbligatorio
     *
     * Client ID e client secret sono necessari per abilitare l'editor.
     * Permettono di identificare l'utente che sta modificando il contenuto.
     * Possono essere ottenuti creando un nuovo client nel Dashboard di Intlayer - Progetti (https://intlayer.org/dashboard/projects).
     * clientId: process.env.INTLAYER_CLIENT_ID,
     * clientSecret: process.env.INTLAYER_CLIENT_SECRET,
     */
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,

    /**
     * Facoltativo
     *
     * Nel caso in cui stiate ospitando autonomamente l'Intlayer CMS, potete impostare l'URL del CMS.
     *
     * L'URL dell'Intlayer CMS.
     * Di default, è impostato su https://intlayer.org
     */
    cmsURL: process.env.INTLAYER_CMS_URL,

    /**
     * Opzionale
     *
     * Nel caso in cui stiate ospitando autonomamente l'Intlayer CMS, potete impostare l'URL del backend.
     *
     * L'URL dell'Intlayer CMS.
     * Di default, è impostato su https://back.intlayer.org
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
     * Questa è l'URL a cui punta l'editor visuale.
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,

    /**
     * Obbligatorio
     *
     * Client ID e client secret sono necessari per abilitare l'editor.
     * Permettono di identificare l'utente che sta modificando il contenuto.
     * Possono essere ottenuti creando un nuovo client nella Dashboard di Intlayer - Progetti (https://intlayer.org/dashboard/projects).
     * clientId: process.env.INTLAYER_CLIENT_ID,
     * clientSecret: process.env.INTLAYER_CLIENT_SECRET,
     */
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,

    /**
     * Opzionale
     *
     * Nel caso in cui stiate ospitando autonomamente l'Intlayer CMS, potete impostare l'URL del CMS.
     *
     * L'URL del CMS di Intlayer.
     * Per impostazione predefinita, è impostato su https://intlayer.org
     */
    cmsURL: process.env.INTLAYER_CMS_URL,

    /**
     * Opzionale
     *
     * Nel caso in cui tu stia ospitando autonomamente il CMS di Intlayer, puoi impostare l'URL del backend.
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
     * Questa è l'URL a cui punta l'editor visuale.
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,

    /**
     * Obbligatorio
     *
     * Client ID e client secret sono necessari per abilitare l'editor.
     * Permettono di identificare l'utente che sta modificando il contenuto.
     * Possono essere ottenuti creando un nuovo client nel Intlayer Dashboard - Projects (https://intlayer.org/dashboard/projects).
     * clientId: process.env.INTLAYER_CLIENT_ID,
     * clientSecret: process.env.INTLAYER_CLIENT_SECRET,
     */
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,

    /**
     * Opzionale
     *
     * Nel caso in cui tu stia ospitando autonomamente il CMS di Intlayer, puoi impostare l'URL del CMS.
     *
     * L'URL del CMS di Intlayer.
     * Per impostazione predefinita, è impostato su https://intlayer.org
     */
    cmsURL: process.env.INTLAYER_CMS_URL,

    /**
     * Opzionale
     *
     * Nel caso in cui tu stia ospitando autonomamente l'Intlayer CMS, puoi impostare l'URL del backend.
     *
     * L'URL dell'Intlayer CMS.
     * Per impostazione predefinita, è impostato su https://back.intlayer.org
     */
    backendURL: process.env.INTLAYER_BACKEND_URL,
  },
};

module.exports = config;
```

> Se non hai un client ID e un client secret, puoi ottenerli creando un nuovo client nel [Intlayer Dashboard - Projects](https://intlayer.org/dashboard/projects).

> Per vedere tutti i parametri disponibili, fai riferimento alla [documentazione di configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md).

## Utilizzo del CMS

### Invia la tua configurazione

Per configurare l'Intlayer CMS, puoi utilizzare i comandi della [intlayer CLI](https://github.com/aymericzip/intlayer/tree/main/docs/it/intlayer_cli.md).

```bash
npx intlayer config push
```

> Se utilizzi variabili d'ambiente nel file di configurazione `intlayer.config.ts`, puoi specificare l'ambiente desiderato usando l'argomento `--env`:

```bash
npx intlayer config push --env production
```

Questo comando carica la tua configurazione sull'Intlayer CMS.

### Caricare un dizionario

Per trasformare i tuoi dizionari di localizzazione in un dizionario remoto, puoi utilizzare i comandi della [intlayer CLI](https://github.com/aymericzip/intlayer/tree/main/docs/it/intlayer_cli.md).

```bash
npx intlayer dictionary push -d my-first-dictionary-key
```

> Se utilizzi variabili d'ambiente nel file di configurazione `intlayer.config.ts`, puoi specificare l'ambiente desiderato usando l'argomento `--env`:

```bash
npx intlayer dictionary push -d my-first-dictionary-key --env production
```

Questo comando carica i tuoi dizionari di contenuti iniziali, rendendoli disponibili per il recupero asincrono e la modifica tramite la piattaforma Intlayer.

### Modifica il dizionario

Successivamente potrai visualizzare e gestire il tuo dizionario nel [Intlayer CMS](https://intlayer.org/dashboard/content).

## Sincronizzazione live

La Sincronizzazione Live consente alla tua app di riflettere le modifiche ai contenuti del CMS in tempo reale. Non è necessario ricostruire o ridistribuire. Quando abilitata, gli aggiornamenti vengono trasmessi a un server di Sincronizzazione Live che aggiorna i dizionari letti dalla tua applicazione.

> Live Sync richiede una connessione continua al server ed è disponibile nel piano enterprise.

Abilita Live Sync aggiornando la configurazione di Intlayer:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... altre impostazioni di configurazione
  editor: {
    /**
     * Abilita il caricamento a caldo delle configurazioni locali quando vengono rilevate modifiche.
     * Ad esempio, quando un dizionario viene aggiunto o aggiornato, l'applicazione aggiorna
     * il contenuto visualizzato nella pagina.
     *
     * Poiché il caricamento a caldo richiede una connessione continua al server, è
     * disponibile solo per i clienti del piano `enterprise`.
     *
     * Predefinito: false
     */
    liveSync: true,
  },
  build: {
    /**
     * Controlla come vengono importati i dizionari:
     *
     * - "live": I dizionari vengono recuperati dinamicamente utilizzando l'API Live Sync.
     *   Sostituisce useIntlayer con useDictionaryDynamic.
     *
     * Nota: La modalità live utilizza l'API Live Sync per recuperare i dizionari. Se la chiamata API
     * fallisce, i dizionari vengono importati dinamicamente.
     * Nota: Solo i dizionari con contenuto remoto e flag "live" utilizzano la modalità live.
     * Gli altri usano la modalità dinamica per le prestazioni.
     */
    importMode: "live",
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
     * Abilita il caricamento a caldo delle configurazioni di localizzazione quando vengono rilevate modifiche.
     * Ad esempio, quando un dizionario viene aggiunto o aggiornato, l'applicazione aggiorna
     * il contenuto visualizzato nella pagina.
     *
     * Poiché il caricamento a caldo richiede una connessione continua al server, è
     * disponibile solo per i clienti del piano `enterprise`.
     *
     * Predefinito: false
     */
    liveSync: true,
  },
  build: {
    /**
     * Controlla come vengono importati i dizionari:
     *
     * - "live": I dizionari vengono recuperati dinamicamente utilizzando l'API Live Sync.
     *   Sostituisce useIntlayer con useDictionaryDynamic.
     *
     * Nota: La modalità live utilizza l'API Live Sync per recuperare i dizionari. Se la chiamata API
     * fallisce, i dizionari vengono importati dinamicamente.
     * Nota: Solo i dizionari con contenuti remoti e flag "live" utilizzano la modalità live.
     * Gli altri usano la modalità dinamica per le prestazioni.
     */
    importMode: "live",
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
     * Abilita il caricamento a caldo delle configurazioni di localizzazione quando vengono rilevate modifiche.
     * Ad esempio, quando un dizionario viene aggiunto o aggiornato, l'applicazione aggiorna
     * il contenuto visualizzato nella pagina.
     *
     * Poiché il caricamento a caldo richiede una connessione continua al server, è
     * disponibile solo per i clienti del piano `enterprise`.
     *
     * Predefinito: false
     */
    liveSync: true,

    /**
     * La porta del server Live Sync.
     *
     * Predefinito: 4000
     */
    liveSyncPort: 4000,

    /**
     * L'URL del server Live Sync.
     *
     * Predefinito: http://localhost:{liveSyncPort}
     */
    liveSyncURL: "https://live.example.com",
  },
  build: {
    /**
     * Controlla come vengono importati i dizionari:
     *
     * - "live": I dizionari vengono recuperati dinamicamente utilizzando l'API Live Sync.
     *   Sostituisce useIntlayer con useDictionaryDynamic.
     *
     * Nota: La modalità live utilizza l'API Live Sync per recuperare i dizionari. Se la chiamata API
     * fallisce, i dizionari vengono importati dinamicamente.
     * Nota: Solo i dizionari con contenuto remoto e flag "live" usano la modalità live.
     * Gli altri usano la modalità dinamica per le prestazioni.
     */
    importMode: "live",
  },
};

module.exports = config;
```

Avvia il server Live Sync per avvolgere la tua applicazione:

Esempio con Next.js:

```json5 fileName="package.json"
{
  "scripts": {
    // ... altri script
    "build": "next build",
    "dev": "next dev",
    "start": "npx intlayer live --process 'next start'",
  },
}
```

Esempio con Vite:

```json5 fileName="package.json"
{
  "scripts": {
    // ... altri script
    "build": "vite build",
    "dev": "vite dev",
    "start": "npx intlayer live --process 'vite start'",
  },
}
```

Il server Live Sync avvolge la tua applicazione e applica automaticamente i contenuti aggiornati non appena arrivano.

Per ricevere notifiche di modifica dal CMS, il server Live Sync mantiene una connessione SSE con il backend. Quando il contenuto cambia nel CMS, il backend inoltra l'aggiornamento al server Live Sync, che scrive i nuovi dizionari. La tua applicazione rifletterà l'aggiornamento alla successiva navigazione o al reload del browser—non è necessario ricostruire.

Diagramma di flusso (CMS/Backend -> Server Live Sync -> Server Applicazione -> Frontend):

![Schema Logica Live Sync](https://github.com/aymericzip/intlayer/blob/main/docs/assets/live_sync_logic_schema.svg)

Come funziona:

![Schema Flusso Live Sync CMS/Backend/Server Live Sync/Server Applicazione/Frontend](https://github.com/aymericzip/intlayer/blob/main/docs/assets/live_sync_flow_scema.svg)

### Flusso di lavoro di sviluppo (locale)

- In fase di sviluppo, tutti i dizionari remoti vengono recuperati all'avvio dell'applicazione, così puoi testare rapidamente gli aggiornamenti.
- Per testare Live Sync localmente con Next.js, avvolgi il tuo server di sviluppo:

```json5 fileName="package.json"
{
  "scripts": {
    // ... altri script
    "dev": "npx intlayer live --process 'next dev'",
    // "dev": "npx intlayer live --process 'vite dev'", // Per Vite
  },
}
```

Abilita l'ottimizzazione affinché Intlayer applichi le trasformazioni di importazione Live durante lo sviluppo:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  editor: {
    applicationURL: "http://localhost:5173",
    liveSyncURL: "http://localhost:4000",
    liveSync: true,
  },
  build: {
    optimize: true,
    importMode: "live",
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  editor: {
    applicationURL: "http://localhost:5173",
    liveSyncURL: "http://localhost:4000",
    liveSync: true,
  },
  build: {
    optimize: true,
    importMode: "live",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  editor: {
    applicationURL: "http://localhost:5173",
    liveSyncURL: "http://localhost:4000",
    liveSync: true,
  },
  build: {
    optimize: true,
    importMode: "live",
  },
};

module.exports = config;
```

Questa configurazione avvolge il tuo server di sviluppo con il server Live Sync, recupera i dizionari remoti all'avvio e trasmette aggiornamenti dal CMS tramite SSE. Aggiorna la pagina per vedere le modifiche.

Note e vincoli:

- Aggiungi l'origine del live sync alla tua politica di sicurezza del sito (CSP). Assicurati che l'URL del live sync sia consentito in `connect-src` (e in `frame-ancestors` se pertinente).
- Live Sync non funziona con output statico. Per Next.js, la pagina deve essere dinamica per ricevere aggiornamenti in fase di esecuzione (ad esempio, usa `generateStaticParams`, `generateMetadata`, `getServerSideProps` o `getStaticProps` in modo appropriato per evitare vincoli di solo statico completo).
- Nel CMS, ogni dizionario ha un flag `live`. Solo i dizionari con `live=true` vengono recuperati tramite l'API di live sync; gli altri vengono importati dinamicamente e rimangono invariati a runtime.
- Il flag `live` viene valutato per ogni dizionario al momento della build. Se il contenuto remoto non era contrassegnato come `live=true` durante la build, è necessario ricostruire per abilitare Live Sync per quel dizionario.
- Il server di live sync deve poter scrivere nella cartella `.intlayer`. Nei container, assicurarsi che sia garantito l'accesso in scrittura a `/.intlayer`.

## Debug

Se riscontri problemi con il CMS, verifica quanto segue:

- L'applicazione è in esecuzione.

- La configurazione dell'[`editor`](https://intlayer.org/doc/concept/configuration#editor-configuration) è correttamente impostata nel file di configurazione di Intlayer.
  - Campi obbligatori:
- L'URL dell'applicazione deve corrispondere a quello impostato nella configurazione dell'editor (`applicationURL`).
- L'URL del CMS

- Assicurati che la configurazione del progetto sia stata inviata al CMS di Intlayer.

- L'editor visivo utilizza un iframe per visualizzare il tuo sito web. Assicurati che la Content Security Policy (CSP) del tuo sito consenta l'URL del CMS come `frame-ancestors` ('https://intlayer.org' per impostazione predefinita). Controlla la console dell'editor per eventuali errori.

## Cronologia della Documentazione

| Versione | Data       | Modifiche                                           |
| -------- | ---------- | --------------------------------------------------- |
| 6.0.1    | 2025-09-22 | Aggiunta documentazione sulla sincronizzazione live |
| 6.0.0    | 2025-09-04 | Sostituito il campo `hotReload` con `liveSync`      |
| 5.5.10   | 2025-06-29 | Inizializzazione della cronologia                   |
