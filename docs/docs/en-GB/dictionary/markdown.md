---
createdAt: 2025-02-07
updatedAt: 2026-01-22
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
slugs:
  - doc
  - concept
  - content
  - markdown
history:
  - version: 8.0.0
    date: 2026-01-22
    changes: Add MarkdownRenderer / useMarkdownRenderer / renderMarkdown utility and forceInline option
  - version: 8.0.0
    date: 2026-01-18
    changes: Automatic decoration of markdown content, MDX and SSR support
  - version: 5.5.10
    date: 2025-06-29
    changes: Init history
---

# Markdown / Rich Text Content

Intlayer supports rich text content defined using Markdown syntax. This allows you to easily write and maintain content with rich formatting, such as blogs, articles, and more.

## How Markdown Works

Intlayer v8 intelligently detects Markdown syntax in your content strings. If a string is identified as Markdown, it is automatically transformed into a Markdown node.

<Columns>
  <Column title="v7 behaviour (Manual wrapping)">

    ```typescript fileName="markdownDictionary.content.ts"
    import { md } from "intlayer";

    export default {
      key: "app",
      content: {
        text: md("## My title \n\nLorem Ipsum"),
      },
    };
    ```

  </Column>
  <Column title="v8 behaviour (Automatic detection)">

    ```typescript fileName="markdownDictionary.content.ts"
    export default {
      key: "app",
      contentAutoTransformation: true, // Enable automatic detection of Markdown content - Can be set globally in intlayer.config.ts
      content: {
        text: "## My title \n\nLorem Ipsum",
      },
    };
    ```

  </Column>
</Columns>

---

## Part 1: Declaring Markdown Content

You can declare Markdown content using the `md` function or simply as a string (if it contains Markdown syntax).

<Tabs>
  <Tab label="Manual Wrapping">
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
  <Tab label="Automatic Detection">
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
  <Tab label="External Files">
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
</Tabs>

---

## Part 2: Rendering Markdown

Rendering can be handled automatically by Intlayer's content system or manually using specialised tools.

### 1. Automatic Rendering (using `useIntlayer`)

When you access content via `useIntlayer`, Markdown nodes are already prepared for rendering.

<Tabs group="framework">
  <Tab label="React / Next.js">
    Markdown nodes can be rendered directly as JSX.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "react-intlayer";

    const AppContent = () => {
      const { myMarkdownContent } = useIntlayer("app");
      return <div>{myMarkdownContent}</div>;
    };
    ```

    You can also provide local overrides for specific nodes using the `.use()` method:

    ```tsx
    {myMarkdownContent.use({
      h1: ({ children }) => <h1 className="text-3xl font-bold">{children}</h1>,
    })}
    ```

  </Tab>
  <Tab label="Vue">
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

  </Tab>
  <Tab label="Svelte">
    Svelte renders Markdown as an HTML string by default. Use `{@html}` to render it.

    ```svelte
    <script lang="ts">
    import { useIntlayer } from "svelte-intlayer";
    const content = useIntlayer("app");
    </script>

    {@html $content.myMarkdownContent}
    ```

  </Tab>
  <Tab label="Preact">
    Preact supports Markdown nodes directly in the JSX.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "preact-intlayer";

    const AppContent = () => {
      const { myMarkdownContent } = useIntlayer("app");
      return <div>{myMarkdownContent}</div>;
    };
    ```

  </Tab>
  <Tab label="Solid">
    Solid supports Markdown nodes directly in the JSX.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "solid-intlayer";

    const AppContent = () => {
      const { myMarkdownContent } = useIntlayer("app");
      return <div>{myMarkdownContent}</div>;
    };
    ```

  </Tab>
  <Tab label="Angular">
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

    You can also provide local overrides for specific nodes using the `.use()` method:

    ```typescript
    content().myMarkdownContent.use({
      h1: { class: "text-3xl font-bold" },
    })
    ```

  </Tab>
</Tabs>

### 2. Manual Rendering & Advanced Tools

If you need to render raw Markdown strings or have more control over the rendering process, use the following tools.

<Tabs group="framework">
  <Tab label="React / Next.js">
  
    #### `<MarkdownRenderer />` Component

    Render a Markdown string with specific options.

    ```tsx
    import { MarkdownRenderer } from "react-intlayer";

    <MarkdownRenderer forceBlock={true} tagfilter={true}>
      {"# My Title"}
    </MarkdownRenderer>
    ```

    #### `useMarkdownRenderer()` Hook

    Get a pre-configured renderer function.

    ```tsx
    import { useMarkdownRenderer } from "react-intlayer";

    const renderMarkdown = useMarkdownRenderer({
      forceBlock: true,
      components: { h1: (props) => <h1 {...props} className="custom" /> }
    });

    return renderMarkdown("# My Title");
    ```

    #### `renderMarkdown()` Utility
    Standalone utility for rendering outside of components.

    ```tsx
    import { renderMarkdown } from "react-intlayer";

    const jsx = renderMarkdown("# My Title", { forceBlock: true });
    ```

  </Tab>
  <Tab label="Vue">

    #### `<MarkdownRenderer />` Component

    ```vue
    <script setup>
    import { MarkdownRenderer } from "vue-intlayer";
    </script>

    <template>
      <MarkdownRenderer :forceBlock="true" content="# My Title" />
    </template>
    ```

  </Tab>
  <Tab label="Svelte">

    #### `<MarkdownRenderer />` Component

    ```svelte
    <script lang="ts">
    import { MarkdownRenderer } from "svelte-intlayer";
    </script>

    <MarkdownRenderer forceBlock={true} value="# My Title" />
    ```

    #### `useMarkdownRenderer()` Hook

    ```svelte
    <script lang="ts">
    import { useMarkdownRenderer } from "svelte-intlayer";
    const render = useMarkdownRenderer();
    </script>

    {@html render("# My Title")}
    ```

    #### `renderMarkdown()` Utility

    ```svelte
    <script lang="ts">
    import { renderMarkdown } from "svelte-intlayer";
    </script>

    {@html renderMarkdown("# My Title")}
    ```

  </Tab>
  <Tab label="Preact">
    #### `<MarkdownRenderer />` Component

    ```tsx
    import { MarkdownRenderer } from "preact-intlayer";

    <MarkdownRenderer forceBlock={true}>
      {"# My Title"}
    </MarkdownRenderer>
    ```

    #### `useMarkdownRenderer()` Hook

    ```tsx
    import { useMarkdownRenderer } from "preact-intlayer";

    const render = useMarkdownRenderer();

    return <div>{render("# My Title")}</div>;
    ```

    #### `renderMarkdown()` Utility

    ```tsx
    import { renderMarkdown } from "preact-intlayer";

    return <div>{renderMarkdown("# My Title")}</div>;
    ```

  </Tab>
  <Tab label="Solid">
    #### `<MarkdownRenderer />` Component

    ```tsx
    import { MarkdownRenderer } from "solid-intlayer";

    <MarkdownRenderer forceBlock={true}>
      {"# My Title"}
    </MarkdownRenderer>
    ```

    #### `useMarkdownRenderer()` Hook

    ```tsx
    import { useMarkdownRenderer } from "solid-intlayer";

    const render = useMarkdownRenderer();

    return <div>{render("# My Title")}</div>;
    ```

    #### `renderMarkdown()` Utility

    ```tsx
    import { renderMarkdown } from "solid-intlayer";

    return <div>{renderMarkdown("# My Title")}</div>;
    ```

  </Tab>
  <Tab label="Angular">
    #### `IntlayerMarkdownService` Service
    Render a Markdown string using the service.

    ```typescript
    import { IntlayerMarkdownService } from "angular-intlayer";

    export class MyComponent {
      constructor(private markdownService: IntlayerMarkdownService) {}

      renderMarkdown(markdown: string) {
        return this.markdownService.renderMarkdown(markdown);
      }
    }
    ```

  </Tab>
</Tabs>

---

## Global Configuration with `MarkdownProvider`

You can configure Markdown rendering globally for your entire application. This avoids passing the same props to every renderer.

<Tabs group="framework">
  <Tab label="React / Next.js">

    ```tsx fileName="AppProvider.tsx"
    import { MarkdownProvider } from "react-intlayer";

    export const AppProvider = ({ children }) => (
      <MarkdownProvider
        forceBlock={true}
        tagfilter={true}
        components={{
          h1: ({ children }) => <h1 className="text-2xl font-bold">{children}</h1>,
          a: ({ href, children }) => <Link to={href}>{children}</Link>,
        }}
      >
        {children}
      </MarkdownProvider>
    );
    ```

  </Tab>
  <Tab label="Vue">

    ```typescript fileName="main.ts"
    import { createApp } from "vue";
    import { installIntlayer, installIntlayerMarkdown } from "vue-intlayer";
    import App from "./App.vue";

    const app = createApp(App);

    app.use(installIntlayer);
    app.use(installIntlayerMarkdown, {
      forceBlock: true,
      tagfilter: true,
      components: {
        h1: {
          component: "h1",
          props: { class: "text-2xl font-bold" },
        },
      },
    });

    app.mount("#app");
    ```

  </Tab>
  <Tab label="Svelte">

    ```svelte fileName="App.svelte"
    <script lang="ts">
      import { MarkdownProvider } from "svelte-intlayer";
      import MyHeading from "./MyHeading.svelte";
    </script>

    <MarkdownProvider
      forceBlock={true}
      tagfilter={true}
      components={{
        h1: MyHeading,
      }}
    >
      <slot />
    </MarkdownProvider>
    ```

  </Tab>
  <Tab label="Preact">

    ```tsx fileName="AppProvider.tsx"
    import { MarkdownProvider } from "preact-intlayer";

    export const AppProvider = ({ children }) => (
      <MarkdownProvider
        forceBlock={true}
        tagfilter={true}
        components={{
          h1: ({ children }) => <h1 className="text-2xl font-bold">{children}</h1>,
        }}
      >
        {children}
      </MarkdownProvider>
    );
    ```

  </Tab>
  <Tab label="Solid">

    ```tsx fileName="AppProvider.tsx"
    import { MarkdownProvider } from "solid-intlayer";

    export const AppProvider = (props) => (
      <MarkdownProvider
        forceBlock={true}
        tagfilter={true}
        components={{
          h1: (props) => <h1 className="text-2xl font-bold">{props.children}</h1>,
        }}
      >
        {props.children}
      </MarkdownProvider>
    );
    ```

  </Tab>
  <Tab label="Angular">

    ```typescript fileName="app.config.ts"
    import { createIntlayerMarkdownProvider } from "angular-intlayer";

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

  </Tab>
</Tabs>

---

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
