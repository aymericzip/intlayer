---
createdAt: 2024-08-11
updatedAt: 2025-06-29
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
---

# Documentation Intlayer

Bienvenue dans la documentation officielle d'Intlayer ! Ici, vous trouverez tout ce dont vous avez besoin pour intégrer, configurer et maîtriser Intlayer pour tous vos besoins en internationalisation (i18n), que vous travailliez avec Next.js, React, Vite, Express ou un autre environnement JavaScript.

## Introduction

### Qu'est-ce qu'Intlayer ?

**Intlayer** est une bibliothèque d'internationalisation conçue spécifiquement pour les développeurs JavaScript. Elle permet la déclaration de votre contenu partout dans votre code. Elle convertit la déclaration de contenu multilingue en dictionnaires structurés pour une intégration facile dans votre code. En utilisant TypeScript, **Intlayer** rend votre développement plus robuste et plus efficace.

Intlayer propose également un éditeur visuel optionnel qui vous permet de modifier et de gérer facilement votre contenu. Cet éditeur est particulièrement utile pour les développeurs qui préfèrent une interface visuelle pour la gestion du contenu, ou pour les équipes générant du contenu sans avoir à se soucier du code.

### Exemple d'utilisation

```bash
.
└── Components
    └── MyComponent
        ├── index.content.cjs
        └── index.mjs
```

```tsx fileName="src/components/MyComponent/index.content.ts" contentDeclarationFormat="typescript"
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

```javascript fileName="src/components/MyComponent/index.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
// Déclaration du contenu du composant avec des traductions multilingues
const componentContent = {
  key: "component-key",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
  },
};

export default componentContent;
```

```javascript fileName="src/components/MyComponent/index.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
// Déclaration du contenu du composant avec des traductions multilingues
const componentContent = {
  key: "component-key",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
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

export const MyComponent: FC = () => {
  const { myTranslatedContent } = useIntlayer("component-key");

  return <span>{myTranslatedContent}</span>;
};
```

```jsx fileName="src/components/MyComponent/index.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const MyComponent = () => {
  const { myTranslatedContent } = useIntlayer("component-key");

  return <span>{myTranslatedContent}</span>;
};
```

```jsx fileName="src/components/MyComponent/index.csx" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const MyComponent = () => {
  const { myTranslatedContent } = useIntlayer("component-key");

  return <span>{myTranslatedContent}</span>;
};
```

## Fonctionnalités principales

Intlayer offre une variété de fonctionnalités adaptées aux besoins du développement web moderne. Voici les principales fonctionnalités, avec des liens vers la documentation détaillée pour chacune :

- **Support de l'internationalisation** : Améliorez la portée mondiale de votre application grâce au support intégré de l'internationalisation.
- **Éditeur visuel** : Améliorez votre flux de développement avec des plugins d'éditeur conçus pour Intlayer. Consultez le [Guide de l'éditeur visuel](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_visual_editor.md).
- **Flexibilité de configuration** : Personnalisez votre configuration avec de nombreuses options détaillées dans le [Guide de configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md).
- **Outils CLI avancés** : Gérez vos projets efficacement grâce à l'interface en ligne de commande d'Intlayer. Découvrez les fonctionnalités dans la [Documentation des outils CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_cli.md).

## Concepts clés

### Dictionnaire

Organisez votre contenu multilingue à proximité de votre code pour garder tout cohérent et facile à maintenir.

- **[Commencer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/get_started.md)**  
  Apprenez les bases de la déclaration de votre contenu dans Intlayer.

- **[Traduction](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/translation.md)**  
  Comprenez comment les traductions sont générées, stockées et utilisées dans votre application.

- **[Énumération](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/enumeration.md)**  
  Gérez facilement des ensembles de données répétées ou fixes dans plusieurs langues.

- **[Condition](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/conditional.md)**  
  Apprenez à utiliser la logique conditionnelle dans Intlayer pour créer du contenu dynamique.

- **[Insertion](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/insertion.md)**  
  Découvrez comment insérer des valeurs dans une chaîne en utilisant des espaces réservés d'insertion.

- **[Récupération par fonction](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/function_fetching.md)**  
  Découvrez comment récupérer dynamiquement du contenu avec une logique personnalisée pour correspondre au flux de travail de votre projet.

- **[Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/markdown.md)**  
  Apprenez à utiliser Markdown dans Intlayer pour créer du contenu enrichi.

- **[Inclusions de fichiers](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/file_embeddings.md)**  
  Découvrez comment intégrer des fichiers externes dans Intlayer pour les utiliser dans l’éditeur de contenu.

- **[Imbrication](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/nesting.md)**  
  Comprenez comment imbriquer du contenu dans Intlayer pour créer des structures complexes.

### Environnements & Intégrations

Nous avons conçu Intlayer avec la flexibilité à l'esprit, offrant une intégration transparente avec les frameworks et outils de build populaires :

- **[Intlayer avec Next.js 15](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_nextjs_15.md)**
- **[Intlayer avec Next.js 14 (App Router)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_nextjs_14.md)**
- **[Intlayer avec Next.js Page Router](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_nextjs_page_router.md)**
- **[Intlayer avec React CRA](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_create_react_app.md)**
- **[Intlayer avec Vite + React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_vite+react.md)**
- **[Intlayer avec React Native et Expo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_react_native+expo.md)**
- **[Intlayer avec Lynx et React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_lynx+react.md)**
- **[Intlayer avec Express](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_express.md)**

Chaque guide d’intégration inclut les meilleures pratiques pour utiliser les fonctionnalités d’Intlayer, telles que le **rendu côté serveur**, le **routage dynamique** ou le **rendu côté client**, afin que vous puissiez maintenir une application rapide, optimisée pour le SEO et hautement évolutive.

## Contribution & Retour d’expérience

Nous valorisons la puissance de l'open-source et du développement communautaire. Si vous souhaitez proposer des améliorations, ajouter un nouveau guide ou corriger des problèmes dans notre documentation, n'hésitez pas à soumettre une Pull Request ou à ouvrir une issue sur notre [répertoire GitHub](https://github.com/aymericzip/intlayer/blob/main/docs/docs).

**Prêt à traduire votre application plus rapidement et plus efficacement ?** Plongez dans notre documentation pour commencer à utiliser Intlayer dès aujourd'hui. Découvrez une approche robuste et simplifiée de l'internationalisation qui garde votre contenu organisé et votre équipe plus productive.

---

## Historique de la documentation

- 5.5.10 - 2025-06-29 : Historique initial
