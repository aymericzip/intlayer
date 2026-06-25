---
createdAt: 2026-06-25
updatedAt: 2026-06-25
title: Documentazione del plugin Vite intlayerMinify | vite-intlayer
description: Plugin Vite che minifica i file JSON del dizionario Intlayer compilati e opzionalmente maschera i nomi dei campi di contenuto per ridurre la dimensione del bundle.
keywords:
  - intlayerMinify
  - vite
  - plugin
  - minify
  - bundle size
  - dizionario
  - internazionalizzazione
  - i18n
slugs:
  - doc
  - packages
  - vite-intlayer
  - intlayerMinify
history:
  - version: 9.0.0
    date: 2026-06-25
    changes: "Init doc"
author: aymericzip
---

# intlayerMinify

`intlayerMinify` è un plugin Vite che minifica i file JSON del dizionario compilato durante una build di produzione. Rimuove tutti gli spazi vuoti non necessari e, se combinato con `intlayerPrune`, rinomina opzionalmente i nomi dei campi di contenuto con brevi alias alfabetici (`a`, `b`, `c`, …) per ridurre ulteriormente la dimensione del bundle.

> Il plugin è già incluso e configurato automaticamente quando usi [`intlayer()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/vite-intlayer/intlayer.md). Devi solo registrarlo manualmente se stai componendo lo stack di plugin da solo.

## Utilizzo

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayerMinify, intlayerPrune } from "vite-intlayer";
import { createPruneContext } from "@intlayer/babel";

const pruneContext = createPruneContext();

export default defineConfig({
  plugins: [
    intlayerPrune(intlayerConfig, pruneContext),
    intlayerMinify(intlayerConfig, pruneContext),
  ],
});
```

## Condizioni di attivazione

`intlayerMinify` è attivo **solo** quando sono soddisfatte tutte e tre le seguenti condizioni:

1. Il comando Vite è `build` (non `serve` / dev).
2. `build.optimize` è `true` (o `undefined`, che per impostazione predefinita è `true` per le build).
3. `build.minify` è `true` nella tua configurazione Intlayer.

Viene automaticamente **disattivato** quando `editor.enabled` è `true` perché l'editor ha bisogno del contenuto del dizionario completo e leggibile dall'uomo.

## Cosa viene minificato

Il plugin prende di mira due posizioni del dizionario (come risolto da `intlayer.system`):

- `dictionariesDir` — dizionari statici per tutte le lingue (es. `.intlayer/dictionaries/*.json`)
- `dynamicDictionariesDir` — dizionari dinamici per lingua

> I dizionari in modalità fetch (`fetchDictionariesDir`) non vengono **mai** minificati perché sono serviti da un'API remota a runtime utilizzando i loro nomi di campo originali. La ridenominazione dei campi creerebbe una mancata corrispondenza tra la risposta del server e gli accessi alle proprietà lato client.

## Mascheramento dei nomi dei campi (minificazione delle proprietà)

Quando `intlayerPrune` ha analizzato la codebase e popolato `pruneContext.dictionaryKeyToFieldRenameMap`, `intlayerMinify` rinomina anche i nomi dei campi di contenuto in brevi alias. Ad esempio:

```json
// prima
{ "key": "myDict", "content": { "title": "Hello", "description": "World" } }

// dopo (con mascheramento)
{ "key": "myDict", "content": { "a": "Hello", "b": "World" } }
```

I corrispondenti accessi alle proprietà del file sorgente vengono rinominati dal passaggio Babel all'interno di `intlayerOptimize`, in modo che il comportamento a runtime rimanga invariato.

I campi interni di Intlayer (`nodeType`, `translation`, ecc.) non vengono mai rinominati.

## Dizionari di casi limite (Edge-cases)

I dizionari contrassegnati in `pruneContext.dictionariesWithEdgeCases` (anomalie strutturali rilevate durante la fase di prune) vengono saltati completamente — né minificati né mascherati — per evitare di distribuire dati danneggiati.

## Gruppi qualificati (collezioni / varianti / record meta)

Per i dizionari con un array `qualifierTypes` (collezioni, varianti e record meta), il plugin preserva letteralmente l'array `qualifierTypes` e la mappa laterale `meta`. Solo per le voci di `content` viene eseguito il mascheramento dei nomi dei campi. Le chiavi composite (utilizzate per la corrispondenza dei selettori a runtime) non vengono mai toccate.
