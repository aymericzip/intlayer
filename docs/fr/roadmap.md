# Intlayer : Vue d'ensemble des fonctionnalités et feuille de route

Intlayer est une solution de gestion de contenu et d'internationalisation conçue pour simplifier la déclaration, la gestion et la mise à jour du contenu dans vos applications. Elle offre des fonctionnalités puissantes telles que la déclaration de contenu centralisée ou distribuée, des options d'internationalisation étendues, la prise en charge de Markdown, le rendu conditionnel, l'intégration TypeScript/JavaScript/JSON, et bien plus encore. Voici une vue d'ensemble complète des fonctionnalités actuelles d'Intlayer, suivie des fonctionnalités prévues dans la feuille de route.

---

## Fonctionnalités actuelles

### 1. Déclaration de contenu

#### Centralisée ou distribuée

- **Centralisée** : Déclarez tout votre contenu dans un seul fichier volumineux à la base de votre application, similaire à i18next, pour tout gérer en un seul endroit.
- **Distribuée** : Alternativement, divisez votre contenu en fichiers séparés au niveau des composants ou des fonctionnalités pour une meilleure maintenabilité. Cela garde votre contenu proche du code pertinent (composants, tests, Storybook, etc.). La suppression d'un composant garantit que tout contenu associé est également supprimé, évitant ainsi les données résiduelles qui encombrent votre base de code.

> Ressources :
>
> - [Déclaration de contenu](https://github.com/aymericzip/intlayer/blob/main/docs/fr/dictionary/get_started.md)

### 2. Internationalisation

- Prise en charge de **230 langues et locales** (y compris les variantes régionales comme le français (France), l'anglais (Canada), l'anglais (Royaume-Uni), le portugais (Portugal), etc.).
- Gérez facilement les traductions pour toutes ces locales à partir d'un seul endroit.

> Ressources :
>
> - [Internationalisation](https://github.com/aymericzip/intlayer/blob/main/docs/fr/dictionary/translation.md)

### 3. Prise en charge de Markdown

- Déclarez du contenu en utilisant **Markdown**, vous permettant de formater automatiquement le texte avec des paragraphes, des titres, des liens, et plus encore.
- Idéal pour les articles de blog, les articles, les pages de documentation ou tout scénario nécessitant un formatage de texte enrichi.

> Ressources :
>
> - [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/fr/dictionary/markdown.md)

### 4. Rendu conditionnel

- Définissez du contenu qui s'adapte en fonction de conditions spécifiques, telles que la langue de l'utilisateur, le statut de connexion de l'utilisateur ou toute autre variable liée au contexte.
- Aide à personnaliser les expériences sans dupliquer le contenu dans plusieurs fichiers.

> Ressources :
>
> - [Rendu conditionnel](https://github.com/aymericzip/intlayer/blob/main/docs/fr/dictionary/condition.md)

### 5. Formats de déclaration de contenu

Intlayer prend en charge **TypeScript** (également JavaScript) et **JSON** pour la déclaration de contenu.

- **TypeScript** :

  - Garantit que la structure de votre contenu est correcte et qu'aucune traduction ne manque.
  - Offre des modes de validation stricts ou plus flexibles.
  - Permet la récupération dynamique de données à partir de variables, fonctions ou API externes.

- **JSON** :

  - Facilite l'intégration avec des outils externes (comme les éditeurs visuels) grâce à son format standardisé.

  > Ressources :
  >
  > - [Formats de déclaration de contenu](https://github.com/aymericzip/intlayer/blob/main/docs/fr/dictionary/content_extention_customization.md)

---

## Intégration avec les frameworks et environnements

### 1. Next.js

#### a. Composants serveur et client

- Fournit une **approche unifiée de gestion de contenu** pour les composants serveur et client.
- Offre un contexte intégré pour les composants serveur, simplifiant l'implémentation par rapport à d'autres solutions.

#### b. Métadonnées, sitemaps et robots.txt

- Récupérez et injectez dynamiquement du contenu pour générer des métadonnées, des sitemaps ou des fichiers `robots.txt`.

#### c. Middleware

- Ajoutez un middleware pour **rediriger les utilisateurs** vers le contenu basé sur leur langue préférée.

#### d. Compatibilité Turbopack et Webpack

- Entièrement compatible avec le nouveau Turbopack de Next.js ainsi qu'avec le Webpack traditionnel.

> Ressources :
>
> - [Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_with_nextjs_15.md)

### 2. Vite

- Similaire à Next.js, vous pouvez intégrer Intlayer avec Vite et utiliser un **middleware** pour rediriger les utilisateurs vers le contenu basé sur leur langue préférée.

> Ressources :
>
> - [Vite](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_with_vite+react.md)

### 3. Express

- Gérez le contenu et internationalisez les services backend construits sur Express.
- Personnalisez les emails, messages d'erreur, notifications push, et plus encore avec du texte localisé.

> Ressources :
>
> - [Express](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_with_express.md)

---

## Éditeurs visuels et CMS

### 1. Éditeur visuel local

- Un **éditeur visuel local gratuit** qui vous permet de modifier le contenu de votre application en sélectionnant directement les éléments sur la page.
- Intègre des fonctionnalités d'IA pour :
  - Générer ou corriger des traductions
  - Vérifier la syntaxe et l'orthographe
  - Suggérer des améliorations
- Peut être hébergé localement ou déployé sur un serveur distant.

> Ressources :
>
> - [Éditeur visuel](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_visual_editor.md)

### 2. IntLayer CMS (à distance)

- Une solution de **CMS hébergée** qui vous permet de gérer le contenu de l'application en ligne, sans toucher à votre base de code.
- Fournit des fonctionnalités assistées par IA pour déclarer du contenu, gérer des traductions et corriger des erreurs de syntaxe ou d'orthographe.
- Interagissez avec votre contenu via l'interface de votre application en direct.

> Ressources :
>
> - [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_CMS.md)

---

## IntLayer CLI

- **Audit et génération de traductions** : Effectuez des audits sur vos fichiers de contenu pour générer des traductions manquantes ou identifier celles inutilisées.
- **Interaction à distance** : Publiez votre contenu local sur le CMS distant ou récupérez le contenu distant pour l'intégrer dans votre application locale.
- Utile pour les **pipelines CI/CD**, garantissant que votre contenu est toujours synchronisé avec votre code.

> Ressources :
>
> - [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_cli.md)

---

## Environnements

- Utilisez des **variables d'environnement** pour configurer Intlayer différemment selon les environnements de production, de test et locaux.
- Définissez quel éditeur visuel ou projet CMS distant cibler en fonction de votre environnement.

---

## Mises à jour de contenu à chaud

- En utilisant des dictionnaires distants et le CMS Intlayer, vous pouvez **mettre à jour le contenu de votre application à la volée**, sans avoir besoin de redéployer.

> Ressources :
>
> - [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_CMS.md)

---

# Feuille de route : Fonctionnalités à venir

### 1. Tests A/B et personnalisation

- **Tests multivariés** : Testez différentes versions d'un contenu donné pour voir laquelle fonctionne le mieux (par exemple, taux de clics plus élevé).
- **Personnalisation basée sur les données** : Affichez différents contenus en fonction des données démographiques des utilisateurs (sexe, âge, localisation, etc.) ou d'autres comportements.
- **Itération automatisée** : Permettez à l'IA de tester automatiquement plusieurs versions et de choisir la meilleure ou de recommander des options pour approbation par un administrateur.

### 2. Gestion des versions

- Restaurez les versions précédentes de votre contenu grâce à la **gestion des versions de contenu**.
- Suivez les modifications au fil du temps et revenez à des états antérieurs si nécessaire.

### 3. Traduction automatique

- Pour les utilisateurs du CMS distant, **génération de traductions en un clic** pour toute langue prise en charge.
- Le système générera les traductions en arrière-plan, puis vous invitera à les valider ou les modifier.

### 4. Améliorations SEO

- Outils pour **analyser les mots-clés**, l'intention de recherche des utilisateurs et les tendances émergentes.
- Suggérez du contenu amélioré pour de meilleurs classements et suivez les performances à long terme.

### 5. Compatibilité avec plus de frameworks

- Des efforts sont en cours pour prendre en charge **Vite, Angular, React Native**, et plus encore.
- Objectif : rendre Intlayer compatible avec **toute application alimentée par JavaScript**.

### 6. Extensions IDE

- Extensions pour les principaux IDE afin de fournir une **interface graphique** pour gérer les traductions locales et distantes.
- Les fonctionnalités pourraient inclure la génération automatique de fichiers de déclaration de contenu pour les composants, l'intégration directe avec le CMS Intlayer et la validation en temps réel.

---

## Conclusion

Intlayer vise à être une solution tout-en-un pour la gestion de contenu et l'internationalisation. Il se concentre sur la flexibilité (fichiers centralisés ou distribués), le support linguistique étendu, une intégration facile avec les frameworks et bundlers modernes, et des fonctionnalités puissantes assistées par l'IA. Avec l'arrivée de nouvelles capacités telles que les tests A/B, la gestion des versions et les traductions automatisées, Intlayer continuera de simplifier les flux de travail de contenu et d'améliorer les expériences utilisateur sur différentes plateformes.

Restez à l'écoute pour les prochaines versions et n'hésitez pas à explorer les fonctionnalités existantes pour voir comment Intlayer peut vous aider à centraliser et optimiser vos processus de gestion de contenu dès aujourd'hui !
