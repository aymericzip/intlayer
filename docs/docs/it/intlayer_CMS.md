---
createdAt: 2025-08-23
updatedAt: 2026-07-08
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
history:
  - version: 9.0.0
    date: 2026-07-08
    changes: "Spostata la sezione «Sincronizzazione live» nella propria pagina (live-sync.md), lasciando qui una breve introduzione con link"
  - version: 9.0.0
    date: 2026-06-30
    changes: "Aggiunta sezione Self-Hosting: bootstrap Docker Compose, inventario dei servizi, configurazione SDK, funzionalità opzionali e note di aggiornamento"
  - version: 6.0.1
    date: 2025-09-22
    changes: "Aggiunta documentazione sulla sincronizzazione live"
  - version: 6.0.0
    date: 2025-09-04
    changes: "Sostituito il campo `hotReload` con `liveSync`"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Inizializzazione della cronologia"
author: aymericzip
---

# Documentazione del Sistema di Gestione dei Contenuti (CMS) di Intlayer

<iframe title="Editor Visivo + CMS per la tua Web App: Intlayer Spiegato" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/UDDTnirwi_4?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

Il CMS di Intlayer è un'applicazione che ti permette di esternalizzare i contenuti di un progetto Intlayer.

Per questo, Intlayer introduce il concetto di 'dizionari remoti'.

![Interfaccia CMS di Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/CMS.png)

## Indice dei contenuti

<TOC/>

---

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

Esegui il seguente comando per accedere all'Intlayer CMS:

```bash packageManager="npm"
npx intlayer login
```

```bash packageManager="yarn"
yarn intlayer login
```

```bash packageManager="pnpm"
pnpm intlayer login
```

```bash packageManager="bun"
bun x intlayer login
```

Questo aprirà il tuo browser predefinito per completare il processo di autenticazione e ricevere le credenziali necessarie (Client ID e Client Secret) per utilizzare i servizi Intlayer.

Nel file di configurazione di Intlayer, puoi personalizzare le impostazioni del CMS:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
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
     * Possono essere ottenuti creando un nuovo client nel Dashboard di Intlayer - Progetti (https://app.intlayer.org/projects).
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

> Se non hai un client ID e un client secret, puoi ottenerli creando un nuovo client nel [Intlayer Dashboard - Projects](https://app.intlayer.org/projects).

> Per vedere tutti i parametri disponibili, fai riferimento alla [documentazione di configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md).

## Utilizzo del CMS

### Invia la tua configurazione

Per configurare l'Intlayer CMS, puoi utilizzare i comandi della [intlayer CLI](https://github.com/aymericzip/intlayer/tree/main/docs/it/cli/index.md).

```bash packageManager="npm"
npx intlayer config push
```

```bash packageManager="yarn"
yarn intlayer config push
```

```bash packageManager="pnpm"
pnpm intlayer config push
```

```bash packageManager="bun"
bun x intlayer config push
```

> Se utilizzi variabili d'ambiente nel file di configurazione `intlayer.config.ts`, puoi specificare l'ambiente desiderato usando l'argomento `--env`:

```bash packageManager="npm"
npx intlayer config push --env production
```

```bash packageManager="yarn"
yarn intlayer config push --env production
```

```bash packageManager="pnpm"
pnpm intlayer config push --env production
```

```bash packageManager="bun"
bun x intlayer config push --env production
```

Questo comando carica la tua configurazione sull'Intlayer CMS.

### Caricare un dizionario

Per trasformare i tuoi dizionari di localizzazione in un dizionario remoto, puoi utilizzare i comandi della [intlayer CLI](https://github.com/aymericzip/intlayer/tree/main/docs/it/cli/index.md).

```bash packageManager="npm"
npx intlayer dictionary push -d my-first-dictionary-key
```

```bash packageManager="yarn"
yarn intlayer dictionary push -d my-first-dictionary-key
```

```bash packageManager="pnpm"
pnpm intlayer dictionary push -d my-first-dictionary-key
```

```bash packageManager="bun"
bun x intlayer dictionary push -d my-first-dictionary-key
```

> Se utilizzi variabili d'ambiente nel file di configurazione `intlayer.config.ts`, puoi specificare l'ambiente desiderato usando l'argomento `--env`:

```bash packageManager="npm"
npx intlayer dictionary push -d my-first-dictionary-key --env production
```

```bash packageManager="yarn"
yarn intlayer dictionary push -d my-first-dictionary-key --env production
```

```bash packageManager="pnpm"
pnpm intlayer dictionary push -d my-first-dictionary-key --env production
```

```bash packageManager="bun"
bun x intlayer dictionary push -d my-first-dictionary-key --env production
```

Questo comando carica i tuoi dizionari di contenuti iniziali, rendendoli disponibili per il recupero asincrono e la modifica tramite la piattaforma Intlayer.

### Modifica il dizionario

Successivamente potrai visualizzare e gestire il tuo dizionario nel [Intlayer CMS](https://app.intlayer.org/content).

## Sincronizzazione live

La Sincronizzazione Live consente alla tua app di riflettere le modifiche ai contenuti del CMS in tempo reale. Non è necessario ricostruire o ridistribuire. Quando abilitata, gli aggiornamenti vengono trasmessi a un server di Sincronizzazione Live che aggiorna i dizionari letti dalla tua applicazione.

Per la guida completa alla configurazione (attivazione, avvio del server Live Sync, flusso di lavoro di sviluppo locale e limitazioni), consulta la [documentazione di Live Sync](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/live-sync.md).

## Self-Hosting

Intlayer può essere eseguito interamente sulla propria infrastruttura — nessun account Intlayer Cloud richiesto. Un singolo comando avvia l'intera pila (dashboard, API, database, archiviazione di oggetti ed e-mail) tramite Docker Compose:

```sh
curl -fsSL https://intlayer.org/install.sh | sh
```

Questo scarica un `docker-compose.yml` e un `.env`, genera automaticamente i secret necessari (`BETTER_AUTH_SECRET`, credenziali MinIO) e avvia tutti i container con `docker compose up -d`. Rieseguire lo stesso comando su un'installazione esistente esegue un aggiornamento progressivo senza perdita di dati.

### Servizi avviati

| Servizio            | Porta/e                                 | Scopo                                            |
| ------------------- | --------------------------------------- | ------------------------------------------------ |
| **app** (dashboard) | `3000`                                  | Interfaccia CMS TanStack Start                   |
| **backend** (API)   | `3100`                                  | API REST Fastify                                 |
| **MongoDB 7**       | interno                                 | Database principale (replica set a nodo singolo) |
| **Redis 7**         | interno                                 | Code di lavori e caching                         |
| **MinIO**           | `9000` (S3), `9001` (console)           | Archiviazione di oggetti compatibile S3          |
| **Mailpit**         | `1025` (SMTP), `8025` (interfaccia web) | Sink locale per e-mail transazionali             |

Chromium (per la generazione di screenshot con Puppeteer) è incluso nell'immagine del backend — non è necessario un container separato.

### Connettere il tuo progetto a un'istanza self-hosted

Punta la tua configurazione Intlayer al tuo backend e dashboard invece di `intlayer.org`:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,

    /**
     * URL del dashboard CMS self-hosted.
     * Predefinito: https://app.intlayer.org
     */
    cmsURL: process.env.INTLAYER_CMS_URL, // es. http://localhost:3000

    /**
     * URL dell'API backend self-hosted.
     * Predefinito: https://back.intlayer.org
     */
    backendURL: process.env.INTLAYER_BACKEND_URL, // es. http://localhost:3100
  },
};

export default config;
```

Imposta le variabili d'ambiente corrispondenti nel tuo progetto:

```sh
INTLAYER_CMS_URL=http://localhost:3000
INTLAYER_BACKEND_URL=http://localhost:3100
INTLAYER_CLIENT_ID=<your-client-id>
INTLAYER_CLIENT_SECRET=<your-client-secret>
```

Crea le credenziali di accesso nel tuo dashboard self-hosted su `http://localhost:3000/projects`.

### SDK `@intlayer/api`: puntare a un backend self-hosted

Quando si utilizza l'SDK in modo programmatico, passa `backendURL` esplicitamente a `createIntlayerCMS`:

```typescript fileName="cms.ts" codeFormat="typescript"
import { createIntlayerCMS } from "@intlayer/api";
import { dictionaryEndpoint } from "@intlayer/api/dictionary";

const cms = createIntlayerCMS({
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
    backendURL: process.env.INTLAYER_BACKEND_URL, // http://localhost:3100
  },
});

const { data: dictionaries } = await dictionaryEndpoint(cms).getDictionaries();
```

### Funzionalità opzionali

Queste funzionalità richiedono account esterni e funzionano correttamente anche quando le loro chiavi sono assenti dal `.env` self-hosted:

| Funzionalità                        | Variabile/i d'ambiente                          |
| ----------------------------------- | ----------------------------------------------- |
| Traduzione / audit con IA           | `OPENAI_API_KEY`                                |
| Fatturazione                        | `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, … |
| OAuth GitHub                        | `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`      |
| OAuth Google                        | `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`      |
| OAuth GitLab / Microsoft / LinkedIn | `GITLAB_*`, `MICROSOFT_*`, `LINKEDIN_*`         |
| E-mail transazionale via Resend     | `RESEND_API_KEY` (predefinito: Mailpit SMTP)    |

### Persistenza dei dati e aggiornamenti

Tre volumi Docker contengono tutto lo stato persistente: `mongo-data`, `redis-data` e `minio-data`. Sopravvivono ai riavvii e agli aggiornamenti dei container. Eseguire nuovamente il programma di installazione scarica le immagini più recenti ed esegue un `docker compose up -d` progressivo.

Porte esposte sull'host:

| Porta  | Servizio                                                             |
| ------ | -------------------------------------------------------------------- |
| `3000` | Dashboard                                                            |
| `3100` | API Backend                                                          |
| `8025` | Interfaccia web e-mail Mailpit                                       |
| `9000` | API S3 MinIO (necessaria per il caricamento degli asset nel browser) |
| `9001` | Console MinIO                                                        |

Per un riferimento completo di tutte le variabili d'ambiente disponibili e le opzioni avanzate (proxy inverso, domini personalizzati, backup/ripristino), consulta la [Guida al Self-Hosting](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/self_hosting.md).

---

## Debug

Se riscontri problemi con il CMS, verifica quanto segue:

- L'applicazione è in esecuzione.

- La configurazione dell'[`editor`](https://intlayer.org/doc/concept/configuration#editor-configuration) è correttamente impostata nel file di configurazione di Intlayer.
  - Campi obbligatori:
- L'URL dell'applicazione deve corrispondere a quello impostato nella configurazione dell'editor (`applicationURL`).
- L'URL del CMS

- Assicurati che la configurazione del progetto sia stata inviata al CMS di Intlayer.

- L'editor visivo utilizza un iframe per visualizzare il tuo sito web. Assicurati che la Content Security Policy (CSP) del tuo sito consenta l'URL del CMS come `frame-ancestors` ('https://app.intlayer.org' per impostazione predefinita). Controlla la console dell'editor per eventuali errori.
