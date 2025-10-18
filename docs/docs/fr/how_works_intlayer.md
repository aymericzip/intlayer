---
createdAt: 2024-08-12
updatedAt: 2025-06-29
title: Comment Intlayer fonctionne
description: Apprenez comment Intlayer fonctionne en interne. Comprenez l'architecture et les composants qui rendent Intlayer puissant.
keywords:
  - Intlayer
  - Comment ça marche
  - Architecture
  - Composants
  - Fonctionnement interne
slugs:
  - doc
  - concept
  - how-works-intlayer
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Historique initial
---

# Comment Intlayer fonctionne

## Vue d'ensemble

L'idée principale derrière Intlayer est d'adopter une gestion de contenu par composant. Ainsi, l'idée derrière Intlayer est de vous permettre de déclarer votre contenu n'importe où dans votre base de code, comme dans le même répertoire que votre composant.

```bash
.
└── Components
    └── MyComponent
        ├── index.content.ts
        └── index.tsx
```

Pour ce faire, le rôle d'Intlayer est de trouver tous vos `fichiers de déclaration de contenu`, dans tous les formats différents présents dans votre projet, puis de générer les `dictionnaires` à partir de ceux-ci.

Il y a donc deux étapes principales :

- Étape de construction
- Étape d'interprétation

### Étape de construction des dictionnaires

L'étape de construction peut être réalisée de trois manières :

- en utilisant la CLI avec `npx intlayer build`
- en utilisant [l'extension vscode](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/vs_code_extension.md)
- en utilisant les plugins d'application tels que le package [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/vite-intlayer/index.md), ou leurs équivalents pour [Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/next-intlayer/index.md). Lorsque vous utilisez l'un de ces plugins, Intlayer construira automatiquement vos dictionnaires lorsque vous démarrez (dev) ou construisez (prod) votre application.

1. Déclaration des fichiers de contenu
   - Les fichiers de contenu peuvent être définis dans divers formats, tels que TypeScript, ECMAScript, CommonJS ou JSON.
   - Les fichiers de contenu peuvent être définis partout dans le projet, ce qui permet une meilleure maintenance et évolutivité. Il est important de respecter les conventions d'extension de fichier pour les fichiers de contenu. Cette extension est par défaut `*.content.{js|cjs|mjs|ts|tsx|json}`, mais elle peut être modifiée dans le [fichier de configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md).

2. Génération des `dictionnaires`
   - Les dictionnaires sont générés à partir des fichiers de contenu. Par défaut, les dictionnaires Intlayer sont générés dans le répertoire `.intlayer/dictionaries` du projet.
   - Ces dictionnaires sont générés dans différents formats pour répondre à tous les besoins et optimiser les performances de l'application.

3. Génération des types de dictionnaires

Basé sur vos `dictionnaires`, Intlayer générera des types pour les rendre utilisables dans votre application.

- Les types de dictionnaires sont générés à partir des `fichiers de déclaration de contenu` d'Intlayer. Par défaut, les types de dictionnaires Intlayer sont générés dans le répertoire `.intlayer/types` du projet.

- L'[augmentation de module](https://www.typescriptlang.org/docs/handbook/declaration-merging.html) d'Intlayer est une fonctionnalité TypeScript qui vous permet de définir des types supplémentaires pour Intlayer. Cela rend l'expérience de développement plus facile en suggérant les arguments disponibles ou requis.

Parmi les types générés, les types de dictionnaires Intlayer ou même les types de configuration de langue sont ajoutés au fichier `types/intlayer.d.ts` et utilisés par d'autres packages. Pour cela, il est nécessaire que le fichier `tsconfig.json` soit configuré pour inclure le répertoire `types` du projet.

### Étape d'interprétation des dictionnaires

Avec Intlayer, vous accéderez à votre contenu dans votre application en utilisant le hook `useIntlayer`.

```tsx
const MyComponent = () => {
  const content = useIntlayer("my-component");
  return <div>{content.title}</div>;
};
```

Ce hook gérera pour vous la détection de la locale et renverra le contenu pour la locale actuelle. En utilisant ce hook, vous pourrez également interpréter le markdown, gérer la pluralisation, et bien plus encore.

> Pour voir toutes les fonctionnalités d'Intlayer, vous pouvez lire la [documentation des dictionnaires](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/get_started.md).

## Contenu distant

Intlayer vous permet de déclarer du contenu localement, puis de l'exporter vers le CMS pour le rendre éditable par votre équipe non technique.

Ainsi, vous pourrez pousser et tirer du contenu depuis le CMS vers votre application, de manière similaire à ce que vous faites avec Git pour votre code.

Pour les dictionnaires externalisés utilisant le CMS, Intlayer effectue une opération de récupération basique pour obtenir les dictionnaires distants et les fusionne avec vos dictionnaires locaux. Si configuré sur votre projet, Intlayer gérera automatiquement la récupération du contenu depuis le CMS au démarrage de l'application (dev) ou lors de la construction (prod).

## Éditeur visuel

Intlayer fournit également un éditeur visuel pour vous permettre d'éditer votre contenu de manière visuelle. Cet [éditeur visuel](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_visual_editor.md) est disponible dans le package externe `intlayer-editor`.

![éditeur visuel](https://github.com/aymericzip/intlayer/blob/main/docs/assets/visual_editor.gif?raw=true)

- Le serveur est une simple application Express qui écoute les requêtes du client et récupère le contenu de votre application, tels que les `dictionaries` et la configuration pour le rendre accessible côté client.
- D'autre part, le client est une application React utilisée pour interagir avec votre contenu via une interface visuelle.
  Lorsque vous appelez votre contenu en utilisant `useIntlayer` et que l'éditeur est activé, il enveloppe automatiquement vos chaînes avec un objet Proxy nommé `IntlayerNode`. Ce nœud utilise `window.postMessage` pour communiquer avec un iframe encapsulé contenant l'interface de l'éditeur visuel.  
  Du côté de l'éditeur, celui-ci écoute ces messages et simule une interaction réelle avec votre contenu, vous permettant d'éditer le texte directement dans le contexte de votre application.

## Optimisation de la construction de l'application

Pour optimiser la taille du bundle de votre application, Intlayer fournit deux plugins pour optimiser la construction de votre application : les plugins `@intlayer/babel` et `@intlayer/swc`.
Les plugins Babel et SWC fonctionnent en analysant l'arbre de syntaxe abstraite (AST) de votre application pour remplacer les appels aux fonctions Intlayer par du code optimisé. Ce processus rend votre bundle final plus léger en production en s'assurant que seuls les dictionnaires réellement utilisés sont importés, optimisant ainsi le découpage des chunks et réduisant la taille du bundle.

En mode développement, Intlayer utilise une importation statique centralisée pour les dictionnaires afin de simplifier l'expérience de développement.

En activant l'option `importMode = "dynamic"` dans la [configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md), Intlayer utilisera l'importation dynamique pour charger les dictionnaires. Cette option est désactivée par défaut pour éviter le traitement asynchrone lors du rendu de l'application.

> `@intlayer/babel` est disponible par défaut dans le package `vite-intlayer`,

> `@intlayer/swc` n'est pas installé par défaut dans le package `next-intlayer` car les plugins SWC sont encore expérimentaux sur Next.js.

Pour voir comment configurer la construction de votre application, vous pouvez lire la [documentation de configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md).

## Packages

Intlayer est composé de plusieurs packages, chacun ayant un rôle spécifique dans le processus de traduction. Voici une représentation graphique de la structure de ce package :

![packages d'intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/packages_dependency_graph.svg)

### intlayer

Le package `intlayer` est utilisé dans les applications pour déclarer du contenu dans des fichiers de contenu.

### react-intlayer

Le package `react-intlayer` est utilisé pour interpréter les dictionnaires Intlayer et les rendre utilisables dans les applications React.

### next-intlayer

Le package `next-intlayer` est utilisé comme une couche au-dessus de `react-intlayer` pour rendre les dictionnaires Intlayer utilisables dans les applications Next.js. Il intègre des fonctionnalités essentielles pour faire fonctionner Intlayer dans un environnement Next.js, telles que le middleware de traduction, le routage ou la configuration du fichier `next.config.js`.

### vue-intlayer

Le package `vue-intlayer` est utilisé pour interpréter les dictionnaires Intlayer et les rendre utilisables dans les applications Vue.

### nuxt-intlayer

Le package `nuxt-intlayer` est un module Nuxt permettant de rendre les dictionnaires Intlayer utilisables dans les applications Nuxt. Il intègre des fonctionnalités essentielles pour faire fonctionner Intlayer dans un environnement Nuxt, telles que le middleware de traduction, le routage ou la configuration du fichier `nuxt.config.js`.

### svelte-intlayer (WIP)

Le package `svelte-intlayer` est utilisé pour interpréter les dictionnaires Intlayer et les rendre utilisables dans les applications Svelte.

### solid-intlayer (WIP)

Le package `solid-intlayer` est utilisé pour interpréter les dictionnaires Intlayer et les rendre utilisables dans les applications Solid.js.

### preact-intlayer

Le package `preact-intlayer` est utilisé pour interpréter les dictionnaires Intlayer et les rendre utilisables dans les applications Preact.

### angular-intlayer (WIP)

Le package `angular-intlayer` est utilisé pour interpréter les dictionnaires Intlayer et les rendre utilisables dans les applications Angular.

### express-intlayer

Le package `express-intlayer` est utilisé pour utiliser Intlayer sur un backend Express.js.

### react-native-intlayer

Le package `react-native-intlayer` fournit des outils qui intègrent des plugins pour qu'Intlayer fonctionne avec le bundler Metro.

### lynx-intlayer

Le package `lynx-intlayer` fournit des outils qui intègrent des plugins pour qu'Intlayer fonctionne avec le bundler Lynx.

### vite-intlayer

Inclut le plugin Vite pour intégrer Intlayer avec le [bundler Vite](https://vite.dev/guide/why.html#why-bundle-for-production), ainsi que le middleware pour détecter la locale préférée de l'utilisateur, gérer les cookies et gérer la redirection des URL.

### react-scripts-intlayer

Inclut les commandes et plugins `react-scripts-intlayer` pour intégrer Intlayer dans les applications basées sur Create React App. Ces plugins sont basés sur [craco](https://craco.js.org/) et incluent une configuration supplémentaire pour le bundler [Webpack](https://webpack.js.org/).

### intlayer-editor

Le package `intlayer-editor` est utilisé pour permettre l'utilisation de l'éditeur visuel. Ce package, optionnel, peut être installé dans les applications et sera utilisé par le package `react-intlayer`.
Il se compose de deux parties : le serveur et le client.

Le client contient des éléments d'interface utilisateur qui seront utilisés par `react-intlayer`.

Le serveur, basé sur Express, est utilisé pour recevoir les requêtes de l'éditeur visuel et gérer ou modifier les fichiers de contenu.

### intlayer-cli

Le package `intlayer-cli` peut être utilisé pour générer des dictionnaires en utilisant la commande `npx intlayer dictionaries build`. Si `intlayer` est déjà installé, le CLI est automatiquement installé et ce package n'est pas nécessaire.

### @intlayer/core

Le package `@intlayer/core` est le package principal d'Intlayer. Il contient des fonctions de gestion de traduction et de dictionnaires. `@intlayer/core` est multiplateforme et est utilisé par d'autres packages pour effectuer l'interprétation des dictionnaires.

### @intlayer/config

Le package `@intlayer/config` est utilisé pour configurer les paramètres d'Intlayer, tels que les langues disponibles, les paramètres du middleware Next.js ou les paramètres de l'éditeur intégré.

### @intlayer/webpack

Le package `@intlayer/webpack` est utilisé pour fournir une configuration Webpack afin de faire fonctionner une application basée sur Webpack avec Intlayer. Le package fournit également un plugin à ajouter à une application Webpack existante.

### @intlayer/cli

Le package `@intlayer/cli` est un package NPM utilisé pour déclarer les scripts liés aux interfaces en ligne de commande d'Intlayer. Il garantit l'uniformité de toutes les commandes CLI d'Intlayer. Ce package est notamment consommé par les packages [intlayer-cli](https://github.com/aymericzip/intlayer/tree/main/docs/fr/packages/intlayer-cli/index.md) et [intlayer](https://github.com/aymericzip/intlayer/tree/main/docs/fr/packages/intlayer/index.md).

### @intlayer/mcp

Le package `@intlayer/mcp` fournit un serveur MCP (Model Context Protocol) qui offre une assistance IDE alimentée par l'IA, adaptée à l'écosystème Intlayer. Il charge automatiquement la documentation et s'intègre avec la CLI Intlayer.

### @intlayer/dictionaries-entry & @intlayer/unmerged-dictionaries-entry & @intlayer/dynamic-dictionaries-entry

Les packages `@intlayer/dictionaries-entry`, `@intlayer/unmerged-dictionaries-entry` et `@intlayer/dynamic-dictionaries-entry` renvoient le chemin d'entrée des dictionnaires Intlayer. Comme il est impossible de rechercher dans le système de fichiers depuis le navigateur, l'utilisation de bundlers tels que Webpack ou Rollup pour récupérer le chemin d'entrée des dictionnaires n'est pas possible. Ces packages sont conçus pour être aliasés, permettant une optimisation du bundling avec différents bundlers comme Vite, Webpack et Turbopack.

### @intlayer/chokidar

Le package `@intlayer/chokidar` est utilisé pour surveiller les fichiers de contenu et régénérer le dictionnaire modifié à chaque modification.

### @intlayer/editor

Le package `@intlayer/editor` fournit les utilitaires liés à l'éditeur de dictionnaires. Il inclut notamment l'API pour interfacer une application avec l'éditeur Intlayer, ainsi que des utilitaires pour manipuler les dictionnaires. Ce package est multiplateforme.

### @intlayer/editor-react

Le package `@intlayer/editor-react` fournit des états, contextes, hooks et composants pour interfacer une application React avec l'éditeur Intlayer.

### @intlayer/babel

Le package `@intlayer/babel` fournit des outils qui optimisent le bundling des dictionnaires pour les applications basées sur Vite et Webpack.

### @intlayer/swc

Le package `@intlayer/swc` fournit des outils qui optimisent le bundling des dictionnaires pour les applications Next.js.

### @intlayer/api

Le package `@intlayer/api` est un SDK API pour interagir avec le backend.

### @intlayer/design-system

Le package `@intlayer/design-system` est utilisé pour partager des éléments de design entre le CMS et l'éditeur visuel.

### @intlayer/backend

Le package `@intlayer/backend` exporte des types backend et proposera éventuellement le backend en tant que package autonome à l'avenir.

## Discutez avec notre documentation intelligente

- [Posez vos questions à notre documentation intelligente](https://intlayer.org/doc/chat)
