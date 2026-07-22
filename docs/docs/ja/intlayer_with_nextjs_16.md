---
createdAt: 2024-12-06
updatedAt: 2026-06-23
title: "Next.js 16 i18n - あなたのアプリを翻訳する完全ガイド"
description: "i18nextはもう不要。2026年に多言語（i18n）Next.js 16アプリを構築するためのガイド。AIエージェントで翻訳し、バンドルサイズ、SEO、パフォーマンスを最適化します。"
keywords:
  - 国際化
  - ドキュメント
  - Intlayer
  - Next.js 16
  - JavaScript
  - React
slugs:
  - doc
  - environment
  - nextjs
applicationTemplate: https://github.com/aymericzip/intlayer-next-16-template
applicationShowcase: https://intlayer-next-16-template.vercel.app
youtubeVideo: https://www.youtube.com/watch?v=e_PPG7PTqGU
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Solid の useIntlayer API の使用法を直接プロパティアクセスに更新"
  - version: 7.5.9
    date: 2025-12-30
    changes: "initコマンドを追加"
  - version: 7.0.6
    date: 2025-11-01
    changes: "`alternates` オブジェクトに `x-default` の記述を追加"
  - version: 7.0.0
    date: 2025-06-29
    changes: "履歴の初期化"
author: aymericzip
---

# Intlayerを使ってNext.js 16のウェブサイトを翻訳する | 国際化（i18n）

<Tabs defaultTab="video">
  <Tab label="動画" value="video">

<iframe title="Next.jsに最適なi18nソリューション？Intlayerを発見" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/e_PPG7PTqGU?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="コード" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-next-16-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="デモ CodeSandbox - Intlayerを使用してアプリケーションを国際化する方法"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="デモ" value="demo">

<iframe
  src="https://intlayer-next-16-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="デモ - intlayer-next-16-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

GitHubの[アプリケーションテンプレート](https://github.com/aymericzip/intlayer-next-16-template)をご覧ください。

## 目次

<TOC/>

## 代替手段ではなく Interlayer を使用する理由

「next-intl」や「i18next」などの主要なソリューションと比較して、Intlayer は次のような統合された最適化を備えたソリューションです。

**Next.js を完全にカバー**

Intlayer は、効率的なレンダリングのために **サーバー コンポーネント** と連携するように最適化されており、[**Turbopack**](https://nextjs.org/docs/architecture/turbopack) と完全に互換性があります。静的レンダリングをブロックせず、ミドルウェアとスケーリング国際化 (i18n) に必要なすべての機能を提供します。

> Intlayer は Next.js 12、13、14、15、および 16 と互換性があります。 Next.js Pages Router を使用している場合は、この [ガイド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_page_router.md) を参照してください。
> ロケール ルーティングは、SEO、バンドル サイズ、パフォーマンスに役立ちます。必要ない場合は、この[ガイド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_no_locale_path.md)を参照してください。
> App Router を使用した Next.js 12、13、14、および 15 については、この [ガイド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_14.md) を参照してください。

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

## Next.jsアプリケーションでIntlayerをセットアップするステップバイステップガイド

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
npm install intlayer next-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer
```

```bash packageManager="bun"
bun add intlayer next-intlayer
```

- **intlayer**

  設定管理、翻訳、[コンテンツ宣言](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/content_file.md)、トランスパイル、および[CLIコマンド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/index.md)のための国際化ツールを提供するコアパッケージです。

- **next-intlayer**

  IntlayerをNext.jsと統合するパッケージです。Next.jsの国際化のためのコンテキストプロバイダーやフックを提供します。さらに、Intlayerを[Webpack](https://webpack.js.org/)や[Turbopack](https://nextjs.org/docs/app/api-reference/turbopack)と統合するためのNext.jsプラグイン、ユーザーの優先ロケール検出、クッキー管理、URLリダイレクト処理のためのプロキシも含まれています。

</Step>

<Step number={2} title="プロジェクトの設定">

最終的な構成は以下のようになります：

```bash
.
├── src
│   ├── app
│   │   ├── [locale]
│   │   │   ├── layout.tsx            # Intlayerプロバイダー用のロケールレイアウト
│   │   │   ├── page.content.ts
│   │   │   └── page.tsx
│   │   └── layout.tsx                # スタイルとグローバルプロバイダー用のルートレイアウト
│   ├── components
│   │   ├── client-component-example.content.ts
│   │   ├── ClientComponentExample.tsx
│   │   ├── LocaleSwitcher
│   │   │   ├── localeSwitcher.content.ts
│   │   │   └── LocaleSwitcher.tsx
│   │   ├── server-component-example.content.ts
│   │   └── ServerComponentExample.tsx
│   └── proxy.ts
├── intlayer.config.ts
├── next.config.ts
├── package.json
└── tsconfig.json
```

> ロケールルーティングが不要な場合、intlayerはシンプルなプロバイダー/フックとして使用できます。詳細は[このガイド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_nextjs_no_locale_path.md)を参照してください。

アプリケーションの言語を設定するための設定ファイルを作成します：

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
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

> この設定ファイルを通じて、ローカライズされたURLの設定、プロキシリダイレクト、クッキー名、コンテンツ宣言の場所と拡張子の指定、コンソールでのIntlayerログの無効化などが行えます。利用可能なパラメータの完全なリストについては、[設定ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)を参照してください。

</Step>

<Step number={3} title="Next.jsの設定にIntlayerを統合する">

Next.jsのセットアップをIntlayerを使うように設定します:

```typescript fileName="next.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { NextConfig } from "next";
import { withIntlayer } from "next-intlayer/server";

const nextConfig: NextConfig = {/* ここに設定オプションを記述 */};

export default withIntlayer(nextConfig);
```

> `withIntlayer()` は Next.js プラグインで、Intlayer を Next.js と統合するために使用されます。これにより、コンテンツ宣言ファイルのビルドが保証され、開発モードでそれらを監視します。また、[Webpack](https://webpack.js.org/) や [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack) 環境内で Intlayer の環境変数を定義します。さらに、パフォーマンス最適化のためのエイリアスを提供し、サーバーコンポーネントとの互換性を確保します。

> `withIntlayer()` 関数は Promise 関数です。ビルド開始前に Intlayer の辞書を準備することができます。他のプラグインと一緒に使用したい場合は、await で待機できます。例：
>
> ```ts
> const nextConfig = await withIntlayer(nextConfig);
> const nextConfigWithOtherPlugins = withOtherPlugins(nextConfig);
>
> export default nextConfigWithOtherPlugins;
> ```
>
> 同期的に使用したい場合は、`withIntlayerSync()` 関数を使用できます。例：
>
> ```ts
> const nextConfig = withIntlayerSync(nextConfig);
> const nextConfigWithOtherPlugins = withOtherPlugins(nextConfig);
>
> export default nextConfigWithOtherPlugins;
> ```

> Intlayer は、コマンドラインフラグ `--webpack`、`--turbo`、または `--turbopack`、および現在の **Next.js バージョン** に基づいて、プロジェクトが **webpack** または **Turbopack** を使用しているかどうかを自動的に検出します。
>
> `next>=16` 以降、**Rspack** を使用している場合は、Turbopack を無効にして webpack 設定を使用するように Intlayer に明示的に強制する必要があります。
>
> ```ts
> withRspack(withIntlayer(nextConfig, { enableTurbopack: false }));
> ```

</Step>

<Step number={4} title="動的ロケールルートの定義">

`RootLayout` の内容をすべて削除し、以下のコードに置き換えます：

```tsx {3} fileName="src/app/layout.tsx" codeFormat={["typescript", "esm"]}
import type { PropsWithChildren, FC } from "react";
import "./globals.css";

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
  // `next-themes`、`react-query`、`framer-motion` などの他のプロバイダーで子要素をラップすることも可能です。
  <>{children}</>
);

export default RootLayout;
```

> `RootLayout` コンポーネントを空のままにしておくことで、`<html>` タグに [`lang`](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/lang) および [`dir`](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/dir) 属性を設定できます。

動的ルーティングを実装するには、`[locale]`ディレクトリに新しいレイアウトを追加してロケールのパスを指定します：

```tsx fileName="src/app/[locale]/layout.tsx" codeFormat={["typescript", "esm"]}
import { type NextLayoutIntlayer, IntlayerClientProvider } from "next-intlayer";
import { Inter } from "next/font/google";
import { getHTMLTextDir } from "intlayer";

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;
  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body className={inter.className}>
        <IntlayerClientProvider locale={locale}>
          {children}
        </IntlayerClientProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
```

> `[locale]` パスセグメントはロケールを定義するために使用されます。例：`/en-US/about` は `en-US` を指し、`/fr/about` は `fr` を指します。

> この段階で、`Error: Missing <html> and <body> tags in the root layout.` というエラーが発生します。これは予期されたもので、`/app/page.tsx` ファイルはもはや使用されておらず、削除して問題ありません。代わりに、`[locale]` パスセグメントが `/app/[locale]/page.tsx` ページを有効にします。その結果、ブラウザでは `/en`、`/fr`、`/es` のようなパスでページにアクセスできるようになります。デフォルトのロケールをルートページとして設定するには、ステップ7の `proxy` 設定を参照してください。

次に、アプリケーションのレイアウト内で `generateStaticParams` 関数を実装します。

```tsx {1} fileName="src/app/[locale]/layout.tsx" codeFormat={["typescript", "esm"]}
export { generateStaticParams } from "next-intlayer"; // 挿入する行

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  /*... 残りのコード */
};

export default LocaleLayout;
```

> `generateStaticParams` は、アプリケーションがすべてのロケールに対して必要なページを事前にビルドすることを保証し、実行時の計算を減らしユーザー体験を向上させます。詳細は [Next.js の generateStaticParams に関するドキュメント](https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic-rendering#generate-static-params) を参照してください。

> Intlayer は `export const dynamic = 'force-static';` と連携して、すべてのロケールのページが事前にビルドされることを保証します。

</Step>

<Step number={5} title="コンテンツの宣言">

翻訳を格納するためのコンテンツ宣言を作成・管理します：

```tsx fileName="src/app/[locale]/page.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const pageContent = {
  key: "page",
  content: {
    getStarted: {
      main: t({
        en: "Get started by editing",
        fr: "Commencez par éditer",
        es: "Comience por editar",
      }),
      pageLink: "src/app/page.tsx",
    },
  },
} satisfies Dictionary;

export default pageContent;
```

```json fileName="src/app/[locale]/page.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "page",
  "content": {
    "getStarted": {
      "nodeType": "translation",
      "translation": {
        "en": "Get started by editing",
        "fr": "Commencez par éditer",
        "es": "Comience por editar"
      }
    },
    "pageLink": "src/app/page.tsx"
  }
}
```

> コンテンツ宣言は、`contentDir` ディレクトリ（デフォルトは `./src`）に含まれている限り、アプリケーションのどこにでも定義できます。また、コンテンツ宣言ファイルの拡張子は（デフォルトで `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`）に一致する必要があります。

> 詳細については、[コンテンツ宣言のドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/content_file.md)を参照してください。

</Step>

<Step number={6} title="コード内でコンテンツを利用する">

アプリケーション全体でコンテンツ辞書にアクセスします：

```tsx fileName="src/app/[locale]/page.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { type NextPageIntlayer } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";

const PageContent: FC = () => {
  const content = useIntlayer("page");

  return (
    <>
      <p>{content.getStarted.main}</p>
      <code>{content.getStarted.pageLink}</code>
    </>
  );
};

const Page: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerServerProvider locale={locale}>
      <PageContent />
      <ServerComponentExample />

      <ClientComponentExample />
    </IntlayerServerProvider>
  );
};

export default Page;
```

- **`IntlayerClientProvider`** はクライアントサイドのコンポーネントにロケールを提供するために使用されます。レイアウトを含む任意の親コンポーネントに配置できます。ただし、Next.jsはページ間でレイアウトコードを共有するため、レイアウトに配置することが推奨されます。レイアウトで `IntlayerClientProvider` を使用することで、各ページごとに再初期化する必要がなくなり、パフォーマンスが向上し、アプリケーション全体で一貫したローカリゼーションコンテキストを維持できます。
- **`IntlayerServerProvider`** はサーバー側の子コンポーネントにロケールを提供するために使用されます。レイアウトには設定できません。

  > レイアウトとページは共通のサーバーコンテキストを共有できません。なぜなら、サーバーコンテキストシステムはリクエストごとのデータストア（[Reactのcache](https://react.dev/reference/react/cache) メカニズム）に基づいており、アプリケーションの異なるセグメントごとに「コンテキスト」が再作成されるためです。プロバイダーを共有レイアウトに配置すると、この分離が破られ、サーバーコンポーネントに正しくサーバーコンテキストの値が伝播されなくなります。

```tsx {4,7} fileName="src/components/ClientComponentExample.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ClientComponentExample: FC = () => {
  const content = useIntlayer("client-component-example"); // 関連するコンテンツ宣言を作成

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```tsx {2} fileName="src/components/ServerComponentExample.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "next-intlayer/server";

export const ServerComponentExample: FC = () => {
  const content = useIntlayer("server-component-example"); // 関連するコンテンツ宣言を作成

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> コンテンツを `alt`、`title`、`href`、`aria-label` などの `string` 属性で使用したい場合は、関数の値を使用できます。例えば：

> ```html
> <img src="{content.image.src.value}" alt="{content.image.value}" />
> <img src="{content.image.src.toString()}" alt="{content.image.toString()}" />
> <img src="{String(content.image.src)}" alt="{String(content.image)}" />
> ```

> `useIntlayer` フックの詳細については、[ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/next-intlayer/useIntlayer.md)を参照してください。

> アプリケーションが既に存在する場合は、[Intlayer コンパイラ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compiler.md) と [抽出コマンド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/extract.md) を組み合わせて、1 秒で何千ものコンポーネントを変換できます。

</Step>

<Step number={7} title="ロケール検出のためのプロキシ設定">

ユーザーの優先ロケールを検出するためのプロキシを設定します：

```typescript fileName="src/proxy.ts" codeFormat={["typescript", "esm", "commonjs"]}
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

> `intlayerProxy` はユーザーの優先ロケールを検出し、[設定](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)で指定された適切なURLにリダイレクトするために使用されます。さらに、ユーザーの優先ロケールをクッキーに保存することも可能にします。

> 複数のプロキシを連結する必要がある場合（例えば、認証付きの `intlayerProxy` やカスタムプロキシと組み合わせる場合）、Intlayer は `multipleProxies` というヘルパーを提供しています。

```ts
import { multipleProxies, intlayerProxy } from "next-intlayer/proxy";
import { customProxy } from "@utils/customProxy";

export const proxy = multipleProxies([intlayerProxy, customProxy]);
```

</Step>

<Step number={8} title="メタデータの国際化">

ページのタイトルなどのメタデータを国際化したい場合は、Next.jsが提供する `generateMetadata` 関数を使用できます。その中で、`getIntlayer` 関数からコンテンツを取得してメタデータを翻訳できます。

```typescript fileName="src/app/[locale]/metadata.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { type Dictionary, t } from "intlayer";
import { Metadata } from "next";

const metadataContent = {
  key: "page-metadata",
  content: {
    title: t({
      en: "Create Next App",
      fr: "Créer une application Next.js",
      es: "Crear una aplicación Next.js",
    }),
    description: t({
      en: "Generated by create next app",
      fr: "Généré par create next app",
      es: "Generado por create next app",
    }),
  },
} satisfies Dictionary<Metadata>;

export default metadataContent;
```

```json fileName="src/app/[locale]/metadata.content.json" contentDeclarationFormat="json"
{
  "key": "page-metadata",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "Preact logo",
        "fr": "Logo Preact",
        "es": "Logo Preact"
      }
    },
    "description": {
      "nodeType": "translation",
      "translation": {
        "en": "Generated by create next app",
        "fr": "Généré par create next app",
        "es": "Generado por create next app"
      }
    }
  }
}
```

````typescript fileName="src/app/[locale]/layout.tsx or src/app/[locale]/page.tsx" codeFormat={["typescript", "esm"]}
import { getIntlayer, getMultilingualUrls } from "intlayer";
import type { Metadata } from "next";
import type { LocalPromiseParams } from "next-intlayer";

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;

  const metadata = getIntlayer("page-metadata", locale);

  /**
   * 各ロケールのすべてのURLを含むオブジェクトを生成します。
   *
   * 例:
   * ```ts
   *  getMultilingualUrls('/about');
   *
   *  // 戻り値
   *  // {
   *  //   en: '/about',
   *  //   fr: '/fr/about',
   *  //   es: '/es/about',
   *  // }
   * ```
   */
  const multilingualUrls = getMultilingualUrls("/");
  const localizedUrl =
    multilingualUrls[locale as keyof typeof multilingualUrls];

  return {
    ...metadata,
    alternates: {
      canonical: localizedUrl,
      languages: { ...multilingualUrls, "x-default": "/" },
    },
    openGraph: {
      url: localizedUrl,
    },
  };
};

// ... 残りのコード
````

> `next-intlayer` からインポートされた `getIntlayer` 関数は、コンテンツを `IntlayerNode` でラップして返し、ビジュアルエディタとの統合を可能にします。対照的に、`intlayer` からインポートされた `getIntlayer` 関数は、追加のプロパティなしで直接コンテンツを返します。

代わりに、`getTranslation` 関数を使用してメタデータを宣言することもできます。ただし、メタデータの翻訳を自動化し、コンテンツを外部化するためには、コンテンツ宣言ファイルを使用することが推奨されます。

```typescript fileName="src/app/[locale]/layout.tsx or src/app/[locale]/page.tsx" codeFormat={["typescript", "esm"]}
import {
  type IConfigLocales,
  getTranslation,
  getMultilingualUrls,
} from "intlayer";
import type { Metadata } from "next";
import type { LocalPromiseParams } from "next-intlayer";

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;
  const t = <T>(content: IConfigLocales<T>) => getTranslation(content, locale);

  return {
    title: t<string>({
      en: "My title",
      fr: "Mon titre",
      es: "Mi título",
    }),
    description: t({
      en: "My description",
      fr: "Ma description",
      es: "Mi descripción",
    }),
  };
};

// ... 残りのコード
```

> メタデータの最適化について詳しくは、[公式Next.jsドキュメント](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)をご覧ください。

</Step>

<Step number={9} title="sitemap.xml と robots.txt の多言語対応">

`sitemap.xml` と `robots.txt` を多言語対応にするには、Intlayer が提供する `getMultilingualUrls` 関数を使用できます。この関数を使うことで、サイトマップ用の多言語 URL を生成できます。

```tsx fileName="src/app/sitemap.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { getMultilingualUrls } from "intlayer";
import type { MetadataRoute } from "next";

const sitemap = (): MetadataRoute.Sitemap => [
  {
    url: "https://example.com",
    alternates: {
      languages: {
        ...getMultilingualUrls("https://example.com"),
        "x-default": "https://example.com",
      },
    },
  },
  {
    url: "https://example.com/login",
    alternates: {
      languages: {
        ...getMultilingualUrls("https://example.com/login"),
        "x-default": "https://example.com/login",
      },
    },
  },
  {
    url: "https://example.com/register",
    alternates: {
      languages: {
        ...getMultilingualUrls("https://example.com/register"),
        "x-default": "https://example.com/register",
      },
    },
  },
];

export default sitemap;
```

```tsx fileName="src/app/robots.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { MetadataRoute } from "next";
import { getMultilingualUrls } from "intlayer";

const getAllMultilingualUrls = (urls: string[]) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)) as string[]);

const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: "*",
    allow: ["/"],
    disallow: getAllMultilingualUrls(["/login", "/register"]),
  },
  host: "https://example.com",
  sitemap: `https://example.com/sitemap.xml`,
});

export default robots;
```

> サイトマップの最適化については、[公式の Next.js ドキュメント](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap)をご覧ください。robots.txt の最適化については、[公式の Next.js ドキュメント](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots)をご覧ください。

</Step>

<Step number={10} title="コンテンツの言語を変更する">

Next.js でコンテンツの言語を変更するには、推奨される方法として `Link` コンポーネントを使用してユーザーを適切なローカライズされたページにリダイレクトする方法があります。 `Link` コンポーネントはページのプリフェッチを可能にし、完全なページリロードを回避するのに役立ちます。

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "next-intlayer";
import Link from "next/link";

export const LocaleSwitcher: FC = () => {
  const { locale, pathWithoutLocale, availableLocales, setLocale } =
    useLocale();

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <Link
            href={getLocalizedUrl(pathWithoutLocale, localeItem)}
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocale(localeItem)}
            replace // 「戻る」ブラウザボタンが前のページにリダイレクトすることを保証します
          >
            <span>
              {/* ロケール - 例: FR */}
              {localeItem}
            </span>
            <span>
              {/* 自身のロケールでの言語名 - 例: Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* 現在のロケールでの言語名 - 例: Francés（現在のロケールが Locales.SPANISH の場合） */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* 英語での言語名 - 例: French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
```

> 代替方法として、 `useLocale` フックで提供される `setLocale` 関数を使用することもできます。この関数はページのプリフェッチを許可しません。詳細は [`useLocale` フックのドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/next-intlayer/useLocale.md) を参照してください。

> また、 `onLocaleChange` オプションに関数を設定して、ロケールが変更されたときにカスタム関数をトリガーすることも可能です。

```tsx fileName="src/components/LocaleSwitcher.tsx"
"use client";

import { useRouter } from "next/navigation";
import { useLocale } from "next-intlayer";
import { getLocalizedUrl } from "intlayer";

// ... 残りのコード

const router = useRouter();
const { setLocale } = useLocale({
  onLocaleChange: (locale) => {
    router.push(getLocalizedUrl(pathWithoutLocale, locale));
  },
});

return (
  <button onClick={() => setLocale(Locales.FRENCH)}>フランス語に変更</button>
);
```

> ドキュメント参照:
>
> - [`useLocale` フック](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/next-intlayer/useLocale.md)
> - [`getLocaleName` フック](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl` フック](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` フック](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/intlayer/getHTMLTextDir.md)
> - [`hrefLang` 属性](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [`lang` 属性](https://developer.mozilla.org/ja/docs/Web/HTML/Global_attributes/lang)
> - [`dir` 属性](https://developer.mozilla.org/ja/docs/Web/HTML/Global_attributes/dir)
> - [`aria-current` 属性](https://developer.mozilla.org/ja/docs/Web/Accessibility/ARIA/Attributes/aria-current)

</Step>

<Step number={11} title="ローカライズされたリンクコンポーネントの作成">

アプリケーションのナビゲーションが現在のロケールを尊重するようにするために、カスタムの `Link` コンポーネントを作成できます。このコンポーネントは内部のURLに自動的に現在の言語をプレフィックスとして付加します。例えば、フランス語ユーザーが「About」ページへのリンクをクリックすると、 `/about` ではなく `/fr/about` にリダイレクトされます。

この動作は以下の理由で有用です：

- **SEOとユーザー体験**：ローカライズされたURLは検索エンジンが言語別のページを正しくインデックスし、ユーザーに好みの言語でコンテンツを提供するのに役立ちます。
- **一貫性**：アプリケーション全体でローカライズされたリンクを使用することで、ナビゲーションが現在のロケール内に留まり、予期しない言語切り替えを防ぎます。
- **保守性**：URLの管理を単一のコンポーネントに集約することで、コードベースの保守や拡張が容易になります。

以下は、TypeScript によるローカライズされた `Link` コンポーネントの実装です：

```tsx fileName="src/components/Link.tsx" codeFormat={["typescript", "esm"]}
"use client";

import { getLocalizedUrl } from "intlayer";
import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import { useLocale } from "next-intlayer";
import type { PropsWithChildren, FC } from "react";

/**
 * 指定された URL が外部かどうかを確認するユーティリティ関数。
 * URL が http:// または https:// で始まる場合、外部とみなされます。
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * 現在のロケールに基づいて href 属性を適応させるカスタム Link コンポーネント。
 * 内部リンクの場合、`getLocalizedUrl` を使用して URL にロケールを付加します (例: /fr/about)。
 * これにより、ナビゲーションが同じロケールコンテキスト内に留まることが保証されます。
 */
export const Link: FC<PropsWithChildren<NextLinkProps>> = ({
  href,
  children,
  ...props
}) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  // リンクが内部であり、有効な href が提供されている場合、ローカライズされた URL を取得します。
  const hrefI18n: NextLinkProps["href"] =
    href && !isExternalLink ? getLocalizedUrl(href.toString(), locale) : href;

  return (
    <NextLink href={hrefI18n} {...props}>
      {children}
    </NextLink>
  );
};
```

#### 仕組み

- **外部リンクの検出**:  
  ユーティリティ関数 `checkIsExternalLink` は、URL が外部かどうかを判断します。外部リンクはローカライズの必要がないため、そのまま保持されます。

- **現在のロケールの取得**:  
  `useLocale` フックは、現在のロケール（例: フランス語なら `fr`）を提供します。

- **URL のローカライズ**:  
  内部リンク（外部以外）の場合、`getLocalizedUrl` を使用して、自動的に現在のロケールを URL の先頭に付加します。つまり、ユーザーがフランス語の設定であれば、 `/about` を渡すと `/fr/about` に変換されます。

- **リンクの返却**:  
  コンポーネントはローカライズされた URL を持つ `<a>` 要素を返し、ナビゲーションがロケールと一致するようにします。

この `Link` コンポーネントをアプリケーション全体に統合することで、一貫性のある言語対応のユーザー体験を維持しつつ、SEO やユーザビリティの向上というメリットも得られます。

</Step>

<Step number={12} title="Server Actions で現在のロケールを取得する" isOptional={true}>

Server Action 内でアクティブなロケールが必要な場合（例：電子メールのローカライズやロケールに対応したロジックの実行など）、`next-intlayer/server` から `getLocale` を呼び出します：

```tsx fileName="src/app/actions/getLocale.ts" codeFormat="typescript"
"use server";

import { getLocale } from "next-intlayer/server";

export const myServerAction = async () => {
  const locale = await getLocale();

  // ロケールを使用した処理
};
```

> `getLocale` 関数は、ユーザーのロケールを決定するために段階的な戦略に従います：
>
> 1. まず、プロキシによって設定された可能性のあるロケール値についてリクエストヘッダーを確認します
> 2. ヘッダーにロケールが見つからない場合、クッキーに保存されているロケールを探します
> 3. クッキーが見つからない場合、ブラウザの設定からユーザーの優先言語の検出を試みます
> 4. 最終手段として、アプリケーションに設定されているデフォルトロケールにフォールバックします
>
> これにより、利用可能なコンテキストに基づいて最も適切なロケールが選択されます。

</Step>

<Step number={13} title="バンドルサイズの最適化">

`next-intlayer` を使用すると、辞書がデフォルトで全ページのバンドルに含まれます。バンドルサイズを最適化するために、Intlayer はマクロを使用して `useIntlayer` の呼び出しを賢く置き換えるオプションの SWC プラグインを提供しています。これにより、辞書は実際に使用されているページのバンドルにのみ含まれるようになります。

この最適化を有効にするには、`@intlayer/swc` パッケージをインストールしてください。インストール後、`next-intlayer` は自動的にプラグインを検出して使用します。

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

> 注意: この最適化は Next.js 13 以降でのみ利用可能です。

> 注意: SWC プラグインは Next.js ではまだ実験的な機能のため、このパッケージはデフォルトでインストールされていません。将来的に変更される可能性があります。
> </Step>

<Step number={14} title="コンポーネントのコンテンツを抽出する" isOptional={true}>

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

### Turbopack での辞書の変更の監視

`next dev --turbopack` コマンドを使用して開発サーバーとして Turbopack を使用する場合、デフォルトでは辞書の変更が自动的に検出されません。

この制限は、Turbopack がコンテンツファイルの変更を監視するために webpack プラグインを並行して実行できないために発生します。これを回避するには、`intlayer watch` コマンドを使用して、開発サーバーと Intlayer ビルドウォッチャーを同時に実行する必要があります。

```json5 fileName="package.json"
{
  // ... 既存の package.json 設定
  "scripts": {
    // ... 既存のスクリプト設定
    "dev": "intlayer watch --with 'next dev'",
  },
}
```

> next-intlayer@<=6.x.x を使用している場合、Next.js 16 アプリケーションが Turbopack で正しく動作するように `--turbopack` フラグを維持する必要があります。この制限を回避するために、next-intlayer@>=7.x.x を使用することをお勧めします。

### TypeScript の設定

Intlayer はモジュール拡張を使用して TypeScript の利点を活かし、コードベースをより強固にします。

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

TypeScript の設定に自動生成された型を含めていることを確認してください。

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

Intlayer によって生成されたファイルは無視することを推奨します。これにより、Git リポジトリへのコミットを避けることができます。

これを行うには、`.gitignore` ファイルに以下の指示を追加してください。

```plaintext fileName=".gitignore"
# Intlayer によって生成されたファイルを無視する
.intlayer
```

### VS Code 拡張機能

Intlayer での開発体験を向上させるために、公式の **Intlayer VS Code 拡張機能** をインストールできます。

[VS Code Marketplace からインストール](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

この拡張機能は以下を提供します：

- 翻訳キーの **オートコンプリート**
- **翻訳が不足している場合のリアルタイムエラー検出**。
- **翻訳されたコンテンツのインラインプレビュー**。
- **翻訳を簡単に作成・更新するためのクイックアクション**。

拡張機能の使い方の詳細については、[Intlayer VS Code 拡張機能のドキュメント](https://intlayer.org/doc/vs-code-extension)を参照してください。

### さらに進むには

さらに進むには、[ビジュアルエディター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md)を実装するか、[CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md)を使用してコンテンツを外部化することができます。
