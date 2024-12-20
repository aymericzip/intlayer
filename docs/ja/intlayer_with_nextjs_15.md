# Getting Started internationalizing (i18n) with Intlayer and Next.js 15 App Router

## What is Intlayer?

**Intlayer** は、モダンなウェブアプリケーションにおける多言語サポートを簡素化するために設計された革新的なオープンソースの国際化 (i18n) ライブラリです。Intlayerは、最新の**Next.js 15**フレームワーク、特にその強力な**App Router**とシームレスに統合します。効率的なレンダリングのために**Server Components**と連携するように最適化されており、[**Turbopack**](https://nextjs.org/docs/architecture/turbopack)とも完全に互換性があります。

Intlayerを使用すると、次のことができます：

- **宣言型辞書**を使用して、コンポーネントレベルで翻訳を簡単に管理できます。
- **メタデータ、ルートやコンテンツを動的にローカライズ**できます。
- **クライアントサイドおよびサーバーサイドコンポーネント**で翻訳にアクセスできます。
- **自動生成されたタイプ**でTypeScriptのサポートを確保し、オートコンプリートやエラー検出の改善が可能です。
- **動的ロケール検出や切り替え**などの高度な機能を利用できます。

> 注：IntlayerはNext.js 12、13、14、および15と互換性があります。Next.js Page Router を使用している場合は、この[ガイド](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_with_nextjs_page_router.md)を参照してください。Next.js 12、13、14のApp Routerについては、この[ガイド](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_with_nextjs_14.md)を参照してください。

---

## Step-by-Step Guide to Set Up Intlayer in a Next.js Application

### Step 1: Install Dependencies

必要なパッケージを npm でインストールします：

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

アプリケーションの言語を設定するためのコンフィグファイルを作成します：

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

全ての利用可能なパラメータについては、[こちらの設定ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/ja/configuration.md)を参照してください。

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

ローカライズされたコンテンツのための動的ルーティングを実装します：

`src/app/page.ts`を`src/app/[locale]/page.ts`に変更します。

次に、アプリケーションのLayout内にgenerateStaticParams関数を実装します。

```tsx
// src/app/layout.tsx

import type { ReactNode } from "react";
import "./globals.css";

export { generateStaticParams } from "next-intlayer"; // 追加する行

const RootLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => children;

export default RootLayout;
```

次に、`[locale]`ディレクトリに新しいlayoutを追加します：

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

コンテンツの辞書を作成し管理します：

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

[Intlayerの宣言ファイルの宣言方法についてはこちらを参照してください](https://github.com/aymericzip/intlayer/blob/main/docs/ja/content_declaration/get_started.md)。

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
       *   レイアウトに設定した場合は動作しません
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
  const content = useIntlayer("client-component-example"); // 関連コンテンツ宣言を作成

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
  const content = useIntlayer("server-component-example"); // 関連コンテンツ宣言を作成

  return (
    <div>
      <h2>{content.title} </h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> 注：`alt`、`title`、`href`、`aria-label`などの`string`属性でコンテンツを使用する場合は、関数の値を呼び出す必要があります。例：
>
> ```tsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

クライアントまたはサーバーコンポーネントでのintlayerの詳細な使用については、[こちらのNext.jsの例を参照してください](https://github.com/aymericzip/intlayer/tree/main/examples/nextjs-15-app)。

### (Optional) Step 8: Internationalization of your metadata

ページのタイトルなどメタデータを国際化したい場合は、Next.jsが提供する`generateMetadata`関数を使用できます。関数内で`getTranslationContent`関数を使用してメタデータを翻訳します。

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

  /**
   * 各ロケールに対するすべてのURLを含むオブジェクトを生成します。
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

// ... コードの残り
````

> メタデータ最適化の詳細については、[公式Next.jsドキュメント](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)を参照してください。

### (Optional) Step 9: Internationalization of your sitemap.xml and robots.txt

`sitemap.xml`および`robots.txt`を国際化するには、Intlayerが提供する`getMultilingualUrls`関数を使用できます。この関数を使うことで、sitemapの多言語URLを生成できます。

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

> サイトマップ最適化の詳細については、[公式Next.jsドキュメント](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap)を参照してください。robots.txt最適化の詳細については、[公式Next.jsドキュメント](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots)を参照してください。

### (Optional) Step 10: Change the language of your content

コンテンツの言語を変更するには、`useLocale`フックによって提供される`setLocale`関数を使用できます。この関数を使用すると、アプリケーションのロケールを設定し、コンテンツを更新できます。

```tsx
import { Locales } from "intlayer";
import { useLocale } from "next-intlayer";

const MyComponent = () => {
  const { setLocale } = useLocale();

  return <button onClick={() => setLocale(Locales.English)}>言語を変更</button>;
};
```

### Configure TypeScript

Intlayerは、TypeScriptの利点を享受し、コードベースを強化するためにモジュール拡張を使用します。

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

TypeScriptの設定に自動生成されたタイプを含めることを確認してください。

```json5
// tsconfig.json

{
  // 独自のカスタム設定
  include: [
    "src",
    "types", // <- 自動生成された型を含める
  ],
}
```

### Git Configuration

Intlayerによって生成されたファイルを無視することをお勧めします。これにより、Gitリポジトリにコミットすることを避けることができます。

そのためには、`.gitignore`ファイルに次の指示を追加できます：

```gitignore
# Intlayerによって生成されたファイルを無視
.intlayer
```
