---
createdAt: 2026-01-20
updatedAt: 2026-01-22
title: HTML Content
description: Learn how to declare and use HTML content with custom components in Intlayer. Refer to this documentation to embed rich, HTML-like content with dynamic component replacement in your internationalised project.
keywords:
  - HTML
  - Custom Components
  - Rich Content
  - Intlayer
  - Next.js
  - JavaScript
  - React
  - Vue
  - Svelte
slugs:
  - doc
  - concept
  - content
  - html
history:
  - version: 8.0.0
    date: 2026-01-22
    changes: Add HTMLRenderer / useHTMLRenderer / renderHTML utility
  - version: 8.0.0
    date: 2026-01-20
    changes: Add HTML parsing support
---

# HTML Content / HTML in Intlayer

Intlayer supports HTML content, allowing you to embed rich, structured content within your dictionaries. This content can be rendered using standard HTML tags or replaced with custom components at runtime.

## How HTML Works

Intlayer v8 intelligently detects HTML tags in your content strings. If a string is identified as HTML (contains tags), it is automatically transformed into an HTML node.

<Columns>
<Column title="v7 behaviour (Manual wrapping)">

```typescript fileName="htmlDictionary.content.ts"
import { html } from "intlayer";

export default {
  key: "app",
  content: {
    text: html("<p>Hello <strong>World</strong></p>"),
  },
};
```

</Column>
<Column title="v8 behaviour (Automatic detection)">

```typescript fileName="htmlDictionary.content.ts"
export default {
  key: "app",
  content: {
    text: "<p>Hello <strong>World</strong></p>",
  },
};
```

</Column>
</Columns>

---

## Declaring HTML content

You can declare HTML content using the `html` function or simply as a string.

<Tabs>
  <Tab label="Manual wrapping">
    Use the `html` function to explicitly declare HTML content. This ensures standard tags are mapped correctly even if automatic detection is disabled.

    ```typescript fileName="htmlDictionary.content.ts"
    import { html, type Dictionary } from "intlayer";

    const htmlDictionary = {
      key: "app",
      content: {
        myHtmlContent: html("<p>Hello <strong>World</strong></p>"),
      },
    } satisfies Dictionary;

    export default htmlDictionary;
    ```

  </Tab>
  <Tab label="Automatic detection">
    If the string contains common HTML tags (e.g., `<p>`, `<div>`, `<strong>`, etc.), Intlayer will automatically convert it.

    ```typescript fileName="htmlDictionary.content.ts"
    export default {
      key: "app",
      content: {
        myHtmlContent: "<p>Hello <strong>World</strong></p>",
      },
    };
    ```

  </Tab>
  <Tab label="External Files">
    Import HTML content from files. Note that the `file()` function currently returns a string, which will be auto-detected as HTML if it contains tags.

    ```typescript fileName="htmlDictionary.content.ts"
    import { html, file, t } from "intlayer";

    export default {
      key: "app",
      content: {
        content: t({
          'en-GB': html(file("./content.en.html")),
          en: html(file("./content.en.html")),
          fr: html(file("./content.fr.html")),
        }),
      },
    };
    ```

  </Tab>
</Tabs>

---

## Rendering HTML

Rendering can be handled automatically by Intlayer's content system or manually using specialised tools.

### Automatic Rendering (using `useIntlayer`)

When you access content via `useIntlayer`, HTML nodes are already prepared for rendering.

<Tabs group="framework">
  <Tab label="React / Next.js">
    HTML nodes can be rendered directly as JSX. Standard tags work automatically.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "react-intlayer";

    const AppContent = () => {
      const { myHtmlContent } = useIntlayer("app");
      return <div>{myHtmlContent}</div>;
    };
    ```

    Use the `.use()` method to provide custom components or override tags:

    ```tsx
    {myHtmlContent.use({
      p: (props) => <p className="prose" {...props} />,
      CustomLink: ({ children }) => <a href="/details">{children}</a>,
    })}
    ```

  </Tab>
  <Tab label="Vue">
    In Vue, HTML content can be rendered using the built-in `component`.

    ```vue fileName="App.vue"
    <script setup>
    import { useIntlayer } from "vue-intlayer";
    const { myHtmlContent } = useIntlayer("app");
    </script>

    <template>
      <component :is="myHtmlContent" />
    </template>
    ```

    Use `.use()` for overrides:
    ```vue
    <component :is="myHtmlContent.use({ h1: 'h2' })" />
    ```

  </Tab>
  <Tab label="Svelte">
    Svelte renders HTML nodes as strings. Use `{@html}` to render it.

    ```svelte
    <script lang="ts">
    import { useIntlayer } from "svelte-intlayer";
    const content = useIntlayer("app");
    </script>

    {@html $content.myHtmlContent}
    ```

  </Tab>
  <Tab label="Preact">
    Preact supports HTML nodes directly in the JSX.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "preact-intlayer";

    const AppContent = () => {
      const { myHtmlContent } = useIntlayer("app");
      return <div>{myHtmlContent}</div>;
    };
    ```

  </Tab>
</Tabs>

## Global configuration with `HTMLProvider`

You can configure HTML rendering globally for your whole application. This is ideal for defining custom components that should be available in all HTML content.

<Tabs group="framework">
  <Tab label="React / Next.js">
  
    ```tsx fileName="AppProvider.tsx"
    import { HTMLProvider } from "react-intlayer";

    export const AppProvider = ({ children }) => (
      <HTMLProvider
        components={{
          p: (props) => <p className="prose" {...props} />,
          CustomLink: ({ children }) => <a href="/details">{children}</a>,
        }}
      >
        {children}
      </HTMLProvider>
    );
    ```

  </Tab>
  <Tab label="Vue">
  
    ```typescript fileName="main.ts"
    import { createApp, h } from "vue";
    import { installIntlayer, installIntlayerHTML } from "vue-intlayer";
    import App from "./App.vue";

    const app = createApp(App);

    app.use(installIntlayer);
    app.use(installIntlayerHTML, {
      components: {
        p: (props, { slots }) => h("p", { class: "prose", ...props }, slots.default?.()),
        CustomLink: (props, { slots }) => h("a", { href: "/details", ...props }, slots.default?.()),
      },
    });

    app.mount("#app");
    ```

  </Tab>
  <Tab label="Svelte">
   
    ```svelte fileName="App.svelte"
    <script lang="ts">
      import { HTMLProvider } from "svelte-intlayer";
      import MyCustomP from "./MyCustomP.svelte";
    </script>

    <HTMLProvider
      components={{
        p: MyCustomP,
      }}
    >
      <slot />
    </HTMLProvider>
    ```

  </Tab>
  <Tab label="Preact">
   
    ```tsx fileName="AppProvider.tsx"
    import { HTMLProvider } from "preact-intlayer";

    export const AppProvider = ({ children }) => (
      <HTMLProvider
        components={{
          p: (props) => <p className="prose" {...props} />,
        }}
      >
        {children}
      </HTMLProvider>
    );
    ```

  </Tab>
</Tabs>

---

### Manual Rendering & Advanced Tools

If you need to render raw HTML strings or require greater control over component mapping, use the following tools.

<Tabs group="framework">
  <Tab label="React / Next.js">
    #### `<HTMLRenderer />` Component
    Render an HTML string with specific components.

    ```tsx
    import { HTMLRenderer } from "react-intlayer";

    <HTMLRenderer components={{ p: MyCustomP }}>
      {"<p>Hello World</p>"}
    </HTMLRenderer>
    ```

    #### `useHTMLRenderer()` Hook

    Obtain a preconfigured renderer function.

    ```tsx
    import { useHTMLRenderer } from "react-intlayer";

    const renderHTML = useHTMLRenderer({
      components: { strong: (props) => <strong {...props} className="text-red-500" /> }
    });

    return renderHTML("<p>Hello <strong>World</strong></p>");
    ```

    #### `renderHTML()` Utility

    Standalone utility for rendering outside components.

    ```tsx
    import { renderHTML } from "react-intlayer";

    const jsx = renderHTML("<p>Hello</p>", { components: { p: 'div' } });
    ```

  </Tab>
  <Tab label="Vue">
   
    #### `<HTMLRenderer />` Component
   
    ```vue
    <script setup>
    import { HTMLRenderer } from "vue-intlayer";
    </script>

    <template>
      <HTMLRenderer content="<p>Hello World</p>" />
    </template>
    ```

  </Tab>
  <Tab label="Svelte">
  
    #### `<HTMLRenderer />` Component
   
    ```svelte
    <script lang="ts">
    import { HTMLRenderer } from "svelte-intlayer";
    </script>

    <HTMLRenderer value="<p>Hello World</p>" />
    ```

  </Tab>
  <Tab label="Preact">
   
    #### `<HTMLRenderer />` Component
   
    ```tsx
    import { HTMLRenderer } from "preact-intlayer";

    <HTMLRenderer>
      {"<p>Hello World</p>"}
    </HTMLRenderer>
    ```

  </Tab>
</Tabs>

---

## Options Reference

These options can be passed to `HTMLProvider`, `HTMLRenderer`, `useHTMLRenderer` and `renderHTML`.

| Option       | Type                  | Default | Description                                                                                                  |
| :----------- | :-------------------- | :------ | :----------------------------------------------------------------------------------------------------------- |
| `components` | `Record<string, any>` | `{}`    | A mapping of HTML tags or custom component names to components.                                              |
| `renderHTML` | `Function`            | `null`  | A custom rendering function to entirely replace the default HTML parser (only for Vue and Svelte providers). |

> Note: For React and Preact, standard HTML tags are provided automatically. You only need to pass the `components` prop if you want to override them or add custom components.
