---
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: @intlayer/api - SDK pour l'intégration de l'API Intlayer
description: Package NPM fournissant un kit de développement logiciel (SDK) pour interagir avec l'API Intlayer pour l'audit de contenu, les organisations, les projets et la gestion des utilisateurs.
keywords:
  - intlayer
  - API
  - SDK
  - intégration
  - audit de contenu
  - organisations
  - projets
  - JavaScript
slugs:
  - doc
  - packages
  - intlayer
  - api
---

# @intlayer/api : Package NPM pour interagir avec l'API Intlayer

**Intlayer** est une suite de packages conçue spécifiquement pour les développeurs JavaScript. Il est compatible avec des frameworks comme React, React, et Express.js.

**Le package `@intlayer/api` est un SDK (kit de développement logiciel) pour interagir avec l'API Intlayer. Il fournit un ensemble de fonctions pour auditer la déclaration de contenu, interagir avec les organisations, les projets, les utilisateurs, etc.**

## Utilisation

```ts
import { intlayerAPI } from "@intlayer/api";

intlayerAPI.user.getUser({
  ids: ["user-id-1", "user-id-2"],
});
```

## Installation

Installez le package nécessaire en utilisant votre gestionnaire de paquets préféré :

```bash packageManager="npm"
npm install @intlayer/api
```

```bash packageManager="pnpm"
pnpm add @intlayer/api
```

```bash packageManager="yarn"
yarn add @intlayer/api
```

## Historique de la documentation

- 5.5.10 - 2025-06-29 : Historique initial
