---
createdAt: 2026-06-25
updatedAt: 2026-06-25
title: "Documentazione del pacchetto @intlayer/babel"
description: Plugin Babel per Intlayer per gestire l'estrazione del contenuto, l'ottimizzazione dell'importazione, l'eliminazione dei campi non utilizzati e il mascheramento dei nomi dei campi durante la build.
keywords:
  - "@intlayer/babel"
  - babel
  - plugin
  - internazionalizzazione
  - i18n
  - compilatore
  - ottimizzare
  - eliminare
  - minificare
slugs:
  - doc
  - packages
  - "@intlayer/babel"
  - export
history:
  - version: 9.0.0
    date: 2026-06-25
    changes: "Documentazione unificata di tutte le esportazioni"
author: aymericzip
---

# Pacchetto @intlayer/babel

Il pacchetto `@intlayer/babel` fornisce un set di plugin Babel specializzati per Intlayer. Questi plugin coprono l'intero ciclo di build: estrazione delle dichiarazioni di contenuto, riscrittura delle chiamate `useIntlayer` / `getIntlayer` in importazioni di dizionario ottimizzate, eliminazione dei campi non utilizzati e minificazione dei nomi dei campi.

## Installazione

```bash
npm install @intlayer/babel
```

## Esportazioni

Importazione:

```ts
import { ... } from "@intlayer/babel";
```

---

### Plugin

| Funzione / Classe              | Descrizione                                                                                                                                                                                                     |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `intlayerExtractBabelPlugin`   | Plugin Babel che estrae contenuti traducibili dai file sorgente e inserisce `useIntlayer` / `getIntlayer` hooks automaticamente. Progettato per l'uso con Next.js e strumenti di compilazione basati su Babel.  |
| `intlayerOptimizeBabelPlugin`  | Plugin Babel che trasforma le chiamate `useIntlayer` e `getIntlayer` e riscrive le loro importazioni in importazioni di dizionari JSON ottimizzati (statici, dinamici o tramite fetch).                         |
| `intlayerPurgeBabelPlugin`     | Plugin Babel che analizza i file sorgente e riscrive i file JSON del dizionario compilato per rimuovere i campi non utilizzati (`build.purge`) o rinominarli con alias brevi (`build.minify`).                  |
| `intlayerMinifyBabelPlugin`    | Plugin Babel che riscrive i file sorgente per utilizzare gli alias di campo brevi assegnati durante la fase di minificazione (ad esempio `content.title` ← `content.a`). Dipende da `intlayerPurgeBabelPlugin`. |
| `makeFieldRenameBabelPlugin`   | Funzione factory che produce un plugin Babel per rinominare gli accessi ai campi del contenuto del dizionario nei file sorgente in base alla `dictionaryKeyToFieldRenameMap` popolata nel `PruneContext`.       |
| `makeUsageAnalyzerBabelPlugin` | Funzione factory che produce un plugin Babel per analizzare l'uso di `useIntlayer` / `getIntlayer` nel codice sorgente e aggregare i dati di utilizzo del campo nel `PruneContext` condiviso.                   |
| `getSharedPruneContext`        | Funzione helper che restituisce l'oggetto `PruneContext` condiviso per la directory di base specificata, o `null` se non è stato ancora inizializzato.                                                          |

---

### Utilità di configurazione dei plugin

| Funzione                   | Descrizione                                                                                                                                            |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `getExtractPluginOptions`  | Carica la configurazione Intlayer e restituisce le `ExtractPluginOptions` pronte per l'uso con `intlayerExtractBabelPlugin`.                           |
| `getOptimizePluginOptions` | Carica la configurazione Intlayer e i dizionari compilati e restituisce le `OptimizePluginOptions` pronte per l'uso con `intlayerOptimizeBabelPlugin`. |
| `getPurgePluginOptions`    | Carica la configurazione Intlayer e restituisce le `PurgePluginOptions` pronte per l'uso con `intlayerPurgeBabelPlugin`.                               |
| `getMinifyPluginOptions`   | Carica la configurazione Intlayer e restituisce le `MinifyPluginOptions` pronte per l'uso con `intlayerMinifyBabelPlugin`.                             |

---

### Tipi

| Tipo                    | Descrizione                                                                                                                               |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `CompilerMode`          | Modalità del compilatore: `'dev'` per lo sviluppo con supporto HMR, o `'build'` per build di produzione.                                  |
| `ExtractPluginOptions`  | Opzioni per `intlayerExtractBabelPlugin`: elenco di file, configurazione, callback `onExtract`, ecc.                                      |
| `ExtractResult`         | Risultato dell'estrazione: chiave del dizionario, percorso del file, contenuto e lingua.                                                  |
| `OptimizePluginOptions` | Opzioni per `intlayerOptimizeBabelPlugin`: percorsi del dizionario, modalità di importazione, mappa delle modalità per dizionario, ecc.   |
| `PurgePluginOptions`    | Opzioni per `intlayerPurgeBabelPlugin`: directory di base, flag purge/minify/optimize, elenco di file dei componenti.                     |
| `MinifyPluginOptions`   | Opzioni per `intlayerMinifyBabelPlugin`: directory di base, flag di minify/optimize/editorEnabled.                                        |
| `PruneContext`          | Stato condiviso tra i plugin di analisi e potatura: mappe di utilizzo dei campi, mappe di ridenominazione, ecc.                           |
| `DictionaryFieldUsage`  | Risultato dell'utilizzo dei campi per un singolo dizionario: `Set<string>` o `'all'` quando l'analisi statica non è conclusiva.           |
| `NestedRenameEntry`     | Nodo nell'albero di ridenominazione: il `shortName` e la mappa dei figli.                                                                 |
| `NestedRenameMap`       | Un livello nell'albero di ridenominazione: `Map<string, NestedRenameEntry>`.                                                              |
| `CompatCallerConfig`    | Configurazione per un analizzatore di utilizzo compatibile per i pacchetti compat-adapter (nome del chiamante e opzioni di elaborazione). |
| `ScriptBlock`           | Bloco de script estratto da un file SFC (Vue o Svelte): contenuto, offset iniziale e offset finale.                                       |

---

### Funzioni di utilità

| Funzione                          | Descrizione                                                                                                                                                                          |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `generateShortFieldName`          | Converte un intero (a partire da zero) in un identificatore alfabetico breve: `0` → `'a'`, `25` → `'z'`, `26` → `'aa'`, ecc.                                                         |
| `buildNestedRenameMapFromContent` | Costruisce ricorsivamente una `NestedRenameMap` dal valore del contenuto di un dizionario compilato, rispettando le strutture dei nodi di Intlayer (translation, enumeration, ecc.). |
| `createPruneContext`              | Crea un nuovo oggetto `PruneContext` vuoto inizializzato con i valori predefiniti.                                                                                                   |
| `extractScriptBlocks`             | Estrae blocchi `<script>` dai file SFC (Vue / Svelte) per la successiva analisi Babel.                                                                                               |
| `BABEL_PARSER_OPTIONS`            | Costante che rappresenta le opzioni del parser Babel che coprono i framework supportati (React/Vue/Svelte/Angular/...).                                                              |
| `INTLAYER_CALLER_NAMES`           | Elenco costante dei nomi di chiamata originali di Intlayer: `['useIntlayer', 'getIntlayer']`.                                                                                        |

---

## Esempio di utilizzo

```js
// babel.config.js
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
  presets: ["next/babel"],
  plugins: [
    [intlayerExtractBabelPlugin, getExtractPluginOptions()],
    [intlayerPurgeBabelPlugin, getPurgePluginOptions()],
    [intlayerMinifyBabelPlugin, getMinifyPluginOptions()],
    [intlayerOptimizeBabelPlugin, getOptimizePluginOptions()],
  ],
};
```

> **Nota:** Il plugin `intlayerPurgeBabelPlugin` deve essere dichiarato **prima** del `intlayerMinifyBabelPlugin`, poiché quest'ultimo legge la mappa di ridenominazione creata dal primo. Inoltre, entrambi devono essere preceduti da `intlayerOptimizeBabelPlugin` in modo che possa vedere le chiavi del dizionario prima che le chiamate a `useIntlayer` vengano riscritte.
