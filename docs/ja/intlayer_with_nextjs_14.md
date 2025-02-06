# Getting Started internationalizing (i18n) with Intlayer and Next.js 14 with App Router

## What is Intlayer?

**Intlayer** は、最新の Web アプリケーションにおける多言語サポートを簡素化するために設計された革新的なオープンソースの国際化 (i18n) ライブラリです。Intlayer は、最新の **Next.js 14** フレームワークにシームレスに統合されており、その強力な **App Router** を利用しています。効率的なレンダリングのために **Server Components** での動作に最適化されており、[**Turbopack**](https://nextjs.org/docs/architecture/turbopack)（Next.js >= 15 の場合）にも完全に対応しています。

Intlayer を使用すると、次のことが可能です：

- **宣言型の辞書を使用して翻訳を簡単に管理**できます。
- **メタデータ、ルート、およびコンテンツを動的にローカライズ**できます。
- **クライアント側とサーバー側のコンポーネントの両方で翻訳にアクセス**できます。
- **自動生成された型を使用して TypeScript サポートを保証**し、オートコンプリートやエラー検出を向上させます。
- **動的ロケール検出や切り替え**などの高度な機能を利用できます。

> Intlayer は、Next.js 12、13、14、15 と互換性があります。Next.js Page Router を使用している場合は、この[ガイド](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_with_nextjs_page_router.md)を参照してください。Next.js 15 と turbopack 有無に応じて、この[ガイド](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_with_nextjs_15.md)を参照してください。

---

## Step-by-Step Guide to Set Up Intlayer in a Next.js Application

### Step 1: Install Dependencies

必要なパッケージを npm を使用してインストールします。

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

  設定管理、翻訳、[コンテンツ宣言](https://github.com/aymericzip/intlayer/blob/main/docs/ja/dictionary/get_started.md)、トランスパイレーション、および [CLI コマンド](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_cli.md)のための国際化ツールを提供するコアパッケージです。

- **next-intlayer**

  Intlayer を Next.js に統合するパッケージです。Next.js の国際化のためのコンテキストプロバイダとフックを提供します。さらに、[Webpack](https://webpack.js.org/) や [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack) と統合するための Next.js プラグインや、ユーザーの優先ロケールを検出し、クッキーを管理し、URL リダイレクトを処理するためのミドルウェアを含んでいます。

### Step 2: Configure Your Project

アプリケーションの言語を設定するための構成ファイルを作成します。

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.JAPANESE,
      Locales.FRENCH,
      Locales.SPANISH,
      // 他のロケールを追加する
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
      // 他のロケールを追加する
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
      // 他のロケールを追加する
    ],
    defaultLocale: Locales.JAPANESE,
  },
};

module.exports = config;
```

> この構成ファイルを通じて、ローカライズされた URL、ミドルウェアのリダイレクト、クッキー名、コンテンツ宣言の位置と拡張子、Intlayer のログをコンソールで無効化するなどを設定できます。利用可能なパラメーターの完全なリストについては、[構成のドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/ja/configuration.md)を参照してください。

### Step 3: Integrate Intlayer in Your Next.js Configuration

Intlayer を使用するために、Next.js の設定を構成します。

```typescript fileName="next.config.mjs"
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withIntlayer(nextConfig);
```

> `withIntlayer()` Next.js プラグインは、Intlayer を Next.js に統合するために使用されます。コンテンツ宣言ファイルのビルドを保証し、開発モードでそれらを監視します。さらに、[Webpack](https://webpack.js.org/) または [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack) 環境内での Intlayerの環境変数を定義し、パフォーマンスを最適化するためのエイリアスを提供し、サーバーコンポーネントとの互換性を確保します。

### Step 4: Configure Middleware for Locale Detection

ユーザーの優先ロケールを検出するためのミドルウェアをセットアップします。

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

> `intlayerMiddleware` は、ユーザーの優先ロケールを検出し、[構成](https://github.com/aymericzip/intlayer/blob/main/docs/ja/configuration.md)で指定された適切な URL にリダイレクトします。また、ユーザーの優先ロケールをクッキーに保存することを可能にします。

> `matcher` パラメータをアプリケーションのルートに合わせるように調整してください。詳細については、[Next.js のマッチャーの構成に関するドキュメント](https://nextjs.org/docs/app/building-your-application/routing/middleware)を参照してください。

### Step 5: Define Dynamic Locale Routes

`RootLayout` からすべてを削除し、以下のコードに置き換えます。

```tsx fileName="src/app/layout.tsx" codeFormat="typescript"
import type { PropsWithChildren, FC } from "react";
import "./globals.css";

const RootLayout: FC<PropsWithChildren> = ({ children }) => children;

export default RootLayout;
```

```jsx fileName="src/app/layout.mjx" codeFormat="esm"
import "./globals.css";

const RootLayout = ({ children }) => children;

export default RootLayout;
```

```jsx fileName="src/app/layout.csx" codeFormat="commonjs"
require("./globals.css");

const RootLayout = ({ children }) => children;

module.exports = {
  default: RootLayout,
  generateStaticParams,
};
```

> `RootLayout` コンポーネントを空のままにしておくと、`<html>` タグに [`lang`](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/lang) と [`dir`](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/dir) 属性を設定することができます。

動的ルーティングを実装するには、`[locale]` ディレクトリに新しいレイアウトを追加してロケールのパスを提供します。

```tsx fileName="src/app/[locale]/layout.tsx" codeFormat="typescript"
import type { Next14LayoutIntlayer } from "next-intlayer";
import { Inter } from "next/font/google";
import { getHTMLTextDir } from "intlayer";

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout: Next14LayoutIntlayer = ({
  children,
  params: { locale },
}) => (
  <html lang={locale} dir={getHTMLTextDir(locale)}>
    <body className={inter.className}>{children}</body>
  </html>
);

export default LocaleLayout;
```

```jsx fileName="src/app/[locale]/layout.mjx" codeFormat="esm"
import { Inter } from "next/font/google";
import { getHTMLTextDir } from "intlayer";

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout = ({ children, params: { locale } }) => (
  <html lang={locale} dir={getHTMLTextDir(locale)}>
    <body className={inter.className}>{children}</body>
  </html>
);

export default LocaleLayout;
```

```jsx fileName="src/app/[locale]/layout.csx" codeFormat="commonjs"
const { Inter } = require("next/font/google");
const { getHTMLTextDir } = require("intlayer");

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout = ({ children, params: { locale } }) => (
  <html lang={locale} dir={getHTMLTextDir(locale)}>
    <body className={inter.className}>{children}</body>
  </html>
);

module.exports = LocaleLayout;
```

> `[locale]` パスセグメントはロケールを定義するために使用されます。例：`/en-US/about` は `en-US` を示し、`/fr/about` は `fr` を示します。

次に、アプリケーションのレイアウトに `generateStaticParams` 関数を実装します。

```tsx {1} fileName="src/app/[locale]/layout.tsx" codeFormat="typescript"
export { generateStaticParams } from "next-intlayer"; // 挿入すべき行

const LocaleLayout: Next14LayoutIntlayer = ({
  children,
  params: { locale },
}) => {
  /*... 残りのコード */
};

export default LocaleLayout;
```

```jsx {1} fileName="src/app/[locale]/layout.mjx" codeFormat="esm"
export { generateStaticParams } from "next-intlayer"; // 挿入すべき行

const LocaleLayout = ({ children, params: { locale } }) => {
  /*... 残りのコード */
};

export default LocaleLayout;
```

```jsx {1,7} fileName="src/app/[locale]/layout.csx" codeFormat="commonjs"
const { generateStaticParams } = require("next-intlayer"); // 挿入すべき行

const LocaleLayout = ({ children, params: { locale } }) => {
  /*... 残りのコード */
};

module.exports = LocaleLayout;
```

> `generateStaticParams` は、すべてのロケールに対する必要なページをアプリケーションが事前にビルドすることを保証し、実行時の計算を減らし、ユーザーエクスペリエンスを向上させます。詳細については、[Next.js の generateStaticParams に関するドキュメント](https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic-rendering#generate-static-params)を参照してください。

### Step 6: Declare Your Content

翻訳を格納するためのコンテンツ宣言を作成し、管理します。

```typescript fileName="src/app/[locale]/page.content.ts" contentDeclarationFormat="typescript"
import { t, type DeclarationContent } from "intlayer";

const pageContent = {
  key: "page",
  content: {
    getStarted: {
      main: t({
        en: "Get started by editing",
        fr: "Commencez par éditer",
        es: "Comience por editar",
        ja: "編集から始める",
      }),
      pageLink: "src/app/page.tsx",
    },
  },
} satisfies Dictionary;

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
        en: "Get started by editing",
        fr: "Commencez par éditer",
        es: "Comience por editar",
        ja: "編集から始める",
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
        en: "Get started by editing",
        fr: "Commencez par éditer",
        es: "Comience por editar",
        ja: "編集から始める",
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
        "es": "Comience por editar",
        "ja": "編集から始める"
      }
    },
    "pageLink": {
      "nodeType": "translation",
      "translation": {
        "en": "src/app/page.tsx",
        "fr": "src/app/page.tsx",
        "es": "src/app/page.tsx",
        "ja": "src/app/page.tsx"
      }
    }
  }
}
```

> コンテンツ宣言は、`contentDir` ディレクトリ（デフォルトでは `./src`）に含まれている限り、アプリケーション内のどこにでも定義できます。また、コンテンツ宣言ファイルの拡張子と一致する必要があります（デフォルトでは `.content.{ts,tsx,js,jsx,mjs,cjs}`）。
> 詳細については、[コンテンツ宣言のドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/ja/dictionary/get_started.md)を参照してください。

### Step 7: Utilize Content in Your Code

アプリケーション内のどこでも、コンテンツ辞書にアクセスします。

```tsx fileName="src/app/[locale]/page.tsx" codeFormat="typescript"
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { type Next14PageIntlayer, IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";

const Page: Next14PageIntlayer = ({ params: { locale } }) => {
  const content = useIntlayer("page", locale);

  return (
    <>
      <p>
        {content.getStarted.main}
        <code>{content.getStarted.pageLink}</code>
      </p>

      <IntlayerServerProvider locale={locale}>
        <IntlayerClientProvider locale={locale}>
          <ServerComponentExample />
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

const Page = ({ params: { locale } }) => {
  const content = useIntlayer("page", locale);

  return (
    <>
      <p>
        {content.getStarted.main}
        <code>{content.getStarted.pageLink}</code>
      </p>

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

const Page = ({ params: { locale } }) => {
  const content = useIntlayer("page", locale);

  return (
    <>
      <p>
        {content.getStarted.main}
        <code>{content.getStarted.pageLink}</code>
      </p>

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

- **`IntlayerClientProvider`** は、クライアントサイドコンポーネントにロケールを提供するために使用されます。これは、レイアウトを含む任意の親コンポーネントに配置できますが、性能を向上させ、一貫したローカリゼーションコンテキストをアプリケーション全体に維持するために、レイアウトに配置することをお勧めします。
- **`IntlayerServerProvider`** は、サーバーの子コンポーネントにロケールを提供するために使用されます。レイアウト内で設定することはできません。

  > レイアウトとページは、共通のサーバーコンテキストを共有できません。なぜなら、サーバーコンテキストシステムはリクエストごとのデータストアに基づいているため、アプリケーションの異なるセグメントでそれぞれの「コンテキスト」が再作成されてしまいます。共有レイアウト内でプロバイダーを配置すると、この分離が崩れ、サーバーコンポーネントへのサーバーコンテキスト値の正しい伝播を防ぐことになります。

```tsx {4,7} fileName="src/components/ClientComponentExample.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

const ClientComponentExample: FC = () => {
  const content = useIntlayer("client-component-example"); // 関連するコンテンツ宣言を作成する

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
  const content = useIntlayer("client-component-example"); // 関連するコンテンツ宣言を作成する

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
  const content = useIntlayer("client-component-example"); // 関連するコンテンツ宣言を作成する

  return (
    <div>
      <h2>{content.title} </h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```tsx {2} fileName="src/components/ServerComponentExample.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "next-intlayer/server";

const ServerComponentExample: FC = () => {
  const content = useIntlayer("server-component-example"); // 関連するコンテンツ宣言を作成する

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
  const content = useIntlayer("server-component-example"); // 関連するコンテンツ宣言を作成する

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
  const content = useIntlayer("server-component-example"); // 関連するコンテンツ宣言を作成する

  return (
    <div>
      <h2>{content.title} </h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> コンテンツを `alt`、`title`、`href`、`aria-label` などの `string` 属性で使用したい場合は、関数の値を呼び出す必要があります。例えば：
>
> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> `useIntlayer` フックの詳細については、[ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/next-intlayer/useIntlayer.md)を参照してください。

### (Optional) Step 8: Internationalization of your metadata

メタデータ、たとえばページのタイトルを国際化したい場合は、Next.js が提供する `generateMetadata` 関数を使用できます。関数内で、`getTranslationContent` 関数を使用してメタデータを翻訳します。

````typescript fileName="src/app/[locale]/layout.tsx or src/app/[locale]/page.tsx" codeFormat="typescript"
import {
  type IConfigLocales,
  getTranslationContent,
  getMultilingualUrls,
} from "intlayer";
import type { Metadata } from "next";
import type { LocalParams } from "next-intlayer";

export const generateMetadata = ({
  params: { locale },
}: LocalParams): Metadata => {
  const t = <T>(content: IConfigLocales<T>) =>
    getTranslationContent(content, locale);

  /**
   * 各ロケールの URL を含むオブジェクトを生成します。
   *
   * 例：
   * ```ts
   *  getMultilingualUrls('/about');
   *
   *  // 返す値
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
      ja: "私のタイトル",
    }),
    description: t({
      en: "My description",
      fr: "Ma description",
      es: "Mi descripción",
      ja: "私の説明",
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

// ... 残りのコード
````

````javascript fileName="src/app/[locale]/layout.msx or src/app/[locale]/page.msx" codeFormat="javascript"
import { getTranslationContent, getMultilingualUrls } from "intlayer";

export const generateMetadata = ({ params: { locale } }) => {
  const t = (content) => getTranslationContent(content, locale);

  /**
   * 各ロケールの URL を含むオブジェクトを生成します。
   *
   * 例：
   * ```ts
   *  getMultilingualUrls('/about');
   *
   *  // 返す値
   *  // {
   *  //   en: '/about',
   *  //   fr: '/fr/about',
   *  //   es: '/es/about',
   *  // }
   * ```
   */
  const multilingualUrls = getMultilingualUrls("/");

  return {
    title: t({
      en: "My title",
      fr: "Mon titre",
      es: "Mi título",
      ja: "私のタイトル",
    }),
    description: t({
      en: "My description",
      fr: "Ma description",
      es: "Mi descripción",
      ja: "私の説明",
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

// ... 残りのコード
````

````javascript fileName="src/app/[locale]/layout.cjs or src/app/[locale]/page.cjs" codeFormat="javascript"
const { getTranslationContent, getMultilingualUrls } = require("intlayer");

module.exports.generateMetadata = ({ params: { locale } }) => {
  const t = (content) => getTranslationContent(content, locale);

  /**
   * 各ロケールの URL を含むオブジェクトを生成します。
   *
   * 例：
   * ```ts
   *  getMultilingualUrls('/about');
   *
   *  // 返す値
   *  // {
   *  //   en: '/about',
   *  //   fr: '/fr/about',
   *  //   es: '/es/about',
   *  // }
   * ```
   */
  const multilingualUrls = getMultilingualUrls("/");

  return {
    title: t({
      en: "My title",
      fr: "Mon titre",
      es: "Mi título",
      ja: "私のタイトル",
    }),
    description: t({
      en: "My description",
      fr: "Ma description",
      es: "Mi descripción",
      ja: "私の説明",
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

// ... 残りのコード
````

> メタデータ最適化に関する詳細は、[公式 Next.js ドキュメント](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)を参照してください。

### (Optional) Step 9: Internationalization of your sitemap.xml and robots.txt

`sitemap.xml` と `robots.txt` を国際化するには、Intlayer によって提供される `getMultilingualUrls` 関数を使用できます。この関数を使用すると、サイトマップ用の多言語 URL を生成することができます。

```tsx fileName="src/app/sitemap.ts"   codeFormat="typescript"
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

> サイトマップ最適化の詳細は、[公式 Next.js ドキュメント](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap)を参照してください。robots.txt の最適化に関する詳細は、[公式 Next.js ドキュメント](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots)を参照してください。

### (Optional) Step 10: Change the language of your content

コンテンツの言語を変更するには、`useLocale` フックが提供する `setLocale` 関数を使用できます。この関数を使用すると、アプリケーションのロケールを設定し、コンテンツを更新できます。

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
"use client";

import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "next-intlayer";
import { type FC } from "react";

const LocaleSwitcher: FC = () => {
  const { locale, pathWithoutLocale, availableLocales, setLocale } =
    useLocale();

  return (
    <ol>
      {availableLocales.map((localeItem) => (
        <li key={localeItem}>
          <a
            href={getLocalizedUrl(pathWithoutLocale, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
          >
            <span>
              {/* 自分のロケールの言語 - 例：Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* 現在のロケールにおける言語 - 例：Francés */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* 英語での言語 - 例：French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
            <span>
              {/* 自分のロケールの言語コード - 例：FR */}
              {localeItem}
            </span>
          </a>
        </li>
      ))}
    </ol>
  );
};
```

```tsx fileName="src/components/LocaleSwitcher.msx" codeFormat="esm"
"use client";

import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "next-intlayer";

const LocaleSwitcher = () => {
  const { locale, pathWithoutLocale, availableLocales, setLocale } =
    useLocale();

  return (
    <ol>
      {availableLocales.map((localeItem) => (
        <li key={localeItem}>
          <a
            href={getLocalizedUrl(pathWithoutLocale, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
          >
            <span>
              {/* 自分のロケールの言語 - 例：Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* 現在のロケールにおける言語 - 例：Francés */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* 英語での言語 - 例：French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
            <span>
              {/* 自分のロケールの言語コード - 例：FR */}
              {localeItem}
            </span>
          </a>
        </li>
      ))}
    </ol>
  );
};
```

```tsx fileName="src/components/LocaleSwitcher.csx" codeFormat="commonjs"
"use client";

const {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} = require("intlayer");
const { useLocale } = require("next-intlayer");

const LocaleSwitcher = () => {
  const { locale, pathWithoutLocale, availableLocales, setLocale } =
    useLocale();

  return (
    <ol>
      {availableLocales.map((localeItem) => (
        <li key={localeItem}>
          <a
            href={getLocalizedUrl(pathWithoutLocale, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
          >
            <span>
              {/* 自分のロケールの言語 - 例：Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* 現在のロケールにおける言語 - 例：Francés */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* 英語での言語 - 例：French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
            <span>
              {/* 自分のロケールの言語コード - 例：FR */}
              {localeItem}
            </span>
          </a>
        </li>
      ))}
    </ol>
  );
};
```

> ドキュメントの参照：
>
> - [`useLocale` フック](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/next-intlayer/useLocale.md)
> - [`getLocaleName` フック](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl` フック](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` フック](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/intlayer/getHTMLTextDir.md)
> - [`hrefLang` 属性](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=ja)
> - [`lang` 属性](https://developer.mozilla.org/ja/docs/Web/HTML/Global_attributes/lang)
> - [`dir` 属性](https://developer.mozilla.org/ja/docs/Web/HTML/Global_attributes/dir)
> - [`aria-current` 属性](https://developer.mozilla.org/ja/docs/Web/Accessibility/ARIA/Attributes/aria-current)

### Configure TypeScript

Intlayer は TypeScript のモジュール拡張を使用して、TypeScript の利点を生かし、コードベースを強化します。

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

TypeScript の設定には、自動生成された型が含まれていることを確認してください。

```json5 fileName="tsconfig.json"
{
  // ... 既存の TypeScript 設定
  "include": [
    // ... 既存の TypeScript 設定
    "types", // 自動生成された型を含む
  ],
}
```

### Git Configuration

Intlayer によって生成されたファイルを無視することをお勧めします。これにより、Git リポジトリにそれらをコミットしないようにできます。

これを行うには、`.gitignore` ファイルに次の指示を追加できます。

```plaintext fileName=".gitignore"
# Intlayer によって生成されたファイルを無視する
.intlayer
```
