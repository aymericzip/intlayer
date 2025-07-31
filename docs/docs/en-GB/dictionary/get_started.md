---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Dictionary | Get Started
description: Discover how to declare and use dictionaries in your multilingual website. Follow the steps in this online documentation to set up your project in a few minutes.
keywords:
  - Get Started
  - Internationalisation
  - Documentation
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
---

# Getting Started with the declaration of your content

<iframe title="i18n, Markdown, JSON… one single solution to manage it all | Intlayer" class="m-auto aspect-[16/9] w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/1VHgSY_j9_I?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

## File extensions

By default, Intlayer monitors all files with the following extensions for content declarations:

- `.content.json`
- `.content.ts`
- `.content.tsx`
- `.content.js`
- `.content.jsx`
- `.content.mjs`
- `.content.mjx`
- `.content.cjs`
- `.content.cjx`

The application will search for files that match the `./src/**/*.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}` glob pattern by default.

These default extensions are suitable for most applications. However, if you have specific requirements, refer to the [content extension customisation guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/configuration.md#content-configuration) for instructions on how to manage them.

For a full list of configuration options, visit the configuration documentation.

## Declare Your Content

Create and manage your dictionaries:

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
        stringContent: "Hello World",
        numberContent: 123,
        booleanContent: true,
        javaScriptContent: `${process.env.NODE_ENV}`,
      },
    },
    multilingualContent: t({
      en: "English content",
      "en-GB": "English content (UK)",
      fr: "French content",
      es: "Spanish content",
    }),
    quantityContent: enu({
      "<-1": "Less than minus one car",
      "-1": "Minus one car",
      "0": "No cars",
      "1": "One car",
      ">5": "Some cars",
      ">19": "Many cars",
    }),
    conditionalContent: cond({
      true: "Validation is enabled",
      false: "Validation is disabled",
    }),
    insertionContent: insert("Hello {{name}}!"),
    nestedContent: nest(
      "navbar", // The key of the dictionary to nest
      "login.button" // [Optional] The path to the content to nest
    ),
    fileContent: file("./path/to/file.txt"),
    externalContent: fetch("https://example.com").then((res) => res.json()),
    markdownContent: md("# Markdown Example"),

    /*
     * Only available using `react-intlayer` or `next-intlayer`
     */
    jsxContent: <h1>My title</h1>,
  },
} satisfies Dictionary<Content>; // [optional] Dictionary is generic and allows you to strengthen the formatting of your dictionary
```

```javascript fileName="src/example.content.mjx" contentDeclarationFormat="esm"
import { t, enu, cond, nest, md, insert, file } from "intlayer";

/** @type {import('intlayer').Dictionary} */
export default {
  key: "page",
  content: {
    imbricatedContent: {
      imbricatedContent2: {
        stringContent: "Hello World",
        numberContent: 123,
        booleanContent: true,
        javaScriptContent: `${process.env.NODE_ENV}`,
      },
      imbricatedArray: [1, 2, 3],
    },
    multilingualContent: t({
      en: "English content",
      "en-GB": "English content (UK)",
      fr: "French content",
      es: "Spanish content",
    }),
    quantityContent: enu({
      "<-1": "Less than minus one car",
      "-1": "Minus one car",
      "0": "No cars",
      "1": "One car",
      ">5": "Some cars",
      ">19": "Many cars",
    }),
    conditionalContent: cond({
      true: "Validation is enabled",
      false: "Validation is disabled",
    }),
    insertionContent: insert("Hello {{name}}!"),
    nestedContent: nest(
      "navbar", // The key of the dictionary to nest
      "login.button" // [Optional] The path to the content to nest
    ),
    markdownContent: md("# Markdown Example"),
    fileContent: file("./path/to/file.txt"),
    externalContent: fetch("https://example.com").then((res) => res.json())

    // Only available using `react-intlayer` or `next-intlayer`
    jsxContent: <h1>My title</h1>,
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
        stringContent: "Hello World",
        numberContent: 123,
        booleanContent: true,
        javaScriptContent: `${process.env.NODE_ENV}`,
      },
      imbricatedArray: [1, 2, 3],
    },
    multilingualContent: t({
      en: "English content",
      "en-GB": "English content (UK)",
      fr: "French content",
      es: "Spanish content",
    }),
    quantityContent: enu({
      "<-1": "Less than minus one car",
      "-1": "Minus one car",
      "0": "No cars",
      "1": "One car",
      ">5": "Some cars",
      ">19": "Many cars",
    }),
    conditionalContent: cond({
      true: "Validation is enabled",
      false: "Validation is disabled",
    }),
    insertionContent: insert("Hello {{name}}!"),
    nestedContent: nest(
      "navbar", // The key of the dictionary to nest
      "login.button" // [Optional] The path to the content to nest
    ),
    markdownContent: md("# Markdown Example"),
    fileContent: file("./path/to/file.txt"),
    externalContent: fetch("https://example.com").then((res) => res.json())

    // Only available using `react-intlayer` or `next-intlayer`
    jsxContent: <h1>My title</h1>,
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
        "stringContent": "Hello World",
        "numberContent": 123,
        "booleanContent": true,
      },
      "imbricatedArray": [1, 2, 3],
    },
    "multilingualContent": {
      "nodeType": "translation",
      "translation": {
        "en": "English content",
        "en-GB": "English content (UK)",
        "fr": "French content",
        "es": "Spanish content",
      },
    },
    "quantityContent": {
      "nodeType": "enumeration",
      "enumeration": {
        "0": "No cars",
        "1": "One car",
        "<-1": "Less than minus one car",
        "-1": "Minus one car",
        ">5": "Some cars",
        ">19": "Many cars",
      },
    },
    "conditionalContent": {
      "nodeType": "condition",
      "condition": {
        "true": "Validation is enabled",
        "false": "Validation is disabled",
      },
    },
    "insertionContent": {
      "nodeType": "insertion",
      "insertion": "Hello {{name}}!",
    },
    "nestedContent": {
      "nodeType": "nested",
      "nested": { "dictionaryKey": "app" },
    },
    "markdownContent": {
      "nodeType": "markdown",
      "markdown": "# Markdown Example",
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
        "children": ["My title"],
      },
    },
  },
}
```

## Function imbrication

You can without problem nest functions within other ones.

Example:

```javascript fileName="src/example.content.tsx" contentDeclarationFormat="typescript"
import { t, enu, cond, nest, md, type Dictionary } from "intlayer";

const getName = async () => "John Doe";

export default {
  key: "page",
  content: {
    // `getIntlayer('page','en').hiMessage` returns `['Hi', ' ', 'John Doe']`
    hiMessage: [
      t({
        en: "Hi",
        fr: "Salut",
        es: "Hola",
      }),
      " ",
      getName(),
    ],
    // Composite content imbricating condition, enumeration, and multilingual content
    // `getIntlayer('page','en').advancedContent(true)(10) returns 'Multiple items found'`
    advancedContent: cond({
      true: enu({
        "0": t({
          en: "No items found",
          fr: "Aucun article trouvé",
          es: "No se encontraron artículos",
        }),
        "1": t({
          'en-GB': "One item found",
          en: "One item found",
          fr: "Un article trouvé",
          es: "Se encontró un artículo",
        }),
        ">1": t({
          'en-GB': "Multiple items found",
          en: "Multiple items found",
          fr: "Plusieurs articles trouvés",
          es: "Se encontraron múltiples artículos",
        }),
      }),
      false: t({
        'en-GB': "No valid data available",
         en: "No valid data available",
        fr: "Aucune donnée valide disponible",
        es: "No hay datos válidos disponibles",
      }),
    }),
  },
} satisfies Dictionary;
```

You can without problem imbricate functions into other ones.

Example :

```javascript fileName="src/example.content.tsx" contentDeclarationFormat="typescript"
import { t, enu, cond, nest, md, type Dictionary } from "intlayer";

const getName = async () => "John Doe";

export default {
  key: "page",
  content: {
    // `getIntlayer('page','en').hiMessage` returns `['Hi', ' ', 'John Doe']`
    hiMessage: [
      t({
        en: "Hi",
        fr: "Salut",
        es: "Hola",
      }),
      " ",
      getName(),
    ],
    // Composite content imbricating condition, enumeration, and multilingual content
    // `getIntlayer('page','en').advancedContent(true)(10) returns 'Multiple items found'`
    advancedContent: cond({
      true: enu({
        "0": t({
          en: "No items found",
          fr: "Aucun article trouvé",
          es: "No se encontraron artículos",
        }),
        "1": t({
          'en-GB': "One item found",
          en: "One item found",
          fr: "Un article trouvé",
          es: "Se encontró un artículo",
        }),
        ">1": t({
          'en-GB': "Multiple items found",
          en: "Multiple items found",
          fr: "Plusieurs articles trouvés",
          es: "Se encontraron múltiples artículos",
        }),
      }),
      false: t({
        'en-GB': "No valid data available",
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
    // `getIntlayer('page','en').hiMessage` returns `['Hi', ' ', 'John Doe']`
    hiMessage: [
      t({
        "en-GB": "Hi",
        en: "Hi",
        fr: "Salut",
        es: "Hola",
      }),
      " ",
      getName(),
    ],
    // Composite content imbricating condition, enumeration, and multilingual content
    // `getIntlayer('page','en').advancedContent(true)(10) returns 'Multiple items found'`
    advancedContent: cond({
      true: enu({
        "0": t({
          "en-GB": "No items found",
          en: "No items found",
          fr: "Aucun article trouvé",
          es: "No se encontraron artículos",
        }),
        "1": t({
          "en-GB": "One item found",
          en: "One item found",
          fr: "Un article trouvé",
          es: "Se encontró un artículo",
        }),
        ">1": t({
          "en-GB": "Multiple items found",
          en: "Multiple items found",
          fr: "Plusieurs articles trouvés",
          es: "Se encontraron múltiples artículos",
        }),
      }),
      false: t({
        "en-GB": "No valid data available",
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
    // `getIntlayer('page','en').hiMessage` returns `['Hi', ' ', 'John Doe']`
    hiMessage: [
      t({
        'en-GB': "Hi",
        en: "Hi",
        fr: "Salut",
        'en-GB': "No items found",
        en: "No items found",
        fr: "Aucun article trouvé",
        es: "No se encontraron artículos",
      }),
      "1": t({
        'en-GB': "One item found",
        en: "One item found",
        fr: "Un article trouvé",
         es: "Se encontró un artículo",
      }),
      ">1": t({
        'en-GB': "Multiple items found",
        en: "Multiple items found",
        fr: "Plusieurs articles trouvés",
        es: "Se encontraron múltiples artículos",
      }),
    ],

    false: t({
      'en-GB': "No valid data available",
      en: "No valid data available",
      fr: "Aucune donnée valide disponible",
      es: "No hay datos válidos disponibles",
    }),
  },
},

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
            "en-GB": "Hi",
            en: "Hi",
            fr: "Salut",
            es: "Hola",
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
                "en-GB": "No items found",
                "en": "No items found",
                "fr": "Aucun article trouvé",
                "es": "No se encontraron artículos",
              },
            },
            "1": {
              "nodeType": "translation",
              "translation": {
                "en-GB": "One item found",
                "en": "One item found",
                "fr": "Un article trouvé",
                "es": "Se encontró un artículo",
              },
            },
            ">1": {
              "nodeType": "translation",
              "translation": {
                "en-GB": "Multiple items found",
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
            "en-GB": "No valid data available",
            en: "No valid data available",
            fr: "Aucune donnée valide disponible",
            es: "No hay datos válidos disponibles",
          },
        },
      },
    },
  },
}
```

## Additional Resources

For more details in Intlayer, refer to the following resources:

- [Per-Locale Content Declaration Documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/dictionary/per_locale_file.md)
- [Translation Content Documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/dictionary/translation.md)
- [Enumeration Content Documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/dictionary/enumeration.md)
- [Condition Content Documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/dictionary/condition.md)
- [Insertion Content Documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/dictionary/insertion.md)
- [File Content Documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/dictionary/file.md)
- [Nesting Content Documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/dictionary/nesting.md)
- [Markdown Content Documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/dictionary/markdown.md)
- [Function Fetching Content Documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/dictionary/function_fetching.md)

## Doc History

- 5.5.10 - 2025-06-29: Initial history
