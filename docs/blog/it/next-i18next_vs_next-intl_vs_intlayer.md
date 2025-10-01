---
createdAt: 2025-08-23
updatedAt: 2025-09-29
title: next-i18next vs next-intl vs Intlayer
description: Confronta next-i18next con next-intl e Intlayer per l'internazionalizzazione (i18n) di un'app Next.js
keywords:
  - next-intl
  - next-i18next
  - Intlayer
  - Internazionalizzazione
  - Blog
  - Next.js
  - JavaScript
  - React
slugs:
  - blog
  - next-i18next-vs-next-intl-vs-intlayer
---

# next-i18next VS next-intl VS intlayer | Internazionalizzazione (i18n) in Next.js

![next-i18next VS next-intl VS intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/i18next-next-intl-intlayer.png?raw=true)

Diamo un'occhiata alle somiglianze e differenze tra tre opzioni i18n per Next.js: next-i18next, next-intl e Intlayer.

Questo non è un tutorial completo. È un confronto per aiutarti a scegliere.

Ci concentriamo su **Next.js 13+ App Router** (con **React Server Components**) e valutiamo:

1. **Architettura e organizzazione dei contenuti**
2. **TypeScript e sicurezza**
3. **Gestione delle traduzioni mancanti**
4. **Routing e middleware**
5. **Prestazioni e comportamento di caricamento**
6. **Esperienza sviluppatore (DX), strumenti e manutenzione**
7. **SEO e scalabilità per progetti di grandi dimensioni**

> **In breve**: Tutti e tre possono localizzare un'app Next.js. Se desideri **contenuti a livello di componente**, **tipi TypeScript rigorosi**, **controlli delle chiavi mancanti in fase di build**, **dizionari ottimizzati tramite tree-shaking** e **supporto di prima classe per App Router + helper SEO**, **Intlayer** è la scelta più completa e moderna.

> Una confusione comune tra gli sviluppatori è pensare che `next-intl` sia la versione Next.js di `react-intl`. Non è così: `next-intl` è mantenuto da [Amann](https://github.com/amannn), mentre `react-intl` è mantenuto da [FormatJS](https://github.com/formatjs/formatjs).

---

## In breve

- **next-intl** - Formattazione dei messaggi leggera e semplice con un solido supporto per Next.js. I cataloghi centralizzati sono comuni; l'esperienza sviluppatore (DX) è semplice, ma la sicurezza e la manutenzione su larga scala rimangono per lo più a tuo carico.
- **next-i18next** - i18next in versione Next.js. Ecosistema maturo e funzionalità tramite plugin (ad esempio, ICU), ma la configurazione può essere verbosa e i cataloghi tendono a centralizzarsi con la crescita dei progetti.
- **Intlayer** - Modello di contenuto incentrato sui componenti per Next.js, **tipizzazione TS rigorosa**, **controlli a tempo di compilazione**, **tree-shaking**, **middleware integrati e helper SEO**, **Editor Visivo/CMS** opzionale e **traduzioni assistite da AI**.

---

| Library                | GitHub Stars                                                                                                                                                                     | Total Commits                                                                                                                                                                        | Last Commit                                                                                                                                           | First Version | NPM Version                                                                                                         | NPM Downloads                                                                                                                  |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `aymericzip/intlayer`  | [![GitHub Repo stars](https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/aymericzip/intlayer/stargazers)   | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/aymericzip/intlayer?style=for-the-badge&label=commits)](https://github.com/aymericzip/intlayer/commits)   | [![Last Commit](https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge)](https://github.com/aymericzip/intlayer/commits)   | April 2024    | [![npm](https://img.shields.io/npm/v/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer)         | [![npm downloads](https://img.shields.io/npm/dm/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer)         |
| `amannn/next-intl`     | [![GitHub Repo stars](https://img.shields.io/github/stars/amannn/next-intl?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/amannn/next-intl/stargazers)         | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/amannn/next-intl?style=for-the-badge&label=commits)](https://github.com/amannn/next-intl/commits)         | [![Last Commit](https://img.shields.io/github/last-commit/amannn/next-intl?style=for-the-badge)](https://github.com/amannn/next-intl/commits)         | Nov 2020      | [![npm](https://img.shields.io/npm/v/next-intl?style=for-the-badge)](https://www.npmjs.com/package/next-intl)       | [![npm downloads](https://img.shields.io/npm/dm/next-intl?style=for-the-badge)](https://www.npmjs.com/package/next-intl)       |
| `i18next/i18next`      | [![GitHub Repo stars](https://img.shields.io/github/stars/i18next/i18next?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/i18next/i18next/stargazers)           | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/i18next/i18next?style=for-the-badge&label=commits)](https://github.com/i18next/i18next/commits)           | [![Last Commit](https://img.shields.io/github/last-commit/i18next/i18next?style=for-the-badge)](https://github.com/i18next/i18next/commits)           | Jan 2012      | [![npm](https://img.shields.io/npm/v/i18next?style=for-the-badge)](https://www.npmjs.com/package/i18next)           | [![npm downloads](https://img.shields.io/npm/dm/i18next?style=for-the-badge)](https://www.npmjs.com/package/i18next)           |
| `i18next/next-i18next` | [![GitHub Repo stars](https://img.shields.io/github/stars/i18next/next-i18next?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/i18next/next-i18next/stargazers) | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/i18next/next-i18next?style=for-the-badge&label=commits)](https://github.com/i18next/next-i18next/commits) | [![Last Commit](https://img.shields.io/github/last-commit/i18next/next-i18next?style=for-the-badge)](https://github.com/i18next/next-i18next/commits) | Nov 2018      | [![npm](https://img.shields.io/npm/v/next-i18next?style=for-the-badge)](https://www.npmjs.com/package/next-i18next) | [![npm downloads](https://img.shields.io/npm/dm/next-i18next?style=for-the-badge)](https://www.npmjs.com/package/next-i18next) |

> I badge si aggiornano automaticamente. Gli snapshot varieranno nel tempo.

---

## Confronto delle funzionalità affiancate (focalizzato su Next.js)

| Funzionalità | `next-intlayer` (Intlayer) | `next-intl` | `next-i18next` |

> I badge si aggiornano automaticamente. Gli snapshot varieranno nel tempo.

---

## Confronto delle Funzionalità Affiancate (focalizzato su Next.js)

| Funzionalità                                            | `next-intlayer` (Intlayer)                                                                                                                     | `next-intl`                                                                                                                      | `next-i18next`                                                                                                                   |
| ------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **Traduzioni Vicino ai Componenti**                     | ✅ Sì, contenuto collocato insieme a ogni componente                                                                                           | ❌ No                                                                                                                            | ❌ No                                                                                                                            |
| **Integrazione TypeScript**                             | ✅ Avanzata, tipi rigorosi generati automaticamente                                                                                            | ✅ Buona                                                                                                                         | ⚠️ Base                                                                                                                          |
| **Rilevamento Traduzioni Mancanti**                     | ✅ Evidenziazione errori TypeScript e errori/avvisi in fase di compilazione                                                                    | ⚠️ Fallback a runtime                                                                                                            | ⚠️ Fallback a runtime                                                                                                            |
| **Contenuti Ricchi (JSX/Markdown/componenti)**          | ✅ Supporto diretto                                                                                                                            | ❌ Non progettato per nodi ricchi                                                                                                | ⚠️ Limitato                                                                                                                      |
| **Traduzione basata su AI**                             | ✅ Sì, supporta più provider AI. Utilizzabile con le proprie chiavi API. Considera il contesto della tua applicazione e l'ambito del contenuto | ❌ No                                                                                                                            | ❌ No                                                                                                                            |
| **Editor Visivo**                                       | ✅ Sì, Editor Visivo locale + CMS opzionale; può esternalizzare il contenuto della codebase; integrabile                                       | ❌ No / disponibile tramite piattaforme di localizzazione esterne                                                                | ❌ No / disponibile tramite piattaforme di localizzazione esterne                                                                |
| **Routing Localizzato**                                 | ✅ Sì, supporta percorsi localizzati nativamente (funziona con Next.js & Vite)                                                                 | ✅ Integrato, App Router supporta il segmento `[locale]`                                                                         | ✅ Integrato                                                                                                                     |
| **Generazione Dinamica delle Rotte**                    | ✅ Sì                                                                                                                                          | ✅ Sì                                                                                                                            | ✅ Sì                                                                                                                            |
| **Pluralizzazione**                                     | ✅ Modelli basati su enumerazioni                                                                                                              | ✅ Buono                                                                                                                         | ✅ Buono                                                                                                                         |
| **Formattazione (date, numeri, valute)**                | ✅ Formatter ottimizzati (Intl sotto il cofano)                                                                                                | ✅ Buono (helper Intl)                                                                                                           | ✅ Buono (helper Intl)                                                                                                           |
| **Formato del contenuto**                               | ✅ .tsx, .ts, .js, .json, .md, .txt, (.yaml WIP)                                                                                               | ✅ .json, .js, .ts                                                                                                               | ⚠️ .json                                                                                                                         |
| **Supporto ICU**                                        | ⚠️ In lavorazione                                                                                                                              | ✅ Sì                                                                                                                            | ⚠️ Tramite plugin (`i18next-icu`)                                                                                                |
| **Helper SEO (hreflang, sitemap)**                      | ✅ Strumenti integrati: helper per sitemap, robots.txt, metadata                                                                               | ✅ Buono                                                                                                                         | ✅ Buono                                                                                                                         |
| **Ecosistema / Comunità**                               | ⚠️ Più piccolo ma in rapida crescita e reattivo                                                                                                | ✅ Buono                                                                                                                         | ✅ Buono                                                                                                                         |
| **Rendering lato server & Componenti Server**           | ✅ Sì, ottimizzato per SSR / Componenti Server React                                                                                           | ⚠️ Supportato a livello di pagina ma è necessario passare le funzioni t sull'albero dei componenti per i componenti server figli | ⚠️ Supportato a livello di pagina ma è necessario passare le funzioni t sull'albero dei componenti per i componenti server figli |
| **Tree-shaking (caricamento solo del contenuto usato)** | ✅ Sì, per componente al momento della build tramite plugin Babel/SWC                                                                          | ⚠️ Parziale                                                                                                                      | ⚠️ Parziale                                                                                                                      |
| **Caricamento lazy**                                    | ✅ Sì, per locale / per dizionario                                                                                                             | ✅ Sì (per percorso/per locale), necessita gestione dei namespace                                                                | ✅ Sì (per percorso/per locale), necessita gestione dei namespace                                                                |
| **Rimozione dei contenuti non utilizzati**              | ✅ Sì, per dizionario al momento della build                                                                                                   | ❌ No, può essere gestito manualmente con la gestione dei namespace                                                              | ❌ No, può essere gestito manualmente con la gestione dei namespace                                                              |
| **Gestione di progetti di grandi dimensioni**           | ✅ Favorisce la modularità, adatto per sistemi di design                                                                                       | ✅ Modulare con configurazione                                                                                                   | ✅ Modulare con configurazione                                                                                                   |
| **Test delle traduzioni mancanti (CLI/CI)**             | ✅ CLI: `npx intlayer content test` (audit compatibile con CI)                                                                                 | ⚠️ Non integrato; la documentazione suggerisce `npx @lingual/i18n-check`                                                         | ⚠️ Non integrato; si fa affidamento sugli strumenti i18next / runtime `saveMissing`                                              |

---

## Introduzione

Next.js offre supporto integrato per il routing internazionalizzato (es. segmenti di localizzazione). Ma questa funzionalità non gestisce le traduzioni da sola. Serve comunque una libreria per rendere contenuti localizzati agli utenti.

Esistono molte librerie i18n, ma nel mondo Next.js oggi tre stanno guadagnando popolarità: next-i18next, next-intl e Intlayer.

---

## Architettura e scalabilità

- **next-intl / next-i18next**: Predefinito a **cataloghi centralizzati** per locale (più **namespace** in i18next). Funziona bene all'inizio, ma spesso diventa una grande area condivisa con un aumento del coupling e del churn delle chiavi.
- **Intlayer**: Favorisce dizionari **per componente** (o per funzionalità) **co-locati** con il codice che servono. Questo riduce il carico cognitivo, facilita la duplicazione/migrazione delle parti dell'interfaccia utente e riduce i conflitti tra team. Il contenuto non utilizzato è naturalmente più facile da individuare ed eliminare.

**Perché è importante:** In grandi codebase o configurazioni di design system, il **contenuto modulare** scala meglio rispetto ai cataloghi monolitici.

---

## Dimensioni del bundle e dipendenze

Dopo la compilazione dell'applicazione, il bundle è il JavaScript che il browser caricherà per rendere la pagina. La dimensione del bundle è quindi importante per le prestazioni dell'applicazione.

Due componenti sono importanti nel contesto di un bundle per applicazioni multilingue:

- Il codice dell'applicazione
- Il contenuto caricato dal browser

## Codice dell'applicazione

L'importanza del codice dell'applicazione è minima in questo caso. Tutte e tre le soluzioni sono tree-shakable, il che significa che le parti di codice non utilizzate non vengono incluse nel bundle.

Ecco un confronto della dimensione del bundle JavaScript caricato dal browser per un'applicazione multilingue con le tre soluzioni.

Se non abbiamo bisogno di alcun formatter nell'applicazione, l'elenco delle funzioni esportate dopo il tree-shaking sarà:

- **next-intlayer**: `useIntlayer`, `useLocale`, `NextIntlClientProvider`, (La dimensione del bundle è 180.6 kB -> 78.6 kB (gzip))
- **next-intl**: `useTranslations`, `useLocale`, `NextIntlClientProvider`, (La dimensione del bundle è 101.3 kB -> 31.4 kB (gzip))
- **next-i18next**: `useTranslation`, `useI18n`, `I18nextProvider`, (La dimensione del bundle è 80.7 kB -> 25.5 kB (gzip))

Queste funzioni sono solo wrapper attorno al contesto/stato di React, quindi l'impatto totale della libreria i18n sulla dimensione del bundle è minimo.

> Intlayer è leggermente più grande di `next-intl` e `next-i18next` perché include più logica nella funzione `useIntlayer`. Questo è legato all'integrazione con markdown e `intlayer-editor`.

## Contenuti e Traduzioni

Questa parte è spesso ignorata dagli sviluppatori, ma consideriamo il caso di un'applicazione composta da 10 pagine in 10 lingue. Supponiamo che ogni pagina integri contenuti unici al 100% per semplificare il calcolo (in realtà, molti contenuti sono ridondanti tra le pagine, ad esempio titolo della pagina, intestazione, piè di pagina, ecc.).

Un utente che desidera visitare la pagina `/fr/about` caricherà il contenuto di una pagina in una determinata lingua. Ignorare l'ottimizzazione dei contenuti significherebbe caricare inutilmente l'8.200% `((1 + (((10 pagine - 1) × (10 lingue - 1)))) × 100)` del contenuto dell'applicazione. Vedi il problema? Anche se questo contenuto rimane testo, e mentre probabilmente preferisci pensare a ottimizzare le immagini del tuo sito, stai inviando contenuti inutili in tutto il mondo e facendo elaborare i computer degli utenti per nulla.

Due questioni importanti:

- **Suddivisione per percorso:**

  > Se sono nella pagina `/about`, non voglio caricare il contenuto della pagina `/home`

- **Suddivisione per locale:**

  > Se sono nella pagina `/fr/about`, non voglio caricare il contenuto della pagina `/en/about`

Ancora una volta, tutte e tre le soluzioni sono consapevoli di queste problematiche e permettono di gestire queste ottimizzazioni. La differenza tra le tre soluzioni è l'esperienza dello sviluppatore (DX).

`next-intl` e `next-i18next` utilizzano un approccio centralizzato per gestire le traduzioni, permettendo di suddividere i file JSON per locale e per sotto-file. In `next-i18next`, chiamiamo i file JSON 'namespaces'; `next-intl` permette di dichiarare i messaggi. In `intlayer`, chiamiamo i file JSON 'dictionaries'.

- Nel caso di `next-intl`, come in `next-i18next`, il contenuto viene caricato a livello di pagina/layout, quindi questo contenuto viene caricato in un context provider. Ciò significa che lo sviluppatore deve gestire manualmente i file JSON che verranno caricati per ogni pagina.

> In pratica, questo implica che gli sviluppatori spesso saltano questa ottimizzazione, preferendo caricare tutto il contenuto nel context provider della pagina per semplicità.

- Nel caso di `intlayer`, tutto il contenuto viene caricato nell'applicazione. Successivamente un plugin (`@intlayer/babel` / `@intlayer/swc`) si occupa di ottimizzare il bundle caricando solo il contenuto utilizzato nella pagina. Lo sviluppatore quindi non deve gestire manualmente i dizionari che verranno caricati. Questo permette una migliore ottimizzazione, una migliore manutenibilità e riduce i tempi di sviluppo.

Man mano che l'applicazione cresce (soprattutto quando più sviluppatori lavorano sull'applicazione), è comune dimenticare di rimuovere il contenuto che non viene più utilizzato dai file JSON.

> Nota che tutti i file JSON vengono caricati in tutti i casi (next-intl, next-i18next, intlayer).

Ecco perché l'approccio di Intlayer è più performante: se un componente non viene più utilizzato, il suo dizionario non viene caricato nel bundle.

È anche importante come la libreria gestisce i fallback. Consideriamo che l'applicazione sia in inglese di default e che l'utente visiti la pagina `/fr/about`. Se le traduzioni in francese mancano, considereremo il fallback in inglese.

Nel caso di `next-intl` e `next-i18next`, la libreria richiede il caricamento del JSON relativo alla locale corrente, ma anche a quella di fallback. Quindi, considerando che tutto il contenuto è stato tradotto, ogni pagina caricherà il 100% di contenuto non necessario. **In confronto, `intlayer` elabora il fallback al momento della costruzione del dizionario. Pertanto, ogni pagina caricherà solo il contenuto utilizzato.**

Ecco un esempio dell'impatto dell'ottimizzazione della dimensione del bundle utilizzando `intlayer` in un'applicazione vite + react:

| Bundle ottimizzato                                                                                      | Bundle non ottimizzato                                                                                                      |
| ------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| ![bundle ottimizzato](https://github.com/aymericzip/intlayer/blob/main/docs/assets/bundle.png?raw=true) | ![bundle non ottimizzato](https://github.com/aymericzip/intlayer/blob/main/docs/assets/bundle_no_optimization.png?raw=true) |

---

## TypeScript e sicurezza

<Columns>
  <Column>

**next-intl**

- Supporto solido per TypeScript, ma **le chiavi non sono tipizzate rigorosamente di default**; dovrai mantenere manualmente i pattern di sicurezza.

  </Column>
  <Column>

**next-i18next**

- Tipizzazioni di base per gli hook; **la tipizzazione rigorosa delle chiavi richiede strumenti/configurazioni aggiuntive**.

  </Column>
  <Column>

**intlayer**

- **Genera tipi rigorosi** dal tuo contenuto. **Completamento automatico nell’IDE** e **errori a tempo di compilazione** individuano errori di battitura e chiavi mancanti prima del deploy.

  </Column>
</Columns>

**Perché è importante:** La tipizzazione forte sposta i fallimenti a sinistra (CI/build) invece che a destra (runtime).

---

## Gestione delle traduzioni mancanti

**next-intl**

- Si basa su **fallback a runtime** (es. mostra la chiave o la locale di default). La build non fallisce.

**next-i18next**

- Si basa su **fallback a runtime** (es. mostra la chiave o la locale di default). La build non fallisce.

**intlayer**

- **Rilevamento a tempo di build** con **avvisi/errori** per locali o chiavi mancanti.

**Perché è importante:** Individuare le lacune durante la build previene “stringhe misteriose” in produzione e si allinea con rigide regole di rilascio.

---

## Routing, middleware e strategia URL

<Columns>
  <Column>

**next-intl**

- Funziona con il **routing localizzato di Next.js** sull'App Router.

  </Column>
  <Column>

**next-i18next**

- Funziona con il **routing localizzato di Next.js** sull'App Router.

  </Column>
  <Column>

**intlayer**

- Tutto quanto sopra, più **middleware i18n** (rilevamento della localizzazione tramite header/cookie) e **helper** per generare URL localizzati e tag `<link rel="alternate" hreflang="…">`.

  </Column>
</Columns>

**Perché è importante:** Meno livelli di collegamento personalizzati; **UX coerente** e **SEO pulito** tra le diverse localizzazioni.

---

## Allineamento con Server Components (RSC)

<Columns>
  <Column>

**next-intl**

- Supporta Next.js 13+. Spesso richiede di passare funzioni t/formatter attraverso gli alberi dei componenti in configurazioni ibride.

  </Column>
  <Column>

**next-i18next**

- Supporta Next.js 13+. Vincoli simili nel passaggio degli strumenti di traduzione attraverso i confini.

  </Column>
  <Column>

**intlayer**

- Supporta Next.js 13+ e facilita il **confine server/client** con un'API coerente e provider orientati a RSC, evitando il passaggio continuo di formatter o funzioni t.

  </Column>
</Columns>

**Perché è importante:** Modello mentale più pulito e meno casi limite negli alberi ibridi.

---

## DX, strumenti e manutenzione

<Columns>
  <Column>

**next-intl**

- Comunemente abbinato a piattaforme di localizzazione esterne e flussi editoriali.

  </Column>
  <Column>

**next-i18next**

- Comunemente abbinato a piattaforme di localizzazione esterne e flussi editoriali.

  </Column>
  <Column>

**intlayer**

- Fornisce un **Editor Visivo gratuito** e un **CMS opzionale** (compatibile con Git o esternalizzato), oltre a un’**estensione VSCode** e **traduzioni assistite da AI** utilizzando le tue chiavi provider.

  </Column>
</Columns>

**Perché è importante:** Riduce i costi operativi e accorcia il ciclo tra sviluppatori e autori dei contenuti.

## Integrazione con piattaforme di localizzazione (TMS)

Le grandi organizzazioni spesso si affidano a Sistemi di Gestione delle Traduzioni (TMS) come **Crowdin**, **Phrase**, **Lokalise**, **Localizely** o **Localazy**.

- **Perché interessa alle aziende**
  - **Collaborazione e ruoli**: Sono coinvolti più attori: sviluppatori, product manager, traduttori, revisori, team marketing.
  - **Scala ed efficienza**: localizzazione continua, revisione in contesto.

- **next-intl / next-i18next**
  - Tipicamente utilizzano **cataloghi JSON centralizzati**, quindi l'esportazione/importazione con TMS è semplice.
  - Ecosistemi maturi ed esempi/integrazioni per le piattaforme sopra menzionate.

- **Intlayer**
  - Favorisce **dizionari decentralizzati per componente** e supporta contenuti in **TypeScript/TSX/JS/JSON/MD**.
  - Questo migliora la modularità nel codice, ma può rendere più difficile l'integrazione plug-and-play con TMS quando uno strumento si aspetta file JSON centralizzati e piatti.
  - Intlayer offre alternative: **traduzioni assistite da AI** (usando le tue chiavi provider), un **Editor Visivo/CMS** e workflow **CLI/CI** per rilevare e precompilare le lacune.

> Nota: `next-intl` e `i18next` accettano anche cataloghi TypeScript. Se il tuo team memorizza i messaggi in file `.ts` o li decentralizza per funzionalità, potresti incontrare attriti simili con il TMS. Tuttavia, molte configurazioni di `next-intl` rimangono centralizzate in una cartella `locales/`, che è un po' più facile da rifattorizzare in JSON per il TMS.

## Esperienza dello Sviluppatore

Questa parte fa un confronto approfondito tra le tre soluzioni. Piuttosto che considerare casi semplici, come descritto nella documentazione 'getting started' per ogni soluzione, considereremo un caso d'uso reale, più simile a un progetto reale.

### Struttura dell'app

La struttura dell'app è importante per garantire una buona manutenibilità del tuo codice.

<Tab defaultTab="next-intl" group='techno'>

  <TabItem label="next-i18next" value="next-i18next">

```bash
.
├── i18n.config.ts
└── src
    ├── locales
    │   ├── en
    │   │  ├── common.json
    │   │  └── about.json
    │   └── fr
    │      ├── common.json
    │      └── about.json
    ├── app
    │   ├── i18n
    │   │   └── server.ts
    │   └── [locale]
    │       ├── layout.tsx
    │       └── about.tsx
    └── components
        ├── I18nProvider.tsx
        ├── ClientComponent.tsx
        └── ServerComponent.tsx
```

  </TabItem>
  <TabItem label="next-intl" value="next-intl">

```bash
.
├── i18n.ts
├── locales
│   ├── en
│   │  ├── home.json
│   │  └── navbar.json
│   ├── fr
│   │  ├── home.json
│   │  └── navbar.json
│   └── es
│      ├── home.json
│      └── navbar.json
└── src
    ├── middleware.ts
    ├── app
    │   ├── i18n
    │   │   └── server.ts
    │   └── [locale]
    │       └── home.tsx
    └── components
        └── Navbar
            └── index.tsx
```

  </TabItem>
  <TabItem label="intlayer" value="intlayer">

```bash
.
├── intlayer.config.ts
└── src
    ├── middleware.ts
    ├── app
    │   └── [locale]
    │       ├── layout.tsx
    │       └── home
    │           ├── index.tsx
    │           └── index.content.ts
    └── components
        └── Navbar
            ├── index.tsx
            └── index.content.ts
```

  </TabItem>
</Tab>

#### Confronto

- **next-intl / next-i18next**: Cataloghi centralizzati (JSON; namespace/messaggi). Struttura chiara, si integra bene con le piattaforme di traduzione, ma può portare a modifiche incrociate tra file man mano che le app crescono.
- **Intlayer**: Dizionari `.content.{ts|js|json}` per componente co-localizzati con i componenti. Facilita il riuso dei componenti e il ragionamento locale; aggiunge file e si basa su strumenti di build-time.

#### Configurazione e caricamento del contenuto

Come accennato in precedenza, è necessario ottimizzare il modo in cui ogni file JSON viene importato nel tuo codice.
Il modo in cui la libreria gestisce il caricamento dei contenuti è importante.

<Tab defaultTab="next-intl" group='techno'>
  <TabItem label="next-i18next" value="next-i18next">

```tsx fileName="next-i18next.config.js"
module.exports = {
  i18n: {
    locales: ["en", "fr", "es"],
    defaultLocale: "en",
  },
};
```

```tsx fileName="src/app/_app.tsx"
import { appWithTranslation } from "next-i18next";

const MyApp = ({ Component, pageProps }) => <Component {...pageProps} />;

export default appWithTranslation(MyApp);
```

```tsx fileName="src/app/[locale]/about/page.tsx"
import type { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { I18nextProvider, initReactI18next } from "react-i18next";
import { createInstance } from "i18next";
import { ClientComponent, ServerComponent } from "@components";

export default function HomePage({ locale }: { locale: string }) {
  // Dichiarare esplicitamente il namespace utilizzato da questo componente
  const resources = await loadMessagesFor(locale); // il tuo loader (JSON, ecc.)

  const i18n = createInstance();
  i18n.use(initReactI18next).init({
    lng: locale,
    fallbackLng: "en",
    resources,
    ns: ["common", "about"],
    defaultNS: "common",
    interpolation: { escapeValue: false },
  });

  const { t } = useTranslation("about");

  return (
    <I18nextProvider i18n={i18n}>
      <main>
        <h1>{t("title")}</h1>
        <ClientComponent />
        <ServerComponent />
      </main>
    </I18nextProvider>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  // Carica solo i namespace necessari per QUESTA pagina
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common", "about"])),
    },
  };
};
```

  </TabItem>
   <TabItem label="next-intl" value="next-intl">

```tsx fileName="i18n.ts"
import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

// Può essere importato da una configurazione condivisa
const locales = ["en", "fr", "es"];

export default getRequestConfig(async ({ locale }) => {
  // Verifica che il parametro `locale` in ingresso sia valido
  if (!locales.includes(locale as any)) notFound();

  return {
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
```

```tsx fileName="src/app/[locale]/about/layout.tsx"
import { NextIntlClientProvider } from "next-intl";
import { getMessages, unstable_setRequestLocale } from "next-intl/server";
import pick from "lodash/pick";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;

  // Imposta la locale attiva per questa richiesta di rendering server (RSC)
  unstable_setRequestLocale(locale);

  // I messaggi sono caricati lato server tramite src/i18n/request.ts
  // (vedi documentazione next-intl). Qui inviamo solo un sottoinsieme al client
  // necessario per i componenti client (ottimizzazione del payload).
  const messages = await getMessages();
  const clientMessages = pick(messages, ["common", "about"]);

  const rtlLocales = ["ar", "he", "fa", "ur"];

  return (
    <html lang={locale} dir={rtlLocales.includes(locale) ? "rtl" : "ltr"}>
      <body>
        <NextIntlClientProvider locale={locale} messages={clientMessages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

```tsx fileName="src/app/[locale]/about/page.tsx"
import { getTranslations } from "next-intl/server";
import { ClientComponent, ServerComponent } from "@components";

export default async function LandingPage({
  params,
}: {
  params: { locale: string };
}) {
  // Caricamento strettamente lato server (non idratato sul client)
  const t = await getTranslations("about");

  return (
    <main>
      <h1>{t("title")}</h1>
      <ClientComponent />
      <ServerComponent />
    </main>
  );
}
```

  </TabItem>
<TabItem label="intlayer" value="intlayer">

```tsx fileName="intlayer.config.ts"
export default {
  internationalization: {
    locales: ["en", "fr", "es"],
    defaultLocale: "en",
  },
};
```

```tsx fileName="src/app/[locale]/layout.tsx"
import { getHTMLTextDir } from "intlayer";
import {
  IntlayerClientProvider,
  generateStaticParams,
  type NextLayoutIntlayer,
} from "next-intlayer";

export const dynamic = "force-static";

const LandingLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <IntlayerClientProvider locale={locale}>
        {children}
      </IntlayerClientProvider>
    </html>
  );
};

export default LandingLayout;
```

```tsx fileName="src/app/[locale]/about/page.tsx"
import { PageContent } from "@components/PageContent";
import type { NextPageIntlayer } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";
import { ClientComponent, ServerComponent } from "@components";

const LandingPage: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;
  const { title } = useIntlayer("about", locale);

  return (
    <IntlayerServerProvider locale={locale}>
      <main>
        <h1>{title}</h1>
        <ClientComponent />
        <ServerComponent />
      </main>
    </IntlayerServerProvider>
  );
};

export default LandingPage;
```

  </TabItem>
</Tab>

#### Confronto

Tutti e tre supportano il caricamento di contenuti e provider per locale.

- Con **next-intl/next-i18next**, di solito carichi i messaggi/namespace selezionati per ogni percorso e posizioni i provider dove necessario.

- Con **Intlayer**, viene aggiunta un'analisi in fase di build per dedurre l'uso, il che può ridurre la configurazione manuale e permettere un singolo provider radice.

Scegli tra controllo esplicito e automazione in base alle preferenze del team.

### Uso in un componente client

Prendiamo un esempio di un componente client che rende un contatore.

<Tab defaultTab="next-intl" group='techno'>
  <TabItem label="next-i18next" value="next-i18next">

**Traduzioni (devono essere veri JSON in `public/locales/...`)**

```json fileName="public/locales/en/about.json"
{
  "counter": {
    "label": "Contatore",
    "increment": "Incrementa"
  }
}
```

```json fileName="public/locales/fr/about.json"
{
  "counter": {
    "label": "Contatore",
    "increment": "Incrementa"
  }
}
```

**Componente client**

```tsx fileName="src/components/ClientComponentExample.tsx"
"use client";

import React, { useMemo, useState } from "react";
import { useTranslation } from "next-i18next";

const ClientComponentExample = () => {
  const { t, i18n } = useTranslation("about");
  const [count, setCount] = useState(0);

  // next-i18next non espone useNumber; usa Intl.NumberFormat
  const numberFormat = new Intl.NumberFormat(i18n.language);

  return (
    <div>
      <p>{numberFormat.format(count)}</p>
      <button
        aria-label={t("counter.label")}
        onClick={() => setCount((count) => count + 1)}
      >
        {t("counter.increment")}
      </button>
    </div>
  );
};
```

> Non dimenticare di aggiungere il namespace "about" nelle serverSideTranslations della pagina  
> Qui utilizziamo la versione di React 19.x.x, ma per versioni inferiori sarà necessario usare useMemo per memorizzare l'istanza del formatter poiché è una funzione pesante

  </TabItem>
  <TabItem label="next-intl" value="next-intl">

**Traduzioni (struttura riutilizzata; caricale nei messaggi di next-intl come preferisci)**

```json fileName="locales/en/about.json"
{
  "counter": {
    "label": "Counter",
    "increment": "Increment"
  }
}
```

```json fileName="locales/fr/about.json"
{
  "counter": {
    "label": "Compteur",
    "increment": "Incrémenter"
  }
}
```

**Componente client**

```tsx fileName="src/components/ClientComponentExample.tsx"
"use client";

import React, { useState } from "react";
import { useTranslations, useFormatter } from "next-intl";

const ClientComponentExample = () => {
  // Ambito direttamente sull'oggetto annidato
  const t = useTranslations("about.counter");
  const format = useFormatter();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{format.number(count)}</p>
      <button
        aria-label={t("label")}
        onClick={() => setCount((count) => count + 1)}
      >
        {t("increment")}
      </button>
    </div>
  );
};
```

> Non dimenticare di aggiungere il messaggio "about" nel messaggio client della pagina

  </TabItem>
  <TabItem label="intlayer" value="intlayer">

**Contenuto**

```ts fileName="src/components/ClientComponentExample/index.content.ts"
import { t, type Dictionary } from "intlayer";

const counterContent = {
  key: "counter",
  content: {
    label: t({ it: "Contatore", en: "Counter", fr: "Compteur" }),
    increment: t({ it: "Incrementa", en: "Increment", fr: "Incrémenter" }),
  },
} satisfies Dictionary;

export default counterContent;
```

**Componente client**

```tsx fileName="src/components/ClientComponentExample/index.tsx"
"use client";

import React, { useState } from "react";
import { useNumber, useIntlayer } from "next-intlayer";

const ClientComponentExample = () => {
  const [count, setCount] = useState(0);
  const { label, increment } = useIntlayer("counter"); // restituisce stringhe
  const { number } = useNumber();

  return (
    <div>
      <p>{number(count)}</p>
      <button aria-label={label} onClick={() => setCount((count) => count + 1)}>
        {increment}
      </button>
    </div>
  );
};
```

  </TabItem>
</Tab>

#### Confronto

- **Formattazione dei numeri**
  - **next-i18next**: nessun `useNumber`; utilizza `Intl.NumberFormat` (o i18next-icu).
  - **next-intl**: `useFormatter().number(value)`.
  - **Intlayer**: `useNumber()` integrato.

- **Chiavi**
  - Mantieni una struttura annidata (`about.counter.label`) e definisci l’ambito del tuo hook di conseguenza (`useTranslation("about")` + `t("counter.label")` oppure `useTranslations("about.counter")` + `t("label")`).

- **Posizione dei file**
  - **next-i18next** si aspetta JSON in `public/locales/{lng}/{ns}.json`.
  - **next-intl** è flessibile; carica i messaggi come preferisci.
  - **Intlayer** memorizza i contenuti in dizionari TS/JS e risolve tramite chiave.

---

### Utilizzo in un componente server

Prendiamo il caso di un componente UI. Questo componente è un componente server e dovrebbe poter essere inserito come figlio di un componente client. (pagina (componente server) -> componente client -> componente server). Poiché questo componente può essere inserito come figlio di un componente client, non può essere async.

<Tab defaultTab="next-intl" group='techno'>
  <TabItem label="next-i18next" value="next-i18next">

```tsx fileName="src/pages/about.tsx"
import type { GetStaticProps } from "next";
import { useTranslation } from "next-i18next";

type ServerComponentProps = {
  count: number;
};

const ServerComponent = ({ count }: ServerComponentProps) => {
  const { t, i18n } = useTranslation("about");
  const formatted = new Intl.NumberFormat(i18n.language).format(count);

  return (
    <div>
      <p>{formatted}</p>
      <button aria-label={t("counter.label")}>{t("counter.increment")}</button>
    </div>
  );
};
```

  </TabItem>
  <TabItem label="next-intl" value="next-intl">

```tsx fileName="src/components/ServerComponent.tsx"
type ServerComponentProps = {
  count: number;
  t: (key: string) => string;
  formatter: Intl.NumberFormat;
};

const ServerComponent = ({ t, count, formatter }: ServerComponentProps) => {
  const formatted = formatter.format(count);

  return (
    <div>
      <p>{formatted}</p>
      <button aria-label={t("label")}>{t("increment")}</button>
    </div>
  );
};
```

> Poiché il componente server non può essere asincrono, è necessario passare le traduzioni e la funzione di formattazione come props.
>
> - `const t = await getTranslations("about.counter");`
> - `const formatter = await getFormatter().then((formatter) => formatter.number());`

  </TabItem>
  <TabItem label="intlayer" value="intlayer">

```tsx fileName="src/components/ServerComponent.tsx"
import { useIntlayer, useNumber } from "next-intlayer/server";

const ServerComponent = ({ count }: { count: number }) => {
  const { label, increment } = useIntlayer("counter");
  const { number } = useNumber();

  return (
    <div>
      <p>{number(count)}</p>
      <button aria-label={label}>{increment}</button>
    </div>
  );
};
```

  </TabItem>
</Tab>

> Intlayer espone hook **sicuri per il server** tramite `next-intlayer/server`. Per funzionare, `useIntlayer` e `useNumber` utilizzano una sintassi simile agli hook client, ma dipendono internamente dal contesto server (`IntlayerServerProvider`).

### Metadata / Sitemap / Robots

Tradurre i contenuti è ottimo. Ma spesso si dimentica che l'obiettivo principale dell'internazionalizzazione è rendere il tuo sito web più visibile al mondo. L'i18n è una leva incredibile per migliorare la visibilità del tuo sito web.

Ecco una lista di buone pratiche riguardanti la SEO multilingue.

- impostare i meta tag hreflang nel tag `<head>`
  > Aiuta i motori di ricerca a capire quali lingue sono disponibili nella pagina
- elencare tutte le traduzioni delle pagine nel sitemap.xml utilizzando lo schema XML `http://www.w3.org/1999/xhtml`
  >
- non dimenticare di escludere le pagine con prefisso dal robots.txt (es. `/dashboard`, e `/fr/dashboard`, `/es/dashboard`)
  >
- utilizzare un componente Link personalizzato per reindirizzare alla pagina più localizzata (es. in francese `<a href="/fr/about">A propos</a>`)
  >

Gli sviluppatori spesso dimenticano di referenziare correttamente le loro pagine tra le diverse localizzazioni.

<Tab defaultTab="next-intl" group='techno'>
 
  <TabItem label="next-i18next" value="next-i18next">

```ts fileName="i18n.config.ts"
export const locales = ["en", "fr"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : "/" + locale + path;
}

const ORIGIN = "https://example.com";
export function abs(locale: string, path: string) {
  return ORIGIN + localizedPath(locale, path);
}
```

```tsx fileName="src/app/[locale]/about/layout.tsx"
import type { Metadata } from "next";
import { locales, defaultLocale, localizedPath } from "@/i18n.config";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;

  // Importa dinamicamente il file JSON corretto
  const messages = (
    await import("@/../public/locales/" + locale + "/about.json")
  ).default;

  const languages = Object.fromEntries(
    locales.map((locale) => [locale, localizedPath(locale, "/about")])
  );

  return {
    title: messages.title,
    description: messages.description,
    alternates: {
      canonical: localizedPath(locale, "/about"),
      languages: { ...languages, "x-default": "/about" },
    },
  };
}

export default async function AboutPage() {
  return <h1>Informazioni</h1>;
}
```

```ts fileName="src/app/sitemap.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale, abs } from "@/i18n.config";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(
    locales.map((locale) => [locale, abs(locale, "/about")])
  );
  return [
    {
      url: abs(defaultLocale, "/about"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: { languages },
    },
  ];
}
```

```ts fileName="src/app/robots.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale, localizedPath } from "@/i18n.config";

const ORIGIN = "https://example.com";

const expandAllLocales = (path: string) => [
  localizedPath(defaultLocale, path),
  ...locales
    .filter((locale) => locale !== defaultLocale)
    .map((locale) => localizedPath(locale, path)),
];

export default function robots(): MetadataRoute.Robots {
  const disallow = [
    ...expandAllLocales("/dashboard"),
    ...expandAllLocales("/admin"),
  ];

  return {
    rules: { userAgent: "*", allow: ["/"], disallow },
    host: ORIGIN,
    sitemap: ORIGIN + "/sitemap.xml",
  };
}
```

  </TabItem>
  <TabItem label="next-intl" value="next-intl">

```tsx fileName="src/app/[locale]/about/layout.tsx"
import type { Metadata } from "next";
import { locales, defaultLocale } from "@/i18n";
import { getTranslations } from "next-intl/server";

function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : "/" + locale + path;
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "about" });

  const url = "/about";
  const languages = Object.fromEntries(
    locales.map((locale) => [locale, localizedPath(locale, url)])
  );

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: localizedPath(locale, url),
      languages: { ...languages, "x-default": url },
    },
  };
}

// ... Resto del codice della pagina
```

```tsx fileName="src/app/sitemap.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale } from "@/i18n";

const origin = "https://example.com";

const formatterLocalizedPath = (locale: string, path: string) =>
  locale === defaultLocale ? origin + path : origin + "/" + locale + path;

export default function sitemap(): MetadataRoute.Sitemap {
  const aboutLanguages = Object.fromEntries(
    locales.map((l) => [l, formatterLocalizedPath(l, "/about")])
  );

  return [
    {
      url: formatterLocalizedPath(defaultLocale, "/about"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: { languages: aboutLanguages },
    },
  ];
}
```

```tsx fileName="src/app/robots.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale } from "@/i18n";

const origin = "https://example.com";
const withAllLocales = (path: string) => [
  path,
  ...locales
    .filter((locale) => locale !== defaultLocale)
    .map((locale) => "/" + locale + path),
];

export default function robots(): MetadataRoute.Robots {
  const disallow = [
    ...withAllLocales("/dashboard"),
    ...withAllLocales("/admin"),
  ];

  return {
    rules: { userAgent: "*", allow: ["/"], disallow },
    host: origin,
    sitemap: origin + "/sitemap.xml",
  };
}
```

  </TabItem>
  <TabItem label="intlayer" value="intlayer">

```typescript fileName="src/app/[locale]/about/layout.tsx"
import { getIntlayer, getMultilingualUrls } from "intlayer";
import type { Metadata } from "next";
import type { LocalPromiseParams } from "next-intlayer";

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;

  const metadata = getIntlayer("page-metadata", locale);

  const multilingualUrls = getMultilingualUrls("/about");

  return {
    ...metadata,
    alternates: {
      canonical: multilingualUrls[locale as keyof typeof multilingualUrls],
      languages: { ...multilingualUrls, "x-default": "/about" },
    },
  };
};

// ... Resto del codice della pagina
```

```tsx fileName="src/app/sitemap.ts"
import { getMultilingualUrls } from "intlayer";
import type { MetadataRoute } from "next";

const sitemap = (): MetadataRoute.Sitemap => [
  {
    url: "https://example.com/about",
    alternates: {
      languages: { ...getMultilingualUrls("https://example.com/about") },
    },
  },
];
```

```tsx fileName="src/app/robots.ts"
import { getMultilingualUrls } from "intlayer";
import type { MetadataRoute } from "next";

const getAllMultilingualUrls = (urls: string[]) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)) as string[]);

// Regole per il file robots.txt
const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: "*",
    allow: ["/"],
    disallow: getAllMultilingualUrls(["/dashboard"]), // Blocca l'accesso a tutte le versioni multilingue di /dashboard
  },
  host: "https://example.com",
  sitemap: "https://example.com/sitemap.xml",
});

export default robots;
```

  </TabItem>
</Tab>

> Intlayer fornisce una funzione `getMultilingualUrls` per generare URL multilingue per la tua sitemap.

---

---

## E il vincitore è…

Non è semplice. Ogni opzione ha dei compromessi. Ecco come la vedo:

<Columns>
  <Column>

**next-intl**

- la più semplice, leggera, con meno decisioni imposte. Se vuoi una soluzione **minimale**, ti senti a tuo agio con cataloghi centralizzati e la tua app è di dimensioni **piccole o medie**.

  </Column>
  <Column>

**next-i18next**

- matura, ricca di funzionalità, molti plugin della community, ma con un costo di configurazione più elevato. Se hai bisogno dell’**ecosistema di plugin di i18next** (ad esempio, regole ICU avanzate tramite plugin) e il tuo team conosce già i18next, accettando **più configurazione** per maggiore flessibilità.

  </Column>
  <Column>

**Intlayer**

- costruito per Next.js moderno, con contenuti modulari, sicurezza dei tipi, strumenti e meno codice boilerplate. Se apprezzi **contenuti a livello di componente**, **TypeScript rigoroso**, **garanzie a tempo di build**, **tree-shaking** e strumenti **completi** per routing/SEO/editor - specialmente per **Next.js App Router**, sistemi di design e **codebase grandi e modulari**.

  </Column>
</Columns>

Se preferisci una configurazione minima e accetti un po' di collegamenti manuali, next-intl è una buona scelta. Se hai bisogno di tutte le funzionalità e non ti dispiace la complessità, next-i18next funziona. Ma se vuoi una soluzione moderna, scalabile, modulare con strumenti integrati, Intlayer mira a offrirti tutto questo pronto all'uso.

> **Alternativa per team aziendali**: Se avete bisogno di una soluzione ben collaudata che funzioni perfettamente con piattaforme di localizzazione consolidate come **Crowdin**, **Phrase** o altri sistemi professionali di gestione delle traduzioni, considerate **next-intl** o **next-i18next** per il loro ecosistema maturo e le integrazioni comprovate.

> **Roadmap futura**: Intlayer prevede anche di sviluppare plugin che lavorino sopra le soluzioni **i18next** e **next-intl**. Questo vi offrirà i vantaggi di Intlayer per l'automazione, la sintassi e la gestione dei contenuti, mantenendo al contempo la sicurezza e la stabilità fornite da queste soluzioni consolidate nel codice della vostra applicazione.

## Stelle su GitHub

Le stelle di GitHub sono un forte indicatore della popolarità di un progetto, della fiducia della comunità e della rilevanza a lungo termine. Sebbene non siano una misura diretta della qualità tecnica, riflettono quanti sviluppatori trovano il progetto utile, ne seguono i progressi e sono propensi ad adottarlo. Per stimare il valore di un progetto, le stelle aiutano a confrontare l'attrattiva tra le alternative e forniscono informazioni sulla crescita dell'ecosistema.

[![Grafico della Storia delle Stelle](https://api.star-history.com/svg?repos=i18next/next-i18next&repos=amannn/next-intl&repos=aymericzip/intlayer&type=Date)](https://www.star-history.com/#i18next/next-i18next&amannn/next-intl&aymericzip/intlayer)

---

## Conclusione

Tutte e tre le librerie riescono nella localizzazione di base. La differenza è **quanto lavoro devi fare** per ottenere una configurazione robusta e scalabile in **Next.js moderno**:

- Con **Intlayer**, **contenuti modulari**, **TS rigoroso**, **sicurezza a tempo di build**, **bundle tree-shaken** e **App Router di prima classe + strumenti SEO** sono **impostazioni predefinite**, non incombenze.
- Se il tuo team valorizza la **manutenibilità e la velocità** in un'app multi-locale guidata da componenti, Intlayer offre l'esperienza **più completa** oggi disponibile.

Consulta il documento ['Perché Intlayer?'](https://intlayer.org/doc/why) per maggiori dettagli.
