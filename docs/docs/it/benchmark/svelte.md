---
createdAt: 2026-04-20
updatedAt: 2026-05-18
title: Migliore soluzione i18n per Svelte nel 2026 - Rapporto Benchmark
description: Confronta le librerie di internazionalizzazione (i18n) per Svelte come svelte-i18n, Paraglide e Intlayer. Rapporto dettagliato sulle prestazioni in termini di dimensioni del bundle, leak e reattività.
keywords:
  - benchmark
  - i18n
  - intl
  - svelte
  - prestazioni
  - intlayer
slugs:
  - doc
  - benchmark
  - svelte
author: aymericzip
applicationTemplate: https://github.com/intlayer-org/benchmark-i18n-svelte-template
history:
  - version: 8.9.8
    date: 2026-05-18
    changes: "Aggiungi comparazione delle stelle di GitHub"
  - version: 8.7.12
    date: 2026-01-06
    changes: "Inizializzazione del benchmark"
---

# Librerie i18n per Svelte - Rapporto Benchmark 2026

Questa pagina è un rapporto di benchmark per le soluzioni i18n su Svelte.

## Sommario

<Toc/>

## Benchmark Interattivo

<I18nBenchmark framework="vite-svelte" vertical/>

## Riferimento dei risultati:

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-vite_svelte.md"
width="100%"
height="600px"
style="border:none;"
/>

> [Visualizza i dati completi del benchmark](https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-vite_svelte.md)

Vedi il repository completo del benchmark [qui](https://github.com/intlayer-org/benchmark-i18n/tree/main).

## Introduzione

Le soluzioni di internazionalizzazione sono tra le dipendenze più pesanti in un'app Svelte. Il rischio principale è l'invio di contenuti non necessari: traduzioni per altre pagine e altre lingue nel bundle di una singola rotta.

Man mano che l'app cresce, questo problema può far esplodere rapidamente il JavaScript inviato al client e rallentare la navigazione.

In pratica, per le implementazioni meno ottimizzate, una pagina internazionalizzata può finire per essere diverse volte più pesante della versione senza i18n.

L'altro impatto riguarda l'esperienza dello sviluppatore (DX): come si dichiara il contenuto, i tipi, l'organizzazione dei namespace, il caricamento dinamico e la reattività al cambio di lingua.

## TL;DR

- **Intlayer**: La scelta più efficiente in termini di prestazioni (v8.7.12) con il footprint più ridotto.
- **Paraglide**: Forte candidato per il tree-shaking ma presenta una DX più complessa e un overhead di reattività.
- **svelte-i18n**: Completo e standard per Svelte, ma comporta un peso del bundle molto maggiore (~7 volte Intlayer).

## Testa la tua app

Per individuare rapidamente i problemi di leak i18n, ho configurato uno scanner gratuito disponibile [qui](https://intlayer.org/i18n-seo-scanner).

<ClickToOpenIframe src="https://intlayer.org/i18n-seo-scanner" width="100%" height="600px" style="border:none;"/>

## Il problema

Due leve sono essenziali per limitare il costo di un'app multilingue:

- Dividere il contenuto per pagina / namespace per non caricare interi dizionari quando non servono.
- Caricare la lingua corretta in modo dinamico, solo quando necessario.

Comprendere i limiti tecnici di questi approcci:

**Caricamento dinamico**

Senza caricamento dinamico, la maggior parte delle soluzioni mantiene i messaggi in memoria fin dal primo render, aggiungendo un overhead significativo per le app con molte rotte e lingue.

Con il caricamento dinamico, si accetta un compromesso: meno JS iniziale, ma a volte una richiesta extra quando si cambia lingua.

**Divisione dei contenuti (Splitting)**

Le sintassi costruite attorno a `t('a.b.c')` sono molto comode ma spesso incoraggiano a mantenere grandi oggetti JSON a runtime. Questo modello rende difficile il tree-shaking a meno che la libreria non offra una reale strategia di divisione per pagina.

## Metodologia

Per questo benchmark, abbiamo confrontato le seguenti librerie:

- `Base App` (Nessuna libreria i18n)
- `svelte-intlayer` (v8.7.12)
- `svelte-i18n` (v4.0.1)
- `@inlang/paraglide-js` (v2.17.0)

Il framework è `Svelte` con un'app multilingue di **10 pagine** e **10 lingue**.

Abbiamo confrontato **quattro strategie di caricamento**:

| Strategia                | Senza namespace (globale)                      | Con namespace (scoped)                                             |
| :----------------------- | :--------------------------------------------- | :----------------------------------------------------------------- |
| **Caricamento statico**  | **Static**: Tutto in memoria all'avvio.        | **Scoped static**: Diviso per namespace; tutto caricato all'avvio. |
| **Caricamento dinamico** | **Dynamic**: Caricamento on-demand per lingua. | **Scoped dynamic**: Caricamento granulare per namespace e lingua.  |

## Riepilogo delle strategie

- **Static**: Semplice; nessuna latenza di rete dopo il caricamento iniziale. Svantaggio: grandi dimensioni del bundle.
- **Dynamic**: Riduce il peso iniziale (lazy-loading). Ideale quando si hanno molte lingue.
- **Scoped static**: Mantiene il codice organizzato (separazione logica) senza complesse richieste di rete extra.
- **Scoped dynamic**: Il miglior approccio per il _code splitting_ e le prestazioni. Minimizza la memoria caricando solo ciò di cui la vista corrente e la lingua attiva hanno bisogno.

### Cosa ho misurato:

Ho eseguito la stessa app multilingue in un vero browser per ogni stack, quindi ho annotato cosa è effettivamente apparso sulla rete e quanto tempo ci è voluto. Le dimensioni sono riportate **dopo la normale compressione web**, perché è più vicino a quello che le persone scaricano rispetto ai conteggi del codice sorgente grezzo.

- **Dimensione della libreria di internazionalizzazione**: Dopo il bundling, il tree-shaking e la minificazione, la dimensione della libreria i18n è la dimensione del codice dei provider + store in un componente vuoto. Non include il caricamento dei file di traduzione. Risponde a quanto è costosa la libreria prima che il tuo contenuto entri in gioco.

- **JavaScript per pagina**: Per ogni route di benchmark, quanto script il browser estrae per quella visita, in media nelle pagine della suite (e tra i locale dove il rapporto li raggruppa). Le pagine pesanti sono pagine lente.

- **Perdita da altri locale**: È il contenuto della stessa pagina ma in un'altra lingua che verrebbe caricato per errore nella pagina controllata. Questo contenuto è non necessario e dovrebbe essere evitato. (ad es. il contenuto della pagina `/fr/about` nel bundle della pagina `/en/about`)

- **Perdita da altri percorsi**: La stessa idea per **altri schermi** nell'app: se il loro contenuto viene trasportato quando hai aperto solo una pagina. (ad es. il contenuto della pagina `/en/about` nel bundle della pagina `/en/contact`). Un punteggio alto suggerisce uno splitting debole o bundle troppo ampi.

- **Dimensione media del bundle dei componenti**: I pezzi comuni dell'interfaccia utente vengono misurati **uno alla volta** invece di nascondersi in un gigantesco numero di app. Mostra se l'internazionalizzazione gonfia silenziosamente i componenti quotidiani. Ad esempio, se il tuo componente esegue il rerender, caricherà tutti quei dati dalla memoria. Allegare un JSON gigante a qualsiasi componente è come collegare un grande negozio di dati inutilizzati che rallenterà le prestazioni dei tuoi componenti.

- **Reattività del cambio di lingua**: Cambio la lingua usando il controllo dell'app e cronometro quanto tempo impiega fino a quando la pagina non si è chiaramente cambiata, quello che un visitatore noterebbe, non un micro-step di laboratorio.

- **Lavoro di rendering dopo un cambio di lingua**: Un seguito più ristretto: quanta fatica l'interfaccia ha impiegato per dipingere di nuovo per la nuova lingua una volta che il cambio è in corso. Utile quando il tempo "percepito" e il costo del framework divergono.

- **Tempo di caricamento della pagina iniziale**: Dalla navigazione al browser considerando la pagina completamente caricata per gli scenari che ho testato. Buono per confrontare i cold start.

- **Tempo di idratazione**: Quando l'app lo espone, quanto tempo il client impiega a trasformare l'HTML del server in qualcosa che puoi effettivamente cliccare. Un trattino nelle tabelle significa che quella implementazione non ha fornito una figura di idratazione affidabile in questo benchmark.

## Stelle di GitHub

Le stelle di GitHub sono un forte indicatore della popolarità di un progetto, della fiducia della comunità e della pertinenza a lungo termine. Sebbene non siano una misura diretta della qualità tecnica, riflettono quanti sviluppatori trovano il progetto utile, ne seguono i progressi e sono propensi ad adottarlo. Per stimare il valore di un progetto, le stelle aiutano a confrontare la trazione tra le alternative e forniscono approfondimenti sulla crescita dell'ecosistema.

[![Star History Chart](https://api.star-history.com/chart?repos=kaisermann%2Fsvelte-i18n%2Copral%2Fparaglide-js%2Caymericzip%2Fintlayer&type=date&legend=top-left)](https://www.star-history.com/#kaisermann/svelte-i18n&opral/paraglide-js&aymericzip/intlayer)

## Risultati in dettaglio

### 1 - Soluzioni da evitare

> Nessuna soluzione chiara da evitare nell'ecosistema Svelte.

### 2 - Soluzioni accettabili

**(Paraglide)** (`@inlang/paraglide-js@2.17.0`):

`Paraglide` offre un approccio innovativo e ben ponderato. Nel contesto di un'app Vite + Svelte, il tree-shaking pubblicizzato dalla loro azienda funziona come previsto, il che è eccellente.
Ma nel caso di React + TanStack Start, il tree-shaking non ha funzionato come previsto, così come per Next.js. Detto questo, l'uso di Paraglide in un progetto Svelte e TanStack Start meriterebbe una verifica più approfondita.
Il workflow e la DX sono inoltre più complessi rispetto ad altre opzioni.
Personalmente, non amo dover rigenerare file JS prima di ogni push, il che crea un costante rischio di conflitti di merge tramite le PR. Lo strumento sembra inoltre più focalizzato su Vite che su Next.js.
Infine, rispetto ad altre soluzioni, Paraglide non utilizza uno store (es. Svelte store) per recuperare la lingua corrente per renderizzare il contenuto. Per ogni nodo analizzato, richiederà la lingua al localStorage / cookie ecc. Ciò porta all'esecuzione di logica non necessaria che impatta sulla reattività del componente.

> Nota su Paraglide: la soluzione inietta codice nella tua codebase per gli import; di conseguenza, la metrica 'lib size' nel rapporto benchmark è quasi 0. La generazione di codice è una cosa buona, perché la funzione utilizzata includerà solo la logica necessaria (prefisso ovunque vs nessun prefisso, cookie vs storage, ecc.). In confronto, Intlayer esegue questo filtraggio tramite iniezioni di variabili d'ambiente durante la build per forzare il bundler a fare tree-shaking del contenuto a seconda della logica. Grazie a ciò, Paraglide e Intlayer finiscono per essere soluzioni da 6 a 10 volte più leggere di i18next o next-intl.

**(svelte-i18n)** (`svelte-i18n@3.4.0`):

Questa soluzione soddisfa tutte le esigenze i18n in un progetto Svelte. Ma come per i18next o altre importanti soluzioni i18n, è un po' pesante (~15.9kb, circa 7 volte `svelte-intlayer`).

### 3 - Raccomandazioni

**(Intlayer)** (`svelte-intlayer@8.7.12`):

Non giudicherò personalmente `svelte-intlayer` per motivi di obiettività, essendo la mia soluzione.

### Nota personale

Questa nota è personale e non influisce sui risultati del benchmark. Tuttavia, nel mondo i18n si vede spesso un consenso attorno a un pattern come `const t = useTranslation('xx')` + `<>{t('xx.xx')}</>` per i contenuti tradotti.

Nelle app Svelte, iniettare una funzione come `Slot` è, a mio avviso, un anti-pattern. Aggiunge inoltre una complessità evitabile e un overhead di esecuzione JavaScript (anche se appena percettibile).
