---
createdAt: 2025-04-18
updatedAt: 2025-11-19
title: Vite と Svelte アプリの翻訳方法 – i18n ガイド 2025
description: Vite と Svelte のウェブサイトを多言語対応にする方法を紹介します。国際化（i18n）と翻訳のドキュメントに従ってください。
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
history:
  - version: 5.5.11
    date: 2025-11-19
    changes: ドキュメント更新
  - version: 5.5.10
    date: 2025-06-29
    changes: 履歴初期化
---

# Intlayer を使って Vite と Svelte のウェブサイトを翻訳する | 国際化（i18n）

> このパッケージは開発中です。詳細は[issue](https://github.com/aymericzip/intlayer/issues/114)をご覧ください。Svelte向けIntlayerに関心がある場合は、issueに「いいね」をして応援してください。

## 目次

<TOC/>

## Intlayerとは？

**Intlayer**は、最新のウェブアプリケーションにおける多言語対応を簡素化するために設計された革新的なオープンソースの国際化（i18n）ライブラリです。

Intlayerを使うことで、以下が可能になります：

- **コンポーネントレベルで宣言的な辞書を使い、翻訳を簡単に管理**できます。
- **メタデータ、ルート、コンテンツを動的にローカライズ**できます。
- **自動生成される型によりTypeScriptのサポートを確保し、オートコンプリートやエラー検出を向上**させます。
- **動的なロケール検出や切り替えなどの高度な機能**を利用できます。

---

## ViteとSvelteアプリケーションでIntlayerをセットアップするステップバイステップガイド

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-vite-react-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Intlayerを使ったアプリケーションの国際化方法"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

GitHubの[アプリケーションテンプレート](https://github.com/aymericzip/intlayer-vite-svelte-template)を参照してください。

### ステップ1: 依存関係のインストール

npmを使って必要なパッケージをインストールします：

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

  設定管理、翻訳、[コンテンツ宣言](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/content_file.md)、トランスパイル、および[CLIコマンド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_cli.md)のための国際化ツールを提供するコアパッケージ。

- **svelte-intlayer**
  IntlayerをSvelteアプリケーションと統合するパッケージです。Svelteの国際化のためのコンテキストプロバイダーとフックを提供します。

- **vite-intlayer**
  Intlayerを[Viteバンドラー](https://vite.dev/guide/why.html#why-bundle-for-production)と統合するためのViteプラグイン、およびユーザーの優先ロケール検出、クッキー管理、URLリダイレクト処理のためのミドルウェアを含みます。

### ステップ2: プロジェクトの設定

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

### ステップ3: Vite設定にIntlayerを統合する

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

### ステップ4: コンテンツの宣言

翻訳を格納するためのコンテンツ宣言を作成および管理します。

```tsx fileName="src/app.content.tsx" contentDeclarationFormat="typescript"
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

```javascript fileName="src/app.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
// アプリケーションのコンテンツ宣言
const appContent = {
  key: "app",
  content: {
    title: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola mundo",
    }),
  },
};

export default appContent;
```

```javascript fileName="src/app.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
// アプリケーションのコンテンツ宣言
const appContent = {
  key: "app",
  content: {
    title: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola mundo",
    }),
  },
};

module.exports = appContent;
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

> コンテンツ宣言は、アプリケーション内のどこにでも定義できます。`contentDir`ディレクトリ（デフォルトは`./src`）に含まれていれば有効です。また、コンテンツ宣言ファイルの拡張子（デフォルトは`.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`）に一致する必要があります。

> 詳細については、[コンテンツ宣言のドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/content_file.md)を参照してください。

### ステップ5: コード内でIntlayerを利用する

```svelte fileName="src/App.svelte"
<script>
  import { useIntlayer } from "svelte-intlayer";

  const content = useIntlayer("app");
</script>

<div>


<!-- コンテンツをシンプルにレンダリング -->
<h1>{$content.title}</h1>
<!-- エディターを使って編集可能なコンテンツとしてレンダリング -->
<h1><svelte:component this={$content.title} /></h1>
<!-- コンテンツを文字列としてレンダリング -->
<div aria-label={$content.title.value}></div>
```

### （オプション）ステップ6: コンテンツの言語を変更する

```svelte fileName="src/App.svelte"
<script lang="ts">
import  { getLocaleName } from 'intlayer';
import { useLocale } from 'svelte-intlayer';

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

### （オプション）ステップ7：Markdownのレンダリング

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

### （オプション）ステップ8: intlayerエディター / CMS のセットアップ

intlayerエディターをセットアップするには、[intlayerエディターのドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md)に従ってください。

intlayer CMSをセットアップするには、[intlayer CMSのドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md)に従ってください。

並行して、Svelteアプリケーション内では、レイアウトまたはアプリケーションのルートに以下の行を追加する必要があります。

```svelte fileName="src/layout.svelte"
import { useIntlayerEditor } from "svelte-intlayer";

useIntlayerEditor();
```

### （オプション）ステップ7：アプリケーションにローカライズされたルーティングを追加する

Svelteアプリケーションでローカライズされたルーティングを扱うには、`svelte-spa-router`とIntlayerの`localeFlatMap`を組み合わせて、各ロケールのルートを生成できます。

まず、`svelte-spa-router`をインストールします：

```bash packageManager="npm"
npm install svelte-spa-router
```

```bash packageManager="pnpm"
pnpm add svelte-spa-router
```

```bash packageManager="yarn"
yarn add svelte-spa-router
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
import { useIntlayer } from 'svelte-intlayer';
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

```typescript {3,7} fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { intlayer, intlayerProxy } from "vite-intlayer";

typescript {3,7} fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { intlayer, intlayerProxy } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte(), intlayer(), intlayerProxy()],
});
```

```javascript {3,7} fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { intlayer, intlayerProxy } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte(), intlayer(), intlayerProxy()],
});
```

```javascript {3,7} fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const { svelte } = require("@sveltejs/vite-plugin-svelte");
const { intlayer, intlayerProxy } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [svelte(), intlayer(), intlayerProxy()],
});
  plugins: [svelte(), intlayer(), intlayerProxy()],
});
```

### （オプション）ステップ8：ロケールが変更されたときにURLを変更する

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

### Git 設定

Intlayer によって生成されたファイルは無視することを推奨します。これにより、Git リポジトリへの不要なコミットを避けることができます。

これを行うには、`.gitignore` ファイルに以下の指示を追加してください：

```plaintext
# Intlayer によって生成されたファイルを無視する
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

### さらに進む

さらに進めるために、[ビジュアルエディター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md)を実装するか、[CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md)を使用してコンテンツを外部化することができます。
