---
docName: dictionary__get_started
url: https://intlayer.org/doc/concept/content
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/get_started.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: Déclaration de Contenu | Commencer
description: Découvrez comment déclarer et utiliser la déclaration de contenu dans votre site web multilingue. Suivez les étapes de cette documentation en ligne pour configurer votre projet en quelques minutes.
keywords:
  - Commencer
  - Internationalisation
  - Documentation
  - Intlayer
  - Next.js
  - JavaScript
  - React
---

# Commencer la déclaration de votre contenu

<iframe title="i18n, Markdown, JSON… one single solution to manage it all | Intlayer" class="m-auto aspect-[16/9] w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/1VHgSY_j9_I?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

## Extensions de fichiers

Par défaut, Intlayer surveille tous les fichiers avec les extensions suivantes pour les déclarations de contenu :

- `.content.json`
- `.content.ts`
- `.content.tsx`
- `.content.js`
- `.content.jsx`
- `.content.mjs`
- `.content.mjx`
- `.content.cjs`
- `.content.cjx`

L'application recherchera par défaut les fichiers correspondant au modèle glob `./src/**/*.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`.

Ces extensions par défaut conviennent à la plupart des applications. Cependant, si vous avez des exigences spécifiques, consultez le [guide de personnalisation des extensions de contenu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md#content-configuration) pour des instructions sur la manière de les gérer.

Pour une liste complète des options de configuration, visitez la documentation de configuration.

## Déclarez Votre Contenu

Créez et gérez vos dictionnaires :

```tsx fileName="src/example.content.tsx" contentDeclarationFormat="typescript"
import { t, enu, cond, nest, md, type Dictionary } from "intlayer";

interface Content {
  imbricatedContent: {
    imbricatedContent2: {
      stringContent: string;
      numberContent: number;
      booleanContent: boolean;
      javaScriptContent: string;
    };
  };
  multilingualContent: string;
  quantityContent: string;
  conditionalContent: string;
  externalContent: string;
  insertionContent: string;
  fileContent: string;
  nestedContent: any;
  markdownContent: any;
  jsxContent: any;
}

export default {
  key: "page",
  content: {
    imbricatedContent: {
      imbricatedContent2: {
        stringContent: "Bonjour le monde",
        numberContent: 123,
        booleanContent: true,
        javaScriptContent: `${process.env.NODE_ENV}`,
      },
    },
    multilingualContent: t({
      en: "Contenu en anglais",
      "en-GB": "Contenu en anglais (UK)",
      fr: "Contenu en français",
      es: "Contenu en espagnol",
    }),
    quantityContent: enu({
      "<-1": "Moins d'une voiture",
      "-1": "Moins une voiture",
      "0": "Aucune voiture",
      "1": "Une voiture",
      ">5": "Quelques voitures",
      ">19": "Beaucoup de voitures",
    }),
    conditionalContent: cond({
      true: "La validation est activée",
      false: "La validation est désactivée",
    }),
    nestedContent: nest(
      "navbar", // La clé du dictionnaire à imbriquer
      "login.button" // [Optionnel] Le chemin vers le contenu à imbriquer
    ),
    externalContent: fetch("https://example.com").then((res) => res.json())
    markdownContent: md("# Exemple de Markdown"),

    /*
     * Disponible uniquement avec `react-intlayer` ou `next-intlayer`
     */
    jsxContent: <h1>Mon titre</h1>,
  },
} satisfies Dictionary<Content>; // [optionnel] Dictionary est générique et vous permet de renforcer le formatage de votre dictionnaire
```

```javascript fileName="src/example.content.mjx" contentDeclarationFormat="esm"
import { t, enu, cond, nest, md } from "intlayer";

/** @type {import('intlayer').Dictionary} */
export default {
  key: "page",
  content: {
    imbricatedContent: {
      imbricatedContent2: {
        stringContent: "Bonjour le monde",
        numberContent: 123,
        booleanContent: true,
        javaScriptContent: `${process.env.NODE_ENV}`,
      },
      imbricatedArray: [1, 2, 3],
    },
    multilingualContent: t({
      en: "Contenu en anglais",
      "en-GB": "Contenu en anglais (UK)",
      fr: "Contenu en français",
      es: "Contenu en espagnol",
    }),
    quantityContent: enu({
      "<-1": "Moins d'une voiture",
      "-1": "Moins une voiture",
      "0": "Aucune voiture",
      "1": "Une voiture",
      ">5": "Quelques voitures",
      ">19": "Beaucoup de voitures",
    }),
    conditionalContent: cond({
      true: "La validation est activée",
      false: "La validation est désactivée",
    }),
    nestedContent: nest(
      "navbar", // La clé du dictionnaire à imbriquer
      "login.button" // [Optionnel] Le chemin vers le contenu à imbriquer
    ),
    markdownContent: md("# Exemple de Markdown"),
    externalContent: fetch("https://example.com").then((res) => res.json())

    // Disponible uniquement avec `react-intlayer` ou `next-intlayer`
    jsxContent: <h1>Mon titre</h1>,
  },
};
```

```javascript fileName="src/example.content.cjx" contentDeclarationFormat="commonjs"
const { t, enu, cond, nest, md } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
module.exports = {
  key: "page",
  content: {
    imbricatedContent: {
      imbricatedContent2: {
        stringContent: "Bonjour le monde",
        numberContent: 123,
        booleanContent: true,
        javaScriptContent: `${process.env.NODE_ENV}`,
      },
      imbricatedArray: [1, 2, 3],
    },
    multilingualContent: t({
      en: "Contenu en anglais",
      "en-GB": "Contenu en anglais (UK)",
      fr: "Contenu en français",
      es: "Contenu en espagnol",
    }),
    quantityContent: enu({
      "<-1": "Moins d'une voiture",
      "-1": "Moins une voiture",
      "0": "Aucune voiture",
      "1": "Une voiture",
      ">5": "Quelques voitures",
      ">19": "Beaucoup de voitures",
    }),
    conditionalContent: cond({
      true: "La validation est activée",
      false: "La validation est désactivée",
    }),
    nestedContent: nest(
      "navbar", // La clé du dictionnaire à imbriquer
      "login.button" // [Optionnel] Le chemin vers le contenu à imbriquer
    ),
    markdownContent: md("# Exemple de Markdown"),
    externalContent: fetch("https://example.com").then((res) => res.json())

    // Disponible uniquement avec `react-intlayer` ou `next-intlayer`
    jsxContent: <h1>Mon titre</h1>,
  },
};
```

```json5 fileName="src/example.content.json"  contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "page",
  "content": {
    "imbricatedContent": {
      "imbricatedContent2": {
        "stringContent": "Bonjour le monde",
        "numberContent": 123,
        "booleanContent": true,
      },
      "imbricatedArray": [1, 2, 3],
    },
    "multilingualContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Contenu en anglais",
        "en-GB": "Contenu en anglais (UK)",
        "fr": "Contenu en français",
        "es": "Contenu en espagnol",
      },
    },
    "quantityContent": {
      "nodeType": "enumeration",
      "enumeration": {
        "0": "Aucune voiture",
        "1": "Une voiture",
        "<-1": "Moins d'une voiture",
        "-1": "Moins une voiture",
        ">5": "Quelques voitures",
        ">19": "Beaucoup de voitures",
      },
    },
    "conditionalContent": {
      "nodeType": "condition",
      "condition": {
        "true": "La validation est activée",
        "false": "La validation est désactivée",
      },
    },
    "nestedContent": {
      "nodeType": "nested",
      "nested": { "dictionaryKey": "app" },
    },
    "markdownContent": {
      "nodeType": "markdown",
      "markdown": "# Exemple de Markdown",
    },
    "jsxContent": {
      "type": "h1",
      "key": null,
      "ref": null,
      "props": {
        "children": ["Mon titre"],
      },
    },
  },
}
```

## Imbrication de fonctions

Vous pouvez sans problème imbriquer des fonctions dans d'autres.

Exemple :

```javascript fileName="src/example.content.tsx" contentDeclarationFormat="typescript"
import { t, enu, cond, nest, md, type Dictionary } from "intlayer";

const getName = async () => "Jean Dupont";

export default {
  key: "page",
  content: {
    // `getIntlayer('page','fr').hiMessage` retourne `['Salut', ' ', 'Jean Dupont']`
    hiMessage: [
      t({
        en: "Hi",
        fr: "Salut",
        es: "Hola",
      }),
      " ",
      getName(),
    ],
    // Contenu composite imbriquant condition, énumération et contenu multilingue
    // `getIntlayer('page','fr').advancedContent(true)(10) retourne 'Plusieurs articles trouvés'`
    advancedContent: cond({
      true: enu({
        "0": t({
          en: "No items found",
          fr: "Aucun article trouvé",
          es: "No se encontraron artículos",
        }),
        "1": t({
          en: "One item found",
          fr: "Un article trouvé",
          es: "Se encontró un artículo",
        }),
        ">1": t({
          en: "Multiple items found",
          fr: "Plusieurs articles trouvés",
          es: "Se encontraron múltiples artículos",
        }),
      }),
      false: t({
        en: "No valid data available",
        fr: "Aucune donnée valide disponible",
        es: "No hay datos válidos disponibles",
      }),
    }),
  },
} satisfies Dictionary;
```

```javascript fileName="src/example.content.mjx" contentDeclarationFormat="esm"
import { t, enu, cond, nest, md } from "intlayer";

const getName = async () => "Jean Dupont";

/** @type {import('intlayer').Dictionary} */
export default {
  key: "page",
  content: {
    // `getIntlayer('page','fr').hiMessage` retourne `['Salut', ' ', 'Jean Dupont']`
    hiMessage: [
      t({
        en: "Hi",
        fr: "Salut",
        es: "Hola",
      }),
      " ",
      getName(),
    ],
    // Contenu composite imbriquant condition, énumération et contenu multilingue
    // `getIntlayer('page','fr').advancedContent(true)(10) retourne 'Plusieurs articles trouvés'`
    advancedContent: cond({
      true: enu({
        "0": t({
          en: "No items found",
          fr: "Aucun article trouvé",
          es: "No se encontraron artículos",
        }),
        "1": t({
          en: "One item found",
          fr: "Un article trouvé",
          es: "Se encontró un artículo",
        }),
        ">1": t({
          en: "Multiple items found",
          fr: "Plusieurs articles trouvés",
          es: "Se encontraron múltiples artículos",
        }),
      }),
      false: t({
        en: "No valid data available",
        fr: "Aucune donnée valide disponible",
        es: "No hay datos válidos disponibles",
      }),
    }),
  },
};
```

```javascript fileName="src/example.content.cjx" contentDeclarationFormat="commonjs"
const { t, enu, cond, nest, md } = require("intlayer");

const getName = async () => "Jean Dupont";

/** @type {import('intlayer').Dictionary} */
module.exports = {
  key: "page",
  content: {
    // `getIntlayer('page','fr').hiMessage` retourne `['Salut', ' ', 'Jean Dupont']`
    hiMessage: [
      t({
        en: "Hi",
        fr: "Salut",
        es: "Hola",
      }),
      " ",
      getName(),
    ],
    // Contenu composite imbriquant condition, énumération et contenu multilingue
    // `getIntlayer('page','fr').advancedContent(true)(10) retourne 'Plusieurs articles trouvés'`
    advancedContent: cond({
      true: enu({
        "0": t({
          en: "No items found",
          fr: "Aucun article trouvé",
          es: "No se encontraron artículos",
        }),
        "1": t({
          en: "One item found",
          fr: "Un article trouvé",
          es: "Se encontró un artículo",
        }),
        ">1": t({
          en: "Multiple items found",
          fr: "Plusieurs articles trouvés",
          es: "Se encontraron múltiples artículos",
        }),
      }),
      false: t({
        en: "No valid data available",
        fr: "Aucune donnée valide disponible",
        es: "No hay datos válidos disponibles",
      }),
    }),
  },
};
```

```json5 fileName="src/example.content.json"  contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "page",
  "content": {
    "hiMessage": {
      "nodeType": "composite",
      "composite": [
        {
          "nodeType": "translation",
          "translation": {
            "en": "Hi",
            "fr": "Salut",
            "es": "Hola",
          },
        },
        " ",
        "Jean Dupont",
      ],
    },
    "advancedContent": {
      "nodeType": "condition",
      "condition": {
        "true": {
          "nodeType": "enumeration",
          "enumeration": {
            "0": {
              "nodeType": "translation",
              "translation": {
                "en": "No items found",
                "fr": "Aucun article trouvé",
                "es": "No se encontraron artículos",
              },
            },
            "1": {
              "nodeType": "translation",
              "translation": {
                "en": "One item found",
                "fr": "Un article trouvé",
                "es": "Se encontró un artículo",
              },
            },
            ">1": {
              "nodeType": "translation",
              "translation": {
                "en": "Multiple items found",
                "fr": "Plusieurs articles trouvés",
                "es": "Se encontraron múltiples artículos",
              },
            },
          },
        },
        "false": {
          "nodeType": "translation",
          "translation": {
            "en": "No valid data available",
            "fr": "Aucune donnée valide disponible",
            "es": "No hay datos válidos disponibles",
          },
        },
      },
    },
  },
}
```
