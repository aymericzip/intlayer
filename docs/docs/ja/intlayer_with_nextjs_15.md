---
createdAt: 2024-12-06
updatedAt: 2025-06-29
title: Next.js 15アプリを翻訳する方法 – i18nガイド 2025
description: Next.js 15 ウェブサイトを多言語対応にする方法をご紹介します。国際化（i18n）と翻訳のためのドキュメントに従ってください。
keywords:
  - 国際化
  - ドキュメント
  - Intlayer
  - Next.js 15
  - JavaScript
  - React
slugs:
  - doc
  - environment
  - nextjs
  - 15
applicationTemplate: https://github.com/aymericzip/intlayer-next-15-template
youtubeVideo: https://www.youtube.com/watch?v=e_PPG7PTqGU
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: 履歴の初期化
---

# IntlayerでNext.js 15を翻訳する | 国際化（i18n）

<iframe title="Next.jsに最適なi18nソリューション？Intlayerを発見" class="m-auto aspect-[16/9] w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/e_PPG7PTqGU?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

GitHubの[アプリケーションテンプレート](https://github.com/aymericzip/intlayer-next-15-template)をご覧ください。

## Intlayerとは？

**Intlayer**は、最新のウェブアプリケーションにおける多言語対応を簡素化するために設計された革新的なオープンソースの国際化（i18n）ライブラリです。Intlayerは、強力な**App Router**を含む最新の**Next.js 15**フレームワークとシームレスに統合されます。効率的なレンダリングのために**Server Components**での動作に最適化されており、[**Turbopack**](https://nextjs.org/docs/architecture/turbopack)とも完全に互換性があります。

Intlayerを使うことで、以下が可能になります：

- **コンポーネントレベルで宣言的な辞書を使い、翻訳を簡単に管理**。
- **メタデータ、ルート、コンテンツを動的にローカライズ**。
- **クライアントサイドおよびサーバーサイドの両方のコンポーネントで翻訳にアクセス**。
- **自動生成される型によりTypeScriptサポートを確保し、オートコンプリートやエラー検出を向上**。
- **動的なロケール検出や切り替えなどの高度な機能を活用**。

> IntlayerはNext.js 12、13、14、15と互換性があります。Next.jsのPage Routerを使用している場合は、この[ガイド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_nextjs_page_router.md)を参照してください。Next.js 12、13、14でApp Routerを使用している場合は、この[ガイド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_nextjs_14.md)を参照してください。

---

## Next.jsアプリケーションでIntlayerをセットアップするステップバイステップガイド

### ステップ1：依存パッケージのインストール

npmを使って必要なパッケージをインストールします：

```bash packageManager="npm"
npm install intlayer next-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer
```

- **intlayer**

  設定管理、翻訳、[コンテンツ宣言](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/get_started.md)、トランスパイル、および[CLIコマンド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_cli.md)のための国際化ツールを提供するコアパッケージです。

- **next-intlayer**

IntlayerをNext.jsと統合するパッケージです。Next.jsの国際化のためのコンテキストプロバイダーやフックを提供します。さらに、Intlayerを[Webpack](https://webpack.js.org/)や[Turbopack](https://nextjs.org/docs/app/api-reference/turbopack)と統合するためのNext.jsプラグイン、およびユーザーの優先ロケールの検出、クッキー管理、URLリダイレクト処理のためのミドルウェアも含まれています。

### ステップ2: プロジェクトの設定

アプリケーションの言語を設定するための設定ファイルを作成します：

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
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

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
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

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
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

module.exports = config;
```

> この設定ファイルを通じて、ローカライズされたURLの設定、ミドルウェアのリダイレクト、クッキー名、コンテンツ宣言の場所や拡張子の指定、コンソールでのIntlayerログの無効化などを行うことができます。利用可能なパラメータの完全なリストについては、[設定ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)を参照してください。

### ステップ3: Next.jsの設定にIntlayerを統合する

Next.jsのセットアップをIntlayerを使うように設定します:

```typescript fileName="next.config.ts" codeFormat="typescript"
import type { NextConfig } from "next";
import { withIntlayer } from "next-intlayer/server";

const nextConfig: NextConfig = {
  /* ここに設定オプションを記述 */
};

export default withIntlayer(nextConfig);
```

```typescript fileName="next.config.mjs" codeFormat="esm"
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* ここに設定オプションを記述 */
};

export default withIntlayer(nextConfig);
```

```typescript fileName="next.config.cjs" codeFormat="commonjs"
const { withIntlayer } = require("next-intlayer/server");

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* ここに設定オプションを記述 */
};

module.exports = withIntlayer(nextConfig);
```

> `withIntlayer()` Next.jsプラグインは、IntlayerをNext.jsと統合するために使用されます。これにより、コンテンツ宣言ファイルのビルドが保証され、開発モードでの監視が行われます。また、[Webpack](https://webpack.js.org/)や[Turbopack](https://nextjs.org/docs/app/api-reference/turbopack)環境内でIntlayerの環境変数を定義します。さらに、パフォーマンス最適化のためのエイリアスを提供し、サーバーコンポーネントとの互換性を確保します。

### ステップ4: 動的ロケールルートの定義

`RootLayout`の内容をすべて削除し、以下のコードに置き換えます。

```tsx {3} fileName="src/app/layout.tsx" codeFormat="typescript"
import type { PropsWithChildren, FC } from "react";
import "./globals.css";

const RootLayout: FC<PropsWithChildren> = ({ children }) => children;

export default RootLayout;
```

```jsx {3} fileName="src/app/layout.mjx" codeFormat="esm"
import "./globals.css";

const RootLayout = ({ children }) => children;

export default RootLayout;
```

```jsx {1,8} fileName="src/app/layout.csx" codeFormat="commonjs"
require("./globals.css");

const RootLayout = ({ children }) => children;

module.exports = {
  default: RootLayout,
  generateStaticParams,
};
```

> `RootLayout` コンポーネントを空のままにしておくことで、`<html>` タグに [`lang`](https://developer.mozilla.org/ja/docs/Web/HTML/Global_attributes/lang) および [`dir`](https://developer.mozilla.org/ja/docs/Web/HTML/Global_attributes/dir) 属性を設定できます。

動的ルーティングを実装するには、`[locale]` ディレクトリに新しいレイアウトを追加してロケールのパスを指定します：

```tsx fileName="src/app/[locale]/layout.tsx" codeFormat="typescript"
import type { NextLayoutIntlayer } from "next-intlayer";
import { Inter } from "next/font/google";
import { getHTMLTextDir } from "intlayer";

const inter = Inter({ subsets: ["latin"] });

// ロケールに基づいてHTMLのlang属性とdir属性を設定するレイアウトコンポーネント
const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;
  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body className={inter.className}>{children}</body>
    </html>
  );
};

export default LocaleLayout;
```

```jsx fileName="src/app/[locale]/layout.mjx" codeFormat="esm"
import { getHTMLTextDir } from "intlayer";

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout = async ({ children, params: { locale } }) => {
  const { locale } = await params;
  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body className={inter.className}>{children}</body>
    </html>
  );
};

export default LocaleLayout;
```

```jsx fileName="src/app/[locale]/layout.csx" codeFormat="commonjs"
const { Inter } = require("next/font/google");
const { getHTMLTextDir } = require("intlayer");

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout = async ({ children, params: { locale } }) => {
  const { locale } = await params;
  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body className={inter.className}>{children}</body>
    </html>
  );
};

module.exports = LocaleLayout;
```

> `[locale]` パスセグメントはロケールを定義するために使用されます。例：`/en-US/about` は `en-US` を指し、`/fr/about` は `fr` を指します。

> この段階で、`Error: Missing <html> and <body> tags in the root layout.` というエラーが発生します。これは予期されたもので、`/app/page.tsx` ファイルはもはや使用されておらず、削除可能です。代わりに、`[locale]` パスセグメントが `/app/[locale]/page.tsx` ページを有効にします。その結果、ブラウザ上で `/en`、`/fr`、`/es` のようなパスでページにアクセスできるようになります。デフォルトのロケールをルートページとして設定するには、ステップ7の `middleware` 設定を参照してください。

次に、アプリケーションのレイアウトで `generateStaticParams` 関数を実装します。

```tsx {1} fileName="src/app/[locale]/layout.tsx" codeFormat="typescript"
tsx {1} fileName="src/app/[locale]/layout.tsx" codeFormat="typescript"
export { generateStaticParams } from "next-intlayer"; // 挿入する行

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  /*... 残りのコード */
};

export default LocaleLayout;
```

```jsx {1} fileName="src/app/[locale]/layout.mjx" codeFormat="esm"
export { generateStaticParams } from "next-intlayer"; // 挿入する行

const LocaleLayout = async ({ children, params: { locale } }) => {
  /*... 残りのコード */
};

// ... 残りのコード
```

```jsx {1,7} fileName="src/app/[locale]/layout.csx" codeFormat="commonjs"
const { generateStaticParams } = require("next-intlayer"); // 挿入する行

const LocaleLayout = async ({ children, params: { locale } }) => {
  /*... 残りのコード */
};

module.exports = { default: LocaleLayout, generateStaticParams };
```

> `generateStaticParams` は、すべてのロケールに必要なページを事前にビルドすることを保証し、実行時の計算を削減し、ユーザー体験を向上させます。詳細については、[Next.js の generateStaticParams に関するドキュメント](https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic-rendering#generate-static-params)を参照してください。

### ステップ5: コンテンツの宣言

翻訳を格納するためのコンテンツ宣言を作成および管理します:

```tsx fileName="src/app/[locale]/page.content.ts" contentDeclarationFormat="typescript"
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

```javascript fileName="src/app/[locale]/page.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
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
};

export default pageContent;
```

```javascript fileName="src/app/[locale]/page.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
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
};

module.exports = pageContent;
```

```json fileName="src/app/[locale]/page.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "page",
  "content": {
    "getStarted": {
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
```

> コンテンツ宣言は、`contentDir` ディレクトリ（デフォルトは `./src`）に含まれている限り、アプリケーションのどこにでも定義できます。また、コンテンツ宣言ファイルの拡張子（デフォルトは `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`）に一致する必要があります。

> 詳細については、[コンテンツ宣言のドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/get_started.md)を参照してください。

### ステップ6: コード内でコンテンツを利用する

アプリケーション全体でコンテンツ辞書にアクセスします：

```tsx fileName="src/app/[locale]/page.tsx" codeFormat="typescript"
import type { FC } from "react";
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { type NextPageIntlayer, IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";

const PageContent: FC = () => {
  const content = useIntlayer("page");

  return (
    <>
      <p>{content.getStarted.main}</p> {/* コンテンツのメインテキストを表示 */}
      <code>{content.getStarted.pageLink}</code> {/* ページリンクを表示 */}
    </>
  );
};

const Page: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerServerProvider locale={locale}>
      <PageContent />
      <ServerComponentExample />

      <IntlayerClientProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerClientProvider>
    </IntlayerServerProvider>
  );
};

export default Page;
```

```jsx fileName="src/app/[locale]/page.mjx" codeFormat="esm"
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";

const PageContent = () => {
  const content = useIntlayer("page");

  return (
    <>
      <p>{content.getStarted.main}</p>
      <code>{content.getStarted.pageLink}</code>
    </>
  );
};

const Page = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerServerProvider locale={locale}>
      <PageContent />
      <ServerComponentExample />

      <IntlayerClientProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerClientProvider>
    </IntlayerServerProvider>
  );
};

export default Page;
```

```jsx fileName="src/app/[locale]/page.csx" codeFormat="commonjs"
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";

const PageContent = () => {
  const content = useIntlayer("page");

  return (
    <>
      <p>{content.getStarted.main}</p>
      <code>{content.getStarted.pageLink}</code>
    </>
  );
};

const Page = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerServerProvider locale={locale}>
      <PageContent />
      <ServerComponentExample />

      <IntlayerClientProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerClientProvider>
    </IntlayerServerProvider>
  );
};
```

- **`IntlayerClientProvider`** はクライアントサイドのコンポーネントにロケールを提供するために使用されます。レイアウトを含む任意の親コンポーネントに配置できます。ただし、Next.jsはページ間でレイアウトコードを共有するため、レイアウトに配置することが推奨されます。レイアウトで `IntlayerClientProvider` を使用することで、各ページごとに再初期化する必要がなくなり、パフォーマンスが向上し、アプリケーション全体で一貫したローカリゼーションコンテキストを維持できます。
- **`IntlayerServerProvider`** はサーバー側の子コンポーネントにロケールを提供するために使用されます。レイアウトには設定できません。

> レイアウトとページは共通のサーバーコンテキストを共有できません。なぜなら、サーバーコンテキストシステムはリクエストごとのデータストア（[Reactのキャッシュ](https://react.dev/reference/react/cache) メカニズムを通じて）に基づいており、アプリケーションの異なるセグメントごとにそれぞれ「コンテキスト」が再作成されるためです。プロバイダーを共有レイアウトに配置すると、この分離が破られ、サーバーコンポーネントへのサーバーコンテキスト値の正しい伝播が妨げられます。

```tsx {4,7} fileName="src/components/ClientComponentExample.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ClientComponentExample: FC = () => {
  const content = useIntlayer("client-component-example"); // 関連コンテンツ宣言を作成

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx {3,6} fileName="src/components/ClientComponentExample.mjx" codeFormat="esm"
"use client";

import { useIntlayer } from "next-intlayer";

const ClientComponentExample = () => {
  const content = useIntlayer("client-component-example"); // 関連するコンテンツ宣言を作成

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx {3,6} fileName="src/components/ClientComponentExample.csx" codeFormat="commonjs"
"use client";

const { useIntlayer } = require("next-intlayer");

const ClientComponentExample = () => {
  const content = useIntlayer("client-component-example"); // 関連するコンテンツ宣言を作成

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```tsx {2} fileName="src/components/ServerComponentExample.tsx"  codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "next-intlayer/server";

export const ServerComponentExample: FC = () => {
  const content = useIntlayer("server-component-example"); // 関連コンテンツ宣言を作成

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx {1} fileName="src/components/ServerComponentExample.mjx" codeFormat="esm"
import { useIntlayer } from "next-intlayer/server";

const ServerComponentExample = () => {
  const content = useIntlayer("server-component-example"); // 関連コンテンツ宣言を作成

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx {1} fileName="src/components/ServerComponentExample.csx" codeFormat="commonjs"
const { useIntlayer } = require("next-intlayer/server");

const ServerComponentExample = () => {
  const content = useIntlayer("server-component-example"); // 関連するコンテンツ宣言を作成

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> コンテンツを `alt`、`title`、`href`、`aria-label` などの `string` 属性で使用したい場合は、関数の値を呼び出す必要があります。例：

> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> `useIntlayer` フックの詳細については、[ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/next-intlayer/useIntlayer.md)を参照してください。

### （オプション）ステップ7：ロケール検出のためのミドルウェア設定

ユーザーの優先ロケールを検出するミドルウェアを設定します：

```typescript fileName="src/middleware.ts" codeFormat="typescript"
export { intlayerMiddleware as middleware } from "next-intlayer/middleware";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

```javascript fileName="src/middleware.mjs" codeFormat="esm"
export { intlayerMiddleware as middleware } from "next-intlayer/middleware";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

```javascript fileName="src/middleware.cjs" codeFormat="commonjs"
const { intlayerMiddleware } = require("next-intlayer/middleware");

const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};

module.exports = { middleware: intlayerMiddleware, config };
```

> `intlayerMiddleware` は、ユーザーの優先ロケールを検出し、[設定](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)で指定された適切なURLへリダイレクトするために使用されます。さらに、ユーザーの優先ロケールをクッキーに保存することも可能にします。

### （オプション）ステップ8：メタデータの国際化

ページのタイトルなどのメタデータを国際化したい場合は、Next.jsが提供する`generateMetadata`関数を使用できます。その中で、`getIntlayer`関数からコンテンツを取得してメタデータを翻訳できます。

```typescript fileName="src/app/[locale]/metadata.content.ts" contentDeclarationFormat="typescript"
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

```javascript fileName="src/app/[locale]/metadata.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary<import('next').Metadata>} */
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
};

export default metadataContent;
```

```javascript fileName="src/app/[locale]/metadata.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary<import('next').Metadata>} */
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
};

module.exports = metadataContent;

/** @type {import('intlayer').Dictionary<import('next').Metadata>} */
const metadataContent = {
  key: "page-metadata",
  content: {
    title: t({
      en: "Create Next App",
      fr: "Créer une application Next.js",
      es: "Crear una aplicación Next.js",
      ja: "Next アプリを作成",
    }),
    description: t({
      en: "Generated by create next app",
      fr: "Généré par create next app",
      es: "Generado por create next app",
      ja: "create next app によって生成されました",
    }),
  },
};

module.exports = metadataContent;
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
          "es": "Logo Preact",
          "ja": "Preact ロゴ"
      }
    },
    "description": {
      "nodeType": "translation",
      "translation": {
        "en": "Generated by create next app",
        "fr": "Généré par create next app",
        "es": "Generado por create next app",
        "ja": "create next app によって生成されました"
      },
    },
  },
};
```

````typescript fileName="src/app/[locale]/layout.tsx or src/app/[locale]/page.tsx" codeFormat="typescript"
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

````javascript fileName="src/app/[locale]/layout.mjs or src/app/[locale]/page.mjs" codeFormat="esm"
import { getIntlayer, getMultilingualUrls } from "intlayer";

export const generateMetadata = async ({ params }) => {
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
   *  //   es: '/es/about'
   *  // }
   * ```
   */
  const multilingualUrls = getMultilingualUrls("/");
  const localizedUrl = multilingualUrls[locale];

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

````javascript fileName="src/app/[locale]/layout.cjs or src/app/[locale]/page.cjs" codeFormat="commonjs"
const { getIntlayer, getMultilingualUrls } = require("intlayer");

const generateMetadata = async ({ params }) => {
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
   *  //   es: '/es/about'
   *  // }
   * ```
   */
  const multilingualUrls = getMultilingualUrls("/");
  const localizedUrl = multilingualUrls[locale];

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

module.exports = { generateMetadata };

// ... コードの残り部分
````

> `next-intlayer` からインポートされた `getIntlayer` 関数は、コンテンツを `IntlayerNode` でラップして返し、ビジュアルエディタとの統合を可能にします。一方、`intlayer` からインポートされた `getIntlayer` 関数は、追加のプロパティなしで直接コンテンツを返します。

また、`getTranslation` 関数を使用してメタデータを宣言することもできます。ただし、メタデータの翻訳を自動化し、コンテンツを外部化するためには、コンテンツ宣言ファイルの使用が推奨されます。

```typescript fileName="src/app/[locale]/layout.tsx or src/app/[locale]/page.tsx" codeFormat="typescript"
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

```javascript fileName="src/app/[locale]/layout.mjs or src/app/[locale]/page.mjs" codeFormat="esm"
import { getTranslation, getMultilingualUrls } from "intlayer";

export const generateMetadata = async ({ params }) => {
  const { locale } = await params;
  const t = (content) => getTranslation(content, locale);

  return {
    title: t({
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

```javascript fileName="src/app/[locale]/layout.cjs or src/app/[locale]/page.cjs" codeFormat="commonjs"
const { getTranslation, getMultilingualUrls } = require("intlayer");

const generateMetadata = async ({ params }) => {
  const { locale } = await params;

  const t = (content) => getTranslation(content, locale);

  return {
    title: t({
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

module.exports = { generateMetadata };

// ... 残りのコード
```

> メタデータの最適化について詳しくは、[公式の Next.js ドキュメント](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)をご覧ください。

### （オプション）ステップ9: sitemap.xml と robots.txt の国際化

`sitemap.xml` と `robots.txt` を国際化するには、Intlayer が提供する `getMultilingualUrls` 関数を使用できます。この関数を使うことで、サイトマップ用の多言語 URL を生成できます。

```tsx fileName="src/app/sitemap.ts" codeFormat="typescript"
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

```jsx fileName="src/app/sitemap.mjx" codeFormat="esm"
import { getMultilingualUrls } from "intlayer";

const sitemap = () => [
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

```jsx fileName="src/app/sitemap.csx" codeFormat="commonjs"
const { getMultilingualUrls } = require("intlayer");

const sitemap = () => [
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

module.exports = sitemap;
```

```tsx fileName="src/app/robots.ts" codeFormat="typescript"
import type { MetadataRoute } from "next";
import { getMultilingualUrls } from "intlayer";

// すべての多言語URLを取得する関数
const getAllMultilingualUrls = (urls: string[]) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)) as string[]);

// robots.txtのメタデータを定義
const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: "*", // すべてのユーザーエージェントに適用
    allow: ["/"], // ルートパスは許可
    disallow: getAllMultilingualUrls(["/login", "/register"]), // ログインと登録ページの多言語URLはアクセス禁止
  },
  host: "https://example.com",
  sitemap: `https://example.com/sitemap.xml`,
});

export default robots;
```

```jsx fileName="src/app/robots.mjx" codeFormat="esm"
import { getMultilingualUrls } from "intlayer";

const getAllMultilingualUrls = (urls) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)));

const robots = () => ({
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

```jsx fileName="src/app/robots.csx" codeFormat="commonjs"
const { getMultilingualUrls } = require("intlayer");

const getAllMultilingualUrls = (urls) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)));

const robots = () => ({
  rules: {
    userAgent: "*",
    allow: ["/"],
    disallow: getAllMultilingualUrls(["/login", "/register"]),
  },
  host: "https://example.com",
  sitemap: `https://example.com/sitemap.xml`,
});

module.exports = robots;
```

> サイトマップの最適化については、[公式の Next.js ドキュメント](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap)をご覧ください。robots.txt の最適化については、[公式の Next.js ドキュメント](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots)をご覧ください。

### （オプション）ステップ10：コンテンツの言語を変更する

Next.js でコンテンツの言語を変更するには、推奨される方法として `Link` コンポーネントを使用して、ユーザーを適切なローカライズされたページにリダイレクトする方法があります。`Link` コンポーネントはページのプリフェッチを可能にし、完全なページリロードを回避するのに役立ちます。

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
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
            hrefLang={localeItem}
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocale(localeItem)}
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
              {/* 現在のロケールでの言語名 - 例: Locales.SPANISHに設定された現在のロケールでのFrancés */}
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

```jsx fileName="src/components/LocaleSwitcher.msx" codeFormat="esm"
"use client";

import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "next-intlayer";
import Link from "next/link";

export const LocaleSwitcher = () => {
  const { locale, pathWithoutLocale, availableLocales, setLocale } =
    useLocale();

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <Link
            href={getLocalizedUrl(pathWithoutLocale, localeItem)}
            hrefLang={localeItem}
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocale(localeItem)}
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
              {/* 現在のロケールでの言語名 - 例: Locales.SPANISHに設定された現在のロケールでのFrancés */}
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

```jsx fileName="src/components/LocaleSwitcher.csx" codeFormat="commonjs"
"use client";

const {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} = require("intlayer");
const { useLocale } = require("next-intlayer");
const Link = require("next/link");

export const LocaleSwitcher = () => {
  const { locale, pathWithoutLocale, availableLocales, setLocale } =
    useLocale();

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <Link
            href={getLocalizedUrl(pathWithoutLocale, localeItem)}
            hrefLang={localeItem}
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocale(localeItem)}
          >
            <span>
              {/* ロケール - 例: FR */}
              {localeItem}
            </span>
            <span>
              {/* そのロケールでの言語名 - 例: Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* 現在のロケールでの言語名 - 例: Francés（現在のロケールがLocales.SPANISHの場合） */}
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

> もう一つの方法は、`useLocale` フックで提供される `setLocale` 関数を使うことです。この関数はページのプリフェッチを許可せず、ページをリロードします。

> この場合、`router.push` を使ったリダイレクトなしで、サーバーサイドのコードだけがコンテンツのロケールを変更します。

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
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
> - [`lang` 属性](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - [`dir` 属性](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - [`aria-current` 属性](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

### （オプション）ステップ11：ローカライズされたリンクコンポーネントの作成

アプリケーションのナビゲーションが現在のロケールを尊重するようにするために、カスタムの `Link` コンポーネントを作成できます。このコンポーネントは内部のURLに自動的に現在の言語をプレフィックスとして付加します。例えば、フランス語を話すユーザーが「About」ページへのリンクをクリックすると、`/about` ではなく `/fr/about` にリダイレクトされます。

この動作は以下の理由で有用です：

- **SEOとユーザーエクスペリエンス**：ローカライズされたURLは、検索エンジンが言語別のページを正しくインデックスし、ユーザーに好みの言語でコンテンツを提供するのに役立ちます。
- **一貫性**：アプリケーション全体でローカライズされたリンクを使用することで、ナビゲーションが現在のロケール内に留まり、予期しない言語の切り替えを防ぎます。
- **保守性**: ローカリゼーションのロジックを単一のコンポーネントに集約することで、URLの管理が簡素化され、アプリケーションの成長に伴いコードベースの保守や拡張が容易になります。

以下は、TypeScriptで実装したローカライズされた`Link`コンポーネントの例です。

```tsx fileName="src/components/Link.tsx" codeFormat="typescript"
"use client";

import { getLocalizedUrl } from "intlayer";
import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import { useLocale } from "next-intlayer";
import type { PropsWithChildren, FC } from "react";

/**
 * 指定されたURLが外部リンクかどうかを判定するユーティリティ関数。
 * URLが http:// または https:// で始まる場合、外部リンクとみなします。
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * 現在のロケールに基づいて href 属性を適応させるカスタム Link コンポーネントです。
 * 内部リンクの場合、`getLocalizedUrl` を使用して URL の先頭にロケールを付加します（例：/fr/about）。
 * これにより、ナビゲーションが同じロケールのコンテキスト内に留まることを保証します。
 */
export const Link: FC<PropsWithChildren<NextLinkProps>> = ({
  href,
  children,
  ...props
}) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  // リンクが内部リンクで有効な href が提供されている場合、ローカライズされた URL を取得します。
  const hrefI18n: NextLinkProps["href"] =
    href && !isExternalLink ? getLocalizedUrl(href.toString(), locale) : href;

  return (
    <NextLink href={hrefI18n} {...props}>
      {children}
    </NextLink>
  );
};
```

```jsx fileName="src/components/Link.mjx" codeFormat="esm"
"use client";

import { getLocalizedUrl } from "intlayer";
import NextLink from "next/link";
import { useLocale } from "next-intlayer";

/**
 * 指定されたURLが外部リンクかどうかをチェックするユーティリティ関数。
 * URLが http:// または https:// で始まる場合、外部リンクとみなされます。
 */
export const checkIsExternalLink = (href) => /^https?:\/\//.test(href ?? "");

/**
 * 現在のロケールに基づいてhref属性を調整するカスタムLinkコンポーネント。
 * 内部リンクの場合、`getLocalizedUrl`を使用してURLにロケールのプレフィックスを付加します（例：/fr/about）。
 * これにより、ナビゲーションが同じロケールのコンテキスト内に留まることを保証します。
 */
export const Link = ({ href, children, ...props }) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  // リンクが内部リンクで有効なhrefが提供されている場合、ローカライズされたURLを取得します。
  const hrefI18n =
    href && !isExternalLink ? getLocalizedUrl(href.toString(), locale) : href;

  return (
    <NextLink href={hrefI18n} {...props}>
      {children}
    </NextLink>
  );
};
```

```jsx fileName="src/components/Link.csx" codeFormat="commonjs"
"use client";

const { getLocalizedUrl } = require("intlayer");
const NextLink = require("next/link");
const { useLocale } = require("next-intlayer");

/**
 * 指定されたURLが外部リンクかどうかをチェックするユーティリティ関数。
 * URLが http:// または https:// で始まる場合、外部リンクと見なされます。
 */
const checkIsExternalLink = (href) => /^https?:\/\//.test(href ?? "");

/**
 * 現在のロケールに基づいて href 属性を適応させるカスタム Link コンポーネントです。
 * 内部リンクの場合、`getLocalizedUrl` を使用して URL にロケールをプレフィックスとして付加します（例：/fr/about）。
 * これにより、ナビゲーションが同じロケールのコンテキスト内で行われることを保証します。
 */
const Link = ({ href, children, ...props }) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  // リンクが内部リンクで有効な href が提供されている場合、ローカライズされた URL を取得します。
  const hrefI18n =
    href && !isExternalLink ? getLocalizedUrl(href.toString(), locale) : href;

  return (
    <NextLink href={hrefI18n} {...props}>
      {children}
    </NextLink>
  );
};
```

#### 動作の仕組み

- **外部リンクの検出**:
- **外部リンクの検出**:  
  ヘルパー関数 `checkIsExternalLink` は、URLが外部リンクかどうかを判定します。外部リンクはローカライズの必要がないため、そのまま変更されません。

- **現在のロケールの取得**:  
  `useLocale` フックは現在のロケール（例：フランス語の場合は `fr`）を提供します。

- **URLのローカライズ**:  
  内部リンク（すなわち外部リンクでない場合）には、`getLocalizedUrl` を使ってURLの先頭に現在のロケールを自動的に付加します。つまり、ユーザーがフランス語環境にいる場合、`href` に `/about` を渡すと `/fr/about` に変換されます。

- **リンクの返却**:  
  コンポーネントはローカライズされたURLを持つ `<a>` 要素を返し、ナビゲーションがロケールに沿って一貫するようにします。

この `Link` コンポーネントをアプリケーション全体に統合することで、一貫性があり言語に対応したユーザー体験を維持しつつ、SEOや使いやすさの向上も実現できます。

### （オプション）ステップ12：バンドルサイズの最適化

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

> 注意: この最適化は Next.js 13 以降でのみ利用可能です。

> 注意: SWC プラグインは Next.js ではまだ実験的な機能のため、このパッケージはデフォルトでインストールされていません。将来的に変更される可能性があります。

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
