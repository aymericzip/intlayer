---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Ricevo un errore "module not found" quando uso bun
description: Risolvi l'errore quando usi bun.
keywords:
  - bun
  - modulo non trovato
  - intlayer
  - configurazione
  - package manager
slugs:
  - frequent-questions
  - bun-set-up
---

# Ricevo un errore "module not found" quando uso bun

## Descrizione del problema

Quando usi bun, potresti incontrare un errore come questo:

```bash
Cannot find package 'intlayer' from '/workspace/packages/@intlayer/config/dist/cjs/utils/ESMxCJSHelpers.cjs' undefined
```

## Motivo

Intlayer usa `require` internamente. E bun limita la funzione require a risolvere solo i pacchetti del pacchetto `@intlayer/config`, invece che dell'intero progetto.

## Soluzione

### Fornire la funzione `require` nella configurazione

```ts
ts;
const config: IntlayerConfig = {
  build: {
    require, // fornire la funzione require nella configurazione
  },
};

export default config;
```

```ts fileName="next.config.ts" codeFormat="typescript"
import { withIntlayer } from "next-intlayer/server";

const configuration = withIntlayer({
  require, // fornire la funzione require nella configurazione
});

export default configuration;
```
