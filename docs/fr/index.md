# Documentation Intlayer

Bienvenue dans la documentation officielle **Intlayer** ! Ici, vous trouverez tout ce dont vous avez besoin pour intégrer, configurer et maîtriser Intlayer pour tous vos besoins en matière d'internationalisation (i18n), que vous travailliez avec **Next.js**, **React**, **Vite**, **Express** ou un autre environnement JavaScript.

Intlayer offre une approche flexible et moderne pour traduire votre application. Nos documents vous guideront de l'installation et de la configuration aux fonctionnalités avancées telles que la **traduction assistée par IA**, les définitions **TypeScript** et la prise en charge des **composants serveur**, vous permettant de créer une expérience multilingue fluide.

---

## Premiers Pas

- **[Introduction](https://github.com/aymericzip/intlayer/blob/main/docs/fr/introduction.md)**  
  Obtenez une vue d'ensemble du fonctionnement d'Intlayer, de ses fonctionnalités principales et découvrez pourquoi c'est une révolution pour l'i18n.

- **[Comment fonctionne Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/fr/how_works_intlayer.md)**  
  Plongez dans la conception architecturale et découvrez comment Intlayer gère tout, de la déclaration de contenu à la livraison des traductions.

- **[Configuration](https://github.com/aymericzip/intlayer/blob/main/docs/fr/configuration.md)**  
  Personnalisez Intlayer pour répondre aux besoins de votre projet. Explorez les options de middleware, les structures de répertoires et les paramètres avancés.

- **[CLI Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_cli.md)**  
  Gérez le contenu et les traductions à l'aide de notre outil en ligne de commande. Découvrez comment pousser et récupérer du contenu, automatiser les traductions, et plus encore.

- **[Éditeur Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_visual_editor.md)**  
  Simplifiez la collaboration avec les non-développeurs et alimentez vos traductions avec l'IA, directement dans notre CMS gratuit et intuitif.

---

## Concepts de Base

### Dictionnaire

Organisez votre contenu multilingue près de votre code pour tout garder cohérent et facile à maintenir.

- **[Commencer](https://github.com/aymericzip/intlayer/blob/main/docs/fr/dictionary/get_started.md)**  
  Apprenez les bases de la déclaration de votre contenu dans Intlayer.

- **[Traduction](https://github.com/aymericzip/intlayer/blob/main/docs/fr/dictionary/translation.md)**  
  Comprenez comment les traductions sont générées, stockées et utilisées dans votre application.

- **[Énumération](https://github.com/aymericzip/intlayer/blob/main/docs/fr/dictionary/enumeration.md)**  
  Gérez facilement des ensembles de données répétés ou fixes dans diverses langues.

- **[Récupération par Fonction](https://github.com/aymericzip/intlayer/blob/main/docs/fr/dictionary/function_fetching.md)**  
  Découvrez comment récupérer dynamiquement du contenu avec une logique personnalisée adaptée au flux de travail de votre projet.

---

## Environnements et Intégrations

Nous avons conçu Intlayer avec flexibilité à l'esprit, offrant une intégration fluide avec les frameworks et outils de construction populaires :

- **[Intlayer avec Next.js 15](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_with_nextjs_15.md)**
- **[Intlayer avec Next.js 14 (App Router)](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_with_nextjs_14.md)**
- **[Intlayer avec Next.js Page Router](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_with_nextjs_page_router.md)**
- **[Intlayer avec React CRA](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_with_create_react_app.md)**
- **[Intlayer avec Vite + React](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_with_vite+react.md)**
- **[Intlayer avec Express](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_with_express.md)**

Chaque guide d'intégration inclut les meilleures pratiques pour utiliser les fonctionnalités d'Intlayer, comme le **rendu côté serveur**, le **routage dynamique** ou le **rendu côté client**, afin que vous puissiez maintenir une application rapide, optimisée pour le SEO et hautement évolutive.

---

## Packages

Le design modulaire d'Intlayer propose des packages dédiés pour des environnements et besoins spécifiques :

### `intlayer`

Fonctions utilitaires principales pour configurer et gérer votre configuration i18n.

- **[getConfiguration](https://github.com/aymericzip/intlayer/blob/main/docs/fr/packages/intlayer/getConfiguration.md)**
- **[getHTMLTextDir](https://github.com/aymericzip/intlayer/blob/main/docs/fr/packages/intlayer/getHTMLTextDir.md)**
- **[getLocaleLang](https://github.com/aymericzip/intlayer/blob/main/docs/fr/packages/intlayer/getLocaleLang.md)**
- **[getLocaleName](https://github.com/aymericzip/intlayer/blob/main/docs/fr/packages/intlayer/getLocaleName.md)**
- **[getLocalizedUrl](https://github.com/aymericzip/intlayer/blob/main/docs/fr/packages/intlayer/getLocalizedUrl.md)**
- **[getMultilingualUrls](https://github.com/aymericzip/intlayer/blob/main/docs/fr/packages/intlayer/getMultilingualUrls.md)**
- **[getPathWithoutLocale](https://github.com/aymericzip/intlayer/blob/main/docs/fr/packages/intlayer/getPathWithoutLocale.md)**
- **[getTranslation](https://github.com/aymericzip/intlayer/blob/main/docs/fr/packages/intlayer/getTranslation.md)**
- **[getEnumeration](https://github.com/aymericzip/intlayer/blob/main/docs/fr/packages/intlayer/getEnumeration.md)**

### `express-intlayer`

Exploitez Intlayer dans des applications basées sur **Express** :

- **[t](https://github.com/aymericzip/intlayer/blob/main/docs/fr/packages/express-intlayer/t.md)**  
  Un assistant de traduction minimaliste et simple pour vos routes et vues serveur.

### `react-intlayer`

Améliorez vos applications **React** avec des hooks puissants :

- **[t](https://github.com/aymericzip/intlayer/blob/main/docs/fr/packages/react-intlayer/t.md)**
- **[useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/fr/packages/react-intlayer/useIntlayer.md)**
- **[useDictionary](https://github.com/aymericzip/intlayer/blob/main/docs/fr/packages/react-intlayer/useDictionary.md)**
- **[useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/fr/packages/react-intlayer/useLocale.md)**

### `next-intlayer`

Intégrez facilement avec **Next.js** :

- **[t](https://github.com/aymericzip/intlayer/blob/main/docs/fr/packages/next-intlayer/t.md)**
- **[useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/fr/packages/next-intlayer/useIntlayer.md)**
- **[useDictionary](https://github.com/aymericzip/intlayer/blob/main/docs/fr/packages/next-intlayer/useDictionary.md)**
- **[useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/fr/packages/next-intlayer/useLocale.md)**

---

## Ressources Supplémentaires

- **[Blog : Intlayer et i18next](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_with_i18next.md)**  
  Découvrez comment Intlayer complète et se compare à la bibliothèque populaire **i18next**.

- **[Tutoriel en direct sur YouTube](https://youtu.be/W2G7KxuSD4c?si=GyU_KpVhr61razRw)**  
  Regardez une démonstration complète et apprenez à intégrer Intlayer en temps réel.

---

## Contribution et Retours

Nous valorisons la puissance de l'open-source et du développement communautaire. Si vous souhaitez proposer des améliorations, ajouter un nouveau guide ou corriger des problèmes dans nos documents, n'hésitez pas à soumettre une Pull Request ou à ouvrir une issue sur notre [dépôt GitHub](https://github.com/aymericzip/intlayer/blob/main/docs).

**Prêt à traduire votre application plus rapidement et efficacement ?** Plongez dans nos documents pour commencer à utiliser Intlayer dès aujourd'hui. Découvrez une approche robuste et simplifiée de l'internationalisation qui garde votre contenu organisé et votre équipe plus productive.
