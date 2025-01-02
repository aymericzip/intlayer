# Internationalization with Intlayer and i18next

i18next est un framework open-source d'internationalisation (i18n) conçu pour les applications JavaScript. Il est largement utilisé pour gérer les traductions, la localisation et le changement de langue dans les projets logiciels. Cependant, il a certaines limites qui peuvent compliquer l'évolutivité et le développement.

Intlayer est un autre framework d'internationalisation qui répond à ces limitations, offrant une approche plus flexible pour la déclaration et la gestion du contenu. Explorons quelques différences clés entre i18next et Intlayer, et comment configurer les deux pour une internationalisation optimale.

## Intlayer vs. i18next: Différences Clés

### 1. Déclaration du Contenu

Avec i18next, les dictionnaires de traduction doivent être déclarés dans un dossier spécifique, ce qui peut compliquer l'évolutivité de l'application. En revanche, Intlayer permet de déclarer le contenu dans le même répertoire que votre composant. Cela présente plusieurs avantages :

- **Édition de Contenu Simplifiée**: Les utilisateurs n'ont pas à chercher le bon dictionnaire à éditer, réduisant ainsi le risque d'erreurs.
- **Adaptation Automatique**: Si un composant change de localisation ou est supprimé, Intlayer le détecte et s'adapte automatiquement.

### 2. Complexité de Configuration

Configurer i18next peut être complexe, surtout lors de l'intégration avec des composants côté serveur ou la configuration de middleware pour des frameworks comme Next.js. Intlayer simplifie ce processus, offrant une configuration plus directe.

### 3. Cohérence des Dictionnaires de Traduction

Assurer la cohérence des dictionnaires de traduction à travers différentes langues peut être difficile avec i18next. Cette incohérence peut entraîner des plantages d'application si elle n'est pas correctement gérée. Intlayer y remédie en imposant des contraintes sur le contenu traduit, garantissant qu'aucune traduction ne soit manquée et que le contenu traduit soit précis.

### 4. Intégration TypeScript

Intlayer offre une meilleure intégration avec TypeScript, permettant des auto-suggestions de contenu dans votre code, améliorant ainsi l'efficacité du développement.

### 5. Partage de Contenu Entre Applications

Intlayer facilite le partage de fichiers de déclaration de contenu entre plusieurs applications et bibliothèques partagées. Cette fonctionnalité rend plus facile le maintien de traductions cohérentes à travers une base de code plus large.

## Comment Générer des Dictionnaires i18next avec Intlayer

### Configurer Intlayer pour Exporter des Dictionnaires i18next

> Notes Importantes
> L'exportation des dictionnaires i18next est actuellement en beta et ne garantit pas une compatibilité 1: 1 avec d'autres frameworks. Il est recommandé de s'en tenir à une configuration basée sur Intlayer pour minimiser les problèmes.

Pour exporter des dictionnaires i18next, vous devez configurer Intlayer de manière appropriée. Voici un exemple de la façon de configurer Intlayer pour exporter à la fois les dictionnaires Intlayer et i18next.

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  content: {
    // Indiquez qu'Intlayer exportera à la fois les dictionnaires Intlayer et i18next
    dictionaryOutput: ["intlayer", "i18next"],
    // Chemin relatif depuis la racine du projet vers le répertoire où les dictionnaires i18n seront exportés
    i18nDictionariesDir: "./i18n/dictionaries",
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  content: {
    // Indiquez qu'Intlayer exportera à la fois les dictionnaires Intlayer et i18next
    dictionaryOutput: ["intlayer", "i18next"],
    // Chemin relatif depuis la racine du projet vers le répertoire où les dictionnaires i18n seront exportés
    i18nDictionariesDir: "./i18n/dictionaries",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  content: {
    // Indiquez qu'Intlayer exportera à la fois les dictionnaires Intlayer et i18next
    dictionaryOutput: ["intlayer", "i18next"],
    // Chemin relatif depuis la racine du projet vers le répertoire où les dictionnaires i18n seront exportés
    i18nDictionariesDir: "./i18n/dictionaries",
  },
};

module.exports = config;
```

En incluant 'i18next' dans la configuration, Intlayer génère des dictionnaires i18next dédiés en plus des dictionnaires Intlayer. Notez que le fait de retirer 'intlayer' de la configuration peut provoquer des problèmes de compatibilité avec React-Intlayer ou Next-Intlayer.

### Importer des Dictionnaires dans Votre Configuration i18next

Pour importer les dictionnaires générés dans votre configuration i18next, vous pouvez utiliser 'i18next-resources-to-backend'. Voici un exemple de la façon d'importer vos dictionnaires i18next :

```typescript fileName="i18n/client.ts" codeFormat="typescript"
// i18n/client.ts

import i18next from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";

i18next
  // Votre configuration i18next
  .use(
    resourcesToBackend(
      (language: string, namespace: string) =>
        import(`../i18n/dictionaries/${language}/${namespace}.json`)
    )
  );
```

```javascript fileName="i18n/client.mjs" codeFormat="esm"
// i18n/client.mjs

import i18next from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";

i18next
  // Votre configuration i18next
  .use(
    resourcesToBackend(
      (language, namespace) =>
        import(`../i18n/dictionaries/${language}/${namespace}.json`)
    )
  );
```

```javascript fileName="i18n/client.cjs" codeFormat="commonjs"
// i18n/client.cjs

const i18next = require("i18next");
const resourcesToBackend = require("i18next-resources-to-backend");

i18next
  // Votre configuration i18next
  .use(
    resourcesToBackend(
      (language, namespace) =>
        import(`../i18n/dictionaries/${language}/${namespace}.json`)
    )
  );
```
