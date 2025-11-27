---
createdAt: 2025-09-09
updatedAt: 2025-09-09
title: Intlayer Compiler | Extraction Automatisée de Contenu pour i18n
description: Automatisez votre processus d'internationalisation avec l'Intlayer Compiler. Extrayez le contenu directement de vos composants pour une i18n plus rapide et plus efficace dans Vite, Next.js, et plus encore.
keywords:
  - Intlayer
  - Compiler
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

Comme alternative, pour automatiser votre processus i18n tout en gardant un contrôle total de votre contenu, Intlayer fournit également une commande d'auto-extraction `intlayer transform` (voir la [documentation CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/transform.md)), ou la commande `Intlayer: extract content to Dictionary` de l'extension Intlayer VS Code (voir la [documentation de l'extension VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/vs_code_extension.md)).

## Utilisation

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

### Next.js (Babel)

Pour Next.js ou d'autres applications basées sur Webpack utilisant Babel, vous pouvez configurer le compilateur en utilisant le plugin `@intlayer/babel`.

#### Installation

```bash
npm install @intlayer/babel
```

#### Configuration

Mettez à jour votre fichier `babel.config.js` (ou `babel.config.json`) pour inclure le plugin d'extraction. Nous fournissons un helper `getCompilerOptions` pour charger automatiquement votre configuration Intlayer.

```js fileName="babel.config.js"
const { intlayerExtractBabelPlugin } = require("@intlayer/babel");
const { getCompilerOptions } = require("@intlayer/babel/compiler");

module.exports = {
  presets: ["next/babel"],
  plugins: [
    [
      intlayerExtractBabelPlugin,
      getCompilerOptions(), // Charge automatiquement les options depuis intlayer.config.ts
    ],
  ],
};
```

Cette configuration garantit que le contenu déclaré dans vos composants est automatiquement extrait et utilisé pour générer les dictionnaires lors de votre processus de build.
