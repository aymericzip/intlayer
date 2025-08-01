---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Package Documentation | next-intlayer
description: See how to use the next-intlayer package
keywords:
  - Intlayer
  - next-intlayer
  - Internationalisation
  - Documentation
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - next-intlayer
---

# next-intlayer: NPM Package to internationalise (i18n) a Next.js application

**Intlayer** is a suite of packages designed specifically for JavaScript developers. It is compatible with frameworks like React, Next.js, and Express.js.

**The `next-intlayer` package** allows you to internationalise your Next.js application. It provides context providers and hooks for Next.js internationalisation. Additionally, it includes the Next.js plugin for integrating Intlayer with [Webpack](https://webpack.js.org/) or [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack), as well as middleware for detecting the user's preferred locale, managing cookies, and handling URL redirection.

## Why Internationalise Your Next.js Application?

Internationalising your Next.js application is essential for serving a global audience effectively. It allows your application to deliver content and messages in the preferred language of each user. This capability enhances user experience and broadens your application's reach by making it more accessible and relevant to people from different linguistic backgrounds.

## Why integrate Intlayer?

- **JavaScript-Powered Content Management**: Harness the flexibility of JavaScript to define and manage your content efficiently.
- **Type-Safe Environment**: Leverage TypeScript to ensure all your content definitions are precise and error-free.
- **Integrated Content Files**: Keep your translations close to their respective components, enhancing maintainability and clarity.

## Installation

Install the necessary package using your preferred package manager:

```bash packageManager="npm"
npm install next-intlayer
```

```bash packageManager="yarn"
yarn add next-intlayer
```

```bash packageManager="pnpm"
pnpm add next-intlayer
```

## Example of usage

With Intlayer, you can declare your content in a structured way anywhere in your codebase.

By default, Intlayer scans for files with the extension `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`.

> You can modify the default extension by setting the `contentDir` property in the [configuration file](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/configuration.md).

```bash codeFormat="typescript"
.
├── intlayer.config.ts
└── src
    └── components
        ├── ClientComponent
        │   ├── index.content.ts
        │   └── index.tsx
        └── ServerComponent
            ├── index.content.ts
            └── index.tsx
```

```bash codeFormat="esm"
.
├── intlayer.config.mjs
└── src
    └── components
        ├── ClientComponent
        │   ├── index.content.mjs
        │   └── index.mjx
        └── ServerComponent
            ├── index.content.mjs
            └── index.mjx
```

```bash codeFormat="commonjs"
.
├── intlayer.config.cjs
└── src
    └── components
        ├── ClientComponent
        │   ├── index.content.cjs
        │   └── index.cjx
        └── ServerComponent
            ├── index.content.cjs
            └── index.cjx
```

### Declare your content

`next-intlayer` is designed to work with the [`intlayer` package](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/packages/intlayer/index.md). `intlayer` is a package that enables you to declare your content anywhere within your code. It transforms multilingual content declarations into structured dictionaries that integrate seamlessly into your application.

Here is an example of content declaration:

```tsx fileName="src/ClientComponent/index.content.ts" codeFormat="typescript"
import { t, type Dictionary } from "intlayer";

const clientComponentContent = {
  key: "client-component",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
    numberOfCar: enu({
      "<-1": "Less than minus one car",
      "-1": "Minus one car",
      "0": "No cars",
      "1": "One car",
      ">5": "Some cars",
      ">19": "Many cars",
    }),
  },
} satisfies Dictionary;

export default clientComponentContent;
```

```jsx fileName="src/ClientComponent/index.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const clientComponentContent = {
  key: "client-component",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
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

export default clientComponentContent;
```

```jsx fileName="src/ClientComponent/index.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const clientComponentContent = {
  key: "client-component",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
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

module.exports = clientComponentContent;
```

```json fileName="src/ClientComponent/index.content.json" codeFormat="json"
{
  "key": "client-component",
  "content": {
    "myTranslatedContent": {
      "nodeType": "translation",
      "translation": {
        "en-GB": "Hello World",
        "fr": "Bonjour le monde",
        "es": "Hola Mundo"
      }
    },
    "numberOfCar": {
      "nodeType": "enumeration",
      "enumeration": {
        "<-1": "Less than minus one car",
        "-1": "Minus one car",
        "0": "No cars",
        "1": "One car",
        ">5": "Some cars",
        ">19": "Many cars"
      }
    }
  }
}
```

### Utilise Content in Your Code

Once you have declared your content, you can use it in your code. Here's an example of how to use the content in a React component:

```tsx {4,7} fileName="src/components/ClientComponentExample.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ClientComponentExample: FC = () => {
  const { myTranslatedContent } = useIntlayer("client-component"); // Create related content declaration

  return (
    <div>
      <p>{myTranslatedContent}</p>
    </div>
  );
};
```

```jsx {3,6} fileName="src/components/ClientComponentExample.mjx" codeFormat="esm"
"use client";

import { useIntlayer } from "next-intlayer";

const ClientComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("client-component"); // Create related content declaration

  return (
    <div>
      <p>{myTranslatedContent}</p>
    </div>
  );
};
```

```jsx {3,6} fileName="src/components/ClientComponentExample.csx" codeFormat="commonjs"
"use client";

const { useIntlayer } = require("next-intlayer");

const ClientComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("client-component"); // Create related content declaration

  return (
    <div>
      <p>{myTranslatedContent}</p>
    </div>
  );
};
```

## Mastering the internationalisation of your Next.js application

Intlayer provides a lot of features to help you internationalise your Next.js application. Here are some of the key features:

- **Internationalisation of server components**: Intlayer allows you to internationalise your server components in the same way as your client components. This means that you can use the same content declarations for both client and server components.

```jsx {3,6} fileName="src/components/ClientComponentExample.csx" codeFormat="commonjs"
"use client";

const { useIntlayer } = require("next-intlayer");

const ClientComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("client-component"); // Create related content declaration

  return (
    <div>
      <p>{myTranslatedContent}</p>
    </div>
  );
};
```

## Mastering the internationalisation of your Next.js application

Intlayer provides a lot of features to help you internationalise your Next.js application. Here are some of the key features:

- **Internationalisation of server components**: Intlayer allows you to internationalise your server components in the same way as your client components. This means that you can use the same content declarations for both client and server components.
- **Middleware for Locale Detection**: Intlayer provides middleware to detect the user's preferred locale. This middleware is used to detect the user's preferred locale and redirect them to the appropriate URL as specified in the [configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/configuration.md).
- **Internationalisation of metadata**: Intlayer provides a way to internationalise your metadata, such as the title of your page, using the `generateMetadata` function provided by Next.js. You can use the `getTranslation` function to translate your metadata.
- **Internationalisation of sitemap.xml and robots.txt**: Intlayer allows you to internationalise your sitemap.xml and robots.txt files. You can use the `getMultilingualUrls` function to generate multilingual URLs for your sitemap.
- **Internationalisation of URLs**: Intlayer allows you to internationalise your URLs by using the `getMultilingualUrls` function. This function generates multilingual URLs for your sitemap.

**To learn more about these features, refer to the [Next.js Internationalisation (i18n) with Intlayer and Next.js 15 App Router](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_15.md) guide.**

## Functions provided by `next-intlayer` package

- **Internationalisation of sitemap.xml and robots.txt**: Intlayer allows you to internationalise your sitemap.xml and robots.txt files. You can use the `getMultilingualUrls` function to generate multilingual URLs for your sitemap.
- **Internationalisation of URLs**: Intlayer allows you to internationalise your URLs by using the `getMultilingualUrls` function. This function generates multilingual URLs for your sitemap.

**To learn more about these features, refer to the [Next.js Internationalisation (i18n) with Intlayer and Next.js 15 App Router](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_15.md) guide.**

## Functions provided by `next-intlayer` package

The `next-intlayer` package also provides some functions to help you to internationalise your application.

- [`t()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/next-intlayer/t.md)
- [`useIntlayer()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/next-intlayer/useIntlayer.md)
- [`useDictionary()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/next-intlayer/useDictionary.md)
- [`useLocale()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/next-intlayer/useLocale.md)
- [`useIntlayerAsync()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/next-intlayer/useIntlayerAsync.md)

## Doc History

- 5.5.10 - 2025-06-29: Init history
