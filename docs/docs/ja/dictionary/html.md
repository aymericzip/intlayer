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

## HTML の仕組み

Intlayer v8 はコンテンツ文字列内の HTML タグを賢く検出します。文字列が HTML（タグを含む）と判定されると、自動的に HTML ノードに変換されます。

<Columns>
<Column title="v7 の挙動（手動でラップ）">

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
<Column title="v8 の挙動（自動検出）">

```typescript fileName="htmlDictionary.content.ts"
export default {
  key: "app",
  content: {
    text: "<p>こんにちは <strong>世界</strong></p>",
  },
};
```

</Column>
</Columns>

---

## HTML コンテンツの宣言

HTML コンテンツは `html` 関数を使って宣言するか、単に文字列として定義できます。

<Tabs>
  <Tab label="手動ラッピング">
    `html` 関数を使用して明示的に HTML コンテンツを宣言します。これにより、自動検出が無効になっている場合でも標準タグが正しくマッピングされることが保証されます。

    ```typescript fileName="htmlDictionary.content.ts"
    import { html, type Dictionary } from "intlayer";

    const htmlDictionary = {
      key: "app",
      content: {
        myHtmlContent: html("<p>こんにちは <strong>世界</strong></p>"),
      },
    } satisfies Dictionary;

    export default htmlDictionary;
    ```

  </Tab>
  <Tab label="自動検出">
    文字列に一般的なHTMLタグ（例: `<p>`, `<div>`, `<strong>`など）が含まれている場合、Intlayerは自動的にそれを変換します。

    ```typescript fileName="htmlDictionary.content.ts"
    export default {
      key: "app",
      content: {
        myHtmlContent: "<p>こんにちは <strong>世界</strong></p>",
      },
    };
    ```

  </Tab>
  <Tab label="External Files">
    ファイルからHTMLコンテンツをインポートします。現在、`file()`関数は文字列を返し、タグが含まれている場合はHTMLとして自動検出される点に注意してください。

    ```typescript fileName="htmlDictionary.content.ts"
    import { html, file, t } from "intlayer";

    export default {
      key: "app",
      content: {
        content: t({
          ja: html(file("./content.ja.html")),
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
  <Tab label="React / Next.js">
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
  <Tab label="Vue">
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
  <Tab label="Svelte">
    SvelteはHTMLノードを文字列としてレンダリングします。`{@html}` を使ってレンダリングしてください。

    ```svelte
    <script lang="ts">
    import { useIntlayer } from "svelte-intlayer";
    const content = useIntlayer("app");
    </script>

    {@html $content.myHtmlContent}
    ```

  </Tab>
  <Tab label="Preact">
    PreactはJSXでHTMLノードを直接サポートします。

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "preact-intlayer";

    const AppContent = () => {
      const { myHtmlContent } = useIntlayer("app");
      return <div>{myHtmlContent}</div>;
    };
    ```

  </Tab>
</Tabs>

## `HTMLProvider`によるグローバル設定

アプリ全体でHTMLレンダリングをグローバルに設定できます。これは、すべてのHTMLコンテンツで利用可能にしたいカスタムコンポーネントを定義するのに最適です。

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

### 手動レンダリングと高度なツール

生のHTML文字列をレンダリングしたり、コンポーネントのマッピングをより細かく制御したい場合は、次のツールを使用してください。

<Tabs group="framework">
  <Tab label="React / Next.js">
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
  <Tab label="Vue">
   
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
  <Tab label="Svelte">
  
    #### `<HTMLRenderer />` コンポーネント
   
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

## オプションリファレンス

これらのオプションは `HTMLProvider`、`HTMLRenderer`、`useHTMLRenderer`、および `renderHTML` に渡すことができます。

| オプション   | 型                    | デフォルト | 説明                                                                                             |
| :----------- | :-------------------- | :--------- | :----------------------------------------------------------------------------------------------- |
| `components` | `Record<string, any>` | `{}`       | HTMLタグまたはカスタムコンポーネント名をコンポーネントにマッピングするオブジェクト。             |
| `renderHTML` | `Function`            | `null`     | デフォルトのHTMLパーサを完全に置き換えるカスタムレンダリング関数（Vue/Svelteプロバイダーのみ）。 |

> 注: ReactおよびPreactでは、標準のHTMLタグが自動的に提供されます。これらを上書きしたりカスタムコンポーネントを追加したい場合にのみ、`components`プロップを渡してください。
