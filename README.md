# Intlayer: A closer way to translate your application

Intlayer is an innovative internationalization framework designed to replace i18next for Next.js and React applications. It streamlines the process of internationalization with flexible content declaration and robust configuration options.

## Why Intlayer?

Intlayer offers a more modern approach to internationalization compared to traditional frameworks like i18next. It is designed to fit seamlessly into Next.js and React projects, providing intuitive content declaration, robust configuration options, and a simpler setup process.

- **Content Declaration**: Declare content dictionaries in the same directory as your components, enhancing maintainability and reducing complexity. [Learn more](https://github.com/aypineau/intlayer/blob/main/docs/docs/content_declaration_en.md).
- **Customizable Configuration**: Intlayer allows you to customize various aspects of the framework, including internationalization, middleware, and content handling. [Learn how to configure](https://github.com/aypineau/intlayer/blob/main/docs/docs/configuration_en.md).
- **Integration with Next.js and React**: Intlayer integrates smoothly with Next.js and React applications. It also supports server-side rendering and dynamic routing. [Explore Next.js integration](https://github.com/aypineau/intlayer/blob/main/docs/docs/intlayer_with_nextjs_en.md) | [Explore React integration](https://github.com/aypineau/intlayer/blob/main/docs/docs/intlayer_with_create_react_app_en.md).
- **Scalability and Consistency**: With Intlayer, your content dictionaries are structured and consistent, reducing the chances of errors during development. This ensures a more reliable internationalization process.
- **TypeScript Support**: Intlayer provides full support for TypeScript, allowing for more type-safe code. This enhances developer productivity and code quality.

## Getting Started

To start using Intlayer, follow these steps:

### Installation

Install the necessary packages for your project:

```bash
npm install intlayer
```

```bash
yarn add intlayer
```

```bash
pnpm add intlayer
```

### Declaring Your Content

Intlayer allows you to declare your content in various formats, including TypeScript, ECMAScript modules, CommonJS modules, and JSON. Here's an example of a content declaration using TypeScript:

```typescript
import { t, type DeclarationContent } from "intlayer";

const exampleContent: DeclarationContent = {
  id: "example",
  welcome: t({
    en: "Welcome",
    fr: "Bienvenue",
    es: "Bienvenido",
  }),
};

export default exampleContent;
```

For more examples and information on content declaration, [see the documentation](https://github.com/aypineau/intlayer/blob/main/docs/docs/content_declaration_en.md).

### Integrating with Next.js

If you're using Next.js, Intlayer is designed to work seamlessly with it. The integration process involves setting up middleware, defining locale routes, and utilizing content dictionaries in your components.

Follow this guide to [set up Intlayer with Next.js](https://github.com/aypineau/intlayer/blob/main/docs/docs/intlayer_with_nextjs_en.md).

### Integrating with Create React App

For Create React App users, Intlayer also provides an easy way to integrate internationalization. Learn how to [set up Intlayer with Create React App](https://github.com/aypineau/intlayer/blob/main/docs/docs/intlayer_with_create_react_app_en.md).

### Integrating with Vite + React

Intlayer is also compatible with vite and rollup environments. Check how to [set up Intlayer with Vite + React](https://github.com/aypineau/intlayer/blob/main/docs/docs/intlayer_with_vite+react_en.md).

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

For more information on configuring Intlayer, [check the configuration documentation](https://github.com/aypineau/intlayer/blob/main/docs/docs/configuration_en.md).

## Using Intlayer with i18next

Intlayer can also export i18next dictionaries for projects that still rely on i18next for certain functionalities. This integration allows you to generate i18next dictionaries while still benefiting from Intlayer's flexible content declaration. [Learn how to configure Intlayer for i18next](https://github.com/aypineau/intlayer/blob/main/docs/docs/intlayer_with_i18n_en.md).

## CLI Commands

Intlayer comes with a CLI package that allows you to transpile your content declarations into dictionaries. You can run these commands to build your dictionaries:

```bash
npx intlayer transpile
```

To run in watch mode:

```bash
npx intlayer watch
```

For more information on the CLI and its usage, [refer to the CLI documentation](https://github.com/aypineau/intlayer/blob/main/docs/docs/intlayer_cli_en.md).

## Conclusion

Intlayer offers a more flexible and modern approach to internationalization. Its seamless integration with Next.js and React, customizable configuration, and support for various content declaration formats make it a powerful choice for internationalization.

For additional resources, guides, and examples, explore the [Intlayer documentation](https://github.com/aypineau/intlayer/blob/main/docs/docs/intlayer_with_nextjs_en.md).
