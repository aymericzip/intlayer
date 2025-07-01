---
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: @intlayer/chokidar - Surveillance de fichiers pour l'i18n Intlayer
description: Package NPM fournissant des capacités de surveillance de fichiers pour Intlayer, permettant des mises à jour automatiques et un rechargement à chaud du contenu d'internationalisation.
keywords:
  - intlayer
  - chokidar
  - surveillance de fichiers
  - rechargement à chaud
  - i18n
  - JavaScript
  - NPM
  - développement
slugs:
  - doc
  - package
  - @intlayer_chokidar
---

# @intlayer/chokidar : Package NPM pour scanner et construire les fichiers de déclaration Intlayer en dictionnaires

**Intlayer** est une suite de packages conçue spécifiquement pour les développeurs JavaScript. Elle est compatible avec des frameworks comme React, React Native, et Express.js.

Le package **`@intlayer/chokidar`** est utilisé pour scanner et construire les fichiers de déclaration Intlayer en dictionnaires en utilisant [chokidar](https://github.com/paulmillr/chokidar) et selon la [configuration Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md).

## Utilisation

```ts
import { watch, prepareIntlayer } from "@intlayer/chokidar";

await prepareIntlayer(); // Construire les dictionnaires Intlayer

watch({ persistent: true }); // Surveiller les changements dans les fichiers de configuration
```

## Installation

Installez le package nécessaire en utilisant votre gestionnaire de paquets préféré :

```bash packageManager="npm"
bash packageManager="npm"
npm install @intlayer/chokidar
```

```bash packageManager="pnpm"
pnpm add @intlayer/chokidar
```

```bash packageManager="yarn"
yarn add @intlayer/chokidar
```

## Historique de la documentation

- 5.5.10 - 2025-06-29 : Historique initial
