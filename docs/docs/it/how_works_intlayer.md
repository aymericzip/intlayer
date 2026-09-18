---
createdAt: 2024-08-12
updatedAt: 2026-08-30
title: Come funziona Intlayer
description: Scopri come funziona Intlayer internamente. Comprendi l'architettura e i componenti che rendono Intlayer potente.
keywords:
  - Intlayer
  - Come funziona
  - Architettura
  - Componenti
  - Funzionamento interno
slugs:
  - doc
  - concept
  - how-works-intlayer
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "Inizio cronologia"
author: aymericzip
---

# Come funziona Intlayer

## Indice

<TOC/>

## Panoramica

L'idea principale dietro Intlayer è adottare una gestione dei contenuti per componente. Quindi l'idea è permetterti di dichiarare i tuoi contenuti ovunque nel tuo codice, ad esempio nella stessa directory del tuo componente.

```bash
.
└── Components
    └── MyComponent
        ├── index.content.ts
        └── index.tsx
```

Per fare ciò, il ruolo di Intlayer è trovare tutti i tuoi `file di dichiarazione dei contenuti`, in tutti i diversi formati presenti nel tuo progetto, e poi generare da essi i `dizionari`.

Quindi ci sono due passaggi principali:

- Fase di build
- Fase di interpretazione

### Fase di build dei dizionari

La fase di build può essere eseguita in tre modi:

- utilizzando la CLI con `npx intlayer build`
- utilizzando [l'estensione vscode](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/vs_code_extension.md)
- utilizzando i plugin delle app come il pacchetto [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/vite-intlayer/index.md), o i loro equivalenti per [Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/next-intlayer/index.md). Quando si utilizza uno di questi plugin, Intlayer costruirà automaticamente i dizionari all'avvio (dev) o durante la build (prod) dell'applicazione.

1. Dichiarazione dei file di contenuto
   - I file di contenuto possono essere definiti in vari formati, come TypeScript, ECMAScript, CommonJS o JSON.
   - I file di contenuto possono essere definiti ovunque nel progetto, il che consente una migliore manutenzione e scalabilità. È importante rispettare le convenzioni di estensione dei file per i file di contenuto. Questa estensione è di default `*.content.{js|cjs|mjs|ts|tsx|json}`, ma può essere modificata nel [file di configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md).

2. Generazione dei `dizionari`
   - I dizionari sono generati dai file di contenuto. Di default, i dizionari di Intlayer sono generati nella directory `.intlayer/dictionaries` del progetto.
   - Questi dizionari sono generati in diversi formati per soddisfare tutte le esigenze e ottimizzare le prestazioni dell'applicazione.

3. Generazione dei tipi di dizionario

4. Generazione dei tipi di dizionari
   Basandosi sui tuoi `dizionari`, Intlayer genererà tipi per renderli utilizzabili nella tua applicazione.

- I tipi di dizionari sono generati dai `file di dichiarazione dei contenuti` di Intlayer. Di default, i tipi di dizionari di Intlayer sono generati nella directory `.intlayer/types` del progetto.

- L'[aumento del modulo](https://www.typescriptlang.org/docs/handbook/declaration-merging.html) di Intlayer è una funzionalità di TypeScript che consente di definire tipi aggiuntivi per Intlayer. Questo rende l'esperienza di sviluppo più semplice suggerendo argomenti disponibili o richiesti.
  Tra i tipi generati, i tipi di dizionari di Intlayer o persino i tipi di configurazione della lingua vengono aggiunti al file `types/intlayer.d.ts` e utilizzati da altri pacchetti. Per fare ciò, è necessario che il file `tsconfig.json` sia configurato per includere la directory `types` del progetto.

### Fase di interpretazione dei dizionari

Utilizzando Intlayer, accederai ai tuoi contenuti nella tua applicazione utilizzando l'hook `useIntlayer`.

```tsx
const MyComponent = () => {
  const content = useIntlayer("my-component");
  return <div>{content.title}</div>;
};
```

Questo hook gestirà per te il rilevamento della lingua e restituirà il contenuto per la lingua corrente. Utilizzando questo hook, sarai anche in grado di interpretare markdown, gestire la pluralizzazione e altro.

> Per vedere tutte le funzionalità di Intlayer, puoi leggere la [documentazione sui dizionari](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/content_file.md).

## Contenuto remoto

Intlayer ti consente di dichiarare contenuti localmente e poi esportarli nel CMS per renderli modificabili dal tuo team non tecnico.

Quindi sarai in grado di inviare e recuperare contenuti dal CMS alla tua applicazione, in modo simile a ciò che fai con Git per il tuo codice.

Per i dizionari esternalizzati che utilizzano il CMS, Intlayer esegue una semplice operazione di fetch per recuperare i dizionari remoti e li unisce con quelli locali. Se configurato nel tuo progetto, Intlayer gestirà automaticamente il recupero dei contenuti dal CMS all'avvio dell'applicazione (dev) o durante la build (prod).

## Editor visivo

Intlayer fornisce anche un editor visivo per consentirti di modificare i tuoi contenuti in modo visivo. Questo [editor visivo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_visual_editor.md) è disponibile nel pacchetto esterno `intlayer-editor`.

![editor visivo](https://github.com/aymericzip/intlayer/blob/main/docs/assets/visual_editor.gif?raw=true)

- Il server è una semplice applicazione Express che ascolta le richieste dal client e recupera il contenuto della tua applicazione, come i `dictionaries` e la configurazione per renderla accessibile sul lato client.
- D'altro canto, il client è un'applicazione React che viene utilizzata per interagire con il tuo contenuto usando un'interfaccia visuale.

- Il server è una semplice applicazione Express che ascolta le richieste dal client e recupera il contenuto della tua applicazione, come i `dictionaries` e la configurazione per renderli accessibili dal lato client.
- D'altra parte, il client è un'applicazione React che viene utilizzata per interagire con i tuoi contenuti tramite un'interfaccia visiva.
  Quando chiami i tuoi contenuti usando `useIntlayer` e l'editor è abilitato, esso avvolge automaticamente le tue stringhe con un oggetto Proxy chiamato `IntlayerNode`. Questo nodo utilizza `window.postMessage` per comunicare con un iframe incapsulato che contiene l'interfaccia dell'editor visivo.
  Dal lato dell'editor, l'editor ascolta questi messaggi e simula un'interazione reale con i tuoi contenuti, permettendoti di modificare il testo direttamente nel contesto della tua applicazione.

## Ottimizzazione della build dell'app

Per ottimizzare la dimensione del bundle della tua applicazione, Intlayer fornisce due plugin per ottimizzare la build della tua applicazione: i plugin `@intlayer/babel` e `@intlayer/swc`.

Per ottimizzare la dimensione del bundle della tua applicazione, Intlayer fornisce due plugin per ottimizzare la build della tua applicazione: i plugin `@intlayer/babel` e `@intlayer/swc`.
I plugin Babel e SWC funzionano analizzando l'Abstract Syntax Tree (AST) della tua applicazione per sostituire le chiamate alle funzioni di Intlayer con codice ottimizzato. Questo processo rende il bundle finale più leggero in produzione, assicurando che vengano importati solo i dizionari effettivamente utilizzati, ottimizzando il chunking e riducendo la dimensione del bundle.

In modalità sviluppo, Intlayer utilizza un'importazione statica centralizzata per i dizionari per semplificare l'esperienza di sviluppo.

Attivando l'opzione `importMode = "dynamic"` nella [configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md), Intlayer utilizzerà l'importazione dinamica per caricare i dizionari. Questa opzione è disattivata di default per evitare processi asincroni durante il rendering dell'applicazione.

> `@intlayer/babel` è disponibile di default nel pacchetto `vite-intlayer`,

> `@intlayer/swc` non è installato di default nel pacchetto `next-intlayer` poiché i plugin SWC sono ancora sperimentali su Next.js.

Per vedere come configurare la build della tua applicazione, puoi leggere la [documentazione di configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md).

## Pacchetti

Intlayer è composto da diversi pacchetti, ognuno con un ruolo specifico nel processo di traduzione. Ecco una rappresentazione grafica della struttura di questo pacchetto:

![pacchetti di intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/packages_dependency_graph.svg)

### intlayer

Il pacchetto `intlayer` è utilizzato nelle applicazioni per dichiarare contenuti nei file di contenuto.

### Framework Frontend

<Tabs group="framework">
  <Tab label="React" value="react">

Il pacchetto `react-intlayer` è utilizzato per interpretare i dizionari di Intlayer e renderli utilizzabili nelle applicazioni React.

  </Tab>
  <Tab label="Next.js" value="nextjs">

Il pacchetto `next-intlayer` è utilizzato come layer sopra `react-intlayer` per rendere i dizionari di Intlayer utilizzabili nelle applicazioni Next.js. Integra funzionalità essenziali per far funzionare Intlayer in un ambiente Next.js, come il middleware di traduzione, il routing o la configurazione del file `next.config.js`.

  </Tab>
  <Tab label="Vue" value="vue">

Il pacchetto `vue-intlayer` è utilizzato per interpretare i dizionari di Intlayer e renderli utilizzabili nelle applicazioni Vue.

  </Tab>
  <Tab label="Nuxt" value="nuxt">

Il pacchetto `nuxt-intlayer` è un modulo Nuxt per rendere utilizzabili i dizionari Intlayer nelle applicazioni Nuxt. Integra funzionalità essenziali per far funzionare Intlayer in un ambiente Nuxt, come il middleware per la traduzione, il routing e la configurazione del file `nuxt.config.js`.

  </Tab>
  <Tab label="Svelte" value="svelte">

Il pacchetto `svelte-intlayer` è utilizzato per interpretare i dizionari di Intlayer e renderli utilizzabili nelle applicazioni Svelte.

  </Tab>
  <Tab label="Solid" value="solid">

Il pacchetto `solid-intlayer` è utilizzato per interpretare i dizionari di Intlayer e renderli utilizzabili nelle applicazioni Solid.js.

  </Tab>
  <Tab label="Preact" value="preact">

Il pacchetto `preact-intlayer` è utilizzato per interpretare i dizionari di Intlayer e renderli utilizzabili nelle applicazioni Preact.

  </Tab>
  <Tab label="Angular" value="angular">

Il pacchetto `angular-intlayer` è utilizzato per interpretare i dizionari di Intlayer e renderli utilizzabili nelle applicazioni Angular.

  </Tab>
  <Tab label="Astro" value="astro">

Il pacchetto `astro-intlayer` fornisce gli strumenti necessari per integrare Intlayer nelle applicazioni Astro. Configura il routing basato sulla locale e la gestione dei dizionari.

  </Tab>
  <Tab label="React Native" value="react-native">

Il pacchetto `react-native-intlayer` fornisce strumenti che integrano plugin per far funzionare Intlayer con il Metro bundler.

  </Tab>
  <Tab label="Lit" value="lit">

Il pacchetto `lit-intlayer` fornisce strumenti e componenti per interpretare e utilizzare i dizionari di Intlayer nelle applicazioni Lit.

  </Tab>
  <Tab label="Vanilla JS" value="vanilla">

Il pacchetto `vanilla-intlayer` fornisce strumenti per integrare Intlayer in applicazioni JavaScript vanilla, HTML o PHP.

  </Tab>
</Tabs>

### Framework Backend

<Tabs group="backend">
  <Tab label="Express" value="express">

Il pacchetto `express-intlayer` è utilizzato per utilizzare Intlayer su un backend Express.js.

  </Tab>
  <Tab label="Fastify" value="fastify">

Il pacchetto `fastify-intlayer` fornisce un plugin per applicazioni Fastify per gestire l'internazionalizzazione. Rileva la locale dell'utente e decora l'oggetto request.

  </Tab>
  <Tab label="Hono" value="hono">

Il pacchetto `hono-intlayer` fornisce un middleware per le applicazioni Hono per gestire l'internazionalizzazione. Rileva la locale dell'utente e popola l'oggetto contesto.

  </Tab>
  <Tab label="Elysia" value="elysia">

Il pacchetto `elysia-intlayer` fornisce un plugin per applicazioni Elysia per gestire l'internazionalizzazione. Rileva la locale dell'utente e inietta un oggetto `intlayer` nel contesto della route.

  </Tab>
  <Tab label="AdonisJS" value="adonis">

Il pacchetto `adonis-intlayer` fornisce un middleware per le applicazioni AdonisJS per gestire l'internazionalizzazione. Rileva la locale dell'utente e fornisce funzioni di traduzione.

  </Tab>
</Tabs>

### vite-intlayer

Include il plugin Vite per integrare Intlayer con il [Vite bundler](https://vite.dev/guide/why.html#why-bundle-for-production), oltre a middleware per rilevare la lingua preferita dell'utente, gestire i cookie e gestire il reindirizzamento degli URL.

### react-scripts-intlayer

Include i comandi e i plugin `react-scripts-intlayer` per integrare Intlayer con le applicazioni basate su Create React App. Questi plugin si basano su [craco](https://craco.js.org/) e includono configurazioni aggiuntive per il bundler [Webpack](https://webpack.js.org/).

### eslint-plugin-intlayer

Il pacchetto `eslint-plugin-intlayer` fornisce regole ESLint e oxlint per rilevare stringhe non tradotte, convalidare le definizioni del dizionario e applicare le migliori pratiche di i18n.

### intlayer-editor

Il pacchetto `intlayer-editor` viene utilizzato per consentire l'uso dell'editor visivo. Questo pacchetto, opzionale, può essere installato nelle applicazioni e sarà utilizzato dal pacchetto `react-intlayer`.
Consiste di due parti: il server e il client.

Il client contiene elementi dell'interfaccia utente che saranno utilizzati da `react-intlayer`.

Il server, basato su Express, viene utilizzato per ricevere le richieste dell'editor visivo e gestire o modificare i file di contenuto.

### intlayer-cli

Il pacchetto `intlayer-cli` può essere utilizzato per generare dizionari utilizzando il comando `npx intlayer dictionaries build`. Se `intlayer` è già installato, la CLI viene installata automaticamente e questo pacchetto non è necessario.

### @intlayer/core

Il pacchetto `@intlayer/core` è il pacchetto principale di Intlayer. Contiene funzioni di traduzione e gestione dei dizionari. `@intlayer/core` è multipiattaforma ed è utilizzato da altri pacchetti per eseguire l'interpretazione dei dizionari.

### @intlayer/config

Il pacchetto `@intlayer/config` viene utilizzato per configurare le impostazioni di Intlayer, come le lingue disponibili, i parametri del middleware di Next.js o le impostazioni dell'editor integrato.

### @intlayer/webpack

Il pacchetto `@intlayer/webpack` viene utilizzato per fornire una configurazione Webpack per far funzionare un'applicazione basata su Webpack con Intlayer. Il pacchetto fornisce anche un plugin da aggiungere a un'applicazione Webpack esistente.

### @intlayer/cli

Il pacchetto `@intlayer/cli` è un pacchetto NPM utilizzato per dichiarare gli script relativi alle interfacce a riga di comando di Intlayer. Garantisce l'uniformità di tutti i comandi CLI di Intlayer. Questo pacchetto è consumato in particolare dai pacchetti [intlayer-cli](https://github.com/aymericzip/intlayer/tree/main/docs/it/packages/intlayer-cli/index.md) e [intlayer](https://github.com/aymericzip/intlayer/tree/main/docs/it/packages/intlayer/index.md).

### @intlayer/mcp

Il pacchetto `@intlayer/mcp` fornisce un server MCP (Model Context Protocol) che offre assistenza IDE potenziata dall'IA, specificamente progettata per l'ecosistema Intlayer. Carica automaticamente la documentazione e si integra con la CLI di Intlayer.

### @intlayer/lsp

Il pacchetto `@intlayer/lsp` fornisce un server Language Server Protocol (LSP) su misura per Intlayer. Offre funzionalità per IDE come Vai alla definizione, Trova riferimenti, anteprime al passaggio del mouse, completamento automatico delle chiavi del dizionario e avvisi di diagnostica.

### @intlayer/ai

Il pacchetto `@intlayer/ai` fornisce funzionalità SDK per le applicazioni Intlayer, consentendo la traduzione automatica e la generazione di contenuti tramite intelligenza artificiale.

### @intlayer/analytics

Il pacchetto `@intlayer/analytics` fornisce strumenti per raccogliere metriche sulle impressioni dei contenuti, analisi a livello di pagina/locale e di nodo, e supporta i test A/B dei contenuti.

### @intlayer/dictionaries-entry

Il pacchetto `@intlayer/dictionaries-entry` restituisce il percorso di ingresso dei dizionari Intlayer: i dizionari uniti dalla sua radice, e quelli non uniti, remoti, dinamici e fetch dai suoi sottopercorsi `/unmerged`, `/remote`, `/dynamic` e `/fetch`. Poiché è impossibile cercare nel filesystem dal browser, non è possibile utilizzare bundler come Webpack o Rollup per recuperare il percorso di ingresso dei dizionari. Il pacchetto e i suoi sottopercorsi sono progettati per essere aliasati, consentendo l'ottimizzazione del bundling attraverso vari bundler come Vite, Webpack e Turbopack.

### @intlayer/engine

Il pacchetto `@intlayer/engine` viene utilizzato per monitorare i file di contenuto e rigenerare il dizionario modificato ad ogni modifica.

### @intlayer/editor

Il pacchetto `@intlayer/editor` fornisce le utility relative all'editor dei dizionari. Include in particolare l'API per interfacciare un'applicazione con l'editor Intlayer e utility per manipolare i dizionari. Questo pacchetto è multipiattaforma.

### @intlayer/editor-react

Il pacchetto `@intlayer/editor-react` fornisce stati, contesti, hook e componenti per interfacciare un'applicazione React con l'editor Intlayer.

### @intlayer/babel

Il pacchetto `@intlayer/babel` fornisce strumenti che ottimizzano il bundling dei dizionari per applicazioni basate su Vite e Webpack.

### @intlayer/swc

Il pacchetto `@intlayer/swc` fornisce strumenti che ottimizzano il bundling dei dizionari per applicazioni Next.js.

### @intlayer/api

Il pacchetto `@intlayer/api` è un SDK API per interagire con il backend.

### @intlayer/design-system

Il pacchetto `@intlayer/design-system` viene utilizzato per condividere elementi di design tra il CMS e l'editor visivo.

### @intlayer/backend

Il pacchetto `@intlayer/backend` esporta tipi di backend e in futuro offrirà il backend come pacchetto autonomo.

## Chatta con la nostra documentazione intelligente

- [Fai le tue domande alla nostra documentazione intelligente](https://intlayer.org/doc/chat)

## Domande frequenti

<FAQ>

<Question title="Quando vengono compilati i dizionari, in fase di build o a runtime?">

In fase di build. Il plugin del bundler, o `npx intlayer build`, analizza i tuoi file `.content.ts`, li risolve in dizionari nella cartella `.intlayer` e genera i tipi TypeScript corrispondenti. A runtime i tuoi componenti si limitano a leggere il risultato, quindi nessun parsing o caricamento di file avviene sul percorso della richiesta.

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
<Question title="Cos'è la cartella .intlayer e dovrei committarla?">

È l'output generato: i dizionari compilati e i tipi generati. È derivata dai tuoi file di contenuto, quindi dovrebbe essere elencata in `.gitignore` e ricostruita dal tuo passo di build, esattamente come una cartella `dist`.

</Question>
<Question title="Come viene determinata la locale attiva?">

Dalle fonti elencate in `routing.storage`, in ordine: il prefisso dell'URL quando `routing.mode` ne usa uno, poi un cookie, poi l'header `Accept-Language`, poi la tua locale predefinita. Una locale scelta esplicitamente dall'utente viene persistita, quindi sopravvive alla visita successiva. Vedi il [riferimento di configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md).

</Question>
<Question title="Qual è la differenza tra dizionari locali e remoti?">

Un dizionario locale è dichiarato nel tuo codice e compilato con la tua applicazione. Un dizionario remoto è gestito nel [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_CMS.md) e risolto a runtime, quindi può cambiare senza un deployment. Entrambi vengono letti attraverso gli stessi hook, e il contenuto remoto ricade sulla dichiarazione locale quando non è disponibile.

</Question>
<Question title="Intlayer funziona senza TypeScript?">

Sì. I file di contenuto possono essere scritti in TypeScript, JavaScript, ESM, CommonJS o JSON. TypeScript è ciò che sblocca i tipi generati e l'autocompletamento, quindi è la configurazione consigliata, ma non è obbligatorio.

</Question>
<Question title="Come fanno il rendering lato server e quello lato client a condividere lo stesso contenuto?">

Il server risolve direttamente il contenuto dei componenti renderizzati lato server, quindi nessun dizionario viene inviato al client per quel markup. I componenti client leggono gli stessi dizionari attraverso il provider, che riceve la locale risolta sul server, quindi il primo render del client corrisponde all'HTML del server e non mostra un lampo di una lingua diversa.

</Question>
<Question title="Come evita Intlayer una discrepanza di idratazione sulla locale?">

La locale viene risolta una volta sul server e passata al provider, invece di essere rilevata di nuovo nel browser. Poiché il client parte dalla stessa locale che il server ha renderizzato, il markup corrisponde, cosa che di solito si rompe con il rilevamento della locale lato client.

</Question>
<Question title="Devo ricostruire quando aggiungo una traduzione?">

In sviluppo, no: il plugin osserva i tuoi file di contenuto e ricostruisce i dizionari interessati al salvataggio. In produzione i dizionari fanno parte della build, a meno che il contenuto non sia remoto, nel qual caso il [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_CMS.md) e la [sincronizzazione live](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/live.md) applicano la modifica senza un deployment.

</Question>

</FAQ>
