---
createdAt: 2025-11-25
updatedAt: 2025-11-25
title: Ottimizzazione della Dimensione e delle Prestazioni del Bundle i18n
description: Riduci la dimensione del bundle dell'applicazione ottimizzando i contenuti di internazionalizzazione (i18n). Scopri come sfruttare il tree shaking e il lazy loading per i dizionari con Intlayer.
keywords:
  - Ottimizzazione del Bundle
  - Automazione dei Contenuti
  - Contenuti Dinamici
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - bundle-optimization
history:
  - version: 6.0.0
    date: 2025-11-25
    changes: Inizializzazione della cronologia
---

# Ottimizzazione della Dimensione e delle Prestazioni del Bundle i18n

Una delle sfide più comuni con le soluzioni i18n tradizionali basate su file JSON è la gestione della dimensione dei contenuti. Se gli sviluppatori non separano manualmente i contenuti in namespace, gli utenti spesso finiscono per scaricare le traduzioni di ogni pagina e potenzialmente di ogni lingua solo per visualizzare una singola pagina.

Ad esempio, un'applicazione con 10 pagine tradotte in 10 lingue potrebbe far sì che un utente scarichi il contenuto di 100 pagine, anche se ha bisogno solo di **una** (la pagina corrente nella lingua corrente). Questo comporta uno spreco di banda e tempi di caricamento più lenti.

> Per rilevarlo, puoi utilizzare un bundle analyzer come `rollup-plugin-visualizer` (vite), `@next/bundle-analyzer` (next.js) o `webpack-bundle-analyzer` (React CRA / Angular / ecc).

**Intlayer risolve questo problema attraverso l'ottimizzazione in fase di build.** Analizza il tuo codice per rilevare quali dizionari sono effettivamente utilizzati per ogni componente e reinserisce solo il contenuto necessario nel tuo bundle.

## Indice

<TOC />

## Come Funziona

Intlayer utilizza un **approccio per componente**. A differenza dei file JSON globali, il tuo contenuto è definito accanto o all'interno dei tuoi componenti. Durante il processo di build, Intlayer:

1.  **Analizza** il tuo codice per trovare le chiamate a `useIntlayer`.
2.  **Costruisce** il contenuto del dizionario corrispondente.
3.  **Sostituisce** la chiamata a `useIntlayer` con codice ottimizzato basato sulla tua configurazione.

Questo garantisce che:

- Se un componente non è importato, il suo contenuto non viene incluso nel bundle (Eliminazione del codice morto).
- Se un componente è caricato in modo lazy, anche il suo contenuto viene caricato in modo lazy.

## Configurazione per Piattaforma

### Next.js

Next.js richiede il plugin `@intlayer/swc` per gestire la trasformazione, poiché Next.js utilizza SWC per le build.

> Questo plugin è installato di default perché i plugin SWC sono ancora sperimentali per Next.js. Potrebbe cambiare in futuro.

### Vite

Vite utilizza il plugin `@intlayer/babel` che è incluso come dipendenza di `vite-intlayer`. L'ottimizzazione è abilitata di default.

### Webpack

Per abilitare l'ottimizzazione del bundle con Intlayer su Webpack, è necessario installare e configurare il plugin Babel (`@intlayer/babel`) o SWC (`@intlayer/swc`) appropriato.

### Expo / Lynx

L'ottimizzazione del bundle **non è ancora disponibile** per questa piattaforma. Il supporto sarà aggiunto in una futura release.

## Configurazione

Puoi controllare come Intlayer ottimizza il tuo bundle tramite la proprietà `build` nel tuo file `intlayer.config.ts`.

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
  build: {
    optimize: true,
    importMode: "static", // oppure 'dynamic'
    traversePattern: ["**/*.{js,ts,mjs,cjs,jsx,tsx}", "!**/node_modules/**"],
  },
};

export default config;
```

> È consigliato mantenere l'opzione di default per `optimize` nella maggior parte dei casi.

> Consulta la documentazione per maggiori dettagli: [Configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md)

### Opzioni di Build

Le seguenti opzioni sono disponibili sotto l'oggetto di configurazione `build`:

| Proprietà             | Tipo                                      | Predefinito                     | Descrizione                                                                                                                                                                                                                        |
| :-------------------- | :---------------------------------------- | :------------------------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`optimize`**        | `boolean`                                 | `undefined`                     | Controlla se l'ottimizzazione della build è abilitata. Se `true`, Intlayer sostituisce le chiamate al dizionario con inject ottimizzati. Se `false`, l'ottimizzazione è disabilitata. Idealmente impostato a `true` in produzione. |
| **`importMode`**      | `'static' &#124; 'dynamic' &#124; 'live'` | `'static'`                      | Determina come vengono caricati i dizionari (vedi dettagli sotto).                                                                                                                                                                 |
| **`traversePattern`** | `string[]`                                | `['**/*.{js,ts,jsx,tsx}', ...]` | Pattern glob che definiscono quali file Intlayer deve scansionare per l'ottimizzazione. Usalo per escludere file non correlati e velocizzare le build.                                                                             |
| **`outputFormat`**    | `'esm' &#124; 'cjs'`                      | `'esm'`                         | Controlla il formato di output dei dizionari costruiti.                                                                                                                                                                            |

## Modalità di Importazione

L'impostazione `importMode` determina come il contenuto del dizionario viene iniettato nel tuo componente.

### 1. Modalità Statica (`default`)

In modalità statica, Intlayer sostituisce `useIntlayer` con `useDictionary` e inietta il dizionario direttamente nel bundle JavaScript.

- **Vantaggi:** Rendering istantaneo (sincrono), nessuna richiesta di rete aggiuntiva durante l'hydration.
- **Svantaggi:** Il bundle include le traduzioni per **tutte** le lingue disponibili per quel componente specifico.
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
      fr: "Mon titre",
    },
  },
});
```

### 2. Modalità Dinamica

In modalità dinamica, Intlayer sostituisce `useIntlayer` con `useDictionaryAsync`. Questo utilizza `import()` (meccanismo simile a Suspense) per caricare pigramente specificamente il JSON per la locale corrente.

- **Vantaggi:** **Tree shaking a livello di locale.** Un utente che visualizza la versione inglese scaricherà _solo_ il dizionario inglese. Il dizionario francese non viene mai caricato.
- **Svantaggi:** Genera una richiesta di rete (fetch dell'asset) per ogni componente durante l'hydration.
- **Ideale per:** Blocchi di testo grandi, articoli o applicazioni che supportano molte lingue dove la dimensione del bundle è critica.

**Esempio di codice trasformato:**

```tsx
// Il tuo codice
const content = useIntlayer("my-key");

// Codice ottimizzato (Dinamico)
const content = useDictionaryAsync({
  en: () =>
    import(".intlayer/dynamic_dictionary/en.json").then((mod) => mod.default),
  fr: () =>
    import(".intlayer/dynamic_dictionary/fr.json").then((mod) => mod.default),
});
```

> Quando si utilizza `importMode: 'dynamic'`, se si hanno 100 componenti che usano `useIntlayer` in una singola pagina, il browser tenterà 100 richieste separate. Per evitare questa "cascata" di richieste, raggruppare il contenuto in meno file `.content` (ad esempio, un dizionario per sezione della pagina) invece di uno per ogni componente atomico.

> Attualmente, `importMode: 'dynamic'` non è completamente supportato per Vue e Svelte. Si consiglia di utilizzare `importMode: 'static'` per questi framework fino a futuri aggiornamenti.

### 3. Modalità Live

Si comporta in modo simile alla modalità Dynamic ma tenta prima di recuperare i dizionari dall'API Intlayer Live Sync. Se la chiamata API fallisce o il contenuto non è contrassegnato per aggiornamenti live, si ricade sull'importazione dinamica.

> Consulta la documentazione CMS per maggiori dettagli: [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_CMS.md)

## Riepilogo: Static vs Dynamic

| Caratteristica           | Modalità Static                                        | Modalità Dynamic                              |
| :----------------------- | :----------------------------------------------------- | :-------------------------------------------- |
| **Dimensione Bundle JS** | Più grande (include tutte le lingue per il componente) | Più piccolo (solo codice, nessun contenuto)   |
| **Caricamento Iniziale** | Istantaneo (Il contenuto è nel bundle)                 | Leggero ritardo (Recupera JSON)               |
| **Richieste di Rete**    | 0 richieste aggiuntive                                 | 1 richiesta per dizionario                    |
| **Tree Shaking**         | A livello di componente                                | A livello di componente + a livello di lingua |
| **Caso d'Uso Migliore**  | Componenti UI, Piccole App                             | Pagine con molto testo, Molte lingue          |
