# Comenzando la declaración de su contenido

## Extensiones de archivos

Por defecto, Intlayer observa todos los archivos con las siguientes extensiones para declaraciones de contenido:

- `.content.ts`
- `.content.tsx`
- `.content.js`
- `.content.mjs`
- `.content.cjs`

La aplicación buscará archivos que coincidan con el patrón glob `./src/**/*.content.{ts,tsx,js,mjs,cjs}` de forma predeterminada.

Estas extensiones predeterminadas son adecuadas para la mayoría de las aplicaciones. Sin embargo, si tiene requisitos específicos, consulte la guía de personalización de extensiones de contenido para obtener instrucciones sobre cómo administrarlas.

Para obtener una lista completa de opciones de configuración, visite la documentación de configuración.

## Declare Su Contenido

Cree y gestione sus diccionarios de contenido:

### Usando TypeScript

```typescript
// src/app/[locale]/page.content.ts
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
      "<-1": "Menos de un coche",
      "-1": "Menos un coche",
      "0": "Sin coches",
      "1": "Un coche",
      ">5": "Algunos coches",
      ">19": "Muchos coches",
    }),
  },
} satisfies DeclarationContent<Content>;
```

### Usando módulos ECMAScript

```javascript
// src/app/[locale]/page.content.mjs

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
      "<-1": "Menos de un coche",
      "-1": "Menos un coche",
      0: "Sin coches",
      1: "Un coche",
      ">5": "Algunos coches",
      ">19": "Muchos coches",
    }),
  },
};
```

### Usando módulos CommonJS

```javascript
// src/app/[locale]/page.content.cjs

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
      "<-1": "Menos de un coche",
      "-1": "Menos un coche",
      0: "Sin coches",
      1: "Un coche",
      ">5": "Algunos coches",
      ">19": "Muchos coches",
    }),
  },
};
```

### Usando JSON

```json5
// src/app/[locale]/page.content.json

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
        "<-1": "Menos de un coche",
        "-1": "Menos un coche",
        "0": "Sin coches",
        "1": "Un coche",
        ">5": "Algunos coches",
        ">19": "Muchos coches",
      },
    },
  },
}
```

Advertencia, la declaración de contenido JSON hace imposible implementar [función de recuperación](https://github.com/aymericzip/intlayer/blob/main/docs/es/content_declaration/function_fetching.md)
