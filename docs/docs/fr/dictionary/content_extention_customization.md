---
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: Personnalisation des extensions de contenu
description: Apprenez à personnaliser les extensions de vos fichiers de déclaration de contenu. Suivez cette documentation pour implémenter efficacement des conditions dans votre projet.
keywords:
  - Personnalisation des extensions de contenu
  - Documentation
  - Intlayer
slugs:
  - doc
  - concept
  - content
---

# Personnalisation des extensions de contenu

## Extensions des fichiers de contenu

Intlayer vous permet de personnaliser les extensions de vos fichiers de déclaration de contenu. Cette personnalisation offre une flexibilité dans la gestion de projets à grande échelle et aide à éviter les conflits avec d'autres modules.

### Extensions par défaut

Par défaut, Intlayer surveille tous les fichiers avec les extensions suivantes pour les déclarations de contenu :

- `.content.json`
- `.content.ts`
- `.content.tsx`
- `.content.js`
- `.content.jsx`
- `.content.mjs`
- `.content.mjx`
- `.content.cjs`
- `.content.cjx`

Ces extensions par défaut conviennent à la plupart des applications. Cependant, lorsque vous avez des besoins spécifiques, vous pouvez définir des extensions personnalisées pour rationaliser le processus de build et réduire le risque de conflits avec d'autres composants.

### Personnalisation des extensions de contenu

Pour personnaliser les extensions de fichiers qu'Intlayer utilise pour identifier les fichiers de déclaration de contenu, vous pouvez les spécifier dans le fichier de configuration d'Intlayer. Cette approche est bénéfique pour les projets à grande échelle où limiter la portée du processus de surveillance améliore les performances de construction.

Voici un exemple de définition d'extensions de contenu personnalisées dans votre configuration :

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  content: {
    fileExtensions: [".my_content.ts", ".my_content.tsx"], // Vos extensions personnalisées
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  content: {
    fileExtensions: [".my_content.cjs", ".my_content.cjx"], // Vos extensions personnalisées
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  content: {
    fileExtensions: [".my_content.mjs", ".my_content.mjx"], // Vos extensions personnalisées
  },
};

module.exports = config;
```

Dans cet exemple, la configuration spécifie deux extensions personnalisées : `.my_content.ts` et `.my_content.tsx`. Intlayer ne surveillera que les fichiers avec ces extensions pour construire les dictionnaires.

### Avantages des extensions personnalisées

- **Performance de construction** : Réduire la portée des fichiers surveillés peut améliorer significativement les performances de construction dans les grands projets.
- **Évitement des conflits** : Les extensions personnalisées aident à prévenir les conflits avec d'autres fichiers JavaScript ou TypeScript dans votre projet.
- **Organisation** : Les extensions personnalisées vous permettent d'organiser vos fichiers de déclaration de contenu selon les besoins de votre projet.

### Directives pour les extensions personnalisées

Lors de la personnalisation des extensions de fichiers de contenu, gardez à l'esprit les directives suivantes :

- **Unicité** : Choisissez des extensions uniques dans votre projet pour éviter les conflits.
- **Nommage cohérent** : Utilisez des conventions de nommage cohérentes pour une meilleure lisibilité et maintenance du code.
- **Éviter les extensions courantes** : Évitez d'utiliser des extensions courantes comme `.ts` ou `.js` pour prévenir les conflits avec d'autres modules ou bibliothèques.

## Conclusion

La personnalisation des extensions de fichiers de contenu dans Intlayer est une fonctionnalité précieuse pour optimiser les performances et éviter les conflits dans les applications à grande échelle. En suivant les directives décrites dans cette documentation, vous pouvez gérer efficacement vos déclarations de contenu et assurer une intégration fluide avec les autres parties de votre projet.

## Historique de la documentation

- 5.5.10 - 2025-06-29 : Historique initial
