# Personnalisation des Extensions de Contenu

## Extensions de Fichiers de Contenu

Intlayer vous permet de personnaliser les extensions pour vos fichiers de déclaration de contenu. Cette personnalisation offre une flexibilité dans la gestion des projets à grande échelle et aide à éviter les conflits avec d'autres modules.

### Extensions par Défaut

Par défaut, Intlayer surveille tous les fichiers avec les extensions suivantes pour les déclarations de contenu :

- `.content.ts`
- `.content.tsx`
- `.content.js`
- `.content.mjs`
- `.content.cjs`

Ces extensions par défaut conviennent à la plupart des applications. Cependant, lorsque vous avez des besoins spécifiques, vous pouvez définir des extensions personnalisées pour simplifier le processus de compilation et réduire le risque de conflits avec d'autres composants.

### Personnalisation des Extensions de Contenu

Pour personnaliser les extensions de fichiers qu'Intlayer utilise pour identifier les fichiers de déclaration de contenu, vous pouvez les spécifier dans le fichier de configuration d'Intlayer. Cette approche est bénéfique pour les grands projets où la limitation de la portée du processus de surveillance améliore les performances de compilation.

Voici un exemple de définition des extensions de contenu personnalisées dans votre configuration :

```typescript
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  content: {
    fileExtensions: [".my_content.ts", ".my_content.tsx"], // Vos extensions personnalisées
  },
};

export default config;
```

Dans cet exemple, la configuration spécifie deux extensions personnalisées : `.my_content.ts` et `.my_content.tsx`. Intlayer ne surveillera que les fichiers avec ces extensions pour construire des dictionnaires.

### Avantages des Extensions Personnalisées

- **Performances de Compilation** : Réduire la portée des fichiers surveillés peut améliorer considérablement les performances de compilation dans les grands projets.
- **Évitement des Conflits** : Les extensions personnalisées aident à éviter les conflits avec d'autres fichiers JavaScript ou TypeScript dans votre projet.
- **Organisation** : Les extensions personnalisées vous permettent d'organiser vos fichiers de déclaration de contenu selon les besoins de votre projet.

### Directives pour les Extensions Personnalisées

Lorsque vous personnalisez les extensions de fichiers de contenu, gardez à l'esprit les directives suivantes :

- **Unicité** : Choisissez des extensions uniques dans votre projet pour éviter les conflits.
- **Nomenclature Cohérente** : Utilisez des conventions de nommage cohérentes pour une meilleure lisibilité et maintenance du code.
- **Éviter les Extensions Courantes** : Évitez d'utiliser des extensions courantes comme `.ts` ou `.js` pour prévenir les conflits avec d'autres modules ou bibliothèques.

## Conclusion

La personnalisation des extensions de fichiers de contenu dans Intlayer est une fonctionnalité précieuse pour optimiser les performances et éviter les conflits dans les applications à grande échelle. En suivant les directives décrites dans cette documentation, vous pouvez gérer efficacement vos déclarations de contenu et assurer une intégration fluide avec les autres parties de votre projet.
