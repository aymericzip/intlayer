---
createdAt: 2025-11-25
updatedAt: 2026-06-07
title: Ottimizzazione delle dimensioni e delle prestazioni del bundle i18n
description: Riduci le dimensioni del bundle della tua applicazione ottimizzando i contenuti di internazionalizzazione (i18n). Scopri come sfruttare il tree shaking e il lazy loading per i dizionari con Intlayer.
keywords:
  - Ottimizzazione Bundle
  - Automazione Contenuti
  - Contenuto Dinamico
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - bundle-optimization
history:
  - version: 8.12.0
    date: 2026-06-07
    changes: "Aggiunto `intlayerPurgeBabelPlugin` e `intlayerMinifyBabelPlugin` per Babel/Webpack; chiarimento della pipeline dei plugin"
  - version: 8.7.0
    date: 2026-04-08
    changes: "Aggiunte le opzioni `minify` e `purge` alla configurazione di build"
---

# Ottimizzazione delle dimensioni e delle prestazioni del bundle i18n

Una delle sfide più comuni con le tradizionali soluzioni i18n basate su file JSON è la gestione delle dimensioni dei contenuti. Se gli sviluppatori non separano manualmente i contenuti in namespace, gli utenti finiscono spesso per scaricare le traduzioni per ogni pagina e potenzialmente per ogni lingua solo per visualizzare una singola pagina.

Ad esempio, un'applicazione con 10 pagine tradotte in 10 lingue potrebbe far sì che un utente scarichi il contenuto di 100 pagine, anche se ne ha bisogno solo di **una** (la pagina attuale nella lingua attuale). Ciò porta a spreco di larghezza di banda e tempi di caricamento più lenti.

**Intlayer risolve questo problema attraverso l'ottimizzazione in fase di compilazione (build).** Analizza il tuo codice per rilevare quali dizionari sono effettivamente utilizzati in ciascun componente e inietta solo il contenuto necessario nel tuo bundle.

## Indice dei Contenuti

<TOC />

## Analizza il tuo bundle

Analizzare il tuo bundle è il primo passo per identificare i file JSON "pesanti" e le opportunità di suddivisione del codice (code-splitting). Questi strumenti generano una visualizzazione treemap del codice compilato della tua applicazione, permettendoti di vedere esattamente quali librerie consumano più spazio.

<Tabs>
 <Tab value="vite">

### Vite / Rollup

Vite utilizza Rollup sotto il cofano. Il plugin `rollup-plugin-visualizer` genera un file HTML interattivo che mostra le dimensioni di ogni modulo nel tuo grafo.

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

Per i progetti che utilizzano l'App Router e Turbopack, Next.js fornisce un analizzatore sperimentale integrato che non richiede dipendenze extra.

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

Se utilizzi il bundler Webpack predefinito in Next.js, usa l'analizzatore di bundle ufficiale. Attivalo impostando una variabile d'ambiente durante la tua build.

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

Per Create React App (ejected), Angular, o configurazioni Webpack personalizzate, usa lo standard del settore `webpack-bundle-analyzer`.

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

## Come Funziona

Intlayer utilizza un **approccio per componente**. A differenza dei file JSON globali, il tuo contenuto viene definito accanto o all'interno dei tuoi componenti. Durante il processo di build, Intlayer:

1. **Analizza** il tuo codice per trovare le chiamate a `useIntlayer`.
2. **Costruisce** il contenuto del dizionario corrispondente.
3. **Sostituisce** la chiamata a `useIntlayer` con un codice ottimizzato in base alla tua configurazione.

Ciò garantisce che:

- Se un componente non viene importato, il suo contenuto non viene incluso nel bundle (Dead Code Elimination).
- Se un componente viene caricato tramite lazy loading, anche il suo contenuto viene caricato in modo lazy.

## Riferimento Plugin

L'ottimizzazione in fase di build di Intlayer è suddivisa tra diversi plugin discreti, ciascuno con una singola responsabilità. Capire cosa fa ciascuno evita confusione al momento della configurazione.

### Plugin Babel (`@intlayer/babel`)

Questi sono usati direttamente nel file `babel.config.js` per i setup basati su Webpack (Next.js con Babel, CRA, Webpack personalizzato, ecc.).

| Plugin                        | Cosa fa                                                                                                                                    |
| :---------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------- |
| `intlayerExtractBabelPlugin`  | Scansiona i file `.content.ts` e scrive i dizionari compilati in `.intlayer/`                                                              |
| `intlayerOptimizeBabelPlugin` | Riscrive `useIntlayer('key')` in `useDictionary(hash)` e inietta la dichiarazione di `import` corrispondente al dizionario                 |
| `intlayerPurgeBabelPlugin`    | Scansiona tutti i file sorgente, rimuove i **campi di contenuto inutilizzati** dai file di dizionario JSON compilati `.intlayer/**/*.json` |
| `intlayerMinifyBabelPlugin`   | **Rinomina le chiavi dei campi di contenuto** in brevi alias alfabetici (`title` → `a`) sia nei file JSON che nel codice sorgente          |

> **L'ordine dei plugin è importante.** Nel tuo `babel.config.js` i plugin purge e minify devono apparire **prima** del plugin optimize. La fase optimize sostituisce `useIntlayer('key')` con una chiamata opaca a `useDictionary(hash)`, cancellando le informazioni della chiave del dizionario di cui le fasi purge e minify hanno bisogno per identificare quali campi vengono usati.

Ogni plugin Babel ha un relativo helper per le opzioni che legge il tuo `intlayer.config.ts` una volta sola al momento del caricamento della configurazione e restituisce valori pre-risolti:

| Helper opzioni               | Usato con                     |
| :--------------------------- | :---------------------------- |
| `getExtractPluginOptions()`  | `intlayerExtractBabelPlugin`  |
| `getOptimizePluginOptions()` | `intlayerOptimizeBabelPlugin` |
| `getPurgePluginOptions()`    | `intlayerPurgeBabelPlugin`    |
| `getMinifyPluginOptions()`   | `intlayerMinifyBabelPlugin`   |

### Plugin Vite (`vite-intlayer`)

Gli utenti di Vite **non configurano mai questi direttamente**. Vengono cablati automaticamente quando chiami `withIntlayer()` in `vite.config.ts`. I flag `build.purge` e `build.minify` in `intlayer.config.ts` attivano o disattivano il comportamento corrispondente senza alcuna registrazione extra di plugin.

| Plugin Vite interno | Comportamento equivalente                                                                                           |
| :------------------ | :------------------------------------------------------------------------------------------------------------------ |
| Usage analyzer      | Stesso comportamento della fase di analisi in `intlayerPurgeBabelPlugin`                                            |
| Dictionary prune    | Stesso comportamento della fase di scrittura JSON in `intlayerPurgeBabelPlugin`                                     |
| Dictionary minify   | Stesso comportamento della fase di scrittura JSON in `intlayerMinifyBabelPlugin`                                    |
| Babel transform     | Stesso comportamento di ridenominazione codice sorgente `intlayerMinifyBabelPlugin` + `intlayerOptimizeBabelPlugin` |

## Configurazione per Piattaforma

<Tabs>
 <Tab value="nextjs">

### Next.js

Next.js richiede il plugin `@intlayer/swc` per la fase optimize (riscrittura degli import), perché Next.js usa SWC per le build.

> Questo plugin non è installato di default perché i plugin SWC sono ancora sperimentali in Next.js. Questo aspetto potrebbe cambiare in futuro.

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

Per i passaggi di **purge e minify** (rimozione dei campi e ridenominazione dei campi), installa `@intlayer/babel` insieme e aggiungi i plugin Babel. Dal momento che Next.js usa SWC per le trasformazioni ma valuta ancora `babel.config.js` per la configurazione dei plugin, i plugin Babel agiscono come fase preliminare rispetto ad SWC.

```bash packageManager="npm"
npm install -D @intlayer/babel
```

```javascript fileName="babel.config.js"
const {
  intlayerPurgeBabelPlugin,
  intlayerMinifyBabelPlugin,
  getPurgePluginOptions,
  getMinifyPluginOptions,
} = require("@intlayer/babel");

module.exports = {
  presets: ["next/babel"],
  plugins: [
    // Purge: rimuove campi di contenuto inutilizzati da .intlayer/**/*.json
    [intlayerPurgeBabelPlugin, getPurgePluginOptions()],
    // Minify: rinomina le chiavi dei campi di contenuto nel JSON + codice sorgente
    [intlayerMinifyBabelPlugin, getMinifyPluginOptions()],
    // Nota: intlayerOptimizeBabelPlugin NON è necessario qui perché
    // @intlayer/swc gestisce la riscrittura da useIntlayer a useDictionary.
  ],
};
```

 </Tab>
 <Tab value="vite">

### Vite

Vite usa il plugin `@intlayer/babel`, che è incluso come dipendenza in `vite-intlayer`. L'intera pipeline di ottimizzazione — riscrittura import, purge e minify — è abilitata di default e non richiede registrazione di plugin extra.

Abilita purge e minify impostando i flag corrispondenti in `intlayer.config.ts`:

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    purge: true, // rimuove i campi inutilizzati nei JSON all'interno del bundle
    minify: true, // rinomina le chiavi dei campi in alias corti
  },
};

export default config;
```

 </Tab>
 <Tab value="webpack">

### Webpack (e Next.js con Babel)

Installa `@intlayer/babel`:

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

Aggiungi tutti e quattro i plugin a `babel.config.js` nel giusto ordine:

```javascript fileName="babel.config.js"
const {
  intlayerExtractBabelPlugin,
  intlayerPurgeBabelPlugin,
  intlayerMinifyBabelPlugin,
  intlayerOptimizeBabelPlugin,
  getExtractPluginOptions,
  getPurgePluginOptions,
  getMinifyPluginOptions,
  getOptimizePluginOptions,
} = require("@intlayer/babel");

module.exports = {
  plugins: [
    // Extract: compila file .content.ts → .intlayer/**/*.json
    [intlayerExtractBabelPlugin, getExtractPluginOptions()],

    // Purge: rimuove i campi inutilizzati da .intlayer/**/*.json
    //    (legge il flag build.purge da intlayer.config.ts)
    [intlayerPurgeBabelPlugin, getPurgePluginOptions()],

    // Minify: rinomina chiavi di campo nel JSON + codice sorgente
    //    (legge il flag build.minify da intlayer.config.ts)
    [intlayerMinifyBabelPlugin, getMinifyPluginOptions()],

    // Optimize: riscrive useIntlayer('key') → useDictionary(hash)
    //    Deve essere messo per ultimo perché elimina la chiave del dizionario.
    [intlayerOptimizeBabelPlugin, getOptimizePluginOptions()],
  ],
};
```

 </Tab>
</Tabs>

## Configurazione

Puoi controllare come Intlayer ottimizza il tuo bundle tramite la proprietà `build` in `intlayer.config.ts`.

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.ITALIAN],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    importMode: "dynamic",
  },
  build: {
    // Sostituisce le chiamate useIntlayer() con import diretti al dizionario a tempo di compilazione.
    // undefined = automatico (abilitato in produzione), true = sempre, false = mai.
    optimize: undefined,

    // Rinomina chiavi dei campi di contenuto nei dizionari compilati con alias alfabetici corti
    // (es. title → a). Riduce la dimensione del JSON; richiede optimize.
    minify: true,

    // Rimuove campi di contenuto mai accessibili staticamente nel codice sorgente.
    // Richiede optimize.
    purge: true,
  },
};

export default config;
```

> Mantenere il valore predefinito (`undefined`) per `optimize` è consigliato nella maggior parte dei casi.

> Consulta il riferimento per la configurazione per tutte le opzioni: [Configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md)

### Opzioni di Build

| Proprietà      | Tipo                   | Default     | Descrizione                                                                                                                                                                                                  |
| :------------- | :--------------------- | :---------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`optimize`** | `boolean \| undefined` | `undefined` | Abilita il passaggio di riscrittura degli import. `undefined` = attivo solo nelle build di produzione. `false` disabilita anche purge e minify.                                                              |
| **`minify`**   | `boolean`              | `false`     | Rinomina chiavi dei campi di contenuto nei file JSON compilati usando brevi alias alfabetici. Riscrive anche gli accessi a tali proprietà nel codice sorgente. Non ha alcun effetto se `optimize` è `false`. |
| **`purge`**    | `boolean`              | `false`     | Rimuove i campi di contenuto a cui non si accede mai in modo statico dal codice sorgente all'interno dei file JSON. Non ha alcun effetto se `optimize` è `false`.                                            |

### Minificazione (ridenominazione chiave dei campi)

`build.minify` **non** si occupa di minificare il tuo bundle JavaScript — quello viene gestito dal tuo bundler. Rimpicciolisce invece i file JSON del dizionario compilato sostituendo ciascuna chiave definita dall'utente con un breve alias alfabetico:

```
// Prima della minificazione
{ "title": "Ciao", "subtitle": "Mondo" }

// Dopo la minificazione
{ "a": "Ciao", "b": "Mondo" }
```

La medesima modifica viene apportata agli accessi di tali proprietà all'interno del codice sorgente, così che `content.title` diventi `content.a` nell'output compilato. Il comportamento in esecuzione rimane identico.

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    minify: true,
  },
};

export default config;
```

> La minificazione viene saltata quando `optimize` è `false` o quando `editor.enabled` è `true` (l'editor visuale richiede il nome completo della proprietà per consentire la modifica).

> La minificazione viene ignorata anche per i dizionari caricati tramite `importMode: 'fetch'` perché i loro JSON vengono serviti tramite API remote usando le chiavi dei campi originali; rinominarle rovinerebbe il contratto tra client e server.

### Purging (rimozione dei campi non usati)

`build.purge` analizza a quali campi di contenuto accedi effettivamente nel tuo codice sorgente, provvedendo a rimuovere il resto dai file JSON.

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    purge: true,
  },
};

export default config;
```

**Esempio:** un dizionario di cinque campi dal quale vengono adoperati solamente due:

```
// Prima di purge
{ "title": "…", "subtitle": "…", "cta": "…", "footer": "…", "badge": "…" }

// Dopo aver effettuato purge (solamente accessi di title e subtitle presenti)
{ "title": "…", "subtitle": "…" }
```

> Il purge viene saltato se `optimize` è `false` o quando `editor.enabled` è `true`.

> Il purge viene saltato per precauzione qualora un file non riesca a essere analizzato, oppure se l'oggetto `useIntlayer` viene riversato in altri valori usando parametri dinamici non analizzabili (come distruggere parti non strutturate, assegnazioni generiche ai props ecc.). In questi scenari viene conservato l'intero dizionario.

### Modalità di Importazione

Per grandi applicazioni in grado di coprire parecchie pagine e localizzazioni diverse, il peso imposto dal JSON costituisce una quota vitale per il bundle complessivo. Intlayer consente un controllo specifico di come importare i dizionari grazie a `importMode`.

### Configurazione Globale

Si può stabilire il valore predefinito agendo in `intlayer.config.ts`.

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  dictionary: {
    importMode: "dynamic", // Di default preimpostato come 'static'
  },
};

export default config;
```

### Definizione Per Dizionario

Resta pur sempre valida la sovrascrittura di questo comportamento per ogni singolo file come nel caso descritto dalle estensioni `.content.{{ts|tsx|js|jsx|mjs|cjs|json|jsonc|json5|md|mdx|yaml|yml}}`.

```ts
import { type Dictionary, t } from "intlayer";

const appContent: Dictionary = {
  key: "app",
  importMode: "dynamic", // Ridefinisce in che modo caricare i contenuti in locale
  content: {
    // ...
  },
};

export default appContent;
```

| Proprietà        | Tipo                               | Valore base | Descrizione                                                                                                           |
| :--------------- | :--------------------------------- | :---------- | :-------------------------------------------------------------------------------------------------------------------- |
| **`importMode`** | `'static'`, `'dynamic'`, `'fetch'` | `'static'`  | **Deprecato**: Usa `dictionary.importMode` al suo posto. Controlla e stabilisce le dinamiche di importazione di rete. |

Il valore `importMode` gestisce i flussi in cui iniettare il componente. Lo definisci globalmente in `intlayer.config.ts` o individualmente per `.content.ts`.

### 1. Modalità Statica (`default`)

Utilizzando la modalità statica, Intlayer trasforma e sostituisce le `useIntlayer` in `useDictionary` rendendo effettivo l'inserimento integrato di ciascun dato nell'applicativo di base in JavaScript.

- **Vantaggi:** Render immediato, con la completa assenza di caricamenti di rete durante la prima inizializzazione.
- **Svantaggi:** Tutto l'ammontare linguistico e strutturale relativo alla mole del componente per **ciascuna** lingua.
- **Caso d'Uso Migliore:** Architetture come SPA o pagine singole dalle scarse necessità restrittive in materia.

**Codice Esemplificativo Trasformato:**

```tsx
// Il tuo codice d'origine
const content = useIntlayer("my-key");

// Trasformazione Statica (Illustrativa)
const content = useDictionary({
  key: "my-key",
  content: {
    nodeType: "translation",
    translation: {
      en: "My title",
      it: "Il mio titolo",
    },
  },
});
```

### 2. Modalità Dinamica

Impiegando lo status di modulo dinamico, subentra l'interazione rimpiazzando `useIntlayer` attraverso un comportamento asservito a `useDictionaryAsync`. È impiegata la parola chiave `import()` a lazy-load.

- **Vantaggi:** **Tree-shaking ad alte prestazioni limitate a specifici stati linguistici locali.** Si eviterà uno spreco impattante di megabyte impedendo al file italiano di presentarsi ad utenti che godono di preferenze in lingua inglese.
- **Svantaggi:** Raggiunge richieste asincrone idonee a innescare il ritardo derivante dal prelievo remoto durante l'hydratation.
- **Miglior utilizzo:** Testi complessi o corpose quantità di termini multilingua voluminosi da mantenere compattati o da delegare in caso di necessita di download parziale o differito.

**Codice Trasformato Dinamico:**

```tsx
// Tuo codice
const content = useIntlayer("my-key");

// Rappresentazione in Dinamica di quanto in esecuzione
const content = useDictionaryAsync({
  en: () =>
    import(".intlayer/dynamic_dictionary/my-key/en.json").then(
      (mod) => mod.default
    ),
  it: () =>
    import(".intlayer/dynamic_dictionary/my-key/it.json").then(
      (mod) => mod.default
    ),
});
```

> Applicando l'uso in `importMode: 'dynamic'`, non frammentare a vuoto con costanza ma procedi aggregando un insieme in pochi file `.content` dedicati, cosicché ad impiego congiunto si limitino e si aggreghino prelievi limitrofi ad unica natura. Intlayer fondono se aventi pari identità o parametri limitrofi per le chiavi impiegate con regolarità per medesime identità.

### 3. Modalità Fetch

Svolge iter analogo ed affine per conformità di intenti, mirando piuttosto all'ottenimento delle medesime procedure avvalendosi delle chiamate API da Intlayer Live Sync. Per far risaltare flussi tempestivi dinamici su ambienti reattivi con riciclo d'informazioni in live updates e di ripiego sulla tipologia dinamic.

**Esempio in Fetch:**

```tsx
// Il tuo codice
const content = useIntlayer("my-key");

// Ottimizzato secondo l'uso di base fetch
const content = useDictionaryAsync({
  en: () =>
    fetch("https://intlayer.my-domain.com/dictionary/my-key/en").then((res) =>
      res.json()
    ),
  it: () =>
    fetch("https://intlayer.my-domain.com/dictionary/my-key/it").then((res) =>
      res.json()
    ),
});
```

> Ulteriori verifiche presso il riferimento ai supporti per la documentazione CMS: [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_CMS.md)

> Nella struttura fetch le ottimizzazioni relative a minify o purge passano sempre inosservate al fine di favorire la corrispondenza lato server in nome delle relative comunicazioni.

## Sommario: Statica vs Dinamica

| Parametro                   | Modalità Statica                             | Modalità Dinamica                                |
| :-------------------------- | :------------------------------------------- | :----------------------------------------------- |
| **Peso Bundle JS**          | Cospicuo (racchiude l'ammontare totale comp) | Minimizzato a favore delle sole logiche del base |
| **Inizializzazione Veloce** | Sostanzialmente subitanea                    | Intervallato (Necessita download preventivo)     |
| **Chiamate Rete**           | 0 di contorno prelevanti                     | 1 in base all'identità prescritta o richiesta    |
| **Uso Tree-Shaking**        | Esteso alla natura dei componenti            | Ad uso interamente localizzato a scopo           |
| **Campi Preferenziali**     | Dettagli di UI, Modelli basici               | Masse contenutistiche, Voluminose presenze testi |
