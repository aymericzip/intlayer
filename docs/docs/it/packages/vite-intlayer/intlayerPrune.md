---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Documentazione del plugin Vite intlayerPrune | vite-intlayer
description: Scopri come utilizzare il plugin intlayerPrune per il pacchetto vite-intlayer
keywords:
  - intlayerPrune
  - vite
  - plugin
  - tree-shaking
  - Intlayer
  - intlayer
  - Internazionalizzazione
  - Documentazione
slugs:
  - doc
  - packages
  - vite-intlayer
  - intlayerPrune
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: "Documentazione iniziale"
author: aymericzip
---

# Documentazione del plugin Vite intlayerPrune

Il plugin Vite `intlayerPrune` viene utilizzato per eseguire tree-shaking ed eliminare i dizionari non utilizzati dal bundle della tua applicazione. Questo aiuta a ridurre la dimensione finale del bundle includendo solo i contenuti multilingua necessari.

> Il plugin è già incluso e configurato automaticamente quando utilizzi [`intlayer()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/vite-intlayer/intlayer.md). Devi registrarlo manualmente solo se stai componendo lo stack di plugin da solo.

## Utilizzo

### As part of `intlayer()` (recommended)

Abilita il pruning tramite la configurazione di Intlayer e il plugin principale gestisce tutto:

```ts
// intlayer.config.ts
import { defineConfig } from "intlayer";

export default defineConfig({
  build: {
    optimize: true, // abilita sia prune che minify
  },
});
```

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer()],
});
```

### Standalone

Se stai componendo lo stack di plugin manualmente, `intlayerPrune` e `intlayerMinify` condividono un oggetto `PruneContext` che deve essere creato una sola volta e passato a entrambi:

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayerPrune, intlayerMinify } from "vite-intlayer";
import { createPruneContext } from "@intlayer/babel";
import { getConfiguration } from "@intlayer/config/node";

const intlayerConfig = getConfiguration();
const pruneContext = createPruneContext();

export default defineConfig({
  plugins: [
    intlayerPrune(intlayerConfig, pruneContext),
    intlayerMinify(intlayerConfig, pruneContext), // opzionale, legge dallo stesso contesto
  ],
});
```

## Come funziona

### 1. Analisi dell'utilizzo (buildStart)

Durante `buildStart`, il plugin `intlayerOptimize` (anche parte di `intlayer()`) scansiona ogni file sorgente del componente elencato in `build.filesList`. Per ogni chiamata `useIntlayer('key')` o `getIntlayer('key')`, registra esattamente quali campi sono accessibili, ad es.:

```ts
const { title, description } = useIntlayer("myDict");
// registra: myDict → { title, description }
```

Questo costruisce `pruneContext.fieldUsageMap` prima che vengano eseguite le chiamate `transform`.

### 2. JSON pruning (transform, enforce: 'pre')

When Vite processes a compiled dictionary JSON file, `intlayerPrune` intercepts it before Vite's built-in JSON → ESM conversion. It reads the field-usage map from `pruneContext` and removes any content field that is not in the recorded usage set.

Two content shapes are supported:

- **Static dictionaries** — `{ nodeType: "translation", translation: { en: {...}, fr: {...} } }`. Fields are pruned per-locale inside `translation`.
- **Dynamic (per-locale) dictionaries** — flat `{ fieldA: ..., fieldB: ... }`. Fields are pruned at the top level.

### 3. Edge cases

Se la struttura del contenuto di un dizionario non può essere riconosciuta (ad esempio, una forma nidificata inusuale), viene aggiunta a `pruneContext.dictionariesWithEdgeCases` e **lasciata intatta**. Un avviso viene registrato. `intlayerMinify` salta anche questi dizionari.

### 4. Field-rename map

Quando la potatura ha successo, `intlayerPrune` scrive anche `pruneContext.dictionaryKeyToFieldRenameMap` — una mappatura dai nomi di campo originali agli alias brevi. `intlayerMinify` legge questa mappa per rinominare i campi nel JSON di output, e il pass di ridenominazione Babel di `intlayerOptimize` aggiorna gli accessi alle proprietà nei file sorgente di conseguenza.

## Condizioni di attivazione

`intlayerPrune` è attivo **solo** quando tutte le seguenti condizioni sono vere:

1. Il comando Vite è `build`.
2. `build.optimize` è `true` (oppure `undefined`, che di default è `true` per i build).
3. `build.purge` è `true` nella tua configurazione Intlayer.

Rimane attivo quando `editor.enabled` è `true`: l'editor visuale risolve ogni modifica tramite `dictionaryKey` + `keyPath` rispetto ai dizionari non uniti, che questo plugin non tocca mai, e un campo eliminato è un campo che nessun componente legge — quindi non viene mai renderizzato né selezionabile nella pagina.
