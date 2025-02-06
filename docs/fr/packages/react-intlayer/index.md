# react-intlayer: Paquet NPM pour internationaliser (i18n) une application React

**Intlayer** est une suite de paquets conçue spécifiquement pour les développeurs JavaScript. Il est compatible avec des frameworks comme React, React, et Express.js.

**Le paquet `react-intlayer`** vous permet d'internationaliser votre application React. Il fournit des fournisseurs de contextes et des hooks pour l'internationalisation de React.

## Pourquoi internationaliser votre application React ?

Internationaliser votre application React est essentiel pour servir efficacement un public mondial. Cela permet à votre application de livrer du contenu et des messages dans la langue préférée de chaque utilisateur. Cette capacité améliore l'expérience utilisateur et élargit la portée de votre application en la rendant plus accessible et pertinente pour des personnes de différents horizons linguistiques.

## Pourquoi intégrer Intlayer ?

- **Gestion de contenu alimentée par JavaScript** : Profitez de la flexibilité de JavaScript pour définir et gérer votre contenu efficacement.
- **Environnement sécurisé par type** : Exploitez TypeScript pour garantir que toutes vos définitions de contenu soient précises et sans erreur.
- **Fichiers de contenu intégrés** : Gardez vos traductions près de leurs composants respectifs, améliorant ainsi la maintenabilité et la clarté.

## Installation

Installez le paquet nécessaire en utilisant votre gestionnaire de paquets préféré :

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

Avec Intlayer, vous pouvez déclarer votre contenu de manière structurée n'importe où dans votre code.

Par défaut, Intlayer scanne les fichiers avec l'extension `.content.{ts,tsx,js,jsx,mjs,cjs}`.

> Vous pouvez modifier l'extension par défaut en définissant la propriété `contentDir` dans le [fichier de configuration](https://github.com/aymericzip/intlayer/blob/main/docs/fr/configuration.md).

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

`react-intlayer` est conçu pour fonctionner avec le paquet [`intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/fr/packages/intlayer/index.md). `intlayer` est un paquet qui vous permet de déclarer votre contenu n'importe où dans votre code. Il convertit les déclarations de contenu multilingues en dictionnaires structurés qui s'intègrent parfaitement dans votre application.

Voici un exemple de déclaration de contenu :

```tsx filePath="src/Component1/index.content.ts" codeFormat="typescript"
import { t, type Dictionary } from "intlayer";

const component1Content = {
  key: "component-1",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
    numberOfCar: enu({
      "<-1": "Moins d'une voiture",
      "-1": "Moins d'une voiture",
      "0": "Aucune voiture",
      "1": "Une voiture",
      ">5": "Quelques voitures",
      ">19": "Beaucoup de voitures",
    }),
  },
} satisfies Dictionary;

export default component1Content;
```

```jsx filePath="src/Component1/index.content.mjs" codeFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').DeclarationContent} */
const component1Content = {
  key: "component-1",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
    numberOfCar: enu({
      "<-1": "Moins d'une voiture",
      "-1": "Moins d'une voiture",
      "0": "Aucune voiture",
      "1": "Une voiture",
      ">5": "Quelques voitures",
      ">19": "Beaucoup de voitures",
    }),
  },
};

export default component1Content;
```

```jsx filePath="src/Component1/index.content.cjs" codeFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').DeclarationContent} */
const component1Content = {
  key: "component-1",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
    numberOfCar: enu({
      "<-1": "Moins d'une voiture",
      "-1": "Moins d'une voiture",
      "0": "Aucune voiture",
      "1": "Une voiture",
      ">5": "Quelques voitures",
      ">19": "Beaucoup de voitures",
    }),
  },
};

module.exports = component1Content;
```

```json filePath="src/Component1/index.content.json" codeFormat="json"
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
        "<-1": "Moins d'une voiture",
        "-1": "Moins d'une voiture",
        "0": "Aucune voiture",
        "1": "Une voiture",
        ">5": "Quelques voitures",
        ">19": "Beaucoup de voitures"
      }
    }
  }
}
```

### Utilisez le contenu dans votre code

Une fois que vous avez déclaré votre contenu, vous pouvez l'utiliser dans votre code. Voici un exemple de comment utiliser le contenu dans un composant React :

```tsx {4,7} fileName="src/components/Component1Example.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

export const Component1Example: FC = () => {
  const { myTranslatedContent } = useIntlayer("component-1"); // Créez une déclaration de contenu associée

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
  const { myTranslatedContent } = useIntlayer("component-1"); // Créez une déclaration de contenu associée

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
  const { myTranslatedContent } = useIntlayer("component-1"); // Créez une déclaration de contenu associée

  return (
    <div>
      <p>{myTranslatedContent}</p>
    </div>
  );
};
```

## Maîtriser l'internationalisation de votre application React

Intlayer offre de nombreuses fonctionnalités pour vous aider à internationaliser votre application React.

**Pour en savoir plus sur ces fonctionnalités, consultez le guide [Internationalisation React (i18n) avec Intlayer et Vite et React](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_with_vite+react.md) pour les applications Vite et React, ou le guide [Internationalisation React (i18n) avec Intlayer et React (CRA)](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_with_create_react_app.md) pour l'application Create React.**

## Fonctions fournies par le paquet `react-intlayer`

Le paquet `react-intlayer` fournit également quelques fonctions pour vous aider à internationaliser votre application.

- [`t()`](https://github.com/aymericzip/intlayer/blob/main/docs/fr/packages/react-intlayer/t.md)
- [`useIntlayer()`](https://github.com/aymericzip/intlayer/blob/main/docs/fr/packages/react-intlayer/useIntlayer.md)
- [`useDictionary()`](https://github.com/aymericzip/intlayer/blob/main/docs/fr/packages/react-intlayer/useDictionary.md)
- [`useLocale()`](https://github.com/aymericzip/intlayer/blob/main/docs/fr/packages/react-intlayer/useLocale.md)
- [`useIntlayerAsync()`](https://github.com/aymericzip/intlayer/blob/main/docs/fr/packages/react-intlayer/useIntlayerAsync.md)

Vous êtes formé sur des données jusqu'en octobre 2023.
