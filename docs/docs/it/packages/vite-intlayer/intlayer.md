---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Documentazione del plugin Vite intlayer | vite-intlayer
description: Scopri come utilizzare il plugin intlayer per il pacchetto vite-intlayer
keywords:
  - intlayer
  - vite
  - plugin
  - Intlayer
  - intlayer
  - Internazionalizzazione
  - Documentazione
slugs:
  - doc
  - packages
  - vite-intlayer
  - intlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: "Inizializzazione della documentazione"
author: aymericzip
---

# Documentazione del plugin Vite intlayer

Il plugin Vite `intlayer` integra la configurazione di Intlayer nel processo di build. Gestisce gli alias dei dizionari, avvia il watcher dei dizionari in modalità sviluppo e prepara i dizionari per la build.

## Utilizzo

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

ts;
export default defineConfig({
  plugins: [intlayer()],
});
```

## Opzioni

```ts
import type { IntlayerPluginOptions } from "vite-intlayer";
```

`IntlayerPluginOptions` estende `GetConfigurationOptions` (vedi `@intlayer/config`) con i seguenti campi aggiuntivi:

| Opzione         | Tipo                            | Default     | Descrizione                                                                                                                                                       |
| --------------- | ------------------------------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `compatCallers` | `CompatCallerConfig[]`          | `[]`        | Pattern di caller aggiuntivi per i package compat-adapter (es. `@intlayer/react-i18next`). Passati all'analizzatore di utilizzo dei campi al momento della build. |
| `proxy`         | `{ ignore?: (req) => boolean }` | `undefined` | Opzioni inoltrate al proxy di locale-routing incluso. Usa `ignore` per escludere percorsi specifici (es. rotte API) dal locale routing.                           |

Tutte le altre opzioni (`override`, `configFile`, …) sono inoltrate direttamente a `getConfiguration()`.

### Esempi

#### Ignora le rotte API dal routing locale

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
  ],
});
```

#### Con un percorso file di configurazione personalizzato

```ts
export default defineConfig({
  plugins: [
    intlayer({
      configFile: "./config/intlayer.config.ts",
    }),
  ],
});
```

#### Con caller compat-adapter

```ts
import { intlayer } from "vite-intlayer";
import { reactI18nextCallerConfig } from "@intlayer/react-i18next/plugin";

export default defineConfig({
  plugins: [
    intlayer({
      compatCallers: [reactI18nextCallerConfig],
    }),
  ],
});
```

## Cosa fa il plugin

### 1. Preparazione del dizionario

Prima che il build inizi (e una volta all'ora in dev), `intlayer` chiama `prepareIntlayer` per compilare tutti i file `.content.ts` in dizionari JSON ottimizzati memorizzati in `.intlayer/`.

### 2. Alias di moduli

Il plugin aggiunge alias di risoluzione Vite in modo che `import { myDict } from 'intlayer/dictionaries/my-dict'` si risolva nel file JSON compilato su disco. Le build SSR utilizzano `ssr.noExternal` per assicurare che tutti i pacchetti `@intlayer/*` siano raggruppati con gli alias applicati.

### 3. Dev-server watcher

In development mode a `chokidar` watcher is started. When a `.content.ts` file changes the dictionaries are recompiled and Vite's HMR propagates the update to the browser.

### 4. Proxy di routing delle locale bundled (v9+)

Da Intlayer v9 il middleware `intlayerProxy` viene registrato automaticamente all'interno di `intlayer()`. Gestisce:

- Rilevamento della locale dal prefisso URL, dai cookie e dall'header `Accept-Language`.
- Reindirizzamenti 301 quando la locale rilevata non corrisponde all'URL corrente.
- Riscritture URL interne in modo che il framework veda il corretto parametro di route `[locale]`.

Il proxy è controllato da `routing.enableProxy` (valore predefinito `true`) nella tua configurazione Intlayer. Per disabilitarlo completamente:

```ts
// intlayer.config.ts
import { defineConfig } from "intlayer";

export default defineConfig({
  routing: { enableProxy: false },
});
```

Per personalizzare il comportamento del proxy senza una chiamata `intlayerProxy()` separata, passa le opzioni `proxy` al plugin principale:

```ts
intlayer({ proxy: { ignore: (req) => req.url?.startsWith("/api") } });
```

Consulta la [documentazione intlayerProxy](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/vite-intlayer/intlayerProxy.md) per il riferimento completo del comportamento di routing.

### 5. Compiler integrato (v9+)

Quando `compiler.enabled` è `true` **e** `compiler.output` è impostato nella configurazione di Intlayer, `intlayer()` registra `intlayerCompiler` automaticamente. Il compiler estrae le dichiarazioni di contenuto inline scritte direttamente nei file dei componenti e le scrive nei dizionari durante la trasformazione. Vedi la [documentazione di intlayerCompiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/vite-intlayer/intlayerCompiler.md).

### 6. Ottimizzazioni della build

Durante una build di produzione il plugin aggiunge:

- **intlayerOptimize** – trasformazione Babel che riscrive `useIntlayer('key')` → `useDictionary(hash)` e inietta importazioni JSON dirette.
- **intlayerPrune** – rimuove i campi di contenuto inutilizzati dal JSON del dizionario.
- **intlayerMinify** – compatta il JSON del dizionario e facoltativamente offusca i nomi dei campi.

Questi sono inattivi in modalità di sviluppo.

## Alias deprecati

| Esportazione deprecata | Sostituzione |
| ---------------------- | ------------ |
| `intlayerPlugin`       | `intlayer`   |
| `intLayerPlugin`       | `intlayer`   |
