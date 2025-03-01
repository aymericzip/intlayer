# @intlayer/chokidar : Package NPM pour scanner et construire des fichiers de déclaration Intlayer en dictionnaires

**Intlayer** est une suite de packages conçue spécifiquement pour les développeurs JavaScript. Elle est compatible avec des frameworks comme React, React et Express.js.

Le package **`@intlayer/chokidar`** est utilisé pour scanner et construire des fichiers de déclaration Intlayer en dictionnaires en utilisant [chokidar](https://github.com/paulmillr/chokidar) et selon la [configuration Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/fr/configuration.md).

## Utilisation

```ts
import { watch, prepareIntlayer } from "@intlayer/chokidar";

await prepareIntlayer(); // Construire les dictionnaires Intlayer

watch({ persistent: true }); // Surveiller les changements dans les fichiers de configuration
```

## Installation

Installez le package nécessaire en utilisant votre gestionnaire de packages préféré :

```bash packageManager="npm"
npm install @intlayer/chokidar
```

```bash packageManager="pnpm"
pnpm add @intlayer/chokidar
```

```bash packageManager="yarn"
yarn add @intlayer/chokidar
```
