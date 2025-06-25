---
docName: dictionary__markdown
url: https://intlayer.org/doc/concept/content/markdown
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/markdown.md
createdAt: 2025-02-7
updatedAt: 2025-02-7
title: Markdown
description: Learn how to declare and use Markdown content in your multilingual website with Intlayer. Follow the steps in this online documentation to integrate Markdown seamlessly into your project.
keywords:
  - Markdown
  - Internationalisation
  - Documentation
  - Intlayer
  - Next.js
  - JavaScript
  - React
---

# Markdown / Rich Text Content

## How Markdown Works

Intlayer supports rich text content defined using Markdown syntax. This is achieved through the `md` function, which converts a Markdown string into a format that can be managed by Intlayer. By using Markdown, you can easily write and maintain content with rich formatting, such as blogs, articles, and more.

[The Intlayer Visual editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_visual_editor.md) and the [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_CMS.md) both support Markdown content management.

When integrated with a React application, you can use a Markdown rendering provider (such as [`markdown-to-jsx`](https://www.npmjs.com/package/markdown-to-jsx)) to render the Markdown content to HTML. This allows you to write content in Markdown while ensuring it displays properly in your app.

## Setting Up Markdown Content

To set up Markdown content in your Intlayer project, define a content dictionary that utilises the `md` function.

```typescript fileName="markdownDictionary.content.ts" contentDeclarationFormat="typescript"
import { md, type Dictionary } from "intlayer";

const markdownDictionary = {
  key: "app",
  content: {
    myMarkdownContent: md("## My title \n\nLorem Ipsum"),
  },
} satisfies Dictionary;

export default markdownDictionary;
```

```javascript fileName="markdownDictionary.content.mjs" contentDeclarationFormat="esm"
import { md } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const markdownDictionary = {
  key: "app",
  content: {
    myMarkdownContent: md("## My title \n\nLorem Ipsum"),
  },
};

export default markdownDictionary;
```

```javascript fileName="markdownDictionary.content.cjs" contentDeclarationFormat="commonjs"
const { md } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const markdownDictionary = {
  key: "app",
  content: {
    myMarkdownContent: md("## My title \n\nLorem Ipsum"),
  },
};

module.exports = markdownDictionary;
```

```json fileName="markdownDictionary.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {
    "myMarkdownContent": {
      "nodeType": "markdown",
      "markdown": "## My title \n\nLorem Ipsum"
    }
  }
}
```

## Import (multilingual) `.md` file

```typescript fileName="md.d.ts" contentDeclarationFormat="typescript"
// This declaration allows TypeScript to recognise and import Markdown (.md) files as modules.
// Without this, TypeScript would throw an error when trying to import Markdown files,
// as it does not natively support non-code file imports.

declare module "*.md";
```

```typescript fileName="markdownDictionary.content.ts" contentDeclarationFormat="typescript"
import { md, t, type Dictionary } from "intlayer";
import { readFileSync } from "fs";
import { resolve } from "path";

import markdown_en from "./myMarkdown.en.md";
import markdown_fr from "./myMarkdown.fr.md";
import markdown_es from "./myMarkdown.es.md";

const markdownDictionary = {
  key: "app",
  content: {
    contentImport: t({
      "en-GB": md(markdown_en),
      en: md(markdown_en),
      fr: md(markdown_fr),
      es: md(markdown_es),
    }),
    contentRequire: md(require("./myMarkdown.md")),
    contentAsyncImport: md(
      import("./myMarkdown.md").then((module) => module.default)
    ),
    contentFetch: md(fetch("https://example.com").then((res) => res.text())),
    contentFS: md(() => {
      const filePath = resolve(process.cwd(), "doc/test.md");
      return readFileSync(filePath, "utf8");
    }),
  },
} satisfies Dictionary;

export default markdownDictionary;
```

```javascript fileName="markdownDictionary.content.mjs" contentDeclarationFormat="esm"
import { md, t } from "intlayer";
import { readFileSync } from "fs";
import { resolve } from "path";

import markdown_en from "./myMarkdown.en.md";
import markdown_fr from "./myMarkdown.fr.md";
import markdown_es from "./myMarkdown.es.md";

/** @type {import('intlayer').Dictionary} */
const markdownDictionary = {
  key: "app",
  content: {
    contentImport: t({
      "en-GB": md(markdown_en),
      en: md(markdown_en),
      fr: md(markdown_fr),
      es: md(markdown_es),
    }),
    contentRequire: md(require("./myMarkdown.md")),
    contentAsyncImport: md(
      import("./myMarkdown.md").then((module) => module.default)
    ),
    contentFetch: md(fetch("https://example.com").then((res) => res.text())),
    contentFS: md(() => {
      const filePath = resolve(process.cwd(), "doc/test.md");
      return readFileSync(filePath, "utf8");
    }),
  },
};

export default markdownDictionary;
```

```javascript fileName="markdownDictionary.content.cjs" contentDeclarationFormat="commonjs"
const { md, t } = require("intlayer");

const markdown_en = require("./myMarkdown.en.md");
const markdown_fr = require("./myMarkdown.fr.md");
const markdown_es = require("./myMarkdown.es.md");

/** @type {import('intlayer').Dictionary} */
const markdownDictionary = {
  key: "app",
  content: {
    contentImport: t({
      "en-GB": md(markdown_en),
      en: md(markdown_en),
      fr: md(markdown_fr),
      es: md(markdown_es),
    }),
    contentFetch: md(fetch("https://example.com").then((res) => res.text())),
    contentFS: md(() => {
      const filePath = resolve(process.cwd(), "doc/test.md");
      return readFileSync(filePath, "utf8");
    }),
  },
};

module.exports = markdownDictionary;
```

```jsonc fileName="markdownDictionary.content.json" contentDeclarationFormat="json"
// - Importing external Markdown files (.md) is only possible using JS or TS declaration files.
// - Fetching external Markdown content is only possible using JS or TS declaration files.

{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {
    "myMarkdownContent": {
      "nodeType": "translation",
      "translation": {
        "en-GB": {
          "nodeType": "markdown",
          "markdown": "# My Markdown\n\nThis is a Markdown content.",
        },
        "en": {
          "nodeType": "markdown",
          "markdown": "# My Markdown\n\nThis is a Markdown content.",
        },
        "fr": {
          "nodeType": "markdown",
          "markdown": "# Mon Markdown\n\nC'est un contenu Markdown.",
        },
        "es": {
          "nodeType": "markdown",
          "markdown": "# Mi Markdown\n\nEsto es un contenido Markdown.",
        },
      },
    },
  },
}
```

## Using Markdown with React Intlayer

To render the Markdown content in a React application, you can leverage the `useIntlayer` hook from the `react-intlayer` package along with a Markdown rendering provider. In this example, we use the [`markdown-to-jsx`](https://www.npmjs.com/package/markdown-to-jsx) package to convert the Markdown into HTML.

```tsx fileName="App.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer, MarkdownProvider } from "react-intlayer";
import Markdown from "markdown-to-jsx";

const AppContent: FC = () => {
  const { myMarkdownContent } = useIntlayer("app");

  return <>{myMarkdownContent}</>;
};

export const AppProvider: FC = () => (
  <MarkdownProvider
    renderMarkdown={(markdown) => <Markdown>{markdown}</Markdown>}
  >
    <AppContent />
  </MarkdownProvider>
);
```

```jsx fileName="App.jsx" codeFormat="esm"
import { useIntlayer, MarkdownProvider } from "react-intlayer";
import Markdown from "markdown-to-jsx";

const AppContent = () => {
  const { myMarkdownContent } = useIntlayer("app");

  return <>{myMarkdownContent}</>;
};

export const AppProvider = () => (
  <MarkdownProvider
    renderMarkdown={(markdown) => <Markdown>{markdown}</Markdown>}
  >
    <AppContent />
  </MarkdownProvider>
);
```

```jsx fileName="App.jsx" codeFormat="commonjs"
const { useIntlayer, MarkdownProvider } = require("react-intlayer");
const Markdown = require("markdown-to-jsx");

const AppContent = () => {
  const { myMarkdownContent } = useIntlayer("app");

  return <>{myMarkdownContent}</>;
};

AppProvider = () => (
  <MarkdownProvider
    renderMarkdown={(markdown) => <Markdown>{markdown}</Markdown>}
  >
    <AppContent />
  </MarkdownProvider>
);
```

module.exports = {
AppProvider,
};

````

In this implementation:

- The `MarkdownProvider` wraps the application (or the relevant portion of it) and accepts a `renderMarkdown` function. This function is used to convert Markdown strings into JSX using the `markdown-to-jsx` package.
- The `useIntlayer` hook is used to retrieve the Markdown content (`myMarkdownContent`) from the dictionary with the key `"app"`.
- The Markdown content is rendered directly in the component, and the Markdown rendering is handled by the provider.

### Using Markdown with Next Intlayer

The implementation using the `next-intlayer` package is similar to the one above. The only difference is that the `renderMarkdown` function should be passed to the `MarkdownProvider` component in a client component.

```tsx title="src/providers/IntlayerMarkdownProvider.tsx" codeFormat="typescript"
"use client";

import type { FC, PropsWithChildren } from "react";
import { MarkdownProvider } from "next-intlayer";

const renderMarkdown = (markdown: string) => (
  <span style={{ color: "red" }}>{markdown}</span>
);

export const IntlayerMarkdownProvider: FC<PropsWithChildren> = ({
  children,
}) => (
  <MarkdownProvider renderMarkdown={renderMarkdown}>
    {children}
  </MarkdownProvider>
);
````

```jsx title="src/providers/IntlayerMarkdownProvider.msx" codeFormat="esm"
"use client";

import { MarkdownProvider } from "next-intlayer";

const renderMarkdown = (markdown) => (
  <span style={{ color: "red" }}>{markdown}</span>
);

export const IntlayerMarkdownProvider = ({ children }) => (
  <MarkdownProvider renderMarkdown={renderMarkdown}>
    {children}
  </MarkdownProvider>
);
```

```jsx title="src/providers/IntlayerMarkdownProvider.csx" codeFormat="commonjs"
"use client";

const { MarkdownProvider } = require("next-intlayer");

const renderMarkdown = (markdown) => (
  <span style={{ color: "red" }}>{markdown}</span>
);

const IntlayerMarkdownProvider = ({ children }) => (
  <MarkdownProvider renderMarkdown={renderMarkdown}>
    {children}
  </MarkdownProvider>
);
```

## Additional Resources

- [Intlayer CLI Documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_cli.md)
- [React Intlayer Documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_with_create_react_app.md)
- [Next Intlayer Documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_with_nextjs_15.md)
- [markdown-to-jsx on npm](https://www.npmjs.com/package/markdown-to-jsx)

These resources provide further insights into setting up and using Intlayer with various content types and frameworks.
