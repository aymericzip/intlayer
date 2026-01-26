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
  - version: 8.0.0
    date: 2026-01-21
    changes: Documentazione unificata per tutte le esportazioni
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

| Funzione             | Descrizione                                                                               | Doc correlata                                                                                                          |
| -------------------- | ----------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `intlayer`           | Plugin Vite principale che integra Intlayer nel processo di build.                        | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/vite-intlayer/intlayer.md)           |
| `intlayerPlugin`     | (**Deprecato**) Alias per `intlayer`.                                                     | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/vite-intlayer/intlayer.md)           |
| `intlayerProxy`      | Plugin middleware per lo sviluppo che gestisce il rilevamento della locale e il routing.  | -                                                                                                                      |
| `intlayerMiddleware` | (**Deprecato**) Alias per `intlayerProxy`.                                                | -                                                                                                                      |
| `intlayerPrune`      | Plugin per eseguire il tree-shaking e potare i dizionari non utilizzati durante la build. | [intlayerPrune](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/vite-intlayer/intlayerPrune.md) |
