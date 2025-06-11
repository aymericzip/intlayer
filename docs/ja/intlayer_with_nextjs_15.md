# Getting Started internationalizing (i18n) with Intlayer and Next.js 15 App Router

<iframe title="The best i18n solution for Next.js? Discover Intlayer" class="m-auto aspect-[16/9] w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/e_PPG7PTqGU?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

[アプリケーションテンプレート](https://github.com/aymericzip/intlayer-next-15-template)をGitHubで見る。

## Intlayerを始める

**Intlayer**は、最新のウェブアプリケーションで多言語対応を簡素化するために設計された、革新的なオープンソースの国際化（i18n）ライブラリです。Intlayerは、強力な**App Router**を含む最新の**Next.js 15**フレームワークとシームレスに統合されます。**Server Components**での効率的なレンダリングに最適化されており、[**Turbopack**](https://nextjs.org/docs/architecture/turbopack)とも完全に互換性があります。

Intlayerを使用すると、以下のことが可能です：

- コンポーネントレベルで宣言的な辞書を使用して**簡単に翻訳を管理**。
- メタデータ、ルート、およびコンテンツを**動的にローカライズ**。
- **クライアントサイドおよびサーバーサイドのコンポーネントで翻訳にアクセス**。
- 自動生成された型で**TypeScriptサポート**を確保し、オートコンプリートとエラー検出を改善。
- 動的なロケール検出や切り替えなどの**高度な機能**を活用。

> IntlayerはNext.js 12、13、14、15と互換性があります。Next.js Page Routerを使用している場合は、この[ガイド](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_with_nextjs_page_router.md)を参照してください。Next.js 12、13、14でApp Routerを使用している場合は、この[ガイド](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_with_nextjs_14.md)を参照してください。

---

## Next.jsアプリケーションでIntlayerをセットアップするステップバイステップガイド

### ステップ1: 依存関係をインストールする

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

  設定管理、翻訳、[コンテンツ宣言](https://github.com/aymericzip/intlayer/blob/main/docs/ja/dictionary/get_started.md)、トランスパイル、および[CLIコマンド](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_cli.md)を提供する国際化ツールのコアパッケージ。

- **next-intlayer**

  IntlayerをNext.jsと統合するパッケージ。Next.jsの国際化のためのコンテキストプロバイダーとフックを提供します。また、[Webpack](https://webpack.js.org/)または[Turbopack](https://nextjs.org/docs/app/api-reference/turbopack)とIntlayerを統合するNext.jsプラグインや、ユーザーの優先ロケールを検出し、クッキーを管理し、URLリダイレクションを処理するミドルウェアも含まれています。

### ステップ2: プロジェクトを設定する

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

> この設定ファイルを通じて、ローカライズされたURL、ミドルウェアリダイレクション、クッキー名、コンテンツ宣言の場所と拡張子、コンソールでのIntlayerログの無効化などを設定できます。利用可能なパラメータの完全なリストについては、[設定ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/ja/configuration.md)を参照してください。

### ステップ3: Next.js設定にIntlayerを統合する

Next.jsの設定をIntlayerを使用するように構成します：

```typescript filename="next.config.ts" codeFormat="typescript"
import type { NextConfig } from "next";
import { withIntlayer } from "next-intlayer/server";

const nextConfig: NextConfig = {
  /* 設定オプションをここに記述 */
};

export default withIntlayer(nextConfig);
```

```typescript fileName="next.config.mjs" codeFormat="esm"
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* 設定オプションをここに記述 */
};

export default withIntlayer(nextConfig);
```

```typescript fileName="next.config.cjs" codeFormat="commonjs"
const { withIntlayer } = require("next-intlayer/server");

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* 設定オプションをここに記述 */
};

module.exports = withIntlayer(nextConfig);
```

> `withIntlayer()` Next.jsプラグインは、IntlayerをNext.jsと統合するために使用されます。コンテンツ宣言ファイルのビルドを確実にし、開発モードでそれらを監視します。また、[Webpack](https://webpack.js.org/)または[Turbopack](https://nextjs.org/docs/app/api-reference/turbopack)環境内でIntlayer環境変数を定義します。さらに、パフォーマンスを最適化するエイリアスを提供し、サーバーコンポーネントとの互換性を確保します。

### ステップ4: 動的ロケールルートを定義する

`RootLayout`からすべてを削除し、以下のコードに置き換えます：

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

> `RootLayout`コンポーネントを空に保つことで、[`lang`](https://developer.mozilla.org/ja/docs/Web/HTML/Global_attributes/lang)および[`dir`](https://developer.mozilla.org/ja/docs/Web/HTML/Global_attributes/dir)属性を`<html>`タグに設定できます。

動的ルーティングを実装するには、`[locale]`ディレクトリに新しいレイアウトを追加してロケールのパスを提供します：

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

> `[locale]`パスセグメントはロケールを定義するために使用されます。例：`/en-US/about`は`en-US`を参照し、`/fr/about`は`fr`を参照します。

次に、アプリケーションレイアウトに`generateStaticParams`関数を実装します。

```tsx {1} fileName="src/app/[locale]/layout.tsx" codeFormat="typescript"
export { generateStaticParams } from "next-intlayer"; // 挿入する行

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  /*... 残りのコード*/
};

export default LocaleLayout;
```

```jsx {1} fileName="src/app/[locale]/layout.mjx" codeFormat="esm"
export { generateStaticParams } from "next-intlayer"; // 挿入する行

const LocaleLayout = async ({ children, params: { locale } }) => {
  /*... 残りのコード*/
};

// ... 残りのコード
```

```jsx {1,7} fileName="src/app/[locale]/layout.csx" codeFormat="commonjs"
const { generateStaticParams } = require("next-intlayer"); // 挿入する行

const LocaleLayout = async ({ children, params: { locale } }) => {
  /*... 残りのコード*/
};

module.exports = { default: LocaleLayout, generateStaticParams };
```

> `generateStaticParams`は、アプリケーションがすべてのロケールに必要なページを事前ビルドし、ランタイム計算を削減し、ユーザーエクスペリエンスを向上させます。詳細については、[Next.jsのgenerateStaticParamsに関するドキュメント](https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic-rendering#generate-static-params)を参照してください。

### ステップ5: コンテンツを宣言する

翻訳を保存するためのコンテンツ宣言を作成および管理します：

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
        "en": "Get started by editing",
        "fr": "Commencez par éditer",
        "es": "Comience por editar"
      }
    },
    "pageLink": {
      "nodeType": "translation",
      "translation": {
        "en": "src/app/page.tsx",
        "fr": "src/app/page.tsx",
        "es": "src/app/page.tsx"
      }
    }
  }
}
```

> コンテンツ宣言は、`contentDir`ディレクトリ（デフォルトでは`./src`）に含まれている限り、アプリケーション内のどこにでも定義できます。また、コンテンツ宣言ファイルの拡張子（デフォルトでは`.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`）に一致する必要があります。

> 詳細については、[コンテンツ宣言ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/ja/dictionary/get_started.md)を参照してください。

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

- **`IntlayerClientProvider`**は、クライアントサイドコンポーネントにロケールを提供するために使用されます。任意の親コンポーネントに配置できますが、レイアウトに配置することをお勧めします。これは、Next.jsがページ間でレイアウトコードを共有するため、より効率的です。`IntlayerClientProvider`をレイアウトに使用することで、各ページで再初期化する必要がなくなり、パフォーマンスが向上し、アプリケーション全体で一貫したローカリゼーションコンテキストが維持されます。
- **`IntlayerServerProvider`**は、サーバーの子コンポーネントにロケールを提供するために使用されます。レイアウトに設定することはできません。

  > レイアウトとページは共通のサーバーコンテキストを共有できません。これは、サーバーコンテキストシステムがリクエストごとのデータストア（[Reactのキャッシュ](https://react.dev/reference/react/cache)メカニズムを介して）に基づいているためです。これにより、アプリケーションの異なるセグメントに対して各「コンテキスト」が再作成されます。共有レイアウトにプロバイダーを配置すると、この分離が破損し、サーバーコンポーネントにサーバーコンテキスト値が正しく伝播されなくなります。

```tsx {4,7} fileName="src/components/ClientComponentExample.tsx" codeFormat="typescript"
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
  const content = useIntlayer("server-component-example"); // 関連するコンテンツ宣言を作成

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
  const content = useIntlayer("server-component-example"); // 関連するコンテンツ宣言を作成

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

> コンテンツを`alt`、`title`、`href`、`aria-label`などの`string`属性で使用する場合は、関数の値を呼び出す必要があります。例えば：

> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> `useIntlayer`フックの詳細については、[ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/next-intlayer/useIntlayer.md)を参照してください。

### (オプション) ステップ7: ロケール検出用ミドルウェアを設定する

ユーザーの優先ロケールを検出するためのミドルウェアを設定します：

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

> `intlayerMiddleware`は、ユーザーの優先ロケールを検出し、[設定](https://github.com/aymericzip/intlayer/blob/main/docs/ja/configuration.md)で指定された適切なURLにリダイレクトします。また、ユーザーの優先ロケールをクッキーに保存することも可能です。

### (オプション) ステップ8: メタデータの国際化

ページのタイトルなどのメタデータを国際化する場合は、Next.jsが提供する`generateMetadata`関数を使用できます。この関数内で`getTranslation`関数を使用してメタデータを翻訳します。

````typescript fileName="src/app/[locale]/layout.tsx or src/app/[locale]/page.tsx" codeFormat="typescript"
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

  /**
   * 各ロケールのすべてのURLを含むオブジェクトを生成します。
   *
   * 例：
   * ```ts
   *  getMultilingualUrls('/about');
   *
   *  // 結果
   *  // {
   *  //   en: '/about',
   *  //   fr: '/fr/about',
   *  //   es: '/es/about',
   *  // }
   * ```
   */
  const multilingualUrls = getMultilingualUrls("/");

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
    alternates: {
      canonical: multilingualUrls[locale as keyof typeof multilingualUrls],
      languages: { ...multilingualUrls, "x-default": "/" },
    },
    openGraph: {
      url: multilingualUrls[locale],
    },
  };
};

// ... 残りのコード
````

````javascript fileName="src/app/[locale]/layout.mjs or src/app/[locale]/page.mjs" codeFormat="esm"
import { getTranslation, getMultilingualUrls } from "intlayer";

export const generateMetadata = async ({ params }) => {
  const { locale } = await params;
  const t = (content) => getTranslation(content, locale);

  /**
   * 各ロケールのすべてのURLを含むオブジェクトを生成します。
   *
   * 例：
   * ```ts
   *  getMultilingualUrls('/about');
   *
   *  // 結果
   *  // {
   *  //   en: '/about',
   *  //   fr: '/fr/about',
   *  //   es: '/es/about'
   *  // }
   * ```
   */
  const multilingualUrls = getMultilingualUrls("/");

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
    alternates: {
      canonical: multilingualUrls[locale],
      languages: { ...multilingualUrls, "x-default": "/" },
    },
    openGraph: {
      url: multilingualUrls[locale],
    },
  };
};

// ... 残りのコード
````

````javascript fileName="src/app/[locale]/layout.cjs or src/app/[locale]/page.cjs" codeFormat="commonjs"
const { getTranslation, getMultilingualUrls } = require("intlayer");

const generateMetadata = async ({ params }) => {
  const { locale } = await params;

  const t = (content) => getTranslation(content, locale);

  /**
   * 各ロケールのすべてのURLを含むオブジェクトを生成します。
   *
   * 例：
   * ```ts
   *  getMultilingualUrls('/about');
   *
   *  // 結果
   *  // {
   *  //   en: '/about',
   *  //   fr: '/fr/about',
   *  //   es: '/es/about'
   *  // }
   * ```
   */
  const multilingualUrls = getMultilingualUrls("/");

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
    alternates: {
      canonical: multilingualUrls[locale],
      languages: { ...multilingualUrls, "x-default": "/" },
    },
    openGraph: {
      url: multilingualUrls[locale],
    },
  };
};

module.exports = { generateMetadata };

// ... 残りのコード
````

> メタデータの最適化について詳しくは、[公式Next.jsドキュメント](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)を参照してください。

### (オプション) ステップ9: sitemap.xmlおよびrobots.txtの国際化

`sitemap.xml`および`robots.txt`を国際化するには、Intlayerが提供する`getMultilingualUrls`関数を使用します。この関数を使用すると、サイトマップ用の多言語URLを生成できます。

```tsx fileName="src/app/sitemap.ts" codeFormat="typescript"
import { getMultilingualUrls } from "intlayer";
import type { MetadataRoute } from "next";

const sitemap = (): MetadataRoute.Sitemap => [
  {
    url: "https://example.com",
    alternates: {
      languages: { ...getMultilingualUrls("https://example.com") },
    },
  },
  {
    url: "https://example.com/login",
    alternates: {
      languages: { ...getMultilingualUrls("https://example.com/login") },
    },
  },
  {
    url: "https://example.com/register",
    alternates: {
      languages: { ...getMultilingualUrls("https://example.com/register") },
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
      languages: { ...getMultilingualUrls("https://example.com") },
    },
  },
  {
    url: "https://example.com/login",
    alternates: {
      languages: { ...getMultilingualUrls("https://example.com/login") },
    },
  },
  {
    url: "https://example.com/register",
    alternates: {
      languages: { ...getMultilingualUrls("https://example.com/register") },
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
      languages: { ...getMultilingualUrls("https://example.com") },
    },
  },
  {
    url: "https://example.com/login",
    alternates: {
      languages: { ...getMultilingualUrls("https://example.com/login") },
    },
  },
  {
    url: "https://example.com/register",
    alternates: {
      languages: { ...getMultilingualUrls("https://example.com/register") },
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

> サイトマップの最適化について詳しくは、[公式Next.jsドキュメント](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap)を参照してください。robots.txtの最適化について詳しくは、[公式Next.jsドキュメント](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots)を参照してください。

### (オプション) ステップ10: コンテンツの言語を変更する

Next.jsでコンテンツの言語を変更するには、`Link`コンポーネントを使用してユーザーを適切なローカライズされたページにリダイレクトするのが推奨される方法です。`Link`コンポーネントはページのプリフェッチを可能にし、完全なページリロードを避けるのに役立ちます。

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
  const { locale, pathWithoutLocale, availableLocales } = useLocale();
  const { setLocaleCookie } = useLocaleCookie();

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
            onClick={() => setLocaleCookie(localeItem)}
          >
            <span>
              {/* ロケール - 例: FR */}
              {localeItem}
            </span>
            <span>
              {/* 自身のロケールでの言語 - 例: Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* 現在のロケールでの言語 - 例: Francés (現在のロケールがLocales.SPANISHに設定されている場合) */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* 英語での言語 - 例: French */}
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
  const { locale, pathWithoutLocale, availableLocales } = useLocale();
  const { setLocaleCookie } = useLocaleCookie();

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
            onClick={() => setLocaleCookie(localeItem)}
          >
            <span>
              {/* ロケール - 例: FR */}
              {localeItem}
            </span>
            <span>
              {/* 自身のロケールでの言語 - 例: Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* 現在のロケールでの言語 - 例: Francés (現在のロケールがLocales.SPANISHに設定されている場合) */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* 英語での言語 - 例: French */}
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
  const { locale, pathWithoutLocale, availableLocales } = useLocale();
  const { setLocaleCookie } = useLocaleCookie();

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
            onClick={() => setLocaleCookie(localeItem)}
          >
            <span>
              {/* ロケール - 例: FR */}
              {localeItem}
            </span>
            <span>
              {/* 自身のロケールでの言語 - 例: Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* 現在のロケールでの言語 - 例: Francés (現在のロケールがLocales.SPANISHに設定されている場合) */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* 英語での言語 - 例: French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
```

> ドキュメント参照：

> - [`useLocale`フック](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/next-intlayer/useLocale.md)

> - [`getLocaleName`フック](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/intlayer/getLocaleName.md)

> - [`getLocalizedUrl`フック](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/intlayer/getLocalizedUrl.md)

> - [`getHTMLTextDir`フック](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/intlayer/getHTMLTextDir.md)

> - [`hrefLang`属性](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=ja)

> - [`lang`属性](https://developer.mozilla.org/ja/docs/Web/HTML/Global_attributes/lang)

> - [`dir`属性](https://developer.mozilla.org/ja/docs/Web/HTML/Global_attributes/dir)

> - [`aria-current`属性](https://developer.mozilla.org/ja/docs/Web/Accessibility/ARIA/Attributes/aria-current)

### (オプション) ステップ11: ローカライズされたリンクコンポーネントを作成する

アプリケーションのナビゲーションが現在のロケールを尊重するようにするために、カスタム`Link`コンポーネントを作成できます。このコンポーネントは、内部URLを自動的に現在の言語でプレフィックスします。例えば、フランス語を話すユーザーが「About」ページへのリンクをクリックすると、`/about`ではなく`/fr/about`にリダイレクトされます。

この動作は以下の理由で便利です：

- **SEOとユーザーエクスペリエンス**：ローカライズされたURLは、検索エンジンが言語固有のページを正しくインデックスし、ユーザーに好みの言語でコンテンツを提供するのに役立ちます。
- **一貫性**：アプリケーション全体でローカライズされたリンクを使用することで、ナビゲーションが現在のロケール内に留まり、予期しない言語の切り替えを防ぎます。
- **保守性**：ローカリゼーションロジックを単一のコンポーネントに集中させることで、URLの管理が簡素化され、アプリケーションが成長するにつれてコードベースの保守性が向上します。

以下は、TypeScriptでのローカライズされた`Link`コンポーネントの実装例です：

```tsx fileName="src/components/Link.tsx" codeFormat="typescript"
"use client";

import { getLocalizedUrl } from "intlayer";
import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import { useLocale } from "next-intlayer";
import type { PropsWithChildren, FC } from "react";

/**
 * 指定されたURLが外部リンクかどうかを確認するユーティリティ関数。
 * URLがhttp://またはhttps://で始まる場合、外部リンクと見なされます。
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * 現在のロケールに基づいてhref属性を適応させるカスタムLinkコンポーネント。
 * 内部リンクの場合、`getLocalizedUrl`を使用してURLにロケールをプレフィックスします（例：/fr/about）。
 * これにより、ナビゲーションが同じロケールコンテキスト内に留まることが保証されます。
 */
export const Link: FC<PropsWithChildren<NextLinkProps>> = ({
  href,
  children,
  ...props
}) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  // リンクが内部リンクで有効なhrefが提供されている場合、ローカライズされたURLを取得します。
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
 * 指定されたURLが外部リンクかどうかを確認するユーティリティ関数。
 * URLがhttp://またはhttps://で始まる場合、外部リンクと見なされます。
 */
export const checkIsExternalLink = (href) => /^https?:\/\//.test(href ?? "");

/**
 * 現在のロケールに基づいてhref属性を適応させるカスタムLinkコンポーネント。
 * 内部リンクの場合、`getLocalizedUrl`を使用してURLにロケールをプレフィックスします（例：/fr/about）。
 * これにより、ナビゲーションが同じロケールコンテキスト内に留まることが保証されます。
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
 * 指定されたURLが外部リンクかどうかを確認するユーティリティ関数。
 * URLがhttp://またはhttps://で始まる場合、外部リンクと見なされます。
 */
const checkIsExternalLink = (href) => /^https?:\/\//.test(href ?? "");

/**
 * 現在のロケールに基づいてhref属性を適応させるカスタムLinkコンポーネント。
 * 内部リンクの場合、`getLocalizedUrl`を使用してURLにロケールをプレフィックスします（例：/fr/about）。
 * これにより、ナビゲーションが同じロケールコンテキスト内に留まることが保証されます。
 */
const Link = ({ href, children, ...props }) => {
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

#### 動作の仕組み

- **外部リンクの検出**：  
  ヘルパー関数`checkIsExternalLink`は、URLが外部リンクかどうかを判定します。外部リンクは変更されません。なぜなら、それらはローカリゼーションを必要としないからです。

- **現在のロケールの取得**：  
  `useLocale`フックは、現在のロケール（例：`fr`はフランス語）を提供します。

- **URLのローカライズ**：  
  内部リンク（つまり、外部リンクではないもの）については、`getLocalizedUrl`を使用してURLに現在のロケールを自動的にプレフィックスします。これにより、ユーザーがフランス語を使用している場合、`/about`を`href`として渡すと、`/fr/about`に変換されます。

- **リンクの返却**：  
  コンポーネントは、ローカライズされたURLを持つ`<a>`要素を返し、一貫性のあるロケールに基づいたナビゲーションを保証します。

この`Link`コンポーネントをアプリケーション全体で統合することで、一貫性があり、言語に配慮したユーザーエクスペリエンスを維持しながら、SEOと使いやすさを向上させることができます。

### （オプション）ステップ12: バンドルサイズを最適化する

`next-intlayer`を使用する際、辞書はデフォルトで各ページのバンドルに含まれます。バンドルサイズを最適化するために、Intlayerはマクロを使用して`useIntlayer`呼び出しをインテリジェントに置き換えるオプションのSWCプラグインを提供しています。これにより、辞書は実際に使用されるページのバンドルにのみ含まれるようになります。

この最適化を有効にするには、`@intlayer/swc`パッケージをインストールしてください。インストールが完了すると、`next-intlayer`は自動的にプラグインを検出して使用します：

```bash packageManager="npm"
npm install @intlayer/swc --save-dev
```

```bash packageManager="pnpm"
pnpm add @intlayer/swc --save-dev
```

```bash packageManager="yarn"
yarn add @intlayer/swc --save-dev
```

> 注: この最適化はNext.js 13以降でのみ利用可能です。

> 注: このパッケージはデフォルトではインストールされていません。なぜなら、SWCプラグインはNext.jsでまだ実験的な段階にあるためです。将来的に変更される可能性があります。

### TypeScriptを設定する

Intlayerは、TypeScriptのメリットを活用し、コードベースを強化するためにモジュール拡張を使用します。

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

自動生成された型を含めるようにTypeScript設定を確認してください。

```json5 fileName="tsconfig.json"
{
  // ... 既存のTypeScript設定
  "include": [
    // ... 既存のTypeScript設定
    ".intlayer/**/*.ts", // 自動生成された型を含める
  ],
}
```

### Git設定

Intlayerによって生成されたファイルを無視することをお勧めします。これにより、それらをGitリポジトリにコミットすることを避けることができます。

これを行うには、以下の指示を`.gitignore`ファイルに追加します：

```plaintext fileName=".gitignore"
# Intlayerによって生成されたファイルを無視する
.intlayer
```

### さらに進む

さらに進むために、[ビジュアルエディター](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_visual_editor.md)を実装するか、[CMS](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_CMS.md)を使用してコンテンツを外部化することができます。
