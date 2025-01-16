# Comment Intlayer Fonctionne

## Aperçu

Le rôle d'Intlayer est d'interpréter les fichiers de déclaration de contenu JavaScript en dictionnaires.

Pour cela, Intlayer passe par plusieurs étapes :

1. Déclaration des fichiers de contenu

   - Les fichiers de contenu peuvent être définis dans différents formats, tels que TypeScript, ECMAScript, CommonJS, ou JSON.
   - Les fichiers de contenu peuvent être définis partout dans le projet, ce qui permet une meilleure maintenance et une évolutivité. Il est important de respecter les conventions d'extension de fichier pour les fichiers de contenu. Cette extension est par défaut `*.content.{js|cjs|mjs|ts|tsx|json}`, mais elle peut être modifiée dans le [fichier de configuration](https://github.com/aymericzip/intlayer/blob/main/docs/fr/configuration.md).

2. Génération de dictionnaires

   - Les dictionnaires sont générés à partir des fichiers de contenu. Par défaut, les dictionnaires intlayer sont générés dans le répertoire `.intlayer/dictionary` du projet.
   - Deux types de dictionnaires peuvent être générés : les dictionnaires intlayer et les dictionnaires i18n (bêta).

3. Génération des types de dictionnaires

   - Les types de dictionnaires sont générés à partir des dictionnaires intlayer. Par défaut, les types de dictionnaires intlayer sont générés dans le répertoire `types` du projet.

4. Génération de l'augmentation du module Intlayer

   - L'[augmentation de module Intlayer](https://www.typescriptlang.org/docs/handbook/declaration-merging.html) est une fonctionnalité TypeScript qui vous permet de définir des types supplémentaires pour Intlayer. Cela facilite l'expérience de développement en suggérant les arguments disponibles ou les arguments requis.
     Parmi les types générés, les types de dictionnaires intlayer ou même les types de configuration de langue sont ajoutés au fichier `types/intlayer.d.ts`, et utilisés par d'autres packages. Pour ce faire, il est nécessaire que le fichier `tsconfig.json` soit configuré pour inclure le répertoire `types` du projet.

5. Surveillance des fichiers de contenu

   - Les fichiers de contenu sont surveillés pour être régénérés chaque fois qu'ils sont modifiés.

6. Interprétation des dictionnaires
   - Les dictionnaires sont finalement interprétés pour être utilisés dans les applications.

## Packages

Intlayer est composé de plusieurs packages, chacun ayant un rôle spécifique dans le processus de traduction. Voici une représentation graphique de la structure de ce package :

![packages of intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/packages_dependency_graph.svg)

### intlayer

Le package `intlayer` est utilisé dans les applications pour déclarer le contenu dans les fichiers de contenu.

### react-intlayer

Le package `react-intlayer` est utilisé pour interpréter les dictionnaires intlayer et les rendre utilisables dans les applications React.

### next-intlayer

Le package `next-intlayer` est utilisé en tant que couche au-dessus de `react-intlayer` pour rendre les dictionnaires intlayer utilisables dans les applications Next.js. Il intègre des fonctionnalités essentielles pour faire fonctionner Intlayer dans un environnement Next.js, telles que le middleware de traduction, le routage, ou la configuration du fichier `next.config.js`.

### vite-intlayer

Inclut le plugin Vite pour intégrer Intlayer avec le [bundler Vite](https://vite.dev/guide/why.html#why-bundle-for-production), ainsi que le middleware pour détecter la langue préférée de l'utilisateur, gérer les cookies, et gérer la redirection d'URL.

### react-scripts-intlayer

Inclut les commandes et plugins `react-scripts-intlayer` pour intégrer Intlayer avec l'application basée sur Create React App. Ces plugins sont basés sur [craco](https://craco.js.org/) et incluent une configuration supplémentaire pour le bundler [Webpack](https://webpack.js.org/).

### intlayer-editor

Le package `intlayer-editor` est utilisé pour permettre l'utilisation de l'éditeur visuel. Ce package, optionnel peut être installé dans les applications et sera utilisé par le package `react-intlayer`.
Il se compose de deux parties : le serveur et le client.

Le client contient des éléments UI qui seront utilisés par `react-intlayer`.

Le serveur, basé sur Express, est utilisé pour recevoir les requêtes visuelles de l'éditeur et gérer ou modifier les fichiers de contenu.

### intlayer-cli

Le package `intlayer-cli` peut être utilisé pour générer des dictionnaires en utilisant la commande `npx intlayer build`. Si `intlayer` est déjà installé, le cli est automatiquement installé et ce package n'est pas nécessaire.

### @intlayer/core

Le package `@intlayer/core` est le package principal d'Intlayer. Il contient des fonctions de gestion de traduction et de dictionnaire. `@intlayer/core` est multiplateforme et est utilisé par d'autres packages pour effectuer l'interprétation des dictionnaires.

### @intlayer/config

Le package `@intlayer/config` est utilisé pour configurer les paramètres d'Intlayer, tels que les langues disponibles, les paramètres de middleware Next.js ou la configuration de l'éditeur intégré.

### @intlayer/webpack

Le package `@intlayer/webpack` est utilisé pour fournir une configuration Webpack afin de faire fonctionner une application basée sur Webpack avec Intlayer. Le package fournit également un plugin à ajouter dans une application Webpack existante.

### @intlayer/cli

Le package `@intlayer/cli` est un package NPM qui est utilisé pour déclarer le script lié aux interfaces de ligne de commande d'intlayer. Il assure l'uniformité des commandes CLI d'intlayer. Ce package est notamment consommé par le package [intlayer-cli](https://github.com/aymericzip/intlayer/tree/main/docs/fr/packages/intlayer-cli/index.md), et le package [intlayer](https://github.com/aymericzip/intlayer/tree/main/docs/fr/packages/intlayer/index.md).

### @intlayer/dictionaries-entry

Le package `@intlayer/dictionaries-entry` est un package qui ne renvoie que le chemin d'entrée des dictionnaires intlayer. Puisque la recherche dans le système de fichiers est impossible depuis le navigateur, l'utilisation de bundlers comme Webpack ou Rollup pour récupérer le chemin d'entrée des dictionnaires n'est pas possible. Ce package vise à être aliased.

### @intlayer/chokidar

Le package `@intlayer/chokidar` est utilisé pour surveiller les fichiers de contenu et régénérer le dictionnaire modifié à chaque modification.

## Discutez avec notre documentation intelligente

- [Posez vos questions à notre documentation intelligente](https://intlayer.org/docs/chat)
