# Getting Started internationalizing (i18n) with Intlayer and Next.js 14 with App Router

## What is Intlayer?

**Intlayer** は、モダンなウェブアプリケーションにおける多言語サポートを簡素化するために設計された革新的なオープンソースの国際化（i18n）ライブラリです。Intlayerは、最新の **Next.js 14** フレームワーク、特に強力な **App Router** とシームレスに統合されます。効率的なレンダリングのために **Server Components** と連携するよう最適化されており、[**Turbopack**](https://nextjs.org/docs/architecture/turbopack)（Next.js >= 15 に対応）とも完全に互換性があります。

Intlayer を使用すると、次のことができます：

- **宣言型辞書を使用して翻訳を簡単に管理**できます。
- **メタデータ、ルート、およびコンテンツを動的にローカライズ**できます。
- **クライアントサイドおよびサーバーサイドコンポーネントの両方で翻訳にアクセス**できます。
- **自動生成された型とともに TypeScript のサポートを確保**し、自動補完とエラー検出を改善します。
- **動的ロケール検出と切り替え**などの高度な機能を活用できます。

> 注意: Intlayer は Next.js 12、13、14、および 15 と互換性があります。Next.js Page Router を使用している場合は、この[ガイド](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_with_nextjs_page_router.md)を参照してください。Next.js 15 で turbopack を使用するかしない場合は、この[ガイド](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_with_nextjs_15.md)を参照してください。

---

## Step-by-Step Guide to Set Up Intlayer in a Next.js Application

### Step 1: Install Dependencies

必要なパッケージを npm を使用してインストールします：

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
      // 他のロケール
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

すべての利用可能なパラメータについては、[こちらの設定ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/ja/configuration.md)を参照してください。

### Step 3: Integrate Intlayer in Your Next.js Configuration

Intlayer を使用するために Next.js の設定を構成します：

```typescript
// next.config.mjs
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withIntlayer(nextConfig);
```

### Step 4: Configure Middleware for Locale Detection

ユーザーの好ましいロケールを検出するためのミドルウェアを設定します：

```typescript
// src/middleware.ts
export { intlayerMiddleware as middleware } from "next-intlayer/middleware";

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
```

### Step 5: Define Dynamic Locale Routes

ローカライズされたコンテンツのための動的ルーティングを実装します：

`src/app/page.ts` を `src/app/[locale]/page.ts` に変更します。

次に、アプリケーションのレイアウトに generateStaticParams 関数を実装します。

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

次に、`[locale]` ディレクトリに新しいレイアウトを追加します：

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

[Intlayer の宣言ファイルを宣言する方法を確認してください](https://github.com/aymericzip/intlayer/blob/main/docs/ja/content_declaration/get_started.md)。

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
       *   IntlayerServerProvider はサーバーの子要素にロケールを提供するために使用されます
       *   レイアウトに設定すると機能しません
       */}
      <IntlayerServerProvider locale={locale}>
        <ServerComponentExample />
      </IntlayerServerProvider>
      {/**
       *   IntlayerClientProvider はクライアントの子要素にロケールを提供するために使用されます
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

> 注意: `alt`, `title`, `href`, `aria-label` などの `string` 属性でコンテンツを使用する場合は、その値を関数として呼び出す必要があります。例えば：
>
> ```tsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

クライアントまたはサーバーコンポーネントにおける intlayer の詳細な使用方法については、[こちらの NextJS の例を参照してください](https://github.com/aymericzip/intlayer/blob/main/examples/nextjs-app/src/app/%5Blocale%5D/demo-usage-components/page.tsx)。

### (Optional) Step 8: Internationalization of your metadata

メタデータを国際化したい場合は、NextJS が提供する `generateMetadata` 関数を使用できます。この関数内で `getTranslationContent` 関数を使用してメタデータを翻訳します。

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
   * 各ロケールのすべての URL を含むオブジェクトを生成します。
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
   * 現在のロケールのローカライズされた URL を取得します
   *
   * 例:
   * ```ts
   * const localizedUrl = getLocalizedUrl('/about', locale);
   *
   * 戻り値:
   * '/fr/about' フランス語のロケールの場合
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

> メタデータ最適化の詳細については、[公式 Next.js ドキュメント](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)を参照してください。

### (Optional) Step 9: Internationalization of your sitemap

サイトマップを国際化するには、Intlayer が提供する `getMultilingualUrls` 関数を使用できます。この関数により、サイトマップ用の多言語 URL を生成できます。

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

> サイトマップ最適化の詳細については、[公式 Next.js ドキュメント](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap)を参照してください。

### (Optional) Step 10: Change the language of your content

コンテンツの言語を変更するには、`useLocale` フックが提供する `setLocale` 関数を使用できます。この関数を使用すると、アプリケーションのロケールを設定し、それに応じてコンテンツを更新できます。

```tsx
import { Locales } from "intlayer";
import { useLocale } from "next-intlayer";

const MyComponent = () => {
  const { setLocale } = useLocale();

  return <button onClick={() => setLocale(Locales.English)}>言語を変更</button>;
};
```

### Configure TypeScript

Intlayer はモジュール拡張を使用して TypeScript の利点を得て、コードベースを強化します。

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

TypeScript の設定に自動生成された型が含まれていることを確認してください。

```json5
// tsconfig.json

{
  // あなたのカスタム設定
  include: [
    "src",
    "types", // <- 自動生成された型を含める
  ],
}
```

### Git Configuration

Intlayer によって生成されたファイルを無視することをお勧めします。これにより、それらを Git リポジトリにコミットすることを避けることができます。

これを行うには、`.gitignore` ファイルに次の指示を追加できます：

```gitignore
# Intlayer によって生成されたファイルを無視する
.intlayer
```
