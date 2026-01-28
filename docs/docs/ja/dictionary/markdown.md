---
createdAt: 2025-02-07
updatedAt: 2026-01-22
title: Markdown
description: Intlayerを使用して多言語ウェブサイトにMarkdownコンテンツを宣言および使用する方法を学びます。このオンラインドキュメントの手順に従って、プロジェクトにMarkdownを簡単に統合しましょう。
keywords:
  - Markdown
  - 国際化
  - 文書
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
    changes: MarkdownRenderer / useMarkdownRenderer / renderMarkdown ユーティリティと forceInline オプションを追加
  - version: 8.0.0
    date: 2026-01-18
    changes: マークダウンコンテンツの自動装飾、MDXおよびSSRサポート
  - version: 5.5.10
    date: 2025-06-29
    changes: 履歴の初期化
---

# マークダウン / リッチテキストコンテンツ

Intlayerは、マークダウン構文を使用して定義されたリッチテキストコンテンツをサポートします。これにより、ブログや記事などのリッチなフォーマットを簡単に作成および管理できます。

## パート 1: マークダウンコンテンツの宣言

マークダウンコンテンツは `md` 関数を使って宣言するか、単に文字列として（マークダウン構文が含まれている場合）定義できます。

<Tabs>
  <Tab label="手動ラッピング" value="manual-wrapping">
    `md` 関数を使用して明示的にマークダウンコンテンツを宣言します。これは、明らかな構文が含まれていない場合でも文字列をマークダウンとして扱いたい場合に便利です。

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
  <Tab label="自動検出" value="automatic-detection">
    文字列に一般的なマークダウン指標（ヘッダー、リスト、リンクなど）が含まれている場合、Intlayerは自動的にそれを変換します。

    ```typescript fileName="markdownDictionary.content.ts"
    export default {
      key: "app",
      contentAutoTransformation: true, // マークダウンコンテンツの自動検出を有効にする - intlayer.config.ts でグローバルに設定可能
      content: {
        myMarkdownContent: "## My title \n\nLorem Ipsum",
      },
    };
    ```

  </Tab>
  <Tab label="外部ファイル" value="external-files">
    `file` 関数を使用して `.md` ファイルを直接インポートします。

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

## パート 2: マークダウンのレンダリング

レンダリングは Intlayer のコンテンツシステムで自動的に処理することも、専用のツールを使って手動で処理することもできます。

### 1. 自動レンダリング（`useIntlayer` を使用）

`useIntlayer` 経由でコンテンツにアクセスすると、マークダウンノードは既にレンダリング可能な状態になっています。

<Tabs group="framework">
  <Tab label="React / Next.js" value="react">
    マークダウンノードはそのまま JSX としてレンダリングできます。

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "react-intlayer";

    const AppContent = () => {
      const { myMarkdownContent } = useIntlayer("app");
      return <div>{myMarkdownContent}</div>;
    };
    ```

    `.use()` メソッドを使用して特定のノードに対してローカルなオーバーライドを提供することもできます:

    ```tsx
    {myMarkdownContent.use({
      h1: ({ children }) => <h1 className="text-3xl font-bold">{children}</h1>,
    })}
    ```

  </Tab>
  <Tab label="Vue" value="vue">
    Vueでは、マークダウンコンテンツを組み込みの `component` を使って、または直接ノードとしてレンダリングできます。

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
  <Tab label="Svelte" value="svelte">
    SvelteはデフォルトでマークダウンをHTML文字列としてレンダリングします。`{@html}` を使ってレンダリングしてください。

    ```svelte
    <script lang="ts">
    import { useIntlayer } from "svelte-intlayer";
    const content = useIntlayer("app");
    </script>

    {@html $content.myMarkdownContent}
    ```

  </Tab>
  <Tab label="Preact" value="preact">
    PreactはJSXでマークダウンノードを直接サポートします。

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "preact-intlayer";

    const AppContent = () => {
      const { myMarkdownContent } = useIntlayer("app");
      return <div>{myMarkdownContent}</div>;
    };
    ```

  </Tab>
  <Tab label="Solid" value="solid">
    SolidはJSXでマークダウンノードを直接サポートします。

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "solid-intlayer";

    const AppContent = () => {
      const { myMarkdownContent } = useIntlayer("app");
      return <div>{myMarkdownContent}</div>;
    };
    ```

  </Tab>
  <Tab label="Angular" value="angular">
    Angularは `[innerHTML]` ディレクティブを使用してマークダウンコンテンツをレンダリングします。

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

    `.use()` メソッドを使用して特定のノードに対してローカルなオーバーライドを提供することもできます:

    ```typescript
    content().myMarkdownContent.use({
      h1: { class: "text-3xl font-bold" },
    })
    ```

  </Tab>
</Tabs>

### 2. 手動レンダリングと高度なツール

生のマークダウン文字列をレンダリングしたり、レンダリングプロセスをより詳細に制御したい場合は、次のツールを使用してください。

<Tabs group="framework">
  <Tab label="React / Next.js" value="react">
  
    #### `<MarkdownRenderer />` コンポーネント

    特定のオプションでマークダウン文字列をレンダリングします。

    ```tsx
    import { MarkdownRenderer } from "react-intlayer";

    <MarkdownRenderer forceBlock={true} tagfilter={true}>
      {"# My Title"}
    </MarkdownRenderer>
    ```

    #### `useMarkdownRenderer()` フック

    事前設定されたレンダラー関数を取得します。

    ```tsx
    import { useMarkdownRenderer } from "react-intlayer";

    const renderMarkdown = useMarkdownRenderer({
      forceBlock: true,
      components: { h1: (props) => <h1 {...props} className="custom" /> }
    });

    return renderMarkdown("# My Title");
    ```

    #### `renderMarkdown()` ユーティリティ
    コンポーネント外でのレンダリングのためのスタンドアロンユーティリティ。

    ```tsx
    import { renderMarkdown } from "react-intlayer";

    const jsx = renderMarkdown("# My Title", { forceBlock: true });
    ```

  </Tab>
  <Tab label="Vue" value="vue">

    #### `<MarkdownRenderer />` コンポーネント

    ```vue
    <script setup>
    import { MarkdownRenderer } from "vue-intlayer";
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
    import { MarkdownRenderer } from "svelte-intlayer";
    </script>

    <MarkdownRenderer forceBlock={true} value="# My Title" />
    ```

    #### `useMarkdownRenderer()` フック

    ```svelte
    <script lang="ts">
    import { useMarkdownRenderer } from "svelte-intlayer";
    const render = useMarkdownRenderer();
    </script>

    {@html render("# My Title")}
    ```

    #### `renderMarkdown()` ユーティリティ

    ```svelte
    <script lang="ts">
    import { renderMarkdown } from "svelte-intlayer";
    </script>

    {@html renderMarkdown("# My Title")}
    ```

  </Tab>
  <Tab label="Preact" value="preact">
    #### `<MarkdownRenderer />` コンポーネント

    ```tsx
    import { MarkdownRenderer } from "preact-intlayer";

    <MarkdownRenderer forceBlock={true}>
      {"# My Title"}
    </MarkdownRenderer>
    ```

    #### `useMarkdownRenderer()` フック

    ```tsx
    import { useMarkdownRenderer } from "preact-intlayer";

    const render = useMarkdownRenderer();

    return <div>{render("# My Title")}</div>;
    ```

    #### `renderMarkdown()` ユーティリティ

    ```tsx
    import { renderMarkdown } from "preact-intlayer";

    return <div>{renderMarkdown("# My Title")}</div>;
    ```

  </Tab>
  <Tab label="Solid" value="solid">
    #### `<MarkdownRenderer />` コンポーネント

    ```tsx
    import { MarkdownRenderer } from "solid-intlayer";

    <MarkdownRenderer forceBlock={true}>
      {"# My Title"}
    </MarkdownRenderer>
    ```

    #### `useMarkdownRenderer()` フック

    ```tsx
    import { useMarkdownRenderer } from "solid-intlayer";

    const render = useMarkdownRenderer();

    return <div>{render("# My Title")}</div>;
    ```

    #### `renderMarkdown()` ユーティリティ

    ```tsx
    import { renderMarkdown } from "solid-intlayer";

    return <div>{renderMarkdown("# My Title")}</div>;
    ```

  </Tab>
  <Tab label="Angular" value="angular">
    #### `IntlayerMarkdownService` サービス
    サービスを使用してマークダウン文字列をレンダリングします。

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

## `MarkdownProvider` によるグローバル設定

アプリ全体でマークダウンレンダリングをグローバルに設定できます。これにより、すべてのレンダラーに同じプロップを渡す手間が省けます。

<Tabs group="framework">
  <Tab label="React / Next.js" value="react">

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
  <Tab label="Vue" value="vue">

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
  <Tab label="Svelte" value="svelte">

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
  <Tab label="Preact" value="preact">

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
  <Tab label="Solid" value="solid">

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
  <Tab label="Angular" value="angular">

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

## オプションリファレンス

これらのオプションは `MarkdownProvider`、`MarkdownRenderer`、`useMarkdownRenderer`、および `renderMarkdown` に渡すことができます。

| オプション            | 型          | デフォルト | 説明                                                                                |
| :-------------------- | :---------- | :--------- | :---------------------------------------------------------------------------------- |
| `forceBlock`          | `boolean`   | `false`    | 出力をブロックレベル要素（例: `<div>`）でラップすることを強制します。               |
| `forceInline`         | `boolean`   | `false`    | 出力をインライン要素（例: `<span>`）でラップすることを強制します。                  |
| `tagfilter`           | `boolean`   | `true`     | 危険なHTMLタグを除去してセキュリティを向上させる GitHub Tag Filter を有効にします。 |
| `preserveFrontmatter` | `boolean`   | `false`    | `true` の場合、マークダウン文字列の冒頭にあるフロントマターが除去されません。       |
| `components`          | `Overrides` | `{}`       | HTMLタグからカスタムコンポーネントへのマッピング（例: `{ h1: MyHeading }`）。       |
| `wrapper`             | `Component` | `null`     | レンダリングされたマークダウンをラップするためのカスタムコンポーネント。            |
| `renderMarkdown`      | `Function`  | `null`     | デフォルトのマークダウンコンパイラを完全に置き換えるカスタムレンダリング関数。      |
