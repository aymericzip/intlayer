---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: パッケージドキュメント | next-intlayer
description: next-intlayerパッケージの使い方を見る
keywords:
  - Intlayer
  - next-intlayer
  - 国際化
  - ドキュメント
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - next-intlayer
---

# next-intlayer: Next.jsアプリケーションを国際化(i18n)するためのNPMパッケージ

**Intlayer**はJavaScript開発者向けに特化して設計されたパッケージ群です。React、Next.js、Express.jsなどのフレームワークと互換性があります。

**`next-intlayer`パッケージ**は、Next.jsアプリケーションを国際化することを可能にします。Next.jsの国際化のためのコンテキストプロバイダーやフックを提供します。さらに、Intlayerを[Webpack](https://webpack.js.org/)や[Turbopack](https://nextjs.org/docs/app/api-reference/turbopack)と統合するためのNext.jsプラグインや、ユーザーの優先ロケールの検出、クッキー管理、URLリダイレクトの処理を行うミドルウェアも含まれています。

## なぜNext.jsアプリケーションを国際化するのか？

Next.jsアプリケーションを国際化することは、グローバルなユーザーに効果的に対応するために不可欠です。これにより、各ユーザーの好みの言語でコンテンツやメッセージを提供できるようになります。この機能はユーザー体験を向上させ、異なる言語背景を持つ人々にとってアプリケーションをよりアクセスしやすく、関連性の高いものにすることで、アプリケーションのリーチを広げます。

## なぜIntlayerを統合するのか？

- **JavaScriptによるコンテンツ管理**: JavaScriptの柔軟性を活かして、効率的にコンテンツを定義・管理できます。
- **型安全な環境**: TypeScriptを活用して、すべてのコンテンツ定義が正確でエラーのないものになるようにします。
- **統合されたコンテンツファイル**: 翻訳をそれぞれのコンポーネントに近い場所に保持し、保守性と明確さを向上させます。

## インストール

必要なパッケージをお使いのパッケージマネージャーでインストールしてください：

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

Intlayerを使うと、コードベースのどこでも構造化された方法でコンテンツを宣言できます。

デフォルトでは、Intlayerは拡張子が `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}` のファイルをスキャンします。

> デフォルトの拡張子は、[設定ファイル](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)の `contentDir` プロパティを設定することで変更できます。

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

`next-intlayer`は[`intlayer`パッケージ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/intlayer/index.md)と連携して動作するように作られています。`intlayer`はコードのどこでもコンテンツを宣言できるパッケージで、多言語コンテンツの宣言を構造化された辞書に変換し、アプリケーションにシームレスに統合します。

以下はコンテンツ宣言の例です：

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
      "-1": "マイナス1台の車",
      "0": "車はありません",
      "1": "1台の車",
      ">5": "いくつかの車",
      ">19": "多くの車",
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
      "<-1": "マイナス1台未満の車",
      "-1": "マイナス1台の車",
      "0": "車はありません",
      "1": "1台の車",
      ">5": "いくつかの車",
      ">19": "多くの車",
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
      "<-1": "マイナス1台未満の車",
      "-1": "マイナス1台の車",
      "0": "車なし",
      "1": "1台の車",
      ">5": "いくつかの車",
      ">19": "多くの車",
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
        "<-1": "マイナス1台未満の車",
        "-1": "マイナス1台の車",
        "0": "車なし",
        "1": "1台の車",
        ">5": "いくつかの車",
        ">19": "多くの車"
      }
    }
  }
}
```

### コード内でコンテンツを利用する

コンテンツを宣言したら、コード内で使用できます。以下はReactコンポーネントでコンテンツを使用する例です：

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

## Next.jsアプリケーションの国際化を極める

Intlayerは、Next.jsアプリケーションの国際化を支援する多くの機能を提供します。以下は主な機能の一部です：

- **サーバーコンポーネントの国際化**：Intlayerはクライアントコンポーネントと同様にサーバーコンポーネントの国際化を可能にします。つまり、クライアントコンポーネントとサーバーコンポーネントの両方で同じコンテンツ宣言を使用できます。
- **ロケール検出のためのミドルウェア**: Intlayerはユーザーの優先ロケールを検出するためのミドルウェアを提供します。このミドルウェアはユーザーの優先ロケールを検出し、[設定](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)で指定された適切なURLにリダイレクトします。
- **メタデータの国際化**: Intlayerは、Next.jsが提供する`generateMetadata`関数を使用して、ページのタイトルなどのメタデータを国際化する方法を提供します。`getTranslation`関数を使ってメタデータを翻訳することができます。
- **sitemap.xml と robots.txt の国際化**: Intlayer は sitemap.xml と robots.txt ファイルの国際化を可能にします。`getMultilingualUrls` 関数を使用して、サイトマップ用の多言語 URL を生成できます。
- **URL の国際化**: Intlayer は `getMultilingualUrls` 関数を使用して URL の国際化を可能にします。この関数はサイトマップ用の多言語 URL を生成します。

**これらの機能の詳細については、[Next.js Internationalization (i18n) with Intlayer and Next.js 15 App Router](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_nextjs_15.md) ガイドを参照してください。**

## `next-intlayer` パッケージが提供する関数

`next-intlayer` パッケージは、アプリケーションの国際化を支援するいくつかの関数も提供しています。

- [`t()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/next-intlayer/t.md)
- [`useIntlayer()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/next-intlayer/useIntlayer.md)
- [`useDictionary()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/next-intlayer/useDictionary.md)
- [`useLocale()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/next-intlayer/useLocale.md)

## ドキュメント履歴

- 5.5.10 - 2025-06-29: 履歴初期化
