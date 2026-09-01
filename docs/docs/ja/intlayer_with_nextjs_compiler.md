---
createdAt: 2026-01-10
updatedAt: 2026-08-30
title: "Next.js i18n - あなたのアプリを翻訳する完全ガイド"
description: "i18nextはもう不要。2026年に多言語（i18n）Next.jsアプリを構築するためのガイド。AIエージェントで翻訳し、バンドルサイズ、SEO、パフォーマンスを最適化します。"
keywords:
  - 国際化
  - ドキュメント
  - Intlayer
  - Next.js
  - JavaScript
  - React
  - コンパイラ
  - AI
slugs:
  - doc
  - environment
  - nextjs
  - compiler
applicationTemplate: https://github.com/aymericzip/intlayer-next-no-lolale-path-template
youtubeVideo: https://www.youtube.com/watch?v=e_PPG7PTqGU
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Solid の useIntlayer API の使用法を直接プロパティアクセスに更新"
  - version: 8.2.0
    date: 2026-03-09
    changes: "Update compiler options, add FilePathPattern support"
  - version: 8.1.6
    date: 2026-02-23
    changes: "初期リリース"
author: aymericzip
---

# 既存の Next.js アプリケーションを多言語化 (i18n) する方法 (i18n ガイド 2026)

<Tabs defaultTab="video">
  <Tab label="動画" value="video">

<iframe title="Next.js向けの最高のi18nソリューション？Intlayerを発見する" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/e_PPG7PTqGU?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="コード" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-next-16-no-locale-path-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="デモ CodeSandbox - Intlayerを使用してアプリケーションを国際化する方法"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

GitHubで[アプリケーションテンプレート](https://github.com/aymericzip/intlayer-next-no-lolale-path-template)をご覧ください。

## 目次

<TOC/>

## なぜ既存のアプリケーションの国際化は難しいのか？

単一言語用に構築されたアプリに複数の言語を追加しようとしたことがあるなら、その苦労はご存知でしょう。「難しい」というだけでなく、退屈で面倒な作業です。すべてのファイルを調べ、すべてのテキスト文字列を見つけ出し、それらを別々の辞書ファイルに移動しなければなりません。

その後、レイアウトやロジックを壊すことなく、すべてのテキストをコードフックで置き換えるというリスクの高い作業が待っています。これは新機能の開発を数週間にわたって停止させ、終わりのないリファクタリングのように感じられるような作業です。

## Intlayerコンパイラとは？

**Intlayerコンパイラ**は、そのような手作業を回避するために作られました。手動で文字列を抽出する代わりに、コンパイラがそれを自動で行います。コードをスキャンし、テキストを見つけ、バックグラウンドでAIを使用して辞書を生成します。
その後、ビルドステップ中にソースコードを変更し、必要なi18nフックを注入します。基本的に、あなたは単一言語であるかのようにアプリケーションを書き続けるだけで、コンパイラが多言語への変換処理をネイティブに処理します。

> コンパイラのドキュメント: [https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compiler.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compiler.md)

### 制限事項

コンパイラは**コンパイル時**にコードの解析と変換（フックの注入や辞書の生成）を行うため、アプリケーションの**ビルド時間が遅くなる**可能性があります。

アクティブな開発中（devモード）のこの影響を制限するために、コンパイラを [`'build-only'`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md) モードに設定するか、不要な場合は無効にすることができます。

---

## Next.jsアプリケーションでのIntlayer設定ステップバイステップガイド

<Steps>
<Step number={1} title="依存関係のインストール">

好みのパッケージマネージャーを使用して必要なパッケージをインストールします：

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
npm install intlayer next-intlayer
npm install @intlayer/babel --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer
pnpm add @intlayer/babel --save-dev
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer
yarn add @intlayer/babel --save-dev
```

```bash packageManager="bun"
bun add intlayer next-intlayer
bun add @intlayer/babel --dev
```

- **intlayer**

  構成管理、翻訳、[コンテンツ宣言](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/content_file.md)、トランスパイル、[CLIコマンド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/index.md)のための国際化ツールを提供するコアパッケージ。

- **next-intlayer**

  IntlayerをNext.jsと統合するパッケージ。Next.jsの国際化のためのコンテキストプロバイダーとフックを提供します。さらに、Intlayerを[Webpack](https://webpack.js.org/)または[Turbopack](https://nextjs.org/docs/app/api-reference/turbopack)と統合するためのNext.jsプラグイン、ユーザーの優先ロケールを検出、Cookie管理、URLリダイレクトを処理するためのミドルウェアが含まれています。

</Step>
<Step number={2} title="プロジェクトの構成">

アプリケーションの言語を定義するための設定ファイルを作成します：

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.JAPANESE],
    defaultLocale: Locales.JAPANESE,
  },
  routing: {
    mode: "search-params",
  },
  compiler: {
    /**
     * コンパイラを有効にするかどうかを示します。
     */
    enabled: true,

    /**
     * 最適化された辞書の出力ディレクトリ。
     */
    output: ({ locale, key }) => `compiler/${locale}/${key}.json`,

    /**
     * キーなしで、生成されたファイルにコンテンツのみを挿入します。
     */
    noMetadata: false,

    /**
     * 辞書キーのプレフィックス
     */
    dictionaryKeyPrefix: "", // Remove base prefix

    /**
     * 変換後にコンポーネントを保存するかどうかを示します。
     * これにより、コンパイラを1回だけ実行してアプリを変換し、その後削除することができます。
     */
    saveComponents: false,
  },
  ai: {
    provider: "openai",
    model: "gpt-5-mini",
    apiKey: process.env.OPEN_AI_API_KEY,
    applicationContext: "これはシンプルな地図アプリケーションの例です",
  },
};

export default config;
```

> **注**: 環境変数に `OPEN_AI_API_KEY` が設定されていることを確認してください。

> この設定ファイルを使用して、ローカライズされたURL、プロキシリダイレクト、Cookieマッピング、コンテンツ宣言の場所と拡張子の設定、コンソールでのIntlayerログの無効化などを行えます。使用可能なパラメータの完全なリストについては、[設定ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)を参照してください。

</Step>
<Step number={3} title="Next.jsの設定にIntlayerを統合する">

Next.jsのセットアップをIntlayerを使用するように構成します：

```typescript fileName="next.config.ts"
import type { NextConfig } from "next";
import { withIntlayer } from "next-intlayer/server";

const nextConfig: NextConfig = {
  /* ここにオプションで追加のNext.js設定を記述 */
};

export default withIntlayer(nextConfig);
```

> `withIntlayer()` Next.jsプラグインは、IntlayerとNext.jsを統合するために使用されます。これにより辞書ファイルがビルドされ、devモードで監視されます。[Webpack](https://webpack.js.org/)または[Turbopack](https://nextjs.org/docs/app/api-reference/turbopack)環境内でIntlayer環境変数を定義します。さらに、パフォーマンスを最適化するためのエイリアスを提供し、Server Componentsと完全に連携します。

</Step>
<Step number={4} title="ページでのロケール検出">

Intlayer コンパイラーは、コンテンツを抽出および最適化するために Babel が必要です。Intlayer プラグインを含めるように `babel.config.js` (または `babel.config.json`) を更新してください:

```typescript fileName="babel.config.js"
const {
  intlayerExtractBabelPlugin,
  intlayerOptimizeBabelPlugin,
  getExtractPluginOptions,
  getOptimizePluginOptions,
} = require("@intlayer/babel");

module.exports = {
  presets: ["next/babel"],
  plugins: [
    [intlayerExtractBabelPlugin, getExtractPluginOptions()],
    [intlayerOptimizeBabelPlugin, getOptimizePluginOptions()],
  ],
};
```

</Step>
<Step number={5} title="ページでロケールを検出する">

`RootLayout` の内容をクリアし、以下の例に置き換えます：

```tsx fileName="src/app/layout.tsx"
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { IntlayerProvider, LocalPromiseParams } from "next-intlayer";
import { getHTMLTextDir, getIntlayer } from "intlayer";
import { getLocale } from "next-intlayer/server";
export { generateStaticParams } from "next-intlayer";

export const generateMetadata = async (): Promise<Metadata> => {
  const locale = await getLocale();
  const { title, description, keywords } = getIntlayer("metadata", locale);

  return {
    title,
    description,
    keywords,
  };
};

const RootLayout = async ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  const locale = await getLocale();

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body>
        <IntlayerProvider defaultLocale={locale}>{children}</IntlayerProvider>
      </body>
    </html>
  );
};

export default RootLayout;
```

</Step>
<Step number={6} title="コンテンツを宣言する（自動）">

コンパイラを有効にすると、コンテンツ辞書（`.content.ts`ファイルなど）を**手動で宣言する必要がなくなります**。

代わりに、コード内にハードコードされた文字列としてコンテンツを書くだけです。Intlayerはソースコードをスキャンし、構成されたAIプロバイダーを使用して翻訳を生成し、ビルドのコンパイルステップ中にそれらの文字列をローカライズされたコンテンツに静かに置き換えます。これらすべてが完全に自動化されています。

デフォルトのロケールでハードコードされた文字列を使用してコンポーネントを記述し、残りはIntlayerコンパイラに任せます。

`page.tsx` の見た目の例：

<Tabs>
<Tab value="Code">

```tsx fileName="src/app/page.tsx"
import type { FC } from "react";
import { IntlayerServerProvider } from "next-intlayer/server";
import { getLocale } from "next-intlayer/server";

const PageContent: FC = () => {
  return (
    <>
      <p>編集を始めてみましょう！</p>
      <code>src/app/page.tsx</code>
    </>
  );
};

export default async function Page() {
  const locale = await getLocale();

  return (
    <IntlayerServerProvider locale={locale}>
      <PageContent />
    </IntlayerServerProvider>
  );
}
```

</Tab>
<Tab value="Output">

```ts fileName="i18n/page-content.content.tsx"
{
  key: "page-content",
  content: {
    nodeType: "translation",
    translation: {
      en: {
        getStartedByEditingThis: "Get started by editing this!",
      },
      fr: {
        getStartedByEditingThis: "Commencez par éditer ceci !",
      },
      ja: {
        getStartedByEditingThis: "編集を始めてみましょう！",
      },
    }
  }
}
```

</Tab>
</Tabs>
<Tabs>
<Tab label='Intlayer >=9.4' value='>=9.4'>

```tsx fileName="src/app/page.tsx"
import { type FC } from "react";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";
import { getLocale } from "next-intlayer/server";

const PageContent: FC = () => {
  const content = useIntlayer("page-content");

  return (
    <>
      <p>{content.getStartedByEditingThis}</p>
      <code>src/app/page.tsx</code>
    </>
  );
};

export default async function Page() {
  const locale = await getLocale();

  return (
    <IntlayerServerProvider locale={locale}>
      <PageContent />
    </IntlayerServerProvider>
  );
}
```

- **`IntlayerProvider`** はルートレイアウトに一度だけマウントされます。サーバーコンポーネントとクライアントコンポーネント両方にロケールを提供するため、ページ自体がラップされる必要がなくなります。
- `[locale]` パスセグメントがない場合、ロケールは常にリクエストから取得されます — Intlayer プロキシによって設定された `x-intlayer-locale` ヘッダー、その後ロケール cookie — プロバイダーが実行されていない場合、サーバーフックがこれらを独自に読み取ります。

</Tab>
<Tab label='Intlayer <9.4' value='<9.4'>

```tsx fileName="src/app/page.tsx"
import { type FC } from "react";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";
import { getLocale } from "next-intlayer/server";

const PageContent: FC = () => {
  const content = useIntlayer("page-content");

  return (
    <>
      <p>{content.getStartedByEditing}</p>
      <code>src/app/page.tsx</code>
    </>
  );
};

export default async function Page() {
  const locale = await getLocale();

  return (
    <IntlayerServerProvider locale={locale}>
      <PageContent />
    </IntlayerServerProvider>
  );
}
```

- **`IntlayerClientProvider`** は、クライアントサイドで子要素にロケールを提供するために使用されます。
- 一方、 **`IntlayerServerProvider`** は、サーバーサイドで子要素にロケールを提供するために使用されます。

  > Layout and page cannot share a common server context because the server context system is based on a per-request data store (via [React's cache](https://react.dev/reference/react/cache) mechanism), causing each "context" to be re-created for different segments of the application. Placing the provider in a shared layout would break this isolation, preventing the correct propagation of the server context values to your server components.

</Tab>
</Tabs>
</Step>
<Step number={7} title="不足している翻訳を埋める" isOptional={true}>

Intlayerは、不足している翻訳を埋めるためのCLIツールを提供しています。 `intlayer` コマンドを使用して、コード内の不足している翻訳をテストして埋めることができます。

```bash packageManager="npm"
npx intlayer test         # 不足している翻訳があるかテスト
```

```bash packageManager="yarn"
yarn intlayer test         # 不足している翻訳があるかテスト
```

```bash packageManager="pnpm"
pnpm intlayer test         # 不足している翻訳があるかテスト
```

```bash packageManager="bun"
bun x intlayer test         # 不足している翻訳があるかテスト
```

```bash packageManager="npm"
npx intlayer fill         # 不足している翻訳を埋める
```

```bash packageManager="yarn"
yarn intlayer fill         # 不足している翻訳を埋める
```

```bash packageManager="pnpm"
pnpm intlayer fill         # 不足している翻訳を埋める
```

```bash packageManager="bun"
bun x intlayer fill         # 不足している翻訳を埋める
```

> 詳細については、[CLIドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/ci.md)を参照してください。

</Step>
<Step number={8} title="ローカライズされたルーティングプロキシミドルウェア" isOptional={true}>

ユーザーを優先ロケールに自動的にリダイレクトしたい場合は、プロキシミドルウェアを設定します：

```typescript fileName="src/proxy.ts"
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

> `intlayerProxy` は、ユーザーの優先ロケールを検出し、[設定ファイルのセッティング](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)に従って適切なURLにリダイレクトするために使用されます。また、ユーザーの優先ロケールをCookieに保存することも可能です。

> Intlayer v9 以降、このミドルウェアは `routing.enableProxy` オプション（デフォルトでは `true`）を尊重します。このファイルを削除せずにパススルーに変更するには、設定で `routing.enableProxy: false` を設定してください。[v9 リリースノート](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/releases/v9.md)を参照してください。

</Step>
<Step number={9} title="コンテンツの言語を変更する" isOptional={true}>

Next.js内でコンテンツの言語を変更する最も推奨される方法は、 `Link` コンポーネントを使用してユーザーを適切な言語ルートに誘導することです。これにより、Next.jsのプリフェッチ機能を活用し、ページ全体がハードリフレッシュされるのを防ぐことができます。

```tsx fileName="src/components/localeSwitcher/LocaleSwitcher.tsx"
"use client";

import type { FC } from "react";
import { Locales, getHTMLTextDir, getLocaleName } from "intlayer";
import { useLocale } from "next-intlayer";

export const LocaleSwitcher: FC = () => {
  const { locale, availableLocales, setLocale } = useLocale();

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <button
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocale(localeItem)}
          >
            <span>
              {/* ロケール表記 - 例: JA */}
              {localeItem}
            </span>
            <span>
              {/* 現在のロケールに基づいた言語名 - 例: 日本語 */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* 指定されたロケール自体の言語での表記 - 例: Francés (現在のロケールが Locales.SPANISH の場合) */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* 英語での表記 - 例: Japanese */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
```

> 別の方法として、 `useLocale` フックの `setLocale` 関数を使用することもできますが、こちらはページプリフェッチを許可しません。詳細については、 [`useLocale` フックのドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/next-intlayer/useLocale.md) を参照してください。

</Step>
<Step number={10} title="バンドルサイズの最適化" isOptional={true}>

`next-intlayer` を使用する場合、デフォルトで各ページのバンドルに辞書が含まれます。バンドルサイズを最適化するために、Intlayerはマクロを使用して `useIntlayer` コールを賢く置き換えるオプションのSWCプラグインを提供しています。これにより、辞書は実際に使用されるページのバンドルにのみ含まれるようになります。

`@intlayer/babel` プラグインはすでにバンドリング最適化を統合しています（`babel.config.js` を参照）。しかし、`@intlayer/swc` プラグインはより高性能です。`@intlayer/babel` プラグインを削除すれば、`@intlayer/swc` プラグインを使用できます。

この最適化を有効にするには、 `@intlayer/swc` パッケージをインストールします。インストール後、 `next-intlayer` は自動的にプラグインを検出して使用します：

```bash packageManager="npm"
npm install @intlayer/swc --save-dev
```

```bash packageManager="pnpm"
pnpm add @intlayer/swc --save-dev
```

```bash packageManager="yarn"
yarn add @intlayer/swc --save-dev
```

```bash packageManager="bun"
bun add @intlayer/swc --dev
```

> 注: この最適化は Next.js 13 以降でのみ利用可能です。

> 注: Next.js の SWC プラグインはまだ試験段階であるため、このパッケージはデフォルトではインストールされていません。これは将来的に変更される可能性があります。

> 注: （辞書設定で） `importMode: 'dynamic'` または `importMode: 'fetch'` を設定した場合、Suspense に依存するため、 `useIntlayer` コールを `Suspense` 境界で囲む必要があります。そのため、ページ / レイアウトコンポーネントのトップレベルで直接 `useIntlayer` を使用することはできなくなります。

</Step>
<Step number={11} title="コンポーネントのコンテンツを抽出する" isOptional={true}>

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
<Tab value='Extract command'>

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
<Tab value='Babel compiler'>

> Since v9, the `intlayerCompiler` is included in the `intlayer` plugin. So you don't need to add it manually.

```bash packageManager="npm"
npm install @intlayer/babel --save-dev
```

```bash packageManager="pnpm"
pnpm add @intlayer/babel --save-dev
```

```bash packageManager="yarn"
yarn add @intlayer/babel --save-dev
```

```bash packageManager="bun"
bun add @intlayer/babel --dev
```

```js fileName="babel.config.js"
const {
  intlayerExtractBabelPlugin,
  getExtractPluginOptions,
} = require("@intlayer/babel");

module.exports = {
  presets: ["next/babel"],
  plugins: [
    // コンポーネントから辞書へコンテンツを抽出する
    [intlayerExtractBabelPlugin, getExtractPluginOptions()],
  ],
};
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

### TypeScript 設定

Intlayerは、TypeScriptの利点を活用し、コードベースをより堅牢にするためにモジュール拡張（module augmentation）を使用しています。

![自動補完](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![翻訳エラー](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

TypeScriptの設定に自動生成された型が含まれていることを確認してください。

```json5 fileName="tsconfig.json"
{
  // ... 既存の TypeScript 設定
  "include": [
    // ... 既存の TypeScript 設定
    ".intlayer/**/*.ts", // 自動生成された型を含める
  ],
}
```

### Git 設定

Intlayerによって生成されたファイルを無視することを推奨します。これにより、Gitリポジトリにコミットされるのを防ぎます。

これを行うには、 `.gitignore` ファイルに以下の指示を追加します：

```plaintext fileName=".gitignore"
# Intlayerによって生成されたファイルを無視
.intlayer
```

### VS Code 拡張機能

Intlayerでの開発体験を向上させるために、**公式の Intlayer VS Code 拡張機能** をインストールできます。

[VS Code Marketplace からインストール](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

この拡張機能は以下を提供します：

- 翻訳キーの **自動補完**。
- 不足している翻訳の **リアルタイムエラー検出**。
- 翻訳されたコンテンツの **インラインプレビュー**。
- 翻訳を簡単に作成・更新できる **クイックアクション**。

拡張機能の使用方法の詳細については、 [Intlayer VS Code 拡張機能のドキュメント](https://intlayer.org/doc/vs-code-extension) を参照してください。

### さらに進む

さらに進めるには、 [ビジュアルエディター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md) を実装したり、 [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md) を使用してコンテンツを外部管理化したりできます。

## よくある質問

<FAQ>

<Question title="Next.js アプリを国際化するために利用可能なソリューションにはどのようなものがありますか？">

`next.config.js` の `i18n` フィールドは App Router に適用されないため、ローカライゼーション層は常にライブラリの選択肢です：

- **`next-intl`**、**`next-i18next` / `i18next`** および **`react-intl`**：JSON または ICU カタログがネームスペースごとに読み込まれ、キーは呼び出しサイトで手動で記述されます。
- **`Lingui`**：抽出駆動型で、ICU メッセージはビルド時にコンパイルされます。
- **`Intlayer`**：コンポーネントからビルド時にコンテンツがコンパイルされ、完全に型付けされ、AI 翻訳、ビジュアルエディタ、CMS を備えています。

このガイドではコンパイラセットアップを使用します。コンポーネントに通常の文字列を記述し、辞書は自動生成されます。[Intlayer を選ぶ理由](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/interest_of_intlayer.md)および [Next.js i18n ベンチマーク](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/benchmark/nextjs.md)を参照してください。

</Question>

<Question title="i18n は Next.js のバンドルサイズにどの程度の影響を与えますか？">

ネームスペースベースのセットアップよりもはるかに少なくなります。ページはレンダリングしないカタログをダウンロードしないためです。Server Components はサーバー上でコンテンツを解決し、ビルド時コンパイラは `useIntlayer` 呼び出しをコンポーネントが使用する正確な辞書エントリに置き換えるため、未使用のキーと未使用の言語は削除され、[動的辞書](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dynamic_dictionaries/index.md)は残りをロケールごとに分割します。通常の代替案と比較すると、Intlayer はバンドルとページサイズを最大 50% 削減します。[バンドル最適化](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/bundle_optimization.md)および[ベンチマーク](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/benchmark/nextjs.md)を参照してください。

</Question>

<Question title="`next-intl`、`next-i18next` または `i18next` からコンポーネントを書き直さずに移行できますか？">

はい、2 つのパスがあります。[next-intl 移行ガイド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/migration_from_next-intl_to_intlayer.md)または [i18next 移行ガイド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/migration_from_i18next_to_intlayer.md)を使用してコンテンツを段階的に移行できます。または、現在の API をそのまま保持できます：[互換性アダプタ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compat/index.md)は `next-intl`、`react-i18next` および `react-intl` と同じ API を公開しますが、Intlayer 辞書によって提供されるため、インポートは変更されますがコンポーネントコードは変わりません。

</Question>

<Question title="既存の JSON 翻訳ファイルを保持できますか？">

はい。[sync JSON プラグイン](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/plugins/sync-json.md)は `/messages/{locale}/{namespace}.json` ファイルを信頼できるソースとして保持し、双方向で Intlayer 辞書を生成します。[sync PO プラグイン](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/plugins/sync-po.md)は gettext カタログに対して同じことを行い、[ロケールごとのファイル](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/per_locale_file.md)では 1 つのファイルにロケールをグループ化する代わりに言語ごとにコンテンツを分割できます。

</Question>

<Question title="コンテンツをキーごとに移動する必要がありますか？">

いいえ、このガイドはそのようにセットアップされています。デフォルトロケールでコンポーネントに通常の文字列を記述すると、[Intlayer コンパイラ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compiler.md)はビルドのたびにソースをスキャンし、ユーザー向けテキストを抽出して辞書を生成するため、手動で作成または保守するキーはありません。

知っておく価値のある 2 つの制限があります。コンパイラは静的分析によって動作するため、API エラーコードや CMS フィールドなど、実行時にのみ存在する文字列は到達不可能であり、宣言された辞書が必要です。また、`className="active"` やステータスコードなどのアプリケーションロジックからユーザー向けテキストを区別する必要があり、大規模なコードベースではいくつかのアノテーションが必要です。

制御を保持したい場合は、`npx intlayer extract` は同じ抽出を 1 回実行し、選択したファイルに対して各コンポーネントの隣に `.content` ファイルを書き込みます。[extract コマンド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/extract.md)を参照してください。

</Question>

<Question title="利用可能なエディタと AI エージェントツールは何ですか？">

5 つあり、すべてオプションです：

- **[VS Code 拡張機能](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/vs_code_extension.md)**：`useIntlayer` キーからそれを宣言するコンテンツファイルにジャンプし、コンポーネントからコンテンツを抽出し、コマンドパレットまたは専用 Intlayer タブからビルド、fill、test、push、pull を実行します。
- **[LSP サーバー](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/lsp.md)**：LSP に対応した任意のエディタで同じ認識を提供し、定義へのジャンプ、すべての参照を検索、翻訳値のホバープレビュー、キーとフィールドのオートコンプリート、キーが宣言されていない場合の警告があります。また、`i18next`、`react-i18next`、`next-intl` および `use-intl` 呼び出しを解決し、移行中に役立ちます。
- **[MCP サーバー](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/mcp_server.md)**：Intlayer ドキュメントと CLI を Cursor、VS Code、Claude Desktop、Claude Code、ChatGPT に公開するため、アシスタントは推測する代わりに現在のドキュメントから回答でき、`intlayer fill` などのコマンドを自分で実行できます。
- **[エージェントスキル](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/agent_skills.md)**：`intlayer-config`、`intlayer-cli` および `intlayer-content` などの焦点を絞ったスキル、およびフレームワークごとに 1 つのスキルがあり、エージェントにルーティングセットアップとコンテンツノードタイプを教えます。
- **[ESLint プラグイン](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/eslint.md)**：`no-raw-text` はハードコードされた文字列にフラグを立て、静的辞書キーと未使用コンテンツのさらなるルールがあります。

</Question>

<Question title="コンパイラを使用するか、コンテンツを自分で宣言するかどちらを選ぶべきですか？">

既存のコードベースに最小限の変更で i18n を追加したい場合はコンパイラを使用してください：コンポーネントはそのままで、辞書が続きます。[標準 Next.js ガイド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_nextjs_16.md)が示すようにコンテンツを自分で宣言するのは、キー、構造、再利用に対する明示的な制御が必要な場合です。2 つは同じ辞書層に共存できます。

</Question>

<Question title="Babel を設定する必要があるのはなぜですか？">

ステップ 4 で説明しています。コンパイラは Babel トランスフォームを通じてコンポーネントを読み取るため、抽出パスを実行するには Next.js に `babel.config.js` が必要です。`npx intlayer init --interactive` はコンパイラセットアップを選択すると自動的にスキャフォールドします。

</Question>

<Question title="コンパイラが見えない文字列はどうなりますか？">

コンパイラは静的分析によって動作するため、翻訳されないままです。API エラーメッセージ、CMS フィールド、連結によって構築された文字列など、実行時に組み立てられるものは、通常の方法でコンテンツファイルで宣言する必要があります。`npx intlayer test` を実行して、何が不足しているかを確認してください。

</Question>

<Question title="不足している翻訳をどのように埋めますか？">

ステップ 7 で説明しています。`npx intlayer fill` は抽出されたコンテンツを選択した LLM に送信し、独自のプロバイダと API キーを使用します。`--git-diff` はブランチで変更されたものに実行を制限します。[fill コマンド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/fill.md)および [CI/CD 統合](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/CI_CD.md)を参照してください。

</Question>

<Question title="ロケールはどのように検出されますか？">

ステップ 5 ではページで読み取り、ステップ 8 では URL、cookie、または `Accept-Language` header から解決するプロキシを追加します。`routing.mode` はロケールがパスに表示されるかどうかを決定します。[設定リファレンス](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)を参照してください。

</Question>

<Question title="Intlayer は複数形、性別、リッチテキストをサポートしていますか？">

はい：[複数形](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/plurial.md)、[性別ベースのコンテンツ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/gender.md)、条件、[挿入](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/insertion.md)、[Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/markdown.md) および数値、日付、通貨の[フォーマッタ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/formatters.md)。

</Question>

<Question title="翻訳者がコードに触れずにコンテンツを編集するにはどうすればよいですか？">

[ビジュアルエディタ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md)を通じて、独自のインフラストラクチャで実行され、誰でも実行中のアプリ上でテキストをその場で編集できます。または、[CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md)を通じて、コンテンツを外部化してデプロイなしで変更できます。

</Question>

<Question title="Intlayer は無料でオープンソースですか？">

はい、Apache 2.0 ライセンスの下で、商用利用を含みます。ホストされた CMS はオプションの有料サービスで、[自己ホスト](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/self_hosting.md)することもできます。

</Question>

</FAQ>
