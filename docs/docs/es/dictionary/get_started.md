---
docName: dictionary__get_started
url: https://intlayer.org/doc/concept/content
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/get_started.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Diccionario | Primeros pasos
description: Descubre cómo declarar y usar diccionarios en tu sitio web multilingüe. Sigue los pasos en esta documentación en línea para configurar tu proyecto en pocos minutos.
keywords:
  - Primeros pasos
  - Internacionalización
  - Documentación
  - Intlayer
  - Next.js
  - JavaScript
  - React
---

# Primeros pasos en la declaración de tu contenido

<iframe title="i18n, Markdown, JSON… una única solución para gestionarlo todo | Intlayer" class="m-auto aspect-[16/9] w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/1VHgSY_j9_I?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

## Extensiones de archivos

Por defecto, Intlayer vigila todos los archivos con las siguientes extensiones para declaraciones de contenido:

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

Estas extensiones predeterminadas son adecuadas para la mayoría de las aplicaciones. Sin embargo, si tienes requisitos específicos, consulta la [guía de personalización de extensiones de contenido](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md#content-configuration) para obtener instrucciones sobre cómo gestionarlas.

Para una lista completa de opciones de configuración, visita la documentación de configuración.

## Declara Tu Contenido

Crea y gestiona tus diccionarios:

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
        stringContent: "Hola Mundo", // Contenido de cadena
        numberContent: 123, // Contenido numérico
        booleanContent: true, // Contenido booleano
        javaScriptContent: `${process.env.NODE_ENV}`, // Contenido JavaScript
      },
    },
    multilingualContent: t({
      en: "English content",
      "en-GB": "English content (UK)",
      fr: "French content",
      es: "Contenido en español",
    }),
    quantityContent: enu({
      "<-1": "Menos de menos un coche",
      "-1": "Menos un coche",
      "0": "Ningún coche",
      "1": "Un coche",
      ">5": "Algunos coches",
      ">19": "Muchos coches",
    }),
    conditionalContent: cond({
      true: "La validación está habilitada",
      false: "La validación está deshabilitada",
    }),
    insertionContent: insert("¡Hola {{name}}!"),
    nestedContent: nest(
      "navbar", // La clave del diccionario para anidar
      "login.button" // [Opcional] La ruta al contenido para anidar
    ),
    fileContent: file("./path/to/file.txt"),
    externalContent: fetch("https://example.com").then((res) => res.json()),
    markdownContent: md("# Ejemplo de Markdown"),

    /*
     * Solo disponible usando `react-intlayer` o `next-intlayer`
     */
    jsxContent: <h1>Mi título</h1>,
  },
} satisfies Dictionary<Content>; // [opcional] Dictionary es genérico y te permite reforzar el formato de tu diccionario
```

```javascript fileName="src/example.content.mjx" contentDeclarationFormat="esm"
import { t, enu, cond, nest, md, insert, file } from "intlayer";

/** @type {import('intlayer').Dictionary} */
export default {
  key: "page",
  content: {
    imbricatedContent: {
      imbricatedContent2: {
        stringContent: "Hola Mundo",
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
      "0": "Ningún coche",
      "1": "Un coche",
      ">5": "Algunos coches",
      ">19": "Muchos coches",
    }),
    conditionalContent: cond({
      true: "La validación está habilitada",
      false: "La validación está deshabilitada",
    }),
    insertionContent: insert("¡Hola {{name}}!"),
    nestedContent: nest(
      "navbar", // La clave del diccionario para anidar
      "login.button" // [Opcional] La ruta al contenido para anidar
    ),
    markdownContent: md("# Ejemplo de Markdown"),
    fileContent: file("./path/to/file.txt"),
    externalContent: fetch("https://example.com").then((res) => res.json())

    // Solo disponible usando `react-intlayer` o `next-intlayer`
    jsxContent: <h1>Mi título</h1>,
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
        stringContent: "Hola Mundo",
        numberContent: 123,
        booleanContent: true,
        javaScriptContent: `${process.env.NODE_ENV}`, // Contenido de JavaScript
      },
      imbricatedArray: [1, 2, 3], // Array imbricado
    },
    multilingualContent: t({
      en: "Contenido en inglés",
      "en-GB": "Contenido en inglés (Reino Unido)",
      fr: "Contenido en francés",
      es: "Contenido en español",
    }),
    quantityContent: enu({
      "<-1": "Menos de menos un coche",
      "-1": "Menos un coche",
      "0": "Ningún coche",
      "1": "Un coche",
      ">5": "Algunos coches",
      ">19": "Muchos coches",
    }),
    conditionalContent: cond({
      true: "La validación está habilitada",
      false: "La validación está deshabilitada",
    }),
    insertionContent: insert("¡Hola {{name}}!"),
    nestedContent: nest(
      "navbar", // La clave del diccionario para anidar
      "login.button" // [Opcional] La ruta al contenido para anidar
    ),
    markdownContent: md("# Ejemplo de Markdown"),
    fileContent: file("./path/to/file.txt"),
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
        "stringContent": "Hola Mundo",
        "numberContent": 123,
        "booleanContent": true,
      },
      "imbricatedArray": [1, 2, 3],
    },
    "multilingualContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Contenido en inglés",
        "en-GB": "Contenido en inglés (Reino Unido)",
        "fr": "Contenido en francés",
        "es": "Contenido en español",
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
    "insertionContent": {
      "nodeType": "insertion",
      "insertion": "¡Hola {{name}}!",
    },
    "nestedContent": {
      "nodeType": "nested",
      "nested": { "dictionaryKey": "app" },
    },
    "markdownContent": {
      "nodeType": "markdown",
      "markdown": "# Ejemplo de Markdown",
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
        "children": ["Mi título"],
      },
    },
  },
}
```

## Imbricación de funciones

Puedes sin problema imbricar funciones dentro de otras.

Ejemplo:

```javascript fileName="src/example.content.tsx" contentDeclarationFormat="typescript"
import { t, enu, cond, nest, md, type Dictionary } from "intlayer";

const getName = async () => "John Doe";

export default {
  key: "page",
  content: {
    // `getIntlayer('page','en').hiMessage` devuelve `['Hi', ' ', 'John Doe']`
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
    // `getIntlayer('page','en').advancedContent(true)(10)` devuelve 'Multiple items found'
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
    // `getIntlayer('page','en').hiMessage` devuelve `['Hola', ' ', 'John Doe']`
    hiMessage: [
      t({
        en: "Hi",
        fr: "Salut",
        es: "Hola",
      }),
      " ",
      getName(),
    ],
    // Contenido compuesto que imbrica condición, enumeración y contenido multilingüe
    // `getIntlayer('page','en').advancedContent(true)(10)` devuelve 'Se encontraron múltiples artículos'
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
/        }),
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
    // `getIntlayer('page','en').hiMessage` devuelve `['Hola', ' ', 'John Doe']`
    hiMessage: [
      t({
        en: "Hi",
        fr: "Salut",
        es: "Hola",
      }),
      " ",
      getName(),
    ],
    // Contenido compuesto que imbrica condición, enumeración y contenido multilingüe
    // `getIntlayer('page','en').advancedContent(true)(10) devuelve 'Se encontraron múltiples artículos'`
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

## Recursos Adicionales

Para más detalles en Intlayer, consulte los siguientes recursos:

- [Documentación de Declaración de Contenido por Localización](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/per_locale_file.md)
- [Documentación de Contenido de Traducción](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/translation.md)
- [Documentación de Contenido de Enumeración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/enumeration.md)
- [Documentación de Contenido de Condición](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/condition.md)
- [Documentación de Contenido de Inserción](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/insertion.md)
- [Documentación de Contenido de Archivo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/file.md)
- [Documentación de Contenido Anidado](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/nesting.md)
- [Documentación de Contenido Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/markdown.md)
- [Documentación de Contenido de Obtención de Funciones](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/function_fetching.md)

## Historial del Documento

- 5.5.10 - 2025-06-29: Historial inicial
