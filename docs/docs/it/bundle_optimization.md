---
createdAt: 2025-11-25
updatedAt: 2026-04-08
title: Ottimizzazione della dimensione del bundle i18n e prestazioni
description: Riduci la dimensione del bundle della tua applicazione ottimizzando i contenuti di internazionalizzazione (i18n). Scopri come sfruttare il tree shaking e il lazy loading per i dizionari con Intlayer.
keywords:
  - Ottimizzazione del bundle
  - Automazione dei contenuti
  - Contenuto dinamico
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - bundle-optimization
history:
  - version: 8.7.0
    date: 2026-04-08
    changes: "Aggiunte le opzioni `minify` e `purge` alla configurazione di build"
---

# Ottimizzazione della dimensione del bundle i18n e prestazioni

Una delle sfide più comuni con le soluzioni i18n tradizionali che si affidano a file JSON è la gestione della dimensione dei contenuti. Se gli sviluppatori non separano manualmente i contenuti in namespace, gli utenti finiscono spesso per scaricare le traduzioni per ogni pagina e potenzialmente per ogni lingua solo per visualizzare una singola pagina.

Ad esempio, un'applicazione con 10 pagine tradotte in 10 lingue potrebbe comportare il download dei contenuti di 100 pagine da parte di un utente, anche se ne serve solo **una** (quella corrente nella lingua corrente). Ciò comporta uno spreco di larghezza di banda e tempi di caricamento più lenti.

**Intlayer risolve questo problema attraverso l'ottimizzazione in fase di build.** Analizza il tuo codice per rilevare quali dizionari sono effettivamente utilizzati per ogni componente e reinserisce solo il contenuto necessario nel tuo bundle.

## Sommario

<TOC />

## Scansiona il tuo bundle

Analizzare il tuo bundle è il primo passo per identificare file JSON "pesanti" e opportunità di code-splitting. Questi strumenti generano una mappa ad albero visiva del codice compilato della tua applicazione, permettendoti di vedere esattamente quali librerie stanno consumando più spazio.

<Tabs>
 <Tab value="vite">

### Vite / Rollup

Vite utilizza Rollup internamente. Il plugin `rollup-plugin-visualizer` genera un file HTML interattivo che mostra le dimensioni di ogni modulo nel tuo grafico.

```bash
npm install -D rollup-plugin-visualizer
```

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    visualizer({
      open: true, // Apre automaticamente il report nel tuo browser
      filename: "stats.html",
      gzipSize: true,
      brotliSize: true,
    }),
  ],
});
```

 </Tab>
 <Tab value="nextjs (turbopack)">

### Next.js (Turbopack)

Per i progetti che utilizzano App Router e Turbopack, Next.js fornisce un analizzatore sperimentale integrato che non richiede dipendenze extra.

```bash packageManager='npm'
npx next experimental-analyze
```

```bash packageManager='yarn'
yarn next experimental-analyze
```

```bash packageManager='pnpm'
pnpm next experimental-analyze
```

```bash packageManager='bun'
bun next experimental-analyze
```

 </Tab>
 <Tab value="nextjs (Webpack)">

### Next.js (Webpack)

Se stai utilizzando il bundler Webpack predefinito in Next.js, usa l'analizzatore di bundle ufficiale. Attivalo impostando una variabile d'ambiente durante la build.

```bash packageManager='npm'
npm install -D @next/bundle-analyzer
```

```bash packageManager='yarn'
yarn add -D @next/bundle-analyzer
```

```bash packageManager='pnpm'
pnpm add -D @next/bundle-analyzer
```

```bash packageManager='bun'
bun add -d @next/bundle-analyzer
```

```javascript fileName="next.config.js"
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  // La tua configurazione Next.js
});
```

**Utilizzo:**

```bash
ANALYZE=true npm run build
```

 </Tab>
 <Tab value="Webpack (CRA / Angular / etc)">

### Webpack Standard

Per Create React App (ejected), Angular o configurazioni Webpack personalizzate, usa lo standard di settore `webpack-bundle-analyzer`.

```bash packageManager='npm'
npm install -D webpack-bundle-analyzer
```

```bash packageManager='yarn'
yarn add -D webpack-bundle-analyzer
```

```bash packageManager='pnpm'
pnpm add -D webpack-bundle-analyzer
```

```bash packageManager='bun'
bun add -d webpack-bundle-analyzer
```

```typescript fileName="webpack.config.ts
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

export default {
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: "static",
      reportFilename: "bundle-analyzer.html",
      openAnalyzer: false,
    }),
  ],
};
```

 </Tab>
</Tabs>

## Come funziona

Intlayer utilizza un **approccio per componente**. A differenza dei file JSON globali, i tuoi contenuti sono definiti insieme o all'interno dei tuoi componenti. Durante il processo di build, Intlayer:

1.  **Analizza** il tuo codice per trovare le chiamate a `useIntlayer`.
2.  **Costruisce** il contenuto del dizionario corrispondente.
3.  **Sostituisce** la chiamata a `useIntlayer` con codice ottimizzato in base alla tua configurazione.

Questo assicura che:

- Se un componente non viene importato, il suo contenuto non viene incluso nel bundle (Dead Code Elimination).
- Se un componente è caricato in modalità lazy, anche il suo contenuto viene caricato in modalità lazy.

## Configurazione per piattaforma

<Tabs>
 <Tab value="nextjs">

### Next.js

Next.js richiede il plugin `@intlayer/swc` per gestire la trasformazione, poiché Next.js utilizza SWC per le build.

> Questo plugin non è installato di default perché i plugin SWC sono ancora sperimentali per Next.js. Potrebbe cambiare in futuro.

```bash packageManager="npm"
npm install -D @intlayer/swc
```

```bash packageManager="yarn"
yarn add -D @intlayer/swc
```

```bash packageManager="pnpm"
pnpm add -D @intlayer/swc
```

```bash packageManager="bun"
bun add -d @intlayer/swc
```

Una volta installato, Intlayer rileverà e utilizzerà automaticamente il plugin.

 </Tab>
 <Tab value="vite">

### Vite

Vite utilizza il plugin `@intlayer/babel` che è incluso come dipendenza di `vite-intlayer`. L'ottimizzazione è abilitata di default. Non c'è altro da fare.

 </Tab>
 <Tab value="webpack">

### Webpack

Per abilitare l'ottimizzazione del bundle con Intlayer su Webpack, è necessario installare e configurare il plugin Babel (`@intlayer/babel`) o SWC (`@intlayer/swc`) appropriato.

```bash packageManager="npm"
npm install -D @intlayer/babel
```

```bash packageManager="yarn"
yarn add -D @intlayer/babel
```

```bash packageManager="pnpm"
pnpm add -D @intlayer/babel
```

```bash packageManager="bun"
bun add -d @intlayer/babel
```

```typescript fileName="babel.config.js"
const { getOptimizePluginOptions } = require("@intlayer/babel");

module.exports = {
  plugins: [[intlayerOptimizeBabelPlugin, getOptimizePluginOptions()]],
};
```

 </Tab>
</Tabs>

## Configurazione

Puoi controllare come Intlayer ottimizza il tuo bundle tramite la proprietà `build` nel tuo `intlayer.config.ts`.

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    importMode: "dynamic",
  },
  build: {
    /**
     * Minimizza i dizionari per ridurre la dimensione del bundle.
     */
     minify: true;

    /**
     * Elimina le chiavi inutilizzate nei dizionari
     */
     purge: true;

    /**
     * Indica se la build deve controllare i tipi TypeScript
     */
    checkTypes: false;
  },
};

export default config;
```

> Mantenere l'opzione predefinita per `optimize` è raccomandato nella stragrande maggioranza dei casi.

> Vedi la doc di configurazione per maggiori dettagli: [Configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md)

### Opzioni di Build

Le seguenti opzioni sono disponibili sotto l'oggetto di configurazione `build`:

| Proprietà      | Tipo      | Predefinito | Descrizione                                                                                                                                                                                                                |
| :------------- | :-------- | :---------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`optimize`** | `boolean` | `undefined` | Controlla se l'ottimizzazione della build è abilitata. Se `true`, Intlayer sostituisce le chiamate ai dizionari con iniezioni ottimizzate. Se `false`, l'ottimizzazione è disabilitata. Idealmente a `true` in produzione. |
| **`minify`**   | `boolean` | `false`     | Se minimizzare i dizionari per ridurre la dimensione del bundle.                                                                                                                                                           |
| **`purge`**    | `boolean` | `false`     | Se eliminare le chiavi inutilizzate nei dizionari.                                                                                                                                                                         |

### Minimizzazione

Minimizzare i dizionari rimuove spazi bianchi non necessari, commenti e riduce la dimensione dei contenuti JSON. Ciò è particolarmente utile per dizionari di grandi dimensioni.

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    minify: true,
  },
};

export default config;
```

> Nota: La minimizzazione viene ignorata se `optimize` è disabilitato o se il Visual Editor è abilitato (poiché l'editor ha bisogno del contenuto completo per consentire le modifiche).

### Purging (Eliminazione)

Il purging assicura che solo le chiavi effettivamente utilizzate nel codice siano incluse nel bundle finale dei dizionari. Ciò può ridurre significativamente la dimensione del bundle se si hanno dizionari grandi con molte chiavi che non vengono utilizzate in ogni parte dell'applicazione.

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    purge: true,
  },
};

export default config;
```

> Nota: Il purging viene ignorato se `optimize` è disabilitato.

### Modalità di Importazione

Per applicazioni di grandi dimensioni, comprese diverse pagine e lingue, i tuoi file JSON possono rappresentare una parte significativa della dimensione del tuo bundle. Intlayer ti consente di controllare come vengono caricati i dizionari.

La modalità di importazione può essere definita di default a livello globale nel file `intlayer.config.ts`.

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    minify: true,
  },
};

export default config;
```

Così come per ogni dizionario nei tuoi file `.content.{{ts|tsx|js|jsx|mjs|cjs|json|jsonc|json5}}`.

```ts
import { type Dictionary, t } from "intlayer";

const appContent: Dictionary = {
  key: "app",
  importMode: "dynamic", // Sovrascrive la modalità di importazione predefinita
  content: {
    // ...
  },
};

export default appContent;
```

| Proprietà        | Tipo                               | Predefinito | Descrizione                                                                                                                  |
| :--------------- | :--------------------------------- | :---------- | :--------------------------------------------------------------------------------------------------------------------------- |
| **`importMode`** | `'static'`, `'dynamic'`, `'fetch'` | `'static'`  | **Deprecato**: Usa `dictionary.importMode` invece. Determina come vengono caricati i dizionari (vedi i dettagli di seguito). |

L'impostazione `importMode` dettata come il contenuto del dizionario viene iniettato nel tuo componente.
Puoi definirlo globalmente nel file `intlayer.config.ts` sotto l'oggetto `dictionary`, oppure puoi sovrascriverlo per un dizionario specifico nel suo file `.content.ts`.

### 1. Modalità Statica (`default`)

In modalità statica, Intlayer sostituisce `useIntlayer` con `useDictionary` e inietta il dizionario direttamente nel bundle JavaScript.

- **Pro:** Rendering istantaneo (sincrono), zero richieste di rete extra durante l'idratazione.
- **Contro:** Il bundle include le traduzioni per **tutte** le lingue disponibili per quel componente specifico.
- **Ideale per:** Single Page Applications (SPA).

**Esempio di codice trasformato:**

```tsx
// Il tuo codice
const content = useIntlayer("my-key");

// Codice ottimizzato (Statico)
const content = useDictionary({
  key: "my-key",
  content: {
    nodeType: "translation",
    translation: {
      en: "My title",
      fr: "Mon titolo",
    },
  },
});
```

### 2. Modalità Dinamica

In modalità dinamica, Intlayer sostituisce `useIntlayer` con `useDictionaryAsync`. Questo utilizza `import()` (meccanismo simile a Suspense) per caricare in modalità lazy specificamente il JSON per la lingua corrente.

- **Pro:** **Tree shaking a livello di lingua.** Un utente che visualizza la versione inglese scaricherà _solo_ il dizionario inglese. Il dizionario francese non viene mai caricato.
- **Contro:** Attiva una richiesta di rete (recupero dell'asset) per componente durante l'idratazione.
- **Ideale per:** Grandi blocchi di testo, articoli o applicazioni che supportano molte lingue in cui la dimensione del bundle è critica.

**Esempio di codice trasformato:**

```tsx
// Il tuo codice
const content = useIntlayer("my-key");

// Codice ottimizzato (Dinamico)
const content = useDictionaryAsync({
  en: () =>
    import(".intlayer/dynamic_dictionary/my-key/en.json").then(
      (mod) => mod.default
    ),
  fr: () =>
    import(".intlayer/dynamic_dictionary/my-key/fr.json").then(
      (mod) => mod.default
    ),
});
```

> Quando usi `importMode: 'dynamic'`, se hai 100 componenti che usano `useIntlayer` in una singola pagina, il browser tenterà 100 recuperi separati. Per evitare questo "waterfall" di richieste, raggruppa i contenuti in meno file `.content` (ad esempio, un dizionario per sezione della pagina) invece di uno per ogni singolo componente atomico.

### 3. Modalità Fetch

Si comporta in modo simile alla modalità dinamica ma tenta prima di recuperare i dizionari dall'API Intlayer Live Sync. Se la chiamata API fallisce o il contenuto non è contrassegnato per gli aggiornamenti live, ricorre all'importazione dinamica.

> Vedi la documentazione CMS per maggiori dettagli: [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_CMS.md)

> In modalità fetch, purghe e minimizzazioni non possono essere utilizzate.

## Riepilogo: Statico vs Dinamico

| Caratteristica           | Modalità Statica                                     | Modalità Dinamica                      |
| :----------------------- | :--------------------------------------------------- | :------------------------------------- |
| **Dimensione Bundle JS** | Maggiore (include tutte le lingue per il componente) | Minore (solo codice, nessun contenuto) |
| **Caricamento Iniziale** | Istantaneo (Il contenuto è nel bundle)               | Leggero ritardo (Recupera JSON)        |
| **Richieste di Rete**    | 0 richieste extra                                    | 1 richiesta per dizionario             |
| **Tree Shaking**         | Livello componente                                   | Livello componente + Livello lingua    |
| **Miglior Caso d'Uso**   | Componenti UI, Piccole Applicazioni                  | Pagine con molto testo, molte lingue   |
