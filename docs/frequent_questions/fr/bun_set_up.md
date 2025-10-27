---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Je reçois une erreur de module introuvable lors de l'utilisation de bun
description: Corriger l'erreur lors de l'utilisation de bun.
keywords:
  - bun
  - module introuvable
  - intlayer
  - configuration
  - gestionnaire de paquets
slugs:
  - doc
  - faq
  - bun-set-up
---

# Je reçois une erreur de module introuvable lors de l'utilisation de bun

## Description du problème

Lors de l'utilisation de bun, vous pouvez rencontrer une erreur comme celle-ci :

```bash
Cannot find package 'intlayer' from '/workspace/packages/@intlayer/config/dist/cjs/utils/ESMxCJSHelpers.cjs' undefined
```

## Raison

Intlayer utilise `require` en interne. Et bun limite la fonction require pour ne résoudre que les paquets du package `@intlayer/config`, au lieu de tout le projet.

## Solution

### Fournir la fonction `require` dans la configuration

```ts
const config: IntlayerConfig = {
  build: {
    require, // fournir la fonction require dans la configuration
  },
};

export default config;
```

```ts fileName="next.config.ts" codeFormat="typescript"
import { withIntlayer } from "next-intlayer/server";

const configuration = withIntlayer({
  require, // fournir la fonction require dans la configuration
});

export default configuration;
```
