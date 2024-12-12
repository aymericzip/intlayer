# Getting Started internationalizing (i18n) with Intlayer and Next.js 15 App Router

## What is Intlayer?

**Intlayer**は、最新のWebアプリケーションにおける多言語サポートを簡素化することを目的とした、革新的なオープンソースの国際化（i18n）ライブラリです。Intlayerは、強力な**App Router**を含む最新の**Next.js 15**フレームワークとシームレスに統合されており、効率的なレンダリングのために**Server Components**とともに最適化されています。また、[**Turbopack**](https://nextjs.org/docs/architecture/turbopack)に完全に対応しています。

Intlayerを使用すると、以下が可能です：

- **宣言的辞書を使用して翻訳を簡単に管理**できます。
- **メタデータ、ルート、およびコンテンツを動的にローカライズ**できます。
- **クライアント側とサーバー側のコンポーネントの両方で翻訳にアクセス**できます。
- **自動生成された型を用いたTypeScriptサポートを確保**し、オートコンプリートおよびエラー検出を改善します。
- **動的ロケール検出と切り替え**などの高度な機能の恩恵を受けることができます。

> 注意: IntlayerはNext.js 12、13、14、15と互換性があります。Next.js Page Routerを使用している場合は、この[ガイド](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_with_nextjs_page_router.md)を参照してください。Next.js 12、13、14のApp Routerについては、この[ガイド](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_with_nextjs_14.md)を参照してください。

---

## Step-by-Step Guide to Set Up Intlayer in a Next.js Application

### Step 1: Install Dependencies

必要なパッケージをnpmを使用してインストールします：

```bash
npm install intlayer next-intlayer
```

```bash
yarn add intlayer next-intlayer
```

```bash
pnpm add intlayer next-intlayer
```

### Step 2: Configure Your Project

アプリケーションの言語を設定するための設定ファイルを作成します：

```typescript
// intlayer.config.ts

import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // その他のロケール
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

すべての利用可能なパラメータを確認するには、[こちらの設定ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/ja/configuration.md)を参照してください。

### Step 3: Integrate Intlayer in Your Next.js Configuration

Next.jsの設定をIntlayerを使用するように構成します：

```typescript
// next.config.mjs
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withIntlayer(nextConfig);
```

### Step 4: Configure Middleware for Locale Detection

ユーザーの優先ロケールを検出するためのミドルウェアを設定します：

```typescript
// src/middleware.ts
export { intlayerMiddleware as middleware } from "next-intlayer/middleware";

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
```

### Step 5: Define Dynamic Locale Routes

ローカライズされたコンテンツのための動的ルーティングを実装します：

`src/app/page.ts`を`src/app/[locale]/page.ts`に変更します。

その後、アプリケーションのレイアウトに`generateStaticParams`関数を実装します。

```tsx
// src/app/layout.tsx

import type { ReactNode } from "react";
import "./globals.css";

export { generateStaticParams } from "next-intlayer"; // 挿入する行

const RootLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => children;

export default RootLayout;
```

次に、`[locale]`ディレクトリに新しいレイアウトを追加します：

```tsx
// src/app/[locale]/layout.tsx

import { type NextLayoutIntlayer } from "next-intlayer";
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

### Step 6: Declare Your Content

コンテンツ辞書を作成および管理します：

```tsx
// src/app/[locale]/page.content.ts
import { t, type DeclarationContent } from "intlayer";

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
} satisfies DeclarationContent;

export default pageContent;
```

[Intlayerの宣言ファイルの宣言方法については、こちらを参照してください](https://github.com/aymericzip/intlayer/blob/main/docs/ja/content_declaration/get_started.md)。

### Step 7: Utilize Content in Your Code

アプリケーション全体でコンテンツ辞書にアクセスします：

```tsx
// src/app/[locale]/page.ts

import { ClientComponentExample } from "@component/ClientComponentExample";
import { LocaleSwitcher } from "@component/LangSwitcherDropDown";
import { NestedServerComponentExample } from "@component/NestedServerComponentExample";
import { ServerComponentExample } from "@component/ServerComponentExample";
import { type NextPageIntlayer, IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";

const PageContent = () => {
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
      {/**
       *   IntlayerServerProviderはサーバーの子要素にロケールを提供するために使用されます
       *   レイアウトで設定すると機能しません
       */}
      <IntlayerServerProvider locale={locale}>
        <PageContent />
        <ServerComponentExample />
      </IntlayerServerProvider>
      {/**
       *   IntlayerClientProviderはクライアントの子要素にロケールを提供するために使用されます
       *   レイアウトを含む任意の親コンポーネントで設定できます
       */}
      <IntlayerClientProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerClientProvider>
    </>
  );
};

export default Page;
```

```tsx
// src/components/ClientComponentExample.tsx

"use client";

import { useIntlayer } from "next-intlayer";

export const ClientComponentExample = () => {
  const content = useIntlayer("client-component-example"); // 関連するコンテンツ宣言を作成

  return (
    <div>
      <h2>{content.title} </h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```tsx
// src/components/ServerComponentExample.tsx

import { useIntlayer } from "next-intlayer/server";

export const ServerComponentExample = () => {
  const content = useIntlayer("server-component-example"); // 関連するコンテンツ宣言を作成

  return (
    <div>
      <h2>{content.title} </h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> 注意: `alt`、`title`、`href`、`aria-label`などの`string`属性でコンテンツを使用する場合は、関数の値を呼び出す必要があります。次のように：
>
> ```tsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

クライアント、またはサーバーコンポーネントへのintlayerの詳細な使用法については、[ここにあるnextJSの例](https://github.com/aymericzip/intlayer/blob/main/examples/nextjs-app/src/app/%5Blocale%5D/demo-usage-components/page.tsx)をご覧ください。

### (Optional) Step 8: Internationalization of your metadata

メタデータ、たとえばページのタイトルを国際化したい場合は、NextJSによって提供される`generateMetadata`関数を使用できます。関数内で、メタデータを翻訳するために`getTranslationContent`関数を使用します。

````typescript
// src/app/[locale]/layout.tsx または src/app/[locale]/page.tsx

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

  const url = `/`;

  /**
   * 各ロケール用のすべてのURLを含むオブジェクトを生成します。
   *
   * 例:
   * ```ts
   *  getLocalizedUrl('/about');
   *
   *  // 戻り値
   *  // {
   *  //   en: '/about',
   *  //   fr: '/fr/about',
   *  //   es: '/es/about',
   *  // }
   * ```
   */
  const multilingualUrls = getMultilingualUrls(url);

  /**
   * 現在のロケールのためにローカライズされたURLを取得します
   *
   * 例:
   * ```ts
   * const localizedUrl = getLocalizedUrl('/about', locale);
   *
   * 戻り値:
   * '/fr/about'はフランスのロケール用
   * ```
   */
  const localizedUrl = getLocalizedUrl(url, locale);

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
      canonical: url,
      languages: multilingualUrls,
    },
    openGraph: {
      url: localizedUrl,
    },
  };
};

// ... 残りのコード
````

> メタデータの最適化については、[公式のNext.jsドキュメント](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)で詳しく学びます。

### (Optional) Step 9: Internationalization of your sitemap

サイトマップを国際化するには、Intlayerによって提供される`getMultilingualUrls`関数を使用できます。この関数を使用すると、サイトマップのための多言語URLを生成できます。

```tsx
// src/app/sitemap.ts

import { getMultilingualUrls } from "intlayer";
import type { MetadataRoute } from "next";

const url = `https://example.com`;

const sitemap = (): MetadataRoute.Sitemap => [
  {
    url,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 1,
    alternates: {
      languages: getMultilingualUrls(url),
    },
  },
];

export default sitemap;
```

> サイトマップの最適化については、[公式のNext.jsドキュメント](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap)で詳しく学びます。

### (Optional) Step 10: Change the language of your content

コンテンツの言語を変更するには、`useLocale`フックによって提供される`setLocale`関数を使用できます。この関数を使用すると、アプリケーションのロケールを設定し、それに応じてコンテンツを更新できます。

```tsx
import { Locales } from "intlayer";
import { useLocale } from "next-intlayer";

const MyComponent = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.English)}>言語を変更する</button>
  );
};
```

### Configure TypeScript

Intlayerはモジュール拡張を使用してTypeScriptの利点を得て、コードベースをより強固にします。

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

TypeScript設定に自動生成された型を含めることを確認してください。

```json5
// tsconfig.json

{
  // カスタム設定
  include: [
    "src",
    "types", // <- 自動生成された型を含める
  ],
}
```

### Git Configuration

Intlayerによって生成されたファイルを無視することをお勧めします。これにより、Gitリポジトリにそれらをコミットすることを避けることができます。

これを行うには、`.gitignore`ファイルに次の指示を追加します：

```gitignore
# Intlayerによって生成されたファイルを無視する
.intlayer
```
