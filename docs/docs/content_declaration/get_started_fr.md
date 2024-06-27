# Documentation du Package Intlayer

## Package intlayer

Le package `intlayer` a pour but de déclarer votre contenu de manière structurée, en utilisant JavaScript.

Pour construire des dictionnaires à partir de cette déclaration, vous pouvez utiliser [intlayer-cli](https://github.com/aypineau/intlayer/blob/main/packages/intlayer-cli/readme_fr.md).
Et pour interpréter les dictionnaires intlayer, vous pouvez utiliser des interpréteurs, tels que [react-intlayer](https://github.com/aypineau/intlayer/blob/main/packages/react-intlayer/readme_fr.md) ou [next-intlayer](https://github.com/aypineau/intlayer/blob/main/packages/next-intlayer/readme_fr.md).

## Commencer avec Intlayer

[Voir comment utiliser intlayer avec NextJS](https://github.com/aypineau/intlayer/blob/main/readme_fr.md)

### Installer le package

Installez les packages nécessaires en utilisant npm :

```bash
npm install intlayer
```

```bash
yarn install intlayer
```

```bash
pnpm install intlayer
```

### Gérer votre contenu

Créez et gérez vos dictionnaires de contenu :

#### Utilisation de TypeScript

```typescript
// src/app/[locale]/page.content.ts
import { t, enu, type DeclarationContent } from "intlayer";

const pageContent: DeclarationContent = {
  id: "page",
  getStarted: {
    main: t({
      en: "Get started by editing",
      fr: "Commencez par éditer",
      es: "Comience por editar",
    }),
    pageLink: "src/app/page.tsx",
  },
  nestedContent: {
    id: "enumeration",
    numberOfCar: enu({
      "<-1": "Moins d'une voiture",
      "-1": "Une voiture en moins",
      "0": "Pas de voitures",
      "1": "Une voiture",
      ">5": "Quelques voitures",
      ">19": "Beaucoup de voitures",
    }),
  },
};

// Le contenu doit être exporté par défaut
export default pageContent;
```

#### Utilisation des modules ECMAScript

```javascript
// src/app/[locale]/page.content.mjs

import { t } from "intlayer";

/** @type {import('intlayer').DeclarationContent} */
const pageContent = {
  id: "page",
  getStarted: {
    main: t({
      en: "Get started by editing",
      fr: "Commencez par éditer",
      es: "Comience por editar",
    }),
    pageLink: "src/app/page.tsx",
  },
  nestedContent: {
    id: "enumeration",
    numberOfCar: enu({
      "<-1": "Moins d'une voiture",
      "-1": "Une voiture en moins",
      0: "Pas de voitures",
      1: "Une voiture",
      ">5": "Quelques voitures",
      ">19": "Beaucoup de voitures",
    }),
  },
};

// Le contenu doit être exporté par défaut
export default pageContent;
```

#### Utilisation des modules CommonJS

```javascript
// src/app/[locale]/page.content.cjs

const { t } = require("intlayer");

/** @type {import('intlayer').DeclarationContent} */
const pageContent = {
  id: "page",
  getStarted: {
    main: t({
      en: "Get started by editing",
      fr: "Commencez par éditer",
      es: "Comience por editar",
    }),
    pageLink: "src/app/page.tsx",
  },
  nestedContent: {
    id: "enumeration",
    numberOfCar: enu({
      "<-1": "Moins d'une voiture",
      "-1": "Une voiture en moins",
      0: "Pas de voitures",
      1: "Une voiture",
      ">5": "Quelques voitures",
      ">19": "Beaucoup de voitures",
    }),
  },
};

// Le contenu doit être exporté par défaut
module.exports = pageContent;
```

#### Utilisation de JSON

```json5
// src/app/[locale]/page.content.json

{
  id: "page",
  getStarted: {
    main: {
      nodeType: "translation",
      en: "Get started by editing",
      fr: "Commencez par éditer",
      es: "Comience por editar",
    },
    pageLink: "src/app/page.tsx",
  },
  nestedContent: {
    id: "enumeration",
    nodeType: "enumeration",
    numberOfCar: {
      "<-1": "Moins d'une voiture",
      "-1": "Une voiture en moins",
      "0": "Pas de voitures",
      "1": "Une voiture",
      ">5": "Quelques voitures",
      ">19": "Beaucoup de voitures",
    },
  },
}
```

Attention, la déclaration de contenu JSON rend impossible la mise en œuvre de [récupération de fonction](https://github.com/aypineau/intlayer/blob/main/docs/docs/content_declaration/function_fetching.md).
