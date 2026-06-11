---
createdAt: 2025-08-23
updatedAt: 2025-08-23
title: Introduction
description: Discover how Intlayer works. See the steps used by Intlayer in your application. See what the different packages do.
keywords:
  - Introduction
  - Get started
  - Intlayer
  - Application
  - Packages
slugs:
  - doc
  - get-started
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "Init history"
author:
  name: Aymeric PINEAU
  github: aymericzip
---

# Intlayer Documentation

Welcome to the official Intlayer documentation! Here, you'll find everything you need to integrate, configure, and master Intlayer for all your internationalisation (i18n) needs, whether you’re working with Next.js, React, Vite, Express, or another JavaScript environment.

## Introduction

### What is Intlayer?

**Intlayer** is an internationalisation library designed specifically for JavaScript developers. It allows the declaration of your content everywhere in your code. It converts declarations of multilingual content into structured dictionaries to integrate easily into your code. Using TypeScript, **Intlayer** makes your development more robust and efficient.

Intlayer also provides an optional visual editor that allows you to easily edit and manage your content. This editor is particularly useful for developers who prefer a visual interface for content management, or for teams generating content without having to worry about code.

### Example of usage

```bash
.
└── Components
    └── MyComponent
        ├── index.content.ts
        └── index.tsx
```

```tsx fileName="src/components/MyComponent/index.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const componentContent = {
  key: "component-key",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      "en-GB": "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
  },
} satisfies Dictionary;

export default componentContent;
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
        "en-GB": "Hello World",
        "fr": "Bonjour le monde",
        "es": "Hola Mundo"
      }
    }
  }
}
```

```tsx fileName="src/components/MyComponent/index.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

export const MyComponent: FC = () => {
  const { myTranslatedContent } = useIntlayer("component-key");

  return <span>{myTranslatedContent}</span>;
};
```

### Why Intlayer over alternatives?

Compared to main solutions like `next-intl` or `i18next`, Intlayer is a solution that comes with integrated optimisations such as:

<AccordionGroup>

<Accordion header="Bundle size">

Instead of loading massive JSON files into your pages, load only the necessary content. Intlayer helps **reduce your bundle and page sizes by up to 50%**.

</Accordion>

<Accordion header="Maintainability">

Scoping your application's content **facilitates maintenance** for large-scale applications. You can duplicate or delete a single feature folder without the mental burden of reviewing your entire content codebase. Additionally, Intlayer is **fully typed** to ensure your content's accuracy.

</Accordion>

<Accordion header="AI Agent">

Co-locating content **reduces the context needed** by Large Language Models (LLMs). Intlayer also comes with a suite of tools, such as a **CLI** to test for missing translations,**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/mcp_server.md)**, and **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/agent_skills.md)**, to make the developer experience (DX) even smoother for AI agents.

</Accordion>

<Accordion header="Automation">

Use automation to translate in your CI/CD pipeline using the LLM of your choice at the cost of your AI provider. Intlayer also offers a **compiler** to automate content extraction, as well as a [web platform](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_CMS.md) to help **translate in the background**.

</Accordion>

<Accordion header="Performance">

Connecting massive JSON files to components can lead to performance and reactivity issues. Intlayer optimises your content loading at build time.

</Accordion>

<Accordion header="Scaling with none-dev">

More than just an i18n solution, Intlayer provides an **self-hosted [visual editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_visual_editor.md)** and a **[full CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_CMS.md)** to help you manage your multilingual content in **real-time**, making collaboration with translators, copywriters, and other team members seamless. Content can be stored locally and/or remotely.

</Accordion>
</AccordionGroup>

## Main Features

Intlayer offers a variety of features tailored to meet the needs of modern web development. Below are the key features, with links to detailed documentation for each:

- **Internationalisation Support**: Enhance your application's global reach with built-in support for internationalisation.
- **Visual Editor**: Improve your development workflow with editor plugins designed for Intlayer. Check out the [Visual Editor Guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_visual_editor.md).
- **Configuration Flexibility**: Customise your setup with extensive configuration options detailed in the [Configuration Guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/configuration.md).
- **Advanced CLI Tools**: Manage your projects efficiently using Intlayer's command line interface. Explore the capabilities in the [CLI Tools Documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/cli/index.md).

## Core Concepts

### Dictionary

Organise your multilingual content close to your code to keep everything consistent and maintainable.

- **[Get Started](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/dictionary/content_file.md)**  
  Learn the basics of declaring your content in Intlayer.

- **[Translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/dictionary/translation.md)**  
  Understand how translations are generated, stored, and utilised in your application.

- **[Enumeration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/dictionary/enumeration.md)**  
  Easily manage repeated or fixed sets of data across various languages.

- **[Condition](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/dictionary/condition.md)**  
  Learn how to use conditional logic in Intlayer to create dynamic content.

- **[Insertion](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/dictionary/insertion.md)**
  Discover how to insert values into a string using insertion placeholders.

- **[Function Fetching](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/dictionary/function_fetching.md)**  
  See how to dynamically fetch content with custom logic to match your project’s workflow.

- **[Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/dictionary/markdown.md)**  
  Learn how to use Markdown in Intlayer to create rich content.

- **[File embeddings](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/dictionary/file.md)**  
  Discover how to embed external files into Intlayer to use them in the content editor.

- **[Nesting](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/dictionary/nesting.md)**  
  Understand how to nest content in Intlayer to create complex structures.

### Environments & Integrations

We’ve built Intlayer with flexibility in mind, offering seamless integration across popular frameworks and build tools:

- **[Intlayer with Next.js 16](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_with_nextjs_16.md)**
- **[Intlayer with Next.js 15](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_with_nextjs_15.md)**
- **[Intlayer with Next.js 14 (App Router)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_with_nextjs_14.md)**
- **[Intlayer with Next.js Page Router](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_with_nextjs_page_router.md)**
- **[Intlayer with React CRA](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_with_create_react_app.md)**
- **[Intlayer with Vite + React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_with_vite+react.md)**
- **[Intlayer with React Router v7](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_with_react_router_v7.md)**
- **[Intlayer with Tanstack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_with_tanstack.md)**
- **[Intlayer with React Native and Expo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_with_react_native+expo.md)**
- **[Intlayer with Lynx and React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_with_lynx+react.md)**
- **[Intlayer with Vite + Preact](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_with_vite+preact.md)**
- **[Intlayer with Vite + Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_with_vite+vue.md)**
- **[Intlayer with Nuxt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_with_nuxt.md)**
- **[Intlayer with Vite + Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_with_vite+svelte.md)**
- **[Intlayer with SvelteKit](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_with_svelte_kit.md)**
- **[Intlayer with Express](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_with_express.md)**
- **[Intlayer with NestJS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_with_nestjs.md)**
- **[Intlayer with Hono](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_with_hono.md)**
- **[Intlayer with Angular](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_with_angular_21.md)**

Each integration guide includes best practices for using Intlayer’s features, like **server-side rendering**, **dynamic routing**, or **client-side rendering**, so you can maintain a fast, SEO-friendly, and highly scalable application.

## Contributing & Feedback

We value the power of open-source and community-driven development. If you’d like to propose improvements, add a new guide, or correct any issues in our docs, feel free to submit a Pull Request or open an issue on our [GitHub repository](https://github.com/aymericzip/intlayer/blob/main/docs/docs).

**Ready to translate your application faster and more efficiently?** Dive into our docs to start using Intlayer today. Experience a robust, streamlined approach to internationalisation that keeps your content organised and your team more productive.
