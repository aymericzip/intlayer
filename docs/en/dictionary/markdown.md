# Markdown / Rich Text Content

## How Markdown Works

Intlayer supports rich text content defined using Markdown syntax. This is achieved through the `md` function, which converts a Markdown string into a format that can be managed by Intlayer. By using Markdown, you can easily write and maintain content with rich formatting, such as blogs, articles, and more.

[The Intlayer Visual editor](https://github.com/aymericzip/intlayer/blob/main/docs/en/intlayer_visual_editor.md) and the [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/en/intlayer_CMS.md) both support Markdown content management.

When integrated with a React application, you can use a Markdown rendering provider (such as [`markdown-to-jsx`](https://www.npmjs.com/package/markdown-to-jsx)) to render the Markdown content to HTML. This allows you to write content in Markdown while ensuring it displays properly in your app.

## Setting Up Markdown Content

To set up Markdown content in your Intlayer project, define a content dictionary that utilizes the `md` function.

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

## Import multilingual `.md` file

```typescript fileName="md.d.ts" contentDeclarationFormat="typescript"
// This declaration allows TypeScript to recognize and import Markdown (.md) files as modules.
// Without this, TypeScript would throw an error when trying to import Markdown files,
// as it does not natively support non-code file imports.

declare module "*.md";
```

```typescript fileName="markdownDictionary.content.ts" contentDeclarationFormat="typescript"
import { md, t, type Dictionary } from "intlayer";
import markdown_en from "./myMarkdown.en.md";
import markdown_fr from "./myMarkdown.fr.md";
import markdown_es from "./myMarkdown.es.md";

const markdownDictionary = {
  key: "app",
  content: {
    myMarkdownContent: t({
      en: md(markdown_en),
      fr: md(markdown_fr),
      es: md(markdown_es),
    }),
  },
} satisfies Dictionary;

export default markdownDictionary;
```

```javascript fileName="markdownDictionary.content.mjs" contentDeclarationFormat="esm"
import { md, t } from "intlayer";
import markdown_en from "./myMarkdown.en.md";
import markdown_fr from "./myMarkdown.fr.md";
import markdown_es from "./myMarkdown.es.md";

/** @type {import('intlayer').Dictionary} */
const markdownDictionary = {
  key: "app",
  content: {
    myMarkdownContent: t({
      en: md(markdown_en),
      fr: md(markdown_fr),
      es: md(markdown_es),
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
    myMarkdownContent: t({
      en: md(markdown_en),
      fr: md(markdown_fr),
      es: md(markdown_es),
    }),
  },
};

module.exports = markdownDictionary;
```

```jsonc fileName="markdownDictionary.content.json" contentDeclarationFormat="json"
// Importing external Markdown files (.md) is only possible using JS or TS declaration files.

{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {
    "myMarkdownContent": {
      "nodeType": "translation",
      "translation": {
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

module.exports = {
  AppProvider,
};
```

In this implementation:

- The `MarkdownProvider` wraps the application (or the relevant portion of it) and accepts a `renderMarkdown` function. This function is used to convert Markdown strings into JSX using the `markdown-to-jsx` package.
- The `useIntlayer` hook is used to retrieve the Markdown content (`myMarkdownContent`) from the dictionary with the key `"app"`.
- The Markdown content is rendered directly in the component, and the Markdown rendering is handled by the provider.

## Additional Resources

- [Intlayer CLI Documentation](https://github.com/aymericzip/intlayer/blob/main/docs/en/intlayer_cli.md)
- [React Intlayer Documentation](https://github.com/aymericzip/intlayer/blob/main/docs/en/intlayer_with_create_react_app.md)
- [Next Intlayer Documentation](https://github.com/aymericzip/intlayer/blob/main/docs/en/intlayer_with_nextjs_15.md)
- [markdown-to-jsx on npm](https://www.npmjs.com/package/markdown-to-jsx)

These resources provide further insights into setting up and using Intlayer with various content types and frameworks.
