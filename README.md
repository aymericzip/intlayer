<div align="center">
  <a href="https://www.npmjs.com/package/intlayer">
    <img src="docs/assets/logo.png" width="500" alt="intlayer" />
  </a>
</div>

<div align="center">
  <a href="https://www.npmjs.com/package/intlayer">
    <img alt="npm" src="https://img.shields.io/npm/v/intlayer.svg?labelColor=49516F&color=8994BC" />
  </a>
  <a href="https://npmjs.org/package/intlayer">
    <img alt="downloads" src="https://badgen.net/npm/dm/intlayer?labelColor=49516F&color=8994BC" />
  </a>
  <a href="https://npmjs.org/package/intlayer">
    <img alt="types included" src="https://badgen.net/npm/types/intlayer?labelColor=49516F&color=8994BC" 
  />
  </a>
</div>

# Intlayer: A closer way to translate your application

Intlayer is an innovative internationalization framework designed to replace i18next for Next.js and React applications. It streamlines the process of internationalization with flexible content declaration and robust configuration options.

## Table of Contents

Explore our comprehensive documentation to get started with Intlayer and learn how to integrate it into your projects.

### Get Started

- [Introduction](https://github.com/aymericzip/intlayer/blob/main/docs/docs/introduction.md)

### Concept

- [How Intlayer Works](https://github.com/aymericzip/intlayer/blob/main/docs/docs/how_works_intlayer.md
- [Configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/configuration.md
- [Interest of Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/interest_of_intlayer.md
- [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/intlayer_cli.md
- [Intlayer Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/intlayer_editor.md
- **Content Declaration**
  - [Declare Your Content](https://github.com/aymericzip/intlayer/blob/main/docs/docs/content/get_started.md
  - [Translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/content/translation.md
  - [Enumeration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/content/enumeration.md
  - [Function Fetching](https://github.com/aymericzip/intlayer/blob/main/docs/docs/content/function_fetching.md

### Environment

- [Intlayer with Next.js 15](https://github.com/aymericzip/intlayer/blob/main/docs/docs/intlayer_with_nextjs_15.md
  - [Intlayer with Next.js 14 (App Router)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/intlayer_with_nextjs_14.md
  - [Intlayer with Next.js Page Router](https://github.com/aymericzip/intlayer/blob/main/docs/docs/intlayer_with_nextjs_page_router.md
- [Intlayer with React CRA](https://github.com/aymericzip/intlayer/blob/main/docs/docs/intlayer_with_create_react_app.md
- [Intlayer with Vite and React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/intlayer_with_vite+react.md
- [Intlayer with Express](https://github.com/aymericzip/intlayer/blob/main/docs/docs/intlayer_with_express.md

### Packages

#### express-intlayer

- [t](https://github.com/aymericzip/intlayer/blob/main/docs/docs/packages/express-intlayer/t.md

#### react-intlayer

- [t](https://github.com/aymericzip/intlayer/blob/main/docs/docs/packages/react-intlayer/t.md
- [useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/packages/react-intlayer/useIntlayer.md
- [useDictionary](https://github.com/aymericzip/intlayer/blob/main/docs/docs/packages/react-intlayer/useDictionary.md
- [useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/packages/react-intlayer/useLocale.md

#### next-intlayer

- [t](https://github.com/aymericzip/intlayer/blob/main/docs/docs/packages/next-intlayer/t.md
- [useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/packages/next-intlayer/useIntlayer.md
- [useDictionary](https://github.com/aymericzip/intlayer/blob/main/docs/docs/packages/next-intlayer/useDictionary.md
- [useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/packages/next-intlayer/useLocale.md

### Blog

- [Intlayer and i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/intlayer_with_i18next.md

## Why Intlayer?

Intlayer offers a more modern approach to internationalization compared to traditional frameworks like i18next. It is designed to fit seamlessly into Next.js and React projects, providing intuitive content declaration, robust configuration options, and a simpler setup process.

- **Content Declaration**: Declare content dictionaries in the same directory as your components, enhancing maintainability and reducing complexity. [Learn more](https://github.com/aymericzip/intlayer/blob/main/docs/docs/content_declaration.md
- **Customizable Configuration**: Intlayer allows you to customize various aspects of the framework, including internationalization, middleware, and content handling. [Learn how to configure](https://github.com/aymericzip/intlayer/blob/main/docs/docs/configuration.md
- **Integration with Next.js and React**: Intlayer integrates smoothly with Next.js and React applications. It also supports server-side rendering and dynamic routing. [Explore Next.js integration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/intlayer_with_nextjs_15.md [Explore React integration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/intlayer_with_create_react_app.md.md
- **Scalability and Consistency**: With Intlayer, your content dictionaries are structured and consistent, reducing the chances of errors during development. This ensures a more reliable internationalization process.
- **TypeScript Support**: Intlayer provides full support for TypeScript, allowing for more type-safe code. This enhances developer productivity and code quality.

## Getting Started

To start using Intlayer, follow these steps corresponding to your project type:

For more examples and information on content declaration, [see the documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/content_declaration.md

### Integrating with Next.js

If you're using Next.js, Intlayer is designed to work seamlessly with it. The integration process involves setting up middleware, defining locale routes, and utilizing content dictionaries in your components.

Follow this guide to [set up Intlayer with Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/intlayer_with_nextjs_15.md

### Integrating with Create React App

For Create React App users, Intlayer also provides an easy way to integrate internationalization. Learn how to [set up Intlayer with Create React App](https://github.com/aymericzip/intlayer/blob/main/docs/docs/intlayer_with_create_react_app.md

### Integrating with Vite + React

Intlayer is also compatible with vite and rollup environments. Check how to [set up Intlayer with Vite + React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/intlayer_with_vite+react.md

### Integrating with Express

If you're using Express, Intlayer provides a middleware that can be used to handle internationalization. Learn how to [set up Intlayer with Express](https://github.com/aymericzip/intlayer/blob/main/docs/docs/intlayer_with_express.md

### Configuration

Intlayer's configuration is highly customizable. You can define internationalization settings, middleware behavior, and more. The configuration file supports various formats like TypeScript, JavaScript, and JSON.

Here's an example configuration:

```typescript
// intlayer.config.ts

import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

For more information on configuring Intlayer, [check the configuration documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/configuration.md

## Using Intlayer with i18next

Intlayer can also export i18next dictionaries for projects that still rely on i18next for certain functionalities. This integration allows you to generate i18next dictionaries while still benefiting from Intlayer's flexible content declaration. [Learn how to configure Intlayer for i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/intlayer_with_i18next.md

## CLI Commands

Intlayer comes with a CLI package that allows you to transpile your content declarations into dictionaries. You can run these commands to build your dictionaries:

```bash
npx intlayer build
```

To run in watch mode:

```bash
npx intlayer build --watch
```

For more information on the CLI and its usage, [refer to the CLI documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/intlayer_cli.md

## Conclusion

Intlayer offers a more flexible and modern approach to internationalization. Its seamless integration with Next.js and React, customizable configuration, and support for various content declaration formats make it a powerful choice for internationalization.

For additional resources, guides, and examples, explore the [Intlayer documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/intlayer_with_nextjs_15.md

## Live tutorial on YouTube

[![How to Internationalize your application using Intlayer](https://i.ytimg.com/vi/W2G7KxuSD4c/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDtyJ4uYotEjl12nZ_gZKZ_kjEgOQ)](https://youtu.be/W2G7KxuSD4c?si=GyU_KpVhr61razRw)
