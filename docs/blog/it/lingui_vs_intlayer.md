---
createdAt: 2026-09-13
updatedAt: 2026-09-22
title: "Lingui vs Intlayer: Benchmark & Confronto 2026"
description: "Due librerie di i18n basate su compilatore misurate su Next.js e TanStack Start. Dimensioni del bundle, leakage dei contenuti, dimensioni dei componenti, idratazione, reattività al cambio lingua ed esperienza sviluppatore."
keywords:
  - Lingui
  - Intlayer
  - Internazionalizzazione
  - i18n
  - Benchmark
  - Dimensione bundle
  - Compilatore
  - Blog
  - Next.js
  - TanStack Start
  - JavaScript
  - React
slugs:
  - blog
  - lingui-vs-intlayer
author: aymericzip
---

# Lingui VS Intlayer | Benchmark di Internazionalizzazione (i18n) per React & Next.js

![JavaScript i18n library ecosystem](https://github.com/aymericzip/intlayer/blob/main/docs/assets/cloud_i18n_logo.webp?raw=true)

Lingui e Intlayer sono le uniche due librerie in questo benchmark che si affidano a un **compilatore** piuttosto che a un semplice runtime. Lingui estrae i messaggi dalle macro in fase di compilazione e compila cataloghi per lingua. Intlayer compila dizionari per componente e applica il tree-shaking per lingua. Sulla carta dovrebbero essere molto simili. I numeri mostrano dove divergono.

I dati provengono da [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom), una suite open source che compila la medesima applicazione con ciascuna libreria e registra ciò che il browser scarica ed esegue realmente.

<TOC/>

> **tl;dr**: Lingui è la libreria più vicina a Intlayer in termini di JavaScript grezzo per pagina: **115-120 KB** contro **118,6 KB** su TanStack Start una volta configurato il lazy loading, e **148,6 KB** contro **141,3 KB** su Next.js. Il divario si apre altrove: un componente Lingui compilato isolatamente pesa **58-153 KB** contro **6-8 KB** per Intlayer, l'idratazione richiede **28-34 ms** contro **11-14 ms**, il fallback della lingua sorgente disperde il **3-15%** di stringhe inglesi nelle pagine francesi in qualsiasi configurazione ottimizzata, e per raggiungere tale configurazione occorre estrarre, compilare e selezionare i cataloghi per rotta manualmente. Intlayer ottiene questi risultati senza alcuna configurazione complessa.

## In sintesi

- **Lingui** - Basato su macro (`` t`...` ``, `<Trans>`, `msg`), formato ICU MessageFormat, cataloghi `.po` / JSON, flusso `lingui extract` + `lingui compile`. Compila gli ID dei messaggi in hash compatti, supporta il caricamento dinamico dei cataloghi per lingua. Collaudato, indipendente dal framework, con un solido ecosistema di strumenti per traduttori basato su `.po`.
- **Intlayer** - Modello di contenuto incentrato sui componenti. I dizionari `.content.ts` risiedono accanto al componente a cui sono associati; un compilatore in fase di build applica il tree-shaking e il lazy loading per componente e per lingua; genera tipi TypeScript rigorosi direttamente dal contenuto e segnala le traduzioni mancanti come errori di compilazione. Include middleware, helper SEO, un Visual Editor / CMS e traduzione assistita da IA.

| Libreria              | Stelle GitHub                                                                                                                                                                  | Commit Totali                                                                                                                                                                      | Ultimo Commit                                                                                                                                       | Prima Versione | Versione NPM                                                                                                        | Download NPM                                                                                                                   |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- | ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `aymericzip/intlayer` | [![GitHub Repo stars](https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/aymericzip/intlayer/stargazers) | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/aymericzip/intlayer?style=for-the-badge&label=commits)](https://github.com/aymericzip/intlayer/commits) | [![Last Commit](https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge)](https://github.com/aymericzip/intlayer/commits) | Aprile 2024    | [![npm](https://img.shields.io/npm/v/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer)         | [![npm downloads](https://img.shields.io/npm/dm/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer)         |
| `lingui/js-lingui`    | [![GitHub Repo stars](https://img.shields.io/github/stars/lingui/js-lingui?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/lingui/js-lingui/stargazers)       | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/lingui/js-lingui?style=for-the-badge&label=commits)](https://github.com/lingui/js-lingui/commits)       | [![Last Commit](https://img.shields.io/github/last-commit/lingui/js-lingui?style=for-the-badge)](https://github.com/lingui/js-lingui/commits)       | Dicembre 2016  | [![npm](https://img.shields.io/npm/v/@lingui/core?style=for-the-badge)](https://www.npmjs.com/package/@lingui/core) | [![npm downloads](https://img.shields.io/npm/dm/@lingui/core?style=for-the-badge)](https://www.npmjs.com/package/@lingui/core) |

> I badge si aggiornano automaticamente. I dati possono variare nel tempo.

## Confronto funzionale dettagliato

| Caratteristica                                   | Intlayer (`react-intlayer` / `next-intlayer`)                                             | Lingui (`@lingui/core` / `@lingui/react`)                                                     |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| **Traduzioni vicine ai componenti**              | ✅ Sì, file `.content.ts` collocato accanto a ogni componente                             | ⚠️ Stringhe sorgente inline in JSX tramite macro; traduzioni in cataloghi `.po` centralizzati |
| **Integrazione TypeScript**                      | ✅ Tipi rigorosi generati automaticamente dal contenuto                                   | ⚠️ Macro tipizzate; ID dei messaggi senza tipi, voci mancanti non rilevate                    |
| **Rilevamento traduzioni mancanti**              | ✅ Errore TypeScript + errore/avviso in fase di compilazione                              | ⚠️ `lingui extract` mostra statistiche; fallback silenzioso alla stringa sorgente             |
| **Contenuti ricchi (JSX/Markdown/componenti)**   | ✅ Supporto nativo diretto                                                                | ✅ Componente `<Trans>` con elementi annidati                                                 |
| **Supporto ICU**                                 | ⚠️ In sviluppo                                                                            | ✅ Sì (macro `plural`, `select`, `selectOrdinal`)                                             |
| **Formattazione (date, numeri, valute)**         | ✅ `useNumber`, `useDate`, ... (basato su `Intl`)                                         | ✅ `i18n.date()`, `i18n.number()`                                                             |
| **Routing localizzato & middleware**             | ✅ Proxy/middleware integrato, helper `getMultilingualUrls`                               | ❌ Non previsto nel core                                                                      |
| **Helper SEO (hreflang, sitemap, robots)**       | ✅ Utility integrate                                                                      | ❌ Da configurare manualmente                                                                 |
| **Componenti server sincroni (RSC)**             | ✅ `useIntlayer` da `next-intlayer/server` funziona in qualsiasi componente server figlio | ⚠️ Richiede un'istanza `I18n` per richiesta, passata a cascata o impostata con `setI18n`      |
| **Tree-shaking (invia solo il contenuto usato)** | ✅ Per componente e per lingua, automatizzato dal compilatore                             | ⚠️ Per lingua con `lingui compile`; per rotta richiede la suddivisione manuale dei cataloghi  |
| **Caricamento lazy**                             | ✅ `importMode: 'dynamic'` (una sola riga di configurazione)                              | ⚠️ `import()` manuale dei cataloghi + `i18n.load()` / `i18n.activate()`                       |
| **Rimozione contenuti inutilizzati**             | ✅ I dizionari orfani vengono eliminati in fase di build                                  | ✅ `lingui extract --clean` rimuove i messaggi obsoleti                                       |
| **Test traduzioni mancanti (CLI / CI)**          | ✅ `npx intlayer content test`                                                            | ⚠️ Statistiche di `lingui extract` (nessun codice di errore per impostazione predefinita)     |
| **Pipeline di build**                            | ✅ Un solo plugin (`@intlayer/swc` / `@intlayer/babel` / `vite-intlayer`)                 | ⚠️ Plugin macro (Babel o SWC) + passaggi `extract` + `compile`                                |
| **Traduzione assistita da IA**                   | ✅ Integrata, utilizza le tue chiavi API (OpenAI, Anthropic, Mistral...)                  | ❌ No                                                                                         |
| **Visual Editor / CMS**                          | ✅ Visual Editor gratuito + CMS opzionale                                                 | ❌ No (`.po` utilizzabile con TMS esterni)                                                    |
| **Server MCP e Agent Skills**                    | ✅ Sì                                                                                     | ❌ No                                                                                         |
| **Ecosistema / community**                       | ⚠️ Più giovane ma in rapida crescita                                                      | ✅ Consolidato, indipendente dal framework                                                    |

## Il benchmark

### Cosa è stato misurato

La suite [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) compila **la stessa applicazione** con ciascuna libreria: **10 pagine** (home, about, blog, careers, contact, FAQ, pricing, products, settings, team), **10 lingue** (`en`, `fr`, `es`, `de`, `it`, `pt`, `zh`, `ja`, `ko`, `ru`), componenti identici e contenuto identico. Le pagine sono misurate in `en` e `fr`. Ogni libreria è stata testata fino a quattro **strategie di caricamento**:

| Strategia          | Descrizione                                                                                   | Contesto d'uso tipico                |
| ------------------ | --------------------------------------------------------------------------------------------- | ------------------------------------ |
| **static**         | Tutti i cataloghi compilati vengono importati e caricati all'avvio                            | Prototipi veloci, codice generato IA |
| **dynamic**        | Solo il catalogo della lingua attiva viene importato con `import()`, ma comprende ogni pagina | La maggior parte dei progetti        |
| **scoped-static**  | Un catalogo per rotta, tutti inclusi nel bundle iniziale                                      | Raro                                 |
| **scoped-dynamic** | Un catalogo per rotta + `import()` lazy. Solo pagina corrente e lingua corrente               | Progetti con budget di byte severo   |

Intlayer non presenta una variante "scoped" separata: il compilatore isola il contenuto **per componente** in modo automatico, rendendo le righe `static` e `dynamic` già perfettamente suddivise.

Per ogni build vengono registrati i seguenti parametri:

- **Lib size**: dimensione gzip di un componente vuoto che importa solo la libreria di i18n (costo fisso del runtime).
- **Page JS**: JavaScript gzip medio scaricato per pagina, calcolato su tutte le pagine e lingue.
- **Locale leak %**: percentuale di stringhe tradotte nel JS scaricato appartenenti a lingue che l'utente **non** sta visualizzando.
- **Page leak %**: percentuale di stringhe tradotte nel JS scaricato appartenenti a pagine in cui l'utente **non** si trova.
- **Component avg**: dimensione media gzip di ciascun componente compilato isolatamente.
- **E2E reactivity**: tempo effettivo misurato tra la selezione di una nuova lingua e l'aggiornamento di `html[lang]` nel DOM (Playwright, media su 5 iterazioni).
- **Hydration**: durata della fase di idratazione di React.

> I valori sottostanti fanno riferimento al test del **2026-09-12** con `@lingui/react` 6.6.0 e `intlayer` 9.5.1. L'applicazione di test è volutamente contenuta (poche decine di stringhe per lingua), per cui le percentuali di dispersione descrivono un **modello strutturale** che cresce all'aumentare dei contenuti.

### Risultati su Next.js

Seleziona le metriche e le librerie che ti interessano:

<I18nBenchmark framework="nextjs" vertical/>

| Libreria            | Strategia      | Lib size (gz) | Page JS media (gz) | Leak lingua | Leak pagina | Componente medio (gz) | Reattività E2E | Idratazione |
| ------------------- | -------------- | ------------: | -----------------: | ----------: | ----------: | --------------------: | -------------: | ----------: |
| **base** (no i18n)  | -              |        0,0 KB |           141,0 KB |        0,0% |        0,0% |                0,9 KB |        13,4 ms |     11,8 ms |
| Lingui              | static         |       11,9 KB |           207,4 KB |       50,0% |       90,0% |               73,3 KB |        15,3 ms |     15,2 ms |
| Lingui              | dynamic        |       11,9 KB |           145,4 KB |        2,8% |       89,9% |               19,9 KB |        15,7 ms |     12,7 ms |
| Lingui              | scoped-static  |       11,9 KB |           148,2 KB |        2,7% |       89,1% |               20,4 KB |        15,1 ms |     13,1 ms |
| Lingui              | scoped-dynamic |       11,9 KB |           148,6 KB |       14,8% |        0,0% |              152,6 KB |        16,1 ms |     14,8 ms |
| **`next-intlayer`** | static         |    **5,5 KB** |       **141,3 KB** |    **0,0%** |    **0,0%** |            **8,5 KB** |    **15,5 ms** |     16,9 ms |
| **`next-intlayer`** | dynamic        |    **5,5 KB** |       **141,3 KB** |    **0,0%** |    **0,0%** |            **6,9 KB** |    **15,3 ms** |     15,9 ms |

**Interpretazione dei dati**

- **Costo del runtime.** Un componente vuoto pesa 11,9 KB gzip con Lingui contro 5,5 KB con Intlayer. Sulla pagina completa, la migliore configurazione di Lingui si posiziona a **+7,3 KB** rispetto a Intlayer (148,6 contro 141,3 KB); Intlayer si colloca ad appena **+0,3 KB** rispetto all'app base senza i18n.
- **La configurazione semplice comporta un forte spreco.** Caricare tutti i cataloghi compilati all'avvio genera **207,4 KB per pagina**, +66 KB rispetto alla base. Metà delle stringhe appartiene alla lingua sbagliata e il 90% a pagine non aperte.
- **Il caricamento dinamico risolve la lingua, non la pagina.** Con un catalogo per lingua, il leakage di pagina resta vicino al 90%: l'intero catalogo francese viene scaricato su ciascuna pagina in francese. Per raggiungere lo 0% di leakage con Lingui serve la variante `scoped-dynamic`: un catalogo per rotta, estratto e compilato a parte, importato manualmente per ogni vista.
- **Il fallback della lingua sorgente si disperde.** Perfino nelle configurazioni più ottimizzate, **tra il 3% e il 15% delle stringhe inglesi viaggia nelle pagine francesi**. Le macro Lingui mantengono il testo sorgente nel bundle come fallback. Intlayer risolve i fallback in fase di compilazione e invia solo la lingua attiva.
- **Le dimensioni dei componenti aumentano drasticamente in `scoped-dynamic`.** Ciascun componente compilato isolatamente pesa in media **152,6 KB**, poiché tutti i cataloghi delle rotte risultano raggiungibili attraverso gli import. Lo stesso componente con `useIntlayer()` pesa in media **6,9 KB**.

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-nextjs.md"
width="100%"
height="600px"
style="border:none;"
/>

> Tabella completa, ogni libreria e ogni strategia, nel [report di benchmark Next.js](https://intlayer.org/it/doc/benchmark/nextjs).

### Risultati su TanStack Start

<I18nBenchmark framework="tanstack" vertical/>

| Libreria                    | Strategia      | Lib size (gz) | Page JS media (gz) | Leak lingua | Leak pagina | Componente medio (gz) | Reattività E2E | Idratazione |
| --------------------------- | -------------- | ------------: | -----------------: | ----------: | ----------: | --------------------: | -------------: | ----------: |
| **base** (no i18n)          | -              |        0,0 KB |           111,0 KB |        0,0% |        0,0% |                0,7 KB |         8,1 ms |     21,6 ms |
| Lingui                      | static         |       11,2 KB |           152,2 KB |       50,0% |       90,0% |               58,0 KB |         3,9 ms |     19,9 ms |
| Lingui                      | dynamic        |       11,2 KB |           115,2 KB |        9,3% |        0,0% |               85,5 KB |         5,9 ms |     28,0 ms |
| Lingui                      | scoped-static  |       11,2 KB |           120,8 KB |        4,0% |        0,0% |              147,9 KB |         7,1 ms |     33,9 ms |
| Lingui                      | scoped-dynamic |       11,2 KB |           120,2 KB |        8,6% |        0,0% |               83,7 KB |        42,1 ms |     32,9 ms |
| **`intlayer`**              | static         |    **5,0 KB** |       **125,8 KB** |       50,0% |    **0,0%** |            **8,1 KB** |     **3,2 ms** |     11,5 ms |
| **`intlayer`**              | dynamic        |    **5,0 KB** |       **118,6 KB** |    **0,0%** |    **0,0%** |            **6,3 KB** |     **3,6 ms** |     14,1 ms |
| `@intlayer/lingui` (compat) | dynamic        |       10,3 KB |           137,0 KB |        9,9% |        0,0% |               12,8 KB |         2,9 ms |     19,7 ms |

**Interpretazione dei dati**

- **Nel JavaScript per pagina, Lingui prevale di misura.** Lingui in modalità `dynamic` registra **115,2 KB**, 3,4 KB in meno rispetto ai 118,6 KB di Intlayer. I suoi cataloghi compilati con ID hashati sono molto densi, e il router di TanStack Start isola le rotte abbastanza bene da azzerare il leakage di pagina già nella riga `dynamic`.
- **Tutti gli altri parametri favoriscono nettamente Intlayer.** L'idratazione impiega **28-34 ms** con Lingui contro **11-14 ms** con Intlayer: `i18n.load()` + `i18n.activate()` devono essere completati sul client prima dell'idratazione di React. I componenti isolati pesano **58-148 KB** invece di **6-8 KB**. Il leakage di lingua non scende mai a 0% (resta al 4-9%) a causa del fallback originale.
- **Il cambio lingua nell'assetto ottimizzato subisce rallentamenti.** Lingui in `scoped-dynamic` richiede **42 ms** per aggiornare `html[lang]`, poiché il catalogo della nuova rotta deve essere scaricato, caricato e attivato prima che l'interfaccia cambi. Intlayer commuta in **3-4 ms** in entrambe le modalità.
- **La riga `static` di Intlayer raggiunge già lo 0% di leakage di pagina** perché include esclusivamente i dizionari utilizzati dai componenti di quella pagina. Una sola riga (`importMode: 'dynamic'`) azzera anche il leakage di lingua.
- **`@intlayer/lingui`** mantiene la sintassi delle macro di Lingui servendosi dei dizionari di Intlayer. Cede qualche kilobyte per pagina (137 KB, restando attivo il runtime delle macro) in cambio di componenti molto più snelli (12,8 KB) e un'idratazione più reattiva. Rappresenta una soluzione transitoria ideale.

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-tanstack.md"
width="100%"
height="600px"
style="border:none;"
/>

> Tabella completa nel [report di benchmark TanStack Start](https://intlayer.org/it/doc/benchmark/tanstack).

## Perché questa differenza? Due compilatori, due unità di lavoro

![The Intlayer compiler extracts content from components](https://github.com/aymericzip/intlayer/blob/main/docs/assets/compiler.webp?raw=true)

Entrambi gli strumenti utilizzano un compilatore, ma compilano elementi strutturalmente differenti.

**Lingui compila cataloghi.** Le macro nel codice sorgente vengono estratte in un file `.po` per lingua e quindi compilate in un modulo JS per lingua. L'unità operativa è la **lingua**. Dividere a livello più granulare, per rotta o per componente, comporta la creazione di cataloghi multipli, una configurazione articolata di `lingui.config.ts` e la gestione manuale dei caricamenti. L'istanza `I18n` è globale; ogni `useLingui()` vi iscrive il componente.

```bash
.
├── lingui.config.ts
└── src
    ├── i18n.ts                          # setupI18n(), load(), activate()
    ├── locales
    │   ├── en
    │   │   ├── messages.po
    │   │   └── messages.mjs             # output di lingui compile
    │   └── fr
    │       ├── messages.po
    │       └── messages.mjs
    ├── components
    │   └── Counter.tsx                  # const { t } = useLingui(); t`Increment`
    └── routes
        └── $locale
            └── about.tsx                # await import(`../locales/${locale}/messages.mjs`)
```

**Intlayer compila dizionari.** Ogni file `.content.ts` è un dizionario associato a una chiave; il compilatore analizza quale componente importa quale chiave e genera, per dizionario e per lingua, esattamente il JSON necessario. L'unità operativa è il **componente**. La suddivisione per rotta è un effetto immediato: una pagina carica esclusivamente i dizionari dei componenti che renderizza.

```bash
.
├── intlayer.config.ts
└── src
    ├── components
    │   └── Counter
    │       ├── index.tsx                # useIntlayer("counter")
    │       └── index.content.ts
    └── routes
        └── $locale
            ├── about.tsx
            └── about.content.ts
```

Ecco perché l'architettura `scoped-dynamic` è un risultato nativo e automatico con Intlayer, mentre rappresenta un progetto di configurazione complesso con Lingui. Il divario si allarga su due assi contemporaneamente, pagine e lingue:

![Theoretical content leakage by architecture](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

> Per replicare le prestazioni della riga `dynamic`, imposta `dictionary.importMode: 'dynamic'` nel file `intlayer.config.ts`. Consulta la [guida all'ottimizzazione del bundle](https://intlayer.org/it/doc/concept/bundle-optimization).

## Esperienza sviluppatore

### Configurazione

<Tabs defaultTab="intlayer" group="techno">
<Tab label="Lingui" value="lingui">

```ts fileName="lingui.config.ts"
import { defineConfig } from "@lingui/cli";

export default defineConfig({
  sourceLocale: "en",
  locales: ["en", "fr"],
  catalogs: [
    {
      path: "<rootDir>/src/locales/{locale}/messages",
      include: ["src"],
    },
  ],
});
```

```ts fileName="src/i18n.ts"
import { setupI18n } from "@lingui/core";

export const loadCatalog = async (locale: string) => {
  const { messages } = await import(`./locales/${locale}/messages.mjs`);
  const i18n = setupI18n();
  i18n.load(locale, messages);
  i18n.activate(locale);
  return i18n;
};
```

Successivamente occorre aggiungere `@lingui/babel-plugin-lingui-macro` (o `@lingui/swc-plugin`) al bundler, eseguire `lingui extract` dopo ogni modifica ai testi, `lingui compile` prima della compilazione generale, e avvolgere la radice con `<I18nProvider i18n={i18n}>`.

</Tab>
<Tab label="Intlayer" value="intlayer">

```ts fileName="intlayer.config.ts"
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

Aggiungi `intlayer()` a `vite.config.ts` (o `withIntlayer()` a `next.config.ts`) e avvolgi l'albero con `<IntlayerProvider>`. Nessun passaggio manuale di estrazione o compilazione: i dizionari vengono processati direttamente all'avvio del bundler.

</Tab>
</Tabs>
### Creazione del componente

<Tabs defaultTab="intlayer" group="techno">
<Tab label="Lingui" value="lingui">

```tsx fileName="src/components/Counter.tsx"
import { useState } from "react";
import { useLingui } from "@lingui/react/macro";
import { Trans } from "@lingui/react/macro";

export const Counter = () => {
  const { t, i18n } = useLingui();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{i18n.number(count)}</p>
      <button aria-label={t`Counter`} onClick={() => setCount((c) => c + 1)}>
        <Trans>Increment</Trans>
      </button>
    </div>
  );
};
```

Il testo in inglese risiede nel componente; la traduzione in francese si trova in `src/locales/fr/messages.po` sotto un ID con hash, generato dopo aver eseguito `lingui extract`. Dimenticare l'estrazione o la compilazione comporterà l'uso silenzioso dell'inglese.

</Tab>
<Tab label="Intlayer" value="intlayer">

```ts fileName="src/components/Counter/index.content.ts"
import { t, type Dictionary } from "intlayer";

const counterContent = {
  key: "counter",
  content: {
    label: t({ en: "Counter", fr: "Compteur" }),
    increment: t({ en: "Increment", fr: "Incrémenter" }),
  },
} satisfies Dictionary;

export default counterContent;
```

```tsx fileName="src/components/Counter/index.tsx"
import { useState } from "react";
import { useIntlayer } from "react-intlayer";
import { useNumber } from "react-intlayer/format";

export const Counter = () => {
  const { label, increment } = useIntlayer("counter");
  const number = useNumber();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{number(count)}</p>
      <button aria-label={label} onClick={() => setCount((c) => c + 1)}>
        {increment}
      </button>
    </div>
  );
};
```

Entrambe le lingue risiedono nello stesso file accanto al componente. Un valore mancante per `fr` blocca il build, mentre una chiave inesistente scatena immediatamente un errore TypeScript.

</Tab>
</Tabs>
### Fuori dai componenti

Metadati, loader, funzioni server: ovunque non sia presente un albero React.

<Tabs defaultTab="intlayer" group="techno">
<Tab label="Lingui" value="lingui">

```ts fileName="src/routes/$locale/about.tsx"
import { setupI18n } from "@lingui/core";
import { msg } from "@lingui/core/macro";

const title = msg`About us`;

export const loader = async ({ params }: { params: { locale: string } }) => {
  const { messages } = await import(
    `../../locales/${params.locale}/messages.mjs`
  );
  const i18n = setupI18n({
    locale: params.locale,
    messages: { [params.locale]: messages },
  });

  return { title: i18n._(title) };
};
```

Occorre una nuova istanza `I18n` per chiamata, l'importazione esplicita del catalogo corrispondente e l'uso di `msg` + `i18n._()` al posto di `t`. Come rilevato nelle [note del benchmark](https://github.com/intlayer-org/benchmark-bloom/blob/main/report/NOTE.md), intuire quando utilizzare `t`, `` t` ` ``, `i18n.t()`, `msg` o `<Trans>` risulta spesso poco intuitivo.

</Tab>
<Tab label="Intlayer" value="intlayer">

```ts fileName="src/routes/$locale/about.tsx"
import { getIntlayer } from "intlayer";

export const loader = async ({ params }: { params: { locale: string } }) => {
  const { title } = getIntlayer("about-metadata", params.locale);

  return { title };
};
```

</Tab>
</Tabs>

## Mantenere le macro di Lingui con i dizionari di Intlayer

`@intlayer/lingui` è un adattatore compatibile per `@lingui/core` e `@lingui/react`. Le macro continuano a compilarsi come di consueto; le chiamate a `i18n._()` generate vengono soddisfatte dai dizionari di Intlayer, mentre i plugin di sincronizzazione `.po` preservano i cataloghi esistenti come fonte di verità. Plurali e selezioni ICU vengono riprodotti in modo identico.

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { lingui } from "@intlayer/lingui/plugin";

export default defineConfig({
  plugins: [lingui()],
});
```

Mantieni `@lingui/babel-plugin-lingui-macro` / `@lingui/swc-plugin` nella build, assicurandoti che venga eseguito prima del compilatore Intlayer. Consulta la [guida di compatibilità Lingui](https://intlayer.org/it/doc/compatibility/lingui).

## Quale soluzione scegliere?

<AccordionGroup>
<Accordion header="Scegli Lingui">

Vuoi **ICU MessageFormat** con macro tipizzate, i tuoi traduttori lavorano in **`.po`** con una pipeline TMS esistente, preferisci stringhe sorgente in linea in JSX e il tuo team gestisce comodamente il flusso di estrazione / compilazione / suddivisione dei cataloghi. Il suo JS per pagina è competitivo una volta configurato il caricamento lazy.

</Accordion>
<Accordion header="Scegli Intlayer">

Vuoi **contenuto con ambito per componente**, **TypeScript rigoroso**, **errori di chiavi mancanti in fase di compilazione**, **tree-shaking e caricamento lazy senza sforzo**, componenti leggeri, idratazione rapida, cambio istantaneo di lingua e strumenti editoriali integrati ([Editor Visuale](https://intlayer.org/it/doc/concept/editor), [CMS](https://intlayer.org/it/doc/concept/cms), [traduzione AI](https://intlayer.org/it/doc/concept/auto-fill), [server MCP](https://intlayer.org/it/doc/mcp-server)). Particolarmente rilevante per grandi codebase modulari e design system.

</Accordion>
<Accordion header="Scegli @intlayer/lingui">

Usi già Lingui e desideri passare ai dizionari Intlayer gradualmente senza toccare le macro. I tuoi cataloghi `.po` rimangono la fonte di verità tramite il [plugin di sincronizzazione PO](https://intlayer.org/it/doc/compatibility/lingui). Misurato fianco a fianco in [Lingui vs @intlayer/lingui](https://intlayer.org/it/blog/lingui-vs-intlayer-lingui).

</Accordion>
</AccordionGroup>

## FAQ

<FAQ>

<Question title="Anche Lingui compila. Perché l'output è così diverso?">

Perché l'unità di compilazione differisce. Lingui compila **un catalogo per lingua**: tutto il resto (cataloghi per route, lazy loading, esclusione del fallback dal bundle) richiede configurazione. Intlayer compila **un dizionario per componente**, quindi l'ambito delle route deriva direttamente dalla compilazione. Ecco perché un componente Lingui compilato isolatamente pesa 58-153 KB contro i 6-8 KB di Intlayer.

</Question>

<Question title="Perché la dispersione di lingua non raggiunge mai lo 0% con Lingui?">

Le macro mantengono il messaggio sorgente disponibile come fallback a runtime, quindi la stringa inglese viene inviata insieme alla sua traduzione. Il benchmark misura il **3-15% di stringhe `en` nelle pagine `fr`** in ogni configurazione ottimizzata. Intlayer risolve i fallback in fase di compilazione e invia solo la lingua attiva.

</Question>

<Question title="Il JavaScript per pagina di Lingui è davvero competitivo?">

Sì, e su TanStack Start vince di un soffio: 115.2 KB in `dynamic` contro 118.6 KB per Intlayer. I cataloghi compilati con ID con hash sono compatti. Il costo si manifesta altrove: idratazione a 28-34 ms contro 11-14 ms, e un cambio di lingua a **42 ms** nella configurazione `scoped-dynamic`.

</Question>

<Question title="Devo rinunciare alle macro per migrare?">

No. `@intlayer/lingui` mantiene la compilazione di `` t`...` ``, `<Trans>`, `msg`, `plural`, `select` e `selectOrdinal` come prima; cambia solo ciò rispetto a cui `i18n._()` risolve. Mantieni `@lingui/babel-plugin-lingui-macro` o `@lingui/swc-plugin` nella compilazione. Vedi la [documentazione sulla compatibilità di Lingui](https://intlayer.org/it/doc/compatibility/lingui).

</Question>

<Question title="Che ne è dei passaggi di estrazione e compilazione?">

Rimangono per le macro e scompaiono per i contenuti nativi di Intlayer. I dizionari `.content.ts` vengono creati all'esecuzione del bundler, senza un passaggio CLI separato, e [`intlayer test`](https://intlayer.org/it/doc/concept/cli) blocca la CI in caso di chiave mancante anziché ricadere silenziosamente sulla stringa sorgente.

</Question>

</FAQ>

## Confronti correlati

Stesso benchmark, altre librerie:

- [next-intl vs Intlayer](https://intlayer.org/it/blog/next-intl-vs-intlayer)
- [i18next vs Intlayer](https://intlayer.org/it/blog/i18next-vs-intlayer)
- [vue-i18n vs Intlayer benchmark](https://intlayer.org/it/blog/vue-i18n-vs-intlayer-benchmark)
- [next-i18next vs next-intl vs Intlayer](https://intlayer.org/it/blog/next-i18next-vs-next-intl-vs-intlayer)
- [react-i18next vs react-intl vs Intlayer](https://intlayer.org/it/blog/react-i18next-vs-react-intl-vs-intlayer)

Approfondimenti:

- [Lingui vs @intlayer/lingui](https://intlayer.org/it/blog/lingui-vs-intlayer-lingui), l'adattatore misurato sulla stessa applicazione
- [Compiler-driven vs declarative i18n](https://intlayer.org/it/blog/compiler-vs-declarative-i18n)
- [Per-component vs centralized i18n](https://intlayer.org/it/blog/per-component-vs-centralized-i18n)
- [ICU message format explained](https://intlayer.org/it/blog/icu-message-format)

Documenti di riferimento:

- [Report di benchmark Next.js](https://intlayer.org/it/doc/benchmark/nextjs) e [report di benchmark TanStack Start](https://intlayer.org/it/doc/benchmark/tanstack)
- [Compat adapter: Lingui](https://intlayer.org/it/doc/compatibility/lingui)
- [Ottimizzazione del bundle](https://intlayer.org/it/doc/concept/bundle-optimization) e [il compilatore Intlayer](https://intlayer.org/it/doc/compiler)

## Stelle su GitHub

Le stelle su GitHub forniscono una chiara indicazione della popolarità di un progetto, della fiducia della comunità e della sua rilevanza nel tempo. Pur non rappresentando una misura assoluta della qualità del codice, attestano quanti sviluppatori apprezzano lo strumento e ne seguono l'evoluzione.

[![Storico delle stelle](https://api.star-history.com/chart?repos=lingui%2Fjs-lingui%2Caymericzip%2Fintlayer&type=date&legend=top-left)](https://star-history.com/#lingui/js-lingui&aymericzip/intlayer)

## Conclusione

Lingui rappresenta senz'altro la libreria ibrida runtime-compilatore più valida in questa rassegna. I suoi cataloghi compilati con ID hashati le consentono di raggiungere una dimensione JavaScript per pagina molto vicina a quella di Intlayer, e persino lievemente inferiore su TanStack Start. Se il puro volume di byte per pagina fosse l'unico parametro, ci troveremmo davanti a un pareggio.

Tuttavia non è così. Il compilatore di Lingui si ferma al confine della lingua; qualsiasi granularità inferiore (cataloghi per rotta, lazy loading, esclusione del testo di fallback) richiede configurazione manuale. Il benchmark quantifica i costi di questo confine: componenti **10-20 volte più pesanti**, idratazione **2-3 volte più lenta**, **3-15% di leakage permanente della lingua sorgente** e un tempo di cambio lingua di **42 ms** nella configurazione ottimizzata. Il compilatore di Intlayer agisce a livello di singolo componente: queste cifre passano naturalmente a **6-8 KB**, **11-14 ms**, **0%** e **3-4 ms**, senza richiedere alcuna configurazione complessa.

Tutti i dati grezzi, le applicazioni di prova e gli script sono disponibili nel [repository Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom). Puoi testarli in prima persona.

Consulta la guida ['Perché Intlayer?'](https://intlayer.org/it/doc/why) per ulteriori approfondimenti.
