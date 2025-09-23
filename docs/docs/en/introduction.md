---
createdAt: 2025-08-23
updatedAt: 2025-08-23
title: Introduction
description: Discover how Intlayer works. See the steps used by Intlayer in your application. See what does the different packages do.
keywords:
  - Introduction
  - Get started
  - Intlayer
  - Application
  - Packages
slugs:
  - doc
  - get-started
---

# Intlayer Documentation

Welcome to the official Intlayer documentation! Here, you'll find everything you need to integrate, configure, and master Intlayer for all your internationalization (i18n) needs, whether you’re working with Next.js, React, Vite, Express, or another JavaScript environment.

## Introduction

### What is Intlayer?

**Intlayer** is an internationalization library designed specifically for JavaScript developers. It allow the declaration of your content everywhere in your code. It converts declaration of multilingual content into structured dictionaries to integrate easily in your code. Using TypeScript, **Intlayer** make your development stronger and more efficient.

Intlayer also provides an optional visual editor that allows you to easily edit and manage your content. This editor is particularly useful for developers who prefer a visual interface for content management, or for teams generating content without having to worry about code.

### Example of usage

```bash
.
└── Components
    └── MyComponent
        ├── index.content.ts
        └── index.tsx
```

```tsx fileName="src/components/MyComponent/index.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const componentContent = {
  key: "component-key",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
  },
} satisfies Dictionary;

export default componentContent;
```

```javascript fileName="src/components/MyComponent/index.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const componentContent = {
  key: "component-key",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
  },
};

export default componentContent;
```

```javascript fileName="src/components/MyComponent/index.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const componentContent = {
  key: "component-key",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
  },
};

module.exports = componentContent;
```

```json fileName="src/components/MyComponent/index.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "component-key",
  "content": {
    "myTranslatedContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Hello World",
        "fr": "Bonjour le monde",
        "es": "Hola Mundo"
      }
    }
  }
}
```

```tsx fileName="src/components/MyComponent/index.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

export const MyComponent: FC = () => {
  const { myTranslatedContent } = useIntlayer("component-key");

  return <span>{myTranslatedContent}</span>;
};
```

```jsx fileName="src/components/MyComponent/index.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const MyComponent = () => {
  const { myTranslatedContent } = useIntlayer("component-key");

  return <span>{myTranslatedContent}</span>;
};
```

```jsx fileName="src/components/MyComponent/index.csx" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const MyComponent = () => {
  const { myTranslatedContent } = useIntlayer("component-key");

  return <span>{myTranslatedContent}</span>;
};
```

## Main Features

Intlayer offers a variety of features tailored to meet the needs of modern web development. Below are the key features, with links to detailed documentation for each:

- **Internationalization Support**: Enhance your application's global reach with built-in support for internationalization.
- **Visual Editor**: Improve your development workflow with editor plugins designed for Intlayer. Check out the [Visual Editor Guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md).
- **Configuration Flexibility**: Customize your setup with extensive configuration options detailed in the [Configuration Guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md).
- **Advanced CLI Tools**: Manage your projects efficiently using Intlayer's command line interface. Explore the capabilities in the [CLI Tools Documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_cli.md).

## Core Concepts

### Dictionary

Organize your multilingual content close to your code to keep everything consistent and maintainable.

- **[Get Started](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/get_started.md)**  
  Learn the basics of declaring your content in Intlayer.

- **[Translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/translation.md)**  
  Understand how translations are generated, stored, and utilized in your application.

- **[Enumeration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/enumeration.md)**  
  Easily manage repeated or fixed sets of data across various languages.

- **[Condition](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/conditional.md)**  
  Learn how to use conditional logic in Intlayer to create dynamic content.

- **[Insertion](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/insertion.md)**
  Discover how to insert values in a string using insertion placeholders.

- **[Function Fetching](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/function_fetching.md)**  
  See how to dynamically fetch content with custom logic to match your project’s workflow.

- **[Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/markdown.md)**  
  Learn how to use Markdown in Intlayer to create rich content.

- **[File embeddings](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/file_embeddings.md)**  
  Discover how to embed externals files in Intlayer to use them in the content editor.

- **[Nesting](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/nesting.md)**  
  Understand how to nest content in Intlayer to create complex structures.

### Environments & Integrations

We’ve built Intlayer with flexibility in mind, offering seamless integration across popular frameworks and build tools:

- **[Intlayer with Next.js 15](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_15.md)**
- **[Intlayer with Next.js 14 (App Router)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_14.md)**
- **[Intlayer with Next.js Page Router](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_page_router.md)**
- **[Intlayer with React CRA](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_create_react_app.md)**
- **[Intlayer with Vite + React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_vite+react.md)**
- **[Intlayer with React Router v7](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_react_router_v7.md)**
- **[Intlayer with Tanstack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_tanstack.md)**
- **[Intlayer with React Native and Expo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_react_native+expo.md)**
- **[Intlayer with Lynx and React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_lynx+react.md)**
- **[Intlayer with Vite + Preact](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_vite+preact.md)**
- **[Intlayer with Vite + Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_vite+vue.md)**
- **[Intlayer with Nuxt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nuxt.md)**
- **[Intlayer with Express](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_express.md)**
- **[Intlayer with NestJS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nestjs.md)**
- **[Intlayer with Angular](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_angular.md)**

Each integration guide includes best practices for using Intlayer’s features, like **server-side rendering**, **dynamic routing**, or **client-side rendering**, so you can maintain a fast, SEO-friendly, and highly scalable application.

## Contributing & Feedback

We value the power of open-source and community-driven development. If you’d like to propose improvements, add a new guide, or correct any issues in our docs, feel free to submit a Pull Request or open an issue on our [GitHub repository](https://github.com/aymericzip/intlayer/blob/main/docs/docs).

**Ready to translate your application faster and more efficiently?** Dive into our docs to start using Intlayer today. Experience a robust, streamlined approach to internationalization that keeps your content organized and your team more productive.

---

## Doc History

| Version | Date       | Changes      |
| ------- | ---------- | ------------ |
| 5.5.10  | 2025-06-29 | Init history |
