---
docName: introduction
url: https://intlayer.org/doc/get-started
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/introduction.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: Introduction
description: Découvrez comment Intlayer fonctionne. Voir les étapes utilisées par Intlayer dans votre application. Voir ce qui fait les différents packages.
keywords:
  - Introduction
  - Commencer
  - Intlayer
  - Application
  - Packages
---

# Documentation Intlayer

Bienvenue dans la documentation officielle d'Intlayer ! Ici, vous trouverez tout ce dont vous avez besoin pour intégrer, configurer et maîtriser Intlayer pour tous vos besoins en matière d'internationalisation (i18n), que vous travailliez avec Next.js, React, Vite, Express ou un autre environnement JavaScript.

## Introduction

### Qu'est-ce qu'Intlayer ?

**Intlayer** est une bibliothèque d'internationalisation conçue spécifiquement pour les développeurs JavaScript. Elle permet la déclaration de votre contenu partout dans votre code. Elle convertit la déclaration de contenu multilingue en dictionnaires structurés pour une intégration facile dans votre code. En utilisant TypeScript, **Intlayer** rend votre développement plus robuste et plus efficace.

Intlayer propose également un éditeur visuel optionnel qui vous permet de modifier et de gérer facilement votre contenu. Cet éditeur est particulièrement utile pour les développeurs qui préfèrent une interface visuelle pour la gestion de contenu, ou pour les équipes générant du contenu sans avoir à se soucier du code.

### Exemple d'utilisation

```bash codeFormat="typescript"
.
└── Components
    └── MyComponent
        ├── index.content.ts
        └── index.tsx
```

```bash codeFormat="commonjs"
.
└── Components
    └── MyComponent
        ├── index.content.cjs
        └── index.mjs
```

```bash codeFormat="esm"
.
└── Components
    └── MyComponent
        ├── index.content.mjs
        └── index.js
```

```tsx fileName="src/components/MyComponent/index.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

// Déclaration du contenu du composant
const componentContent = {
  key: "component-key",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
} satisfies Dictionary;

export default componentContent;
```

```javascript fileName="src/components/MyComponent/index.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** Déclaration du contenu du composant
 * @type {import('intlayer').Dictionary} */
const componentContent = {
  key: "component-key",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
};

export default componentContent;
```

```javascript fileName="src/components/MyComponent/index.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** Déclaration du contenu du composant
 * @type {import('intlayer').Dictionary} */
const componentContent = {
  key: "component-key",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
};

module.exports = componentContent;
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

```tsx fileName="src/components/MyComponent/index.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

// Composant React utilisant Intlayer
export const MyComponent: FC = () => {
  const { myTranslatedContent } = useIntlayer("component-key");

  return <span>{myTranslatedContent}</span>;
};
```

```jsx fileName="src/components/MyComponent/index.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

// Composant React utilisant Intlayer
const MyComponent = () => {
  const { myTranslatedContent } = useIntlayer("component-key");

  return <span>{myTranslatedContent}</span>;
};
```

```jsx fileName="src/components/MyComponent/index.csx" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

// Composant React utilisant Intlayer
const MyComponent = () => {
  const { myTranslatedContent } = useIntlayer("component-key");

  return <span>{myTranslatedContent}</span>;
};
```

## Fonctionnalités principales

Intlayer offre une variété de fonctionnalités adaptées aux besoins du développement web moderne. Voici les principales fonctionnalités, avec des liens vers la documentation détaillée pour chacune :

- **Support de l'internationalisation** : Améliorez la portée globale de votre application avec un support intégré pour l'internationalisation.
- **Éditeur visuel** : Améliorez votre flux de travail de développement avec des plugins d'éditeur conçus pour Intlayer. Consultez le [Guide de l'Éditeur Visuel](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_visual_editor.md).
- **Flexibilité de configuration** : Personnalisez votre configuration avec des options détaillées dans le [Guide de Configuration](https://github.com/aymericzip/intlayer/blob/main/docs/fr/configuration.md).
- **Outils CLI avancés** : Gérez vos projets efficacement grâce à l'interface en ligne de commande d'Intlayer. Explorez les capacités dans la [Documentation des Outils CLI](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_cli.md).

## Concepts de base

### Dictionnaire

Organisez votre contenu multilingue près de votre code pour tout garder cohérent et maintenable.

- **[Commencer](https://github.com/aymericzip/intlayer/blob/main/docs/fr/dictionary/get_started.md)**  
  Apprenez les bases de la déclaration de contenu dans Intlayer.

- **[Traduction](https://github.com/aymericzip/intlayer/blob/main/docs/fr/dictionary/translation.md)**  
  Comprenez comment les traductions sont générées, stockées et utilisées dans votre application.

- **[Énumération](https://github.com/aymericzip/intlayer/blob/main/docs/fr/dictionary/enumeration.md)**  
  Gérez facilement des ensembles de données répétées ou fixes dans différentes langues.

- **[Récupération par fonction](https://github.com/aymericzip/intlayer/blob/main/docs/fr/dictionary/function_fetching.md)**  
  Découvrez comment récupérer dynamiquement du contenu avec une logique personnalisée pour s'adapter au flux de travail de votre projet.

### Environnements et intégrations

Nous avons conçu Intlayer avec flexibilité à l'esprit, offrant une intégration transparente avec des frameworks et outils de construction populaires :

- **[Intlayer avec Next.js 15](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_with_nextjs_15.md)**
- **[Intlayer avec Next.js 14 (App Router)](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_with_nextjs_14.md)**
- **[Intlayer avec Next.js Page Router](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_with_nextjs_page_router.md)**
- **[Intlayer avec React CRA](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_with_create_react_app.md)**
- **[Intlayer avec Vite + React](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_with_vite+react.md)**
- **[Intlayer avec Express](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_with_express.md)**

Chaque guide d'intégration inclut les meilleures pratiques pour utiliser les fonctionnalités d'Intlayer, comme le **rendu côté serveur**, le **routage dynamique** ou le **rendu côté client**, afin que vous puissiez maintenir une application rapide, optimisée pour le SEO et hautement évolutive.

## Contribution et retours

Nous valorisons la puissance de l'open-source et du développement communautaire. Si vous souhaitez proposer des améliorations, ajouter un nouveau guide ou corriger des problèmes dans notre documentation, n'hésitez pas à soumettre une Pull Request ou à ouvrir une issue sur notre [dépôt GitHub](https://github.com/aymericzip/intlayer/blob/main/docs).

**Prêt à traduire votre application plus rapidement et efficacement ?** Plongez dans notre documentation pour commencer à utiliser Intlayer dès aujourd'hui. Découvrez une approche robuste et rationalisée de l'internationalisation qui garde votre contenu organisé et rend votre équipe plus productive.
