---
createdAt: 2026-01-10
updatedAt: 2026-01-10
title: Next.js i18n - 既存のNext.jsアプリケーションを多言語化（i18n）する方法 (2026年 i18nガイド)
description: Intlayerコンパイラを使用して、既存のNext.jsアプリケーションを多言語化する方法を学びます。ドキュメントに従って国際化（i18n）し、AIを利用して翻訳を行います。
keywords:
  - 国際化
  - 翻訳
  - ドキュメント
  - Intlayer
  - Next.js
  - JavaScript
  - React
  - コンパイラ
  - AI
slugs:
  - doc
  - configuration
  - nextjs
  - compiler
applicationTemplate: https://github.com/aymericzip/intlayer-next-no-lolale-path-template
youtubeVideo: https://www.youtube.com/watch?v=e_PPG7PTqGU
history:
  - version: 8.1.6
    date: 2026-02-23
    changes: 初期リリース
---

# 既存のNext.jsアプリケーションを多言語化（i18n）する方法 (2026年 i18nガイド)

<Tabs defaultTab="video">
  <Tab label="動画" value="video">
  
<iframe title="Next.js向けの最高のi18nソリューション？Intlayerを発見する" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/e_PPG7PTqGU?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="コード" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-next-16-no-locale-path-template?embed=1&ctl=1&file=intlayer.config.ts"
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

そして次にリスクの高い部分がやってきます。レイアウトやロジックを壊すことなく、すべてのテキストをコードフックで置き換える作業です。これは新機能の開発を数週間にわたって停止させ、終わりのないリファクタリングのように感じられるような作業です。

## Intlayerコンパイラとは？

**Intlayerコンパイラ**は、そのような面倒な手作業を省略するために作られました。手動で文字列を抽出する代わりに、コンパイラがそれを自動で行います。コードをスキャンし、テキストを見つけ、バックグラウンドでAIを使用して辞書を生成します。
その後、ビルド中にコードを変更し、必要なi18nフックを注入します。基本的に、あなたは単一言語であるかのようにアプリを書き続けるだけで、コンパイラが多言語への変換処理を自動的に処理します。

> コンパイラのドキュメント: https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compiler.md

### 制限事項

コンパイラは**コンパイル時**にコードの解析と変換（フックの挿入や辞書の生成）を行うため、アプリケーションの**ビルドプロセスが遅くなる**可能性があります。

開発中のこの影響を軽減するために、コンパイラを[`'build-only'`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)モードで実行するように設定するか、不要な場合は無効にすることができます。

---

## Next.jsアプリケーションでのIntlayer設定ステップバイステップガイド

### ステップ1: 依存関係のインストール

npmを使用して必要なパッケージをインストールします：

```bash packageManager="npm"
npm install intlayer next-intlayer
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer next-intlayer
bunx intlayer init
```

- **intlayer**

  構成管理、翻訳、[コンテンツ宣言](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/content_file.md)、トランスパイル、[CLIコマンド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/index.md)のための国際化ツールを提供するコアパッケージです。

- **next-intlayer**

  IntlayerをNext.jsと統合するパッケージです。Next.jsの国際化のためのコンテキストプロバイダーとフックを提供します。さらに、Intlayerを[Webpack](https://webpack.js.org/)または[Turbopack](https://nextjs.org/docs/app/api-reference/turbopack)と統合するためのNext.jsプラグイン、ユーザーの優先ロケールを検出し、Cookieを管理し、URLリダイレクトを処理するためのプロキシが含まれています。

### ステップ2: プロジェクトの構成

アプリケーションの言語を定義する設定ファイルを作成します：

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.FRENCH,
  },
  routing: {
    mode: "search-params",
  },
  compiler: {
    enabled: true, // 開発モードへの影響を制限するために'build-only'に設定できます
    outputDir: "i18n",
    dictionaryKeyPrefix: "", // 'comp-'プレフィックスなし
  },
  ai: {
    provider: "openai",
    model: "gpt-5-mini",
    apiKey: process.env.OPEN_AI_API_KEY,
    applicationContext: "これは地図アプリです",
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.FRENCH,
  },
  routing: {
    mode: "search-params",
  },
  compiler: {
    enabled: true, // 開発モードへの影響を制限するために'build-only'に設定できます
    outputDir: "i18n",
    dictionaryKeyPrefix: "", // 'comp-'プレフィックスなし
  },
  ai: {
    provider: "openai",
    model: "gpt-5-mini",
    apiKey: process.env.OPEN_AI_API_KEY,
    applicationContext: "これは地図アプリです",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.FRENCH,
  },
  routing: {
    mode: "search-params",
  },
  compiler: {
    enabled: true, // 開発モードへの影響を制限するために'build-only'に設定できます
    outputDir: "i18n",
    dictionaryKeyPrefix: "", // 'comp-'プレフィックスなし
  },
  ai: {
    provider: "openai",
    model: "gpt-5-mini",
    apiKey: process.env.OPEN_AI_API_KEY,
    applicationContext: "これは地図アプリです",
  },
};

module.exports = config;
```

> **注**: 環境変数に`OPEN_AI_API_KEY`が設定されていることを確認してください。

> この設定ファイルを使用して、ローカライズされたURL、プロキシリダイレクト、Cookie名、コンテンツ宣言の場所や拡張子を設定したり、コンソールでのIntlayerのログを無効にしたりできます。使用可能なパラメータの完全なリストについては、[設定ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)を参照してください。

### ステップ3: Next.jsの設定にIntlayerを統合する

Intlayerを使用するようにNext.jsの設定を構成します：

```typescript fileName="next.config.ts" codeFormat="typescript"
import type { NextConfig } from "next";
import { withIntlayer } from "next-intlayer/server";

const nextConfig: NextConfig = {
  /* ここに構成オプションを記述します */
};

export default withIntlayer(nextConfig);
```

```typescript fileName="next.config.mjs" codeFormat="esm"
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* ここに構成オプションを記述します */
};

export default withIntlayer(nextConfig);
```

```typescript fileName="next.config.cjs" codeFormat="commonjs"
const { withIntlayer } = require("next-intlayer/server");

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* ここに構成オプションを記述します */
};

module.exports = withIntlayer(nextConfig);
```

> `withIntlayer()`プラグインは、IntlayerとNext.jsを統合するために使用されます。これにより、コンテンツ宣言ファイルがビルドされ、開発モードでそれらが監視されるようになります。[Webpack](https://webpack.js.org/)または[Turbopack](https://nextjs.org/docs/app/api-reference/turbopack)環境内でIntlayerの環境変数を定義します。さらに、パフォーマンスを最適化するためのエイリアスを提供し、Server Componentsとの互換性を確保します。

### ステップ4: 動的ロケールルーティングの定義

`RootLayout`の中身をすべて空にし、以下のコードに置き換えます：

```tsx {3} fileName="src/app/layout.tsx" codeFormat="typescript"
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { IntlayerClientProvider, LocalPromiseParams } from "next-intlayer";
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
      <IntlayerClientProvider defaultLocale={locale}>
        <body>{children}</body>
      </IntlayerClientProvider>
    </html>
  );
};

export default RootLayout;
```

```jsx {3} fileName="src/app/layout.mjx" codeFormat="esm"
import "./globals.css";
import { IntlayerClientProvider } from "next-intlayer";
import { getHTMLTextDir, getIntlayer } from "intlayer";
import { getLocale } from "next-intlayer/server";
export { generateStaticParams } from "next-intlayer";

export const generateMetadata = async ({ params }) => {
  const locale = await getLocale();
  const { title, description, keywords } = getIntlayer("metadata", locale);

  return {
    title,
    description,
    keywords,
  };
};

const RootLayout = async ({ children }) => {
  const locale = await getLocale();

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <IntlayerClientProvider defaultLocale={locale}>
        <body>{children}</body>
      </IntlayerClientProvider>
    </html>
  );
};

export default RootLayout;
```

```jsx {1,8} fileName="src/app/layout.csx" codeFormat="commonjs"
require("./globals.css");
const { IntlayerClientProvider } = require("next-intlayer");
const { getHTMLTextDir, getIntlayer } = require("intlayer");
const { getLocale } = require("next-intlayer/server");
const { generateStaticParams } = require("next-intlayer");

const generateMetadata = async ({ params }) => {
  const locale = await getLocale();
  const { title, description, keywords } = getIntlayer("metadata", locale);

  return {
    title,
    description,
    keywords,
  };
};

const RootLayout = async ({ children }) => {
  const locale = await getLocale();

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <IntlayerClientProvider defaultLocale={locale}>
        <body>{children}</body>
      </IntlayerClientProvider>
    </html>
  );
};

module.exports = {
  default: RootLayout,
  generateStaticParams,
  generateMetadata,
};
```

### ステップ5: コンテンツを宣言する（自動）

コンパイラを有効にすると、コンテンツ辞書（`.content.ts`ファイルなど）を**手動で宣言する必要がなくなります**。

代わりに、コード内に文字列として直接コンテンツを書き込むことができます。Intlayerがコードを解析し、構成されたAIプロバイダーを使用して翻訳を生成し、コンパイル時に文字列をローカライズされたコンテンツに置き換えます。

### ステップ6: コード内でコンテンツを利用する

単にデフォルトのローケルの言語で文字列をハードコーディングしてコンポーネントを記述するだけです。残りはコンパイラが処理します。

ページの見た目の例：

```tsx fileName="src/app/page.tsx" codeFormat="typescript"
import type { FC } from "react";
import { IntlayerServerProvider } from "next-intlayer/server";
import { getLocale } from "next-intlayer/server";
import { NextPage } from "next";

const PageContent: FC = () => {
  return (
    <>
      <p>編集を始めてください</p>
      <code>src/app/page.tsx</code>
    </>
  );
};

const Page: NextPage = async () => {
  const locale = await getLocale();

  return (
    <IntlayerServerProvider locale={locale}>
      <PageContent />
    </IntlayerServerProvider>
  );
};

export default Page;
```

```jsx fileName="src/app/page.mjx" codeFormat="esm"
import { IntlayerServerProvider } from "next-intlayer/server";
import { getLocale } from "intlayer";
import { NextPage } from "next";

const Page: NextPage = async () => {
  const locale = await getLocale();

  return (
    <IntlayerServerProvider locale={locale}>
      <>
        <p>編集を始めてください</p>
        <code>src/app/page.tsx</code>
      </>
    </IntlayerServerProvider>
  );
};

export default Page;
```

```jsx fileName="src/app/page.csx" codeFormat="commonjs"
import { IntlayerServerProvider, getLocale } from "next-intlayer/server";
import { NextPage } from "next";

const Page: NextPage = async () => {
  const locale = await getLocale();

  return (
    <IntlayerServerProvider locale={locale}>
      <>
        <p>編集を始めてください</p>
        <code>src/app/page.tsx</code>
      </>
    </IntlayerServerProvider>
  );
};
```

- **`IntlayerClientProvider`**は、クライアントサイドコンポーネントにロケールを提供するために使用されます。
- **`IntlayerServerProvider`**は、サーバーの子ノードにロケールを提供するために使用されます。

### （オプション）ステップ7: ロケール検出用のプロキシの構成

プロキシを設定して、ユーザーの優先ロケールを検出します：

```typescript fileName="src/proxy.ts" codeFormat="typescript"
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

```javascript fileName="src/proxy.mjs" codeFormat="esm"
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

```javascript fileName="src/proxy.cjs" codeFormat="commonjs"
const { intlayerProxy } = require("next-intlayer/proxy");

const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};

module.exports = { proxy: intlayerProxy, config };
```

> `intlayerProxy`は、ユーザーの優先ロケールを検出し、[設定](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)に従って適切なURLにリダイレクトするために使用されます。また、ユーザーの優先ロケールをCookieに保存することもできます。

### （オプション）ステップ8: コンテンツの言語を変更する

Next.js内でコンテンツの言語を変更する最も推奨される方法は、`Link`コンポーネントを使用して、ユーザーを適切な言語に対応したルート（ページ）にリダイレクトさせることです。これにより、Next.jsのプリフェッチ機能を活用し、ページ全体が強制的にロードされるのを防ぐことができます。

```tsx fileName="src/components/localeSwitcher/LocaleSwitcher.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { Locales, getHTMLTextDir, getLocaleName } from "intlayer";
import { useLocale } from "next-intlayer";

export const LocaleSwitcher: FC = () => {
  const { locale, availableLocales, setLocale } = useLocale({
    onChange: () => window.location.reload(),
  });

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
              {/* ロケール - 例: JA */}
              {localeItem}
            </span>
            <span>
              {/* 各自の言語におけるロケール - 例: 日本語 */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* 現在のロケールでの言語 - 例: Japonais (現在のロケールがフランス語の場合) */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* 英語でのロケール - 例: Japanese */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
```

```jsx fileName="src/components/localeSwitcher/LocaleSwitcher.msx" codeFormat="esm"
"use client";

import { Locales, getHTMLTextDir, getLocaleName } from "intlayer";
import { useLocale } from "next-intlayer";

export const LocaleSwitcher = () => {
  const { locale, availableLocales, setLocale } = useLocale({
    onChange: () => window.location.reload(),
  });

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
              {/* ロケール - 例: JA */}
              {localeItem}
            </span>
            <span>
              {/* 各自の言語におけるロケール - 例: 日本語 */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* 現在のロケールでの言語 - 例: Japonais (現在のロケールがフランス語の場合) */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* 英語でのロケール - 例: Japanese */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
```

```jsx fileName="src/components/localeSwitcher/LocaleSwitcher.csx" codeFormat="commonjs"
"use client";

const { Locales, getHTMLTextDir, getLocaleName } = require("intlayer");
const { useLocale } = require("next-intlayer");

export const LocaleSwitcher = () => {
  const path
  const { locale availableLocales, setLocale } = useLocale({
       onChange: ()=> window.location.reload(),
  });

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
              {/* ロケール - 例: JA */}
              {localeItem}
            </span>
            <span>
              {/* 各自の言語におけるロケール - 例: 日本語 */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* 現在のロケールでの言語 - 例: Japonais (現在のロケールがフランス語の場合) */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* 英語でのロケール - 例: Japanese */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
```

> リンクに頼らず、`useLocale` フックで提供される `setLocale` 変数を使用することも一つの方法です。より高度な機能については、[`useLocale` ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/next-intlayer/useLocale.md)を参照してください。

### （オプション）ステップ9: 現在のロケールをServer Actionsで取得する

Server Actionsで現在のロケールを取得して、リクエストを実行する（例: メール送信やAPIのリクエスト）場合は、`next-intlayer/server`モジュールから`getLocale`関数を使用できます。

```tsx fileName="src/app/actions/getLocale.ts" codeFormat="typescript"
"use server";

import { getLocale } from "next-intlayer/server";

export const myServerAction = async () => {
  const locale = await getLocale();

  // ロケールを使用して特定の処理を実行する
};
```

> `getLocale` は次の優先順でロケールを決定します：
>
> 1. NextのHTTPリクエストのヘッダーに含まれる言語をチェックする。
> 2. ヘッダーがない場合は、Cookieをチェックして適切な言語を探す。
> 3. ヘッダーもCookieも見つからない場合は、ローカル環境変数（ブラウザの言語設定）を確認する。
> 4. いずれも見つからない場合は、設定のデフォルト言語を返す。
>
> 優先順位により、柔軟にエラーレスで言語設定を行うことが可能です。

### （オプション）ステップ10: ビルドバンドル（容量）の最適化

`next-intlayer` パッケージを使用すると、すべてのページコンポーネントにおける辞書を含んだクライアントサイドの「バンドル化」が行われます。
これは全体のバンドル容量を無駄に大きくする原因になり得ます。最適化のためには、必要な要素だけをビルドに含める`@intlayer/swc`というNextのSWCプラグイン（マクロ）を使用することが推奨されます。

SWCプラグインは以下のようにインストールするだけで適用されます：

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

> ご注意: 開発の仕様上、Next.js 13以上のSWC環境下でプラグインが動作します。
>
> なお、コンパイラ拡張プラグイン（Next APIのSWCカスタム）の挙動により、`<Suspense>`でラッピングするか、特定の「importMode: fetch」を正しく構成しない場合、`useIntlayer`やダイナミックルーティングの読み込みでエラーを吐き、クライアントレンダリングでクラッシュする現象が生じる可能性があります。ルート階層などでは適切に対応を行ってください。

### 辞書の更新をTurbopack（Next dev環境）に反映する

Next APIの仕様上、Turbopackを使用した`next dev`ではファイルのWatch変更イベントの並列実行プラグインとして機能しません。これに対処するために、プロキシとして並行実行を行うために`intlayer watch`コマンドプロセスを付与する必要があります。

`package.json`のscriptsを以下のように編集してください。

```json5 fileName="package.json"
{
  "scripts": {
    "dev": "intlayer watch --with 'next dev'",
  },
}
```

> 旧バージョン（`next-intlayer@<=6.x.x`）の環境では、必ず`--turbopack`のフラグを指定する必要があります。

### TypeScriptと開発環境へのサポート設定（Intellisense）

IntlayerはTypeScriptに対して、定義ファイル拡張（Type Module Augmentation）を行い、コードに対する自動補完と安全なタイピングをシステム上で自動構築します。これにより開発中の補完の有効化やエラー箇所の指摘（リンティング）を行えます。

![自動補完 (Autocomplete)](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![エラー検知](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

TypeScriptのパーサーが隠しディレクトリ内のインテリセンス辞書定義（`.intlayer/**/*.ts`）を読み込ませるために、プロジェクト・ルートの`tsconfig.json`へパスの追加を行ってください：

```json5 fileName="tsconfig.json"
{
  // ... 本来の設定 ...
  "include": [
    // ... Nextなど元から設定されている配列 ...
    ".intlayer/**/*.ts",
  ],
}
```

### Git - `.gitignore`への追加設定

Intlayerはシステム構築の実行時（または開発中）に、バックグラウンドの仮想環境内で辞書コンパイルデータや型定義を常時キャッシュ生成しています。
環境ごとのファイル競合を防ぐために、バージョン管理（Gitなど）のトラッキングからディレクトリを含めないように必ず設定する必要があります。

```plaintext fileName=".gitignore"
# Intlayerのビルド/キャッシュファイルをGit追跡対象から除外する
.intlayer
```

### Visual Studio Code 拡張機能の活用

VS Code向けに公式のIntlayer連携・開発アシストツール**Intlayer VS Code Extension**が用意されています。

[VS Code拡張機能（Marketplace）のインストール](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)をすることで利用できます。

この拡張機能は以下の役立つ機能を提供します：

- **Intellisense補完の強化**: パラメーター、テキスト抽出においてVSCode上で直接自動補完の支援。
- **インライン・リンター（エラー表示）**: パス指定のミスだけでなく、多言語翻訳において英語はあるが「日本語への翻訳データがない」など、コード上で赤線を使って即座に通知します。
- **インライン・ポップアッププレビュー**: ホバー操作をすることで実際の変換出力されたテキストデータのプレビューが可能となり、コードを行き来する回数が大幅に削減できます。

VS Code統合の詳しいガイドとヘルプは[VS Code拡張機能について](https://intlayer.org/doc/vs-code-extension)を参照してください。

### 次のステップ: 本格的なシステム連携

ここまでの操作で多言語対応やUIとの連携が出来るようになりました。ここから、GUIを利用してより広範に多言語コンテンツを管理する「[Intlayer Visual Editor（UI編集ツール）に関するガイド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md)」や、さらには開発側のソースコードやデプロイに依存せず、運用チームがクラウドから更新できる「[Intlayer Native CMS機能とクラウドデータ構築（CMS連携用チュートリアル）](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md)」についての理解を進めましょう。
