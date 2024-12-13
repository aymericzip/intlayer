# Come Funziona Intlayer

## Panoramica

Il ruolo di Intlayer è interpretare i file di dichiarazione del contenuto JavaScript in dizionari.

Per questo, Intlayer segue diversi passaggi:

1. Dichiarazione dei file di contenuto

   - I file di contenuto possono essere definiti in vari formati, come TypeScript, ECMAScript, CommonJS o JSON.
   - I file di contenuto possono essere definiti ovunque nel progetto, il che consente una migliore manutenzione e scalabilità. È importante rispettare le convenzioni di estensione dei file per i file di contenuto. Questa estensione è per impostazione predefinita `*.content.{js|cjs|mjs|ts|tsx|json}`, ma può essere modificata nel [file di configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/it/configuration.md).

2. Generazione di dizionari

   - I dizionari sono generati dai file di contenuto. Per impostazione predefinita, i dizionari intlayer sono generati nella directory `.intlayer/dictionary` del progetto.
   - Possono essere generati due tipi di dizionari: dizionari intlayer e dizionari i18n (beta).

3. Generazione dei tipi di dizionario

   - I tipi di dizionario sono generati dai dizionari intlayer. Per impostazione predefinita, i tipi di dizionario intlayer sono generati nella directory `.intlayer/types` del progetto.

4. Generazione dell'augmented module di Intlayer

   - L'[augmented module di Intlayer](https://www.typescriptlang.org/docs/handbook/declaration-merging.html) è una caratteristica di TypeScript che consente di definire tipi aggiuntivi per Intlayer. Questo rende l'esperienza di sviluppo più semplice suggerendo argomenti disponibili o argomenti richiesti.
     Tra i tipi generati, i tipi di dizionario intlayer o anche i tipi di configurazione della lingua vengono aggiunti al file `types/intlayer.d.ts`, e utilizzati da altri pacchetti. Per fare questo, è necessario che il file `tsconfig.json` sia configurato per includere la directory `.intlayer/types` del progetto.

5. Monitoraggio dei file di contenuto

   - I file di contenuto vengono monitorati per essere rigenerati ogni volta che vengono modificati.

6. Interpretazione del dizionario
   - I dizionari vengono infine interpretati per essere utilizzati nelle applicazioni.

## Pacchetti

Intlayer è composto da diversi pacchetti, ognuno con un ruolo specifico nel processo di traduzione. Ecco una rappresentazione grafica della struttura di questo pacchetto:

![pacchetti di intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/packages_dependency_graph.svg)

### intlayer

Il pacchetto `intlayer` è utilizzato nelle applicazioni per dichiarare contenuti nei file di contenuto.

### react-intlayer

Il pacchetto `react-intlayer` è utilizzato per interpretare i dizionari intlayer e renderli utilizzabili nelle applicazioni React.

### next-intlayer

Il pacchetto `next-intlayer` è utilizzato come strato sopra `react-intlayer` per rendere i dizionari intlayer utilizzabili nelle applicazioni Next.js. Integra funzionalità essenziali per far funzionare Intlayer in un ambiente Next.js, come middleware per la traduzione, routing o la configurazione del file `next.config.js`.

### intlayer-editor

Il pacchetto `intlayer-editor` è utilizzato per consentire l'uso dell'editor visivo. Questo pacchetto, opzionale, può essere installato nelle applicazioni e sarà utilizzato dal pacchetto `react-intlayer`.
È composto da due parti: il server e il client.

Il client contiene elementi UI che saranno utilizzati da `react-intlayer`.

Il server, basato su Express, è utilizzato per ricevere le richieste visive dell'editor e gestire o modificare i file di contenuto.

### intlayer-cli

Il pacchetto `intlayer-cli` può essere utilizzato per generare dizionari utilizzando il comando `npx intlayer build`. Se `intlayer` è già installato, il cli è installato automaticamente e questo pacchetto non è necessario.

### @intlayer/core

Il pacchetto `@intlayer/core` è il pacchetto principale di Intlayer. Contiene funzioni di gestione della traduzione e dei dizionari. `@intlayer/core` è multipiattaforma e viene utilizzato da altri pacchetti per eseguire l'interpretazione dei dizionari.

### @intlayer/config

Il pacchetto `@intlayer/config` è utilizzato per configurare le impostazioni di Intlayer, come le lingue disponibili, i parametri del middleware di Next.js o le impostazioni dell'editor integrato.

### @intlayer/webpack

Il pacchetto `@intlayer/webpack` è utilizzato per aggiungere plugin di compilazione a Next.js e React.

### @intlayer/cli

Il pacchetto `@intlayer/cli` è utilizzato per garantire l'uniformità di tutti i comandi CLI di intlayer.

### @intlayer/dictionaries-entry

Il pacchetto `@intlayer/dictionaries-entry` è un pacchetto che restituisce solo il percorso di ingresso dei dizionari intlayer. Poiché la ricerca nel filesystem è impossibile dal browser, utilizzare bundlers come Webpack o Rollup per recuperare il percorso di ingresso dei dizionari non è possibile. Questo pacchetto mira a essere aliasato.

### @intlayer/chokidar

Il pacchetto `@intlayer/chokidar` è utilizzato per monitorare i file di contenuto e rigenerare il dizionario modificato ad ogni modifica.
