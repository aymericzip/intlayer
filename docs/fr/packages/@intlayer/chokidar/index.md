# @intlayer/chokidar: NPM Package pour scanner et construire des fichiers de déclaration Intlayer en dictionnaires

**Intlayer** est une suite de paquets conçue spécifiquement pour les développeurs JavaScript. Elle est compatible avec des frameworks comme React, React, et Express.js.

Le **`@intlayer/chokidar`** package est utilisé pour scanner et construire des fichiers de déclaration Intlayer en dictionnaires en utilisant [chokidar](https://github.com/paulmillr/chokidar) et selon la [configuration Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/fr/configuration.md).

## Utilisation

```ts
import { watch } from "@intlayer/chokidar";

watch(); // Construire les dictionnaires Intlayer

// Ou

watch({ persistent: true }); // Mode veille
```

## Installation

Installez le paquet nécessaire en utilisant votre gestionnaire de paquets préféré :

```bash packageManager="npm"
npm install @intlayer/chokidar
```

```bash packageManager="pnpm"
pnpm add @intlayer/chokidar
```

```bash packageManager="yarn"
yarn add @intlayer/chokidar
```
