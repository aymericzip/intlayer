---
createdAt: 2025-04-18
updatedAt: 2026-05-31
title: "Vite + Svelte i18n - あなたのアプリを翻訳する完全ガイド"
description: "i18nextはもう不要。2026年に多言語（i18n）Vite + Svelteアプリを構築するためのガイド。AIエージェントで翻訳し、バンドルサイズ、SEO、パフォーマンスを最適化します。"
keywords:
  - 国際化
  - ドキュメント
  - Intlayer
  - Vite
  - Svelte
  - JavaScript
slugs:
  - doc
  - environment
  - vite-and-svelte
applicationTemplate: https://github.com/aymericzip/intlayer-vite-svelte-template
applicationShowcase: https://intlayer-vite-svelte-template.vercel.app
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Solid の useIntlayer API の使用法を直接プロパティアクセスに更新"
  - version: 7.5.9
    date: 2025-12-30
    changes: "initコマンドを追加"
  - version: 5.5.11
    date: 2025-11-19
    changes: "ドキュメント更新"
  - version: 5.5.10
    date: 2025-06-29
    changes: "履歴初期化"
author:
  name: Aymeric PINEAU
  github: aymericzip
---

# Intlayer を使って Vite と Svelte のウェブサイトを翻訳する | 国際化（i18n）

<Tabs defaultTab="code">
  <Tab label="コード" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-vite-svelte-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="デモ" value="demo">

<iframe
  src="https://intlayer-vite-svelte-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="デモ - intlayer-vite-svelte-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## 目次

<TOC/>

## 代替手段ではなく Interlayer を使用する理由

「svelte-i18n」や「i18next」などの主要なソリューションと比較して、Intlayer は次のような統合された最適化を備えたソリューションです。

**Svelte を完全にカバー**

Intlayer は、**コンポーネント レベルのコンテンツ スコープ**、**リアクティブ翻訳**、および国際化 (i18n) のスケーリングに必要なすべての機能を提供することで、Svelte と完全に連携するように最適化されています。

**バンドルサイズ**

大量の JSON ファイルをページにロードするのではなく、必要なコンテンツのみをロードします。 Intlayer は、**バンドルとページのサイズを最大 50% 削減**するのに役立ちます。

**保守性**

アプリケーションのコンテンツのスコープを設定すると、大規模なアプリケーションの **メンテナンスが容易になります**。コンテンツ コードベース全体を確認するという精神的な負担を負うことなく、単一の機能フォルダーを複製または削除できます。さらに、Intlayer は**完全に型指定**されており、コンテンツの正確性を保証します。

**AI エージェント**

コンテンツを同じ場所に配置すると、大規模言語モデル (LLM) によって **必要なコンテキストが削減**されます。 Intlayer には、翻訳の欠落をテストする **CLI**、**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**、**[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)** などのツール スイートも付属しています。および **[エージェント スキル](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/agent_skills.md)** により、AI エージェントの開発者エクスペリエンス (DX) がさらにスムーズになります。

**オートメーション**

AI プロバイダーの費用で、選択した LLM を使用して CI/CD パイプラインで自動化を変換します。 Intlayer は、コンテンツ抽出を自動化する **コンパイラー** と、**バックグラウンドでの翻訳**を支援する [Web プラットフォーム](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md) も提供します。

**パフォーマンス**

大量の JSON ファイルをコンポーネントに接続すると、パフォーマンスと反応性の問題が発生する可能性があります。 Intlayer は、ビルド時のコンテンツの読み込みを最適化します。

**非開発によるスケーリング**

Intlayer は単なる i18n ソリューションではなく、**自己ホスト型 [ビジュアル エディター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)** と **[完全な CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)** を提供します。 **リアルタイム**で多言語コンテンツを管理できるようになり、翻訳者、コピーライター、その他のチーム メンバーとのコラボレーションがシームレスになります。コンテンツはローカルおよび/またはリモートに保存できます。

---

## ViteとSvelteアプリケーションでIntlayerをセットアップするステップバイステップガイド

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-vite-react-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Intlayerを使ったアプリケーションの国際化方法"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

GitHubの[アプリケーションテンプレート](https://github.com/aymericzip/intlayer-vite-svelte-template)を参照してください。

<Steps>

<Step number={1} title="依存関係のインストール">

npmを使って必要なパッケージをインストールします：

```bash packageManager="npm"
npm install intlayer svelte-intlayer
npm install vite-intlayer --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer svelte-intlayer
pnpm add vite-intlayer --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer svelte-intlayer
yarn add vite-intlayer --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer svelte-intlayer
bun add vite-intlayer --save-dev
bun x intlayer init
```

- **intlayer**

  設定管理、翻訳、[コンテンツ宣言](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/content_file.md)、トランスパイル、および[CLIコマンド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/index.md)のための国際化ツールを提供するコアパッケージ。

- **svelte-intlayer**
  IntlayerをSvelteアプリケーションと統合するパッケージです。Svelteの国際化のためのコンテキストプロバイダーとフックを提供します。

- **vite-intlayer**
  Intlayerを[Viteバンドラー](https://vite.dev/guide/why.html#why-bundle-for-production)と統合するためのViteプラグイン、およびユーザーの優先ロケール検出、クッキー管理、URLリダイレクト処理のためのミドルウェアを含みます。

</Step>

<Step number={2} title="プロジェクトの設定">

アプリケーションの言語を設定するための設定ファイルを作成します：

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // 他のロケール
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

> この設定ファイルを通じて、ローカライズされたURL、ミドルウェアのリダイレクション、クッキー名、コンテンツ宣言の場所と拡張子、コンソールでのIntlayerログの無効化などを設定できます。利用可能なパラメータの完全なリストについては、[設定ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)を参照してください。

</Step>

<Step number={3} title="Vite設定にIntlayerを統合する">

intlayerプラグインを設定に追加します。

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte(), intlayer()],
});
```

> `intlayer()` Viteプラグインは、IntlayerをViteに統合するために使用されます。これにより、コンテンツ宣言ファイルのビルドが保証され、開発モードでの監視が行われます。また、Viteアプリケーション内でIntlayerの環境変数を定義します。さらに、パフォーマンス最適化のためのエイリアスも提供します。

</Step>

<Step number={4} title="コンテンツの宣言">

翻訳を格納するためのコンテンツ宣言を作成および管理します。

```tsx fileName="src/app.content.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola mundo",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

```json fileName="src/app.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "Hello World",
        "fr": "Bonjour le monde",
        "es": "Hola mundo"
      }
    }
  }
}
```

> コンテンツ宣言は、アプリケーション内のどこにでも定義できます。`contentDir`ディレクトリ（デフォルトは`./src`）に含まれていれば有効です。また、コンテンツ宣言ファイルの拡張子（デフォルトは`.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`）に一致する必要があります。

> 詳細については、[コンテンツ宣言のドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/content_file.md)を参照してください。

</Step>

<Step number={5} title="コード内でIntlayerを利用する">

```svelte fileName="src/App.svelte"
<script>
  import { useIntlayer } from "svelte-intlayer";

  const content = useIntlayer("app");
</script>

<div>


<!-- コンテンツをシンプルにレンダリング -->
<h1>{$content.title}</h1>
<!-- エディターを使って編集可能なコンテンツとしてレンダリング -->
<h1>{@const Title = $content.title}<Title /></h1>
<!-- コンテンツを文字列としてレンダリング -->
<div aria-label={$content.title.value}></div>
<div aria-label={$content.title.toString()}></div>
<div aria-label={String($content.title)}></div>
```

> アプリケーションが既に存在する場合は、[Intlayer コンパイラ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compiler.md) と [抽出コマンド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/extract.md) を組み合わせて、1 秒で何千ものコンポーネントを変換できます。

</Step>

<Step number={6} title="コンテンツの言語を変更する">

```svelte fileName="src/App.svelte"
<script lang="ts">
import  { getLocaleName } from 'intlayer';
import { useLocale } from "svelte-intlayer";

// ロケール情報と setLocale 関数を取得
const { locale, availableLocales, setLocale } = useLocale();

// ロケール変更を処理
const changeLocale = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  const newLocale = target.value;
  setLocale(newLocale);
};
</script>

<div>
  <select value={$locale} on:change={changeLocale}>
    {#each availableLocales ?? [] as loc}
      <option value={loc}>
        {getLocaleName(loc)}
      </option>
    {/each}
  </select>
</div>
```

</Step>

<Step number={7} title="Markdownのレンダリング">

Intlayerは、Markdownコンテンツを直接Svelteアプリケーション内でレンダリングすることをサポートしています。デフォルトでは、Markdownはプレーンテキストとして扱われます。MarkdownをリッチなHTMLに変換するには、`@humanspeak/svelte-markdown`や他のMarkdownパーサーを統合することができます。

> `intlayer`パッケージを使ってMarkdownコンテンツを宣言する方法については、[markdownドキュメント](https://github.com/aymericzip/intlayer/tree/main/docs/docs/ja/dictionary/markdown.md)をご覧ください。

```svelte fileName="src/App.svelte"
<script>
  import { setIntlayerMarkdown } from "svelte-intlayer";

  setIntlayerMarkdown((markdown) =>
   // マークダウンコンテンツを文字列としてレンダリングする
   return markdown;
  );
</script>

<h1>{$content.markdownContent}</h1>
```

> `content.markdownContent.metadata.xxx` プロパティを使って、マークダウンのフロントマターのデータにもアクセスできます。

</Step>

<Step number={8} title="intlayerエディター / CMS のセットアップ">

intlayerエディターをセットアップするには、[intlayerエディターのドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md)に従ってください。

intlayer CMSをセットアップするには、[intlayer CMSのドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md)に従ってください。

</Step>

<Step number={7} title="アプリケーションにローカライズされたルーティングを追加する">

Svelteアプリケーションでローカライズされたルーティングを扱うには、`svelte-spa-router`とIntlayerの`localeFlatMap`を組み合わせて、各ロケールのルートを生成できます。

まず、`svelte-spa-router`をインストールします：

```bash packageManager="npm"
npm install svelte-spa-router
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add svelte-spa-router
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add svelte-spa-router
yarn intlayer init
```

```bash packageManager="bun"
bun add svelte-spa-router
```

次に、ルートを定義するために `Router.svelte` ファイルを作成します：

```svelte fileName="src/Router.svelte"
<script lang="ts">
import { localeFlatMap } from "intlayer";
import Router from "svelte-spa-router";
import { wrap } from "svelte-spa-router/wrap";
import App from "./App.svelte";

const routes = Object.fromEntries(
    localeFlatMap(({locale, urlPrefix}) => [
    [
        urlPrefix || '/',
        wrap({
            component: App as any,
            props: {
                locale,
            },
        }),
    ],
    ])
);
</script>

<Router {routes} />
```

`main.ts` を更新して、`App` の代わりに `Router` コンポーネントをマウントします：

```typescript fileName="src/main.ts"
import { mount } from "svelte";
import Router from "./Router.svelte";

const app = mount(Router, {
typescript fileName="src/main.ts"
import { mount } from "svelte";
import Router from "./Router.svelte";

const app = mount(Router, {
  target: document.getElementById("app")!, // アプリのマウント先のDOM要素
});

export default app;
```

最後に、`App.svelte` を更新して `locale` プロパティを受け取り、`useIntlayer` と共に使用します:

```svelte fileName="src/App.svelte"
<script lang="ts">
import type { Locale } from 'intlayer';
import { useIntlayer } from "svelte-intlayer";
import Counter from './lib/Counter.svelte';
import LocaleSwitcher from './lib/LocaleSwitcher.svelte';

export let locale: Locale; // ロケールを受け取る

$: content = useIntlayer('app', locale); // ロケールに基づくコンテンツを取得
</script>

<main>
  <div class="locale-switcher-container">
    <LocaleSwitcher currentLocale={locale} /> <!-- 現在のロケールを渡す -->
  </div>

  <!-- ... アプリの残りの部分 ... -->
</main>
```

#### サーバーサイドルーティングの設定（オプション）

並行して、`intlayerProxy` を使用してアプリケーションにサーバーサイドルーティングを追加することもできます。このプラグインは、URL に基づいて現在のロケールを自動的に検出し、適切なロケールクッキーを設定します。ロケールが指定されていない場合、プラグインはユーザーのブラウザの言語設定に基づいて最適なロケールを判断します。ロケールが検出されない場合は、デフォルトのロケールにリダイレクトします。

> `intlayerProxy` を本番環境で使用するには、`vite-intlayer` パッケージを `devDependencies` から `dependencies` に切り替える必要があることに注意してください。

```typescript {3,7} fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { intlayer, intlayerProxy } from "vite-intlayer";

typescript {3,7} fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { intlayer, intlayerProxy } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [intlayerProxy(), // should be placed first
 svelte(), intlayer()],
});
```

</Step>

<Step number={8} title="ロケールが変更されたときにURLを変更する">

ユーザーが言語を切り替え、URLをそれに応じて更新できるようにするために、`LocaleSwitcher` コンポーネントを作成できます。このコンポーネントは `intlayer` の `getLocalizedUrl` と `svelte-spa-router` の `push` を使用します。

```svelte fileName="src/lib/LocaleSwitcher.svelte"
<script lang="ts">
import { getLocaleName, getLocalizedUrl } from "intlayer";
import { useLocale } from "svelte-intlayer";
import { push } from "svelte-spa-router";

export let currentLocale: string | undefined = undefined;

// ロケール情報を取得
const { locale, availableLocales } = useLocale();

// ロケール変更を処理
const changeLocale = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  const newLocale = target.value;
  const currentUrl = window.location.pathname;
  const url = getLocalizedUrl( currentUrl, newLocale);
  push(url);
};
</script>

<div class="locale-switcher">
  <select value={currentLocale ?? $locale} onchange={changeLocale}>
    {#each availableLocales ?? [] as loc}
      <option value={loc}>
        {getLocaleName(loc)}
      </option>
    {/each}
  </select>
</div>
```

</Step>

<Step number={1} title="コンポーネントのコンテンツを抽出する" isOptional={true}>

既存のコードベースがある場合、数千のファイルを変換するのは時間がかかることがあります。

このプロセスを容易にするために、Intlayerは、コンポーネントを変換しコンテンツを抽出するための [コンパイラ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compiler.md) / [エクストラクタ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/extract.md) を提案しています。

セットアップするには、`intlayer.config.ts` ファイルに `compiler` セクションを追加します。

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... 他の構成
  compiler: {
    /**
     * コンパイラを有効にするかどうかを指定します。
     */
    enabled: true,

    /**
     * 出力ファイルのパスを定義します。
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * 変換後にコンポーネントを保存するかどうかを指定します。これにより、コンパイラを一度だけ実行してアプリを変換し、その後削除することができます。
     */
    saveComponents: false,

    /**
     * 辞書キーの接頭辞
     */
    dictionaryKeyPrefix: "",
  },
};

export default config;
```

<Tabs>
 <Tab value='抽出コマンド'>

コンポーネントを変換してコンテンツを抽出するためにエクストラクタを実行します

```bash packageManager="npm"
npx intlayer extract
```

```bash packageManager="pnpm"
pnpm intlayer extract
```

```bash packageManager="yarn"
yarn intlayer extract
```

```bash packageManager="bun"
bun x intlayer extract
```

 </Tab>
 <Tab value='Babelコンパイラ'>

`vite.config.ts` を更新して `intlayerCompiler` プラグインを含めます。

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer, intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer(),
    intlayerCompiler(), // コンパイラプラグインを追加します
  ],
});
```

```bash packageManager="npm"
npm run build # または npm run dev
```

```bash packageManager="pnpm"
pnpm run build # または pnpm run dev
```

```bash packageManager="yarn"
yarn build # または yarn dev
```

```bash packageManager="bun"
bun run build # Or bun run dev
```

 </Tab>
</Tabs>
</Step>

</Steps>

### Git 設定

Intlayer によって生成されたファイルは無視することを推奨します。これにより、Git リポジトリへの不要なコミットを避けることができます。

これを行うには、`.gitignore` ファイルに以下の指示を追加してください：

```bash
#  Intlayer によって生成されたファイルを無視する
.intlayer
```

### VS Code 拡張機能

Intlayerでの開発体験を向上させるために、公式の**Intlayer VS Code拡張機能**をインストールできます。

[VS Codeマーケットプレイスからインストール](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

この拡張機能は以下を提供します：

- 翻訳キーの**オートコンプリート**。
- 欠落している翻訳の**リアルタイムエラー検出**。
- 翻訳されたコンテンツの**インラインプレビュー**。
- 翻訳を簡単に作成・更新できる**クイックアクション**。

拡張機能の使い方の詳細については、[Intlayer VS Code拡張機能のドキュメント](https://intlayer.org/doc/vs-code-extension)を参照してください。

---

### （任意）サイトマップと robots.txt（ビルド時生成）

Intlayer は `generateSitemap` と `getMultilingualUrls` により、クローラ向けに整形した多言語の `sitemap.xml` と `robots.txt` を `public/` に自動で書き出せます。通常は Vite より**前**に小さな Node スクリプトを走らせます（例: npm の `predev` / `prebuild`）。

#### サイトマップ

Intlayer のサイトマップ生成はロケール設定を踏まえ、クローラ向けのメタデータを含めます。

> 生成されるサイトマップは `xhtml:link`（hreflang）をサポートします。単純な URL 列挙ではなく、各ページの言語版同士を双方向で結びます（例: `/about`、`/fr/about`、`/about?lang=fr` などルーティングに依存）。

#### Robots.txt

`getMultilingualUrls` で `Disallow` を、機微パスの**すべての言語 URL**に効かせます。

#### 1. プロジェクトルートに `generate-seo.mjs` を置く

```javascript fileName="generate-seo.mjs"
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { generateSitemap, getMultilingualUrls } from "intlayer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SITE_URL = (process.env.SITE_URL || "http://localhost:5173").replace(
  /\/$/,
  ""
);

const pathList = [
  { path: "/", changefreq: "daily", priority: 1.0 },
  { path: "/about", changefreq: "monthly", priority: 0.7 },
];

const sitemapXml = generateSitemap(pathList, { siteUrl: SITE_URL });
fs.writeFileSync(path.join(__dirname, "public", "sitemap.xml"), sitemapXml);

const getAllMultilingualUrls = (urls) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)));

const disallowedPaths = getAllMultilingualUrls(["/admin", "/private"]);

const robotsTxt = [
  "User-agent: *",
  "Allow: /",
  ...disallowedPaths.map((path) => `Disallow: ${path}`),
  "",
  `Sitemap: ${SITE_URL}/sitemap.xml`,
].join("\n");

fs.writeFileSync(path.join(__dirname, "public", "robots.txt"), robotsTxt);

console.log("SEO files generated successfully.");
```

`intlayer` がインストールされている必要があります。本番では環境変数 `SITE_URL` を設定してください（CI など）。

> Node の ESM では `generate-seo.mjs` を推奨します。`generate-seo.js` にする場合は `package.json` の `"type": "module"` などで ESM を有効にしてください。

#### 2. Vite より前にスクリプトを実行する

```json fileName="package.json"
{
  "scripts": {
    "dev": "vite",
    "prebuild": "node generate-seo.mjs",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

pnpm や yarn を使う場合はコマンドを読み替えてください。CI から呼び出しても構いません。

### さらに進む

さらに進めるために、[ビジュアルエディター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md)を実装するか、[CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md)を使用してコンテンツを外部化することができます。
