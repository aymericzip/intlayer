---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Documentation du package | intlayer
description: Découvrez comment utiliser le package intlayer
keywords:
  - Intlayer
  - intlayer
  - Internationalisation
  - Documentation
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - intlayer
---

# intlayer : Package NPM pour gérer un dictionnaire multilingue (i18n)

**Intlayer** est une suite de packages conçue spécifiquement pour les développeurs JavaScript. Il est compatible avec des frameworks comme React, Next.js et Express.js.

**Le package `intlayer`** vous permet de déclarer votre contenu n'importe où dans votre code. Il convertit les déclarations de contenu multilingue en dictionnaires structurés qui s'intègrent parfaitement dans votre application. Avec TypeScript, **Intlayer** améliore votre développement en fournissant des outils plus puissants et efficaces.

## Pourquoi intégrer Intlayer ?

- **Gestion de contenu propulsée par JavaScript** : Exploitez la flexibilité de JavaScript pour définir et gérer votre contenu efficacement.
- **Environnement typé et sécurisé** : Profitez de TypeScript pour garantir que toutes vos définitions de contenu sont précises et sans erreur.
- **Fichiers de contenu intégrés** : Gardez vos traductions proches de leurs composants respectifs, améliorant ainsi la maintenabilité et la clarté.

## Installation

Installez le package nécessaire en utilisant votre gestionnaire de paquets préféré :

```bash packageManager="npm"
npm install intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer
```

```bash packageManager="yarn"
yarn add intlayer
```

### Configurer Intlayer

Intlayer fournit un fichier de configuration pour configurer votre projet. Placez ce fichier à la racine de votre projet.

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

javascript fileName="intlayer.config.mjs" codeFormat="esm"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> Pour une liste complète des paramètres disponibles, référez-vous à la [documentation de configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md).

## Exemple d'utilisation

Avec Intlayer, vous pouvez déclarer votre contenu de manière structurée n'importe où dans votre base de code.

Par défaut, Intlayer recherche les fichiers avec l'extension `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`.

> Vous pouvez modifier l'extension par défaut en configurant la propriété `contentDir` dans le [fichier de configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md).

```bash codeFormat="typescript"
.
├── intlayer.config.ts
└── src
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
    ├── ClientComponent
    │   ├── index.content.cjs
    │   └── index.cjx
    └── ServerComponent
        ├── index.content.cjs
        └── index.cjx
```

### Déclarez votre contenu

Voici un exemple de déclaration de contenu :

```tsx fileName="src/ClientComponent/index.content.ts" codeFormat="typescript"
import { t, type Dictionary } from "intlayer";

const clientComponentContent = {
  key: "client-component",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
    numberOfCar: enu({
      "<-1": "Less than minus one car",
      "-1": "Minus one car",
      "0": "No cars",
      "1": "One car",
      ">5": "Some cars",
      ">19": "Beaucoup de voitures",
    }),
  },
} satisfies Dictionary;

export default clientComponentContent;
```

```jsx fileName="src/ClientComponent/index.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const clientComponentContent = {
  key: "client-component",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
    numberOfCar: enu({
      "<-1": "Moins d'une voiture en moins",
      "-1": "Moins une voiture",
      "0": "Pas de voitures",
      "1": "Une voiture",
      ">5": "Quelques voitures",
      ">19": "Beaucoup de voitures",
    }),
  },
};

export default clientComponentContent;
```

```jsx fileName="src/ClientComponent/index.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const clientComponentContent = {
  key: "client-component",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
    numberOfCar: enu({
      "<-1": "Moins d'une voiture en dessous de moins un",
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

```json fileName="src/ClientComponent/index.content.json" codeFormat="json"
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
        "<-1": "Moins d'une voiture en dessous de moins un",
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

### Construisez vos dictionnaires

Vous pouvez construire vos dictionnaires en utilisant le [intlayer-cli](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer-cli/readme.md).

```bash packageManager="npm"
npx intlayer dictionaries build
```

```bash packageManager="yarn"
yarn intlayer build
```

```bash packageManager="pnpm"
pnpm intlayer build
```

Cette commande analyse tous les fichiers `*.content.*`, les compile, et écrit les résultats dans le répertoire spécifié dans votre **`intlayer.config.ts`** (par défaut, `./.intlayer`).

Une sortie typique pourrait ressembler à :

```bash
.
└── .intlayer
    ├── dictionary  # Contient le dictionnaire de votre contenu
    │   ├── client-component.json
    │   └── server-component.json
    ├── main  # Contient le point d'entrée de votre dictionnaire à utiliser dans votre application
    │   ├── dictionary.cjs
    │   └── dictionary.mjs
    └── types  # Contient les définitions de types auto-générées de votre dictionnaire
        ├── intlayer.d.ts  # Contient les définitions de types auto-générées d'Intlayer
        ├── client-component.d.ts
        └── server-component.d.ts
```

### Construire les ressources i18next

Intlayer peut être configuré pour générer des dictionnaires pour [i18next](https://www.i18next.com/). Pour cela, vous devez ajouter la configuration suivante à votre fichier `intlayer.config.ts` :

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  /* ... */
  content: {
    // Indique à Intlayer de générer des fichiers de messages pour i18next
    dictionaryOutput: ["i18next"],

    // Le répertoire où Intlayer écrira vos fichiers JSON de messages
    i18nextResourcesDir: "./i18next/resources",
  },
};
```

```typescript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  /* ... */
  content: {
    // Indique à Intlayer de générer des fichiers de messages pour i18next
    dictionaryOutput: ["i18next"],

    // Le répertoire où Intlayer écrira vos fichiers JSON de messages
    i18nextResourcesDir: "./i18next/resources",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  /* ... */
  content: {
    // Indique à Intlayer de générer des fichiers de messages pour i18next
    dictionaryOutput: ["i18next"],

    // Le répertoire où Intlayer écrira vos fichiers JSON de messages
    i18nextResourcesDir: "./i18next/resources",
  },
};

module.exports = config;
```

> Pour une liste complète des paramètres disponibles, référez-vous à la [documentation de configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md).

Sortie :

```bash
.
└── i18next
    └── resources
        ├── en
        │   ├── client-component.json
        │   └── server-component.json
        ├── es
        │   ├── client-component.json
        │   └── server-component.json
        └── fr
            ├── client-component.json
            └── server-component.json
```

Par exemple, le fichier **en/client-component.json** pourrait ressembler à :

```json fileName="intlayer/dictionary/en/client-component.json"
{
  "myTranslatedContent": "Hello World",
  "zero_numberOfCar": "No cars",
  "one_numberOfCar": "One car",
  "two_numberOfCar": "Two cars",
  "other_numberOfCar": "Quelques voitures"
}
```

### Construire des dictionnaires next-intl

Intlayer peut être configuré pour construire des dictionnaires pour [i18next](https://www.i18next.com/) ou [next-intl](https://github.com/formatjs/react-intl/tree/main/packages/next-intl). Pour cela, vous devez ajouter la configuration suivante dans votre fichier `intlayer.config.ts` :

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  /* ... */
  content: {
    // Indique à Intlayer de générer des fichiers de messages pour i18next
    dictionaryOutput: ["next-intl"],

    // Le répertoire où Intlayer écrira vos fichiers JSON de messages
    nextIntlMessagesDir: "./i18next/messages",
  },
};
```

```typescript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  /* ... */
  content: {
    // Indique à Intlayer de générer des fichiers de messages pour i18next
    dictionaryOutput: ["next-intl"],

    // Le répertoire où Intlayer écrira vos fichiers JSON de messages
    nextIntlMessagesDir: "./i18next/messages",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  /* ... */
  content: {
    // Indique à Intlayer de générer des fichiers de messages pour i18next
    dictionaryOutput: ["next-intl"],

    // Le répertoire où Intlayer écrira vos fichiers JSON de messages
    nextIntlMessagesDir: "./intl/messages",
  },
};

module.exports = config;
```

> Pour une liste complète des paramètres disponibles, consultez la [documentation de configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md).

Sortie :

```bash
.
└── intl
    └── messages
        ├── en
        │   ├── client-component.json
        │   └── server-component.json
        ├── es
        │   ├── client-component.json
        │   └── server-component.json
        └── fr
            ├── client-component.json
            └── server-component.json
```

Par exemple, le fichier **en/client-component.json** pourrait ressembler à :

```json fileName="intlayer/dictionary/en/client-component.json"
{
  "myTranslatedContent": "Bonjour le monde",
  "zero_numberOfCar": "Pas de voiture",
  "one_numberOfCar": "Une voiture",
  "two_numberOfCar": "Deux voitures",
  "other_numberOfCar": "Quelques voitures"
}
```

## Outils CLI

Intlayer fournit un outil CLI pour :

- auditer vos déclarations de contenu et compléter les traductions manquantes
- construire des dictionnaires à partir de vos déclarations de contenu
- pousser et récupérer des dictionnaires distants depuis votre CMS vers votre projet local

Consultez [intlayer-cli](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_cli.md) pour plus d'informations.

## Utiliser Intlayer dans votre application

Une fois votre contenu déclaré, vous pouvez consommer vos dictionnaires Intlayer dans votre application.

Intlayer est disponible en tant que package pour votre application.

### Application React

Pour utiliser Intlayer dans votre application React, vous pouvez utiliser [react-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/react-intlayer/index.md).

### Application Next.js

Pour utiliser Intlayer dans votre application Next.js, vous pouvez utiliser [next-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/next-intlayer/index.md).

### Application Express

Pour utiliser Intlayer dans votre application Express, vous pouvez utiliser [express-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/express-intlayer/index.md).

## Fonctions fournies par le package `intlayer`

Le package `intlayer` fournit également certaines fonctions pour vous aider à internationaliser votre application.

- [`getConfiguration()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/intlayer/getConfiguration.md)
- [`getTranslation()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/intlayer/getTranslation.md)
- [`getEnumeration()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/intlayer/getEnumeration.md)
- [`getLocaleName()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/intlayer/getLocaleName.md)
- [`getLocaleLang()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/intlayer/getLocaleLang.md)
- [`getHTMLTextDir()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/intlayer/getHTMLTextDir.md)
- [`getPathWithoutLocale()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/intlayer/getPathWithoutLocale.md)
- [`getMultilingualUrls()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/intlayer/getMultilingualUrls.md)
- [`getLocalizedUrl()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/intlayer/getLocalizedUrl.md)
- [`getPathWithoutLocale()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/intlayer/getPathWithoutLocale.md)

## Historique de la documentation

- 5.5.10 - 2025-06-29 : Historique initial
