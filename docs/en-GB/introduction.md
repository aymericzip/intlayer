# Intlayer Documentation

Welcome to the official Intlayer documentation! Here, you'll find everything you need to integrate, configure, and master Intlayer for all your internationalisation (i18n) needs, whether you’re working with Next.js, React, Vite, Express, or another JavaScript environment.

## Introduction

### What is Intlayer?

**Intlayer** is an internationalisation library designed specifically for JavaScript developers. It allows the declaration of your content everywhere in your code. It converts declaration of multilingual content into structured dictionaries to integrate easily in your code. Using TypeScript, **Intlayer** makes your development stronger and more efficient.

Intlayer also provides an optional visual editor that allows you to easily edit and manage your content. This editor is particularly useful for developers who prefer a visual interface for content management, or for teams generating content without having to worry about code.

### Example of usage

```bash codeFormat="typescript"
.
└── Components
    └── MyComponent
        ├── index.content.ts
        └── index.tsx
```

```bash codeFormat="commonjs"
.
└── Components
    └── MyComponent
        ├── index.content.cjs
        └── index.mjs
```

```bash codeFormat="esm"
.
└── Components
    └── MyComponent
        ├── index.content.mjs
        └── index.js
```

```tsx fileName="src/components/MyComponent/index.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const componentContent = {
  key: "component-key",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
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
      fr: "Bonjour le monde",
      es: "Hola Mundo",
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
      fr: "Bonjour le monde",
      es: "Hola Mundo",
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

- **Internationalisation Support**: Enhance your application's global reach with built-in support for internationalisation.
- **Visual Editor**: Improve your development workflow with editor plugins designed for Intlayer. Check out the [Visual Editor Guide](https://github.com/aymericzip/intlayer/blob/main/docs/en-GB/intlayer_visual_editor.md).
- **Configuration Flexibility**: Customise your setup with extensive configuration options detailed in the [Configuration Guide](https://github.com/aymericzip/intlayer/blob/main/docs/en-GB/configuration.md).
- **Advanced CLI Tools**: Manage your projects efficiently using Intlayer's command line interface. Explore the capabilities in the [CLI Tools Documentation](https://github.com/aymericzip/intlayer/blob/main/docs/en-GB/intlayer_cli.md).

## Core Concepts

### Dictionary

Organise your multilingual content close to your code to keep everything consistent and maintainable.

- **[Get Started](https://github.com/aymericzip/intlayer/blob/main/docs/en-GB/dictionary/get_started.md)**  
  Learn the basics of declaring your content in Intlayer.

- **[Translation](https://github.com/aymericzip/intlayer/blob/main/docs/en-GB/dictionary/translation.md)**  
  Understand how translations are generated, stored, and utilised in your application.

- **[Enumeration](https://github.com/aymericzip/intlayer/blob/main/docs/en-GB/dictionary/enumeration.md)**  
  Easily manage repeated or fixed sets of data across various languages.

- **[Function Fetching](https://github.com/aymericzip/intlayer/blob/main/docs/en-GB/dictionary/function_fetching.md)**  
  See how to dynamically fetch content with custom logic to match your project’s workflow.

### Environments & Integrations

We’ve built Intlayer with flexibility in mind, offering seamless integration across popular frameworks and build tools:

- **[Intlayer with Next.js 15](https://github.com/aymericzip/intlayer/blob/main/docs/en-GB/intlayer_with_nextjs_15.md)**
- **[Intlayer with Next.js 14 (App Router)](https://github.com/aymericzip/intlayer/blob/main/docs/en-GB/intlayer_with_nextjs_14.md)**
- **[Intlayer with Next.js Page Router](https://github.com/aymericzip/intlayer/blob/main/docs/en-GB/intlayer_with_nextjs_page_router.md)**
- **[Intlayer with React CRA](https://github.com/aymericzip/intlayer/blob/main/docs/en-GB/intlayer_with_create_react_app.md)**
- **[Intlayer with Vite + React](https://github.com/aymericzip/intlayer/blob/main/docs/en-GB/intlayer_with_vite+react.md)**
- **[Intlayer with Express](https://github.com/aymericzip/intlayer/blob/main/docs/en-GB/intlayer_with_express.md)**

Each integration guide includes best practices for using Intlayer’s features—like **server-side rendering**, **dynamic routing**, or **client-side rendering**—so you can maintain a fast, SEO-friendly, and highly scalable application.

## Contributing & Feedback

We value the power of open-source and community-driven development. If you’d like to propose improvements, add a new guide, or correct any issues in our docs, feel free to submit a Pull Request or open an issue on our [GitHub repository](https://github.com/aymericzip/intlayer/blob/main/docs).

**Ready to translate your application faster and more efficiently?** Dive into our docs to start using Intlayer today. Experience a robust, streamlined approach to internationalisation that keeps your content organised and your team more productive.

Happy translating!
