---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Documentation du package | react-intlayer
description: Découvrez comment utiliser le package react-intlayer
keywords:
  - Intlayer
  - react-intlayer
  - Internationalisation
  - Documentation
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - react-intlayer
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Historique initial
---

# react-intlayer : Package NPM pour internationaliser (i18n) une application React

**Intlayer** est une suite de packages conçue spécifiquement pour les développeurs JavaScript. Il est compatible avec des frameworks comme React, React, et Express.js.

**Le package `react-intlayer`** vous permet d'internationaliser votre application React. Il fournit des fournisseurs de contexte et des hooks pour l'internationalisation dans React.

## Pourquoi internationaliser votre application React ?

Internationaliser votre application React est essentiel pour servir efficacement un public mondial. Cela permet à votre application de diffuser du contenu et des messages dans la langue préférée de chaque utilisateur. Cette capacité améliore l'expérience utilisateur et élargit la portée de votre application en la rendant plus accessible et pertinente pour des personnes issues de différents horizons linguistiques.

## Pourquoi intégrer Intlayer ?

- **Gestion de contenu propulsée par JavaScript** : Exploitez la flexibilité de JavaScript pour définir et gérer votre contenu de manière efficace.
- **Environnement avec typage sécurisé** : Profitez de TypeScript pour garantir que toutes vos définitions de contenu sont précises et sans erreur.
- **Fichiers de contenu intégrés** : Gardez vos traductions proches de leurs composants respectifs, améliorant ainsi la maintenabilité et la clarté.

## Installation

Installez le package nécessaire en utilisant votre gestionnaire de paquets préféré :

```bash packageManager="npm"
npm install react-intlayer
```

```bash packageManager="yarn"
yarn add react-intlayer
```

```bash packageManager="pnpm"
pnpm add react-intlayer
```

## Exemple d'utilisation

Avec Intlayer, vous pouvez déclarer votre contenu de manière structurée n'importe où dans votre base de code.

Par défaut, Intlayer recherche les fichiers avec l'extension `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`.

> Vous pouvez modifier l'extension par défaut en configurant la propriété `contentDir` dans le [fichier de configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md).

```bash codeFormat="typescript"
.
├── intlayer.config.ts
└── src
    └── components
        ├── Component1
        │   ├── index.content.ts
        │   └── index.tsx
        └── Component2
            ├── index.content.ts
            └── index.tsx
```

```bash codeFormat="esm"
.
├── intlayer.config.mjs
└── src
    └── components
        ├── Component1
        │   ├── index.content.mjs
        │   └── index.mjx
        └── Component2
            ├── index.content.mjs
            └── index.mjx
```

```bash codeFormat="commonjs"
.
├── intlayer.config.cjs
└── src
    └── components
        ├── Component1
        │   ├── index.content.cjs
        │   └── index.cjx
        └── Component2
            ├── index.content.cjs
            └── index.cjx
```

### Déclarez votre contenu

`react-intlayer` est conçu pour fonctionner avec le [package `intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/intlayer/index.md). `intlayer` est un package qui vous permet de déclarer votre contenu n'importe où dans votre code. Il convertit les déclarations de contenu multilingue en dictionnaires structurés qui s'intègrent parfaitement dans votre application.

Voici un exemple de déclaration de contenu :

```tsx fileName="src/Component1/index.content.ts" codeFormat="typescript"
import { t, type Dictionary } from "intlayer";

const component1Content = {
  key: "component-1",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
    numberOfCar: enu({
      "<-1": "Moins d'une voiture en moins",
      "-1": "Moins une voiture",
      "0": "Aucune voiture",
      "1": "Une voiture",
      ">5": "Quelques voitures",
      ">19": "Beaucoup de voitures",
    }),
  },
} satisfies Dictionary;

export default component1Content;
```

```jsx fileName="src/Component1/index.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const component1Content = {
  key: "component-1",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
    numberOfCar: enu({
      "<-1": "Moins d'une voiture en moins",
      "-1": "Moins une voiture",
      "0": "Aucune voiture",
      "1": "Une voiture",
      ">5": "Quelques voitures",
      ">19": "Beaucoup de voitures",
    }),
  },
};

export default component1Content;
```

```jsx fileName="src/Component1/index.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const component1Content = {
  key: "component-1",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
    numberOfCar: enu({
      "<-1": "Moins d'une voiture en moins",
      "-1": "Moins une voiture",
      "0": "Aucune voiture",
      "1": "Une voiture",
      ">5": "Quelques voitures",
      ">19": "Beaucoup de voitures",
    }),
  },
};

module.exports = component1Content;
```

```json fileName="src/Component1/index.content.json" codeFormat="json"
{
  "key": "component-1",
  "content": {
    "myTranslatedContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Hello World",
        "fr": "Bonjour le monde",
        "es": "Hola Mundo"
      }
    },
    "numberOfCar": {
      "nodeType": "enumeration",
      "enumeration": {
        "<-1": "Moins d'une voiture en moins",
        "-1": "Moins une voiture",
        "0": "Aucune voiture",
        "1": "Une voiture",
        ">5": "Quelques voitures",
        ">19": "Beaucoup de voitures"
      }
    }
  }
}
```

### Utiliser le contenu dans votre code

Une fois que vous avez déclaré votre contenu, vous pouvez l'utiliser dans votre code. Voici un exemple de la manière d'utiliser le contenu dans un composant React :

```tsx {4,7} fileName="src/components/Component1Example.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

export const Component1Example: FC = () => {
  const { myTranslatedContent } = useIntlayer("component-1"); // Créer la déclaration de contenu associée

  return (
    <div>
      <p>{myTranslatedContent}</p>
    </div>
  );
};
```

```jsx {3,6} fileName="src/components/Component1Example.mjx" codeFormat="esm"
"use client";

import { useIntlayer } from "react-intlayer";

const Component1Example = () => {
  const { myTranslatedContent } = useIntlayer("component-1"); // Créer la déclaration de contenu associée

  return (
    <div>
      <p>{myTranslatedContent}</p>
    </div>
  );
};
```

```jsx {3,6} fileName="src/components/Component1Example.csx" codeFormat="commonjs"
"use client";

const { useIntlayer } = require("react-intlayer");

const Component1Example = () => {
  const { myTranslatedContent } = useIntlayer("component-1"); // Crée la déclaration du contenu associé

  return (
    <div>
      <p>{myTranslatedContent}</p>
    </div>
  );
};
```

## Maîtriser l'internationalisation de votre application React

Intlayer offre de nombreuses fonctionnalités pour vous aider à internationaliser votre application React.

**Pour en savoir plus sur ces fonctionnalités, consultez le guide [Internationalisation React (i18n) avec Intlayer, Vite et React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_vite+react.md) pour les applications Vite et React, ou le guide [Internationalisation React (i18n) avec Intlayer et React (CRA)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_create_react_app.md) pour React Create App.**

## Fonctions fournies par le package `react-intlayer`

Le package `react-intlayer` fournit également plusieurs fonctions pour vous aider à internationaliser votre application.

- [`t()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/react-intlayer/t.md)
- [`useIntlayer()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/react-intlayer/useIntlayer.md)
- [`useDictionary()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/react-intlayer/useDictionary.md)
- [`useLocale()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/react-intlayer/useLocale.md)
