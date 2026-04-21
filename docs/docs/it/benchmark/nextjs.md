---
createdAt: 2026-04-20
updatedAt: 2026-04-21
title: Migliore soluzione i18n per Next.js nel 2026 - Rapporto Benchmark
description: Confronta le librerie di internazionalizzazione (i18n) per Next.js come next-intl, next-i18next e Intlayer. Rapporto dettagliato sulle prestazioni relative a dimensioni del bundle, leakage e reattività.
keywords:
  - benchmark
  - i18n
  - intl
  - nextjs
  - prestazioni
  - intlayer
slugs:
  - doc
  - benchmark
  - nextjs
author: Aymeric PINEAU
applicationTemplate: https://github.com/intlayer-org/benchmark-i18n
history:
  - version: 8.7.5
    date: 2026-01-06
    changes: "Inizializzazione benchmark"
---

# Librerie i18n per Next.js — Rapporto Benchmark 2026

Questa pagina è un rapporto benchmark per le soluzioni i18n su Next.js.

## Sommario

<Toc/>

## Benchmark Interattivo

<I18nBenchmark framework="nextjs" vertical/>

## Riferimento risultati:

<iframe 
  src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-nextjs.md" 
  width="100%" 
  height="600px"
  style="border:none;">
</iframe>

> https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-nextjs.md

Vedi il repository completo del benchmark [qui](https://github.com/intlayer-org/benchmark-i18n).

## Introduzione

Le librerie di internazionalizzazione hanno un impatto pesante sulla tua applicazione. Il rischio principale è caricare contenuti per ogni pagina e ogni lingua quando l'utente visita solo una pagina.

Man mano che l'app cresce, le dimensioni del bundle possono aumentare esponenzialmente, il che può compromettere notevolmente le prestazioni.

Ad esempio, nei casi peggiori, una volta internazionalizzata, la tua pagina può finire per essere quasi 4 volte più grande.

Un altro impatto delle librerie i18n è il rallentamento dello sviluppo. Trasformare i componenti in contenuti multilingue in diverse lingue richiede tempo.

Poiché il problema è difficile, esistono molte soluzioni, alcune focalizzate sulla DX (Developer Experience), altre sulle prestazioni o sulla scalabilità, e così via.

Intlayer cerca di ottimizzare tutte queste dimensioni.

## Testa la tua app

Per far emergere questi problemi, ho creato uno scanner gratuito che puoi provare [qui](https://intlayer.org/i18n-seo-scanner).

<iframe src="https://intlayer.org/i18n-seo-scanner" width="100%" height="600px" style="border:none;"/>

## Il problema

Esistono due modi principali per limitare l'impatto di un'app multilingue sul bundle:

- Dividere i JSON (o contenuti) tra file / variabili / namespace in modo che il bundler possa scartare (tree-shake) i contenuti inutilizzati per una data pagina
- Caricare dinamicamente i contenuti della pagina solo nella lingua dell'utente

Limitazioni tecniche di questi approcci:

**Caricamento dinamico**

Anche quando dichiari percorsi come `[locale]/page.tsx`, con Webpack o Turbopack, e anche se `generateStaticParams` è definito, il bundler non tratta `locale` come una costante statica. Ciò significa che potrebbe includere contenuti per tutte le lingue in ogni pagina. Il modo principale per limitare questo è caricare i contenuti tramite un import dinamico (es. `import('./locales/${locale}.json')`).

Ciò che accade al build time è che Next.js emette un bundle JS per lingua (es. `./locales_it_12345.js`). Dopo che il sito è stato inviato al client, quando la pagina viene eseguita, il browser effettua una richiesta HTTP aggiuntiva per il file JS necessario (es. `./locales_it_12345.js`).

> Un altro modo per affrontare lo stesso problema è usare `fetch()` per caricare dinamicamente i JSON. È così che funziona `Tolgee` quando i JSON risiedono sotto `/public`, o `next-translate`, che si affida a `getStaticProps` per caricare i contenuti. Il flusso è lo stesso: il browser effettua una richiesta HTTP aggiuntiva per caricare l'asset.

**Suddivisione dei contenuti (Content splitting)**

Se usi una sintassi come `const t = useTranslation()` + `t('my-object.my-sub-object.my-key')`, l'intero JSON deve solitamente essere presente nel bundle in modo che la libreria possa analizzarlo e risolvere la chiave. Gran parte di quel contenuto viene spedito anche quando è inutilizzato nella pagina.

Per mitigare questo, alcune librerie chiedono di dichiarare per pagina quali namespace caricare — es. `next-i18next`, `next-intl`, `lingui`, `next-translate`, `next-international`.

Al contrario, `Paraglide` aggiunge un passaggio extra prima della build per trasformare i JSON in simboli piatti come `const en_my_var = () => 'my value'`. In teoria questo abilita il tree-shaking dei contenuti inutilizzati nella pagina. Come vedremo, questo metodo presenta comunque dei compromessi.

Infine, `Intlayer` applica un'ottimizzazione build-time in modo che `useIntlayer('my-key')` venga sostituito direttamente con il contenuto corrispondente.

## Metodologia

Per questo benchmark, abbiamo confrontato le seguenti librerie:

- `Base App` (Nessuna libreria i18n)
- `next-intlayer` (v8.7.5)
- `next-i18next` (v16.0.5)
- `next-intl` (v4.9.1)
- `@lingui/core` (v5.3.0)
- `next-translate` (v3.1.2)
- `next-international` (v1.3.1)
- `@inlang/paraglide-js` (v2.15.1)
- `tolgee` (v7.0.0)
- `@lingo.dev/compiler` (v0.4.0)
- `wuchale` (v0.22.11)
- `gt-next` (v6.16.5)

Ho utilizzato `Next.js` versione `16.2.4` con App Router.

Ho costruito un'app multilingue con **10 pagine** e **10 lingue**.

Ho confrontato **quattro strategie di caricamento**:

| Strategia                | Senza namespace (globale)                      | Con namespace (scoped)                                             |
| :----------------------- | :--------------------------------------------- | :----------------------------------------------------------------- |
| **Caricamento statico**  | **Static**: Tutto in memoria all'avvio.        | **Scoped static**: Diviso per namespace; tutto caricato all'avvio. |
| **Caricamento dinamico** | **Dynamic**: Caricamento on-demand per lingua. | **Scoped dynamic**: Caricamento granulare per namespace e lingua.  |

## Sintesi delle strategie

- **Static**: Semplice; nessuna latenza di rete dopo il caricamento iniziale. Svantaggio: grandi dimensioni del bundle.
- **Dynamic**: Riduce il peso iniziale (lazy-loading). Ideale quando si hanno molte localizzazioni.
- **Scoped static**: Mantiene il codice organizzato (separazione logica) senza requisiti di rete complessi.
- **Scoped dynamic**: Il miglior approccio per il _code splitting_ e le prestazioni. Riduce al minimo la memoria caricando solo ciò di cui la vista corrente e la lingua attiva hanno bisogno.

### Cosa ho misurato:

Ho eseguito la stessa applicazione multilingue in un browser reale per ogni stack, quindi ho annotato cosa è apparso effettivamente sulla rete e quanto tempo hanno impiegato le operazioni. Le dimensioni sono riportate **dopo la normale compressione web**, poiché è più vicina a ciò che le persone scaricano realmente rispetto al conteggio dei sorgenti grezzi.

- **Dimensioni della libreria di internazionalizzazione**: Dopo bundling, tree-shaking e minificazione, la dimensione della libreria i18n è la dimensione dei provider (es. `NextIntlClientProvider`) + il codice degli hook (es. `useTranslations`) in un componente vuoto. Non include il caricamento dei file di traduzione. Risponde a quanto sia "costosa" la libreria prima che entrino in gioco i tuoi contenuti.

- **JavaScript per pagina**: Per ogni percorso del benchmark, quanto script il browser scarica per quella visita, mediato su tutte le pagine della suite (e su tutte le lingue dove il rapporto le raggruppa). Le pagine pesanti sono pagine lente.

- **Leakage da altre lingue**: È il contenuto della stessa pagina ma in un'altra lingua che verrebbe caricato per errore nella pagina esaminata. Questo contenuto è superfluo e dovrebbe essere evitato (es. contenuto della pagina `/fr/about` nel bundle della pagina `/en/about`).

- **Leakage da altri percorsi**: La stessa idea per le **altre schermate** nell'app: se i loro testi sono inclusi nel bundle quando hai aperto solo una pagina (es. contenuto della pagina `/en/about` nel bundle della pagina `/en/contact`). Un punteggio elevato suggerisce uno splitting debole o bundle eccessivamente ampi.

- **Dimensione media del bundle per componente**: I pezzi comuni della UI vengono misurati **uno alla volta** invece di nascondersi all'interno di un unico numero gigante dell'app. Mostra se l'internazionalizzazione gonfia silenziosamente i componenti quotidiani. Ad esempio, se il tuo componente esegue un re-rendering, caricherà tutti quei dati dalla memoria. Allegare un JSON gigante a qualsiasi componente è come collegare un grande magazzino di dati inutilizzati che rallenterà le prestazioni dei tuoi componenti.

- **Reattività al cambio di lingua**: Cambio la lingua usando il controllo dell'app e cronometro quanto tempo ci vuole finché la pagina non è chiaramente cambiata — ciò che un visitatore noterebbe, non un micro-passaggio di laboratorio.

- **Lavoro di rendering dopo un cambio di lingua**: Un approfondimento: quanto sforzo ha impiegato l'interfaccia per ridisegnarsi per la nuova lingua una volta avviato il cambio. Utile quando il tempo "percepito" e il costo del framework divergono.

- **Tempo di caricamento iniziale della pagina**: Dalla navigazione fino a quando il browser considera la pagina completamente caricata per gli scenari che ho testato. Ottimo per confrontare i caricamenti a freddo (cold start).

- **Tempo di idratazione (Hydration)**: Quando l'app lo espone, quanto tempo impiega il client per trasformare l'HTML del server in qualcosa su cui si può effettivamente cliccare. Un trattino nelle tabelle significa che quell'implementazione non ha fornito un dato di idratazione affidabile in questo benchmark.

## Risultati nel dettaglio

### 1 — Soluzioni da evitare

Alcune soluzioni, come `gt-next` o `lingo.dev`, sono chiaramente da evitare. Combinano il vendor lock-in con l'inquinamento della base di codice. Nonostante molte ore trascorse cercando di implementarle, non sono mai riuscito a farle funzionare, né su TanStack Start né su Next.js.

Problemi riscontrati:

**(General Translation)** (`gt-next@6.16.5`):

- Per un'app da 110kb, `gt-react` aggiunge più di 440kb extra.
- `Quota Exceeded, please upgrade your plan` al primissimo build con General Translation.
- Le traduzioni non vengono renderizzate; ottengo l'errore `Error: <T> used on the client-side outside of <GTProvider>`, che sembra essere un bug nella libreria.
- Durante l'implementazione di **gt-tanstack-start-react**, ho riscontrato anche un [problema](https://github.com/generaltranslation/gt/issues/1210#event-24510646961) con la libreria: `does not provide an export named 'printAST' - @formatjs/icu-messageformat-parser`, che faceva fallire l'applicazione. Dopo aver segnalato questo problema, il manutentore lo ha risolto entro 24 ore.
- La libreria blocca il rendering statico delle pagine Next.js.

**(Lingo.dev)** (`@lingo.dev/compiler@0.4.0`):

- Quota AI superata, bloccando interamente la build — quindi non puoi andare in produzione senza pagare.
- Il compilatore perdeva quasi il 40% del contenuto tradotto. Ho dovuto riscrivere tutti i `.map` in blocchi di componenti piatti per farlo funzionare.
- La loro CLI è buggata e tendeva a resettare il file di configurazione senza motivo.
- Alla build, cancellava totalmente i JSON generati quando veniva aggiunto nuovo contenuto. Di conseguenza, una manciata di chiavi poteva cancellare più di 300 chiavi esistenti.

### 2 — Soluzioni sperimentali

**(Wuchale)** (`wuchale@0.22.11`):

L'idea alla base di `Wuchale` è interessante ma non ancora praticabile. Ho riscontrato problemi di reattività e ho dovuto forzare il re-rendering del provider per far funzionare l'app. La documentazione è inoltre piuttosto oscura, il che rende difficile l'onboarding.

**(Paraglide)** (`@inlang/paraglide-js@2.15.1`):

`Paraglide` offre un approccio innovativo e ben ponderato. Tuttavia, in questo benchmark il tree-shaking pubblicizzato non ha funzionato per le mie configurazioni Next.js o TanStack Start. Il workflow e la DX sono più complessi rispetto ad altre opzioni.
Personalmente non mi piace dover rigenerare file JS prima di ogni push, il che crea un rischio costante di conflitti di merge tramite PR. Lo strumento sembra inoltre più focalizzato su Vite che su Next.js.
Infine, rispetto ad altre soluzioni, Paraglide non usa uno store (es. contesto React) per recuperare la lingua corrente per renderizzare il contenuto. Per ogni nodo analizzato, richiederà la lingua da localStorage / cookie ecc. Ciò porta all'esecuzione di logica non necessaria che impatta sulla reattività del componente.

### 3 — Soluzioni accettabili

**(Tolgee)** (`tolgee@7.0.0`):

`Tolgee` affronta molti dei problemi menzionati in precedenza. L'ho trovato più difficile da adottare rispetto a strumenti simili. Non fornisce type safety, il che rende anche più difficile individuare le chiavi mancanti a compile time. Ho dovuto avvolgere le funzioni di Tolgee con le mie per aggiungere il rilevamento delle chiavi mancanti.

**(Next Intl)** (`next-intl@4.9.1`):

`next-intl` è l'opzione più di tendenza e quella che gli assistenti AI spingono di più, ma a mio avviso a torto. Iniziare è facile. In pratica, ottimizzare per limitare i leakage è complesso. Combinare caricamento dinamico + namespace + tipi TypeScript rallenta molto lo sviluppo. Il pacchetto è anche piuttosto pesante (~13kb per `NextIntlClientProvider` + `useTranslations`, che è più di 2 volte `next-intlayer`). **next-intl** tendeva a bloccare il rendering statico delle pagine Next.js. Fornisce un helper chiamato `setRequestLocale()`. Sembra che ciò sia stato parzialmente risolto per file centralizzati come `en.json` / `fr.json`, ma il rendering statico si interrompe ancora quando il contenuto è diviso in namespace come `en/shared.json` / `fr/shared.json` / `es/shared.json`.

**(Next I18next)** (`next-i18next@16.0.5`):

`next-i18next` è probabilmente l'opzione più popolare perché è stata tra le prime soluzioni i18n per app JavaScript. Ha molti plugin della community. Condivide gli stessi svantaggi principali di `next-intl`. Il pacchetto è particolarmente pesante (~18kb per `I18nProvider` + `useTranslation`, circa 3 volte `next-intlayer`).

I formati dei messaggi differiscono inoltre: `next-intl` usa ICU MessageFormat, mentre `i18next` usa il proprio formato.

**(Next International)** (`next-international@1.3.1`):

`next-international` affronta anch'esso i problemi di cui sopra ma non differisce molto da `next-intl` o `next-i18next`. Include `scopedT()` per traduzioni specifiche di un namespace, ma usarlo non ha praticamente alcun impatto sulle dimensioni del bundle.

**(Lingui)** (`@lingui/core@5.3.0`):

`Lingui` è spesso elogiato. Personalmente ho trovato il workflow `lingui extract` / `lingui compile` più complesso delle alternative, senza un chiaro vantaggio. Ho anche notato sintassi inconsistenti che confondono le AI (es. `t()`, `t''`, `i18n.t()`, `<Trans>`).

### 4 — Raccomandazioni

**(Next Translate)** (`next-translate@3.1.2`):

`next-translate` è la mia raccomandazione principale se ti piace un'API in stile `t()`. È elegante grazie a `next-translate-plugin`, caricando i namespace attraverso `getStaticProps` con un caricatore Webpack / Turbopack. È anche l'opzione più leggera qui (~2.5kb). Per il namespacing, la definizione dei namespace per pagina o percorso nella config è ben pensata e più facile da mantenere rispetto alle principali alternative come **next-intl** o **next-i18next**. Nella versione `3.1.2`, ho notato che il rendering statico non funzionava; Next.js ripiegava sul rendering dinamico.

**(Intlayer)** (`next-intlayer@8.7.5`):

Non giudicherò personalmente `next-intlayer` per motivi di obiettività, essendo la mia propria soluzione.

### Nota personale

Questa nota è personale e non influisce sui risultati del benchmark. Nel mondo i18n si vede spesso un consenso attorno a `const t = useTranslation('xx')` + `<>{t('xx.xx')}</>`.

Nelle app React, iniettare una funzione come `ReactNode` è, a mio avviso, un anti-pattern. Inoltre aggiunge una complessità evitabile e un sovraccarico di esecuzione JavaScript (anche se appena percettibile).
