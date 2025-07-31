<div align="center">
  <a href="https://intlayer.org">
    <img src="https://raw.githubusercontent.com/aymericzip/intlayer/572ae9c9acafb74307b81530c1931a8e98990aef/docs/assets/logo.png" width="500" alt="intlayer" />
  </a>
</div>

<div align="center">
  <a href="https://www.npmjs.com/package/intlayer" target="blank"><img
    align="center"
    alt="npm"
    src="https://img.shields.io/npm/v/intlayer.svg?labelColor=49516F&color=8994BC&style=for-the-badge"
    height="30" /></a>
  <a href="https://npmjs.org/package/intlayer" target="blank"><img
      align="center"
      src="https://img.shields.io/npm/dm/intlayer?labelColor=49516F&color=8994BC&style=for-the-badge"
      alt="monthly downloads"
      height="30"
    /></a>
  <a href="https://npmjs.org/package/intlayer" target="blank"><img
      align="center"
      src="https://img.shields.io/npm/types/intlayer?label=types%20included&labelColor=49516F&color=8994BC&style=for-the-badge"
      alt="types included"
      height="30"
    /></a>
</div>

<div>
    <br/>
    <p align="center">
      <a href="https://www.linkedin.com/company/intlayerorg" target="blank"><img align="center"
         src="https://img.shields.io/badge/linkedin-%231DA1F2.svg?style=for-the-badge&logo=linkedin&logoColor=white"
         alt="Intlayer LinkedIn" height="30"/></a>
      <a href="https://www.facebook.com/intlayer" target="blank"><img align="center"
         src="https://img.shields.io/badge/facebook-4267B2.svg?style=for-the-badge&logo=facebook&logoColor=white"
         alt="Intlayer Facebook" height="30"/></a>
      <a href="https://www.instagram.com/intlayer/" target="blank"><img align="center"
         src="https://img.shields.io/badge/instagram-%23E4405F.svg?style=for-the-badge&logo=Instagram&logoColor=white"
         alt="Intlayer Instagram" height="30"/></a>
      <a href="https://x.com/Intlayer183096" target="blank"><img align="center"
         src="https://img.shields.io/badge/x-1DA1F2.svg?style=for-the-badge&logo=x&logoColor=white"
         alt="Intlayer X" height="30"/></a>
      <a href="https://www.youtube.com/@intlayer" target="blank"><img align="center"
         src="https://img.shields.io/badge/youtube-FF0000.svg?style=for-the-badge&logo=youtube&logoColor=white"
         alt="Intlayer YouTube" height="30"/></a>
      <a href="https://www.tiktok.com/@intlayer" target="blank"><img align="center"
         src="https://img.shields.io/badge/tiktok-000000.svg?style=for-the-badge&logo=tiktok&logoColor=white"
         alt="Intlayer TikTok" height="30"/></a>
      <br>
    </p>
</div>

# intlayer: Manage Multilingual Dictionary (i18n)

**Intlayer** is a suite of packages designed specifically for JavaScript developers. It is compatible with frameworks like React, Next.js, and Express.js.

**The `intlayer` package** allows you to declare your content anywhere in your code. It converts multilingual content declarations into structured dictionaries that integrate seamlessly into your application. With TypeScript, **Intlayer** enhances your development by providing stronger, more efficient tools.

## Why to integrate Intlayer?

- **JavaScript-Powered Content Management**: Harness the flexibility of JavaScript to define and manage your content efficiently.
- **Type-Safe Environment**: Leverage TypeScript to ensure all your content definitions are precise and error-free.
- **Integrated Content Files**: Keep your translations close to their respective components, enhancing maintainability and clarity.

## Installation

Install the necessary package using your preferred package manager:

```bash packageManager="npm"
npm install intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer
```

```bash packageManager="yarn"
yarn add intlayer
```

### Configure Intlayer

Intlayer provides a configuration file to set up your project. Place this file in the root of your project.

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

> For a complete list of available parameters, refer to the [configuration documentation](https://intlayer.org/doc/concept/configuration).

## Example of usage

With Intlayer, you can declare your content in a structured way anywhere in your codebase.

By default, Intlayer scans for files with the extension `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`.

> can modify the default extension by setting the `contentDir` property in the [configuration file](https://intlayer.org/doc/concept/configuration).

```bash codeFormat="typescript"
.
├── intlayer.config.ts
└── src
    ├── ClientComponent
    │   ├── index.content.ts
    │   └── index.tsx
    └── ServerComponent
        ├── index.content.ts
        └── index.tsx
```

### Declare your content

Here’s an example of content declaration:

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

### Build your dictionaries

You can build your dictionaries using the [intlayer-cli](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer-cli/readme.md).

```bash packageManager="npm"
npx intlayer dictionaries build
```

```bash packageManager="yarn"
yarn intlayer build
```

```bash packageManager="pnpm"
pnpm intlayer build
```

This command scans all `*.content.*` files, compiles them, and writes the results to the directory specified in your **`intlayer.config.ts`** (by default, `./.intlayer`).

A typical output might look like:

```bash
.
└── .intlayer
    ├── dictionary  # Contain the dictionary of your content
    │   ├── client-component.json
    │   └── server-component.json
    ├── main  # Contain the entry point of your dictionary to be used in your application
    │   ├── dictionary.cjs
    │   └── dictionary.mjs
    └── types  # Contain the auto-generated type definitions of your dictionary
        ├── intlayer.d.ts  # Contain the auto-generated type definitions of Intlayer
        ├── client-component.d.ts
        └── server-component.d.ts
```

### Build i18next resources

Intlayer can be configured to build dictionaries for [i18next](https://www.i18next.com/). For that you need to add the following configuration to your `intlayer.config.ts` file:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  /* ... */
  content: {
    // Tells Intlayer to generate message files for i18next
    dictionaryOutput: ["i18next"],

    // The directory where Intlayer will write your message JSON files
    i18nextResourcesDir: "./i18next/resources",
  },
};
```

> For a complete list of available parameters, refer to the [configuration documentation](https://intlayer.org/doc/concept/configuration).

Output:

```bash
.
└── i18next
    └── resources
        ├── en
        │   ├── client-component.json
        │   └── server-component.json
        ├── es
        │   ├── client-component.json
        │   └── server-component.json
        └── fr
            ├── client-component.json
            └── server-component.json
```

For example, the **en/client-component.json** might look like:

```json fileName="intlayer/dictionary/en/client-component.json"
{
  "myTranslatedContent": "Hello World",
  "zero_numberOfCar": "No cars",
  "one_numberOfCar": "One car",
  "two_numberOfCar": "Two cars",
  "other_numberOfCar": "Some cars"
}
```

### Build next-intl dictionaries

Intlayer can be configured to build dictionaries for [i18next](https://www.i18next.com/) or [next-intl](https://github.com/formatjs/react-intl/tree/main/packages/next-intl). For that you need to add the following configuration to your `intlayer.config.ts` file:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  /* ... */
  content: {
    // Tells Intlayer to generate message files for i18next
    dictionaryOutput: ["next-intl"],

    // The directory where Intlayer will write your message JSON files
    nextIntlMessagesDir: "./i18next/messages",
  },
};
```

> For a complete list of available parameters, refer to the [configuration documentation](https://intlayer.org/doc/concept/configuration).

Output:

```bash
.
└── intl
    └── messages
        ├── en
        │   ├── client-component.json
        │   └── server-component.json
        ├── es
        │   ├── client-component.json
        │   └── server-component.json
        └── fr
            ├── client-component.json
            └── server-component.json
```

For example, the **en/client-component.json** might look like:

```json fileName="intlayer/dictionary/en/client-component.json"
{
  "myTranslatedContent": "Hello World",
  "zero_numberOfCar": "No cars",
  "one_numberOfCar": "One car",
  "two_numberOfCar": "Two cars",
  "other_numberOfCar": "Some cars"
}
```

## CLI tools

Intlayer provides a CLI tool to:

- audit your content declarations and complete missing translations
- build dictionaries from your content declarations
- push and pull distant dictionaries from your CMS to your locale project

Consult [intlayer-cli](https://intlayer.org/doc/concept/cli) for more information.

## Use Intlayer into your application

One your content declared, you can consume your Intlayer dictionaries in your application.

Intlayer is available as a package for your application.

### React Application

To use Intlayer in your React application, you can use [react-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/react-intlayer/index.md).

### Next.js Application

To use Intlayer in your Next.js application, you can use [next-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/next-intlayer/index.md).

### Express Application

To use Intlayer in your Express application, you can use [express-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/express-intlayer/index.md).

## Functions provided by `intlayer` package

The `intlayer` package also provides some functions to help you to internationalize your application.

- [`getConfiguration()`](https://intlayer.org/doc/packages/intlayer/getConfiguration)
- [`getTranslation()`](https://intlayer.org/doc/packages/intlayer/getTranslation)
- [`getEnumeration()`](https://intlayer.org/doc/packages/intlayer/getEnumeration)
- [`getLocaleName()`](https://intlayer.org/doc/packages/intlayer/getLocaleName)
- [`getLocaleLang()`](https://intlayer.org/doc/packages/intlayer/getLocaleLang)
- [`getHTMLTextDir()`](https://intlayer.org/doc/packages/intlayer/getHTMLTextDir)
- [`getPathWithoutLocale()`](https://intlayer.org/doc/packages/intlayer/getPathWithoutLocale)
- [`getMultilingualUrls()`](https://intlayer.org/doc/packages/intlayer/getMultilingualUrls)
- [`getLocalizedUrl()`](https://intlayer.org/doc/packages/intlayer/getLocalizedUrl)
- [`getPathWithoutLocale()`](https://intlayer.org/doc/packages/intlayer/getPathWithoutLocale)

## Read about Intlayer

- [Intlayer Website](https://intlayer.org)
- [Intlayer Documentation](https://intlayer.org/doc)
- [Intlayer GitHub](https://github.com/aymericzip/intlayer)

- [Ask your questions to our smart documentation](https://intlayer.org/docchat)
