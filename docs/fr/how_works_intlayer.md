# Comment fonctionne Intlayer

## Vue d'ensemble

Le rôle d'Intlayer est d'interpréter les fichiers de déclaration de contenu JavaScript en dictionnaires.

Pour cela, Intlayer passe par plusieurs étapes :

1. Déclaration des fichiers de contenu

   - Les fichiers de contenu peuvent être définis dans divers formats, tels que TypeScript, ECMAScript, CommonJS ou JSON.
   - Les fichiers de contenu peuvent être définis partout dans le projet, ce qui permet une meilleure maintenance et évolutivité. Il est important de respecter les conventions d'extension de fichier pour les fichiers de contenu. Cette extension est par défaut `*.content.{js|cjs|mjs|ts|tsx|json}`, mais elle peut être modifiée dans le [fichier de configuration](https://github.com/aymericzip/intlayer/blob/main/docs/fr/configuration.md).

2. Génération de dictionnaires

   - Les dictionnaires sont générés à partir des fichiers de contenu. Par défaut, les dictionnaires intlayer sont générés dans le répertoire `.intlayer/dictionary` du projet.
   - Deux types de dictionnaires peuvent être générés : les dictionnaires intlayer et les dictionnaires i18n (bêta).

3. Génération de types de dictionnaire

   - Les types de dictionnaire sont générés à partir des dictionnaires intlayer. Par défaut, les types de dictionnaire intlayer sont générés dans le répertoire `types` du projet.

4. Génération de l'augmentation du module Intlayer

   - L'[augmentation de module Intlayer](https://www.typescriptlang.org/docs/handbook/declaration-merging.html) est une fonctionnalité TypeScript qui permet de définir des types supplémentaires pour Intlayer. Cela facilite l'expérience de développement en suggérant des arguments disponibles ou des arguments requis.
     Parmi les types générés, les types de dictionnaire intlayer ou même les types de configuration de langue sont ajoutés au fichier `types/intlayer.d.ts` et utilisés par d'autres paquets. Pour ce faire, il est nécessaire que le fichier `tsconfig.json` soit configuré pour inclure le répertoire `types` du projet.

5. Surveillance des fichiers de contenu

   - Les fichiers de contenu sont surveillés pour être régénérés chaque fois qu'ils sont modifiés.

6. Interprétation des dictionnaires
   - Les dictionnaires sont enfin interprétés pour être utilisés dans les applications.

## Paquets

Intlayer est composé de plusieurs paquets, chacun ayant un rôle spécifique dans le processus de traduction. Voici une représentation graphique de la structure de ce paquet :

![packages of intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/packages_dependency_graph.svg)

### intlayer

Le paquet `intlayer` est utilisé dans les applications pour déclarer du contenu dans des fichiers de contenu.

### react-intlayer

Le paquet `react-intlayer` est utilisé pour interpréter les dictionnaires intlayer et les rendre utilisables dans les applications React.

### next-intlayer

Le paquet `next-intlayer` est utilisé comme une couche au-dessus de `react-intlayer` pour rendre les dictionnaires intlayer utilisables dans les applications Next.js. Il intègre des fonctionnalités essentielles pour faire fonctionner Intlayer dans un environnement Next.js, telles que le middleware de traduction, le routage ou la configuration du fichier `next.config.js`.

### intlayer-editor

Le paquet `intlayer-editor` est utilisé pour permettre l'utilisation de l'éditeur visuel. Ce paquet, optionnel, peut être installé dans les applications et sera utilisé par le paquet `react-intlayer`.
Il se compose de deux parties : le serveur et le client.

Le client contient des éléments UI qui seront utilisés par `react-intlayer`.

Le serveur, basé sur Express, est utilisé pour recevoir les requêtes visuelles de l'éditeur et gérer ou modifier les fichiers de contenu.

### intlayer-cli

Le paquet `intlayer-cli` peut être utilisé pour générer des dictionnaires en utilisant la commande `npx intlayer build`. Si `intlayer` est déjà installé, le cli est automatiquement installé et ce paquet n'est pas nécessaire.

### @intlayer/core

Le paquet `@intlayer/core` est le paquet maître d'Intlayer. Il contient des fonctions de gestion de traduction et de dictionnaire. `@intlayer/core` est multiplateforme et est utilisé par d'autres paquets pour effectuer l'interprétation des dictionnaires.

### @intlayer/config

Le paquet `@intlayer/config` est utilisé pour configurer les paramètres d'Intlayer, tels que les langues disponibles, les paramètres du middleware Next.js ou les paramètres de l'éditeur intégré.

### @intlayer/webpack

Le paquet `@intlayer/webpack` est utilisé pour ajouter des plugins de compilation à Next.js et React.

### @intlayer/cli

Le paquet `@intlayer/cli` est utilisé pour assurer l'uniformité de toutes les commandes CLI d'intlayer.

### @intlayer/dictionaries-entry

Le paquet `@intlayer/dictionaries-entry` est un paquet qui retourne uniquement le chemin d'entrée des dictionnaires intlayer. Étant donné que la recherche par système de fichiers est impossible depuis le navigateur, l'utilisation de bundlers comme Webpack ou Rollup pour récupérer le chemin d'entrée des dictionnaires n'est pas possible. Ce paquet vise à être aliasé.

### @intlayer/chokidar

Le paquet `@intlayer/chokidar` est utilisé pour surveiller les fichiers de contenu et régénérer le dictionnaire modifié à chaque modification.
