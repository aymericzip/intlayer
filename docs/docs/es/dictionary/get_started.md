---
docName: dictionary__get_started
url: https://intlayer.org/doc/concept/content
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/get_started.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: Declaración de Contenido | Empezar
description: Descubra cómo declarar y usar la declaración de contenido en su sitio web multilingüe. Siga los pasos de esta documentación en línea para configurar su proyecto en unos minutos.
keywords:
  - Empezar
  - Internacionalización
  - Documentación
  - Intlayer
  - Next.js
  - JavaScript
  - React
---

# Comenzando la declaración de su contenido

<iframe title="i18n, Markdown, JSON… one single solution to manage it all | Intlayer" class="m-auto aspect-[16/9] w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/1VHgSY_j9_I?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

## Extensiones de archivos

Por defecto, Intlayer observa todos los archivos con las siguientes extensiones para declaraciones de contenido:

- `.content.json`
- `.content.ts`
- `.content.tsx`
- `.content.js`
- `.content.jsx`
- `.content.mjs`
- `.content.mjx`
- `.content.cjs`
- `.content.cjx`

La aplicación buscará archivos que coincidan con el patrón glob `./src/**/*.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}` por defecto.

Estas extensiones predeterminadas son adecuadas para la mayoría de las aplicaciones. Sin embargo, si tiene requisitos específicos, consulte la [guía de personalización de extensiones de contenido](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md#content-configuration) para obtener instrucciones sobre cómo gestionarlas.

Para una lista completa de opciones de configuración, visite la documentación de configuración.

## Declare Su Contenido

Cree y gestione sus diccionarios:

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
      "<-1": "Menos de menos un coche",
      "-1": "Menos un coche",
      "0": "Sin coches",
      "1": "Un coche",
      ">5": "Algunos coches",
      ">19": "Muchos coches",
    }),
    conditionalContent: cond({
      true: "La validación está habilitada",
      false: "La validación está deshabilitada",
    }),
    nestedContent: nest(
      "navbar", // La clave del diccionario a anidar
      "login.button" // [Opcional] La ruta al contenido a anidar
    ),
    externalContent: fetch("https://example.com").then((res) => res.json())
    markdownContent: md("# Ejemplo de Markdown"),

    /*
     * Solo disponible usando `react-intlayer` o `next-intlayer`
     */
    jsxContent: <h1>Mi título</h1>,
  },
} satisfies Dictionary<Content>; // [opcional] Dictionary es genérico y permite fortalecer el formato de su diccionario
```

```javascript fileName="src/example.content.mjx" contentDeclarationFormat="esm"
import { t, enu, cond, nest, md } from "intlayer";

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
      "<-1": "Menos de menos un coche",
      "-1": "Menos un coche",
      "0": "Sin coches",
      "1": "Un coche",
      ">5": "Algunos coches",
      ">19": "Muchos coches",
    }),
    conditionalContent: cond({
      true: "La validación está habilitada",
      false: "La validación está deshabilitada",
    }),
    nestedContent: nest(
      "navbar", // La clave del diccionario a anidar
      "login.button" // [Opcional] La ruta al contenido a anidar
    ),
    markdownContent: md("# Ejemplo de Markdown"),
    externalContent: fetch("https://example.com").then((res) => res.json())

    // Solo disponible usando `react-intlayer` o `next-intlayer`
    jsxContent: <h1>Mi título</h1>,
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
      "<-1": "Menos de menos un coche",
      "-1": "Menos un coche",
      "0": "Sin coches",
      "1": "Un coche",
      ">5": "Algunos coches",
      ">19": "Muchos coches",
    }),
    conditionalContent: cond({
      true: "La validación está habilitada",
      false: "La validación está deshabilitada",
    }),
    nestedContent: nest(
      "navbar", // La clave del diccionario a anidar
      "login.button" // [Opcional] La ruta al contenido a anidar
    ),
    markdownContent: md("# Ejemplo de Markdown"),
    externalContent: fetch("https://example.com").then((res) => res.json())

    // Solo disponible usando `react-intlayer` o `next-intlayer`
    jsxContent: <h1>Mi título</h1>,
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
        "0": "Sin coches",
        "1": "Un coche",
        "<-1": "Menos de menos un coche",
        "-1": "Menos un coche",
        ">5": "Algunos coches",
        ">19": "Muchos coches",
      },
    },
    "conditionalContent": {
      "nodeType": "condition",
      "condition": {
        "true": "La validación está habilitada",
        "false": "La validación está deshabilitada",
      },
    },
    "nestedContent": {
      "nodeType": "nested",
      "nested": { "dictionaryKey": "app" },
    },
    "markdownContent": {
      "nodeType": "markdown",
      "markdown": "# Ejemplo de Markdown",
    },
    "jsxContent": {
      "type": "h1",
      "key": null,
      "ref": null,
      "props": {
        "children": ["Mi título"],
      },
    },
  },
}
```

## Imbricación de funciones

Puede sin problema imbricar funciones en otras.

Ejemplo:

```javascript fileName="src/example.content.tsx" contentDeclarationFormat="typescript"
import { t, enu, cond, nest, md, type Dictionary } from "intlayer";

const getName = async () => "John Doe";

export default {
  key: "page",
  content: {
    // `getIntlayer('page','es').hiMessage` devuelve `['Hola', ' ', 'John Doe']`
    hiMessage: [
      t({
        en: "Hi",
        fr: "Salut",
        es: "Hola",
      }),
      " ",
      getName(),
    ],
    // Contenido compuesto imbricando condición, enumeración y contenido multilingüe
    // `getIntlayer('page','es').advancedContent(true)(10) devuelve 'Se encontraron múltiples artículos'`
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
    // `getIntlayer('page','es').hiMessage` devuelve `['Hola', ' ', 'John Doe']`
    hiMessage: [
      t({
        en: "Hi",
        fr: "Salut",
        es: "Hola",
      }),
      " ",
      getName(),
    ],
    // Contenido compuesto imbricando condición, enumeración y contenido multilingüe
    // `getIntlayer('page','es').advancedContent(true)(10) devuelve 'Se encontraron múltiples artículos'`
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
    // `getIntlayer('page','es').hiMessage` devuelve `['Hola', ' ', 'John Doe']`
    hiMessage: [
      t({
        en: "Hi",
        fr: "Salut",
        es: "Hola",
      }),
      " ",
      getName(),
    ],
    // Contenido compuesto imbricando condición, enumeración y contenido multilingüe
    // `getIntlayer('page','es').advancedContent(true)(10) devuelve 'Se encontraron múltiples artículos'`
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
