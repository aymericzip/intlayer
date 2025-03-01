# @intlayer/api : Package NPM pour interagir avec l'API Intlayer

**Intlayer** est une suite de packages conçue spécifiquement pour les développeurs JavaScript. Elle est compatible avec des frameworks comme React, React et Express.js.

Le package **`@intlayer/api`** est un SDK (Software Development Kit) pour interagir avec l'API Intlayer. Il fournit un ensemble de fonctions pour auditer les déclarations de contenu, interagir avec les organisations, les projets, les utilisateurs, etc.

## Utilisation

```ts
import { intlayerAPI } from "@intlayer/api";

intlayerAPI.user.getUser({
  ids: ["user-id-1", "user-id-2"],
});
```

## Installation

Installez le package nécessaire en utilisant votre gestionnaire de packages préféré :

```bash packageManager="npm"
npm install @intlayer/api
```

```bash packageManager="pnpm"
pnpm add @intlayer/api
```

```bash packageManager="yarn"
yarn add @intlayer/api
```
