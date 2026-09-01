---
createdAt: 2025-04-18
updatedAt: 2026-08-30
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
author: aymericzip
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

<AccordionGroup>
<Accordion header="Full Svelte coverage">

Intlayer は、**コンポーネント レベルのコンテンツ スコープ**、**リアクティブ翻訳**、および国際化 (i18n) のスケーリングに必要なすべての機能を提供することで、Svelte と完全に連携するように最適化されています。

</Accordion>

<Accordion header="Bundle size">

大量の JSON ファイルをページにロードするのではなく、必要なコンテンツのみをロードします。 Intlayer は、**バンドルとページのサイズを最大 50% 削減**するのに役立ちます。

</Accordion>

<Accordion header="保守性">

アプリケーションのコンテンツのスコープを設定すると、大規模なアプリケーションの **メンテナンスが容易になります**。コンテンツ コードベース全体を確認するという精神的な負担を負うことなく、単一の機能フォルダーを複製または削除できます。さらに、Intlayer は**完全に型指定**されており、コンテンツの正確性を保証します。

</Accordion>

<Accordion header="AI Agent">

コンテンツを同じ場所に配置すると、大規模言語モデル (LLM) によって **必要なコンテキストが削減**されます。 Intlayer には、翻訳の欠落をテストする **CLI**、**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**、**[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)** などのツール スイートも付属しています。および **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/agent_skills.md)** により、AI エージェントの開発者エクスペリエンス (DX) がさらにスムーズになります。

</Accordion>

<Accordion header="オートメーション">

AI プロバイダーの費用で、選択した LLM を使用して CI/CD パイプラインで自動化を変換します。 Intlayer は、コンテンツ抽出を自動化する **コンパイラー** と、**バックグラウンドでの翻訳**を支援する [Web プラットフォーム](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md) も提供します。

</Accordion>

<Accordion header="パフォーマンス">

大量の JSON ファイルをコンポーネントに接続すると、パフォーマンスと反応性の問題が発生する可能性があります。 Intlayer は、ビルド時のコンテンツの読み込みを最適化します。

</Accordion>

<Accordion header="none-dev でのスケーリング">

Intlayer は単なる i18n ソリューションではなく、**自己ホスト型 [ビジュアル エディター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)** と **[完全な CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)** を提供します。 **リアルタイム**で多言語コンテンツを管理できるようになり、翻訳者、コピーライター、その他のチーム メンバーとのコラボレーションがシームレスになります。コンテンツはローカルおよび/またはリモートに保存できます。

</Accordion>
</AccordionGroup>

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
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer@canary init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer@canary init --interactive
```

```bash packageManager="bun"
bunx intlayer@canary init --interactive
```

> `--interactive` フラグはオプションです。AI エージェントの場合は `intlayer-cli init` を使用してください。

> このコマンドは環境を検出し、必要なパッケージをインストールします。例えば：

```bash packageManager="npm"
npm install intlayer svelte-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer svelte-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer svelte-intlayer
yarn add vite-intlayer --save-dev
```

```bash packageManager="bun"
bun add intlayer svelte-intlayer
bun add vite-intlayer --save-dev
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

> Intlayer v9 以降、`intlayerProxy()` は `intlayer()` プラグインに直接バンドルされており、`routing.enableProxy` オプション（デフォルトで `true`）で有効になっています。以下のように個別に登録することはオプションになりました — これは下位互換性と、プラグインの順序を制御する必要があるセットアップのために保持されています。`routing.enableProxy: false` に設定してオプトアウトできます。[v9 リリースノート](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/releases/v9.md)を参照してください。

```typescript {3,7} fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { intlayer } from "vite-intlayer";

typescript {3,7} fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { intlayer } from "vite-intlayer";

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

<Step number={9} title="国際化されたリンク" isOptional={true}>

SEO のために、ルートをロケール接頭辞を付けることをお勧めします (例: `/about`, `/fr/about`)。

```svelte fileName="src/lib/components/Link.svelte"
<script lang="ts">
  import { getLocalizedUrl } from "intlayer";
  import { useLocale } from "svelte-intlayer";

  export let href = "";
  const { locale } = useLocale();

  // URLにプレフィックスを付けるヘルパー
  $: localizedHref = getLocalizedUrl(href, $locale);
</script>

<a href={localizedHref}>
  <slot />
</a>
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

> Since v9, the `intlayerCompiler` is included in the `intlayer` plugin. So you don't need to add it manually.

`vite.config.ts` を更新して `intlayerCompiler` プラグインを含めます。

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer, intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer(),
    intlayerCompiler(), // Adds the compiler plugin
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

Intlayer によって生成されたファイルを無視することをお勧めします。これにより、Git リポジトリにコミットすることを避けられます。

さらに進めるために、[ビジュアルエディター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md)を実装するか、[CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md)を使用してコンテンツを外部化することができます。

```bash
# Intlayerで生成されたファイルを無視する
.intlayer
```

### Git 設定

Intlayerの開発体験を向上させるために、公式の**Intlayer VS Code Extension**をインストールできます。

Intlayer によって生成されたファイルは無視することを推奨します。これにより、Git リポジトリへの不要なコミットを避けることができます。

これを行うには、`.gitignore` ファイルに以下の指示を追加してください：

```bash
#  Intlayer によって生成されたファイルを無視する
.intlayer
```

拡張機能の使用方法の詳細については、[Intlayer VS Code Extension ドキュメント](https://intlayer.org/doc/vs-code-extension)を参照してください。

---

### VS Code 拡張機能

拡張機能の使い方の詳細については、[Intlayer VS Code拡張機能のドキュメント](https://intlayer.org/doc/vs-code-extension)を参照してください。

## よくある質問

<FAQ>

<Question title="Vite と Svelte アプリを国際化するために利用可能なソリューションにはどのようなものがありますか？">

Vite は i18n に対して特定の意見を持たないため、選択は Svelte エコシステムから来ます：

- **`svelte-i18n`** と **`typesafe-i18n`**：グローバルに登録されたストアベースのメッセージカタログ。
- **`Paraglide`**：コンパイルされたメッセージ、メッセージレイヤーのみに焦点を当てています。
- **`Intlayer`**：最も高度なソリューション。コードベースのどこにでもコンテンツを宣言でき（[各コンポーネントの隣またはセントラライズ](https://intlayer.org/blog/per-component-vs-centralized-i18n)）、ビルド時に Vite プラグインでコンパイルされ、完全に型付けされ、AI 翻訳、ビジュアルエディタ、CMS を備えています。

Vite 固有の利点は、翻訳が実行時に JSON として取得されるのではなく、コンパイル時に解決され tree shaken されるため、ページはレンダリングするエントリのみを配信します。[Intlayer を選ぶ理由](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/interest_of_intlayer.md)と[ベンチマーク](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/benchmark/index.md)を参照してください。

</Question>

<Question title="i18n は Svelte bundle サイズにどの程度追加されますか？">

namespace ベースのセットアップよりもはるかに少なくなります。ページはレンダリングしないカタログをダウンロードしないためです。ビルド時コンパイラは `useIntlayer` 呼び出しをコンポーネントが使用する正確な辞書エントリに置き換えるため、未使用のキーと未使用の言語は削除され、[動的辞書](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dynamic_dictionaries/index.md)は残りをロケールごとに分割します。通常の代替案と比較して測定すると、Intlayer は bundle とページサイズを最大 50% 削減します。[bundle 最適化](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/bundle_optimization.md)と[ベンチマーク](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/benchmark/svelte.md)を参照してください。

</Question>

<Question title="`svelte-i18n` または `typesafe-i18n` からコンポーネントを書き直さずに移行できますか？">

ほぼ可能です。[Svelte I18n 移行ガイド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compat/svelte-i18n.md)に従ってコンテンツを移動してください。段階的に移行することもできます：[sync JSON プラグイン](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/plugins/sync-json.md)は既存の JSON カタログをソースの真実として保ち、それらから Intlayer 辞書を生成するため、両方のレイヤーは同期を保ったまま、コンポーネントを一度に 1 つずつ移動できます。

</Question>

<Question title="既存の JSON 翻訳ファイルを保持できますか？">

はい。[sync JSON プラグイン](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/plugins/sync-json.md)は `/messages/{locale}/{namespace}.json` ファイルをソースの真実として保ち、双方向で Intlayer 辞書を生成します。[sync PO プラグイン](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/plugins/sync-po.md)は gettext カタログに対して同じことを行い、[ロケールごとのファイル](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/per_locale_file.md)では 1 つのファイルにロケールをグループ化する代わりに言語ごとにコンテンツを分割できます。

</Question>

<Question title="コンテンツをキーごとに移動する必要がありますか？">

いいえ。`npx intlayer extract` を実行すると、Intlayer はコンポーネントを読み込み、ユーザーに見える文字列を抽出し、各コンポーネントの隣に `.content` ファイルを書き込むため、文字列をカタログに 1 つずつコピーする代わりに diff をレビューします。このガイドのステップ 10 でそれを説明しています。

完全に自動化されたパイプラインの場合、[Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compiler.md)はビルド時に同じことを行います：変更のたびに JSX、TSX、Vue、Svelte ソースをスキャンし、辞書を生成し、hot module replacement を通じてそれらを同期させるため、手動で保守するキーはまったくありません。

コンパイラをオンにする前に知っておく価値のある 2 つの制限があります。静的分析によって機能するため、API エラーコードや CMS フィールドなど、実行時にのみ存在する文字列は到達不可能なままです。また、`className="active"` やステータスコードなどのアプリケーションロジックからユーザーに見える文字列を区別する必要があり、大規模なコードベースではいくつかのアノテーションが必要です。[extract コマンド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/extract.md)はあなたをループに保つことで両方を回避します。

</Question>

<Question title="利用可能なエディタと AI エージェントツールは何ですか？">

5 つのツール、すべてオプションです：

- **[VS Code 拡張機能](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/vs_code_extension.md)**：`useIntlayer` キーからそれを宣言するコンテンツファイルにジャンプし、コンポーネントからコンテンツを抽出し、コマンドパレットまたは専用の Intlayer タブからビルド、fill、test、push、pull を実行します。
- **[LSP サーバー](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/lsp.md)**：LSP を話す任意のエディタで同じ認識を持ち、定義へのジャンプ、すべての参照を検索、翻訳値のホバープレビュー、キーとフィールドのオートコンプリーション、キーがどこにも宣言されていない場合の警告があります。また、`i18next`、`react-i18next`、`next-intl`、`use-intl` 呼び出しを解決し、移行中に役立ちます。
- **[MCP サーバー](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/mcp_server.md)**：Intlayer ドキュメントと CLI を Cursor、VS Code、Claude Desktop、Claude Code、ChatGPT に公開するため、アシスタントは推測する代わりに現在のドキュメントから回答でき、`intlayer fill` などのコマンドを自分で実行できます。
- **[エージェントスキル](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/agent_skills.md)**：`intlayer-config`、`intlayer-cli`、`intlayer-content` などの焦点を絞ったスキル、およびフレームワークごとに 1 つ、エージェントにルーティング設定とコンテンツノードタイプを教えます。
- **[ESLint プラグイン](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/eslint.md)**：`no-raw-text` はハードコードされた文字列にフラグを立て、静的辞書キーと未使用コンテンツのさらなるルールがあります。

</Question>

<Question title="Svelte コンポーネントで翻訳されたコンテンツを使用するにはどうすればよいですか？">

コンポーネントで `useIntlayer` を呼び出し、返されたコンテンツを読み込みます。値はリアクティブなため、ロケールを変更するとページをリロードせずにそれを使用するコンポーネントを再レンダリングします。ステップ 5 はコンポーネントを示し、ステップ 7 は Markdown と HTML コンテンツのレンダリングをカバーしています。

</Question>

<Question title="Intlayer は Vite dev サーバーと hot reload で機能しますか？">

はい。`intlayer()` Vite プラグインは `.content.ts` ファイルを監視し、保存時に影響を受けた辞書を再構築するため、dev サーバーを再起動せずに編集が表示され、生成された型は同時に再生成されるため、オートコンプリーションは同期を保ちます。

</Question>

<Question title="ローカライズされたルーティングをセットアップするにはどうすればよいですか？">

ステップ 7 と 8 はローカライズされたルートと、ロケール変更時の URL 書き換えをカバーし、ステップ 9 は国際化されたリンクをカバーしています。`routing.mode` は URL スキームを決定します：`"prefix-no-default"`（デフォルト、`/about` と `/fr/about`）、`"prefix-all"`、`"no-prefix"`（cookie、header、またはドメインから解決）、または `"search-params"`（`/about?locale=fr`）。[設定リファレンス](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)を参照してください。

</Question>

<Question title="アラビア語やヘブライ語などの右から左への言語をサポートするにはどうすればよいですか？">

ステップ 9 でカバーしています。`getHTMLTextDir` はロケールに対して `ltr`、`rtl`、または `auto` を返すため、アクティブなロケールからルート要素に `lang` と `dir` をバインドし、CSS 論理プロパティに残りを処理させます。

</Question>

<Question title="クライアントレンダリングされた Vite アプリで SEO メタデータを処理するにはどうすればよいですか？">

アクティブなロケールからの `html` 要素に `lang` と `dir` を設定し、`getMultilingualUrls` で宣言されたすべてのロケールに対して `hreflang` 代替を発行します（`x-default` を含む）。確実にクロールする必要があるページについては、事前レンダリングまたはサーバーレンダリングセットアップを優先してください。

</Question>

<Question title="AI でアプリを自動的に翻訳するにはどうすればよいですか？">

`npx intlayer fill` を実行します。選択した LLM を使用して、独自のプロバイダーと API キーを使用して欠落している翻訳を入力し、`--git-diff` は実行をブランチで変更されたコンテンツに制限します。[fill コマンド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/fill.md)と [CI/CD 統合](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/CI_CD.md)を参照してください。

</Question>

<Question title="Intlayer は複数形、性別、リッチテキストをサポートしていますか？">

はい：[複数形](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/plurial.md)、[性別ベースのコンテンツ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/gender.md)、条件、[挿入](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/insertion.md)、[Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/markdown.md)、および数値、日付、通貨の[フォーマッター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/formatters.md)。

</Question>

<Question title="翻訳者がコードに触れずにコンテンツを編集するにはどうすればよいですか？">

[ビジュアルエディタ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md)を通じて、独自のインフラストラクチャで実行され、誰もが実行中のアプリでテキストをその場で編集できます。または、[CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md)を通じて、コンテンツを外部化して、デプロイメントなしに変更できます。

</Question>

<Question title="Intlayer は無料でオープンソースですか？">

はい、Apache 2.0 ライセンスの下で、商用利用を含みます。ホストされた CMS はオプションの有料サービスで、[自己ホスト](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/self_hosting.md)も可能です。

</Question>

</FAQ>
