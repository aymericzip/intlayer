---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Documentazione del pacchetto vite-intlayer
description: Plugin Vite per Intlayer, che fornisce alias dei dizionari e watchers.
keywords:
  - vite-intlayer
  - vite
  - plugin
  - internazionalizzazione
  - i18n
slugs:
  - doc
  - packages
  - vite-intlayer
  - exports
history:
  - version: 9.0.0
    date: 2026-06-25
    changes: "Indice degli export aggiornato – proxy e compiler ora integrati in intlayer(); aggiunta documentazione per intlayerProxy, intlayerCompiler, intlayerMinify"
  - version: 8.0.0
    date: 2026-01-21
    changes: "Documentazione unificata per tutte le esportazioni"
author: aymericzip
---

# Pacchetto vite-intlayer

Il pacchetto `vite-intlayer` fornisce un plugin Vite per integrare Intlayer nella tua applicazione basata su Vite.

## Installazione

```bash
npm install vite-intlayer
```

## Esportazioni

### Plugin

Importazione:

```tsx
import "vite-intlayer";
```

| Funzione                   | Descrizione                                                                                                                                                              | Doc correlata                                                                                                                |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| `intlayer`                 | Plugin Vite principale. Prepara i dizionari, configura gli alias, avvia i watcher del server di sviluppo e (da v9) integra proxy e compilatore.                          | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/vite-intlayer/intlayer.md)                 |
| `intlayerPlugin`           | (**Deprecato**) Alias per `intlayer`.                                                                                                                                    | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/vite-intlayer/intlayer.md)                 |
| `intLayerPlugin`           | (**Deprecato**) Alias per `intlayer`.                                                                                                                                    | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/vite-intlayer/intlayer.md)                 |
| `intlayerProxy`            | Plugin middleware di routing delle locale (rilevamento, reindirizzamento, riscrittura). Da v9 è integrato in `intlayer()` – registrare separatamente solo se necessario. | [intlayerProxy](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/vite-intlayer/intlayerProxy.md)       |
| `intlayerMiddleware`       | (**Deprecato**) Alias per `intlayerProxy`.                                                                                                                               | [intlayerProxy](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/vite-intlayer/intlayerProxy.md)       |
| `intLayerMiddlewarePlugin` | (**Deprecato**) Alias per `intlayerProxy`.                                                                                                                               | [intlayerProxy](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/vite-intlayer/intlayerProxy.md)       |
| `intlayerCompiler`         | Estrae le dichiarazioni di contenuto inline dai componenti e le scrive nei dizionari. Da v9 è integrato in `intlayer()`.                                                 | [intlayerCompiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/vite-intlayer/intlayerCompiler.md) |
| `intlayerPrune`            | Esegue il tree-shaking dei campi di dizionario inutilizzati dal bundle di produzione.                                                                                    | [intlayerPrune](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/vite-intlayer/intlayerPrune.md)       |
| `intlayerMinify`           | Minifica i file JSON dei dizionari compilati e opzionalmente abbrevia i nomi dei campi.                                                                                  | [intlayerMinify](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/vite-intlayer/intlayerMinify.md)     |

### Utilities

| Export                       | Description                                                                                                | Related Doc                                                                                                            |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `createIntlayerProxyHandler` | Restituisce un middleware Node.js `(req, res, next)` agnostico del framework con logica di routing locale. | [intlayerProxy](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/vite-intlayer/intlayerProxy.md) |

### Types

| Export                       | Description                                                                                                         |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `IntlayerPluginOptions`      | Opzioni accettate da `intlayer()`. Estende `GetConfigurationOptions` con `compatCallers` e `proxy`.                 |
| `IntlayerProxyPluginOptions` | Opzioni accettate da `intlayerProxy()` e `createIntlayerProxyHandler()`. Include `ignore` e `configOptions`.        |
| `IntlayerCompilerOptions`    | Opzioni accettate da `intlayerCompiler()`. Include `configOptions` e `compilerConfig`.                              |
| `CompatCallerConfig`         | Re-export da `@intlayer/babel`. Descrive un pattern di caller compat-adapter per l'analisi dell'utilizzo dei campi. |
