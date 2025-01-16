# @intlayer/api: NPM Package pour interagir avec l'API Intlayer

**Intlayer** est une suite de packages conçue spécifiquement pour les développeurs JavaScript. Il est compatible avec des frameworks comme React, React, et Express.js.

Le package **`@intlayer/api`** est un SDK (Kit de Développement Logiciel) pour interagir avec l'API Intlayer. Il fournit un ensemble de fonctions pour auditer la déclaration de contenu, interagir avec des organisations, des projets, et des utilisateurs, etc.

## Utilisation

```ts
import { intlayerAPI } from "@intlayer/api";

// Récupère les informations de l'utilisateur
intlayerAPI.user.getUserAPI({
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
