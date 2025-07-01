---
createdAt: 2024-08-12
updatedAt: 2025-06-29
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
---

# Come funziona Intlayer

## Panoramica

L'idea principale dietro Intlayer è adottare una gestione dei contenuti per componente. Quindi l'idea è permetterti di dichiarare i tuoi contenuti ovunque nel tuo codice, ad esempio nella stessa directory del tuo componente.

```bash
.
└── Components
    └── MyComponent
        ├── index.content.cjs
        └── index.mjs
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

3. Generazione dei tipi di dizionari
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

> Per vedere tutte le funzionalità di Intlayer, puoi leggere la [documentazione sui dizionari](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/get_started.md).

## Contenuto remoto

Intlayer ti consente di dichiarare contenuti localmente e poi esportarli nel CMS per renderli modificabili dal tuo team non tecnico.

Quindi sarai in grado di inviare e recuperare contenuti dal CMS alla tua applicazione, in modo simile a ciò che fai con Git per il tuo codice.

Per i dizionari esternalizzati che utilizzano il CMS, Intlayer esegue una semplice operazione di fetch per recuperare i dizionari remoti e li unisce con quelli locali. Se configurato nel tuo progetto, Intlayer gestirà automaticamente il recupero dei contenuti dal CMS all'avvio dell'applicazione (dev) o durante la build (prod).

## Editor visivo

Intlayer fornisce anche un editor visivo per consentirti di modificare i tuoi contenuti in modo visivo. Questo [editor visivo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_visual_editor.md) è disponibile nel pacchetto esterno `intlayer-editor`.

![editor visivo](https://github.com/aymericzip/intlayer/blob/main/docs/assets/visual_editor.gif)

- Il server è una semplice applicazione Express che ascolta le richieste dal client e recupera il contenuto della tua applicazione, come i `dictionaries` e la configurazione per renderli accessibili dal lato client.
- D'altra parte, il client è un'applicazione React che viene utilizzata per interagire con i tuoi contenuti tramite un'interfaccia visiva.
  Quando chiami i tuoi contenuti usando `useIntlayer` e l'editor è abilitato, esso avvolge automaticamente le tue stringhe con un oggetto Proxy chiamato `IntlayerNode`. Questo nodo utilizza `window.sendMessage` per comunicare con un iframe incapsulato che contiene l'interfaccia dell'editor visivo.
  Dal lato dell'editor, l'editor ascolta questi messaggi e simula un'interazione reale con i tuoi contenuti, permettendoti di modificare il testo direttamente nel contesto della tua applicazione.

## Ottimizzazione della build dell'app

Per ottimizzare la dimensione del bundle della tua applicazione, Intlayer fornisce due plugin per ottimizzare la build della tua applicazione: i plugin `@intlayer/babel` e `@intlayer/swc`.
I plugin Babel e SWC funzionano analizzando l'Abstract Syntax Tree (AST) della tua applicazione per sostituire le chiamate alle funzioni di Intlayer con codice ottimizzato. Questo processo rende il bundle finale più leggero in produzione, assicurando che vengano importati solo i dizionari effettivamente utilizzati, ottimizzando il chunking e riducendo la dimensione del bundle.

In modalità sviluppo, Intlayer utilizza un'importazione statica centralizzata per i dizionari per semplificare l'esperienza di sviluppo.

Attivando l'opzione `activateDynamicImport` nella [configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md), Intlayer utilizzerà l'importazione dinamica per caricare i dizionari. Questa opzione è disattivata di default per evitare processi asincroni durante il rendering dell'applicazione.

> `@intlayer/babel` è disponibile di default nel pacchetto `vite-intlayer`,

> `@intlayer/swc` non è installato di default nel pacchetto `next-intlayer` poiché i plugin SWC sono ancora sperimentali su Next.js.

Per vedere come configurare la build della tua applicazione, puoi leggere la [documentazione di configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md).

## Pacchetti

Intlayer è composto da diversi pacchetti, ognuno con un ruolo specifico nel processo di traduzione. Ecco una rappresentazione grafica della struttura di questo pacchetto:

![pacchetti di intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/packages_dependency_graph.svg)

### intlayer

Il pacchetto `intlayer` è utilizzato nelle applicazioni per dichiarare contenuti nei file di contenuto.

### react-intlayer

Il pacchetto `react-intlayer` è utilizzato per interpretare i dizionari di Intlayer e renderli utilizzabili nelle applicazioni React.

### next-intlayer

Il pacchetto `next-intlayer` è utilizzato come layer sopra `react-intlayer` per rendere i dizionari di Intlayer utilizzabili nelle applicazioni Next.js. Integra funzionalità essenziali per far funzionare Intlayer in un ambiente Next.js, come il middleware di traduzione, il routing o la configurazione del file `next.config.js`.

### vue-intlayer

Il pacchetto `vue-intlayer` è utilizzato per interpretare i dizionari di Intlayer e renderli utilizzabili nelle applicazioni Vue.

### nuxt-intlayer

### nuxt-intlayer

Il pacchetto `nuxt-intlayer` è un modulo Nuxt per rendere utilizzabili i dizionari Intlayer nelle applicazioni Nuxt. Integra funzionalità essenziali per far funzionare Intlayer in un ambiente Nuxt, come il middleware per la traduzione, il routing e la configurazione del file `nuxt.config.js`.

### svelte-intlayer (WIP)

Il pacchetto `svelte-intlayer` è utilizzato per interpretare i dizionari di Intlayer e renderli utilizzabili nelle applicazioni Svelte.

### solid-intlayer (WIP)

Il pacchetto `solid-intlayer` è utilizzato per interpretare i dizionari di Intlayer e renderli utilizzabili nelle applicazioni Solid.js.

### preact-intlayer

Il pacchetto `preact-intlayer` è utilizzato per interpretare i dizionari di Intlayer e renderli utilizzabili nelle applicazioni Preact.

### angular-intlayer (WIP)

### angular-intlayer (WIP)

Il pacchetto `angular-intlayer` è utilizzato per interpretare i dizionari di Intlayer e renderli utilizzabili nelle applicazioni Angular.

### express-intlayer

Il pacchetto `express-intlayer` è utilizzato per utilizzare Intlayer su un backend Express.js.

### react-native-intlayer

Il pacchetto `react-native-intlayer` fornisce strumenti che integrano plugin per far funzionare Intlayer con il Metro bundler.

### lynx-intlayer

Il pacchetto `lynx-intlayer` fornisce strumenti che integrano plugin per far funzionare Intlayer con il Lynx bundler.

### vite-intlayer

Include il plugin Vite per integrare Intlayer con il [Vite bundler](https://vite.dev/guide/why.html#why-bundle-for-production), oltre a middleware per rilevare la lingua preferita dell'utente, gestire i cookie e gestire il reindirizzamento degli URL.

### react-scripts-intlayer

Include i comandi e i plugin `react-scripts-intlayer` per integrare Intlayer con le applicazioni basate su Create React App. Questi plugin si basano su [craco](https://craco.js.org/) e includono configurazioni aggiuntive per il bundler [Webpack](https://webpack.js.org/).

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

### @intlayer/dictionaries-entry & @intlayer/unmerged-dictionaries-entry & @intlayer/dynamic-dictionaries-entry

I pacchetti `@intlayer/dictionaries-entry`, `@intlayer/unmerged-dictionaries-entry` e `@intlayer/dynamic-dictionaries-entry` restituiscono il percorso di ingresso dei dizionari Intlayer. Poiché è impossibile cercare nel filesystem dal browser, non è possibile utilizzare bundler come Webpack o Rollup per recuperare il percorso di ingresso dei dizionari. Questi pacchetti sono progettati per essere aliasati, consentendo l'ottimizzazione del bundling attraverso vari bundler come Vite, Webpack e Turbopack.

### @intlayer/chokidar

Il pacchetto `@intlayer/chokidar` viene utilizzato per monitorare i file di contenuto e rigenerare il dizionario modificato ad ogni modifica.

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

## Cronologia della documentazione

- 5.5.10 - 2025-06-29: Inizio cronologia
