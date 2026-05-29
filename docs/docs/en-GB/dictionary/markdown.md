---
createdAt: 2025-02-07
updatedAt: 2026-05-19
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
  - version: 8.11.0
    changes: "Allow pre parsing of Markdown ast parsing for SSR / hydration"
  - version: 8.10.0
    date: 2026-05-19
    changes: "Added support for `.content.md` files"
  - version: 8.5.0
    date: 2026-03-24
    changes: "Added `intlayerMarkdown` plugin object; use `app.use(intlayerMarkdown)` instead of `app.use(installIntlayerMarkdown)`"
  - version: 8.5.0
    date: 2026-03-24
    changes: "Moved import from `{{framework}}-intlayer` to `{{framework}}-intlayer/markdown`"
  - version: 8.0.0
    date: 2026-01-22
    changes: "Added MarkdownRenderer / useMarkdownRenderer / renderMarkdown utility and forceInline option"
  - version: 8.0.0
    date: 2026-01-18
    changes: "Automatic decoration of markdown content, MDX and SSR support"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Initialised history"
---

# Markdown / Rich Text Content

Intlayer supports rich text content defined using Markdown syntax. This allows you to easily write and maintain richly-formatted content like blogs, articles, and more.

## Declaring Markdown Content

You can declare Markdown content using the `md` function or simply as a string (if it contains Markdown syntax).

<Tabs>
  <Tab label=".content.md" value=".content.md">
    Starting from version `8.10.0`, you can declare Markdown content directly in `.content.md` files. Intlayer will automatically detect and parse the Markdown content.

    ```md fileName="markdown-file.en-GB.content.md"
    ---
    key: my-markdown-content
    description: My content
    locale: en-GB
    ---

    # My content

    Here is a markdown content example
    ```

    The `locale` front-matter field is the field that defines the content locale. It is optional. If not provided, Intlayer will use the default locale, which is also used as a fallback locale if no translation is available for a specific locale.

    Files structure example:

    ```text
    content/
    ├── en-GB/
    │   └── markdown-file.en-GB.content.md
    ├── fr/
    │   └── markdown-file.fr.content.md
    └── es/
        └── markdown-file.es.content.md
    ```

    You can add in the front-matter any properties defined in the [Dictionary Definition](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/dictionary/content_file.md)

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
          en: md(file("./myMarkdown.en-GB.md")),
          fr: md(file("./myMarkdown.fr.md")),
        }),
      },
    };
    ```

  </Tab>

  <Tab label="Automatic Detection" value="automatic-detection">
    If the string contains common Markdown indicators (like headings, lists, links, etc.), Intlayer will automatically transform it.

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
   - Frontmatter is parsed and exposed as `.metadata`. You can override the rendering at two levels — globally with `MarkdownProvider` (or framework equivalent) and locally per node with `.use()`. Both can be combined; `.use()` takes precedence over `MarkdownProvider`, which takes precedence over the default.

2. **Helper utilities** — `<MarkdownRenderer />`, `useMarkdownRenderer()`, and `renderMarkdown()` are standalone tools that accept **only raw Markdown strings**. They are independent of `useIntlayer` and do not work with the decorated nodes it returns.

Markdown rendering supports **MDX** — use any JSX/framework component by name directly inside your Markdown.

### 1. Automatic Rendering (via `useIntlayer`)

<Tabs group="framework">
  <Tab label="React" value="react">
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
          MyButton: (props) => <button {...props} />, // MDX Component
        }}
      >
        <AppContent />
      </MarkdownProvider>
    );
    ```

    > If `MarkdownProvider` is not present, Intlayer will render the markdown using the default Markdown to JSX parser.

    You can also provide local overrides for specific nodes using the `.use()` method:

    ```tsx
    {myMarkdownContent.use({
      h1: ({ children }) => <h1 style={{ color: "red" }}>{children}</h1>,
    })}
    ```

    You can retrieve the Markdown as a string:

    ```tsx
    {myMarkdownContent.value}
    {String(myMarkdownContent)}
    {myMarkdownContent.toString()}
    ```

    And you can access your markdown metadata like this:

    ```tsx
    {myMarkdownContent.metadata}
    {myMarkdownContent.metadata.title}
    ```

  </Tab>
  <Tab label="Next.js" value="nextjs">
    Markdown nodes can be rendered directly as JSX.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "next-intlayer";
    import { MarkdownProvider } from "next-intlayer/markdown";

    const AppContent = () => {
      const { myMarkdownContent } = useIntlayer("app");

      return <div>{myMarkdownContent}</div>;
    };

    const App = () => (
      <MarkdownProvider
        components={{
          h1: ({ children }) => <h1 style={{ color: "red" }}>{children}</h1>,
          MyButton: (props) => <button {...props} />, // MDX Component
        }}
      >
        <AppContent />
      </MarkdownProvider>
    );
    ```

    > If `MarkdownProvider` is not present, Intlayer will render the markdown using the default Markdown to JSX parser.

    You can also provide local overrides for specific nodes using the `.use()` method:

    ```tsx
    {myMarkdownContent.use({
      h1: ({ children }) => <h1 style={{ color: "red" }}>{children}</h1>,
    })}
    ```

    You can retrieve the Markdown as a string:

    ```tsx
    {myMarkdownContent.value}
    {String(myMarkdownContent)}
    {myMarkdownContent.toString()}
    ```

    And you can access your markdown metadata like this:

    ```tsx
    {myMarkdownContent.metadata}
    {myMarkdownContent.metadata.title}
    ```

  </Tab>
  <Tab label="Vue" value="vue">
    In Vue, Markdown content can be rendered using the built-in `component` tag or directly as a node.

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
        MyButton: (props) => h('button', props), // MDX Component
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

    You can retrieve the Markdown as a string:

    ```vue
    {{ myMarkdownContent.value }}
    {{ String(myMarkdownContent) }}
    {{ myMarkdownContent.toString() }}
    ```

    And you can access your markdown metadata like this:

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

    You can retrieve the Markdown as a string:

    ```svelte
    {$content.myMarkdownContent.value}
    {String($content.myMarkdownContent)}
    {$content.myMarkdownContent.toString()}
    ```

    And you can access your markdown metadata like this:

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
          MyButton: (props) => <button {...props} />, // MDX Component
        }}
      >
        <AppContent />
      </MarkdownProvider>
    );
    ```

    > If `MarkdownProvider` is not present, Intlayer will render the markdown using the default Markdown to JSX parser.

    You can also provide local overrides for specific nodes using the `.use()` method:

    ```tsx
    {myMarkdownContent.use({
      h1: ({ children }) => <h1 style={{ color: "red" }}>{children}</h1>,
    })}
    ```

    You can retrieve the Markdown as a string:

    ```tsx
    {myMarkdownContent.value}
    {String(myMarkdownContent)}
    {myMarkdownContent.toString()}
    ```

    And you can access your markdown metadata like this:

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
          MyButton: (props) => <button {...props} />, // MDX Component
        }}
      >
        <AppContent />
      </MarkdownProvider>
    );
    ```

    > If `MarkdownProvider` is not present, Intlayer will render the markdown using the default Markdown to JSX parser.

    You can also provide local overrides for specific nodes using the `.use()` method:

    ```tsx
    {myMarkdownContent.use({
      h1: (props) => <h1 style={{ color: "red" }}>{props.children}</h1>,
    })}
    ```

    You can retrieve the Markdown as a string:

    ```tsx
    {myMarkdownContent.value}
    {String(myMarkdownContent)}
    {myMarkdownContent.toString()}
    ```

    And you can access your markdown metadata like this:

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

    You can retrieve the Markdown as a string:

    ```typescript
    content().myMarkdownContent.value
    String(content().myMarkdownContent)
    content().myMarkdownContent.toString()
    ```

    And you can access your markdown metadata like this:

    ```typescript
    content().myMarkdownContent.metadata
    content().myMarkdownContent.metadata.title
    ```

  </Tab>
</Tabs>

### 2. Helper Utilities (Markdown Strings Only)

These utilities render **only raw Markdown strings** and are independent of `useIntlayer`. Use them when you need to render Markdown from sources other than your dictionaries.

<Tabs group="framework">
  <Tab label="React" value="react">
  
    #### `<MarkdownRenderer />` Component

    Renders a Markdown string with specific options.

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
  <Tab label="Next.js" value="nextjs">
  
    #### `<MarkdownRenderer />` Component

    Renders a Markdown string with specific options.

    ```tsx
    import { MarkdownRenderer } from "next-intlayer/markdown";

    <MarkdownRenderer forceBlock={true} tagfilter={true}>
      {"# My Title"}
    </MarkdownRenderer>
    ```

    #### `useMarkdownRenderer()` Hook

    Get a pre-configured renderer function.

    ```tsx
    import { useMarkdownRenderer } from "next-intlayer/markdown";

    const renderMarkdown = useMarkdownRenderer({
      forceBlock: true,
      components: { h1: (props) => <h1 {...props} className="custom" /> }
    });

    return renderMarkdown("# My Title");
    ```

    #### `renderMarkdown()` Utility
    Standalone utility for rendering outside of components.

    ```tsx
    import { renderMarkdown } from "next-intlayer/markdown";

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
    Renders a Markdown string using the service.

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

The `MarkdownProvider` (or its framework equivalent) configures the Markdown rendering pipeline for your entire application. This applies to both the automatic `useIntlayer` rendering and the helper utilities. Options set here are the defaults — `.use()` overrides them at the node level.

<Tabs group="framework">
  <Tab label="React" value="react">

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

    > Importing your Markdown renderer dynamically is a great way to reduce the bundle size of your application.

  </Tab>
  <Tab label="Next.js" value="nextjs">

    ```tsx fileName="AppProvider.tsx"
    import { MarkdownProvider } from "next-intlayer/markdown";

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
    import { MarkdownProvider } from "next-intlayer/markdown";

    export const AppProvider = ({ children }) => (
      <MarkdownProvider
        renderMarkdown={async (md) => {
          // Use dynamic import to reduce the bundle size of your application
          const { renderMarkdown } = await import('next-intlayer/markdown');
          return renderMarkdown(md);
        }}
      >
        {children}
      </MarkdownProvider>
    );
    ```

    > Importing your Markdown renderer dynamically is a great way to reduce the bundle size of your application.

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


    > MDX is supported — any component name used inside your Markdown (e.g. `<MyCustomJSXComponent />`) is resolved against the `components` map.

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

    > Importing your Markdown renderer dynamically is a great way to reduce the bundle size of your application.

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


    > MDX is supported — any component name used inside your Markdown (e.g. `<MyCustomJSXComponent />`) is resolved against the `components` map.

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

    > Importing your Markdown renderer dynamically is a great way to reduce the bundle size of your application.

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


    > MDX is supported — any component name used inside your Markdown (e.g. `<MyCustomJSXComponent />`) is resolved against the `components` map.

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

    > Importing your Markdown renderer dynamically is a great way to reduce the bundle size of your application.

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


    > MDX is supported — any component name used inside your Markdown (e.g. `<MyCustomJSXComponent />`) is resolved against the `components` map.

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

    > Importing your Markdown renderer dynamically is a great way to reduce the bundle size of your application.

  </Tab>
  <Tab label="Angular" value="angular">

    ```typescript fileName="app.module.ts"
    import { NgModule } from '@angular/core';
    import { IntlayerMarkdownModule } from 'angular-intlayer/markdown';

    @NgModule({
      imports: [
        IntlayerMarkdownModule.forRoot({
          renderMarkdown: async (md) => {
            const { renderMarkdown } = await import('angular-intlayer/markdown');
            return renderMarkdown(md);
          }
        })
      ]
    })
    export class AppModule {}
    ```

    > Importing your Markdown renderer dynamically is a great way to reduce the bundle size of your application.

  </Tab>
</Tabs>

## Suspense

The Intlayer Markdown renderer is dynamically loaded. Although optimized, the underlying parser chunk is approximately 55kb. Loading this synchronously delays the initial page rendering and degrades First Contentful Paint (FCP).

To prevent blocking the UI, Intlayer integrates with React's Suspense API. It fetches the parser in the background and throws a Promise during the download.

Wrap any component rendering Intlayer Markdown in a `<Suspense>` boundary. This displays a localized fallback state while the chunk downloads, allowing the rest of your DOM to render immediately.

Warning: If you do not provide a `<Suspense>` boundary, React will suspend at the root level or block the entire component tree from rendering until the 55kb chunk is fully loaded.

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

---

## Server-Side Rendering (SSR) and Hydration

In comparison of other Markdown parser such as remark / rehype, the Intlayer Markdown is dependency free and run on client as server side.

But Intlayer optimized the parsing for Server-Side Rendering (SSR) frameworks (such as Next.js App Router, React Router, Nuxt, SvelteKit, etc.).

Instead of sending raw Markdown strings to the client and parsing them on the browser (which incurs a performance penalty), Intlayer allows you to pre-parse the Markdown into an Abstract Syntax Tree (AST) on the server.

You can use the `parseMarkdown` function from your framework's Intlayer package on the server side to generate a serializable AST (`ParsedMarkdown` object), and pass it directly to the frontend. All Intlayer rendering utilities (like `<MarkdownRenderer>`, `useMarkdownRenderer`, etc.) automatically accept this AST object and render it seamlessly.

### Example in a Server/Client Architecture

<Tabs group="framework">
  <Tab label="React Router" value="react">

    ```tsx fileName="server.ts"
    import { parseMarkdown } from "react-intlayer/markdown";

    // 1. On the server: Parse the markdown into a serializable AST
    export const loader = async () => {
      const markdownString = "## My title \n\nLorem Ipsum";
      const ast = parseMarkdown(markdownString);

      // Return the AST as JSON to the client
      return Response.json({ content: ast });
    };
    ```

    ```tsx fileName="client.tsx"
    import { useLoaderData } from "react-router";
    import { MarkdownRenderer } from "react-intlayer/markdown";

    // 2. On the client: Render the AST directly without re-parsing
    export default function Page() {
      const { content } = useLoaderData();

      // The renderer accepts either a raw string or the parsed AST
      return <MarkdownRenderer content={content} />;
    }
    ```

  </Tab>
  <Tab label="Next.js" value="nextjs">

    ```tsx fileName="app/page.tsx"
    import { parseMarkdown } from "next-intlayer/markdown";
    import { MarkdownRenderer } from "next-intlayer/markdown";

    export default async function Page() {
      // 1. Parse the markdown into a serializable AST on the server
      const markdownString = "## My title \n\nLorem Ipsum";
      const ast = parseMarkdown(markdownString);

      // 2. Render the AST directly
      // In a Server Component, this works seamlessly and passes the AST
    // directly to the underlying client components if needed.
      return <MarkdownRenderer content={ast} />;
    }
    ```

  </Tab>
  <Tab label="Vue / Nuxt" value="vue">

    ```vue fileName="pages/index.vue"
    <script setup lang="ts">
    import { parseMarkdown } from "vue-intlayer/markdown";
    import { MarkdownRenderer } from "vue-intlayer/markdown";

    // 1. Fetch and parse the markdown into an AST on the server
    const { data: ast } = await useAsyncData('markdown', () => {
      const markdownString = "## My title \n\nLorem Ipsum";
      return parseMarkdown(markdownString);
    });
    </script>

    <template>
      <!-- 2. On the client: Render the AST directly without re-parsing -->
      <MarkdownRenderer :content="ast" />
    </template>
    ```

  </Tab>
  <Tab label="SvelteKit" value="svelte">

    ```typescript fileName="+page.server.ts"
    import { parseMarkdown } from "svelte-intlayer/markdown";

    // 1. On the server: Parse the markdown into a serializable AST
    export const load = async () => {
      const markdownString = "## My title \n\nLorem Ipsum";
      const ast = parseMarkdown(markdownString);

      // Return the AST to the client
      return { content: ast };
    };
    ```

    ```svelte fileName="+page.svelte"
    <script lang="ts">
      import { MarkdownRenderer } from "svelte-intlayer/markdown";
      export let data;
    </script>

    <!-- 2. On the client: Render the AST directly without re-parsing -->
    <MarkdownRenderer value={data.content} />
    ```

  </Tab>
  <Tab label="Angular" value="angular">

    Angular SSR typically resolves the data on the server during the initial load and hydrates on the client. You can use resolvers to pass the AST.

    ```typescript fileName="app.resolver.ts"
    import { Injectable } from "@angular/core";
    import { Resolve } from "@angular/router";
    import { parseMarkdown, type ParsedMarkdown } from "angular-intlayer/markdown";

    @Injectable({ providedIn: "root" })
    export class MarkdownResolver implements Resolve<ParsedMarkdown> {
      resolve(): ParsedMarkdown {
        const markdownString = "## My title \n\nLorem Ipsum";
        // 1. On the server: Parse the markdown into a serializable AST
        return parseMarkdown(markdownString);
      }
    }
    ```

    ```typescript fileName="app.component.ts"
    import { Component } from "@angular/core";
    import { ActivatedRoute } from "@angular/router";
    import { IntlayerMarkdownService, type ParsedMarkdown } from "angular-intlayer/markdown";

    @Component({
      selector: "app-root",
      template: `<div [innerHTML]="renderedMarkdown"></div>`,
    })
    export class AppComponent {
      renderedMarkdown: string = "";

      constructor(
        private route: ActivatedRoute,
        private markdownService: IntlayerMarkdownService
      ) {
        // 2. On the client: Render the AST directly without re-parsing
        this.route.data.subscribe((data) => {
          this.renderedMarkdown = this.markdownService.renderMarkdown(
            data.markdownAst
          ) as string;
        });
      }
    }
    ```

  </Tab>
</Tabs>

This pattern ensures that the Markdown parsing logic is executed entirely on the server, significantly reducing the client-side execution time and improving the initial hydration speed.

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
