````md
# Démarrage pour déclarer votre contenu

## Extensions de fichiers

Par défaut, Intlayer surveille tous les fichiers avec les extensions suivantes pour les déclarations de contenu :

- `.content.ts`
- `.content.tsx`
- `.content.js`
- `.content.mjs`
- `.content.cjs`

L'application recherchera par défaut des fichiers correspondant au motif glob `./src/**/*.content.{ts,tsx,js,jsx,mjs,cjs}`.

Ces extensions par défaut conviennent à la plupart des applications. Cependant, si vous avez des exigences spécifiques, référez-vous au [guide de personnalisation des extensions de contenu](https://github.com/aymericzip/intlayer/blob/main/docs/fr/configuration.md#content-configuration) pour des instructions sur leur gestion.

Pour une liste complète des options de configuration, consultez la documentation de configuration.

## Déclarez votre contenu

Créez et gérez vos dictionnaires :

```tsx fileName="src/example.content.ts" codeFormat="typescript"
import { t, enu, cond, nest, md, type Dictionary } from "intlayer";

interface Content {
  imbricatedContent: {
    imbricatedContent2: {
      stringContent: string;
      numberContent: number;
      booleanContent: boolean;
    };
    multilingualContent: string;
    quantityContent: string;
    conditionalContent: string;
    nestedContent: string;
    markdownContent: string;
    externalContent: string;
  };
}

export default {
  key: "page",
  content: {
    imbricatedContent: {
      imbricatedContent2: {
        stringContent: "Bonjour le monde", // Traduction
        numberContent: 123,
        booleanContent: true,
        javaScriptContent: `${process.env.NODE_ENV}`,
      },
    },
    multilingualContent: t({
      en: "Contenu en anglais",
      "en-GB": "Contenu anglais (Royaume-Uni)",
      fr: "Contenu en français",
      es: "Contenu en espagnol",
    }),
    quantityContent: enu({
      "<-1": "Moins d'une voiture",
      "-1": "Moins une voiture",
      "0": "Aucune voiture",
      "1": "Une voiture",
      ">5": "Quelques voitures",
      ">19": "De nombreuses voitures",
    }),
    conditionalContent: cond({
      true: "La validation est activée",
      false: "La validation est désactivée",
    }),
    nestedContent: nest(
      "navbar", // La clé du dictionnaire à imbriquer
      "login.button" // [Optionnel] Le chemin du contenu à imbriquer
    ),
    externalContent: async () => await fetch("https://example.com"),
    markdownContent: md("# Exemple de Markdown"),

    /*
     * Uniquement disponible avec `react-intlayer` ou `next-intlayer`
     */
    jsxContent: <h1>Mon titre</h1>,
  },
} satisfies Dictionary<Content>; // [optionnel] Le dictionnaire est générique et permet de renforcer le formatage de votre dictionnaire
```
````

```javascript fileName="src/example.content.mjs" codeFormat="esm"
import { t, enu, cond, nest, md } from "intlayer";

/** @type {import('intlayer').Dictionary} */
export default {
  key: "page",
  content: {
    imbricatedContent: {
      imbricatedContent2: {
        stringContent: "Bonjour le monde", // Traduction
        numberContent: 123,
        booleanContent: true,
        javaScriptContent: `${process.env.NODE_ENV}`,
      },
      imbricatedArray: [1, 2, 3],
    },
    multilingualContent: t({
      en: "Contenu en anglais",
      "en-GB": "Contenu anglais (Royaume-Uni)",
      fr: "Contenu en français",
      es: "Contenu en espagnol",
    }),
    quantityContent: enu({
      "<-1": "Moins d'une voiture",
      "-1": "Moins une voiture",
      "0": "Aucune voiture",
      "1": "Une voiture",
      ">5": "Quelques voitures",
      ">19": "De nombreuses voitures",
    }),
    conditionalContent: cond({
      true: "La validation est activée",
      false: "La validation est désactivée",
    }),
    nestedContent: nest(
      "navbar", // La clé du dictionnaire à imbriquer
      "login.button" // [Optionnel] Le chemin du contenu à imbriquer
    ),
    markdownContent: md("# Exemple de Markdown"),
    externalContent: async () => await fetch("https://example.com"),

    // Uniquement disponible avec `react-intlayer` ou `next-intlayer`
    jsxContent: <h1>Mon titre</h1>,
  },
};
```

```javascript fileName="src/example.content.cjs" codeFormat="commonjs"
const { t, enu, cond, nest, md } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
module.exports = {
  key: "page",
  content: {
    imbricatedContent: {
      imbricatedContent2: {
        stringContent: "Bonjour le monde", // Traduction
        numberContent: 123,
        booleanContent: true,
        javaScriptContent: `${process.env.NODE_ENV}`,
      },
      imbricatedArray: [1, 2, 3],
    },
    multilingualContent: t({
      en: "Contenu en anglais",
      "en-GB": "Contenu anglais (Royaume-Uni)",
      fr: "Contenu en français",
      es: "Contenu en espagnol",
    }),
    quantityContent: enu({
      "<-1": "Moins d'une voiture",
      "-1": "Moins une voiture",
      "0": "Aucune voiture",
      "1": "Une voiture",
      ">5": "Quelques voitures",
      ">19": "De nombreuses voitures",
    }),
    conditionalContent: cond({
      true: "La validation est activée",
      false: "La validation est désactivée",
    }),
    nestedContent: nest(
      "navbar", // La clé du dictionnaire à imbriquer
      "login.button" // [Optionnel] Le chemin du contenu à imbriquer
    ),
    markdownContent: md("# Exemple de Markdown"),
    externalContent: async () => await fetch("https://example.com"),

    // Uniquement disponible avec `react-intlayer` ou `next-intlayer`
    jsxContent: <h1>Mon titre</h1>,
  },
};
```

```json5 fileName="src/example.content.json"  codeFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "page",
  "content": {
    "imbricatedContent": {
      "imbricatedContent2": {
        "stringContent": "Bonjour le monde", // Traduction
        "numberContent": 123,
        "booleanContent": true,
      },
      "imbricatedArray": [1, 2, 3],
    },
    "multilingualContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Contenu en anglais",
        "en-GB": "Contenu anglais (Royaume-Uni)",
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
        ">19": "De nombreuses voitures",
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

## Fonction imbriquée

Vous pouvez sans problème imbriquer des fonctions dans d'autres.

Exemple :

```javascript fileName="src/example.content.ts" codeFormat="typescript"
import { t, enu, cond, nest, md, type Dictionary } from "intlayer";

const getName = async () => "John Doe"; // Exemple

export default {
  key: "page",
  content: { ... }
} satisfies Dictionary;
```

```

```
