---
createdAt: 2026-01-20
updatedAt: 2026-01-22
title: HTMLコンテンツ
description: IntlayerでHTMLコンテンツを宣言し、カスタムコンポーネントとともに使用する方法を学びます。このドキュメントに従い、国際化されたプロジェクト内で動的にコンポーネントを置換可能なリッチなHTMLライクコンテンツを埋め込む方法を解説します。
keywords:
  - HTML
  - カスタムコンポーネント
  - リッチコンテンツ
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
    changes: HTMLRenderer / useHTMLRenderer / renderHTML ユーティリティを追加
  - version: 8.0.0
    date: 2026-01-20
    changes: HTML解析サポートを追加
---

# HTMLコンテンツ / IntlayerのHTML

Intlayer は HTML コンテンツをサポートしており、辞書内にリッチで構造化されたコンテンツを埋め込むことができます。このコンテンツは標準の HTML タグでレンダリングすることも、実行時にカスタムコンポーネントに置き換えることもできます。

## HTML コンテンツの宣言

HTML コンテンツは `html` 関数を使って宣言するか、単に文字列として定義できます。

<Tabs>
  <Tab label="手動ラッピング" value="manual-wrapping">
    `html` 関数を使用して明示的に HTML コンテンツを宣言します。これにより、自動検出が無効になっている場合でも標準タグが正しくマッピングされることが保証されます。

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
  <Tab label="自動検出" value="automatic-detection">
    文字列に一般的なHTMLタグ（例: `<p>`, `<div>`, `<strong>`など）が含まれている場合、Intlayerは自動的にそれを変換します。

    ```typescript fileName="htmlDictionary.content.ts"
    export default {
      key: "app",
      content: {
        myHtmlContent: "<p>Hello <strong>World</strong></p>",
      },
    };
    ```

  </Tab>
  <Tab label="外部ファイル" value="external-files">
    ファイルからHTMLコンテンツをインポートします。現在、`file()`関数は文字列を返し、タグが含まれている場合はHTMLとして自動検出される点に注意してください。

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

---

## HTML のレンダリング

レンダリングは Intlayer のコンテンツシステムで自動的に処理することも、専用のツールを使って手動で処理することもできます。

### 自動レンダリング（`useIntlayer` を使用）

`useIntlayer` 経由でコンテンツにアクセスすると、HTML ノードは既にレンダリング可能な状態になっています。

<Tabs group="framework">
  <Tab label="React / Next.js" value="react">
    HTML ノードはそのまま JSX としてレンダリングできます。標準的なタグは自動で動作します。

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "react-intlayer";

    const AppContent = () => {
      const { myHtmlContent } = useIntlayer("app");
      return <div>{myHtmlContent}</div>;
    };
    ```

    カスタムコンポーネントを提供したりタグを上書きしたりするには `.use()` メソッドを使用します:

    ```tsx
    {myHtmlContent.use({
      p: (props) => <p className="prose" {...props} />,
      CustomLink: ({ children }) => <a href="/details">{children}</a>,
    })}
    ```

  </Tab>
  <Tab label="Vue" value="vue">
    Vueでは、HTMLコンテンツを組み込みの `component` を使ってレンダリングできます。

    ```vue fileName="App.vue"
    <script setup>
    import { useIntlayer } from "vue-intlayer";
    const { myHtmlContent } = useIntlayer("app");
    </script>

    <template>
      <component :is="myHtmlContent" />
    </template>
    ```

    オーバーライドには `.use()` を使用します：
    ```vue
    <component :is="myHtmlContent.use({ h1: 'h2' })" />
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">
    SvelteはHTMLノードを文字列としてレンダリングします。`{@html}` を使ってレンダリングしてください。

    ```svelte
    <script lang="ts">
    import { useIntlayer } from "svelte-intlayer";
    const content = useIntlayer("app");
    </script>

    {@html $content.myHtmlContent}
    ```

  </Tab>
  <Tab label="Preact" value="preact">
    PreactはJSXでHTMLノードを直接サポートします。

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "preact-intlayer";

    const AppContent = () => {
      const { myHtmlContent } = useIntlayer("app");
      return <div>{myHtmlContent}</div>;
    };
    ```

  </Tab>
  <Tab label="Solid" value="solid">
    SolidはJSXでHTMLノードを直接サポートします。

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "solid-intlayer";

    const AppContent = () => {
      const { myHtmlContent } = useIntlayer("app");
      return <div>{myHtmlContent}</div>;
    };
    ```

  </Tab>
  <Tab label="Angular" value="angular">
    Angularは `[innerHTML]` ディレクティブを使用してHTMLコンテンツをレンダリングします。

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

    カスタムコンポーネントを提供したりタグを上書きしたりするには `.use()` メソッドを使用します:

    ```typescript
    content().myHtmlContent.use({
      p: { class: "prose" },
      CustomLink: { href: "/details" },
    })
    ```

  </Tab>
</Tabs>

## `HTMLProvider`によるグローバル設定

アプリ全体でHTMLレンダリングをグローバルに設定できます。これは、すべてのHTMLコンテンツで利用可能にしたいカスタムコンポーネントを定義するのに最適です。

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

### 手動レンダリングと高度なツール

生のHTML文字列をレンダリングしたり、コンポーネントのマッピングをより細かく制御したい場合は、次のツールを使用してください。

<Tabs group="framework">
  <Tab label="React / Next.js" value="react">
    #### `<HTMLRenderer />` コンポーネント
    特定のコンポーネントでHTML文字列をレンダリングします。

    ```tsx
    import { HTMLRenderer } from "react-intlayer";

    <HTMLRenderer components={{ p: MyCustomP }}>
      {"<p>Hello World</p>"}
    </HTMLRenderer>
    ```

    #### `useHTMLRenderer()` フック

    事前設定されたレンダラー関数を取得します。

    ```tsx
    import { useHTMLRenderer } from "react-intlayer";

    const renderHTML = useHTMLRenderer({
      components: { strong: (props) => <strong {...props} className="text-red-500" /> }
    });

    return renderHTML("<p>Hello <strong>World</strong></p>");
    ```

    #### `renderHTML()` ユーティリティ

    コンポーネント外でのレンダリングのためのスタンドアロンユーティリティ。

    ```tsx
    import { renderHTML } from "react-intlayer";

    const jsx = renderHTML("<p>Hello</p>", { components: { p: 'div' } });
    ```

  </Tab>
  <Tab label="Vue" value="vue">
   
    #### `<HTMLRenderer />` コンポーネント
   
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
  
    #### `<HTMLRenderer />` コンポーネント
   
    ```svelte
    <script lang="ts">
    import { HTMLRenderer } from "svelte-intlayer";
    </script>

    <HTMLRenderer value="<p>Hello World</p>" />
    ```

    #### `useHTMLRenderer()` フック

    ```svelte
    <script lang="ts">
    import { useHTMLRenderer } from "svelte-intlayer";
    const render = useHTMLRenderer();
    </script>

    {@html render("<p>Hello World</p>")}
    ```

    #### `renderHTML()` ユーティリティ

    ```svelte
    <script lang="ts">
    import { renderHTML } from "svelte-intlayer";
    </script>

    {@html renderHTML("<p>Hello World</p>")}
    ```

  </Tab>
  <Tab label="Preact" value="preact">
   
    #### `<HTMLRenderer />` コンポーネント
   
    ```tsx
    import { HTMLRenderer } from "preact-intlayer";

    <HTMLRenderer>
      {"<p>Hello World</p>"}
    </HTMLRenderer>
    ```

    #### `useHTMLRenderer()` フック

    ```tsx
    import { useHTMLRenderer } from "preact-intlayer";

    const render = useHTMLRenderer();

    return <div>{render("<p>Hello World</p>")}</div>;
    ```

    #### `renderHTML()` ユーティリティ

    ```tsx
    import { renderHTML } from "preact-intlayer";

    return <div>{renderHTML("<p>Hello World</p>")}</div>;
    ```

  </Tab>
  <Tab label="Solid" value="solid">
   
    #### `<HTMLRenderer />` コンポーネント
   
    ```tsx
    import { HTMLRenderer } from "solid-intlayer";

    <HTMLRenderer>
      {"<p>Hello World</p>"}
    </HTMLRenderer>
    ```

    #### `useHTMLRenderer()` フック

    ```tsx
    import { useHTMLRenderer } from "solid-intlayer";

    const render = useHTMLRenderer();

    return <div>{render("<p>Hello World</p>")}</div>;
    ```

    #### `renderHTML()` ユーティリティ

    ```tsx
    import { renderHTML } from "solid-intlayer";

    return <div>{renderHTML("<p>Hello World</p>")}</div>;
    ```

  </Tab>
  <Tab label="Angular" value="angular">
    #### `IntlayerMarkdownService` サービス
    サービスを使用してHTML文字列をレンダリングします。

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

## オプションリファレンス

これらのオプションは `HTMLProvider`、`HTMLRenderer`、`useHTMLRenderer`、および `renderHTML` に渡すことができます。

| オプション   | 型                    | デフォルト | 説明                                                                                             |
| :----------- | :-------------------- | :--------- | :----------------------------------------------------------------------------------------------- |
| `components` | `Record<string, any>` | `{}`       | HTMLタグまたはカスタムコンポーネント名をコンポーネントにマッピングするオブジェクト。             |
| `renderHTML` | `Function`            | `null`     | デフォルトのHTMLパーサを完全に置き換えるカスタムレンダリング関数（Vue/Svelteプロバイダーのみ）。 |

> 注: ReactおよびPreactでは、標準のHTMLタグが自動的に提供されます。これらを上書きしたりカスタムコンポーネントを追加したい場合にのみ、`components`プロップを渡してください。
