# Come Funziona Intlayer

## Panoramica

Il ruolo di Intlayer è interpretare i file di dichiarazione del contenuto JavaScript in dizionari.

Per fare ciò, Intlayer passa attraverso diversi passaggi:

1. Dichiarazione dei file di contenuto

   - I file di contenuto possono essere definiti in vari formati, come TypeScript, ECMAScript, CommonJS o JSON.
   - I file di contenuto possono essere definiti ovunque nel progetto, il che consente una migliore manutenzione e scalabilità. È importante rispettare le convenzioni di estensione dei file per i file di contenuto. Questa estensione è per impostazione predefinita `*.content.{js|cjs|mjs|ts|tsx|json}`, ma può essere modificata nel [file di configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/it/configuration.md).

2. Generazione dei dizionari

   - I dizionari sono generati dai file di contenuto. Per impostazione predefinita, i dizionari di Intlayer sono generati nella directory `.intlayer/dictionary` del progetto.
   - Possono essere generati due tipi di dizionari: dizionari di Intlayer e dizionari i18n (beta).

3. Generazione dei tipi di dizionari

   - I tipi di dizionari sono generati dai dizionari di Intlayer. Per impostazione predefinita, i tipi di dizionari di Intlayer sono generati nella directory `types` del progetto.

4. Generazione dell'augmentazione del modulo Intlayer

   - L'[augmentazione del modulo](https://www.typescriptlang.org/docs/handbook/declaration-merging.html) di Intlayer è una funzionalità di TypeScript che consente di definire tipi aggiuntivi per Intlayer. Questo rende più facile l'esperienza di sviluppo suggerendo argomenti disponibili o richiesti.
     Tra i tipi generati, i tipi di dizionari di Intlayer o anche i tipi di configurazione della lingua vengono aggiunti al file `types/intlayer.d.ts` e utilizzati da altri pacchetti. Per fare ciò, è necessario che il file `tsconfig.json` sia configurato per includere la directory `types` del progetto.

5. Monitoraggio dei file di contenuto

   - I file di contenuto sono monitorati per essere rigenerati ogni volta che vengono modificati.

6. Interpretazione dei dizionari
   - I dizionari sono infine interpretati per essere utilizzati nelle applicazioni.

## Pacchetti

Intlayer è composto da diversi pacchetti, ognuno con un ruolo specifico nel processo di traduzione. Ecco una rappresentazione grafica della struttura di questo pacchetto:

![pacchetti di intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/packages_dependency_graph.svg)

### intlayer

Il pacchetto `intlayer` è utilizzato nelle applicazioni per dichiarare contenuti nei file di contenuto.

### react-intlayer

Il pacchetto `react-intlayer` è utilizzato per interpretare i dizionari di Intlayer e renderli utilizzabili nelle applicazioni React.

### next-intlayer

Il pacchetto `next-intlayer` è utilizzato come livello sopra `react-intlayer` per rendere i dizionari di Intlayer utilizzabili nelle applicazioni Next.js. Integra funzionalità essenziali per far funzionare Intlayer in un ambiente Next.js, come middleware di traduzione, routing o la configurazione del file `next.config.js`.

### vite-intlayer

Include il plugin Vite per integrare Intlayer con il [bundler Vite](https://vite.dev/guide/why.html#why-bundle-for-production), così come middleware per rilevare la lingua preferita dell'utente, gestire i cookie e gestire il reindirizzamento degli URL.

### react-scripts-intlayer

Include i comandi e i plugin `react-scripts-intlayer` per integrare Intlayer con l'applicazione basata su Create React App. Questi plugin si basano su [craco](https://craco.js.org/) e includono configurazioni aggiuntive per il bundler [Webpack](https://webpack.js.org/).

### intlayer-editor

Il pacchetto `intlayer-editor` è utilizzato per consentire l'uso dell'editor visivo. Questo pacchetto, opzionale, può essere installato nelle applicazioni e sarà utilizzato dal pacchetto `react-intlayer`.
Consiste in due parti: il server e il client.

Il client contiene elementi UI che saranno utilizzati da `react-intlayer`.

Il server, basato su Express, è utilizzato per ricevere le richieste visive dell'editor e gestire o modificare i file di contenuto.

### intlayer-cli

Il pacchetto `intlayer-cli` può essere utilizzato per generare dizionari utilizzando il comando `npx intlayer build`. Se `intlayer` è già installato, il cli è automaticamente installato e questo pacchetto non è necessario.

### @intlayer/core

Il pacchetto `@intlayer/core` è il pacchetto principale di Intlayer. Contiene funzioni di traduzione e gestione dei dizionari. `@intlayer/core` è multipiattaforma ed è utilizzato da altri pacchetti per eseguire l'interpretazione dei dizionari.

### @intlayer/config

Il pacchetto `@intlayer/config` è utilizzato per configurare le impostazioni di Intlayer, come le lingue disponibili, i parametri del middleware di Next.js o le impostazioni dell'editor integrato.

### @intlayer/webpack

Il pacchetto `@intlayer/webpack` è utilizzato per fornire una configurazione Webpack per far funzionare un'applicazione basata su Webpack con Intlayer. Il pacchetto fornisce anche un plugin da aggiungere a un'applicazione Webpack esistente.

### @intlayer/cli

Il pacchetto `@intlayer/cli` è un pacchetto NPM utilizzato per dichiarare gli script relativi alle interfacce a riga di comando dei comandi di Intlayer. Garantisce l'uniformità di tutti i comandi CLI di Intlayer. Questo pacchetto è consumato in particolare dai pacchetti [intlayer-cli](https://github.com/aymericzip/intlayer/tree/main/docs/it/packages/intlayer-cli/index.md) e [intlayer](https://github.com/aymericzip/intlayer/tree/main/docs/it/packages/intlayer/index.md).

### @intlayer/dictionaries-entry

Il pacchetto `@intlayer/dictionaries-entry` è un pacchetto che restituisce solo il percorso di ingresso dei dizionari di Intlayer. Poiché la ricerca nel filesystem è impossibile dal browser, utilizzare bundler come Webpack o Rollup per recuperare il percorso di ingresso dei dizionari non è possibile. Questo pacchetto mira a essere alias.

### @intlayer/chokidar

Il pacchetto `@intlayer/chokidar` è utilizzato per monitorare i file di contenuto e rigenerare il dizionario modificato a ogni modifica.

### @intlayer/editor

Il pacchetto `@intlayer/editor` fornisce le utilità relative all'editor di dizionari. Include in particolare l'API per interfacciare un'applicazione con l'editor di Intlayer e utilità per manipolare i dizionari. Questo pacchetto è multipiattaforma.

### @intlayer/editor-react

Il pacchetto `@intlayer/editor-react` fornisce stati, contesti, hook e componenti per interfacciare un'applicazione React con l'editor di Intlayer.

## Chatta con la nostra documentazione intelligente

- [Fai le tue domande alla nostra documentazione intelligente](https://intlayer.org/it/docs/chat)
