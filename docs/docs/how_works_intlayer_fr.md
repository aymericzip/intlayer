# Comment fonctionne Intlayer

## Présentation

Le role global de intlayer est d'interpreter les fichiers de déclaration de contenu JavaScript pour les rendre utilisables dans des applications.

Pour cela intlayer procède à plusieurs étapes :

1. Déclaration des fichiers de déclaration de contenu

   - Les fichiers de déclaration de contenu peuvent être définis dans différents formats, tels que TypeScript, ECMAScript, CommonJS, ou JSON.
   - Les fichiers de déclaration de contenu peuvent être définis nimporte ou dans le projet, ce qui permet une meilleure gestion de la maintenance et de la scalabilité. Il est important de respecter la conventions d'extension pour les fichiers de déclaration de contenu. Cette extension est par default `*.content.{js|cjs|mjs|ts|tsx|json}`, mais elle peut être modifiée dans le [fichier de configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/configuration_fr.md).

2. Génération des dictionnaires

   - Les dictionnaires sont générés à partir des fichiers de déclaration de contenu. Par défaut, les dictionnaires intlayer sont générés dans le répertoire `.intlayer/dictionary` du projet.
   - Deux types de dictionnaires peuvent être générés : les dictionnaires intlayer et les dictionnaires i18n (beta).

3. Génération des types des dictionnaires

   - Les types des dictionnaires sont générés à partir des dictionnaires intlayer. Par défaut, les types des dictionnaires intlayer sont générés dans le répertoire `.intlayer/types` du projet.

4. Génération des modules d'augmentation d'Intlayer

   - Les [modules d'augmentation](https://www.typescriptlang.org/docs/handbook/declaration-merging.html) sont une fonctionalié de TypeScript permettent de définir des types supplémentaires pour intlayer. Cela facilite l'expérience de dévelopment en autosuggérant les arguments d'un object disponibles ou requis.
     Parmi les types générés, les type des dictionnaires intlayer ou encore les langues configuéres sont ajoutés dans le fichier `types/intlayer.d.ts`, et utilisés par les autres packages. Pour cela, il est nécessaire que le fichier `tsconfig.json` soit configuré pour inclure le répertoire `.intlayer/types` du projet.

5. Surveillance des fichiers de déclaration de contenu

   - Les fichiers de déclaration de contenu sont surveillés pour être régénérés à chaque modification.

6. Interpretation des dictionnaires
   - Les dictionnaires sont enfin interprétés pour être utilisés dans les applications.

## Packages

Intlayer est composé de plusieurs packages, chacun ayant un rôle spécifique dans le processus de traduction. Voici une représentation graphique de la structure de ce paquet :

![paquets de intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/packages_dependency_graph.svg)

### intlayer

Le package `intlayer` est le package utlisé dans les applications pour déclarer le contenu dans les fichiers de déclaration de contenu.

### react-intlayer

Le package `react-intlayer` est utilisé pour interpreter les dictionnaires génerés par Intlayer et les rendre utilisables dans les applications React.

### next-intlayer

Le package `next-intlayer` est utilisé comme surcouche au package `react-intlayer` pour rendre les dictionnaires génerés par Intlayer utilisables dans les applications Next.js. Il intègre égelement les fonctionnalités essentielles pour faire fonctionner Intlayer dans un environnement Next.js, tel que le middleware de traduction, le routage, ou la configuration du fichier `next.config.js`.

### intlayer-editor

Le package `intlayer-editor` est utilisé pour permettre l'utilisation de l'éditeur visuel. Ce packages, optionnel peut être intallé dans les applications et sera utilisé par le package `react-intlayer`.
Il se compose de deux parties : le serveur et le client.

La partie client contient les éléments UI qui seront utilisés par `react-intlayer`.

Le serveur, basé sur Express, est utilisé pour recevoir les requêtes de l'éditeur visuel et gérer ou modifier les fichiers de déclaration de contenu.

### intlayer-cli

Le package `intlayer-cli` peut être utilisé pour générer des dictionnaires à l'aide de la commande `npx intlayer build`. Si `intlayer` est déjà installé, le paquet de la CLI est automatiquement installé et ce paquet n'est pas nécessaire.

### @intlayer/core

Le package `@intlayer/core` est le package maitre Intlayer. Il contient les fonctions de traduction et de gestion des dictionnaires. `@intlayer/core` est multiplatformes et est utilisé par les autres packages pour effectuer les opérations d'interprétation des dictionnaires.

### @intlayer/config

Le package `@intlayer/config` est utilisé pour configurer les paramètres de Intlayer, tels que les langues disponibles, les paramètres du Next.js middleware ou les paramètres de l'éditeur intégré.

### @intlayer/webpack

Le package `@intlayer/webpack` est utilisé pour ajouter les plugins de compilation à Next.js et React.

### @intlayer/cli

Le package `@intlayer/cli` est utilisé pour garantir l'uniformité des commandes CLI de tous les packages intlayer.

### @intlayer/dictionaries-entry

Le package `@intlayer/dictionaries-entry` est un package qui ne retourne que le chemin de l'entrée des dictionnaires générés par intlayer. Etant donné que la recherche dans le filesystem est impossible depuis le navigateur, d'utliser la function d'alias de bundlers comme Webpack, ou Rollup pour récupérer le chemin de l'entrée des dictionnaires. Ce package vise donc à être aliasé.

### @intlayer/chokidar

Le package `@intlayer/chokidar` est utilisé pour surveiller les fichiers de déclaration de contenu et regéner le dictionnaire modifié à chaque modification.
