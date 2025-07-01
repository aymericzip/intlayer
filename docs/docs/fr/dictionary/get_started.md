---
docName: dictionary__get_started
url: https://intlayer.org/doc/concept/content
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/get_started.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Dictionnaire | Premiers pas
description: Découvrez comment déclarer et utiliser des dictionnaires dans votre site web multilingue. Suivez les étapes de cette documentation en ligne pour configurer votre projet en quelques minutes.
keywords:
  - Premiers pas
  - Internationalisation
  - Documentation
  - Intlayer
  - Next.js
  - JavaScript
  - React
---

# Premiers pas dans la déclaration de votre contenu

<iframe title="i18n, Markdown, JSON… une solution unique pour tout gérer | Intlayer" class="m-auto aspect-[16/9] w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/1VHgSY_j9_I?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

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

L'application recherchera par défaut les fichiers correspondant au motif glob `./src/**/*.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`.

Ces extensions par défaut conviennent à la plupart des applications. Cependant, si vous avez des exigences spécifiques, consultez le [guide de personnalisation des extensions de contenu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md#content-configuration) pour des instructions sur la manière de les gérer.

Pour une liste complète des options de configuration, consultez la documentation de configuration.

## Déclarez Votre Contenu

Créez et gérez vos dictionnaires :

```tsx fileName="src/example.content.tsx" contentDeclarationFormat="typescript"
import { type ReactNode } from "react";
import {
  t,
  enu,
  cond,
  nest,
  md,
  insert,
  file,
  type Dictionary,
} from "intlayer";

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
  markdownContent: never;
  externalContent: string;
  insertionContent: string;
  nestedContent: string;
  fileContent: string;
  jsxContent: ReactNode;
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
      en: "Contenu anglais",
      "en-GB": "Contenu anglais (Royaume-Uni)",
      fr: "Contenu français",
      es: "Contenu espagnol",
    }),
    quantityContent: enu({
      "<-1": "Moins d'une voiture en dessous de moins un",
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
    insertionContent: insert("Bonjour {{name}} !"),
    nestedContent: nest(
      "navbar", // La clé du dictionnaire à imbriquer
      "login.button" // [Optionnel] Le chemin vers le contenu à imbriquer
    ),
    fileContent: file("./path/to/file.txt"),
    externalContent: fetch("https://example.com").then((res) => res.json()),
    markdownContent: md("# Exemple de Markdown"),

    /*
     * Disponible uniquement avec `react-intlayer` ou `next-intlayer`
     */
    jsxContent: <h1>Mon titre</h1>,
  },
} satisfies Dictionary<Content>; // [optionnel] Dictionary est générique et vous permet de renforcer le formatage de votre dictionnaire
```

```javascript fileName="src/example.content.mjx" contentDeclarationFormat="esm"
import { t, enu, cond, nest, md, insert, file } from "intlayer";

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
      en: "English content",
      "en-GB": "English content (UK)",
      fr: "Contenu français",
      es: "Contenu espagnol",
    }),
    quantityContent: enu({
      "<-1": "Moins d'une voiture négative",
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
    insertionContent: insert("Bonjour {{name}} !"),
    nestedContent: nest(
      "navbar", // La clé du dictionnaire à imbriquer
      "login.button" // [Optionnel] Le chemin vers le contenu à imbriquer
    ),
    markdownContent: md("# Exemple Markdown"),
    fileContent: file("./path/to/file.txt"),
    externalContent: fetch("https://example.com").then((res) => res.json())

    // Disponible uniquement avec `react-intlayer` ou `next-intlayer`
    jsxContent: <h1>Mon titre</h1>,
  },
};
```

```javascript fileName="src/example.content.cjx" contentDeclarationFormat="commonjs"
const { t, enu, cond, nest, md, insert, file } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
module.exports = {
  key: "page",
  content: {
    imbricatedContent: {
      imbricatedContent2: {
        stringContent: "Bonjour le monde", // Contenu chaîne de caractères
        numberContent: 123, // Contenu numérique
        booleanContent: true, // Contenu booléen
        javaScriptContent: `${process.env.NODE_ENV}`, // Contenu JavaScript dynamique
      },
      imbricatedArray: [1, 2, 3], // Tableau imbriqué
    },
    multilingualContent: t({
      en: "English content",
      "en-GB": "English content (UK)",
      fr: "Contenu français",
      es: "Contenido en español",
    }),
    quantityContent: enu({
      "<-1": "Moins d'une voiture négative",
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
    insertionContent: insert("Bonjour {{name}} !"),
    nestedContent: nest(
      "navbar", // La clé du dictionnaire à imbriquer
      "login.button" // [Optionnel] Le chemin vers le contenu à imbriquer
    ),
    markdownContent: md("# Exemple Markdown"),
    fileContent: file("./path/to/file.txt"),
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
        "stringContent": "Bonjour le monde", // Contenu chaîne de caractères
        "numberContent": 123, // Contenu numérique
        "booleanContent": true, // Contenu booléen
      },
      "imbricatedArray": [1, 2, 3], // Tableau imbriqué
    },
    "multilingualContent": {
      "nodeType": "translation", // Type de nœud : traduction
      "translation": {
        "en": "Contenu en anglais",
        "en-GB": "Contenu en anglais (Royaume-Uni)",
        "fr": "Contenu en français",
        "es": "Contenu en espagnol",
      },
    },
    "quantityContent": {
      "nodeType": "enumeration", // Type de nœud : énumération
      "enumeration": {
        "0": "Pas de voitures",
        "1": "Une voiture",
        "<-1": "Moins d'une voiture négative",
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
    "insertionContent": {
      "nodeType": "insertion",
      "insertion": "Bonjour {{name}} !",
    },
    "nestedContent": {
      "nodeType": "nested",
      "nested": { "dictionaryKey": "app" },
    },
    "markdownContent": {
      "nodeType": "markdown",
      "markdown": "# Exemple Markdown",
    },
    "fileContent": {
      "nodeType": "file",
      "file": "./path/to/file.txt",
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

Vous pouvez sans problème imbriquer des fonctions les unes dans les autres.

Exemple :

```javascript fileName="src/example.content.tsx" contentDeclarationFormat="typescript"
import { t, enu, cond, nest, md, type Dictionary } from "intlayer";

const getName = async () => "John Doe";

export default {
  key: "page",
  content: {
    // `getIntlayer('page','en').hiMessage` retourne `['Hi', ' ', 'John Doe']`
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
    // `getIntlayer('page','en').advancedContent(true)(10)` retourne 'Multiple items found'
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

const getName = async () => "John Doe";

/** @type {import('intlayer').Dictionary} */
export default {
  key: "page",
  content: {
    // `getIntlayer('page','en').hiMessage` retourne `['Salut', ' ', 'John Doe']`
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
    // `getIntlayer('page','en').advancedContent(true)(10)` retourne 'Plusieurs articles trouvés'
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

const getName = async () => "John Doe";

/** @type {import('intlayer').Dictionary} */
module.exports = {
  key: "page",
  content: {
    // `getIntlayer('page','en').hiMessage` renvoie `['Salut', ' ', 'John Doe']`
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
    // `getIntlayer('page','en').advancedContent(true)(10)` retourne 'Plusieurs articles trouvés'
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
        "John Doe",
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
                "fr": "Aucun élément trouvé",
                "es": "No se encontraron artículos",
              },
            },
            "1": {
              "nodeType": "translation",
              "translation": {
                "en": "One item found",
                "fr": "Un élément trouvé",
                "es": "Se encontró un artículo",
              },
            },
            ">1": {
              "nodeType": "translation",
              "translation": {
                "en": "Multiple items found",
                "fr": "Plusieurs éléments trouvés",
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

## Ressources supplémentaires

Pour plus de détails sur Intlayer, consultez les ressources suivantes :

- [Documentation sur la déclaration de contenu par langue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/per_locale_file.md)
- [Documentation sur le contenu de traduction](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/translation.md)
- [Documentation sur le contenu d'énumération](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/enumeration.md)
- [Documentation du contenu Condition](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/condition.md)
- [Documentation du contenu Insertion](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/insertion.md)
- [Documentation du contenu Fichier](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/file.md)
- [Documentation du contenu Imbrication](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/nesting.md)
- [Documentation du contenu Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/markdown.md)
- [Documentation du contenu Fonction de récupération](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/function_fetching.md)

## Historique du document

- 5.5.10 - 2025-06-29 : Historique initial
