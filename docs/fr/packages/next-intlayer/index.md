# next-intlayer : Paquet NPM pour internationaliser (i18n) une application Next.js

**Intlayer** est une suite de paquets conçue spécifiquement pour les développeurs JavaScript. Elle est compatible avec des frameworks comme React, Next.js et Express.js.

**Le paquet `next-intlayer`** vous permet d'internationaliser votre application Next.js. Il fournit des fournisseurs de contexte et des hooks pour l'internationalisation de Next.js. De plus, il inclut le plugin Next.js pour intégrer Intlayer avec [Webpack](https://webpack.js.org/) ou [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack), ainsi qu'un middleware pour détecter la langue préférée de l'utilisateur, gérer les cookies et gérer la redirection des URL.

## Pourquoi internationaliser votre application Next.js ?

Internationaliser votre application Next.js est essentiel pour servir efficacement un public mondial. Cela permet à votre application de fournir du contenu et des messages dans la langue préférée de chaque utilisateur. Cette capacité améliore l'expérience utilisateur et élargit la portée de votre application en la rendant plus accessible et pertinente pour des personnes de différents horizons linguistiques.

## Pourquoi intégrer Intlayer ?

- **Gestion de contenu propulsée par JavaScript** : Exploitez la flexibilité de JavaScript pour définir et gérer efficacement votre contenu.
- **Environnement sûr pour les types** : Utilisez TypeScript pour garantir que toutes vos définitions de contenu sont précises et sans erreur.
- **Fichiers de contenu intégrés** : Gardez vos traductions proches de leurs composants respectifs, améliorant ainsi la maintenabilité et la clarté.

## Installation

Installez le paquet nécessaire en utilisant votre gestionnaire de paquets préféré :

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

Avec Intlayer, vous pouvez déclarer votre contenu de manière structurée n'importe où dans votre base de code.

Par défaut, Intlayer recherche les fichiers avec l'extension `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`.

> Vous pouvez modifier l'extension par défaut en définissant la propriété `contentDir` dans le [fichier de configuration](https://github.com/aymericzip/intlayer/blob/main/docs/fr/configuration.md).

```bash codeFormat="typescript"
.
├── intlayer.config.ts
└── src
    └── components
        ├── ClientComponent
        │   ├── index.content.ts
        │   └── index.tsx
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
        │   ├── index.content.cjs
        │   └── index.cjx
        └── ServerComponent
            ├── index.content.cjs
            └── index.cjx
```

### Déclarez votre contenu

`next-intlayer` est conçu pour fonctionner avec le [paquet `intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/fr/packages/intlayer/index.md). `intlayer` est un paquet qui vous permet de déclarer votre contenu n'importe où dans votre code. Il convertit les déclarations de contenu multilingues en dictionnaires structurés qui s'intègrent parfaitement dans votre application.

Voici un exemple de déclaration de contenu :

```tsx filePath="src/ClientComponent/index.content.ts" codeFormat="typescript"
import { t, type Dictionary } from "intlayer";

// Déclaration de contenu pour le composant client
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
      ">19": "Beaucoup de voitures",
    }),
  },
} satisfies Dictionary;

export default clientComponentContent;
```

```jsx filePath="src/ClientComponent/index.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
// Déclaration de contenu pour le composant client
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
      ">19": "Beaucoup de voitures",
    }),
  },
};

export default clientComponentContent;
```

```jsx filePath="src/ClientComponent/index.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
// Déclaration de contenu pour le composant client
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
      ">19": "Beaucoup de voitures",
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
        ">19": "Beaucoup de voitures"
      }
    }
  }
}
```

### Utilisez le contenu dans votre code

Une fois que vous avez déclaré votre contenu, vous pouvez l'utiliser dans votre code. Voici un exemple d'utilisation du contenu dans un composant React :

```tsx {4,7} fileName="src/components/ClientComponentExample.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ClientComponentExample: FC = () => {
  const { myTranslatedContent } = useIntlayer("client-component"); // Créez une déclaration de contenu associée

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
  const { myTranslatedContent } = useIntlayer("client-component"); // Créez une déclaration de contenu associée

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
  const { myTranslatedContent } = useIntlayer("client-component"); // Créez une déclaration de contenu associée

  return (
    <div>
      <p>{myTranslatedContent}</p>
    </div>
  );
};
```

## Maîtriser l'internationalisation de votre application Next.js

Intlayer offre de nombreuses fonctionnalités pour vous aider à internationaliser votre application Next.js. Voici quelques-unes des principales fonctionnalités :

- **Internationalisation des composants serveur** : Intlayer vous permet d'internationaliser vos composants serveur de la même manière que vos composants client. Cela signifie que vous pouvez utiliser les mêmes déclarations de contenu pour les composants client et serveur.
- **Middleware pour la détection de la langue** : Intlayer fournit un middleware pour détecter la langue préférée de l'utilisateur. Ce middleware est utilisé pour détecter la langue préférée de l'utilisateur et les rediriger vers l'URL appropriée comme spécifié dans la [configuration](https://github.com/aymericzip/intlayer/blob/main/docs/fr/configuration.md).
- **Internationalisation des métadonnées** : Intlayer fournit un moyen d'internationaliser vos métadonnées, comme le titre de votre page, en utilisant la fonction `generateMetadata` fournie par Next.js. Vous pouvez utiliser la fonction `getTranslation` pour traduire vos métadonnées.
- **Internationalisation des fichiers sitemap.xml et robots.txt** : Intlayer vous permet d'internationaliser vos fichiers sitemap.xml et robots.txt. Vous pouvez utiliser la fonction `getMultilingualUrls` pour générer des URL multilingues pour votre sitemap.
- **Internationalisation des URL** : Intlayer vous permet d'internationaliser vos URL en utilisant la fonction `getMultilingualUrls`. Cette fonction génère des URL multilingues pour votre sitemap.

**Pour en savoir plus sur ces fonctionnalités, consultez le guide [Internationalisation (i18n) de Next.js avec Intlayer et le routeur d'application Next.js 15](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_with_nextjs_15.md).**

## Fonctions fournies par le paquet `next-intlayer`

Le paquet `next-intlayer` fournit également des fonctions pour vous aider à internationaliser votre application.

- [`t()`](https://github.com/aymericzip/intlayer/blob/main/docs/fr/packages/next-intlayer/t.md)
- [`useIntlayer()`](https://github.com/aymericzip/intlayer/blob/main/docs/fr/packages/next-intlayer/useIntlayer.md)
- [`useDictionary()`](https://github.com/aymericzip/intlayer/blob/main/docs/fr/packages/next-intlayer/useDictionary.md)
- [`useLocale()`](https://github.com/aymericzip/intlayer/blob/main/docs/fr/packages/next-intlayer/useLocale.md)
- [`useIntlayerAsync()`](https://github.com/aymericzip/intlayer/blob/main/docs/fr/packages/next-intlayer/useIntlayerAsync.md)
