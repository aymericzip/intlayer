---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Documentation du plugin intlayerPrune pour Vite | vite-intlayer
description: Découvrez comment utiliser le plugin intlayerPrune pour le package vite-intlayer
keywords:
  - intlayerPrune
  - vite
  - plugin
  - tree-shaking
  - Intlayer
  - intlayer
  - Internationalization
  - Documentation
slugs:
  - doc
  - packages
  - vite-intlayer
  - intlayerPrune
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Init doc
---

# Documentation du plugin intlayerPrune pour Vite

Le plugin Vite `intlayerPrune` permet d'effectuer du tree-shaking et de supprimer les dictionnaires inutilisés du bundle de votre application. Cela aide à réduire la taille finale du bundle en n'incluant que le contenu multilingue nécessaire.

## Utilisation

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayer, intlayerPrune } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer(), intlayerPrune()],
});
```

## Description

Le plugin analyse votre code source pour identifier quelles clés de dictionnaire sont réellement utilisées. Il supprime ensuite tout contenu inutilisé des fichiers de dictionnaire inclus dans le bundle. Cela est particulièrement utile pour les grands projets comportant de nombreux dictionnaires où seul un sous-ensemble est utilisé dans des pages ou composants spécifiques.
