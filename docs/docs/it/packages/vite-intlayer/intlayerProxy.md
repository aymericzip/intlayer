---
createdAt: 2026-06-25
updatedAt: 2026-06-25
title: Documentazione del plugin Vite intlayerProxy | vite-intlayer
description: Middleware di routing locale per server dev/preview di Vite e SSR in produzione. Gestisce il rilevamento della lingua, i reindirizzamenti URL e le riscritture interne.
keywords:
  - intlayerProxy
  - vite
  - plugin
  - middleware
  - lingua
  - routing
  - internazionalizzazione
  - i18n
  - SSR
slugs:
  - doc
  - packages
  - vite-intlayer
  - intlayerProxy
history:
  - version: 9.0.0
    date: 2026-06-25
    changes: "Fusi configOptions in un unico oggetto opzioni; proxy incluso in intlayer()"
author: aymericzip
---

# intlayerProxy

`intlayerProxy` è un plugin Vite che registra un middleware di routing locale per **ogni ambiente**: server di sviluppo, server di anteprima e SSR in produzione (Nitro / TanStack Start).

> **A partire da Intlayer v9** `intlayerProxy` è incluso automaticamente all'interno del plugin principale [`intlayer()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/vite-intlayer/intlayer.md) ed abilitato per impostazione predefinita tramite `routing.enableProxy: true`. È necessario registrarlo separatamente solo se si ha bisogno di un controllo di livello inferiore o se lo si utilizza al di fuori della configurazione standard di `intlayer()`.

## Utilizzo

### Come parte di `intlayer()` (consigliato, v9+)

Passa le opzioni `proxy` al plugin principale invece di registrare `intlayerProxy` separatamente:

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

### Standalone (quando necessario)

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer()],
});
```

## Opzioni

```ts
import type { IntlayerProxyPluginOptions } from "vite-intlayer";
```

Tutte le opzioni sono facoltative e passate come un singolo oggetto:

| Opzione         | Tipo                                | Descrizione                                                                                                                                                                                |
| --------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `ignore`        | `(req: IncomingMessage) => boolean` | Predicato che esclude le richieste dal routing locale. Restituisci `true` per saltare una richiesta (es. rotte API, controlli di integrità).                                               |
| `configOptions` | `GetConfigurationOptions`           | Sostituzioni della configurazione Intlayer inoltrate a `getConfiguration()`. Utilizzare quando si ha bisogno che il proxy legga uno specifico file di configurazione o sovrascriva valori. |

### Esempio

```ts
intlayerProxy({
  ignore: (req) => req.url?.startsWith("/api"),
  configOptions: { configFile: "./config/intlayer.config.ts" },
});
```

## createIntlayerProxyHandler

`createIntlayerProxyHandler` crea un middleware Node.js `(req, res, next)` autonomo e indipendente dal framework che contiene tutta la logica di routing locale. È utile in ambienti in cui l'API del plugin Vite non è disponibile (es. un server Node.js semplice o un modulo Nitro personalizzato).

```ts
import { createIntlayerProxyHandler } from "vite-intlayer";

const handler = createIntlayerProxyHandler({
  ignore: (req) => req.url?.startsWith("/api"),
  configOptions: { configFile: "./config/intlayer.config.ts" },
});

// Express / Connect
app.use(handler);
```

### SSR in produzione (TanStack Start / Nitro via h3)

```ts
// server/middleware/intlayerProxy.ts
import { fromNodeMiddleware } from "h3";
import { createIntlayerProxyHandler } from "vite-intlayer";

export default fromNodeMiddleware(
  createIntlayerProxyHandler({
    ignore: (req) => req.url?.startsWith("/api"),
  })
);
```

## Comportamento del routing

Il middleware rispecchia la logica di routing del middleware `next-intlayer` e supporta tutte le modalità di routing di Intlayer.

### Modalità di routing

| Modalità        | URL visibile nel browser | Comportamento                                                                                                                                 |
| --------------- | ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `prefix`        | `/it/about`              | Predefinito. Prefisso della lingua nell'URL. La lingua predefinita reindirizza all'URL senza prefisso a meno che non sia attivo `prefix-all`. |
| `prefix-all`    | `/en/about`, `/it/about` | Tutte le lingue — compresa quella predefinita — hanno sempre il prefisso.                                                                     |
| `no-prefix`     | `/about`                 | Nessuna lingua nell'URL. La lingua viene memorizzata solo nei cookie; le riscritture URL avvengono internamente.                              |
| `search-params` | `/about?locale=it`       | Lingua passata come parametro di query. Reindirizza per aggiungere/aggiornare il parametro `locale` quando mancante o obsoleto.               |

### Priorità di rilevamento

1. Prefisso del percorso URL (es. `/it/about` → `it`).
2. Valore del cookie / localStorage (`intlayer-locale`).
3. Intestazione `Accept-Language`.
4. `defaultLocale` dalla configurazione.

### Bypass automatico

Il middleware fa passare sempre queste richieste direttamente senza gestione della lingua:

- Richieste corrispondenti al predicato `ignore`.
- `/node_modules/**`
- `/@**` – Componenti interni di Vite (`@vite/`, `@fs/`, `@id/`, ecc.).
- `/_**` – Componenti interni del server (`__vite_ping`, `__manifest`, ecc.).
- Richieste il cui percorso termina con un'estensione di file (risorse statiche). Se è presente un prefisso della lingua sul percorso di una risorsa statica (es. `/it/logo.png`), questo viene rimosso in modo che il file possa essere servito correttamente.

### Routing del dominio

Quando `routing.domains` è configurato nella tua configurazione Intlayer, il middleware gestisce il routing di lingua interdominio:

- Una richiesta per `/zh/about` su `intlayer.org` viene reindirizzata a `https://intlayer.zh/about` quando `domains.zh = "intlayer.zh"`.
- Una richiesta a `intlayer.zh/about` viene riscritta internamente in `/zh/about` in modo che il parametro di rotta `[locale]` venga popolato.

### Protezione dal ciclo di reindirizzamento

Il middleware tiene traccia dei conteggi di reindirizzamento per coppia `originalUrl → newUrl` entro una finestra temporale mobile di 2 secondi. Più di 10 reindirizzamenti all'interno di quella finestra restituiscono una risposta `500` con un errore descrittivo anziché creare un loop infinito.

## Nitro / SSR in produzione (iniezione automatica, v9+)

Quando `intlayerProxy` viene utilizzato come plugin Vite, include una proprietà `.nitro`. Il plugin di compilazione `nitro/vite` legge questa proprietà e la inserisce in `nitroConfig.modules`, quindi `intlayerNitroHandler` viene registrato automaticamente come middleware del server Nitro — nessuna configurazione manuale è necessaria per il SSR in produzione.

Il gestore Nitro utilizza il modello di eventi della Web Fetch API di h3 v2 (non `fromNodeMiddleware`) quindi è compatibile con tutti i preset di Nitro: Node, Bun, Deno, runtime edge.

## Alias obsoleti

| Esportazione obsoleta      | Sostituzione    |
| -------------------------- | --------------- |
| `intlayerMiddleware`       | `intlayerProxy` |
| `intLayerMiddlewarePlugin` | `intlayerProxy` |
