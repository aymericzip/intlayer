---
createdAt: 2026-04-20
updatedAt: 2026-04-21
title: Migliore soluzione i18n per TanStack Start nel 2026 - Rapporto Benchmark
description: Confronta le librerie di internazionalizzazione per TanStack Start come react-i18next, use-intl e Intlayer. Rapporto dettagliato sulle prestazioni relative a dimensioni del bundle, leakage e reattività.
keywords:
  - benchmark
  - i18n
  - intl
  - tanstack
  - prestazioni
  - intlayer
slugs:
  - doc
  - benchmark
  - tanstack
author: Aymeric PINEAU
applicationTemplate: https://github.com/intlayer-org/benchmark-i18n-tanstack-start-template
history:
  - version: 8.7.5
    date: 2026-01-06
    changes: "Inizializzazione benchmark"
---

# Librerie i18n per TanStack Start — Rapporto Benchmark 2026

Questa pagina è un rapporto benchmark per le soluzioni i18n su TanStack Start.

## Sommario

<Toc/>

## Benchmark Interattivo

<I18nBenchmark framework="tanstack" vertical/>

## Riferimento risultati:

<iframe 
  src="https://github.com/intlayer-org/benchmark-i18n/blob/main/report/scripts/summarize-tanstack.md" 
  width="100%" 
  height="600px"
  style="border:none;">
</iframe>

> https://github.com/intlayer-org/benchmark-i18n/blob/main/report/scripts/summarize-tanstack.md

Vedi il repository completo del benchmark [qui](https://github.com/intlayer-org/benchmark-i18n/tree/main).

## Introduzione

Le soluzioni di internazionalizzazione sono tra le dipendenze più pesanti in un'app React. Su TanStack Start, il rischio principale è spedire contenuti non necessari: traduzioni per altre pagine e altre lingue nel bundle di una singola rotta.

Man mano che l'app cresce, questo problema può far esplodere rapidamente il JavaScript inviato al client e rallentare la navigazione.

In pratica, per le implementazioni meno ottimizzate, una pagina internazionalizzata può finire per essere diverse volte più pesante della versione senza i18n.

L'altro impatto riguarda la developer experience (DX): come si dichiara il contenuto, i tipi, l'organizzazione dei namespace, il caricamento dinamico e la reattività al cambio di lingua.

## Testa la tua app

Per individuare rapidamente problemi di leakage i18n, ho configurato uno scanner gratuito disponibile [qui](https://intlayer.org/i18n-seo-scanner).

<iframe src="https://intlayer.org/i18n-seo-scanner" width="100%" height="600px" style="border:none;"/>

## Il problema

Due leve sono essenziali per limitare il costo di un'app multilingue:

- Suddividere i contenuti per pagina / namespace per non caricare interi dizionari quando non servono
- Caricare la lingua corretta dinamicamente, solo quando necessario

Capire i limiti tecnici di questi approcci:

**Caricamento dinamico**

Senza caricamento dinamico, la maggior parte delle soluzioni mantiene i messaggi in memoria fin dal primo rendering, il che aggiunge un sovraccarico significativo per le app con molti percorsi e lingue.

Con il caricamento dinamico, accetti un compromesso: meno JS iniziale, ma a volte una richiesta extra quando si cambia lingua.

**Suddivisione dei contenuti (Content splitting)**

Le sintassi costruite attorno a `const t = useTranslation()` + `t('a.b.c')` sono molto comode ma spesso incoraggiano il mantenimento di grandi oggetti JSON a runtime. Quel modello rende difficile il tree-shaking a meno che la libreria non offra una reale strategia di splitting per pagina.

## Metodologia

Per questo benchmark, abbiamo confrontato le seguenti librerie:

- `Base App` (Nessuna libreria i18n)
- `react-intlayer` (v8.7.5-canary.0)
- `react-i18next` (v17.0.2)
- `use-intl` (v4.9.1)
- `@lingui/core` (v5.3.0)
- `@inlang/paraglide-js` (v2.15.1)
- `tolgee` (v7.0.0)
- `react-intl` (v10.1.1)
- `wuchale` (v0.22.11)
- `gt-react` (vlatest)
- `lingo.dev` (v0.133.9)

Il framework è `TanStack Start` con un'app multilingue di **10 pagine** e **10 lingue**.

Abbiamo confrontato **quattro strategie di caricamento**:

| Strategia                | Senza namespace (globale)                      | Con namespace (scoped)                                             |
| :----------------------- | :--------------------------------------------- | :----------------------------------------------------------------- |
| **Caricamento statico**  | **Static**: Tutto in memoria all'avvio.        | **Scoped static**: Diviso per namespace; tutto caricato all'avvio. |
| **Caricamento dinamico** | **Dynamic**: Caricamento on-demand per lingua. | **Scoped dynamic**: Caricamento granulare per namespace e lingua.  |

## Sintesi delle strategie

- **Static**: Semplice; nessuna latenza di rete dopo il caricamento iniziale. Svantaggio: grandi dimensioni del bundle.
- **Dynamic**: Riduce il peso iniziale (lazy-loading). Ideale quando si hanno molte localizzazioni.
- **Scoped static**: Mantiene il codice organizzato (separazione logica) senza requisiti di rete complessi.
- **Scoped dynamic**: Il miglior approccio per il _code splitting_ e le prestazioni. Riduce al minimo la memoria caricando solo ciò di cui la vista corrente e la lingua attiva hanno bisogno.

## Risultati nel dettaglio

### 1 — Soluzioni da evitare

Alcune soluzioni, come `gt-react` o `lingo.dev`, sono chiaramente da evitare. Combinano il vendor lock-in con l'inquinamento della base di codice. Peggio ancora: nonostante molte ore trascorse cercando di implementarle, non sono mai riuscito a farle funzionare correttamente su TanStack Start (come per Next.js con `gt-next`).

Problemi riscontrati:

**(General Translation)** (`gt-react@latest`):

- Per un'app di circa 110kb, `gt-react` può aggiungere più di 440kb extra (ordine di grandezza osservato sull'implementazione Next.js nello stesso benchmark).
- `Quota Exceeded, please upgrade your plan` al primissimo build con General Translation.
- Le traduzioni non vengono renderizzate; ottengo l'errore `Error: <T> used on the client-side outside of <GTProvider>`, che sembra essere un bug nella libreria.
- Durante l'implementazione di **gt-tanstack-start-react**, ho riscontrato anche un [problema](https://github.com/generaltranslation/gt/issues/1210#event-24510646961) con la libreria: `does not provide an export named 'printAST' - @formatjs/icu-messageformat-parser`, che causava il crash dell'applicazione. Dopo la segnalazione, il manutentore lo ha risolto in 24 ore.
- Queste librerie usano un anti-pattern tramite la funzione `initializeGT()`, impedendo al bundle di essere ripulito correttamente tramite tree-shaking.

**(Lingo.dev)** (`lingo.dev@0.133.9`):

- Quota AI superata (o dipendenza del server bloccata), rendendo build/produzione rischiosi senza pagare.
- Il compilatore perdeva quasi il 40% del contenuto tradotto. Ho dovuto riscrivere tutti i `.map` in blocchi di componenti piatti per farlo funzionare.
- La loro CLI è buggata e tendeva a resettare il file di configurazione senza motivo.
- Alla build, cancellava totalmente i JSON generati quando veniva aggiunto nuovo contenuto. Di conseguenza, poche chiavi potevano cancellare centinaia di chiavi esistenti.
- Ho riscontrato problemi di reattività con la libreria su TanStack Start: al cambio di lingua ho dovuto forzare il re-rendering del provider per farlo funzionare.

### 2 — Soluzioni sperimentali

**(Wuchale)** (`wuchale@0.22.11`):

L'idea alla base di `Wuchale` è interessante ma non ancora una soluzione praticabile. Ho riscontrato problemi di reattività con questa libreria e ho dovuto forzare il re-rendering del provider per far funzionare l'app su TanStack Start. La documentazione è inoltre piuttosto oscura, il che rende difficile l'onboarding.

### 3 — Soluzioni accettabili

**(Paraglide)** (`@inlang/paraglide-js@2.15.1`):

`Paraglide` offre un approccio innovativo e ben ponderato. Tuttavia, in questo benchmark il tree-shaking pubblicizzato non ha funzionato per la mia implementazione Next.js o per TanStack Start. Il workflow e la DX sono inoltre più complessi di altre opzioni. Personalmente non sono un fan del dover rigenerare file JS prima di ogni push, il che crea un rischio costante di conflitti di merge per gli sviluppatori tramite PR.

**(Tolgee)** (`tolgee@7.0.0`):

`Tolgee` affronta molti dei problemi menzionati in precedenza. L'ho trovato più difficile da avviare rispetto ad altri strumenti con approcci simili. Non fornisce type safety, il che rende anche molto difficile individuare le chiavi mancanti a compile time. Ho dovuto avvolgere le API di Tolgee con le mie per aggiungere il rilevamento delle chiavi mancanti.

Su TanStack Start ho avuto anche problemi di reattività: al cambio di lingua, dovevo forzare il provider a rieseguire il rendering e sottoscrivermi agli eventi di cambio lingua in modo che il caricamento in un'altra lingua si comportasse correttamente.

**(use-intl)** (`use-intl@4.9.1`):

`use-intl` è il pezzo "intl" più alla moda nell'ecosistema React (stessa famiglia di `next-intl`) ed è spesso spinto dagli assistenti AI — ma a mio avviso a torto in un contesto orientato alle prestazioni. Iniziare è abbastanza semplice. In pratica, il processo per ottimizzare e limitare i leakage è piuttosto complesso. Allo stesso modo, combinare caricamento dinamico + namespace + tipi TypeScript rallenta molto lo sviluppo.

Su TanStack Start eviti le trappole specifiche di Next.js (`setRequestLocale`, rendering statico), ma il problema di fondo è lo stesso: senza una disciplina rigida, il bundle trasporta rapidamente troppi messaggi e la manutenzione dei namespace per ogni rotta diventa faticosa.

**(react-i18next)** (`react-i18next@17.0.2`):

`react-i18next` è probabilmente l'opzione più popolare perché è stata tra le prime a soddisfare le esigenze i18n delle app JavaScript. Ha anche un ampio set di plugin della community per problemi specifici.

Tuttavia, condivide gli stessi svantaggi principali degli stack basati su `t('a.b.c')`: le ottimizzazioni sono possibili ma richiedono molto tempo, e i grandi progetti rischiano cattive pratiche (namespace + caricamento dinamico + tipi).

I formati dei messaggi divergono inoltre: `use-intl` usa ICU MessageFormat, mentre `i18next` usa il proprio formato — il che complica il tooling o le migrazioni se li mescoli.

**(Lingui)** (`@lingui/core@5.3.0`):

`Lingui` è spesso elogiato. Personalmente ho trovato il workflow attorno a `lingui extract` / `lingui compile` più complesso di altri approcci, senza un chiaro vantaggio in questo benchmark su TanStack Start. Ho anche notato sintassi inconsistenti che confondono le AI (es. `t()`, `t''`, `i18n.t()`, `<Trans>`).

**(react-intl)** (`react-intl@10.1.1`):

`react-intl` è un'implementazione performante del team Format.js. La DX rimane prolissa: `const intl = useIntl()` + `intl.formatMessage({ id: "xx.xx" })` aggiunge complessità, lavoro extra JavaScript e lega l'istanza globale i18n a molti nodi nell'albero React.

### 4 — Raccomandazioni

Questo benchmark su TanStack Start non ha un equivalente diretto di `next-translate` (plugin Next.js + `getStaticProps`). Per i team che vogliono davvero un'API `t()` con un ecosistema maturo, `react-i18next` e `use-intl` rimangono scelte "ragionevoli" — ma preparatevi a investire molto tempo nell'ottimizzazione per evitare leakage.

**(Intlayer)** (`react-intlayer@8.7.5-canary.0`):

Non giudicherò personalmente `react-intlayer` per motivi di obiettività, essendo la mia propria soluzione.

### Nota personale

Questa nota è personale e non influisce sui risultati del benchmark. Tuttavia, nel mondo i18n si vede spesso un consenso attorno a un pattern come `const t = useTranslation('xx')` + `<>{t('xx.xx')}</>` per il contenuto tradotto.

Nelle app React, iniettare una funzione come `ReactNode` è, a mio avviso, un anti-pattern. Inoltre aggiunge una complessità evitabile e un sovraccarico di esecuzione JavaScript (anche se è appena percettibile).
