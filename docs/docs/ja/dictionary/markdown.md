---
createdAt: 2025-02-07
updatedAt: 2026-05-19
title: Markdown
description: Intlayerを使用して多言語Webサイトでマークダウンコンテンツを宣言および使用する方法を学びます。このオンラインドキュメントの手順に従って、マークダウンをプロジェクトにシームレスに統合します。
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
  - version: 8.11.0
    date: 2026-05-28
    changes: "マークダウンコンテンツの自動装飾、MDXおよびSSRサポート"
  - version: 8.10.0
    date: 2026-05-19
    changes: "`.content.md`ファイルサポートを追加"
  - version: 8.5.0
    date: 2026-03-24
    changes: "`intlayerMarkdown`プラグインオブジェクトを追加。`app.use(installIntlayerMarkdown)`の代わりに`app.use(intlayerMarkdown)`を使用"
  - version: 8.5.0
    date: 2026-03-24
    changes: "インポートを`{{framework}}-intlayer`から`{{framework}}-intlayer/markdown`に移動"
  - version: 8.0.0
    date: 2026-01-22
    changes: "MarkdownRenderer / useMarkdownRenderer / renderMarkdownユーティリティとforceInlineオプションを追加"
  - version: 8.0.0
    date: 2026-01-18
    changes: "マークダウンコンテンツの自動装飾、MDXおよびSSRサポート"
  - version: 5.5.10
    date: 2025-06-29
    changes: "履歴を初期化"
author: aymericzip
---

# Markdown / Rich Text Content

Intlayerは、Markdown構文を使用して定義されたリッチテキストコンテンツをサポートしています。これにより、ブログ、記事など、リッチなフォーマットを持つコンテンツを簡単に記述および維持できます。

## Markdownコンテンツの宣言

`md`関数を使用するか、単純に文字列として（Markdownシンタックスを含む場合）Markdownコンテンツを宣言できます。

<Tabs>
  <Tab label=".content.md" value=".content.md">
  
    バージョン`8.10.0`以降、`.content.md`ファイルでMarkdownコンテンツを直接宣言できます。Intlayerは
    Markdownコンテンツを自動的に検出して解析します。

    ```md fileName="markdown-file.en.content.md"
    ---
    key: my-markdown-content
    description: My content
    locale: en
    ---

    # My content

    Here an example of markdown content
    ```

    `locale`フロントマターフィールドはコンテンツのロケールを定義するフィールドです。これはオプションです。提供されない場合、Intlayerはデフォルトロケールを使用します。これは特定のロケールに対して翻訳が利用できない場合のフォールバックロケールとしても使用されます。

    ファイル構造の例：

    ```text
    content
    ├── markdown-file.en.content.md
    ├── markdown-file.fr.content.md
    └── markdown-file.es.content.md
    ```

    [Dictionary definition](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/content_file.md)で定義されているプロパティをフロントマターに追加できます

  </Tab>
  <Tab label="手動ラッピング" value="manual-wrapping">
    `md`関数を使用してMarkdownコンテンツを明示的に宣言します。これは、明らかなシンタックスが含まれていなくても、文字列がMarkdownとして処理されることを確認したい場合に便利です。

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

  <Tab label="外部ファイル" value="external-files">
    `file`関数を使用して`.md`ファイルを直接importします。

    ```typescript fileName="markdownDictionary.content.ts"
    import { md, file, t } from "intlayer";

    export default {
      key: "app",
      content: {
        content: t({
          ja: md(file("./myMarkdown.ja.md")),
          en: md(file("./myMarkdown.en.md")),
          fr: md(file("./myMarkdown.fr.md")),
        }),
      },
    };
    ```

  </Tab>

  <Tab label="自動検出" value="automatic-detection">
    文字列に一般的なMarkdown指標（ヘッダー、リスト、リンクなど）が含まれている場合、Intlayerは自動的にそれを変換します。

    ```typescript fileName="markdownDictionary.content.ts"
    export default {
      key: "app",
      contentAutoTransformation: true, // Markdownコンテンツの自動検出を有効化 - intlayer.config.tsでグローバルに設定できます
      content: {
        myMarkdownContent: "## My title \n\nLorem Ipsum",
      },
    };
    ```

  </Tab>

</Tabs>

## Markdown のレンダリング

Intlayer は Markdown をレンダリングするための 2 つの独立した方法を提供します:

1. **`useIntlayer` 経由**
   — Intlayer は自動的に `md` ノードをフレームワークのネイティブ出力 (JSX、VNode、HTML 文字列) に変換します。
   - Frontmatter は解析され、`.metadata` として公開されます。レンダリングはグローバルに `MarkdownProvider` (またはフレームワークと同等のもの) で、ノードごとにローカルで `.use()` で、2 つのレベルでオーバーライドできます。両者は組み合わせることができます。`.use()` は `MarkdownProvider` に優先し、`MarkdownProvider` はデフォルトに優先します。

2. **ヘルパーユーティリティ** — `<MarkdownRenderer />`、`useMarkdownRenderer()`、および `renderMarkdown()` は、**生の Markdown 文字列のみ** を受け入れるスタンドアロンツールです。これらは `useIntlayer` から独立しており、それが返す装飾されたノードでは機能しません。

Markdown レンダリングは **MDX** をサポートしています — Markdown 内で JSX/フレームワークコンポーネントを名前で直接使用できます。

### 1. 自動レンダリング（`useIntlayer`経由）

<Tabs group="framework">
  <Tab label="React" value="react">
    Markdownノードは直接JSXとしてレンダリングできます。

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
          MyButton: (props) => <button {...props} />, // MDXコンポーネント
        }}
      >
        <AppContent />
      </MarkdownProvider>
    );
    ```

    > `MarkdownProvider`が存在しない場合、intlayerはデフォルトのMarkdown to JSXパーサーを使用してMarkdownをレンダリングします。

    `.use()`メソッドを使用して特定のノードのローカルオーバーライドを提供することもできます：

    ```tsx
    {myMarkdownContent.use({
      h1: ({ children }) => <h1 style={{ color: "red" }}>{children}</h1>,
    })}
    ```

    Markdownを文字列として取得できます：

    ```tsx
    {myMarkdownContent.value}
    {String(myMarkdownContent)}
    {myMarkdownContent.toString()}
    ```

    また、Markdownのメタデータにアクセスできます：

    ```tsx
    {myMarkdownContent.metadata}
    {myMarkdownContent.metadata.title}
    ```

  </Tab>
  <Tab label="Next.js" value="nextjs">
    Markdownノードは直接JSXとしてレンダリングできます。

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
          MyButton: (props) => <button {...props} />, // MDXコンポーネント
        }}
      >
        <AppContent />
      </MarkdownProvider>
    );
    ```

    > `MarkdownProvider`が存在しない場合、intlayerはデフォルトのMarkdown to JSXパーサーを使用してMarkdownをレンダリングします。

    `.use()`メソッドを使用して特定のノードのローカルオーバーライドを提供することもできます：

    ```tsx
    {myMarkdownContent.use({
      h1: ({ children }) => <h1 style={{ color: "red" }}>{children}</h1>,
    })}
    ```

    Markdownを文字列として取得できます：

    ```tsx
    {myMarkdownContent.value}
    {String(myMarkdownContent)}
    {myMarkdownContent.toString()}
    ```

    また、Markdownのメタデータにアクセスできます：

    ```tsx
    {myMarkdownContent.metadata}
    {myMarkdownContent.metadata.title}
    ```

  </Tab>
  <Tab label="Vue" value="vue">
    Vueでは、Markdownコンテンツは`component`ビルトインまたはノードとして直接レンダリングできます。

    ```vue fileName="App.vue"
    <script setup>
    import { useIntlayer } from "vue-intlayer";
    const { myMarkdownContent } = useIntlayer("app");
    </script>

    <template>
      <component :is="myMarkdownContent" />
    </template>
    ```

    `intlayerMarkdown`プラグイン経由でグローバルに設定します（MDXカスタムコンポーネントをサポート）：

    ```ts fileName="main.ts"
    import { intlayerMarkdown } from "vue-intlayer/markdown";

    app.use(intlayerMarkdown, {
      components: {
        h1: (props) => h('h1', { style: { color: 'green' } }, props.children),
        MyButton: (props) => h('button', props), // MDXコンポーネント
      },
    });
    ```

    > `intlayerMarkdown`プラグインがインストールされていない場合、Intlayerはデフォルトのコンパイラーを使用してレンダリングします。

    `.use()`メソッドを使用して特定のノードのローカルオーバーライドを提供することもできます：

    ```vue
    <component :is="myMarkdownContent.use({
      h1: (props) => h('h1', { style: { color: 'red' } }, props.children),
    })" />
    ```

    Markdownを文字列として取得できます：

    ```vue
    {{ myMarkdownContent.value }}
    {{ String(myMarkdownContent) }}
    {{ myMarkdownContent.toString() }}
    ```

    また、Markdownのメタデータにアクセスできます：

    ```vue
    <component :is="myMarkdownContent.metadata" />
    <component :is="myMarkdownContent.metadata.title" />
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">
    SvelteはデフォルトでMarkdownをHTML文字列としてレンダリングします。`{@html}`を使用してレンダリングします。

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

    > `MarkdownProvider`が存在しない場合、Intlayerはデフォルトのコンパイラーを使用してMarkdownをレンダリングします。

    `.use()`メソッドを使用して特定のノードのローカルオーバーライドを提供することもできます：

    ```svelte
    {@html $content.myMarkdownContent.use({ ... })}
    ```

    Markdownを文字列として取得できます：

    ```svelte
    {$content.myMarkdownContent.value}
    {String($content.myMarkdownContent)}
    {$content.myMarkdownContent.toString()}
    ```

    また、Markdownのメタデータにアクセスできます：

    ```svelte
    {$content.myMarkdownContent.metadata}
    {$content.myMarkdownContent.metadata.title}
    ```

  </Tab>
  <Tab label="Preact" value="preact">
    PreactはMarkdownノードを直接JSXでサポートしています。

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
          MyButton: (props) => <button {...props} />, // MDXコンポーネント
        }}
      >
        <AppContent />
      </MarkdownProvider>
    );
    ```

    > `MarkdownProvider`が存在しない場合、intlayerはデフォルトのMarkdown to JSXパーサーを使用してMarkdownをレンダリングします。

    `.use()`メソッドを使用して特定のノードのローカルオーバーライドを提供することもできます：

    ```tsx
    {myMarkdownContent.use({
      h1: ({ children }) => <h1 style={{ color: "red" }}>{children}</h1>,
    })}
    ```

    Markdownを文字列として取得できます：

    ```tsx
    {myMarkdownContent.value}
    {String(myMarkdownContent)}
    {myMarkdownContent.toString()}
    ```

    また、Markdownのメタデータにアクセスできます：

    ```tsx
    {myMarkdownContent.metadata}
    {myMarkdownContent.metadata.title}
    ```

  </Tab>
  <Tab label="Solid" value="solid">
    Solidはmarkdownノードを直接JSXでサポートしています。

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
          MyButton: (props) => <button {...props} />, // MDXコンポーネント
        }}
      >
        <AppContent />
      </MarkdownProvider>
    );
    ```

    > `MarkdownProvider`が存在しない場合、intlayerはデフォルトのMarkdown to JSXパーサーを使用してMarkdownをレンダリングします。

    `.use()`メソッドを使用して特定のノードのローカルオーバーライドを提供することもできます：

    ```tsx
    {myMarkdownContent.use({
      h1: (props) => <h1 style={{ color: "red" }}>{props.children}</h1>,
    })}
    ```

    Markdownを文字列として取得できます：

    ```tsx
    {myMarkdownContent.value}
    {String(myMarkdownContent)}
    {myMarkdownContent.toString()}
    ```

    また、Markdownのメタデータにアクセスできます：

    ```tsx
    {myMarkdownContent.metadata}
    {myMarkdownContent.metadata.title}
    ```

  </Tab>
  <Tab label="Angular" value="angular">
    Angularは`[innerHTML]`ディレクティブを使用してMarkdownコンテンツをレンダリングします。

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

    > IntlayerMarkdownプロバイダーが設定されていない場合、Intlayerはデフォルトのコンパイラーを使用してレンダリングします。

    `.use()`メソッドを使用して特定のノードのローカルオーバーライドを提供することもできます：

    ```typescript
    content().myMarkdownContent.use({
      h1: { class: "text-3xl font-bold" },
    })
    ```

    Markdownを文字列として取得できます：

    ```typescript
    content().myMarkdownContent.value
    String(content().myMarkdownContent)
    content().myMarkdownContent.toString()
    ```

    また、Markdownのメタデータにアクセスできます：

    ```typescript
    content().myMarkdownContent.metadata
    content().myMarkdownContent.metadata.title
    ```

  </Tab>
</Tabs>

### 2. ヘルパーユーティリティ（Markdown文字列のみ）

これらのユーティリティは**raw Markdown文字列**をレンダリングし、`useIntlayer`に依存しません。辞書以外のソースからMarkdownをレンダリングする必要がある場合に使用してください。

<Tabs group="framework">
  <Tab label="React" value="react">
  
    #### `<MarkdownRenderer />` コンポーネント

    特定のオプションで Markdown 文字列をレンダリングします。

    ```tsx
    import { MarkdownRenderer } from "react-intlayer/markdown";

    <MarkdownRenderer forceBlock={true} tagfilter={true}>
      {"# My Title"}
    </MarkdownRenderer>
    ```

    #### `useMarkdownRenderer()` Hook

    事前に設定されたレンダラー関数を取得します。

    ```tsx
    import { useMarkdownRenderer } from "react-intlayer/markdown";

    const renderMarkdown = useMarkdownRenderer({
      forceBlock: true,
      components: { h1: (props) => <h1 {...props} className="custom" /> }
    });

    return renderMarkdown("# My Title");
    ```

    #### `renderMarkdown()` ユーティリティ
    コンポーネント外でレンダリングするためのスタンドアロンユーティリティ。

    ```tsx
    import { renderMarkdown } from "react-intlayer/markdown";

    const jsx = renderMarkdown("# My Title", { forceBlock: true });
    ```

  </Tab>
  <Tab label="Next.js" value="nextjs">
  
    #### `<MarkdownRenderer />` コンポーネント

    特定のオプションを使用して Markdown 文字列をレンダリングします。

    ```tsx
    import { MarkdownRenderer } from "next-intlayer/markdown";

    <MarkdownRenderer forceBlock={true} tagfilter={true}>
      {"# My Title"}
    </MarkdownRenderer>
    ```

    #### `useMarkdownRenderer()` Hook

    事前に構成されたレンダラー関数を取得します。

    ```tsx
    import { useMarkdownRenderer } from "next-intlayer/markdown";

    const renderMarkdown = useMarkdownRenderer({
      forceBlock: true,
      components: { h1: (props) => <h1 {...props} className="custom" /> }
    });

    return renderMarkdown("# My Title");
    ```

    #### `renderMarkdown()` ユーティリティ
    コンポーネント外でのレンダリング用のスタンドアロンユーティリティ。

    ```tsx
    import { renderMarkdown } from "next-intlayer/markdown";

    const jsx = renderMarkdown("# My Title", { forceBlock: true });
    ```

  </Tab>
  <Tab label="Vue" value="vue">

    #### `<MarkdownRenderer />` コンポーネント

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

    #### `<MarkdownRenderer />` コンポーネント

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

    #### `renderMarkdown()` ユーティリティ

    ```svelte
    <script lang="ts">
    import { renderMarkdown } from "svelte-intlayer/markdown";
    </script>

    {@html renderMarkdown("# My Title")}
    ```

  </Tab>
  <Tab label="Preact" value="preact">
    #### `<MarkdownRenderer />` コンポーネント

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

    #### `renderMarkdown()` ユーティリティ

    ```tsx
    import { renderMarkdown } from "preact-intlayer/markdown";

    return <div>{renderMarkdown("# My Title")}</div>;
    ```

  </Tab>
  <Tab label="Solid" value="solid">
    #### `<MarkdownRenderer />` コンポーネント

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

    #### `renderMarkdown()` ユーティリティ

    ```tsx
    import { renderMarkdown } from "solid-intlayer/markdown";

    return <div>{renderMarkdown("# My Title")}</div>;
    ```

  </Tab>
  <Tab label="Angular" value="angular">
    #### `IntlayerMarkdownService` サービス
    サービスを使用してMarkdown文字列をレンダリングします。

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

## `MarkdownProvider` を使用したグローバル設定

`MarkdownProvider`（またはそのフレームワーク相当）は、アプリケーション全体の Markdown レンダリングパイプラインを設定します。自動的な `useIntlayer` レンダリングとヘルパーユーティリティの両方に適用されます。ここで設定されたオプションはデフォルトです — `.use()` はノードレベルでそれらをオーバーライドします。

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


    > MDX がサポートされています — Markdown 内で使用されるコンポーネント名（例：`<MyCustomJSXComponent />`）は `components` マップに対して解決されます。

    独自の Markdown レンダラーを使用することもできます：

    ```tsx fileName="AppProvider.tsx"
    import { MarkdownProvider } from "react-intlayer/markdown";

    export const AppProvider = ({ children }) => (
      <MarkdownProvider
        renderMarkdown={async (md) => {
          // アプリケーションのバンドルサイズを削減するために動的インポートを使用してください
          const { renderMarkdown } = await import('react-intlayer/markdown');
          return renderMarkdown(md);
        }}
      >
        {children}
      </MarkdownProvider>
    );
    ```

    > Markdown レンダラーを動的にインポートすることは、アプリケーションのバンドルサイズを削減するためのよい方法です。

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


    > MDX がサポートされています — Markdown 内で使用されるコンポーネント名（例：`<MyCustomJSXComponent />`）は `components` マップに対して解決されます。

    独自の Markdown レンダラーを使用することもできます：

    ```tsx fileName="AppProvider.tsx"
    import { MarkdownProvider } from "next-intlayer/markdown";

    export const AppProvider = ({ children }) => (
      <MarkdownProvider
        renderMarkdown={async (md) => {
          // アプリケーションのバンドルサイズを削減するために動的インポートを使用してください
          const { renderMarkdown } = await import('next-intlayer/markdown');
          return renderMarkdown(md);
        }}
      >
        {children}
      </MarkdownProvider>
    );
    ```

    > Markdown レンダラーを動的にインポートすることは、アプリケーションのバンドルサイズを削減するためのよい方法です。

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


    > MDX がサポートされています — Markdown 内で使用されるコンポーネント名（例：`<MyCustomJSXComponent />`）は `components` マップに対して解決されます。

    独自の Markdown レンダラーを使用することもできます：

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

    > Markdown レンダラーを動的にインポートすることは、アプリケーションのバンドルサイズを削減するためのよい方法です。

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


    > MDX がサポートされています — Markdown 内で使用されるコンポーネント名（例：`<MyCustomJSXComponent />`）は `components` マップに対して解決されます。

    独自の Markdown レンダラーを使用することもできます：

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

    > Markdown レンダラーを動的にインポートすることは、アプリケーションのバンドルサイズを削減するためのよい方法です。

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


    > MDX がサポートされています — Markdown 内で使用されるコンポーネント名（例：`<MyCustomJSXComponent />`）は `components` マップに対して解決されます。

    独自の Markdown レンダラーを使用することもできます：

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

    > Markdown レンダラーを動的にインポートすることは、アプリケーションのバンドルサイズを削減するためのよい方法です。

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


    > MDX がサポートされています — Markdown 内で使用されるコンポーネント名（例：`<MyCustomJSXComponent />`）は `components` マップに対して解決されます。

    独自の Markdown レンダラーを使用することもできます：

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

    > Markdown レンダラーを動的にインポートすることは、アプリケーションのバンドルサイズを削減するためのよい方法です。

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


    > MDX がサポートされています — Markdown 内で使用されるコンポーネント名（例：`<MyCustomJSXComponent />`）は `components` マップに対して解決されます。

    独自の Markdown レンダラーを使用することもできます：

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

    > Markdown レンダラーを動的にインポートすることは、アプリケーションのバンドルサイズを削減するためのよい方法です。

  </Tab>
</Tabs>

## Suspense

Intlayer Markdown レンダラーは動的に読み込まれます。最適化されていますが、基盤となるパーサーチャンクは約 55kb です。これを同期的に読み込むと、初期ページレンダリングが遅延し、First Contentful Paint (FCP) が低下します。

UI をブロックするのを防ぐため、Intlayer は React の Suspense API と統合されています。バックグラウンドでパーサーを取得し、ダウンロード中に Promise をスローします。

Intlayer Markdown をレンダリングするコンポーネントを `<Suspense>` 境界でラップします。これにより、チャンクがダウンロード中にローカライズされたフォールバック状態が表示され、DOM の残りが即座にレンダリングできます。

警告: `<Suspense>` 境界を指定しない場合、React はルートレベルで一時停止するか、55kb チャンク全体が完全に読み込まれるまでコンポーネントツリー全体のレンダリングをブロックします。

<Tabs>
  <Tab label="Next.js" value="nextjs">

Next.js App Router では、クライアントコンポーネント用に React `Suspense` を使用するか、サーバーコンポーネント用に `loading.tsx` ファイルを使用できます。

**クライアントコンポーネント:**

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

**`loading.tsx` を使用したサーバーコンポーネント:**

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

Vue には組み込みの `<Suspense>` コンポーネントがあります。Markdown コンテンツをレンダリングするコンポーネントを `<Suspense>` 境界でラップします。

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

Svelte には同等の Suspense API がありません。`{#await}` ブロックを使用して Markdown コンテンツの非同期レンダリングを処理します。

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

Preact は `preact/compat` 経由で React の Suspense API をサポートしています。

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

Solid には `solid-js` からの独自の `<Suspense>` コンポーネントがあります。

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

Angular には Suspense API がありません。Angular の遅延可能ビュー (`@defer`) を使用して、遅延読み込みされた Markdown コンテンツを処理します (Angular 17 以上が必要)。

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

## Server-Side Rendering (SSR) と Hydration

remark / rehype などの他の Markdown パーサーと比較して、Intlayer Markdown は依存関係がなく、クライアント側とサーバー側の両方で実行されます。

しかし Intlayer は Server-Side Rendering (SSR) フレームワーク（Next.js App Router、React Router、Nuxt、SvelteKit など）用にパースを最適化しています。

生の Markdown 文字列をクライアントに送信してブラウザーで解析する代わりに（パフォーマンス低下を招きます）、Intlayer では Markdown をサーバー上の Abstract Syntax Tree (AST) に事前解析することができます。

フレームワークの Intlayer パッケージから `parseMarkdown` 関数をサーバー側で使用して、シリアライズ可能な AST（`ParsedMarkdown` オブジェクト）を生成し、フロントエンドに直接渡すことができます。すべての Intlayer レンダリング ユーティリティ（`<MarkdownRenderer>`、`useMarkdownRenderer` など）は、このAST オブジェクトを自動的に受け入れ、シームレスにレンダリングします。

### Server/Client アーキテクチャの例

<Tabs group="framework">
  <Tab label="React Router" value="react">

    ```tsx fileName="server.ts"
    import { parseMarkdown } from "react-intlayer/markdown";

    // 1. サーバー上で: markdown を シリアライズ可能な AST に解析します
    export const loader = async () => {
      const markdownString = "## My title \n\nLorem Ipsum";
      const ast = parseMarkdown(markdownString);

      // AST を JSON としてクライアントに返します
      return Response.json({ content: ast });
    };
    ```

    ```tsx fileName="client.tsx"
    import { useLoaderData } from "react-router";
    import { MarkdownRenderer } from "react-intlayer/markdown";

    // 2. クライアント上で: AST を再解析せずに直接レンダリングします
    export default function Page() {
      const { content } = useLoaderData();

      // レンダラーは生の文字列または解析された AST のいずれかを受け入れます
      return <MarkdownRenderer content={content} />;
    }
    ```

  </Tab>
  <Tab label="Next.js" value="nextjs">

    ```tsx fileName="app/page.tsx"
    import { parseMarkdown } from "next-intlayer/markdown";
    import { MarkdownRenderer } from "next-intlayer/markdown";

    export default async function Page() {
      // 1. サーバー上で markdown を シリアライズ可能な AST に解析します
      const markdownString = "## My title \n\nLorem Ipsum";
      const ast = parseMarkdown(markdownString);

      // 2. AST を直接レンダリングします
      // Server Component では、これはシームレスに機能し、AST を
    // 必要に応じて基になるクライアント コンポーネントに直接渡します。
      return <MarkdownRenderer content={ast} />;
    }
    ```

  </Tab>
  <Tab label="Vue / Nuxt" value="vue">

    ```vue fileName="pages/index.vue"
    <script setup lang="ts">
    import { parseMarkdown } from "vue-intlayer/markdown";
    import { MarkdownRenderer } from "vue-intlayer/markdown";

    // 1. サーバー上で markdown をフェッチして AST に解析します
    const { data: ast } = await useAsyncData('markdown', () => {
      const markdownString = "## My title \n\nLorem Ipsum";
      return parseMarkdown(markdownString);
    });
    </script>

    <template>
      <!-- 2. クライアント上で: AST を再解析せずに直接レンダリングします -->
      <MarkdownRenderer :content="ast" />
    </template>
    ```

  </Tab>
  <Tab label="SvelteKit" value="svelte">

    ```typescript fileName="+page.server.ts"
    import { parseMarkdown } from "svelte-intlayer/markdown";

    // 1. サーバー上で: markdown を シリアライズ可能な AST に解析します
    export const load = async () => {
      const markdownString = "## My title \n\nLorem Ipsum";
      const ast = parseMarkdown(markdownString);

      // AST をクライアントに返します
      return { content: ast };
    };
    ```

    ```svelte fileName="+page.svelte"
    <script lang="ts">
      import { MarkdownRenderer } from "svelte-intlayer/markdown";
      export let data;
    </script>

    <!-- 2. クライアント上で: AST を再解析せずに直接レンダリングします -->
    <MarkdownRenderer value={data.content} />
    ```

  </Tab>
  <Tab label="Angular" value="angular">

    Angular SSR は通常、初期読み込み中にサーバー上でデータを解決し、クライアント上でハイドレーションします。リゾルバーを使用して AST を渡すことができます。

    ```typescript fileName="app.resolver.ts"
    import { Injectable } from "@angular/core";
    import { Resolve } from "@angular/router";
    import { parseMarkdown, type ParsedMarkdown } from "angular-intlayer/markdown";

    @Injectable({ providedIn: "root" })
    export class MarkdownResolver implements Resolve<ParsedMarkdown> {
      resolve(): ParsedMarkdown {
        const markdownString = "## My title \n\nLorem Ipsum";
        // 1. サーバー上で: markdown を シリアライズ可能な AST に解析します
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
        // 2. クライアント上で: AST を再解析せずに直接レンダリングします
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

このパターンにより、markdown の解析ロジックが完全にサーバー上で実行され、クライアント側の実行時間が大幅に削減され、初期ハイドレーション速度が向上します。

## オプションリファレンス

これらのオプションは `MarkdownProvider`、`MarkdownRenderer`、`useMarkdownRenderer`、`renderMarkdown` に渡すことができます。

| Option                | Type        | Default | Description                                                                                    |
| :-------------------- | :---------- | :------ | :--------------------------------------------------------------------------------------------- |
| `forceBlock`          | `boolean`   | `false` | 出力をブロックレベル要素（例：`<div>`）でラップすることを強制します。                          |
| `forceInline`         | `boolean`   | `false` | 出力をインライン要素（例：`<span>`）でラップすることを強制します。                             |
| `tagfilter`           | `boolean`   | `true`  | GitHub Tag Filter を有効にして、危険な HTML タグを削除することで、セキュリティを向上させます。 |
| `preserveFrontmatter` | `boolean`   | `false` | `true` の場合、Markdown 文字列の先頭にある frontmatter は削除されません。                      |
| `components`          | `Overrides` | `{}`    | HTML タグをカスタムコンポーネントにマップするオブジェクト（例：`{ h1: MyHeading }`）。         |
| `wrapper`             | `Component` | `null`  | レンダリングされた Markdown をラップするカスタムコンポーネント。                               |
| `renderMarkdown`      | `Function`  | `null`  | デフォルトの Markdown コンパイラを完全に置き換えるカスタムレンダリング関数。                   |
