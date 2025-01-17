# IntlayerとNext.js 15アプリルーターでの国際化 (i18n) の始め方

## Intlayerとは？

**Intlayer**は、モダンウェブアプリケーションにおける多言語サポートを簡素化するために設計された革新的なオープンソース国際化(i18n)ライブラリです。Intlayerは最新の**Next.js 15**フレームワークとシームレスに統合され、強力な**アプリルーター**も含まれています。効率的なレンダリングのために**サーバーコンポーネント**での動作に最適化されており、[**Turbopack**](https://nextjs.org/docs/architecture/turbopack)にも完全に対応しています。

Intlayerを使用すると、以下を実現できます：

- **宣言型辞書を使用して翻訳を簡単に管理**することができます。
- **メタデータ、ルート、およびコンテンツを動的にローカライズ**することができます。
- **クライアントサイドおよびサーバーサイドコンポーネントで翻訳にアクセス**することができます。
- **自動生成された型を使用してTypeScriptサポート**を確保し、オートコンプリートとエラーチェックを向上させます。
- **動的ロケール検出や切り替え**などの高度な機能を利用できます。

> IntlayerはNext.js 12、13、14、15に対応しています。Next.js Page Routerを使用している場合は、この[ガイド](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_with_nextjs_page_router.md)を参照してください。Next.js 12、13、14でApp Routerを使っている場合は、この[ガイド](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_with_nextjs_14.md)を参照してください。

---

## Next.jsアプリケーションにIntlayerをセットアップする手順ガイド

### ステップ1: 依存関係をインストール

npmを使用して必要なパッケージをインストールします：

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

  設定管理、翻訳、[コンテンツ宣言](https://github.com/aymericzip/intlayer/blob/main/docs/ja/content_declaration/get_started.md)、トランスパイレーション、[CLIコマンド](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_cli.md)のための国際化ツールを提供するコアパッケージです。

- **next-intlayer**

  IntlayerとNext.jsを統合するパッケージです。Next.js国際化のためのコンテキストプロバイダーとフックを提供します。さらに、Intlayerを[Webpack](https://webpack.js.org/)や[Turbopack](https://nextjs.org/docs/app/api-reference/turbopack)と統合するNext.jsプラグイン、およびユーザーの好ましいロケールを検出し、クッキーを管理し、URLリダイレクトを処理するためのミドルウェアを含んでいます。

### ステップ2: プロジェクトを設定する

アプリケーションの言語を設定するための構成ファイルを作成します：

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.JAPANESE,
      Locales.FRENCH,
      Locales.SPANISH,
      // その他のロケール
    ],
    defaultLocale: Locales.JAPANESE,
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
      Locales.JAPANESE,
      Locales.FRENCH,
      Locales.SPANISH,
      // その他のロケール
    ],
    defaultLocale: Locales.JAPANESE,
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
      Locales.JAPANESE,
      Locales.FRENCH,
      Locales.SPANISH,
      // その他のロケール
    ],
    defaultLocale: Locales.JAPANESE,
  },
};

module.exports = config;
```

> この構成ファイルを通じて、ローカライズされたURL、ミドルウェアのリダイレクト、クッキー名、コンテンツ宣言の場所と拡張子の設定、Intlayerのログをコンソールに表示しないようにするなどを設定できます。利用可能なパラメータの完全なリストについては、[設定ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/ja/configuration.md)を参照してください。

### ステップ3: Next.js設定にIntlayerを統合

Next.jsのセットアップをIntlayerを使用するように設定します：

```typescript fileName="next.config.mjs"
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withIntlayer(nextConfig);
```

> `withIntlayer()` Next.jsプラグインは、IntlayerをNext.jsに統合するために使用されます。これは、コンテンツ宣言ファイルのビルドを保証し、開発モードでそれらを監視します。WebpackまたはTurbopack環境内でIntlayerの環境変数を定義します。さらに、パフォーマンスを最適化するためのエイリアスを提供し、サーバーコンポーネントとの互換性を確保します。

### ステップ4: ロケール検出のためのミドルウェアを設定

ユーザーの好ましいロケールを検出するためのミドルウェアを設定します：

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

> `intlayerMiddleware`は、ユーザーの好ましいロケールを検出し、[設定](https://github.com/aymericzip/intlayer/blob/main/docs/ja/configuration.md)で指定された適切なURLにリダイレクトします。また、ユーザーの好ましいロケールをクッキーに保存することを可能にします。

### ステップ5: 動的ロケールルートを定義

`RootLayout`からすべてを削除し、次のコードに置き換えます：

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

> `RootLayout`コンポーネントを空にすることで、`<html>`タグに`lang`と`dir`属性を設定できます。

動的ルーティングを実装するために、`[locale]`ディレクトリに新しいレイアウトを追加してロケールのパスを設定します：

```tsx fileName="src/app/[locale]/layout.tsx" codeFormat="typescript"
import type { NextLayoutIntlayer } from "next-intlayer";
import { Inter } from "next/font/google";
import { getHTMLTextDir } from "intlayer";

const inter = Inter({ subsets: ["latin"] });

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

> `[locale]`パスセグメントはロケールを定義するために使用されます。例：`/en-US/about`は`en-US`に、`/fr/about`は`fr`に関連します。

次に、アプリケーションレイアウトに`generateStaticParams`関数を実装します。

```tsx {1} fileName="src/app/[locale]/layout.tsx" codeFormat="typescript"
export { generateStaticParams } from "next-intlayer"; // 挿入行

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  /*... 後のコード*/
};

export default LocaleLayout;
```

```jsx {1} fileName="src/app/[locale]/layout.mjx" codeFormat="esm"
export { generateStaticParams } from "next-intlayer"; // 挿入行

const LocaleLayout = async ({ children, params: { locale } }) => {
  /*... 後のコード*/
};

// ... 後のコード
```

```jsx {1,7} fileName="src/app/[locale]/layout.csx" codeFormat="commonjs"
const { generateStaticParams } = require("next-intlayer"); // 挿入行

const LocaleLayout = async ({ children, params: { locale } }) => {
  /*... 後のコード*/
};

module.exports = { default: LocaleLayout, generateStaticParams };
```

> `generateStaticParams`は、アプリケーションがすべてのロケールの必要なページを事前にビルドすることを保証し、ランタイム計算を減少させ、ユーザーエクスペリエンスを向上させます。詳細については、[Next.jsのgenerateStaticParamsに関するドキュメント](https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic-rendering#generate-static-params)を参照してください。

### ステップ6: コンテンツを宣言する

翻訳を保存するためのコンテンツ宣言を作成して管理します：

```tsx fileName="src/app/[locale]/page.content.ts" contentDeclarationFormat="typescript"
import { t, type DeclarationContent } from "intlayer";

const pageContent = {
  key: "page",
  content: {
    getStarted: {
      main: t({
        ja: "編集を始めるには",
        fr: "Commencez par éditer",
        es: "Comience por editar",
      }),
      pageLink: "src/app/page.tsx",
    },
  },
} satisfies DeclarationContent;

export default pageContent;
```

```javascript fileName="src/app/[locale]/page.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').DeclarationContent} */
const pageContent = {
  key: "page",
  content: {
    getStarted: {
      main: t({
        ja: "編集を始めるには",
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

/** @type {import('intlayer').DeclarationContent} */
const pageContent = {
  key: "page",
  content: {
    getStarted: {
      main: t({
        ja: "編集を始めるには",
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
  "key": "page",
  "content": {
    "getStarted": {
      "nodeType": "translation",
      "translation": {
        "ja": "編集を始めるには",
        "fr": "Commencez par éditer",
        "es": "Comience por editar"
      }
    },
    "pageLink": {
      "nodeType": "translation",
      "translation": {
        "ja": "src/app/page.tsx",
        "fr": "src/app/page.tsx",
        "es": "src/app/page.tsx"
      }
    }
  }
}
```

> コンテンツ宣言は、アプリケーション内の任意の場所で定義できますが、`contentDir`ディレクトリに含まれている必要があります（デフォルトは`./src`）。また、コンテンツ宣言ファイルの拡張子と一致する必要があります（デフォルトは`.content.{ts,tsx,js,jsx,mjs,cjs}`）。
> 詳細については、[コンテンツ宣言のドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/ja/content_declaration/get_started.md)を参照してください。

### ステップ7: コード内のコンテンツを利用

アプリケーション全体でコンテンツ辞書にアクセスします：

```tsx fileName="src/app/[locale]/page.tsx" codeFormat="typescript"
import type { FC } from "react";
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { type NextPageIntlayer, IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";

const PageContent: FC = () => {
  const { title, content } = useIntlayer("page");

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
    <>
      <IntlayerServerProvider locale={locale}>
        <PageContent />
        <ServerComponentExample />

        <IntlayerClientProvider locale={locale}>
          <ClientComponentExample />
        </IntlayerClientProvider>
      </IntlayerServerProvider>
    </>
  );
};

export default Page;
```

```jsx fileName="src/app/[locale]/page.mjx" codeFormat="esm"
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";

const Page = ({ locale }) => {
  const content = useIntlayer("page", locale);

  return (
    <>
      <p>{content.getStarted.main}</p>
      <code>{content.getStarted.pageLink}</code>

      <IntlayerClientProvider locale={locale}>
        <IntlayerServerProvider locale={locale}>
          <ClientComponentExample />
          <ServerComponentExample />
        </IntlayerServerProvider>
      </IntlayerClientProvider>
    </>
  );
};
```

```jsx fileName="src/app/[locale]/page.csx" codeFormat="commonjs"
const { IntlayerClientProvider } = require("next-intlayer");
const { IntlayerServerProvider, useIntlayer } = require("next-intlayer/server");

const Page = ({ locale }) => {
  const content = useIntlayer("page", locale);

  return (
    <>
      <p>{content.getStarted.main}</p>
      <code>{content.getStarted.pageLink}</code>

      <IntlayerClientProvider locale={locale}>
        <IntlayerServerProvider locale={locale}>
          <ClientComponentExample />
          <ServerComponentExample />
        </IntlayerServerProvider>
      </IntlayerClientProvider>
    </>
  );
};
```

- **`IntlayerClientProvider`**は、クライアントサイドコンポーネントにロケールを提供するために使用されます。親コンポーネントの中であれば、どこにでも配置できますが、レイアウトに配置することが推奨されます。これにより、Next.jsはページ間でレイアウトコードを共有し、効率が向上します。レイアウトで`IntlayerClientProvider`を使用すると、各ページで再初期化することを避け、パフォーマンスが向上し、アプリケーション全体で一貫したローカライズコンテキストを維持できます。
- **`IntlayerServerProvider`**は、サーバーの子要素にロケールを提供するために使用されます。レイアウト内で設定することはできません。

  > レイアウトとページで共通のサーバーコンテキストを共有することはできません。なぜなら、サーバーコンテキストシステムはリクエストごとのデータストア（[Reactのキャッシュ](https://react.dev/reference/react/cache)メカニズム経由）のために基づいているからです。これにより、アプリケーションの異なるセグメントに対して各「コンテキスト」が再作成されます。プロバイダを共有レイアウトに配置すると、この隔離が壊れ、サーバーコンテキストの値がサーバーコンポーネントに正しく伝播されなくなります。

```tsx {4,7} fileName="src/components/ClientComponentExample.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ClientComponentExample: FC = () => {
  const content = useIntlayer("client-component-example"); // 関連するコンテンツ宣言を作成

  return (
    <div>
      <h2>{content.title} </h2>
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
      <h2>{content.title} </h2>
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
      <h2>{content.title} </h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```tsx {2} fileName="src/components/ServerComponentExample.tsx"  codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "next-intlayer/server";

export const ServerComponentExample: FC = () => {
  const content = useIntlayer("server-component-example"); // 関連するコンテンツ宣言を作成

  return (
    <div>
      <h2>{content.title} </h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx {1} fileName="src/components/ServerComponentExample.mjx" codeFormat="esm"
import { useIntlayer } from "next-intlayer/server";

const ServerComponentExample = () => {
  const content = useIntlayer("server-component-example"); // 関連するコンテンツ宣言を作成

  return (
    <div>
      <h2>{content.title} </h2>
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
      <h2>{content.title} </h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> もし、`alt`、`title`、`href`、`aria-label`などの`string`属性でコンテンツを使用したい場合は、関数の値を呼び出す必要があります。例えば：
>
> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> `useIntlayer`フックの詳細については、[ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/next-intlayer/useIntlayer.md)を参照してください。

### (オプション) ステップ8: メタデータの国際化

ページのタイトルなどのメタデータを国際化したい場合は、Next.jsが提供する`generateMetadata`関数を使用できます。この関数の中で`getTranslationContent`関数を使用してメタデータを翻訳します。

````typescript fileName="src/app/[locale]/layout.tsx or src/app/[locale]/page.tsx" codeFormat="typescript"
import {
  type IConfigLocales,
  getTranslationContent,
  getMultilingualUrls,
} from "intlayer";
import type { Metadata } from "next";
import type { LocalPromiseParams } from "next-intlayer";

export const generateMetadata = async ({
  params: { locale },
}: LocalPromiseParams): Metadata => {
  const { locale } = await params;

  const t = <T>(content: IConfigLocales<T>) =>
    getTranslationContent(content, locale);

  /**
   * 各ロケールのすべてのURLを含むオブジェクトを生成します。
   *
   * 例：
   * ```ts
   *  getMultilingualUrls('/about');
   *
   *  // 返り値
   *  // {
   *  //   ja: '/about',
   *  //   fr: '/fr/about',
   *  //   es: '/es/about',
   *  // }
   * ```
   */
  const multilingualUrls = getMultilingualUrls("/");

  return {
    title: t<string>({
      ja: "私のタイトル",
      fr: "Mon titre",
      es: "Mi título",
    }),
    description: t({
      ja: "私の説明",
      fr: "Ma description",
      es: "Mi descripción",
    }),
    alternates: {
      canonical: "/",
      languages: { ...multilingualUrls, "x-default": "/" },
    },
    openGraph: {
      url: multilingualUrls[locale],
    },
  };
};

// ... 後のコード
````

````javascript fileName="src/app/[locale]/layout.mjs or src/app/[locale]/page.mjs" codeFormat="esm"
import { getTranslationContent, getMultilingualUrls } from "intlayer";

export const generateMetadata = async ({ params }) => {
  const { locale } = await params;
  const t = (content) => getTranslationContent(content, locale);

  /**
   * 各ロケールのすべてのURLを含むオブジェクトを生成します。
   *
   * 例：
   * ```ts
   *  getMultilingualUrls('/about');
   *
   *  // 返り値
   *  // {
   *  //   ja: '/about',
   *  //   fr: '/fr/about',
   *  //   es: '/es/about'
   *  // }
   * ```
   */
  const multilingualUrls = getMultilingualUrls("/");

  return {
    title: t({
      ja: "私のタイトル",
      fr: "Mon titre",
      es: "Mi título",
    }),
    description: t({
      ja: "私の説明",
      fr: "Ma description",
      es: "Mi descripción",
    }),
    alternates: {
      canonical: "/",
      languages: { ...multilingualUrls, "x-default": "/" },
    },
    openGraph: {
      url: multilingualUrls[locale],
    },
  };
};

// ... 後のコード
````

````javascript fileName="src/app/[locale]/layout.cjs or src/app/[locale]/page.cjs" codeFormat="commonjs"
const { getTranslationContent, getMultilingualUrls } = require("intlayer");

module.exports.generateMetadata = async ({ params }) => {
  const { locale } = await params;
  const t = (content) => getTranslationContent(content, locale);

  /**
   * 各ロケールのすべてのURLを含むオブジェクトを生成します。
   *
   * 例：
   * ```ts
   *  getMultilingualUrls('/about');
   *
   *  // 返り値
   *  // {
   *  //   ja: '/about',
   *  //   fr: '/fr/about',
   *  //   es: '/es/about'
   *  // }
   * ```
   */
  const multilingualUrls = getMultilingualUrls("/");

  return {
    title: t({
      ja: "私のタイトル",
      fr: "Mon titre",
      es: "Mi título",
    }),
    description: t({
      ja: "私の説明",
      fr: "Ma description",
      es: "Mi descripción",
    }),
    alternates: {
      canonical: "/",
      languages: { ...multilingualUrls, "x-default": "/" },
    },
    openGraph: {
      url: multilingualUrls[locale],
    },
  };
};

// ... 後のコード
````

> メタデータの最適化については、[Next.jsの公式ドキュメント](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)を参照してください。

### (オプション) ステップ9: sitemap.xmlとrobots.txtの国際化

`sitemap.xml`と`robots.txt`を国際化するために、Intlayerが提供する`getMultilingualUrls`関数を使用できます。この関数を用いることで、サイトマップ用の多言語URLを生成できます。

```tsx fileName="src/app/sitemap.ts" codeFormat="typescript"
import { getMultilingualUrls } from "intlayer";
import type { MetadataRoute } from "next";

const sitemap = (): MetadataRoute.Sitemap => [
  {
    url: "https://example.com",
    alternates: {
      languages: getMultilingualUrls("https://example.com"),
    },
  },
  {
    url: "https://example.com/login",
    alternates: {
      languages: getMultilingualUrls("https://example.com/login"),
    },
  },
  {
    url: "https://example.com/register",
    alternates: {
      languages: getMultilingualUrls("https://example.com/register"),
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
      languages: getMultilingualUrls("https://example.com"),
    },
  },
  {
    url: "https://example.com/login",
    alternates: {
      languages: getMultilingualUrls("https://example.com/login"),
    },
  },
  {
    url: "https://example.com/register",
    alternates: {
      languages: getMultilingualUrls("https://example.com/register"),
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
      languages: getMultilingualUrls("https://example.com"),
    },
  },
  {
    url: "https://example.com/login",
    alternates: {
      languages: getMultilingualUrls("https://example.com/login"),
    },
  },
  {
    url: "https://example.com/register",
    alternates: {
      languages: getMultilingualUrls("https://example.com/register"),
    },
  },
];

module.exports = sitemap;
```

```tsx fileName="src/app/robots.ts" codeFormat="typescript"
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

> サイトマップの最適化に関する詳細は、[Next.jsの公式ドキュメント](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap)を参照してください。robots.txtの最適化に関する詳細は、[Next.jsの公式ドキュメント](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots)を参照してください。

### (オプション) ステップ10: コンテンツの言語を変更

コンテンツの言語を変更するには、`useLocale`フックが提供する`setLocale`関数を使用できます。この関数を使用すると、アプリケーションのロケールを設定し、それに応じてコンテンツを更新できます。

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
    <ol>
      {availableLocales.map((localeItem) => (
        <li key={localeItem}>
          <Link
            href={getLocalizedUrl(pathWithoutLocale, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
          >
            <span>
              {/* 自国のロケールでの言語名 - 例: 日本語 */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* 現在のロケールでの言語名 - 例: 日本語がLocales.SPANISHに設定されているときのEspañol */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* 英語での言語名 - 例: Japanese */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
            <span>
              {/* 自国のロケールでの言語名 - 例: JA */}
              {localeItem}
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.mjx" codeFormat="esm"
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
    <ol>
      {availableLocales.map((localeItem) => (
        <li key={localeItem}>
          <Link
            href={getLocalizedUrl(pathWithoutLocale, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
          >
            <span>
              {/* 自国のロケールでの言語名 - 例: 日本語 */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* 現在のロケールでの言語名 - 例: 日本語がLocales.SPANISHに設定されているときのEspañol */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* 英語での言語名 - 例: Japanese */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
            <span>
              {/* 自国のロケールでの言語名 - 例: JA */}
              {localeItem}
            </span>
          </Link>
        </li>
      ))}
    </ol>
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
    <ol>
      {availableLocales.map((localeItem) => (
        <li key={localeItem}>
          <Link
            href={getLocalizedUrl(pathWithoutLocale, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
          >
            <span>
              {/* 自国のロケールでの言語名 - 例: 日本語 */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* 現在のロケールでの言語名 - 例: 日本語がLocales.SPANISHに設定されているときのEspañol */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* 英語での言語名 - 例: Japanese */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
            <span>
              {/* 自国のロケールでの言語名 - 例: JA */}
              {localeItem}
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
};
```

> ドキュメント参照：
>
> - [`useLocale`フック](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/next-intlayer/useLocale.md)
> - [`getLocaleName`フック](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl`フック](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir`フック](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/intlayer/getHTMLTextDir.md)
> - [`hrefLang`属性](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [`lang`属性](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - [`dir`属性](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - [`aria-current`属性](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

### TypeScriptの設定

Intlayerは、TypeScriptの利点を活用し、コードベースを強化するためにモジュール拡張を使用します。

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

TypeScript設定に自動生成された型が含まれていることを確認してください。

```json5 fileName="tsconfig.json"
{
  // ... 既存のTypeScript構成
  "include": [
    // ... 既存のTypeScript構成
    "types", // 自動生成された型を含める
  ],
}
```

### Gitの設定

Intlayerによって生成されたファイルを無視することが推奨されます。これにより、それらをGitリポジトリにコミットすることを避けることができます。

これを行うには、`.gitignore`ファイルに次の指示を追加します：

```plaintext fileName=".gitignore"
# Intlayerによって生成されたファイルを無視
.intlayer
```
