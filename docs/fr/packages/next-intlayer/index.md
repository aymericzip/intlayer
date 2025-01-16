# next-intlayer: NPM Package pour internationaliser (i18n) une application Next.js

**Intlayer** est une suite de packages conçue spécifiquement pour les développeurs JavaScript. Il est compatible avec des frameworks comme React, Next.js et Express.js.

**Le package `next-intlayer`** vous permet d'internationaliser votre application Next.js. Il fournit des contextes et des hooks pour l'internationalisation de Next.js. De plus, il inclut le plugin Next.js pour intégrer Intlayer avec [Webpack](https://webpack.js.org/) ou [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack), ainsi que des middleware pour détecter la langue préférée de l'utilisateur, gérer les cookies et traiter la redirection d'URL.

## Pourquoi internationaliser votre application Next.js ?

Internationaliser votre application Next.js est essentiel pour servir efficacement un public mondial. Cela permet à votre application de délivrer du contenu et des messages dans la langue préférée de chaque utilisateur. Cette capacité améliore l'expérience utilisateur et élargit la portée de votre application en la rendant plus accessible et pertinente pour des personnes de différents horizons linguistiques.

## Pourquoi intégrer Intlayer ?

- **Gestion de contenu alimentée par JavaScript** : Exploitez la flexibilité de JavaScript pour définir et gérer votre contenu de manière efficace.
- **Environnement typé** : Profitez de TypeScript pour garantir que toutes vos définitions de contenu sont précises et sans erreurs.
- **Fichiers de contenu intégrés** : Gardez vos traductions près de leurs composants respectifs, ce qui améliore la maintenabilité et la clarté.

## Installation

Installez le package nécessaire en utilisant votre gestionnaire de packages préféré :

```bash packageManager="npm"
npm install next-intlayer
```

```bash packageManager="yarn"
yarn add next-intlayer
```

```bash packageManager="pnpm"
pnpm add next-intlayer
```

## Exemple d'utilisation

Avec Intlayer, vous pouvez déclarer votre contenu de manière structurée n'importe où dans votre codebase.

Par défaut, Intlayer scanne les fichiers avec l'extension `.content.{ts,tsx,js,jsx,mjs,cjs}`.

> Vous pouvez modifier l'extension par défaut en définissant la propriété `contentDir` dans le [fichier de configuration](https://github.com/aymericzip/intlayer/blob/main/docs/fr/configuration.md).

```bash codeFormat="typescript"
.
├── intlayer.config.ts
└── src
    └── components
        ├── ClientComponent
        │   ├── index.content.ts
        │   └── index.tsx
        └── ServerComponent
            ├── index.content.ts
            └── index.tsx
```

```bash codeFormat="esm"
.
├── intlayer.config.mjs
└── src
    └── components
        ├── ClientComponent
        │   ├── index.content.mjs
        │   └── index.mjx
        └── ServerComponent
            ├── index.content.mjs
            └── index.mjx
```

```bash codeFormat="commonjs"
.
├── intlayer.config.cjs
└── src
    └── components
        ├── ClientComponent
        │   ├── index.content.cjs
        │   └── index.cjx
        └── ServerComponent
            ├── index.content.cjs
            └── index.cjx
```

### Déclarez votre contenu

`next-intlayer` est conçu pour fonctionner avec le package [`intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/fr/packages/intlayer/index.md). `intlayer` est un package qui vous permet de déclarer votre contenu n'importe où dans votre code. Il convertit les déclarations de contenu multilingues en dictionnaires structurés qui s'intègrent parfaitement dans votre application.

Voici un exemple de déclaration de contenu :

```tsx filePath="src/ClientComponent/index.content.ts" codeFormat="typescript"
import { type DeclarationContent, t } from "intlayer";

const clientComponentContent = {
  key: "client-component",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
    numberOfCar: enu({
      "<-1": "Moins d'une voiture",
      "-1": "Moins une voiture",
      "0": "Aucune voiture",
      "1": "Une voiture",
      ">5": "Quelques voitures",
      ">19": "De nombreuses voitures",
    }),
  },
} satisfies DeclarationContent;

export default clientComponentContent;
```

```jsx filePath="src/ClientComponent/index.content.mjs" codeFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').DeclarationContent} */
const clientComponentContent = {
  key: "client-component",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
    numberOfCar: enu({
      "<-1": "Moins d'une voiture",
      "-1": "Moins une voiture",
      "0": "Aucune voiture",
      "1": "Une voiture",
      ">5": "Quelques voitures",
      ">19": "De nombreuses voitures",
    }),
  },
};

export default clientComponentContent;
```

```jsx filePath="src/ClientComponent/index.content.cjs" codeFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').DeclarationContent} */
const clientComponentContent = {
  key: "client-component",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
    numberOfCar: enu({
      "<-1": "Moins d'une voiture",
      "-1": "Moins une voiture",
      "0": "Aucune voiture",
      "1": "Une voiture",
      ">5": "Quelques voitures",
      ">19": "De nombreuses voitures",
    }),
  },
};

module.exports = clientComponentContent;
```

```json filePath="src/ClientComponent/index.content.json" codeFormat="json"
{
  "key": "client-component",
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
        "-1": "Moins une voiture",
        "0": "Aucune voiture",
        "1": "Une voiture",
        ">5": "Quelques voitures",
        ">19": "De nombreuses voitures"
      }
    }
  }
}
```

### Utilisez le contenu dans votre code

Une fois que vous avez déclaré votre contenu, vous pouvez l'utiliser dans votre code. Voici un exemple de la façon d'utiliser le contenu dans un composant React :

```tsx {4,7} fileName="src/components/ClientComponentExample.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ClientComponentExample: FC = () => {
  const { myTranslatedContent } = useIntlayer("client-component"); // Créer une déclaration de contenu associée

  return (
    <div>
      <p>{myTranslatedContent}</p>
    </div>
  );
};
```

```jsx {3,6} fileName="src/components/ClientComponentExample.mjx" codeFormat="esm"
"use client";

import { useIntlayer } from "next-intlayer";

const ClientComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("client-component"); // Créer une déclaration de contenu associée

  return (
    <div>
      <p>{myTranslatedContent}</p>
    </div>
  );
};
```

```jsx {3,6} fileName="src/components/ClientComponentExample.csx" codeFormat="commonjs"
"use client";

const { useIntlayer } = require("next-intlayer");

const ClientComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("client-component"); // Créer une déclaration de contenu associée

  return (
    <div>
      <p>{myTranslatedContent}</p>
    </div>
  );
};
```

## Maîtriser l'internationalisation de votre application Next.js

Intlayer offre de nombreuses fonctionnalités pour vous aider à internationaliser votre application Next.js. Voici quelques-unes des principales fonctionnalités :

- **Internationalisation des composants serveur** : Intlayer vous permet d'internationaliser vos composants serveur de la même manière que vos composants client. Cela signifie que vous pouvez utiliser les mêmes déclarations de contenu pour les composants clients et serveurs.
- **Middleware pour la détection de la langue** : Intlayer fournit un middleware pour détecter la langue préférée de l'utilisateur. Ce middleware est utilisé pour détecter la langue préférée de l'utilisateur et le rediriger vers l'URL appropriée comme spécifié dans la [configuration](https://github.com/aymericzip/intlayer/blob/main/docs/fr/configuration.md).
- **Internationalisation des métadonnées** : Intlayer fournit un moyen d'internationaliser vos métadonnées, telles que le titre de votre page, en utilisant la fonction `generateMetadata` fournie par Next.js. Vous pouvez utiliser la fonction `getTranslationContent` pour traduire vos métadonnées.
- **Internationalisation du sitemap.xml et robots.txt** : Intlayer vous permet d'internationaliser vos fichiers sitemap.xml et robots.txt. Vous pouvez utiliser la fonction `getMultilingualUrls` pour générer des URLs multilingues pour votre sitemap.
- **Internationalisation des URLs** : Intlayer vous permet d'internationaliser vos URLs en utilisant la fonction `getMultilingualUrls`. Cette fonction génère des URLs multilingues pour votre sitemap.

**Pour en savoir plus sur ces fonctionnalités, référez-vous au guide [Internationalisation de Next.js (i18n) avec Intlayer et le Routeur d'Application Next.js 15](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_with_nextjs_15.md).**

## Fonctions fournies par le package `next-intlayer`

Le package `next-intlayer` fournit également certaines fonctions pour vous aider à internationaliser votre application.

- [`t()`](https://github.com/aymericzip/intlayer/blob/main/docs/fr/packages/next-intlayer/t.md)
- [`useIntlayer()`](https://github.com/aymericzip/intlayer/blob/main/docs/fr/packages/next-intlayer/useIntlayer.md)
- [`useDictionary()`](https://github.com/aymericzip/intlayer/blob/main/docs/fr/packages/next-intlayer/useDictionary.md)
- [`useLocale()`](https://github.com/aymericzip/intlayer/blob/main/docs/fr/packages/next-intlayer/useLocale.md)
- [`useIntlayerAsync()`](https://github.com/aymericzip/intlayer/blob/main/docs/fr/packages/next-intlayer/useIntlayerAsync.md)
