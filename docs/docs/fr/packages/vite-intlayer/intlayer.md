---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Documentation du plugin Vite intlayer | vite-intlayer
description: Découvrez comment utiliser le plugin intlayer pour le package vite-intlayer
keywords:
  - intlayer
  - vite
  - plugin
  - Intlayer
  - intlayer
  - Internationalization
  - Documentation
slugs:
  - doc
  - packages
  - vite-intlayer
  - intlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Initialisation de la doc
---

# Documentation du plugin Vite intlayer

Le plugin Vite `intlayer` intègre la configuration Intlayer dans le processus de build. Il gère les alias des dictionnaires, lance le watcher des dictionnaires en mode développement, et prépare les dictionnaires pour le build.

## Utilisation

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer()],
});
```

## Description

Le plugin effectue les tâches suivantes :

1. **Préparer les dictionnaires** : Il compile les dictionnaires en fichiers optimisés au démarrage du processus de build ou de développement.
2. **Mode watch** : En mode développement, il surveille les modifications des fichiers de dictionnaire et les recompile automatiquement.
3. **Alias** : Il fournit des alias pour accéder aux dictionnaires dans votre application.
4. **Tree-shaking** : Il prend en charge le tree-shaking des traductions non utilisées via le plugin `intlayerPrune`.
