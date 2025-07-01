---
docName: roadmap
url: https://intlayer.org/doc/roadmap
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/roadmap.md
createdAt: 2025-03-01
updatedAt: 2025-06-29
title: Feuille de route
description: Découvrez la feuille de route d'Intlayer. Voyez toutes les fonctionnalités qu'Intlayer a mises en œuvre et prévoit d'implémenter.
keywords:
  - Feuille de route
  - Intlayer
  - Internationalisation
  - CMS
  - Système de gestion de contenu
  - Éditeur visuel
---

# Intlayer : Aperçu des fonctionnalités & Feuille de route

Intlayer est une solution de gestion de contenu et d'internationalisation conçue pour simplifier la manière dont vous déclarez, gérez et mettez à jour le contenu dans vos applications. Elle offre des fonctionnalités puissantes telles que la déclaration de contenu centralisée ou distribuée, de nombreuses options d'internationalisation, la prise en charge de Markdown, le rendu conditionnel, l'intégration TypeScript/JavaScript/JSON, et bien plus encore. Voici un aperçu complet de ce qu'Intlayer propose actuellement, suivi des fonctionnalités à venir dans la feuille de route.

---

## Fonctionnalités actuelles

### 1. Déclaration de contenu

#### Centralisée ou distribuée

- **Centralisée** : Déclarez tout votre contenu dans un seul et grand fichier à la racine de votre application, similaire à i18next, afin de pouvoir tout gérer en un seul endroit.
- **Distribué** : Vous pouvez également diviser votre contenu en fichiers séparés au niveau des composants ou des fonctionnalités pour une meilleure maintenabilité. Cela permet de garder votre contenu proche du code pertinent (composants, tests, Storybook, etc.). La suppression d’un composant garantit également la suppression de tout contenu associé, évitant ainsi que des données résiduelles encombrent votre base de code.

> Ressources :
>
> - [Déclaration de contenu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/get_started.md)

### 2. Internationalisation

- Prise en charge de **230 langues et locales** (y compris les variantes régionales comme le français (France), l’anglais (Canada), l’anglais (Royaume-Uni), le portugais (Portugal), etc.).
- Gérez facilement les traductions pour toutes ces locales depuis un seul endroit.

> Ressources :
>
> - [Internationalisation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/translation.md)

### 3. Support Markdown

- Déclarez du contenu en utilisant **Markdown**, ce qui vous permet de formater automatiquement le texte avec des paragraphes, des titres, des liens, et plus encore.
- Idéal pour les articles de blog, les articles, les pages de documentation ou tout scénario nécessitant une mise en forme riche du texte.

> Ressources :
>
> - [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/markdown.md)

### 4. Support des fichiers externes

- Importez du contenu depuis des fichiers externes au format texte, tels que TXT, HTML, JSON, YAML ou CSV.
- Utilisez la fonction `file` dans Intlayer pour intégrer le contenu de fichiers externes dans un dictionnaire, assurant une intégration fluide avec l’éditeur visuel Intlayer et le CMS.
- Prend en charge les mises à jour dynamiques du contenu, ce qui signifie que lorsque le fichier source est modifié, le contenu se met à jour automatiquement dans Intlayer.
- Permet la gestion multilingue du contenu en liant dynamiquement des fichiers Markdown spécifiques à chaque langue.

> Ressources :
>
> - [Intégration de contenu de fichier](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/file.md)

### 5. Contenu dynamique et récupération de fonctions

Intlayer propose diverses méthodes pour insérer et gérer du contenu dynamique, garantissant flexibilité et adaptabilité dans la diffusion du contenu. Cela inclut des fonctions pour l'insertion de contenu dynamique, le rendu conditionnel, l'énumération, l'imbrication et la récupération de fonctions.

1. Insertion de contenu dynamique

   Utilisez la fonction insert pour définir du contenu avec des espaces réservés ({{name}}, {{age}}, etc.).

   Permet un contenu de type modèle qui s’adapte en fonction des entrées utilisateur, des réponses d’API ou d’autres sources de données dynamiques.

   Fonctionne parfaitement avec les configurations TypeScript, ESM, CommonJS et JSON.

   S’intègre facilement avec React Intlayer et Next Intlayer en utilisant useIntlayer.

2. Rendu Conditionnel

   Définissez un contenu qui s’adapte en fonction des conditions spécifiques à l’utilisateur, telles que la langue ou le statut d’authentification.

   Personnalisez les expériences sans dupliquer le contenu dans plusieurs fichiers.

3. Énumération & Pluriel

   Utilisez la fonction enu pour définir des variations de contenu basées sur des valeurs numériques, des plages ou des clés personnalisées.

   Assure la sélection automatique de la phrase correcte en fonction d’une valeur donnée.

   Prend en charge les règles d’ordre, garantissant un comportement prévisible.

4. Imbrication et Référencement de Sous-Contenu

   Utilisez la fonction nest pour référencer et réutiliser du contenu provenant d’un autre dictionnaire, réduisant ainsi la duplication.

   Prend en charge une gestion de contenu structurée et hiérarchique pour une meilleure maintenabilité.

5. Récupération par Fonction

   Intlayer permet de déclarer le contenu sous forme de fonctions, autorisant à la fois la récupération de contenu synchrone et asynchrone.

   Fonctions synchrones : Le contenu est généré dynamiquement au moment de la compilation.

   Fonctions asynchrones : Récupèrent des données depuis des sources externes (par exemple, API, bases de données) de manière dynamique.

   Intégration : Fonctionne avec TypeScript, ESM et CommonJS mais n’est pas supporté dans les fichiers JSON ou les fichiers de contenu distants.

### 6. Formats de Déclaration de Contenu

Intlayer supporte **TypeScript** (ainsi que JavaScript) et **JSON** pour la déclaration du contenu.

- **TypeScript** :

  - Assure que la structure de votre contenu est correcte et qu'aucune traduction n'est manquante.
  - Offre des modes de validation stricts ou plus flexibles.
  - Permet la récupération dynamique de données à partir de variables, fonctions ou API externes.

- **JSON** :

  - Facilite l'intégration avec des outils externes (comme les éditeurs visuels) grâce à son format standardisé.

  > Ressources :
  >
  > - [Formats de déclaration de contenu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/content_extention_customization.md)

### 7. Purge, optimisation du bundle et imports dynamiques

- Intlayer intègre des plugins `Babel` et `SWC` pour optimiser votre bundle et améliorer les performances. Il remplace les imports, permettant d'importer uniquement les dictionnaires utilisés dans le bundle.
- En activant cette option, Intlayer permet également d'importer dynamiquement le contenu du dictionnaire uniquement pour la locale courante.

> Ressources :
>
> - [Configuration de la construction](https://intlayer.org/doc/concept/configuration#build-configuration)

---

## Intégration avec les Frameworks & Environnements

### 1. Next.js

#### a. Composants Serveur et Client

- Fournit une **approche unifiée de gestion de contenu** pour les composants serveur et client.
- Offre un contexte intégré pour les composants serveur, simplifiant la mise en œuvre par rapport à d'autres solutions.

#### b. Métadonnées, Sitemaps et robots.txt

- Récupère et injecte dynamiquement le contenu pour générer des métadonnées, des sitemaps ou des fichiers `robots.txt`.

#### c. Middleware

- Ajoute un middleware pour **rediriger les utilisateurs** vers le contenu en fonction de leur langue préférée.

#### d. Compatibilité Turbopack et Webpack

- Entièrement compatible avec le nouveau Turbopack de Next.js ainsi qu'avec Webpack traditionnel.

> Ressources :
>
> - [Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_nextjs_15.md)

### 2. Vite

- Comme avec Next.js, vous pouvez intégrer Intlayer avec Vite et utiliser un **middleware** pour rediriger les utilisateurs vers le contenu selon leur langue préférée.

> Ressources :
>
> - [Vite](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_vite+react.md)

### 3. Express

- Gérez le contenu et internationalisez les services backend construits avec Express.
- Personnalisez les emails, messages d'erreur, notifications push, et plus encore avec du texte localisé.

> Ressources :
>
> - [Express](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_express.md)

### 4. React Native

- Intégrez Intlayer avec React Native pour gérer le contenu et internationaliser vos applications mobiles.
- Prend en charge les plateformes iOS et Android.

> Ressources :
>
> - [React Native](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_react_native.md)

### 5. Lynx

- Intégrez Intlayer avec Lynx pour gérer le contenu et internationaliser vos applications mobiles.
- Prend en charge les plateformes iOS et Android.

> Ressources :
>
> - [Lynx](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_lynx.md)

### 6. Vue

- Intégrez Intlayer avec Vue pour gérer le contenu et internationaliser vos applications Vite / Vue.js.

> Ressources :
>
> - [Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_vue.md)

### 7. Nuxt

- Intégrez Intlayer avec Nuxt pour gérer le contenu et internationaliser vos applications Nuxt / Vue.js.
- Prend en charge les composants serveur et client.
- Intègre le routage et les middlewares pour rediriger les utilisateurs vers le contenu selon leur langue préférée.

> Ressources :
>
> - [Nuxt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_nuxt.md)

### 8. Preact

- Intégrez Intlayer avec Preact pour gérer le contenu et internationaliser vos applications Preact.

> Ressources :
>
> - [Preact](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_preact.md)

---

## Éditeurs Visuels et CMS

### 1. Éditeur Visuel Local

- Un **éditeur visuel local gratuit** qui vous permet de modifier le contenu de votre application en sélectionnant directement les éléments sur la page.
- Intègre des fonctionnalités d'IA pour aider à :
  - Générer ou corriger des traductions
  - Vérifier la syntaxe et l'orthographe
  - Suggérer des améliorations
- Peut être hébergé localement ou déployé sur un serveur distant.

> Ressources :
>
> - [Éditeur Visuel](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_visual_editor.md)

### 2. Intlayer CMS (à distance)

- Une solution de **CMS hébergée** qui vous permet de gérer le contenu de l'application en ligne, sans toucher à votre base de code.
- Offre des fonctionnalités assistées par IA pour déclarer le contenu, gérer les traductions et corriger les erreurs de syntaxe ou d'orthographe.
- Interagissez avec votre contenu via l'interface de votre application en direct.

> Ressources :
>
> - [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_CMS.md)

---

## Extensions IDE

- Extensions pour les principaux IDE offrant une **interface graphique** pour gérer les traductions locales et distantes.
- Les fonctionnalités peuvent inclure la génération automatique de fichiers de déclaration de contenu pour les composants, l’intégration directe avec le CMS Intlayer, et la validation en temps réel.

---

## Serveur MCP

- Un **serveur MCP** qui vous permet de gérer votre contenu et vos traductions via un outil intégré dans votre IDE.

---

## Intlayer CLI

- **Traduction et génération de fichiers** : Effectuez des audits sur vos fichiers de contenu pour générer les traductions manquantes et vérifier les incohérences.
- **Interaction distante** : Poussez votre contenu local vers le CMS distant ou récupérez le contenu distant pour l’intégrer dans votre application locale.
- **Traduction et révision de documents** : Traduisez et révisez votre documentation / vos fichiers, etc.

> Ressources :
>
> - [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_cli.md)

---

## Environnements

- Utilisez des **variables d’environnement** pour configurer Intlayer différemment selon les environnements de production, de test et locaux.
- Définissez quel éditeur visuel ou projet CMS distant cibler en fonction de votre environnement.

---

## Mises à jour dynamiques du contenu

- Lors de l’utilisation de dictionnaires distants et du CMS Intlayer, vous pouvez **mettre à jour le contenu de votre application à la volée**, sans avoir besoin de redéployer.

> Ressources :
>
> - [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_CMS.md)

---

## Fonctionnalités à venir

### 1. Tests A/B & Personnalisation

- **Test multivarié** : Testez différentes versions d’un contenu donné pour voir laquelle performe le mieux (par exemple, un taux de clic plus élevé).
- **Personnalisation basée sur les données** : Affichez différents contenus en fonction des données démographiques des utilisateurs (sexe, âge, localisation, etc.) ou d’autres comportements.
- **Itération automatisée** : Permettez à l’IA de tester automatiquement plusieurs versions et de choisir la meilleure ou de recommander des options pour approbation par l’administrateur.

### 2. Gestion des versions

- Restaurez les versions précédentes de votre contenu grâce à la **gestion des versions de contenu**.
- Suivez les modifications au fil du temps et revenez à des états antérieurs si nécessaire.

### 3. Traduction automatique

- Pour les utilisateurs du CMS à distance, **génération de traduction en un clic** pour toute langue prise en charge.
- Le système générerait les traductions en arrière-plan puis vous inviterait à les valider ou à les modifier.

### 4. Améliorations SEO

- Outils pour **analyser les mots-clés**, l'intention de recherche des utilisateurs et les tendances émergentes.
- Suggérer un contenu amélioré pour un meilleur classement, et suivre la performance à long terme.

### 5. Compatibilité avec Plus de Frameworks

- Des efforts sont en cours pour supporter **Solid, Svelte, Angular**, et d'autres.
- L'objectif est de rendre Intlayer compatible avec **toute application propulsée par JavaScript**.

---

## Conclusion

Intlayer vise à être une solution tout-en-un pour la gestion de contenu et l'internationalisation. Il met l'accent sur la flexibilité (fichiers centralisés ou distribués), un large support linguistique, une intégration facile avec les frameworks et bundlers modernes, ainsi que des fonctionnalités puissantes pilotées par l'IA. À mesure que de nouvelles capacités, telles que les tests A/B, la gestion des versions et les traductions automatisées, seront disponibles, Intlayer continuera de simplifier les flux de travail de contenu et d'améliorer l'expérience utilisateur sur différentes plateformes.

Restez à l'écoute des prochaines versions, et n'hésitez pas à explorer les fonctionnalités existantes pour voir comment Intlayer peut vous aider à centraliser et optimiser vos processus de gestion de contenu dès aujourd'hui !

---

## Historique de la documentation

- 5.5.10 - 2025-06-30 : Ajout du support Preact et Nuxt, serveur MCP, mise à jour du CLI
- 5.5.10 - 2025-06-29 : Historique initial
