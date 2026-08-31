---
createdAt: 2025-08-23
updatedAt: 2026-08-30
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

### Installazione

```bash packageManager="npm"
npm install @intlayer/api
```

```bash packageManager="yarn"
yarn add @intlayer/api
```

```bash packageManager="pnpm"
pnpm add @intlayer/api
```

```bash packageManager="bun"
bun add @intlayer/api
```

### Come funziona: authenticator + endpoints

L'SDK è suddiviso in **due import separati** di proposito, per mantenere il bundle piccolo:

1. `createIntlayerCMS` — crea un leggero **authenticator**. Contiene solo le credenziali e il token di accesso gestito; non conosce nulla di alcun dominio specifico.
2. `dictionaryEndpoint`, `projectEndpoint`, … — **endpoint binder** per dominio, ognuno importato dal suo sottopercorso (`@intlayer/api/dictionary`, `@intlayer/api/project`, …). Passi l'authenticator all'endpoint di cui hai bisogno.

Poiché ogni endpoint è importato separatamente, il tuo bundle include solo i domini che effettivamente utilizzi — importare `dictionaryEndpoint` non porta mai con sé il client del progetto, dell'AI o di alcun altro dominio.

```typescript fileName="cms.ts" codeFormat="typescript"
import { createIntlayerCMS } from "@intlayer/api";

// La configurazione è opzionale: quando omessa, le credenziali vengono lette da
// `@intlayer/config/built`, che risolve le variabili di ambiente
// INTLAYER_CLIENT_ID e INTLAYER_CLIENT_SECRET.
export const cmsAuthenticator = createIntlayerCMS();
```

> [!WARNING]
> Le credenziali CMS (`clientId` / `clientSecret`) concedono **accesso in scrittura** ai tuoi contenuti. Crea sempre l'authenticator sul **lato server** (server actions, route handlers, script, CI). Non importarlo mai nel codice lato client o esporre le tue credenziali al browser.

Se preferisci non fare affidamento sulla configurazione al momento della build, passa le credenziali esplicitamente:

```typescript fileName="cms.ts" codeFormat="typescript"
import { createIntlayerCMS } from "@intlayer/api";

export const cmsAuthenticator = createIntlayerCMS({
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
    // Opzionale, per backend self-hosted:
    // backendURL: process.env.INTLAYER_BACKEND_URL,
  },
});
```

> Ottieni le tue credenziali creando una nuova chiave di accesso in [Intlayer Dashboard - Projects](https://app.intlayer.org/projects).

### Connettere il tuo progetto a un'istanza self-hosted

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

### SDK `@intlayer/api`: puntare a un backend self-hosted

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

```typescript fileName="write-dictionaries.ts" codeFormat="typescript"
import { createIntlayerCMS } from "@intlayer/api";
import { dictionaryEndpoint } from "@intlayer/api/dictionary";

const cmsAuthenticator = createIntlayerCMS();

// Creare un nuovo dizionario
await dictionaryEndpoint(cmsAuthenticator).addDictionary({
  key: "my-first-dictionary-key",
  content: { title: "Hello world" },
});

// Upsert un batch di dizionari (creali o aggiornali in una sola chiamata)
await dictionaryEndpoint(cmsAuthenticator).pushDictionaries([
  { key: "home", content: { title: "Home" } },
  { key: "about", content: { title: "About" } },
]);

// Aggiornare un dizionario esistente
await dictionaryEndpoint(cmsAuthenticator).updateDictionary({
  id: "<dictionary-id>",
  key: "home",
  content: { title: "Updated title" },
});
```

| Funzionalità                        | Variabile/i d'ambiente                          |
| ----------------------------------- | ----------------------------------------------- |
| Traduzione / audit con IA           | `OPENAI_API_KEY`                                |
| Fatturazione                        | `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, … |
| OAuth GitHub                        | `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`      |
| OAuth Google                        | `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`      |
| OAuth GitLab / Microsoft / LinkedIn | `GITLAB_*`, `MICROSOFT_*`, `LINKEDIN_*`         |
| E-mail transazionale via Resend     | `RESEND_API_KEY` (predefinito: Mailpit SMTP)    |

### Persistenza dei dati e aggiornamenti

Porte esposte sull'host:

| Porta  | Servizio                                                             |
| ------ | -------------------------------------------------------------------- |
| `3000` | Dashboard                                                            |
| `3100` | API Backend                                                          |
| `8025` | Interfaccia web e-mail Mailpit                                       |
| `9000` | API S3 MinIO (necessaria per il caricamento degli asset nel browser) |
| `9001` | Console MinIO                                                        |

## Live sync

Live Sync consente all'app di riflettere i cambiamenti del contenuto CMS in fase di runtime — nessuna ricostruzione o ridistribuzione richiesta. Quando abilitato, gli aggiornamenti vengono trasmessi a un server Live Sync che aggiorna i dizionari letti dall'applicazione.

Per la guida di configurazione completa (configurazione, avvio del server Live Sync, workflow di sviluppo locale e vincoli), consulta la [documentazione Live Sync](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/live-sync.md).

## Self-Hosting

Intlayer può funzionare interamente sulla tua infrastruttura. Un singolo comando inizializza l'intero stack (dashboard, API, database, object storage, e email) con Docker Compose:

```sh
curl -fsSL https://intlayer.org/install.sh | sh
```

Per la guida di configurazione completa, il riferimento delle variabili di ambiente, le istruzioni di aggiornamento e le procedure di backup/restore, consulta la [Guida Self-Hosting](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/self_hosting.md).

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

## Domande frequenti

<FAQ>

<Question title="Qual è la differenza tra il CMS Intlayer e l'editor visivo?">

L'[editor visivo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_visual_editor.md) modifica i dizionari locali e riscrive la modifica nel tuo codice, quindi l'app viene ricostruita e la modifica passa attraverso la tua normale revisione e deployment. Il CMS modifica i dizionari remoti: la modifica non tocca il tuo codice e il sito in esecuzione la recepisce senza un deployment. I team spesso usano entrambi, l'editor per i contenuti di proprietà degli sviluppatori e il CMS per i contenuti che il marketing cambia ogni settimana.

</Question>

<Question title="Quanto aggiunge l'i18n alla dimensione del mio bundle?">

Molto meno di una configurazione basata su namespace, perché una pagina non scarica mai un catalogo che non renderizza. Il markup renderizzato lato server risolve i suoi contenuti sul server, e il compilatore in fase di build sostituisce le chiamate `useIntlayer` con le esatte voci del dizionario che un componente utilizza, quindi le chiavi e le lingue non utilizzate vengono eliminate. I [dizionari dinamici](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dynamic_dictionaries/index.md) suddividono il resto per locale. Misurato rispetto alle alternative abituali, Intlayer riduce la dimensione del bundle e delle pagine fino al 50%. Vedi [ottimizzazione del bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/bundle_optimization.md) e il [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/benchmark/index.md).

</Question>

<Question title="Posso migrare da `i18next`, `next-intl` o `react-i18next` senza riscrivere i miei componenti?">

Sì, e ci sono due percorsi. Puoi migrare il contenuto progressivamente con la [guida alla migrazione da i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/migration_from_i18next_to_intlayer.md) o la [guida alla migrazione da next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/migration_from_next-intl_to_intlayer.md). Oppure puoi mantenere interamente la tua API attuale: gli [adattatori di compatibilità](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/compat/index.md) espongono esattamente la stessa API di `i18next`, `react-i18next`, `next-intl`, `next-i18next`, `react-intl`, `use-intl`, `vue-i18n` e `Lingui`, ma servita dai dizionari Intlayer, quindi cambiano gli import e il codice dei componenti no.

</Question>

<Question title="Posso mantenere i miei file di traduzione JSON esistenti?">

Sì. Il [plugin di sincronizzazione JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/plugins/sync-json.md) mantiene i tuoi file `/messages/{locale}/{namespace}.json` come fonte di verità e genera dizionari Intlayer da essi, in entrambe le direzioni. Un [plugin di sincronizzazione PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/plugins/sync-po.md) fa lo stesso per i cataloghi gettext, e i [file per locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/per_locale_file.md) ti permettono di dividere il contenuto per lingua invece di raggruppare i locale in un unico file.

</Question>

<Question title="Devo spostare il mio contenuto chiave per chiave?">

No. Esegui `npx intlayer extract` e Intlayer legge i tuoi file sorgente, estrae le stringhe visibili all'utente e scrive un file `.content` accanto a ciascuno, così puoi rivedere un diff invece di copiare le stringhe in un catalogo una alla volta. Vedi il [comando extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/extract.md).

Per una pipeline completamente automatizzata, il [Compilatore Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/compiler.md) fa lo stesso in fase di build sul codice sorgente JSX, TSX, Vue e Svelte, generando i dizionari ad ogni modifica così non ci sono chiavi da mantenere a mano. Funziona per analisi statica, quindi le stringhe che esistono solo a runtime restano fuori portata, e ha bisogno di alcune annotazioni per distinguere il testo visibile all'utente dalla logica applicativa.

</Question>

<Question title="Quali strumenti di editor e agenti AI sono disponibili?">

Cinque componenti, tutti opzionali:

- **[Estensione VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/vs_code_extension.md)**: salta da una chiave `useIntlayer` al file di contenuto che la dichiara, estrai il contenuto da un componente ed esegui build, fill, test, push e pull dalla palette dei comandi o da una scheda Intlayer dedicata.
- **[Server LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/lsp.md)**: la stessa consapevolezza in qualsiasi editor che parla LSP, con vai alla definizione, trova tutti i riferimenti, anteprime al passaggio del mouse di un valore tradotto, autocompletamento di chiavi e campi, e un avviso quando una chiave non è dichiarata da nessuna parte. Risolve anche le chiamate `i18next`, `react-i18next`, `next-intl` e `use-intl`, il che aiuta durante la migrazione.
- **[Server MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/mcp_server.md)**: espone la documentazione di Intlayer e la CLI a Cursor, VS Code, Claude Desktop, Claude Code e ChatGPT, così un assistente risponde in base alla documentazione aggiornata invece di tirare a indovinare, e può eseguire da solo comandi come `intlayer fill`.
- **[Agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/agent_skills.md)**: competenze mirate come `intlayer-config`, `intlayer-cli` e `intlayer-content`, più una per framework, che insegnano a un agente la tua configurazione di routing e i tipi di nodo dei contenuti.
- **[Plugin ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/eslint.md)**: `no-raw-text` segnala le stringhe hardcoded, con ulteriori regole per le chiavi statiche dei dizionari e i contenuti non utilizzati.

</Question>

<Question title="Quale contenuto dovrebbe essere spostato nel CMS?">

Contenuto che cambia spesso e non appartiene a una release: testi della landing page, formulazione dei prezzi, annunci, tutto ciò che un team di marketing possiede. Il contenuto che fa parte dell'interfaccia, come le etichette dei pulsanti e gli errori dei form, è meglio lasciarlo come dizionari locali, dove viene rivisto insieme al codice che lo usa.

</Question>

<Question title="Cosa succede se il CMS non è raggiungibile?">

L'applicazione ricade sulla dichiarazione locale del dizionario, quindi un guasto di rete o un'interruzione degrada al contenuto spedito con la tua build invece che a una pagina vuota. Ecco perché è importante mantenere una dichiarazione locale per ogni dizionario remoto.

</Question>

<Question title="Posso auto-ospitare il CMS?">

Sì. Il CMS può girare sulla tua infrastruttura, che è la risposta abituale quando il contenuto non deve lasciare la tua rete. Vedi [auto-ospitare Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/self_hosting.md).

</Question>

<Question title="Gli editor di contenuti hanno bisogno di uno sviluppatore per pubblicare una modifica?">

No. È questo il punto dei dizionari remoti: un editor cambia il testo nel CMS e il sito lo riflette, con la [sincronizzazione live](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/live.md) che applica l'aggiornamento a runtime invece di aspettare una build.

</Question>

<Question title="Posso automatizzare il CMS invece di usare l'interfaccia?">

Sì. L'SDK `@intlayer/api` espone gli stessi endpoint dell'interfaccia, così puoi recuperare progetti, leggere dizionari e inviare aggiornamenti da uno script o una pipeline. La sezione qui sopra mostra l'autenticatore e gli endpoint.

</Question>

<Question title="Il CMS supporta l'A/B testing delle traduzioni?">

Sì. I dizionari remoti supportano le [varianti di contenuto](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dynamic_dictionaries/variants.md), e gli [analytics](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/analytics.md) riportano come ogni variante viene esposta, così una modifica di formulazione può essere misurata invece che discussa.

</Question>

<Question title="Il CMS è gratuito?">

La libreria Intlayer, la CLI, il compilatore e l'editor visivo sono gratuiti e open source sotto licenza Apache 2.0. Il CMS ospitato è un servizio a pagamento opzionale, e può essere [auto-ospitato](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/self_hosting.md) invece.

</Question>

</FAQ>
