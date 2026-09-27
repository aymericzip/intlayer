---
createdAt: 2026-01-21
updatedAt: 2026-09-27
priority: 5
title: Documentazione del pacchetto lynx-intlayer
description: "Il pacchetto lynx-intlayer integra Intlayer nelle app Lynx, con i polyfill e gli helper necessari per gestire le locale su mobile."
keywords:
  - lynx-intlayer
  - lynx
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - lynx-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: "Documentazione unificata per tutte le esportazioni"
author: aymericzip
---

# Pacchetto lynx-intlayer

Il pacchetto `lynx-intlayer` fornisce gli strumenti necessari per integrare Intlayer nelle applicazioni Lynx.

## Installazione

```bash
npm install lynx-intlayer
```

## Esportazioni

### Polyfill

Importazione:

```tsx
import "lynx-intlayer";
```

| Funzione           | Descrizione                                                                             |
| ------------------ | --------------------------------------------------------------------------------------- |
| `intlayerPolyfill` | Funzione che applica i polyfill necessari per consentire a Lynx di supportare Intlayer. |

### Plugin Rsbuild

Il pacchetto `lynx-intlayer` fornisce un plugin Rsbuild per integrare Intlayer nel processo di build di Lynx.

Import:

```tsx
import "lynx-intlayer";
```

| Funzione             | Descrizione                                                        |
| -------------------- | ------------------------------------------------------------------ |
| `pluginIntlayerLynx` | Plugin Rsbuild che integra Intlayer nel processo di build di Lynx. |
