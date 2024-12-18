# Getting Started the declaration of your content

## Files extensions

By default, Intlayer watches all files with the following extensions for content declarations:

- `.content.ts`
- `.content.tsx`
- `.content.js`
- `.content.mjs`
- `.content.cjs`

The application will search for files that match the `./src/**/*.content.{ts,tsx,js,mjs,cjs}` glob pattern by default.

These default extensions are suitable for most applications. However, if you have specific requirements, refer to the content extension customization guide for instructions on how to manage them.

For a full list of configuration options, visit the configuration documentation.

## Declare Your Content

Create and manage your content dictionaries:

### Using typescript

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
      "<-1": "Less than minus one car",
      "-1": "Minus one car",
      "0": "No cars",
      "1": "One car",
      ">5": "Some cars",
      ">19": "Many cars",
    }),
  },
} satisfies DeclarationContent<Content>;
```

### Using ECMAScript modules

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
      "<-1": "Less than minus one car",
      "-1": "Minus one car",
      0: "No cars",
      1: "One car",
      ">5": "Some cars",
      ">19": "Many cars",
    }),
  },
};
```

### Using CommonJS modules

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
      "<-1": "Less than minus one car",
      "-1": "Minus one car",
      0: "No cars",
      1: "One car",
      ">5": "Some cars",
      ">19": "Many cars",
    }),
  },
};
```

### Using JSON

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
        "<-1": "Less than minus one car",
        "-1": "Minus one car",
        "0": "No cars",
        "1": "One car",
        ">5": "Some cars",
        ">19": "Many cars",
      },
    },
  },
}
```

Warning, JSON content declaration make impossible to implement [function fetching](https://github.com/aymericzip/intlayer/blob/main/docs/en/content_declaration/function_fetching.md)
