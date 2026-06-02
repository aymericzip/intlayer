---
createdAt: 2025-08-23
updatedAt: 2025-08-23
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
