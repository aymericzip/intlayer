# Intlayer Documentation

Welcome to the Intlayer Documentation. This guide provides an overview of Intlayer, its main features, and how to effectively utilize these documents to enhance your development experience.

## Introduction

### What is Intlayer?

**Intlayer** is an internationalization library designed specifically for JavaScript developers. It allows the declaration of your content everywhere in your code. It converts declaration of multilingual content into structured dictionaries to integrate easily in your code. Using TypeScript, **Intlayer** makes your development stronger and more efficient.

Intlayer also provides an optional visual editor that allows you to easily edit and manage your content. This editor is particularly useful for developers who prefer a visual interface for content management, or for teams generating content without having to worry about code.

## Example of usage

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

### Main Features

Intlayer offers a variety of features tailored to meet the needs of modern web development. Below are the key features, with links to detailed documentation for each:

- **Internationalization Support**: Enhance your application's global reach with built-in support for internationalization.
- **Visual Editor**: Improve your development workflow with editor plugins designed for Intlayer. Check out the [Visual Editor Guide](https://github.com/aymericzip/intlayer/blob/main/docs/en-GB/intlayer_editor.md).
- **Configuration Flexibility**: Customize your setup with extensive configuration options detailed in the [Configuration Guide](https://github.com/aymericzip/intlayer/blob/main/docs/en-GB/configuration.md).
- **Advanced CLI Tools**: Manage your projects efficiently using Intlayer's command line interface. Explore the capabilities in the [CLI Tools Documentation](https://github.com/aymericzip/intlayer/blob/main/docs/en-GB/intlayer_cli.md).
- **Compatibility with i18n**: Intlayer works seamlessly with other internationalization libraries. Check out the [i18n Guide](https://github.com/aymericzip/intlayer/blob/main/docs/en-GB/intlayer_with_i18next.md) for more information.

### Platforms Supported

Intlayer is designed to work seamlessly with Next.js and React applications. It also supports Vite and Create React App.

- **Next.js Integration**: Utilize the power of Next.js within Intlayer for server-side rendering and static site generation. Details are available in our [Next.js Integration Guide](https://github.com/aymericzip/intlayer/blob/main/docs/en-GB/intlayer_with_nextjs_15.md).
- **Vite and React Integration**: Leverage Vite within Intlayer for server-side rendering and static site generation. Details are available in our [Vite and React Integration Guide](https://github.com/aymericzip/intlayer/blob/main/docs/en-GB/intlayer_with_vite+react.md).
- **Create React App Integration**: Utilize the power of Create React App within Intlayer for server-side rendering and static site generation. Details are available in our [Create React App Integration Guide](https://github.com/aymericzip/intlayer/blob/main/docs/en-GB/intlayer_with_create_react_app.md).

### How to Use This Docs

To get the most out of this documentation:

1. **Navigate to Relevant Sections**: Use the links provided above to go directly to the sections that address your needs.
2. **Interactive Examples**: Where available, utilise interactive examples to see how features work in real-time.
3. **Feedback and Contributions**: Your feedback is valuable. If you have suggestions or corrections, please consider contributing to the documentation.
