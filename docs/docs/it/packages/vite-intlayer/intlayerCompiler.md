---
createdAt: 2026-06-25
updatedAt: 2026-06-25
title: Documentazione del plugin Vite intlayerCompiler | vite-intlayer
description: Plugin Vite che estrae le dichiarazioni di contenuto inline di Intlayer dai file dei componenti e le scrive in file JSON di dizionario durante la fase di build/transform.
keywords:
  - intlayerCompiler
  - vite
  - plugin
  - compilatore
  - contenuto
  - dizionario
  - internazionalizzazione
  - i18n
slugs:
  - doc
  - packages
  - vite-intlayer
  - intlayerCompiler
history:
  - version: 9.0.0
    date: 2026-06-25
    changes: "Integrato in intlayer(); init doc"
author: aymericzip
---

# intlayerCompiler

`intlayerCompiler` è un plugin Vite che scansiona i file sorgente dei componenti alla ricerca di **dichiarazioni di contenuto Intlayer inline** — contenuto definito direttamente all'interno di un componente anziché in un file `.content.ts` separato — e le scrive nei file JSON del dizionario durante la fase di trasformazione.

> **A partire da Intlayer v9** `intlayerCompiler` è incluso automaticamente all'interno del plugin principale [`intlayer()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/vite-intlayer/intlayer.md) quando sia `compiler.enabled` è `true` sia `compiler.output` è impostato nella configurazione Intlayer. È necessario registrarlo separatamente solo se si desidera il controllo completo sulla configurazione specifica del compilatore.

## Utilizzo

### Come parte di `intlayer()` (consigliato, v9+)

Abilita il compilatore tramite la configurazione di Intlayer:

```ts
// intlayer.config.ts
import { defineConfig } from "intlayer";

export default defineConfig({
  compiler: {
    enabled: true,
    output: "./src/dictionaries", // dove vengono scritti i dizionari estratti
  },
});
```

Quindi usa il plugin standard senza alcuna registrazione aggiuntiva:

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer()],
});
```

### Standalone (quando necessario)

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayerCompiler()],
});
```

## Opzioni

```ts
import type { IntlayerCompilerOptions } from "vite-intlayer";
```

| Opzione          | Tipo                      | Descrizione                                                                                                     |
| ---------------- | ------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `configOptions`  | `GetConfigurationOptions` | Sostituzioni della configurazione Intlayer inoltrate a `getConfiguration()`.                                    |
| `compilerConfig` | `Partial<CompilerConfig>` | Sostituzioni per la sezione di configurazione specifica del compilatore (es. `enabled`, `output`, `filesList`). |

### Esempio

```ts
intlayerCompiler({
  configOptions: { configFile: "./config/intlayer.config.ts" },
  compilerConfig: { enabled: true, output: "./src/dictionaries" },
});
```

## Come funziona

### Fase di trasformazione

Per ogni file sorgente che corrisponde a `compiler.filesList`, il plugin del compilatore:

1. Passa il contenuto del file attraverso `extractContent` da `@intlayer/babel`.
2. Chiama `onExtract` per ogni dichiarazione trovata, scrivendo il JSON del dizionario risultante in `compiler.output`.
3. Restituisce il codice sorgente trasformato con le dichiarazioni inline sostituite da chiamate standard `useIntlayer('key')` / `getIntlayer('key')`.

Tipi di file supportati: `.ts`, `.tsx`, `.js`, `.jsx`, `.vue`, `.svelte`, `.astro`.

### HMR (Hot Module Replacement)

Quando un file di componente viene salvato in modalità di sviluppo, il compilatore:

1. Rileva la modifica del file tramite l'hook `handleHotUpdate` di Vite.
2. Estrae nuovamente il contenuto dal file aggiornato.
3. Scrive il JSON del dizionario aggiornato.
4. Attiva un ricaricamento completo della pagina (`server.ws.send({ type: 'full-reload' })`).

Un debounce di 500 ms impedisce alla scrittura stessa del dizionario (che attiva anche un evento di modifica del file) di causare un ciclo di estrazione infinito.

### Deduplica

`intlayerCompiler` utilizza lo stesso meccanismo di deduplica `createPrimaryInstanceGuard` degli altri plugin inclusi. Quando sono presenti sia `intlayer()` (che include il compilatore) sia una chiamata manuale a `intlayerCompiler()`, viene eseguita solo la prima istanza registrata — nessun dizionario viene scritto due volte.
