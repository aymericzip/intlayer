<div align="center">
  <a href="https://intlayer.org">
    <img src="https://raw.githubusercontent.com/aymericzip/intlayer/572ae9c9acafb74307b81530c1931a8e98990aef/docs/assets/logo.png" width="500" alt="intlayer" />
  </a>
</div>

<div align="center">
  <a href="https://www.npmjs.com/package/angular-intlayer">
    <img alt="npm" src="https://img.shields.io/npm/v/angular-intlayer.svg?labelColor=49516F&color=8994BC" />
  </a>
  <a href="https://npmjs.org/package/angular-intlayer">
    <img alt="downloads" src="https://badgen.net/npm/dm/angular-intlayer?labelColor=49516F&color=8994BC" />
  </a>
  <a href="https://npmjs.org/package/angular-intlayer">
    <img alt="types included" src="https://badgen.net/npm/types/angular-intlayer?labelColor=49516F&color=8994BC" 
  />
</div>

> This package is in development.

# angular-intlayer: Internationalize (i18n) an Angular application

**Intlayer** is a suite of packages designed specifically for JavaScript developers. It is compatible with frameworks like Angular, Svelte, and Express.js.

**The `angular-intlayer` package** allows you to internationalize your Angular application. It provides context providers and hooks for Angular internationalization.

## Why Internationalize Your Angular Application?

Internationalizing your Angular application is essential for serving a global audience effectively. It allows your application to deliver content and messages in the preferred language of each user. This capability enhances user experience and broadens your application's reach by making it more accessible and relevant to people from different linguistic backgrounds.

## Why to integrate Intlayer?

- **JavaScript-Powered Content Management**: Harness the flexibility of JavaScript to define and manage your content efficiently.
- **Type-Safe Environment**: Leverage TypeScript to ensure all your content definitions are precise and error-free.
- **Integrated Content Files**: Keep your translations close to their respective components, enhancing maintainability and clarity.

## Installation

Install the necessary package using your preferred package manager:

```bash packageManager="npm"
npm install angular-intlayer
```

```bash packageManager="yarn"
yarn add angular-intlayer
```

```bash packageManager="pnpm"
pnpm add angular-intlayer
```

## Example of usage

With Intlayer, you can declare your content in a structured way anywhere in your codebase.

By default, Intlayer scans for files with the extension `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`.

> You can modify the default extension by setting the `contentDir` property in the [configuration file](https://intlayer.org/doc/concept/configuration).

```bash codeFormat="typescript"
.
├── intlayer.config.ts
└── src
    └── components
        ├── Component1
        │   ├── index.content.ts
        │   └── index.angular
        └── Component2
            ├── index.content.ts
            └── index.angular
```

### Declare your content

`angular-intlayer` is made to work with the [`intlayer` package](https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/intlayer/index.md).`intlayer` is a package that allows you to declare your content anywhere in your code. It converts multilingual content declarations into structured dictionaries that integrate seamlessly into your application.

Here’s an example of content declaration:

```tsx fileName="src/Component1/index.content.ts" codeFormat="typescript"
import { t, type Dictionary } from "intlayer";

const component1Content = {
  key: "component-1",
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

export default component1Content;
```

### Utilize Content in Your Code

...

## Mastering the internationalization of your Angular application

Intlayer provides a lot of features to help you internationalize your Angular application.

**To learn more about these features, refer to the [Angular Internationalization (i18n) with Intlayer and Vite and Angular](https://github.com/aymericzip/intlayer/blob/main/docs/en/intlayer_with_vite+react.md) guide for Vite and Angular Application, or the [Angular Internationalization (i18n) with Intlayer and Angular (CRA)](https://intlayer.org/doc/environment/create-react-app) guide for Angular Create App.**

## Functions provided by `angular-intlayer` package

The `angular-intlayer` package also provides some functions to help you to internationalize your application.

## Read about Intlayer

- [Intlayer Website](https://intlayer.org)
- [Intlayer Documentation](https://intlayer.org/docs)
- [Intlayer GitHub](https://github.com/aymericzip/intlayer)

- [Ask your questions to our smart documentation](https://intlayer.org/docs/chat)
