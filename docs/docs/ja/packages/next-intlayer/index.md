---
docName: package__next-intlayer
url: https://intlayer.org/doc/packages/next-intlayer
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/next-intlayer/index.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: パッケージドキュメント | next-intlayer
description: next-intlayerパッケージの使用方法を確認してください
keywords:
  - Intlayer
  - next-intlayer
  - 国際化
  - ドキュメント
  - Next.js
  - JavaScript
  - React
---

# next-intlayer: Next.jsアプリケーションを国際化（i18n）するためのNPMパッケージ

**Intlayer**は、JavaScript開発者向けに特化して設計されたパッケージ群です。React、Next.js、Express.jsなどのフレームワークと互換性があります。

**`next-intlayer`パッケージ**は、Next.jsアプリケーションを国際化するためのものです。Next.jsの国際化のためのコンテキストプロバイダーとフックを提供します。また、[Webpack](https://webpack.js.org/)や[Turbopack](https://nextjs.org/docs/app/api-reference/turbopack)とIntlayerを統合するためのNext.jsプラグイン、ユーザーの優先ロケールを検出し、クッキーを管理し、URLリダイレクションを処理するためのミドルウェアも含まれています。

## なぜNext.jsアプリケーションを国際化するのか？

Next.jsアプリケーションを国際化することは、グローバルなオーディエンスに効果的に対応するために不可欠です。これにより、各ユーザーの好みの言語でコンテンツやメッセージを提供できます。この機能は、ユーザーエクスペリエンスを向上させ、異なる言語背景を持つ人々にとってアプリケーションをよりアクセスしやすく、関連性のあるものにすることで、アプリケーションのリーチを広げます。

## なぜIntlayerを統合するのか？

- **JavaScript駆動のコンテンツ管理**: 柔軟性のあるJavaScriptを活用して、効率的にコンテンツを定義および管理できます。
- **型安全な環境**: TypeScriptを活用して、すべてのコンテンツ定義を正確かつエラーのないものにします。
- **統合されたコンテンツファイル**: 翻訳を関連するコンポーネントの近くに配置し、保守性と明確性を向上させます。

## インストール

お好みのパッケージマネージャーを使用して、必要なパッケージをインストールします:

```bash packageManager="npm"
npm install next-intlayer
```

```bash packageManager="yarn"
yarn add next-intlayer
```

```bash packageManager="pnpm"
pnpm add next-intlayer
```

## 使用例

Intlayerを使用すると、コードベースのどこにでも構造化された方法でコンテンツを宣言できます。

デフォルトでは、Intlayerは拡張子が`.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`のファイルをスキャンします。

> デフォルトの拡張子は[設定ファイル](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)の`contentDir`プロパティを設定することで変更できます。

```bash codeFormat="typescript"
.
├── intlayer.config.ts
└── src
    └── components
        ├── ClientComponent
        │   ├── index.content.ts
        │   └── index.tsx
        └── ServerComponent
            ├── index.content.ts
            └── index.tsx
```

```bash codeFormat="esm"
.
├── intlayer.config.mjs
└── src
    └── components
        ├── ClientComponent
        │   ├── index.content.mjs
        │   └── index.mjx
        └── ServerComponent
            ├── index.content.mjs
            └── index.mjx
```

```bash codeFormat="commonjs"
.
├── intlayer.config.cjs
└── src
    └── components
        ├── ClientComponent
        │   ├── index.content.cjs
        │   └── index.cjx
        └── ServerComponent
            ├── index.content.cjs
            └── index.cjx
```

### コンテンツを宣言する

`next-intlayer`は[`intlayer`パッケージ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/intlayer/index.md)と連携して動作します。`intlayer`は、コード内のどこにでもコンテンツを宣言できるパッケージです。多言語コンテンツの宣言を構造化された辞書に変換し、アプリケーションにシームレスに統合します。

以下はコンテンツ宣言の例です:

```tsx fileName="src/ClientComponent/index.content.ts" codeFormat="typescript"
import { t, type Dictionary } from "intlayer";

const clientComponentContent = {
  key: "client-component",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
    numberOfCar: enu({
      "<-1": "Less than minus one car",
      "-1": "Minus one car",
      "0": "No cars",
      "1": "One car",
      ">5": "Some cars",
      ">19": "Many cars",
    }),
  },
} satisfies Dictionary;

export default clientComponentContent;
```

```jsx fileName="src/ClientComponent/index.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const clientComponentContent = {
  key: "client-component",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
    numberOfCar: enu({
      "<-1": "Less than minus one car",
      "-1": "Minus one car",
      "0": "No cars",
      "1": "One car",
      ">5": "Some cars",
      ">19": "Many cars",
    }),
  },
};

export default clientComponentContent;
```

```jsx fileName="src/ClientComponent/index.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const clientComponentContent = {
  key: "client-component",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
    numberOfCar: enu({
      "<-1": "Less than minus one car",
      "-1": "Minus one car",
      "0": "No cars",
      "1": "One car",
      ">5": "Some cars",
      ">19": "Many cars",
    }),
  },
};

module.exports = clientComponentContent;
```

```json fileName="src/ClientComponent/index.content.json" codeFormat="json"
{
  "key": "client-component",
  "content": {
    "myTranslatedContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Hello World",
        "fr": "Bonjour le monde",
        "es": "Hola Mundo"
      }
    },
    "numberOfCar": {
      "nodeType": "enumeration",
      "enumeration": {
        "<-1": "Less than minus one car",
        "-1": "Minus one car",
        "0": "No cars",
        "1": "One car",
        ">5": "Some cars",
        ">19": "Many cars"
      }
    }
  }
}
```

### コード内でコンテンツを利用する

コンテンツを宣言したら、それをコード内で使用できます。以下はReactコンポーネントでコンテンツを使用する例です:

```tsx {4,7} fileName="src/components/ClientComponentExample.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ClientComponentExample: FC = () => {
  const { myTranslatedContent } = useIntlayer("client-component"); // 関連するコンテンツ宣言を作成

  return (
    <div>
      <p>{myTranslatedContent}</p>
    </div>
  );
};
```

```jsx {3,6} fileName="src/components/ClientComponentExample.mjx" codeFormat="esm"
"use client";

import { useIntlayer } from "next-intlayer";

const ClientComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("client-component"); // 関連するコンテンツ宣言を作成

  return (
    <div>
      <p>{myTranslatedContent}</p>
    </div>
  );
};
```

```jsx {3,6} fileName="src/components/ClientComponentExample.csx" codeFormat="commonjs"
"use client";

const { useIntlayer } = require("next-intlayer");

const ClientComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("client-component"); // 関連するコンテンツ宣言を作成

  return (
    <div>
      <p>{myTranslatedContent}</p>
    </div>
  );
};
```

## Next.jsアプリケーションの国際化をマスターする

Intlayerは、Next.jsアプリケーションを国際化するための多くの機能を提供します。以下は主な機能の一部です:

- **サーバーコンポーネントの国際化**: Intlayerを使用すると、クライアントコンポーネントと同じ方法でサーバーコンポーネントを国際化できます。これにより、クライアントとサーバーの両方のコンポーネントで同じコンテンツ宣言を使用できます。
- **ロケール検出のためのミドルウェア**: Intlayerは、ユーザーの優先ロケールを検出するためのミドルウェアを提供します。このミドルウェアは、ユーザーの優先ロケールを検出し、[設定](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)で指定された適切なURLにリダイレクトします。
- **メタデータの国際化**: Intlayerは、ページのタイトルなどのメタデータを国際化する方法を提供します。Next.jsが提供する`generateMetadata`関数を使用して、`getTranslation`関数を使用してメタデータを翻訳できます。
- **sitemap.xmlとrobots.txtの国際化**: Intlayerを使用すると、sitemap.xmlとrobots.txtファイルを国際化できます。`getMultilingualUrls`関数を使用して、多言語URLを生成できます。
- **URLの国際化**: Intlayerを使用すると、`getMultilingualUrls`関数を使用してURLを国際化できます。この関数は、sitemap用の多言語URLを生成します。

**これらの機能の詳細については、[Next.js 15 App Routerを使用したIntlayerによるNext.jsの国際化（i18n）](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_nextjs_15.md)ガイドを参照してください。**

## `next-intlayer`パッケージが提供する関数

`next-intlayer`パッケージは、アプリケーションを国際化するためのいくつかの関数も提供します。

- [`t()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/next-intlayer/t.md)
- [`useIntlayer()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/next-intlayer/useIntlayer.md)
- [`useDictionary()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/next-intlayer/useDictionary.md)
- [`useLocale()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/next-intlayer/useLocale.md)
- [`useIntlayerAsync()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/next-intlayer/useIntlayerAsync.md)
