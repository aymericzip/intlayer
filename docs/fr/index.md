# Intlayer Documentation

Bienvenue dans la documentation officielle de **Intlayer** ! Ici, vous trouverez tout ce dont vous avez besoin pour intégrer, configurer et maîtriser Intlayer pour tous vos besoins en internationalisation (i18n) — que vous travailliez avec **Next.js**, **React**, **Vite**, **Express**, ou un autre environnement JavaScript.

Intlayer offre une approche flexible et moderne pour traduire votre application. Nos docs vous guideront depuis l'installation et la configuration jusqu'aux fonctionnalités avancées telles que **la traduction alimentée par l'IA**, **les définitions TypeScript**, et **le support des composants serveur** — vous permettant de créer une expérience multilingue, fluide et sans couture.

---

## Getting Started

- **[Introduction](https://github.com/aymericzip/intlayer/blob/main/docs/fr/introduction.md)**  
  Obtenez un aperçu de la façon dont Intlayer fonctionne, ses fonctionnalités clés et pourquoi il s'agit d'une révolution pour l'i18n.

- **[How Intlayer Works](https://github.com/aymericzip/intlayer/blob/main/docs/fr/how_works_intlayer.md)**  
  Plongez dans la conception architecturale et découvrez comment Intlayer gère tout, de la déclaration de contenu à la livraison des traductions.

- **[Configuration](https://github.com/aymericzip/intlayer/blob/main/docs/fr/configuration.md)**  
  Personnalisez Intlayer pour répondre aux besoins de votre projet. Explorez les options de middleware, les structures de répertoire, et les paramètres avancés.

- **[Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_cli.md)**  
  Gérez le contenu et les traductions à l'aide de notre outil en ligne de commande. Découvrez comment pousser et tirer du contenu, automatiser les traductions, et plus encore.

- **[Intlayer Editor](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_editor.md)**  
  Simplifiez la collaboration avec les non-développeurs et dynamisez vos traductions avec l'IA — directement dans notre CMS intuitif et gratuit.

---

## Core Concepts

### Content Declaration

Organisez votre contenu multilingue près de votre code pour garder tout cohérent et maintenable.

- **[Get Started](https://github.com/aymericzip/intlayer/blob/main/docs/fr/content_declaration/get_started.md)**  
  Apprenez les bases de la déclaration de votre contenu dans Intlayer.

- **[Translation](https://github.com/aymericzip/intlayer/blob/main/docs/fr/content_declaration/translation.md)**  
  Comprenez comment les traductions sont générées, stockées et utilisées dans votre application.

- **[Enumeration](https://github.com/aymericzip/intlayer/blob/main/docs/fr/content_declaration/enumeration.md)**  
  Gérez facilement les ensembles de données répétés ou fixes dans différentes langues.

- **[Function Fetching](https://github.com/aymericzip/intlayer/blob/main/docs/fr/content_declaration/function_fetching.md)**  
  Découvrez comment récupérer dynamiquement du contenu avec une logique personnalisée pour correspondre au flux de travail de votre projet.

---

## Environments & Integrations

Nous avons construit Intlayer avec flexibilité à l'esprit, offrant une intégration sans couture à travers des frameworks et outils de construction populaires :

- **[Intlayer with Next.js 15](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_with_nextjs_15.md)**
- **[Intlayer with Next.js 14 (App Router)](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_with_nextjs_14.md)**
- **[Intlayer with Next.js Page Router](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_with_nextjs_page_router.md)**
- **[Intlayer with React CRA](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_with_create_react_app.md)**
- **[Intlayer with Vite + React](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_with_vite+react.md)**
- **[Intlayer with Express](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_with_express.md)**

Chaque guide d'intégration comprend les meilleures pratiques pour utiliser les fonctionnalités d'Intlayer — telles que **le rendu côté serveur**, **le routage dynamique**, ou **le rendu côté client** — pour que vous puissiez maintenir une application rapide, adaptée au SEO, et hautement évolutive.

---

## Packages

Le design modulaire d'Intlayer offre des packages dédiés pour des environnements et des besoins spécifiques :

### `intlayer`

Fonctions utilitaires principales pour configurer et gérer votre configuration i18n.

- **[getConfiguration](https://github.com/aymericzip/intlayer/blob/main/docs/fr/packages/intlayer/getConfiguration.md)**
- **[getHTMLTextDir](https://github.com/aymericzip/intlayer/blob/main/docs/fr/packages/intlayer/getHTMLTextDir.md)**
- **[getLocaleLang](https://github.com/aymericzip/intlayer/blob/main/docs/fr/packages/intlayer/getLocaleLang.md)**
- **[getLocaleName](https://github.com/aymericzip/intlayer/blob/main/docs/fr/packages/intlayer/getLocaleName.md)**
- **[getLocalizedUrl](https://github.com/aymericzip/intlayer/blob/main/docs/fr/packages/intlayer/getLocalizedUrl.md)**
- **[getMultilingualUrls](https://github.com/aymericzip/intlayer/blob/main/docs/fr/packages/intlayer/getMultilingualUrls.md)**
- **[getPathWithoutLocale](https://github.com/aymericzip/intlayer/blob/main/docs/fr/packages/intlayer/getPathWithoutLocale.md)**
- **[getTranslationContent](https://github.com/aymericzip/intlayer/blob/main/docs/fr/packages/intlayer/getTranslationContent.md)**
- **[getEnumerationContent](https://github.com/aymericzip/intlayer/blob/main/docs/fr/packages/intlayer/getEnumerationContent.md)**

### `express-intlayer`

Exploitez Intlayer dans des applications basées sur **Express** :

- **[t](https://github.com/aymericzip/intlayer/blob/main/docs/fr/packages/express-intlayer/t.md)**  
  Un helper de traduction minimal et simple pour vos routes et vues serveur.

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

## Additional Resources

- **[Blog: Intlayer and i18next](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_with_i18next.md)**  
  Découvrez comment Intlayer complète et se compare à la bibliothèque populaire **i18next**.

- **[Live Tutorial on YouTube](https://youtu.be/W2G7KxuSD4c?si=GyU_KpVhr61razRw)**  
  Regardez une démo complète et apprenez à intégrer Intlayer en temps réel.

---

## Contributing & Feedback

Nous valorisons la puissance de l'open-source et le développement communautaire. Si vous souhaitez proposer des améliorations, ajouter un nouveau guide, ou corriger des problèmes dans notre documentation, n'hésitez pas à soumettre une Pull Request ou à ouvrir un problème sur notre [dépôt GitHub](https://github.com/aymericzip/intlayer/blob/main/docs).

**Prêt à traduire votre application plus rapidement et plus efficacement ?** Plongez dans nos docs pour commencer à utiliser Intlayer dès aujourd'hui. Découvrez une approche robuste et rationalisée de l'internationalisation qui garde votre contenu organisé et votre équipe plus productive.

Bonnes traductions !  
— L'équipe Intlayer
