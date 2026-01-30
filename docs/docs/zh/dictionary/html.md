---
createdAt: 2026-01-20
updatedAt: 2026-01-22
title: HTML 内容
description: 了解如何在 Intlayer 中声明和使用带有自定义组件的 HTML 内容。按照本指南在你的国际化项目中嵌入具有动态组件替换功能的丰富类 HTML 内容。
keywords:
  - HTML
  - 自定义组件
  - 富内容
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
    changes: 添加 HTMLRenderer / useHTMLRenderer / renderHTML 实用工具
  - version: 8.0.0
    date: 2026-01-20
    changes: 添加 HTML 解析支持
---

# HTML 内容 / Intlayer 中的 HTML

Intlayer 支持 HTML 内容，允许你在字典中嵌入丰富的结构化内容。此类内容可以使用标准 HTML 标签渲染，或在运行时替换为自定义组件。

## 声明 HTML 内容

您可以使用 `html` 函数声明 HTML 内容，或简单地将其作为字符串。

<Tabs>
  <Tab label="手动包裹" value="manual-wrapping">
    使用 `html` 函数显式声明 HTML 内容。即使自动检测被禁用，这也能确保标准标签被正确映射。

    ```typescript fileName="htmlDictionary.content.ts"
    import { html, type Dictionary } from "intlayer";

    const htmlDictionary = {
      key: "app",
      contentAutoTransformation: true, // 可在配置文件中设置
      content: {
        myHtmlContent:  html("<p>Hello <strong>World</strong></p>"),
      },
    } satisfies Dictionary;

    export default htmlDictionary;
    ```

  </Tab>
  <Tab label="自动检测" value="automatic-detection">
    如果字符串包含常见的 HTML 标签（例如 `<p>`、`<div>`、`<strong>` 等），Intlayer 会自动将其识别为 HTML。

    ```typescript fileName="htmlDictionary.content.ts"
    export default {
      key: "app",
      contentAutoTransformation: true, // 可在配置文件中设置
      content: {
        myHtmlContent:  "<p>Hello <strong>World</strong></p>",
      },
    };
    ```

  </Tab>
  <Tab label="外部文件" value="external-files">
    从文件导入 HTML 内容。注意，目前 `file()` 函数返回的是字符串，如果该字符串包含标签，则会被自动检测为 HTML。

    ```typescript fileName="htmlDictionary.content.ts"
    import { html, file, t } from "intlayer";

    export default {
      key: "app",
      content: {
        content: t({
          en: html(file("./content.en.html")),
          fr: html(file("./content.fr.html")),
        }),
      },
    };
    ```

  </Tab>
</Tabs>

### `html()` 节点

`html()` 函数是 Intlayer v8 中的一个新特性，它允许你在字典中显式定义 HTML 内容。虽然 Intlayer 通常可以自动检测 HTML 内容，但使用 `html()` 函数具有以下优势：

- **类型安全**：`html()` 函数允许你为自定义组件定义预期的 props，从而在编辑器中提供更好的自动补全和类型检查。
- **显式声明**：它确保字符串始终被视为 HTML，即使它不包含会触发自动检测的标准 HTML 标签。
- **自定义组件定义**：你可以向 `html()` 传递第二个参数来定义自定义组件及其预期的 prop 类型。

```typescript
import { html } from "intlayer";

const myContent = html(
  "<MyCustomComponent title='你好'>世界</MyCustomComponent>",
  {
    MyCustomComponent: {
      title: "string",
      children: "node",
    },
  }
);
```

在 HTML 节点上使用 `.use()` 方法时，你提供的组件将根据 `html()` 函数中提供的定义（如果可用）进行检查。

---

## 渲染 HTML

渲染可以由 Intlayer 的内容系统自动处理，也可以使用专用工具手动完成。

### 自动渲染（使用 `useIntlayer`）

通过 `useIntlayer` 访问内容时，HTML 节点已准备好渲染。

<Tabs group="framework">
  <Tab label="React / Next.js" value="react">
    HTML 节点可以直接作为 JSX 渲染。标准标签会自动生效。

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "react-intlayer";

    const AppContent = () => {
      const { myHtmlContent } = useIntlayer("app");
      return <div>{myHtmlContent}</div>;
    };
    ```

    使用 `.use()` 方法可以提供自定义组件或覆盖标签：

    ```tsx
    {myHtmlContent.use({
      p: (props) => <p className="prose" {...props} />,
      CustomLink: ({ children }) => <a href="/details">{children}</a>,
    })}
    ```

  </Tab>
  <Tab label="Vue" value="vue">
    在 Vue 中，可以使用内置的 `component` 来渲染 HTML 内容。

    ```vue fileName="App.vue"
    <script setup>
    import { useIntlayer } from "vue-intlayer";
    const { myHtmlContent } = useIntlayer("app");
    </script>

    <template>
      <component :is="myHtmlContent" />
    </template>
    ```

    使用 `.use()` 进行覆盖（overrides）：
    ```vue
    <component :is="myHtmlContent.use({ h1: 'h2' })" />
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">
    Svelte 将 HTML 节点呈现为字符串。使用 `{@html}` 来渲染它。

    ```svelte
    <script lang="ts">
    import { useIntlayer } from "svelte-intlayer";
    const content = useIntlayer("app");
    </script>

    {@html $content.myHtmlContent}
    ```

  </Tab>
  <Tab label="Preact" value="preact">
    Preact 在 JSX 中直接支持 HTML 节点。

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "preact-intlayer";

    const AppContent = () => {
      const { myHtmlContent } = useIntlayer("app");
      return <div>{myHtmlContent}</div>;
    };
    ```

  </Tab>
  <Tab label="Solid" value="solid">
    Solid 在 JSX 中直接支持 HTML 节点。

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "solid-intlayer";

    const AppContent = () => {
      const { myHtmlContent } = useIntlayer("app");
      return <div>{myHtmlContent}</div>;
    };
    ```

  </Tab>
  <Tab label="Angular" value="angular">
    Angular 使用 `[innerHTML]` 指令来渲染 HTML 内容。

    ```typescript fileName="app.component.ts"
    import { Component } from "@angular/core";
    import { useIntlayer } from "angular-intlayer";

    @Component({
      selector: "app-root",
      template: `<div [innerHTML]="content().myHtmlContent"></div>`,
    })
    export class AppComponent {
      content = useIntlayer("app");
    }
    ```

    使用 `.use()` 方法可以提供自定义组件或覆盖标签：

    ```typescript
    content().myHtmlContent.use({
      p: { class: "prose" },
      CustomLink: { href: "/details" },
    })
    ```

  </Tab>
</Tabs>

## 使用 `HTMLProvider` 的全局配置

您可以为整个应用全局配置 HTML 渲染。这非常适合定义应在所有 HTML 内容中可用的自定义组件。

<Tabs group="framework">
  <Tab label="React / Next.js" value="react">
  
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
  <Tab label="Vue" value="vue">
  
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
  <Tab label="Svelte" value="svelte">
   
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
  <Tab label="Preact" value="preact">
   
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
  <Tab label="Solid" value="solid">
   
    ```tsx fileName="AppProvider.tsx"
    import { HTMLProvider } from "solid-intlayer";

    export const AppProvider = (props) => (
      <HTMLProvider
        components={{
          p: (props) => <p className="prose" {...props} />,
        }}
      >
        {props.children}
      </HTMLProvider>
    );
    ```

  </Tab>
  <Tab label="Angular" value="angular">

    ```typescript fileName="app.config.ts"
    import { createIntlayerMarkdownProvider } from "angular-intlayer";

    export const appConfig: ApplicationConfig = {
      providers: [
        createIntlayerMarkdownProvider({
          components: {
            p: { class: "prose" },
            CustomLink: { href: "/details" },
          },
        }),
      ],
    };
    ```

  </Tab>
</Tabs>

---

### 手动渲染与高级工具

如果你需要渲染原始 HTML 字符串或对组件映射有更多控制，请使用以下工具。

<Tabs group="framework">
  <Tab label="React / Next.js" value="react">
    #### `<HTMLRenderer />` 组件
    使用特定组件渲染 HTML 字符串。

    ```tsx
    import { HTMLRenderer } from "react-intlayer";

    <HTMLRenderer components={{ p: MyCustomP }}>
      {"<p>Hello World</p>"}
    </HTMLRenderer>
    ```

    #### `useHTMLRenderer()` Hook
    获取一个预配置的渲染器函数。

    ```tsx
    import { useHTMLRenderer } from "react-intlayer";

    const renderHTML = useHTMLRenderer({
      components: { strong: (props) => <strong {...props} className="text-red-500" /> }
    });

    return renderHTML("<p>Hello <strong>World</strong></p>");
    ```

    #### `renderHTML()` 实用工具

    用于在组件外进行渲染的独立实用工具。

    ```tsx
    import { renderHTML } from "react-intlayer";

    const jsx = renderHTML("<p>Hello</p>", { components: { p: 'div' } });
    ```

  </Tab>
  <Tab label="Vue" value="vue">
   
    #### `<HTMLRenderer />` 组件
   
    ```vue
    <script setup>
    import { HTMLRenderer } from "vue-intlayer";
    </script>

    <template>
      <HTMLRenderer content="<p>Hello World</p>" />
    </template>
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">
  
    #### `<HTMLRenderer />` 组件
   
    ```svelte
    <script lang="ts">
    import { HTMLRenderer } from "svelte-intlayer";
    </script>

    <HTMLRenderer value="<p>Hello World</p>" />
    ```

    #### `useHTMLRenderer()` Hook

    ```svelte
    <script lang="ts">
    import { useHTMLRenderer } from "svelte-intlayer";
    const render = useHTMLRenderer();
    </script>

    {@html render("<p>Hello World</p>")}
    ```

    #### `renderHTML()` 实用工具

    ```svelte
    <script lang="ts">
    import { renderHTML } from "svelte-intlayer";
    </script>

    {@html renderHTML("<p>Hello World</p>")}
    ```

  </Tab>
  <Tab label="Preact" value="preact">
   
    #### `<HTMLRenderer />` 组件
   
    ```tsx
    import { HTMLRenderer } from "preact-intlayer";

    <HTMLRenderer>
      {"<p>Hello World</p>"}
    </HTMLRenderer>
    ```

    #### `useHTMLRenderer()` Hook

    ```tsx
    import { useHTMLRenderer } from "preact-intlayer";

    const render = useHTMLRenderer();

    return <div>{render("<p>Hello World</p>")}</div>;
    ```

    #### `renderHTML()` 实用工具

    ```tsx
    import { renderHTML } from "preact-intlayer";

    return <div>{renderHTML("<p>Hello World</p>")}</div>;
    ```

  </Tab>
  <Tab label="Solid" value="solid">
   
    #### `<HTMLRenderer />` 组件
   
    ```tsx
    import { HTMLRenderer } from "solid-intlayer";

    <HTMLRenderer>
      {"<p>Hello World</p>"}
    </HTMLRenderer>
    ```

    #### `useHTMLRenderer()` Hook

    ```tsx
    import { useHTMLRenderer } from "solid-intlayer";

    const render = useHTMLRenderer();

    return <div>{render("<p>Hello World</p>")}</div>;
    ```

    #### `renderHTML()` 实用工具

    ```tsx
    import { renderHTML } from "solid-intlayer";

    return <div>{renderHTML("<p>Hello World</p>")}</div>;
    ```

  </Tab>
  <Tab label="Angular" value="angular">
    #### `IntlayerMarkdownService` 服务
    使用该服务渲染 HTML 字符串。

    ```typescript
    import { IntlayerMarkdownService } from "angular-intlayer";

    export class MyComponent {
      constructor(private markdownService: IntlayerMarkdownService) {}

      renderHTML(html: string) {
        return this.markdownService.renderMarkdown(html);
      }
    }
    ```

  </Tab>
</Tabs>

---

## 选项参考

这些选项可以传递给 `HTMLProvider`、`HTMLRenderer`、`useHTMLRenderer` 和 `renderHTML`。

| 选项         | 类型                  | 默认   | 说明                                                                               |
| :----------- | :-------------------- | :----- | :--------------------------------------------------------------------------------- |
| `components` | `Record<string, any>` | `{}`   | 一个将 HTML 标签或自定义组件名称映射到对应组件的映射表。                           |
| `renderHTML` | `Function`            | `null` | 一个自定义渲染函数，用于完全替换默认的 HTML 解析器（仅适用于 Vue/Svelte 提供器）。 |

> 注意：对于 React 和 Preact，标准 HTML 标签会自动提供。只有当你想覆盖它们或添加自定义组件时，才需要传入 `components` prop。
