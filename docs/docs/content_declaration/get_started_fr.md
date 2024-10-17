# Commencer la Declaration de Votre Contenu

## Configurer Intlayer pour votre projet

[Voir comment utiliser intlayer avec NextJS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/intlayer_with_nextjs_en.md)

[Voir comment utiliser intlayer avec ReactJS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/intlayer_with_create_react_app_en.md)

[Voir comment utiliser intlayer avec Vite+React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/intlayer_with_vite+react_en.md)

## Installer le package

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

## Gérer votre contenu

Créez et gérez vos dictionnaires de contenu :

### Utilisation de TypeScript

```typescript
// src/app/[locale]/page.content.ts
import { t, enu, type DeclarationContent } from "intlayer";

const pageContent = {
  key: "page",
  content: {
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
  },
} satisfies DeclarationContent;

// Le contenu doit être exporté par défaut
export default pageContent;
```

### Utilisation des modules ECMAScript

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

### Utilisation des modules CommonJS

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

### Utilisation de JSON

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

Attention, la déclaration de contenu JSON rend impossible la mise en œuvre de [récupération de fonction](https://github.com/aymericzip/intlayer/blob/main/docs/docs/content_declaration/function_fetching.md).
