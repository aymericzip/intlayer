---
createdAt: 2025-02-07
updatedAt: 2026-05-19
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
  - version: 8.10.0
    date: 2026-05-19
    changes: "Add `.content.md` files support"
  - version: 8.5.0
    date: 2026-03-24
    changes: "Add `intlayerMarkdown` plugin object; use `app.use(intlayerMarkdown)` instead of `app.use(installIntlayerMarkdown)`"
  - version: 8.5.0
    date: 2026-03-24
    changes: "move import from `{{framework}}-intlayer` to `{{framework}}-intlayer/markdown`"
  - version: 8.0.0
    date: 2026-01-22
    changes: "Add MarkdownRenderer / useMarkdownRenderer / renderMarkdown utility and forceInline option"
  - version: 8.0.0
    date: 2026-01-18
    changes: "Automatic decoration of markdown content, MDX and SSR support"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Init history"
---

# Markdown / Rich Text Content

Intlayer supports rich text content defined using Markdown syntax. This allows you to easily write and maintain content with rich formatting, such as blogs, articles, and more.

## Declaring Markdown Content

You can declare Markdown content using the `md` function or simply as a string (if it contains Markdown syntax).

<Tabs>
  <Tab label=".content.md" value=".content.md">
  
    Since version `8.10.0`, you can declare Markdown content directly in `.content.md` files. Intlayer will
    automatically detect and parse the Markdown content.

    ```md fileName="markdown-file.en.content.md"
    ---
    key: my-markdown-content
    description: My content
    locale: en
    ---

    # My content

    Here an example of markdown content
    ```

    The `locale` front-matter field is the field that define the locale of the content. It is optional. If not provided, Intlayer will use the default locale, which is also used as fallback locale if no translation is available for a specific locale.

    Example of file structure:

    ```text
    content/
    ├── en/
    │   └── markdown-file.en.content.md
    ├── fr/
    │   └── markdown-file.fr.content.md
    └── es/
        └── markdown-file.es.content.md
    ```

    You can add in front-matter any properties defined in the [Dictionary definition](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md)

  </Tab>
  <Tab label="Manual Wrapping" value="manual-wrapping">
    Use the `md` function to explicitly declare Markdown content. This is useful if you want to ensure a string is treated as Markdown even if it doesn't contain obvious syntax.

    ```typescript fileName="markdownDictionary.content.ts"
    import { md, type Dictionary } from "intlayer";

    const markdownDictionary = {
      key: "app",
      content: {
        myMarkdownContent: md("## My title \n\nLorem Ipsum"),
      },
    } satisfies Dictionary;

    export default markdownDictionary;
    ```

  </Tab>

  <Tab label="External Files" value="external-files">
    Import `.md` files directly using the `file` function.

    ```typescript fileName="markdownDictionary.content.ts"
    import { md, file, t } from "intlayer";

    export default {
      key: "app",
      content: {
        content: t({
          en: md(file("./myMarkdown.en.md")),
          fr: md(file("./myMarkdown.fr.md")),
        }),
      },
    };
    ```

  </Tab>

  <Tab label="Automatic Detection" value="automatic-detection">
    If the string contains common Markdown indicators (like headers, lists, links, etc.), Intlayer will automatically transform it.

    ```typescript fileName="markdownDictionary.content.ts"
    export default {
      key: "app",
      contentAutoTransformation: true, // Enable automatic detection of Markdown content - Can be set globally in intlayer.config.ts
      content: {
        myMarkdownContent: "## My title \n\nLorem Ipsum",
      },
    };
    ```

  </Tab>

</Tabs>

## Rendering Markdown

Intlayer provides two independent ways to render Markdown:

1. **Via `useIntlayer`**
   — Intlayer automatically transforms the `md` node into the framework's native output (JSX, VNode, HTML string).
   - Frontmatter is parsed and exposed as `.metadata`. You can override rendering at two levels — globally with `MarkdownProvider` (or the framework equivalent) and locally per-node with `.use()`. Both can be combined; `.use()` takes priority over `MarkdownProvider`, which takes priority over the default.

2. **Helper utilities** — `<MarkdownRenderer />`, `useMarkdownRenderer()`, and `renderMarkdown()` are standalone tools that accept **raw Markdown strings only**. They are independent of `useIntlayer` and do not work with the decorated nodes it returns.

Markdown rendering supports **MDX** — use any JSX/framework component by name directly in your Markdown.

### 1. Automatic Rendering (via `useIntlayer`)

<Tabs group="framework">
  <Tab label="React / Next.js" value="react">
    Markdown nodes can be rendered directly as JSX.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "react-intlayer";
    import { MarkdownProvider } from "react-intlayer/markdown";

    const AppContent = () => {
      const { myMarkdownContent } = useIntlayer("app");

      return <div>{myMarkdownContent}</div>;
    };

    const App = () => (
      <MarkdownProvider
        components={{
          h1: ({ children }) => <h1 style={{ color: "red" }}>{children}</h1>,
          MyButton: (props) => <button {...props} />, // MDX component
        }}
      >
        <AppContent />
      </MarkdownProvider>
    );
    ```

    > If `MarkdownProvider` not present, intlayer will render the markdown using the default Markdown to JSX parser.

    You can also provide local overrides for specific nodes using the `.use()` method:

    ```tsx
    {myMarkdownContent.use({
      h1: ({ children }) => <h1 style={{ color: "red" }}>{children}</h1>,
    })}
    ```

    You can retrieve the Markdown as string:

    ```tsx
    {myMarkdownContent.value}
    {String(myMarkdownContent)}
    {myMarkdownContent.toString()}
    ```

    And you can access your markdown metadata like :

    ```tsx
    {myMarkdownContent.metadata}
    {myMarkdownContent.metadata.title}
    ```

  </Tab>
  <Tab label="Vue" value="vue">
    In Vue, Markdown content can be rendered using the `component` built-in or directly as a node.

    ```vue fileName="App.vue"
    <script setup>
    import { useIntlayer } from "vue-intlayer";
    const { myMarkdownContent } = useIntlayer("app");
    </script>

    <template>
      <component :is="myMarkdownContent" />
    </template>
    ```

    Configure globally via the `intlayerMarkdown` plugin (supports MDX custom components):

    ```ts fileName="main.ts"
    import { intlayerMarkdown } from "vue-intlayer/markdown";

    app.use(intlayerMarkdown, {
      components: {
        h1: (props) => h('h1', { style: { color: 'green' } }, props.children),
        MyButton: (props) => h('button', props), // MDX component
      },
    });
    ```

    > If the `intlayerMarkdown` plugin is not installed, Intlayer will render using the default compiler.

    You can also provide local overrides for specific nodes using the `.use()` method:

    ```vue
    <component :is="myMarkdownContent.use({
      h1: (props) => h('h1', { style: { color: 'red' } }, props.children),
    })" />
    ```

    You can retrieve the Markdown as string:

    ```vue
    {{ myMarkdownContent.value }}
    {{ String(myMarkdownContent) }}
    {{ myMarkdownContent.toString() }}
    ```

    And you can access your markdown metadata like :

    ```vue
    <component :is="myMarkdownContent.metadata" />
    <component :is="myMarkdownContent.metadata.title" />
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">
    Svelte renders Markdown as an HTML string by default. Use `{@html}` to render it.

    ```svelte fileName="App.svelte"
    <script lang="ts">
    import { useIntlayer } from "svelte-intlayer";
    import { MarkdownProvider } from "svelte-intlayer/markdown";
    import MyHeading from "./MyHeading.svelte";

    const content = useIntlayer("app");
    </script>

    <MarkdownProvider components={{ h1: MyHeading }}>
      {@html $content.myMarkdownContent}
    </MarkdownProvider>
    ```

    > If `MarkdownProvider` is not present, Intlayer will render the markdown using the default compiler.

    You can also provide local overrides for specific nodes using the `.use()` method:

    ```svelte
    {@html $content.myMarkdownContent.use({ ... })}
    ```

    You can retrieve the Markdown as string:

    ```svelte
    {$content.myMarkdownContent.value}
    {String($content.myMarkdownContent)}
    {$content.myMarkdownContent.toString()}
    ```

    And you can access your markdown metadata like :

    ```svelte
    {$content.myMarkdownContent.metadata}
    {$content.myMarkdownContent.metadata.title}
    ```

  </Tab>
  <Tab label="Preact" value="preact">
    Preact supports Markdown nodes directly in JSX.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "preact-intlayer";
    import { MarkdownProvider } from "preact-intlayer/markdown";

    const AppContent = () => {
      const { myMarkdownContent } = useIntlayer("app");
      return <div>{myMarkdownContent}</div>;
    };

    const App = () => (
      <MarkdownProvider
        components={{
          h1: ({ children }) => <h1 style={{ color: "red" }}>{children}</h1>,
          MyButton: (props) => <button {...props} />, // MDX component
        }}
      >
        <AppContent />
      </MarkdownProvider>
    );
    ```

    > If `MarkdownProvider` not present, intlayer will render the markdown using the default Markdown to JSX parser.

    You can also provide local overrides for specific nodes using the `.use()` method:

    ```tsx
    {myMarkdownContent.use({
      h1: ({ children }) => <h1 style={{ color: "red" }}>{children}</h1>,
    })}
    ```

    You can retrieve the Markdown as string:

    ```tsx
    {myMarkdownContent.value}
    {String(myMarkdownContent)}
    {myMarkdownContent.toString()}
    ```

    And you can access your markdown metadata like :

    ```tsx
    {myMarkdownContent.metadata}
    {myMarkdownContent.metadata.title}
    ```

  </Tab>
  <Tab label="Solid" value="solid">
    Solid supports Markdown nodes directly in JSX.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "solid-intlayer";
    import { MarkdownProvider } from "solid-intlayer/markdown";

    const AppContent = () => {
      const { myMarkdownContent } = useIntlayer("app");
      return <div>{myMarkdownContent}</div>;
    };

    const App = () => (
      <MarkdownProvider
        components={{
          h1: (props) => <h1 style={{ color: "red" }}>{props.children}</h1>,
          MyButton: (props) => <button {...props} />, // MDX component
        }}
      >
        <AppContent />
      </MarkdownProvider>
    );
    ```

    > If `MarkdownProvider` not present, intlayer will render the markdown using the default Markdown to JSX parser.

    You can also provide local overrides for specific nodes using the `.use()` method:

    ```tsx
    {myMarkdownContent.use({
      h1: (props) => <h1 style={{ color: "red" }}>{props.children}</h1>,
    })}
    ```

    You can retrieve the Markdown as string:

    ```tsx
    {myMarkdownContent.value}
    {String(myMarkdownContent)}
    {myMarkdownContent.toString()}
    ```

    And you can access your markdown metadata like :

    ```tsx
    {myMarkdownContent.metadata}
    {myMarkdownContent.metadata.title}
    ```

  </Tab>
  <Tab label="Angular" value="angular">
    Angular uses the `[innerHTML]` directive to render Markdown content.

    ```typescript fileName="app.component.ts"
    import { Component } from "@angular/core";
    import { useIntlayer } from "angular-intlayer";

    @Component({
      selector: "app-root",
      template: `<div [innerHTML]="content().myMarkdownContent"></div>`,
    })
    export class AppComponent {
      content = useIntlayer("app");
    }
    ```

    > If the IntlayerMarkdown provider is not configured, Intlayer will render using the default compiler.

    You can also provide local overrides for specific nodes using the `.use()` method:

    ```typescript
    content().myMarkdownContent.use({
      h1: { class: "text-3xl font-bold" },
    })
    ```

    You can retrieve the Markdown as string:

    ```typescript
    content().myMarkdownContent.value
    String(content().myMarkdownContent)
    content().myMarkdownContent.toString()
    ```

    And you can access your markdown metadata like :

    ```typescript
    content().myMarkdownContent.metadata
    content().myMarkdownContent.metadata.title
    ```

  </Tab>
</Tabs>

### 2. Helper Utilities (Markdown Strings Only)

These utilities render **raw Markdown strings** and are independent of `useIntlayer`. Use them when you need to render Markdown from sources other than your dictionaries.

<Tabs group="framework">
  <Tab label="React / Next.js" value="react">
  
    #### `<MarkdownRenderer />` Component

    Render a Markdown string with specific options.

    ```tsx
    import { MarkdownRenderer } from "react-intlayer/markdown";

    <MarkdownRenderer forceBlock={true} tagfilter={true}>
      {"# My Title"}
    </MarkdownRenderer>
    ```

    #### `useMarkdownRenderer()` Hook

    Get a pre-configured renderer function.

    ```tsx
    import { useMarkdownRenderer } from "react-intlayer/markdown";

    const renderMarkdown = useMarkdownRenderer({
      forceBlock: true,
      components: { h1: (props) => <h1 {...props} className="custom" /> }
    });

    return renderMarkdown("# My Title");
    ```

    #### `renderMarkdown()` Utility
    Standalone utility for rendering outside of components.

    ```tsx
    import { renderMarkdown } from "react-intlayer/markdown";

    const jsx = renderMarkdown("# My Title", { forceBlock: true });
    ```

  </Tab>
  <Tab label="Vue" value="vue">

    #### `<MarkdownRenderer />` Component

    ```vue
    <script setup>
    import { MarkdownRenderer } from "vue-intlayer/markdown";
    </script>

    <template>
      <MarkdownRenderer :forceBlock="true" content="# My Title" />
    </template>
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">

    #### `<MarkdownRenderer />` Component

    ```svelte
    <script lang="ts">
    import { MarkdownRenderer } from "svelte-intlayer/markdown";
    </script>

    <MarkdownRenderer forceBlock={true} value="# My Title" />
    ```

    #### `useMarkdownRenderer()` Hook

    ```svelte
    <script lang="ts">
    import { useMarkdownRenderer } from "svelte-intlayer/markdown";
    const render = useMarkdownRenderer();
    </script>

    {@html render("# My Title")}
    ```

    #### `renderMarkdown()` Utility

    ```svelte
    <script lang="ts">
    import { renderMarkdown } from "svelte-intlayer/markdown";
    </script>

    {@html renderMarkdown("# My Title")}
    ```

  </Tab>
  <Tab label="Preact" value="preact">
    #### `<MarkdownRenderer />` Component

    ```tsx
    import { MarkdownRenderer } from "preact-intlayer/markdown";

    <MarkdownRenderer forceBlock={true}>
      {"# My Title"}
    </MarkdownRenderer>
    ```

    #### `useMarkdownRenderer()` Hook

    ```tsx
    import { useMarkdownRenderer } from "preact-intlayer/markdown";

    const render = useMarkdownRenderer();

    return <div>{render("# My Title")}</div>;
    ```

    #### `renderMarkdown()` Utility

    ```tsx
    import { renderMarkdown } from "preact-intlayer/markdown";

    return <div>{renderMarkdown("# My Title")}</div>;
    ```

  </Tab>
  <Tab label="Solid" value="solid">
    #### `<MarkdownRenderer />` Component

    ```tsx
    import { MarkdownRenderer } from "solid-intlayer/markdown";

    <MarkdownRenderer forceBlock={true}>
      {"# My Title"}
    </MarkdownRenderer>
    ```

    #### `useMarkdownRenderer()` Hook

    ```tsx
    import { useMarkdownRenderer } from "solid-intlayer/markdown";

    const render = useMarkdownRenderer();

    return <div>{render("# My Title")}</div>;
    ```

    #### `renderMarkdown()` Utility

    ```tsx
    import { renderMarkdown } from "solid-intlayer/markdown";

    return <div>{renderMarkdown("# My Title")}</div>;
    ```

  </Tab>
  <Tab label="Angular" value="angular">
    #### `IntlayerMarkdownService` Service
    Render a Markdown string using the service.

    ```typescript
    import { IntlayerMarkdownService } from "angular-intlayer/markdown";

    export class MyComponent {
      constructor(private markdownService: IntlayerMarkdownService) {}

      renderMarkdown(markdown: string) {
        return this.markdownService.renderMarkdown(markdown);
      }
    }
    ```

  </Tab>
</Tabs>

## Global Configuration with `MarkdownProvider`

`MarkdownProvider` (or its framework equivalent) configures the Markdown rendering pipeline for your entire application. It applies to both the automatic `useIntlayer` rendering and the helper utilities. Options set here are the defaults — `.use()` overrides them at the node level.

<Tabs group="framework">
  <Tab label="React / Next.js" value="react">

    ```tsx fileName="AppProvider.tsx"
    import { MarkdownProvider } from "react-intlayer/markdown";

    export const AppProvider = ({ children }) => (
      <MarkdownProvider
        components={{
          h1: (props) => <h1 style={{color: 'green'}} {...props} />,
          a: ({ href, ...props }) => <a style={{color: 'red'}} {...props} />,
          MyCustomJSXComponent: (props) => <span style={{color: 'red'}} {...props} />,
        }}
      >
        {children}
      </MarkdownProvider>
    );
    ```

    > MDX is supported — any component name used inside your Markdown (e.g. `<MyCustomJSXComponent />`) is resolved against the `components` map.

    You can also use your own markdown renderer:

    ```tsx fileName="AppProvider.tsx"
    import { MarkdownProvider } from "react-intlayer/markdown";

    export const AppProvider = ({ children }) => (
      <MarkdownProvider
        renderMarkdown={async (md) => {
          // Use dynamic import to reduce the bundle size of your application
          const { renderMarkdown } = await import('react-intlayer/markdown');
          return renderMarkdown(md);
        }}
      >
        {children}
      </MarkdownProvider>
    );
    ```

    > Importing your Markdown renderer dynamically is a good way to reduce the bundle size of your application.

  </Tab>
  <Tab label="Vue" value="vue">

    ```typescript fileName="main.ts"
    import { createApp } from "vue";
    import { intlayer } from "vue-intlayer";
    import { intlayerMarkdown } from "vue-intlayer/markdown";
    import App from "./App.vue";

    const app = createApp(App);

    app.use(intlayer);
    app.use(intlayerMarkdown, {
      components: {
        h1: (props) =>
        h('h1', { style: { color: 'orange' }, ...props }, props.children),
        ComponentDemo: () => h('div', { style: { background: 'grey' } }, 'DEMO'),
        bold: (props) => h('strong', props),
        code: (props) => h('code', props),
      },
    });

    app.mount("#app");
    ```

    You can also use your own markdown renderer:

    ```typescript fileName="main.ts"
    import { createApp } from "vue";
    import { intlayer } from "vue-intlayer";
    import { intlayerMarkdown } from "vue-intlayer/markdown";
    import App from "./App.vue";

    const app = createApp(App);

    app.use(intlayer);
    app.use(intlayerMarkdown, {
      renderMarkdown: async (md) => {
        const { renderMarkdown } = await import('vue-intlayer/markdown');
        return renderMarkdown(md);
      },
    });

    app.mount("#app");
    ```

    > Importing your Markdown renderer dynamically is a good way to reduce the bundle size of your application.

  </Tab>
  <Tab label="Svelte" value="svelte">

    ```svelte fileName="App.svelte"
    <script lang="ts">
      import { MarkdownProvider } from "svelte-intlayer/markdown";
      import MyHeading from "./MyHeading.svelte";
    </script>

    <MarkdownProvider
      components={{
        h1: MyHeading,
      }}
    >
      <slot />
    </MarkdownProvider>
    ```

    You can also use your own markdown renderer:

    ```svelte fileName="App.svelte"
    <script lang="ts">
      import { MarkdownProvider } from "svelte-intlayer/markdown";
    </script>

    <MarkdownProvider
      renderMarkdown={async (md) => {
        const { renderMarkdown } = await import('svelte-intlayer/markdown');
        return renderMarkdown(md);
      }}
    >
      <slot />
    </MarkdownProvider>
    ```

    > Importing your Markdown renderer dynamically is a good way to reduce the bundle size of your application.

  </Tab>
  <Tab label="Preact" value="preact">

    ```tsx fileName="AppProvider.tsx"
    import { MarkdownProvider } from "preact-intlayer/markdown";

    export const AppProvider = ({ children }) => (
      <MarkdownProvider
        components={{
          h1: ({ children }) => <h1 className="text-2xl font-bold">{children}</h1>,
        }}
      >
        {children}
      </MarkdownProvider>
    );
    ```

    You can also use your own markdown renderer:

    ```tsx fileName="AppProvider.tsx"
    import { MarkdownProvider } from "preact-intlayer/markdown";

    export const AppProvider = ({ children }) => (
      <MarkdownProvider
        renderMarkdown={async (md) => {
          const { renderMarkdown } = await import('preact-intlayer/markdown');
          return renderMarkdown(md);
        }}
      >
        {children}
      </MarkdownProvider>
    );
    ```

    > Importing your Markdown renderer dynamically is a good way to reduce the bundle size of your application.

  </Tab>
  <Tab label="Solid" value="solid">

    ```tsx fileName="AppProvider.tsx"
    import { MarkdownProvider } from "solid-intlayer/markdown";

    export const AppProvider = (props) => (
      <MarkdownProvider
        components={{
          h1: (props) => <h1 className="text-2xl font-bold">{props.children}</h1>,
        }}
      >
        {props.children}
      </MarkdownProvider>
    );
    ```

    You can also use your own markdown renderer:

    ```tsx fileName="AppProvider.tsx"
    import { MarkdownProvider } from "solid-intlayer/markdown";

    export const AppProvider = (props) => (
      <MarkdownProvider
        renderMarkdown={async (md) => {
          const { renderMarkdown } = await import('solid-intlayer/markdown');
          return renderMarkdown(md);
        }}
      >
        {props.children}
      </MarkdownProvider>
    );
    ```

    > Importing your Markdown renderer dynamically is a good way to reduce the bundle size of your application.

  </Tab>
  <Tab label="Angular" value="angular">

    ```typescript fileName="app.config.ts"
    import { createIntlayerMarkdownProvider } from "angular-intlayer/markdown";

    export const appConfig: ApplicationConfig = {
      providers: [
        createIntlayerMarkdownProvider({
          components: {
            h1: { class: "text-2xl font-bold" },
          },
        }),
      ],
    };
    ```

    You can also use your own markdown renderer:

    ```typescript fileName="app.config.ts"
    import { createIntlayerMarkdownProvider } from "angular-intlayer/markdown";

    export const appConfig: ApplicationConfig = {
      providers: [
        createIntlayerMarkdownProvider({
          renderMarkdown: async (md) => {
            const { renderMarkdown } = await import('angular-intlayer/markdown');
            return renderMarkdown(md);
          },
        }),
      ],
    };
    ```

    > Importing your Markdown renderer dynamically is a good way to reduce the bundle size of your application.

  </Tab>
</Tabs>

## Suspense

The Intlayer Markdown renderer is dynamically loaded. Although optimized, the underlying parser chunk is approximately 55kb. Loading this synchronously delays the initial page rendering and degrades First Contentful Paint (FCP).

To prevent blocking the UI, Intlayer integrates with React's Suspense API. It fetches the parser in the background and throws a Promise during the download.

Wrap any component rendering Intlayer Markdown in a <Suspense> boundary. This displays a localized fallback state while the chunk downloads, allowing the rest of your DOM to render immediately.

Warning: If you do not provide a <Suspense> boundary, React will suspend at the root level or block the entire component tree from rendering until the 55kb chunk is fully loaded.

<Tabs>
  <Tab label="Next.js" value="nextjs">

In Next.js App Router, you can use either React `Suspense` for client components or a `loading.tsx` file for server components.

**Client Component:**

```tsx fileName="components/MyComponent.tsx"
"use client";
import { useIntlayer } from "next-intlayer";
import { Suspense } from "react";

const MyComponent = () => {
  const markdownContent = useIntlayer("my-markdown");

  return (
    <Suspense fallback={<div>Loading...</div>}>{markdownContent}</Suspense>
  );
};
```

**Server Component with `loading.tsx`:**

```tsx fileName="app/loading.tsx"
export default function Loading() {
  return <div>Loading...</div>;
}
```

```tsx fileName="app/page.tsx"
import { useIntlayer } from "next-intlayer/server";

const MyPage = () => {
  const markdownContent = useIntlayer("my-markdown");
  return <div>{markdownContent}</div>;
};

export default MyPage;
```

  </Tab>

  <Tab label="React" value="react">

```tsx
import { useIntlayer } from "react-intlayer";
import { Suspense } from "react";

const MyComponent = () => {
  const markdownContent = useIntlayer("my-markdown");

  return (
    <Suspense fallback={<div>Loading...</div>}>{markdownContent}</Suspense>
  );
};
```

  </Tab>
 
  <Tab label="Vue" value="vue">

Vue has a built-in `<Suspense>` component. Wrap the component rendering Markdown content in a `<Suspense>` boundary.

```vue fileName="MyComponent.vue"
<script setup>
import { useIntlayer } from "vue-intlayer";

const { markdownContent } = useIntlayer("my-markdown");
</script>

<template>
  <Suspense>
    <component :is="markdownContent" />
    <template #fallback>
      <div>Loading...</div>
    </template>
  </Suspense>
</template>
```

  </Tab>
  <Tab label="Svelte" value="svelte">

Svelte does not have a Suspense API equivalent. Use an `{#await}` block to handle async rendering of Markdown content.

```svelte fileName="MyComponent.svelte"
<script lang="ts">
import { useIntlayer } from "svelte-intlayer";

const content = useIntlayer("my-markdown");
</script>

{#await $content.markdownContent}
  <div>Loading...</div>
{:then rendered}
  {@html rendered}
{/await}
```

  </Tab>
  <Tab label="Preact" value="preact">

Preact supports React's Suspense API via `preact/compat`.

```tsx fileName="MyComponent.tsx"
import { useIntlayer } from "preact-intlayer";
import { Suspense } from "preact/compat";

const MyComponent = () => {
  const markdownContent = useIntlayer("my-markdown");

  return (
    <Suspense fallback={<div>Loading...</div>}>{markdownContent}</Suspense>
  );
};
```

  </Tab>
  <Tab label="Solid" value="solid">

Solid has its own `<Suspense>` component from `solid-js`.

```tsx fileName="MyComponent.tsx"
import { useIntlayer } from "solid-intlayer";
import { Suspense } from "solid-js";

const MyComponent = () => {
  const { markdownContent } = useIntlayer("my-markdown");

  return (
    <Suspense fallback={<div>Loading...</div>}>{markdownContent}</Suspense>
  );
};
```

  </Tab>
  <Tab label="Angular" value="angular">

Angular does not have a Suspense API. Use Angular's deferrable views (`@defer`) to handle lazy-loaded Markdown content (requires Angular 17+).

```typescript fileName="my.component.ts"
import { Component } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-my",
  template: `
    @defer {
      <div [innerHTML]="content().markdownContent"></div>
    } @loading {
      <div>Loading...</div>
    }
  `,
})
export class MyComponent {
  content = useIntlayer("my-markdown");
}
```

  </Tab>
</Tabs>

## Options Reference

These options can be passed to `MarkdownProvider`, `MarkdownRenderer`, `useMarkdownRenderer`, and `renderMarkdown`.

| Option                | Type        | Default | Description                                                                           |
| :-------------------- | :---------- | :------ | :------------------------------------------------------------------------------------ |
| `forceBlock`          | `boolean`   | `false` | Forces the output to be wrapped in a block-level element (e.g., `<div>`).             |
| `forceInline`         | `boolean`   | `false` | Forces the output to be wrapped in an inline element (e.g., `<span>`).                |
| `tagfilter`           | `boolean`   | `true`  | Enables the GitHub Tag Filter for improved security by stripping dangerous HTML tags. |
| `preserveFrontmatter` | `boolean`   | `false` | If `true`, frontmatter at the beginning of the Markdown string will not be stripped.  |
| `components`          | `Overrides` | `{}`    | A map of HTML tags to custom components (e.g., `{ h1: MyHeading }`).                  |
| `wrapper`             | `Component` | `null`  | A custom component to wrap the rendered Markdown.                                     |
| `renderMarkdown`      | `Function`  | `null`  | A custom rendering function to completely replace the default Markdown compiler.      |
