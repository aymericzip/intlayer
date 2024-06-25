# Intlayer: Next-Level Content Management in JavaScript

**Intlayer** is an innovative Content Management System (CMS) designed specifically for JavaScript developers. It enables seamless transpilation of JavaScript content into structured dictionaries, making integration into your codebase straightforward and efficient.

## Why Choose Intlayer?

- **JavaScript-Powered Content Management**: Harness the flexibility of JavaScript to define and manage your content efficiently.
- **Type-Safe Environment**: Leverage TypeScript to ensure all your content definitions are precise and error-free.
- **Integrated Content Files**: Keep your translations close to their respective components, enhancing maintainability and clarity.

## intlayer package

`intlayer` package intend to declare your content in a structured way, using JavaScript.

To build dictionaries from this declaration, you can use [intlayer-cli](https://github.com/aypineau/intlayer/blob/main/packages/intlayer-cli/readme_en.md).
And to interpret intlayer dictionaries you can interpreters, such as [react-intlayer](https://github.com/aypineau/intlayer/blob/main/packages/react-intlayer/readme_en.md), or [next-intlayer](https://github.com/aypineau/intlayer/blob/main/packages/next-intlayer/readme_en.md)

## Getting Started with Intlayer

[See how to use intlayer with NextJS](https://github.com/aypineau/intlayer/blob/main/readme_en.md)

### Install Package

Install the necessary packages using npm:

```bash
npm install intlayer
```

```bash
yarn install intlayer
```

```bash
pnpm install intlayer
```

### Manage Your Content

Create and manage your content dictionaries:

#### Using typescript

```typescript
// src/app/[locale]/page.content.ts
import { t, enu, type DeclarationContent } from "intlayer";

const pageContent: DeclarationContent = {
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
      "0": "No cars",
      "1": "One car",
      ">5": "Some cars",
      ">19": "Many cars",
    }),
  },
};

// Content should be exported as default
export default pageContent;
```

#### Using ECMAScript modules

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

#### Using CommonJS modules

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

#### Using JSON

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

This version emphasizes ease of use, practical steps, and the professional application of Intlayer in a Next.js environment.
