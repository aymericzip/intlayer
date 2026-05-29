---
createdAt: 2025-02-07
updatedAt: 2026-05-19
title: Markdown
description: 了解如何使用 Intlayer 在您的多语言网站中声明和使用 Markdown 内容。按照本在线文档中的步骤将 Markdown 无缝集成到您的项目中。
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
  - version: 8.11.0
    changes: "允许为 SSR / 注水（hydration）预解析 Markdown AST"
  - version: 8.10.0
    date: 2026-05-19
    changes: "添加对 `.content.md` 文件的支持"
  - version: 8.5.0
    date: 2026-03-24
    changes: "添加 `intlayerMarkdown` 插件对象；使用 `app.use(intlayerMarkdown)` 代替 `app.use(installIntlayerMarkdown)`"
  - version: 8.5.0
    date: 2026-03-24
    changes: "将导入从 `{{framework}}-intlayer` 移动到 `{{framework}}-intlayer/markdown`"
  - version: 8.0.0
    date: 2026-01-22
    changes: "添加 MarkdownRenderer / useMarkdownRenderer / renderMarkdown 实用程序和 forceInline 选项"
  - version: 8.0.0
    date: 2026-01-18
    changes: "Markdown 内容的自动装饰，MDX 和 SSR 支持"
  - version: 5.5.10
    date: 2025-06-29
    changes: "初始化历史"
---

# Markdown / 富文本内容

Intlayer 支持使用 Markdown 语法定义的富文本内容。这使您可以轻松编写和维护具有丰富格式的内容，例如博客、文章等。

## 声明 Markdown 内容

您可以使用 `md` 函数声明 Markdown 内容，或简单地将其作为字符串声明（如果它包含 Markdown 语法）。

<Tabs>
  <Tab label=".content.md" value=".content.md">
    从 `8.10.0` 版本开始，您可以在 `.content.md` 文件中直接声明 Markdown 内容。Intlayer 会自动检测并解析 Markdown 内容。

    ```md fileName="markdown-file.en.content.md"
    ---
    key: my-markdown-content
    description: 我的内容
    locale: en
    ---

    # 我的内容

    这里是一个 Markdown 内容示例
    ```

    `locale` front-matter 字段是定义内容语言环境的字段。它是可选的。如果没有提供，Intlayer 会使用默认语言环境，如果没有提供特定语言环境的翻译，这也将作为后备语言环境。

    文件结构示例：

    ```text
    content
    ├── markdown-file.en.content.md
    ├── markdown-file.fr.content.md
    └── markdown-file.es.content.md
    ```

    您可以在 front-matter 中添加任何在[字典定义](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/content_file.md)中定义的属性。

  </Tab>
  <Tab label="手动包装" value="manual-wrapping">
    使用 `md` 函数显式声明 Markdown 内容。如果您想确保即使字符串不包含明显的语法也被视为 Markdown，这将非常有用。

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
  <Tab label="外部文件" value="external-files">
    使用 `file` 函数直接导入 `.md` 文件。

    ```typescript fileName="markdownDictionary.content.ts"
    import { md, file, t } from "intlayer";

    export default {
      key: "app",
      content: {
        content: t({
          en: md(file("./myMarkdown.en.md")),
          zh: md(file("./myMarkdown.zh.md")),
        }),
      },
    };
    ```

  </Tab>

  <Tab label="自动检测" value="automatic-detection">
    如果字符串包含常见的 Markdown 指示符（如标题、列表、链接等），Intlayer 会自动转换它。

    ```typescript fileName="markdownDictionary.content.ts"
    export default {
      key: "app",
      contentAutoTransformation: true, // 启用 Markdown 内容的自动检测 - 可以在 intlayer.config.ts 中全局设置
      content: {
        myMarkdownContent: "## 我的标题 \n\nLorem Ipsum",
      },
    };
    ```

  </Tab>
</Tabs>

## 渲染 Markdown

Intlayer 提供两种独立的方式来渲染 Markdown：

1. **通过 `useIntlayer`**
   — Intlayer 会自动将 `md` 节点转换为框架的原生输出（JSX，VNode，HTML 字符串）。
   - Frontmatter 被解析并作为 `.metadata` 暴露。您可以在两个级别上覆盖渲染 — 使用 `MarkdownProvider`（或框架等效物）进行全局覆盖，或使用 `.use()` 针对每个节点进行局部覆盖。两者可以结合使用；`.use()` 优先于 `MarkdownProvider`，而 `MarkdownProvider` 优先于默认渲染。

2. **辅助实用程序** — `<MarkdownRenderer />`，`useMarkdownRenderer()` 和 `renderMarkdown()` 是独立的工具，**仅接受原始 Markdown 字符串**。它们独立于 `useIntlayer`，不与它返回的修饰节点一起工作。

Markdown 渲染支持 **MDX** — 在您的 Markdown 中直接按名称使用任何 JSX/框架组件。

### 1. 自动渲染（通过 `useIntlayer`）

<Tabs group="framework">
  <Tab label="React" value="react">
    Markdown 节点可以直接呈现为 JSX。

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
          MyButton: (props) => <button {...props} />, // MDX 组件
        }}
      >
        <AppContent />
      </MarkdownProvider>
    );
    ```

    > 如果没有提供 `MarkdownProvider`，Intlayer 将使用默认的 Markdown 转 JSX 解析器渲染 markdown。

    您还可以使用 `.use()` 方法提供特定节点的局部覆盖：

    ```tsx
    {myMarkdownContent.use({
      h1: ({ children }) => <h1 style={{ color: "red" }}>{children}</h1>,
    })}
    ```

    您可以以字符串形式检索 Markdown：

    ```tsx
    {myMarkdownContent.value}
    {String(myMarkdownContent)}
    {myMarkdownContent.toString()}
    ```

    您可以像这样访问您的 markdown 元数据：

    ```tsx
    {myMarkdownContent.metadata}
    {myMarkdownContent.metadata.title}
    ```

  </Tab>
  <Tab label="Next.js" value="nextjs">
    Markdown 节点可以直接呈现为 JSX。

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
          MyButton: (props) => <button {...props} />, // MDX 组件
        }}
      >
        <AppContent />
      </MarkdownProvider>
    );
    ```

    > 如果没有提供 `MarkdownProvider`，Intlayer 将使用默认的 Markdown 转 JSX 解析器渲染 markdown。

    您还可以使用 `.use()` 方法提供特定节点的局部覆盖：

    ```tsx
    {myMarkdownContent.use({
      h1: ({ children }) => <h1 style={{ color: "red" }}>{children}</h1>,
    })}
    ```

    您可以以字符串形式检索 Markdown：

    ```tsx
    {myMarkdownContent.value}
    {String(myMarkdownContent)}
    {myMarkdownContent.toString()}
    ```

    您可以像这样访问您的 markdown 元数据：

    ```tsx
    {myMarkdownContent.metadata}
    {myMarkdownContent.metadata.title}
    ```

  </Tab>
  <Tab label="Vue" value="vue">
    在 Vue 中，Markdown 内容可以使用内置的 `component` 或直接作为节点来呈现。

    ```vue fileName="App.vue"
    <script setup>
    import { useIntlayer } from "vue-intlayer";
    const { myMarkdownContent } = useIntlayer("app");
    </script>

    <template>
      <component :is="myMarkdownContent" />
    </template>
    ```

    通过 `intlayerMarkdown` 插件进行全局配置（支持 MDX 自定义组件）：

    ```ts fileName="main.ts"
    import { intlayerMarkdown } from "vue-intlayer/markdown";

    app.use(intlayerMarkdown, {
      components: {
        h1: (props) => h('h1', { style: { color: 'green' } }, props.children),
        MyButton: (props) => h('button', props), // MDX 组件
      },
    });
    ```

    > 如果未安装 `intlayerMarkdown` 插件，Intlayer 将使用默认编译器进行渲染。

    您还可以使用 `.use()` 方法提供特定节点的局部覆盖：

    ```vue
    <component :is="myMarkdownContent.use({
      h1: (props) => h('h1', { style: { color: 'red' } }, props.children),
    })" />
    ```

    您可以以字符串形式检索 Markdown：

    ```vue
    {{ myMarkdownContent.value }}
    {{ String(myMarkdownContent) }}
    {{ myMarkdownContent.toString() }}
    ```

    您可以像这样访问您的 markdown 元数据：

    ```vue
    <component :is="myMarkdownContent.metadata" />
    <component :is="myMarkdownContent.metadata.title" />
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">
    默认情况下，Svelte 将 Markdown 呈现为 HTML 字符串。使用 `{@html}` 来渲染它。

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

    > 如果未提供 `MarkdownProvider`，Intlayer 将使用默认编译器渲染 markdown。

    您还可以使用 `.use()` 方法提供特定节点的局部覆盖：

    ```svelte
    {@html $content.myMarkdownContent.use({ ... })}
    ```

    您可以以字符串形式检索 Markdown：

    ```svelte
    {$content.myMarkdownContent.value}
    {String($content.myMarkdownContent)}
    {$content.myMarkdownContent.toString()}
    ```

    您可以像这样访问您的 markdown 元数据：

    ```svelte
    {$content.myMarkdownContent.metadata}
    {$content.myMarkdownContent.metadata.title}
    ```

  </Tab>
  <Tab label="Preact" value="preact">
    Preact 直接支持 JSX 中的 Markdown 节点。

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
          MyButton: (props) => <button {...props} />, // MDX 组件
        }}
      >
        <AppContent />
      </MarkdownProvider>
    );
    ```

    > 如果未提供 `MarkdownProvider`，Intlayer 将使用默认的 Markdown 转 JSX 解析器渲染 markdown。

    您还可以使用 `.use()` 方法提供特定节点的局部覆盖：

    ```tsx
    {myMarkdownContent.use({
      h1: ({ children }) => <h1 style={{ color: "red" }}>{children}</h1>,
    })}
    ```

    您可以以字符串形式检索 Markdown：

    ```tsx
    {myMarkdownContent.value}
    {String(myMarkdownContent)}
    {myMarkdownContent.toString()}
    ```

    您可以像这样访问您的 markdown 元数据：

    ```tsx
    {myMarkdownContent.metadata}
    {myMarkdownContent.metadata.title}
    ```

  </Tab>
  <Tab label="Solid" value="solid">
    Solid 直接支持 JSX 中的 Markdown 节点。

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
          MyButton: (props) => <button {...props} />, // MDX 组件
        }}
      >
        <AppContent />
      </MarkdownProvider>
    );
    ```

    > 如果未提供 `MarkdownProvider`，Intlayer 将使用默认的 Markdown 转 JSX 解析器渲染 markdown。

    您还可以使用 `.use()` 方法提供特定节点的局部覆盖：

    ```tsx
    {myMarkdownContent.use({
      h1: (props) => <h1 style={{ color: "red" }}>{props.children}</h1>,
    })}
    ```

    您可以以字符串形式检索 Markdown：

    ```tsx
    {myMarkdownContent.value}
    {String(myMarkdownContent)}
    {myMarkdownContent.toString()}
    ```

    您可以像这样访问您的 markdown 元数据：

    ```tsx
    {myMarkdownContent.metadata}
    {myMarkdownContent.metadata.title}
    ```

  </Tab>
  <Tab label="Angular" value="angular">
    Angular 使用 `[innerHTML]` 指令来呈现 Markdown 内容。

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

    > 如果未配置 IntlayerMarkdown 提供程序，Intlayer 将使用默认编译器进行渲染。

    您还可以使用 `.use()` 方法提供特定节点的局部覆盖：

    ```typescript
    content().myMarkdownContent.use({
      h1: { class: "text-3xl font-bold" },
    })
    ```

    您可以以字符串形式检索 Markdown：

    ```typescript
    content().myMarkdownContent.value
    String(content().myMarkdownContent)
    content().myMarkdownContent.toString()
    ```

    您可以像这样访问您的 markdown 元数据：

    ```typescript
    content().myMarkdownContent.metadata
    content().myMarkdownContent.metadata.title
    ```

  </Tab>
</Tabs>

### 2. 辅助实用程序（仅限 Markdown 字符串）

这些实用程序渲染 **仅限原始 Markdown 字符串** 且独立于 `useIntlayer`。当您需要从词典以外的来源渲染 Markdown 时使用它们。

<Tabs group="framework">
  <Tab label="React" value="react">
  
    #### `<MarkdownRenderer />` 组件

    使用特定选项渲染 Markdown 字符串。

    ```tsx
    import { MarkdownRenderer } from "react-intlayer/markdown";

    <MarkdownRenderer forceBlock={true} tagfilter={true}>
      {"# 我的标题"}
    </MarkdownRenderer>
    ```

    #### `useMarkdownRenderer()` 钩子

    获取预配置的渲染器函数。

    ```tsx
    import { useMarkdownRenderer } from "react-intlayer/markdown";

    const renderMarkdown = useMarkdownRenderer({
      forceBlock: true,
      components: { h1: (props) => <h1 {...props} className="custom" /> }
    });

    return renderMarkdown("# 我的标题");
    ```

    #### `renderMarkdown()` 实用程序
    组件外部渲染的独立实用程序。

    ```tsx
    import { renderMarkdown } from "react-intlayer/markdown";

    const jsx = renderMarkdown("# 我的标题", { forceBlock: true });
    ```

  </Tab>
  <Tab label="Next.js" value="nextjs">
  
    #### `<MarkdownRenderer />` 组件

    使用特定选项渲染 Markdown 字符串。

    ```tsx
    import { MarkdownRenderer } from "next-intlayer/markdown";

    <MarkdownRenderer forceBlock={true} tagfilter={true}>
      {"# 我的标题"}
    </MarkdownRenderer>
    ```

    #### `useMarkdownRenderer()` 钩子

    获取预配置的渲染器函数。

    ```tsx
    import { useMarkdownRenderer } from "next-intlayer/markdown";

    const renderMarkdown = useMarkdownRenderer({
      forceBlock: true,
      components: { h1: (props) => <h1 {...props} className="custom" /> }
    });

    return renderMarkdown("# 我的标题");
    ```

    #### `renderMarkdown()` 实用程序
    组件外部渲染的独立实用程序。

    ```tsx
    import { renderMarkdown } from "next-intlayer/markdown";

    const jsx = renderMarkdown("# 我的标题", { forceBlock: true });
    ```

  </Tab>
  <Tab label="Vue" value="vue">

    #### `<MarkdownRenderer />` 组件

    ```vue
    <script setup>
    import { MarkdownRenderer } from "vue-intlayer/markdown";
    </script>

    <template>
      <MarkdownRenderer :forceBlock="true" content="# 我的标题" />
    </template>
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">

    #### `<MarkdownRenderer />` 组件

    ```svelte
    <script lang="ts">
    import { MarkdownRenderer } from "svelte-intlayer/markdown";
    </script>

    <MarkdownRenderer forceBlock={true} value="# 我的标题" />
    ```

    #### `useMarkdownRenderer()` 钩子

    ```svelte
    <script lang="ts">
    import { useMarkdownRenderer } from "svelte-intlayer/markdown";
    const render = useMarkdownRenderer();
    </script>

    {@html render("# 我的标题")}
    ```

    #### `renderMarkdown()` 实用程序

    ```svelte
    <script lang="ts">
    import { renderMarkdown } from "svelte-intlayer/markdown";
    </script>

    {@html renderMarkdown("# 我的标题")}
    ```

  </Tab>
  <Tab label="Preact" value="preact">
    #### `<MarkdownRenderer />` 组件

    ```tsx
    import { MarkdownRenderer } from "preact-intlayer/markdown";

    <MarkdownRenderer forceBlock={true}>
      {"# 我的标题"}
    </MarkdownRenderer>
    ```

    #### `useMarkdownRenderer()` 钩子

    ```tsx
    import { useMarkdownRenderer } from "preact-intlayer/markdown";

    const render = useMarkdownRenderer();

    return <div>{render("# 我的标题")}</div>;
    ```

    #### `renderMarkdown()` 实用程序

    ```tsx
    import { renderMarkdown } from "preact-intlayer/markdown";

    return <div>{renderMarkdown("# 我的标题")}</div>;
    ```

  </Tab>
  <Tab label="Solid" value="solid">
    #### `<MarkdownRenderer />` 组件

    ```tsx
    import { MarkdownRenderer } from "solid-intlayer/markdown";

    <MarkdownRenderer forceBlock={true}>
      {"# 我的标题"}
    </MarkdownRenderer>
    ```

    #### `useMarkdownRenderer()` 钩子

    ```tsx
    import { useMarkdownRenderer } from "solid-intlayer/markdown";

    const render = useMarkdownRenderer();

    return <div>{render("# 我的标题")}</div>;
    ```

    #### `renderMarkdown()` 实用程序

    ```tsx
    import { renderMarkdown } from "solid-intlayer/markdown";

    return <div>{renderMarkdown("# 我的标题")}</div>;
    ```

  </Tab>
  <Tab label="Angular" value="angular">
    #### `IntlayerMarkdownService` 服务
    使用服务呈现 Markdown 字符串。

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

## 使用 `MarkdownProvider` 进行全局配置

`MarkdownProvider`（或其框架对应的组件）为整个应用程序配置 Markdown 渲染管道。它适用于自动 `useIntlayer` 渲染和辅助实用程序。此处设置的选项为默认值 — `.use()` 在节点级别将其覆盖。

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


    > 支持 MDX — Markdown 内部使用的任何组件名称（例如 `<MyCustomJSXComponent />`）都会根据 `components` 映射进行解析。

    您还可以使用自己的 markdown 渲染器：

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

    > 动态导入您的 Markdown 渲染器是减少应用程序包大小的好方法。

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


    > 支持 MDX — Markdown 内部使用的任何组件名称（例如 `<MyCustomJSXComponent />`）都会根据 `components` 映射进行解析。

    您还可以使用自己的 markdown 渲染器：

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

    > 动态导入您的 Markdown 渲染器是减少应用程序包大小的好方法。

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


    > 支持 MDX — Markdown 内部使用的任何组件名称（例如 `<MyCustomJSXComponent />`）都会根据 `components` 映射进行解析。

    您还可以使用自己的 markdown 渲染器：

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

    > 动态导入您的 Markdown 渲染器是减少应用程序包大小的好方法。

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


    > 支持 MDX — Markdown 内部使用的任何组件名称（例如 `<MyCustomJSXComponent />`）都会根据 `components` 映射进行解析。

    您还可以使用自己的 markdown 渲染器：

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

    > 动态导入您的 Markdown 渲染器是减少应用程序包大小的好方法。

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


    > 支持 MDX — Markdown 内部使用的任何组件名称（例如 `<MyCustomJSXComponent />`）都会根据 `components` 映射进行解析。

    您还可以使用自己的 markdown 渲染器：

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

    > 动态导入您的 Markdown 渲染器是减少应用程序包大小的好方法。

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


    > 支持 MDX — Markdown 内部使用的任何组件名称（例如 `<MyCustomJSXComponent />`）都会根据 `components` 映射进行解析。

    您还可以使用自己的 markdown 渲染器：

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

    > 动态导入您的 Markdown 渲染器是减少应用程序包大小的好方法。

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

    > 动态导入您的 Markdown 渲染器是减少应用程序包大小的好方法。

  </Tab>
</Tabs>

## Suspense (悬念)

Intlayer Markdown渲染器是动态加载的。虽然经过优化，但底层解析器块的大小约为55kb。同步加载会延迟初始页面渲染，并降低首次内容绘制（FCP）。

为防止阻塞UI，Intlayer集成了React的Suspense API。它在后台获取解析器，并在下载期间抛出Promise。

将渲染Intlayer Markdown的任何组件包装在`<Suspense>`边界中。这会在下载块时显示本地化的后备状态，从而允许立即渲染DOM的其余部分。

警告：如果不提供`<Suspense>`边界，React将在根级别暂停或阻止整个组件树的渲染，直到55kb的块完全加载完毕。

<Tabs>
  <Tab label="Next.js" value="nextjs">

在Next.js App Router中，您可以为客户端组件使用React `Suspense`，或为服务器组件使用`loading.tsx`文件。

**客户端组件：**

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

**带有`loading.tsx`的服务器组件：**

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

Vue内置了`<Suspense>`组件。将渲染Markdown内容的组件包装在`<Suspense>`边界中。

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

Svelte没有Suspense API的等效项。使用`{#await}`块处理Markdown内容的异步渲染。

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

Preact通过`preact/compat`支持React的Suspense API。

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

Solid有自己的来自`solid-js`的`<Suspense>`组件。

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

Angular没有Suspense API。使用Angular的可延迟视图（`@defer`）来处理延迟加载的Markdown内容（需要Angular 17+）。

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

## 服务端渲染 (SSR) 与 注水 (Hydration)

与其他 Markdown 解析器（如 remark / rehype）相比，Intlayer Markdown 无依赖关系，且既可以在客户端运行，也可以在服务端运行。

但是 Intlayer 针对服务端渲染 (SSR) 框架（如 Next.js App Router, React Router, Nuxt, SvelteKit 等）进行了解析优化。

Intlayer 允许您在服务端将 Markdown 预解析为抽象语法树 (AST)，而不是将原始 Markdown 字符串发送到客户端并在浏览器中解析（这会带来性能损失）。

您可以在服务端使用框架的 Intlayer 包中的 `parseMarkdown` 函数来生成可序列化的 AST（`ParsedMarkdown` 对象），并将其直接传递给前端。所有 Intlayer 渲染工具（如 `<MarkdownRenderer>`、`useMarkdownRenderer` 等）都会自动接受此 AST 对象并无缝渲染它。

### 服务端/客户端架构中的示例

<Tabs group="framework">
  <Tab label="React Router" value="react">

    ```tsx fileName="server.ts"
    import { parseMarkdown } from "react-intlayer/markdown";

    // 1. 在服务端：将 markdown 解析为可序列化的 AST
    export const loader = async () => {
      const markdownString = "## My title \n\nLorem Ipsum";
      const ast = parseMarkdown(markdownString);

      // 将 AST 作为 JSON 返回给客户端
      return Response.json({ content: ast });
    };
    ```

    ```tsx fileName="client.tsx"
    import { useLoaderData } from "react-router";
    import { MarkdownRenderer } from "react-intlayer/markdown";

    // 2. 在客户端：直接渲染 AST，无需重新解析
    export default function Page() {
      const { content } = useLoaderData();

      // 渲染器既接受原始字符串，也接受解析后的 AST
      return <MarkdownRenderer content={content} />;
    }
    ```

  </Tab>
  <Tab label="Next.js" value="nextjs">

    ```tsx fileName="app/page.tsx"
    import { parseMarkdown } from "next-intlayer/markdown";
    import { MarkdownRenderer } from "next-intlayer/markdown";

    export default async function Page() {
      // 1. 在服务端将 markdown 解析为可序列化的 AST
      const markdownString = "## My title \n\nLorem Ipsum";
      const ast = parseMarkdown(markdownString);

      // 2. 直接渲染 AST
      // 在服务端组件（Server Component）中，这可以无缝工作，并在需要时
    // 直接将 AST 传递给底层的客户端组件。
      return <MarkdownRenderer content={ast} />;
    }
    ```

  </Tab>
  <Tab label="Vue / Nuxt" value="vue">

    ```vue fileName="pages/index.vue"
    <script setup lang="ts">
    import { parseMarkdown } from "vue-intlayer/markdown";
    import { MarkdownRenderer } from "vue-intlayer/markdown";

    // 1. 在服务端获取并解析 markdown 为 AST
    const { data: ast } = await useAsyncData('markdown', () => {
      const markdownString = "## My title \n\nLorem Ipsum";
      return parseMarkdown(markdownString);
    });
    </script>

    <template>
      <!-- 2. 在客户端：直接渲染 AST，无需重新解析 -->
      <MarkdownRenderer :content="ast" />
    </template>
    ```

  </Tab>
  <Tab label="SvelteKit" value="svelte">

    ```typescript fileName="+page.server.ts"
    import { parseMarkdown } from "svelte-intlayer/markdown";

    // 1. 在服务端：将 markdown 解析为可序列化的 AST
    export const load = async () => {
      const markdownString = "## My title \n\nLorem Ipsum";
      const ast = parseMarkdown(markdownString);

      // 将 AST 返回给客户端
      return { content: ast };
    };
    ```

    ```svelte fileName="+page.svelte"
    <script lang="ts">
      import { MarkdownRenderer } from "svelte-intlayer/markdown";
      export let data;
    </script>

    <!-- 2. 在客户端：直接渲染 AST，无需重新解析 -->
    <MarkdownRenderer value={data.content} />
    ```

  </Tab>
  <Tab label="Angular" value="angular">

    Angular SSR 通常在初始加载期间在服务端解析数据，并在客户端进行注水。您可以使用解析器（resolvers）来传递 AST。

    ```typescript fileName="app.resolver.ts"
    import { Injectable } from "@angular/core";
    import { Resolve } from "@angular/router";
    import { parseMarkdown, type ParsedMarkdown } from "angular-intlayer/markdown";

    @Injectable({ providedIn: "root" })
    export class MarkdownResolver implements Resolve<ParsedMarkdown> {
      resolve(): ParsedMarkdown {
        const markdownString = "## My title \n\nLorem Ipsum";
        // 1. 在服务端：将 markdown 解析为可序列化的 AST
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
        // 2. 在客户端：直接渲染 AST，无需重新解析
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

这种模式确保 Markdown 解析逻辑完全在服务端执行，从而显著减少客户端执行时间，并提高初始注水速度。

## 选项参考

这些选项可传递给`MarkdownProvider`、`MarkdownRenderer`、`useMarkdownRenderer`和`renderMarkdown`。

| Option                | Type        | Default | 描述                                                       |
| :-------------------- | :---------- | :------ | :--------------------------------------------------------- |
| `forceBlock`          | `boolean`   | `false` | 强制将输出包装在块级元素（例如`<div>`）中。                |
| `forceInline`         | `boolean`   | `false` | 强制将输出包装在内联元素（例如`<span>`）中。               |
| `tagfilter`           | `boolean`   | `true`  | 启用GitHub标签过滤器以通过剥离危险的HTML标签来提高安全性。 |
| `preserveFrontmatter` | `boolean`   | `false` | 如果为`true`，则不会剥离Markdown字符串开头的frontmatter。  |
| `components`          | `Overrides` | `{}`    | HTML标签到自定义组件的映射（例如`{ h1: MyHeading }`）。    |
| `wrapper`             | `Component` | `null`  | 用于包装渲染Markdown的自定义组件。                         |
| `renderMarkdown`      | `Function`  | `null`  | 自定义渲染函数，用于完全替换默认的Markdown编译器。         |
