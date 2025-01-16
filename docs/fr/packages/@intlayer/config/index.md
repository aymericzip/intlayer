# @intlayer/config: Package NPM pour récupérer la configuration d'Intlayer

**Intlayer** est un ensemble de packages conçus spécifiquement pour les développeurs JavaScript. Il est compatible avec des frameworks comme React, React, et Express.js.

Le package **`@intlayer/config`** est un package NPM qui vous permet de récupérer la configuration d'Intlayer et de définir les variables d'environnement liées à l'environnement actuel.

## Installation

Installez le package nécessaire en utilisant votre gestionnaire de packages préféré :

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

> Cette fonction utilise des packages `fs` et ne fonctionnera que côté serveur.

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

> Cette fonction ne renverra rien si les variables d'environnement ne sont pas définies.

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

> Voir [documentation de configuration d'Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/fr/configuration.md) pour plus de détails.

2. Définissez les variables d'environnement.

```ts
import { getConfiguration } from "@intlayer/config";

const intlayerConfig = getConfiguration();

// Formater toutes les valeurs de configuration en tant que variables d'environnement
const env = formatEnvVariable();

// Définir chaque variable d'environnement formatée dans process.env
Object.assign(process.env, env);
```

3. Importez le fichier de configuration.

```ts
import { getConfiguration } from "@intlayer/config/client";

const intlayerConfig = getConfiguration();
```
