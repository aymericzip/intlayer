---
createdAt: 2026-01-10
updatedAt: 2026-01-10
title: Next.js 16 アプリを翻訳する方法（ページパスに [locale] を含めない） – i18n ガイド 2026
description: ページパスに [locale] を含めずに Next.js 16 ウェブサイトを多言語対応にする方法を紹介します。ドキュメントに従って国際化（i18n）と翻訳を行ってください。
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
  - no-locale-path
applicationTemplate: https://github.com/aymericzip/intlayer-next-no-lolale-path-template
youtubeVideo: https://www.youtube.com/watch?v=e_PPG7PTqGU
history:
  - version: 1.0.0
    date: 2026-01-10
    changes: 初回リリース
---

# Next.js 16 ウェブサイトを翻訳する（ページパスに [locale] を含めない） — Intlayer を使った国際化 (i18n)

<Tab defaultTab="video">
  <TabItem label="動画" value="video">
  
<iframe title="Next.js に最適な i18n ソリューション？Intlayer をご紹介" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/e_PPG7PTqGU?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

  </TabItem>
  <TabItem label="コード" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-next-16-no-locale-path-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="デモ CodeSandbox - Intlayer を使ってアプリケーションを国際化する方法"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </TabItem>
</Tab>

GitHub の [アプリケーションテンプレート](https://github.com/aymericzip/intlayer-next-no-lolale-path-template) を参照してください。

## 目次

<TOC/>

## Intlayer とは？

**Intlayer** は、現代のウェブアプリケーションにおける多言語対応を簡素化するために設計された、革新的なオープンソースの国際化（i18n）ライブラリです。Intlayer は、強力な **App Router** を含む最新の **Next.js 16** フレームワークとシームレスに統合されます。効率的なレンダリングのために **Server Components** を活用するよう最適化されており、[**Turbopack**](https://nextjs.org/docs/architecture/turbopack) と完全に互換性があります。

Intlayer を使うと、以下が可能になります：

- **コンポーネントレベルで宣言的な辞書を使い、翻訳を簡単に管理**できます。
- **メタデータ、ルート、コンテンツを動的にローカライズ**できます。
- **クライアント側およびサーバー側のコンポーネントの両方で翻訳にアクセス**できます。
- **自動生成された型による TypeScript サポートを確保し、オートコンプリートとエラー検出を向上**させます。
- **高度な機能を活用できます**（動的なロケール検出や切り替えなど）。

> Intlayer は Next.js 12、13、14、16 と互換性があります。Next.js の Page Router を使用している場合はこの [ガイド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_nextjs_page_router.md) を参照してください。App Router を使用している Next.js 12、13、14 に関しては、この [ガイド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_nextjs_14.md) を参照してください。

---

## Next.js アプリケーションで Intlayer をセットアップする手順

### ステップ 1: 依存関係をインストール

npm を使用して必要なパッケージをインストールします：

```bash packageManager="npm"
npm install intlayer next-intlayer
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer next-intlayer
bunx intlayer init
```

- **intlayer**

  国際化（internationalization）向けのコアパッケージで、設定管理、翻訳、[コンテンツ宣言](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/content_file.md)、transpilation、そして[CLIコマンド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/index.md）用のツールを提供します。

- **next-intlayer**

IntlayerをNext.jsと統合するパッケージです。Next.js向けの国際化のためのコンテキストプロバイダーとフックを提供します。さらに、[Webpack](https://webpack.js.org/)や[Turbopack](https://nextjs.org/docs/app/api-reference/turbopack)とIntlayerを統合するためのNext.jsプラグイン、およびユーザーの優先ロケールの検出、クッキー管理、URLリダイレクト処理のためのプロキシも含まれます。

### ステップ 2: プロジェクトを設定する

以下が作成する最終的な構成です:

```bash
.
├── src
│   ├── app
│   │   ├── layout.tsx
│   │   ├── page.content.ts
│   │   └── page.tsx
│   ├── components
│   │   ├── clientComponentExample
│   │   │   ├── client-component-example.content.ts
│   │   │   └── ClientComponentExample.tsx
│   │   ├── localeSwitcher
│   │   │   ├── localeSwitcher.content.ts
│   │   │   └── LocaleSwitcher.tsx
│   │   └── serverComponentExample
│   │       ├── server-component-example.content.ts
│   │       └── ServerComponentExample.tsx
│   └── proxy.ts
├── intlayer.config.ts
├── next.config.ts
├── package.json
└── tsconfig.json
```

> ロケールルーティングを使用したくない場合、intlayerは単純なプロバイダー／フックとして使用できます。詳細は[このガイド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_nextjs_no_locale_path.md)を参照してください。

アプリケーションの言語を設定するための設定ファイルを作成します:

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
  routing: {
    mode: "search-params", // または `no-prefix` - ミドルウェア検出に便利
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
  routing: {
    mode: "search-params", // または `no-prefix` - ミドルウェア検出に便利
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
  routing: {
    mode: "search-params", // または `no-prefix` - ミドルウェア検出に便利
  },
};

module.exports = config;
```

> この設定ファイルを使って、ローカライズされた URL、プロキシリダイレクト、クッキー名、コンテンツ宣言の場所と拡張子、コンソール上の Intlayer ログの無効化などを設定できます。利用可能なパラメータの完全な一覧は、[設定ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md) を参照してください。

### ステップ 3: Next.js の設定に Intlayer を統合する

Intlayer を使用するよう Next.js の設定を構成します:

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
  /* 設定オプションをここに */
};

export default withIntlayer(nextConfig);
```

```typescript fileName="next.config.cjs" codeFormat="commonjs"
const { withIntlayer } = require("next-intlayer/server");

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* 設定オプションをここに */
};

module.exports = withIntlayer(nextConfig);
```

> `withIntlayer()` の Next.js プラグインは Intlayer を Next.js に統合するために使用されます。コンテンツ宣言ファイルの生成を行い、開発モードでそれらを監視します。[Webpack](https://webpack.js.org/) または [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack) 環境内で Intlayer の環境変数を定義します。さらに、パフォーマンス最適化のためのエイリアスを提供し、サーバーコンポーネントとの互換性を確保します。

> `withIntlayer()` 関数は Promise 関数です。ビルド開始前に Intlayer の辞書を準備することを可能にします。他のプラグインと一緒に使用する場合は、await できます。例:
>
> ```ts
> const nextConfig = await withIntlayer(nextConfig);
> const nextConfigWithOtherPlugins = withOtherPlugins(nextConfig);
>
> export default nextConfigWithOtherPlugins;
> ```
>
> 同期的に使用したい場合は、`withIntlayerSync()` 関数を使用できます。例:
>
> ```ts
> const nextConfig = withIntlayerSync(nextConfig);
> const nextConfigWithOtherPlugins = withOtherPlugins(nextConfig);
>
> export default nextConfigWithOtherPlugins;
> ```
>
> Intlayer は、コマンドラインフラグ（`--webpack`、`--turbo`、または `--turbopack`）や現在の **Next.js のバージョン**に基づいて、プロジェクトが **webpack** または **Turbopack** のどちらを使用しているかを自動的に検出します。
>
> `next>=16` 以降、**Rspack** を使用している場合は、Turbopack を無効化して Intlayer に webpack 設定を明示的に使用させる必要があります:
>
> ```ts
> withRspack(withIntlayer(nextConfig, { enableTurbopack: false }));
> ```

### ステップ 4: 動的ロケールルートを定義する

`RootLayout` の中身をすべて削除し、次のコードに置き換えてください:

```tsx {3} fileName="src/app/layout.tsx" codeFormat="typescript"
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { IntlayerClientProvider, LocalPromiseParams } from "next-intlayer";
import { getHTMLTextDir, getIntlayer } from "intlayer";
import { getLocale } from "next-intlayer/server";
export { generateStaticParams } from "next-intlayer";

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;
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
      <IntlayerClientProvider defaultLocale={locale}>
        <body>{children}</body>
      </IntlayerClientProvider>
    </html>
  );
};

export default RootLayout;
```

```jsx {3} fileName="src/app/layout.mjx" codeFormat="esm"
import "./globals.css";
import { IntlayerClientProvider } from "next-intlayer";
import { getHTMLTextDir, getIntlayer } from "intlayer";
import { getLocale } from "next-intlayer/server";
import { headers, cookies } from "next/headers";
export { generateStaticParams } from "next/intlayer";

export const generateMetadata = async ({ params }) => {
  const { locale } = await params;
  const { title, description, keywords } = getIntlayer("metadata", locale);

  return {
    title,
    description,
    keywords,
  };
};

const RootLayout = async ({ children }) => {
  // Next.js 15+ では headers と cookies を await する
  const headerList = await headers();
  const cookieList = await cookies();

  const locale = await getLocale({
    // まず intlayer のクッキーを確認（デフォルト: 'INTLAYER_LOCALE'）
    getCookie: (name) => cookieList.get(name)?.value,

    // 次に intlayer のヘッダーを確認（デフォルト: 'x-intlayer-locale'）
    // 最後に accept-language ヘッダー ('accept-language') を確認します
    getHeader: (name) => headerList.get(name),
  });

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <IntlayerClientProvider defaultLocale={locale}>
        <body>{children}</body>
      </IntlayerClientProvider>
    </html>
  );
};

export default RootLayout;
```

````jsx {1,8} fileName="src/app/layout.csx" codeFormat="commonjs"
require("./globals.css");
const { IntlayerClientProvider } = require("next-intlayer");
const { getHTMLTextDir, getIntlayer } = require("intlayer");
const { getLocale } = require("next-intlayer/server");
const { headers, cookies } = require("next/headers");
const { generateStaticParams } = require("next-intlayer");

const generateMetadata = async ({ params }) => {
  const { locale } = await params;
  const { title, description, keywords } = getIntlayer("metadata", locale);

  return {
    title,
    description,
    keywords,
  };
};

const RootLayout = async ({ children }) => {
  // Next.js 15+ではheadersとcookiesをawaitします
  const headerList = await headers();
  const cookieList = await cookies();

  const locale = await getLocale({
    // まずintlayerのクッキー（デフォルト: 'INTLAYER_LOCALE'）を確認します
    getCookie: (name) => cookieList.get(name)?.value,

    // 次にintlayerヘッダー（デフォルト: 'x-intlayer-locale'）を確認します
    // 最後にaccept-languageヘッダー（'accept-language'）を確認します
    getHeader: (name) => headerList.get(name),
  });

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <IntlayerClientProvider defaultLocale={locale}>
        <body>{children}</body>
      </IntlayerClientProvider>
    </html>
  );
};

module.exports = {
  default: RootLayout,
  generateStaticParams,
  generateMetadata,
};

### ステップ 5: コンテンツを宣言する

翻訳を保存するためのコンテンツ宣言を作成・管理します:

```tsx fileName="src/app/metadata.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";
import { Metadata } from "next";

const metadataContent = {
  key: "metadata",
  content: {
    title: t({
      ja: "私のプロジェクトのタイトル",
      en: "My Project Title",
      fr: "Le Titre de mon Projet",
      es: "El Título de mi Proyecto",
    }),

    description: t({
      ja: "ワークフローを簡素化し生産性を高めるよう設計された革新的なプラットフォームをご覧ください。",
      en: "Discover our innovative platform designed to streamline your workflow and boost productivity.",
      ja: "ワークフローを効率化し、生産性を向上させるよう設計された革新的なプラットフォームをご紹介します。",
      fr: "Découvrez notre plateforme innovante conçue pour simplifier votre flux de travail et booster votre productivité.",
      es: "Descubra nuestra plataforma innovadora diseñada para simplificar su flujo de trabajo y aumentar su productividad。",
    }),

    keywords: t({
      ja: ["イノベーション", "生産性", "ワークフロー", "SaaS"],
      en: ["innovation", "productivity", "workflow", "SaaS"],
      fr: ["innovation", "productivité", "flux de travail", "SaaS"],
      es: ["innovación", "productividad", "flujo de trabajo", "SaaS"],
    }),
  },
} as Dictionary<Metadata>;

export default metadataContent;
````

```tsx fileName="src/app/metadata.content.mjs" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

/** @type {import('intlayer').Dictionary<import('next').Metadata>} */
const metadataContent = {
  key: "metadata",
  content: {
    title: t({
      ja: "ワークフローを合理化する私のプロジェクトのタイトル",
      en: "My Project Title",
      fr: "Le Titre de mon Projet",
      es: "El Título de mi Proyecto",
    }),

    description: t({
      ja: "ワークフローを効率化し、生産性を向上させるために設計された革新的なプラットフォームをご紹介します。",
      en: "Discover our innovative platform designed to streamline your workflow and boost productivity.",
      fr: "Découvrez notre plateforme innovante conçue pour simplifier votre flux de travail et booster votre productivité.",
      es: "Descubra nuestra plataforma innovadora diseñada para simplificar su flujo de trabajo y aumentar su productividad.",
    }),

    keywords: t({
      ja: ["イノベーション", "生産性", "ワークフロー", "SaaS"],
      en: ["innovation", "productivity", "workflow", "SaaS"],
      fr: ["innovation", "productivité", "flux de travail", "SaaS"],
      es: ["innovación", "productividad", "flujo de trabajo", "SaaS"],
    }),
  },
};

export default metadataContent;
```

```javascript fileName="src/app/metadata.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary<import('next').Metadata>} */
const metadataContent = {
  key: "metadata",
  content: {
    title: t({
      ja: "私のプロジェクトのタイトル",
      en: "My Project Title",
      fr: "Le Titre de mon Projet",
      es: "El Título de mi Proyecto",
    }),

    description: t({
      ja: "ワークフローを合理化し、生産性を向上させるために設計された革新的なプラットフォームをぜひご確認ください。",
      en: "Discover our innovative platform designed to streamline your workflow and boost productivity.",
      fr: "Découvrez notre plateforme innovante conçue pour simplifier votre flux de travail et booster votre productivité.",
      es: "Descubra nuestra plataforma innovadora diseñada para simplificar su flujo de trabajo y aumentar su productividad.",
    }),

    keywords: t({
      ja: ["イノベーション", "生産性", "ワークフロー", "SaaS"],
      en: ["innovation", "productivity", "workflow", "SaaS"],
      fr: ["innovation", "productivité", "flux de travail", "SaaS"],
      es: ["innovación", "productividad", "flujo de trabajo", "SaaS"],
    }),
  },
};

module.exports = metadataContent;
```

```json fileName="src/app/metadata.content.json" contentDeclarationFormat="json"
{
  "key": "metadata",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
        "ja": "私のプロジェクトのタイトル",
        "en": "My Project Title",
        "fr": "Le Titre de mon Projet",
        "es": "El Título de mi Proyecto"
      }
    },
    "description": {
      "nodeType": "translation",
      "translation": {
        "ja": "ワークフローを合理化し、生産性を向上させるよう設計された革新的なプラットフォームです。",
        "en": "Discover our innovative platform designed to streamline your workflow and boost productivity.",
        "ja": "ワークフローを簡素化し、生産性を向上させるために設計された革新的なプラットフォームをご覧ください。",
        "fr": "Découvrez notre plateforme innovante conçue pour simplifier votre flux de travail et booster votre productivité.",
        "es": "Descubra nuestra plataforma innovadora diseñada para simplificar su flujo de trabajo y aumentar su productividad."
      }
    },
    "keywords": {
      "nodeType": "translation",
      "translation": {
        "ja": ["イノベーション", "生産性", "ワークフロー", "SaaS"],
        "en": ["innovation", "productivity", "workflow", "SaaS"],
        "fr": ["innovation", "productivité", "flux de travail", "SaaS"],
        "es": ["innovación", "productividad", "flujo de trabajo", "SaaS"]
      }
    }
  }
}
```

```tsx fileName="src/app/page.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const pageContent = {
  key: "page",
  content: {
    getStarted: {
      main: t({
        ja: "編集して始めましょう",
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

```javascript fileName="src/app/page.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const pageContent = {
  key: "page",
  content: {
    getStarted: {
      main: t({
        ja: "編集して始めましょう",
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

```javascript fileName="src/app/page.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const pageContent = {
  key: "page",
  content: {
    getStarted: {
      main: t({
        ja: "編集して始めましょう",
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

```json fileName="src/app/page.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "page",
  "content": {
    "getStarted": {
      "nodeType": "translation",
      "translation": {
        "ja": "編集して始めましょう",
        "en": "Get started by editing",
        "fr": "Commencez par éditer",
        "es": "Comience por editar"
      }
    },
    "pageLink": "src/app/page.tsx"
  }
}
```

> コンテンツの宣言は、アプリケーション内の任意の場所に定義できます。ただし、それらが `contentDir` ディレクトリ（デフォルトは `./src`）に含まれており、コンテンツ宣言ファイルの拡張子が一致している必要があります（デフォルト: `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`）。

> 詳細は、[コンテンツ宣言のドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/content_file.md) を参照してください。

### ステップ6: コード内でコンテンツを利用する

アプリケーション全体からコンテンツ辞書にアクセスします:

```tsx fileName="src/app/page.tsx" codeFormat="typescript"
import type { FC } from "react";
import { ClientComponentExample } from "@components/clientComponentExample/ClientComponentExample";
import { ServerComponentExample } from "@components/serverComponentExample/ServerComponentExample";
import {
  IntlayerServerProvider,
  useIntlayer,
  getLocale,
} from "next-intlayer/server";
import { NextPage } from "next";
import { headers, cookies } from "next/headers";

const PageContent: FC = () => {
  const content = useIntlayer("page");

  return (
    <>
      <p>{content.getStarted.main}</p>
      <code>{content.getStarted.pageLink}</code>
    </>
  );
};

const Page: NextPage = async () => {
  // Next.js 15+ では headers と cookies を await してください
  const headerList = await headers();
  const cookieList = await cookies();

  const locale = await getLocale({
    // まず intlayer のクッキーを確認します（デフォルト: 'INTLAYER_LOCALE'）
    getCookie: (name) => cookieList.get(name)?.value,

    // 次に intlayer ヘッダーを確認します（デフォルト: 'x-intlayer-locale'）
    // 最後に accept-language ヘッダーを確認します（'accept-language'）
    getHeader: (name) => headerList.get(name),
  });

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

```jsx fileName="src/app/page.mjx" codeFormat="esm"
import { ClientComponentExample } from "@components/clientComponentExample/ClientComponentExample";
import { ServerComponentExample } from "@components/serverComponentExample/ServerComponentExample";
import { IntlayerServerProvider, useIntlayer, getLocale } from "next-intlayer/server";
import { headers, cookies } from "next/headers";
import { NextPage } from "next";

const Page: NextPage = async () => {
  const content = useIntlayer("page");

  return (
    <>
      <p>{content.getStarted.main}</p>
      <code>{content.getStarted.pageLink}</code>
    </>
  );
};

const Page = async () => {

  // Next.js 15+ では headers と cookies を await します
  const headerList = await headers();
  const cookieList = await cookies();

  const locale = await getLocale({
    // まず intlayer のクッキーを確認します（デフォルト: 'INTLAYER_LOCALE'）
    getCookie: (name) => cookieList.get(name)?.value,

    // 次に intlayer のヘッダーを確認します（デフォルト: 'x-intlayer-locale'）
    // 最後に accept-language ヘッダーを確認します（'accept-language'）
    getHeader: (name) => headerList.get(name),
  });

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

````jsx fileName="src/app/page.csx" codeFormat="commonjs"
import { ClientComponentExample } from "@components/clientComponentExample/ClientComponentExample";
import { ServerComponentExample } from "@components/serverComponentExample/ServerComponentExample";
import { IntlayerServerProvider, useIntlayer, getLocale } from "next-intlayer/server";
import { NextPage } from "next";
import { headers, cookies } from "next/headers";

const Page: NextPage = async () => {
  const content = useIntlayer("page");

  return (
    <>
      <p>{content.getStarted.main}</p>
      <code>{content.getStarted.pageLink}</code>
    </>
  );
};

const Page: NextPage = async () => {
  // Next.js 15+ では headers と cookies を await する必要があります
  const headerList = await headers();
  const cookieList = await cookies();

  const locale = await getLocale({
    // まず intlayer の cookie をチェックします（デフォルト: 'INTLAYER_LOCALE'）
    getCookie: (name) => cookieList.get(name)?.value,

    // 次に intlayer のヘッダーをチェックします（デフォルト: 'x-intlayer-locale'）
    // 最後に accept-language ヘッダー（'accept-language'）をチェックします
    getHeader: (name) => headerList.get(name),
  });

  return (
    <IntlayerServerProvider locale={locale}>
      <PageContent />
      <ServerComponentExample />
      <ClientComponentExample />
    </IntlayerServerProvider>
  );
};

- **`IntlayerClientProvider`** はクライアント側コンポーネントにロケールを提供するために使用されます。レイアウトを含む任意の親コンポーネントに配置できます。ただし、Next.js がページ間でレイアウトコードを共有するため、レイアウトに配置することが推奨されます。レイアウトで `IntlayerClientProvider` を使用することで、各ページごとに再初期化されることを避け、パフォーマンスを向上させ、アプリケーション全体で一貫したローカリゼーションコンテキストを維持できます。
- **`IntlayerServerProvider`** はサーバー側の子にロケールを提供するために使用されます。レイアウトに設定することはできません。

  > Layout と page は共通の server context を共有できません。server context システムはリクエスト単位のデータストア（[React の cache](https://react.dev/reference/react/cache) 機構）に基づいており、アプリケーションの異なるセグメントごとに各 "context" が再作成されます。provider を共有 layout に配置するとこの分離が壊れ、server component に対する server context 値の正しい伝播が妨げられます。

```tsx {4,7} fileName="src/components/clientComponentExample/ClientComponentExample.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ClientComponentExample: FC = () => {
  const content = useIntlayer("client-component-example"); // 関連コンテンツの宣言を作成します

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};

```jsx {3,6} fileName="src/components/clientComponentExample/ClientComponentExample.mjx" codeFormat="esm"
"use client";

import { useIntlayer } from "next-intlayer";

const ClientComponentExample = () => {
  const content = useIntlayer("client-component-example"); // 関連コンテンツの宣言を作成

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
````

```jsx {3,6} fileName="src/components/clientComponentExample/ClientComponentExample.csx" codeFormat="commonjs"
"use client";

const { useIntlayer } = require("next-intlayer");

const ClientComponentExample = () => {
  const content = useIntlayer("client-component-example"); // 関連コンテンツの宣言を作成

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```tsx {2} fileName="src/components/serverComponentExample/ServerComponentExample.tsx"  codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "next-intlayer/server";

export const ServerComponentExample: FC = () => {
  const content = useIntlayer("server-component-example"); // 関連コンテンツの宣言を作成

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx {1} fileName="src/components/serverComponentExample/ServerComponentExample.mjx" codeFormat="esm"
import { useIntlayer } from "next-intlayer/server";

const ServerComponentExample = () => {
  const content = useIntlayer("server-component-example"); // 関連コンテンツの宣言を作成

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx {1} fileName="src/components/serverComponentExample/ServerComponentExample.csx" codeFormat="commonjs"
const { useIntlayer } = require("next-intlayer/server");

const ServerComponentExample = () => {
  const content = useIntlayer("server-component-example"); // 関連コンテンツの宣言を作成

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> `alt`、`title`、`href`、`aria-label` などの `string` 属性でコンテンツを使用する場合は、関数の値を呼び出す必要があります。例えば:

> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> `useIntlayer` フックの詳細は[ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/next-intlayer/useIntlayer.md)を参照してください。

### （オプション）ステップ7: ロケール検出のためにプロキシを設定

ユーザーの優先ロケールを検出するようにプロキシを設定します:

```typescript fileName="src/proxy.ts" codeFormat="typescript"
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

```javascript fileName="src/proxy.mjs" codeFormat="esm"
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

```javascript fileName="src/proxy.cjs" codeFormat="commonjs"
const { intlayerProxy } = require("next-intlayer/proxy");

const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};

module.exports = { proxy: intlayerProxy, config };
```

> `intlayerProxy` はユーザーの優先ロケールを検出し、[設定](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)に記載された適切な URL へリダイレクトするために使用されます。さらに、ユーザーの優先ロケールをクッキーに保存することも可能にします。

> 複数のプロキシを連結する必要がある場合（例えば、認証やカスタムプロキシと `intlayerProxy` を組み合わせる場合）、Intlayer は `multipleProxies` というヘルパーを提供しています。

```ts
import { multipleProxies, intlayerProxy } from "next-intlayer/proxy";
import { customProxy } from "@utils/customProxy";

export const proxy = multipleProxies([intlayerProxy, customProxy]);
```

### （オプション）ステップ 8: コンテンツの言語を変更する

Next.jsでコンテンツの言語を切り替えるには、推奨される方法は`Link`コンポーネントを使用してユーザーを適切なローカライズされたページにリダイレクトすることです。`Link`コンポーネントはページのプリフェッチを可能にし、フルページのリロードを回避するのに役立ちます。

```tsx fileName="src/components/localeSwitcher/LocaleSwitcher.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { Locales, getHTMLTextDir, getLocaleName } from "intlayer";
import { useLocale } from "next-intlayer";

export const LocaleSwitcher: FC = () => {
  const { locale, availableLocales, setLocale } = useLocale({
    onChange: () => window.location.reload(),
  });

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <button
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
              {/* 現在のロケールでの言語名 - 例: 現在のロケールが Locales.SPANISH の場合: Francés */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
        {availableLocales.map((localeItem) => (
          <button
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
              {/* 現在のロケールでの言語名 - 例: 現在のロケールが Locales.SPANISH の場合: Francés */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* 英語での言語名 — 例: French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
```

```jsx fileName="src/components/localeSwitcher/LocaleSwitcher.msx" codeFormat="esm"
"use client";

import { Locales, getHTMLTextDir, getLocaleName } from "intlayer";
import { useLocale } from "next-intlayer";

export const LocaleSwitcher = () => {
  const { locale, availableLocales, setLocale } = useLocale({
    onChange: () => window.location.reload(),
  });

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <button
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocale(localeItem)}
          >
            <span>
              {/* ロケール - 例: FR */}
              {localeItem}
            </span>
            <span>
              {/* 該当ロケールでの言語名 - 例: Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* 現在のロケールで表示した言語名 - 例: ロケールが Locales.SPANISH に設定されている場合: Francés */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* 英語での言語名 - 例: French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
```

```jsx fileName="src/components/localeSwitcher/LocaleSwitcher.csx" codeFormat="commonjs"
"use client";

const { Locales, getHTMLTextDir, getLocaleName } = require("intlayer");
const { useLocale } = require("next-intlayer");

export const LocaleSwitcher = () => {
  const path
  const { locale availableLocales, setLocale } = useLocale({
       onChange: ()=> window.location.reload(),
  });

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <button
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocale(localeItem)}
          >
            <span>
              {/* ロケール（例: FR） */}
              {localeItem}
            </span>
            <span>
              {/* そのロケールでの言語名（例: Français） */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* 現在のロケールでの言語名（例: 現在のロケールが Locales.SPANISH の場合: Francés） */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* 英語での言語名（例: French） */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
```

> 代替方法として、`useLocale` フックが提供する `setLocale` 関数を使用できます。この関数はページのプリフェッチを許可しません。詳細は [`useLocale` フックのドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/next-intlayer/useLocale.md) を参照してください。

> ドキュメント参照：
>
> - [`useLocale` フック](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/next-intlayer/useLocale.md)
> - [`getLocaleName` フック](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl` フック](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/intlayer/getLocalizedUrl.md)

- [`getHTMLTextDir` フック](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/intlayer/getHTMLTextDir.md)
- [`hrefLang` 属性](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
- [`lang` 属性](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
- [`dir` 属性](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
- [`aria-current` 属性](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

### （任意）ステップ 9: Server Actions で現在のロケールを取得する

Server Action の内部でアクティブなロケールが必要な場合（例: メールのローカライズやロケール対応のロジックを実行する場合）、`next-intlayer/server` から `getLocale` を呼び出してください:

```tsx fileName="src/app/actions/getLocale.ts" codeFormat="typescript"
"use server";

import { getLocale } from "next-intlayer/server";

export const myServerAction = async () => {
  const locale = await getLocale();

  // ロケールを使って処理を行います
};
```

> `getLocale` 関数はユーザーのロケールを決定するためにカスケード戦略を採用します:
>
> 1. まず、プロキシによって設定されている可能性のあるロケール値についてリクエストヘッダーを確認します
> 2. ヘッダーにロケールが見つからない場合、クッキーに保存されたロケールを探します
> 3. クッキーが見つからない場合、ブラウザ設定からユーザーの優先言語を検出しようとします
> 4. 最後の手段として、アプリケーションで設定されたデフォルトロケールにフォールバックします
>
> これにより、利用可能なコンテキストに基づいて最も適切なロケールが選択されます。

### （任意）ステップ10：バンドルサイズを最適化する

`next-intlayer` を使用すると、辞書はデフォルトで各ページのバンドルに含まれます。バンドルサイズを最適化するために、Intlayer はマクロを使用して `useIntlayer` の呼び出しをインテリジェントに置き換えるオプションの SWC プラグインを提供しています。これにより、辞書は実際にそれらを使用するページのバンドルにのみ含まれるようになります。

この最適化を有効にするには、`@intlayer/swc` パッケージをインストールしてください。インストール後、`next-intlayer` は自動的にプラグインを検出して使用します：

```bash packageManager="npm"
npm install @intlayer/swc --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add @intlayer/swc --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add @intlayer/swc --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add @intlayer/swc --dev
bunx intlayer init
```

> 注意: この最適化は Next.js 13 以降でのみ利用可能です。

> 注意: SWCプラグインは Next.js 上でまだ実験的なため、このパッケージはデフォルトでインストールされません。将来的に変更される可能性があります。

> 注意: オプションを `importMode: 'dynamic'` または `importMode: 'live'` に設定すると、Suspense に依存するため、`useIntlayer` の呼び出しを `Suspense` 境界でラップする必要があります。つまり、Page / Layout コンポーネントのトップレベルで `useIntlayer` を直接使用することはできません。

### Turbopackで辞書の変更を監視する

Turbopackを開発サーバーとして`next dev`コマンドで使用している場合、辞書の変更はデフォルトでは自動的に検出されません。

この制限は、Turbopackがコンテンツファイルの変更を監視するためのwebpackプラグインを並列で実行できないために発生します。回避するには、`intlayer watch`コマンドを使用して、開発サーバーとIntlayerのビルドウォッチャーを同時に実行する必要があります。

```json5 fileName="package.json"
{
  // ... 既存の package.json 設定
  "scripts": {
    // ... 既存の scripts 設定
    "dev": "intlayer watch --with 'next dev'",
  },
}
```

> next-intlayer@<=6.x.x を使用している場合、Next.js 16 アプリケーションを Turbopack と正しく動作させるために `--turbopack` フラグを維持する必要があります。この制約を回避するには next-intlayer@>=7.x.x の使用を推奨します。

### TypeScript の設定

Intlayer は TypeScript の利点を活かすためにモジュール拡張 (module augmentation) を使用し、コードベースをより堅牢にします。

![オートコンプリート](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![翻訳エラー](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

TypeScript の設定に自動生成された型が含まれていることを確認してください。

````json5 fileName="tsconfig.json"
{
  // ... 既存の TypeScript 設定
  "include": [
    // ... 既存の TypeScript 設定
    ".intlayer/**/*.ts", // 自動生成された型を含める
  ],
}

### Git 設定

Intlayer によって生成されたファイルは無視することを推奨します。これにより、これらのファイルを Git リポジトリにコミットすることを避けられます。

これを行うには、次の内容を `.gitignore` ファイルに追加してください:

```plaintext fileName=".gitignore"
# Intlayer によって生成されたファイルを無視する
.intlayer
````

### VS Code 拡張機能

Intlayer の開発体験を向上させるために、公式の **Intlayer VS Code Extension** をインストールできます。

[VS Code Marketplace からインストール](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

この拡張機能は次の機能を提供します:

- **Autocompletion**: 翻訳キーの補完。
- **リアルタイムのエラーチェック**: 翻訳が欠落している箇所の検出。
- **翻訳されたコンテンツのインラインプレビュー**
- **翻訳を簡単に作成・更新するためのクイックアクション**

拡張機能の使用方法の詳細については、[Intlayer VS Code 拡張機能のドキュメント](https://intlayer.org/doc/vs-code-extension) を参照してください。

### さらに進む

さらに進むには、[ビジュアルエディタ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md) を実装するか、[CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md) を使用してコンテンツを外部化できます。
