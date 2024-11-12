# Intlayer Documentation

Welcome to the Intlayer Documentation. This guide provides an overview of Intlayer, its main features, and how to effectively utilize these documents to enhance your development experience.

## Introduction

### What is Intlayer?

**Intlayer** is an internationalization library designed specifically for JavaScript developers. It allow the declaration of your content everywhere in your code. It converts declaration of multilingual content into structured dictionaries to integrate easily in your code. Using TypeScript, **Intlayer** make your development stronger and more efficient.

Intlayer also provides an optional visual editor that allows you to easily edit and manage your content. This editor is particularly useful for developers who prefer a visual interface for content management, or for teams generating content without having to worry about code.

## Example of usage

```bash
.
├── ClientComponent
│   ├── index.content.ts
│   └── index.tsx
└── ServerComponent
    ├── index.content.ts
    └── index.tsx
```

```tsx
// ./ClientComponent/index.content.ts

import { DeclarationContent, t } from "intlayer";

const clientComponentContent = {
  key: "client-component",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
} satisfies DeclarationContent;

export default clientComponentContent;
```

```tsx
// ./ClientComponent/index.tsx
"use client";

import { useIntlayer } from "next-intlayer";

export const ClientComponent = () => {
  const { myTranslatedContent } = useIntlayer("client-component");

  return <span>{myTranslatedContent}</span>;
};
```

### Main Features

Intlayer offers a variety of features tailored to meet the needs of modern web development. Below are the key features, with links to detailed documentation for each:

- **Internationalization Support**: Enhance your application's global reach with built-in support for internationalization. Learn more in our [Internationalization Guide](https://github.com/intlayer-org/intlayer/blob/main/docs/docs/intlayer_with_i18next_en.md).
- **Visual Editor**: Improve your development workflow with editor plugins designed for Intlayer. Check out the [Visual Editor Guide](https://github.com/intlayer-org/intlayer/blob/main/docs/docs/intlayer_editor_en.md).
- **Configuration Flexibility**: Customize your setup with extensive configuration options detailed in the [Configuration Guide](https://github.com/intlayer-org/intlayer/blob/main/docs/docs/configuration_en.md).
- **Advanced CLI Tools**: Manage your projects efficiently using Intlayer's command line interface. Explore the capabilities in the [CLI Tools Documentation](https://github.com/intlayer-org/intlayer/blob/main/docs/docs/intlayer_cli_en.md).
- **Compatibility with i18n**: Intlayer works seamlessly with other internationalization libraries. Check out the [i18n Guide](https://github.com/intlayer-org/intlayer/blob/main/docs/docs/intlayer_with_i18next_en.md) for more information.

### Platforms Supported

Intlayer is designed to work seamlessly with Next.js and React applications. It also supports Vite and Create React App.

- **Next.js Integration**: Utilize the power of Next.js within Intlayer for server-side rendering and static site generation. Details are available in our [Next.js Integration Guide](https://github.com/intlayer-org/intlayer/blob/main/docs/docs/intlayer_with_nextjs_en.md).
- **Vite+React Integration**: Leverage Vite within Intlayer for server-side rendering and static site generation. Details are available in our [Vite+React Integration Guide](https://github.com/intlayer-org/intlayer/blob/main/docs/docs/intlayer_with_vite+react_en.md).
- **Create React App Integration**: Utilize the power of Create React App within Intlayer for server-side rendering and static site generation. Details are available in our [Create React App Integration Guide](https://github.com/intlayer-org/intlayer/blob/main/docs/docs/intlayer_with_create_react_app_en.md).

### How to Use This Docs

To get the most out of this documentation:

1. **Navigate to Relevant Sections**: Use the links provided above to go directly to the sections that address your needs.
2. **Interactive Examples**: Where available, utilize interactive examples to see how features work in real-time.
3. **Feedback and Contributions**: Your feedback is valuable. If you have suggestions or corrections, please consider contributing to the documentation.
