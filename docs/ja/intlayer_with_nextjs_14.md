# Getting Started internationalizing (i18n) with Intlayer and Next.js 14 with App Router

## What is Intlayer?

**Intlayer**は、現代のWebアプリケーションにおける多言語サポートを簡素化するために設計された革新的なオープンソースの国際化（i18n）ライブラリです。Intlayerは、最新の**Next.js 14**フレームワーク、特にその強力な**App Router**とシームレスに統合されます。効率的なレンダリングのために**Server Components**と共に動作するように最適化されており、[**Turbopack**](https://nextjs.org/docs/architecture/turbopack)（Next.js >= 15に対応）とも完全に互換性があります。

Intlayerを使用すると、以下が可能です：

- **宣言型辞書を使用して翻訳を簡単に管理**できます。
- **メタデータ、ルート、およびコンテンツを動的にローカライズ**できます。
- **クライアントサイドおよびサーバーサイドコンポーネントの両方で翻訳にアクセス**できます。
- **自動生成された型でTypeScriptサポートを確保**し、オートコンプリートとエラー検出を改善します。
- **動的ロケール検出や切り替え**などの高度な機能を利用できます。

> 注：IntlayerはNext.js 12、13、14、および15と互換性があります。Next.js Page Routerを使用している場合は、こちらの[ガイド](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_with_nextjs_page_router.md)を参照してください。Next.js 15を使用している場合、Turbopackの有無にかかわらず、こちらの[ガイド](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_with_nextjs_15.md)を参照してください。

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
      // 他のロケールを追加
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

利用可能なすべてのパラメータについては、[こちらの設定ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/ja/configuration.md)を参照してください。

### Step 3: Integrate Intlayer in Your Next.js Configuration

Intlayerを使用するためにNext.jsの設定を構成します：

```typescript
// next.config.mjs
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withIntlayer(nextConfig);
```

### Step 4: Configure Middleware for Locale Detection

ユーザーの好みのロケールを検出するためのミドルウェアを設定します：

```typescript
// src/middleware.ts
export { intlayerMiddleware as middleware } from "next-intlayer/middleware";

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
```

### Step 5: Define Dynamic Locale Routes

ローカライズされたコンテンツの動的ルーティングを実装します：

`src/app/page.ts`を`src/app/[locale]/page.ts`に変更します。

その後、アプリケーションのレイアウトで`generateStaticParams`関数を実装します。

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

import { type Next14LayoutIntlayer } from "next-intlayer";
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

[Intlayerの宣言ファイルを宣言する方法については、こちらを参照してください](https://github.com/aymericzip/intlayer/blob/main/docs/ja/content_declaration/get_started.md)。

### Step 7: Utilize Content in Your Code

アプリケーション全体でコンテンツ辞書にアクセスします：

```tsx
// src/app/[locale]/page.ts

import { ClientComponentExample } from "@component/ClientComponentExample";
import { LocaleSwitcher } from "@component/LangSwitcherDropDown";
import { NestedServerComponentExample } from "@component/NestedServerComponentExample";
import { ServerComponentExample } from "@component/ServerComponentExample";
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
      {/**
       *   IntlayerServerProviderはサーバー子要素にロケールを提供するために使用されます
       *   レイアウトに設定すると機能しません
       */}
      <IntlayerServerProvider locale={locale}>
        <ServerComponentExample />
      </IntlayerServerProvider>
      {/**
       *   IntlayerClientProviderはクライアント子要素にロケールを提供するために使用されます
       *   レイアウトを含む任意の親コンポーネントに設定できます
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
  const content = useIntlayer("client-component-example"); // 関連するコンテンツ宣言を作成する

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
  const content = useIntlayer("server-component-example"); // 関連するコンテンツ宣言を作成する

  return (
    <div>
      <h2>{content.title} </h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> 注：`alt`、`title`、`href`、`aria-label`などの`string`属性でコンテンツを使用する場合、関数の値を呼び出す必要があります：
>
> ```tsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

クライアントまたはサーバーコンポーネントにおけるIntlayerのより詳細な使用法については、[Next.jsの例はこちら](https://github.com/aymericzip/intlayer/blob/main/examples/nextjs-app/src/app/%5Blocale%5D/demo-usage-components/page.tsx)を参照してください。

### (Optional) Step 8: Internationalization of your metadata

メタデータ（ページのタイトルなど）を国際化したい場合、Next.jsの提供する`generateMetadata`関数を使用できます。関数内で、`getTranslationContent`関数を使用してメタデータを翻訳します。

````typescript
// src/app/[locale]/layout.tsxまたはsrc/app/[locale]/page.tsx

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
   * すべてのロケールのURLを含むオブジェクトを生成します。
   *
   * 例：
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
      languages: { ...multilingualUrls, "x-default": "/" },
    },
    openGraph: {
      url: multilingualUrls[locale],
    },
  };
};

// ... 残りのコード
````

> メタデータの最適化についての詳細は、[公式のNext.jsドキュメントで学んでください](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)。

### (Optional) Step 9: Internationalization of your sitemap.xml and robots.txt

`sitemap.xml`および`robots.txt`を国際化するには、Intlayerが提供する`getMultilingualUrls`関数を使用できます。この関数を使用すると、サイトマップ用に多言語URLを生成できます。

```tsx
// src/app/sitemap.ts

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

```tsx
// src/app/robots.ts
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

> サイトマップの最適化についての詳細は、[公式のNext.jsドキュメントで学んでください](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap)。robots.txtの最適化についても、[公式のNext.jsドキュメントで学んでください](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots)。

### (Optional) Step 10: Change the language of your content

コンテンツの言語を変更するには、`useLocale`フックで提供される`setLocale`関数を使用します。この関数を使うと、アプリケーションのロケールを設定し、それに応じてコンテンツを更新できます。

```tsx
import { Locales } from "intlayer";
import { useLocale } from "next-intlayer";

const MyComponent = () => {
  const { setLocale } = useLocale();

  return <button onClick={() => setLocale(Locales.English)}>言語を変更</button>;
};
```

### Configure TypeScript

Intlayerは、TypeScriptの利点を得るためにモジュール拡張を使用し、コードベースを強化します。

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

TypeScript設定に自動生成された型を含めていることを確認してください。

```json5
// tsconfig.json

{
  // カスタム設定
  include: [
    "src",
    "types", // <- 自動生成された型を含む
  ],
}
```

### Git Configuration

Intlayerによって生成されたファイルを無視することを推奨します。これにより、それらをGitリポジトリにコミットしないようにできます。

これを行うには、`.gitignore`ファイルに以下の指示を追加できます：

```gitignore
# Intlayerによって生成されたファイルを無視
.intlayer
```
