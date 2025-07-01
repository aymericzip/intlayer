---
docName: package__@intlayer_config
url: https://intlayer.org/doc/package/@intlayer_config
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/@intlayer/config/index.md
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: @intlayer/config - Gestion de la configuration pour Intlayer
description: Package NPM pour récupérer la configuration d'Intlayer et définir les variables d'environnement pour les paramètres d'internationalisation à travers différents environnements.
keywords:
  - intlayer
  - configuration
  - environnement
  - paramètres
  - i18n
  - JavaScript
  - NPM
  - variables
---

# @intlayer/config : Package NPM pour récupérer la configuration d'Intlayer

**Intlayer** est une suite de packages conçue spécifiquement pour les développeurs JavaScript. Elle est compatible avec des frameworks comme React, React Native, et Express.js.

Le package **`@intlayer/config`** est un package NPM qui vous permet de récupérer la configuration d'Intlayer et de définir les variables d'environnement liées à l'environnement actuel.

## Installation

Installez le package nécessaire en utilisant votre gestionnaire de paquets préféré :

```bash packageManager="npm"
npm install @intlayer/config
```

```bash packageManager="pnpm"
pnpm add @intlayer/config
```

```bash packageManager="yarn"
yarn add @intlayer/config
```

## Utilisation

### Lire la configuration d'Intlayer en utilisant le système de fichiers

Exemple :

```ts
import { getConfiguration, type IntlayerConfig } from "@intlayer/config";

const config: IntlayerConfig = getConfiguration();

console.log(config);
// Sortie :
// {
//   internationalization: { ... },
//   middleware: { ... },
//   content: { ... },
//   editor: { ... }
// }
```

> Cette fonction utilise les packages `fs` et ne fonctionnera que côté serveur.

### Lire la configuration d'Intlayer en utilisant les variables d'environnement

Exemple :

```ts
import { getConfiguration, type IntlayerConfig } from "@intlayer/config/client";

const config: IntlayerConfig = getConfiguration({
  env: "production",
});

console.log(config);
// Sortie :
// {
//   internationalization: { ... },
//   middleware: { ... },
//   content: { ... },
//   editor: { ... }
// }
```

> Cette fonction ne retournera rien si les variables d'environnement ne sont pas définies.

### Définir les variables d'environnement

1. Créez un fichier de configuration.

```ts fileName="intlayer.config.ts"
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    /* ... */
  },
  middleware: {
    /* ... */
  },
  content: {
    /* ... */
  },
  editor: {
    /* ... */
  },
};

export default config;
```

> Voir la [documentation de configuration d'Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md) pour plus de détails.

2. Définissez les variables d'environnement.

```ts
import { getConfiguration } from "@intlayer/config";

const intlayerConfig = getConfiguration();

// Formate toutes les valeurs de configuration en variables d'environnement
const env = formatEnvVariable();

// Définit chaque variable d'environnement formatée dans process.env
Object.assign(process.env, env);
```

3. Importez le fichier de configuration.

```ts
import { getConfiguration } from "@intlayer/config/client";

const intlayerConfig = getConfiguration();
```

## Historique de la documentation

- 5.5.10 - 2025-06-29 : Historique initial
