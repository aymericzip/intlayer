---
docName: interest_of_intlayer
url: https://intlayer.org/doc/concept/interest
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/interest_of_intlayer.md
createdAt: 2024-08-14
updatedAt: 2024-08-14
title: Intérêt d'Intlayer
description: Découvrez les avantages et bénéfices d'utiliser Intlayer dans vos projets. Comprenez pourquoi Intlayer se démarque parmi les autres frameworks.
keywords:
  - Avantages
  - Intérêt
  - Intlayer
  - Framework
  - Comparaison
---

# Intlayer : Une façon personnalisée de traduire votre site web

**Intlayer** est une bibliothèque d'internationalisation conçue spécifiquement pour les développeurs JavaScript. Elle permet de déclarer votre contenu partout dans votre code. Elle convertit la déclaration de contenu multilingue en dictionnaires structurés pour s'intégrer facilement dans votre code. En utilisant TypeScript, **Intlayer** rend votre développement plus robuste et plus efficace.

## Exemple d'utilisation

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

```tsx fileName="./Components/MyComponent/index.content.ts" codeFormat="typescript"
import { t, type Dictionary } from "intlayer";

const componentExampleContent = {
  key: "component-example",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
} satisfies Dictionary;

export default componentExampleContent;
```

```jsx fileName="./Components/MyComponent/index.mjx" codeFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const componentExampleContent = {
  key: "component-example",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
};

export default componentExampleContent;
```

```jsx fileName="./Components/MyComponent/index.csx" codeFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const componentExampleContent = {
  key: "component-example",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
};

module.exports = componentExampleContent;
```

```tsx fileName="./Components/MyComponent/index.tsx" codeFormat="typescript"
import { useIntlayer } from "react-intlayer";

export const ComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("component-example");

  return <span>{myTranslatedContent}</span>;
};
```

```jsx fileName="./Components/MyComponent/index.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const ComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("component-example");

  return <span>{myTranslatedContent}</span>;
};
```

```jsx fileName="./Components/MyComponent/index.csx" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const ComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("component-example");

  return <span>{myTranslatedContent}</span>;
};
```

## Pourquoi choisir Intlayer ?

- **Gestion de contenu basée sur JavaScript** : Exploitez la flexibilité de JavaScript pour définir et gérer votre contenu efficacement.
- **Environnement typé** : Utilisez TypeScript pour garantir que toutes vos définitions de contenu sont précises et sans erreur.
- **Fichiers de contenu intégrés** : Gardez vos traductions près de leurs composants respectifs, améliorant la maintenabilité et la clarté.
- **Configuration simplifiée** : Démarrez rapidement avec une configuration minimale, particulièrement optimisée pour les projets Next.js.
- **Support des composants serveur** : Parfaitement adapté aux composants serveur Next.js, assurant un rendu côté serveur fluide.
- **Routage amélioré** : Support complet du routage d'application Next.js, s'adaptant parfaitement aux structures d'application complexes.
- **Base de code organisée** : Gardez votre base de code plus organisée : 1 composant = 1 dictionnaire dans le même dossier.
- **Types TypeScript automatiques** : Les types TypeScript sont automatiquement implémentés, empêchant la rupture du code due aux clés renommées ou supprimées.
- **Traduction automatique CI** : Remplissez automatiquement vos traductions dans votre CI en utilisant votre propre clé API OpenAI, éliminant le besoin d'une plateforme L10n.
- **Intégration serveur MCP** : Fournit un serveur MCP (Model Context Protocol) pour l'automatisation IDE, permettant une gestion transparente du contenu et des flux de travail i18n directement dans votre environnement de développement. [En savoir plus](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md).
- **Support Markdown** : Importez et interprétez les fichiers markdown pour le contenu multilingue comme les politiques de confidentialité.
- **Éditeur visuel et CMS gratuits** : Un éditeur visuel et un CMS gratuits sont disponibles si vous avez besoin de travailler avec des rédacteurs de contenu pour vos traductions, supprimant à nouveau le besoin d'une plateforme de localisation et permettant l'externalisation du contenu depuis la base de code.
- **Récupération de contenu simplifiée** : Pas besoin d'appeler votre fonction `t` pour chaque élément de contenu ; récupérez tout votre contenu directement en utilisant un seul hook.
- **Implémentation cohérente** : La même implémentation pour les composants client et serveur, pas besoin de passer votre fonction `t` à travers chaque composant serveur.
- **Contenu tree-shakable** : Le contenu est tree-shakable, ce qui allège le bundle final.
- **Rendu statique non bloquant** : Intlayer ne bloque pas le rendu statique comme le fait `next-intl`.
- **Interopérabilité** : Permet l'interopérabilité avec [react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_react-i18next.md), [next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_next-i18next.md), [next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_next-intl.md), et [react-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_react-intl.md).
