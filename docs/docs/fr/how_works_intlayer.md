---
createdAt: 2024-08-12
updatedAt: 2026-08-29
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
    changes: "Historique initial"
author: aymericzip
---

# Comment Intlayer fonctionne

## Table des matières

<TOC/>

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

> Pour voir toutes les fonctionnalités d'Intlayer, vous pouvez lire la [documentation des dictionnaires](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/content_file.md).

## Contenu distant

Intlayer vous permet de déclarer du contenu localement, puis de l'exporter vers le CMS pour le rendre éditable par votre équipe non technique.

Ainsi, vous pourrez pousser et tirer du contenu depuis le CMS vers votre application, de manière similaire à ce que vous faites avec Git pour votre code.

Pour les dictionnaires externalisés utilisant le CMS, Intlayer effectue une opération de récupération basique pour obtenir les dictionnaires distants et les fusionne avec vos dictionnaires locaux. Si configuré sur votre projet, Intlayer gérera automatiquement la récupération du contenu depuis le CMS au démarrage de l'application (dev) ou lors de la construction (prod).

## Éditeur visuel

Intlayer fournit également un éditeur visuel pour vous permettre d'éditer votre contenu de manière visuelle. Cet [éditeur visuel](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_visual_editor.md) est disponible dans le package externe `intlayer-editor`.

![éditeur visuel](https://github.com/aymericzip/intlayer/blob/main/docs/assets/visual_editor.gif?raw=true)

- Le serveur est une simple application Express qui écoute les requêtes du client et récupère le contenu de votre application, tels que les `dictionaries` et la configuration pour les rendre accessibles côté client.
- D'autre part, le client est une application React qui est utilisée pour interagir avec votre contenu via une interface visuelle.

- Le serveur est une simple application Express qui écoute les requêtes du client et récupère le contenu de votre application, tels que les `dictionaries` et la configuration pour le rendre accessible côté client.
- D'autre part, le client est une application React utilisée pour interagir avec votre contenu via une interface visuelle.
  Lorsque vous appelez votre contenu en utilisant `useIntlayer` et que l'éditeur est activé, il enveloppe automatiquement vos chaînes avec un objet Proxy nommé `IntlayerNode`. Ce nœud utilise `window.postMessage` pour communiquer avec un iframe encapsulé contenant l'interface de l'éditeur visuel.  
  Du côté de l'éditeur, celui-ci écoute ces messages et simule une interaction réelle avec votre contenu, vous permettant d'éditer le texte directement dans le contexte de votre application.

## Optimisation de la construction de l'application

Pour optimiser la taille du bundle de votre application, Intlayer fournit deux plugins pour optimiser la construction de votre application : les plugins `@intlayer/babel` et `@intlayer/swc`.
Les plugins Babel et SWC fonctionnent en analysant l'arbre de syntaxe abstraite (AST) de votre application pour remplacer les appels aux fonctions Intlayer par du code optimisé. Ce processus rend votre bundle final plus léger en production en s'assurant que seuls les dictionnaires réellement utilisés sont importés, optimisant ainsi le découpage des chunks et réduisant la taille du bundle.

Les plugins Babel et SWC fonctionnent en analysant l'Abstract Syntax Tree (AST) de votre application pour remplacer les appels des fonctions Intlayer par du code optimisé. Ce processus rend votre bundle final plus léger en production en garantissant que seuls les dictionnaires réellement utilisés sont importés, en optimisant le chunking et en réduisant la taille du bundle.

En mode développement, Intlayer utilise une importation statique centralisée pour les dictionnaires afin de simplifier l'expérience de développement.

En activant l'option `importMode = "dynamic"` dans la configuration `dictionary` de la [configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md), Intlayer utilisera l'importation dynamique pour charger les dictionnaires. Cette option est désactivée par défaut pour éviter le traitement asynchrone lors du rendu de l'application.

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

### svelte-intlayer

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

### @intlayer/engine

Le package `@intlayer/engine` est utilisé pour surveiller les fichiers de contenu et régénérer le dictionnaire modifié à chaque modification.

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

## Questions fréquentes

<FAQ>

<Question title="Quand les dictionnaires sont-ils construits, au moment du build ou à l'exécution ?">

Au moment du build. Le plugin du bundler, ou `npx intlayer build`, analyse vos fichiers `.content.ts`, les résout en dictionnaires dans le dossier `.intlayer`, et génère les types TypeScript correspondants. À l'exécution, vos composants ne font que lire le résultat, si bien qu'aucune analyse ni chargement de fichier ne se produit sur le chemin de la requête.

</Question>

<Question title="Quel poids l'i18n ajoute-t-elle à la taille de mon bundle ?">

Bien moins qu'une configuration basée sur des espaces de noms, car une page ne télécharge jamais un catalogue qu'elle n'affiche pas. Le balisage rendu côté serveur résout son contenu sur le serveur, et le compilateur au moment du build remplace les appels `useIntlayer` par les entrées de dictionnaire exactes qu'un composant utilise, si bien que les clés inutilisées et les langues inutilisées sont éliminées. Les [dictionnaires dynamiques](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dynamic_dictionaries/index.md) répartissent le reste par locale. Mesuré face aux alternatives habituelles, Intlayer réduit la taille du bundle et des pages jusqu'à 50 %. Voir l'[optimisation du bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/bundle_optimization.md) et le [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/benchmark/index.md).

</Question>

<Question title="Puis-je migrer depuis `i18next`, `next-intl` ou `react-i18next` sans réécrire mes composants ?">

Oui, et il existe deux voies. Vous pouvez migrer le contenu progressivement avec le [guide de migration i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/migration_from_i18next_to_intlayer.md) ou le [guide de migration next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/migration_from_next-intl_to_intlayer.md). Ou vous pouvez conserver entièrement votre API actuelle : les [adaptateurs de compatibilité](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/compat/index.md) exposent exactement la même API que `i18next`, `react-i18next`, `next-intl`, `next-i18next`, `react-intl`, `use-intl`, `vue-i18n` et `Lingui`, mais servie par des dictionnaires Intlayer : seuls les imports changent, pas le code des composants.

</Question>

<Question title="Puis-je conserver mes fichiers de traduction JSON existants ?">

Oui. Le [plugin de synchronisation JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/plugins/sync-json.md) conserve vos fichiers `/messages/{locale}/{namespace}.json` comme source de vérité et génère les dictionnaires Intlayer à partir d'eux, dans les deux sens. Un [plugin de synchronisation PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/plugins/sync-po.md) fait de même pour les catalogues gettext, et les [fichiers par locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/per_locale_file.md) permettent de séparer le contenu par langue au lieu de regrouper les locales dans un seul fichier.

</Question>

<Question title="Dois-je déplacer mon contenu clé par clé ?">

Non. Lancez `npx intlayer extract` et Intlayer lit vos fichiers source, en extrait les chaînes destinées aux utilisateurs et écrit un fichier `.content` à côté de chacun, de sorte que vous relisez un diff plutôt que de copier des chaînes dans un catalogue une par une. Voir la [commande extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/extract.md).

Pour un pipeline entièrement automatisé, le [compilateur Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/compiler.md) fait la même chose au moment du build sur du code source JSX, TSX, Vue et Svelte, en générant les dictionnaires à chaque changement, de sorte qu'il n'y a aucune clé à maintenir à la main. Il fonctionne par analyse statique : les chaînes qui n'existent qu'à l'exécution restent hors de portée, et il a besoin de quelques annotations pour distinguer le texte destiné aux utilisateurs de la logique applicative.

</Question>

<Question title="Quels outils d'éditeur et d'agent IA sont disponibles ?">

Cinq éléments, tous optionnels :

- **[Extension VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/vs_code_extension.md)** : passez d'une clé `useIntlayer` au fichier de contenu qui la déclare, extrayez du contenu depuis un composant, et lancez build, fill, test, push et pull depuis la palette de commandes ou un onglet Intlayer dédié.
- **[Serveur LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/lsp.md)** : la même connaissance dans tout éditeur qui parle LSP, avec aller à la définition, rechercher toutes les références, aperçus au survol d'une valeur traduite, autocomplétion des clés et des champs, et un avertissement lorsqu'une clé n'est déclarée nulle part. Il résout aussi les appels `i18next`, `react-i18next`, `next-intl` et `use-intl`, ce qui aide pendant la migration.
- **[Serveur MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/mcp_server.md)** : expose la documentation et la CLI d'Intlayer à Cursor, VS Code, Claude Desktop, Claude Code et ChatGPT, afin qu'un assistant réponde à partir de la documentation actuelle au lieu de deviner, et puisse exécuter lui-même des commandes telles que `intlayer fill`.
- **[Compétences d'agent](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/agent_skills.md)** : des compétences ciblées telles que `intlayer-config`, `intlayer-cli` et `intlayer-content`, plus une par framework, qui apprennent à un agent votre configuration de routage et les types de nœuds de contenu.
- **[Plugin ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/eslint.md)** : `no-raw-text` signale les chaînes codées en dur, avec d'autres règles pour les clés de dictionnaire statiques et le contenu inutilisé.

</Question>

<Question title="Qu'est-ce que le dossier .intlayer et dois-je le versionner ?">

C'est la sortie générée : les dictionnaires compilés et les types générés. Il est dérivé de vos fichiers de contenu, il doit donc figurer dans `.gitignore` et être reconstruit par votre étape de build, exactement comme un dossier `dist`.

</Question>

<Question title="Comment la locale active est-elle déterminée ?">

À partir des sources listées dans `routing.storage`, dans l'ordre : le préfixe d'URL lorsque `routing.mode` en utilise un, puis un cookie, puis l'en-tête `Accept-Language`, puis votre locale par défaut. Une locale que l'utilisateur choisit explicitement est persistée, elle survit donc à la visite suivante. Voir la [référence de configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md).

</Question>

<Question title="Quelle est la différence entre les dictionnaires locaux et distants ?">

Un dictionnaire local est déclaré dans votre base de code et compilé avec votre application. Un dictionnaire distant est géré dans le [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_CMS.md) et résolu à l'exécution, il peut donc changer sans déploiement. Les deux sont lus via les mêmes hooks, et le contenu distant se replie sur la déclaration locale lorsqu'il est indisponible.

</Question>

<Question title="Intlayer fonctionne-t-il sans TypeScript ?">

Oui. Les fichiers de contenu peuvent être écrits en TypeScript, JavaScript, ESM, CommonJS ou JSON. C'est TypeScript qui débloque les types générés et l'autocomplétion, c'est donc la configuration recommandée, mais elle n'est pas obligatoire.

</Question>

<Question title="Comment le rendu serveur et le rendu client partagent-ils le même contenu ?">

Le serveur résout directement le contenu des composants rendus côté serveur, si bien qu'aucun dictionnaire n'est envoyé au client pour ce balisage. Les composants client lisent les mêmes dictionnaires via le provider, qui reçoit la locale résolue sur le serveur, si bien que le premier rendu client correspond au HTML du serveur et n'affiche pas brièvement une autre langue.

</Question>

<Question title="Comment Intlayer évite-t-il une incohérence d'hydratation sur la locale ?">

La locale est résolue une seule fois sur le serveur et transmise au provider, plutôt que d'être à nouveau détectée dans le navigateur. Comme le client part de la même locale que celle rendue par le serveur, le balisage correspond, ce qui est justement ce qui casse habituellement avec la détection de locale côté client.

</Question>

<Question title="Dois-je reconstruire lorsque j'ajoute une traduction ?">

En développement, non : le plugin surveille vos fichiers de contenu et reconstruit les dictionnaires affectés à l'enregistrement. En production, les dictionnaires font partie du build, sauf si le contenu est distant, auquel cas le [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_CMS.md) et la [synchronisation en direct](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/live.md) appliquent le changement sans déploiement.

</Question>

</FAQ>
