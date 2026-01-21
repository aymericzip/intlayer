---
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: Markdown
description: Learn how to declare and use Markdown content in your multilingual website with Intlayer. Follow the steps in this online documentation to integrate Markdown seamlessly into your project.
keywords:
  - Markdown
  - Internationalization
  - Documentation
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
  - markdown
history:
  - version: 8.0.0
    date: 2026-01-18
    changes: Automatic decoration of markdown content, MDX and SSR support
  - version: 5.5.10
    date: 2025-06-29
    changes: Init history
---

# Markdown / Rich Text Content

## How Markdown Works

Intlayer supports rich text content defined using Markdown syntax. This is achieved through the `md` function, which converts a Markdown string into a format that can be managed by Intlayer. By using Markdown, you can easily write and maintain content with rich formatting, such as blogs, articles, and more.

Intlayer v8 integrates a powerful, cross-framework Markdown parser that supports **MDX**. This means you can use components directly within your Markdown content. It is also fully optimized for **Server-Side Rendering (SSR)**.

[The Intlayer Visual editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md) and the [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md) both support Markdown content management.

When integrated with a React application, you can use the built-in Markdown component or a custom rendering provider (such as [`markdown-to-jsx`](https://www.npmjs.com/package/markdown-to-jsx)) to render the Markdown content to HTML.

## Setting Up Markdown Content

To set up Markdown content in your Intlayer project, define a content dictionary that utilizes the `md` function.

```typescript fileName="markdownDictionary.content.ts" contentDeclarationFormat="typescript"
import { md, type Dictionary } from "intlayer";

const markdownDictionary = {
  key: "app",
  content: {
    myMarkdownContent: md("## My title \n\nLorem Ipsum"),
    myMarkdownContent2: "## My title \n\nLorem Ipsum", // Since intlayer v8, markdown function is not required anymore. The content will be automatically decorated.
  },
} satisfies Dictionary;

export default markdownDictionary;
```

## Import (multilingual) `.md` file

If your Markdown file is a `.md` file, you can import it using the [`file` function](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/file.md).

```typescript fileName="markdownDictionary.content.ts" contentDeclarationFormat="typescript"
import { md, file, t, type Dictionary } from "intlayer";

const markdownDictionary = {
  key: "app",
  content: {
    contentMultilingualFile: t({
      en: md(file("./myMarkdown.en.md")),
      fr: md(file("./myMarkdown.fr.md")),
      es: md(file("./myMarkdown.es.md")),
    }),
  },
} satisfies Dictionary;

export default markdownDictionary;
```

## Using Markdown with React Intlayer

To render Markdown content in a React application, you can use the `Markdown` component from the `react-intlayer` package, or use the markdown content node directly.

### Usage as a Node

Markdown content nodes can be rendered directly in your JSX. Since Intlayer v8, the content will be automatically decorated with a renderer.

```tsx fileName="App.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const AppContent: FC = () => {
  const { myMarkdownContent } = useIntlayer("app");

  return <div>{myMarkdownContent}</div>;
};
```

### Providing Overrides via `.use()`

You can customize how HTML tags are rendered for a specific markdown node using the `.use()` method.

```tsx fileName="App.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const AppContent: FC = () => {
  const { myMarkdownContent } = useIntlayer("app");

  return (
    <div>
      {myMarkdownContent.use({
        h1: ({ children }) => <h1 style={{ color: "red" }}>{children}</h1>,
      })}
    </div>
  );
};
```

### Global Markdown Configuration

You can provide global overrides and configuration for all markdown content using the `MarkdownProvider`.

### Wrapper

By default, the Markdown component is wrapped in a `div` (block) or `span` (inline). You can customize this via the `wrapper` prop.

```tsx fileName="AppProvider.tsx" codeFormat="typescript"
import type { FC } from "react";
import { MarkdownProvider } from "react-intlayer";

export const AppProvider: FC = ({ children }) => (
  <MarkdownProvider wrapper={({ children }) => <article>{children}</article>}>
    {children}
  </MarkdownProvider>
);
```

### Custom rendering (e.g. markdown-to-jsx)

If you prefer to use a custom Markdown rendering provider (such as [`markdown-to-jsx`](https://www.npmjs.com/package/markdown-to-jsx)), you can pass it to the `MarkdownProvider` via the `renderMarkdown` prop.

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

## Using Markdown with Vue Intlayer

To use Markdown in Vue, you need to install the Markdown plugin.

### Default rendering

```typescript fileName="main.ts"
import { createApp } from "vue";
import { installIntlayer, installIntlayerMarkdown } from "vue-intlayer";
import App from "./App.vue";

const app = createApp(App);

app.use(installIntlayer);
app.use(installIntlayerMarkdown);

app.mount("#app");
```

### Usage as a Node

In Vue, Markdown content can be rendered using the `<Markdown />` component or directly as a node.

```vue fileName="App.vue"
<script setup>
import { useIntlayer } from "vue-intlayer";

const { myMarkdownContent } = useIntlayer("app");
</script>

<template>
  <div>
    <!-- 1. Render as a node -->
    <component :is="myMarkdownContent" />

    <!-- 2. Use .use() for overrides -->
    <component :is="myMarkdownContent.use({ h1: 'h2' })" />
  </div>
</template>
```

### Components & Wrapper

You can customize the rendering via the plugin options.

```typescript fileName="main.ts"
import { createApp, h } from "vue";
import { installIntlayer, installIntlayerMarkdown } from "vue-intlayer";
import App from "./App.vue";

const app = createApp(App);

app.use(installIntlayer);
app.use(installIntlayerMarkdown, {
  components: {
    h1: {
      component: "h1",
      props: { style: { color: "red" } },
    },
  },
  wrapper: (children) => h("article", {}, children),
});

app.mount("#app");
```

## Using Markdown with Next Intlayer

The implementation using `next-intlayer` package is similar to the one above. The `MarkdownProvider` and `Markdown` component should be imported from `next-intlayer`.

```tsx title="src/providers/IntlayerMarkdownProvider.tsx" codeFormat="typescript"
"use client";

import type { FC, PropsWithChildren } from "react";
import { MarkdownProvider } from "next-intlayer";

export const IntlayerMarkdownProvider: FC<PropsWithChildren> = ({
  children,
}) => <MarkdownProvider>{children}</MarkdownProvider>;
```

```tsx title="src/components/MyComponent.tsx" codeFormat="typescript"
"use client";

import { useIntlayer, Markdown } from "next-intlayer";

export const MyComponent = () => {
  const { myMarkdownContent } = useIntlayer("app");

  return <Markdown>{myMarkdownContent}</Markdown>;
};
```

## Additional Resources

- [Intlayer CLI Documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/index.md)
- [React Intlayer Documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_create_react_app.md)
- [Next Intlayer Documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_15.md)
- [markdown-to-jsx on npm](https://www.npmjs.com/package/markdown-to-jsx)

These resources provide further insights into setting up and using Intlayer with various content types and frameworks.
