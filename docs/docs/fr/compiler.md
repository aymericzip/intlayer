---
createdAt: 2025-09-09
updatedAt: 2026-03-12
title: Compilateur Intlayer | Extraction automatique de contenu pour l'i18n
description: Automatisez votre processus d'internationalisation avec le compilateur Intlayer. Extrayez le contenu directement de vos composants pour une i18n plus rapide et plus efficace dans Vite, Next.js, et plus encore.
keywords:
  - Intlayer
  - Compilateur
  - Internationalisation
  - i18n
  - Automatisation
  - Extraction
  - Rapidité
  - Vite
  - Next.js
  - React
  - Vue
  - Svelte
slugs:
  - doc
  - compiler
history:
  - version: 8.2.0
    date: 2026-03-10
    changes: Update compiler options, add FilePathPattern support
  - version: 8.1.7
    date: 2026-02-25
    changes: Mise à jour des options du compilateur
  - version: 7.3.1
    date: 2025-11-27
    changes: Sortie du Compiler
---

# Intlayer Compiler | Extraction Automatisée de Contenu pour i18n

## Qu'est-ce que l'Intlayer Compiler ?

Le **Intlayer Compiler** est un outil puissant conçu pour automatiser le processus d'internationalisation (i18n) dans vos applications. Il analyse votre code source (JSX, TSX, Vue, Svelte) à la recherche de déclarations de contenu, les extrait, et génère automatiquement les fichiers de dictionnaire nécessaires. Cela vous permet de garder votre contenu localisé avec vos composants tandis qu'Intlayer gère la gestion et la synchronisation de vos dictionnaires.

## Pourquoi utiliser le Intlayer Compiler ?

- **Automatisation** : Élimine le copier-coller manuel du contenu dans les dictionnaires.
- **Rapidité** : Extraction de contenu optimisée garantissant que votre processus de build reste rapide.
- **Expérience développeur** : Gardez les déclarations de contenu là où elles sont utilisées, améliorant ainsi la maintenabilité.
- **Mises à jour en direct** : Prend en charge le Hot Module Replacement (HMR) pour un retour instantané pendant le développement.

Consultez l'article de blog [Compiler vs. Declarative i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/compiler_vs_declarative_i18n.md) pour une comparaison plus approfondie.

## Pourquoi ne pas utiliser l'Intlayer Compiler ?

Bien que le compilateur offre une excellente expérience "fonctionne tout seul", il introduit également certains compromis dont vous devez être conscient :

- **Ambiguïté heuristique** : Le compilateur doit deviner ce qui est du contenu destiné aux utilisateurs par rapport à la logique de l'application (par exemple, `className="active"`, codes de statut, identifiants de produits). Dans des bases de code complexes, cela peut conduire à de faux positifs ou à des chaînes manquées qui nécessitent des annotations manuelles et des exceptions.
- **Extraction statique uniquement** : L'extraction basée sur le compilateur repose sur l'analyse statique. Les chaînes qui n'existent qu'à l'exécution (codes d'erreur API, champs CMS, etc.) ne peuvent pas être découvertes ou traduites par le compilateur seul, vous avez donc toujours besoin d'une stratégie i18n d'exécution complémentaire.

Pour une comparaison architecturale plus approfondie, consultez l'article de blog [Compiler vs. Declarative i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/compiler_vs_declarative_i18n.md).

Comme alternative, pour automatiser votre processus i18n tout en gardant un contrôle total de votre contenu, Intlayer fournit également une commande d'auto-extraction `intlayer extract` (voir la [documentation CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/extract.md)), ou la commande `Intlayer: extract content to Dictionary` de l'extension Intlayer VS Code (voir la [documentation de l'extension VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/vs_code_extension.md)).

## Utilisation

<Tabs>
 <Tab value='vite'>

### Vite

Pour les applications basées sur Vite (React, Vue, Svelte, etc.), la manière la plus simple d'utiliser le compilateur est via le plugin `vite-intlayer`.

#### Installation

```bash
npm install vite-intlayer
```

#### Configuration

Mettez à jour votre `vite.config.ts` pour inclure le plugin `intlayerCompiler` :

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer, intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer(),
    intlayerCompiler(), // Ajoute le plugin du compilateur
  ],
});
```

See complete tutorial: [Intlayer Compiler with Vite+React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_vite+react_compiler.md)

#### Support des frameworks

Le plugin Vite détecte et gère automatiquement différents types de fichiers :

- **React / JSX / TSX** : Pris en charge nativement.
- **Vue** : Nécessite `@intlayer/vue-compiler`.
- **Svelte** : Nécessite `@intlayer/svelte-compiler`.

Assurez-vous d'installer le paquet compilateur approprié pour votre framework :

```bash
# Pour Vue
npm install @intlayer/vue-compiler

# Pour Svelte
npm install @intlayer/svelte-compiler
```

 </Tab>
 <Tab value='nextjs'>

### Next.js (Babel)

Pour Next.js ou d'autres applications basées sur Webpack utilisant Babel, vous pouvez configurer le compilateur en utilisant le plugin `@intlayer/babel`.

#### Installation

```bash
npm install @intlayer/babel
```

#### Configuration

Mettez à jour votre fichier `babel.config.js` (ou `babel.config.json`) pour inclure le plugin d'extraction. Nous fournissons un helper `getExtractPluginOptions` pour charger automatiquement votre configuration Intlayer.

```js fileName="babel.config.js"
const {
  intlayerExtractBabelPlugin,
  intlayerOptimizeBabelPlugin,
  getExtractPluginOptions,
  getOptimizePluginOptions,
} = require("@intlayer/babel");

module.exports = {
  presets: ["next/babel"],
  plugins: [
    // Extract content from components into dictionaries
    [intlayerExtractBabelPlugin, getExtractPluginOptions()],
    // Optimize imports by replacing useIntlayer with direct dictionary imports
    [intlayerOptimizeBabelPlugin, getOptimizePluginOptions()],
  ],
};
```

Cette configuration garantit que le contenu déclaré dans vos composants est automatiquement extrait et utilisé pour générer les dictionnaires lors de votre processus de build.

See complete tutorial: [Intlayer Compiler with Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_compiler.md)

 </Tab>
</Tabs>

### Configuration personnalisée

Pour personnaliser le comportement du compilateur, vous pouvez mettre à jour le fichier `intlayer.config.ts` à la racine de votre projet.

````ts fileName="intlayer.config.ts"
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  compiler: {
    /**
     * Indique si le compilateur doit être activé.
     * Réglez sur 'build-only' pour ignorer le compilateur pendant le développement et accélérer les temps de démarrage.
     */
    enabled: true,

    /**
     * Définit le chemin des fichiers de sortie. Remplace `outputDir`.
     *
     * - Les chemins `./` sont résolus par rapport au répertoire du composant.
     * - Les chemins `/` sont résolus par rapport à la racine du projet (`baseDir`).
     *
     * - L'inclusion de la variable `{{locale}}` dans le chemin déclenchera la génération de dictionnaires séparés par locale.
     *
     * Exemple :
     * ```ts
     * {
     *   // Créer des fichiers .content.ts multilingues proches du composant
     *   output: ({ fileName, extension }) => `./${fileName}${extension}`,
     *
     *   // output: './{{fileName}}{{extension}}', // Équivalent utilisant une chaîne de caractères
     * }
     * ```
     *
     * ```ts
     * {
     *   // Créer des JSON centralisés par locale à la racine du projet
     *   output: ({ key, locale }) => `/locales/${locale}/${key}.content.json`,
     *
     *   // output: '/locales/{{locale}}/{{key}}.content.json', // Équivalent utilisant une chaîne de caractères
     * }
     * ```
     *
     * Liste des variables :
     *   - `fileName`: Le nom du fichier.
     *   - `key`: La clé du contenu.
     *   - `locale`: La locale du contenu.
     *   - `extension`: L'extension du fichier.
     *   - `componentFileName`: Le nom du fichier du composant.
     *   - `componentExtension`: L'extension du fichier du composant.
     *   - `format`: Le format du dictionnaire.
     *   - `componentFormat`: Le format du dictionnaire du composant.
     *   - `componentDirPath`: Le chemin du répertoire du composant.
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * Indique si les composants doivent être sauvegardés après avoir été transformés.
     * De cette façon, le compilateur peut être exécuté une seule fois pour transformer l'application, puis il peut être supprimé.
     */
    saveComponents: false,

    /**
     * Insérer uniquement le contenu dans le fichier généré. Utile pour les sorties JSON i18next ou ICU MessageFormat par locale.
     *
     * - `output: ({ locale, key }) => `./locale/${locale}/${key}.json`,`
     */
    noMetadata: false,

    /**
     * Préfixe de clé de dictionnaire
     */
    dictionaryKeyPrefix: "", // Ajouter un préfixe optionnel pour les clés de dictionnaire extraites
  },
};

export default config;
````

### Référence de la configuration du compilateur

Les propriétés suivantes peuvent être configurées dans le bloc `compiler` de votre fichier `intlayer.config.ts` :

- **enabled**:
  - _Type_: `boolean | 'build-only'`
  - _Par défaut_: `true`
  - _Description_: Indique si le compilateur doit être activé.

- **dictionaryKeyPrefix**:
  - _Type_: `string`
  - _Par défaut_: `''`
  - _Description_: Préfixe pour les clés de dictionnaire extraites.

- **transformPattern**:
  - _Type_: `string | string[]`
  - _Par défaut_: `['**/*.{js,ts,mjs,cjs,jsx,tsx,vue,svelte}', '!**/node_modules/**']`
  - _Description_: (Obsolète : utilisez `build.traversePattern` à la place) Modèles pour parcourir le code à optimiser.

- **excludePattern**:
  - _Type_: `string | string[]`
  - _Par défaut_: `['**/node_modules/**']`
  - _Description_: (Obsolète : utilisez `build.traversePattern` à la place) Modèles à exclure de l'optimisation.

- **output**:
  - _Type_: `FilePathPattern`
  - _Par défaut_: `({ key }) => 'compiler/${key}.content.json'`
  - _Description_: Définit le chemin des fichiers de sortie. Remplace `outputDir`. Gère les variables dynamiques telles que `{{locale}}`, `{{key}}`, `{{fileName}}`, `{{extension}}`, `{{format}}`, `{{dirPath}}`, `{{componentFileName}}`, `{{componentExtension}}`, `{{componentFormat}}`. Peut être configuré sous forme de chaîne à l'aide du format `'my/{{var}}/path'` ou sous forme de fonction.
  - _Note_: `./**/*` Les chemins sont résolus par rapport au composant. `/**/*` les chemins sont résolus par rapport au `baseDir` d'Intlayer.
  - _Note_: Si la locale est définie dans le chemin, cela générera des dictionnaires par locale.
  - _Exemple_: `output: ({ locale, key }) => 'compiler/${locale}/${key}.json'`

- **noMetadata**:
  - _Type_: `boolean`
  - _Par défaut_: `false`
  - _Description_: Indique si les métadonnées doivent être enregistrées dans le fichier. Si vrai, le compilateur n'enregistrera pas les métadonnées des dictionnaires (clé, enveloppe de contenu). Utile pour les sorties JSON i18next ou ICU MessageFormat par locale.
  - _Note_: Utile si utilisé avec le plugin `loadJSON`.
  - _Exemple_:
    Si `true` :
    ```json
    {
      "key": "value"
    }
    ```
    Si `false` :
    ```json
    {
      "key": "value",
      "content": {
        "key": "value"
      }
    }
    ```

- **saveComponents**:
  - _Type_: `boolean`
  - _Par défaut_: `false`
  - _Description_: Indique si les composants doivent être sauvegardés après avoir été transformés.

### Remplir les traductions manquantes

Intlayer fournit un outil CLI pour vous aider à remplir les traductions manquantes. Vous pouvez utiliser la commande `intlayer` pour tester et remplir les traductions manquantes à partir de votre code.

```bash
npx intlayer test         # Tester s'il y a des traductions manquantes
```

```bash
npx intlayer fill         # Remplir les traductions manquantes
```

### Extraction

Intlayer propose un outil CLI pour extraire le contenu de votre code. Vous pouvez utiliser la commande `intlayer extract` pour extraire le contenu de votre code.

```bash
npx intlayer extract
```

> Pour plus de détails, consultez la [documentation CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/index.md)
