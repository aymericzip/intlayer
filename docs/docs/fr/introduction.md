---
createdAt: 2025-08-23
updatedAt: 2026-08-30
title: Introduction
description: Découvrez comment fonctionne Intlayer. Découvrez les étapes utilisées par Intlayer dans votre application. Découvrez ce que font les différents packages.
keywords:
  - Introduction
  - Commencer
  - Intlayer
  - Application
  - Packages
slugs:
  - doc
  - get-started
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "Historique initial"
author: aymericzip
---

# Documentation Intlayer

Bienvenue dans la documentation officielle d'Intlayer ! Ici, vous trouverez tout ce dont vous avez besoin pour intégrer, configurer et maîtriser Intlayer pour tous vos besoins en internationalisation (i18n), que vous travailliez avec Next.js, React, Vite, Express ou un autre environnement JavaScript.

## Introduction

### Qu'est-ce qu'Intlayer ?

**Intlayer** est une bibliothèque d'internationalisation conçue spécifiquement pour les développeurs JavaScript. Elle permet la déclaration de votre contenu partout dans votre code. Elle convertit les déclarations de contenu multilingue en dictionnaires structurés pour s'intégrer facilement dans votre code. Grâce à TypeScript, **Intlayer** rend votre développement plus robuste et plus efficace.

Intlayer fournit également un éditeur visuel optionnel qui vous permet de modifier et de gérer facilement votre contenu. Cet éditeur est particulièrement utile pour les développeurs qui préfèrent une interface visuelle pour la gestion de contenu, ou pour les équipes qui génèrent du contenu sans avoir à se soucier du code.

### Exemple d'utilisation

```bash
.
└── Components
    └── MyComponent
        ├── index.content.ts
        └── index.tsx
```

```tsx fileName="src/components/MyComponent/index.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const componentContent = {
  key: "component-key",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
  },
} satisfies Dictionary;

export default componentContent;
```

```json fileName="src/components/MyComponent/index.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "component-key",
  "content": {
    "myTranslatedContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Hello World",
        "fr": "Bonjour le monde",
        "es": "Hola Mundo"
      }
    }
  }
}
```

```tsx fileName="src/components/MyComponent/index.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

export const MyComponent: FC = () => {
  const { myTranslatedContent } = useIntlayer("component-key");

  return <span>{myTranslatedContent}</span>;
};
```

### Pourquoi Intlayer plutôt que des alternatives ?

Par rapport aux solutions principales telles que `next-intl` ou `i18next`, Intlayer est une solution dotée d'optimisations intégrées telles que :

<AccordionGroup>

<Accordion header="Taille du bundle">

Au lieu de charger de lourds fichiers JSON dans vos pages, ne chargez que le contenu strictement nécessaire. Intlayer vous aide à **réduire la taille de votre bundle et de vos pages jusqu'à 50 %**.

</Accordion>

<Accordion header="Maintenabilité">

Déclarer le contenu directement au plus près de vos composants **facilite la maintenance** des applications de grande envergure. Vous pouvez dupliquer ou supprimer le dossier d'une fonctionnalité sans le fardeau mental de devoir passer en revue toute votre base de code de contenu. De plus, Intlayer est **entièrement typé** pour garantir l'exactitude de vos traductions.

</Accordion>

<Accordion header="Agent IA">

La colocalisation du contenu **réduit le contexte nécessaire** aux grands modèles de langage (LLM). Intlayer est également livré avec une suite d'outils, tels qu'une **CLI** pour vérifier les traductions manquantes, un **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/lsp.md)**, un **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/mcp_server.md)** et des **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/agent_skills.md)**, afin de rendre l'expérience développeur (DX) encore plus fluide pour les agents IA.

</Accordion>

<Accordion header="Automatisation">

Automatisez les traductions dans votre pipeline CI/CD en utilisant le LLM de votre choix au coût de votre propre fournisseur d'IA. Intlayer propose également un **compilateur** pour automatiser l'extraction de contenu, ainsi qu'une [plateforme web](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_CMS.md) pour vous aider à **traduire en arrière-plan**.

</Accordion>

<Accordion header="Performances">

Associer de gros fichiers JSON à vos composants peut ralentir les performances et impacter la réactivité. Intlayer optimise le chargement du contenu directement au moment du **build**.

</Accordion>

<Accordion header="Collaboration avec les non-développeurs">

Bien plus qu'une simple solution i18n, Intlayer propose un **[éditeur visuel](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_visual_editor.md)** auto-hébergé et un **[CMS complet](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_CMS.md)** pour gérer votre contenu multilingue en **temps réel**. Cela rend la collaboration avec les traducteurs, concepteurs-rédacteurs et autres membres de l'équipe extrêmement simple. Le contenu peut être stocké localement et/ou à distance.

</Accordion>
</AccordionGroup>

## Caractéristiques principales

Intlayer propose une variété de fonctionnalités adaptées aux besoins du développement web moderne. Voici les fonctionnalités clés, avec des liens vers la documentation détaillée de chacune :

- **Support de l'internationalisation** : Améliorez la portée mondiale de votre application grâce à un support intégré de l'internationalisation.
- **Éditeur Visuel** : Améliorez votre flux de travail de développement avec des plugins d'éditeur conçus pour Intlayer. Consultez le [Guide de l'Éditeur Visuel](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_visual_editor.md).
- **Flexibilité de Configuration** : Personnalisez votre configuration avec des options détaillées dans le [Guide de Configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md).
- **Outils CLI Avancés** : Gérez vos projets efficacement à l'aide de l'interface en ligne de commande d'Intlayer. Explorez les capacités dans la [Documentation des outils CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/index.md).

## Concepts Clés

### Dictionnaire

Organisez votre contenu multilingue à proximité de votre code pour garder le tout cohérent et maintenable.

- **[Commencer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/content_file.md)**  
  Apprenez les bases de la déclaration de votre contenu dans Intlayer.

- **[Traduction](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/translation.md)**  
  Comprenez comment les traductions sont générées, stockées et utilisées dans votre application.

- **[Énumération](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/enumeration.md)**  
  Gérez facilement des ensembles de données répétés ou fixes dans différentes langues.

- **[Condition](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/condition.md)**  
  Apprenez à utiliser la logique conditionnelle dans Intlayer pour créer du contenu dynamique.

- **[Insertion](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/insertion.md)**  
  Découvrez comment insérer des valeurs dans une chaîne de caractères en utilisant des espaces réservés d'insertion.

- **[Récupération par Fonction](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/function_fetching.md)**  
  Découvrez comment récupérer dynamiquement du contenu avec une logique personnalisée pour correspondre au flux de travail de votre projet.

- **[Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/markdown.md)**  
  Apprenez à utiliser le Markdown dans Intlayer pour créer du contenu enrichi.

- **[Intégrations de fichiers](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/file.md)**  
  Découvrez comment intégrer des fichiers externes dans Intlayer pour les utiliser dans l'éditeur de contenu.

- **[Imbrication](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/nesting.md)**  
  Comprenez comment imbriquer du contenu dans Intlayer pour créer des structures complexes.

### Environnements & Intégrations

Nous avons conçu Intlayer avec la flexibilité à l'esprit, offrant une intégration fluide à travers les frameworks et outils de build populaires :

- **[Intlayer avec Next.js 16](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_nextjs_16.md)**
- **[Intlayer avec Next.js 15](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_nextjs_15.md)**
- **[Intlayer avec Next.js 14 (App Router)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_nextjs_14.md)**
- **[Intlayer avec Next.js Page Router](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_nextjs_page_router.md)**
- **[Intlayer avec React CRA](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_create_react_app.md)**
- **[Intlayer avec Vite + React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_vite+react.md)**
- **[Intlayer avec React Router v7](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_react_router_v7.md)**
- **[Intlayer avec Tanstack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_tanstack.md)**
- **[Intlayer avec React Native et Expo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_react_native+expo.md)**
- **[Intlayer avec Lynx et React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_lynx+react.md)**
- **[Intlayer avec Vite + Preact](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_vite+preact.md)**
- **[Intlayer avec Vite + Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_vite+vue.md)**
- **[Intlayer avec Nuxt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_nuxt.md)**
- **[Intlayer avec Vite + Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_vite+svelte.md)**
- **[Intlayer avec SvelteKit](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_svelte_kit.md)**
- **[Intlayer avec Express](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_express.md)**
- **[Intlayer avec NestJS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_nestjs.md)**
- **[Intlayer avec Hono](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_hono.md)**
- **[Intlayer avec Angular](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_angular_21.md)**

Chaque guide d'intégration comprend les meilleures pratiques pour utiliser les fonctionnalités d'Intlayer, telles que le **rendu côté serveur**, le **routage dynamique** ou le **rendu côté client**, afin de maintenir une application rapide, optimisée pour le référencement (SEO) et hautement scalable.

## Contribution & Retours

Nous apprécions la force de l'open-source et du développement axé sur la communauté. Si vous souhaitez proposer des améliorations, ajouter un nouveau guide ou corriger des problèmes dans nos documentations, n'hésitez pas à soumettre une Pull Request ou à ouvrir une issue sur notre [dépôt GitHub](https://github.com/aymericzip/intlayer/blob/main/docs/docs).

**Prêt à traduire votre application plus rapidement et plus efficacement ?** Plongez dans nos documentations pour commencer à utiliser Intlayer dès aujourd'hui. Découvrez une approche robuste et simplifiée de l'internationalisation qui maintient votre contenu organisé et votre équipe plus productive.

## Questions fréquentes

<FAQ>

<Question title="À quoi sert Intlayer ?">

Intlayer est une bibliothèque d'internationalisation (i18n) pour les applications JavaScript et TypeScript. Vous déclarez le contenu d'un composant à côté de ce composant dans un fichier `.content.ts`, Intlayer compile ces déclarations en dictionnaires typés au moment du build, et vos composants les lisent via un hook tel que `useIntlayer`. Elle couvre la traduction, les règles de pluriel, le genre, le Markdown, le routage sensible à la locale, les métadonnées SEO, la traduction assistée par IA et un éditeur visuel pour les non-développeurs.

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

<Question title="Quelles sont les différentes solutions pour internationaliser une application JavaScript ?">

Le domaine se divise en trois générations :

- **Bibliothèques à catalogue d'exécution** : `i18next`, `react-i18next`, `next-i18next`, `vue-i18n`, `ngx-translate`. Les messages vivent dans des espaces de noms JSON chargés à l'exécution. Matures et indépendantes du framework, mais non typées et livrées en entier.
- **Bibliothèques à messages compilés** : `Lingui`, `Paraglide`, `react-intl` et `next-intl` avec une étape d'extraction. Meilleur comportement de bundle et un peu de typage, mais toujours des catalogues centralisés.
- **Bibliothèques à couche de contenu** : `Intlayer`. Le contenu est déclaré par composant et compilé par composant, si bien que le typage, le tree shaking, l'outillage et l'édition proviennent de la même source.

Voir [pourquoi Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/interest_of_intlayer.md) pour la comparaison détaillée, et le [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/benchmark/index.md) pour les chiffres mesurés de bundle et de performance.

</Question>

<Question title="Quels frameworks Intlayer prend-il en charge ?">

React, Next.js, Vite, TanStack Start, React Router, Vue, Nuxt, Svelte, SvelteKit, Angular, Solid, Preact, Lit, Astro avec tous les frameworks d'îlots, React Native avec Expo, Lynx, et côté serveur Express, Fastify, NestJS, Hono, Elysia et AdonisJS. Chacun a son propre guide sous [environnements](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/introduction.md).

</Question>

<Question title="Pourquoi déclarer le contenu à côté du composant plutôt que dans un fichier JSON central ?">

Trois raisons. Une page ne livre que les entrées que ses composants affichent, au lieu d'un espace de noms entier, ce qui est ce qui réduit la taille du bundle. Un dossier de fonctionnalité peut être copié ou supprimé d'un seul bloc, sans fouiller un catalogue partagé à la recherche de clés orphelines. Et un LLM ou un agent qui modifie un composant voit son contenu dans le même dossier, ce qui est pourquoi la co-localisation rend le travail assisté par IA fiable. Voir [comment fonctionne Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/how_works_intlayer.md).

</Question>

<Question title="Comment traduire mon application automatiquement avec l'IA ?">

Lancez `npx intlayer fill`. La CLI détecte les traductions manquantes et les remplit avec le LLM de votre choix, en utilisant votre propre fournisseur et votre clé d'API, si bien que vous payez le fournisseur d'IA directement. `--git-diff` limite l'exécution au contenu modifié sur la branche, ce qui la garde peu coûteuse en CI. Voir la [commande fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/fill.md) et l'[intégration CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/CI_CD.md).

</Question>

<Question title="Comment trouver les traductions manquantes ?">

Lancez `npx intlayer test`. Il échoue lorsqu'une locale déclarée manque de contenu, si bien qu'une chaîne non traduite n'atteint jamais la production. L'[extension VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/vs_code_extension.md) affiche les mêmes erreurs en ligne, et le [plugin ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/eslint.md) signale les chaînes codées en dur avec sa règle `no-raw-text`. Voir [tester votre contenu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/testing.md).

</Question>

<Question title="Dois-je mettre la locale dans l'URL ?">

Non. `routing.mode` accepte `"prefix-no-default"` (la valeur par défaut, `/about` et `/fr/about`), `"prefix-all"`, `"no-prefix"` et `"search-params"`, et `routing.domains` associe chaque locale à son propre domaine. Quel que soit le schéma, `getMultilingualUrls` construit les alternates `hreflang` pour vos métadonnées et votre sitemap. Voir la [référence de configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md).

</Question>

<Question title="Comment les traducteurs et les éditeurs de contenu peuvent-ils travailler sans toucher au code ?">

L'[éditeur visuel](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_visual_editor.md) tourne sur votre propre infrastructure et permet à quiconque de cliquer sur le texte de votre application en cours d'exécution pour le modifier, en réécrivant le changement dans la base de code. Le [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_CMS.md) externalise le contenu afin qu'il puisse changer sans déploiement, avec la [synchronisation en direct](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/live.md) qui applique les mises à jour à l'exécution.

</Question>

<Question title="Intlayer est-il gratuit et open source ?">

Oui. Intlayer est open source sous licence Apache 2.0, et la bibliothèque, la CLI, le compilateur et l'éditeur visuel sont gratuits à utiliser, projets commerciaux inclus. Le CMS hébergé est un service payant optionnel, et il peut aussi être [auto-hébergé](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/self_hosting.md).

</Question>

</FAQ>
