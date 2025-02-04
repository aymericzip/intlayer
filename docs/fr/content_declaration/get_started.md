# Getting Started la déclaration de votre contenu

## Fichiers extensions

Par défaut, Intlayer surveille tous les fichiers avec les extensions suivantes pour les déclarations de contenu :

- `.content.ts`
- `.content.tsx`
- `.content.js`
- `.content.mjs`
- `.content.cjs`

L'application recherchera des fichiers qui correspondent au motif glob `./src/**/*.content.{ts,tsx,js,jsx,mjs,cjs}` par défaut.

Ces extensions par défaut conviennent à la plupart des applications. Cependant, si vous avez des exigences spécifiques, consultez le [guide de personnalisation des extensions de contenu](https://github.com/aymericzip/intlayer/blob/main/docs/fr/configuration.md#content-configuration) pour des instructions sur la façon de les gérer.

Pour une liste complète des options de configuration, visitez la documentation de configuration.

## Déclarez Votre Contenu

Créez et gérez vos dictionnaires de contenu :

```typescript fileName="src/app/[locale]/page.content.ts" codeFormat="typescript"
import { t, enu, type DeclarationContent } from "intlayer";

interface Content {
  getStarted: {
    main: string;
    pageLink: string;
  };
  numberOfCar: string;
}

export default {
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
    numberOfCar: enu({
      "<-1": "Moins d'une voiture",
      "-1": "Moins une voiture",
      "0": "Pas de voitures",
      "1": "Une voiture",
      ">5": "Quelques voitures",
      ">19": "Beaucoup de voitures",
    }),
  },
} satisfies DeclarationContent<Content>;
```

```javascript fileName="src/app/[locale]/page.content.mjs" codeFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').DeclarationContent} */
export default {
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
    numberOfCar: enu({
      "<-1": "Moins d'une voiture",
      "-1": "Moins une voiture",
      0: "Pas de voitures",
      1: "Une voiture",
      ">5": "Quelques voitures",
      ">19": "Beaucoup de voitures",
    }),
  },
};
```

```javascript fileName="src/app/[locale]/page.content.cjs" codeFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').DeclarationContent} */
module.exports = {
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
    numberOfCar: enu({
      "<-1": "Moins d'une voiture",
      "-1": "Moins une voiture",
      0: "Pas de voitures",
      1: "Une voiture",
      ">5": "Quelques voitures",
      ">19": "Beaucoup de voitures",
    }),
  },
};
```

```json5 fileName="src/app/[locale]/page.content.json"  codeFormat="json"
{
  "key": "page",
  "content": {
    "getStarted": {
      "main": {
        "nodeType": "translation",
        "translation": {
          "en": "Get started by editing",
          "fr": "Commencez par éditer",
          "es": "Comience por editar",
        },
      },
      "pageLink": "src/app/page.tsx",
    },
    "numberOfCar": {
      "nodeType": "enumeration",
      "enumeration": {
        "<-1": "Moins d'une voiture",
        "-1": "Moins une voiture",
        "0": "Pas de voitures",
        "1": "Une voiture",
        ">5": "Quelques voitures",
        ">19": "Beaucoup de voitures",
      },
    },
  },
}
```
