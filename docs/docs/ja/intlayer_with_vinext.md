---
createdAt: 2026-11-23
updatedAt: 2026-11-23
title: "vinext i18n - Vite上のNext.jsアプリを翻訳するための完全ガイド"
description: "ViteでNext.js APIを動かすvinextにIntlayerを設定します。proxy.tsによるロケールルーティング、Server/Client Components、ローカライズされたメタデータ、サイトマップ、Cloudflare Workersへのデプロイまで解説します。"
keywords:
  - 国際化
  - ドキュメント
  - Intlayer
  - vinext
  - Next.js
  - Vite
  - Cloudflare Workers
  - React
slugs:
  - doc
  - environment
  - vinext
history:
  - version: 9.8.4
    date: 2026-11-23
    changes: "初期履歴"
author: aymericzip
---

# Intlayerでvinextサイトを翻訳する

[vinext](https://github.com/cloudflare/vinext)は、Next.js APIをVite上で再実装したものです。`app/`ディレクトリ、`next/*`のインポート、`proxy.ts`はそのまま動作しますが、ビルドはTurbopackやwebpackではなくViteで実行されます。

Intlayerは2つのパッケージでこの構成に組み込まれます。Next.jsで既にコンポーネントが使っているフック、プロバイダー、プロキシを提供する`next-intlayer`と、ビルド側（辞書のコンパイル、ウォッチ、バンドルの最適化）を担う`vite-intlayer`です。

> 独自のツールチェーンでNext.jsを動かしていますか？その場合は[Next.js 16ガイド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_nextjs_16.md)に従ってください。

- [Next.js 16ガイド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_nextjs_16.md)

## 目次

<TOC/>

## なぜ他の選択肢ではなくIntlayerなのか？

`next-intl`や`i18next`のようなソリューションと比べて、Intlayerには最適化が組み込まれています。

<AccordionGroup>
<Accordion header="ViteでNext.js APIのために作られています">

同じ`next-intlayer`のコードがNext.jsでもvinextでも動作します。Server Componentsはサーバー上でコンテンツを解決し、Client Componentsはプロバイダー経由で読み取り、ロケールルーティングは`proxy.ts`から実行されます。2つのツールチェーン間の移行でコンポーネントを変更する必要はありません。

</Accordion>
<Accordion header="バンドルサイズ">

巨大なJSONファイルをページに読み込む代わりに、必要なコンテンツだけを読み込みます。Viteプラグインが各`useIntlayer`呼び出しを、コンポーネントが実際に使うエントリに置き換えるため、**バンドルとページのサイズを最大50%削減**できます。

</Accordion>
<Accordion header="保守性">

コンテンツをコンポーネント単位に分けることで、大規模アプリケーションの**保守が簡単になります**。コンテンツ全体のコードベースを見直すことなく、機能フォルダを複製または削除でき、Intlayerは**完全に型付け**されているため、コンテンツの正確さが保たれます。

</Accordion>
<Accordion header="AIエージェント">

コンテンツを同じ場所に置くことで、LLMに必要な**コンテキストが減ります**。Intlayerは、翻訳漏れをテストする**CLI**、**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/lsp.md)**、**[MCPサーバー](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/mcp_server.md)**、**[エージェントスキル](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/agent_skills.md)**を提供します。

- [LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/lsp.md)
- [MCPサーバー](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/mcp_server.md)
- [エージェントスキル](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/agent_skills.md)

</Accordion>
<Accordion header="自動化">

お好みのLLMを使い、AIプロバイダーの料金負担でCI/CDパイプライン内で翻訳できます。Intlayerには、コンテンツ抽出を自動化する**コンパイラー**と、**バックグラウンドで翻訳**できる[Webプラットフォーム](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md)もあります。

- [Webプラットフォーム](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md)

</Accordion>
<Accordion header="非開発者との協業">

Intlayerは、**セルフホスト可能な[ビジュアルエディター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md)**と**[フルCMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md)**を提供し、翻訳者やコピーライターと**リアルタイム**で多言語コンテンツを管理できます。コンテンツはローカルまたはリモート（あるいは両方）に保存できます。

- [ビジュアルエディター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md)
- [フルCMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md)

</Accordion>
</AccordionGroup>

## vinextアプリケーションにIntlayerを設定するステップバイステップガイド

<Steps>
<Step number={1} title="依存関係をインストールする">

動作するvinextプロジェクトから始めます。新規作成するには`npm create vinext-app@latest`を実行します。既存のNext.jsアプリを移行するには`npx vinext init`を実行します。

次にIntlayerをインストールします。

```bash packageManager="npm"
npm install intlayer next-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer
yarn add vite-intlayer --dev
```

```bash packageManager="bun"
bun add intlayer next-intlayer
bun add vite-intlayer --dev
```

- **intlayer**

  設定管理、翻訳、[コンテンツ宣言](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/content_file.md)、トランスパイル、[CLIコマンド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/index.md)など、国際化ツールを提供するコアパッケージです。

- **next-intlayer**

  Next.js API向けのプロバイダー、フック、プロキシを提供します。vinextは`next/navigation`、`next/headers`、`next/server`を独自の実装に解決するため、`next-intlayer`は変更なしで動作します。

- **vite-intlayer**

  コンテンツ宣言をビルドし、開発中に監視し、本番バンドルで辞書を最適化するViteプラグインです。vinextが実行しないNext.jsプラグイン`withIntlayer()`の代わりになります。

</Step>
<Step number={2} title="プロジェクトを設定する">

アプリケーションでローカライズされたURLパス（例：`/en/about`、`/fr/about`）を使うか、パスにロケールセグメントを含めずにコンテンツを提供するか（例：`/about`、Cookie、ヘッダー、クエリパラメーターでロケールを検出）を選択します。

<Tabs group="routing-mode">
<Tab label="ロケールパスあり" value="with-locale-path">

### アーキテクチャ

ローカライズされたページはすべて動的セグメント`[locale]`の下にネストされます。言語ごとに固有のURLを持つため、SEOと静的レンダリングに推奨されます。

```bash
.
├── src
│   ├── app
│   │   ├── [locale]
│   │   │   ├── layout.tsx            # Locale layout for the Intlayer provider
│   │   │   ├── page.content.ts
│   │   │   └── page.tsx
│   │   └── layout.tsx                # Root layout for style and global providers
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
├── vite.config.ts
├── package.json
└── tsconfig.json
```

### 設定

`intlayer.config.ts`ファイルを作成して、対応言語を宣言します。

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Your other locales
    ],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    mode: "prefix-no-default", // or `prefix-all`
  },
};

export default config;
```

</Tab>
<Tab label="ロケールパスなし" value="without-locale-path">

### アーキテクチャ

ルートに`[locale]`セグメントは含まれません。すべてのページは`src/app/`直下に置かれ、ロケールはCookie、ヘッダー、クエリパラメーターから取得されます。ダッシュボードや認証が必要なアプリに適しています。

```bash
.
├── src
│   ├── app
│   │   ├── layout.tsx                # Root layout for Intlayer provider and styling
│   │   ├── page.content.ts
│   │   └── page.tsx
│   ├── components
│   │   ├── client-component-example.content.ts
│   │   ├── ClientComponentExample.tsx
│   │   ├── server-component-example.content.ts
│   │   └── ServerComponentExample.tsx
│   └── proxy.ts
├── intlayer.config.ts
├── next.config.ts
├── vite.config.ts
├── package.json
└── tsconfig.json
```

### 設定

`routing.mode`を`"search-params"`（例：`/about?locale=fr`）または`"no-prefix"`に設定します。

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Your other locales
    ],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    mode: "search-params", // or `no-prefix`
  },
};

export default config;
```

</Tab>
</Tabs>

> このファイルでは、プロキシのリダイレクト、Cookie名、コンテンツ宣言の場所と拡張子、ログなども設定できます。完全な一覧は[設定ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)を参照してください。

- [設定ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)

</Step>
<Step number={3} title="Vite設定にIntlayerを組み込む">

`vite.config.ts`で、`vinext()`の隣に`intlayer()`プラグインを追加します。

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm"]}
import { defineConfig } from "vite";
import vinext from "vinext";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [
    vinext(),
    intlayer({
      // Locale routing is handled by `src/proxy.ts` (step 7)
      proxy: { ignore: () => true },
    }),
  ],
});
```

> `intlayer()`プラグインは、ビルド開始前に辞書をビルドし、開発中にコンテンツファイルを監視し、RSC、SSR、クライアントの各環境で`next-intlayer`が使うエイリアスと最適化を設定します。

> `intlayer()`はViteの開発サーバー向けにロケールルーティングのミドルウェアも提供します。vinextでは、`src/proxy.ts`が開発時も本番ランタイムでも同じ役割を果たすため、`ignore`オプションでVite側を無効にし、すべてのリクエストが二重にルーティングされるのを防ぎます。

> `next.config.ts`に`withIntlayer()`を追加しないでください。vinextは`redirects`、`rewrites`、`headers`などのオプションのために`next.config.ts`を読み込みますが、webpackやTurbopackのプラグインは実行しません。

Cloudflare Workersにデプロイする場合は、`vinext init`が生成した`cloudflare()`プラグインを残してください。

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm"]}
import { cloudflare } from "@cloudflare/vite-plugin";
import { defineConfig } from "vite";
import vinext from "vinext";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [
    vinext(),
    intlayer({ proxy: { ignore: () => true } }),
    cloudflare({
      viteEnvironment: { name: "rsc", childEnvironments: ["ssr"] },
    }),
  ],
});
```

</Step>
<Step number={4} title="動的ロケールルートを定義する">

<Tabs group="routing-mode">
<Tab label="ロケールパスあり" value="with-locale-path">

`RootLayout`の中身をすべて削除し、次のコードに置き換えます。

```tsx {3} fileName="src/app/layout.tsx" codeFormat={["typescript", "esm"]}
import type { PropsWithChildren, FC } from "react";
import "./globals.css";

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
  // You can still wrap the children with other providers, like `next-themes` or `react-query`
  <>{children}</>
);

export default RootLayout;
```

> `RootLayout`を空のままにしておくと、ロケールレイアウトが`<html>`タグの[`lang`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)属性と[`dir`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)属性を設定できます。

`[locale]`ディレクトリにレイアウトを追加します。

```tsx fileName="src/app/[locale]/layout.tsx" codeFormat={["typescript", "esm"]}
import { getHTMLTextDir } from "intlayer";
import type { NextLayoutIntlayer } from "next-intlayer";
import { IntlayerProvider } from "next-intlayer/server";

export { generateStaticParams } from "next-intlayer";

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body>
        <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
```

> 1つの`IntlayerProvider`でツリーの両側をカバーします。Server Componentsにロケールを提供し、クライアントプロバイダーをマウントすることでClient Componentsにも同じロケールが渡されます。

> `[locale]`セグメントがロケールを保持します。`/en-US/about`は`en-US`、`/fr/about`は`fr`に解決されます。以前の`src/app/page.tsx`は使われなくなったため削除できます。プロキシ（ステップ7）がルートでデフォルトロケールを提供します。

> `generateStaticParams`により、vinextはロケールごとにすべてのページをプリレンダリングします。vinextは`dynamicParams`も適用するため、`export const dynamicParams = false`を設定すると、未知のロケールは404を返します。

</Tab>
<Tab label="ロケールパスなし" value="without-locale-path">

`[locale]`ディレクトリはありません。`src/app/layout.tsx`を設定して、リクエストからロケールを読み取り、アプリケーションを`IntlayerProvider`でラップします。

```tsx fileName="src/app/layout.tsx" codeFormat={["typescript", "esm"]}
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { getHTMLTextDir, getIntlayer } from "intlayer";
import { getLocale, IntlayerProvider } from "next-intlayer/server";

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
        <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
      </body>
    </html>
  );
};

export default RootLayout;
```

</Tab>
</Tabs>

</Step>
<Step number={5} title="コンテンツを宣言する">

翻訳を保存するコンテンツ宣言を作成します。

```tsx fileName="src/app/[locale]/page.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const pageContent = {
  key: "page",
  content: {
    getStarted: {
      main: t({
        ja: "編集を始めてください",
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
      "main": {
        "nodeType": "translation",
        "translation": {
          "ja": "編集を始めてください",
          "en": "Get started by editing",
          "fr": "Commencez par éditer",
          "es": "Comience por editar"
        }
      },
      "pageLink": "src/app/page.tsx"
    }
  }
}
```

> コンテンツ宣言は、コンテンツ宣言の拡張子（デフォルトは`.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`）に一致していれば、`contentDir`ディレクトリ（デフォルトは`./src`）内のどこにでも置けます。

> 詳細は[コンテンツ宣言ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/content_file.md)を参照してください。

- [コンテンツ宣言ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/content_file.md)

</Step>
<Step number={6} title="コード内でコンテンツを利用する">

任意のコンポーネントから辞書にアクセスできます。

```tsx fileName="src/app/[locale]/page.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { type NextPageIntlayer, useIntlayer } from "next-intlayer";

const PageContent: FC = () => {
  const content = useIntlayer("page");

  return (
    <>
      <p>{content.getStarted.main}</p>
      <code>{content.getStarted.pageLink}</code>
    </>
  );
};

const Page: NextPageIntlayer = () => (
  <>
    <PageContent />
    <ServerComponentExample />
    <ClientComponentExample />
  </>
);

export default Page;
```

```tsx {4,7} fileName="src/components/ClientComponentExample.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ClientComponentExample: FC = () => {
  const content = useIntlayer("client-component-example"); // Create related content declaration

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
import { useIntlayer } from "next-intlayer";

export const ServerComponentExample: FC = () => {
  const content = useIntlayer("server-component-example"); // Create related content declaration

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> `next-intlayer`はアイソモーフィックです。vinextがRSC環境に適用する`react-server`エクスポート条件により、Server Componentsにはサーバー実装が、Client Componentsにはコンテキストベースの実装が提供されます。同じ呼び出しがどちら側でも動作します。

> `alt`、`title`、`href`、`aria-label`などの`string`属性でコンテンツを使うには、その値を読み取ります。
>
> ```tsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> 詳細は[`useIntlayer`ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/next-intlayer/useIntlayer.md)を参照してください。

- [`useIntlayer`ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/next-intlayer/useIntlayer.md)

> 既存のアプリがある場合は、[Intlayerコンパイラー](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compiler.md)と[extractコマンド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/extract.md)が、数千のコンポーネントを1秒で変換します。

- [Intlayerコンパイラー](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compiler.md)
- [extractコマンド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/extract.md)

</Step>
<Step number={7} title="ロケール検出用のプロキシを設定する">

vinextは`proxy.ts`（および`middleware.ts`）をNext.js 16と同様に、開発時も本番時も、Cloudflare Workers上でも実行します。Intlayerのプロキシをエクスポートします。

```typescript fileName="src/proxy.ts" codeFormat={["typescript", "esm", "commonjs"]}
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

> `intlayerProxy`はユーザーの優先ロケールを検出し、[設定](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)に従って該当するURLにリダイレクトし、ロケールをCookieに保存します。また、ロケールを`getLocale()`とサーバーフックに渡すため、ロケールパスなしのアーキテクチャでも残してください。

- [設定](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)

> 複数のプロキシを連結する場合（例：`intlayerProxy`と認証）は、`multipleProxies`を使います。

```ts
import { multipleProxies, intlayerProxy } from "next-intlayer/proxy";
import { customProxy } from "@utils/customProxy";

export const proxy = multipleProxies([intlayerProxy, customProxy]);
```

</Step>
<Step number={8} title="メタデータの国際化" isOptional={true}>

vinextはMetadata APIをサポートしています。`generateMetadata`と`getIntlayer`を使って、ページのメタデータを翻訳します。

```typescript fileName="src/app/[locale]/metadata.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { type Dictionary, t } from "intlayer";
import type { Metadata } from "next";

const metadataContent = {
  key: "page-metadata",
  content: {
    title: t({
      ja: "私のvinextアプリ",
      en: "My vinext app",
      fr: "Mon application vinext",
      es: "Mi aplicación vinext",
    }),
    description: t({
      ja: "Vite上で動作するNext.jsアプリ",
      en: "A Next.js app running on Vite",
      fr: "Une application Next.js qui tourne sur Vite",
      es: "Una aplicación Next.js que funciona con Vite",
    }),
  },
} satisfies Dictionary<Metadata>;

export default metadataContent;
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
   * Generates an object containing all url for each locale.
   *
   * Example:
   * ```ts
   *  getMultilingualUrls('/about');
   *
   *  // Returns
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

// ... Rest of the code
````

> `intlayer`からインポートした`getIntlayer`関数は、メタデータオブジェクトにそのまま使える生の値を返します。`next-intlayer`のものは、ビジュアルエディター向けにラップします。

</Step>
<Step number={9} title="sitemap.xmlとrobots.txtの国際化" isOptional={true}>

`sitemap.ts`と`robots.ts`はNext.jsと同様に動作します。`getMultilingualUrls`を使って、ローカライズされたすべてのURLを列挙します。

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

</Step>
<Step number={10} title="コンテンツの言語を変更する" isOptional={true}>

ローカライズされたページへの移動には`next/link`を使います。vinextはクライアントサイドナビゲーションとプリフェッチを維持するため、ページ全体をリロードせずに切り替わります。

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
            replace // The browser "back" button returns to the previous page
          >
            <span>
              {/* Locale - e.g. FR */}
              {localeItem}
            </span>
            <span>
              {/* Language in its own Locale - e.g. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Language in current Locale - e.g. Francés with current locale set to Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Language in English - e.g. French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
```

> ドキュメントリファレンス：
>
> - [`useLocale`フック](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/next-intlayer/useLocale.md)
> - [`getLocaleName`関数](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl`関数](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir`関数](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/intlayer/getHTMLTextDir.md)

</Step>
<Step number={11} title="ローカライズされたLinkコンポーネントを作成する" isOptional={true}>

カスタム`Link`コンポーネントは内部URLに現在のロケールを付与します。これにより、フランス語のユーザーが`/about`をクリックすると`/fr/about`に遷移します。

```tsx fileName="src/components/Link.tsx" codeFormat={["typescript", "esm"]}
"use client";

import { getLocalizedUrl } from "intlayer";
import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import { useLocale } from "next-intlayer";
import type { PropsWithChildren, FC } from "react";

/**
 * Checks whether a URL is external (starts with http:// or https://).
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * Link that localizes internal URLs with the current locale.
 */
export const Link: FC<PropsWithChildren<NextLinkProps>> = ({
  href,
  children,
  ...props
}) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  const hrefI18n: NextLinkProps["href"] =
    href && !isExternalLink ? getLocalizedUrl(href.toString(), locale) : href;

  return (
    <NextLink href={hrefI18n} {...props}>
      {children}
    </NextLink>
  );
};
```

</Step>
<Step number={12} title="Server Actionsで現在のロケールを取得する" isOptional={true}>

Server Action内で`next-intlayer/server`の`getLocale`を呼び出します。

```tsx fileName="src/app/actions/getLocale.ts" codeFormat="typescript"
"use server";

import { getLocale } from "next-intlayer/server";

export const myServerAction = async () => {
  const locale = await getLocale();

  // Do something with the locale
};
```

> `getLocale`は、プロキシがリクエストヘッダーに設定したロケール、次にロケールCookie、次にブラウザーの`Accept-Language`ヘッダーの順に読み取り、最後にデフォルトロケールにフォールバックします。

</Step>
<Step number={13} title="Cloudflare Workersにデプロイする" isOptional={true}>

Intlayerはビルド時に辞書をバンドルへコンパイルするため、実行時にファイルシステムを読み取るものはなく、アプリはworkerd上でそのまま動作します。vinext CLIでビルドとデプロイを行います。

```bash packageManager="npm"
npx @vinext/cloudflare deploy
```

```bash packageManager="pnpm"
pnpm dlx @vinext/cloudflare deploy
```

```bash packageManager="yarn"
yarn dlx @vinext/cloudflare deploy
```

```bash packageManager="bun"
bunx @vinext/cloudflare deploy
```

> 他の環境（Vercel、Netlify、AWS、Node.js）にデプロイする場合は、`vinext()`の隣に[Nitro](https://v3.nitro.build/)のViteプラグインを追加するか、`next.config.ts`で`output: "standalone"`を設定します。Intlayerの設定は変わりません。

</Step>
<Step number={14} title="コンポーネントからコンテンツを抽出する" isOptional={true}>

既存のコードベースでは、Intlayerの[コンパイラー](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compiler.md)と[エクストラクター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/extract.md)を使って、ハードコードされた文字列をコンテンツ宣言へ移せます。

- [コンパイラー](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compiler.md)
- [エクストラクター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/extract.md)

`intlayer.config.ts`でコンパイラーを有効にします。

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Rest of your config
  compiler: {
    /**
     * Indicates if the compiler should be enabled.
     */
    enabled: true,

    /**
     * Defines the output files path
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * If `true`, the compiler rewrites the component files on disk.
     * If `false`, the transformation stays in the build output only.
     */
    saveComponents: false,

    /**
     * Dictionary key prefix
     */
    dictionaryKeyPrefix: "",
  },
};

export default config;
```

<Tabs>
 <Tab value='Extract command'>

エクストラクターを実行して、コンポーネントを変換しコンテンツを抽出します。

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
 <Tab value='Vite compiler'>

`intlayer()`のViteプラグインにはコンパイラーが含まれています。`compiler.enabled`を設定したら、通常どおり開発サーバーまたはビルドを実行します。

```bash packageManager="npm"
npm run build # Or npm run dev
```

```bash packageManager="pnpm"
pnpm run build # Or pnpm run dev
```

```bash packageManager="yarn"
yarn build # Or yarn dev
```

```bash packageManager="bun"
bun run build # Or bun run dev
```

 </Tab>
</Tabs>
</Step>

</Steps>

### TypeScriptを設定する

Intlayerはモジュール拡張（module augmentation）を使って、コンテンツのキーと値に型を付けます。

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.webp?raw=true)

生成された型をTypeScript設定に含めます。

```json5 fileName="tsconfig.json"
{
  // ... Your existing TypeScript configurations
  "include": [
    // ... Your existing TypeScript configurations
    ".intlayer/**/*.ts", // Include the auto-generated types
  ],
}
```

### Git設定

Intlayerが生成するファイルを無視します。

```plaintext fileName=".gitignore"
# Ignore the files generated by Intlayer
.intlayer
```

### VS Code拡張機能

公式の**[Intlayer VS Code拡張機能](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)**をインストールすると、キーの自動補完、翻訳漏れのエラー、インラインプレビュー、クイックアクションが利用できます。[拡張機能のドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/vs_code_extension.md)を参照してください。

- [拡張機能のドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/vs_code_extension.md)

### さらに進むには

[ビジュアルエディター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md)を追加するか、[CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md)でコンテンツを外部化します。

- [ビジュアルエディター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md)
- [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md)

## よくある質問

<FAQ>

<Question title="vinextとは？">

vinextは、CloudflareがメンテナンスしているオープンソースのViteプラグインで、Next.jsの公開API（App RouterとPages Router、React Server Components、Server Actions、`proxy.ts`、ルートハンドラー、`next/*`モジュール）を再実装しています。Next.jsのコードはVite上で動作し、Cloudflare Workersにネイティブにデプロイでき、Nitro経由で他のプラットフォームにもデプロイできます。

</Question>
<Question title="Next.jsの設定と比べて何が変わりますか？">

変わるのはビルド統合だけです。Next.jsでは`withIntlayer()`が`next.config.ts`をラップします。vinextでは、代わりに`vite-intlayer`の`intlayer()`プラグインを`vite.config.ts`に追加します。プロバイダー、フック、`proxy.ts`、メタデータ、サイトマップのコードは同じなので、このページで扱っていない内容は[Next.js 16ガイド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_nextjs_16.md)に従ってください。

- [Next.js 16ガイド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_nextjs_16.md)

</Question>
<Question title="Next.jsのi18n設定やSWCプラグインは必要ですか？">

いいえ。`next.config.ts`の`i18n`フィールドは、vinextではPages Routerのロケールプレフィックスにしか対応せず、Intlayerは`proxy.ts`で独自にルーティングを行います。`@intlayer/swc`プラグインも不要です。Viteプラグインがすでに`useIntlayer`呼び出しを置き換えるため、各ページは使用する辞書だけを配信します。[バンドルの最適化](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/bundle_optimization.md)を参照してください。

- [バンドルの最適化](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/bundle_optimization.md)

</Question>
<Question title="開発中に`intlayer watch`は必要ですか？">

いいえ。`intlayer()`のViteプラグインが`vite dev`と同時にコンテンツウォッチャーを起動し、コンテンツを編集すると、変更された辞書を読み込むコンポーネントだけがホットアップデートされます。

</Question>
<Question title="コンポーネントを書き換えずに`next-intl`や`i18next`から移行できますか？">

はい。[next-intlからの移行ガイド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/migration_from_next-intl_to_intlayer.md)または[i18nextからの移行ガイド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/migration_from_i18next_to_intlayer.md)に従うか、Intlayerの辞書で動く`next-intl`、`react-i18next`、`react-intl`のAPIを提供する[互換アダプター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compat/index.md)で現在のAPIを維持できます。

- [next-intlからの移行ガイド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/migration_from_next-intl_to_intlayer.md)
- [i18nextからの移行ガイド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/migration_from_i18next_to_intlayer.md)
- [互換アダプター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compat/index.md)

</Question>
<Question title="/fr/aboutのように、URLにロケールを含める必要がありますか？">

いいえ。`routing.mode`は次の値を受け付けます。

- `"prefix-no-default"`（デフォルト）：デフォルトロケールは`/about`、それ以外は`/fr/about`。
- `"prefix-all"`：すべてのロケールにプレフィックスが付きます（`/en/about`、`/fr/about`）。
- `"no-prefix"`：パスにロケールを含めず、Cookieまたはヘッダーから解決します。
- `"search-params"`：`/about?locale=fr`。

[設定リファレンス](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)と、ステップ2のロケールパスなしのアーキテクチャを参照してください。

- [設定リファレンス](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)

</Question>
<Question title="AIでアプリを自動翻訳するには？">

`npx intlayer fill`を実行します。CLIが翻訳漏れを検出し、ご自身のプロバイダーとAPIキーを使って、お好みのLLMで補完します。[fillコマンド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/fill.md)と[CI/CD連携](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/CI_CD.md)を参照してください。

- [fillコマンド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/fill.md)
- [CI/CD連携](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/CI_CD.md)

</Question>
<Question title="リリース前に翻訳漏れを見つけるには？">

CIで`npx intlayer test`を実行します。宣言されたロケールにコンテンツが不足していると、ビルドが失敗します。[VS Code拡張機能](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/vs_code_extension.md)は入力中に同じエラーを表示し、[ESLintプラグイン](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/eslint.md)はハードコードされた文字列を指摘します。

- [VS Code拡張機能](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/vs_code_extension.md)
- [ESLintプラグイン](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/eslint.md)

</Question>
<Question title="Intlayerは無料でオープンソースですか？">

はい。IntlayerはApache 2.0ライセンスのオープンソースで、ライブラリ、CLI、ビジュアルエディター、コンパイラーは商用利用を含めて無料で使えます。ホスト型CMSはオプションの有料サービスで、[セルフホスト](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/self_hosting.md)も可能です。

- [セルフホスト](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/self_hosting.md)

</Question>

</FAQ>
