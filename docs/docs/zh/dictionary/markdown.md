---
createdAt: 2025-02-07
updatedAt: 2026-01-22
title: Markdown
description: 了解如何在多语言网站中使用Intlayer声明和使用Markdown内容。按照此在线文档中的步骤，将Markdown无缝集成到您的项目中。
keywords:
  - Markdown
  - 国际化
  - 文档
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
    changes: 添加 MarkdownRenderer / useMarkdownRenderer / renderMarkdown 实用工具和 forceInline 选项
  - version: 8.0.0
    date: 2026-01-18
    changes: 自动装饰 markdown 内容，支持 MDX 和 SSR
  - version: 5.5.10
    date: 2025-06-29
    changes: 初始化历史记录
---

# Markdown / 富文本内容

Intlayer 支持使用 Markdown 语法定义的富文本内容。这允许您轻松编写和维护具有丰富格式的内容，例如博客、文章等。

## Markdown 的工作原理

Intlayer v8 会智能检测内容字符串中的 Markdown 语法。如果字符串被识别为 Markdown，它会被自动转换为一个 Markdown 节点。

<Columns>
  <Column title="v7 行为（手动包裹）">

    ```typescript fileName="markdownDictionary.content.ts"
    import { md } from "intlayer";

    export default {
      key: "app",
      content: {
        text: md("## 我的标题 \n\nLorem Ipsum"),
      },
    };
    ```

  </Column>
  <Column title="v8 行为（自动检测）">

    ```typescript fileName="markdownDictionary.content.ts"
    export default {
      key: "app",
      contentAutoTransformation: true, // 启用 Markdown 内容的自动检测 - 可在 intlayer.config.ts 中全局设置
      content: {
        text: "## 我的标题 \n\nLorem Ipsum",
      },
    };
    ```

  </Column>
</Columns>

---

## 第 1 部分：声明 Markdown 内容

您可以使用 `md` 函数声明 Markdown 内容，或简单地将其作为字符串（如果它包含 Markdown 语法）。

<Tabs>
  <Tab label="手动包裹">
    使用 `md` 函数显式声明 Markdown 内容。如果您想确保一个字符串被视为 Markdown，即使它不包含明显的语法，这很有用。

    ```typescript fileName="markdownDictionary.content.ts"
    import { md, type Dictionary } from "intlayer";

    const markdownDictionary = {
      key: "app",
      content: {
        myMarkdownContent: md("## 我的标题 \n\nLorem Ipsum"),
      },
    } satisfies Dictionary;

    export default markdownDictionary;
    ```

  </Tab>
  <Tab label="自动检测">
    如果字符串包含常见的 Markdown 标记（如标题、列表、链接等），Intlayer 会自动将其转换。

    ```typescript fileName="markdownDictionary.content.ts"
    export default {
      key: "app",
      contentAutoTransformation: true, // 启用 Markdown 内容的自动检测 - 可在 intlayer.config.ts 中全局设置
      content: {
        myMarkdownContent: "## 我的标题 \n\nLorem Ipsum",
      },
    };
    ```

  </Tab>
  <Tab label="外部文件">
    使用 `file` 函数直接导入 `.md` 文件。

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

## 第 2 部分：渲染 Markdown

渲染可以由 Intlayer 的内容系统自动处理，也可以使用专用工具手动完成。

### 1. 自动渲染（使用 `useIntlayer`）

通过 `useIntlayer` 访问内容时，Markdown 节点已准备好渲染。

<Tabs group="framework">
  <Tab label="React / Next.js">
    Markdown 节点可以直接作为 JSX 渲染。

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "react-intlayer";

    const AppContent = () => {
      const { myMarkdownContent } = useIntlayer("app");
      return <div>{myMarkdownContent}</div>;
    };
    ```

    您还可以使用 `.use()` 方法为特定节点提供局部覆盖：

    ```tsx
    {myMarkdownContent.use({
      h1: ({ children }) => <h1 className="text-3xl font-bold">{children}</h1>,
    })}
    ```

  </Tab>
  <Tab label="Vue">
    在 Vue 中，Markdown 内容可以使用内置的 `component` 渲染，或者直接作为节点渲染。

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
    Svelte 默认将 Markdown 渲染为 HTML 字符串。使用 `{@html}` 渲染。

    ```svelte
    <script lang="ts">
    import { useIntlayer } from "svelte-intlayer";
    const content = useIntlayer("app");
    </script>

    {@html $content.myMarkdownContent}
    ```

  </Tab>
  <Tab label="Preact">
    Preact 在 JSX 中直接支持 Markdown 节点。

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "preact-intlayer";

    const AppContent = () => {
      const { myMarkdownContent } = useIntlayer("app");
      return <div>{myMarkdownContent}</div>;
    };
    ```

  </Tab>
  <Tab label="Solid">
    Solid 在 JSX 中直接支持 Markdown 节点。

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "solid-intlayer";

    const AppContent = () => {
      const { myMarkdownContent } = useIntlayer("app");
      return <div>{myMarkdownContent}</div>;
    };
    ```

  </Tab>
  <Tab label="Angular">
    Angular 使用 `[innerHTML]` 指令来渲染 Markdown 内容。

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

    您还可以使用 `.use()` 方法为特定节点提供局部覆盖：

    ```typescript
    content().myMarkdownContent.use({
      h1: { class: "text-3xl font-bold" },
    })
    ```

  </Tab>
</Tabs>

### 2. 手动渲染与高级工具

如果您需要渲染原始 Markdown 字符串或对渲染过程有更多控制，请使用以下工具。

<Tabs group="framework">
  <Tab label="React / Next.js">
  
    #### `<MarkdownRenderer />` 组件

    使用特定选项渲染 Markdown 字符串。

    ```tsx
    import { MarkdownRenderer } from "react-intlayer";

    <MarkdownRenderer forceBlock={true} tagfilter={true}>
      {"# 我的标题"}
    </MarkdownRenderer>
    ```

    #### `useMarkdownRenderer()` Hook

    获取预配置的渲染器函数。

    ```tsx
    import { useMarkdownRenderer } from "react-intlayer";

    const renderMarkdown = useMarkdownRenderer({
      forceBlock: true,
      components: { h1: (props) => <h1 {...props} className="custom" /> }
    });

    return renderMarkdown("# 我的标题");
    ```

    #### `renderMarkdown()` 实用工具
    用于在组件外渲染的独立实用工具。

    ```tsx
    import { renderMarkdown } from "react-intlayer";

    const jsx = renderMarkdown("# 我的标题", { forceBlock: true });
    ```

  </Tab>
  <Tab label="Vue">

    #### `<MarkdownRenderer />` 组件

    ```vue
    <script setup>
    import { MarkdownRenderer } from "vue-intlayer";
    </script>

    <template>
      <MarkdownRenderer :forceBlock="true" content="# 我的标题" />
    </template>
    ```

  </Tab>
  <Tab label="Svelte">

    #### `<MarkdownRenderer />` 组件

    ```svelte
    <script lang="ts">
    import { MarkdownRenderer } from "svelte-intlayer";
    </script>

    <MarkdownRenderer forceBlock={true} value="# 我的标题" />
    ```

    #### `useMarkdownRenderer()` Hook

    ```svelte
    <script lang="ts">
    import { useMarkdownRenderer } from "svelte-intlayer";
    const render = useMarkdownRenderer();
    </script>

    {@html render("# 我的标题")}
    ```

    #### `renderMarkdown()` 实用工具

    ```svelte
    <script lang="ts">
    import { renderMarkdown } from "svelte-intlayer";
    </script>

    {@html renderMarkdown("# 我的标题")}
    ```

  </Tab>
  <Tab label="Preact">
    #### `<MarkdownRenderer />` 组件

    ```tsx
    import { MarkdownRenderer } from "preact-intlayer";

    <MarkdownRenderer forceBlock={true}>
      {"# 我的标题"}
    </MarkdownRenderer>
    ```

    #### `useMarkdownRenderer()` Hook

    ```tsx
    import { useMarkdownRenderer } from "preact-intlayer";

    const render = useMarkdownRenderer();

    return <div>{render("# 我的标题")}</div>;
    ```

    #### `renderMarkdown()` 实用工具

    ```tsx
    import { renderMarkdown } from "preact-intlayer";

    return <div>{renderMarkdown("# 我的标题")}</div>;
    ```

  </Tab>
  <Tab label="Solid">
    #### `<MarkdownRenderer />` 组件

    ```tsx
    import { MarkdownRenderer } from "solid-intlayer";

    <MarkdownRenderer forceBlock={true}>
      {"# 我的标题"}
    </MarkdownRenderer>
    ```

    #### `useMarkdownRenderer()` Hook

    ```tsx
    import { useMarkdownRenderer } from "solid-intlayer";

    const render = useMarkdownRenderer();

    return <div>{render("# 我的标题")}</div>;
    ```

    #### `renderMarkdown()` 实用工具

    ```tsx
    import { renderMarkdown } from "solid-intlayer";

    return <div>{renderMarkdown("# 我的标题")}</div>;
    ```

  </Tab>
  <Tab label="Angular">
    #### `IntlayerMarkdownService` 服务
    使用该服务渲染 Markdown 字符串。

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

## 使用 `MarkdownProvider` 的全局配置

您可以为整个应用程序全局配置 Markdown 渲染。这可以避免为每个渲染器传递相同的 props。

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

## 选项参考

这些选项可以传递给 `MarkdownProvider`、`MarkdownRenderer`、`useMarkdownRenderer` 和 `renderMarkdown`。

| 选项                  | 类型        | 默认    | 说明                                                            |
| :-------------------- | :---------- | :------ | :-------------------------------------------------------------- |
| `forceBlock`          | `boolean`   | `false` | 强制将输出包裹在块级元素中（例如 `<div>`）。                    |
| `forceInline`         | `boolean`   | `false` | 强制将输出包裹在内联元素中（例如 `<span>`）。                   |
| `tagfilter`           | `boolean`   | `true`  | 启用 GitHub 标签过滤器，通过剥离危险的 HTML 标签来提高安全性。  |
| `preserveFrontmatter` | `boolean`   | `false` | 如果为 `true`，Markdown 字符串开头的 frontmatter 将不会被剥离。 |
| `components`          | `Overrides` | `{}`    | HTML 标签到自定义组件的映射（例如 `{ h1: MyHeading }`）。       |
| `wrapper`             | `Component` | `null`  | 用于包裹渲染后的 Markdown 的自定义组件。                        |
| `renderMarkdown`      | `Function`  | `null`  | 一个自定义渲染函数，用于完全替换默认的 Markdown 编译器。        |
