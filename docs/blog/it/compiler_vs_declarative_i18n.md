---
createdAt: 2025-11-24
updatedAt: 2025-11-24
title: Compiler vs. i18n Dichiarativo
description: Esplorare i compromessi architetturali tra l'internazionalizzazione "magica" basata su compiler e la gestione esplicita e dichiarativa dei contenuti.
keywords:
  - Intlayer
  - Internazionalizzazione
  - Blog
  - Next.js
  - JavaScript
  - React
  - i18n
  - Compiler
  - Dichiarativo
slugs:
  - blog
  - compiler-vs-declarative-i18n
---

# Argomenti a favore e contro l'i18n basato su Compiler

Se sviluppi applicazioni web da più di un decennio, sai che l'Internazionalizzazione (i18n) è sempre stata un punto di attrito. Spesso è il compito che nessuno vuole fare: estrarre stringhe, gestire file JSON e preoccuparsi delle regole di pluralizzazione.

Recentemente, è emersa una nuova ondata di **strumenti i18n "basati su Compiler"**, promettendo di far sparire questo problema. Il messaggio è seducente: **Scrivi semplicemente il testo nei tuoi componenti e lascia che lo strumento di build si occupi del resto.** Niente chiavi, niente importazioni, solo magia.

Ma come per tutte le astrazioni nell'ingegneria del software, la magia ha un prezzo.

In questo post del blog, esploreremo il passaggio dalle librerie dichiarative agli approcci basati su compiler, i debiti architetturali nascosti che introducono e perché il modo "noioso" potrebbe ancora essere il migliore per applicazioni professionali.

## Una breve storia dell'internazionalizzazione

Per capire dove siamo, dobbiamo guardare indietro a dove siamo partiti.

Intorno al 2011–2012, il panorama JavaScript era molto diverso. I bundler come li conosciamo oggi (Webpack, Vite) non esistevano o erano alle prime fasi di sviluppo. Incollavamo gli script direttamente nel browser. In questo periodo nacquero librerie come **i18next**.

Risolvevano il problema nel modo unico possibile all'epoca: **Dizionari a Runtime**. Caricavi un enorme oggetto JSON in memoria, e una funzione cercava le chiavi al volo. Era affidabile, esplicito e funzionava ovunque.

Avanzando fino ad oggi, abbiamo potenti compiler (SWC, bundler basati su Rust) che possono analizzare Abstract Syntax Trees (AST) in millisecondi. Questa potenza ha dato vita a una nuova idea: _Perché gestiamo manualmente le chiavi? Perché il compiler non può semplicemente vedere il testo "Hello World" e sostituirlo per noi?_

Così nacque l'i18n basato su compiler.

> **Esempio di i18n basato su compiler:**
>
> - Paraglide (Moduli tree-shaken che compilano ogni messaggio in una piccola funzione ESM in modo che i bundler possano eliminare automaticamente le localizzazioni e le chiavi non utilizzate. Importi i messaggi come funzioni invece di fare ricerche con chiavi stringa.)
> - LinguiJS (Compiler da macro a funzione che riscrive le macro dei messaggi come `<Trans>` in normali chiamate di funzione JS al momento della build. Ottieni la sintassi ICU/MessageFormat con un footprint runtime molto ridotto.)
> - Lingo.dev (Si concentra sull'automatizzazione della pipeline di localizzazione iniettando contenuti tradotti direttamente durante la build della tua applicazione React. Può generare automaticamente traduzioni usando l'AI e integrarsi direttamente in CI/CD.)
> - Wuchale (Preprocessore orientato a Svelte che estrae il testo inline nei file .svelte e lo compila in funzioni di traduzione senza wrapper. Evita le chiavi stringa e separa completamente la logica di estrazione del contenuto dal runtime principale dell'applicazione.)
> - Intlayer (Compiler / CLI di estrazione che analizza i tuoi componenti, genera dizionari tipizzati e può opzionalmente riscrivere il codice per usare contenuti espliciti di Intlayer. L'obiettivo è usare il compiler per velocità mantenendo un core dichiarativo e agnostico rispetto al framework.)

> **Esempio di i18n dichiarativo:**
>
> - i18next / react-i18next / next-i18next (Lo standard maturo del settore che utilizza dizionari JSON a runtime e un ampio ecosistema di plugin)
> - react-intl (Parte della libreria FormatJS, focalizzata sulla sintassi standard dei messaggi ICU e sulla formattazione rigorosa dei dati)
> - next-intl (Ottimizzato specificamente per Next.js con integrazione per l'App Router e React Server Components)
> - vue-i18n / @nuxt/i18n (La soluzione standard dell'ecosistema Vue che offre blocchi di traduzione a livello di componente e una stretta integrazione con la reattività)
> - svelte-i18n (Un wrapper leggero attorno agli store di Svelte per traduzioni reattive a runtime)
> - angular-translate (La libreria di traduzione dinamica legacy che si basa sulla ricerca delle chiavi a runtime anziché sulla fusione a build-time)
> - angular-i18n (L'approccio nativo di Angular ahead-of-time che fonde i file XLIFF direttamente nei template durante la build)
> - Tolgee (Combina codice dichiarativo con un SDK in-context per la modifica "click-to-translate" direttamente nell'interfaccia utente)
> - Intlayer (Approccio per componente, utilizzando file di dichiarazioni di contenuto che abilitano tree-shaking nativo e validazione TypeScript)

## Il Compilatore Intlayer

Sebbene **Intlayer** sia una soluzione che incoraggia fondamentalmente un **approccio dichiarativo** ai tuoi contenuti, include un compilatore per aiutare ad accelerare lo sviluppo o facilitare il prototipaggio rapido.

Il compilatore Intlayer attraversa l'AST (Abstract Syntax Tree) dei tuoi componenti React, Vue o Svelte, così come altri file JavaScript/TypeScript. Il suo ruolo è rilevare le stringhe hardcoded ed estrarle in dichiarazioni `.content` dedicate.

> Per maggiori dettagli, consulta la documentazione: [Intlayer Compiler Docs](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/compiler.md)

## Il Fascino del Compiler (L'Approccio "Magico")

C'è un motivo per cui questo nuovo approccio è di tendenza. Per uno sviluppatore, l'esperienza è incredibile.

### 1. Velocità e "Flow"

Quando sei nel flusso, fermarti a pensare a un nome semantico per una variabile (`home_hero_title_v2`) interrompe il tuo flusso. Con un approccio basato su compiler, digiti `<p>Welcome back</p>` e continui. L'attrito è zero.

### 2. La Missione di Salvataggio del Legacy

Immagina di ereditare una codebase enorme con 5.000 componenti e zero traduzioni. Adattare questo con un sistema manuale basato su chiavi è un incubo che dura mesi. Uno strumento basato su compiler agisce come una strategia di salvataggio, estraendo istantaneamente migliaia di stringhe senza che tu debba toccare manualmente un singolo file.

### 3. L'Era dell'AI

Questo è un vantaggio moderno che non dovremmo trascurare. Gli assistenti di codifica AI (come Copilot o ChatGPT) generano naturalmente JSX/HTML standard. Non conoscono il tuo schema specifico di chiavi di traduzione.

- **Dichiarativo:** Devi riscrivere l'output dell'AI per sostituire il testo con le chiavi.
- **Compiler:** Copi e incolli il codice dell'AI, e funziona semplicemente.

## Il Controllo della Realtà: Perché la "Magia" è Pericolosa

Sebbene la "magia" sia allettante, l'astrazione presenta delle falle. Affidarsi a uno strumento di build per comprendere l'intento umano introduce fragilità architetturali.

### Fragilità euristica (Il gioco delle ipotesi)

Il compilatore deve indovinare cosa è contenuto e cosa è codice. Questo porta a casi limite in cui finisci per "combattere" con lo strumento.

Considera questi scenari:

- Viene estratto `<span className="active"></span>`? (È una stringa, ma probabilmente una classe).
- Viene estratto `<span status="pending"></span>`? (È un valore di prop).
- Viene estratto `<span>{"Hello World"}</span>`? (È un'espressione JS).
- Viene estratto `<span>Hello {name}. How are you?</span>`? (L'interpolazione è complessa).
- Viene estratto `<span aria-label="Image of cat"></span>`? (Gli attributi di accessibilità necessitano traduzione).
- `<span data-testid="my-element"></span>` viene estratto? (Gli ID di test NON devono essere tradotti).
- `<MyComponent errorMessage="An error occurred" />` viene estratto?
- `<p>This is a paragraph{" "}\n containing multiple lines</p>` viene estratto?
- Il risultato della funzione `<p>{getStatusMessage()}</p>` viene estratto?
- `<div>{isLoading ? "The page is loading" : <MyComponent/>} </div>` viene estratto?
- Un ID prodotto come `<span>AX-99</span>` viene estratto?

Inevitabilmente si finisce per aggiungere commenti specifici (come `// ignore-translation`, o proprietà specifiche come `data-compiler-ignore="true"`) per evitare che ciò comprometta la logica della tua applicazione.

### Come gestisce Intlayer questa complessità?

Intlayer utilizza un approccio misto per rilevare se un campo deve essere estratto per la traduzione, cercando di minimizzare i falsi positivi:

1.  **Analisi AST:** Controlla il tipo di elemento (ad esempio, distinguendo tra un `reactNode`, un `label` o una prop `title`).
2.  **Riconoscimento di pattern:** Rileva se la stringa è maiuscola o include spazi, suggerendo che probabilmente si tratta di testo leggibile dall'utente piuttosto che di un identificatore di codice.

### Il limite massimo per i dati dinamici

L'estrazione del compilatore si basa sull'**analisi statica**. Deve vedere la stringa letterale nel tuo codice per generare un ID stabile.
Se la tua API restituisce una stringa di codice errore come `server_error`, non puoi tradurla con un compilatore perché il compilatore non sa che quella stringa esiste al momento della build. Sei costretto a costruire un sistema secondario "solo a runtime" esclusivamente per i dati dinamici.

### Mancanza di suddivisione in chunk

Alcuni compilatori non suddividono le traduzioni per pagina. Se il tuo compilatore genera un grande file JSON per lingua (ad esempio, `./lang/en.json`, `./lang/fr.json`, ecc.), probabilmente finirai per caricare il contenuto di tutte le tue pagine per una singola pagina visitata. Inoltre, ogni componente che utilizza il tuo contenuto sarà probabilmente idratato con molto più contenuto del necessario, causando potenzialmente problemi di performance.

Fai anche attenzione a caricare le tue traduzioni dinamicamente. Se questo non viene fatto, caricherai contenuti per tutte le lingue oltre a quella corrente.

> Per illustrare il problema, considera un sito con 10 pagine e 10 lingue (tutte al 100% uniche). Caricheresti contenuti per 99 pagine aggiuntive (10 × 10 - 1).

### "Esplosione di chunk" e Network Waterfalls

Per risolvere il problema del chunking, alcune soluzioni offrono il chunking per componente, o addirittura per chiave. Tuttavia, il problema è solo parzialmente risolto. Il punto di forza di queste soluzioni è spesso dire "Il tuo contenuto è tree-shaken."

Infatti, se carichi contenuti staticamente, la tua soluzione eliminerà tramite tree-shaking i contenuti inutilizzati, ma finirai comunque per avere contenuti di tutte le lingue caricati con la tua applicazione.

Allora perché non caricarlo dinamicamente? Sì, in quel caso caricherai più contenuti del necessario, ma non è senza compromessi.

Caricare i contenuti dinamicamente isola ogni pezzo di contenuto nel proprio chunk, che verrà caricato solo quando il componente viene renderizzato. Questo significa che farai una richiesta HTTP per ogni blocco di testo. 1.000 blocchi di testo nella tua pagina? → 1.000 richieste HTTP ai tuoi server. E per limitare i danni e ottimizzare il tempo di primo rendering della tua applicazione, dovrai inserire più confini di Suspense o Skeleton Loaders.

> Nota: Anche con Next.js e SSR, i tuoi componenti verranno comunque idratati dopo il caricamento, quindi le richieste HTTP verranno comunque effettuate.

La soluzione? Adottare una soluzione che consenta di dichiarare contenuti con ambito limitato, come fanno `i18next`, `next-intl` o `intlayer`.

> Nota: `i18next` e `next-intl` richiedono di gestire manualmente l'importazione dei namespace / messaggi per ogni pagina per ottimizzare la dimensione del bundle. Dovresti utilizzare un analizzatore di bundle come `rollup-plugin-visualizer` (vite), `@next/bundle-analyzer` (next.js) o `webpack-bundle-analyzer` (React CRA / Angular / ecc.) per rilevare se stai inquinando il tuo bundle con traduzioni inutilizzate.

### Sovraccarico delle Prestazioni a Runtime

Per rendere le traduzioni reattive (così si aggiornano istantaneamente quando cambi lingua), il compilatore spesso inietta hook di gestione dello stato in ogni componente.

- **Il costo:** Se renderizzi una lista di 5.000 elementi, stai inizializzando 5.000 hook `useState` e `useEffect` solo per il testo. React deve identificare e ri-renderizzare simultaneamente tutti e 5.000 i consumatori. Questo causa un enorme blocco del "Main Thread", congelando l'interfaccia utente durante il cambio. Questo consuma memoria e cicli CPU che le librerie dichiarative (che tipicamente usano un singolo provider Context) risparmiano.

> Nota che il problema è simile anche per altri framework oltre a React.

## La trappola: Vendor Lock-in

Fai attenzione a scegliere una soluzione i18n che permetta l'estrazione o la migrazione delle chiavi di traduzione.

Nel caso di una libreria dichiarativa, il tuo codice sorgente contiene esplicitamente la tua intenzione di traduzione: queste sono le tue chiavi, e le controlli tu. Se vuoi cambiare libreria, generalmente devi solo aggiornare l'import.

Con un approccio basato su un compilatore, il tuo codice sorgente potrebbe essere solo testo in inglese semplice, senza traccia della logica di traduzione: tutto è nascosto nella configurazione dello strumento di build. Se quel plugin non viene più mantenuto o vuoi cambiare soluzione, potresti rimanere bloccato. Non c'è un modo semplice per "estrarre": non ci sono chiavi utilizzabili nel tuo codice, e potresti dover rigenerare tutte le tue traduzioni per una nuova libreria.

Alcune soluzioni offrono anche servizi di generazione delle traduzioni. Finiscono i crediti? Finiscono le traduzioni.

I compilatori spesso hashano il testo (ad esempio, `"Hello World"` -> `x7f2a`). I tuoi file di traduzione appaiono come `{ "x7f2a": "Hola Mundo" }`. La trappola: se cambi libreria, la nuova libreria vede `"Hello World"` e cerca quella chiave. Non la troverà perché il tuo file di traduzione è pieno di hash (`x7f2a`).

### Dipendenza dalla Piattaforma

Scegliendo un approccio basato su compilatore, ti leghi alla piattaforma sottostante. Ad esempio, alcuni compilatori non sono disponibili per tutti i bundler (come Vite, Turbopack o Metro). Questo può rendere difficili le migrazioni future e potresti dover adottare più soluzioni per coprire tutte le tue applicazioni.

## L'altro lato: rischi dell'approccio dichiarativo

Per essere onesti, anche il modo dichiarativo tradizionale non è perfetto. Ha i suoi "colpi mancini".

1.  **Inferno dei namespace:** Spesso devi gestire manualmente quali file JSON caricare (`common.json`, `dashboard.json`, `footer.json`). Se ne dimentichi uno, l'utente vede le chiavi raw.
2.  **Over-fetching:** Senza una configurazione attenta, è molto facile caricare accidentalmente _tutte_ le tue chiavi di traduzione per _tutte_ le pagine al caricamento iniziale, gonfiando la dimensione del tuo bundle.
3.  **Sync Drift:** È comune che le chiavi rimangano nel file JSON molto tempo dopo che il componente che le utilizzava è stato eliminato. I tuoi file di traduzione crescono indefinitamente, pieni di "chiavi zombie".

## Il Giusto Mezzo di Intlayer

È qui che strumenti come **Intlayer** cercano di innovare. Intlayer comprende che, sebbene i compilatori siano potenti, la magia implicita è pericolosa.

Intlayer offre un approccio misto, permettendoti di beneficiare dei vantaggi di entrambi gli approcci: gestione dichiarativa dei contenuti, anche compatibile con il suo compilatore per risparmiare tempo di sviluppo.

E anche se non usi il compilatore Intlayer, Intlayer offre un comando `transform` (accessibile anche tramite l'estensione VSCode). Invece di fare solo magia nel passaggio di build nascosto, può effettivamente **riscrivere il codice del tuo componente**. Scansiona il tuo testo e lo sostituisce con dichiarazioni di contenuto esplicite nel tuo codebase.

Questo ti offre il meglio di entrambi i mondi:

1.  **Granularità:** Mantieni le tue traduzioni vicine ai tuoi componenti (migliorando la modularità e il tree-shaking).
2.  **Sicurezza:** La traduzione diventa codice esplicito, non magia nascosta a tempo di build.
3.  **Nessun Lock-in:** Poiché il codice viene trasformato in una struttura dichiarativa all'interno del tuo repository, puoi facilmente premere tab, o usare il copilot del tuo IDE, per generare le tue dichiarazioni di contenuto, senza nascondere logica in un plugin webpack.

## Conclusione

Quindi, quale dovresti scegliere?

**Se stai costruendo un MVP, o vuoi muoverti rapidamente:**  
L'approccio basato sul compilatore è una scelta valida. Ti permette di muoverti incredibilmente velocemente. Non devi preoccuparti della struttura dei file o delle chiavi. Devi solo costruire. Il debito tecnico sarà un problema per il "Te futuro".

**Se sei uno sviluppatore junior, o non ti interessa l'ottimizzazione:**  
Se vuoi la gestione manuale minima, un approccio basato sul compilatore è probabilmente il migliore. Non dovrai gestire tu stesso chiavi o file di traduzione—scrivi semplicemente il testo, e il compilatore automatizza il resto. Questo riduce lo sforzo di configurazione e gli errori comuni di i18n legati ai passaggi manuali.

**Se stai internazionalizzando un progetto esistente che include già migliaia di componenti da rifattorizzare:**  
Un approccio basato sul compilatore può essere una scelta pragmatica in questo caso. La fase iniziale di estrazione può far risparmiare settimane o mesi di lavoro manuale. Tuttavia, considera l'uso di uno strumento come il comando `transform` di Intlayer, che può estrarre le stringhe e convertirle in dichiarazioni di contenuto dichiarativo esplicite. Questo ti offre la velocità dell'automazione mantenendo la sicurezza e la portabilità di un approccio dichiarativo. Ottieni il meglio di entrambi i mondi: una migrazione iniziale rapida senza debito architetturale a lungo termine.

**Se stai costruendo un'applicazione professionale di livello enterprise:**
La magia è generalmente una cattiva idea. Hai bisogno di controllo.

- Devi gestire dati dinamici provenienti dai backend.
- Devi garantire le prestazioni su dispositivi di fascia bassa (evitando esplosioni di hook).
- Devi assicurarti di non rimanere vincolato per sempre a uno specifico strumento di build.

Per le applicazioni professionali, la **Gestione Contenuti Dichiarativa** (come Intlayer o librerie consolidate) rimane lo standard d'eccellenza. Essa separa le tue preoccupazioni, mantiene pulita l'architettura e garantisce che la capacità della tua applicazione di supportare più lingue non dipenda da un compilatore "scatola nera" che indovina le tue intenzioni.
