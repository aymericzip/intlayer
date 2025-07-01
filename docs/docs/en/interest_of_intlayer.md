---
createdAt: 2024-08-14
updatedAt: 2025-06-29
title: Interest of Intlayer
description: Discover the benefits and advantages of using Intlayer in your projects. Understand why Intlayer stands out among other frameworks.
keywords:
  - Benefits
  - Advantages
  - Intlayer
  - Framework
  - Comparison
slugs:
  - doc
  - concept
  - interest
---

# Intlayer: A tailored way to translate your website

**Intlayer** is an internationalization library designed specifically for JavaScript developers. It allow the declaration of your content everywhere in your code. It converts declaration of multilingual content into structured dictionaries to integrate easily in your code. Using TypeScript, **Intlayer** make your development stronger and more efficient.

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

```tsx fileName="./Components/MyComponent/index.content.ts" codeFormat="typescript"
import { t, type Dictionary } from "intlayer";

const componentExampleContent = {
  key: "component-example",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
} satisfies Dictionary;

export default componentExampleContent;
```

```jsx fileName="./Components/MyComponent/index.mjx" codeFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const componentExampleContent = {
  key: "component-example",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
};

export default componentExampleContent;
```

```jsx fileName="./Components/MyComponent/index.csx" codeFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const componentExampleContent = {
  key: "component-example",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
};

module.exports = componentExampleContent;
```

```tsx fileName="./Components/MyComponent/index.tsx" codeFormat="typescript"
import { useIntlayer } from "react-intlayer";

export const ComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("component-example");

  return <span>{myTranslatedContent}</span>;
};
```

```jsx fileName="./Components/MyComponent/index.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const ComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("component-example");

  return <span>{myTranslatedContent}</span>;
};
```

```jsx fileName="./Components/MyComponent/index.csx" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const ComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("component-example");

  return <span>{myTranslatedContent}</span>;
};
```

## Why Choose Intlayer?

| Feature                                   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| ----------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **JavaScript-Powered Content Management** | Harness the flexibility of JavaScript to define and manage your content efficiently.                                                                                                                                                                                                                                                                                                                                                                                        |
| **Type-Safe Environment**                 | Leverage TypeScript to ensure all your content definitions are precise and error-free.                                                                                                                                                                                                                                                                                                                                                                                      |
| **Integrated Content Files**              | Keep your translations close to their respective components, enhancing maintainability and clarity.                                                                                                                                                                                                                                                                                                                                                                         |
| **Simplified Setup**                      | Get up and running quickly with minimal configuration, especially optimized for Next.js projects.                                                                                                                                                                                                                                                                                                                                                                           |
| **Server Component Support**              | Perfectly suited for Next.js server components, ensuring smooth server-side rendering.                                                                                                                                                                                                                                                                                                                                                                                      |
| **Enhanced Routing**                      | Full support for Next.js app routing, adapting seamlessly to complex application structures.                                                                                                                                                                                                                                                                                                                                                                                |
| **Organized Codebase**                    | Keep your codebase more organized: 1 component = 1 dictionary in the same folder.                                                                                                                                                                                                                                                                                                                                                                                           |
| **CI Auto-translation**                   | Autofill your translations in your CI using your own OpenAI API key, eliminating the need for an L10n platform.                                                                                                                                                                                                                                                                                                                                                             |
| **MCP Server Integration**                | Provides an MCP (Model Context Protocol) server for IDE automation, enabling seamless content management and i18n workflows directly within your development environment. [Learn more](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md).                                                                                                                                                                                                        |
| **Markdown Support**                      | Import and interpret markdown files for multilingual content like privacy policies.                                                                                                                                                                                                                                                                                                                                                                                         |
| **Free Visual Editor & CMS**              | A free visual editor and CMS are available if you need to work with content writers for your translations, again removing the need for a localization platform and allowing content externalization from the codebase.                                                                                                                                                                                                                                                      |
| **Simplified Content Retrieval**          | No need to call your `t` function for each piece of content; retrieve all your content directly using a single hook.                                                                                                                                                                                                                                                                                                                                                        |
| **Consistent Implementation**             | The same implementation for both client and server components, no need to pass your `t` function across each server component.                                                                                                                                                                                                                                                                                                                                              |
| **Tree-shakable Content**                 | The content is tree-shakable, which lightens the final bundle.                                                                                                                                                                                                                                                                                                                                                                                                              |
| **Non-blocking Static Rendering**         | Intlayer doesn't block Static Rendering as `next-intl` does.                                                                                                                                                                                                                                                                                                                                                                                                                |
| **Interoperability**                      | Allow interoperability with [react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_react-i18next.md), [next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_next-i18next.md), [next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_next-intl.md), and [react-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_react-intl.md). |

## Doc History

- 5.5.10 - 2025-06-29: Init history
