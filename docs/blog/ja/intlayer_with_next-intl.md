---
blogName: intlayer_with_next-intl
url: https://intlayer.org/blog/intlayer-with-next-intl
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/intlayer_with_next-intl.md
createdAt: 2025-01-02
updatedAt: 2025-06-29
title: Intlayerとnext-intl
description: Reactアプリのためにnext-intlとIntlayerを連携する
keywords:
  - next-intl
  - Intlayer
  - 国際化
  - ドキュメンテーション
  - Next.js
  - JavaScript
  - React
---

# Next.js 国際化 (i18n) with next-intl and Intlayer

next-intl と Intlayer は、Next.js アプリケーション向けに設計されたオープンソースの国際化 (i18n) フレームワークです。これらは、ソフトウェアプロジェクトにおける翻訳、ローカリゼーション、および言語切替の管理に広く使用されています。

それぞれは、3 つの主要な概念を共有しています。

1. **コンテンツ宣言**: アプリケーションの翻訳可能なコンテンツを定義するためのメソッド。

   - Intlayer では `content declaration file` と呼ばれ、構造化データをエクスポートする JSON、JS、または TS ファイルです。詳細は [Intlayer documentation](https://intlayer.org/fr/doc/concept/content) を参照してください。
   - next-intl では `messages` または `locale messages` と呼ばれ、通常は JSON ファイルにあります。詳細は [next-intl documentation](https://github.com/amannn/next-intl) を参照してください。

2. **ユーティリティ**: アプリケーション内でコンテンツ宣言を構築および解釈するためのツールで、Intlayer の `useIntlayer()` または `useLocale()`、および next-intl の `useTranslations()` などがあります。

3. **プラグインとミドルウェア**: URL リダイレクション、バンドル最適化などの機能, 例として、Intlayer の `intlayerMiddleware` や next-intl の [`createMiddleware`](https://github.com/amannn/next-intl) があります。

## Intlayer と next-intl の主な違い

Intlayer が Next.js 用の他の i18n ライブラリ（next-intl など）と比較される方法の詳細な分析については、[next-i18next vs. next-intl vs. Intlayer blog post](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/i18next_vs_next-intl_vs_intlayer.md) をチェックしてください。

## Intlayer で next-intl メッセージを生成する方法

### なぜ Intlayer を next-intl と一緒に使用するのか？

Intlayer のコンテンツ宣言ファイルは、一般的により良い開発者体験を提供します。主に 2 つの利点により、柔軟性と保守性が向上しています。

1. **柔軟な配置**: Intlayer のコンテンツ宣言ファイルをアプリケーションのファイルツリーのどこにでも配置できます。これにより、使用されていないメッセージファイルやダングリングファイルを残すことなく、コンポーネントの名前を変更したり削除したりすることが容易になります。

   例となるファイル構造:

   ```bash codeFormat="typescript"
   .
   └── src
       └── components
           └── MyComponent
               ├── index.content.ts # コンテンツ宣言ファイル
               └── index.tsx
   ```

   ```bash codeFormat="esm"
   .
   └── src
       └── components
           └── MyComponent
               ├── index.content.mjs # コンテンツ宣言ファイル
               └── index.mjx
   ```

   ```bash codeFormat="cjs"
   .
   └── src
       └── components
           └── MyComponent
               ├── index.content.cjs # コンテンツ宣言ファイル
               └── index.cjx
   ```

   ```bash codeFormat="json"
   .
   └── src
       └── components
           └── MyComponent
               ├── index.content.json # コンテンツ宣言ファイル
               └── index.jsx
   ```

2. **中央集約型の翻訳**: Intlayer はすべての翻訳を単一のコンテンツ宣言に保存し、翻訳が失われることはありません。TypeScript プロジェクトでは、失われた翻訳が自動的に型エラーとしてフラグされ、開発者に即座にフィードバックを提供します。

### インストール

Intlayer と next-intl を一緒に使用するには、両方のライブラリをインストールします:

```bash packageManager="npm"
npm install intlayer next-intl
```

```bash packageManager="yarn"
yarn add intlayer next-intl
```

```bash packageManager="pnpm"
pnpm add intlayer next-intl
```

### Intlayer を設定して next-intl メッセージをエクスポートする

> **注意:** Intlayer から next-intl へメッセージをエクスポートすると、構造にわずかな違いが生じることがあります。統合を簡素化するために、可能であれば Intlayer のみまたは next-intl のみのフローを維持してください。Intlayer から next-intl メッセージを生成する必要がある場合は、以下の手順に従ってください。

プロジェクトのルートに `intlayer.config.ts` ファイル（.mjs / .cjs）を作成または更新します:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    dictionaryOutput: ["next-intl"], // next-intl 出力を使用する
    nextIntlMessagesDir: "./intl/messages", // next-intl メッセージを保存する場所
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    dictionaryOutput: ["react-intl"],
    nextIntlMessagesDir: "./intl/messages",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    dictionaryOutput: ["next-intl"],
    nextIntlMessagesDir: "./intl/messages",
  },
};

module.exports = config;
```

### コンテンツ宣言

以下は、複数のフォーマットのコンテンツ宣言ファイルの例です。Intlayer はこれらを next-intl が消費できるメッセージファイルにコンパイルします。

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const content = {
  key: "my-component",
  content: {
    helloWorld: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
} satisfies Dictionary;

export default content;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const content = {
  key: "my-component",
  content: {
    helloWorld: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
};

export default content;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

module.exports = {
  key: "my-component",
  content: {
    helloWorld: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
};
```

```json fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "my-component",
  "content": {
    "helloWorld": {
      "nodeType": "translation",
      "translation": {
        "en": "Hello World",
        "fr": "Bonjour le monde",
        "es": "Hola Mundo"
      }
    }
  }
}
```

### next-intl メッセージのビルド

next-intl 用のメッセージファイルをビルドするには、次のコマンドを実行します:

```bash packageManager="npm"
npx intlayer dictionaries build
```

```bash packageManager="yarn"
yarn intlayer build
```

```bash packageManager="pnpm"
pnpm intlayer build
```

これにより、`./intl/messages` ディレクトリにリソースが生成されます（`intlayer.config.*` で構成された通り）。期待される出力:

```bash
.
└── intl
    └── messages
       └── /ja
           └── my-content.json
       └── /fr
           └── my-content.json
       └── /es
           └── my-content.json
```

各ファイルには、すべての Intlayer コンテンツ宣言からのコンパイル済みのメッセージが含まれています。トップレベルのキーは通常、`content.key` フィールドに一致します。

### 次.js アプリで next-intl を使用する

> 詳細については、公式の [next-intl usage docs](https://github.com/amannn/next-intl#readme) を参照してください。

1. **ミドルウェアを作成する (オプション)**:  
   自動的なロケール検出またはリダイレクションを管理したい場合、next-intl の [createMiddleware](https://github.com/amannn/next-intl#createMiddleware) を使用してください。

   ```typescript fileName="middleware.ts"
   import createMiddleware from "next-intl/middleware";
   import { NextResponse } from "next/server";

   export default createMiddleware({
     locales: ["ja", "fr", "es"],
     defaultLocale: "ja",
   });

   export const config = {
     matcher: ["/((?!api|_next|.*\\..*).*)"],
   };
   ```

2. **メッセージを読み込むための `layout.tsx` または `_app.tsx` を作成する:**  
   App Router（Next.js 13+）を使用している場合は、レイアウトを作成します。

   ```typescript fileName="app/[locale]/layout.tsx"
   import { NextIntlClientProvider } from 'next-intl';
   import { notFound } from 'next/navigation';
   import React, { ReactNode } from 'react';

   export const dynamic = 'force-dynamic';

   export default async function RootLayout({
     children,
     params
   }: {
     children: ReactNode;
     params: { locale: string };
   }) {
     let messages;
     try {
       messages = (await import(`../../intl/messages/${params.locale}.json`)).default;
     } catch (error) {
       notFound();
     }

     return (
       <html lang={params.locale}>
         <body>
           <NextIntlClientProvider locale={params.locale} messages={messages}>
             {children}
           </NextIntlClientProvider>
         </body>
       </html>
     );
   }
   ```

   Pages Router（Next.js 12 以下）を使用している場合は、`_app.tsx` でメッセージを読み込みます。

   ```typescript fileName="pages/_app.tsx"
   import type { AppProps } from 'next/app';
   import { NextIntlProvider } from 'next-intl';

   function MyApp({ Component, pageProps }: AppProps) {
     return (
       <NextIntlProvider locale={pageProps.locale} messages={pageProps.messages}>
         <Component {...pageProps} />
       </NextIntlProvider>
     );
   }

   export default MyApp;
   ```

3. **サーバーサイドでメッセージを取得する (Pages Router の例):**

   ```typescript fileName="pages/index.tsx"
   import { GetServerSideProps } from "next";
   import HomePage from "../components/HomePage";

   export default HomePage;

   export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
     const messages = (await import(`../intl/messages/${locale}.json`)).default;

     return {
       props: {
         locale,
         messages,
       },
     };
   };
   ```

### Next.js コンポーネントでのコンテンツの使用

メッセージが next-intl に読み込まれると、`useTranslations()` フックを介してコンポーネント内で使用できます:

```typescript fileName="src/components/MyComponent/index.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useTranslations } from 'next-intl';

const MyComponent: FC = () => {
  const t = useTranslations('my-component');
  // 'my-component' は Intlayer 内のコンテンツキーに対応します

  return (
    <div>
      <h1>{t('helloWorld')}</h1>
    </div>
  );
};

export default MyComponent;
```

```jsx fileName="src/components/MyComponent/index.jsx" codeFormat="esm"
import { useTranslations } from "next-intl";

export default function MyComponent() {
  const t = useTranslations("my-component");

  return (
    <div>
      <h1>{t("helloWorld")}</h1>
    </div>
  );
}
```

**これで完了です!** Intlayer コンテンツ宣言ファイルを更新または追加するたびに、`intlayer build` コマンドを再実行して next-intl JSON メッセージを再生成してください。next-intl は更新されたコンテンツを自動的に取得します。
