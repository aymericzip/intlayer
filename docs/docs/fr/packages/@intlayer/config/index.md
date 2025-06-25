# @intlayer/config: Paquet NPM pour récupérer la configuration d'Intlayer

**Intlayer** est une suite de paquets conçue spécifiquement pour les développeurs JavaScript. Elle est compatible avec des frameworks comme React, React et Express.js.

Le paquet **`@intlayer/config`** est un paquet NPM qui vous permet de récupérer la configuration d'Intlayer et de définir les variables d'environnement liées à l'environnement actuel.

## Installation

Installez le paquet nécessaire en utilisant votre gestionnaire de paquets préféré :

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

> Cette fonction utilise les paquets `fs` et ne fonctionnera que côté serveur.

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

> Voir [Documentation de configuration d'Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md) pour plus de détails.

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
