---
createdAt: 2026-04-20
updatedAt: 2026-05-18
title: Migliore soluzione i18n per Vue nel 2026 - Rapporto Benchmark
description: Confronta le librerie di internazionalizzazione (i18n) per Vue come vue-i18n, fluent-vue e Intlayer. Rapporto dettagliato sulle prestazioni in termini di dimensioni del bundle, leak e reattività.
keywords:
  - benchmark
  - i18n
  - intl
  - vue
  - prestazioni
  - intlayer
slugs:
  - doc
  - benchmark
  - vue
author: Aymeric PINEAU
applicationTemplate: https://github.com/intlayer-org/benchmark-i18n-vue-template
history:
  - version: 8.9.8
    date: 2026-05-18
    changes: "Aggiungi comparazione delle stelle di GitHub"
  - version: 8.7.12
    date: 2026-01-06
    changes: "Inizializzazione del benchmark"
---

# Librerie i18n per Vue - Rapporto Benchmark 2026

Questa pagina è un rapporto di benchmark per le soluzioni i18n su Vue.

## Sommario

<Toc/>

## Benchmark Interattivo

<I18nBenchmark framework="vite-vue" vertical/>

## Riferimento dei risultati:

<ClickToOpenIframe 
  src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-vite_vue.md" 
  width="100%" 
  height="600px"
  style="border:none;">
</ClickToOpenIframe>

> [Visualizza i dati completi del benchmark](https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-vite_vue.md)

Vedi il repository completo del benchmark [qui](https://github.com/intlayer-org/benchmark-i18n/tree/main).

## Introduzione

Le soluzioni di internazionalizzazione sono tra le dipendenze più pesanti in un'app Vue. Il rischio principale è l'invio di contenuti non necessari: traduzioni per altre pagine e altre lingue nel bundle di una singola rotta.

Man mano che l'app cresce, questo problema può far esplodere rapidamente il JavaScript inviato al client e rallentare la navigazione.

In pratica, per le implementazioni meno ottimizzate, una pagina internazionalizzata può finire per essere diverse volte più pesante della versione senza i18n.

L'altro impatto riguarda l'esperienza dello sviluppatore (DX): come si dichiara il contenuto, i tipi, l'organizzazione dei namespace, il caricamento dinamico e la reattività al cambio di lingua.

## TL;DR

- **Intlayer**: La soluzione più leggera (v8.7.12) con scoping e caricamento dinamico nativi.
- **vue-i18n**: Lo standard del settore con un ricco ecosistema, ma può essere significativamente più pesante e difficile da ottimizzare per il code-splitting in applicazioni di grandi dimensioni.
- **fluent-vue**: Organizzazione dei messaggi innovativa ma manca di type-safety e risulta essere una soluzione estremamente pesante.

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

Le sintassi costruite attorno a `const { t } = useI18n()` + `t('a.b.c')` sono molto comode ma spesso incoraggiano a mantenere grandi oggetti JSON a runtime. Questo modello rende difficile il tree-shaking a meno che la libreria non offra una reale strategia di divisione per pagina.

## Metodologia

Per questo benchmark, abbiamo confrontato le seguenti librerie:

- `Base App` (Nessuna libreria i18n)
- `vue-intlayer` (v8.7.12)
- `vue-i18n` (v11.4.0)
- `fluent-vue` (v3.8.2)

Il framework è `Vue` con un'app multilingue di **10 pagine** e **10 lingue**.

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

Ho eseguito la stessa app multilingue in un browser reale per ogni stack, poi ho annotato cosa passava effettivamente sulla rete e quanto tempo richiedevano le operazioni. Le dimensioni sono riportate **dopo la normale compressione web**, perché è più vicino a ciò che le persone scaricano effettivamente.

- **Dimensioni della libreria di internazionalizzazione**: Dopo il bundling, il tree-shaking e la minificazione, la dimensione della libreria i18n è la dimensione del codice dei provider + composable in un componente vuoto. Non include il caricamento dei file di traduzione. Risponde a quanto è "costosa" la libreria prima che entri in gioco il tuo contenuto.

- **JavaScript per pagina**: Per ogni rotta del benchmark, quanto script viene scaricato dal browser per quella visita, mediato tra le pagine della suite (e tra le lingue). Le pagine pesanti sono pagine lente.

- **Leak da altre lingue (Leakage)**: È il contenuto della stessa pagina ma in un'altra lingua che verrebbe caricato per errore nella pagina verificata. Questo contenuto è inutile e dovrebbe essere evitato (es. contenuto della pagina `/fr/about` nel bundle della pagina `/en/about`).

- **Leak da altre rotte**: La stessa idea per **altre schermate** nell'app: se i loro testi vengono caricati quando hai aperto solo una pagina (es. contenuto della pagina `/en/about` nel bundle della pagina `/en/contact`). Un punteggio alto indica una divisione debole o bundle troppo ampi.

- **Dimensione media del bundle del componente**: Gli elementi UI comuni vengono misurati **uno alla volta**, invece di nascondersi all'interno di un unico numero gigante dell'app. Mostra se l'internazionalizzazione gonfia silenziosamente i componenti quotidiani. Ad esempio, se il tuo componente viene renderizzato di nuovo, caricherà tutti quei dati dalla memoria. Allegare un JSON gigante a qualsiasi componente è come collegare un grande magazzino di dati inutilizzati che rallenterà le prestazioni dei tuoi componenti.

- **Reattività al cambio lingua**: Cambio la lingua usando il controllo dell'app stessa e cronometro quanto tempo passa finché la pagina non è chiaramente cambiata, quello che un visitatore noterebbe.

- **Lavoro di rendering dopo un cambio di lingua**: Un follow-up più preciso: quanto sforzo ha impiegato l'interfaccia per ridisegnarsi per la nuova lingua una volta avviato il cambio. Utile quando il tempo "percepito" e il costo del framework divergono.

- **Tempo di caricamento iniziale della pagina**: Dalla navigazione fino a quando il browser considera la pagina completamente caricata per gli scenari testati. Utile per confrontare gli avvii a freddo.

- **Tempo di idratazione (Hydration)**: Il tempo che il client impiega per trasformare l'HTML del server in un'interfaccia interattiva. Un trattino nelle tabelle significa che quella implementazione non ha fornito una cifra di idratazione affidabile in questo benchmark.

## Stelle di GitHub

Le stelle di GitHub sono un forte indicatore della popolarità di un progetto, della fiducia della comunità e della pertinenza a lungo termine. Sebbene non siano una misura diretta della qualità tecnica, riflettono quanti sviluppatori trovano il progetto utile, ne seguono i progressi e sono propensi ad adottarlo. Per stimare il valore di un progetto, le stelle aiutano a confrontare la trazione tra le alternative e forniscono approfondimenti sulla crescita dell'ecosistema.

[![Star History Chart](https://api.star-history.com/chart?repos=intlify%2Fvue-i18n%2Cfluent-vue%2Ffluent-vue%2Caymericzip%2Fintlayer&type=date&legend=top-left)](https://www.star-history.com/#intlify/vue-i18n&fluent-vue/fluent-vue&aymericzip/intlayer)

## Risultati in dettaglio

### 1 - Soluzioni da evitare

> Nessuna soluzione chiara da evitare nell'ecosistema Vue.

### 2 - Soluzioni accettabili

**(vue-i18n)** (`vue-i18n@11.4.0`):

- **vue-i18n** è senza dubbio la libreria i18n più utilizzata per Vue, ha molte funzionalità e un ecosistema immenso. Ma sotto il cofano la soluzione è piuttosto pesante. Anche se vue-i18n integra il caricamento pigro dei messaggi, manca di una funzione di scoping. Nel caso di una classica app Vue SPA non ci sono problemi, ma per un'app Nuxt, utilizzando @nuxt/i18n, ciò porta a includere i messaggi di tutte le pagine in una sola. Per una grande app Nuxt con più di 10 pagine, può diventare davvero problematico.

Il pacchetto è molto pesante (~24.3kb, circa 9 volte `vue-intlayer`).

**(fluent-vue)** (`fluent-vue@0.5.0`):

- **fluent-vue** offre un tentativo di innovazione attraverso il formato .ftl. L'organizzazione dei messaggi è ottima, più facile per iniziare. Ma in pratica, la mancanza di type-safety aumenta il rischio di errore e può diventare rapidamente dispendioso in termini di tempo per il debug. Inoltre, questa soluzione carica i messaggi tramite un plugin vite che forza il caricamento di tutto il contenuto in tutte le lingue in ogni pagina. Inoltre, è una soluzione estremamente pesante (~92.7kb, circa 34 volte `vue-intlayer`).

### 3 - Raccomandazioni

**(Intlayer)** (`vue-intlayer@8.7.12`):

Non giudicherò personalmente `vue-intlayer` per motivi di obiettività, essendo la mia soluzione.
