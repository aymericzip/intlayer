---
createdAt: 2026-01-20
updatedAt: 2026-01-20
title: HTML Content
description: Learn how to declare and use HTML content with custom components in Intlayer. Follow this documentation to embed rich HTML-like content with dynamic component replacement in your internationalized project.
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
    date: 2026-01-20
    changes: Add HTML parsing support
---

# HTML Content / HTML in Intlayer

## How HTML Works

In Intlayer, HTML content is achieved through the `html` function, which parses an HTML-like string and allows you to replace tags with custom components at runtime. This approach enables you to embed rich, structured content within your dictionaries while maintaining full control over how each element is rendered.

When integrated with React Intlayer, Vue Intlayer, or Next Intlayer, standard HTML tags (such as `div`, `span`, `p`, `a`, etc.) are automatically provided by default. For custom components, you simply pass them when rendering the content.

## Setting Up HTML Content

To set up HTML content in your Intlayer project, create a content module that utilizes the `html` function. Below are examples in various formats.

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { html, t, type Dictionary } from "intlayer";

const htmlDictionary = {
  key: "app",
  content: {
    // Simple HTML with standard tags
    richText: html(
      "<p>This is <strong>bold</strong> and <em>italic</em> text</p>"
    ),

    // HTML with custom component
    customContent: html(
      "Click <CustomLink>here</CustomLink> to learn more about <strong>Intlayer</strong>"
    ),

    // Multilingual HTML content
    multilingualContent: t({
      en: html("<p>Hello <strong>World</strong>!</p>"),
      fr: html("<p>Bonjour <strong>le monde</strong> !</p>"),
      es: html("<p>¡Hola <strong>Mundo</strong>!</p>"),
    }),
  },
} satisfies Dictionary;

export default htmlDictionary;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { html, t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const htmlDictionary = {
  key: "app",
  content: {
    richText: html(
      "<p>This is <strong>bold</strong> and <em>italic</em> text</p>"
    ),
    customContent: html(
      "Click <CustomLink>here</CustomLink> to learn more about <strong>Intlayer</strong>"
    ),
    multilingualContent: t({
      en: html("<p>Hello <strong>World</strong>!</p>"),
      fr: html("<p>Bonjour <strong>le monde</strong> !</p>"),
      es: html("<p>¡Hola <strong>Mundo</strong>!</p>"),
    }),
  },
};

export default htmlDictionary;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { html, t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const htmlDictionary = {
  key: "app",
  content: {
    richText: html(
      "<p>This is <strong>bold</strong> and <em>italic</em> text</p>"
    ),
    customContent: html(
      "Click <CustomLink>here</CustomLink> to learn more about <strong>Intlayer</strong>"
    ),
    multilingualContent: t({
      en: html("<p>Hello <strong>World</strong>!</p>"),
      fr: html("<p>Bonjour <strong>le monde</strong> !</p>"),
      es: html("<p>¡Hola <strong>Mundo</strong>!</p>"),
    }),
  },
};

module.exports = htmlDictionary;
```

```json5 fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {
    "richText": {
      "nodeType": "html",
      "html": "<p>This is <strong>bold</strong> and <em>italic</em> text</p>",
    },
    "customContent": {
      "nodeType": "html",
      "html": "Click <CustomLink>here</CustomLink> to learn more about <strong>Intlayer</strong>",
    },
  },
}
```

> Standard HTML tags like `p`, `strong`, `em`, `div`, `span`, `a`, `h1`-`h6`, `ul`, `ol`, `li`, `table`, `img`, etc. are automatically available. You only need to provide custom components.

## Using HTML Content with React Intlayer

To utilize HTML content within a React component, import and use the `useIntlayer` hook from the `react-intlayer` package. HTML content can be rendered directly as a node, or you can use the `.use()` method to provide custom components or override default tags.

```tsx fileName="**/*.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer, HTMLProvider } from "react-intlayer";

const HTMLComponent: FC = () => {
  const { richText, customContent, multilingualContent } = useIntlayer("app");

  return (
    <div>
      {/* Standard HTML tags work automatically */}
      <div>{richText}</div>

      {/* Overriding default tags using .use() */}
      <div>
        {richText.use({
          p: (props) => (
            <p className="flex items-center justify-center" {...props} />
          ),
        })}
      </div>

      {/* With custom components using .use() */}
      <div>
        {customContent.use({
          CustomLink: ({ children }) => (
            <a href="/learn-more" className="custom-link">
              {children}
            </a>
          ),
        })}
      </div>

      {/* Using HTMLProvider to define components globally */}
      <HTMLProvider
        components={{
          p: (props) => (
            <p className="flex items-center justify-center" {...props} />
          ),
          CustomLink: ({ children }) => (
            <a href="/learn-more" className="custom-link">
              {children}
            </a>
          ),
        }}
      >
        {/* All HTML content inside will use the globally defined components */}
        {richText}
        {customContent}
      </HTMLProvider>

      {/* Multilingual content works the same way */}
      <div>{multilingualContent}</div>
    </div>
  );
};

export default HTMLComponent;
```

```jsx fileName="**/*.mjx" codeFormat="esm"
import { useIntlayer, HTMLProvider } from "react-intlayer";

const HTMLComponent = () => {
  const { richText, customContent, multilingualContent } = useIntlayer("app");

  return (
    <div>
      {/* Standard HTML tags work automatically - can use directly */}
      <div>{richText}</div>

      {/* Or call it explicitly */}
      <div>{richText()}</div>

      {/* With custom component overrides */}
      <div>
        {richText({
          p: (props) => (
            <p className="flex items-center justify-center" {...props} />
          ),
        })}
      </div>

      {/* With custom component */}
      <div>
        {customContent({
          CustomLink: ({ children }) => (
            <a href="/learn-more" className="custom-link">
              {children}
            </a>
          ),
        })}
      </div>

      {/* Using HTMLProvider to define components globally */}
      <HTMLProvider
        components={{
          CustomLink: ({ children }) => (
            <a href="/learn-more" className="custom-link">
              {children}
            </a>
          ),
        }}
      >
        {customContent}
      </HTMLProvider>

      {/* Multilingual content works the same way */}
      <div>{multilingualContent}</div>
    </div>
  );
};

export default HTMLComponent;
```

```jsx fileName="**/*.cjs" codeFormat="commonjs"
const { useIntlayer, HTMLProvider } = require("react-intlayer");

const HTMLComponent = () => {
  const { richText, customContent, multilingualContent } = useIntlayer("app");

  return (
    <div>
      {/* Standard HTML tags work automatically - can use directly */}
      <div>{richText}</div>

      {/* Or call it explicitly */}
      <div>{richText()}</div>

      {/* With custom component */}
      <div>
        {customContent({
          CustomLink: ({ children }) => (
            <a href="/learn-more" className="custom-link">
              {children}
            </a>
          ),
        })}
      </div>

      {/* Using HTMLProvider to define components globally */}
      <HTMLProvider
        components={{
          CustomLink: ({ children }) => (
            <a href="/learn-more" className="custom-link">
              {children}
            </a>
          ),
        }}
      >
        {customContent}
      </HTMLProvider>

      {/* Multilingual content works the same way */}
      <div>{multilingualContent}</div>
    </div>
  );
};

module.exports = HTMLComponent;
```

## Using HTML Content with Vue Intlayer

In Vue, HTML content works similarly. The content node can be rendered directly using the `<component :is="..." />` syntax, or you can use the `.use()` method to provide custom components.

### Basic Usage

```vue fileName="**/*.vue"
<script setup>
import { useIntlayer } from "vue-intlayer";
import { h } from "vue";

const { richText, customContent } = useIntlayer("app");

// Custom component for Vue
const CustomLink = (props, { slots }) => {
  return h(
    "a",
    { href: "/learn-more", class: "custom-link" },
    slots.default?.()
  );
};
</script>

<template>
  <div>
    <!-- 1. Standard HTML tags work automatically -->
    <component :is="richText" />

    <!-- 2. Overriding default tags using .use() -->
    <component
      :is="
        richText.use({
          p: (props, { slots }) =>
            h('p', { class: 'custom-paragraph', ...props }, slots.default?.()),
        })
      "
    />

    <!-- 3. With custom component using .use() -->
    <component :is="customContent.use({ CustomLink })" />
  </div>
</template>
```

### Using the Global Provider

Vue Intlayer provides `installIntlayerHTML` to define components globally, similar to `installIntlayerMarkdown`. This is useful when you want to use the same custom components across your entire application.

```typescript fileName="main.ts"
import { createApp } from "vue";
import { installIntlayer, installIntlayerHTML } from "vue-intlayer";
import App from "./App.vue";

const app = createApp(App);

// Install Intlayer
installIntlayer(app);

// Install HTML provider with global components
installIntlayerHTML(app, {
  components: {
    // Override default tags globally
    p: (props, { slots }) =>
      h("p", { class: "prose", ...props }, slots.default?.()),
    a: (props, { slots }) =>
      h(
        "a",
        { class: "text-blue-500 hover:underline", ...props },
        slots.default?.()
      ),
    // Define custom components globally
    CustomLink: (props, { slots }) =>
      h(
        "a",
        { href: "/learn-more", class: "custom-link", ...props },
        slots.default?.()
      ),
    CustomButton: (props, { slots }) =>
      h("button", { class: "btn btn-primary", ...props }, slots.default?.()),
  },
});

app.mount("#app");
```

Once configured, all HTML content will automatically use these components:

```vue fileName="**/*.vue"
<script setup>
import { useIntlayer } from "vue-intlayer";

const { richText, customContent } = useIntlayer("app");
</script>

<template>
  <div>
    <!-- Will use the globally defined 'p' component -->
    <component :is="richText" />

    <!-- Will use the globally defined 'CustomLink' component -->
    <component :is="customContent" />

    <!-- Can still override locally if needed -->
    <component
      :is="
        () =>
          customContent({
            CustomLink: (props, { slots }) =>
              h('a', { href: '/other-link', ...props }, slots.default?.()),
          })
      "
    />
  </div>
</template>
```

### Using Custom Render Function

You can also provide a completely custom render function:

```typescript fileName="main.ts"
import { createApp, h } from "vue";
import { installIntlayer, installIntlayerHTML } from "vue-intlayer";
import App from "./App.vue";

const app = createApp(App);

installIntlayer(app);

// Provide a custom render function
installIntlayerHTML(app, (htmlString, components) => {
  // Your custom HTML rendering logic
  // Return VNode or VNode[]
});

app.mount("#app");
```

## Using HTML Content with Svelte Intlayer

In Svelte, HTML content can be used with the `useIntlayer` function. The content node can be rendered directly using the `{@html ...}` syntax, or you can use the `.use()` method to provide custom components.

### Basic Usage

```svelte fileName="**/*.svelte"
<script>
  import { useIntlayer } from "svelte-intlayer";

  const { richText, customContent } = useIntlayer("app");

  // Custom component function for Svelte
  const CustomLink = ({ children, ...props }) => {
    const el = document.createElement("a");
    el.href = "/learn-more";
    el.className = "custom-link";
    for (const child of children) {
      if (typeof child === "string") {
        el.appendChild(document.createTextNode(child));
      } else {
        el.appendChild(child);
      }
    }
    return el;
  };
</script>

<div>
  <!-- 1. Standard HTML tags work automatically -->
  {@html richText}

  <!-- 2. With custom component using .use() -->
  {@html customContent.use({ CustomLink })}
</div>
```

### Using the Global Provider with Context

Svelte Intlayer provides a context-based approach to define components globally using `setHTMLContext`.

```svelte fileName="App.svelte"
<script>
  import { setHTMLContext } from "svelte-intlayer";

  // Set global HTML components at the root of your app
  setHTMLContext({
    components: {
      // Override default tags globally
      p: ({ children, ...props }) => {
        const el = document.createElement("p");
        el.className = "prose";
        Object.assign(el, props);
        for (const child of children ?? []) {
          if (typeof child === "string") {
            el.appendChild(document.createTextNode(child));
          } else if (child instanceof Node) {
            el.appendChild(child);
          }
        }
        return el;
      },
      // Define custom components globally
      CustomLink: ({ children, ...props }) => {
        const el = document.createElement("a");
        el.href = "/learn-more";
        el.className = "custom-link";
        Object.assign(el, props);
        for (const child of children ?? []) {
          if (typeof child === "string") {
            el.appendChild(document.createTextNode(child));
          } else if (child instanceof Node) {
            el.appendChild(child);
          }
        }
        return el;
      },
    },
  });
</script>

<slot />
```

Then in child components:

```svelte fileName="**/*.svelte"
<script>
  import { useIntlayer, getHTMLContext } from "svelte-intlayer";

  const { richText, customContent } = useIntlayer("app");
  const { components } = getHTMLContext();
</script>

<div>
  <!-- Will use the globally defined components -->
  {@html richText(components)}

  <!-- Will use the globally defined CustomLink component -->
  {@html customContent(components)}

  <!-- Can still override locally if needed -->
  {@html customContent({
    ...components,
    CustomLink: ({ children }) => {
      const el = document.createElement("a");
      el.href = "/other-link";
      // ...
      return el;
    },
  })}
</div>
```

### Using with Svelte Components

For more complex cases, you can use Svelte components as custom elements:

```svelte fileName="CustomLink.svelte"
<script>
  export let href = "/learn-more";
</script>

<a {href} class="custom-link text-blue-500 hover:underline">
  <slot />
</a>
```

```svelte fileName="Page.svelte"
<script>
  import { useIntlayer } from "svelte-intlayer";
  import CustomLink from "./CustomLink.svelte";

  const { customContent } = useIntlayer("app");

  // Wrapper to convert Svelte component to DOM function
  const createSvelteComponent = (Component, defaultProps = {}) => {
    return ({ children, ...props }) => {
      const container = document.createElement("span");
      new Component({
        target: container,
        props: { ...defaultProps, ...props },
      });
      return container.firstChild;
    };
  };
</script>

<div>
  {@html customContent({
    CustomLink: createSvelteComponent(CustomLink),
  })}
</div>
```

## Using HTML Content with Next Intlayer

With the `next-intlayer` package, HTML content works the same way as with React Intlayer. You can use `richText` directly or call it as `richText()`.

```tsx fileName="**/*.tsx" codeFormat="typescript"
"use client";

import { useIntlayer, HTMLProvider } from "next-intlayer";

export const HTMLComponent = () => {
  const { richText, customContent } = useIntlayer("app");

  return (
    <div>
      {/* Standard HTML tags work automatically - can use directly */}
      <div>{richText}</div>

      {/* Or call it explicitly */}
      <div>{richText()}</div>

      {/* With custom component */}
      <div>
        {customContent({
          CustomLink: ({ children }) => (
            <a href="/learn-more" className="custom-link">
              {children}
            </a>
          ),
        })}
      </div>

      {/* Using HTMLProvider for global components */}
      <HTMLProvider
        components={{
          CustomLink: ({ children }) => (
            <a href="/learn-more" className="custom-link">
              {children}
            </a>
          ),
        }}
      >
        {customContent}
      </HTMLProvider>
    </div>
  );
};
```

## Advanced Usage

### Overriding Default HTML Tags

You can override the default rendering of standard HTML tags by passing them as custom components:

```tsx fileName="**/*.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const StyledHTMLComponent: FC = () => {
  const { richText } = useIntlayer("app");

  return (
    <div>
      {richText({
        // Override the default 'strong' tag with custom styling
        strong: ({ children }) => (
          <strong className="text-blue-600 font-bold">{children}</strong>
        ),
        // Override 'em' with custom styling
        em: ({ children }) => (
          <em className="text-green-600 italic">{children}</em>
        ),
      })}
    </div>
  );
};

export default StyledHTMLComponent;
```

### Tag Attributes

You can use attributes on your tags. The HTML parser will extract them and pass them to your components:

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { html, type Dictionary } from "intlayer";

const htmlWithAttributes = {
  key: "html-attributes",
  content: {
    linkedContent: html(
      'Visit <a href="https://intlayer.org" target="_blank">our website</a> for more info'
    ),
    imageContent: html(
      '<img src="/logo.png" alt="Logo" width="100" height="100" />'
    ),
  },
} satisfies Dictionary;

export default htmlWithAttributes;
```

### Self-Closing Tags

Self-closing tags are supported:

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { html, type Dictionary } from "intlayer";

const selfClosingTags = {
  key: "self-closing",
  content: {
    breakLine: html("First line<br />Second line"),
    image: html('<img src="/image.jpg" alt="description" />'),
    horizontalRule: html("<p>Above</p><hr /><p>Below</p>"),
  },
} satisfies Dictionary;

export default selfClosingTags;
```

## Supported HTML Tags

The following standard HTML tags are automatically supported:

- **Document structure**: `html`, `head`, `body`, `main`, `header`, `footer`, `nav`, `aside`, `article`, `section`, `div`, `span`
- **Headings**: `h1`, `h2`, `h3`, `h4`, `h5`, `h6`
- **Text content**: `p`, `a`, `strong`, `b`, `em`, `i`, `u`, `s`, `del`, `ins`, `mark`, `small`, `sub`, `sup`, `code`, `pre`, `blockquote`, `q`, `cite`, `abbr`, `address`, `time`, `kbd`, `samp`, `var`
- **Lists**: `ul`, `ol`, `li`, `dl`, `dt`, `dd`
- **Tables**: `table`, `thead`, `tbody`, `tfoot`, `tr`, `th`, `td`, `caption`, `colgroup`, `col`
- **Forms**: `form`, `input`, `textarea`, `button`, `select`, `option`, `optgroup`, `label`, `fieldset`, `legend`, `datalist`, `output`, `progress`, `meter`
- **Media**: `img`, `video`, `audio`, `source`, `track`, `picture`, `figure`, `figcaption`, `iframe`, `embed`, `object`, `canvas`, `svg`
- **Interactive**: `details`, `summary`, `dialog`
- **Other**: `br`, `hr`, `wbr`, `ruby`, `rt`, `rp`, `bdi`, `bdo`, `data`, `template`, `slot`

## Additional Resources

For more detailed information on configuration and usage, refer to the following resources:

- [Intlayer CLI Documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/index.md)
- [React Intlayer Documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_create_react_app.md)
- [Next Intlayer Documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_15.md)
- [Vue Intlayer Documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_vite_vue.md)
- [Svelte Intlayer Documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_svelte.md)

These resources provide further insights into the setup and usage of Intlayer across various environments and frameworks.
