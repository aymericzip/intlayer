---
createdAt: 2026-01-10
updatedAt: 2026-01-10
title: Next.js i18n - 既存の Next.js アプリを多言語アプリに変換する (i18n ガイド 2026)
description: Intlayerコンパイラを使用して、既存のNext.jsアプリケーションを多言語化する方法を学びます。ドキュメントに従って国際化（i18n）し、AIを利用して翻訳を行います。
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

# 既存の Next.js アプリケーションを多言語化 (i18n) する方法 (i18n ガイド 2026)

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

### ステップ1: 依存関係のインストール

好みのパッケージマネージャーを使用して必要なパッケージをインストールします：

```bash packageManager="npm"
npm install intlayer next-intlayer
npm install @intlayer/babel --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer
pnpm add @intlayer/babel --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer
yarn add @intlayer/babel --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer next-intlayer
bun add @intlayer/babel --dev
bunx intlayer init
```

- **intlayer**

  構成管理、翻訳、[コンテンツ宣言](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/content_file.md)、トランスパイル、[CLIコマンド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/index.md)のための国際化ツールを提供するコアパッケージ。

- **next-intlayer**

  IntlayerをNext.jsと統合するパッケージ。Next.jsの国際化のためのコンテキストプロバイダーとフックを提供します。さらに、Intlayerを[Webpack](https://webpack.js.org/)または[Turbopack](https://nextjs.org/docs/app/api-reference/turbopack)と統合するためのNext.jsプラグイン、ユーザーの優先ロケールを検出、Cookie管理、URLリダイレクトを処理するためのミドルウェアが含まれています。

### ステップ2: プロジェクトの構成

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
    enabled: true, // devモードでの影響を制限するために'build-only'に設定可能
    outputDir: "i18n",
    dictionaryKeyPrefix: "", // コンパイルプレフィックスなし、デフォルトは"comp-"
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

### ステップ3: Next.jsの設定にIntlayerを統合する

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

### Babel の構成

Intlayerコンパイラは、コンテンツを抽出し最適化するためにBabelを必要とします。 `babel.config.js`（または `babel.config.json`）を更新してIntlayerプラグインを含めます：

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

### ステップ4: ページでのロケール検出

`RootLayout` の内容をクリアし、以下の例に置き換えます：

```tsx fileName="src/app/layout.tsx"
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

### ステップ5: コンテンツを宣言する（自動）

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

  </Tab>
</Tabs>

- **`IntlayerClientProvider`** は、クライアントサイドで子要素にロケールを提供するために使用されます。
- 一方、 **`IntlayerServerProvider`** は、サーバーサイドで子要素にロケールを提供するために使用されます。

### (オプション) ステップ 7: 不足している翻訳を埋める

Intlayerは、不足している翻訳を埋めるためのCLIツールを提供しています。 `intlayer` コマンドを使用して、コード内の不足している翻訳をテストして埋めることができます。

```bash
npx intlayer test         # 不足している翻訳があるかテスト
```

```bash
npx intlayer fill         # 不足している翻訳を埋める
```

### (オプション) ステップ 8: ローカライズされたルーティングプロキシミドルウェア

ユーザーを優先ロケールに自動的にリダイレクトしたい場合は、プロキシミドルウェアを設定します：

```typescript fileName="src/proxy.ts"
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

> `intlayerProxy` は、ユーザーの優先ロケールを検出し、[設定ファイルのセッティング](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)に従って適切なURLにリダイレクトするために使用されます。また、ユーザーの優先ロケールをCookieに保存することも可能です。

### (オプション) ステップ 9: コンテンツの言語を変更する

Next.js内でコンテンツの言語を変更する最も推奨される方法は、 `Link` コンポーネントを使用してユーザーを適切な言語ルートに誘導することです。これにより、Next.jsのプリフェッチ機能を活用し、ページ全体がハードリフレッシュされるのを防ぐことができます。

```tsx fileName="src/components/localeSwitcher/LocaleSwitcher.tsx"
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

### (オプション) ステップ 10: バンドルサイズの最適化

`next-intlayer` を使用する場合、デフォルトで各ページのバンドルに辞書が含まれます。バンドルサイズを最適化するために、Intlayerはマクロを使用して `useIntlayer` コールを賢く置き換えるオプションのSWCプラグインを提供しています。これにより、辞書は実際に使用されるページのバンドルにのみ含まれるようになります。

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
