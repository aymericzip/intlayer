# Getting Started the declaration of your content

## Configure Intlayer for your project

[See how to use intlayer with NextJS](https://github.com/aymericzip/intlayer/blob/main/docs/en/intlayer_with_nextjs_15.md)

[See how to use intlayer with ReactJS](https://github.com/aymericzip/intlayer/blob/main/docs/en/intlayer_with_create_react_app.md)

[See how to use intlayer with Vite and React](https://github.com/aymericzip/intlayer/blob/main/docs/en/intlayer_with_vite+react.md)

## Install Package

Install the necessary packages using npm:

```bash
npm install intlayer
```

```bash
yarn add intlayer
```

```bash
pnpm add intlayer
```

## Manage Your Content

Create and manage your content dictionaries:

### Using typescript

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
        "<-1": "Less than minus one car",
        "-1": "Minus one car",
        "0": "No cars",
        "1": "One car",
        ">5": "Some cars",
        ">19": "Many cars",
      }),
    },
  },
} satisfies DeclarationContent;

// Content should be exported as default
export default pageContent;
```

### Using ECMAScript modules

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
      "<-1": "Less than minus one car",
      "-1": "Minus one car",
      0: "No cars",
      1: "One car",
      ">5": "Some cars",
      ">19": "Many cars",
    }),
  },
};

// Content should be exported as default
export default pageContent;
```

### Using CommonJS modules

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
      "<-1": "Less than minus one car",
      "-1": "Minus one car",
      0: "No cars",
      1: "One car",
      ">5": "Some cars",
      ">19": "Many cars",
    }),
  },
};

// Content should be exported as default
module.exports = pageContent;
```

### Using JSON

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
      "<-1": "Less than minus one car",
      "-1": "Minus one car",
      "0": "No cars",
      "1": "One car",
      ">5": "Some cars",
      ">19": "Many cars",
    },
  },
}
```

Warning, JSON content declaration make impossible to implement [function fetching](https://github.com/aymericzip/intlayer/blob/main/docs/en/content_declaration/function_fetching.md)
